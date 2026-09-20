// The Amiga-style "advertise here" banner, built to sit on the Amiga shelf
// next to c64ad.js (C64 shelf) and pcad.js (PC shelf). window.buildAmigaAd(sponsor)
// returns a DOM node: a Workbench-grey case around a black screen carrying
// three copper bars, a three-depth starfield and a demo-scene scroller whose
// letters wear the vertical rainbow gradient of a classic Amiga logo font -
// white at the top through yellow, orange and red into magenta and blue.
// The sponsor object is the same shape as FEATURED_DATA.sponsors[] -
// { name, url, text, attract } - and every field is optional.
//
// Why copper bars: the Copper was the Amiga's display co-processor, and
// re-colouring the background on a per-scanline schedule with it was the
// single most recognisable thing the machine did. Same job the raster bar
// does in c64ad.js, different hardware trick - so the two banners read as
// siblings without looking like the same banner twice.
(function () {
  // The copper palette: three bars, each cycling its own hue over time so
  // the stack never repeats the same three colours twice in a row.
  var BAR_COUNT = 3, BAR_H = 64;
  var STARS = 54;

  window.buildAmigaAd = function (sp) {
    // One line - "ADVERTISE HERE" between stars - repeated so it fills the
    // width and loops seamlessly. Same unit as the other two banners, so the
    // three shelves scroll the same sentence in the visitor's own language.
    var unit = "★ " + ((sp && window.tx && window.tx(sp.attract)) || "ADVERTISE HERE") + " ★   ";
    var msg = unit + unit + unit + unit;

    var wrap = document.createElement("div"); wrap.className = "amigaad";
    var screen = document.createElement("div"); screen.className = "amigaad-screen"; wrap.appendChild(screen);

    // ---- copper bars -----------------------------------------------------
    var copper = document.createElement("div"); copper.className = "amigaad-copper";
    screen.appendChild(copper);
    var bars = [];
    for (var i = 0; i < BAR_COUNT; i++) {
      var bar = document.createElement("i");
      bar.style.height = BAR_H + "px";
      copper.appendChild(bar);
      bars.push(bar);
    }
    function paintBar(el, hue) {
      // Bright core, hard-ish fade top and bottom: a glowing band, the way a
      // Copper list ramps up and back down over a handful of scanlines.
      el.style.background = "linear-gradient(to bottom," +
        "hsla(" + hue + ",90%,50%,0) 0%," +
        "hsla(" + hue + ",95%,52%,1) 18%," +
        "hsla(" + hue + ",100%,88%,1) 50%," +
        "hsla(" + hue + ",95%,52%,1) 82%," +
        "hsla(" + hue + ",90%,50%,0) 100%)";
    }
    for (var b0 = 0; b0 < bars.length; b0++) paintBar(bars[b0], b0 * 120);

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

    // ---- scroller --------------------------------------------------------
    var band = document.createElement("div"); band.className = "amigaad-band"; screen.appendChild(band);
    var scr = document.createElement("div"); scr.className = "amigaad-scroller"; band.appendChild(scr);
    var letters = [];
    for (var pass = 0; pass < 2; pass++) for (var c = 0; c < msg.length; c++) {
      var ch = msg.charAt(c);
      var el = document.createElement("b"); el.textContent = ch;
      if (ch === " ") el.style.width = "0.5em";     // the pixel font's space is tight
      scr.appendChild(el); letters.push(el);
    }
    // Colour is one vertical rainbow per letter, set in CSS
    // (.amigaad-scroller b) rather than here: unlike the C64 banner's silver
    // sweep it never changes, so there is nothing for the frame loop to do.

    // Respect the OS "reduce motion" setting: leave it as a static banner.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return wrap;

    var x = 0, t = 0, half = 0, raf = null;
    function measure() { half = scr.scrollWidth / 2; }   // half = one copy of the (doubled) message
    function step() {
      if (!half) measure();                              // retry until laid out, so it always loops
      x -= 0.8;                                          // slow scroll, same speed as the other two
      if (half && x <= -half) x += half;                 // seamless wrap - runs forever
      scr.style.transform = "translateX(" + x + "px)";

      t += 0.02;
      // Letters ride a slow sine, same gentle wave as the C64 scroller.
      for (var i = 0; i < letters.length; i++) {
        letters[i].style.transform = "translateY(" + (Math.sin(t * 1.5 - i * 0.2) * 7) + "px)";
      }
      // Copper bars glide on offset sines and cycle hue as they go.
      var h = screen.clientHeight || 300, amp = (h - BAR_H) / 2;
      for (var r = 0; r < bars.length; r++) {
        var cy = h / 2 + Math.sin(t * 1.3 + r * 2.1) * amp;
        bars[r].style.top = (cy - BAR_H / 2) + "px";
        paintBar(bars[r], (t * 24 + r * 120) % 360);
      }
      // Starfield drifts left and wraps.
      for (var n = 0; n < stars.length; n++) {
        stars[n].x -= stars[n].v;
        if (stars[n].x < -2) stars[n].x = 102;
      }
      placeStars();

      raf = requestAnimationFrame(step);
    }
    measure(); raf = requestAnimationFrame(step);
    // Pause when scrolled out of view so it isn't burning a core in the
    // background - same guard as the other two banners.
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !raf) { measure(); raf = requestAnimationFrame(step); }
          else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
        });
      }).observe(wrap);
    }
    return wrap;
  };
})();
