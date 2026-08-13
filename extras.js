// Physical extras (manuals, maps, boards, overlays) that shipped with some
// carts, scanned by you and dropped into extras/. Each entry shows up as an
// "Extras" section on that game's page (game.html) - PDFs get an embedded
// viewer, images are shown inline. Multiple items per game are fine.
//
// How to add your own scan:
//   1. Put the file in extras/   (pdf, jpg or png)
//   2. Add a line below:  "<game id>": { "manual": "file.pdf", "map": "map.jpg" }
//
// vp_41 (Conquest of the World), vp_42 (Quest for the Rings) and vp_46
// (The Great Wall Street Fortune Hunt) all done 2026-08-12 (see entries
// below). vp_09's "manual" was replaced 2026-08-13 with the real, complete
// Computer Programmer manual (see that entry for what used to be there),
// and vp_31 (Musician), csv1/csv2 (Verkehrsspiele) gained entries the
// same day.
window.EXTRAS_DATA = {
  // The file that used to sit here as "manual" was just a placeholder (a
  // G7000 Videogames Club News newsletter, Issue 3 - not the cartridge's
  // own manual) - removed 2026-08-13. "manual" now points to the actual,
  // complete Computer Programmer manual (84 pages, covers COMMAND/
  // ASSEMBLER/GTO.32 and the rest of the language) - sourced 2026-08-13
  // from a Swiss collector's own boxed copy at videopac.ch, same source as
  // the vp_41/vp_42/vp_46 non-English manuals below.
  "vp_09": {
    "manual": "computer-programmer-manual.pdf"
  },
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
  // "g7000 overlay" / "g7200 overlay" (added 2026-08-13, same source) are
  // the console-specific keyboard overlays that shipped in the box - the
  // G7000 cart used the base console's keyboard, the G7200 (G7400-family)
  // release had its own overlay printed for the extra keys.
  "vp_42": {
    "box": "quest-for-the-rings-box.jpg",
    "map": "quest-for-the-rings-map.jpg",
    "printable map": "quest-for-the-rings-map-print-4xA4.pdf",
    "printable tokens": "quest-for-the-rings-fiches-printable.pdf",
    "german manual": "quest-for-the-rings-manual-de.pdf",
    "g7000 overlay": "quest-for-the-rings-overlay-g7000.jpg",
    "g7200 overlay": "quest-for-the-rings-overlay-g7200.jpg"
  },
  // Newscaster's box back - the same cart sold across Europe, so the blurb
  // is printed in eight languages side by side.
  "vp_a": { "box back": "newscaster-box-back.jpg" },
  // Musician shipped with a keyboard overlay for laying notes/chords over
  // the console's keys - a different overlay per console generation, since
  // the G7400-family keyboard has extra keys the base G7000 doesn't. Added
  // 2026-08-13 from a Swiss collector's own boxed copy at videopac.ch, same
  // source as the rest of this file's non-English/overlay scans.
  "vp_31": {
    "g7000 overlay": "musician-overlay-g7000.jpg",
    "g7200 overlay": "musician-overlay-g7200.jpg"
  },
  // No French dump of Conquest of the World exists, so the French box has no
  // entry of its own - it lives here alongside the English one. This game
  // isn't in the archive.org Odyssey/Videopac manuals collection (the
  // built-in page-by-page manual reader below has nothing for it), so
  // "manual" here is the whole story for this title's English manual - the
  // full U.S. scan, sourced from odyssey2.info/library/. "german manual"
  // (added 2026-08-12) is the full "Eroberung der Welt" manual, sourced
  // separately - videopac.ch, credited in the Videopac "Keeping this
  // console alive" banner (featured.js). "map" (added 2026-08-13, same
  // source) is the fold-out world map/scoreboard from the box - without it
  // the zone/PBU tables that the cartridge references aren't readable from
  // just the ROM.
  "vp_41": {
    "manual": "conquest-of-the-world-manual.pdf",
    "french box": "conquete-du-monde-box.jpg",
    "german manual": "conquest-of-the-world-manual-de.pdf",
    "map": "conquest-of-the-world-map.jpg"
  },
  // The English manual with a German/French/Dutch/Italian/Danish/Swedish/
  // Finnish/Spanish glossary of the game's specific terms bound into the
  // back (pages 24-39 of the scan) - not full manuals in those languages,
  // but the closest thing that exists for this title. Same source as vp_41
  // and vp_42's German manuals above: a Swiss collector's own boxed copy at
  // videopac.ch (2026-08-12). The three box arts below (added 2026-08-13,
  // same source) are the regional variants - the plain European Philips
  // box, the Brazilian release (see br_9434, the standalone Brazilian
  // G7000 cart this box belongs to), and the US Magnavox Odyssey2 release.
  "vp_46": {
    "multi-language manual": "great-wall-street-fortune-hunt-manual-multilang.pdf",
    "box": "great-wall-street-fortune-hunt-box.jpg",
    "brazil box": "great-wall-street-fortune-hunt-box-brazil.jpg",
    "odyssey2 box": "great-wall-street-fortune-hunt-box-odyssey2.jpg"
  },
  // Play Tag never had a printed box - this typed Dutch sheet is the only
  // documentation there is, and it's the sole place the key mapping is written
  // down (1-7 pick the 2-player handicap, 9 / : / space / L / P the 1-player
  // levels, then you type your name and press ENTER).
  "mod_playtag_fix": { "manual": "playtag-manual-nl.png" },
  "pr_playtag":      { "manual": "playtag-manual-nl.png" },
  // Verkehrsspiele 1 & 2 (Traffic Games) never had an English release or an
  // archive.org manual - these German teacher's-edition manuals
  // ("Begleitmaterial fur Lehrer") are the only documentation that exists
  // for either cart. Added 2026-08-13, same source as the rest of this
  // file's videopac.ch scans.
  "csv1": { "manual": "verkehrsspiele-1-manual-de.pdf" },
  "csv2": { "manual": "verkehrsspiele-2-manual-de.pdf" },
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
