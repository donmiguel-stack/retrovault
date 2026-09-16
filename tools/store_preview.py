#!/usr/bin/env python3
"""Retro Vault store - local preview, no Lemon Squeezy and no Hostinger needed.

    python3 tools/store_preview.py

Runs a pretend store server on http://localhost:8090 that behaves like
store-server/api.php: any license key unlocks (except WRONG, which shows the
"not recognised" error, and FULL, which shows the device-limit error). ROMs
come from your own emulator/roms/ (or homebrew-downloads/) and get the same
per-buyer stamp the real server writes.

Then, with the Vault running as usual (Start Retro Vault, localhost:8000),
open a game page with ?storepreview=1 - for example
    http://localhost:8000/game.html?id=new_amok&storepreview=1
That switches this browser into preview mode (remembered, localhost only).
?storepreview=0 switches it off again and forgets the pretend licenses.

The games shown as "on sale" and their prices are examples only - edit
PREVIEW below to try others. Stop the server with Ctrl+C.
"""
import json
import os
import sys
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import store_prepare  # noqa: E402  (same stamps as the real server)

PORT = 8090
# id -> (example price, author shown under the button)
PREVIEW = {
    "new_amok": ("€6.99", "John Dondzila"),
    "new_ktaa": ("€7.99", "Søren Gust"),
    "new_mrroboto": ("€5.99", "Ted Foolery"),
    "new_puzzle-piece-panic": ("€5.99", "Packrat Video Games"),
    "c64_hb_bomberland": ("€3.99", "(example)"),
    "pc_hb_traxtor": ("€2.99", "Juan J. Martinez"),
}


def load_games():
    src = open(os.path.join(ROOT, "games.js"), encoding="utf-8").read()
    body = src[src.index("{"):src.rstrip().rstrip(";").rindex("}") + 1]
    return {g["id"]: g for g in json.loads(body)["games"]}


GAMES = load_games()
INSTANCES = {}


def rom_path(gid):
    name = GAMES.get(gid, {}).get("romFile")
    if not name:
        return None
    for folder in ("emulator/roms", "homebrew-downloads"):
        p = os.path.join(ROOT, folder, name)
        if os.path.isfile(p):
            return p
    return None


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        sys.stdout.write("  " + (fmt % args) + "\n")

    def cors(self):
        origin = self.headers.get("Origin") or ""
        if origin.startswith(("http://localhost", "http://127.0.0.1")):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Access-Control-Expose-Headers", "Content-Disposition")
            self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        self.send_header("Cache-Control", "no-store")

    def reply(self, code, body, ctype="application/json"):
        data = body if isinstance(body, bytes) else (json.dumps(body) if ctype == "application/json" else body).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.cors()
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        u = urlparse(self.path)
        if u.path == "/preview.json":
            games = {}
            for gid, (price, author) in PREVIEW.items():
                if gid in GAMES:
                    games[gid] = {"price": price, "author": author,
                                  "checkout": "http://localhost:%d/checkout?game=%s" % (PORT, gid)}
            return self.reply(200, {"games": games})
        if u.path == "/checkout":
            gid = (parse_qs(u.query).get("game") or [""])[0]
            title = GAMES.get(gid, {}).get("title", gid)
            page = ("<!doctype html><meta charset=utf-8><title>Pretend checkout</title>"
                    "<body style='font:16px system-ui;background:#111;color:#eee;padding:40px;max-width:560px'>"
                    "<h1>Pretend checkout</h1><p>This is where Lemon Squeezy's checkout for <b>%s</b> "
                    "would open. After paying, the buyer gets an email with their license key.</p>"
                    "<p>For the preview, any key works - try <code style='background:#333;padding:3px 7px'>"
                    "PREVIEW-1234</code>.<br>Type <code>WRONG</code> or <code>FULL</code> to see the error messages.</p>"
                    "<p>Close this tab and paste the key on the game page.</p>") % title
            return self.reply(200, page, "text/html; charset=utf-8")
        return self.reply(200, "Retro Vault store preview is running.", "text/plain")

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        f = {k: v[0] for k, v in parse_qs(self.rfile.read(n).decode("utf-8")).items()}
        act, gid, key = f.get("action"), f.get("game", ""), f.get("key", "").strip()
        if gid not in PREVIEW:
            return self.reply(404, {"ok": False, "reason": "unknown-game"})
        if key.upper().startswith("WRONG") or not key:
            return self.reply(403, {"ok": False, "reason": "invalid"})
        if key.upper().startswith("FULL"):
            return self.reply(403, {"ok": False, "reason": "limit"})
        if act == "activate":
            iid = str(uuid.uuid4())
            INSTANCES[iid] = key
            return self.reply(200, {"ok": True, "instance": iid, "name": "Preview Buyer",
                                    "order": "1234", "code": "0A1B2C3D", "usage": 1, "limit": 5})
        if act == "deactivate":
            INSTANCES.pop(f.get("instance"), None)
            return self.reply(200, {"ok": True})
        if act == "rom":
            path = rom_path(gid)
            if not path:
                return self.reply(500, {"ok": False, "reason": "missing-file"})
            data = open(path, "rb").read()
            st, _why = store_prepare.plan(path, data)
            if st:
                data = store_prepare.apply(data, st, {"order": "1234", "code": "0A1B2C3D",
                                                      "name": "Preview Buyer", "text": "RV#1234/0A1B2C3D"})
            self.send_response(200)
            self.send_header("Content-Type", "application/octet-stream")
            self.send_header("Content-Length", str(len(data)))
            disp = "attachment" if f.get("download") else "inline"
            self.send_header("Content-Disposition", "%s; filename=\"%s\"" % (disp, os.path.basename(path).encode("ascii", "replace").decode()))
            self.cors()
            self.end_headers()
            self.wfile.write(data)
            return
        return self.reply(400, {"ok": False, "reason": "unknown-action"})


if __name__ == "__main__":
    print("Retro Vault store preview on http://localhost:%d  (Ctrl+C to stop)" % PORT)
    print("Games on sale in the preview:")
    for gid in PREVIEW:
        ok = "" if rom_path(gid) else "   (no ROM found - Download/START will fail)"
        print("  http://localhost:8000/game.html?id=%s&storepreview=1%s" % (gid, ok))
    print("Any license key works; WRONG and FULL show the error messages.")
    try:
        ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        pass
