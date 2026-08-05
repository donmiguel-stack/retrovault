#!/usr/bin/env python3
"""
fetch_c64_assets.py — best-effort asset fetcher for the Retro Vault C64 shelf.

Reads the Commodore 64 entries from games.js and tries to fill the three
folders the Vault keeps out of git, from public archives:

    emulator/roms/     the disk images   (--roms)
    covers/            box / cover art    (--covers)
    extras/            manual PDFs        (--manuals)   + an extras.js entry

Where each thing comes from
---------------------------
  ROMs      archive.org item "2813_d64_C64_roms_wwwC64com" — the c64.com disk
            set, one .d64 per title. The script reads the item's real file list
            from archive.org's metadata API and matches your titles to it, so
            it never guesses a URL blindly.
  Manuals   archive.org item "Commodore_64_Game_Manual_Collection" — a single
            ~1.2 GB zip of ~3000 manuals. Downloaded ONCE into tools/.cache/,
            then the matching PDFs are extracted. Big, so it is opt-in.
  Covers    the Wikipedia (MediaWiki) API — each game's article lead image is
            its box art. Lower-res and fair-use, but stable and reliable.

Nothing here is committed to the repo: emulator/roms/, extras/ (and, if you
choose, scraped covers) are gitignored. This is for software you own — the
same footing as the Videopac dumps. It only downloads what you ask for and
only what it can match; everything else is listed in the report so you can
fill it by hand.

Usage
-----
    python3 tools/fetch_c64_assets.py --covers            # safe, small, start here
    python3 tools/fetch_c64_assets.py --roms
    python3 tools/fetch_c64_assets.py --manuals           # warns before the 1.2 GB pull
    python3 tools/fetch_c64_assets.py --all
    python3 tools/fetch_c64_assets.py --roms --dry-run    # show matches, download nothing
    python3 tools/fetch_c64_assets.py --covers --only c64_paperboy c64_test_drive

Flags:
    --roms --covers --manuals   pick any combination (or --all)
    --dry-run       resolve and report matches, download nothing
    --only ID ...   restrict to these game ids
    --fuzzy         accept lower-confidence title matches (default: skip & log them)
    --sleep N       seconds between network requests (default 1.0; be a good guest)
    --manuals-zip PATH   use a manual-collection zip you already have, skip the download

Only the Python standard library is used.

Retro Vault · code by Claude
"""

import argparse
import difflib
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.error
import urllib.request
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAMES_JS   = os.path.join(ROOT, "games.js")
EXTRAS_JS  = os.path.join(ROOT, "extras.js")
ROMS_DIR   = os.path.join(ROOT, "emulator", "roms")
COVERS_DIR = os.path.join(ROOT, "covers")
EXTRAS_DIR = os.path.join(ROOT, "extras")
CACHE_DIR  = os.path.join(ROOT, "tools", ".cache")
REPORT     = os.path.join(ROOT, "tools", "fetch-c64-report.txt")

ROM_ITEM    = "2813_d64_C64_roms_wwwC64com"
MANUAL_ITEM = "Commodore_64_Game_Manual_Collection"
MANUAL_ZIP_NAME = "Commodore_64_Game_Manual_Collection.zip"

UA = "RetroVaultAssetFetcher/1.0 (personal archival; +https://github.com/donmiguel-stack)"

# Confidence at/above which a fuzzy title match is trusted without --fuzzy.
# The Vault's standing rule: a plausible-looking wrong match is worse than a
# gap, so anything below this is reported, not downloaded, unless --fuzzy.
STRONG = 0.86

report_lines = []


def say(msg=""):
    print(msg)
    report_lines.append(msg)


# ----------------------------------------------------------------------------
# Title normalisation and matching
# ----------------------------------------------------------------------------
_ROMAN = [(" viii", " 8"), (" vii", " 7"), (" iii", " 3"), (" ii", " 2"),
          (" vi", " 6"), (" iv", " 4"), (" ix", " 9"), (" v", " 5"),
          (" x", " 10"), (" i", " 1")]


