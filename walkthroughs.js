// Full walkthrough links, shown inside the "Reveal Tips" block on a game page
// (game.html, buildTipsBox) under any StrategyWiki tip from tips.js - or on
// their own when tips.js has nothing for the game. Opens in a new tab.
//
// Source: The Walkthrough King (walkthroughking.com) - Mike's find,
// 2026-09-07. It covers adventure games, so the matches are the Sierra and
// LucasArts titles on the PC and C64 shelves; checked against the site's
// full alphabetical index (~1,180 walkthroughs) - nothing else on the three
// shelves is there. URL pattern: https://www.walkthroughking.com/text/<slug>.aspx
//
// Keyed by games.js id. Where the site has separate pages for an original
// and a remake, the page matching the Vault's version is used (King's Quest
// I here is the 1990 SCI remake, Space Quest I the 1986 AGI original).
window.WALKTHROUGH_DATA = (function () {
  var W = {};
  var site = "The Walkthrough King";
  function set(id, slug) { W[id] = { url: "https://www.walkthroughking.com/text/" + slug + ".aspx", site: site }; }

  // Leisure Suit Larry + its ancestor
  set("pc_softporn", "softpornadventure");
  set("pc_leisure_suit_larry", "leisuresuitlarry");
  set("pc_lsl1_vga", "leisuresuitlarry1remake");
  set("pc_lsl2", "leisuresuitlarry2");
  set("pc_lsl3", "leisuresuitlarry3");
  set("pc_lsl5", "leisuresuitlarry5");
  set("pc_lsl6", "leisuresuitlarry6");
  // Space Quest
  set("pc_sq1", "spacequest");
  set("pc_sq2", "spacequest2");
  set("pc_sq3", "spacequest3");
  set("pc_sq4", "spacequest4");
  set("pc_sq5", "spacequest5");
  set("pc_sq6", "spacequest6");
  // King's Quest
  set("pc_kq1", "kingsquest1remake");
  set("pc_kq2", "kingsquest2");
  set("pc_kq3", "kingsquest3");
  set("pc_kq4", "kingsquest4");
  set("pc_kq5", "kingsquest5");
  set("pc_kq6", "kingsquest6");
  set("pc_kq7", "kingsquest7");
  // LucasArts on the C64 shelf
  set("c64_maniac_mansion", "maniacmansion");
  set("c64_zak_mckracken", "zakmckracken");

  return W;
})();
