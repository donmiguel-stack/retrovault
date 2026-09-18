#!/usr/bin/env python3
"""Pre-render one static HTML page per game into game/.

Why this exists
---------------
Every game page used to be the same game.html with a different ?id=. The real
title, description, canonical and JSON-LD were written by setGameMeta() after
the page's JavaScript ran, so the *served* HTML for all 396 URLs was byte
identical: one generic title, one generic description, no canonical at all.

Search Console on 2026-09-18 showed what that costs: 1 page of the whole
property indexed, 362 "Discovered - currently not indexed", and the single game
page Google did crawl (game.html?id=vp_38, 12 Sept) crawled and then dropped.
A crawler has no reason to spend a fetch on the 396th copy of a page it has
already decided is the same as the first.

This writes each game out as a real file with its own metadata in the served
HTML, so the first byte a crawler reads is already unique. It also gives the
per-game social cards that were impossible before - X, Facebook, LinkedIn,
Slack and WhatsApp do not run JavaScript, so a card written by setGameMeta()
never reached any of them.

How it works
------------
game.html stays the single source of truth for the page's markup: this reads
it, swaps the head's generic metadata for the game's own, and writes the result
to game/<id>.html. Anything added to game.html's body or script list is picked
up automatically the next time this runs - there is no second copy of the page
to keep in sync.

Two hooks in game-page.js make the generated page work without a query string:

    window.RV_GAME_ID      which game to render
    window.RV_STATIC_META  suppresses setGameMeta(), which would otherwise
                           append a second title/description/canonical/JSON-LD
                           on top of the ones already in the HTML

The generated pages sit one directory down, so each carries <base href="../">.
That is safe here because game.html has no fragment-only links (checked: zero
href="#..."), and it means every relative path in the shared markup, in
game-page.js and in the emulator hand-off (location.href = "emulator/...")
keeps resolving against the site root exactly as it does from game.html.

Run from the vault root, after adding games:

    python3 tools/make_gamepages.py
    python3 tools/make_sitemap.py

games.js parses as plain JSON once its `window.X =` wrapper is stripped, but
gamepages.js and genres.js do not - they are hand-written JS with comments and
trailing commas. Rather than write a second, weaker parser, this evaluates them
with node, which is the same engine the browser uses. That keeps the generated
description byte-identical to what setGameMeta() produces at runtime.
"""

import io
import json
import os
import re
import subprocess
import sys
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://demo.retrovault.world"
OUTDIR = os.path.join(ROOT, "game")

# Kept in step with setGameMeta() in game-page.js.
PLATFORM = {
    "G7000": "Philips Videopac G7000 / Magnavox Odyssey²",
    "G7400+": "Philips Videopac G7400",
    "C64": "Commodore 64",
    "PC": "MS-DOS",
    "Amiga": "Commodore Amiga",
}


# --------------------------------------------------------------------------
# reading the data files
# --------------------------------------------------------------------------

def load_js(files):
    """Evaluate the given JS data files in node and return their globals.

    Each file is a single `window.X = {...}` assignment. node has no `window`,
    so one is supplied before the files are evaluated, and the result is dumped
    as JSON for python to read back.
    """
    script = ["global.window = global;"]
    for f in files:
        script.append("require(%s);" % json.dumps(os.path.join(ROOT, f)))
    # alternates.js elects one "primary" dump per cartridge and hides the rest
    # from the shelf. Those alternates are the same game, so their pages repeat
    # the primary's title and description almost exactly - 76 of the 396 do.
    # Ask it which is which, so each alternate can point its canonical at the
    # primary instead of claiming to be a page of its own.
    script.append(
        "var prim = {};"
        "if (window.VAULT_ALT) { for (var g of window.GAMES_DATA.games) {"
        "  var p = window.VAULT_ALT.primaryOf(g.id); if (p) prim[g.id] = p; } }"
    )
    script.append(
        "process.stdout.write(JSON.stringify({"
        "games: window.GAMES_DATA, pages: window.GAMEPAGES_DATA,"
        "genres: window.GENRE_DATA, i18n: window.I18N, primaries: prim"
        "}));"
    )
    out = subprocess.run(
        ["node", "-e", "\n".join(script)],
        capture_output=True, text=True, cwd=ROOT,
    )
    if out.returncode != 0:
        sys.exit("node failed reading the data files:\n" + out.stderr.strip())
    return json.loads(out.stdout)