def norm(s):
    """Loose, comparable form of a title or filename."""
    s = s.lower()
    s = s.replace("&", " and ").replace("+", " plus ")
    s = re.sub(r"\[[^\]]*\]", " ", s)   # [Side 1], [cr FLT] ...
    s = re.sub(r"\([^)]*\)", " ", s)    # (1987)(Epyx) ...
    s = s.replace("_", " ").replace(".", " ")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\bthe\b", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    for a, b in _ROMAN:                 # normalise roman numerals to digits
        if s.endswith(a):
            s = s[: -len(a)] + b
    return re.sub(r"\s+", " ", s).strip()


# Titles whose disk-set name isn't derivable from the printed title. Keyed by
# normalised title -> the normalised name the c64.com set actually uses.
_ALIASES = {
    "ik plus": "international karate plus",   # IK+ on the box
    "great giana sisters": "giana sisters",   # set drops "Great"
}


def match_keys(title):
    """Candidate lookup keys for a title, best first.

    An explicit alias (for names the set spells differently), then the full
    normalised title, then the part before a ':' or '-' subtitle ("Turrican II:
    The Final Fight" -> "turrican 2"), which is how these sets often name it.
    """
    keys = []
    if norm(title) in _ALIASES:
        keys.append(_ALIASES[norm(title)])
    keys.append(norm(title))
    for sep in (":", " - "):
        if sep in title:
            keys.append(norm(title.split(sep, 1)[0]))
    seen, out = set(), []
    for k in keys:
        if k and k not in seen:
            seen.add(k)
            out.append(k)
    return out


def _match_one(key, index):
    if key in index:
        return index[key], 1.0
    # a clean, UNIQUE prefix of one entry (a base title with the subtitle gone)
    pref = [v for k, v in index.items() if k == key or k.startswith(key + " ")]
    if len(pref) == 1:
        return pref[0], 0.95
    # the reverse: an index key that is a UNIQUE prefix of this title — e.g. a
    # manual folder "Zak McKracken" for "Zak McKracken and the Alien Mindbenders"
    rev = [v for k, v in index.items() if len(k) >= 6 and key.startswith(k + " ")]
    if len(rev) == 1:
        return rev[0], 0.9
    cand = difflib.get_close_matches(key, list(index.keys()), n=1, cutoff=0.6)
    if cand:
        return index[cand[0]], difflib.SequenceMatcher(None, key, cand[0]).ratio()
    return None, 0.0


def best_match(title_or_key, index, is_title=True):
    """Return (filename, confidence). For a title, try full then base-title keys."""
    keys = match_keys(title_or_key) if is_title else [title_or_key]
    best_name, best_conf = None, 0.0
    for k in keys:
        name, conf = _match_one(k, index)
        if name and conf > best_conf:
            best_name, best_conf = name, conf
        if best_conf >= 0.999:
            break
    return best_name, best_conf


# ----------------------------------------------------------------------------
# HTTP helpers
# ----------------------------------------------------------------------------
def _open(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=60)


def _open_retry(url, tries=4):
    """archive.org's download nodes throw transient 5xx/timeouts under load;
    retry with backoff before giving up."""
    last = None
    for attempt in range(tries):
        try:
            return _open(url)
        except urllib.error.HTTPError as e:
            last = e
            if e.code < 500:          # 4xx won't fix itself
                raise
        except Exception as e:
            last = e
        time.sleep(1.5 * (attempt + 1))
    raise last


def get_json(url):
    with _open_retry(url) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def download(url, dest, sleep=1.0):
    """Stream url to dest (atomic via .part), retrying transient 5xx. Returns bytes."""
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    tmp = dest + ".part"
    total = 0
    with _open_retry(url) as r, open(tmp, "wb") as f:
        while True:
            chunk = r.read(65536)
            if not chunk:
                break
            f.write(chunk)
            total += len(chunk)
    os.replace(tmp, dest)
    time.sleep(sleep)
    return total


def human(n):
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return f"{n:.0f} {unit}" if unit == "B" else f"{n/1:.0f} {unit}" if False else f"{n:.1f} {unit}"
        n /= 1024


