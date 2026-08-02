// Recreates the scattered rainbow "SELECT GAME" attract screen from the
// original PicoPAC/Videopac boot sequence, as a dismissable overlay.
// Dismiss on click, any keypress, or any gamepad button (covers the
// BLE joystick from joystick-adapter/, if paired - polled directly here
// since this page doesn't load the emulator's gamepad-bridge.js).
(function () {
  // Single centered line, each letter individually colored, matching the
  // real G7400 "SELECT GAME" attract screen (not scattered/repeated).
  var TEXT = "SELECT GAME";
  var LETTER_COLORS = ["#4ade80", "#ff6fc9", "#b39bff", "#3bffe9", "#ffffff", "#ffd23b",
                        "#ff4d4d", "#ff9d3b", "#a6e13c", "#5c8dff"];

  var splash = document.getElementById("bootSplash");
  var field = document.getElementById("bootSplashField");
  if (!splash || !field) return;

  var html = "";
  var letterIndex = 0;
  for (var i = 0; i < TEXT.length; i++) {
    var ch = TEXT.charAt(i);
    if (ch === " ") {
      html += '<span class="sg-space"></span>';
    } else {
      var color = LETTER_COLORS[letterIndex % LETTER_COLORS.length];
      html += '<span class="sg-letter" style="color:' + color + '">' + ch + '</span>';
      letterIndex++;
    }
  }
  field.innerHTML = html;

  function playSynthesizedChime() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx();
      var notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
      notes.forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        var startAt = ctx.currentTime + i * 0.11;
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.15, startAt + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startAt);
        osc.stop(startAt + 0.22);
      });
    } catch (e) {
      // Autoplay blocked or Web Audio unavailable - not critical, splash still works.
    }
  }

  var soundPending = true;
  function playChime() {
    var audio = new Audio("assets/select-game-chime.mp3");
    audio.volume = 0.8;
    var played = audio.play();
    if (played && played.then) {
      played.then(function () {
        soundPending = false;
      }, function () {
        // Blocked (no user gesture yet) or file missing. If dismiss() is
        // what's calling us, that IS a user gesture, so try the
        // synthesized beep as a same-gesture fallback instead of giving up.
        if (!soundPending) return;
        playSynthesizedChime();
      });
    } else {
      soundPending = false;
    }
  }

  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    if (soundPending) playChime();
    splash.classList.add("hide");
    window.setTimeout(function () { splash.style.display = "none"; }, 500);
    document.removeEventListener("click", dismiss);
    document.removeEventListener("keydown", dismiss);
  }

  document.addEventListener("click", dismiss);
  document.addEventListener("keydown", dismiss);

  (function pollGamepad() {
    if (dismissed) return;
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var pad = pads[i];
      if (!pad) continue;
      for (var b = 0; b < pad.buttons.length; b++) {
        if (pad.buttons[b].pressed) { dismiss(); return; }
      }
    }
    requestAnimationFrame(pollGamepad);
  })();

  // Autoplay policies often block sound before any user gesture - try anyway,
  // and it's fine either way, the visual still plays.
  playChime();
})();
