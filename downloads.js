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
  "am_demo_sota": {
    file: "amiga_demo_sota.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/2/",
    checked: "2026-09-20"
  },
  "am_demo_enigma": {
    file: "amiga_demo_enigma.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/143/",
    checked: "2026-09-20"
  },
  "am_demo_mentalhangover": {
    file: "amiga_demo_mentalhangover.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/22186/",
    checked: "2026-09-20"
  },
  "am_demo_interference": {
    file: "amiga_demo_interference.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/8991/",
    checked: "2026-09-20"
  },
  "am_demo_arte": {
    file: "amiga_demo_arte.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/5784/",
    checked: "2026-09-20"
  },
  "am_demo_globaltrash": {
    file: "amiga_demo_globaltrash.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/710/",
    checked: "2026-09-20"
  },
  "am_demo_voyage": {
    file: "amiga_demo_voyage.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/1914/",
    checked: "2026-09-20"
  },
  "am_demo_rinkadink": {
    file: "amiga_demo_rinkadink.adf",
    verdict: "LIKELY-OK",
    source: "https://demozoo.org/productions/59657/",
    checked: "2026-09-20"
  },
  "c64_demo_dutchbreeze": {
    file: "c64_demo_dutchbreeze_full.zip",
    verdict: "LIKELY-OK",
    source: "https://csdb.dk/release/?id=11584",
    checked: "2026-09-20",
    note: "Complete multi-side release, as archived by CSDb. The Vault plays side&nbsp;1 in the browser."
  },
  "c64_demo_deusexmachina": {
    file: "c64_demo_deusexmachina_full.zip",
    verdict: "LIKELY-OK",
    source: "https://csdb.dk/release/?id=11585",
    checked: "2026-09-20",
    note: "Complete multi-side release, as archived by CSDb. The Vault plays side&nbsp;1 in the browser."
  },
  "c64_demo_royalarte": {
    file: "c64_demo_royalarte_full.zip",
    verdict: "LIKELY-OK",
    source: "https://csdb.dk/release/?id=11619",
    checked: "2026-09-20",
    note: "Complete multi-side release, as archived by CSDb. The Vault plays side&nbsp;1 in the browser."
  },
  "c64_demo_wonderland12": {
    file: "c64_demo_wonderland12_full.zip",
    verdict: "LIKELY-OK",
    source: "https://csdb.dk/release/?id=120907",
    checked: "2026-09-20",
    note: "Complete multi-side release, as archived by CSDb. The Vault plays side&nbsp;1 in the browser."
  },


  // ---- Videopac / G7000+ ----
  "new_bird-hunt": {
    file: "Bird Hunt (Ahnl66).bin",
    verdict: "CLEAR",
    source: "published on GitHub by the author as source plus the assembled bird-hunt.bin (github.com/Ahnl66/BIRD-HUNT); Mike confirmed on 2026-09-19 that the Vault is free to host it",
    checked: "2026-09-19"
  },
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
  },
  "pc_softporn": {
    file: "SOFTPORN.zip",
    verdict: "LIKELY-OK",
    source: "Shareware release by Gary Thompson (ReadMe.txt in the archive asks for a $20 registration, no restriction on copying); per Wikipedia the PC version was later put up as a free download by Al Lowe (allowe.com), and Sierra itself shipped it on the 1994 Greatest Hits (and Misses) CD. Sourced from archive.org item SoftpornAdventureV2.4SW1991GaryThompsonInteractiveFictionAdult (soft.ZIP)",
    checked: "2026-09-07"
  },

  "c64_hb_munchkin64": {
    file: "Munchkin64.prg",
    verdict: "LIKELY-OK",
    source: "https://pretzel-logic.itch.io/munchkin64 — name-your-own-price, all donations forwarded to cancer research; no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_roguebot": {
    file: "Roguebot.d64",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/roguebot — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_veggies_vs_undead": {
    file: "Veggies vs Undead.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/veggies-vs-undead — free download, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_shallow_domains": {
    file: "Shallow Domains.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/shallow-domains — pay-what-you-want, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_comchinko": {
    file: "comchinko.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/comchinko — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_broken_altars": {
    file: "brokenaltars.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/broken-altars — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_trenchangle": {
    file: "trenchangle.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/trenchangle — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_overload": {
    file: "overload.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/overload — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_terminal_walker": {
    file: "walker.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/terminal-walker — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_soiled_iron": {
    file: "soiledquest.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/soiled-iron — pay-what-you-want, no explicit redistribution statement, no commercial version found. Hosted as the Quest-mode .prg (soiledquest.prg) rather than the .d64 — the .d64 failed to autostart in a real boot test (blank screen, same symptom class as the Munchkin 64 .d64 issue), while the standalone Quest .prg boots straight into gameplay.",
    checked: "2026-09-09"
  },
  "c64_hb_portal_buster": {
    file: "portalbuster.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/portal-buster — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_mineshaft_gap": {
    file: "mineshaftgap.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/mineshaft-gap — pay-what-you-want, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_metal_mayhem": {
    file: "metalmayhem.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/metal-mayhem — pay-what-you-want, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_corescape": {
    file: "corescape.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/corescape — pay-what-you-want, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_missile_defence": {
    file: "missiledefence.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/missile-defence — free download; the developer states \"You are welcome to distribute it any way you like, as long as you don't take money for it,\" no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_balls_like_a_frog": {
    file: "blaf.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/balls-like-a-frog — free download, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_minotrace": {
    file: "minotrace.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/minotrace — pay-what-you-want, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_ball_and_chain": {
    file: "ballnchain.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/ball-and-chain — pay-what-you-want, source code public on GitHub, no explicit redistribution statement, no commercial version found",
    checked: "2026-09-09"
  },
  "c64_hb_gates_of_the_ancient": {
    file: "goftancient.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/gates-of-the-ancient — pay-what-you-want, no explicit redistribution statement. A commenter (Protovision) floated a possible commercial physical release, but no confirmed boxed edition exists — treated as LIKELY-OK, not RESTRICTED, since an offer isn't evidence of an actual competing release.",
    checked: "2026-09-09"
  },
  "c64_hb_plekthora": {
    file: "plekthora.prg",
    verdict: "LIKELY-OK",
    source: "https://drmortalwombat.itch.io/plekthora — pay-what-you-want, source code public (published for modding/reverse-engineering), no explicit redistribution statement, no commercial version found. Developer explicitly allowed inclusion on Reset Magazine's coverdisk.",
    checked: "2026-09-09"
  },
  "am_sqrxz": {
    file: "amiga_sqrxz.adf",
    verdict: "LIKELY-OK",
    source: "https://www.retroguru.com/sqrxz/ — official free download from the developer's own site (Retroguru), offered gratis with no license restriction stated; same basis as the vault's other Retroguru titles.",
    checked: "2026-09-15"
  },
  "am_sqrxz3": {
    file: "amiga_sqrxz3.adf",
    verdict: "LIKELY-OK",
    source: "https://www.retroguru.com/sqrxz3/ — official free download from the developer's own site (Retroguru), offered gratis with no license restriction stated.",
    checked: "2026-09-15"
  },
  "am_sqrxz4": {
    file: "amiga_sqrxz4.adf",
    verdict: "LIKELY-OK",
    source: "https://www.retroguru.com/sqrxz4/ — official free download from the developer's own site (Retroguru), offered gratis with no license restriction stated.",
    checked: "2026-09-15"
  },
  "am_wizzys_quest": {
    file: "amiga_wizzys_quest.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) — \"Wizzy's Quest (1990)(G&S Appenzeller)(PD)\" — the developers released it as public domain; sourced from the archive.org TOSEC Amiga public-domain-games collection.",
    checked: "2026-09-15"
  },
  "am_cybernetix": {
    file: "amiga_cybernetix.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release — sourced from the archive.org TOSEC Amiga public-domain-games collection. Same shareware basis the vault already applies to DOS titles like the Doom/Wolfenstein 3D shareware episodes.",
    checked: "2026-09-15"
  },
  "am_deluxe_galaga": {
    file: "amiga_deluxe_galaga.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release — sourced from the archive.org TOSEC Amiga public-domain-games collection; Edgar Vigdal distributed Deluxe Galaga as freely-copyable shareware.",
    checked: "2026-09-15"
  },
  "am_megaball": {
    file: "amiga_megaball.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release — sourced from the archive.org TOSEC Amiga public-domain-games collection. Ed & Al Mackey distributed MegaBall as shareware; the authors' own site (fur.com/~almackey/megaball) still offers it for free download.",
    checked: "2026-09-15"
  },
  "am_zerg": {
    file: "amiga_zerg.adf",
    verdict: "CLEAR",
    source: "amigapd.com's own write-up (“Zerg Amiga Public Domain”) and the amigapd interview with author Michael Gordon Shapiro both describe it as public domain; sourced from the archive.org “Software Library: Amiga: Public Domain Games” collection (softwarelibrary_amiga_pd) — curated as public domain by that archive; the TOSEC filename itself carries no separate (PD)/(SW) suffix.",
    checked: "2026-09-15"
  },
  "am_doctor_strange_2": {
    file: "amiga_doctor_strange_2.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (FW) freeware release, distributed via 17-Bit Software, with source code included.",
    checked: "2026-09-15"
  },
  "am_pollymorf": {
    file: "amiga_pollymorf.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Andrew Campbell.",
    checked: "2026-09-15"
  },
  "am_dogfight": {
    file: "amiga_dogfight.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Richard Ling (AMOS).",
    checked: "2026-09-15"
  },
  "am_drip": {
    file: "amiga_drip.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Art Skiles.",
    checked: "2026-09-15"
  },
  "am_bobs_garden": {
    file: "amiga_bobs_garden.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release by Justin Leck; no evidence of a competing commercial version.",
    checked: "2026-09-15"
  },
  "am_super_obliteration": {
    file: "amiga_super_obliteration.adf",
    verdict: "CLEAR",
    source: "amigapd.com's own top-ten write-up describes it plainly as a public domain title by David Papworth; sourced from the archive.org “Software Library: Amiga: Public Domain Games” collection (softwarelibrary_amiga_pd) — curated as public domain by that archive; the TOSEC filename itself carries no separate (PD)/(SW) suffix.",
    checked: "2026-09-15"
  },
  "am_asteroids": {
    file: "amiga_asteroids.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release (“Cabaret Asteroids”) by Vertical Developments; no evidence of a competing commercial version.",
    checked: "2026-09-15"
  },
  "am_alien_fish_finger": {
    file: "amiga_alien_fish_finger.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Skull Army — sourced deliberately over the disk's separately-circulated (SW-R) “registered” variant, which was skipped per the standard TOSEC skip-registered-versions rule.",
    checked: "2026-09-15"
  },
  "am_wibble_world_giddy": {
    file: "amiga_wibble_world_giddy.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Phillip Ruston.",
    checked: "2026-09-15"
  },
  "am_crazy_sue": {
    file: "amiga_crazy_sue.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release, published by MC Publications.",
    checked: "2026-09-15"
  },
  "am_pengo2": {
    file: "amiga_pengo2.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (GW) giftware release by Reploid — freely distributable, with a gift to the author requested but not enforced. Sourced deliberately over the earlier MartinSoft “Pengo” disk, which TOSEC tags (SW-R) “registered” and which the standard skip-registered-versions rule excludes.",
    checked: "2026-09-15"
  },
  "am_toado": {
    file: "amiga_toado.adf",
    verdict: "CLEAR",
    source: "Sourced from the archive.org “software library: amiga: public domain games” collection (softwarelibrary_amiga_pd) — curated as public domain by that archive; the tosec filename itself carries no separate (pd)/(sw) suffix; developer J. Wills's game is referenced throughout the Amiga PD scene (including an amigapd.com author interview) without any indication of a commercial release.",
    checked: "2026-09-15"
  },
  "am_deluxe_pacman": {
    file: "amiga_deluxe_pacman.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release (v1.2) by Edgar Vigdal — sourced deliberately over the later v1.7 AGA disk, which TOSEC tags (SW-R) “registered” and which the standard skip-registered-versions rule excludes.",
    checked: "2026-09-15"
  },
  "am_llamatron": {
    file: "amiga_llamatron.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release of Jeff Minter's Llamatron: 2112 for Llamasoft; Minter has long distributed his older catalogue, this title included, for free from his own sites, and no competing paid Amiga release exists.",
    checked: "2026-09-15"
  },
  "am_gorf": {
    file: "amiga_gorf.adf",
    verdict: "CLEAR",
    source: "Sourced from the archive.org “software library: amiga: public domain games” collection (softwarelibrary_amiga_pd) — curated as public domain by that archive; the tosec filename itself carries no separate (pd)/(sw) suffix; Towerbyte's Amiga tribute to the arcade original, with no indication anywhere of a commercial Amiga release.",
    checked: "2026-09-15"
  },
  "am_dropzone": {
    file: "amiga_dropzone.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release by Richard Tunstall; no evidence of a competing commercial version.",
    checked: "2026-09-15"
  },
  "am_elevation": {
    file: "amiga_elevation.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware release by Delta-9; no evidence of a competing commercial version.",
    checked: "2026-09-15"
  },
  "am_trailblazer": {
    file: "amiga_trailblazer.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Alchemy Productions — an original-game tribute inspired by the C64 Trailblazer, not a port of Gremlin Graphics' commercial code.",
    checked: "2026-09-15"
  },
  "am_space_taxi": {
    file: "amiga_space_taxi.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) public domain release by Effect — an original-game tribute inspired by the C64 Space Taxi, not a port of the commercial original.",
    checked: "2026-09-15"
  },
  "am_act_of_war": {
    file: "amiga_act_of_war.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware; amigapd.com's A-Z write-up notes the free disk carries only the first few missions and that further missions were paid. No competing commercial release found. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Act of War (1992-09-01)(Smith, David)(SW)[AMOS].",
    checked: "2026-09-20"
  },
  "am_alien_bash": {
    file: "amiga_alien_bash.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) — released outright as public domain. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Alien Bash (1993)(Cumming, Glen - Law, Stuart)(PD).",
    checked: "2026-09-20"
  },
  "am_ant_wars": {
    file: "amiga_ant_wars.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). The later Ant Wars II carries an (SW-R) registered tag and was skipped per the standard skip-registered-versions rule. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Ant Wars v1.9 (1994)(Paranoid)(PD)[1Mb chip][AMOS].",
    checked: "2026-09-20"
  },
  "am_atoms": {
    file: "amiga_atoms.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Atoms! (1992)(Kuhn, Tom)(PD)[h Ashling Video Mansfield].",
    checked: "2026-09-20"
  },
  "am_biplanes": {
    file: "amiga_biplanes.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Biplanes (1990-09)(Mason, Peter)(PD).",
    checked: "2026-09-20"
  },
  "am_black_dawn": {
    file: "amiga_black_dawn.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). The Black Dawn II/VI sequels are F1 Licenceware (LW) or (SW-R) and were not considered. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Black Dawn (1994)(Campbell, Andrew)(PD)[h RR][AMOS].",
    checked: "2026-09-20"
  },
  "am_colonial_conquest2": {
    file: "amiga_colonial_conquest2.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (GW) giftware — free to copy, a gift to the author optional. Same basis the vault already applied to Pengo 2. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Colonial Conquest II (1994-08-22)(Mumenthaler, Christian)(GW)[AMOS].",
    checked: "2026-09-20"
  },
  "am_diplomacy": {
    file: "amiga_diplomacy.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware; no competing paid Amiga release found. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Diplomacy v2.0 (1991)(Douthat, Steve)(SW).",
    checked: "2026-09-20"
  },
  "am_donkey_kong": {
    file: "amiga_donkey_kong.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD) as a fan conversion. Same footing as the Deluxe Pac-Man and Gorf tributes already on this shelf: the Amiga code is the author's own, given away, with no paid Amiga release competing with it. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Donkey Kong (1993)(Bignonia)(PD)[C64 conversion].",
    checked: "2026-09-20"
  },
  "am_doody": {
    file: "amiga_doody.adf",
    verdict: "CLEAR",
    source: "Carried in the archive.org TOSEC Amiga public-domain games set with no paid release found anywhere; the disk itself credits Amiga Format. Same basis already applied to Toado. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Doody (1991)(WGSS)[h AGL].",
    checked: "2026-09-20"
  },
  "am_elevation2": {
    file: "amiga_elevation2.adf",
    verdict: "CLEAR",
    source: "Carried in the archive.org TOSEC Amiga public-domain games set, alongside the first Elevation the vault already hosts on the same basis. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Elevation II (199x)(Delta-9)[AMOS].",
    checked: "2026-09-20"
  },
  "am_hellzone": {
    file: "amiga_hellzone.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (SW) shareware, first two levels. Same shareware basis the vault already applies to Cybernetix and the DOS Doom/Wolfenstein episodes. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Hellzone - Carnage Extreme (1992)(Interscan)(SW)[level 1, 2].",
    checked: "2026-09-20"
  },
  "am_knights": {
    file: "amiga_knights.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (FW) freeware. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Knights v2.4 (1994-04-24)(Reaper)(FW)[AMOS].",
    checked: "2026-09-20"
  },
  "am_mayhem": {
    file: "amiga_mayhem.adf",
    verdict: "CLEAR",
    source: "Carried in the archive.org TOSEC Amiga public-domain games set; no paid release found. Listed among amigapd.com's top PD games. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Mayhem (1991)(Ensignia).",
    checked: "2026-09-20"
  },
  "am_particle_man": {
    file: "amiga_particle_man.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD), source code included. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Particle Man (199x)(Nordovics, Paul)(PD)[h RR][inc. source code, AMOS].",
    checked: "2026-09-20"
  },
  "am_sqrxz2": {
    file: "amiga_sqrxz2.adf",
    verdict: "LIKELY-OK",
    source: "TOSEC-tagged (FW) freeware; Retroguru give their whole catalogue away from retroguru.com. Same basis already applied to the vault's other three Sqrxz titles. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Sqrxz 2 v1.0 (2012-12-09)(Retroguru)(FW).",
    checked: "2026-09-20"
  },
  "am_tanx": {
    file: "amiga_tanx.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Tanx v1.0 (1991-02)(Robertz, Gaz)(PD).",
    checked: "2026-09-20"
  },
  "am_top_secret": {
    file: "amiga_top_secret.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). The release used here is the variant with the loading intro disabled, so it boots straight into the game. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Top Secret (1992)(The Hidden)(PD)[a intro disable].",
    checked: "2026-09-20"
  },
  "am_transplant": {
    file: "amiga_transplant.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (PD). — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release Transplant (1992)(Jumping Jack Flash)(PD).",
    checked: "2026-09-20"
  },
  "am_trap_runner": {
    file: "amiga_trap_runner.adf",
    verdict: "LIKELY-OK",
    source: "Downloaded directly from Retroguru's own Trap Runner page as a free ADF, no licence restriction stated, no competing paid release found. Same first-party basis as the vault's Sqrxz titles.",
    checked: "2026-09-20"
  },
  "am_turboraketti": {
    file: "amiga_turboraketti.adf",
    verdict: "CLEAR",
    source: "TOSEC-tagged (FW) freeware. The later v2.11 is tagged (SW-R) registered and was skipped per the standard skip-registered-versions rule. — sourced from the archive.org TOSEC Amiga public-domain games set (commodore-amiga-games-public-domain-adf), release TurboRaketti v0.99b (1992)(Kosola, Heikki)(fi)(FW)[h ASO].",
    checked: "2026-09-20"
  }

};
