// Physical extras (manuals, maps, boards, overlays) that shipped with some
// carts, scanned by you and dropped into extras/. Each entry shows up as an
// "Extras" section on that game's page (game.html) - PDFs get an embedded
// viewer, images are shown inline. Multiple items per game are fine.
//
// How to add your own scan:
//   1. Put the file in extras/   (pdf, jpg or png)
//   2. Add a line below:  "<game id>": { "manual": "file.pdf", "map": "map.jpg" }
//
// Known games with physical extras worth scanning from your own copies:
//   vp_09  Computer Programmer      (workbook/manual)
//   vp_31  Musician                 (manual)
//   vp_41  Conquest of the World    (map)
//   vp_42  Quest for the Rings      (board/map)
//   vp_46  The Great Wall Street Fortune Hunt (board/map)
window.EXTRAS_DATA = {
  "vp_09": { "manual": "computer-programmer-manual.pdf" },
  // The Quest for the Rings box is a wide wraparound painting - the card art
  // has to crop it, so the whole thing is here at full width.
  "vp_42": { "box": "quest-for-the-rings-box.jpg" },
  // Newscaster's box back - the same cart sold across Europe, so the blurb
  // is printed in eight languages side by side.
  "vp_a": { "box back": "newscaster-box-back.jpg" },
  // No French dump of Conquest of the World exists, so the French box has no
  // entry of its own - it lives here alongside the English one.
  "vp_41": { "french box": "conquete-du-monde-box.jpg" },
  // Play Tag never had a printed box - this typed Dutch sheet is the only
  // documentation there is, and it's the sole place the key mapping is written
  // down (1-7 pick the 2-player handicap, 9 / : / space / L / P the 1-player
  // levels, then you type your name and press ENTER).
  "mod_playtag_fix": { "manual": "playtag-manual-nl.png" },
  "pr_playtag":      { "manual": "playtag-manual-nl.png" }
};
