#!/usr/bin/env python3
"""One-shot script: insert 15 C64 homebrew entries into games.js/gamepages.js/
genres.js/featured.js, and bump cache versions in index.html/game.html/app.js.
Run once from inside the VAULT folder, then delete."""
import re, json, sys

games = [
    dict(id="c64_hb_c64anabalt", title="C64anabalt", romFile="C64anabalt.d64",
         year=2012, publisher="RGCD", developer="RGCD",
         genre="action", players="p1",
         video_id="elIoPajS_zk", video_title="C64anabalt Canabalt Demake C64 Commodore Longplay Gameplay Playthrough",
         history="RGCD's 16KB cartridge conversion of Adam Saltsman's 2009 Flash hit Canabalt, released as a compo game in 2012. It strips the endless-runner down to pure timing and silhouette, proving the C64 could still do \"one button, infinite fall\" as well as any browser — free to download, or pay what you think is fair."),
    dict(id="c64_hb_doc_cosmos", title="Doc Cosmos", romFile="Doc Cosmos.d64",
         year=2019, publisher="Simon Jameson", developer="Simon Jameson",
         genre="adventure", players="p1",
         video_id="bFM8HU7inxk", video_title="[Commodore 64] Doc Cosmos (2019) Longplay",
         history="Simon Jameson's entry for RGCD's 2019 16k Cartridge Game Development Competition, a sci-fi adventure squeezed into the same 16KB ceiling as several other homebrew standouts of the decade. Part of a small wave of jam-born C64 games proving the machine's old constraints still make for good design discipline."),
    dict(id="c64_hb_tenebra2", title="Tenebra 2", romFile="Tenebra 2.d64",
         year=2022, publisher="Haplo", developer="Haplo",
         genre="puzzle", players="p1",
         video_id="sBcdpFPzNE8", video_title="Commodore 64 -=Tenebra 2=-",
         history="The coder known as Haplo followed up 2016's Tenebra with this 2022 puzzle sequel, layering roguelike trappings — permadeath runs, procedurally-flavoured rooms — onto tight C64 puzzle design. Released across an unusually wide spread of 8-bit platforms simultaneously, a hallmark of the modern homebrew scene's cross-platform toolchains."),
    dict(id="c64_hb_bomberland", title="Bomberland", romFile="Bomberland.d64",
         year=2018, publisher="Master", developer="Master",
         genre="action", players="p12",
         video_id="R9vDwO3QxWQ", video_title="[Commodore 64] Bomberland (2018) Longplay",
         history="A coder going by \"Master\" built this Bomberman-style bomb-em-up for up to five simultaneous players, a rarity given the C64's limited native multiplayer input options. Version 1.1 shipped in 2018, part of the homebrew scene's steady output of party games designed for the machine's joystick ports rather than its keyboard."),
    dict(id="c64_hb_bruce_lee_return_of_fury", title="Bruce Lee: Return of Fury", romFile="Bruce Lee Return of Fury.d64",
         year=2019, publisher="Megastyle", developer="Megastyle",
         genre="platformer", players="p12",
         video_id="Pqc_KfSBoyw", video_title="Commodore 64 Longplay [281] Bruce Lee: Return of Fury (Public Domain)",
         history="The demo group Megastyle built this unofficial sequel to 1984's Bruce Lee, keeping the original's ladders-and-lanterns platforming while expanding the moveset and level design well past what the 8-bit original attempted. Free and released into the public domain, it's a fan continuation rather than a licensed product."),
    dict(id="c64_hb_rocket_smash_ex", title="Rocket Smash EX", romFile="Rocket Smash EX.crt",
         year=2015, publisher="RGCD", developer="Richard Bayliss / RGCD",
         genre="action", players="p1",
         video_id="KoYlskxx-10", video_title="Rocket Smash EX Longplay (C64) [50 FPS]",
         history="Richard Bayliss expanded his RGCD 16k Cart Compo 2013 entry into a full 64KB cartridge release in 2015, adding extra levels and polish to a fast, vertical-scrolling rocket-dodging shooter built originally under the compo's tight size limit."),
    dict(id="c64_hb_micro_hexagon", title="Micro Hexagon", romFile="Micro Hexagon.d64",
         year=2013, publisher="Onslaught", developer="Onslaught",
         genre="action", players="p1",
         video_id="6RG5gEL84tg", video_title="Micro Hexagon Gameplay (C64)",
         history="Onslaught's demake of Terry Cavanagh's Super Hexagon, squeezed into 16KB for the RGCD cartridge compo of 2013 — pure reflex geometry, rotating walls, and a game-over screen you'll see constantly."),
    dict(id="c64_hb_wolfling", title="Wolfling", romFile="Wolfling.prg",
         year=2019, publisher="Lazycow", developer="Lazycow",
         genre="platformer", players="p1",
         video_id="uMYWehJ_DHU", video_title="Wolfling Longplay (C64) [50 FPS]",
         history="Lazycow, one of the most prolific names in modern C64 homebrew, put out Wolfling's version 1.4 in 2019 — a tight platformer starring a wolf cub, trading the studio's usual puzzle leanings for straightforward jump-and-run action."),
    dict(id="c64_hb_runn_n_gunn", title="Runn'n'Gunn", romFile="Runn n Gunn.d64",
         year=2021, publisher="Excess", developer="Excess",
         genre="action", players="p1",
         video_id="PprvKlzquBU", video_title="Modern Retro Review - Runn'n'Gunn (Commodore 64)",
         history="Excess built Runn'n'Gunn in 2021 as a throwback to arcade run-and-gun shooters, splitting the action between platforming and near-constant enemy fire — one of a steady stream of releases from a group that's become a fixture of the current C64 scene."),
    dict(id="c64_hb_grid_pix", title="Grid Pix", romFile="Grid Pix.d64",
         year=2020, publisher="Excess", developer="Excess",
         genre="puzzle", players="p1",
         video_id="a9dV1OB79RQ", video_title="Grid Pix (C64) - RGN Quick Play",
         history="Excess turned to logic puzzles for Grid Pix in 2020, a nonogram/Picross game filling a genre almost entirely absent from the original C64 library — later picked up for a boxed cartridge release by Thalamus Digital / RGCD."),
    dict(id="c64_hb_super_bread_box", title="Super Bread Box", romFile="Super Bread Box.prg",
         year=2012, publisher="Paulko64", developer="Paulko64",
         genre="platformer", players="p1",
         video_id="USdUkFSE8Eo", video_title="Super Bread Box (C64 2012) (Gameplay)",
         history="Paulko64 ported the 2010 indie arcade game Bread Box (better known by its later name, Super Crate Box) to the C64 in 2012, fitting the whole thing into a 16KB cartridge. Grab a crate, get a random new gun, survive the horde, repeat."),
    dict(id="c64_hb_hero_is_back", title="H.E.R.O. Is Back", romFile="HERO Is Back.d64",
         year=2025, publisher="Excess and Hokuto Force", developer="Excess and Hokuto Force",
         genre="platformer", players="p1",
         video_id="sZ9C8Vo4QAc", video_title="H.E.R.O. Is Back (C64 Longplay)",
         history="Excess and Hokuto Force joined forces in 2025 to build an unofficial sequel to Activision's 1984 mining-rescue classic H.E.R.O., over four decades after the original. Same jetpack, same dynamite, a fresh set of caverns to burn through."),
    dict(id="c64_hb_luftrauserz", title="LuftrauserZ", romFile="LuftrauserZ.d64",
         year=2017, publisher="Triad", developer="Triad",
         genre="shooter", players="p1",
         video_id="MUKSBemVAOA", video_title="Luftrauserz - C64 version of the PC indie hit shooter LUFTRAUSERS",
         history="Triad's 2017 conversion took the 2014 PC dogfighter Luftrausers and squeezed its frantic, physics-driven plane combat onto real C64 hardware. Pick a hull, pick a weapon, and try to stay airborne against wave after wave of enemy planes and subs."),
    dict(id="c64_hb_bagman_strikes_back", title="Bagman Strikes Back", romFile="Bagman Strikes Back.d64",
         year=2022, publisher="Laxity", developer="Laxity",
         genre="platformer", players="p1",
         video_id="fnWU-SIreGw", video_title="Bagman Strikes Back (C64) - Longplay - Hard difficulty, All 24 stages",
         history="Laxity's 2022 unofficial follow-up to the 1983 arcade platformer Bagman keeps the core loop intact — a mustachioed thief hauling sacks of gold up ladders while dodging guards — nearly forty years after the coin-op original."),
    dict(id="c64_hb_galaxian_dx", title="Galaxian DX", romFile="Galaxian DX.d64",
         year=2021, publisher="Army of Darkness", developer="Army of Darkness",
         genre="shooter", players="p1",
         video_id="W5ujiphcfak", video_title="Galaxian DX (Commodore 64)",
         history="Army of Darkness reworked Namco's 1979 shoot-em-up Galaxian for the C64 in 2021, keeping the diving alien-formation attacks but adding smoother scrolling and modern touches — a loving tribute rather than a straight port."),
]

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

