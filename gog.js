// Where the shelf's games are sold on GOG (checked 2026-10-10 against GOG's
// catalogue - see the project doc vault-gog-availability-2026-10-10.md;
// Freddy Pharkas and Final Doom re-checked 2026-10-28; Police Quest, Quest for
// Glory, Gabriel Knight and Pool of Radiance added 2026-11-05).
//
// Rendered by game-page.js as a "Buy it on GOG" box. When the game file is
// missing it sits above the "Where to get it" box (romsources.js) and explains
// how to turn the GOG download into the file the page wants
// (tools/import_gog.py). When the game already plays it shrinks to one line.
//
// Keyed by games.js id:
//   slug     GOG store slug -> https://www.gog.com/en/game/<slug>
//   product  the product name as GOG shows it (often a bundle)
//   other    set when GOG sells a DIFFERENT version than the one this page
//            plays (the PC release of a C64/Amiga game): the box says so and
//            leaves out the import steps, because that download won't run
//            in this shelf's emulator.
//   remaster set when GOG sells the game only inside a modern re-release
//            (Final Doom: TNT + Plutonia come with the 2024 DOOM + DOOM II,
//            but GOG's "original DOS versions" there are only DOOM and
//            DOOM II). Link only, no import steps, like "other".
//
// Only the MS-DOS entries can be imported - those GOG downloads ship the
// original DOS files. No prices here: GOG's change too often to keep current.
window.GOG_STORE = (function () {
  var P = {
    kq123: { slug: "kings_quest_1_2_3", product: "King's Quest 1+2+3" },
    kq456: { slug: "kings_quest_4_5_6", product: "King's Quest 4+5+6" },
    kq78:  { slug: "kings_quest_7_8", product: "King's Quest 7+8" },
    sq123: { slug: "space_quest_1_2_3", product: "Space Quest 1+2+3" },
    sq456: { slug: "space_quest_4_5_6", product: "Space Quest 4+5+6" },
    lsl:   { slug: "leisure_suit_larry", product: "Leisure Suit Larry" },
    doom:  { slug: "doom_doom_ii", product: "DOOM + DOOM II" },
    wolf:  { slug: "wolfenstein_3d", product: "Wolfenstein 3D" },
    keen:  { slug: "commander_keen_complete_pack", product: "Commander Keen Complete Pack" },
    xcom:  { slug: "xcom_ufo_defense", product: "X-Com: UFO Defense" },
    freddy: { slug: "freddy_pharkas_frontier_pharmacist", product: "Freddy Pharkas: Frontier Pharmacist" },
    // added 2026-11-05: Sierra classics that joined the shelf because GOG sells them
    pq:    { slug: "police_quest_collection", product: "Police Quest Collection" },
    qfg:   { slug: "quest_for_glory", product: "Quest for Glory 1-5" },
    gk1:   { slug: "gabriel_knight_sins_of_the_fathers", product: "Gabriel Knight: Sins of the Fathers" }
  };
  var M = {
    pc_kq1: "kq123", pc_kq2: "kq123", pc_kq3: "kq123",
    pc_kq4: "kq456", pc_kq5: "kq456", pc_kq6: "kq456", pc_kq7: "kq78",
    pc_sq1: "sq123", pc_sq2: "sq123", pc_sq3: "sq123",
    pc_sq4: "sq456", pc_sq5: "sq456", pc_sq6: "sq456",
    pc_leisure_suit_larry: "lsl", pc_lsl1_vga: "lsl", pc_lsl2: "lsl",
    pc_lsl3: "lsl", pc_lsl5: "lsl", pc_lsl6: "lsl",
    pc_doom: "doom", pc_doom2: "doom",
    pc_wolfenstein3d: "wolf", pc_spear_of_destiny: "wolf",
    pc_commander_keen: "keen", pc_keen2: "keen", pc_keen3: "keen",
    pc_keen4: "keen", pc_keen5: "keen", pc_keen6: "keen",
    pc_xcom_ufo_defense: "xcom", pc_freddy_pharkas: "freddy",
    pc_pq1: "pq", pc_pq1_vga: "pq", pc_pq2: "pq", pc_pq3: "pq", pc_pq4: "pq",
    pc_qfg1: "qfg", pc_qfg1_vga: "qfg", pc_qfg2: "qfg", pc_qfg3: "qfg", pc_qfg4: "qfg",
    pc_gk1: "gk1"
  };
  var out = {};
  for (var id in M) out[id] = { slug: P[M[id]].slug, product: P[M[id]].product };
  // GOG sells the PC version of these, not the C64/Amiga original
  var other = {
    c64_maniac_mansion: ["maniac_mansion", "Maniac Mansion"],
    c64_zak_mckracken: ["zak_mckracken_and_the_alien_mindbenders", "Zak McKracken and the Alien Mindbenders"],
    c64_wasteland: ["wasteland_the_classic_original", "Wasteland 1: The Original Classic"],
    c64_mule: ["mule", "M.U.L.E."],
    c64_microprose_soccer: ["microprose_soccer", "MicroProse Soccer"],
    am_populous: ["populous", "Populous"],
    am_north_and_south: ["north_south", "North & South"],
    c64_pool_of_radiance: ["forgotten_realms_the_archives_collection_two", "Forgotten Realms: The Archives - Collection Two"]
  };
  for (var o in other) out[o] = { slug: other[o][0], product: other[o][1], other: true };
  // On GOG only inside a modern re-release, not as the DOS original
  var remaster = {
    pc_final_doom_tnt: "doom",
    pc_final_doom_plutonia: "doom"
  };
  for (var r in remaster) out[r] = { slug: P[remaster[r]].slug, product: P[remaster[r]].product, remaster: true };
  return out;
})();