# ----------------------------------------------------------------------------
# games.js
# ----------------------------------------------------------------------------
def load_c64_games():
    txt = open(GAMES_JS, encoding="utf-8").read()
    obj = json.loads(txt[txt.index("{"): txt.rindex("}") + 1])
    return [g for g in obj["games"] if g.get("platform") == "C64"]


def selected(games, only):
    return [g for g in games if not only or g["id"] in only]


# ----------------------------------------------------------------------------
# ROMs
# ----------------------------------------------------------------------------
def archive_d64_index(item):
    meta = get_json(f"https://archive.org/metadata/{item}")
    idx = {}
    for f in meta.get("files", []):
        name = f.get("name", "")
        if name.lower().endswith(".d64"):
            idx.setdefault(norm(name[:-4]), name)
    return idx


def fetch_roms(games, args):
    say("\n=== ROMs  (archive.org: %s) ===" % ROM_ITEM)
    say("Reading the disk-set file list...")
    try:
        index = archive_d64_index(ROM_ITEM)
    except Exception as e:
        say("  ! could not read the archive item: %s" % e)
        return
    say("  %d disk images in the set.\n" % len(index))
    base = f"https://archive.org/download/{ROM_ITEM}/"
    hits = misses = 0
    for g in games:
        dest = os.path.join(ROMS_DIR, g["romFile"])
        if os.path.exists(dest):
            say("  = %-34s already present" % g["title"][:34])
            continue
        fname, conf = best_match(g["title"], index)
        if not fname or (conf < STRONG and not args.fuzzy):
            misses += 1
            extra = "" if not fname else "  (closest: %s @ %.2f — use --fuzzy)" % (fname, conf)
            say("  - %-34s no confident match%s" % (g["title"][:34], extra))
            continue
        tag = "" if conf >= 0.999 else "  ~%.2f" % conf
        if args.dry_run:
            say("  > %-34s <- %s%s  [dry-run]" % (g["title"][:34], fname, tag))
            hits += 1
            continue
        try:
            n = download(base + urllib.parse.quote(fname), dest, args.sleep)
            say("  + %-34s <- %s  (%s)%s" % (g["title"][:34], fname, human(n), tag))
            hits += 1
        except Exception as e:
            misses += 1
            say("  ! %-34s download failed: %s" % (g["title"][:34], e))
    say("\n  ROMs: %d fetched/queued, %d unmatched." % (hits, misses))


# ----------------------------------------------------------------------------
# Covers  (Wikipedia lead image = box art)
# ----------------------------------------------------------------------------
# pilicense=any is essential: box art is non-free, and pageimages hides
# non-free images by default.
_PI = "prop=pageimages&piprop=original|thumbnail&pithumbsize=700&pilicense=any&format=json"


def _pick_image(page):
    return (page.get("original") or {}).get("source") \
        or (page.get("thumbnail") or {}).get("source")


def _title_ok(game, page_title):
    """Guard against the search drifting to an unrelated article (Winter Games
    -> Gauntlet). Require a shared significant word."""
    stop = {"video", "game", "the", "a", "of", "and", "ii", "iii"}
    gw = set(norm(game).split()) - stop
    pw = set(norm(page_title or "").split()) - stop
    return bool(gw & pw)


def wiki_cover_url(title, year=None):
    # Exact article titles first — most reliable, and avoids the franchise/
    # wrong-game drift the search generator can cause. Then fall back to search.
    tries = []
    if year:
        tries.append(f"{title} ({year} video game)")
    tries += [f"{title} (video game)", title]
    for cand in tries:
        q = "action=query&titles=" + urllib.parse.quote(cand) + "&" + _PI
        data = get_json("https://en.wikipedia.org/w/api.php?" + q)
        for _, page in data.get("query", {}).get("pages", {}).items():
            if page.get("pageid") and _pick_image(page) and _title_ok(title, page.get("title")):
                return _pick_image(page), page.get("title")
    # fallback: full-text search, still keyword-guarded
    search = f"{title} {year} video game" if year else f"{title} video game"
    q = ("action=query&generator=search&gsrlimit=3&gsrsearch="
         + urllib.parse.quote(search) + "&" + _PI)
    data = get_json("https://en.wikipedia.org/w/api.php?" + q)
    pages = sorted(data.get("query", {}).get("pages", {}).values(),
                   key=lambda p: p.get("index", 99))
    for page in pages:
        if _pick_image(page) and _title_ok(title, page.get("title")):
            return _pick_image(page), page.get("title")
    return None, None


