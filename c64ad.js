// The C64-style "advertise here" banner, shared by the library (app.js) and the
// individual game pages (game.html). window.buildC64Ad(sponsor) returns a DOM
// node: a C64 screen (light-blue border, blue paper) with rainbow raster bars
// and a sine-wave demo-scene scroller. The sponsor object is the same shape as
// FEATURED_DATA.sponsors[] — { name, url, text, attract } — all optional.
(function () {
  var PAL = ["#c0564d", "#8B5429", "#BFCE72", "#55A049", "#67B6BD",
             "#7869C4", "#8B3F96", "#B86962", "#94E089"];

  window.buildC64Ad = function (sp) {
    // Just the one line - "ADVERTISE HERE" between stars - repeated so it fills
    // the width and loops seamlessly. No shop copy, no top/bottom status lines.
    var unit = "★ " + ((sp && sp.attract) || "ADVERTISE HERE") + " ★   ";
    var msg = unit + unit + unit + unit;

    var wrap = document.createElement("div"); wrap.className = "c64ad";
    var screen = document.createElement("div"); screen.className = "c64ad-screen"; wrap.appendChild(screen);

    // Classic C64 raster bars: a few thick bars, each a gradient that is bright
    // in the middle and fades to nothing at top and bottom (a glowing tube),
    // sliding smoothly up and down the screen.
    function rgba(hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
    }
    var rasters = document.createElement("div"); rasters.className = "c64ad-rasters"; screen.appendChild(rasters);
    var BAR_COLORS = ["#c0564d", "#BFCE72", "#67B6BD", "#8B3F96"];
    var BAR_H = 46, bars = [];
    for (var i = 0; i < BAR_COLORS.length; i++) {
      var bar = document.createElement("i"); var col = BAR_COLORS[i];
      bar.style.height = BAR_H + "px";
      bar.style.background = "linear-gradient(to bottom," +
        rgba(col, 0) + " 0%," + rgba(col, .85) + " 34%," +
        "rgba(255,255,255,.9) 50%," + rgba(col, .85) + " 66%," + rgba(col, 0) + " 100%)";
      bar.style.top = (10 + i * 46) + "px";
      rasters.appendChild(bar); bars.push(bar);
    }

    var band = document.createElement("div"); band.className = "c64ad-band"; screen.appendChild(band);
    var scr = document.createElement("div"); scr.className = "c64ad-scroller"; band.appendChild(scr);
    var letters = [];
    for (var pass = 0; pass < 2; pass++) for (var c = 0; c < msg.length; c++) {
      var ch = msg.charAt(c);
      var b = document.createElement("b"); b.textContent = ch;
      if (ch === " ") b.style.width = "0.5em";   // the pixel font's space is tight
      scr.appendChild(b); letters.push(b);
    }


    // Each letter gets a FIXED colour (a steady rainbow across the text) — no
    // per-frame colour cycling, which is what made it strobe. Motion is kept
    // smooth and slow: a horizontal scroll, a gentle vertical wave on the text,
    // and the raster bars gliding up and down.
    for (var k = 0; k < letters.length; k++) letters[k].style.color = PAL[k % PAL.length];

    // Respect the OS "reduce motion" setting: leave it as a static banner.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return wrap;

    var x = 0, t = 0, half = 0, raf = null;
    function measure() { half = scr.scrollWidth / 2; }   // half = one copy of the (doubled) message
    function step() {
      if (!half) measure();                              // retry until laid out, so it always loops
      x -= 0.8;                                           // slow scroll
      if (half && x <= -half) x += half;                 // seamless wrap — runs forever
      scr.style.transform = "translateX(" + x + "px)";
      t += 0.03;                                          // slow, gentle wave
      for (var i = 0; i < letters.length; i++) {
        letters[i].style.transform = "translateY(" + (Math.sin(t - i * 0.2) * 6) + "px)";
      }
      // slide the raster bars up and down on a slow sine, phase-offset so they weave
      var h = screen.clientHeight || 200, amp = (h - BAR_H) / 2;
      for (var r = 0; r < bars.length; r++) {
        var cy = h / 2 + Math.sin(t + r * 1.15) * amp;
        bars[r].style.top = (cy - BAR_H / 2) + "px";
      }
      raf = requestAnimationFrame(step);
    }
    measure(); raf = requestAnimationFrame(step);
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
