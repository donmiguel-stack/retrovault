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
 *   2. Add an entry below. "credit" is shown on the game page as an
 *      "Animated cover: <credit>" line under the Source line - only add someone else's animation with their permission
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
    vp_42: { file: "vp_42", credit: "Retro Vault", v: 2 },
    vp_51pl: { file: "vp_51pl", credit: "Retro Vault", v: 1 },  // Terrahawks, made by Mike, with sound
    vp_60_16: { file: "vp_60_16", credit: "Retro Vault", v: 1 }, // Trans American Rally, made by Mike, with sound
    vp_19: { file: "vp_19", credit: "Retro Vault", v: 1 },       // Catch the Ball / Noughts and Crosses, made by Mike, with sound
    mod_19_g7400: { file: "vp_19", credit: "Retro Vault", v: 1 },
    c64_hb_bruce_lee_return_of_fury: { file: "c64_hb_bruce_lee_return_of_fury", credit: "Retro Vault", v: 1 }, // C64 shelf, made by Mike, with sound
    am_act_of_war: { file: "am_act_of_war", credit: "Retro Vault", v: 1 }, // Amiga shelf, made by Mike, 2026-10-09, silent
    am_demo_arte: { file: "am_demo_arte", credit: "Retro Vault", v: 1 }, // Amiga demoscene shelf, Sanity's Arte, clip by Mike, 2026-10-09, sound removed

    // Thomas Vivet's animated box art (lerandori.free.fr/Videos/Video_pac),
    // used with his permission, 2026-10-08. Artwork only - no Philips header -
    // and silent. Keyed by cover id, so every variant sharing that box art
    // gets it; one tv_<name> file per artwork.
    "vp_11pl": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "vp_11alt": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "vp_11": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "mod_11pl": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "Vp11_F": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "Vp11+_F": { file: "tv_vp_11", credit: "Thomas Vivet", v: 1 },
    "vp_22hack": { file: "tv_vp_22", credit: "Thomas Vivet", v: 1 },
    "vp_22": { file: "tv_vp_22", credit: "Thomas Vivet", v: 1 },
    "vp_01hack": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    "vp_01": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    "Vp01_F": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    // The shelf shows the G7400+ dump (vp_01pl, Videopac+ "RACE" box) - same
    // painting as the G7000 box, so it gets the same animation.
    "vp_01pl": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    "vp01+_F": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    "mod_01pl": { file: "tv_vp_01", credit: "Thomas Vivet", v: 1 },
    "vp_04": { file: "tv_vp_04", credit: "Thomas Vivet", v: 1 },
    "vp_09": { file: "tv_vp_09", credit: "Thomas Vivet", v: 1 },
    "mod_vp9_examples": { file: "tv_vp_09", credit: "Thomas Vivet", v: 1 },
    "vp_25": { file: "tv_vp_25", credit: "Thomas Vivet", v: 1 },
    "Vp25_F": { file: "tv_vp_25", credit: "Thomas Vivet", v: 1 },
    "vp_29": { file: "tv_vp_29", credit: "Thomas Vivet", v: 1 },
    "Vp29_F": { file: "tv_vp_29", credit: "Thomas Vivet", v: 1 },
    "vp_32": { file: "tv_vp_32", credit: "Thomas Vivet", v: 1 },
    "vp_34": { file: "tv_vp_34", credit: "Thomas Vivet", v: 1 },
    "vp_34pl": { file: "tv_vp_34", credit: "Thomas Vivet", v: 1 },
    "vp_37": { file: "tv_vp_37", credit: "Thomas Vivet", v: 1 },
    "vp_39pl": { file: "tv_vp_39", credit: "Thomas Vivet", v: 1 },
    "vp_39": { file: "tv_vp_39", credit: "Thomas Vivet", v: 1 },
    "vp_35pl": { file: "tv_vp_35", credit: "Thomas Vivet", v: 1 },
    "vp_35": { file: "tv_vp_35", credit: "Thomas Vivet", v: 1 },
    "mod_35pl_fix": { file: "tv_vp_35", credit: "Thomas Vivet", v: 1 },
    "Vp35_F": { file: "tv_vp_35", credit: "Thomas Vivet", v: 1 },
    "vp_33alt": { file: "tv_vp_33", credit: "Thomas Vivet", v: 1 },
    "vp_33": { file: "tv_vp_33", credit: "Thomas Vivet", v: 1 },
    "pal_acrobats": { file: "tv_vp_33", credit: "Thomas Vivet", v: 1 },
    "jo_billard_pl": { file: "tv_jo_billard", credit: "Thomas Vivet", v: 1 },
    "jo_basket-bowling_pl": { file: "tv_jo_basket-bowling", credit: "Thomas Vivet", v: 1 },
    "jo_chez-maxime": { file: "tv_jo_chez-maxime", credit: "Thomas Vivet", v: 1 },
    "jo_demon-attack_pl": { file: "tv_jo_demon-attack", credit: "Thomas Vivet", v: 1 },
    "jo_exojet_pl": { file: "tv_jo_exojet", credit: "Thomas Vivet", v: 1 },
    "jo_flipper_pl": { file: "tv_jo_flipper", credit: "Thomas Vivet", v: 1 },
    "jo_le-tresor-englouti_pl": { file: "tv_jo_le-tresor-englouti", credit: "Thomas Vivet", v: 1 },
    "vp_07": { file: "tv_vp_07", credit: "Thomas Vivet", v: 1 },
    "Vp07_F": { file: "tv_vp_07", credit: "Thomas Vivet", v: 1 },
    "vp_15": { file: "tv_vp_15", credit: "Thomas Vivet", v: 1 },
    "vp_44": { file: "tv_vp_44", credit: "Thomas Vivet", v: 1 },
  };
  window.ANIM_COVERS = ANIM_COVERS;

  // Animated versions of images in a game page's "Extras" section (box scans,
  // maps...), keyed by the extras file name. The video replaces the image in
  // place; the "Open ... in a new tab" link below it still opens the scan.
  var ANIM_EXTRAS = {
    // Quest for the Rings - the full wraparound box art, animated by Thomas
    // Vivet (artwork only, no text). The front cover above stays Mike's.
    "quest-for-the-rings-box.jpg": { file: "tv_vp_42_box", credit: "Thomas Vivet", v: 1 }
  };
  window.ANIM_EXTRAS = ANIM_EXTRAS;

  var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  if (mm("(prefers-reduced-motion: reduce)")) return;
  var NO_HOVER = mm("(hover: none)");
  // Cover ids may contain "+" (Vp11+_F), raw or %2B-encoded.
  var RE = /covers\/([^\/?#]+?)\.(?:png|jpg)(?:\?|$)/;

  var CREDIT = {
    en: "Animated cover", nl: "Geanimeerde hoes", de: "Animiertes Cover",
    fr: "Jaquette animée", pt: "Capa animada", ja: "うごく パッケージ"
  };
  var BOX_CREDIT = {
    en: "Animation", nl: "Animatie", de: "Animation",
    fr: "Animation", pt: "Animação", ja: "アニメーション"
  };
  function lang() {
    try { return (window.currentLang && window.currentLang()) || "en"; } catch (e) { return "en"; }
  }

  // Game page: "Animated cover: <credit>" as its own line right under the
  // history's "Source: ..." line (or under the history text if there is no
  // source). The info column may render a moment after the cover, so retry
  // briefly until it exists.
  function addCreditLine(credit) {
    var tries = 0;
    (function place() {
      if (document.querySelector(".anim-cover-credit")) return;
      var after = document.querySelector(".history-source") || document.querySelector(".history-text");
      if (!after) { if (++tries < 40) setTimeout(place, 100); return; }
      var p = document.createElement("p");
      p.className = "history-source anim-credit-line anim-cover-credit";
      p.textContent = (CREDIT[lang()] || CREDIT.en) + ": " + credit;
      after.parentNode.insertBefore(p, after.nextSibling);
    })();
  }

  function entryFor(img) {
    var m = RE.exec(img.getAttribute("src") || "");
    if (!m) return null;
    var id = m[1];
    try { id = decodeURIComponent(id); } catch (e) {}
    return ANIM_COVERS[id] || null;
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
      if (e.credit) addCreditLine(e.credit);
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

  function enhanceExtra(img) {
    var m = /(?:^|\/)extras\/([^\/?#]+)$/.exec(img.getAttribute("src") || "");
    var e = m && ANIM_EXTRAS[m[1]];
    if (!e) return;
    img.dataset.anim = "1";
    var v = document.createElement("video");
    v.className = img.className;
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.setAttribute("aria-label", img.alt);
    v.poster = img.getAttribute("src");
    v.preload = "metadata";
    v.style.display = "block";
    v.src = "covers/anim/" + e.file + ".mp4?v=" + (e.v || 1);
    v.addEventListener("error", function () { if (v.parentNode) v.parentNode.replaceChild(img, v); });
    img.parentNode.replaceChild(v, img);
    if (io) io.observe(v); else play(v);
    if (e.credit) {
      var c = document.createElement("p");
      c.className = "extras-dl anim-credit-line";
      c.textContent = (BOX_CREDIT[lang()] || BOX_CREDIT.en) + ": " + e.credit;
      v.parentNode.insertBefore(c, v.nextSibling);
    }
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    var imgs = root.tagName === "IMG" ? [root] : root.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.dataset.anim) continue;
      if (img.classList.contains("extras-img")) { enhanceExtra(img); continue; }
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
