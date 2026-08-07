#!/usr/bin/env python3
"""Add a C64-only 'Keeping this console alive' community banner, mirroring
the existing Videopac community panel exactly but with C64-relevant sites.
Run once from inside the VAULT folder."""
import re, sys

# ---------------------------------------------------------------------------
# 1. featured.js — add a new `c64community` array.
# ---------------------------------------------------------------------------
path = "featured.js"
txt = open(path, encoding="utf-8").read()

if "c64community:" in txt:
    print("featured.js: c64community array already exists, aborting to avoid duplicates.")
    sys.exit(1)

C64_COMMUNITY = '''  // ---- Keeping this console alive, C64 shelf -----------------------------
  // Same shape as "community" above, but for the C64 shelf - the sites and
  // projects that document, catalogue and still actively support this
  // machine. Shown only on the C64 shelf (placeBlocks() in app.js gates it
  // on state.platform === "C64").
  c64community: [
    { name: "CSDb",
      tint: "#5b8def",
      url: "https://csdb.dk/",
      lang: "International",
      what: "The scene's own database - releases, screenshots and history for practically everything written for the machine since 1982, including several of the 2020s homebrews on this shelf." },
    { name: "GameBase64",
      tint: "#2fb47c",
      url: "https://gamebase64.com/",
      lang: "International",
      what: "The exhaustive commercial-game catalogue project this shelf's C64 ROMs and cover art were largely sourced from." },
    { name: "Lemon64",
      tint: "#e0865a",
      url: "https://www.lemon64.com/",
      lang: "International",
      what: "One of the oldest and most active English-language C64 communities - reviews, box scans and a forum running since 2000." },
    { name: "C64-Wiki",
      tint: "#c07de0",
      url: "https://www.c64-wiki.com/wiki/Main_Page",
      lang: "International",
      what: "A community-run encyclopedia covering hardware, software and scene history, article by article." },
    { name: "Protovision",
      tint: "#e0c05a",
      url: "https://www.protovision.games/",
      lang: "Germany",
      what: "Still publishing brand new physical C64 cartridges and hardware today - proof this machine never actually stopped." },
    { name: "VICE",
      tint: "#4fb3bf",
      url: "https://vice-emu.sourceforge.io/",
      lang: "Open source",
      what: "The open-source emulator core this shelf's browser player actually runs on under the hood." }
  ],

'''

marker = "  // ---- Community --------------------------------------------------------"
if marker not in txt:
    print("featured.js: Community section header not found — file has changed since expected. Aborting, no edits made.")
    sys.exit(1)
idx = txt.index(marker)
txt = txt[:idx] + C64_COMMUNITY + txt[idx:]

open(path, "w", encoding="utf-8").write(txt)
print("featured.js: added c64community array")

# ---------------------------------------------------------------------------
# 2. index.html — duplicate the communityTpl template as c64communityTpl
# ---------------------------------------------------------------------------
path = "index.html"
txt = open(path, encoding="utf-8").read()
if 'id="c64communityTpl"' in txt:
    print("index.html: c64communityTpl already present, skipped.")
else:
    old_tpl = '''<template id="communityTpl">
  <div class="community">
    <div class="community-head">
      <div>
        <h3 data-i18n="communityHead">Keeping this console alive</h3>
        <p class="community-intro" data-i18n="communityIntro"></p>
      </div>
      <div class="carousel-nav">
        <button class="car-btn" data-dir="-1" aria-label="Previous">&#8249;</button>
        <button class="car-btn" data-dir="1" aria-label="Next">&#8250;</button>
      </div>
    </div>
    <div class="community-track"></div>
  </div>
</template>'''
    if old_tpl not in txt:
        print("index.html: communityTpl markup didn't match expected text — aborting, no edits made.")
        sys.exit(1)
    new_tpl = old_tpl.replace('id="communityTpl"', 'id="c64communityTpl"')
    txt = txt.replace(old_tpl, old_tpl + "\n\n" + new_tpl, 1)
    open(path, "w", encoding="utf-8").write(txt)
    print("index.html: added c64communityTpl (same markup/classes as communityTpl)")

# ---------------------------------------------------------------------------
# 3. app.js — c64CommunityBlock() + wire it into the C64 branch of placeBlocks()
# ---------------------------------------------------------------------------
path = "app.js"
txt = open(path, encoding="utf-8").read()
if "c64CommunityBlock" in txt:
    print("app.js: c64CommunityBlock already present, skipped.")
