#!/usr/bin/env python3
"""Turn GOG's Windows offline installers into the zips the PC shelf plays.

    python3 tools/import_gog.py               # every setup_*.exe in gog/
    python3 tools/import_gog.py ~/Downloads/setup_kings_quest_2.0f_(20239).exe
    python3 tools/import_gog.py --list        # say what would be built, write nothing
    python3 tools/import_gog.py --force       # replace zips already in emulator/roms/

Why this exists
---------------
30 of the shelf's MS-DOS games are still sold on GOG (gog.js lists them, and
the game page shows a "Buy it on GOG" box). GOG's downloads include the
original DOS files, but wrapped in a Windows installer - and several of the
Sierra bundles are Windows-only, so GOG Galaxy on a Mac won't even install
them. The installer never has to run: it is an Inno Setup archive, and
innoextract unpacks it on any system. This script does that, finds the game
inside, and writes the plain zip the game page asks for (games.js "romFile")
into emulator/roms/. No DOSBox config needed - emulator/dos.html wraps a
plain zip itself (emulator/dos-launch.js says what to start).

GOG's "bundles" (King's Quest 1+2+3 and so on) are separate games in your
GOG library, each with its own installer: download every one you want.
Installers that carry several games (DOOM + DOOM II, Wolfenstein 3D with
Spear of Destiny, the Keen pack) give you several zips in one go.

Needs innoextract on the PATH:
    macOS   brew install innoextract
    Linux   apt install innoextract
    Windows https://constexpr.org/innoextract/

Nothing leaves the computer, and emulator/roms/ is git-ignored, so the zips
stay out of the repo and out of the hosted file set (make_hosted.py
excludes these titles anyway). A zip that is already there is left alone
unless you pass --force; then the old one moves to _to_delete/ first.
"""

import argparse
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROMS = os.path.join(ROOT, "emulator", "roms")
INBOX = os.path.join(ROOT, "gog")

# Folders and files in a GOG install that belong to GOG's own wrapper
# (DOSBox/ScummVM, Galaxy hooks, icons, the uninstaller), not to the game.
JUNK_DIRS = {"__support", "__redist", "app", "tmp", "commonappdata", "scummvm",
             "dosbox", "cloud_saves", "goggame", "__installer"}
JUNK_FILE = re.compile(r"^(goggame-.*|unins\d*\..*|.*\.(ico|lnk|dll|pdf|url|exe\.config)|"
                       r"webcache\.zip|eula.*\.txt|gog\.ico|dosbox.*\.conf|.*\.ini\.gog)$", re.I)
CD_IMAGE = re.compile(r"\.(gog|ins|cue|iso|mdf|mds|ccd|img)$", re.I)


def load_romfiles():
    s = open(os.path.join(ROOT, "games.js"), encoding="utf-8").read()
    games = json.loads(s[s.index("["):s.rindex("]") + 1])
    return {g["id"]: g["romFile"] for g in games if g.get("romFile")}


# ---- recognising the games -------------------------------------------------
# Non-Sierra games: by the files the DOS original always has (upper-case names).
FINGERPRINTS = [
    ("pc_doom",             {"DOOM.WAD", "DOOM.EXE"}),
    ("pc_doom2",            {"DOOM2.WAD", "DOOM2.EXE"}),
    ("pc_wolfenstein3d",    {"VSWAP.WL6"}),
    ("pc_spear_of_destiny", {"VSWAP.SOD"}),
    ("pc_commander_keen",   {"KEEN1.EXE"}),
    ("pc_keen2",            {"KEEN2.EXE"}),
    ("pc_keen3",            {"KEEN3.EXE"}),
    ("pc_keen4",            {"KEEN4E.EXE"}),
    ("pc_keen5",            {"KEEN5E.EXE"}),
    ("pc_keen6",            {"KEEN6E.EXE"}),
    ("pc_xcom_ufo_defense", {"GEOSCAPE.EXE"}),
]

