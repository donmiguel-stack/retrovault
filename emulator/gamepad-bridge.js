// Bridges a paired Bluetooth gamepad (see ../joystick-adapter/) into the
// same keyboard inputs webretro already listens for. Reuses fakeKey(),
// which base.js defines and already uses internally for its on-screen
// virtual keyboard - so this drives the emulator exactly the way a real
// keypress would, no core/webretro changes required.
//
// Button order below must match the ESP32 firmware's button numbers
// (see joystick-adapter/videopac_ble_joystick.ino): 1=Up 2=Down 3=Left
// 4=Right 5=Fire, which the Gamepad API exposes as buttons[0..4].
(function () {
  var BUTTON_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyG"];
  var lastState = [false, false, false, false, false];
  var connectedPad = null;

  function poll() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    var pad = null;
    for (var i = 0; i < pads.length; i++) {
      if (pads[i]) { pad = pads[i]; break; }
    }

    if (pad && !connectedPad) {
      connectedPad = pad;
      console.log("[gamepad-bridge] connected: " + pad.id);
    } else if (!pad && connectedPad) {
      connectedPad = null;
      console.log("[gamepad-bridge] disconnected");
    }

    if (pad) {
      for (var b = 0; b < BUTTON_KEYS.length; b++) {
        var isPressed = !!(pad.buttons[b] && pad.buttons[b].pressed);
        if (isPressed !== lastState[b]) {
          lastState[b] = isPressed;
          if (typeof fakeKey === "function") {
            fakeKey(isPressed ? "keydown" : "keyup", { code: BUTTON_KEYS[b] });
          }
        }
      }
    }

    requestAnimationFrame(poll);
  }

  window.addEventListener("gamepadconnected", function (e) {
    console.log("[gamepad-bridge] gamepadconnected event: " + e.gamepad.id);
  });

  requestAnimationFrame(poll);
})();
