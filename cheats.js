// Community cheats/tips for the Videopac and C64 shelves.
//
// Videopac/Odyssey2 section: sourced from https://odyssey2.info/cheats/
// (checked 2026-08-08) and lightly reworded for length. Keyed by games.js
// id - the same cheat text is attached to every regional/variant dump of a
// given cartridge (EU, French, US, Brazilian, G7400+ "Plus", modified/fixed)
// since it's the same game code underneath - including cross-region
// renames, e.g. Smithereens!'s EU release as Stone Sling. Rendered by
// game.html as a hidden "Reveal Cheats" block inside the controls box, not
// shown on the PC shelf.
//
// A Videopac cheat entry may carry an optional `img` (filename under
// assets/cheats/) and `alt` - the site's own diagrams/screenshots for
// cheats where the trick is a specific on-screen spot (K.C. Munchkin,
// Power Lords, Take the Money and Run) or a message screen (Nimble Numbers
// Ned, Q*bert, P.T. Barnum's Acrobats - the last one an animated GIF, shown
// exactly as an animated GIF plays), pulled from the same source page and
// checked 2026-08-08.
//
// C64 section (below, "--- C64 shelf ---"): researched 2026-08-20 across
// several sites (GameFAQs, C64-Wiki, StrategyWiki, Mix n' Mojo - see
// claude/vault-c64-cheat-codes.md for the full writeup incl. games that
// were checked but skipped for lack of a credible source). Since these
// entries don't share one fixed source page the way the Videopac ones do,
// each C64 entry carries its own `source` (a ready-to-render "Source: <a>
// ..." string) instead of relying on a single hardcoded link in game.html.
//
// Update 2026-08-22: Mike supplied four more C64 cheat sites to check
// (ilmatar.net, artmoney.ru, commodorecheetah.co.uk, a GameFAQs compilation
// page). Cross-referencing found almost total overlap with what's already
// above - the two genuinely new games are `c64_uridium` and `c64_dropzone`
// (both previously in the "skipped, no credible source" list), sourced from
// Commodore Cheetah. Everything else those four sites covered was already
// in this file from a different source, often with a different POKE
// address for the same effect (different cracked releases drift) - left
// as-is per Mike's call rather than piling alternates onto entries that
// already work. artmoney.ru turned out to be a dead end for actual cheat
// text: every entry there links only to a binary ArtMoney memory-table
// (.amt) download, nothing human-readable to extract.
window.CHEATS_DATA = (function () {
  var D = {};
  function set(ids, entries) {
    ids.forEach(function (id) { D[id] = entries; });
  }

  // Tenpin Bowling / Basketball
  set(["vp_06", "vp_06pl", "Vp06_F", "mod_06pl"], [
    { label: "Basketball", text: "If you stand under either basket and bounce the ball into the bottom corner just so, the ball comes out the top of the screen and bounces around like it's rocket-propelled." },
    { label: "Bowling", text: "Once you start your curve, hold the joystick over all the way through the pins. Releasing it early gives less pin action - and a lot more splits." }
  ]);

  // Clay Pigeon!
  set(["pr_clay-pigeon_pl", "pr_clay-pigeon_pl_alt", "br_9474"], [
    { text: "To get a fresh stock of plates for the next level, destroy at least 8 of the first 10. If you don't, an eagle comes to take you - shoot in any direction just before it reaches you and it dies instead, worth 100 points." }
  ]);

  // Comando Noturno! (Brazilian exclusive)
  set(["br_9475"], [
    { text: "The manual says killing a friend ends the game - it doesn't. You get points instead and play continues. Above Mach 3.0 you land automatically after destroying a friend; below it, press any number key to land. You'll get more fuel and weapons and keep your score." }
  ]);

  // The Great Wall Street Fortune Hunt / Wall Street (BR)
  set(["vp_46", "br_9434"], [
    { label: "Unlisted stock", text: "Enter a stock name into one account and wait for the price, but don't press Enter yet. Switch to another account (the same stock/price still shows there), press Clear, then switch back - it's now blank except for that price. Buy shares at it: you end up with an unlisted stock worth the same as IBM, bought at whatever price you originally typed in. If that's lower than IBM's real price, it's free profit. Doesn't work if the stock you copied was already bankrupt." },
    { label: "Keep selling", text: "Wait for a stock to go bankrupt (worth 00) and buy a lot of it. When a positive News Flash appears, buy some of a very low (but not bankrupt) stock, then start selling off your bankrupt shares - selling keeps the game busy so the News Flash can't change, letting your other stock climb all the way to 99 while you wait. Then sell it." }
  ]);

  // Invaders from Hyperspace!
  set(["o2_14"], [
    { text: "Hit the console's ON/OFF button quickly during a game (probably not great for the hardware) and the planets sometimes spiral inward to the center and back out again - the UFOs can't see you while it happens." }
  ]);

  // K.C. Munchkin! / Munchkin
  set(["o2_35", "vp_38"], [
    { text: "In Maze 3 or 8 (the same maze - 8 is just the invisible version) there's one spot where the ghosts can't reach you. Handy if you need to step away mid-game.",
      img: "kccheat.gif", alt: "K.C. Munchkin safe spot, marked in Maze 3/8" }
  ]);

  // K.C.'s Krazy Chase! (EU: Crazy Chase)
  set(["vp_44"], [
    { text: "On maze #0, lead K.C. to the box where the Dratapillar appears, wait for it to pass underneath, then eat its tail end first and the rest of the body after. Works on every level and is great for fast points - but never try it once the Dratapillar has eaten a tree, or it'll catch you." }
  ]);

  // Killer Bees!
  set(["o2_47", "vp_52pl", "Vp52+_F"], [
    { label: "Slow it down", text: "Hold '1' and press Reset to start the game at half speed." },
    { label: "Secret message", text: "Press '?' and Reset to display “BEES BY ROSHA” at the top of the screen." }
  ]);

  // Labyrinth / Supermind
  set(["vp_32"], [
    { text: "To finish fast, push your cursor against the top of the maze - you'll pass straight through the wall and can slide over to the right side at your leisure. Or just head for the closer left side instead; either way you're done almost instantly." }
  ]);

  // Monkeyshines
  set(["vp_37"], [
    { label: "Slide and score", text: "On a maze with almost no horizontal bars on one side, tag a monkey diagonally against the top wall and hold the button down - you can keep retagging it faster and faster all the way to the bottom for a big score boost. Works along the ground too." },
    { label: "Tag and repeat", text: "Best in a 1-player game. Program only these bars: M3, M4, M5, M6, O2, O7, N1, N8, K2, K7, E3, E6, Y4, Y5. Bring a monkey to where you're standing over the five, throw it left, then jump to the right side, always staying opposite the red monkey. Once it turns yellow again, grab another and repeat - you can stretch the game out as long as you like." }
  ]);

  // Nimble Numbers Ned!
  set(["o2_39", "pal_nimble-numbers-ned"], [
    { text: "On the “Which drill?” screen, press '?' to reveal a hidden programmer's message: “Nimble Numbers N.E.D, By RoSHa Hi Mom”.",
      img: "nimble-by-rosha.png", alt: "Hidden “Nimble Numbers N.E.D. By RoSHa Hi Mom” message screen" }
  ]);

  // Pickaxe Pete!
  set(["vp_43", "vp_43pl", "mod_43pl"], [
    { label: "The key to survival", text: "If you're holding a key and about to be run down by a boulder, jump for the nearest door - reaching it means you survive even if the boulder hits you." },
    { label: "Stay on top", text: "On mine #6, take the pick to the highest floor and stay near the left wall, jumping straight up to dodge boulders. Wait for a key to appear nearby (ignore any that spawn across the mine) rather than chasing one, grab it, then jump to the door. The left part of the top floor stays clear a long time, so this can be repeated for 1000+ points." }
  ]);

  // P.T. Barnum's Acrobats! / Jumping Acrobats
  set(["o2_43", "vp_33", "vp_33alt", "pal_acrobats"], [
    { text: "During the Game Over screen, while the scores are flashing, quickly type WHO? on the keyboard - the balloons change to read “ACROBATS BY J BUTLER” for a few seconds before the next game starts.",
      img: "acrobats-jbutler.gif", alt: "Animated “ACROBATS BY J BUTLER” Game Over screen" }
  ]);

  // Power Lords
  set(["o2_48", "o2_48alt"], [
    { text: "There's a spot on the map where you're safe from both the volcanic rocks and the serpent's rays - worth finding out if things get hairy.",
      img: "powerlordscheat.gif", alt: "Power Lords safe spot, marked on the map" }
  ]);

  // Q*bert (Brazilian dump only - the cheat is specific to that build)
  set(["br_9485"], [
    { text: "Brazilian version only, level 1 only: mash keys (one repeatedly, or several in sequence) and random graphics start appearing in the playfield and score area - colors, objects, animations. They stick around in the high-score screen even after Game Over. Keep at it too long, though, and the game crashes.",
      img: "qbert-cheat.png", alt: "Q*bert level 1 scrambled-graphics glitch" }
  ]);

  // Quest for the Rings
  set(["vp_42", "Vp42_F"], [
    { text: "As a Warrior, one sword swing can often kill several orcs or firewraths at once - and they can reappear tangled up in the same spot, unable to move. Attack your opponent while they're stuck in the pile and they can get trapped there too, or die in it." }
  ]);

  // Smithereens! (also released in Europe as Stone Sling - same cartridge)
  set(["o2_41", "vp_20", "vp_20pl", "mod_20pl"], [
    { text: "Works on game variation 0 only, and needs The Voice module. Hit your opponent's castle, then press and hold the joystick the instant the explosion starts, and release the moment it stops. Direct hit, almost every time." }
  ]);

  // Electronic Soccer / Ice Hockey
  set(["vp_36", "Vp36_F", "mod_36fix"], [
    { text: "Go under the goal post on your right (as you face the screen), along the very edge of the screen, then keep kicking the ball up as if it were hitting the post - it'll eventually go in for an easy goal." }
  ]);

  // Race / Spin-Out / Cryptogram
  set(["vp_01", "vp_01hack", "vp_01pl", "vp01+_F", "Vp01_F", "mod_01pl"], [
    { text: "On the busier tracks you can sometimes crash repeatedly against the top section and get knocked clean outside the track - letting you drive straight off one side of the screen and back on from the other." }
  ]);

  // Take the Money and Run!
  set(["vp_12", "Vp12_F"], [
    { text: "Push your man into a vertical wall and hold the joystick toward it so he keeps bouncing off it. While holding the joystick in, tap Up or Down and let go - timed right, he'll bounce up or down the wall by himself (Up drifts him down, and vice versa). While clinging like this, he'll pass straight through any horizontal wall he touches instead of stopping, and reappears at his starting spot if he goes off the top or bottom of the screen. Holding the button down makes him bounce faster - a great way to dodge the robots. The same trick lets you slip into the cash box area at the bottom through its protruding wall.",
      img: "cashbox.gif", alt: "Take the Money and Run cash box - where to hit the wall" }
  ]);

  // UFO! / Satellite Attack
  set(["o2_30", "vp_34", "vp_34pl"], [
    { text: "When a light-speed ship comes at you guns blazing, you don't have to shoot back - just rotate your gun dot so it sits on the line between you and the ship. The CPU thinks you fired and intercepted its shot, so it does you no harm. If the enemy ship is right on top of you, the feedback from its own shot can even take it out." }
  ]);

  // War of Nerves! (EU: Battlefield)
  set(["vp_30"], [
    { text: "Summon your men up into the score area's top-left corner - jumbled in there, they can form a pulsing light-bar that shoots straight down. If the enemy general wanders in, he often gets stuck or gets knocked clean off the screen." }
  ]);

  // --- C64 shelf ---
  // Community cheats/POKEs/tricks for the Commodore 64 shelf, researched
  // 2026-08-20 from GameFAQs, C64-Wiki, StrategyWiki and Mix n' Mojo (see
  // claude/vault-c64-cheat-codes.md for the full research writeup). Unlike
  // the Videopac shelf, C64 entries carry their own per-entry `source` since
  // they're pulled from several different sites rather than one. Rendered
  // by game.html's C64 branch the same way as the Videopac cheats block.
  set(["c64_boulder_dash"], [
    { label: "Cheat mode POKE", text: "Before running (or after resetting) the game, type <strong>POKE 34670,165</strong> in BASIC to enable a cheat mode.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/566187-boulder-dash/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_impossible_mission"], [
    { label: "Instant cheat mode", text: "Load or reset the game and enter <strong>POKE 26831,169</strong> before running it to activate a built-in cheat mode.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/574037-impossible-mission/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "No opponents", text: "For a robot-free run, POKE three addresses before starting: <strong>POKE 27028,0</strong>, <strong>POKE 31005,12</strong>, <strong>POKE 21006,221</strong>.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/574037-impossible-mission/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Code-room tone puzzle", text: "The two chessboard-patterned computer terminal rooms play a tone sequence that must be replayed back in ascending pitch order to earn a lift/robot password - the sequence gets longer each time you succeed.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Impossible_Mission" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_last_ninja"], [
    { label: "Full shurikens/smoke bombs", text: "<strong>POKE 1019,255</strong> maxes out your shuriken count and <strong>POKE 1018,255</strong> maxes out smoke bombs - enter before running.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/564371-the-last-ninja/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Unlimited lives & magic", text: "<strong>POKE 30855,165</strong> grants unlimited lives; <strong>POKE 22085,197</strong> grants unlimited ninja magic.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/564371-the-last-ninja/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_wizball"], [
    { label: "Invincibility POKE", text: "<strong>POKE 32508,96</strong> makes Wizball invincible for the run.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572275-wizball/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Infinite lives POKE", text: "<strong>POKE 27440,189</strong> gives infinite lives for all players - cross-confirmed on a second independent C64 POKE archive.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572275-wizball/cheats" target="_blank" rel="noopener">GameFAQs</a> &amp; <a href="https://www.ilmatar.net/~np/c64cheats.html" target="_blank" rel="noopener">The Great C64 Cheats Compendium</a>' }
  ]);

  set(["c64_uridium"], [
    { label: "Invincibility & unlimited lives", text: "<strong>POKE 3394,255</strong> before running gives invincibility; <strong>POKE 3400,255</strong> and <strong>POKE 3406,255</strong> give unlimited lives.",
      source: 'Source: <a href="https://www.commodorecheetah.co.uk/Cheats/_000221.htm" target="_blank" rel="noopener">Commodore Cheetah</a>' }
  ]);

  set(["c64_paradroid"], [
    { label: "Cheat mode", text: "Load the game, then enter <strong>POKE 5182,234</strong>, <strong>POKE 5183,234</strong>, then <strong>SYS 4096</strong> to enable a cheat mode before play.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/578087-paradroid/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "No opponents / unlimited lives", text: "<strong>POKE 7276,197</strong> then <strong>SYS 4096</strong> removes opposing droids; <strong>POKE 8314,123</strong> then <strong>SYS 4096</strong> gives unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/578087-paradroid/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_turrican"], [
    { label: "Freezer POKEs (cartridge only)", text: "These need a freezer/cartridge like an Action Replay to apply mid-game, so they may not work through the browser emulator here: <strong>POKE 16347,189</strong> unlimited energy, <strong>POKE 4133,173</strong> unlimited gyroscopes, <strong>POKE 15985,96</strong> unlimited lives, <strong>POKE 2991,173</strong> unlimited time, <strong>POKE 16365,0</strong> unlimited weapons.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572119-turrican/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "No enemies", text: "Press Shift Lock, then hold the joystick fire button to move around a level without spawning any enemies.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572119-turrican/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_turrican2"], [
    { label: "Unlimited energy & lives", text: "Before running: <strong>POKE 19514,173</strong> for unlimited energy, <strong>POKE 19305,173</strong> for unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572120-turrican-ii-the-final-fight/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Unlimited power lines & time", text: "<strong>POKE 19645,189</strong> keeps your power-line weapon topped up; <strong>POKE 3085,173</strong> freezes the countdown timer.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572120-turrican-ii-the-final-fight/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_maniac_mansion"], [
    { label: "The hamster in the microwave", text: "You can put Weird Ed's pet hamster in the mansion's microwave to kill it - and if a kid character shows the remains to Weird Ed, he keels over dead on the spot.",
      source: 'Source: <a href="https://mixnmojo.com/features/sitefeatures/LucasArts-Secret-History-1-Maniac-Mansion/3" target="_blank" rel="noopener">Mix n&rsquo; Mojo</a>' },
    { label: "Meteor Police easter egg number", text: "One of the valid phone numbers for the Meteor Police is 1138 - a nod to George Lucas's first film, THX 1138.",
      source: 'Source: <a href="https://mixnmojo.com/features/sitefeatures/LucasArts-Secret-History-1-Maniac-Mansion/3" target="_blank" rel="noopener">Mix n&rsquo; Mojo</a>' }
  ]);

  set(["c64_elite"], [
    { label: "Quick-buy trick", text: "While docked at a station and looking at the &ldquo;grating&rdquo; screen, quickly tap the 1/2/3/4 keys one at a time (not together) to fast-buy/sell cargo.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Elite" target="_blank" rel="noopener">C64-Wiki</a>' },
    { label: "Full credits & elite status POKEs", text: "Loading screen POKEs let you set your finances and rank directly, e.g. <strong>POKE 1249,255</strong> sets Elite combat status, and the 1186&ndash;1189 range controls your credit balance.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Elite" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_ik_plus"], [
    { label: "Get back up instantly", text: "If you're knocked down, press Run/Stop twice and your fighter stands back up immediately.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/IK%2B" target="_blank" rel="noopener">C64-Wiki</a>' },
    { label: "Hidden pants-off gag", text: "Press E and S together during a match and both karate fighters' trousers fall down - one of several undocumented key-combo gags coded into the game (the original high-score table's default names spell out a hint to try it).",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/IK%2B" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_bruce_lee"], [
    { label: "Unlimited lives POKE", text: "<strong>POKE 5472,99</strong> before running gives Bruce unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/566326-bruce-lee/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_commando"], [
    { label: "Cheat mode & unlimited lives", text: "<strong>POKE 2180,250</strong> enables a cheat mode; <strong>POKE 2454,173</strong> gives unlimited lives - enter either before running.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/569370-commando/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Farm lives on level 1", text: "You earn an extra life every 10,000 points, and a few spots on the first level let you rack up points almost without limit - used by players to stockpile lives (the counter caps at 256).",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Commando" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_bubble_bobble"], [
    { label: "Infinite lives POKE", text: "<strong>POKE 1240,184</strong> before running gives infinite lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/566327-bubble-bobble/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_giana_sisters"], [
    { label: "Unlimited lives POKE", text: "<strong>POKE 2446,255</strong> before running (followed by <strong>SYS 2098</strong>) gives unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572482-the-great-giana-sisters/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Level warps", text: "At the end of level 3, jumping on the last block in the row hits an invisible block that warps you straight to level 6; a similar trick at the end of level 8 warps to level 11.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572482-the-great-giana-sisters/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_katakis"], [
    { label: "Unlimited lives POKEs", text: "Two POKEs give player 1 unlimited lives: <strong>POKE 13999,173</strong> and <strong>POKE 14103,173</strong>. These are the &ldquo;safest&rdquo; POKEs for this game since Katakis's tight cycle-timing means other trainers can cause flicker or crashes.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Katakis" target="_blank" rel="noopener">C64-Wiki</a>' },
    { label: "Level 10 boss point farm", text: "The level 10 end boss can be shot at a specific spot (its knee) for an effectively endless stream of points without ever finishing it off.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Katakis" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_creatures"], [
    { label: "Invincibility & lives POKEs", text: "<strong>POKE 15596,60</strong> gives invincibility; <strong>POKE 7328,208</strong> gives unlimited lives in the main game (separate POKEs exist for each of the torture-screen bonus rounds).",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/567396-creatures/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_mayhem"], [
    { label: "Invincibility & unlimited lives", text: "<strong>POKE 46621,173</strong> before running grants invincibility; <strong>POKE 48587,0</strong> grants unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/576276-mayhem-in-monsterland/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_california_games"], [
    { label: "UFO snatches the frisbee", text: "In the Flying Disc event, if you hold onto the disc too long without throwing it, a UFO flies in and abducts the catcher.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/California_Games" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_winter_games"], [
    { label: "Guaranteed 6.0 in Figure Skating", text: "Deliberately falling at every flag marker (joystick down + fire) causes the judges to award a perfect 6.0 score - a well-known scoring quirk, though it's considered poor form for legitimate high-score runs.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Winter_Games" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_defender_crown"], [
    { label: "2048 free knights", text: "Hold down the K key while the game is loading - when it finishes you'll start with 2048 knights for your offense/defense pool.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/568225-defender-of-the-crown/cheats" target="_blank" rel="noopener">GameFAQs</a>' },
    { label: "Infinite money glitch", text: "Provoke a jousting tournament, then deliberately lance your opponent's horse in the head to get thrown out - this strips your land. Raid your old (now stripped) castle but don't retake it; done correctly this triggers a bookkeeping glitch that gives you infinite money.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/568225-defender-of-the-crown/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_barbarian"], [
    { label: "Invincibility key", text: "At the title screen, press C - the screen flashes red and your fighter becomes invincible (though pits will still kill you).",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/565296-barbarian/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_microprose_soccer"], [
    { label: "Freeze the CPU defense", text: "Run your player straight into the opposing goalkeeper to lure him out of the box - while he's tracking you, the rest of the CPU team's outfield players freeze in place, giving you time to line up a shot.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Microprose_Soccer" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_paperboy"], [
    { label: "Save a mistimed throw", text: "If you throw a paper too early, pull the joystick forward right after releasing it - this gives the flying paper (and the Paperboy's own momentum) an extra push that can still land it in the mailbox.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Paperboy" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_test_drive"], [
    { label: "Ignore crashes and cliffs", text: "<strong>POKE 27916,165</strong> before running lets you hold Fire during play to ignore collisions and drive off cliffs without wrecking.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/572011-test-drive/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_target_renegade"], [
    { label: "Unlimited lives POKE", text: "<strong>POKE 36217,173</strong> before running gives unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/571987-target-renegade/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_sword_of_fargoal"], [
    { label: "The &ldquo;P&rdquo; stand-off trick", text: "Press P, then step onto the same square as a monster - because it can no longer move toward you to attack, you can stand on its tile indefinitely without taking damage.",
      source: 'Source: <a href="https://strategywiki.org/wiki/Sword_of_Fargoal/Cheats" target="_blank" rel="noopener">StrategyWiki</a>' }
  ]);

  set(["c64_shadow_of_the_beast"], [
    { label: "Falls never hurt you", text: "No matter how far you drop, fall damage never applies in Shadow of the Beast - so it's always safe to jump down instead of finding the long way around.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Shadow_of_the_Beast" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_operation_wolf"], [
    { label: "Unlimited ammo & energy", text: "<strong>POKE 35107,173</strong> before running gives unlimited ammunition; <strong>POKE 36009,165</strong> gives unlimited energy.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/577864-operation-wolf/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_double_dragon"], [
    { label: "Unlimited lives & time", text: "<strong>POKE 24853,173</strong> before running gives unlimited lives; <strong>POKE 25299,173</strong> gives unlimited time.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/568836-double-dragon/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_spy_vs_spy"], [
    { label: "Win every stick fight", text: "In the 1-on-1 stick fight minigame, hold the fire button down and slowly move the joystick up and down - this reliably beats the other spy.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Spy_vs_Spy" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_ghostbusters"], [
    { label: "Cheat mode & unlimited lives", text: "<strong>POKE 38454,96</strong> then <strong>SYS 24576</strong> before running enables a cheat mode; <strong>POKE 22014,9</strong> gives unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/575568-ghostbusters/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_pool_of_radiance"], [
    { label: "The &ldquo;Jug&rdquo; one-hit weapon", text: "Split a stack of arrows repeatedly until a character's inventory is completely full, then keep splitting the same half-stack down to 1 arrow - this glitches an overpowered melee item into existence that almost never misses and can drop nearly any enemy in one hit (though it has limited uses before vanishing).",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Pool_of_Radiance" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_wasteland"], [
    { label: "Refill supply lockers by disk-swapping", text: "To loot the ammo bunker or Ugly's safe more than once, create a duplicate character disk - when the game asks &ldquo;ENTER NEW LOCATION (Y/N)&rdquo;, swap in the new disk and answer Y to restock.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Wasteland" target="_blank" rel="noopener">C64-Wiki</a>' },
    { label: "Temple of Blood entry code", text: "To get into the Temple of Blood and retrieve the Bloodstaff, walk the sequence N W W W W N N E E E E E S E N N N N W W S W W W W N N E E, then report &ldquo;30&rdquo; steps to the guard.",
      source: 'Source: <a href="https://www.c64-wiki.com/wiki/Wasteland" target="_blank" rel="noopener">C64-Wiki</a>' }
  ]);

  set(["c64_dropzone"], [
    { label: "100 lives & 133 bombs", text: "<strong>POKE 2311,100</strong> for 100 lives (or <strong>POKE 3060,173</strong> as an alternate lives address); <strong>POKE 2316,100</strong> for 133 bombs (or <strong>POKE 14424,173</strong> as an alternate).",
      source: 'Source: <a href="https://www.commodorecheetah.co.uk/Cheats/_000396.htm" target="_blank" rel="noopener">Commodore Cheetah</a>' },
    { label: "Adjustable attack rate & gravity", text: "<strong>POKE 8575,0</strong> slows the enemy attack rate; <strong>POKE 5901,192</strong>, <strong>POKE 5930,128</strong> and <strong>POKE 5947,2</strong> change your vertical speed and gravity effects.",
      source: 'Source: <a href="https://www.commodorecheetah.co.uk/Cheats/_000396.htm" target="_blank" rel="noopener">Commodore Cheetah</a>' }
  ]);

  set(["c64_frogger"], [
    { label: "Unlimited lives POKE", text: "<strong>POKE 22341,173</strong> and <strong>POKE 22347,173</strong> before running give unlimited lives.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/571580-frogger/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  set(["c64_blood_money"], [
    { label: "Invincibility POKE", text: "<strong>POKE 12734,189</strong> before running makes your ship invincible.",
      source: 'Source: <a href="https://gamefaqs.gamespot.com/c64/565885-blood-money/cheats" target="_blank" rel="noopener">GameFAQs</a>' }
  ]);

  return D;
})();