# --- guard: skip entirely if already applied (idempotent re-run safety) ---
games_txt = open("games.js", encoding="utf-8").read()
if '"c64_hb_c64anabalt"' in games_txt:
    print("ALREADY APPLIED - games.js already has c64_hb_c64anabalt, aborting to avoid duplicates.")
    sys.exit(1)

# --- games.js ---
idx = games_txt.rindex("\n]\n};")
blocks = []
for g in games:
    block = (
        "  {\n"
        f'    "id": "{g["id"]}",\n'
        f'    "filename": "{g["id"]}.d64",\n'
        f'    "title": "{esc(g["title"])}",\n'
        '    "platform": "C64",\n'
        '    "category": "Homebrew (community)",\n'
        '    "vpNumber": null,\n'
        '    "tags": [],\n'
        f'    "romFile": "{esc(g["romFile"])}",\n'
        f'    "year": {g["year"]},\n'
        f'    "publisher": "{esc(g["publisher"])}",\n'
        f'    "developer": "{esc(g["developer"])}"\n'
        "  }"
    )
    blocks.append(block)
insertion = ",\n" + ",\n".join(blocks)
new_txt = games_txt[:idx] + insertion + games_txt[idx:]
new_txt2, n = re.subn(r'"count":\s*(\d+)', lambda m: f'"count": {int(m.group(1)) + len(blocks)}', new_txt, count=1)
assert n == 1
open("games.js", "w", encoding="utf-8").write(new_txt2)
print("games.js: inserted", len(blocks))

