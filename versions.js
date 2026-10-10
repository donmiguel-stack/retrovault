// Cache-bust numbers for the game page: game.html and every pre-built
// game/<id>.html copy of it.
//
// Changed a script or stylesheet the game page uses? Bump its number HERE
// and nowhere else. The pages themselves no longer carry the numbers, so a
// bump is a one-file change instead of a line in all ~470 game pages.
//
// The pages load this file fresh on every visit (?t=<time>, see game.html),
// then RV_LOAD.css() writes the stylesheets in <head> and RV_LOAD.js() the
// scripts at the end of <body>, in this order, each with its ?v= number.
// Order matters: later scripts use what earlier ones define.
(function () {
  var CSS = [
    ["style.css", 107],
    ["game.css", 12]
  ];
  var JS = [
    ["i18n.js", 134],
    ["setup-i18n.js", 122],
    ["games.js", 128],
    ["alternates.js", 4],
    ["extras.js", 109],
    ["packaging.js", 109],
    ["genres.js", 121],
    ["brazil.js", 109],
    ["usa.js", 109],
    ["shops.js", 109],
    ["support.js", 110],
    ["downloads.js", 114],
    ["store.js", 1],
    ["localroms.js", 1],
    ["pad.js", 1],
    ["romsources.js", 5],
    ["hosted.js", 2],
    ["products.js", 1],
    ["cheats.js", 113],
    ["cheats-ja.js", 1],
    ["tips.js", 111],
    ["tips-ja.js", 1],
    ["walkthroughs.js", 1],
    ["featured.js", 115],
    ["c64ad.js", 110],
    ["gamepages.js", 146],
    ["gamepages-ja.js", 2],
    ["demo.js", 112],
    ["game-page.js", 24],
    ["animcovers.js", 12]
  ];
  function write(list, tag) {
    for (var i = 0; i < list.length; i++) {
      var url = list[i][0] + "?v=" + list[i][1];
      document.write(tag === "css"
        ? '<link rel="stylesheet" href="' + url + '">'
        : '<script src="' + url + '"><\/script>');
    }
  }
  window.RV_LOAD = {
    css: function () { write(CSS, "css"); },
    js: function () { write(JS, "js"); }
  };
})();
