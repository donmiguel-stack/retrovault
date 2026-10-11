# Adds the Amiga shelf's "Still being written" homebrew panel and the six
# modern homebrews it features. Run from the Vault root. Idempotent: refuses
# to run twice.
import json, re, sys, io

def rd(p): return io.open(p, encoding="utf-8").read()
def wr(p, s): io.open(p, "w", encoding="utf-8").write(s)

if "am_yeet" in rd("games.js"):
    sys.exit("already applied")

ITCH = {
 "am_tiny_pixel_adventure": "https://hoogames2017.itch.io/tiny-pixel-adventure",
 "am_tenebra2": "https://h4plo.itch.io/tenebra-2",
 "am_ooze": "https://h4plo.itch.io/ooze",
 "am_yoomp": "https://zr-games.itch.io/amiga-yoomp",
 "am_shift": "https://h4plo.itch.io/shift",
 "am_yeet": "https://zooperdan.itch.io/yeet",
}

GAMES = [
 ("am_tiny_pixel_adventure", "Tiny Pixel Adventure", 2024, "HooGames2017", "HooGames2017"),
 ("am_tenebra2", "Tenebra 2", 2023, "Haplo", "Haplo"),
 ("am_ooze", "Ooze: The Escape", 2023, "Haplo", "Haplo & Andy Johns"),
 ("am_yoomp", "Amiga Yoomp!", 2024, "zr-games", "zr-games"),
 ("am_shift", "Shift", 2024, "Haplo", "Haplo"),
 ("am_yeet", "YEET", 2025, "zooperdan", "zooperdan"),
]

# ---- games.js: after am_turboraketti, so they sit with the other Amiga homebrew
s = rd("games.js")
anchor = '    "developer": "Heikki Kosola"\n  },\n'
assert s.count(anchor) == 1
block = ""
for gid, title, year, pub, dev in GAMES:
    f = "amiga_" + gid[3:] + ".adf"
    block += ('  {\n    "id": "%s",\n    "filename": "%s",\n    "title": %s,\n    "platform": "Amiga",\n'
              '    "category": "Homebrew (community)",\n    "vpNumber": null,\n    "tags": [],\n'
              '    "romFile": "%s",\n    "year": %d,\n    "publisher": %s,\n    "developer": %s\n  },\n'
              % (gid, f, json.dumps(title, ensure_ascii=False), f, year,
                 json.dumps(pub, ensure_ascii=False), json.dumps(dev, ensure_ascii=False)))
s = s.replace(anchor, anchor + block)
wr("games.js", s)

# ---- gamepages.js
PAGES = {
 "am_tiny_pixel_adventure": {"input": "joystick",
   "video": {"id": "EtLn0JJQ6zo", "title": "Commodore Amiga -=Tiny Pixel Adventure=- full version update 06.10.2026"},
   "history": {"text": "A modern OCS platformer by HooGames2017, first released in 2024 and still being updated – the build here is the 6 October 2026 update. Stomp what can be stomped, shoot the rest with a limited quiver of arrows, and run errands for a key to the next area."}},
 "am_tenebra2": {"input": "joystick",
   "history": {"text": "Haplo's sequel to Tenebra, released on the Amiga in 2023 after the 8-bit versions – 35 levels of guiding a man who will not step into the dark, now with a portal gun. The disk asks first: press Y for the classic non-interlaced look (recommended on an A500), N for the enhanced interlaced one."}},
 "am_ooze": {"input": "joystick",
   "video": {"id": "-oLd2ipXqa0", "title": "Longplay OOZE: The Escape - AMIGA - 720"},
   "history": {"text": "Code by Haplo, concept and graphics by Andy Johns – a ZX Spectrum game that went to the C64 and then to the Amiga in 2023, with a map almost twice the size. Ooze flips gravity to get past the robot guards. Press S to switch between music and sound effects."}},
 "am_yoomp": {"input": "joystick", "kickstart": "aros", "model": "ENGINE_DEFAULT",
   "video": {"id": "ERRZsqJN1y0", "title": "Amiga Yoomp!"},
   "history": {"text": "zr-games' Amiga version of the C64 and Atari 8-bit Yoomp!: a ball bouncing through textured 3D tubes, 27 levels, two soundtracks by MCH. PAL only – it refuses the NTSC A500 profile this shelf uses for Kickstart 1.3, so it boots on AROS with the engine's default machine instead."}},
 "am_shift": {"input": "joystick",
   "video": {"id": "GT0xH4ZsOQw", "title": "Commodore Amiga -=Shift=-"},
   "history": {"text": "Haplo's 2024 conversion of Antony Lavelle's Armor Games puzzle-platformer, made with Andy Johns and MarukPa: black and white trade places at the push of a button. 45 levels on the Amiga, one of them secret. R restarts a level, M toggles music."}},
 "am_yeet": {"input": "joystick",
   "video": {"id": "TwIkLO8WODY", "title": "Commodore Amiga -=YEET=-"},
   "history": {"text": "A 2025 rune puzzle by zooperdan, music by mA2E: push runes off the edge of the board until exactly one is left. 50 puzzles, written to run on a stock A500 with 512K and Kickstart 1.3."}},
}
s = rd("gamepages.js")
assert s.rstrip().endswith("}\n};") or s.rstrip().endswith("};")
i = s.rstrip().rfind("}")          # closing brace of the object
body = s[:i].rstrip()
assert body.endswith("}")
add = ""
for gid, _, _, _, _ in GAMES:
    add += ",\n " + json.dumps(gid) + ": " + json.dumps(PAGES[gid], ensure_ascii=False, indent=1).replace("\n", "\n ")
