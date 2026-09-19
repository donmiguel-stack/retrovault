<?php
/* Retro Vault store - licences, kept by us.
 *
 * Lemon Squeezy generated keys, mailed them and counted device slots. Stripe
 * has no licensing API, so this file is that part: a SQLite file holding one
 * row per sale and one per activated device. It exposes exactly the four
 * functions api.php already calls (license_activate / license_validate /
 * license_deactivate / stamp_info), in the same shape, so api.php, store.js
 * and the emulator did not change when the store moved to Stripe.
 *
 * The database lives outside public_html. It is small: a row per sale. */

declare(strict_types=1);

/* Crockford base32: no I, L, O or U, so a buyer retyping a key from an email
 * cannot turn O into 0 or l into 1. normalise_key() folds the confusable
 * characters back the way Crockford specifies. */
const KEY_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function license_db(array $cfg): PDO {
    static $db = null;
    if ($db instanceof PDO) return $db;

    $path = (string) ($cfg['db_path'] ?? (__DIR__ . '/private/licenses.sqlite'));
    $dir = dirname($path);
    if (!is_dir($dir)) @mkdir($dir, 0700, true);

    $db = new PDO('sqlite:' . $path, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 10,
    ]);
    $db->exec('PRAGMA journal_mode = WAL');
    $db->exec('PRAGMA busy_timeout = 10000');
    $db->exec('PRAGMA foreign_keys = ON');

    $db->exec("CREATE TABLE IF NOT EXISTS licenses (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        key              TEXT    NOT NULL UNIQUE,
        game             TEXT    NOT NULL,
        status           TEXT    NOT NULL DEFAULT 'active',
        email            TEXT    NOT NULL DEFAULT '',
        name             TEXT    NOT NULL DEFAULT '',
        checkout_session TEXT    NOT NULL DEFAULT '',
        payment_intent   TEXT    NOT NULL DEFAULT '',
        amount_total     INTEGER NOT NULL DEFAULT 0,
        currency         TEXT    NOT NULL DEFAULT '',
        activation_limit INTEGER NOT NULL DEFAULT 10,
        created_at       INTEGER NOT NULL,
        mailed_at        INTEGER
    )");
    $db->exec("CREATE UNIQUE INDEX IF NOT EXISTS licenses_session ON licenses(checkout_session)
               WHERE checkout_session <> ''");
    $db->exec("CREATE INDEX IF NOT EXISTS licenses_pi ON licenses(payment_intent)");

    $db->exec("CREATE TABLE IF NOT EXISTS activations (
        instance   TEXT PRIMARY KEY,
        license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
        device     TEXT NOT NULL DEFAULT '',
        origin     TEXT NOT NULL DEFAULT '',
        created_at INTEGER NOT NULL,
        last_seen  INTEGER NOT NULL
    )");
    $db->exec("CREATE INDEX IF NOT EXISTS activations_license ON activations(license_id)");

    /* Stripe retries a webhook until it gets a 2xx, and can deliver the same
     * event more than once regardless. One row per event id is what stops a
     * retry minting a second key for the same sale. */
    $db->exec("CREATE TABLE IF NOT EXISTS seen_events (
        id         TEXT PRIMARY KEY,
        type       TEXT NOT NULL DEFAULT '',
        created_at INTEGER NOT NULL
    )");

    return $db;
}

/* ------------------------------------------------------------------ keys */

function license_generate_key(): string {
    $groups = [];
    for ($g = 0; $g < 4; $g++) {
        $s = '';
        for ($i = 0; $i < 4; $i++) $s .= KEY_ALPHABET[random_int(0, strlen(KEY_ALPHABET) - 1)];
        $groups[] = $s;
    }
    return 'RV-' . implode('-', $groups);
}

/* Buyers retype these out of an email, so accept the near misses: any case,
 * any or no separators, and the Crockford letter/digit confusions. */
function normalise_key(string $key): string {
    $k = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $key) ?? '');
    $k = strtr($k, ['O' => '0', 'I' => '1', 'L' => '1', 'U' => 'V']);
    if (str_starts_with($k, 'RV')) $k = substr($k, 2);
    if (strlen($k) !== 16) return '';
    return 'RV-' . implode('-', str_split($k, 4));
}

/* ------------------------------------------------------- minting a licence */

/* Called from the webhook once a Checkout Session is actually paid.
 * Idempotent on the Checkout Session id: a replayed event returns the row
 * that already exists rather than issuing a second key for one sale. */
