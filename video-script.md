# Videopac Odyssey Vault — video script

A guided tour for YouTube. Written in modular segments so you can cut, reorder
or drop any of them once your test recording tells you the real length.

**Total narration: ~1,050 words ≈ 7 minutes** at a relaxed 150 words/minute.
Segments 8 and 9 are the first to cut if you want it under five.

**How to use this:** the *Shot* line says what to do on screen. The **Narration**
is the exact words. Don't rush the shots — leave a beat of silence at the start
and end of each segment so the cuts have somewhere to breathe, and so I can
time the subtitles cleanly afterwards.

---

## 1 — Cold open · ~15 sec

**Shot:** No talking yet. K.C. Munchkin already running, mid-game, sound up.
Let it play for a few seconds. Then cut to the library grid, scrolling slowly
through the covers.

**Narration:**

> This is a Philips Videopac. In America they called it the Magnavox Odyssey²,
> and in France, the Jopac. It came out in 1978, and there were about two
> hundred games for it.
>
> They're all here, in one place, and they all run in a browser.

---

## 2 — What this is · ~35 sec

**Shot:** The library at rest, full grid visible. Slow scroll.

**Narration:**

> This is the Videopac Odyssey Vault. It's a front end for an emulator — but
> the emulator is the boring half. What it really is, is a library.
>
> Two hundred and thirteen cartridges. Every one with its box art, and most
> with the original manual scanned page by page, a bit of history, and a
> gameplay video, so you can see what a game is before you commit to it.
>
> It runs entirely on your own computer. Nothing is uploaded, nothing phones
> home, and there's no account to make.

---

## 3 — Getting it running · ~45 sec

**Shot:** Finder, showing the VIDEOPAC EMULATOR folder. Right-click → New
Terminal at Folder. Type `python3 serve.py`, press Return, show the
confirmation line. Switch to the browser, type `localhost:8000`, and the
library appears.

**Narration:**

> Two things to start it, every time.
>
> Open a terminal in the Vault folder, and type `python3 serve.py`. That's a
> small server that runs only on your machine — you need it because browsers
> refuse to load an emulator straight off your hard disk. It's a security rule,
> and this is the way around it.
>
> Then open `localhost:8000` in your browser, and there's the library.
>
> Leave the terminal window open while you play. Closing it switches the Vault
> off. And use Chrome or Firefox rather than Safari — Safari forgets stored
> data after a week, and your favourites live in there.

---

## 4 — Finding things · ~50 sec

**Shot:** Type "munchkin" in the search — results narrow. Clear it. Click the
G7400+ platform chip. Clear. Then the category chips: Homebrew, then Philips
Brazil, then Rare. Let each result set sit on screen for a second.

**Narration:**

> You can search, or you can browse.
>
> The platform filter splits the original G7000 from the G7400 — that's the
> later machine with the extra graphics chip, and forty of these games use it.
>
> Underneath that, the categories. The seventy-eight official European
> Videopacs. The American Odyssey² releases. Parker Brothers, and the two
> Imagic cartridges. Nine Jopac titles from France. Sixteen Brazilian releases,
> which have their own names — Munchkin was *Comilão* over there.
>
> Then the odd corners. Sixteen rare or unreleased prototypes. Seventeen
> homebrew games, still being written today. And twenty-three modified
> versions, where someone has gone back into a 1981 cartridge and fixed
> something.

---

## 5 — A game page · ~60 sec

**Shot:** Click K.C. Munchkin. Let the page load. Scroll slowly: cover and
history at the top, then the manual reader — page through two or three pages,
click a thumbnail — then the gameplay video, then the controls box.

**Narration:**

> Click any game and you get its page.
>
> The box art, and where there's a story worth telling, the story. Munchkin got
> Philips sued by Atari, who said it was too close to Pac-Man. Atari won. The
> game was pulled from shelves.
>
> Below that, the manual. Scanned, page by page, the real thing — a hundred and
> sixty-five of the games have one. This is where you find out what the game
> variations actually do, which for a console from 1978 is not obvious.
>
> Then a gameplay video, so you can watch before you play.
>
> And the controls. Every game lists its own, because on this machine they vary
> more than you'd expect.

---

## 6 — Playing · ~55 sec

**Shot:** Hit START on Munchkin. Wait for the SELECT GAME screen. Press a
number key. Play for fifteen or twenty seconds — let it run, don't narrate over
the whole thing.

**Narration:**

> Press START, and it loads.
>
> The first screen is SELECT GAME. Every Videopac cartridge holds several
> variations, and you pick one with the number keys — different speeds,
> different rules, one or two players.
>
> Arrow keys move. G is your action button. That's most games.
>
> And the console had a full alphabet keyboard, which almost nothing else in
> 1978 did — so some of these are typing games, and you just type.

*(Let the gameplay run silent for a few seconds here.)*

---

## 7 — The two things that catch everyone out · ~55 sec

**Shot:** Load Race. Press the arrow keys — nothing happens. Then WASD — it
moves. Then back to Munchkin: press F5, then P, and the maze editor appears.
Draw a bit of maze on screen.

**Narration:**

> Two things will confuse you, and they confuse everybody.
>
> First — sometimes the arrow keys do nothing. The console had two joysticks,
> and each game decides which one it listens to. A few titles only read the
> *second* one, even in single player. Race is the famous example. If the arrows
> are dead, use W A S D to move and Q to fire.
>
> Second — some cartridges hide whole modes behind the console's RESET key,
> not the menu. Munchkin has a maze editor, and the only way in is RESET, then
> P. Here, RESET is F5.
>
> So: you can draw your own maze, and then play it. In 1981.

---

## 8 — Favourites · ~30 sec

**Shot:** Hover a cover, click the star. Do two or three. Click the Favorites
chip. Open Setup, scroll to Export favorites, click it, show the file.

**Narration:**

> Hover any cover and click the star, and it lands in your favourites.
>
> Those live in your browser, not in the folder — which means they don't travel.
> Copy the Vault to another machine and the list starts empty. So there's an
> export button in the setup panel: it writes a small file you can carry across,
> and importing it merges rather than overwrites.

---

## 9 — Languages · ~25 sec

**Shot:** Open the language dropdown. Switch to Nederlands — the interface
changes. Then Français. Then Português. Open Setup in one of them to show the
instructions translated too.

**Narration:**

> One more thing. The Vault speaks five languages — English, Dutch, German,
> French and Portuguese. That's not just the buttons; the setup instructions
> and the control notes are translated too.
>
> Which felt right for a console that shipped under four different names,
> depending on which country you bought it in.

---

## 10 — Close · ~20 sec

**Shot:** Back to the library grid. Slow scroll through the covers. Hold on a
good one to end.

**Narration:**

> That's the Vault. Two hundred and thirteen cartridges, the manuals, the box
> art, and forty years of a console that most people have never heard of.
>
> If you had one of these, you know. If you didn't — start with Munchkin.

---

## Notes for recording

- **Leave silence at the start and end of every segment.** Two seconds is
  plenty. It makes cutting painless and lets me time the subtitles to the frame.
- **Don't narrate over the gameplay.** Segments 6 and 7 are better with the
  console's own sound carrying them for a few seconds.
- **Segment 3 is the one people will skip back to.** Type slowly and let the
  terminal output sit on screen long enough to read.
- If a segment runs long, 8 and 9 are the ones to lose — they're features, not
  the pitch.
- Once you've recorded, send me the timecode where each segment starts and I'll
  build the `.srt` files to match — English, Dutch, German, French, Portuguese.