SCRAPED_MARK = os.path.join(CACHE_DIR, "scraped-covers.txt")


def _scraped_set():
    if os.path.exists(SCRAPED_MARK):
        return set(l.strip() for l in open(SCRAPED_MARK) if l.strip())
    return set()


def fetch_covers(games, args):
    say("\n=== Covers  (Wikipedia article images) ===")
    done = _scraped_set()
    hits = misses = 0
    for g in games:
        gid = g["id"]
        if gid in done:
            say("  = %-34s cover already fetched" % g["title"][:34])
            continue
        try:
            src, page = wiki_cover_url(g["title"], g.get("year"))
        except Exception as e:
            misses += 1
            say("  ! %-34s lookup failed: %s" % (g["title"][:34], e))
            continue
        if not src:
            misses += 1
            say("  - %-34s no article image found" % g["title"][:34])
            continue
        if os.path.splitext(urllib.parse.urlparse(src).path)[1].lower() == ".svg":
            misses += 1
            say("  - %-34s article image is SVG, skipped" % g["title"][:34])
            continue
        if args.dry_run:
            say("  > %-34s <- %s  [dry-run]" % (g["title"][:34], page))
            hits += 1
            continue
        # Save over the generated placeholder as <id>.png. The extension is
        # cosmetic here: the Vault loads covers with <img>, which decodes by
        # content, so a JPEG written as .png renders correctly and the
        # png-first loader picks it up with no placeholder left behind.
        dest = os.path.join(COVERS_DIR, gid + ".png")
        try:
            download(src, dest, args.sleep)
            os.makedirs(CACHE_DIR, exist_ok=True)
            with open(SCRAPED_MARK, "a") as f:
                f.write(gid + "\n")
            say("  + %-34s <- %s" % (g["title"][:34], page))
            hits += 1
        except Exception as e:
            misses += 1
            say("  ! %-34s download failed: %s" % (g["title"][:34], e))
    say("\n  Covers: %d fetched, %d missing." % (hits, misses))
    if hits and not args.dry_run:
        say("  NOTE: bump COVER_V in app.js AND game.html so browsers drop the")
        say("        placeholder they cached. Wikipedia covers are fair-use — if you")
        say("        would rather not redistribute them, keep them out of git")
        say("        (see the C64 note in .gitignore).")


# ----------------------------------------------------------------------------
# Manuals  (archive.org manual collection zip -> extras/ + extras.js)
# ----------------------------------------------------------------------------
def ensure_manual_zip(args):
    if args.manuals_zip:
        return args.manuals_zip
    os.makedirs(CACHE_DIR, exist_ok=True)
    cached = os.path.join(CACHE_DIR, MANUAL_ZIP_NAME)
    if os.path.exists(cached) and os.path.getsize(cached) > 100 * 1024 * 1024:
        say("  using cached zip: %s" % cached)
        return cached
    url = f"https://archive.org/download/{MANUAL_ITEM}/{MANUAL_ZIP_NAME}"
    say("  The manual collection is a single ~1.2 GB zip. It will be downloaded")
    say("  once to tools/.cache/ and reused. Ctrl-C now to skip.")
    if not args.yes:
        try:
            input("  Press Enter to download, or Ctrl-C to cancel... ")
        except KeyboardInterrupt:
            say("\n  cancelled.")
            return None
    say("  downloading (this takes a while)...")
    n = download(url, cached, sleep=0)
    say("  got %s" % human(n))
    return cached


