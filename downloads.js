// Homebrew / copyright-free games the Vault hosts itself, in
// homebrew-downloads/ (git-tracked, NOT gitignored - these files ship with
// every clone/download of the Vault, unlike emulator/roms/).
//
// Different from support.js (a link out to the creator's own page, nothing
// hosted here) and shops.js (a link to someone selling a physical
// cartridge, no cut taken) - the file itself lives on this site for these.
//
//   file     filename inside homebrew-downloads/, must match exactly
//   verdict  the licensing check this game passed before being added here -
//              CLEAR      explicit permission found (open-source license,
//                         public-domain statement, or the author saying
//                         outright "share this however you like")
//              LIKELY-OK  free or pay-what-you-want, no explicit
//                         redistribution permission stated, but no red
//                         flag either (not sold anywhere else) - Mike's
//                         call (2026-08-18) was to host this tier too
//                         rather than wait on outreach for each one
//   source   where the license evidence came from
//   checked  the day this was last confirmed
//
// Never add a game here whose verdict would be UNCLEAR (no terms found at
// all) or RESTRICTED (sold commercially elsewhere in any form - a paid
// cartridge reissue, a paid boxed edition, etc). The full research this
// list is based on - including which titles turned out to be commercially
// sold and were kept OUT of this folder - is written up in the VAULT
// project's claude/vault-homebrew-licensing-review.md and
// claude/vault-c64-homebrew-licensing-review.md docs.

