<?php
/* Retro Vault store - start a purchase.
 *
 *   GET|POST /store/checkout.php?game=<games.js id>
 *       -> 303 redirect to Stripe's hosted Checkout page
 *
 * Everything the buyer types (card, address, VAT number) is typed on
 * Stripe's page, never on ours, which is the point of using Checkout.
 *
 * Fulfilment does NOT happen here or on the success page - see webhook.php.
 * https://docs.stripe.com/checkout/fulfillment */

declare(strict_types=1);
require __DIR__ . '/lib.php';
require __DIR__ . '/lib_stripe.php';
$cfg = require __DIR__ . '/config.php';

function fail(string $reason, int $code): never {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'reason' => $reason]);
    exit;
}

try {
    $game = (string) ($_GET['game'] ?? $_POST['game'] ?? '');
    $product = $cfg['products'][$game] ?? null;
    if (!$product || empty($product['price_id'])) fail('unknown-game', 404);

    rate_limit($cfg, 'checkout', 30, 600);

    $base = rtrim((string) $cfg['site_base'], '/');
    $gamePage = (string) ($product['game_url'] ?? ($cfg['game_url_base'] ?? '') . rawurlencode($game));

    $params = [
        'mode' => 'payment',
        'line_items' => [['price' => $product['price_id'], 'quantity' => 1]],

        /* Stripe Tax. It calculates nothing unless there is an active
         * registration for the buyer's country - see README, "Tax". */
        'automatic_tax' => ['enabled' => 'true'],

        /* A business buyer with a valid VAT number gets reverse charge
         * instead of being charged VAT they would only reclaim. */
        'tax_id_collection' => ['enabled' => 'true'],

        /* Both of these come back on the webhook event; metadata.game is
         * what tells us which licence to mint. */
        'client_reference_id' => $game,
        'metadata' => ['game' => $game],

        'success_url' => $base . '/store/thanks.php?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url'  => $gamePage,

        'integration_identifier' => stripe_integration_identifier(),
    ];
    /* No payment_method_types anywhere: leaving it out is what enables
     * dynamic payment methods (iDEAL, Bancontact, cards, wallets), managed
     * from the Dashboard rather than from this file. */

    if (!empty($cfg['locale'])) $params['locale'] = $cfg['locale'];

    $session = stripe_call($cfg, 'POST', '/v1/checkout/sessions', $params);
    if (empty($session['url'])) fail('upstream', 502);

    header('Location: ' . $session['url'], true, 303);
    exit;
} catch (StoreError $e) {
    fail($e->getMessage(), $e->http);
} catch (Throwable $e) {
    error_log('vault checkout: ' . $e);
    fail('server', 500);
}