function license_mint(array $cfg, array $sale): array {
    $db = license_db($cfg);

    $existing = $db->prepare('SELECT * FROM licenses WHERE checkout_session = ?');
    $existing->execute([$sale['checkout_session']]);
    if ($row = $existing->fetch()) return $row;

    $limit = (int) ($cfg['activation_limit'] ?? 10);
    for ($try = 0; $try < 5; $try++) {
        $key = license_generate_key();
        try {
            $st = $db->prepare('INSERT INTO licenses
                (key, game, email, name, checkout_session, payment_intent,
                 amount_total, currency, activation_limit, created_at)
                VALUES (?,?,?,?,?,?,?,?,?,?)');
            $st->execute([
                $key, $sale['game'], $sale['email'] ?? '', $sale['name'] ?? '',
                $sale['checkout_session'], $sale['payment_intent'] ?? '',
                (int) ($sale['amount_total'] ?? 0), $sale['currency'] ?? '',
                $limit, time(),
            ]);
            break;
        } catch (PDOException $e) {
            /* UNIQUE on key: astronomically unlikely, but retry rather than
             * fail a paid order. UNIQUE on checkout_session: a concurrent
             * delivery of the same event won the race - return its row. */
            $existing->execute([$sale['checkout_session']]);
            if ($row = $existing->fetch()) return $row;
            if ($try === 4) throw $e;
        }
    }
    $existing->execute([$sale['checkout_session']]);
    return $existing->fetch() ?: [];
}

function license_revoke_by_payment_intent(array $cfg, string $pi, string $why = 'revoked'): int {
    if ($pi === '') return 0;
    $db = license_db($cfg);
    $st = $db->prepare("UPDATE licenses SET status = ? WHERE payment_intent = ? AND status = 'active'");
    $st->execute([$why, $pi]);
    return $st->rowCount();
}

/* --------------------------------------- the four functions api.php calls */

/* The return shape mirrors what Lemon Squeezy's API used to hand back, so
 * api.php and stamp_info() below are unchanged from the LS build. */
function license_row_result(array $row, ?array $instance, int $usage): array {
    return [
        'license_key' => [
            'id' => (string) $row['id'],
            'status' => $row['status'],
            'activation_usage' => $usage,
            'activation_limit' => (int) $row['activation_limit'],
        ],
        'instance' => $instance ? ['id' => $instance['instance'], 'name' => $instance['device']] : null,
        'meta' => [
            'order_id' => (string) $row['id'],
            'customer_name' => (string) $row['name'],
            'game' => (string) $row['game'],
        ],
    ];
}

function license_lookup(array $cfg, array $product, string $key): array {
    $norm = normalise_key($key);
    if ($norm === '') throw new StoreError('invalid', 403);

    $db = license_db($cfg);
    $st = $db->prepare('SELECT * FROM licenses WHERE key = ?');
    $st->execute([$norm]);
    $row = $st->fetch();
    if (!$row) throw new StoreError('invalid', 403);
    if ($row['status'] !== 'active') throw new StoreError('revoked', 403);
    /* A key for another game must not open this one. */
    if (!empty($product['game_id']) && $row['game'] !== $product['game_id']) {
        throw new StoreError('wrong-product', 403);
    }
    return $row;
}

function license_usage(PDO $db, int $licenseId): int {
    $st = $db->prepare('SELECT COUNT(*) c FROM activations WHERE license_id = ?');
    $st->execute([$licenseId]);
    return (int) ($st->fetch()['c'] ?? 0);
}

function license_activate(array $cfg, array $product, string $key, string $device): array {
    $db = license_db($cfg);
    $row = license_lookup($cfg, $product, $key);

    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    $limit = (int) $row['activation_limit'];

    $db->beginTransaction();
    try {
        if (license_usage($db, (int) $row['id']) >= $limit) {
            $db->rollBack();
            throw new StoreError('limit', 403);
        }
        $instance = bin2hex(random_bytes(16));
        $st = $db->prepare('INSERT INTO activations (instance, license_id, device, origin, created_at, last_seen)
                            VALUES (?,?,?,?,?,?)');
        $st->execute([$instance, (int) $row['id'], $device, $origin, time(), time()]);
        $db->commit();
    } catch (StoreError $e) {
        throw $e;
    } catch (Throwable $e) {
        if ($db->inTransaction()) $db->rollBack();
        throw $e;
    }

    return license_row_result($row, ['instance' => $instance, 'device' => $device],
                              license_usage($db, (int) $row['id']));
}

function license_validate(array $cfg, array $product, string $key, string $instance): array {
    $db = license_db($cfg);
    $row = license_lookup($cfg, $product, $key);

    $st = $db->prepare('SELECT * FROM activations WHERE instance = ? AND license_id = ?');
    $st->execute([$instance, (int) $row['id']]);
    $act = $st->fetch();
    if (!$act) throw new StoreError('invalid', 403);

    $db->prepare('UPDATE activations SET last_seen = ? WHERE instance = ?')
       ->execute([time(), $instance]);

    return license_row_result($row, $act, license_usage($db, (int) $row['id']));
}

function license_deactivate(array $cfg, array $product, string $key, string $instance): void {
    $db = license_db($cfg);
    $row = license_lookup($cfg, $product, $key);
    $st = $db->prepare('DELETE FROM activations WHERE instance = ? AND license_id = ?');
    $st->execute([$instance, (int) $row['id']]);
    if ($st->rowCount() === 0) throw new StoreError('invalid', 403);
}
