// Where to get the game file yourself, for titles the Vault can't ship or
// host: the Vault only carries the catalogue entry, and the START button
// appears once the person drops their own copy into emulator/roms/.
//
// Games GOG sells are left out of this file ON PURPOSE (2026-10-28): their
// page shows "Buy it on GOG" (gog.js) instead of a free download. Removed
// entries are kept in Claude outputs/gog-backup-2026-10-28/romsources-removed.js. This file tells the
// game page where a preserved copy can be downloaded and what to call it.
//
// Rendered by game.html under the "drop <file> into emulator/roms/" note,
// as three numbered steps: download <file> from <site>, rename it to
// <romFile> (games.js), put it in emulator/roms/. On the PC shelf a plain
// zip is enough - emulator/dos.html unpacks it and adds the DOSBox config
// itself (see emulator/dos-launch.js), so no repacking is asked of anyone.
//
// Keyed by games.js id:
//   url    the page to download from (an archive.org item page, not the
//          raw file - people should see where it comes from)
//   file   the exact file name to pick on that page
//   site   short name of the source, shown in the step text
//   note   optional: anything to know before starting (copy protection,
//          size, which version this is)
//   manual optional: page with a scan of the printed manual (shown as a
//          fourth line - the Larry games' copy protection needs it)
//
// Only preservation collections here (archive.org's own MS-DOS library),
// never warez/torrent sites - same sourcing footing as vault-sources.md.
window.ROM_SOURCES = {
  // ---- MS-DOS titles not on GOG (Duke 3D, GTA, OutRun) ----
  "pc_duke_nukem_3d": {
    url: "https://archive.org/details/DUKE3D_DOS", file: "DUKE3D.zip", site: "Internet Archive",
    note: "Version 1.3D, three episodes, 16 MB. The Atomic Edition on archive.org is a 612 MB CD image - too heavy for the browser."
  },
  "pc_gta1": {
    url: "https://archive.org/details/grand-theft-auto-1997-dma-design",
    file: "Grand Theft Auto (1997)(DMA Design).zip", site: "Internet Archive",
    note: "32 MB. The DOS build lives in the gtados/ folder; the Vault runs its sound setup (k.exe) before the game, as the original launcher did."
  },
  "pc_outrun": {
    url: "https://archive.org/details/Outrun_DOS", file: "Outrun.zip", site: "Internet Archive"
  },
  // ---- C64 titles still sold (THEC64 / Evercade / Steam) - bare .d64 downloads ----
  "c64_boulder_dash": {
    url: "https://archive.org/details/Boulder_Dash_1984_First_Star_cr_AFL", file: "Boulder_Dash_1984_First_Star_cr_AFL.d64", site: "Internet Archive"
  },
  "c64_impossible_mission": {
    url: "https://archive.org/details/impossible_mission_202309", file: "impossible_mission.d64", site: "Internet Archive"
  },
  "c64_last_ninja": {
    url: "https://archive.org/details/Last_Ninja_The_1987_System_3", file: "Last_Ninja_The_1987_System_3.d64", site: "Internet Archive"
  },
  "c64_uridium": {
    url: "https://archive.org/details/Uridium_1986_Hewson_cr_Jabba", file: "Uridium_1986_Hewson_cr_Jabba.d64", site: "Internet Archive"
  },
  "c64_paradroid": {
    url: "https://archive.org/details/Paradroid_1985_Graftgold_cr_Zenith", file: "Paradroid_1985_Graftgold_cr_Zenith.d64", site: "Internet Archive"
  },
  "c64_ik_plus": {
    url: "https://archive.org/details/IK_1987_System_3_cr_ESI", file: "IK_1987_System_3_cr_ESI.d64", site: "Internet Archive"
  },
  "c64_creatures": {
    url: "https://archive.org/details/Creatures_1990_Thalamus_cr_IT_t_7_IT", file: "Creatures_1990_Thalamus_cr_IT_t_7_IT.d64", site: "Internet Archive",
    note: "A crack with a trainer menu in front of the game (skip it to play it straight)."
  },
  "c64_california_games": {
    url: "https://archive.org/details/California_Games_1987_Epyx_Side_A_cr_REM_Docs_125",
    file: "California_Games_1987_Epyx_Side_A_cr_REM_Docs_125.d64", site: "Internet Archive",
    note: "A two-sided disk; this is side A. Side B is a separate item on archive.org (…_Side_B_…), and the Vault's player has no disk-swap, so the events on side B stay out of reach."
  },
  "c64_decathlon": {
    url: "https://archive.org/details/Decathlon_1983_Activision_cr_Bytebreaker", file: "Decathlon_1983_Activision_cr_Bytebreaker.d64", site: "Internet Archive",
    note: "Boots straight into the stadium, no crack intro. Several other dumps on archive.org open with a cracker&rsquo;s scroller first."
  },
  "c64_winter_games": {
    url: "https://archive.org/details/Winter_Games_1985_Epyx_cr_Paradroid", file: "Winter_Games_1985_Epyx_cr_Paradroid.d64", site: "Internet Archive"
  },
  "c64_pitstop2": {
    url: "https://archive.org/details/Pitstop_II_1984_Epyx_cr_Mr.X", file: "Pitstop_II_1984_Epyx_cr_Mr.X.d64", site: "Internet Archive"
  },
  "c64_outrun": {
    url: "https://archive.org/details/d64_Out_Run_1988_U.S._Gold", file: "Out_Run_1988_U.S._Gold.d64", site: "Internet Archive"
  },

  // ---- Amiga ----
  // Commercial Amiga titles the Vault carries a catalogue entry for but does
  // not host: the disk images below are the exact releases each entry was
  // boot-tested against here, so a copy fetched this way behaves the same.
  // The per-letter "commodore-amiga-games-adf-*" items are bulk TOSEC-style
  // collections - large pages, use the item's own search box to find the file.
  "am_robocop": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r",
    file: "RoboCop (1989)(Ocean)[cr OCL].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_jimmywhite": {
    url: "https://archive.org/details/commodore-amiga-games-adf-j",
    file: "Jimmy White's 'Whirlwind' Snooker (1991-08-18)(Virgin)[cr CSL].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_ohnomorelemmings": {
    url: "https://archive.org/details/commodore-amiga-games-adf-o",
    file: "Oh No! More Lemmings (1991)(Psygnosis)[cr FLT].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_bubblebobble": {
    url: "https://archive.org/details/commodore-amiga-games-adf-b",
    file: "Bubble Bobble (1988)(Firebird)(PAL).zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside. This is the uncracked PAL original."
  },
  "am_turrican": {
    url: "https://archive.org/details/Turrican_1990_Rainbow_Arts_cr_TRSI",
    file: "Turrican_1990_Rainbow_Arts_cr_TRSI.adf",
    site: "Internet Archive"
  },
  "am_stuntcarracer": {
    url: "https://archive.org/details/commodore-amiga-games-adf-s",
    file: "Stunt Car Racer (1989)(MicroStyle)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_lotusturbo2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-l_202202",
    file: "Lotus Turbo Challenge 2 (1991)(Gremlin)[cr CPY].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_megamaid": {
    url: "https://janeway.exotica.org.uk/release.php?id=663",
    file: "Band&Pixar-Megamaid.adf",
    site: "Janeway / Exotica",
    note: "A demoscene production, freely spread since 1989 – the .adf is the second Direct Files link on that page. Contains a scanned magazine photograph and is not safe for work."
  },
  "am_arkanoid2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-a",
    file: "Arkanoid - Revenge of Doh (1988-11-05)(Imagine)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_battle_squadron": {
    url: "https://archive.org/details/commodore-amiga-games-adf-b",
    file: "Battle Squadron - The Destruction of the Barrax Empire! (1989)(Innerprise)[cr CP].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_blood_money": {
    url: "https://archive.org/details/commodore-amiga-games-adf-b",
    file: "Blood Money (1989)(Psygnosis)[cr Majestic][t +3 Majestic].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_bubble_ghost": {
    url: "https://archive.org/details/commodore-amiga-games-adf-b",
    file: "Bubble Ghost (1988)(Accolade).zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_chuck_rock": {
    url: "https://archive.org/details/commodore-amiga-games-adf-c",
    file: "Chuck Rock (1991)(Core)[cr CPY][t +2 PNS].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_double_dragon": {
    url: "https://archive.org/details/commodore-amiga-games-adf-d",
    file: "Double Dragon (1989)(Melbourne House)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_dynablaster": {
    url: "https://archive.org/details/commodore-amiga-games-adf-d",
    file: "Dyna Blaster (1992)(Ubi Soft)[cr VF].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_hunter": {
    url: "https://archive.org/details/commodore-amiga-games-adf-h",
    file: "Hunter (1991)(Activision)[cr CPY].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_hybris": {
    url: "https://archive.org/details/commodore-amiga-games-adf-h",
    file: "Hybris (1988)(Discovery)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_ikplus": {
    url: "https://archive.org/details/commodore-amiga-games-adf-i",
    file: "IK+ (1988-12-20)(System 3)(de-en)[cr].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_jetstrike": {
    url: "https://archive.org/details/commodore-amiga-games-adf-j",
    file: "Jetstrike (1993)(Rasputin)[cr OTL].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_katakis": {
    url: "https://archive.org/details/commodore-amiga-games-adf-k",
    file: "Katakis (1988)(Rainbow Arts)[cr RSi][t +3 RSi].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_kick_off2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-k",
    file: "Kick Off 2 (1990)(Anco)[cr OCL].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_lotus_esprit": {
    url: "https://archive.org/details/commodore-amiga-games-adf-l_202202",
    file: "Lotus Esprit Turbo Challenge (1990)(Gremlin)[cr PNA].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_magic_pockets": {
    url: "https://archive.org/details/commodore-amiga-games-adf-m",
    file: "Magic Pockets (1991)(Konami)(US)[cr FLT].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_menace": {
    url: "https://archive.org/details/commodore-amiga-games-adf-m",
    file: "Menace (1988)(Psyclapse)[cr Melnok].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_nebulus": {
    url: "https://archive.org/details/commodore-amiga-games-adf-n",
    file: "Nebulus (1988)(Hewson).zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_new_zealand_story": {
    url: "https://archive.org/details/commodore-amiga-games-adf-n",
    file: "New Zealand Story, The (1989)(Ocean)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_nitro": {
    url: "https://archive.org/details/commodore-amiga-games-adf-n",
    file: "Nitro (1990)(Psygnosis)[cr PDX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_north_and_south": {
    url: "https://archive.org/details/commodore-amiga-games-adf-n",
    file: "North & South (1989)(Infogrames)(M5)[cr].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_pang": {
    url: "https://archive.org/details/commodore-amiga-games-adf-p",
    file: "Pang (1990)(Ocean)(PAL)[cr HZ].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_parasol_stars": {
    url: "https://archive.org/details/commodore-amiga-games-adf-p",
    file: "Parasol Stars - Rainbow Islands 2 (1992)(Ocean)[cr SR][t +1 SR].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_populous": {
    url: "https://archive.org/details/commodore-amiga-games-adf-p",
    file: "Populous & Populous - The Promised Lands (1989)(Electronic Arts)[cr QTX][h UTB].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_rick_dangerous": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r",
    file: "Rick Dangerous (1989)(Firebird)[cr].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_rick_dangerous2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r",
    file: "Rick Dangerous 2 (1990)(MicroStyle)[cr PDX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_robocod": {
    url: "https://archive.org/details/commodore-amiga-games-adf-j",
    file: "James Pond 2 - Codename RoboCod (1991)(Millennium)[cr SR].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_rodland": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r",
    file: "Rod-Land v1.3 (1991)(Storm).zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_rtype": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r",
    file: "R-Type (1989)(Electric Dreams).zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_skweek": {
    url: "https://archive.org/details/commodore-amiga-games-adf-s",
    file: "Skweek (1989)(Loriciels)(FR)[cr QTX].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_speedball2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-s",
    file: "Speedball 2 - Brutal Deluxe v1.00 (1991-01-07)(Image Works)[cr DC].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_swiv": {
    url: "https://archive.org/details/commodore-amiga-games-adf-s",
    file: "SWIV v1.0 (1991-02-28)(Storm)[cr SR].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_turrican2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-r_202301",
    file: "Turrican II - The Final Fight (1991)(Rainbow Arts)[cr WT].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_wings_of_fury": {
    url: "https://archive.org/details/commodore-amiga-games-adf-w",
    file: "Wings of Fury (1990)(Broderbund)[h][Wings of Fury II].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_xenon2": {
    url: "https://archive.org/details/commodore-amiga-games-adf-x",
    file: "Xenon 2 - Megablast (1989)(Image Works)[cr BS1][t +3 BS1].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_xout": {
    url: "https://archive.org/details/commodore-amiga-games-adf-x",
    file: "X-Out (1991)(Kixx)[budget].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  },
  "am_zout": {
    url: "https://archive.org/details/commodore-amiga-games-adf-z",
    file: "Z-Out (1991)(Rainbow Arts)[cr SR].zip",
    site: "Internet Archive",
    note: "A zipped .adf - unzip it first, then rename the disk image inside."
  }
};
