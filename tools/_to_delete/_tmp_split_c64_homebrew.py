#!/usr/bin/env python3
"""Split the shared 'homebrew' featured panel into two: keep the Videopac one
(G7000 picks only) and add a new C64-only one, so C64 homebrew stops showing
on the Videopac shelf page. Run once from inside the VAULT folder."""
import re, sys

# ---------------------------------------------------------------------------
# 1. featured.js — move the 6 c64_hb_* entries out of `homebrew:` and into a
#    new `c64homebrew:` array.
# ---------------------------------------------------------------------------
path = "featured.js"
txt = open(path, encoding="utf-8").read()

C64_BLOCK = '''    { id: "c64_hb_c64anabalt", shot: "c64_hb_c64anabalt.png",
      blurb: "RGCD's 16KB cartridge demake of Canabalt, 2012 — one button, infinite fall, and proof the C64 could still do a modern indie hit justice a decade after Philips-era rivals had all gone quiet." },
    { id: "c64_hb_wolfling", shot: "c64_hb_wolfling.png",
      blurb: "Lazycow, one of the most prolific names in modern C64 homebrew, sends a wolf cub jumping through a tight 2019 platformer built from scratch, thirty-six years after the machine launched." },
    { id: "c64_hb_hero_is_back", shot: "c64_hb_hero_is_back.png",
      blurb: "Excess and Hokuto Force built an unofficial sequel to Activision's 1984 H.E.R.O. in 2025 — same jetpack, same dynamite, brand new caverns, over four decades on." },
    { id: "c64_hb_luftrauserz", shot: "c64_hb_luftrauserz.png",
      blurb: "Triad squeezed 2014's PC dogfighter Luftrausers onto real C64 silicon in 2017 — physics-driven plane combat the hardware was never supposed to run." },
    { id: "c64_hb_bagman_strikes_back", shot: "c64_hb_bagman_strikes_back.png",
      blurb: "Laxity's 2022 tribute to the 1983 arcade platformer Bagman — a thief hauling gold up ladders, dodging guards, forty years and one homebrew scene later." },
    { id: "c64_hb_grid_pix", shot: "c64_hb_grid_pix.png",
      blurb: "Excess brought Picross to the C64 in 2020 — a genre the original 213-game and 43-game shelves never had — later picked up for a real boxed cartridge release." }
'''
REMOVE_STR = C64_BLOCK + ",\n"

if "c64homebrew:" in txt:
    print("featured.js: c64homebrew array already exists, aborting to avoid duplicates.")
    sys.exit(1)

if REMOVE_STR not in txt:
    print("featured.js: could not find the exact C64 block to move — file has changed since expected. Aborting, no edits made.")
    sys.exit(1)

txt = txt.replace(REMOVE_STR, "", 1)

# Freshen the stale "43-game" reference (C64 shelf has grown since that blurb
# was written) as we move it into its own C64-only panel.
c64_block_fixed = C64_BLOCK.replace("213-game and 43-game shelves", "Videopac and C64 shelves")

new_array = (
    "\n  // ---- Homebrew, C64 shelf ------------------------------------------\n"
    "  // Same shape as \"homebrew\" above, but only shown on the C64 shelf page\n"
    "  // (placeBlocks() in app.js gates it on state.platform === \"C64\"). Kept\n"
    "  // as its own array, not mixed into \"homebrew\", so Videopac's panel\n"
    "  // never shows a C64 game a Videopac visitor can't even play.\n"
    "  c64homebrew: [\n"
    + c64_block_fixed +
    "  ],\n"
)

marker = "  homebrew: [\n"
close_marker = "\n  ],\n"
start = txt.index(marker)
close_idx = txt.index(close_marker, start) + len(close_marker)
txt = txt[:close_idx] + new_array + txt[close_idx:]

open(path, "w", encoding="utf-8").write(txt)
print("featured.js: split done — homebrew (Videopac) + new c64homebrew (C64)")