# Sierra games all look alike on disk (AGI: WORDS.TOK + VOL.n, SCI:
# RESOURCE.MAP), so these go by the name in GOG's goggame-<id>.info.
# Checked in order; subtitle words first, then the bare number.
SIERRA = [
    ("pc_kq2", r"king.?s quest.*(\bii\b|\b2\b|romancing)"),
    ("pc_kq3", r"king.?s quest.*(\biii\b|\b3\b|heir is human)"),
    ("pc_kq4", r"king.?s quest.*(\biv\b|\b4\b|rosella)"),
    ("pc_kq6", r"king.?s quest.*(\bvi\b|\b6\b|heir today)"),
    ("pc_kq7", r"king.?s quest.*(\bvii\b|\b7\b|princeless)"),
    ("pc_kq5", r"king.?s quest.*(\bv\b|\b5\b|absence)"),
    ("pc_kq1", r"king.?s quest"),
    ("pc_sq2", r"space quest.*(\bii\b|\b2\b|vohaul)"),
    ("pc_sq3", r"space quest.*(\biii\b|\b3\b|pestulon)"),
    ("pc_sq4", r"space quest.*(\biv\b|\b4\b|time rippers)"),
    ("pc_sq6", r"space quest.*(\bvi\b|\b6\b|spinal)"),
    ("pc_sq5", r"space quest.*(\bv\b|\b5\b|mutation)"),
    ("pc_sq1", r"space quest"),
    ("pc_lsl2", r"larry.*(\b2\b|\bii\b|wrong places)"),
    ("pc_lsl3", r"larry.*(\b3\b|\biii\b|pectorals)"),
    ("pc_lsl5", r"larry.*(\b5\b|\bv\b|undercover)"),
    ("pc_lsl6", r"larry.*(\b6\b|\bvi\b|shape up)"),
    (None, r"larry.*(\b7\b|\bvii\b|love for sail|magna|reloaded|wet dreams|box office)"),  # not on the shelf
    ("pc_freddy_pharkas", r"freddy pharkas"),
    ("pc_leisure_suit_larry", r"larry"),           # "Leisure Suit Larry" (1), with or without a number
]


def sierra_kind(names):
    if "WORDS.TOK" in names and ("VOL.0" in names or "VOL.1" in names):
        return "agi"
    if "RESOURCE.MAP" in names or "RESOURCE.000" in names or "RESSCI.000" in names:
        return "sci"
    return None


def walk_game_dirs(top):
    """Every folder in the unpacked tree outside GOG's wrapper, with the
    upper-cased names of the files directly in it."""
    for d, dirs, files in os.walk(top):
        dirs[:] = [x for x in dirs if x.lower() not in JUNK_DIRS]
        yield d, {f.upper() for f in files}


def info_names(top):
    out = []
    for d, _, files in os.walk(top):
        for f in files:
            if re.match(r"goggame-\d+\.info$", f, re.I):
                try:
                    j = json.load(open(os.path.join(d, f), encoding="utf-8-sig"))
                    out.append((j.get("name") or "", str(j.get("gameId") or "")))
                except Exception:
                    pass
    return out


def recognise(top):
    """[(shelf id, folder to zip, note)] for one unpacked installer, plus
    a list of things found that this script can't convert."""
    found, problems = [], []
    dirs = list(walk_game_dirs(top))
    for gid, need in FINGERPRINTS:
        for d, names in dirs:
            if need <= names:
                if gid == "pc_spear_of_destiny" and re.match(r"^m\d$", os.path.basename(d), re.I):
                    d = os.path.dirname(d)          # GOG: M1/M2/M3 missions -> zip the parent
                if not any(f[0] == gid for f in found):
                    found.append((gid, d, ""))
    sierra_dirs = [(d, sierra_kind(n)) for d, n in dirs if sierra_kind(n)]
    names = [n for n, _ in info_names(top)]
    for name in names:
        low = name.lower()
        for gid, rx in SIERRA:
            if re.search(rx, low):
                if gid is None:
                    problems.append("%s is not a shelf game" % name)
                elif gid == "pc_leisure_suit_larry":
                    # GOG's Larry 1 may carry the 1987 AGI game and the 1991 VGA remake
                    for d, kind in sierra_dirs:
                        found.append(("pc_leisure_suit_larry" if kind == "agi" else "pc_lsl1_vga", d, ""))
                elif len(sierra_dirs) == 1:
                    found.append((gid, sierra_dirs[0][0], ""))
                elif sierra_dirs:
                    problems.append("%s: %d game folders, can't tell which is which (%s)" %
                                    (name, len(sierra_dirs), ", ".join(os.path.relpath(d, top) for d, _ in sierra_dirs)))
                break
    seen = set()
    found = [f for f in found if not (f[0] in seen or seen.add(f[0]))]
    if not found:
        cds = [os.path.relpath(os.path.join(d, n), top) for d, ns in dirs for n in ns if CD_IMAGE.search(n)]
        if cds:
            problems.append("only a CD image inside (%s) - not converted yet" % ", ".join(cds[:3]))
        elif not problems:
            problems.append("no shelf game recognised (GOG name: %s)" % (", ".join(names) or "none"))
    return found, problems


