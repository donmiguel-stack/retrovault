// Carts that shipped with something physical in the box beyond the manual -
// a game board, punch-out playing pieces, a keyboard overlay, a workbook.
// This is about what the ORIGINAL retail package contained, so it stays true
// whether or not you own a copy. (extras.js is the other thing: scans YOU have
// made of your own copies. A game can appear in both, or in only one.)
//
// Sourced from The Odyssey² Homepage's Master Strategy Series page
// (odyssey2.info/strategy) and, for the Musician overlay, the surviving
// overlay scan in the archive.org Videopac manuals collection.
//
// "kind" is the short label shown on the card badge.
window.PACKAGING_DATA = {
  // --- Master Strategy Series -------------------------------------------
  // Board-game/video-game hybrids sold in a deep "treasure chest" box: the
  // cartridge sat in a moulded tray above a folded game board, a manual and a
  // sheet of punch-out plastic and metal playing pieces. Philips brought all
  // three to Europe as Videopac 41, 42 and 46.
  "vp_42":  { kind: "board game", detail: "Game board, punch-out playing pieces and rulebook (Master Strategy Series)" },
  "Vp42_F": { kind: "board game", detail: "Game board, punch-out playing pieces and rulebook (Master Strategy Series, French box)" },
  "vp_41":  { kind: "board game", detail: "Map board, armies and punch-out playing pieces (Master Strategy Series)" },
  "vp_46":  { kind: "board game", detail: "Game board, play money and punch-out pieces, plus a 10-page multi-language booklet in the European release (Master Strategy Series)" },

  // --- Keyboard overlays -------------------------------------------------
  // Musician came in a box about double the usual size: a piano-keyboard
  // overlay that lies over the console's keyboard, a card to protect it, and
  // an oversized landscape manual.
  "vp_31":             { kind: "keyboard overlay", detail: "Piano-keyboard overlay for the console keyboard, protective card and an oversized landscape manual" },
  "mod_31_g7400":      { kind: "keyboard overlay", detail: "Uses the Musician piano-keyboard overlay (community mod of VP#31)" },
  "mod_vp31_examples": { kind: "keyboard overlay", detail: "Uses the Musician piano-keyboard overlay (teaching cart built on VP#31)" },

  // --- Workbooks ---------------------------------------------------------
  "vp_09":          { kind: "workbook", detail: "Programming workbook - the cart is unusable without it" },
  "mod_vp9_examples": { kind: "workbook", detail: "Uses the Computer Programmer workbook (teaching cart built on VP#9)" }
};
