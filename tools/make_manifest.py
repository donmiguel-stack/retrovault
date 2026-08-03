#!/usr/bin/env python3
"""Write manifest.json: the list of files the update button knows how to refresh.

Run this after changing any catalogue data or adding cover art, then commit the
result. The Vault compares its local files against this manifest to work out
what has changed.

    python3 tools/make_manifest.py

Deliberately covers DATA ONLY - the catalogue, the artwork, the translations.
No ROMs, no BIOS, no manual scans: those are not ours to distribute, and the
update button must never become a way to move them around.
"""
import hashlib
import json
import os
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files and folders the updater is allowed to touch. Anything outside this
# list is ignored by both the manifest and the apply step on the client.
FILES = [
    "games.js", "gamepages.js", "genres.js", "brazil.js", "usa.js",
    "packaging.js", "extras.js", "i18n.js", "setup-i18n.js", "featured.js",
    "app.js", "game.html", "index.html", "style.css", "boot-splash.js",
    "README.md",
]
# covers/ holds the box art and, under a shot_ prefix, the in-game screenshots
# the featured and homebrew panels use. Keep new artwork in here: the update
# endpoint's folder whitelist lives in serve.py, which the updater never
# overwrites, so a brand new folder can never reach an install that already
# exists. covers/ is somewhere every copy already accepts writes.
FOLDERS = ["covers"]


def digest(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def collect():
    out = {}
    for rel in FILES:
        p = os.path.join(ROOT, rel)
        if os.path.exists(p):
            out[rel] = {"sha256": digest(p), "size": os.path.getsize(p)}
    for folder in FOLDERS:
        base = os.path.join(ROOT, folder)
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            p = os.path.join(base, name)
            # skip the parked-artwork subfolders and stray notes
            if not os.path.isfile(p) or name.startswith("."):
                continue
            if os.path.splitext(name)[1].lower() not in (".png", ".jpg", ".jpeg"):
                continue
            rel = folder + "/" + name
            out[rel] = {"sha256": digest(p), "size": os.path.getsize(p)}
    return out


if __name__ == "__main__":
    files = collect()
    manifest = {
        "generated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "count": len(files),
        "bytes": sum(f["size"] for f in files.values()),
        "files": files,
    }
    dest = os.path.join(ROOT, "manifest.json")
    with open(dest, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1)
        fh.write("\n")
    mb = manifest["bytes"] / 1048576
    print(f"manifest.json: {len(files)} files, {mb:.1f} MB")
