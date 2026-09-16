<?php
/* Retro Vault store endpoint - https://retrovault.world/store/api.php
 *
 *   POST action=activate   key, game, device      -> {ok, instance, name, order, code}
 *   POST action=rom        key, instance, game    -> the ROM, stamped for this buyer
 *                          [download=1 for a save-as file]
 *   POST action=deactivate key, instance, game    -> {ok}
 *
 * Form-encoded POSTs, so the browser sends them without a CORS preflight.
 * Setup and the reasoning behind all of it: README.md. */

declare(strict_types=1);
require __DIR__ . '/lib.php';
$cfg = require __DIR__ . '/config.php';

function cors(array $cfg): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $ok = in_array($origin, $cfg['allowed_origins'], true)
       || (!empty($cfg['allow_localhost']) && preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin));
    if ($ok) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Expose-Headers: Content-Disposition, X-Vault-Licensee');
        // the emulator pages run cross-origin isolated (COEP)
        header('Cross-Origin-Resource-Policy: cross-origin');
    }
}
function reply(array $body, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode($body);
    exit;
}

cors($cfg);
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(['ok' => false, 'reason' => 'method'], 405);

try {
    $action = (string) ($_POST['action'] ?? '');
    $game = (string) ($_POST['game'] ?? '');
    $key = trim((string) ($_POST['key'] ?? ''));
    $instance = trim((string) ($_POST['instance'] ?? ''));
    $product = $cfg['products'][$game] ?? null;
    if (!$product) throw new StoreError('unknown-game', 404);
    if ($key === '' || strlen($key) > 100) throw new StoreError('invalid', 400);

    if ($action === 'activate') {
        rate_limit($cfg, 'act', 20, 600);
        $device = substr(preg_replace('/[^\w .\-()\/]/u', '', (string) ($_POST['device'] ?? 'Retro Vault')), 0, 60);
        $r = license_activate($cfg, $product, $key, $device ?: 'Retro Vault');
        $s = stamp_info($cfg, $r);
        reply(['ok' => true, 'instance' => $r['instance']['id'], 'name' => $s['name'],
               'order' => $s['order'], 'code' => $s['code'],
               'usage' => $r['license_key']['activation_usage'] ?? null,
               'limit' => $r['license_key']['activation_limit'] ?? null]);
    }

    if ($action === 'rom') {
        rate_limit($cfg, 'rom', 60, 600);
        if ($instance === '') throw new StoreError('invalid', 400);
        $r = license_validate($cfg, $product, $key, $instance);
        $path = rtrim($cfg['rom_dir'], '/') . '/' . basename($product['file']);
        if (!is_file($path)) throw new StoreError('missing-file', 500);
        $s = stamp_info($cfg, $r);
        $out = watermark((string) file_get_contents($path), $product, $s);
        http_response_code(200);
        header('Content-Type: application/octet-stream');
        header('Cache-Control: no-store');
        header('Content-Length: ' . strlen($out));
        header('X-Vault-Licensee: ' . rawurlencode($s['name']));
        $disp = !empty($_POST['download']) ? 'attachment' : 'inline';
        header('Content-Disposition: ' . $disp . "; filename*=UTF-8''" . rawurlencode(basename($product['file'])));
        echo $out;
        exit;
    }

    if ($action === 'deactivate') {
        rate_limit($cfg, 'act', 20, 600);
        if ($instance === '') throw new StoreError('invalid', 400);
        license_deactivate($cfg, $product, $key, $instance);
        reply(['ok' => true]);
    }

    throw new StoreError('unknown-action', 400);
} catch (StoreError $e) {
    reply(['ok' => false, 'reason' => $e->getMessage()], $e->http);
} catch (Throwable $e) {
    error_log('vault store: ' . $e);
    reply(['ok' => false, 'reason' => 'server'], 500);
}