else:
    anchor = '''  function communityBlock() {
    var list = (window.FEATURED_DATA || {}).community || [];
    var tpl = document.getElementById("communityTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=communityHead]").textContent = window.t("communityHead");
    node.querySelector(".community-intro").textContent = window.t("communityIntro");
    var track = node.querySelector(".community-track");
    track.innerHTML = list.map(function (c) {
      return '<a class="community-item" href="' + c.url + '" target="_blank" rel="noopener" ' +
        'style="--tint:' + (c.tint || "#8a8f98") + '">' +
        '<span class="cname">' + c.name +
        (c.lang ? '<span class="clang">' + c.lang + '</span>' : '') + '</span>' +
        '<p class="cwhat">' + c.what + '</p></a>';
    }).join("");
    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = track.clientWidth * 0.8 * parseInt(this.dataset.dir, 10);
        track.scrollBy({ left: step, behavior: "smooth" });
      });
    });
    return node;
  }'''
    if anchor not in txt:
        print("app.js: communityBlock() text didn't match expected — aborting, no edits made.")
        sys.exit(1)
    addition = '''

  // The C64 shelf's own "keeping this console alive" panel - same carousel
  // as the Videopac one above, separate data (c64community in featured.js)
  // and template so a C64 site never shows on the Videopac page or vice versa.
  function c64CommunityBlock() {
    var list = (window.FEATURED_DATA || {}).c64community || [];
    var tpl = document.getElementById("c64communityTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=communityHead]").textContent = window.t("communityHead");
    node.querySelector(".community-intro").textContent = window.t("communityIntro");
    var track = node.querySelector(".community-track");
    track.innerHTML = list.map(function (c) {
      return '<a class="community-item" href="' + c.url + '" target="_blank" rel="noopener" ' +
        'style="--tint:' + (c.tint || "#8a8f98") + '">' +
        '<span class="cname">' + c.name +
        (c.lang ? '<span class="clang">' + c.lang + '</span>' : '') + '</span>' +
        '<p class="cwhat">' + c.what + '</p></a>';
    }).join("");
    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = track.clientWidth * 0.8 * parseInt(this.dataset.dir, 10);
        track.scrollBy({ left: step, behavior: "smooth" });
      });
    });
    return node;
  }'''
    txt = txt.replace(anchor, anchor + addition, 1)

    old_c64_branch = '''    if (state.platform === "C64") {
      if (total >= 6) insertAt(c64AdBlock(), Math.min(12, Math.floor(total / 2)));
      if (total >= 40) insertAt(c64HomebrewBlock(), Math.min(80, Math.floor(total * 2 / 3)));
      return;
    }'''
    if old_c64_branch not in txt:
        print("app.js: placeBlocks() C64 branch text didn't match expected — c64CommunityBlock() added but NOT wired in. Fix placeBlocks() by hand.")
    else:
        new_c64_branch = '''    if (state.platform === "C64") {
      if (total >= 6) insertAt(c64AdBlock(), Math.min(12, Math.floor(total / 2)));
      if (total >= 40) insertAt(c64HomebrewBlock(), Math.min(80, Math.floor(total * 2 / 3)));
      if (total >= 20) insertAt(c64CommunityBlock(), Math.min(50, Math.floor(total * 5 / 6)));
      return;
    }'''
        txt = txt.replace(old_c64_branch, new_c64_branch, 1)
        print("app.js: c64CommunityBlock() added and wired into placeBlocks()")

    open(path, "w", encoding="utf-8").write(txt)

# ---------------------------------------------------------------------------
# 4. Also update the cleanup-selector line in placeBlocks() so the new
#    ".community" strip on the C64 page gets removed/re-rendered like the
#    others on shelf switch (it already IS ".community" class, same as the
#    Videopac one, so the existing selector already covers it - verify).
# ---------------------------------------------------------------------------
if '.sponsor-strip, .homebrew-strip, .community, .c64-ad-strip' in txt:
    print("app.js: cleanup selector already covers .community (shared class) - no change needed")
else:
    print("app.js: WARNING - cleanup selector text not found where expected, please check placeBlocks() manually")

print("\nDONE")
