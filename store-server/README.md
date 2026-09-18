# Retro Vault store — selling homebrew through the Vault

A buyer pays on Lemon Squeezy and gets a **license key** by email. On the game's
page in the Vault they click *I have a license key*, paste it, and the game
unlocks in that browser. There are no accounts. The ROM is never a public file:
this folder's `api.php` checks the key with Lemon Squeezy each time, then sends
the ROM **stamped with the buyer's order**.

What this does and doesn't do:

* **Stops casual sharing.** A key works on a limited number of devices (you
  set the limit in Lemon Squeezy). Forwarding the key uses up a slot, and a
  refunded or disabled key stops working within 10 minutes.
* **Makes copies traceable.** Every copy (played or downloaded) carries the
  order number and a code only this server can generate:
  `python3 tools/store_prepare.py trace <file>` shows them.
* **Can't make a ROM uncopyable.** The emulator runs in the browser, so
  someone determined can always extract the bytes. No web emulator can
  prevent that.

## How the stamp goes in (per format, all done by the server)

| File | Method | What changes |
| --- | --- | --- |
| Videopac `.bin`, C64 `.crt` | `fill` | 32 unused filler bytes are overwritten with `RV#<order>/<code>`. File size stays exactly the same (o2em picks the bank layout from the size). |
| C64 `.prg` | `prg_append` | A few bytes after the program. Refused for programs that load past `$A000`. |
| C64 `.d64` | `d64_dir` | A 0-block `LIC <BUYER NAME>` entry after the last file in the directory. It shows in the disk listing and is never loaded. |
| MS-DOS `.zip` | `zip_file` | `LICENSE.TXT` with name, order and code. |
| Amiga `.adf`, anything else | `none` | No in-file stamp. The key and device limit still apply. |

The game's author doesn't need to do anything. Putting the buyer's name on
the game's own title screen would need the author's help, and it's optional.

## One-time setup

### 1. Lemon Squeezy

1. Create a store (lemonsqueezy.com). Lemon Squeezy is the merchant of record,
   so it handles EU VAT/OSS and invoices.
2. **Settings → Stores**: note the store's **ID** (a number).
3. For each game, create a **Product** with **license keys enabled**:
   * Activation limit: **10**. Slots are consumed per browser *and* per
     origin, not per person: `demo.retrovault.world` and a downloaded Vault
     are two, a second browser on the same machine is a third, and a buyer
     who clears site data loses the saved instance and re-activates into a
     fresh slot. 5 runs out on honest buyers; 10 still stops a key from
     serving a whole forum, and the per-order stamp is what actually deters
     sharing. Raising it later does not help keys already issued, so be
     generous from the start.
   * License length: unlimited.
   * Note the product's **ID**.
4. Copy the product's **checkout link** (Share → *Checkout URL*).
5. Optional: set the confirmation email's button to point back at the
   game's page (`https://demo.retrovault.world/game.html?id=<id>`).

### 2. The server (Hostinger)

Upload this whole `store-server/` folder to `public_html/store/`, so that
`https://retrovault.world/store/api.php` exists. Then:

1. Copy `config.sample.php` to `config.php` (on the server only, never in
   git) and fill in `store_id` and a `stamp_secret`. Generate the secret once,
   with `php -r 'echo bin2hex(random_bytes(32));'` or any password generator.
   **Keep it forever.** Old copies can only be verified with the same secret.
2. Put each game's ROM in `store/private/`. The folder's `.htaccess` blocks
   web access. To be extra safe, point `rom_dir` at a folder outside
   `public_html` instead.
3. Check it: opening `https://retrovault.world/store/api.php` in a browser
   should show `{"ok":false,"reason":"method"}`, and
   `https://retrovault.world/store/private/<rom>` should give **403**.

Hostinger's standard PHP (8.x) has everything this needs (curl, zip, iconv).

## Adding a game to the store

1. **Author agreement first:** price, revenue split, and whether a download
   is OK. Remove the game from `downloads.js` and `hosted.js` (and from
   `homebrew-downloads/` / the hosted folder) if it was ever there for free.
2. Prepare the file on your Mac:

       python3 tools/store_prepare.py prepare "path/to/Game.bin"

   It prints the `'stamp' => [...]` line and writes `Game.stamptest.bin`.
   **Boot that test copy** in your local Vault. Rename it to the game's
   `romFile` name in `emulator/roms/`, play for a minute, then put the
   original back. If it plays exactly like the original, go ahead. If not,
   use `'stamp' => ['method' => 'none']`.
3. Upload the **original** ROM to `store/private/`.
4. Add the product to `config.php`:

       'new_example' => [
           'product_id' => '123456',
           'file' => 'Example Game.bin',
           'stamp' => ['method' => 'fill', 'offset' => 1234, 'length' => 32, 'filler' => 255],
       ],

5. Add the game to `store.js` in the Vault repo (price, checkout link,
   author), commit and push:

       "new_example": { price: "€4.99", checkout: "https://….lemonsqueezy.com/buy/…", author: "Author Name" },

6. Test with a Lemon Squeezy **test-mode** order: unlock, START, Download,
   *Remove from this device*.

## When a copy turns up somewhere

    python3 tools/store_prepare.py trace "found.bin"
    # order 1234, code 9F2A11C0 (in the file bytes)

Look up the order in Lemon Squeezy (Orders → search). To confirm the code
is genuine, add `--secret <stamp_secret> --license-id <license key id>`.
The license key ID is on the order's license key page. From there you
can disable the key.

## The endpoint

`api.php` takes form-encoded POSTs (so browsers send them without a CORS
preflight). Only origins in `allowed_origins`, plus any `localhost` port
when `allow_localhost` is on, get CORS headers.

| action | fields | reply |
| --- | --- | --- |
| `activate` | `game`, `key`, `device` | `{ok, instance, name, order, code, usage, limit}` |
| `rom` | `game`, `key`, `instance`, `download?` | the stamped ROM |
| `deactivate` | `game`, `key`, `instance` | `{ok}` |

Errors come back as `{ok:false, reason}` with one of these reasons:
`invalid`, `limit`, `wrong-product`, `revoked`, `slow-down`,
`unknown-game`, `missing-file`, `config`, `upstream`, `server`. A key is
only accepted when Lemon Squeezy reports **this store's ID and this game's
product ID**, so a key for any other product never unlocks anything. Per-IP
limits: 20 activations/removals and 60 ROM fetches per 10 minutes. A
successful check is cached for 10 minutes in `cache/`.