# --- gamepages.js ---
txt = open("gamepages.js", encoding="utf-8").read()
idx = txt.rindex("\n};")
gpblocks = []
for g in games:
    block = (
        f' "{g["id"]}": {{\n'
        '  "input": "joystick",\n'
        '  "video": {\n'
        f'   "id": "{g["video_id"]}",\n'
        f'   "title": "{esc(g["video_title"])}"\n'
        '  },\n'
        '  "history": {\n'
        f'   "text": "{esc(g["history"])}"\n'
        '  }\n'
        ' }'
    )
    gpblocks.append(block)
insertion = ",\n" + ",\n".join(gpblocks)
new_txt = txt[:idx] + insertion + txt[idx:]
open("gamepages.js", "w", encoding="utf-8").write(new_txt)
print("gamepages.js: inserted", len(gpblocks))

# --- genres.js ---
txt = open("genres.js", encoding="utf-8").read()
idx = txt.rindex("\n};")
grblocks = []
for g in games:
    grblocks.append(f' "{g["id"]}": {{\n  "genre": "{g["genre"]}",\n  "players": "{g["players"]}"\n }}')
insertion = ",\n" + ",\n".join(grblocks)
new_txt = txt[:idx] + insertion + txt[idx:]
open("genres.js", "w", encoding="utf-8").write(new_txt)
print("genres.js: inserted", len(grblocks))

# --- featured.js: add 6 curated homebrew picks ---
txt = open("featured.js", encoding="utf-8").read()
if 'c64_hb_c64anabalt' not in txt:
    new_entries = '''    { id: "c64_hb_c64anabalt", shot: "c64_hb_c64anabalt.png",
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
      blurb: "Excess brought Picross to the C64 in 2020 — a genre the original 213-game and 43-game shelves never had — later picked up for a real boxed cartridge release." }
'''
    marker = "  homebrew: [\n"
    idx = txt.index(marker) + len(marker)
    new_txt = txt[:idx] + new_entries + ",\n" + txt[idx:]
    open("featured.js", "w", encoding="utf-8").write(new_txt)
    print("featured.js: inserted 6 c64 homebrew picks")
else:
    print("featured.js: already has c64 homebrew picks, skipped")

# --- bump cache versions ---
def bump_v(path, old, new):
    txt = open(path, encoding="utf-8").read()
    n = txt.count(f"v={old}")
    txt2 = txt.replace(f"v={old}", f"v={new}")
    open(path, "w", encoding="utf-8").write(txt2)
    print(f"{path}: bumped v={old} -> v={new} ({n} occurrences)")

bump_v("index.html", 83, 84)
bump_v("game.html", 83, 84)

txt = open("app.js", encoding="utf-8").read()
txt2 = txt.replace("COVER_V = 23;", "COVER_V = 24;")
open("app.js", "w", encoding="utf-8").write(txt2)
print("app.js: COVER_V 23 -> 24")

txt = open("game.html", encoding="utf-8").read()
txt2 = txt.replace("COVER_V = 23;", "COVER_V = 24;")
open("game.html", "w", encoding="utf-8").write(txt2)
print("game.html: COVER_V 23 -> 24")

print("\nDONE")
