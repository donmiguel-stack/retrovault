#!/usr/bin/env python3
"""Assemble the Vault's hosted file set and write hosted.js.

    python3 tools/make_hosted.py            # build _hosted/ + hosted.js + zip
    python3 tools/make_hosted.py --list     # just print what would be included

The public demo (demo.retrovault.world) is a read-only GitHub Pages mirror of
this repo, and the repo never carries the BIOS or any cartridge dump. Since
2026-09-04 those live on the Vault's own file host instead - a plain folder on
retrovault.world (Hostinger), uploaded by hand, never committed here:

    https://retrovault.world/files/
        bios/g7400.bin
        roms/<exact romFile names from games.js>
        .htaccess         CORS + no directory listing
        index.html        one line saying what this is

This script builds that folder as _hosted/ (gitignored), zips it to
_bundles/retrovault-files.zip for the Hostinger file manager, and writes
hosted.js at the repo root - which is committed and only carries the base URL,
the BIOS path and the list of ROM filenames. game.html uses it as the third
place to look for a ROM (after emulator/roms/ and homebrew-downloads/) and
passes the BIOS URL to the emulator, which only fetches it when its own
bios/ folder is empty. demo.js lets START through for those games.

WHAT GOES IN - decided with Mike on 2026-09-04 ("abandonware + free
homebrews") and widened on 2026-09-06 to the C64 and MS-DOS shelves on the
"ruim" footing: a game qualifies when its ORIGINAL version is out of trade
today, even if the brand name still lives on. What counts as "still sold":
the original C64/DOS build (or an emulated bundle of it) on GOG/Steam, on an
Evercade cartridge, on THEC64 Mini/Maxi, or in an official re-release that
ships the original. Streaming subscriptions (Antstream) and modern remakes
don't count.

  Videopac:
  * the whole out-of-print Philips/Magnavox catalogue: Official Videopac
    (EU / French), Official Odyssey2 (US), Philips Brazil, Jopac, the
    modified/fixed dumps, PAL dumps, rare/unreleased prototypes, the two
    German Verkehrsspiele. Same abandonware footing the manual scans in
    extras/ already sit on (see .gitignore).
  * NOTHING from "Homebrew (community)". The free ones are already in
    homebrew-downloads/ (in the repo, so on the demo too); the rest are
    RESTRICTED/UNCLEAR - see vault-videopac-homebrew-licensing-review.md.

  C64 / MS-DOS (category "Commodore 64" / "MS-DOS" only, never the
  homebrew category - same reasoning as above):
  * everything whose original is out of trade (checked title by title on
    2026-09-06 against THEC64 Mini/Maxi, the Evercade C64 Collections,
    GOG and Steam; the table is in the project doc for that session).
  * the official id/Apogee SHAREWARE episodes (Doom ep. 1, Keen 1) - built
    to be given away, so in even though the full games are still sold.

WHAT STAYS OUT even inside those categories:

  Videopac - brands that are still alive and enforced today, or somebody's
  own current work:
  * Parker Brothers (Frogger/Konami, Popeye/King Features, Q*bert/Sony,
    Super Cobra/Konami) and Imagic (Atlantis, Demon Attack - Activision) -
    including the Brazilian and Jopac/mod editions of the same games.
  * Spider-Man (Marvel) and Tutankham (Konami), the unreleased Parker
    Brothers dumps.
  * Playtag (Bas Kornalijnslijper) - a homebrew filed under "rare".
  * Nightfighter (Retrogenesis) and Flash Point (Rex Battenberg, carts made
    with his permission) - living authors/labels, no redistribution terms.

  C64 - original still sold (THEC64 Mini/Maxi and/or Evercade unless
  noted): Boulder Dash, Impossible Mission, Uridium, Paradroid, Creatures,
  California Games, Winter Games, Pitstop II, Sword of Fargoal; The Last
  Ninja and IK+ (Steam, System 3's "Last Ninja Collection"); OutRun (SEGA
  AGES, and Mike's 2026-08-20 call to never distribute it).

  MS-DOS - still sold, or Mike's own GOG purchases (full retail data, not
  shareware): Wolfenstein 3D (full 6-episode), Spear of Destiny, Duke Nukem
  1 / II (registered) / 3D, Space Quest 1-6, King's Quest 1-7, Doom II,
  Final Doom, X-COM, Keen 2-6; Leisure Suit Larry 1 (GOG's "Leisure Suit
  Larry" bundle still ships the 1987 AGI original next to the VGA remake);
  GTA1 (Take-Two's DMCA record, see vault-status.md 2026-08-18); OutRun.

Edit EXCLUDE_IDS / the category sets below if that call changes, re-run,
re-upload. The demo picks the change up as soon as hosted.js is pushed.
"""
import json
import os
import re
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "_hosted")
ZIP = os.path.join(ROOT, "_bundles", "retrovault-files.zip")
BASE_URL = "https://retrovault.world/files/"
BIOS = "g7400.bin"

