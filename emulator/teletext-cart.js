/* Retro Vault - the G7400 Teletext cartridge, inside the emulator.
 *
 * game.html starts the "Teletext (Retro Vault concept)" cartridge like any
 * other Videopac game, with &teletext=1 added. The cartridge itself is real:
 * homebrew-downloads/teletext-vault.bin, 2 KB of 8048 code that jumps to the
 * BIOS selectgame routine, so the console boots, shows SELECT GAME and waits
 * for a key - exactly as a 1983 cartridge would. Key 1 starts it; any other
 * key goes back to SELECT GAME.
 *
 * What the cartridge would then do on real hardware (fetch a page over WiFi
 * and copy it into the EF9340) can't happen inside an emulator, so this file
 * plays that part: when 1 is pressed on SELECT GAME it lays the Vault's
 * teletext renderer (../teletext.js) over the console picture. From then on
 * the keys belong to teletext; ✕ (or F5, the console RESET key) reloads the
 * page, which is the same as pressing RESET on the console.
 */
(function () {
  "use strict";
  var q = {};
  try { q = Object.fromEntries(new URLSearchParams(location.search)); } catch (e) {}
  if (q.teletext !== "1") return;

  var opened = false;

  // The console is on SELECT GAME once the core is running: the loading
  // panel and webretro's own Start button are both gone by then.
  function consoleReady() {
    var ld = document.getElementById("loadingdiv");
    var sb = document.getElementById("startbutton");
    var ldOff = !ld || getComputedStyle(ld).display === "none";
    var sbOff = !sb || getComputedStyle(sb).display === "none";
    return ldOff && sbOff && !!(window.Module && window.Module.calledRun);
  }

  function isKey1(e) {
    return e.code === "Digit1" || e.code === "Numpad1" || e.key === "1";
  }

  // Same language the rest of the Vault uses (i18n.js isn't loaded here).
  if (!window.currentLang) {
    window.currentLang = function () {
      var v = null;
      try { v = localStorage.getItem("VideopacVault_lang"); } catch (e) {}
      return ["en", "nl", "de", "fr", "pt", "ja"].indexOf(v) !== -1 ? v :
        ((navigator.language || "en").slice(0, 2) === "nl" ? "nl" : "en");
    };
  }

  function openTeletext() {
    if (opened) return;
    opened = true;

    var css = document.createElement("style");
    css.textContent =
      "#ttRoot{position:absolute;left:0;right:0;bottom:0;top:var(--menuheight,0px);z-index:60;" +
      "background:#000;display:flex;align-items:center;justify-content:center;}" +
      "#ttRoot canvas{display:block;height:100%;max-width:100%;aspect-ratio:4/3;object-fit:contain;" +
      "image-rendering:pixelated;image-rendering:crisp-edges;cursor:default;}" +
      "#ttRoot .tt-close{position:absolute;top:10px;right:12px;font:14px/1 system-ui,sans-serif;" +
      "color:#ddd;background:rgba(40,40,40,.85);border:1px solid #555;border-radius:6px;" +
      "padding:7px 10px;cursor:pointer;opacity:.55;}" +
      "#ttRoot .tt-close:hover{opacity:1;}" +
      "#ttRoot .tt-hint{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);" +
      "font:13px system-ui,sans-serif;color:#eee;background:rgba(20,20,20,.9);border:1px solid #444;" +
      "border-radius:8px;padding:7px 12px;white-space:nowrap;pointer-events:none;}";
    document.head.appendChild(css);

    var root = document.createElement("div");
    root.id = "ttRoot";
    var cv = document.createElement("canvas");
    cv.id = "ttScreen"; cv.width = 320; cv.height = 250;
    root.appendChild(cv);
    var close = document.createElement("button");
    close.className = "tt-close"; close.type = "button";
    close.title = "Back to the console (RESET)";
    close.textContent = "✕ RESET";
    close.addEventListener("click", function () { location.reload(); });
    root.appendChild(close);
    var hint = document.createElement("div");
    hint.className = "tt-hint";
    hint.textContent = (window.currentLang() === "nl")
      ? "Typ een paginanummer · ← → bladeren · R G Y B Fastext · 400 = Retro Vault"
      : "Type a page number · ← → turn pages · R G Y B Fastext · 400 = Retro Vault";
    root.appendChild(hint);
    (document.getElementById("mainarea") || document.body).appendChild(root);
    setTimeout(function () { hint.style.transition = "opacity 1s"; hint.style.opacity = "0"; }, 6000);

    // The console's own sound would carry on underneath; nothing to hear in
    // a looping cartridge, but stop the core so it doesn't burn CPU either.
    try { if (window.Module && Module.pauseMainLoop) Module.pauseMainLoop(); } catch (e) {}

    // F5 is the console RESET key everywhere else on the Vault.
    window.addEventListener("keydown", function (e) {
      if (e.key === "F5") { e.preventDefault(); location.reload(); }
    }, true);

    window.VAULT_TT_EMBED = true;
    var s = document.createElement("script");
    s.src = "../teletext.js?v=3";
    document.body.appendChild(s);
  }

  // Key 1 on SELECT GAME. Real key presses and the ones the on-screen console
  // keyboard and the gamepad bridge synthesise (dispatched on document) all
  // pass through window in the capture phase. The cartridge gets the key too,
  // and starts - the overlay follows a moment later, as a page would.
  window.addEventListener("keydown", function (e) {
    if (opened || !isKey1(e) || !consoleReady()) return;
    setTimeout(openTeletext, 350);
  }, true);
})();