# --------------------------------------------------------------------------
# the metadata itself - deliberately mirrors setGameMeta()
# --------------------------------------------------------------------------

def page_title(g):
    """`Munchkin - Videopac 38, 1981 | Retro Vault`.

    Short on purpose: a search result cuts off around 60 characters, so this
    is the game, just enough to tell it apart from the same title on another
    machine, then the site.
    """
    bits = []
    if g.get("vpNumber"):
        bits.append("Videopac " + str(g["vpNumber"]))
    else:
        bits.append({"PC": "MS-DOS", "C64": "C64", "Amiga": "Amiga"}
                    .get(g["platform"], "Videopac"))
    if g.get("year"):
        bits.append(str(g["year"]))
    return "%s — %s | Retro Vault" % (g["title"], ", ".join(bits))


def page_description(g, data, tail):
    """The game's own history prose, trimmed to fit a search result.

    Falls back to a built sentence for the titles with no history on file. The
    trim lands on a sentence end where there is one and a word boundary
    otherwise, because a description cut mid-word looks broken in results.
    """
    prose = ((data.get("history") or {}).get("text")) or ""
    budget = 155 - len(tail) - 1
    if prose:
        desc = re.sub(r"\s+", " ", re.sub(r"<[^>]*>", " ", prose)).strip()
        if len(desc) > budget:
            cut = desc[:budget]
            stop = cut.rfind(". ")
            if stop > budget * 0.45:
                desc = cut[:stop + 1]
            else:
                desc = re.sub(r"\s+\S*$", "", cut)
                desc = re.sub(r"[,;:\-—]$", "", desc) + "…"
    else:
        platform = PLATFORM.get(g["platform"], g["platform"])
        desc = g["title"] + " for the " + platform
        if g.get("year"):
            desc += ", released in " + str(g["year"])
        if g.get("publisher"):
            desc += " by " + g["publisher"]
        desc += "."
    return desc.rstrip() + " " + tail


def cover_url(gid):
    """Absolute URL of the game's own box art, or None.

    This is the per-game social card that was impossible while the metadata
    was written in JavaScript. game-page.js tries .png then .jpg; do the same
    against what is actually on disk.
    """
    for ext in ("png", "jpg"):
        if os.path.exists(os.path.join(ROOT, "covers", "%s.%s" % (gid, ext))):
            return "%s/covers/%s.%s" % (BASE, quote(gid, safe=""), ext)
    return None


def json_ld(g, data, genre, canon, desc):
    ld = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": g["title"],
        "url": canon,
        "gamePlatform": PLATFORM.get(g["platform"], g["platform"]),
        "description": desc,
        "inLanguage": "en",
        "isPartOf": {"@type": "CollectionPage", "name": "Retro Vault",
                     "url": BASE + "/"},
    }
    if g.get("year"):
        ld["datePublished"] = str(g["year"])
    if g.get("publisher"):
        ld["publisher"] = {"@type": "Organization", "name": g["publisher"]}
    if g.get("developer"):
        ld["author"] = {"@type": "Organization", "name": g["developer"]}
    if genre.get("genre"):
        ld["genre"] = genre["genre"]
    video = data.get("video") or {}
    if video.get("id"):
        ld["trailer"] = {
            "@type": "VideoObject",
            "name": video.get("title") or (g["title"] + " gameplay"),
            "embedUrl": "https://www.youtube.com/embed/" + video["id"],
        }
    cover = cover_url(g["id"])
    if cover:
        ld["image"] = cover
    return ld


# --------------------------------------------------------------------------
# building the page
# --------------------------------------------------------------------------

