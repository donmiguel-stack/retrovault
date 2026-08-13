// Free / pay-what-you-want homebrew releases that have a page where you can
// leave the creator something. Shown as a Support button on that game's page.
//
// This is not shops.js - nothing is bought or sold here. The game itself is
// free (or pay-what-you-want) straight from the person who made it; the
// button links to that release page - itch.io, their own site, wherever they
// actually put it - so any support goes to them directly. The Vault takes no
// cut and holds no account there.
//
//   id       must match a game id in games.js
//   creator  shown under the button
//   url      the release page itself, not a general profile/front page
//   note     optional - what the page says about pricing, e.g. "pay what you want"
//   checked  the day this was last confirmed live, printed so it can go
//            stale honestly rather than quietly
//
// A game may have more than one release page; they are listed in order.
//
// NOT included here despite being C64 homebrew on this shelf: Runn'n'Gunn
// and Grid Pix. Both are free demoscene releases (that's where this vault's
// copy came from - CSDb), but their itch.io listing is a *separate*, later
// commercial reissue by Thalamus Digital Publishing with a $1.99 floor, not
// an optional tip on the version already in this library. Putting a Support
// button next to a game you already have for free, pointing at a $1.99
// minimum purchase, would misrepresent it as a donation when it isn't one.
//
// NOT included here despite being PC homebrew on this shelf: Dungeons of
// Noudar (pc_hb_noudar). It's open source (BSD-3) and mirrored on
// archive.org and the author's own itch.io upload, but no tip jar, Ko-fi,
// Patreon or PWYW price was found on any of those pages - unlike every
// other PC homebrew title below. Same reasoning as the C64 exclusions
// above: don't point a "Support the creator" button at a page where no
// support mechanism actually exists.

window.SUPPORT_DATA = {

  "c64_hb_c64anabalt": [
    { creator: "RGCD / PaulKo64",
      url:     "https://rgcddev.itch.io/c64anabalt",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_doc_cosmos": [
    { creator: "Simon Jameson (Shallan)",
      url:     "https://shallan64.itch.io/doc-cosmos",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_tenebra2": [
    { creator: "Haplo",
      url:     "https://h4plo.itch.io/tenebra-2",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_rocket_smash_ex": [
    { creator: "RGCD / Richard Bayliss",
      url:     "https://rgcddev.itch.io/rocket-smash-ex",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_micro_hexagon": [
    { creator: "RGCD / Onslaught",
      url:     "https://rgcddev.itch.io/micro-hexagon",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_super_bread_box": [
    { creator: "RGCD / Paulko64",
      url:     "https://rgcddev.itch.io/super-bread-box",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_hero_is_back": [
    { creator: "LC-Games / Excess and Hokuto Force",
      url:     "https://lowcarb.itch.io/hero-is-back-c64",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_luftrauserz": [
    { creator: "RGCD / Triad",
      url:     "https://rgcddev.itch.io/luftrauserz",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "c64_hb_bagman_strikes_back": [
    { creator: "LC-Games",
      url:     "https://lowcarb.itch.io/bagman-strikes-back-c64",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ],

  "pc_hb_gates": [
    { creator: "Tarjan",
      url:     "https://tarjan.itch.io/gates-of-integrity",
      note:    "Free download",
      checked: "2026-08-11" }
  ],

  "pc_hb_disksweeper": [
    { creator: "voxel",
      url:     "https://voxel.itch.io/disksweeper",
      note:    "Free download",
      checked: "2026-08-11" }
  ],

  "pc_hb_pantsmo": [
    { creator: "eviltentacle",
      url:     "https://eviltentacle.itch.io/pantsmo",
      note:    "Free download",
      checked: "2026-08-11" }
  ],

  "pc_hb_alienintruder": [
    { creator: "Juan J. Martínez",
      url:     "https://www.usebox.net/jjm/alien-intruder/",
      note:    "Free download - Ko-fi tip jar on the page",
      checked: "2026-08-11" }
  ],

  "pc_hb_queens": [
    { creator: "Davide Bucci",
      url:     "https://darwinne.itch.io/the-queens-footsteps",
      note:    "Click download - pay what you want, including £0",
      checked: "2026-08-11" }
  ],

  "pc_hb_spacecavern": [
    { creator: "dotmos",
      url:     "https://dotmos.itch.io/space-cavern-blaster",
      note:    "Click download - pay what you want",
      checked: "2026-08-11" }
  ],

  "pc_hb_barren": [
    { creator: "Cyningstan",
      url:     "https://cyningstan.itch.io/barren-planet",
      note:    "Click download - pay what you want, including £0",
      checked: "2026-08-11" }
  ],

  "pc_hb_chambers": [
    { creator: "Cyningstan",
      url:     "https://cyningstan.itch.io/the-chambers-beneath",
      note:    "Click download - pay what you want",
      checked: "2026-08-11" }
  ],

  "pc_hb_hibernated1": [
    { creator: "Stefan Vogt",
      url:     "https://8bitgames.itch.io/hibernated1",
      note:    "Click download - pay what you want",
      checked: "2026-08-11" }
  ],

  "pc_hb_eightfeet": [
    { creator: "Stefan Vogt",
      url:     "https://8bitgames.itch.io/eight-feet-under",
      note:    "Click download - pay what you want",
      checked: "2026-08-11" }
  ],

  "pc_hb_lake": [
    { creator: "B.J. Best",
      url:     "https://bjbest60.itch.io/lake-adventure",
      note:    "Click download - pay what you want",
      checked: "2026-08-11" }
  ],

  "pc_hb_acronia": [
    { creator: "Hadrosaurus Software",
      url:     "https://hadrosaurus.itch.io/acronia",
      note:    "Click download - pay what you want. This is the original free DOS prototype page, not the later commercial Windows/Mac/Linux remake (a separate hadrosoft.itch.io listing).",
      checked: "2026-08-11" }
  ],

  "pc_hb_catsbroombas": [
    { creator: "Eigen Lenk",
      url:     "https://eigen.itch.io/cats-on-broombas",
      note:    "Click download - pay what you want. Pick the DOS build, not the Windows launcher build, on the same page.",
      checked: "2026-08-11" }
  ]

};
