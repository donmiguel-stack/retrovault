// The three panels above the library: what to play, who sells these things,
// and where the rest of the scene lives.
//
// Everything here is editable without touching any code. Reorder, rewrite,
// delete — the panels hide themselves when their list is empty.

window.FEATURED_DATA = {

  // ---- Featured and recommended -----------------------------------------
  // Games worth pointing someone at. "id" must match an id in games.js; the
  // cover and title are taken from there, so only the blurb lives here.
  // One sentence is plenty. The panel rotates every 7 seconds.
  //
  // "shot" is a screenshot filename. The file goes in covers/ with a shot_
  // prefix - covers/shot_vp_38.jpg for shot: "vp_38.jpg" - because that is a
  // folder the update endpoint is already allowed to write to.
  featured: [
    { id: "vp_38", shot: "vp_38.jpg",
      blurb: "The one Atari sued over — and the best-selling cartridge the console ever had. Press P at the select screen to draw your own maze." },
    { id: "vp_42", shot: "vp_42.jpg",
      blurb: "A board game and a video game at once. The cartridge came with a physical map, tokens and a rulebook; two players hunt rings through shifting rooms." },
    { id: "vp_43", shot: "vp_43.jpg",
      blurb: "Philips' answer to Donkey Kong, and a genuinely hard platformer. Dig for gold, dodge the boulders, mind the pickaxe." },
    { id: "jo_demon-attack_pl", shot: "jo_demon-attack_pl.jpg",
      blurb: "Imagic's shooter, licensed to Thomson-Brandt and given G7400 backgrounds that exist nowhere else. The French got the best version." },
    { id: "vp_52pl", shot: "vp_52pl.jpg",
      blurb: "Ed Averett at his strangest: you are a swarm, and you eat other swarms. Nothing else on the machine plays like it." },
    { id: "vp_51pl", shot: "vp_51pl.png",
      blurb: "Sold as Attack of the Timelord in America, and licensed from a Gerry Anderson puppet series in Europe. One of the few cartridges written for the G7400's extra graphics chip." }
  ],

  // ---- Featured and recommended, C64 shelf ------------------------------
  // The same panel as above, but for the Commodore 64 shelf. "id" matches an
  // id in games.js; the cover comes from there and the blurb lives here. The
  // right-hand slot plays the game's own gameplay clip (the one already wired
  // into its game page) - muted, looping - so the screenshot actually moves.
  // No "shot" needed: the video id is taken from gamepages.js automatically.
  c64featured: [
    { id: "c64_paradroid",
      blurb: "Andrew Braybrook's masterpiece: board an enemy droid, win a little logic duel for control of it, then turn its guns on the rest. Nothing on the machine feels quite this considered." },
    { id: "c64_last_ninja",
      blurb: "System 3's isometric adventure sold over four million copies and defined what a C64 blockbuster looked like — six loading screens, a Ben Daglish score, and puzzles that punished the impatient." },
    { id: "c64_turrican2",
      blurb: "Manfred Trenz and Chris Huelsbeck pushing the hardware to its limit in 1991 — vast scrolling worlds, a rotating beam weapon, and a soundtrack people still cover today." },
    { id: "c64_impossible_mission",
      blurb: "\"Another visitor. Stay a while... stay forever!\" Epyx's acrobatic search through a mad scientist's lair, with speech synthesis that stunned everyone in 1984." },
    { id: "c64_wizball",
      blurb: "Sensible Software's strangest and best: bounce an unsteerable ball across the land to collect paint and give a grey world its colour back. A two-player cat helps." },
    { id: "c64_ik_plus",
      blurb: "Archer Maclean's three-way karate tournament — you, a rival, and a computer fighter all at once — with a bonus round batting bombs back. The high point of the genre on the 64." }
  ],

  // ---- Homebrew ---------------------------------------------------------
  // The other half of the story: games written for this console after it was
  // discontinued, by people who simply wanted to. Same shape as "featured",
  // with one addition - "shot" also takes an array, and two screenshots are
  // then stacked in the slot instead of one.
  homebrew: [
    { id: "new_amok", shot: "new_amok.jpg",
      blurb: "The first one. John Dondzila brought Stern's Berzerk to the console in 1998, fifteen years after Philips walked away, and started everything below." },
    { id: "new_ktaa", shot: "new_ktaa.png",
      blurb: "Sören Gust, 2003, under the Xype label — and one of the first homebrews to use the Plus graphics. Widely held to be among the best games on the machine, official ones included." },
    { id: "new_route66", shot: "new_route66.png",
      blurb: "Rafael Cardoso and René van den Enden, 2007. Four levels — day, night, desert, snow — seven black cars to run down in each, and every one faster than the last." },
    { id: "new_pong_all", shot: "new_pong_all.png",
      blurb: "It took thirty years for this console to get a Pong. René van den Enden's makes up for it with eleven variations, from squash to tennis to the 1972 original." },
    { id: "new_mrroboto", shot: "new_mrroboto.png",
      blurb: "Ted Foolery packed three different games into eight kilobytes, playable by one, two or nobody at all — and hid a puzzle in it that ran as a competition." },
    { id: "new_ppp-o2em", shot: ["new_ppp-o2em.png", "new_ppp-o2em-2.png"],
      blurb: "Tetris, essentially, and a good one: four variations, polyphonic music and enhanced graphics on a G7400. This is the build made to run under emulation — the cartridge version plays its music through The Voice." }
  ],

  // ---- Homebrew, C64 shelf ------------------------------------------
  // Same shape as "homebrew" above, but only shown on the C64 shelf page
  // (placeBlocks() in app.js gates it on state.platform === "C64"). Kept
  // as its own array, not mixed into "homebrew", so Videopac's panel
  // never shows a C64 game a Videopac visitor can't even play.
  c64homebrew: [
    { id: "c64_hb_c64anabalt", shot: "c64_hb_c64anabalt.png",
      blurb: "RGCD's 16KB cartridge demake of Canabalt, 2012 — one button, infinite fall, and proof the C64 could still do a modern indie hit justice a decade after Philips-era rivals had all gone quiet." },
    { id: "c64_hb_wolfling", shot: "c64_hb_wolfling.png",
      blurb: "Lazycow, one of the most prolific names in modern C64 homebrew, sends a wolf cub jumping through a tight 2019 platformer built from scratch, thirty-six years after the machine launched." },
    { id: "c64_hb_hero_is_back", shot: "c64_hb_hero_is_back.png",
      blurb: "Excess and Hokuto Force built an unofficial sequel to Activision's 1984 H.E.R.O. in 2025 — same jetpack, same dynamite, brand new caverns, over four decades on." },
    { id: "c64_hb_luftrauserz", shot: "c64_hb_luftrauserz.png",
      blurb: "Triad squeezed 2014's PC dogfighter Luftrausers onto real C64 silicon in 2017 — physics-driven plane combat the hardware was never supposed to run." },
    { id: "c64_hb_bagman_strikes_back", shot: "c64_hb_bagman_strikes_back.png",
      blurb: "Laxity's 2022 tribute to the 1983 arcade platformer Bagman — a thief hauling gold up ladders, dodging guards, forty years and one homebrew scene later." },
    { id: "c64_hb_grid_pix", shot: "c64_hb_grid_pix.png",
      blurb: "Excess brought Picross to the C64 in 2020 — a genre the original Videopac and C64 shelves never had — later picked up for a real boxed cartridge release." }
  ],

  // ---- Sponsors ---------------------------------------------------------
  // Shops and sellers. Each entry gets a banner slot, clearly marked as an
  // advert - a retro shop is welcome here, but nobody should mistake it for
  // a recommendation from the Vault.
  //
  //   name   shown as the heading
  //   url    where it goes
  //   text   one line of copy, theirs or yours
  //   image  optional, put the file in assets/ and give the filename here.
  //          Roughly 3:1 works best - 900x300 or so.
  //
  // Empty list = no advert panel at all.
  sponsors: [
    // No "image" = the slot runs the console's attract screen instead:
    // rainbow letters bouncing off the edges. Add an image and it takes over.
    { name: "Your shop here",
      url:  "mailto:hello@example.com",
      text: "Selling Videopac cartridges, consoles or spare joysticks? This slot is for you.",
      attract: "ADVERTISE HERE" }
  ],

  // ---- Keeping this console alive, C64 shelf -----------------------------
  // Same shape as "community" above, but for the C64 shelf - the sites and
  // projects that document, catalogue and still actively support this
  // machine. Shown only on the C64 shelf (placeBlocks() in app.js gates it
  // on state.platform === "C64").
  c64community: [
    { name: "CSDb",
      tint: "#5b8def",
      url: "https://csdb.dk/",
      lang: "International",
      what: "The scene's own database - releases, screenshots and history for practically everything written for the machine since 1982, including several of the 2020s homebrews on this shelf." },
    { name: "GameBase64",
      tint: "#2fb47c",
      url: "https://gamebase64.com/",
      lang: "International",
      what: "The exhaustive commercial-game catalogue project this shelf's C64 ROMs and cover art were largely sourced from." },
    { name: "Lemon64",
      tint: "#e0865a",
      url: "https://www.lemon64.com/",
      lang: "International",
      what: "One of the oldest and most active English-language C64 communities - reviews, box scans and a forum running since 2000." },
    { name: "C64-Wiki",
      tint: "#c07de0",
      url: "https://www.c64-wiki.com/wiki/Main_Page",
      lang: "International",
      what: "A community-run encyclopedia covering hardware, software and scene history, article by article." },
    { name: "Protovision",
      tint: "#e0c05a",
      url: "https://www.protovision.games/",
      lang: "Germany",
      what: "Still publishing brand new physical C64 cartridges and hardware today - proof this machine never actually stopped." },
    { name: "VICE",
      tint: "#4fb3bf",
      url: "https://vice-emu.sourceforge.io/",
      lang: "Open source",
      what: "The open-source emulator core this shelf's browser player actually runs on under the hood." }
  ],

  // ---- Community --------------------------------------------------------
  // The people keeping this machine documented. Most of what is in the Vault
  // came from these sites; the least it can do is send traffic back.
  community: [
    { name: "Odyssey Clube",
      tint: "#2fb47c",
      url: "https://odysseyclube.com",
      lang: "Brazil",
      what: "The Brazilian releases: box scans, manuals, magazines and the game descriptions used on those pages here." },
    { name: "The Odyssey² Homepage",
      tint: "#5b8def",
      url: "https://odyssey2.info",
      lang: "USA",
      what: "William Cassidy's database — every cartridge by region, with prototypes and rumours carefully separated from releases." },
    { name: "Videopac.nl",
      tint: "#e0865a",
      url: "https://videopac.nl",
      lang: "Netherlands",
      what: "Long-running fan site and forum, and the best source on the Jopac line and the French exclusives." },
    { name: "Videopac.org",
      tint: "#c07de0",
      url: "http://www.videopac.org",
      lang: "International",
      what: "Collector's database of cartridge variants, box numbers and packaging." },
    { name: "Internet Archive — Odyssey² manuals",
      tint: "#e0c05a",
      url: "https://archive.org/details/odysseymanuals",
      lang: "International",
      what: "The scanned manual collection every manual reader in the Vault is drawn from." },
    { name: "Rafael Cardoso — Jogos Odyssey",
      tint: "#e0865a",
      url: "https://www.youtube.com/@heatseekerbr",
      lang: "Brazil",
      what: "The author of Route 66, still writing games for this console and posting each one as it comes — over a hundred videos of his own projects." },
    { name: "webretro",
      tint: "#4fb3bf",
      url: "https://github.com/BinBashBanana/webretro",
      lang: "Open source",
      what: "The browser front-end for libretro that runs the games here, by BinBashBanana." }
  ]
};
