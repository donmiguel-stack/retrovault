<?php
/* Retro Vault store - Stripe webhook. This is where a sale becomes a licence.
 *
 * Endpoint: https://retrovault.world/store/webhook.php
 * Events to subscribe to:
 *     checkout.session.completed
 *     checkout.session.async_payment_succeeded
 *     checkout.session.async_payment_failed
 *     charge.refunded
 *     charge.dispute.created
 *
 * Why not the success page: a buyer who pays and then closes the tab, loses
 * their connection, or is redirected by their bank never loads it. Stripe
 * delivers this event regardless, and retries until we answer 2xx.
 * https://docs.stripe.com/checkout/fulfillment */

declare(strict_types=1);
require __DIR__ . '/lib.php';
require __DIR__ . '/lib_stripe.php';
require __DIR__ . '/lib_license.php';
require __DIR__ . '/lib_mail.php';
$cfg = require __DIR__ . '/config.php';

$payload = (string) file_get_contents('php://input');
$sig = (string) ($_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '');

try {
    /* Verify before trusting a single byte of it: this endpoint is public,
     * and anything that reaches it is a stranger until the signature says
     * otherwise. */
    $event = stripe_verify_webhook($payload, $sig, (string) $cfg['stripe_webhook_secret']);
} catch (StoreError $e) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'reason' => 'signature']);
    exit;
}

try {
    $db = license_db($cfg);

    /* Idempotency. Stripe can deliver the same event twice; without this a
     * retry would mint a second key for one sale. */
    $seen = $db->prepare('INSERT OR IGNORE INTO seen_events (id, type, created_at) VALUES (?,?,?)');
    $seen->execute([$event['id'], $event['type'] ?? '', time()]);
    if ($seen->rowCount() === 0) {
        echo json_encode(['ok' => true, 'duplicate' => true]);
        exit;
    }

    $obj = $event['data']['object'] ?? [];

    switch ($event['type'] ?? '') {

        case 'checkout.session.completed':
        case 'checkout.session.async_payment_succeeded':
            /* With a delayed method (iDEAL, bank transfer) the completed
             * event arrives while the session is still unpaid. Fulfilling on
             * it would hand out a key for a payment that may never settle;
             * the async_payment_succeeded event is the one that does settle. */
            if (($obj['payment_status'] ?? '') === 'unpaid') {
                echo json_encode(['ok' => true, 'pending' => true]);
                exit;
            }
            $game = (string) ($obj['metadata']['game'] ?? $obj['client_reference_id'] ?? '');
            if ($game === '' || !isset($cfg['products'][$game])) {
                error_log('vault webhook: paid session for unknown game: ' . $game);
                echo json_encode(['ok' => true, 'ignored' => true]);
                exit;
            }
            $row = license_mint($cfg, [
                'game' => $game,
                'email' => (string) ($obj['customer_details']['email'] ?? ''),
                'name' => (string) ($obj['customer_details']['name'] ?? ''),
                'checkout_session' => (string) ($obj['id'] ?? ''),
                'payment_intent' => (string) ($obj['payment_intent'] ?? ''),
                'amount_total' => (int) ($obj['amount_total'] ?? 0),
                'currency' => (string) ($obj['currency'] ?? ''),
            ]);
            if (!$row) throw new RuntimeException('mint failed for ' . ($obj['id'] ?? '?'));

            /* Mail failure must not fail the webhook: the key exists, the
             * success page shows it, and a failed send is a support email,
             * not a lost sale. */
            if (empty($row['mailed_at'])) {
                if (mail_license($cfg, $row)) {
                    $db->prepare('UPDATE licenses SET mailed_at = ? WHERE id = ?')
                       ->execute([time(), (int) $row['id']]);
                } else {
                    error_log('vault webhook: licence ' . $row['id'] . ' minted but mail failed');
                }
            }
            break;

        case 'checkout.session.async_payment_failed':
            error_log('vault webhook: async payment failed for ' . ($obj['id'] ?? '?'));
            break;

        case 'charge.refunded':
            /* Partial refunds are not a revocation. */
            if ((int) ($obj['amount_refunded'] ?? 0) >= (int) ($obj['amount'] ?? 0)) {
                $n = license_revoke_by_payment_intent($cfg, (string) ($obj['payment_intent'] ?? ''), 'refunded');
                error_log('vault webhook: refunded, revoked ' . $n . ' licence(s)');
            }
            break;

        case 'charge.dispute.created':
            $n = license_revoke_by_payment_intent($cfg, (string) ($obj['payment_intent'] ?? ''), 'disputed');
            error_log('vault webhook: dispute, revoked ' . $n . ' licence(s)');
            break;
    }

    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    /* 500 asks Stripe to retry, which is what we want for a transient
     * database or mail-server problem. */
    error_log('vault webhook: ' . $e);
    http_response_code(500);
    echo json_encode(['ok' => false]);
}
