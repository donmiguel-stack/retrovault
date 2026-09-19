<?php
/* Retro Vault store - the "here is your key" email.
 *
 * PHP's mail() goes out through Hostinger's local MTA, which is fine for a
 * handful of transactional mails a day from a domain whose SPF/DKIM already
 * cover it. If deliverability ever misbehaves, replace the body of
 * mail_send() with an SMTP call - nothing else here needs to change. */

declare(strict_types=1);

function mail_license(array $cfg, array $row): bool {
    $to = trim((string) ($row['email'] ?? ''));
    if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) return false;

    $title = (string) ($cfg['products'][$row['game']]['title'] ?? $row['game']);
    $page = (string) ($cfg['products'][$row['game']]['game_url']
                      ?? (($cfg['game_url_base'] ?? '') . rawurlencode((string) $row['game'])));
    $key = (string) $row['key'];
    $limit = (int) $row['activation_limit'];
    $name = trim((string) ($row['name'] ?? ''));
    $hello = $name !== '' ? 'Hi ' . $name . ',' : 'Hi,';

    $subject = 'Your Retro Vault key for ' . $title;
    $body = <<<TXT
$hello

Thank you for buying $title through Retro Vault. Here is your licence key:

    $key

To play: open the game's page, click "I have a licence key", and paste it in.

    $page

The key works on up to $limit of your own browsers and machines — the online
Vault and a downloaded Vault each count as one. If you run out of room, use
"Remove from this device" on a machine you no longer use, or reply to this
email and we will reset it for you.

You can also download your own copy of the game from that page and keep it.

Every copy carries a code tied to this order. It does not change how the game
plays; it is there so a copy that turns up on a ROM site can be traced.

Questions, or anything not working — just reply.

Retro Vault
https://retrovault.world
TXT;

    return mail_send($cfg, $to, $subject, $body);
}

function mail_send(array $cfg, string $to, string $subject, string $body): bool {
    $from = (string) ($cfg['mail_from'] ?? 'hq@retrovault.world');
    $name = (string) ($cfg['mail_from_name'] ?? 'Retro Vault');

    $headers = [
        'From: ' . mail_encode_name($name) . ' <' . $from . '>',
        'Reply-To: ' . $from,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'MIME-Version: 1.0',
        'X-Mailer: retrovault-store',
    ];
    /* -f sets the envelope sender, which is what SPF is checked against. */
    return @mail($to, mail_encode_name($subject), $body, implode("\r\n", $headers), '-f' . $from);
}

/* RFC 2047 for anything non-ASCII in a header (game titles have accents). */
function mail_encode_name(string $s): string {
    if (preg_match('/^[\x20-\x7E]*$/', $s)) return $s;
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}
