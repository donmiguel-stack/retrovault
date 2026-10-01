# teletext-server — the NOS relay behind teletext.html

`demo.retrovault.world/teletext.html` shows live NOS Teletekst in the style of the
Videopac G7400. NOS publishes every page as JSON at
`https://teletekst-data.nos.nl/json/<page>` but sends no CORS header, so a page on
another site can't read it. `nos.php` fetches one page and passes it on unchanged,
with CORS for `demo.retrovault.world`, `retrovault.world` and localhost only.

## Install (Hostinger, retrovault.world)

1. File Browser → `public_html/` → new folder `teletext`.
2. Upload `nos.php` and `.htaccess` into it.
3. Check: `https://retrovault.world/teletext/nos.php?p=101` returns JSON, and
   `https://retrovault.world/teletext/cache/` returns 403.

`cache/` is created on the first request (60 s per page, shared by all visitors;
older copies are served for up to a day if NOS is down). No config, no keys.
Per-IP limit: 240 requests per 10 minutes.

## Local test

    php -S 127.0.0.1:9020 -t teletext-server
    python3 serve.py   # or any static server on localhost
    open http://localhost:8000/teletext.html?proxy=http://127.0.0.1:9020/nos.php?p=

Until the relay is live, teletext.html still works: it falls back to the Vault's
own pages 400–405 and keeps checking every two minutes.
