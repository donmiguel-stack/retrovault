// Shops that have a cartridge for sale, shown as a Buy button on its page.
//
// These are outside shops. Nothing here is an endorsement, the Vault takes no
// cut, and the price is whatever was on the page the day it was checked -
// which is why "checked" is printed under the button. Second-hand stock is
// one-of-a-kind: a listing that sells is simply gone, so re-check now and then
// and delete what has been sold.
//
//   id       must match a game id in games.js
//   shop     shown under the button
//   variant  optional - only when the cartridge for sale is a different
//            region's release of the same game. Printed next to the shop.
//            Use rel_eu / rel_us / rel_br / rel_fr and it follows the
//            language picker; any other text is printed as written.
//   url      the listing itself, not the shop's front page
//   price    a string, exactly as the shop writes it
//   note     optional - condition, what is in the box
//   checked  the day you last saw this price. Printed, so it can go stale
//            honestly rather than quietly.
//
// A game may have more than one offer; they are listed in order.

// ---------------------------------------------------------------------------
// TURNED OFF, 2026-08-04. No Buy buttons appear anywhere while this object is
// empty - game.html simply renders nothing when a game has no offer.
//
// The shop has not answered yet, and showing someone else's price without
// their say-so is presumptuous. The Popeye listing below is real and was
// checked on the date shown; uncomment it once Flashkaartshop agrees, and
// re-check the price first - second-hand stock moves.
// ---------------------------------------------------------------------------

window.SHOPS_DATA = {

  /*
  "pb_popeye": [
    { shop:  "Flashkaartshop.nl",
      url:   "https://www.flashkaartshop.nl/a-73898547/philips-videopac-console-games/philips-videopac-popeye-o-1-2/",
      price: "€ 149,99",
      note:  "complete with box and booklet",
      checked: "2026-08-04" }
  ],

  // Same listing shown on the Brazilian page. What is for sale is the
  // European cartridge - same game, different box - so "variant" says so
  // next to the shop name.
  "br_9484": [
    { shop:  "Flashkaartshop.nl",
      variant: "rel_eu",
      url:   "https://www.flashkaartshop.nl/a-73898547/philips-videopac-console-games/philips-videopac-popeye-o-1-2/",
      price: "€ 149,99",
      note:  "complete with box and booklet",
      checked: "2026-08-04" }
  ]
  */

};