def attr(v):
    """Escape for an HTML attribute value."""
    return (v.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def split_template():
    """game.html as (head_inner, rest), where rest starts at </head>."""
    html = io.open(os.path.join(ROOT, "game.html"), encoding="utf-8").read()
    i = html.index("<head>") + len("<head>")
    j = html.index("</head>")
    return html[i:j], html[j:]


def build(head, g, data, genre, tail, primary=None):
    gid = g["id"]
    # An alternate dump - a French release, a fixed dump, a homebrew clone -
    # is the same cartridge as its primary and carries the same title and
    # history, so it points its canonical at the primary rather than asking to
    # be indexed as a page in its own right. That is the difference between 320
    # distinct pages and 396 pages with 76 near-duplicates among them, which is
    # the shape that produced "Duplicate without user-selected canonical" in the
    # first place. No noindex alongside it: a canonical and a noindex on the
    # same page contradict each other, and the canonical is the honest signal.
    self_url = "%s/game/%s.html" % (BASE, quote(gid, safe=""))
    canon = ("%s/game/%s.html" % (BASE, quote(primary, safe=""))) if primary else self_url
    title = page_title(g)
    desc = page_description(g, data, tail)
    cover = cover_url(gid)

    # The generic head is rewritten line by line rather than replaced wholesale,
    # so that anything else game.html carries - icons, stylesheets, the
    # analytics beacon - is inherited and cannot drift out of step.
    def swap(pattern, replacement):
        nonlocal head
        head, n = re.subn(pattern, lambda _m: replacement, head, count=1)
        if n != 1:
            raise SystemExit("game.html head no longer matches: %s" % pattern)

    # The note in game.html explaining why its og: tags are static and generic
    # does not apply to a page whose metadata is in the served HTML.
    head = re.sub(r"<!--\s*Per-game title.*?-->", "", head, count=1, flags=re.S)

    swap(r"<title>.*?</title>", "<title>%s</title>" % attr(title))
    swap(r'<meta name="description" content=".*?">',
         '<meta name="description" content="%s">' % attr(desc))
    swap(r'<meta property="og:title" content=".*?">',
         '<meta property="og:title" content="%s">' % attr(title))
    swap(r'<meta property="og:description" content=".*?">',
         '<meta property="og:description" content="%s">' % attr(desc))

    if cover:
        # The game's own box art, at its own dimensions - so the width/height
        # hints that describe the generic shelf screenshot have to go.
        swap(r'<meta property="og:image" content=".*?">',
             '<meta property="og:image" content="%s">' % attr(cover))
        swap(r'<meta property="og:image:width" content=".*?">\s*', "")
        swap(r'<meta property="og:image:height" content=".*?">\s*', "")
        swap(r'<meta property="og:image:alt" content=".*?">',
             '<meta property="og:image:alt" content="%s">'
             % attr("Box art for " + g["title"]))
        swap(r'<meta name="twitter:image" content=".*?">',
             '<meta name="twitter:image" content="%s">' % attr(cover))

    ld = json.dumps(json_ld(g, data, genre, canon, desc),
                    ensure_ascii=False, separators=(",", ":"))

    lead = (
        '\n<!-- Generated by tools/make_gamepages.py from game.html - do not'
        ' hand-edit.\n     Edit game.html, game.css or game-page.js and run the'
        ' generator again. -->\n'
        '<base href="../">\n'
    )
    tailblock = (
        '<link rel="canonical" href="%s">\n'
        '<meta property="og:url" content="%s">\n'
        '<script type="application/ld+json">%s</script>\n'
        '<script>window.RV_GAME_ID=%s;window.RV_STATIC_META=true;</script>\n'
        % (attr(canon), attr(canon), ld, json.dumps(gid))
    )
    return lead + head.strip("\n") + "\n" + tailblock



# --------------------------------------------------------------------------
# the catalogue index
# --------------------------------------------------------------------------

CATALOGUE_CSS = """
  .cat-wrap{max-width:1100px;margin:0 auto;padding:24px;}
  .cat-wrap h1{margin:0 0 6px;font-size:28px;}
  .cat-lede{margin:0 0 28px;color:var(--text-dim);font-size:15px;line-height:1.6;max-width:70ch;}
  .cat-shelf{margin:0 0 34px;}
  .cat-shelf h2{font-size:17px;margin:0 0 4px;display:flex;align-items:baseline;gap:10px;}
  .cat-count{font-size:13px;font-weight:400;color:var(--text-mute);}
  .cat-list{list-style:none;margin:14px 0 0;padding:0;columns:3;column-gap:28px;}
  .cat-list li{break-inside:avoid;margin:0 0 7px;font-size:14px;line-height:1.45;}
  .cat-list a{color:var(--text);text-decoration:none;}
  .cat-list a:hover{color:var(--accent);text-decoration:underline;}
  .cat-year{color:var(--text-mute);font-size:12.5px;}
  @media (max-width:900px){.cat-list{columns:2;}}
  @media (max-width:560px){.cat-list{columns:1;}}
"""

# Order the shelves the way the library does, not alphabetically.
SHELVES = [
    ("G7000", "Videopac / Magnavox Odyssey\u00b2"),
    ("G7400+", "Videopac G7400"),
    ("C64", "Commodore 64"),
    ("Amiga", "Commodore Amiga"),
    ("PC", "MS-DOS"),
]


def write_catalogue(games, head, rest_unused, primaries=None):
    """A plain HTML index of every game, as real links in the served markup.

    The shelf grid on the library page is built in JavaScript, so a crawler
    following links from the homepage reaches no game page at all - the sitemap
    was the only route in, and a sitemap-only URL is the kind Google is
    slowest to spend a fetch on. This page gives all 396 an ordinary <a href>
    on a page that is itself linked from the library, which is the discovery
    path search engines actually prioritise.

    It is useful to a person too: one flat, sorted list of the whole catalogue,
    no JavaScript and no filtering needed.
    """
    # Alternates are hidden from the shelf grid and canonical to their
    # primary, so listing them here would hand crawlers 76 links to pages that
    # have just told them to look somewhere else.
    primaries = primaries or {}
    listed = [g for g in games if not primaries.get(g["id"])]
    by_shelf = {}
    for g in listed:
        by_shelf.setdefault(g["platform"], []).append(g)

    out = []
    for key, label in SHELVES:
        rows = sorted(by_shelf.get(key, []),
                      key=lambda x: x["title"].lower())
        if not rows:
            continue
        items = []
        for g in rows:
            href = "game/%s.html" % quote(g["id"], safe="")
            year = (' <span class="cat-year">%s</span>' % g["year"]) if g.get("year") else ""
            items.append('      <li><a href="%s">%s</a>%s</li>'
                         % (attr(href), attr(g["title"]), year))
        out.append(
            '  <section class="cat-shelf">\n'
            '    <h2>%s <span class="cat-count">%d titles</span></h2>\n'
            '    <ul class="cat-list">\n%s\n    </ul>\n'
            '  </section>' % (attr(label), len(rows), "\n".join(items)))

    title = "All games \u2014 the full Retro Vault catalogue"
    desc = ("Every one of the %d releases in Retro Vault, listed by shelf: "
            "Videopac and Magnavox Odyssey\u00b2, Commodore 64, Amiga and "
            "MS-DOS. Each one plays in your browser." % len(listed))
    canon = BASE + "/catalogue.html"

    # Reuse game.html's head for the icons, stylesheet and analytics beacon, so
    # this page cannot drift out of step with the rest of the site either.
    h = re.sub(r"<!--\s*Per-game title.*?-->", "", head, count=1, flags=re.S)
    h = re.sub(r"<title>.*?</title>", "<title>%s</title>" % attr(title), h, count=1)
    h = re.sub(r'<meta name="description" content=".*?">',
               '<meta name="description" content="%s">' % attr(desc), h, count=1)
    h = re.sub(r'<meta property="og:title" content=".*?">',
               '<meta property="og:title" content="%s">' % attr(title), h, count=1)
    h = re.sub(r'<meta property="og:description" content=".*?">',
               '<meta property="og:description" content="%s">' % attr(desc), h, count=1)
    h = re.sub(r'<meta property="og:type" content=".*?">',
               '<meta property="og:type" content="website">', h, count=1)
    h = re.sub(r'<link rel="stylesheet" href="game\.css.*?">', "", h, count=1)

    ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Retro Vault \u2014 all games",
        "url": canon,
        "description": desc,
        "isPartOf": {"@type": "WebSite", "name": "Retro Vault", "url": BASE + "/"},
    }, ensure_ascii=False, separators=(",", ":"))

    page = (
        "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n"
        "<!-- Generated by tools/make_gamepages.py - do not hand-edit. -->\n"
        + h.strip("\n") + "\n"
        + '<link rel="canonical" href="%s">\n' % attr(canon)
        + '<meta property="og:url" content="%s">\n' % attr(canon)
        + '<script type="application/ld+json">%s</script>\n' % ld
        + "<style>%s</style>\n" % CATALOGUE_CSS
        + "</head>\n<body>\n"
        + '<div class="topbar">\n'
          '  <div class="brand"><span class="brand-mark">'
          '<img src="assets/kcmunch.png" alt="" width="22" height="22"></span> '
          'Retro Vault <span class="brand-sub">Videopac &middot; Odyssey&sup2; '
          '&middot; C64 &middot; Amiga &middot; PC</span></div>\n'
          '  <div style="flex:1"></div>\n'
          '  <a class="ghost-btn" href="index.html" '
          'style="display:inline-block;text-decoration:none;">Library</a>\n'
          '  <a class="ghost-btn" href="resources.html" '
          'style="display:inline-block;text-decoration:none;">Resources</a>\n'
          "</div>\n"
        + '<div class="cat-wrap">\n'
        + "  <h1>All games</h1>\n"
        + '  <p class="cat-lede">Every release in the Vault, by shelf. '
          'The library page is the one with the box art, the filters and the '
          'featured picks \u2014 this is the flat list, for finding a title by '
          'name and for search engines, which cannot see a grid that '
          'JavaScript builds.</p>\n'
        + "\n".join(out) + "\n"
        + "</div>\n"
        + '<script src="i18n.js?v=125"></script>\n'
        + "</body>\n</html>\n"
    )
    io.open(os.path.join(ROOT, "catalogue.html"), "w", encoding="utf-8").write(page)
    print("catalogue.html: %d links across %d shelves (%d alternates left out)"
          % (len(listed), len({g["platform"] for g in listed}),
             len(games) - len(listed)))


