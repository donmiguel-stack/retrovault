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
  //
  // "clipId" is an optional override for which recorded clip plays in this
  // slot, when it's not the same game id as "id". Race and Killer Bees are
  // only actually recorded on G7000 hardware (vp_01 / o2_47) - the G7400+
  // carts featured here (vp_01pl / vp_52pl) have no gameplay clip of their
  // own, only a YouTube video on their own game page. clipId lets the
  // banner show the real G7000 footage instead of falling back to that
  // embed, without changing what clip (if any) plays on the G7400+ game
  // page itself - that's still keyed off "id" via game.html's own logic.
  featured: [
    { id: "vp_38", shot: "vp_38.jpg",
      blurb: "The one Atari sued over — and the best-selling cartridge the console ever had. Press P at the select screen to draw your own maze." },
    { id: "vp_01pl", shot: "vp_01pl.jpg", clipId: "vp_01",
      blurb: "Cartridge number one, and the first game in every Videopac box: a two-lane race, an overhead maze chase, and a codebreaking puzzle called Cryptogram, three in one. This is the G7400+ cut - extra graphics chip, extra scenery either side of the track." },
    { id: "vp_43", shot: "vp_43.jpg",
      blurb: "Philips' answer to Donkey Kong, and a genuinely hard platformer. Dig for gold, dodge the boulders, mind the pickaxe." },
    { id: "jo_demon-attack_pl", shot: "jo_demon-attack_pl.jpg",
      blurb: "Imagic's shooter, licensed to Thomson-Brandt and given G7400 backgrounds that exist nowhere else. The French got the best version." },
    { id: "vp_52pl", shot: "vp_52pl.jpg", clipId: "o2_47",
      blurb: "Ed Averett at his strangest: you are a swarm, and you eat other swarms. Nothing else on the machine plays like it." },
    { id: "vp_51pl", shot: "vp_51pl.png",
      blurb: "Sold as Attack of the Timelord in America, and licensed from a Gerry Anderson puppet series in Europe. One of the few cartridges written for the G7400's extra graphics chip." }
  ],

  // ---- Master Strategy Series --------------------------------------------
  // Its own banner, bigger than "featured" above - three games, always all
  // three shown at once rather than rotating, since there are only three and
  // the whole point is that each shipped with a physical board. "id" must
  // match an id in games.js. "year"/"fact" are the small print under the
  // title; "contents" is what was actually in the box, sourced from
  // odyssey2.info/strategy/. Two images per card, neither optional in the
  // markup even if the file is missing yet:
  //   - a gameplay slot, same three-layer fallback as the C64 homebrew
  //     panel: clips/clip_<id>.mp4 (drop one in and it just plays) -> the
  //     game's own gamepages.js YouTube video -> the cover.
  //   - "the board" - a real photo of the physical game board, sourced from
  //     odyssey2.info and stored as covers/board_<id>.jpg (the covers/
  //     folder rather than a new one, same reasoning as the shot_ prefix
  //     below: it is a folder every existing install can already receive an
  //     update into).
  masterStrategy: [
    { id: "vp_42", year: 1981, fact: "Most Innovative Game of 1981 — Electronic Games",
      blurb: "Ten rings are scattered through dungeons, caverns and shifting halls. Pick Warrior, Wizard, Phantom or Changeling and race a second player to find them first - the board, overlay and forty-plus tokens turn the TV into just one part of the table.",
      contents: [
        "Game board, overlay &amp; compartment lid",
        "28-page rulebook",
        "10 ring tokens + 1 quest token",
        "3 nightmare &amp; 3 dragon tokens",
        "8 possession tokens, 23 castle-location tokens",
        "Hourglass"
      ] },
    { id: "vp_41", year: 1982, fact: "Honorable mention, Best Multi-Player Game of 1982 — Electronic Games",
      blurb: "Risk with a video game instead of dice. Forty-three world powers, each rated for military and economic strength, and every battle is settled by playing the cartridge's own combat game rather than rolling anything.",
      contents: [
        "Game board &amp; compartment lid",
        "Instruction manual",
        "228 colored magnets on 6 uncut sheets",
        "6 Homeland markers",
        "9 uncut sheets of Power Base Unit chips (108 total)"
      ] },
    { id: "vp_46", year: 1982, fact: "Most Innovative Game of 1982 — Electronic Games",
      blurb: "Twenty-seven real companies and commodities - IBM, McDonald's, gold, bonds - with prices that move on the news and never run the same way twice. Buy low, sell high, and end the year richer than up to three opponents.",
      contents: [
        "Game board &amp; compartment lid",
        "Two investment record pads",
        "7 green &amp; 7 gold margin/share tokens",
        "Gold &amp; silver prime-rate tokens",
        "Time-frame token"
      ] }
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

  // ---- Featured and recommended, PC shelf --------------------------------
  // Same shape and same reused rotator as c64featured above - the PC panel
  // calls c64FeatureRotator() directly rather than getting its own copy of
  // that ~80-line function, since the two are structurally identical (a
  // plain, non-link "main" box that builds its own inner cover link - see
  // the app.js comment at the call site for why that's safe to share and
  // c64HomebrewFeatureRotator isn't). "id" matches an id in games.js; the
  // right-hand slot plays clips/clip_<id>.mp4, same three-layer fallback as
  // every other clip-driven panel. Three of these six (Doom, Prince of
  // Persia, Leisure Suit Larry) are already playable in this Vault; the
  // other three (Keen 6, Duke Nukem, Space Quest IV) still need their ROM
  // file added under emulator/roms - see the romFile table Mike's working
  // from. Featured here regardless, same as any other shelf: this panel is
  // about the clip, not whether the cartridge is loaded yet.
  pcfeatured: [
    { id: "pc_doom",
      blurb: "id Software's 1993 shareware release redefined the genre it named — three episodes of BFG-toting carnage that ran on almost anything and got copied onto more office PCs than any game before it." },
    { id: "pc_prince_of_persia",
      blurb: "Jordan Mechner rotoscoped his own brother's movements to make a video game character move like a person for the first time — sixty minutes on the clock, a sword, and traps built to kill you the moment you stop paying attention." },
    { id: "pc_leisure_suit_larry",
      blurb: "Al Lowe's text-parser comedy, the one Sierra kept a straight face selling — a disco-suited loser trying, and mostly failing, his way through a night out in Lost Wages." },
    { id: "pc_keen6",
      blurb: "The last of the original trilogy-of-trilogies: platforming through an alien mothership to rescue Keen's babysitter, with a Big Red Cannon prize waiting for anyone who beats it fast enough." },
    { id: "pc_duke_nukem",
      blurb: "Before the one-liners and the 3D engine, Duke's first outing was a straightforward Apogee side-scroller — one disk, one wisecracking hero, and the template everything after it built on." },
    { id: "pc_sq4",
      blurb: "Roger Wilco gets thrown forward into his own sequel's marketing — Sierra's most self-aware entry in the series, parodying Star Trek, Terminator and its own back catalogue in the same breath." }
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
