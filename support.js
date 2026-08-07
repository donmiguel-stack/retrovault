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
    { creator: "LC-Games / Laxity",
      url:     "https://lowcarb.itch.io/bagman-strikes-back-c64",
      note:    "Click download - pay what you want",
      checked: "2026-08-07" }
  ]

};
