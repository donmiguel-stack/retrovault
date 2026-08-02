# Videopac Odyssey Vault

A private, offline library for Philips Videopac / Magnavox Odyssey² games —
box art, manuals, history and gameplay clips, with the games playable in the
browser.

**Vault by @donmiguel2.0 · code by Claude**

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

Every time you want to play you do the same two things: **start the little
server**, then **open the Vault in your browser**. About ten seconds once
you've done it once.

> **Why not just double-click `index.html`?**
> Browsers refuse to load an emulator and its game files straight off your hard
> disk — it's a security rule. The server below gets around that. It runs *only*
> on this computer: nothing is uploaded, nothing is shared, and nobody else can
> reach it.

### Which browser?

**Chrome or Firefox.** Any modern browser will *run* the Vault — the emulator
needs nothing exotic (no multi-threading, so no special server headers), and
the only hard requirements are `fetch` and IndexedDB, which everything modern
has.

The reason to avoid **Safari** isn't speed, it's forgetfulness. WebKit deletes
all script-writable storage for a site after 7 days of browser use without you
visiting it. That covers localStorage *and* IndexedDB — which is exactly where
your **favorites**, **save games** and **save states** live. Go on holiday for
a fortnight and Safari may quietly bin the lot. Chrome and Firefox don't do
this.

### Step 1 — Open the black text window

It's called **Terminal** on a Mac and **Command Prompt** on Windows. You're
going to point it at the `VIDEOPAC EMULATOR` folder — the one this file is in.

**On a Mac**

1. Open **Finder** and find the `VIDEOPAC EMULATOR` folder.
2. **Right-click** it (or Control-click) and choose **New Terminal at Folder**.
3. A black-and-white window opens. That's it.

Don't see "New Terminal at Folder"? Switch it on once in
*System Settings → Keyboard → Keyboard Shortcuts → Services → Files and
Folders*, and tick **New Terminal at Folder**. Or open Terminal from
*Applications → Utilities*, type `cd` followed by a space, drag the folder onto
the window, and press Return.

**On Windows**

1. Open the `VIDEOPAC EMULATOR` folder in File Explorer.
2. Click the white **address bar** at the top so the path highlights.
3. Type `cmd` over it and press **Enter**.

### Step 2 — Start the server

Type this and press Return / Enter:

```
python3 serve.py
```

On Windows type `python serve.py` instead.

You should see:

```
Videopac Odyssey Vault on http://localhost:8000  (no-cache mode)
```

That means it's working.

**Leave that window open while you play.** Closing it switches the Vault off.
It will look like it has frozen — that's normal, it's just sitting there
waiting for the browser.

### Step 3 — Open the Vault

In your browser, go to:

```
http://localhost:8000/
```

Click a game, then press **START**.

When you're done, click the terminal window and press **Control + C** to stop
the server, then close it.

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
- **Some carts hide modes behind RESET.** K.C. Munchkin's create-a-maze editor
  is `F5` then `P`, not something on the SELECT GAME screen.

---

## Favorites

Hover any cover and click the star, or use the button next to START on a game
page. Favorites are remembered by your browser, so they survive quitting and
rebooting.

**They are stored by the browser, not in this folder.** That has one
consequence worth knowing: **favorites don't travel.** Copy the Vault to
another machine, or hand it to a friend, and the star list starts empty — the
files come across, the browser's memory of them doesn't. The same applies if
you switch browsers, or clear browsing data for `localhost`.

To move them, open **Setup** and use **Export favorites**. That writes a small
`videopac-vault-favorites.json` file you can back up or send along; **Import
favorites** on the other machine merges it into whatever is already starred
there, and never removes anything. Games in the file that aren't in that
library are skipped and reported.

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
