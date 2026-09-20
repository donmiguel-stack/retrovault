// The Amiga-style "advertise here" banner, built to sit on the Amiga shelf
// next to c64ad.js (C64 shelf) and pcad.js (PC shelf). window.buildAmigaAd(sponsor)
// returns a DOM node: a Workbench-grey case around a black screen with a 3D
// perspective starfield the camera flies through while also sliding left,
// right, up and down, and, centred on it, one static
// line of chunky pixel letters wearing the vertical rainbow of a classic
// Amiga logo font - white at the top through yellow, orange and red into
// magenta and blue - with that rainbow cycling slowly downward the way a
// Copper list re-colours text on the real machine.
//
// Deliberately NOT a scroller and NOT a raster/copper bar: those are the
// C64 and DOS banners' tricks (c64ad.js, pcad.js). This one is the Amiga
// logo screen - the whole message sits still and readable, both words on
// one line, and the colour and the stars do the moving.
//
// The sponsor object is the same shape as FEATURED_DATA.sponsors[] -
// { name, url, text, attract } - and every field is optional.
(function () {
  // ---- 3D starfield constants -------------------------------------------
  // The demo-scene standard: stars are points in a box ahead of the viewer,
  // projected with sx = cx + (x / z) * cx. Each one simply gets nearer, and
  // perspective pushes it away from the vanishing point - slowly near the
  // middle, faster towards the edge.
  //
  // On top of that the camera also SLIDES left/right and up/down, so the
  // field is never just "straight ahead". The slide is applied in world
  // space (every star's x and y shift by the same amount each frame), NOT by
  // moving the vanishing point on screen: dividing by z afterwards is what
  // makes near stars sweep across fast while distant ones barely stir, which
  // is the parallax that sells it. Two out-of-step sine pairs per axis keep
  // the drift from settling into a visible loop.
  var STARS = 110;
  var Z_NEAR = 0.05;   // respawn once a star is this close (it is off-screen by then)
  var Z_FAR  = 1;      // spawn depth
  var SPEED  = 0.006;  // z travelled per frame - ~2.6s from spawn to respawn at 60fps
  // DRIFT_Y is bigger than DRIFT_X on purpose. The screen is roughly 4.5x
  // wider than it is tall, and the projection multiplies y by cy - so an
  // equal world-space slide shows up 4.5x smaller vertically. Measured: at
  // 0.0013 the up/down movement was ~7% of the sideways movement on screen
  // and effectively invisible. Pushed much past this and stars leave through
  // the top and bottom of the 300px band fast enough to visibly churn.
  var DRIFT_X = 0.0018, DRIFT_Y = 0.0030;   // peak sideways / vertical camera slide, world units per frame

  window.buildAmigaAd = function (sp) {
    var text = (sp && window.tx && window.tx(sp.attract)) || "ADVERTISE HERE";

    var wrap = document.createElement("div"); wrap.className = "amigaad";
    var screen = document.createElement("div"); screen.className = "amigaad-screen"; wrap.appendChild(screen);

    // ---- starfield -------------------------------------------------------
    var field = document.createElement("div"); field.className = "amigaad-stars";
    screen.appendChild(field);

    var stars = [];
    function seed(st, z) {
      // Rejection-sample away from dead centre: a star spawned exactly on the
      // vanishing point crawls for its whole life and reads as a stuck pixel.
      do { st.x = Math.random() * 2 - 1; st.y = Math.random() * 2 - 1; }
      while (st.x * st.x + st.y * st.y < 0.02);
      st.z = z;
    }
    for (var i = 0; i < STARS; i++) {
      var dot = document.createElement("i");
      field.appendChild(dot);
      var st = { el: dot };
      // Spread the initial depths across the whole range rather than starting
      // them all at Z_FAR, or the first pass arrives as one visible wave.
      seed(st, Z_NEAR + (i / STARS) * (Z_FAR - Z_NEAR));
      stars.push(st);
    }

    // Cached because reading clientWidth/clientHeight inside the frame loop
    // forces a layout every frame for every star.
    var w = 0, h = 0, cx = 0, cy = 0;
    function measure() {
      w = screen.clientWidth || 600; h = screen.clientHeight || 300;
      cx = w / 2; cy = h / 2;
    }
    measure();
    if (window.ResizeObserver) new ResizeObserver(measure).observe(screen);
    else window.addEventListener("resize", measure);

    function draw() {
      for (var n = 0; n < stars.length; n++) {
        var s = stars[n];
        var sx = cx + (s.x / s.z) * cx;
        var sy = cy + (s.y / s.z) * cy;
        // Off the edge, or past the viewer: send it back to the far plane.
        if (s.z <= Z_NEAR || sx < -8 || sx > w + 8 || sy < -8 || sy > h + 8) {
          seed(s, Z_FAR);
          sx = cx + (s.x / s.z) * cx;
          sy = cy + (s.y / s.z) * cy;
        }
        var near = 1 - s.z;                       // 0 far, ~1 close
        s.el.style.transform = "translate3d(" + sx.toFixed(1) + "px," + sy.toFixed(1) + "px,0) " +
                               "scale(" + (0.5 + near * 2).toFixed(2) + ")";
        s.el.style.opacity = (0.22 + near * 0.85).toFixed(2);
      }
    }
    draw();

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

    var raf = null, t = 0;
    function step() {
      t += 1 / 60;                                  // nominal seconds; the sines below only need to be slow
      // Camera slide. Periods of roughly 10s/27s horizontally and 15s/37s
      // vertically - deliberately not simple multiples of each other, so the
      // combined path wanders instead of tracing the same ellipse.
      var dx = DRIFT_X * (Math.sin(t * 0.62) * 0.7 + Math.sin(t * 0.23 + 2.1) * 0.5);
      var dy = DRIFT_Y * (Math.sin(t * 0.41 + 1.3) * 0.8 + Math.sin(t * 0.17) * 0.4);
      for (var n = 0; n < stars.length; n++) {
        var s = stars[n];
        s.z -= SPEED;
        s.x += dx;
        s.y += dy;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
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