INCLUDE_CATEGORIES = {
    "Official Videopac (EU)", "Official Videopac (French)",
    "Official Odyssey2 (US)", "Philips Brazil", "Jopac (French)",
    "Modified / fixed", "PAL dumps", "Rare / unreleased", "Utility / unknown",
    # the two other shelves (2026-09-06)
    "Commodore 64", "MS-DOS",
}
EXCLUDE_CATEGORIES = {"Homebrew (community)", "Parker Brothers", "Imagic"}
EXCLUDE_IDS = {
    # ---- Videopac ----
    # Parker Brothers / Imagic titles wearing other category labels
    "br_9483", "br_9484", "br_9485", "br_9486",          # Frogger, Popeye, Q*bert, Super Cobra (Brazil)
    "jo_demon-attack_pl", "mod_demon-attack_pl",         # Demon Attack (Jopac / mod)
    "pr_spiderman", "pr_spiderman_alt",                  # Marvel
    "pr_tutankham", "mod_tutankham_fix",                 # Konami
    # living authors / labels, no terms
    "pr_playtag", "mod_playtag_fix",                     # Bas Kornalijnslijper homebrew
    "pr_nightfighter",                                   # Retrogenesis
    "pal_flashpoint",                                    # Rex Battenberg / CCC
    # ---- C64: original still sold (checked 2026-09-06) ----
    "c64_boulder_dash", "c64_impossible_mission", "c64_uridium",
    "c64_paradroid", "c64_creatures", "c64_california_games",
    "c64_winter_games", "c64_pitstop2", "c64_sword_of_fargoal",   # THEC64 / Evercade
    "c64_last_ninja", "c64_ik_plus",                     # Steam, System 3
    "c64_outrun",                                        # SEGA AGES + Mike's call
    # ---- MS-DOS: still sold / Mike's own GOG purchases ----
    "pc_wolfenstein3d", "pc_spear_of_destiny",           # GOG (WOLF3D.zip is the full .WL6 set now)
    "pc_duke_nukem", "pc_duke_nukem_2", "pc_duke_nukem_3d",
    "pc_sq1", "pc_sq2", "pc_sq3", "pc_sq4", "pc_sq5", "pc_sq6",
    "pc_kq1", "pc_kq2", "pc_kq3", "pc_kq4", "pc_kq5", "pc_kq6", "pc_kq7",
    "pc_doom2", "pc_final_doom_tnt", "pc_final_doom_plutonia", "pc_xcom_ufo_defense",
    "pc_keen2", "pc_keen3", "pc_keen4", "pc_keen5", "pc_keen6",
    "pc_leisure_suit_larry",                             # GOG bundle ships the 1987 AGI original
    "pc_gta1",                                           # Take-Two
    "pc_outrun",                                         # SEGA AGES + Mike's call
}
EXCLUDE_RE = re.compile(r"atlantis|demon-attack|frogger|popeye|q-bert|super-cobra|spiderman|tutankham", re.I)

HTACCESS = """# Retro Vault file host - BIOS + abandonware Videopac / C64 / MS-DOS game files.
# The Vault (demo.retrovault.world and every local copy) fetches these with
# XHR/fetch from another origin, so CORS has to be open. Nothing here is
# secret; the folder is just kept out of the git repo.
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, HEAD, OPTIONS"
  Header set Access-Control-Allow-Headers "Range, Content-Type"
  Header set Access-Control-Expose-Headers "Content-Length, Content-Range"
  Header set Cache-Control "public, max-age=86400"
</IfModule>
Options -Indexes
AddType application/octet-stream .bin .d64 .crt .prg
AddType application/zip .zip
"""

INDEX_HTML = """<!doctype html><meta charset="utf-8"><title>Retro Vault files</title>
<p>File host for <a href="https://retrovault.world">Retro Vault</a>: the Videopac G7400 BIOS and the out-of-print Videopac, Commodore 64 and MS-DOS games the Vault plays online (plus the official id/Apogee shareware episodes). Nothing here is for sale, nothing here is still sold by its makers as far as we could find; if you hold rights to any of it and want it gone, write to the address on retrovault.world.</p>
<p><a href="bios/g7400.bin">bios/g7400.bin</a> &mdash; drop it into <code>emulator/bios/</code> of your own copy.</p>
"""


