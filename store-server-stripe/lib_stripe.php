<?php
/* Retro Vault store - the thin Stripe layer.
 *
 * Deliberately no SDK and no Composer: this runs on Hostinger shared hosting
 * next to api.php, and the whole integration needs four API calls. cURL and
 * hash_hmac are already there. If Composer ever lands on the plan, the
 * official SDK is a drop-in replacement for stripe_call() - nothing else
 * here knows how the request is made.
 *
 * Docs: https://docs.stripe.com/api  ·  https://docs.stripe.com/webhooks */

declare(strict_types=1);

const STRIPE_API     = 'https://api.stripe.com';
const STRIPE_VERSION = '2026-08-26.dahlia';

/* One Stripe REST call. $params is nested PHP arrays; http_build_query
 * produces exactly the a[b]=c form Stripe's form encoding expects.
 * $cfg['stripe_base'] exists only so the tests can point at a mock. */
function stripe_call(array $cfg, string $method, string $path, array $params = []): array {
    $key = (string) ($cfg['stripe_secret_key'] ?? '');
    if ($key === '') throw new StoreError('config', 500);

    $url = rtrim((string) ($cfg['stripe_base'] ?? STRIPE_API), '/') . $path;
    $body = $params ? http_build_query($params, '', '&', PHP_QUERY_RFC3986) : '';
    if ($method === 'GET' && $body !== '') { $url .= '?' . $body; $body = ''; }

    $ch = curl_init($url);
    $headers = [
        'Authorization: Bearer ' . $key,
        'Stripe-Version: ' . STRIPE_VERSION,
        'Content-Type: application/x-www-form-urlencoded',
    ];
    /* Idempotency: a retried POST (our own retry, or a browser double-click)
     * must not create a second Checkout Session or a second anything. */
    if ($method === 'POST' && !empty($cfg['_idempotency_key'])) {
        $headers[] = 'Idempotency-Key: ' . $cfg['_idempotency_key'];
    }
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_POSTFIELDS     => $body,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 20,
    ]);
    $raw = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        error_log('vault stripe: curl: ' . $err);
        throw new StoreError('upstream', 502);
    }
    $json = json_decode((string) $raw, true);
    if (!is_array($json)) throw new StoreError('upstream', 502);
    if ($code >= 400) {
        /* Never let a Stripe error message reach the browser: it can quote
         * request parameters back, and those include our own ids. */
        error_log('vault stripe: ' . $code . ' ' . ($json['error']['message'] ?? 'unknown'));
        throw new StoreError('upstream', 502);
    }
    return $json;
}

/* Verify the Stripe-Signature header on a webhook.
 *
 *   Stripe-Signature: t=<unix>,v1=<hex>,v1=<hex>
 *   v1 = HMAC-SHA256(webhook secret, "<t>.<raw body>")
 *
 * The raw body matters: re-encoded JSON will not match. Several v1 values
 * can be present while a secret is being rotated, so any match counts.
 * The timestamp tolerance stops an old, valid, captured request being
 * replayed at us later. */
function stripe_verify_webhook(string $payload, string $header, string $secret, int $tolerance = 300): array {
    $t = null; $sigs = [];
    foreach (explode(',', $header) as $part) {
        $kv = explode('=', trim($part), 2);
        if (count($kv) !== 2) continue;
        if ($kv[0] === 't') $t = $kv[1];
        if ($kv[0] === 'v1') $sigs[] = $kv[1];
    }
    if ($t === null || !$sigs) throw new StoreError('signature', 400);
    if (!ctype_digit($t) || abs(time() - (int) $t) > $tolerance) throw new StoreError('signature', 400);

    $expected = hash_hmac('sha256', $t . '.' . $payload, $secret);
    $ok = false;
    foreach ($sigs as $s) { if (hash_equals($expected, $s)) $ok = true; }
    if (!$ok) throw new StoreError('signature', 400);

    $event = json_decode($payload, true);
    if (!is_array($event) || empty($event['id'])) throw new StoreError('signature', 400);
    return $event;
}

/* Tag for the Dashboard's integration comparison; the 8 random letters are
 * required by the parameter's own convention. */
function stripe_integration_identifier(): string {
    $s = '';
    for ($i = 0; $i < 8; $i++) $s .= chr(random_int(97, 122));
    return 'retrovault-' . $s;
}
