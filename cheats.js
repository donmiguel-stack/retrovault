// Community cheats for the Videopac / Odyssey2 shelf, sourced from
// https://odyssey2.info/cheats/ (checked 2026-08-08) and lightly reworded
// for length. Keyed by games.js id - the same cheat text is attached to
// every regional/variant dump of a given cartridge (EU, French, US,
// Brazilian, G7400+ "Plus", modified/fixed) since it's the same game code
// underneath - including cross-region renames, e.g. Smithereens!'s EU
// release as Stone Sling. Rendered by game.html as a hidden "Reveal Cheats"
// block inside the controls box, Videopac shelf only (see the cBox wiring
// in game.html's inline script) - not shown on the C64 or PC shelves.
//
// A cheat entry may carry an optional `img` (filename under
// assets/cheats/) and `alt` - the site's own diagrams/screenshots for
// cheats where the trick is a specific on-screen spot (K.C. Munchkin,
// Power Lords, Take the Money and Run) or a message screen (Nimble Numbers
// Ned, Q*bert, P.T. Barnum's Acrobats - the last one an animated GIF, shown
// exactly as an animated GIF plays), pulled from the same source page and
// checked 2026-08-08.
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

  return D;
})();
