// Game controllers on the MS-DOS player (js-dos v8).
//
// js-dos reads no physical gamepad of its own, so this polls the pad and
// sends key events straight into DOSBox through the command interface js-dos
// hands over on "ci-ready" (dos.html passes it to attach()). Key numbers are
// js-dos's KBD_* codes (GLFW numbering).
//
// Layout from ../pad.js (VaultPad), "pc" shelf: D-pad + left stick = arrow
// keys, the other buttons = whatever the game page's Controller panel says
// (Ctrl, Space, Enter...). DOS games all use their own keys, which is why
// every button is remappable there.
window.VaultDosPad = (function () {
  var KBD = { up: 265, down: 264, left: 263, right: 262, ctrl: 341, alt: 342, shift: 340,
              space: 32, enter: 257, esc: 256, y: 89, n: 78, key1: 49, key2: 50, f1: 290 };
  var ci = null, down = {}, running = false;
  function poll() {
    var P = window.VaultPad;
    var pad = P && P.firstPad();
    var now = pad ? P.actionsHeld("pc", pad) : {};
    var want = {};
    Object.keys(now).forEach(function (a) { if (KBD[a]) want[KBD[a]] = true; });
    if (ci && typeof ci.sendKeyEvent === "function") {
      Object.keys(want).forEach(function (k) { if (!down[k]) ci.sendKeyEvent(+k, true); });
      Object.keys(down).forEach(function (k) { if (!want[k]) ci.sendKeyEvent(+k, false); });
    }
    down = want;
    requestAnimationFrame(poll);
  }
  return {
    attach: function (commandInterface) {
      ci = commandInterface;
      if (!running) { running = true; requestAnimationFrame(poll); }
    }
  };
})();
