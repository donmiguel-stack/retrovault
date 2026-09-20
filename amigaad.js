// The Amiga-style "advertise here" banner, built to sit on the Amiga shelf
// next to c64ad.js (C64 shelf) and pcad.js (PC shelf). window.buildAmigaAd(sponsor)
// returns a DOM node: a Workbench-grey case around a black screen with a
// drifting three-depth starfield and, centred on it, one static line of
// chunky pixel letters wearing the vertical rainbow of a classic Amiga logo
// font - white at the top through yellow, orange and red into magenta and
// blue - with that rainbow cycling slowly downward the way a Copper list
// re-colours text on the real machine.
//
// Deliberately NOT a scroller and NOT a raster/copper bar: those are the
// C64 and DOS banners' tricks (c64ad.js, pcad.js). This one is the Amiga
// logo screen - the whole message sits still and readable, both words on
// one line, and the colour does the moving.
//
// The sponsor object is the same shape as FEATURED_DATA.sponsors[] -
// { name, url, text, attract } - and every field is optional.
(function () {
  var STARS = 54;

  window.buildAmigaAd = function (sp) {
    var text = (sp && window.tx && window.tx(sp.attract)) || "ADVERTISE HERE";

    var wrap = document.createElement("div"); wrap.className = "amigaad";
    var screen = document.createElement("div"); screen.className = "amigaad-screen"; wrap.appendChild(screen);

    // ---- starfield -------------------------------------------------------
    // Three depths, drifting right to left at three speeds. Positions are
    // seeded once and then only moved, so nothing reflows.
    var field = document.createElement("div"); field.className = "amigaad-stars";
    screen.appendChild(field);
    var stars = [];
    for (var s = 0; s < STARS; s++) {
      var depth = (s % 3) + 1;                       // 1 = far/slow, 3 = near/fast
      var dot = document.createElement("i");
      dot.style.width = dot.style.height = depth + "px";
      dot.style.opacity = 0.28 + depth * 0.2;
      dot.style.top = ((s * 37) % 100) + "%";
      field.appendChild(dot);
      stars.push({ el: dot, x: (s * 53) % 100, v: 0.035 * depth });
    }
    function placeStars() {
      for (var n = 0; n < stars.length; n++) stars[n].el.style.left = stars[n].x + "%";
    }
    placeStars();

    // ---- the logo line ---------------------------------------------------
    // One element, not one per letter: the rainbow runs down the whole line
    // as a single gradient, which is what makes it read as one logo rather
    // than a row of separately coloured letters. ".amigaad-drip" is the same
    // text again, nudged down and masked into short vertical stubs, giving
    // the little pixel drips that hang off the bottom of the glyphs.
    var band = document.createElement("div"); band.className = "amigaad-band"; screen.appendChild(band);
    var word = document.createElement("div"); word.className = "amigaad-word";
    word.textContent = text;
    var drip = document.createElement("span"); drip.className = "amigaad-drip";
    drip.setAttribute("aria-hidden", "true");
    drip.textContent = text;
    word.appendChild(drip);
    band.appendChild(word);

    // The rainbow cycle itself is a CSS animation on .amigaad-word (and the
    // drip), so it keeps running without a frame loop and stops on its own
    // under prefers-reduced-motion. Only the starfield needs JS.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return wrap;

    var raf = null;
    function step() {
      for (var n = 0; n < stars.length; n++) {
        stars[n].x -= stars[n].v;
        if (stars[n].x < -2) stars[n].x = 102;
      }
      placeStars();
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    // Pause when scrolled out of view so it isn't burning a core in the
    // background - same guard as the other two banners.
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !raf) raf = requestAnimationFrame(step);
          else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
        });
      }).observe(wrap);
    }
    return wrap;
  };
})();
