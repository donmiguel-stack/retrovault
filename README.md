# Retro Vault

A private, offline library for classic game systems, organised as shelves:
Philips Videopac / Magnavox Odyssey² and Commodore 64 — box art, manuals,
history and gameplay clips, with the games playable in the browser. One shelf
is visible at a time; the counts never mix.

*(Previously "Videopac Odyssey Vault" — the folder keeps that name.)*

**Vault by @donmiguel2.0 · code by Claude**

**[Watch the five-minute tour →](https://www.youtube.com/watch?v=XIxl2ep34_Y)**
Subtitled in English, Portuguese, Dutch, German and French.

---

## First: add your dumps

This repository carries the Vault itself — the catalogue, the box art, the
translations — but **no ROMs, no BIOS and no manual scans**. Those aren't ours
to distribute; you supply your own. They belong in three folders that arrive
empty:

```
emulator/bios/      the console BIOS (g7400.bin)
emulator/roms/      the cartridge dumps
manuals/            manual page scans, one folder per title
```

If you were given a `videopac-odyssey-dumps.zip`, it already has those three
paths inside it, so extract it **at the top level of this folder** and
everything lands in place.

> **Windows: watch the destination box.** "Extract All" defaults to creating a
> new subfolder named after the zip, which buries `emulator\` and `manuals\`
> one level too deep. Delete the trailing `\videopac-odyssey-dumps` from the
> destination path before clicking Extract. On a Mac, double-clicking the zip
> does the same thing — unzip it, then move the three folders up yourself.

If the folders end up nested, you'll know: the Vault loads, the covers show,
and every game fails to start.

---

## How to run it

### First, install Python

The Vault needs it to run its little local server. **Mac:** open Terminal and
type `xcode-select --install`. **Windows:** download it from
[python.org](https://www.python.org/downloads/). If the installer offers
**"Add python.exe to PATH"**, tick it — without it the terminal won't find
Python.

### Use Chrome

Firefox runs the Vault fine, but puts an extra click between you and the game.
Avoid **Safari**: it wipes stored data for a site you haven't visited in a
week, and that's where your favourites and save games live.

### Step 1 — Open a terminal in this folder

**Mac:** Finder → find `VIDEOPAC ODYSSEY VAULT` → right-click it → **New
Terminal at Folder**.

**Windows:** File Explorer → open `VIDEOPAC ODYSSEY VAULT` → click the
**address bar** → type `cmd` → Enter.

### Step 2 — Start it

On a Mac:

```
python3 serve.py
```

On Windows:

```
python serve.py
```

It will look frozen. That's correct — it's waiting for the browser. Leave the
window open while you play.

### Step 3 — Open it

Go to **http://localhost:8000/** and click a game.

Done playing? Click the terminal window and press **Control + C**.

---

## If something goes wrong

| What you see | What to do |
| --- | --- |
| `command not found: python3` | Python isn't installed. **Mac:** type `xcode-select --install` and press Return. **Windows:** install from [python.org](https://www.python.org/downloads/) and be sure to tick *"Add Python to PATH"*. |
| `Address already in use` | A server is already running. Use the tab you already have open, or pick another port: `python3 serve.py 8080`, then open `http://localhost:8080/`. |
| `No such file or directory` | The terminal isn't pointing at the right folder. Redo Step 1 and make sure you pick the folder that contains `serve.py`. |
| The page won't load | Check the terminal window is still open — it's easy to close it by accident. |
| A change you made doesn't show up | Refresh the page. If it still doesn't, you're not using `serve.py` (see below). |

---

## Playing the games

The console had two joysticks and an alphanumeric keyboard, and every game
picks and chooses between them. Each game's page lists its own controls; the
common ones are:

| Key | What it does |
| --- | --- |
| `0`–`9` | Pick a game variant on the SELECT GAME screen |
| Arrow keys + `G` | Joystick 1 — move and fire |
| `W` `A` `S` `D` + `Q` | Joystick 2 — move and fire |
| `A`–`Z`, Space, Enter | The console's own keyboard |
| `F5` | The console's RESET key (also in the emulator's **More** menu) |
| Right Shift | Show/hide a picture of the console keyboard |

Two things that catch everyone out:

- **Arrow keys do nothing in some games.** Several titles only listen to the
  *second* joystick, even in one-player mode — Race and Flipper among them. Use
  `W A S D` and `Q` instead.
- **Some carts hide modes on the keyboard.** K.C. Munchkin's create-a-maze
  editor is one: press `P` at the SELECT GAME screen. And note `F5` is the
  console's RESET key, but macOS claims it for Dictation — on a Mac use the
  emulator's **More › Console RESET key** instead.

---

## What's in the folder

| | |
| --- | --- |
| `index.html` | The library — the page you actually open |
| `game.html` | A single game's page: art, manual, history, video, controls |
| `serve.py` | The little local server from Step 2 |
| `games.js` | The catalogue: every cartridge, its platform and its ROM file |
| `gamepages.js` | Per-game manual, history, video and control style |
| `packaging.js` | Which carts came with a board, overlay or workbook in the box |
| `extras.js` | Your own scans (see below) |
| `covers/` | Box art, one image per game id |
| `manuals/` | Manual page scans from the archive.org Videopac collection |
| `extras/` | Your own scans of manuals, maps and boards |
| `emulator/` | webretro + the O2EM core, the BIOS, and the ROMs |

### Adding your own scans

Drop a PDF or image into `extras/`, then add a line to `extras.js`:

```js
"vp_41": { "map": "conquest-map.jpg" }
```

It'll appear as an **Extras** section on that game's page. The game ids are in
`games.js`.

### The C64 shelf

The library now has a **Commodore 64** shelf — the C64 chip in the filter bar,
28 curated classics to start with, playable through the VICE core (in
`emulator/cores/`). VICE brings its own KERNAL, BASIC and CHARGEN, so unlike
the Videopac shelf there is **no BIOS to supply** — a game needs only its dump.
Drop the file named on the game's page (e.g. `Boulder Dash.d64`) into
`emulator/roms/` and START appears on that page by itself; until then the page
says exactly which file it is waiting for.

The placeholder covers in `covers/c64_*.png` are generated art, not scans —
replace any of them with your own box or cassette-inlay scans under the same
filename (then bump `COVER_V`, see below). Or let the fetcher find them for you: `python3 tools/fetch_c64_assets.py --covers` pulls box art from Wikipedia, `--roms` pulls disk images from the c64.com set on archive.org, and `--manuals` pulls manual PDFs. Run `python3 tools/fetch_c64_assets.py` with no arguments for the options. The files it fetches stay out of git.

To add more C64 titles, give them an id starting with
`c64_`, platform `"C64"` and category `"Commodore 64"` in `games.js`, plus a
matching entry in `genres.js` and (optionally) a history in `gamepages.js`.

### Adding cover art

Save the image as `covers/<game id>.jpg`, then open `app.js` and bump the
`COVER_V` number near the top by one. That last step matters: without it your
browser keeps showing the blank it cached before the file existed.

---

## Use it responsibly

This is a personal archive for cartridges you own. No ROMs, BIOS images or
manual scans are distributed with the project — you supply your own dumps.

Emulation is the open-source [O2EM](https://o2em.sourceforge.net/) libretro
core running in [webretro](https://github.com/BinBashBanana/webretro).
Manual scans come from the Internet Archive's Videopac/Odyssey² manuals
collection. Not affiliated with Philips or Magnavox.

**Vault by @donmiguel2.0 · code by Claude**