def update_extras_js(entries):
    """Insert {id: {'manual': filename}} into extras.js by TEXT, before the final
    '};'. Textual (not JSON) on purpose: the real extras.js carries // comments,
    so a parse-and-rewrite would drop them. Existing ids are left untouched.
    Writes a .bak first. Returns the count added."""
    header = ("// Your own scans (manuals, maps, boards), shown as an Extras section\n"
              "// on a game page. C64 manual entries are added by tools/fetch_c64_assets.py.\n"
              "window.EXTRAS_DATA = {\n};\n")
    if os.path.exists(EXTRAS_JS):
        txt = open(EXTRAS_JS, encoding="utf-8").read()
    else:
        txt = header
    close = txt.rfind("}")
    if close == -1:
        txt = header
        close = txt.rfind("}")
    lines = []
    for gid, val in entries.items():
        if re.search(r'"%s"\s*:' % re.escape(gid), txt):
            continue  # already listed — don't duplicate
        lines.append('  "%s": { "manual": "%s" },' % (gid, val["manual"]))
    if not lines:
        return 0
    # ensure the entry just before our block ends with a comma
    head = txt[:close].rstrip()
    if head and head[-1] not in "{,":
        head += ","
    new_txt = head + "\n" + "\n".join(lines) + "\n" + txt[close:]
    open(EXTRAS_JS + ".bak", "w", encoding="utf-8").write(txt)
    open(EXTRAS_JS, "w", encoding="utf-8").write(new_txt)
    return len(lines)


def index_manuals(namelist):
    """Group manual PDFs by a normalised game key. The collection nests files as
    'Commodore 64 Game manuals/<Game>/<file>.pdf', and a game folder may hold
    several PDFs (the manual plus a sequel, a security card, a quick-reference).
    Key on the FOLDER name (cleanest) and on the filename with doc-words
    stripped, so 'Boulder Dash/Boulder_Dash_Instructions.pdf' keys as
    'boulder dash'. Returns {key: [members]}."""
    docwords = re.compile(
        r"\b(instruction|instructions|manual|manuals|guide|playing guide|"
        r"reference|quick reference|docs?|document|documentation|instr)\b", re.I)
    groups = {}
    for m in namelist:
        if not m.lower().endswith(".pdf"):
            continue
        parts = [p for p in m.split("/") if p]
        base = os.path.splitext(parts[-1])[0]
        keys = set()
        if len(parts) >= 2 and "game manual" not in parts[-2].lower():
            keys.add(norm(parts[-2]))               # the game folder
        keys.add(norm(base))                        # the filename
        keys.add(norm(docwords.sub(" ", base)))     # filename minus "manual" etc.
        for k in keys:
            if k:
                groups.setdefault(k, [])
                if m not in groups[k]:
                    groups[k].append(m)
    return groups


def pick_pdf(members, title):
    """Choose the primary manual from a game folder: closest name to the title,
    favouring a real instruction/manual and avoiding sequels and side docs."""
    tnorm = norm(title)

    def score(m):
        stem = os.path.splitext(os.path.basename(m))[0]
        s = difflib.SequenceMatcher(None, tnorm, norm(stem)).ratio() * 3
        b = stem.lower()
        if "manual" in b or "instruction" in b:
            s += 0.5
        # a sequel number the title doesn't have (Impossible Mission 2, Test Drive II)
        if re.search(r"\b(2|ii|3|iii|4|duel)\b", b) and not re.search(r"\b(2|ii|3|iii|4)\b", tnorm):
            s -= 3
        for bad in ("construction", "security", "quick reference", "collection",
                    "map", "card", "keyboard", "poster", "catalog", "raisins"):
            if bad in b:
                s -= 1
        s -= len(b) * 0.003        # tie-break toward the plainer, shorter name
        return s

    return max(members, key=score)


