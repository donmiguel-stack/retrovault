# Retro Vault store — Stripe build

A buyer pays on Stripe Checkout and gets a **licence key** by email. On the
game's page in the Vault they click *I have a licence key*, paste it, and the
game unlocks in that browser. There are no accounts. The ROM is never a public
file: `api.php` checks the key, then sends the ROM **stamped with the buyer's
order**.

This is the Stripe version of the store built on 16 September against Lemon
Squeezy. `api.php`, `store.js`, the emulator and the stamping are the same; the
four `license_*` functions behind them moved from Lemon Squeezy's API to our own
SQLite file, because **Stripe has no licensing API**.

What this does and doesn't do:

* **Stops casual sharing.** A key works on a limited number of devices (set by
  `activation_limit` here, not in Stripe). Forwarding the key uses up a slot,
  and a refunded or disputed key stops working the moment the webhook lands.
* **Makes copies traceable.** Every copy (played or downloaded) carries the
  order number and a code only this server can generate:
  `python3 tools/store_prepare.py trace <file>` shows them.
* **Can't make a ROM uncopyable.** The emulator runs in the browser, so someone
  determined can always extract the bytes. No web emulator can prevent that.

## The files

| File | What it is |
| --- | --- |
| `checkout.php` | Buy button target. Creates a Checkout Session, redirects to Stripe. |
| `webhook.php` | **Where a sale becomes a licence.** Verifies the signature, mints the key, mails it, revokes on refund. |
| `thanks.php` | The page after paying. Only *reads* what the webhook wrote. |
| `api.php` | Unchanged from the Lemon Squeezy build except three lines. activate / rom / deactivate. |
| `lib_license.php` | Keys, device slots, revocation. The SQLite schema lives here. |
| `lib_stripe.php` | ~90 lines of cURL + webhook signature verification. No SDK, no Composer. |
| `lib_mail.php` | The "here is your key" email. |
| `lib.php` | The per-buyer stamp, the cache, the rate limiter. |
| `tests/` | A mock Stripe and a 48-check end-to-end run. See the bottom of this file. |

## Why fulfilment is in the webhook

Because a buyer who pays and then closes the tab, loses their connection, or is
bounced back by their bank never loads the success page. Stripe delivers
`checkout.session.completed` regardless and retries until it gets a 2xx.
`thanks.php` only displays what the webhook already wrote, and polls while it is
still in flight. Never move minting into `thanks.php`.

With a delayed payment method (iDEAL, bank transfer) `checkout.session.completed`
arrives while the session is still **unpaid**; the money may never come. That is
why the handler ignores unpaid sessions and mints on
`checkout.session.async_payment_succeeded` instead.

## One-time setup

### 1. Stripe

Work in a **sandbox** first — never develop against live mode.

1. Create the account, then a sandbox (Dashboard → top-left environment picker,
   or `stripe sandbox create --email <you>` with the Stripe CLI).
2. For each game, create a **Product** (its `tax_code` is the tax setting that
   matters) with one **Price** in EUR and `tax_behavior: inclusive` — European
   shop prices include VAT, so €6.99 means €6.99 in every country. Note the
   **Price id** (`price_...`), which is what goes in `config.php`.
3. **Developers → API keys → Restricted keys.** Create a restricted key
   (`rk_...`), not a secret key. It needs: Checkout Sessions **write**;
   Products, Prices **read**; Tax calculations **read**. Nothing else.
4. **Developers → Webhooks → Add endpoint**:
   `https://retrovault.world/store/webhook.php`, subscribed to
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
   `checkout.session.async_payment_failed`, `charge.refunded`,
   `charge.dispute.created`. Copy the **signing secret** (`whsec_...`).
   Sandbox and live have different secrets.
5. **Payment methods** are configured in the Dashboard, not in this code:
   `checkout.php` deliberately passes no `payment_method_types`, which is what
   lets Stripe show cards, iDEAL, Bancontact and wallets as appropriate. iDEAL
   is worth enabling — it is a flat fee and Dutch buyers expect it.

### 2. Tax

Read this part twice. **Stripe Tax collects nothing in a country where you have
no active registration, and it does not raise an error** — you would see
`automatic_tax: enabled` and assume it was working while collecting zero, and
past transactions cannot be corrected retroactively.

