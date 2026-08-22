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
      ],
      // br_9434 (Wall Street) is a standalone Brazilian G7000 release of
      // this same game, but it carries no vpNumber of its own, so it's
      // otherwise invisible to anything that cross-references the vault by
      // VP catalogue number - this is what puts it on the card (see
      // msCard() in app.js). See the matching "relatedTo" note on
      // br_9434's own page (gamepages.js) for the link back the other way.
      variants: [
        { id: "br_9434", label: "Brazil (standalone G7000 release, as \"Wall Street\")" }
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
      blurb: "LC-Games' 2022 tribute to the 1983 arcade platformer Bagman — a thief hauling gold up ladders, dodging guards, forty years and one homebrew scene later." },
    { id: "c64_hb_grid_pix", shot: "c64_hb_grid_pix.png",
      blurb: "Excess brought Picross to the C64 in 2020 — a genre the original Videopac and C64 shelves never had — later picked up for a real boxed cartridge release." }
  ],

  // ---- Homebrew, PC shelf ------------------------------------------
  // Same shape as "c64homebrew" above (id + blurb, no "shot" - the right-hand
  // slot is clip -> cover, there's no curated screenshot for these), shown
  // only on the PC shelf (placeBlocks() in app.js gates it on
  // state.platform === "PC"). Reuses c64HomebrewFeatureRotator() directly
  // rather than a third copy of that function - see the app.js comment at
  // the call site. The six here are picked by itch.io's own "popular" sort
  // among free/pay-what-you-want MS-DOS titles, not by whether this vault
  // has their DOS file yet - Gates Of Integrity, Dungeons of Noudar and
  // DISKSWEEPER are already playable; The Queen's Footsteps and Space
  // Cavern Blaster still need their DOS build added under emulator/roms
  // (both are pay-what-you-want on itch.io, including &pound;0) - same
  // "featured regardless" reasoning as the pcfeatured panel above.
  pchomebrew: [
    { id: "pc_hb_gates",
      blurb: "Tarjan's from-scratch first-person dungeon RPG, still getting numbered point releases years after its first one — create a party at the Guild and go find out what's down there." },
    { id: "pc_hb_queens",
      blurb: "Davide Bucci's steampunk-Italy text adventure, later released open source — type what you mean, and mean it precisely." },
    { id: "pc_hb_spacecavern",
      blurb: "dotmos built one cave-flyer and shipped it to five different 80s machines at once — C64, Amiga, Atari ST, Genesis, and this, the DOS cut." },
    { id: "pc_hb_noudar",
      blurb: "Daniel Monteiro's first-person dungeon crawler, four years in the making and still one of the most-cited examples of what real DOS code can do today, not just look like." },
    { id: "pc_hb_disksweeper",
      blurb: "Minesweeper as a broken-floppy repair job, built for the DOS Games August Jam 2022 — same rules, entirely new excuse for them." },
    { id: "pc_hb_alienintruder",
      blurb: "Juan J. Martínez's single-screen jump-and-run, released free in December 2024 — proof the scene isn't just a 90s revival, it shipped something new this week." }
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
      url:  "mailto:hq@retrovault.world",
      text: "Selling Videopac cartridges, consoles or spare joysticks? This slot is for you.",
      attract: "ADVERTISE HERE" }
  ],

  // ---- Keeping this console alive, C64 shelf -----------------------------
  // Same shape as "community" above, but for the C64 shelf - the sites and
  // projects that document, catalogue and still actively support this
  // machine. Shown only on the C64 shelf (placeBlocks() in app.js gates it
  // on state.platform === "C64").
  //
  // "what" (2026-08-12): now an { en, nl, de, fr, pt } object instead of a
  // plain string, same five codes as window.I18N in i18n.js. app.js's
  // communityWhat() picks window.currentLang() out of it, falling back to
  // .en - a plain string still works too (same fallback path), so this
  // isn't a breaking change for anyone editing this file by hand. Fixes the
  // bug where switching the site's language translated the "Keeping this
  // console alive" heading and intro line (those already went through
  // window.t()) but left every card's own text stuck in English, because
  // the card text was never hooked into i18n at all until now.
  c64community: [
    { name: "CSDb",
      tint: "#5b8def",
      url: "https://csdb.dk/",
      lang: "International",
      what: {
        en: "The scene's own database - releases, screenshots and history for practically everything written for the machine since 1982, including several of the 2020s homebrews on this shelf.",
        nl: "De eigen database van de scene - releases, screenshots en geschiedenis van vrijwel alles wat sinds 1982 voor de machine is geschreven, inclusief verschillende homebrews uit de jaren 2020 op deze plank.",
        de: "Die eigene Datenbank der Szene - Releases, Screenshots und Geschichte zu praktisch allem, was seit 1982 für die Maschine geschrieben wurde, einschließlich mehrerer Homebrews der 2020er in diesem Regal.",
        fr: "La base de données de la scène elle-même - sorties, captures d'écran et histoire de pratiquement tout ce qui a été écrit pour la machine depuis 1982, y compris plusieurs homebrews des années 2020 présents sur cette étagère.",
        pt: "O banco de dados da própria cena - lançamentos, capturas de tela e história de praticamente tudo que foi escrito para a máquina desde 1982, incluindo várias homebrews dos anos 2020 nesta prateleira."
      } },
    { name: "GameBase64",
      tint: "#2fb47c",
      url: "https://gamebase64.com/",
      lang: "International",
      what: {
        en: "The exhaustive commercial-game catalogue project this shelf's C64 ROMs and cover art were largely sourced from.",
        nl: "Het uitputtende catalogusproject voor commerciële games waar de C64-roms en cover-art van deze plank grotendeels vandaan komen.",
        de: "Das umfassende Katalogprojekt für kommerzielle Spiele, aus dem die C64-ROMs und Cover-Art dieses Regals größtenteils stammen.",
        fr: "Le projet de catalogue exhaustif des jeux commerciaux dont proviennent en grande partie les ROMs C64 et les jaquettes de cette étagère.",
        pt: "O extenso projeto de catálogo de jogos comerciais de onde vêm, em grande parte, as ROMs de C64 e as artes de capa desta prateleira."
      } },
    { name: "Lemon64",
      tint: "#e0865a",
      url: "https://www.lemon64.com/",
      lang: "International",
      what: {
        en: "One of the oldest and most active English-language C64 communities - reviews, box scans and a forum running since 2000.",
        nl: "Een van de oudste en actiefste Engelstalige C64-gemeenschappen - reviews, doosscans en een forum dat al sinds 2000 draait.",
        de: "Eine der ältesten und aktivsten englischsprachigen C64-Communitys - Rezensionen, Verpackungsscans und ein Forum, das seit 2000 läuft.",
        fr: "L'une des communautés C64 anglophones les plus anciennes et les plus actives - critiques, scans de boîtes et un forum actif depuis 2000.",
        pt: "Uma das comunidades C64 de língua inglesa mais antigas e ativas - resenhas, digitalizações de caixas e um fórum ativo desde 2000."
      } },
    { name: "C64-Wiki",
      tint: "#c07de0",
      url: "https://www.c64-wiki.com/wiki/Main_Page",
      lang: "International",
      what: {
        en: "A community-run encyclopedia covering hardware, software and scene history, article by article.",
        nl: "Een door de gemeenschap beheerde encyclopedie over hardware, software en scenegeschiedenis, artikel voor artikel.",
        de: "Eine von der Community betriebene Enzyklopädie zu Hardware, Software und Szenegeschichte, Artikel für Artikel.",
        fr: "Une encyclopédie animée par la communauté, couvrant le matériel, les logiciels et l'histoire de la scène, article par article.",
        pt: "Uma enciclopédia mantida pela comunidade, cobrindo hardware, software e a história da cena, artigo por artigo."
      } },
    { name: "Protovision",
      tint: "#e0c05a",
      url: "https://www.protovision.games/",
      lang: "Germany",
      what: {
        en: "Still publishing brand new physical C64 cartridges and hardware today - proof this machine never actually stopped.",
        nl: "Publiceert vandaag de dag nog steeds gloednieuwe fysieke C64-cartridges en hardware - het bewijs dat deze machine nooit echt is gestopt.",
        de: "Veröffentlicht bis heute brandneue physische C64-Module und Hardware - der Beweis, dass diese Maschine nie wirklich aufgehört hat.",
        fr: "Publie encore aujourd'hui de toutes nouvelles cartouches C64 physiques et du matériel - la preuve que cette machine n'a jamais vraiment cessé d'exister.",
        pt: "Ainda hoje lança cartuchos físicos e hardware totalmente novos para o C64 - prova de que esta máquina nunca realmente parou."
      } },
    { name: "VICE",
      tint: "#4fb3bf",
      url: "https://vice-emu.sourceforge.io/",
      lang: "Open source",
      what: {
        en: "The open-source emulator core this shelf's browser player actually runs on under the hood.",
        nl: "De open-source emulatorkern waar de browserspeler van deze plank onder de motorkap eigenlijk op draait.",
        de: "Der Open-Source-Emulatorkern, auf dem der Browser-Player dieses Regals unter der Haube tatsächlich läuft.",
        fr: "Le cœur d'émulation open source sur lequel tourne réellement, sous le capot, le lecteur navigateur de cette étagère.",
        pt: "O núcleo de emulação de código aberto sobre o qual o player do navegador desta prateleira realmente roda por baixo dos panos."
      } }
  ],

  // ---- Keeping this console alive, PC shelf ------------------------------
  // Same shape as "c64community" above, but for the MS-DOS shelf - the
  // forums, catalogues and jam communities that document and actively grow
  // this shelf's homebrew section. Shown only on the PC shelf (placeBlocks()
  // in app.js gates it on state.platform === "PC"). "what" is a translated
  // object, see the note above c64community.
  pccommunity: [
    { name: "VOGONS",
      tint: "#5b8def",
      url: "https://www.vogons.org/",
      lang: "International",
      what: {
        en: "The largest active DOS and vintage-PC hardware forum on the internet - troubleshooting real DOSBox configs and real 486s in the same threads since 2003.",
        nl: "Het grootste actieve DOS- en vintage-pc-hardwareforum op internet - sinds 2003 worden in dezelfde topics zowel echte DOSBox-configuraties als echte 486's uitgeplozen.",
        de: "Das größte aktive DOS- und Vintage-PC-Hardware-Forum im Internet - seit 2003 werden in denselben Threads echte DOSBox-Konfigurationen und echte 486er behandelt.",
        fr: "Le plus grand forum actif sur le DOS et le matériel PC vintage sur internet - on y dépanne, dans les mêmes fils, de vraies configs DOSBox et de vrais 486 depuis 2003.",
        pt: "O maior fórum ativo sobre DOS e hardware de PC vintage da internet - resolvendo problemas de configurações reais do DOSBox e de 486 de verdade nos mesmos tópicos desde 2003."
      } },
    { name: "DOSGames.com",
      tint: "#2fb47c",
      url: "https://www.dosgames.com/",
      lang: "International",
      what: {
        en: "Free DOS game downloads and reviews running since 1998, with an active homebrew-author section covering exactly this scene.",
        nl: "Gratis DOS-gamedownloads en -reviews, al sinds 1998 online, met een actieve homebrew-auteurssectie die precies deze scene bestrijkt.",
        de: "Kostenlose DOS-Spiele-Downloads und Rezensionen, seit 1998 online, mit einem aktiven Homebrew-Autoren-Bereich, der genau diese Szene abdeckt.",
        fr: "Téléchargements et critiques de jeux DOS gratuits en ligne depuis 1998, avec une section active dédiée aux auteurs homebrew qui couvre exactement cette scène.",
        pt: "Downloads e resenhas gratuitas de jogos DOS no ar desde 1998, com uma seção ativa de autores homebrew que cobre exatamente essa cena."
      } },
    { name: "DOS haven",
      tint: "#e0865a",
      url: "https://www.doshaven.eu/",
      lang: "International",
      what: {
        en: "A blog and database built specifically around brand-new DOS releases - this shelf's homebrew picks lean on it more than anywhere else.",
        nl: "Een blog en database die specifiek is opgebouwd rond gloednieuwe DOS-releases - de homebrew-keuzes van deze plank leunen hier meer op dan op wat dan ook.",
        de: "Ein Blog und eine Datenbank, die sich gezielt um brandneue DOS-Veröffentlichungen dreht - die Homebrew-Auswahl dieses Regals stützt sich mehr darauf als auf alles andere.",
        fr: "Un blog et une base de données construits spécifiquement autour des toutes nouvelles sorties DOS - les choix homebrew de cette étagère s'y appuient plus que sur toute autre source.",
        pt: "Um blog e banco de dados construídos especificamente em torno de lançamentos DOS novinhos em folha - as escolhas homebrew desta prateleira dependem mais dele do que de qualquer outro lugar."
      } },
    { name: "Cyningstan DOS Games",
      tint: "#e0c05a",
      url: "http://dos.cyningstan.org.uk/",
      lang: "International",
      what: {
        en: "One developer still writing original 8088/CGA-era DOS games and giving away the source - two of them, Barren Planet and The Chambers Beneath, are on this shelf.",
        nl: "Eén ontwikkelaar die nog steeds originele DOS-spellen uit het 8088/CGA-tijdperk schrijft en de broncode weggeeft - twee daarvan, Barren Planet en The Chambers Beneath, staan op deze plank.",
        de: "Ein Entwickler, der noch immer originale DOS-Spiele aus der 8088/CGA-Ära schreibt und den Quellcode verschenkt - zwei davon, Barren Planet und The Chambers Beneath, stehen in diesem Regal.",
        fr: "Un développeur qui écrit encore des jeux DOS originaux de l'ère 8088/CGA et distribue le code source - deux d'entre eux, Barren Planet et The Chambers Beneath, sont sur cette étagère.",
        pt: "Um desenvolvedor que ainda escreve jogos DOS originais da era 8088/CGA e distribui o código-fonte de graça - dois deles, Barren Planet e The Chambers Beneath, estão nesta prateleira."
      } },
    { name: "DOS Games Jam",
      tint: "#c07de0",
      url: "https://itch.io/jam/dos-games-jam",
      lang: "International",
      what: {
        en: "The recurring itch.io jam family - DOSember every December, plus spring, summer and fall runs - that's the actual source of most of this shelf's homebrew, several of them jam entries themselves.",
        nl: "De terugkerende itch.io-jamfamilie - elke december DOSember, plus lente-, zomer- en herfsteditie - is de echte bron van het meeste homebrew op deze plank, waarvan meerdere zelf jam-inzendingen zijn.",
        de: "Die wiederkehrende itch.io-Jam-Familie - jedes Jahr im Dezember DOSember, dazu Frühlings-, Sommer- und Herbstausgaben - ist die eigentliche Quelle für die meisten Homebrews in diesem Regal, von denen einige selbst Jam-Beiträge sind.",
        fr: "La famille de jams itch.io récurrents - DOSember chaque décembre, plus les éditions de printemps, d'été et d'automne - est la véritable source de la plupart des homebrews de cette étagère, dont plusieurs sont eux-mêmes des créations de jam.",
        pt: "A recorrente família de jams do itch.io - o DOSember todo mês de dezembro, além das edições de primavera, verão e outono - é a fonte real da maior parte das homebrews desta prateleira, várias delas próprias participantes de jam."
      } },
    { name: "js-dos",
      tint: "#4fb3bf",
      url: "https://js-dos.com/",
      lang: "Open source",
      what: {
        en: "The open-source DOSBox-in-the-browser project this shelf's player actually runs on under the hood.",
        nl: "Het open-source DOSBox-in-de-browser-project waar de speler van deze plank onder de motorkap eigenlijk op draait.",
        de: "Das Open-Source-Projekt DOSBox-im-Browser, auf dem der Player dieses Regals unter der Haube tatsächlich läuft.",
        fr: "Le projet open source DOSBox-dans-le-navigateur sur lequel tourne réellement, sous le capot, le lecteur de cette étagère.",
        pt: "O projeto de código aberto DOSBox-no-navegador sobre o qual o player desta prateleira realmente roda por baixo dos panos."
      } }
  ],

  // ---- Community --------------------------------------------------------
  // The people keeping this machine documented. Most of what is in the Vault
  // came from these sites; the least it can do is send traffic back. "what"
  // is a translated object, see the note above c64community. videopac.ch
  // added 2026-08-12: source of the German Conquest of the World and Quest
  // for the Rings manuals plus the multi-language glossary in the Wall
  // Street Fortune Hunt one, all three now in their games' Extras sections.
  community: [
    { name: "Odyssey Clube",
      tint: "#2fb47c",
      url: "https://odysseyclube.com",
      lang: "Brazil",
      what: {
        en: "The Brazilian releases: box scans, manuals, magazines and the game descriptions used on those pages here.",
        nl: "De Braziliaanse releases: doosscans, handleidingen, tijdschriften en de spelomschrijvingen die hier gebruikt worden.",
        de: "Die brasilianischen Veröffentlichungen: Verpackungsscans, Anleitungen, Magazine und die Spielbeschreibungen, die hier verwendet werden.",
        fr: "Les éditions brésiliennes : scans de boîtes, notices, magazines et les descriptions de jeux utilisées ici.",
        pt: "As edições brasileiras: digitalizações de caixas, manuais, revistas e as descrições dos jogos usadas aqui."
      } },
    { name: "The Odyssey² Homepage",
      tint: "#5b8def",
      url: "https://odyssey2.info",
      lang: "USA",
      what: {
        en: "William Cassidy's database — every cartridge by region, with prototypes and rumours carefully separated from releases.",
        nl: "William Cassidy's database — elke cartridge per regio, met prototypes en geruchten zorgvuldig gescheiden van echte releases.",
        de: "William Cassidys Datenbank — jedes Modul nach Region, mit Prototypen und Gerüchten sorgfältig von echten Veröffentlichungen getrennt.",
        fr: "La base de données de William Cassidy — chaque cartouche par région, avec prototypes et rumeurs soigneusement distingués des sorties officielles.",
        pt: "O banco de dados de William Cassidy — cada cartucho por região, com protótipos e boatos cuidadosamente separados dos lançamentos reais."
      } },
    { name: "Videopac.nl",
      tint: "#e0865a",
      url: "https://videopac.nl",
      lang: "Netherlands",
      what: {
        en: "Long-running fan site and forum, and the best source on the Jopac line and the French exclusives.",
        nl: "Al jarenlange fansite en forum, en de beste bron over de Jopac-lijn en de Franse exclusieves.",
        de: "Seit Jahren aktive Fanseite und Forum, und die beste Quelle zur Jopac-Reihe und den französischen Exklusivtiteln.",
        fr: "Site de fans et forum actif depuis des années, la meilleure source sur la gamme Jopac et les exclusivités françaises.",
        pt: "Site de fãs e fórum ativo há muitos anos, e a melhor fonte sobre a linha Jopac e os exclusivos franceses."
      } },
    { name: "Videopac.org",
      tint: "#c07de0",
      url: "http://www.videopac.org",
      lang: "International",
      what: {
        en: "Collector's database of cartridge variants, box numbers and packaging.",
        nl: "Verzamelaarsdatabase van cartridge-varianten, doosnummers en verpakking.",
        de: "Sammlerdatenbank zu Modulvarianten, Verpackungsnummern und Verpackung.",
        fr: "Base de données de collectionneurs sur les variantes de cartouches, numéros de boîte et emballages.",
        pt: "Banco de dados de colecionadores sobre variantes de cartuchos, números de caixa e embalagens."
      } },
    { name: "Internet Archive — Odyssey² manuals",
      tint: "#e0c05a",
      url: "https://archive.org/details/odysseymanuals",
      lang: "International",
      what: {
        en: "The scanned manual collection every manual reader in the Vault is drawn from.",
        nl: "De gescande handleidingencollectie waar elke handleiding-lezer in de Vault uit put.",
        de: "Die gescannte Anleitungssammlung, aus der jeder Anleitungs-Reader im Vault stammt.",
        fr: "La collection de notices numérisées dont provient chaque lecteur de notice dans le Vault.",
        pt: "A coleção de manuais digitalizados da qual vem cada leitor de manual do Vault."
      } },
    { name: "Rafael Cardoso — Jogos Odyssey",
      tint: "#e0865a",
      url: "https://www.youtube.com/@heatseekerbr",
      lang: "Brazil",
      what: {
        en: "The author of Route 66, still writing games for this console and posting each one as it comes — over a hundred videos of his own projects.",
        nl: "De maker van Route 66, die nog steeds spellen voor deze console schrijft en elk nieuw project deelt — meer dan honderd video's van zijn eigen werk.",
        de: "Der Autor von Route 66, der immer noch Spiele für diese Konsole schreibt und jedes neue Projekt postet — über hundert Videos seiner eigenen Arbeiten.",
        fr: "L'auteur de Route 66, qui écrit encore des jeux pour cette console et publie chacun d'eux au fil de l'eau — plus d'une centaine de vidéos de ses propres projets.",
        pt: "O autor de Route 66, que ainda escreve jogos para este console e publica cada um assim que fica pronto — mais de cem vídeos de seus próprios projetos."
      } },
    { name: "webretro",
      tint: "#4fb3bf",
      url: "https://github.com/BinBashBanana/webretro",
      lang: "Open source",
      what: {
        en: "The browser front-end for libretro that runs the games here, by BinBashBanana.",
        nl: "De browser-frontend voor libretro die de spellen hier draait, gemaakt door BinBashBanana.",
        de: "Das Browser-Frontend für libretro, das die Spiele hier zum Laufen bringt, von BinBashBanana.",
        fr: "L'interface navigateur pour libretro qui fait tourner les jeux ici, par BinBashBanana.",
        pt: "A interface de navegador para o libretro que roda os jogos aqui, feita por BinBashBanana."
      } },
    { name: "videopac.ch",
      tint: "#8a8f98",
      url: "https://videopac.ch",
      lang: "Switzerland",
      what: {
        en: "A Swiss collector's own boxed copies, scanned and shared — source of the German Conquest of the World and Quest for the Rings manuals in this Vault's Extras sections, plus the multi-language glossary bound into the Wall Street Fortune Hunt one.",
        nl: "De eigen boxed exemplaren van een Zwitserse verzamelaar, gescand en gedeeld — hier komen de Duitse handleidingen van Conquest of the World en Quest for the Rings in de Extras van deze Vault vandaan, plus de meertalige woordenlijst in de handleiding van Wall Street Fortune Hunt.",
        de: "Die eigenen originalverpackten Exemplare eines Schweizer Sammlers, gescannt und geteilt — Quelle der deutschen Anleitungen zu Conquest of the World und Quest for the Rings in den Extras dieses Vaults, sowie des mehrsprachigen Glossars in der Wall-Street-Fortune-Hunt-Anleitung.",
        fr: "Les propres exemplaires en boîte d'un collectionneur suisse, numérisés et partagés — source des notices allemandes de Conquest of the World et Quest for the Rings dans les Extras de ce Vault, ainsi que du glossaire multilingue relié dans celle de Wall Street Fortune Hunt.",
        pt: "Os próprios exemplares originais de um colecionador suíço, digitalizados e compartilhados — fonte dos manuais em alemão de Conquest of the World e Quest for the Rings nos Extras deste Vault, além do glossário multilíngue incluído no manual de Wall Street Fortune Hunt."
      } }
  ]
};
