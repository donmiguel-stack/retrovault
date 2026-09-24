// Game controllers on the Videopac + C64 player (webretro).
//
// Turns whatever pad is connected into the key presses this player already
// understands, via fakeKey() from assets/base.js - the same route the
// on-screen keyboard uses, so no core or RetroArch changes are involved.
//
// The layout comes from ../pad.js (VaultPad): D-pad + left stick are the
// joystick; the other buttons do whatever the game page's Controller panel
// says for this shelf (fire, a console key, save/load state, reset...).
// Joystick keys are looked up in the live keybinds (keybindsObj), so a rebind
// in the Controls menu or a per-game override (&keys=j2arrows, which moves
// the game to joystick 2) carries over to the pad automatically.
//
// The DIY Videopac joystick adapter (../joystick-adapter/) keeps its fixed
// layout: buttons 0-4 = Up/Down/Left/Right/Fire - VaultPad.read() handles it.
// If pad.js is missing (an install whose top-level files predate it), the
// adapter layout is used for every pad, which is how this file behaved
// before 2026-09-24.
(function () {
  var shelf = (typeof queries === "object" && queries.core === "vice_x64") ? "c64" : "vp";
  var player = (typeof queries === "object" && queries.keys === "j2arrows") ? 2 : 1;
  var held = {};          // action -> true, last frame
  var down = {};          // key code -> true, what we have pressed
  var announced = null;

  function bind(name) {
    var id = (typeof keybindsObj === "object") ? keybindsObj[name] : null;
    return id && id !== "nul" && typeof configIDToCode === "function" ? configIDToCode(id) : null;
  }
  // action -> key code(s) to hold while the action is held
  function codesFor(a) {
    var p = "input_player" + player + "_";
    switch (a) {
      case "up": case "down": case "left": case "right": return [bind(p + a)];
      case "fire": return [bind(p + "b")];
      case "key1": return ["Digit1"];
      case "key2": return ["Digit2"];
      case "key3": return ["Digit3"];
      case "key4": return ["Digit4"];
      case "space": return ["Space"];
      case "return": return ["Enter"];
      case "save": return [bind("input_save_state")];
      case "load": return [bind("input_load_state")];
    }
    return [];
  }
  function legacyHeld(pad) {
    var h = {}, names = ["up", "down", "left", "right", "fire"];
    for (var b = 0; b < 5; b++) if (pad.buttons[b] && pad.buttons[b].pressed) h[names[b]] = true;
    return h;
  }
  function poll() {
    var P = window.VaultPad;
    var pad = P ? P.firstPad() : (function () {
      var ps = navigator.getGamepads ? navigator.getGamepads() : [];
      for (var i = 0; i < ps.length; i++) if (ps[i]) return ps[i];
      return null;
    })();
    if (pad && announced !== pad.id) { announced = pad.id; console.log("[gamepad-bridge] connected: " + pad.id); }
    if (!pad && announced) { announced = null; console.log("[gamepad-bridge] disconnected"); }

    var now = pad ? (P ? P.actionsHeld(shelf, pad) : legacyHeld(pad)) : {};
    // reset is a one-shot command, not a held key (see o2resetkey in base.js)
    if (now.reset && !held.reset && typeof Module === "object" && typeof Module._cmd_reset === "function") {
      Module._cmd_reset();
    }
    held = now;

    var want = {};
    Object.keys(now).forEach(function (a) {
      codesFor(a).forEach(function (c) { if (c) want[c] = true; });
    });
    if (typeof fakeKey === "function") {
      Object.keys(want).forEach(function (c) { if (!down[c]) fakeKey("keydown", { code: c }); });
      Object.keys(down).forEach(function (c) { if (!want[c]) fakeKey("keyup", { code: c }); });
    }
    down = want;
    requestAnimationFrame(poll);
  }
  window.addEventListener("gamepadconnected", function (e) {
    console.log("[gamepad-bridge] gamepadconnected event: " + e.gamepad.id);
  });
  requestAnimationFrame(poll);
})();
