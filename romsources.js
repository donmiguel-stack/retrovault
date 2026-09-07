// Where to get the game file yourself, for titles the Vault can't ship or
// host: the original is still sold (the Sierra catalogue on GOG, say), so the
// Vault only carries the catalogue entry, and the START button appears once
// the person drops their own copy into emulator/roms/. This file tells the
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
  "pc_leisure_suit_larry": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_1987",
    file: "Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_1987.zip",
    site: "Internet Archive",
    manual: "https://archive.org/details/Leisure_Suit_Larry_1_-_Manual"
  },
  "pc_lsl1_vga": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_VGA_1991",
    file: "Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_VGA_1991.zip",
    site: "Internet Archive",
    manual: "https://archive.org/details/Leisure_Suit_Larry_1_-_Manual"
  },
  "pc_lsl2": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_2_-_Goes_looking_for_Love_in_Several_Wrong_Places_1988",
    file: "Leisure_Suit_Larry_2_-_Goes_looking_for_Love_in_Several_Wrong_Places_1988.zip",
    site: "Internet Archive",
    note: "Starts with a copy-protection check: it shows a girl's photo and asks for her phone number from the game's \"little black book\" (the manual - scan linked below).",
    manual: "https://archive.org/details/Leisure_Suit_Larry_2_-_Manual"
  },
  "pc_lsl3": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_3_-_Passionate_Patti_in_Pursuit_of_the_Pulsating_Pectorals_1989",
    file: "Leisure_Suit_Larry_3_-_Passionate_Patti_in_Pursuit_of_the_Pulsating_Pectorals_1989.zip",
    site: "Internet Archive",
    note: "Has a copy-protection check that asks for a girl's measurements from the manual - scan linked below.",
    manual: "https://archive.org/details/Leisure_Suit_Larry_3_-_Manual"
  },
  "pc_lsl5": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_5_-_Passionate_Patti_Does_a_Little_Undercover_Work_1991",
    file: "Leisure_Suit_Larry_5_-_Passionate_Patti_Does_a_Little_Undercover_Work_1991.zip",
    site: "Internet Archive",
    manual: "https://archive.org/details/lsl5-playspy"
  },
  "pc_lsl6": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_6_-_Shape_Up_or_Slip_Out_1993",
    file: "msdos_Leisure_Suit_Larry_6_-_Shape_Up_or_Slip_Out_1993.zip",
    site: "Internet Archive",
    note: "This is the CD-ROM version with full speech: 469 MB, which the browser has to unpack in memory every time you start it. Slow to load, and a floppy-version zip (a few MB, text only) works far better if you have one.",
    manual: "https://archive.org/details/Leisure_Suit_Larry_6_-_Manual"
  },
  // ---- MS-DOS titles still sold (GOG/Steam) - Mike's own copies stay local ----
  "pc_wolfenstein3d": {
    url: "https://archive.org/details/WOLF3D-MS-DOS", file: "WOLF3D.zip", site: "Internet Archive",
    note: "The full six-episode registered version (.WL6 files), not the shareware episode."
  },
  "pc_spear_of_destiny": {
    url: "https://archive.org/details/msdos_Spear_of_Destiny_1992", file: "Spear_of_Destiny_1992.zip", site: "Internet Archive",
    note: "Includes all three missions behind id's own picker menu."
  },
  "pc_duke_nukem_3d": {
    url: "https://archive.org/details/DUKE3D_DOS", file: "DUKE3D.zip", site: "Internet Archive",
    note: "Version 1.3D, three episodes, 16 MB. The Atomic Edition on archive.org is a 612 MB CD image - too heavy for the browser."
  },
  "pc_sq4": {
    url: "https://archive.org/details/msdos_Space_Quest_IV_-_Roger_Wilco_and_the_Time_Rippers_1991",
    file: "Space_Quest_IV_-_Roger_Wilco_and_the_Time_Rippers_1991.zip", site: "Internet Archive",
    note: "CD talkie version, 86 MB - it is unpacked in the browser on every start, so expect a wait."
  },
  "pc_sq6": {
    url: "https://archive.org/details/msdos_Space_Quest_VI_-_Roger_Wilco_in_the_Spinal_Frontier_1995",
    file: "Space_Quest_VI_-_Roger_Wilco_in_the_Spinal_Frontier_1995.zip", site: "Internet Archive",
    note: "CD version, 613 MB. That is more than the browser can comfortably unpack in memory - only try it on a machine with plenty of RAM, and prefer a floppy-version zip if you have one."
  },
  "pc_kq2": {
    url: "https://archive.org/details/msdos_Kings_Quest_II_-_Romancing_the_Throne_1987",
    file: "Kings_Quest_II_-_Romancing_the_Throne_1987.zip", site: "Internet Archive"
  },
  "pc_kq5": {
    url: "https://archive.org/details/msdos_Kings_Quest_V_-_Absence_Makes_the_Heart_Go_Yonder_1990",
    file: "Kings_Quest_V_-_Absence_Makes_the_Heart_Go_Yonder_1990.zip", site: "Internet Archive",
    note: "CD talkie version, 61 MB - slow to start, since it is unpacked in the browser each time."
  },
  "pc_kq6": {
    url: "https://archive.org/details/msdos_Kings_Quest_VI_-_Heir_Today_Gone_Tomorrow_1992",
    file: "Kings_Quest_VI_-_Heir_Today_Gone_Tomorrow_1992.zip", site: "Internet Archive",
    note: "CD version, 230 MB - heavy for the browser; a floppy-version zip works far better if you have one."
  },
  "pc_kq7": {
    url: "https://archive.org/details/msdos_Kings_Quest_VII_-_The_Princeless_Bride_1994",
    file: "Kings_Quest_VII_-_The_Princeless_Bride_1994.zip", site: "Internet Archive",
    note: "CD version, 335 MB - heavy for the browser."
  },
  "pc_doom2": {
    url: "https://archive.org/details/doom2_202504", file: "doom2.zip", site: "Internet Archive",
    note: "Full DOOM2.WAD v1.9 with the original DOOM2.EXE, 16 MB. Comes with somebody's WASD key setup and save games already in it."
  },
  "pc_final_doom_tnt": {
    url: "https://archive.org/details/msdos_Final_DOOM_1996", file: "Final_DOOM_1996.zip", site: "Internet Archive",
    note: "One zip holds both halves of Final Doom (tnt/ and plutonia/ folders); named TNT.zip the Vault starts TNT Evilution from it."
  },
  "pc_final_doom_plutonia": {
    url: "https://archive.org/details/msdos_Final_DOOM_1996", file: "Final_DOOM_1996.zip", site: "Internet Archive",
    note: "The same zip as TNT Evilution - named PLUTONIA.zip the Vault starts The Plutonia Experiment from it."
  },
  "pc_keen2": {
    url: "https://archive.org/details/msdos_Commander_Keen_2_-_The_Earth_Explodes_1990",
    file: "Commander_Keen_2_-_The_Earth_Explodes_1990.zip", site: "Internet Archive"
  },
  "pc_keen3": {
    url: "https://archive.org/details/msdos_Commander_Keen_3_-_Keen_Must_Die_1990",
    file: "Commander_Keen_3_-_Keen_Must_Die_1990.zip", site: "Internet Archive"
  },
  "pc_keen4": {
    url: "https://archive.org/details/msdos_Commander_Keen_4_-_Secret_of_the_Oracle_1991",
    file: "Commander_Keen_4_-_Secret_of_the_Oracle_1991.zip", site: "Internet Archive"
  },
  "pc_keen5": {
    url: "https://archive.org/details/keen5", file: "keen5.zip", site: "Internet Archive"
  },
  "pc_keen6": {
    url: "https://archive.org/details/msdos_Commander_Keen_6_-_Aliens_Ate_My_Baby_Sitter_1991",
    file: "Commander_Keen_6_-_Aliens_Ate_My_Baby_Sitter_1991.zip", site: "Internet Archive",
    note: "This copy is the CGA build (KEEN6C.EXE, four colours). The EGA version looks much better if you can find it."
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
  "c64_winter_games": {
    url: "https://archive.org/details/Winter_Games_1985_Epyx_cr_Paradroid", file: "Winter_Games_1985_Epyx_cr_Paradroid.d64", site: "Internet Archive"
  },
  "c64_pitstop2": {
    url: "https://archive.org/details/Pitstop_II_1984_Epyx_cr_Mr.X", file: "Pitstop_II_1984_Epyx_cr_Mr.X.d64", site: "Internet Archive"
  },
  "c64_outrun": {
    url: "https://archive.org/details/d64_Out_Run_1988_U.S._Gold", file: "Out_Run_1988_U.S._Gold.d64", site: "Internet Archive"
  }
};
