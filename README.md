# Retro Vault

A private, offline library for classic game systems, organised into three
shelves — Videopac / Magnavox Odyssey², Commodore 64 and MS-DOS PC — each
with its own box art, manuals, history and gameplay clips, and its games
playable straight in the browser. One shelf is visible at a time, each with
its own count.

*(Previously "Videopac Odyssey Vault" — the folder keeps that name.)*

**Vault by @donmiguel2.0 · code by Claude**

**[Watch the five-minute tour →](https://www.youtube.com/watch?v=XIxl2ep34_Y)**
Subtitled in English, Portuguese, Dutch, German and French.

---

## First: add your dumps

This repository carries the Vault itself — the catalogue, the box art, the
translations — but **no ROMs and no BIOS**. Those aren't ours to distribute;
you supply your own. The same goes for the per-title manual scans in
`manuals/` (a handful of extras ship in `extras/` — see *Use it responsibly*).
They belong in three folders that arrive empty:

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
| `emulator/` | webretro + the O2EM/VICE cores and js-dos (DOSBox), the BIOS, and the ROMs |

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

### The PC shelf

The library also has an **MS-DOS** shelf — the PC chip in the filter bar,
playable through [js-dos](https://js-dos.com/) (a self-hosted DOSBox, in
`emulator/dos/`), not the RetroArch/webretro cores the other two shelves use.
Each game is a single zip in `emulator/roms/` that's also a self-contained
js-dos bundle: the game's own files plus a `.jsdos/dosbox.conf` that mounts
the zip as drive C: and launches the right .EXE/.BAT automatically. Drop the
file named on the game's page into `emulator/roms/` and START appears by
itself, exactly like the C64 shelf.

To add another DOS title yourself: put the game's files in a folder, add a
`.jsdos/dosbox.conf` to it (copy one from an existing PC game's zip and change
the `[autoexec]` line to your game's .EXE/.BAT), zip the folder's *contents*
(not the folder itself) so the .EXE ends up at the zip's root, and drop that
zip into `emulator/roms/`. Then give it an id starting with `pc_`, platform
`"PC"` and category `"MS-DOS"` in `games.js`, plus a matching entry in
`genres.js` and (optionally) a history in `gamepages.js`.

Doom ships as id Software's free 1993 shareware episode (`DOOM1.WAD`) — if you
own a full copy, its `DOOM.WAD` can replace the shareware WAD in a rebuilt
`DOOM.zip` to unlock all three episodes. Leisure Suit Larry, Wolfenstein 3D,
Commander Keen and Prince of Persia ship as-is; see `tools/` notes for where
each came from.

### Adding cover art

Save the image as `covers/<game id>.jpg`, then open `app.js` and bump the
`COVER_V` number near the top by one. That last step matters: without it your
browser keeps showing the blank it cached before the file existed.

---

## Use it responsibly

This is a personal archive for cartridges you own. **No ROMs and no BIOS
images are distributed with the project** — you supply your own dumps.

A small number of scanned manuals, maps and keyboard overlays for
long-out-of-print Videopac titles do ship in `extras/`, on the same
abandonware footing this project applies to the C64 and PC shelves. The
per-title `manuals/` collection is *not* distributed — you add those scans
yourself, as with the ROMs. If you hold rights to anything in
`extras/` and would rather it were not here, open an issue on the official
repository and it will be taken down.

Emulation is the open-source [O2EM](https://o2em.sourceforge.net/) and
[VICE](https://vice-emu.sourceforge.io/) libretro cores running in
[webretro](https://github.com/BinBashBanana/webretro), and DOSBox running in
[js-dos](https://js-dos.com/) for the PC shelf. Manual scans come from the
Internet Archive's Videopac/Odyssey² manuals collection. Not affiliated with
Philips, Magnavox, Commodore, id Software, Sierra or Broderbund.

## Privacy — what Retro Vault counts

Retro Vault includes **Cloudflare Web Analytics**, which counts page views so
I can see roughly how many people use the Vault. It is deliberately the
least-invasive option available:

- **No cookies** and no browser storage used for tracking.
- **No personal data**, no IP logging, no device fingerprinting.
- **No cross-site tracking** and no advertising network involved.
- It never runs from an offline (`file://`) copy.

Your game files, saves, favourites and settings never leave your machine —
they are not uploaded anywhere, and nothing about which games you own or play
is transmitted.

**To opt out completely**, open your browser's developer console (F12) on the
Vault page and run:

```js
localStorage.setItem('rv-no-analytics', '1')
```

That setting is permanent for that browser. Alternatively, delete the
`<script>` block marked *"anonymous usage counting"* from `index.html` and
`game.html` — the Vault works identically without it.

---

## License — what you may and may not do

Retro Vault is **free**. It always will be. But it isn't open source in the
usual sense — it's released under the [Retro Vault License](LICENSE.md),
which in everyday terms comes down to this:

**You may:**

- Download the Vault and run it on anything you like, at no cost.
- Add your own game files — that's the whole idea. The Vault ships with no
  ROMs, no BIOS files, and no manuals; you bring your own dumps of the
  games you own.
- Modify it for yourself: reskin it, translate it, rearrange the shelves,
  hack on it to your heart's content — privately.
- Keep backups, and tell everyone about it (please do). Link to this
  repository or to the official website wherever you like.

**You may not:**

- Put the Vault — or a modified version of it — online anywhere else. No
  mirrors, no rehosts, no "inspired by" clones built from this code, no app
  store uploads, no bundles.
- Sell it, charge for access to it, or build a paid product on top of it.
- Use the Retro Vault name or look for a derivative project.

**The fine print that matters:**

- The emulator cores (VICE, O2EM, DOSBox) are separate projects with their
  own licenses (GPL); those licenses fully apply to those files and nothing
  here overrides them.
- Forking on GitHub itself is fine — that's how GitHub works. Deploying
  that fork anywhere is not.
- Want to do something the license doesn't allow — a museum installation, a
  mirror, a translation hosted elsewhere, a commercial idea? **Just ask** —
  via the contact address on the official website, or by opening an issue
  here. The answer is usually yes; the license exists so that the asking
  happens.

*Why this license?* The Vault is an archive and a labour of love. Keeping
one official home for it means fixes, new games, cheats, and history
write-ups reach everyone — instead of scattering across half-maintained
copies. If you'd like to contribute, do it here, where everyone benefits.

**Vault by @donmiguel2.0 · code by Claude**
