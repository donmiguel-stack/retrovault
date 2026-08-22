// One entry per game on the Videopac shelf.
//
// The catalogue keeps every dump of a cartridge - EU, G7400+ Plus-graphics,
// French, alt/hack dumps, community mods - but the shelf used to show all of
// them as separate cards (four VP#1s, three VP#5s...). This module groups the
// dumps of the same game and elects one "primary" per group:
//
//   1. Official Videopac (EU), G7400+  - the Plus-graphics release wins
//   2. Official Videopac (EU), G7000
//   3. Official Videopac (French), G7400+ then G7000
//   4. Modified / fixed dumps last
//
// Within a tier, clean dumps (vp_XX / vp_XXpl) beat alt/hack/fix variants.
// Everything that loses the election becomes an "alternate": hidden from the
// shelf grid (favorites still show them) and listed on the primary's game
// page instead. Explicit groups below handle the homebrews, which have no
// vpNumber to group on.
//
// Exposes:
//   window.VAULT_ALT.altsOf(id)    -> [ids] of alternates when id is primary
//   window.VAULT_ALT.primaryOf(id) -> primary id when id is an alternate
window.VAULT_ALT = (function () {
  "use strict";

  var games = (window.GAMES_DATA && window.GAMES_DATA.games) || [];

  // Categories that take part in vpNumber grouping. US, Brazil, Jopac, PAL,
  // Parker, Imagic, Rare each have their own numbering or none - they keep
  // their own cards.
  var GROUP_CATS = {
    "Official Videopac (EU)": 0,
    "Official Videopac (French)": 100,
    "Modified / fixed": 200
  };

  // Homebrews, rare dumps, Parker/Brazil twins and anything else without a
  // usable vpNumber, grouped by hand: primary id -> its alternates. These
  // MERGE with the computed vpNumber groups (vp_33 also picks up the PAL
  // dump on top of its computed alt, Munchkin collects its homebrew clones).
  var EXPLICIT = {
    "new_ktaa": ["new_ktaa-demo1", "new_ktaa-demo2"],
    // rare / unreleased alt dumps
    "pr_martian-threat": ["pr_martian-threat_alt"],
    "pr_spiderman": ["pr_spiderman_alt"],
    // Red Baron is an unreleased prototype of what shipped as VP58 Air
    // Battle (same engine and title screen), so both its dumps live on
    // Air Battle's page
    "vp_58_12": ["pr_red-baron", "pr_red-baron_alt"],
    "pr_clay-pigeon_pl": ["pr_clay-pigeon_pl_alt", "br_9474"],
    // US alt dump
    "o2_48": ["o2_48alt"],
    // Parker Brothers originals with their same-name Philips Brazil releases
    "pb_popeye": ["br_9484"],
    "pb_frogger": ["br_9483"],
    "pb_q-bert": ["br_9485"],
    "pb_super-cobra": ["br_9486"],
    // Imagic's Demon Attack with its community Plus mod (the Jopac
    // Plus-enhanced French release keeps its own card)
    "im_demon-attack": ["mod_demon-attack_pl"],
    // homebrew variants
    "new_amok": ["new_amok_alt"],
    "new_puzzle-piece-panic": ["new_ppp-o2em"],
    // Munchkin's homebrew clones live on the official VP#38 page
    "vp_38": ["new_jg-munchkin", "new_kc-pacvid", "new_kc-pacman"],
    // the PAL conversion of Jumping Acrobats joins VP#33's computed group
    "vp_33": ["pal_acrobats"]
  };

  function score(g) {
    var s = GROUP_CATS[g.category];
    s += (g.platform === "G7400+") ? 0 : 1;
    // alt dumps, hacks and fix revisions rank below the clean dump
    if (/hack|alt|fix|_12|examples/i.test(g.id)) s += 10;
    return s;
  }

  var byNum = {};
  games.forEach(function (g) {
    if (!g.vpNumber || GROUP_CATS[g.category] === undefined) return;
    // normalize "09" vs 9 - the teaching-cart mod of Computer Programmer
    // stores its number as a bare 9 while the official dump says "09"
    var key = String(parseInt(g.vpNumber, 10));
    if (key === "NaN") return;
    (byNum[key] = byNum[key] || []).push(g);
  });

  var altsOf = {};    // primary id -> [alt ids]
  var primaryOf = {}; // alt id -> primary id

  Object.keys(byNum).forEach(function (num) {
    var group = byNum[num];
    if (group.length < 2) return;
    group.sort(function (a, b) { return score(a) - score(b); });
    var primary = group[0];
    var alts = group.slice(1).map(function (g) { return g.id; });
    altsOf[primary.id] = alts;
    alts.forEach(function (id) { primaryOf[id] = primary.id; });
  });

  Object.keys(EXPLICIT).forEach(function (pid) {
    var list = altsOf[pid] || [];
    EXPLICIT[pid].forEach(function (id) {
      if (list.indexOf(id) === -1) list.push(id);
      primaryOf[id] = pid;
    });
    altsOf[pid] = list;
  });

  return {
    altsOf: function (id) { return altsOf[id] || null; },
    primaryOf: function (id) { return primaryOf[id] || null; },
    isAlternate: function (id) { return primaryOf[id] !== undefined; }
  };
})();
