<?php
/* Copy to config.php on the server and fill in. config.php is gitignored -
 * it holds the Stripe keys and the stamp secret, which must never be public.
 *
 * Sandbox and live are separate files with separate keys: never point a
 * sandbox key at the live database or the other way round. */

return [
    /* ------------------------------------------------------------ Stripe */

    // Restricted key (rk_...), NOT a secret key (sk_...). Permissions needed:
    //   Checkout Sessions  write
    //   Products, Prices   read
    //   Tax calculations   read
    // Nothing else. Dashboard -> Developers -> API keys -> Restricted keys.
    'stripe_secret_key' => 'rk_test_CHANGE-ME',

    // Dashboard -> Developers -> Webhooks -> your endpoint -> signing secret.
    // Different in sandbox and live. webhook.php refuses anything that does
    // not carry a signature made with this.
    'stripe_webhook_secret' => 'whsec_CHANGE-ME',

    // Where this store lives; used to build the success URL.
    'site_base' => 'https://retrovault.world',

    // Where a game's page lives, minus the id. Used for the cancel URL, the
    // "go and play" link and the email.
    'game_url_base' => 'https://demo.retrovault.world/game/',

    // Optional: Checkout's language. 'auto' follows the buyer's browser.
    'locale' => 'auto',

    /* ---------------------------------------------------------- licences */

    // SQLite file holding licences and device activations. Put it OUTSIDE
    // public_html if the plan allows it; private/ is blocked by .htaccess.
    'db_path' => __DIR__ . '/private/licenses.sqlite',

    // Device slots per key. Slots go per browser AND per origin - the online
    // Vault and a downloaded Vault are two - so 5 runs out on honest buyers.
    // Raising this later does not help keys already issued.
    'activation_limit' => 10,

    // Any long random string. Generate once, keep it forever, never change
    // it - it turns an order into the code stamped in each copy, so changing
    // it means copies already sold can no longer be traced.
    //   php -r 'echo bin2hex(random_bytes(32)), "\n";'
    'stamp_secret' => 'CHANGE-ME',

    /* ------------------------------------------------------------- mail */

    'mail_from' => 'hq@retrovault.world',
    'mail_from_name' => 'Retro Vault',

    /* ------------------------------------------------------------- files */

    // Where the paid ROMs live. Outside public_html is best; the default
    // private/ folder next to this file is locked by its own .htaccess.
    'rom_dir' => __DIR__ . '/private',

    // Pages allowed to call api.php. Local installs (serve.py on
    // localhost:8000-8020) are allowed by allow_localhost.
    'allowed_origins' => [
        'https://demo.retrovault.world',
        'https://retrovault.world',
    ],
    'allow_localhost' => true,

    /* ---------------------------------------------------------- products */

    // One entry per game on sale, keyed by the Vault's games.js id.
    //   price_id    Stripe Price id (Dashboard -> product -> pricing)
    //               The Product carries the tax code; the Price carries
    //               tax_behavior: inclusive (European prices include VAT).
    //   title       shown on the thank-you page and in the email
    //   file        filename inside rom_dir
    //   stamp       paste what tools/store_prepare.py prints for this file
    'products' => [
        // 'new_example' => [
        //     'price_id' => 'price_1234567890',
        //     'title' => 'Example Game',
        //     'file' => 'Example Game.bin',
        //     'stamp' => ['method' => 'fill', 'offset' => 1234, 'length' => 32, 'filler' => 255],
        // ],
    ],
];
