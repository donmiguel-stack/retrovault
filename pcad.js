// The PC/DOS-style "advertise here" banner, shared by the library (app.js)
// and the individual game pages (game.html). window.buildPcAd(sponsor)
// returns a DOM node: a beige-case DOS text-mode screen (EGA-blue paper,
// a drifting CGA colour-bar test pattern, CRT scanlines, a tiny blinking
// "C:\ADS>" prompt) with a horizontally scrolling marquee - the shareware-
// disk equivalent of the C64 banner in c64ad.js. The sponsor object is the
// same shape as FEATURED_DATA.sponsors[] - { name, url, text, attract } -
// all optional.
(function () {
  // The colour-bar test pattern behind the text - the strip every CRT
  // monitor and TV calibration screen used.
  var BAR_COLORS = ["#00FFFF", "#FF00FF", "#FFFF00", "#FFFFFF", "#0000FF", "#FF0000", "#00FF00"];

  window.buildPcAd = function (sp) {
    // One line, doubled up so it loops seamlessly - same trick as the C64
    // banner. No shop copy of its own, just the attract text.
    var unit = "\u2605 " + ((sp && sp.attract) || "ADVERTISE HERE") + " \u2605   ";
    var msg = unit + unit + unit + unit;

    var wrap = document.createElement("div"); wrap.className = "pcad";
    var screen = document.createElement("div"); screen.className = "pcad-screen"; wrap.appendChild(screen);

    var bars = document.createElement("div"); bars.className = "pcad-bars"; screen.appendChild(bars);
    var BAR_W = 34, barEls = [];
    for (var i = 0; i < BAR_COLORS.length; i++) {
      var bar = document.createElement("i");
      bar.style.width = BAR_W + "px";
      bar.style.left = (i * BAR_W) + "px";
      bar.style.background = BAR_COLORS[i];
      bars.appendChild(bar); barEls.push(bar);
    }

    var scan = document.createElement("div"); scan.className = "pcad-scan"; screen.appendChild(scan);

    // A tiny static prompt in the corner, like a DOS install screen waiting
    // on a keypress - just enough chrome to sell the illusion.
    var prompt = document.createElement("div"); prompt.className = "pcad-prompt";
    prompt.appendChild(document.createTextNode("C:\\ADS>"));
    var cur = document.createElement("i"); cur.className = "pcad-cur";
    prompt.appendChild(cur);
    screen.appendChild(prompt);

    var band = document.createElement("div"); band.className = "pcad-band"; screen.appendChild(band);
    var scr = document.createElement("div"); scr.className = "pcad-scroller"; band.appendChild(scr);
    var letters = [];
    for (var pass = 0; pass < 2; pass++) for (var c = 0; c < msg.length; c++) {
      var ch = msg.charAt(c);
      var b = document.createElement("b"); b.textContent = ch;
      if (ch === " ") b.style.width = "0.5em";   // the monospace font's space is tight
      scr.appendChild(b); letters.push(b);
    }

    // Colour is one white-to-cyan gradient across the whole scroller (CSS,
    // .pcad-scroller b), not a per-letter rainbow - chunky pixel-arcade
    // title-card look instead of the C64's individual-letter cycling.

    // Respect the OS "reduce motion" setting: leave it as a static banner.
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return wrap;

    var x = 0, t = 0, half = 0, raf = null;
    function measure() { half = scr.scrollWidth / 2; }   // half = one copy of the (doubled) message
    function step() {
      if (!half) measure();                              // retry until laid out, so it always loops
      x -= 0.8;                                           // slow scroll
      if (half && x <= -half) x += half;                 // seamless wrap - runs forever
      scr.style.transform = "translateX(" + x + "px)";
      t += 0.02;                                          // slow drift for the colour bars
      bars.style.transform = "translateX(" + (Math.sin(t) * 30) + "px)";
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
