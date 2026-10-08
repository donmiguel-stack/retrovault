/* animcovers.js - animated box art.
 *
 * A short silent loop that plays over a game's normal cover. The static
 * covers/<id>.png|jpg stays exactly where it is and keeps doing its job
 * (social cards, catalogue, no-JS, reduced motion); the video only fades in
 * on top of it while it is actually playing.
 *
 * Adding one:
 *   1. Encode two silent H.264 loops into covers/anim/:
 *        <file>.mp4     480px wide, ~24fps, WITH sound (game page + zoom)
 *        <file>_sm.mp4  240px wide, ~20fps, silent    (shelf grid, on hover)
 *      ffmpeg -i SRC -map_metadata -1 -vf "scale=480:-2,fps=24" -c:v libx264 \
 *        -profile:v main -pix_fmt yuv420p -crf 27 -preset slow \
 *        -c:a aac -b:a 96k -movflags +faststart <file>.mp4
 *      (for _sm: -an, scale=240, fps=20, crf 28)
 *   2. Add an entry below. "credit" goes in the game-page cover's hover
 *      tooltip - only add someone else's animation with their permission
 *      on file.
 *   3. Bump this file's ?v= in index.html and game.html, then re-run
 *      tools/make_gamepages.py.
 *
 * Where it plays: the shelf grid (.cover - on hover, or when scrolled into
 * view on touch screens) and the game page hero (.hero-cover - autoplays
 * while on screen), both muted; and the full-size cover zoom, which opens
 * on a click and so plays with sound. Other places that show box art
 * (featured panels, ads, mini cards) keep the static image on purpose.
 * Nothing plays under prefers-reduced-motion.
 */
(function () {
  "use strict";

  var ANIM_COVERS = {
    // Die Suche nach den Ringen (German box), animated by Mike, 2026-10-08.
    vp_42: { file: "vp_42", credit: "Retro Vault", v: 2 }
  };
  window.ANIM_COVERS = ANIM_COVERS;

  var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  if (mm("(prefers-reduced-motion: reduce)")) return;
  var NO_HOVER = mm("(hover: none)");
  var RE = /covers\/([A-Za-z0-9_\-]+)\.(?:png|jpg)(?:\?|$)/;

  var CREDIT = {
    en: "Animated cover", nl: "Geanimeerde hoes", de: "Animiertes Cover",
    fr: "Jaquette animée", pt: "Capa animada", ja: "うごく パッケージ"
  };
  function lang() {
    try { return (window.currentLang && window.currentLang()) || "en"; } catch (e) { return "en"; }
  }

  function entryFor(img) {
    var m = RE.exec(img.getAttribute("src") || "");
    return m && ANIM_COVERS[m[1]] ? ANIM_COVERS[m[1]] : null;
  }

  function makeVideo(e, big) {
    var v = document.createElement("video");
    v.className = "anim-cover";
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.setAttribute("aria-hidden", "true");
    v.preload = "none";
    v.src = "covers/anim/" + e.file + (big ? "" : "_sm") + ".mp4?v=" + (e.v || 1);
    v.addEventListener("playing", function () { v.classList.add("on"); });
    v.addEventListener("pause", function () { v.classList.remove("on"); });
    v.addEventListener("error", function () { v.remove(); });
    return v;
  }

  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function stop(v) { v.pause(); try { v.currentTime = 0; } catch (e) {} }

  // Play while at least half on screen; pause otherwise.
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (list) {
    list.forEach(function (x) {
      if (x.isIntersecting && x.intersectionRatio >= 0.5) play(x.target); else x.target.pause();
    });
  }, { threshold: [0, 0.5] }) : null;

  function enhanceCover(img, e) {
    var box = img.parentElement;
    var hero = box.classList.contains("hero-cover");
    var v = makeVideo(e, hero);
    box.insertBefore(v, img.nextSibling);

    if (hero) {
      if (e.credit) box.title = (CREDIT[lang()] || CREDIT.en) + " · " + e.credit;
      if (io) io.observe(v); else play(v);
      return;
    }
    var card = box.closest(".card") || box;
    if (NO_HOVER) { if (io) io.observe(v); return; }
    card.addEventListener("pointerenter", function () { play(v); });
    card.addEventListener("pointerleave", function () { stop(v); });
    card.addEventListener("focusin", function () { play(v); });
    card.addEventListener("focusout", function () { stop(v); });
  }

  // The zoom overlay (game-page.js) sizes its <img> inline; mirror that size.
  function enhanceZoom(img, e) {
    var v = makeVideo(e, true);
    v.className += " anim-zoom";
    v.preload = "auto";
    var sync = function () {
      v.style.width = img.style.width;
      v.style.height = img.style.height;
    };
    sync();
    new MutationObserver(sync).observe(img, { attributes: true, attributeFilter: ["style"] });
    v.addEventListener("playing", function () { img.style.visibility = "hidden"; img.style.position = "absolute"; });
    img.parentElement.insertBefore(v, img.nextSibling);
    // The zoom opens on a click, so the browser lets it play with sound.
    // Once through with sound, then it holds on the last frame. If the
    // browser still refuses, fall back to a silent loop.
    v.muted = false; v.defaultMuted = false; v.removeAttribute("muted");
    v.loop = false;
    var p = v.play();
    if (p && p.catch) p.catch(function () { v.muted = true; v.loop = true; play(v); });
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    var imgs = root.tagName === "IMG" ? [root] : root.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.dataset.anim) continue;
      var e = entryFor(img);
      if (!e || !img.parentElement) continue;
      var p = img.parentElement;
      if (p.classList.contains("cover-zoom")) { img.dataset.anim = "1"; enhanceZoom(img, e); }
      else if (p.classList.contains("cover") || p.classList.contains("hero-cover")) {
        img.dataset.anim = "1"; enhanceCover(img, e);
      }
    }
  }

  function start() {
    scan(document.body);
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "attributes") { if (m.target.tagName === "IMG") scan(m.target); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) if (m.addedNodes[j].nodeType === 1) scan(m.addedNodes[j]);
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  }

  var css = document.createElement("style");
  css.textContent =
    ".anim-cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" +
    "opacity:0;transition:opacity .35s;pointer-events:none;}" +
    ".anim-cover.on{opacity:1;}" +
    ".anim-cover.anim-zoom{position:static;inset:auto;opacity:1;transition:none;" +
    "max-width:100%;max-height:100%;border-radius:inherit;box-shadow:inherit;}";
  document.head.appendChild(css);

  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
