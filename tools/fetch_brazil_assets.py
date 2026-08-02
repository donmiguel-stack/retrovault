#!/usr/bin/env python3
"""
Fetch cover thumbnails and manual scans for the 16 Brazilian-exclusive
cartridges from odysseyclube.com.

Run it:   python3 tools/fetch_brazil_assets.py

Covers land straight in covers/ as br_<num>.jpg (upscaled to the 512px the
library uses - the source is only 140x193, so expect them to look soft).
Manuals land in manuals/br_<num>/p00.jpg, p01.jpg ... which is exactly the
layout game.html's manual reader already expects.

Page counts were probed one by one rather than guessed: most manuals are 9
pages, four are 13.
"""
import os, time, urllib.parse, urllib.request

BASE = "https://images.odysseyclube.com/colecoes/philips-brasil/"

# num -> (cover file, manual slug, manual page count)
GAMES = {
 "9434": ("06AV9434-Wall-Street.png",                        "wall-street", 13),
 "9461": ("06AV9461-Bombardeio-Submarino-Tiro-ao-Alvo.png",  "bombardeio-submarino-tiro-ao-alvo", 9),
 "9462": ("06AV9462-Desafio-Chines.png",                     "desafio-chines", 9),
 "9463": ("06AV9463-O-Malabarista.png",                      "o-malabarista-jogo-da-velha", 9),
 "9468": ("06AV9468-Telegrafista.png",                       "telegrafista", 13),
 "9469": ("06AV9469-O-Gato-e-o-Rato.png",                    "o-gato-e-o-rato", 13),
 "9472": ("06AV9472-Super-Bee.png",                          "super-bee", 9),
 "9473": ("06AV9473-Buraco-Negro.png",                       "buraco-negro", 9),
 "9474": ("06AV9474-Clay-Pingeon.png",                       "clay-pigeon", 9),   # sic: their typo
 "9475": ("06AV9475-Comando-Noturno.png",                    "comando-noturno", 13),
 "9476": ("06AV9476-Balao-Travesso.png",                     "balao-travesso", 9),
 "9477": ("06AV9477-Barao-Vermelho.png",                     "barao-vermelho", 9),
 "9483": ("06AV9483-Frogger.png",                            "frogger", 13),
 "9484": ("06AV9484-Popeye.png",                             "popeye", 9),
 "9485": ("06AV9485-Q-bert.png",                             "qbert", 9),
 "9486": ("06AV9486-Super-Cobra.png",                        "super-cobra", 9),
}

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

os.makedirs("_brazil_staging/covers", exist_ok=True)
covers = manuals = fails = 0

for num, (cover, slug, pages) in GAMES.items():
    try:
        data = get(BASE + "miniaturas/" + urllib.parse.quote(cover))
        open(f"_brazil_staging/covers/br_{num}.png", "wb").write(data)
        covers += 1
        print(f"cover  br_{num}  {len(data)} bytes")
    except Exception as e:
        fails += 1
        print(f"cover  br_{num}  FAILED: {e}")
    time.sleep(0.2)

    outdir = f"manuals/br_{num}"
    os.makedirs(outdir, exist_ok=True)
    names = [f"{slug}.jpg"] + [f"{slug}-{i}.jpg" for i in range(1, pages)]
    for i, name in enumerate(names):
        try:
            data = get(BASE + "manuais/" + slug + "/" + urllib.parse.quote(name))
            open(f"{outdir}/p{i:02d}.jpg", "wb").write(data)
            manuals += 1
        except Exception as e:
            fails += 1
            print(f"  manual page {i} of br_{num} FAILED: {e}")
        time.sleep(0.2)
    print(f"manual br_{num}  {len(names)} pages -> {outdir}/")

print(f"\n{covers} covers, {manuals} manual pages, {fails} failures")
print("now tell Claude it is done - the covers still need resizing into covers/")
