#!/usr/bin/env python3
"""Build the one-file starter bundle: the whole Vault, dumps included.

For handing to someone who shouldn't have to visit GitHub and Proton Drive and
stitch two downloads together. They unzip it and run serve.py; the Update
button keeps them current from then on.

Run make_manifest.py first, so the bundle ships with an accurate manifest -
otherwise the recipient's first update will look bigger than it is:

    python3 tools/make_manifest.py
    python3 tools/make_starter.py

Left out: anything in a folder starting with "_" (withheld ROMs, parked cover
art, staging, the bundles themselves), .git, dotfiles, and sources.local.json
if you ever create one.
"""
import os
import time
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "_bundles")
SKIP_DIRS = {".git", "__pycache__"}
SKIP_NAMES = {"BR9485 - Q*bert.bin", "sources.local.json"}
TOP = "VIDEOPAC ODYSSEY VAULT"


def build():
    os.makedirs(OUT, exist_ok=True)
    name = "videopac-odyssey-vault-starter-%s.zip" % time.strftime("%Y-%m-%d")
    dest = os.path.join(OUT, name)
    n = 0
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_STORED, allowZip64=True) as z:
        for dirpath, dirnames, filenames in os.walk(ROOT):
            dirnames[:] = [d for d in dirnames
                           if d not in SKIP_DIRS and not d.startswith("_")]
            for fn in filenames:
                if fn in SKIP_NAMES or fn.startswith("."):
                    continue
                full = os.path.join(dirpath, fn)
                rel = os.path.relpath(full, ROOT)
                if rel.startswith("_"):
                    continue
                z.write(full, os.path.join(TOP, rel))
                n += 1
    print("%s: %d files, %.0f MB" % (name, n, os.path.getsize(dest) / 1048576))
    return dest


if __name__ == "__main__":
    build()
