// Game controllers (2026-09-24) - one button layout per shelf, shared by the
// game page's Controller panel (game-page.js) and the players that read the
// pad (emulator/gamepad-bridge.js for Videopac + C64, emulator/dos-pad.js
// for MS-DOS). The Amiga player reads controllers itself (vAmigaWeb's port
// dropdowns), so it has no layout here.
//
// Directions always come from the D-pad and the left stick. The ten face /
// shoulder / menu buttons each map to one action from the shelf's list;
// changes are saved in this browser under VideopacVault_padmap and apply to
// every game on that shelf.
//
// Button numbers are the W3C "standard gamepad" layout, which Chrome, Edge,
// Firefox and Safari all use for Xbox, PlayStation, Switch Pro and most
// generic USB/Bluetooth pads.
//
// The one exception is the DIY Videopac joystick adapter (joystick-adapter/,
// reports itself as "Videopac Joystick"): buttons 0-4 are Up/Down/Left/
// Right/Fire there, fixed, exactly as before this file existed.
window.VaultPad = (function () {
  var KEY = "VideopacVault_padmap";
  var BUTTONS = [
    { i: 0, label: "A · ✕" }, { i: 1, label: "B · ○" }, { i: 2, label: "X · □" }, { i: 3, label: "Y · △" },
    { i: 4, label: "LB · L1" }, { i: 5, label: "RB · R1" }, { i: 6, label: "LT · L2" }, { i: 7, label: "RT · R2" },
    { i: 8, label: "Back · Select" }, { i: 9, label: "Start · Options" }
  ];
  var ACTIONS = {
    vp:  ["none", "fire", "key1", "key2", "key3", "key4", "space", "reset", "save", "load"],
    c64: ["none", "fire", "space", "return", "key1", "key2", "save", "load"],
    pc:  ["none", "ctrl", "alt", "shift", "space", "enter", "esc", "y", "n", "key1", "key2", "f1"]
  };
  var DEFAULTS = {
    vp:  { 0: "fire", 1: "fire", 9: "key1" },
    c64: { 0: "fire", 1: "fire", 2: "space", 3: "return", 9: "space" },
    pc:  { 0: "ctrl", 1: "space", 2: "alt", 3: "enter", 4: "shift", 8: "esc", 9: "enter" }
  };
  function shelfOf(platform) {
    if (platform === "C64") return "c64";
    if (platform === "PC") return "pc";
    if (platform === "Amiga") return "amiga";
    return "vp";
  }
  function readAll() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || "{}"); return o && typeof o === "object" ? o : {}; }
    catch (e) { return {}; }
  }
  function writeAll(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  // button index -> action, defaults with this browser's changes on top
  function layout(shelf) {
    var out = {}, d = DEFAULTS[shelf] || {}, saved = readAll()[shelf] || {};
    BUTTONS.forEach(function (b) {
      var a = saved[b.i] !== undefined ? saved[b.i] : (d[b.i] || "none");
      if ((ACTIONS[shelf] || []).indexOf(a) === -1) a = "none";
      out[b.i] = a;
    });
    return out;
  }
  function set(shelf, button, action) {
    var all = readAll();
    all[shelf] = all[shelf] || {};
    all[shelf][button] = action;
    writeAll(all);
  }
  function reset(shelf) { var all = readAll(); delete all[shelf]; writeAll(all); }
  function isAdapter(pad) { return !!pad && /videopac joystick/i.test(pad.id || ""); }
  function firstPad() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) if (pads[i] && pads[i].connected !== false) return pads[i];
    return null;
  }
  function pressed(pad, i) { var b = pad.buttons[i]; return !!(b && (b.pressed || b.value > 0.5)); }
  // {up, down, left, right, buttons:{index:true}} for the current frame
  function read(pad) {
    var s = { up: false, down: false, left: false, right: false, buttons: {} };
    if (!pad) return s;
    if (isAdapter(pad)) {
      s.up = pressed(pad, 0); s.down = pressed(pad, 1); s.left = pressed(pad, 2); s.right = pressed(pad, 3);
      if (pressed(pad, 4)) s.buttons.adapterFire = true;
      return s;
    }
    var ax = pad.axes || [], x = ax[0] || 0, y = ax[1] || 0;
    s.up = pressed(pad, 12) || y < -0.5;
    s.down = pressed(pad, 13) || y > 0.5;
    s.left = pressed(pad, 14) || x < -0.5;
    s.right = pressed(pad, 15) || x > 0.5;
    BUTTONS.forEach(function (b) { if (pressed(pad, b.i)) s.buttons[b.i] = true; });
    return s;
  }
  // the set of actions held right now: "up", "fire", "key1", ...
  function actionsHeld(shelf, pad) {
    var s = read(pad), held = {};
    ["up", "down", "left", "right"].forEach(function (d) { if (s[d]) held[d] = true; });
    if (s.buttons.adapterFire) held.fire = true;
    var map = layout(shelf);
    Object.keys(s.buttons).forEach(function (i) {
      var a = map[i];
      if (a && a !== "none") held[a] = true;
    });
    return held;
  }
  return { BUTTONS: BUTTONS, ACTIONS: ACTIONS, DEFAULTS: DEFAULTS, shelfOf: shelfOf, layout: layout,
           set: set, reset: reset, isAdapter: isAdapter, firstPad: firstPad, read: read, actionsHeld: actionsHeld };
})();
