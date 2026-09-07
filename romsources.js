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
//
// Only preservation collections here (archive.org's own MS-DOS library),
// never warez/torrent sites - same sourcing footing as vault-sources.md.
window.ROM_SOURCES = {
  "pc_leisure_suit_larry": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_1987",
    file: "Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_1987.zip",
    site: "Internet Archive"
  },
  "pc_lsl1_vga": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_VGA_1991",
    file: "Leisure_Suit_Larry_1_-_Land_of_the_Lounge_Lizards_VGA_1991.zip",
    site: "Internet Archive"
  },
  "pc_lsl2": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_2_-_Goes_looking_for_Love_in_Several_Wrong_Places_1988",
    file: "Leisure_Suit_Larry_2_-_Goes_looking_for_Love_in_Several_Wrong_Places_1988.zip",
    site: "Internet Archive",
    note: "Starts with a copy-protection check: it shows a girl's photo and asks for her phone number from the game's \"little black book\" (the manual, which isn't in that zip). The numbers are easy to find online - search for \"Larry 2 copy protection\"."
  },
  "pc_lsl3": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_3_-_Passionate_Patti_in_Pursuit_of_the_Pulsating_Pectorals_1989",
    file: "Leisure_Suit_Larry_3_-_Passionate_Patti_in_Pursuit_of_the_Pulsating_Pectorals_1989.zip",
    site: "Internet Archive",
    note: "Has a copy-protection check that asks for a girl's measurements from the manual (not in that zip) - the answers are easy to find online, search for \"Larry 3 copy protection\"."
  },
  "pc_lsl5": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_5_-_Passionate_Patti_Does_a_Little_Undercover_Work_1991",
    file: "Leisure_Suit_Larry_5_-_Passionate_Patti_Does_a_Little_Undercover_Work_1991.zip",
    site: "Internet Archive"
  },
  "pc_lsl6": {
    url: "https://archive.org/details/msdos_Leisure_Suit_Larry_6_-_Shape_Up_or_Slip_Out_1993",
    file: "msdos_Leisure_Suit_Larry_6_-_Shape_Up_or_Slip_Out_1993.zip",
    site: "Internet Archive",
    note: "This is the CD-ROM version with full speech: 469 MB, which the browser has to unpack in memory every time you start it. Slow to load, and a floppy-version zip (a few MB, text only) works far better if you have one."
  }
};
