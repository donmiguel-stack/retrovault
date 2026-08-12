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
//   vp_46  The Great Wall Street Fortune Hunt (board/map)
// vp_42 Quest for the Rings done 2026-08-12 (see entry below).
window.EXTRAS_DATA = {
  "vp_09": { "manual": "computer-programmer-manual.pdf" },
  // The Quest for the Rings box is a wide wraparound painting - the card art
  // has to crop it, so the whole thing is here at full width. "map" is the
  // 2026-08-12 reshoot of the physical board (flat-laid, diffuse light,
  // perspective-corrected - see WORKLOG) replacing the old glare-heavy
  // photo; "printable map" is the same map tiled into 4 A4 sheets at
  // 300dpi for anyone who wants to print and assemble their own copy.
  // "printable tokens" (added 2026-08-12) is a cut-and-glue replacement for
  // the game's 34 physical fiches (rings, monsters, quest/turn markers, and
  // the 23 double-sided castle tokens) - original line art redrawn from the
  // manual's own symbol key, not a photo scan, so anyone who owns just the
  // cartridge can still assemble a full playable set. The game (and its
  // components) has been out of print for decades, so this - together with
  // the map above - is what actually makes it playable again from just a
  // ROM dump. "german manual" (added 2026-08-12) is the full "Die Suche
  // Nach Den Ringen" manual, sourced from a Swiss collector's own boxed
  // copy at videopac.ch - see the community credit in featured.js.
  "vp_42": {
    "box": "quest-for-the-rings-box.jpg",
    "map": "quest-for-the-rings-map.jpg",
    "printable map": "quest-for-the-rings-map-print-4xA4.pdf",
    "printable tokens": "quest-for-the-rings-fiches-printable.pdf",
    "german manual": "quest-for-the-rings-manual-de.pdf"
  },
  // Newscaster's box back - the same cart sold across Europe, so the blurb
  // is printed in eight languages side by side.
  "vp_a": { "box back": "newscaster-box-back.jpg" },
  // No French dump of Conquest of the World exists, so the French box has no
  // entry of its own - it lives here alongside the English one. "german
  // manual" (added 2026-08-12) is the full "Eroberung der Welt" manual,
  // sourced the same way as vp_42's above - videopac.ch, credited in the
  // Videopac "Keeping this console alive" banner (featured.js).
  "vp_41": {
    "french box": "conquete-du-monde-box.jpg",
    "german manual": "conquest-of-the-world-manual-de.pdf"
  },
  // The English manual with a German/French/Dutch/Italian/Danish/Swedish/
  // Finnish/Spanish glossary of the game's specific terms bound into the
  // back (pages 24-39 of the scan) - not full manuals in those languages,
  // but the closest thing that exists for this title. Same source as vp_41
  // and vp_42's German manuals above: a Swiss collector's own boxed copy at
  // videopac.ch (2026-08-12).
  "vp_46": {
    "multi-language manual": "great-wall-street-fortune-hunt-manual-multilang.pdf"
  },
  // Play Tag never had a printed box - this typed Dutch sheet is the only
  // documentation there is, and it's the sole place the key mapping is written
  // down (1-7 pick the 2-player handicap, 9 / : / space / L / P the 1-player
  // levels, then you type your name and press ENTER).
  "mod_playtag_fix": { "manual": "playtag-manual-nl.png" },
  "pr_playtag":      { "manual": "playtag-manual-nl.png" },
  "c64_uridium": { "manual": "c64_uridium-manual.pdf" },
  "c64_bruce_lee": { "manual": "c64_bruce_lee-manual.pdf" },
  "c64_california_games": { "manual": "c64_california_games-manual.pdf" },
  "c64_winter_games": { "manual": "c64_winter_games-manual.pdf" },
  "c64_defender_crown": { "manual": "c64_defender_crown-manual.pdf" },
  "c64_boulder_dash": { "manual": "c64_boulder_dash-manual.pdf" },
  "c64_impossible_mission": { "manual": "c64_impossible_mission-manual.pdf" },
  "c64_zak_mckracken": { "manual": "c64_zak_mckracken-manual.pdf" },
  "c64_archon": { "manual": "c64_archon-manual.pdf" },
  "c64_pitstop2": { "manual": "c64_pitstop2-manual.pdf" },
  "c64_test_drive": { "manual": "c64_test_drive-manual.pdf" },
};