# ---------------------------------------------------------------------------
# 2. index.html — duplicate the homebrewTpl template as c64homebrewTpl
# ---------------------------------------------------------------------------
path = "index.html"
txt = open(path, encoding="utf-8").read()
if 'id="c64homebrewTpl"' in txt:
    print("index.html: c64homebrewTpl already present, skipped.")
else:
    old_tpl = '''<template id="homebrewTpl">
  <div class="homebrew-strip">
    <div class="hb-head">
      <div>
        <h3><span data-i18n="homebrewHead">Still being written</span><span class="hb-word"></span></h3>
        <p class="hb-intro" data-i18n="homebrewIntro"></p>
      </div>
    </div>
    <div class="feature-row">
      <a class="feature-main" href="#"></a>
      <div class="feature-list"></div>
    </div>
  </div>
</template>'''
    if old_tpl not in txt:
        print("index.html: homebrewTpl markup didn't match expected text — aborting, no edits made.")
        sys.exit(1)
    new_tpl = old_tpl.replace('id="homebrewTpl"', 'id="c64homebrewTpl"')
    txt = txt.replace(old_tpl, old_tpl + "\n\n" + new_tpl, 1)
    open(path, "w", encoding="utf-8").write(txt)
    print("index.html: added c64homebrewTpl (same markup/classes as homebrewTpl)")

# ---------------------------------------------------------------------------
# 3. app.js — c64HomebrewBlock() + wire it into the C64 branch of placeBlocks()
# ---------------------------------------------------------------------------
path = "app.js"
txt = open(path, encoding="utf-8").read()
if "c64HomebrewBlock" in txt:
    print("app.js: c64HomebrewBlock already present, skipped.")
else:
    anchor = '''  var hbStop = null;
  function homebrewBlock() {
    var picks = ((window.FEATURED_DATA || {}).homebrew || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("homebrewTpl");
    if (!picks.length || !tpl) return null;
    if (hbStop) hbStop();
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");
    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");
    node.querySelector(".hb-intro").textContent = window.t("homebrewIntro");
    hbStop = featureRotator(node.querySelector(".feature-main"),
                            node.querySelector(".feature-list"), picks);
    return node;
  }'''
    if anchor not in txt:
        print("app.js: homebrewBlock() text didn't match expected — aborting, no edits made.")
        sys.exit(1)
    addition = '''

  // The C64 shelf's own homebrew panel - same idea as the Videopac one above,
  // separate data (c64homebrew in featured.js) and template so a C64 pick
  // never leaks onto the Videopac page and vice versa.
  var c64HbStop = null;
  function c64HomebrewBlock() {
    var picks = ((window.FEATURED_DATA || {}).c64homebrew || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("c64homebrewTpl");
    if (!picks.length || !tpl) return null;
    if (c64HbStop) c64HbStop();
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");
    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");
    node.querySelector(".hb-intro").textContent = window.t("homebrewIntro");
    c64HbStop = featureRotator(node.querySelector(".feature-main"),
                               node.querySelector(".feature-list"), picks);
    return node;
  }'''
    txt = txt.replace(anchor, anchor + addition, 1)

    old_c64_branch = '''    if (state.platform === "C64") {
      if (total >= 6) insertAt(c64AdBlock(), Math.min(12, Math.floor(total / 2)));
      return;
    }'''
    if old_c64_branch not in txt:
        print("app.js: placeBlocks() C64 branch text didn't match expected — c64HomebrewBlock() added but NOT wired in. Fix placeBlocks() by hand.")
    else:
        new_c64_branch = '''    if (state.platform === "C64") {
      if (total >= 6) insertAt(c64AdBlock(), Math.min(12, Math.floor(total / 2)));
      if (total >= 40) insertAt(c64HomebrewBlock(), Math.min(80, Math.floor(total * 2 / 3)));
      return;
    }'''
        txt = txt.replace(old_c64_branch, new_c64_branch, 1)
        print("app.js: c64HomebrewBlock() added and wired into placeBlocks()")

    open(path, "w", encoding="utf-8").write(txt)

print("\nDONE")