def main():
    # alternates.js must come after games.js - it reads window.GAMES_DATA on load.
    data = load_js(["games.js", "alternates.js", "gamepages.js", "genres.js",
                    "i18n.js"])
    games = data["games"]["games"]
    pages = data["pages"] or {}
    genres = data["genres"] or {}
    tail = data["i18n"]["en"]["metaTail"]
    primaries = data.get("primaries") or {}

    head, rest = split_template()
    if not os.path.isdir(OUTDIR):
        os.makedirs(OUTDIR)

    written, no_history, no_cover = 0, 0, 0
    keep = set()
    for g in games:
        gid = g["id"]
        gdata = pages.get(gid) or {}
        page = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>" \
               + build(head, g, gdata, genres.get(gid) or {}, tail,
                       primaries.get(gid)) \
               + rest
        name = gid + ".html"
        keep.add(name)
        io.open(os.path.join(OUTDIR, name), "w", encoding="utf-8").write(page)
        written += 1
        if not ((gdata.get("history") or {}).get("text")):
            no_history += 1
        if not cover_url(gid):
            no_cover += 1

    # A game removed from games.js must not leave an orphan page behind: it
    # would stay in the index, reachable and stale, long after the catalogue
    # stopped listing it.
    stale = [f for f in os.listdir(OUTDIR)
             if f.endswith(".html") and f not in keep]
    for f in stale:
        os.remove(os.path.join(OUTDIR, f))

    print("game/: %d pages written%s" % (written,
          (", %d stale removed" % len(stale)) if stale else ""))
    print("       %d fell back to a built description (no history on file)"
          % no_history)
    print("       %d have no cover art, so no per-game social card" % no_cover)
    print("       %d are alternate dumps, canonical to their primary"
          % len([g for g in games if primaries.get(g["id"])]))

    write_catalogue(games, head, rest, primaries)


if __name__ == "__main__":
    main()