def fetch_manuals(games, args):
    say("\n=== Manuals  (archive.org: %s) ===" % MANUAL_ITEM)
    zip_path = ensure_manual_zip(args)
    if not zip_path or not os.path.exists(zip_path):
        say("  no manual zip available; skipping.")
        return
    try:
        zf = zipfile.ZipFile(zip_path)
    except Exception as e:
        say("  ! not a readable zip (%s). If the download was interrupted, delete" % e)
        say("    tools/.cache/%s and re-run." % MANUAL_ZIP_NAME)
        return
    groups = index_manuals(zf.namelist())
    key_index = {k: k for k in groups}   # best_match wants key->value
    say("  %d PDF manuals in the collection, %d game folders.\n"
        % (sum(len(v) for v in groups.values()), len(groups)))
    os.makedirs(EXTRAS_DIR, exist_ok=True)
    new_entries = {}
    hits = misses = 0
    for g in games:
        out_name = "%s-manual.pdf" % g["id"]
        dest = os.path.join(EXTRAS_DIR, out_name)
        if os.path.exists(dest):
            say("  = %-34s manual already present" % g["title"][:34])
            new_entries[g["id"]] = {"manual": out_name}
            continue
        key, conf = best_match(g["title"], key_index)
        if not key or (conf < STRONG and not args.fuzzy):
            misses += 1
            extra = "" if not key else "  (closest '%s' @ %.2f — use --fuzzy)" % (key, conf)
            say("  - %-34s no confident match%s" % (g["title"][:34], extra))
            continue
        member = pick_pdf(groups[key], g["title"])
        tag = "" if conf >= 0.999 else "  ~%.2f" % conf
        if args.dry_run:
            say("  > %-34s <- %s%s  [dry-run]" % (g["title"][:34], os.path.basename(member), tag))
            hits += 1
            continue
        try:
            with zf.open(member) as src, open(dest, "wb") as out:
                out.write(src.read())
            new_entries[g["id"]] = {"manual": out_name}
            say("  + %-34s <- %s%s" % (g["title"][:34], os.path.basename(member), tag))
            hits += 1
        except Exception as e:
            misses += 1
            say("  ! %-34s extract failed: %s" % (g["title"][:34], e))
    if new_entries and not args.dry_run:
        changed = update_extras_js(new_entries)
        say("\n  extras.js: %d game(s) updated (backup at extras.js.bak)." % changed)
        say("  Each shows as an 'Extras' PDF on the game page. Bump the ?v= number")
        say("  in index.html/game.html so browsers pick up extras.js.")
    say("\n  Manuals: %d fetched, %d unmatched." % (hits, misses))


# ----------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Fetch C64 assets for the Retro Vault.")
    ap.add_argument("--roms", action="store_true")
    ap.add_argument("--covers", action="store_true")
    ap.add_argument("--manuals", action="store_true")
    ap.add_argument("--all", action="store_true", help="roms + covers + manuals")
    ap.add_argument("--only", nargs="+", metavar="ID", help="restrict to these game ids")
    ap.add_argument("--fuzzy", action="store_true", help="accept lower-confidence matches")
    ap.add_argument("--dry-run", action="store_true", help="resolve & report, download nothing")
    ap.add_argument("--sleep", type=float, default=1.0, help="seconds between requests")
    ap.add_argument("--manuals-zip", metavar="PATH", help="use an existing manual-collection zip")
    ap.add_argument("--yes", action="store_true", help="don't prompt before the big manual download")
    args = ap.parse_args()

    if args.all:
        args.roms = args.covers = args.manuals = True
    if not (args.roms or args.covers or args.manuals):
        ap.print_help()
        say("\nPick at least one of --roms / --covers / --manuals (or --all).")
        return

    if not os.path.exists(GAMES_JS):
        sys.exit("games.js not found — run this from inside the Vault folder.")

    games = selected(load_c64_games(), set(args.only or []))
    say("Retro Vault — C64 asset fetcher")
    say("%d C64 title(s) in scope%s." % (len(games), " (dry run)" if args.dry_run else ""))
    if not games:
        say("Nothing to do (check your --only ids).")
        return

    if args.roms:
        fetch_roms(games, args)
    if args.covers:
        fetch_covers(games, args)
    if args.manuals:
        fetch_manuals(games, args)

    try:
        os.makedirs(os.path.dirname(REPORT), exist_ok=True)
        open(REPORT, "w", encoding="utf-8").write("\n".join(report_lines) + "\n")
        print("\nReport written to %s" % os.path.relpath(REPORT, ROOT))
    except Exception:
        pass


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\ninterrupted.")
