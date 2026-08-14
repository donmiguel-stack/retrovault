// The C64-style "advertise here" banner, shared by the library (app.js) and the
// individual game pages (game.html). window.buildC64Ad(sponsor) returns a DOM
// node: a C64 screen (light-blue border, blue paper) with one big rainbow
// raster bar and a bright-silver demo-scene scroller whose shine sweeps the
// length of the text and back. The sponsor object is the same shape as
// FEATURED_DATA.sponsors[] — { name, url, text, attract } — all optional.
(function () {
  window.buildC64Ad = function (sp) {
    // Just the one line - "ADVERTISE HERE" between stars - repeated so it fills
    // the width and loops seamlessly. No shop copy, no top/bottom status lines.
    var unit = "★ " + ((sp && sp.attract) || "ADVERTISE HERE") + " ★   ";
    var msg = unit + unit + unit + unit;

    var wrap = document.createElement("div"); wrap.className = "c64ad";
    var screen = document.createElement("div"); screen.className = "c64ad-screen"; wrap.appendChild(screen);

    // One big, thick classic C64 raster bar (used to be four thinner ones,
    // then one thinner single bar - now doubled again) - a gradient bright
    // in the middle with a punchy, high-contrast fade to nothing top and
    // bottom (a glowing tube, not a soft haze), sliding smoothly up and
    // down the screen.
    function rgba(hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
    }
    var rasters = document.createElement("div"); rasters.className = "c64ad-rasters"; screen.appendChild(rasters);
    var BAR_COLOR = "#67B6BD", BAR_H = 220;   // twice the previous 110px
    var bar = document.createElement("i");
    bar.style.height = BAR_H + "px";
    // Fewer, punchier stops than before: full-strength colour by 15%/85%
    // instead of a slow 0->34% ramp, and full opacity instead of .85 - a
    // harder-edged glowing tube rather than a gentle haze.
    bar.style.background = "linear-gradient(to bottom," +
      rgba(BAR_COLOR, 0) + " 0%," + rgba(BAR_COLOR, 1) + " 15%," +
      "rgba(255,255,255,1) 50%," + rgba(BAR_COLOR, 1) + " 85%," + rgba(BAR_COLOR, 0) + " 100%)";
    bar.style.top = "10px";
    rasters.appendChild(bar);
    var bars = [bar];   // still an array - the slide/animate loop below is unchanged, just one entry now

    var band = document.createElement("div"); band.className = "c64ad-band"; screen.appendChild(band);
    var scr = document.createElement("div"); scr.className = "c64ad-scroller"; band.appendChild(scr);
    var letters = [];
    for (var pass = 0; pass < 2; pass++) for (var c = 0; c < msg.length; c++) {
      var ch = msg.charAt(c);
      var b = document.createElement("b"); b.textContent = ch;
      if (ch === " ") b.style.width = "0.5em";   // the pixel font's space is tight
      scr.appendChild(b); letters.push(b);
    }

    // Bright silver text with a soft shine that sweeps across the length of
    // the string and back - like light catching brushed chrome - rather than
    // the old fixed rainbow-per-letter colouring. "peak" is a position in
    // letters[] (not screen space, same as the old per-letter rainbow used
    // character index rather than pixel position); a Gaussian falloff around
    // it gives a smooth glow with no hard edge.
    var SILVER_DIM = [118, 122, 132], SILVER_BRIGHT = [255, 255, 255];
    function paintSilver(peak) {
      var span = Math.max(1, letters.length * 0.16);
      for (var i = 0; i < letters.length; i++) {
        var d = (i - peak) / span;
        var g = Math.exp(-d * d * 2.2);
        var r = SILVER_DIM[0] + (SILVER_BRIGHT[0] - SILVER_DIM[0]) * g;
        var gg = SILVER_DIM[1] + (SILVER_BRIGHT[1] - SILVER_DIM[1]) * g;
        var bl = SILVER_DIM[2] + (SILVER_BRIGHT[2] - SILVER_DIM[2]) * g;
        letters[i].style.color = "rgb(" + (r | 0) + "," + (gg | 0) + "," + (bl | 0) + ")";
      }
    }
    paintSilver(0);

    // Respect the OS "reduce motion" setting: leave it as a static banner.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return wrap;

    var x = 0, t = 0, sweepT = 0, half = 0, raf = null;
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
      // The silver shine sweeps from the start of the text to the end and
      // back - sin() already ping-pongs smoothly, no separate reverse logic
      // needed.
      sweepT += 0.01;
      paintSilver((Math.sin(sweepT) + 1) / 2 * (letters.length - 1));
      // slide the raster bar up and down on a slow sine
      var h = screen.clientHeight || 300, amp = (h - BAR_H) / 2;
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