def load_games():
    src = open(os.path.join(ROOT, "games.js"), encoding="utf-8").read()
    body = src[src.index("{"): src.rindex("}") + 1]
    return json.loads(body)["games"]


def select(games):
    picked, skipped = [], []
    for g in games:
        plat = g.get("platform")
        if plat not in ("G7000", "G7400+", "C64", "PC"):
            continue
        cat = g.get("category", "")
        why = None
        if cat in EXCLUDE_CATEGORIES:
            why = "category: " + cat
        elif g["id"] in EXCLUDE_IDS:
            why = "excluded id"
        elif plat in ("G7000", "G7400+") and EXCLUDE_RE.search(g["id"]):
            why = "excluded brand (id match)"
        elif cat not in INCLUDE_CATEGORIES:
            why = "category not whitelisted: " + cat
        if why:
            skipped.append((g["id"], g["romFile"], why))
        else:
            picked.append(g)
    return picked, skipped


def main():
    games = load_games()
    picked, skipped = select(games)
    roms_dir = os.path.join(ROOT, "emulator", "roms")
    files = []
    missing = []
    seen = set()
    for g in picked:
        rf = g["romFile"]
        if rf in seen:
            continue
        seen.add(rf)
        if os.path.exists(os.path.join(roms_dir, rf)):
            files.append(rf)
        else:
            missing.append((g["id"], rf))
    files.sort(key=str.lower)

    per = {}
    for g in picked:
        per[g["platform"]] = per.get(g["platform"], 0) + 1
    print("included: %d games -> %d unique ROM files  (%s)" % (
        len(picked), len(files), ", ".join("%s %d" % kv for kv in sorted(per.items()))))
    print("skipped:  %d" % len(skipped))
    for gid, rf, why in skipped:
        print("   - %-26s %s" % (gid, why))
    if missing:
        print("NOT ON DISK (listed in games.js but no file in emulator/roms/):")
        for gid, rf in missing:
            print("   ! %-26s %s" % (gid, rf))
    if "--list" in sys.argv:
        return

    bios_src = os.path.join(ROOT, "emulator", "bios", BIOS)
    if not os.path.exists(bios_src):
        sys.exit("no emulator/bios/%s - nothing to host without the BIOS" % BIOS)

    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "roms"))
    os.makedirs(os.path.join(OUT, "bios"))
    shutil.copy2(bios_src, os.path.join(OUT, "bios", BIOS))
    total = 0
    for rf in files:
        shutil.copy2(os.path.join(roms_dir, rf), os.path.join(OUT, "roms", rf))
        total += os.path.getsize(os.path.join(roms_dir, rf))
    open(os.path.join(OUT, ".htaccess"), "w").write(HTACCESS)
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(INDEX_HTML)

    # hosted.js - committed; names and a URL only.
    js = (
        "// The Vault's own file host: the Videopac BIOS plus the out-of-print part\n"
        "// of all three shelves (Videopac, C64, MS-DOS) and the id/Apogee shareware\n"
        "// episodes, served from retrovault.world - NOT from this\n"
        "// repo, which never carries a ROM or BIOS. Generated by\n"
        "// tools/make_hosted.py (the include/exclude rules and the reasoning live\n"
        "// there); edit that, not this.\n"
        "//\n"
        "// game.html: third place to look for a ROM after emulator/roms/ and\n"
        "// homebrew-downloads/ (HEAD-checked before START appears), and the BIOS\n"
        "// the emulator falls back to when its own bios/ folder is empty.\n"
        "// demo.js lets START through for these on the public mirror.\n"
        "window.HOSTED_FILES = {\n"
        "  \"base\": %s,\n"
        "  \"bios\": \"bios/\",\n"
        "  \"generated\": %s,\n"
        "  \"roms\": [\n" % (json.dumps(BASE_URL), json.dumps(__import__("time").strftime("%Y-%m-%d")))
    )
    js += ",\n".join("    " + json.dumps(rf, ensure_ascii=False) for rf in files)
    js += "\n  ]\n};\n"
    open(os.path.join(ROOT, "hosted.js"), "w", encoding="utf-8").write(js)

    os.makedirs(os.path.dirname(ZIP), exist_ok=True)
    with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        for dirpath, _, names in os.walk(OUT):
            for n in names:
                full = os.path.join(dirpath, n)
                z.write(full, os.path.relpath(full, OUT))
    print("wrote _hosted/ (%d ROMs, %.1f MB) + hosted.js + %s" % (len(files), total / 1e6, os.path.relpath(ZIP, ROOT)))
    print("upload the CONTENTS of _hosted/ to retrovault.world/files/ (keep .htaccess)")


if __name__ == "__main__":
    main()
