#!/usr/bin/env python3
"""Videopac Odyssey Vault local server.

Same as `python3 -m http.server`, but with two additions:

  * no-cache headers, so the browser always picks up changed files
    (games.js, app.js, ROMs, manuals...). This kills the entire "I replaced
    the file but the browser shows the old one" class of problems.

  * a small update endpoint, so the Setup panel can check for newer
    catalogue data and fetch it. DATA ONLY - covers, the catalogue, the
    translations. Never ROMs, never the BIOS.

Run from this folder:
    python3 serve.py            # port 8000
    python3 serve.py 8080       # custom port
"""
import hashlib
import json
import os
import sys
import urllib.request
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))

# Where updates come from. Edit update-source.json to point at your own repo;
# if that file is missing the update button simply reports it is not set up.
SOURCE_FILE = os.path.join(ROOT, "update-source.json")

# Only these may be written by an update. A file outside this whitelist is
# refused even if a manifest asks for it - a remote list should never be able
# to drop arbitrary files into the folder.
ALLOWED_EXT = (".js", ".html", ".css", ".md", ".png", ".jpg", ".jpeg", ".json")
ALLOWED_DIRS = ("", "covers")


def source_base():
    if not os.path.exists(SOURCE_FILE):
        return None
    with open(SOURCE_FILE, encoding="utf-8") as fh:
        return (json.load(fh).get("base") or "").rstrip("/") or None


def digest(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def safe(rel):
    """Reject anything that isn't a plain file in an allowed folder."""
    rel = rel.replace("\\", "/")
    if rel.startswith("/") or ".." in rel.split("/"):
        return False
    parts = rel.split("/")
    if len(parts) > 2:
        return False
    folder = parts[0] if len(parts) == 2 else ""
    if folder not in ALLOWED_DIRS:
        return False
    return os.path.splitext(rel)[1].lower() in ALLOWED_EXT


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": "VideopacVault"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def check_updates():
    base = source_base()
    if not base:
        return {"ok": False, "reason": "no-source"}
    try:
        remote = json.loads(fetch(base + "/manifest.json").decode("utf-8"))
    except Exception as exc:
        return {"ok": False, "reason": "unreachable", "detail": str(exc)}

    added, changed, total = [], [], 0
    for rel, meta in remote.get("files", {}).items():
        if not safe(rel):
            continue
        local = os.path.join(ROOT, rel)
        if not os.path.exists(local):
            added.append(rel); total += meta.get("size", 0)
        elif digest(local) != meta["sha256"]:
            changed.append(rel); total += meta.get("size", 0)
    return {"ok": True, "added": sorted(added), "changed": sorted(changed),
            "bytes": total, "generated": remote.get("generated")}


def apply_updates(wanted):
    base = source_base()
    if not base:
        return {"ok": False, "reason": "no-source"}
    written, failed = [], []
    for rel in wanted:
        if not safe(rel):
            failed.append(rel); continue
        try:
            data = fetch(base + "/" + rel)
            dest = os.path.join(ROOT, rel)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as fh:
                fh.write(data)
            written.append(rel)
        except Exception:
            failed.append(rel)
    return {"ok": True, "written": written, "failed": failed}


class VaultHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def _json(self, payload, code=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split("?")[0] == "/_update/check":
            return self._json(check_updates())
        return super().do_GET()

    def do_POST(self):
        if self.path.split("?")[0] != "/_update/apply":
            return self._json({"ok": False, "reason": "unknown"}, 404)
        length = int(self.headers.get("Content-Length") or 0)
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except Exception:
            return self._json({"ok": False, "reason": "bad-request"}, 400)
        return self._json(apply_updates(body.get("files") or []))


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Videopac Odyssey Vault on http://localhost:{port}  (no-cache mode)")
    if not source_base():
        print("updates: not configured (see update-source.json)")
    ThreadingHTTPServer(("", port), VaultHandler).serve_forever()