1. Dashboard → **Tax → Settings**: set the head office address. Until it is set,
   the status stays `pending` and nothing is calculated.
2. Dashboard → **Tax → Locations**: add a registration for every country where
   you are obliged to collect. For an EU seller of digital goods that usually
   means a domestic registration plus **Union OSS** for cross-border B2C —
   which is one registration and one return rather than 27. Adding a
   registration in Stripe only *records* that you are registered; you still
   register with the tax authority yourself.
3. Registrations made in a sandbox exist only in that sandbox. Add the live ones
   **before the first real sale**.
4. Stripe Tax calculates and reports. It does **not** file returns outside the
   US — that is a filing partner or your accountant.
5. Test it: a Checkout Session for a buyer in another EU country should show
   that country's VAT. If the tax is zero, retrieve the session with
   `expand[]=line_items.data.taxes` and read `taxability_reason`.
   `not_collecting` means a missing registration or a Nontaxable product tax
   code — not a code bug.

Product tax codes must come from Stripe's own list
(<https://docs.stripe.com/tax/tax-codes>), never from memory or a guess. Pick
the one for your product with your accountant.

### 3. The server (Hostinger)

Upload this whole folder to `public_html/store/`, so that
`https://retrovault.world/store/api.php` exists. Then:

1. Copy `config.sample.php` to `config.php` (on the server only, never in git)
   and fill in `stripe_secret_key`, `stripe_webhook_secret`, `stamp_secret` and
   the `products` map. **Generate the stamp secret once and keep it forever** —
   copies already sold can only be traced with the same secret.
2. Put each game's ROM in `private/`. Its `.htaccess` blocks web access. Better
   still, point `rom_dir` and `db_path` at a folder outside `public_html`.
3. The SQLite file is created on first use. Its folder must be writable by PHP.
4. Check it:
   * `https://retrovault.world/store/api.php` → `{"ok":false,"reason":"method"}`
   * `https://retrovault.world/store/private/<rom>` → **403**
   * `https://retrovault.world/store/lib_license.php` → **403** (only the four
     entry points are reachable; that is what this folder's `.htaccess` does)
   * a test purchase → key on screen, key in your inbox, game starts
5. Back up `licenses.sqlite`. It is the only record of who bought what. A nightly
   copy is enough; it is a small file.

Hostinger's PHP 8.x has everything this needs: `curl`, `pdo_sqlite`, `zip`,
`iconv`, `hash_hmac`.

## Adding a game to the store

1. **Author agreement first:** price, revenue split, and whether a download is
   OK. Remove the game from `downloads.js` / `hosted.js` (and from
   `homebrew-downloads/`) if it was ever there for free.
2. Create the Stripe Product + Price.
3. Prepare the file:

       python3 tools/store_prepare.py prepare "path/to/Game.bin"

   It prints the `'stamp' => [...]` line and writes `Game.stamptest.bin`.
   **Boot that test copy** before going further.
4. Add the `config.php` entry (`price_id`, `title`, `file`, `stamp`) and the
   `store.js` entry, then buy it yourself in the sandbox.

## Going live

* Live-mode tax registrations **before** the first real sale.
* Live restricted key and the live webhook signing secret in `config.php`.
* The sandbox database is test data — start live with an empty one, or delete
  the sandbox rows.
* Stripe's own checklist: <https://docs.stripe.com/get-started/checklist/go-live>

## Tests

`tests/` has a mock Stripe and a 48-check end-to-end run: session parameters,
signature verification (forged, wrong secret, stale timestamp), idempotent
replay, delayed payments, key minting, the thank-you page, activation slots and
the limit, sloppily retyped keys, cross-game keys, the stamped ROM, refunds,
disputes, partial refunds, and CORS.

    cd store-server-stripe
    cp tests/* .              # or run from the folder, paths are relative
    python3 mock_stripe.py &                       # pretend Stripe on :9011
    php -S 127.0.0.1:9010 -t . &                   # the store on :9010
    # config.php must point stripe_base at http://127.0.0.1:9011
    python3 test_flow.py

It writes a throwaway SQLite file in `private/`. Delete `cache/` between runs or
the rate limiter (20 activations per IP per 10 minutes — the real one, doing its
job) will trip.
