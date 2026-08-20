// Short gameplay tips for the Commodore 64 and PC/MS-DOS shelves, sourced
// from StrategyWiki (strategywiki.org) - checked 2026-08-19. Each entry
// links back to the specific StrategyWiki guide page the tip was pulled
// from, for readers who want the full walkthrough.
//
// Rendered by game.html as a hidden "Reveal Tips" block - same <details>
// "hidden until clicked" pattern as the Videopac cheats.js block, but kept
// as a separate data file/DOM class (tips-box, not cheats-box) since the
// source and shape are different: cheats.js is one shared source
// (odyssey2.info) with an array of cheats per game, this is one tip per
// game each with its own source URL (StrategyWiki, keyed and linked
// per-entry rather than a single global "Source:" line).
//
// StrategyWiki has no dedicated Odyssey2/Videopac coverage as of this
// check - the only hits for titles on that shelf (e.g. Q*bert, Popeye) are
// generic arcade-port pages that don't reflect the specific Odyssey2/
// Videopac cartridge build, so nothing from that shelf is included here.
// Homebrew titles on both shelves were checked too (title search) and none
// have a StrategyWiki guide - fan games from the 2010s/2020s predate/postdate
// the wiki's active documentation window for these platforms.
window.TIPS_DATA = (function () {
  var D = {};
  function set(id, url, text) { D[id] = { url: url, text: text }; }

  // ---------------- Commodore 64 ----------------

  set("c64_boulder_dash",
    "https://strategywiki.org/wiki/Boulder_Dash/Objects",
    "Push a boulder through an active Magic Wall and it turns into a diamond. An amoeba that grows past 200 tiles converts into boulders (or diamonds if it can't expand) - and killing a butterfly by dropping something on it, rather than blowing it up, drops 9 diamonds instead of the usual few.");

  set("c64_impossible_mission",
    "https://strategywiki.org/wiki/Impossible_Mission/Walkthrough",
    "Learn the three robot classes before committing to a room: stationary ones fire lightning in fixed patterns, slow patrollers stop-and-shoot when they spot you, and fast pursuers either chase slowly or fire when they can't close the gap.");

  set("c64_last_ninja",
    "https://strategywiki.org/wiki/The_Last_Ninja/Walkthrough",
    "Smoke bombs stun the dragon and come with three uses, but can be restocked if you find more. Wounds you take stick with you even if you retreat and come back later.");

  set("c64_wizball",
    "https://strategywiki.org/wiki/Wizball/Walkthrough",
    "Grab the thrust power-up first for ball control, then anti-gravity, then the cat Nifta - each comes from shooting enemies. Colored paint blobs only become collectible drops once you shoot them; if a level runs short on drops, killing every enemy on screen respawns more.");

  set("c64_mule",
    "https://strategywiki.org/wiki/M.U.L.E./Walkthrough",
    "Land bids follow designer Dan Bunten's own rule of thumb: multiply the turns remaining by 100 and add 500 for your ceiling. During auctions, buy low and sell high on the fixed price ladder (food ~$15, energy ~$10, smithore $36-43) - and never sell in the final phase unless you have to.");

  set("c64_giana_sisters",
    "https://strategywiki.org/wiki/The_Great_Giana_Sisters/Walkthrough",
    "Without a power orb (or after losing a life), you have to jump the giant ant rather than bulldoze straight through it.");

  set("c64_defender_crown",
    "https://strategywiki.org/wiki/Defender_of_the_Crown/Walkthrough",
    "Soldiers cost just 1 gold each, so build up your army before buying castles - except at chokepoints. Get a catapult before attacking: breaking the wall halves the defenders' strength, leaving it intact doubles it. Save Robin Hood's aid for when you actually need the castle taken.");

  set("c64_paperboy",
    "https://strategywiki.org/wiki/Paperboy",
    "You carry ten papers at a time and need to land them in mailboxes or on doormats. Break a customer's window and they cancel their subscription outright - lose every customer on the route and the game ends.");

  set("c64_sword_of_fargoal",
    "https://strategywiki.org/wiki/Sword_of_Fargoal/Walkthrough",
    "Build Battle Skill early by killing weak monsters (worth up to 5 points each) instead of fleeing everything. Temples trade gold for full healing (2000 gold), and Light plus Invisibility get you past the humanoids that steal your gear on the way back up with the sword.");

  set("c64_operation_wolf",
    "https://strategywiki.org/wiki/Operation_Wolf/Walkthrough",
    "Clear the Powder Magazine stage to restock magazines and mortar rockets. On the last two stages, watch your back - a knife-wielding soldier sneaks up from behind, and losing all five hostages ends the game instantly regardless of your health.");

  set("c64_double_dragon",
    "https://strategywiki.org/wiki/Double_Dragon",
    "Disarm an enemy who's carrying a melee weapon and pick it up yourself off the floor, rather than fighting the rest of the level bare-handed.");

  set("c64_ghostbusters",
    "https://strategywiki.org/wiki/Ghostbusters",
    "The clock is really a money clock: get to $10,000 before the city's PK energy hits 9999, or the Stay-Puft Marshmallow Man shows up and ends the game. Catching Slimer needs two proton streams guided over a trap at the same time.");

  set("c64_turrican",
    "https://strategywiki.org/wiki/Turrican/Level_1",
    "Head left immediately at the start of Level 1 instead of following the main path right - there's a 1-up and a floating power-up block waiting there before you've even moved.");

  set("c64_congo_bongo",
    "https://strategywiki.org/wiki/Congo_Bongo/Walkthrough",
    "On the Stage 1 bridge, only jump a snake as it crawls toward you from the left - mistiming the approach is the single most common way to lose a life there.");

  set("c64_frogger",
    "https://strategywiki.org/wiki/Frogger/Walkthrough",
    "Let the joystick return to neutral between jumps. Holding it forward doesn't chain multiple hops - it's the most common reason players get flattened crossing traffic.");

  set("c64_castle_wolfenstein",
    "https://strategywiki.org/wiki/Castle_Wolfenstein",
    "Three viable approaches: sneak past guards, steal a uniform to impersonate one, or just kill them outright. You climb through eight ranks, Private to Field Marshal, as the difficulty scales up with each promotion.");

  set("c64_commando",
    "https://strategywiki.org/wiki/Commando",
    "SMG ammo is unlimited but grenades are limited - save grenades for hardened targets rather than crowds. Bonus rocks are worth up to 4,000 points but offer no cover, so don't linger near one.");

  set("c64_bubble_bobble",
    "https://strategywiki.org/wiki/Bubble_Bobble/Walkthrough",
    "Point items spawn 7 seconds into a stage, special items at 12 seconds - dawdling costs you loot, not just time. Watch for the “Hurry Up!” warning, and grab water, lightning or fire bubbles when they appear to clear a room fast.");

  set("c64_zak_mckracken",
    "https://strategywiki.org/wiki/Zak_McKracken_and_the_Alien_Mindbenders/Miami",
    "Buy the book from the Devotee at the SF airport before flying to Miami, then give it to the bum there - he turns into a Devotee who'll trade you his whiskey. Miami is otherwise a dead end, but it's mandatory before reaching “the Triangle.”");

  // ---------------- PC / MS-DOS ----------------

  set("pc_doom",
    "https://strategywiki.org/wiki/Doom/Weapons",
    "The chainsaw's fast refire keeps most enemies staggered so they can't fight back - except Barons, who shrug it off. The BFG's real damage is a 45-degree spray on top of the direct hit, and firing just before you land can mask its charge-up sound in multiplayer.");

  set("pc_doom2",
    "https://strategywiki.org/wiki/Doom_II:_Hell_on_Earth/MAP01:_Entryway",
    "On MAP01, turn around right at the start and head left before doing anything else - there's a chainsaw waiting there.");

  set("pc_final_doom_tnt",
    "https://strategywiki.org/wiki/Final_Doom/MAP16:_Deepest_Reaches",
    "If you fall into the pit on Deepest Reaches, head for the southeast corner - that's where the radiation suit is, and it's your best shot at surviving the fall.");

  set("pc_duke_nukem_3d",
    "https://strategywiki.org/wiki/Duke_Nukem_3D/Hollywood_Holocaust",
    "Right at the start of Hollywood Holocaust, turn around for pistol ammo behind the box, then shoot the yellow C-9 tanks in the corner before dropping down the shaft.");

  set("pc_duke_nukem_2",
    "https://strategywiki.org/wiki/Duke_Nukem_II/Cheats",
    "No walkthrough exists for this one on StrategyWiki - just cheat codes: EAT restores health to max, NUK grants a random weapon plus that level's completion items, and DUKM is NUK's alternate version.");

  set("pc_prince_of_persia",
    "https://strategywiki.org/wiki/Prince_of_Persia/Level_1",
    "The first guard doesn't have to be fought - depending on the version there are ways to slip past him without combat, or you can go find the sword first and take him on properly.");

  set("pc_leisure_suit_larry",
    "https://strategywiki.org/wiki/Leisure_Suit_Larry_in_the_Land_of_the_Lounge_Lizards/Walkthrough",
    "In the Lefty's Bar bathroom sequence: stand at the toilet but don't flush, or you die. Read the wall text repeatedly for a password phrase, and don't miss the ring hidden in the sink.");

  set("pc_civilization",
    "https://strategywiki.org/wiki/Civilization/Gameplay",
    "Space cities roughly four tiles apart to avoid overlap. “Infinite City Sprawl” - packing cheap adjacent cities for military output - was so dominant in the original Civilization that human players treated using it against an opponent who wasn't as bad etiquette.");

  set("pc_simcity",
    "https://strategywiki.org/wiki/SimCity/Natural_Disasters",
    "Well-funded fire stations are your main defense against a city-eating blaze. Disasters hit roughly 8x more often on hard difficulty than easy, and the monster only shows up in a polluted city unless you trigger it manually.");

  set("pc_dune2",
    "https://strategywiki.org/wiki/Dune_II:_The_Building_of_a_Dynasty/Walkthrough",
    "Always build on concrete slabs - a fully repaired refinery pulls in spice faster than a half-wrecked one, so the upfront cost pays for itself. Difficulty scales by house: Harkonnen easiest, Atreides medium, Ordos hardest, based on what weapons you get versus what you're facing.");

  set("pc_oregon_trail",
    "https://strategywiki.org/wiki/The_Oregon_Trail/Scoring",
    "People are worth far more than stuff: a healthy party member reaching Oregon scores 200-500 points, leftover supplies only 1-50. Your occupation multiplies the whole score - Farmer triples it, Carpenter doubles it, Banker doesn't boost it at all.");

  set("pc_lemmings",
    "https://strategywiki.org/wiki/Lemmings/Walkthrough",
    "Assign a blocker the instant it lands under the entrance - lemmings from that direction still funnel past while it blocks the other way. A builder that runs into a blocker turns around and keeps building in the opposite direction, which you can use to redirect the crowd instead of wasting a life.");

  set("pc_gta1",
    "https://strategywiki.org/wiki/Grand_Theft_Auto/Walkthrough",
    "You don't have to run every mission - hitting a chapter's money target by any means, not just missions, advances you. There's no mid-mission save and a failed mission can't be redone, so budget your attempts.");

  set("pc_kq2",
    "https://strategywiki.org/wiki/King's_Quest_II:_Romancing_the_Throne/First_And_Second_Doors",
    "Give the mermaid a bouquet rather than a treasure - hand over a treasure instead and you lose 7 points plus the item, permanently.");

  set("pc_kq6",
    "https://strategywiki.org/wiki/King's_Quest_VI:_Heir_Today,_Gone_Tomorrow/Castle_of_the_Crown_(Long_Path)",
    "Using the feather on the teacup mixture is the correct move - Alexander stirs it in, and the color running through the mixture is exactly the point, given where the feather actually came from.");

  set("pc_sq1",
    "https://strategywiki.org/wiki/Space_Quest:_The_Sarien_Encounter/Kerona",
    "Don't dawdle on the surface of Kerona - go too long without water and Roger Wilco simply dies of dehydration.");

  return D;
})();