# ---- writing the zip --------------------------------------------------------
def zip_dir(src, dest):
    n = 0
    tmp = dest + ".part"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for d, dirs, files in os.walk(src):
            dirs[:] = sorted(x for x in dirs if x.lower() not in JUNK_DIRS)
            for f in sorted(files):
                if JUNK_FILE.match(f):
                    continue
                full = os.path.join(d, f)
                z.write(full, os.path.relpath(full, src).replace(os.sep, "/"))
                n += 1
    os.replace(tmp, dest)
    return n


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("paths", nargs="*", help="installers or folders (default: gog/)")
    ap.add_argument("--list", action="store_true", help="show what would be built, write nothing")
    ap.add_argument("--force", action="store_true", help="replace zips already in emulator/roms/")
    args = ap.parse_args()

    if not shutil.which("innoextract"):
        sys.exit("innoextract not found. On a Mac: brew install innoextract   (Linux: apt install innoextract)")

    paths = args.paths or [INBOX]
    installers = []
    for p in paths:
        p = os.path.expanduser(p)
        if os.path.isdir(p):
            installers += sorted(os.path.join(p, f) for f in os.listdir(p)
                                 if re.match(r"setup_.*\.exe$", f, re.I))
        elif os.path.isfile(p):
            installers.append(p)
        else:
            print("not found: %s" % p)
    if not installers:
        sys.exit("No GOG installers (setup_*.exe) found in %s.\n"
                 "Download the Windows offline installer from your GOG library and put it there." %
                 ", ".join(paths))

    romfiles = load_romfiles()
    os.makedirs(ROMS, exist_ok=True)
    stamp = datetime.date.today().isoformat()
    built, skipped, failed = [], [], []
    for exe in installers:
        print("\n%s" % os.path.basename(exe))
        with tempfile.TemporaryDirectory(prefix="gog-") as tmp:
            r = subprocess.run(["innoextract", "-s", "-q", "-d", tmp, exe],
                               stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            if r.returncode != 0:
                print("  ! innoextract failed: %s" % r.stdout.strip()[-300:])
                failed.append(os.path.basename(exe))
                continue
            found, problems = recognise(tmp)
            for p in problems:
                print("  ! %s" % p)
                failed.append("%s (%s)" % (os.path.basename(exe), p))
            for gid, d, _ in found:
                rom = romfiles.get(gid)
                if not rom:
                    print("  ! %s is not in games.js" % gid)
                    continue
                dest = os.path.join(ROMS, rom)
                where = os.path.relpath(d, tmp)
                if os.path.exists(dest) and not args.force:
                    print("  = %-22s %s already in emulator/roms/ (use --force to replace)" % (gid, rom))
                    skipped.append(rom)
                    continue
                if args.list:
                    print("  + %-22s would write %s  (from %s)" % (gid, rom, where))
                    continue
                if os.path.exists(dest):
                    old = os.path.join(ROOT, "_to_delete", "gog-replaced-" + stamp)
                    os.makedirs(old, exist_ok=True)
                    shutil.move(dest, os.path.join(old, rom))
                n = zip_dir(d, dest)
                print("  + %-22s %s  (%d files, %.1f MB, from %s)" %
                      (gid, rom, n, os.path.getsize(dest) / 1048576, where))
                built.append(rom)
    print("\nBuilt %d, skipped %d, problems %d." % (len(built), len(skipped), len(failed)))
    if built:
        print("Reload the game pages: START appears for %s." % ", ".join(built))


if __name__ == "__main__":
    main()
