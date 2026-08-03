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
    { id: "new_amok", shot: "new_amok.jpg",
      blurb: "Written in 1999, two decades after Philips gave up. The homebrew scene never quite let this console die." }
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
    { name: "webretro",
      tint: "#4fb3bf",
      url: "https://github.com/BinBashBanana/webretro",
      lang: "Open source",
      what: "The browser front-end for libretro that runs the games here, by BinBashBanana." }
  ]
};
