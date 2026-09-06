// The physical cartridge, as the shop that sells it describes it.
//
// Shown on game.html as a small spec sheet ("The cartridge") under the action
// row, for the homebrews that exist as a real cartridge release. Every line
// is lifted from the shop's own product page and links back to it; nothing
// here is invented, and where the page doesn't say, the field is simply left
// out. No price and no Buy button - shops.js is still switched off (see the
// note there), and a price is the shop's to print, not ours. "checked" is the
// day the page was read, printed so it can go stale honestly.
//
//   id            must match a game id in games.js
//   author, year, publisher, rom, tv, systems, voice, players, box
//                 plain strings, rendered as label: value rows
//   availability  as the shop shows it that day (GDG marks items SOLD OUT)
//   blurb         1-2 sentences in the shop's framing, paraphrased
//   shop, url     the product page itself, not the shop's front page
//   checked       YYYY-MM-DD
//
// Sources: Packrat Video Games (one page per game, publishes the O2 titles)
// and Good Deal Games' Homebrew Heaven (the distributor; one long list with
// stock status). Read 2026-09-04.

(function () {
  var PACKRAT = "Packrat Video Games";
  var CHECKED = "2026-09-04";

  var ktaa = {
    author: "Søren Gust",
    year: "2004",
    publisher: "Packrat Video Games, distributed by Good Deal Games",
    rom: "12K",
    tv: "NTSC and PAL",
    systems: "Odyssey² and Videopac+ G7400 — the G7400 gets high-resolution background graphics",
    voice: "Not compatible with The Voice",
    players: "1",
    box: "Cartridge and full-colour manual",
    availability: "Sold out at Good Deal Games",
    blurb: "Defend Earth and its moon colony from the alien fleet with a quantum cannon and a shield, and keep the ground targets from being bombed. The shop calls it one of the few genuinely great Odyssey² homebrews.",
    shop: PACKRAT,
    url: "https://www.packratvg.com/ktaa.html",
    checked: CHECKED
  };

  window.PRODUCT_DATA = {
    "new_ktaa": ktaa,
    "new_ktaa-demo1": ktaa,
    "new_ktaa-demo2": ktaa,

    "new_calculator": {
      author: "René van den Enden",
      year: "2006; v1.1 re-release 2014",
      publisher: "Packrat Video Games, distributed by Good Deal Games",
      rom: "4K",
      tv: "NTSC and PAL",
      systems: "Odyssey² and Videopac; Videopac+ enhanced",
      players: "1",
      box: "Cartridge and full-colour manual (updated for the two functions v1.1 added)",
      availability: "Sold out at Good Deal Games",
      blurb: "The first application rather than game written for the machine: the four basic operations plus memory, pi and integer divide — the shop's line is that it gives you a reason to take the console to work.",
      shop: PACKRAT,
      url: "https://www.packratvg.com/calculator.html",
      checked: CHECKED
    },

    "new_mrroboto": {
      author: "Ted Szczypiorski",
      year: "2006",
      publisher: "Packrat Video Games, distributed by Good Deal Games",
      rom: "8K",
      systems: "Odyssey² and Videopac",
      voice: "Voice-enhanced",
      players: "1, 2, or none (CPU against CPU)",
      box: "Cartridge and full-colour manual",
      availability: "Sold out at Good Deal Games",
      blurb: "Year 8048: the machines have finished off mankind and split into two camps, each sending six robot warriors past firewalls, viruses and lasers to shut down the other side's CPU. Pitched as Archon crossed with Tron: Deadly Discs, over three screens.",
      shop: PACKRAT,
      url: "https://www.packratvg.com/mrroboto.html",
      checked: CHECKED
    },

    "new_planet-lander": {
      author: "Ted Szczypiorski",
      year: "2004",
      publisher: "Packrat Video Games, distributed by Good Deal Games",
      rom: "2K",
      systems: "Odyssey² and Videopac",
      players: "1",
      box: "Cartridge, full-colour manual and index card",
      availability: "In stock at Good Deal Games",
      blurb: "Szczypiorski's first game for the machine, a Lunar Lander in the spirit of the original 1979-82 releases: land on as many planets as you can before the fuel runs out, watching the fuel and X/Y gauges.",
      shop: PACKRAT,
      url: "https://www.packratvg.com/planetlander.html",
      checked: CHECKED
    },

    "new_pong": {
      author: "René van den Enden",
      year: "2004",
      publisher: "Packrat Video Games, distributed by Good Deal Games",
      rom: "4K",
      systems: "Odyssey² and Videopac",
      players: "1 or 2",
      box: "Cartridge and full-colour manual (US-style cover, European-style inside)",
      availability: "Sold out at Good Deal Games",
      blurb: "The Pong cartridge Magnavox never made for its own console: eleven variations from squash to tennis to the classic, alone or against a friend, for high score or best time.",
      shop: PACKRAT,
      url: "https://www.packratvg.com/pong.html",
      checked: CHECKED
    },

    "new_puzzle-piece-panic": {
      author: "Ted Szczypiorski",
      year: "2007",
      publisher: "Packrat Video Games, distributed by Good Deal Games",
      rom: "8K",
      systems: "Odyssey² and Videopac; enhanced graphics on Videopac+ and Odyssey³",
      players: "1",
      box: "Cartridge, full-colour manual and index card",
      availability: "Sold out at Good Deal Games",
      blurb: "A Tetris-style game in which the Tetrad Ejecting Device drops pieces into a well you have to keep clear. Four variations, a menu screen and — a first on this hardware — real polyphonic music.",
      shop: PACKRAT,
      url: "https://www.packratvg.com/ppp.html",
      checked: CHECKED
    }
  };
  window.PRODUCT_DATA["new_pong_all"] = window.PRODUCT_DATA["new_pong"];
  window.PRODUCT_DATA["new_ppp-o2em"] = window.PRODUCT_DATA["new_puzzle-piece-panic"];
})();