window.DOWNLOAD_DATA = {

  // ---- Videopac / G7000+ ----
  "new_ktaa-demo1": {
    file: "Kill the Attacking Aliens — demo 1.bin",
    verdict: "CLEAR",
    source: "Soeren Gust's own free demo release (AtariAge Odyssey²/Videopac homebrew forum) — separate from the sold full cartridge edition (see new_ktaa, kept out of this folder)",
    checked: "2026-08-18"
  },
  "new_ktaa-demo2": {
    file: "Kill the Attacking Aliens — demo 2.bin",
    verdict: "CLEAR",
    source: "Soeren Gust's own free demo release (AtariAge Odyssey²/Videopac homebrew forum) — separate from the sold full cartridge edition (see new_ktaa, kept out of this folder)",
    checked: "2026-08-18"
  },

  // ---- Commodore 64 ----
  "c64_hb_c64anabalt": {
    file: "C64anabalt.d64",
    verdict: "CLEAR",
    source: "https://rgcddev.itch.io/c64anabalt",
    checked: "2026-08-18"
  },
  "c64_hb_rescuing_orc": {
    file: "Rescuing Orc.d64",
    verdict: "CLEAR",
    source: "https://www.usebox.net/jjm/rescuing-orc/ — CC BY-NC-SA 4.0, the author's own free download (boxed disk/tape/cart editions exist via Poly Play, but the ROM itself is explicitly CC-licensed, same situation as his Alien Intruder already hosted here)",
    checked: "2026-08-23"
  },
  "c64_hb_bomberland": {
    file: "Bomberland.d64",
    verdict: "CLEAR",
    source: "RGCD homebrew release, free download",
    checked: "2026-08-18"
  },
  "c64_hb_rocket_smash_ex": {
    file: "Rocket Smash EX.crt",
    verdict: "CLEAR",
    source: "https://rgcddev.itch.io/rocket-smash-ex",
    checked: "2026-08-18"
  },
  "c64_hb_micro_hexagon": {
    file: "Micro Hexagon.d64",
    verdict: "CLEAR",
    source: "https://rgcddev.itch.io/micro-hexagon",
    checked: "2026-08-18"
  },
  "c64_hb_wolfling": {
    file: "Wolfling.prg",
    verdict: "CLEAR",
    source: "https://lazycow.itch.io/wolfling",
    checked: "2026-08-18"
  },
  "c64_hb_super_bread_box": {
    file: "Super Bread Box.prg",
    verdict: "CLEAR",
    source: "https://rgcddev.itch.io/super-bread-box",
    checked: "2026-08-18"
  },
  "c64_hb_doc_cosmos": {
    file: "Doc Cosmos.d64",
    verdict: "LIKELY-OK",
    source: "https://shallan64.itch.io/doc-cosmos — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-08-18"
  },
  "c64_hb_bruce_lee_return_of_fury": {
    file: "Bruce Lee Return of Fury.d64",
    verdict: "LIKELY-OK",
    source: "https://megastyle.itch.io/bruce-lee-return-of-fury — free download, no explicit redistribution statement, no commercial version found (an unauthorised eBay reseller was spotted but is not an official paid release)",
    checked: "2026-08-18"
  },
  "c64_hb_hero_is_back": {
    file: "HERO Is Back.d64",
    verdict: "LIKELY-OK",
    source: "https://lowcarb.itch.io/hero-is-back-c64 — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-08-18"
  },
  "c64_hb_bagman_strikes_back": {
    file: "Bagman Strikes Back.d64",
    verdict: "LIKELY-OK",
    source: "https://lowcarb.itch.io/bagman-strikes-back-c64 — free/pay-what-you-want; developer states it can never be sold commercially (Taito/Valadon own the original Bagman IP)",
    checked: "2026-08-18"
  },
  "c64_hb_galaxian_dx": {
    file: "Galaxian DX.d64",
    verdict: "LIKELY-OK",
    source: "https://arlagames.itch.io/galaxian-dx-c64 — free, source published on GitHub, no formal license statement so kept at LIKELY-OK rather than CLEAR",
    checked: "2026-08-18"
  },

  // ---- MS-DOS ----
  "pc_hb_noudar": {
    file: "NOUDAR.zip",
    verdict: "CLEAR",
    source: "Open source (BSD-3 license), mirrored on archive.org and the author's own itch.io upload",
    checked: "2026-08-18"
  },
  "pc_hb_alienintruder": {
    file: "ALIENINTRUDER.zip",
    verdict: "CLEAR",
    source: "https://www.usebox.net/jjm/alien-intruder/ — Juan J. Martínez's own site, free download with a Ko-fi tip jar",
    checked: "2026-08-18"
  },
  "pc_hb_goldmine": {
    file: "GOLDMINE.zip",
    verdict: "CLEAR",
    source: "https://www.usebox.net/jjm/gold-mine-run/ — CC BY-NC-SA 4.0, the author's own free download",
    checked: "2026-08-23"
  },
  "pc_hb_traxtor": {
    file: "TRAXTOR.zip",
    verdict: "CLEAR",
    source: "https://www.usebox.net/jjm/return-of-traxtor-dos/ — CC BY-NC-SA 4.0, the author's own free download",
    checked: "2026-08-23"
  },
  "pc_hb_gates": {
    file: "GATES.zip",
    verdict: "LIKELY-OK",
    source: "https://tarjan.itch.io/gates-of-integrity — free download, no explicit redistribution statement, dev responded positively when this game was mirrored on dosgames.com",
    checked: "2026-08-18"
  },
  "pc_hb_disksweeper": {
    file: "DISKSWEEPER.zip",
    verdict: "LIKELY-OK",
    source: "https://voxel.itch.io/disksweeper — free download, no explicit redistribution statement, no red flags",
    checked: "2026-08-18"
  },
  "pc_hb_pantsmo": {
    file: "PANTSMO.zip",
    verdict: "LIKELY-OK",
    source: "https://eviltentacle.itch.io/pantsmo — free download, no explicit redistribution statement, no red flags",
    checked: "2026-08-18"
  },
  "pc_hb_queens": {
    file: "QUEENSFOOTSTEPS.zip",
    verdict: "CLEAR",
    source: "https://darwinne.itch.io/the-queens-footsteps — page states \"You can freely download a digital version of the game with no restrictions\"; source on GitHub, assets CC-BY-NC",
    checked: "2026-08-19"
  },
  "pc_hb_catsbroombas": {
    file: "CATSBROOMBAS.zip",
    verdict: "CLEAR",
    source: "https://eigen.itch.io/cats-on-broombas — page states \"You are welcome, even encouraged, to take the shareware version and share it with others in any way you'd like\"",
    checked: "2026-08-19"
  },
  "pc_hb_spacecavern": {
    file: "SPACECAVERN.zip",
    verdict: "LIKELY-OK",
    source: "https://dotmos.itch.io/space-cavern-blaster — pay-what-you-want/free download, no explicit redistribution statement, no red flags",
    checked: "2026-08-19"
  },
  "pc_hb_barren": {
    file: "BARRENPLANET.zip",
    verdict: "LIKELY-OK",
    source: "https://cyningstan.itch.io/barren-planet — name-your-own-price download, source released separately, no explicit redistribution terms for the compiled game itself",
    checked: "2026-08-19"
  },
  "pc_hb_chambers": {
    file: "CHAMBERSBENEATH.zip",
    verdict: "LIKELY-OK",
    source: "https://cyningstan.itch.io/the-chambers-beneath — name-your-own-price download, no explicit redistribution statement, no red flags",
    checked: "2026-08-19"
  },
  "pc_hb_lake": {
    file: "LAKEADVENTURE.zip",
    verdict: "LIKELY-OK",
    source: "https://bjbest60.itch.io/lake-adventure — name-your-own-price download, no explicit redistribution statement, no red flags",
    checked: "2026-08-19"
  },
  "pc_hb_acronia": {
    file: "ACRONIA.zip",
    verdict: "LIKELY-OK",
    source: "https://hadrosaurus.itch.io/acronia — free DOS prototype page (\"provided here for posterity\"), pay-what-you-want, no explicit statement or red flags. The commercial remake is a separate hadrosoft.itch.io listing, not this one",
    checked: "2026-08-19"
  },

  // ---- Videopac / G7000+ (patcher tools) ----
  // jg-munchkin is not a standalone game file: makejg.zip contains only
  // MAKEJG.BAS, a QBasic patcher that reads the user's OWN "Attack of the
  // Timelord!" ROM and writes a patched "Munchkin" ROM from it. No
  // copyrighted Timelord data is included here, so it's safe to host - but
  // the download note below must make clear this is a tool, not a game.
  "new_jg-munchkin": {
    file: "makejg.zip",
    verdict: "CLEAR",
    source: "https://odyssey2.info/jgmunchkin/makejg.zip — a patcher tool (MAKEJG.BAS) that requires the user's own \"Attack of the Timelord!\" ROM as input; no commercial game data is redistributed here",
    note: "Patcher tool only — needs your own Attack of the Timelord! ROM to run",
    checked: "2026-08-19"
  }

};
