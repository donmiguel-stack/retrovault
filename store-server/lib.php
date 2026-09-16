<?php
/* Retro Vault store - shared helpers: license checks against Lemon Squeezy
 * and the per-buyer stamp ("watermark") written into every copy served.
 *
 * Nothing here can stop a determined person from copying a ROM - the
 * emulator runs in the browser, so the bytes end up there. The goal is
 * narrower: a key only works on a few devices, the file is never a public
 * URL, and every copy carries the order it came from. See README.md. */

declare(strict_types=1);

const LS_API = 'https://api.lemonsqueezy.com/v1/licenses/';

/* ---------------------------------------------------------------- licenses */

/* One call to Lemon Squeezy's License API. It needs no API key - the
 * license key itself is the credential - so no secret is involved here.
 * $cfg['ls_base'] exists only so tests can point this at a mock server. */
function ls_call(array $cfg, string $action, array $fields): array {
    $url = ($cfg['ls_base'] ?? LS_API) . $action;
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($fields),
        CURLOPT_HTTPHEADER => ['Accept: application/json',
                               'Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($body === false) throw new StoreError('upstream', 502);
    $json = json_decode((string) $body, true);
    if (!is_array($json)) throw new StoreError('upstream', 502);
    $json['_http'] = $code;
    return $json;
}

/* The key must belong to our store and to the product sold for this game -
 * otherwise a key for any other Lemon Squeezy product would unlock it. */
function check_meta(array $cfg, array $product, array $r): void {
    $meta = $r['meta'] ?? [];
    if ((string) ($meta['store_id'] ?? '') !== (string) $cfg['store_id']) throw new StoreError('wrong-product', 403);
    if ((string) ($meta['product_id'] ?? '') !== (string) $product['product_id']) throw new StoreError('wrong-product', 403);
    $status = $r['license_key']['status'] ?? '';
    if ($status === 'disabled' || $status === 'expired') throw new StoreError('revoked', 403);
}

/* Map Lemon Squeezy's free-text errors onto the few cases the page explains. */
function ls_error(array $r): StoreError {
    $e = strtolower((string) ($r['error'] ?? ''));
    if (str_contains($e, 'activation limit')) return new StoreError('limit', 403);
    if (str_contains($e, 'not found') || str_contains($e, 'invalid')) return new StoreError('invalid', 403);
    if (str_contains($e, 'disabled') || str_contains($e, 'expired')) return new StoreError('revoked', 403);
    return new StoreError('invalid', 403);
}

function license_activate(array $cfg, array $product, string $key, string $device): array {
    $r = ls_call($cfg, 'activate', ['license_key' => $key, 'instance_name' => $device]);
    if (empty($r['activated'])) throw ls_error($r);
    try {
        check_meta($cfg, $product, $r);
    } catch (StoreError $e) {
        // activated on someone else's product: give the slot straight back
        ls_call($cfg, 'deactivate', ['license_key' => $key, 'instance_id' => $r['instance']['id'] ?? '']);
        throw $e;
    }
    return $r;
}

/* Validation result is cached for a few minutes, so starting a game, then
 * downloading it, doesn't hit Lemon Squeezy twice (their License API allows
 * 60 requests a minute). A revoked key stops working within that window. */
function license_validate(array $cfg, array $product, string $key, string $instance): array {
    $file = cache_path($cfg, 'v_' . hash('sha256', $key . '|' . $instance . '|' . $product['product_id']));
    $ttl = (int) ($cfg['validate_cache_seconds'] ?? 600);
    if ($ttl > 0 && is_file($file) && filemtime($file) > time() - $ttl) {
        $r = json_decode((string) file_get_contents($file), true);
        if (is_array($r)) return $r;
    }
    $r = ls_call($cfg, 'validate', ['license_key' => $key, 'instance_id' => $instance]);
    if (empty($r['valid'])) throw ls_error($r);
    if (($r['instance']['id'] ?? '') !== $instance) throw new StoreError('invalid', 403);
    check_meta($cfg, $product, $r);
    if ($ttl > 0) @file_put_contents($file, json_encode($r), LOCK_EX);
    return $r;
}

function license_deactivate(array $cfg, array $product, string $key, string $instance): void {
    $r = ls_call($cfg, 'deactivate', ['license_key' => $key, 'instance_id' => $instance]);
    if (empty($r['deactivated'])) throw ls_error($r);
    @unlink(cache_path($cfg, 'v_' . hash('sha256', $key . '|' . $instance . '|' . $product['product_id'])));
}

/* ------------------------------------------------------------- the stamp */

/* Who this copy belongs to. The code is an HMAC over the license key id and
 * order, so it can't be forged to point at someone else, and it doesn't
 * reveal the buyer's email if the file ends up in public. */
function stamp_info(array $cfg, array $r): array {
    $order = (string) ($r['meta']['order_id'] ?? '0');
    $lkid = (string) ($r['license_key']['id'] ?? '0');
    $code = substr(hash_hmac('sha256', $lkid . '|' . $order, $cfg['stamp_secret']), 0, 8);
    $name = trim((string) ($r['meta']['customer_name'] ?? ''));
    return ['order' => $order, 'code' => strtoupper($code), 'name' => $name,
            'text' => 'RV#' . $order . '/' . strtoupper($code)];
}

function watermark(string $data, array $product, array $stamp): string {
    $method = $product['stamp']['method'] ?? 'none';
    switch ($method) {
        case 'none':        return $data;
        case 'fill':        return stamp_fill($data, $product['stamp'], $stamp);
        case 'prg_append':  return stamp_prg_append($data, $stamp);
        case 'd64_dir':     return stamp_d64_dir($data, $stamp);
        case 'zip_file':    return stamp_zip_file($data, $stamp);
    }
    throw new StoreError('config', 500);
}

/* Cartridge images (.bin, .crt): overwrite a run of filler bytes the
 * preparation tool found and that was boot-tested stamped. The file keeps
 * its exact size - o2em picks the bank layout from the size. The original
 * filler is checked first: if the file on the server isn't the one that was
 * prepared, refuse rather than write into live code. */
function stamp_fill(string $data, array $opt, array $stamp): string {
    $off = (int) $opt['offset']; $len = (int) $opt['length'];
    $fill = chr((int) $opt['filler']);
    if ($len < 16 || $off < 0 || $off + $len > strlen($data)) throw new StoreError('config', 500);
    if (substr($data, $off, $len) !== str_repeat($fill, $len)) throw new StoreError('config', 500);
    $mark = substr($stamp['text'], 0, $len);
    return substr_replace($data, str_pad($mark, $len, $fill), $off, $len);
}

/* C64 .prg: the stamp rides after the program's last byte. It loads into
 * the RAM just past the program, which the program either never reads or
 * initialises itself; the tool refuses programs that end near $A000. */
function stamp_prg_append(string $data, array $stamp): string {
    return $data . "\0" . $stamp['text'] . "\0";
}

/* C64 .d64: a zero-block DEL entry, "LIC <NAME>", added after the last file
 * in the directory - visible in the disk listing, never loaded (autostart
 * and LOAD"*" take the first file). The order number and the first half of
 * the code sit in the entry's unused bytes. */
function d64_petscii(string $s): string {
    $s = strtoupper((string) (@iconv('UTF-8', 'ASCII//TRANSLIT', $s) ?: ''));
    return preg_replace('/[^A-Z0-9 .\-\/#]/', '', $s);
}
function stamp_d64_dir(string $data, array $stamp): string {
    $sizes = [174848, 175531, 196608, 197376];
    if (!in_array(strlen($data), $sizes, true)) throw new StoreError('config', 500);
    $t18 = 17 * 21 * 256;                               // tracks 1-17 have 21 sectors
    $slot = null; $last = null; $seen = [];
    $sec = 1;
    while ($sec !== null && !isset($seen[$sec]) && $sec < 19) {
        $seen[$sec] = true;
        $base = $t18 + $sec * 256;
        for ($i = 0; $i < 8; $i++) {
            $p = $base + 2 + $i * 32;
            if (ord($data[$p]) !== 0) { $last = $p; $slot = null; }
            elseif ($slot === null) $slot = $p;
        }
        $nt = ord($data[$base]); $ns = ord($data[$base + 1]);
        $sec = $nt === 18 ? $ns : null;
    }
    if ($slot === null || $last === null || $slot < $last) throw new StoreError('config', 500);
    $name = substr(trim('LIC ' . d64_petscii($stamp['name'] !== '' ? $stamp['name'] : 'ORDER ' . $stamp['order'])), 0, 16);
    $entry = chr(0x80) . chr(18) . chr(0)                 // closed DEL, 0 blocks
           . str_pad($name, 16, chr(0xA0))
           . "\0\0\0" . pack('V', ((int) $stamp['order']) & 0xFFFFFFFF)   // order number
           . hex2bin(substr(str_pad($stamp['code'], 4, '0'), 0, 4))          // first half of the code
           . "\0\0";                                                        // 0 blocks
    return substr_replace($data, $entry, $slot, 30);
}

/* MS-DOS .zip: a small text file. Put inside the zip's single top-level
 * folder when it has one - emulator/dos.html strips such a folder, and a
 * file next to it would stop that. */
function stamp_zip_file(string $data, array $stamp): string {
    $tmp = tempnam(sys_get_temp_dir(), 'rvz');
    file_put_contents($tmp, $data);
    $z = new ZipArchive();
    if ($z->open($tmp) !== true) { @unlink($tmp); throw new StoreError('config', 500); }
    $roots = [];
    for ($i = 0; $i < $z->numFiles; $i++) {
        $n = ltrim((string) $z->getNameIndex($i), '/');
        $roots[strpos($n, '/') === false ? '' : explode('/', $n)[0]] = true;
    }
    $prefix = (count($roots) === 1 && !isset($roots['']) && !isset($roots['.jsdos'])) ? array_key_first($roots) . '/' : '';
    $txt = "Retro Vault - licensed copy\r\n\r\n"
         . "Licensed to: " . ($stamp['name'] !== '' ? $stamp['name'] : '-') . "\r\n"
         . "Order: " . $stamp['order'] . "   Code: " . $stamp['code'] . "\r\n\r\n"
         . "This copy was bought through Retro Vault and belongs to the person above.\r\n"
         . "Please don't share it - the author made this game and gets paid per copy.\r\n";
    $z->addFromString($prefix . 'LICENSE.TXT', $txt);
    $z->close();
    $out = (string) file_get_contents($tmp);
    @unlink($tmp);
    return $out;
}

/* ---------------------------------------------------------------- plumbing */

final class StoreError extends Exception {
    public int $http;
    public function __construct(string $reason, int $http = 400) { parent::__construct($reason); $this->http = $http; }
}

function cache_dir(array $cfg): string {
    $d = $cfg['cache_dir'] ?? (__DIR__ . '/cache');
    if (!is_dir($d)) @mkdir($d, 0700, true);
    return $d;
}
function cache_path(array $cfg, string $name): string { return cache_dir($cfg) . '/' . $name; }

/* Crude per-IP limit, stored as files: enough to make guessing keys slow. */
function rate_limit(array $cfg, string $bucket, int $max, int $window): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0';
    $file = cache_path($cfg, 'r_' . $bucket . '_' . hash('sha256', $ip));
    $now = time();
    $hits = [];
    if (is_file($file)) $hits = array_filter(explode(',', (string) file_get_contents($file)), fn($t) => (int) $t > $now - $window);
    if (count($hits) >= $max) throw new StoreError('slow-down', 429);
    $hits[] = (string) $now;
    @file_put_contents($file, implode(',', $hits), LOCK_EX);
}