s = body + add + "\n};\n"
wr("gamepages.js", s)

# ---- genres.js
GEN = {"am_tiny_pixel_adventure": "platformer", "am_tenebra2": "puzzle", "am_ooze": "platformer",
       "am_yoomp": "action", "am_shift": "puzzle", "am_yeet": "puzzle"}
s = rd("genres.js")
i = s.rstrip().rfind("}")
body = s[:i].rstrip()
add = "".join(',\n "%s": {\n  "genre": "%s",\n  "players": "p1"\n }' % (g, GEN[g]) for g, *_ in GAMES)
wr("genres.js", body + add + "\n};\n")

# ---- downloads.js: only the three with no paid edition anywhere
DL = {
 "am_tiny_pixel_adventure": "https://hoogames2017.itch.io/tiny-pixel-adventure — free/name-your-own-price ADF straight from the developer, no redistribution statement, no paid or boxed edition of this game found. (HooGames2017 do sell a boxed edition of a different game, Dr. Dangerous.)",
 "am_shift": "https://h4plo.itch.io/shift — free/name-your-own-price ADF from the developer, no paid or boxed edition found. Haplo gave a third party permission in the page comments (Sept 2026) to bundle the ADF in a free AROS distribution.",
 "am_yeet": "https://zooperdan.itch.io/yeet — free/name-your-own-price ADF from the developer, no redistribution statement, no paid or boxed edition found.",
}
s = rd("downloads.js")
anchor = '    checked: "2026-09-20"\n  }\n\n};'
assert s.count(anchor) == 1, "downloads.js tail changed"
add = "".join(',\n  "%s": {\n    file: "amiga_%s.adf",\n    verdict: "LIKELY-OK",\n    source: %s,\n    checked: "2026-10-11"\n  }'
              % (g, g[3:], json.dumps(DL[g], ensure_ascii=False)) for g in DL)
s = s.replace(anchor, '    checked: "2026-09-20"\n  }' + add + "\n\n};")
wr("downloads.js", s)

# ---- support.js: a Support button for all six, straight to the creator
s = rd("support.js")
anchor = '  "pc_hb_gates": ['
assert s.count(anchor) == 1
CRE = {"am_tiny_pixel_adventure": "HooGames2017", "am_tenebra2": "Haplo", "am_ooze": "Haplo & Andy Johns",
       "am_yoomp": "zr-games", "am_shift": "Haplo", "am_yeet": "zooperdan"}
add = ""
for g, *_ in GAMES:
    add += ('  "%s": [\n    { creator: %s,\n      url:     "%s",\n      note:    "Click download - pay what you want",\n      checked: "2026-10-11" }\n  ],\n\n'
            % (g, json.dumps(CRE[g]), ITCH[g]))
wr("support.js", s.replace(anchor, add + anchor))
print("data files patched")
