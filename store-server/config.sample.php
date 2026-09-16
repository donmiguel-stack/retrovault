<?php
/* Copy to config.php on the server and fill in. config.php is gitignored -
 * it holds the stamp secret, which must never be public. */
return [
    // Lemon Squeezy: Settings -> Stores -> your store's ID (a number)
    'store_id' => '000000',

    // Any long random string. Generate once, keep it, never change it -
    // it's what turns an order into the code stamped in each copy, so
    // changing it means old copies can no longer be traced.
    //   php -r 'echo bin2hex(random_bytes(32)), "\n";'
    'stamp_secret' => 'CHANGE-ME',

    // Where the paid ROMs live. Outside public_html is best; the default
    // private/ folder next to this file is locked by its own .htaccess.
    'rom_dir' => __DIR__ . '/private',

    // Pages allowed to call this endpoint. Local installs (serve.py on
    // localhost:8000-8020) are allowed by allow_localhost.
    'allowed_origins' => [
        'https://demo.retrovault.world',
        'https://retrovault.world',
    ],
    'allow_localhost' => true,

    'validate_cache_seconds' => 600,

    // One entry per game on sale, keyed by the Vault's games.js id.
    //   product_id  Lemon Squeezy product ID (Products -> the product -> ID)
    //   file        filename inside rom_dir
    //   stamp       paste what tools/store_prepare.py prints for this file
    'products' => [
        // 'new_example' => [
        //     'product_id' => '123456',
        //     'file' => 'Example Game.bin',
        //     'stamp' => ['method' => 'fill', 'offset' => 1234, 'length' => 32, 'filler' => 255],
        // ],
    ],
];
