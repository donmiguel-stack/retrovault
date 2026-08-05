# How the Vault is put together

A reference for anyone — including a future assistant session — picking this up
cold. Read this before changing data or adding a system.

## The shape of it

Two pages, no build step, no framework.

| | |
| --- | --- |
| `index.html` + `app.js` | The library: filters, grid, showcase panels, update watcher |
| `game.html` | One cartridge: art, history, manual reader, video, controls, buy button |
| `serve.py` | Local server. No-cache headers, plus the update endpoints |
| `style.css` | Everything visual except `game.html`'s own inline block |

Everything else is data. `app.js` builds its filter chips, category groups and
sort orders from whatever is in the catalogue, so adding entries rarely means
touching code.

## Shelves

The catalogue holds more than one system. `platform` on each entry says which
machine it is (`G7000`, `G7400+`, `C64`); the chip row picks the shelf.
**Videopac** (the default) is every non-C64 entry, with G7000 / G7400+
narrowing it; **C64** is its own shelf. One shelf is visible at a time — there
is deliberately no combined view, so "213 / 213 games" keeps meaning what it
means.

`platformGames()` in `app.js` is the one place shelf membership is computed;
every count on the page — search placeholder, result count, category, genre
and player options — derives from it. Switching shelf resets those filters,
hides the (Videopac-only) showcase on the C64 shelf, and is remembered in
localStorage like the sort preference.

The brand is **Retro Vault** (renamed 2026-08-04); localStorage keys keep
their original `VideopacVault_` prefix so nobody's favourites are orphaned,
and the folder and git repo keep their old names. C64 entries additionally
carry `year`, `publisher` and `developer` — optional fields, rendered by
`game.html` only when present.

## The data files

Each owns one thing. Keep it that way — the reason there are eight of them
rather than one big object is that they can be regenerated independently.

| File | Owns |
| --- | --- |
| `games.js` | The catalogue: id, title, platform, category, tags, rom filename |
| `gamepages.js` | Per game: `input`, `manual`, `history`, `video`, `note` |
| `genres.js` | `genre` and `players` per id, plus `unsure` where it was a guess |
| `brazil.js` | Brazilian title and 06AV number, shown as "known in Brazil as" |
| `usa.js` | US title and number, shown as "released in the US as" |
| `packaging.js` | Which carts came with a board, overlay or workbook |
| `extras.js` | Your own scans, shown as an Extras section |
| `featured.js` | The three showcase panels: featured, sponsors, community, homebrew |
| `shops.js` | Shops with a cartridge for sale — the Buy button |
| `i18n.js` | Short UI strings, five languages |
| `setup-i18n.js` | Long-form Setup and control text, five languages |

A catalogue entry:

```js
{ "id": "vp_38", "filename": "vp_38.bin", "title": "Munchkin",
  "platform": "G7000", "category": "Official Videopac (EU)",
  "vpNumber": 38, "tags": [], "romFile": "VP38 - Munchkin.bin" }
```

`id` is the join key for every other file, the cover filename and the favourite
list. Never renumber one.

## Conventions that matter

**Cover art** goes in `covers/<id>.png` or `.jpg`. The code tries `.png` first
and falls back to `.jpg` on error, so either works — but both the big cover and
the small thumbnails need that fallback, or a jpg-only cover shows as a broken
thumbnail. After adding art, bump `COVER_V` at the top of `app.js`; without it
browsers keep serving the blank they cached before the file existed.

**Screenshots** for the showcase panels go in `covers/` too, prefixed `shot_`.
`shot: "vp_38.jpg"` in `featured.js` resolves to `covers/shot_vp_38.jpg`.

They live in `covers/` rather than a folder of their own for a specific reason —
see the trap below.

**Manual scans** live in `manuals/<item>/p00.jpg, p01.jpg …`, where `<item>` is
the archive.org identifier recorded in `gamepages.js`. Gitignored.

**Cache-busting.** Every script and stylesheet in `index.html` and `game.html`
carries `?v=NN`. Bump it on every change or returning users get a mix of old and
new files. Both pages should always carry the same number.

**After changing data or art, re-run `python3 tools/make_manifest.py`.** The
update mechanism compares against `manifest.json`; if you forget, other people's
copies never learn about the change.

## The update mechanism, and its one trap

`serve.py` exposes `/_update/check` and `/_update/apply`. The client compares
local file hashes against `manifest.json` fetched from the URL in
`update-source.json`, and downloads what differs. Data only — never ROMs, never
the BIOS.

`safe()` in `serve.py` whitelists what may be written: certain extensions, and
the folders `""`, `covers` and `assets/shots`.

**The trap:** that whitelist lives in `serve.py`, and `serve.py` is deliberately
never updated — it is not in the manifest and `.py` is not an allowed extension,
because a remote file list must not be able to widen its own permissions. The
consequence is that **a file in a new folder can never reach an installation that
already exists.** It only helps fresh clones.

This bit us once: screenshots were put in `assets/shots/`, the folder was added
to the whitelist, and every existing install silently skipped all thirteen files.
Hence the `shot_` prefix inside `covers/`.

**Put new files where the updater is already allowed to write.**

`.authoring` is a gitignored marker file. While it exists, both update endpoints
refuse to do anything — the authoring copy is where changes are made, and an
update there would overwrite unpushed work. The library's update watcher also
stops polling when it sees that reason.

## Translation

`window.t(key)` returns the key itself when a string is missing, so the fallback
idiom is `var v = t(k); return (v && v !== k) ? v : englishDefault;`.

Two things are deliberately **not** translated, because they describe one
specific cartridge rather than the machine:

- `note` in `gamepages.js` — a control tip for that game, shown highlighted above
  the general control notes.
- `variant` in `shops.js` — unless it is one of `rel_eu`, `rel_us`, `rel_br`,
  `rel_fr`, which are i18n keys and do follow the language picker.

Histories carry either `wikiTitle` (renders as "From Wikipedia: …") or `source`
(renders as "Source: …"). Use `source` for anything that is not Wikipedia — the
Brazilian entries credited Odyssey Clube to Wikipedia for months.

## The showcase panels

`featured.js` drives four things: the panel at the top of the library, an advert
strip, a homebrew panel and a community carousel. The last three are inserted
*into* the grid, spanning all columns.

Because a full-width child forces a new row, dropping one mid-row leaves the rest
of that row empty. `placeBlocks()` measures the live column count from
`getComputedStyle(grid).gridTemplateColumns` and rounds each insertion point to a
whole row, and re-runs on a debounced resize. Don't replace this with a fixed
index; the column count changes with the window.

An advert slot with no image runs the console's attract screen instead: letters
in the `Press Start 2P` face bouncing off the edges, recolouring on each contact.

## Working on this from a sandboxed assistant

The mounted folder **allows writes but not unlink or rename.** That breaks
anything that works by writing a temp file and renaming it: `git` (stale
`index.lock`), `zip`, and ffmpeg's `+faststart`. Write to `/tmp` and copy in, and
hand `git` commands to the human.
