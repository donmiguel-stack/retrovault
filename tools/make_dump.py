#!/usr/bin/env python3
"""Build _bundles/retro-vault-dumps.zip — one archive of everything the Vault
keeps OUT of git but needs in order to play: the Videopac and C64 game files,
the console BIOS, the manual scans and the extra PDFs.

It is the combined successor to videopac-odyssey-dumps.zip: hand this one zip to
someone with a fresh clone, they extract it at the top level of the Vault
folder, and emulator/, manuals/ and extras/ all land in place.

    python3 tools/make_dump.py

Stored (no compression) on purpose — the contents (ROMs, JPEG manual pages,
PDFs) are already incompressible, so storing is far faster and barely larger.
Run it again whenever you add or swap ROMs/manuals to refresh the bundle.

Retro Vault
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DST = os.path.join(ROOT, "_bundles", "retro-vault-dumps.zip")
FOLDERS = ["emulator/roms", "emulator/bios", "manuals", "extras"]

os.makedirs(os.path.dirname(DST), exist_ok=True)
count = 0
with zipfile.ZipFile(DST, "w", zipfile.ZIP_STORED, allowZip64=True) as z:
    for folder in FOLDERS:
        base = os.path.join(ROOT, folder)
        if not os.path.isdir(base):
            continue
        for dirpath, _dirs, files in os.walk(base):
            for name in sorted(files):
                if name == ".DS_Store" or name.endswith(".part"):
                    continue
                fp = os.path.join(dirpath, name)
                z.write(fp, os.path.relpath(fp, ROOT))
                count += 1

mb = os.path.getsize(DST) / 1048576
print("retro-vault-dumps.zip: %d files, %.0f MB" % (count, mb))
