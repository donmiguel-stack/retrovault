Cover art for any game in the catalogue - official releases, French
dumps, Jopac, homebrew, mods, rare/unreleased, all of it.

No images are included here. I didn't bundle any box art myself -
official Videopac/Odyssey2/Jopac titles are copyrighted Philips/
Magnavox/Thomson-Brandt artwork, same reasoning as the BIOS files, so
it's on you to add it, from whichever source you're comfortable with.
Note homebrew and mod carts mostly were never boxed commercially, so
"cover art" for those is more likely fan-made or nonexistent - the
colored initials tile is a perfectly fine permanent look for those.

## Naming

Drop an image in named after the game's catalogue "id" (see
games.json), as a .jpg or .png:

  covers/vp_43pl.jpg        -> Pickaxe Pete (Plus)
  covers/o2_38.jpg          -> K.C. Munchkin!
  covers/new_amok.jpg       -> Amok! (homebrew - if you have fan art for it)

The id is the original PicoPAC filename minus ".bin" - check
games.json's "id" field if unsure. Missing or broken images just fall
back to the colored initials tile automatically, so partial coverage
is fine - cover everything or just your favorites.

## Where to get images

- Scan/photograph your own boxes if you kept them.
- The libretro-thumbnails project maintains a community-curated
  archive of box art for official releases, organized by system:
    https://github.com/libretro-thumbnails/Magnavox_-_Odyssey2  (Named_Boxarts/ folder, G7000/Odyssey2, and US 3rd-party like Parker Brothers/Imagic)
    https://github.com/libretro-thumbnails/Philips_-_Videopac   (Named_Boxarts/ folder, Videopac/Videopac+, French, Jopac, PAL)
  Filenames there follow "Game Title (Region).png" (No-Intro style),
  which won't match our "id"-based filenames directly - see
  tools/fetch_covers_helper.py, which now checks both repos for every
  game (useful since homebrew/rare titles aren't reliably filed under
  one or the other) and downloads the best match it finds. It's yours
  to run (or not) - it fetches from a public GitHub repo, so review
  it before running if that matters to you.
- Homebrew archives like AtariAge often have fan-made cover art for
  specific homebrew titles if you want to track those down by hand.
