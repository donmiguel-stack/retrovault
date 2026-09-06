/* Demo mode - only wakes up on the public read-only mirrors
   (demo.retrovault.world, retrovault.fun, *.github.io). On localhost and
   file:// - i.e. every real install - this whole file is a no-op, so it is
   safe to ship everywhere and never needs a config switch.

   What it does on the demo hosts:
   - a banner up top saying this is the browse-only demo, linking to the
     download page on retrovault.world;
   - hides the Setup and Update buttons (nothing to set up or update on a
     read-only mirror; the update endpoint doesn't exist there anyway);
   - catches clicks on any START button before game.html's own handler
     runs, and swaps in a "download the Vault to play" note instead of
     navigating to an emulator that has no ROM or BIOS to load. C64/PC
     pages never show START without the file (they HEAD-check first), so
     in practice this guards the Videopac shelf.
   - EXCEPT when hosted.js is present: the BIOS and the abandonware part
     of all three shelves (Videopac since 2026-09-04, C64 and MS-DOS since
     2026-09-06) then live on the Vault's own file host (retrovault.world,
     never in this repo), and game.html only shows START for those after
     a HEAD check against that host - so those clicks are let through and
     the game really plays. */
(function () {
  "use strict";

  var h = location.hostname;
  var DEMO = h === "demo.retrovault.world" ||
             h === "retrovault.fun" || h === "www.retrovault.fun" ||
             /\.github\.io$/.test(h);
  if (!DEMO) return;

  var SITE = "https://retrovault.world";

  var css = document.createElement("style");
  css.textContent =
    ".demo-banner{display:flex;justify-content:center;align-items:center;gap:8px;" +
    "flex-wrap:wrap;padding:9px 16px;font-size:13px;text-align:center;" +
    "background:rgba(91,141,239,.12);border-bottom:1px solid rgba(91,141,239,.4);" +
    "color:var(--text-dim,#9aa3af);}" +
    ".demo-banner b{color:var(--text,#e9edf2);}" +
    ".demo-banner a{color:var(--accent,#5b8def);text-decoration:none;font-weight:600;}" +
    ".demo-banner a:hover{text-decoration:underline;}" +
    ".demo-note{margin:10px 0 0;font-size:13px;color:var(--accent,#5b8def);max-width:52ch;}";
  document.head.appendChild(css);

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var b = document.createElement("div");
    b.className = "demo-banner";
    var hosted = !!(window.HOSTED_FILES && window.HOSTED_FILES.base);
    b.innerHTML = hosted ?
      "<b>Live demo</b> — out-of-print games on all three shelves play right " +
      "here (files come from retrovault.world); titles still on sale need your own copy. " +
      "<a href=\"" + SITE + "/#download\">Get your own copy&nbsp;→</a>" :
      "<b>Live demo</b> — browse the whole Vault; games don't play here " +
      "because it ships without ROMs. " +
      "<a href=\"" + SITE + "/#download\">Get your own copy&nbsp;→</a>";
    document.body.insertBefore(b, document.body.firstChild);

    // A read-only mirror has nothing to set up and nothing to update.
    ["setupBtn", "updateBtn"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  });

  // Capture phase: this runs before the button's own click handler, so the
  // emulator navigation in game.html never fires on the demo hosts.
  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest && e.target.closest(".start-btn");
    if (!btn) return;
    // game.html marks START with data-hosted when the ROM is on the Vault's
    // own file host (hosted.js) - those play for real on the demo too, and
    // the homebrew-downloads/ titles do as well once the BIOS is hosted
    // (game.html passes &biosbase= for every Videopac start).
    if (btn.dataset.hosted || (btn.dataset.dlfallback && window.HOSTED_FILES && window.HOSTED_FILES.bios)) return;
    e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    e.stopPropagation();
    if (btn.parentElement && !btn.parentElement.querySelector(".demo-note")) {
      var note = document.createElement("p");
      note.className = "demo-note";
      note.innerHTML =
        "This is the browse-only demo. " +
        "<a href=\"" + SITE + "/#download\">Download the Vault</a>, add your " +
        "own game files, and this button plays for real.";
      btn.parentElement.appendChild(note);
    }
  }, true);
})();
