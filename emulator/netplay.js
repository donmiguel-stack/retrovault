// Retro Vault "Play together" - host side (emulator/index.html).
//
// Host and stream: this browser runs the emulator as always and streams its
// picture and sound to one friend over WebRTC (peer to peer). The friend's
// browser (netplay-guest.html) sends their joystick and console-keyboard
// presses back over a data channel; they arrive here as joystick 2, through
// fakeKey() from assets/base.js - the same route the gamepad bridge and the
// on-screen keyboard use, so the core and RetroArch are untouched.
//
// Joystick 2 normally sits on W A S D + Q, which are also real keys on the
// console keyboard (see the j2arrows note in base.js). With &netplay=host,
// base.js moves joystick 2 to keys the console cannot see (PageUp, PageDown,
// Home, End, Quote), so the friend's joystick never types on the console.
// Pressing "Play together" without that flag reloads the page with it.
//
// C64 shelf (VICE): same mechanism. RetroPad 1 is the C64's joystick port 2,
// RetroPad 2 is port 1, so the friend gets port 1 and the host keeps port 2
// (player 1 in most two-player C64 games). "Swap ports" in the panel reloads
// with &npswap=1 for games that want it the other way round. The friend's
// page is told the system and port (&sys=c64&port=N) for its help text.
// The friend's joystick rides on keypad 8/2/4/6 + 0 here: VICE treats End as
// RESET and PageDown/Home/quote as C64 keys (see base.js).
// F1-F4 stay off the friend's list: on the host they are the menu, save
// state, load state and screenshot keys.
//
// Signalling: the two browsers only need to swap one offer and one answer
// (ICE gathered up front), stored for a short while by a tiny PHP script on
// retrovault.world (netplay/signal.php). No accounts, no game data on the
// server: the stream goes directly between the two browsers.
// Override for testing: &signal=<url>. TURN for strict networks: set
// window.RV_NETPLAY_ICE before this file loads.
(function () {
  "use strict";
  var Q = (typeof queries === "object" && queries) || Object.fromEntries(new URLSearchParams(location.search));
  // Videopac (O2EM) and C64 (VICE) shelves. Amiga and DOS run on pages of
  // their own and are not wired up yet.
  var SYS = (!Q.core || Q.core === "o2em") ? "vp" : (Q.core === "vice_x64" ? "c64" : null);
  if (!SYS) return;
  // C64: RetroPad 1 = joystick port 2, RetroPad 2 = port 1 (see base.js).
  // &npswap=1 gives the friend RetroPad 1 instead.
  var SWAP = SYS === "c64" && Q.npswap === "1";
  var FRIEND_PAD = SWAP ? "player1" : "player2";
  var FRIEND_PORT = SWAP ? 2 : 1, HOST_PORT = SWAP ? 1 : 2;
  var TXT = SYS === "c64" ? {
    who: "joystick port " + FRIEND_PORT,
    confirm: "Play together restarts this game so your friend gets the second joystick.\n\nContinue?",
    intro: "Send this link to a friend. They see and hear the game, and control the C64's <b>joystick port " + FRIEND_PORT + "</b> with the arrow keys and Space; letters, digits and Enter type on the C64 keyboard.",
    you: "You keep joystick port " + HOST_PORT + " (arrow keys + G) and the rest of the keyboard. The game streams straight from your browser to your friend's; nothing is uploaded."
  } : {
    who: "joystick 2",
    confirm: "Play together restarts this game so your friend gets joystick 2.\n\nContinue?",
    intro: "Send this link to a friend. They see and hear the game, and play <b>joystick 2</b> with the arrow keys and Space; keys like 1 or Y type on the console keyboard.",
    you: "You keep joystick 1. The game streams straight from your browser to your friend's; nothing is uploaded."
  };

  var SIGNAL = Q.signal || window.RV_NETPLAY_SIGNAL || "https://retrovault.world/netplay/signal.php";
  var ICE = window.RV_NETPLAY_ICE || [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun.cloudflare.com:3478" }];

  // ---- sound tap -------------------------------------------------------
  // RetroArch's web audio driver plays through an AudioContext of its own.
  // Every node it connects to the speakers is also connected to a
  // MediaStream destination, so the sound can be sent to the friend.
  var taps = new WeakMap();
  function tapFor(ctx) {
    var t = taps.get(ctx);
    if (!t && ctx && ctx.createMediaStreamDestination) { t = ctx.createMediaStreamDestination(); taps.set(ctx, t); window.__rvNetAudio = t; }
    return t;
  }
  var origConnect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (dest) {
    var r = origConnect.apply(this, arguments);
    try {
      if (dest && this.context && dest === this.context.destination) {
        var t = tapFor(this.context); if (t) origConnect.call(this, t);
      }
    } catch (e) {}
    return r;
  };

  // ---- joystick-2 keys -------------------------------------------------
  function bindCode(name, fallback) {
    try {
      var id = keybindsObj[name];
      if (id && id !== "nul" && typeof configIDToCode === "function") return configIDToCode(id) || fallback;
    } catch (e) {}
    return fallback;
  }
  function joyCode(dir) {
    var p = "input_" + FRIEND_PAD + "_";
    // fallbacks only; the real keys come from base.js's &netplay=host binds
    var map = SYS === "c64" ?
      { up: [p + "up", "Numpad8"], down: [p + "down", "Numpad2"], left: [p + "left", "Numpad4"],
        right: [p + "right", "Numpad6"], fire: [p + "b", "Numpad0"] } :
      { up: [p + "up", "PageUp"], down: [p + "down", "PageDown"], left: [p + "left", "Home"],
        right: [p + "right", "End"], fire: [p + "b", "Quote"] };
    var m = map[dir]; return m ? bindCode(m[0], m[1]) : null;
  }
  // console-keyboard keys the friend may type: letters, digits, space, enter,
  // and the few symbol keys the Videopac keyboard has
  var KEY_OK = /^(Key[A-Z]|Digit[0-9]|Space|Enter|Period|Slash|Minus|Equal|Backspace)$/;
  var held = {};
  function press(code, down) {
    if (!code || typeof fakeKey !== "function") return;
    if (down && held[code]) return;
    if (!down && !held[code]) return;
    held[code] = down;
    fakeKey(down ? "keydown" : "keyup", { code: code });
  }
  function releaseAll() { Object.keys(held).forEach(function (c) { if (held[c]) press(c, false); }); }

  // ---- UI --------------------------------------------------------------
  var css = document.createElement("style");
  css.textContent =
    "#rvnp-btn{position:fixed;right:14px;bottom:14px;z-index:9999;background:#1d6f42;color:#fff;border:0;border-radius:20px;padding:9px 16px;font:600 14px system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 8px #0008}" +
    "#rvnp-btn:hover{background:#238a52}" +
    "#rvnp-panel{position:fixed;right:14px;bottom:62px;z-index:9999;width:340px;background:#15171c;color:#e8e8e8;border:1px solid #333;border-radius:10px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 4px 18px #000a}" +
    "#rvnp-panel h3{margin:0 0 6px;font-size:15px}#rvnp-panel p{margin:6px 0}" +
    "#rvnp-panel input{width:100%;box-sizing:border-box;background:#0d0e11;color:#cfe;border:1px solid #444;border-radius:6px;padding:6px;font:12px monospace}" +
    "#rvnp-panel button{margin:8px 6px 0 0;background:#2a2d35;color:#fff;border:1px solid #444;border-radius:6px;padding:5px 10px;cursor:pointer;font:13px system-ui}" +
    "#rvnp-status{font-weight:600}#rvnp-status.ok{color:#5fd38d}#rvnp-status.bad{color:#ff8a7a}";
  document.head.appendChild(css);

  var btn, panel, statusEl, pc = null, dc = null, room = null, polling = null;

  function setStatus(t, cls) { if (statusEl) { statusEl.textContent = t; statusEl.className = cls || ""; } }

  function makeUI() {
    btn = document.createElement("button");
    btn.id = "rvnp-btn"; btn.type = "button";
    btn.textContent = "👥 Play together";
    btn.title = "Invite a friend to play " + TXT.who + " over the internet";
    btn.addEventListener("click", onButton);
    document.body.appendChild(btn);
    // Started from the game page's own "Play together" button
    // (&netplay=host&npopen=1): the page already loaded in host mode, so no
    // restart - open the invite panel by itself once the game is running.
    // "Running" = the audio tap exists (sound reaches the friend from the
    // first frame); after 30 s it opens anyway.
    if (Q.netplay === "host" && Q.npopen === "1") {
      var tries = 0;
      (function waitReady() {
        if (panel || pc) return;
        if (window.__rvNetAudio || ++tries > 60) { openPanel(); if (!pc) startHosting(); return; }
        setTimeout(waitReady, 500);
      })();
    }
  }

  function onButton() {
    if (panel) { panel.remove(); panel = null; return; }
    if (Q.netplay !== "host") {
      if (!confirm(TXT.confirm)) return;
      var u = new URL(location.href); u.searchParams.set("netplay", "host");
      location.href = u.toString(); return;
    }
    openPanel();
    if (!pc) startHosting();
  }

  function openPanel() {
    panel = document.createElement("div");
    panel.id = "rvnp-panel";
    panel.innerHTML =
      "<h3>Play together</h3>" +
      "<p>" + TXT.intro + "</p>" +
      "<input id='rvnp-link' readonly value='creating a room…'>" +
      "<div><button id='rvnp-copy' type='button'>Copy link</button><button id='rvnp-stop' type='button'>Stop</button></div>" +
      "<p>Status: <span id='rvnp-status'>starting…</span></p>" +
      (SYS === "c64" ?
        "<p style='font-size:12px;color:#bbb'>Most two-player C64 games put player 1 in port 2. If this one wants it the other way round, swap before you send the link (the game restarts).<br>" +
        "<button id='rvnp-swap' type='button'>⇄ Swap ports</button></p>" : "") +
      "<p style='font-size:12px;color:#999'>" + TXT.you + "</p>";
    document.body.appendChild(panel);
    statusEl = panel.querySelector("#rvnp-status");
    var sw = panel.querySelector("#rvnp-swap");
    if (sw) sw.onclick = function () {
      if (dc && dc.readyState === "open" && !confirm("Your friend is connected. Swapping restarts the game and they will need a new link.\n\nSwap anyway?")) return;
      var u = new URL(location.href);
      if (SWAP) u.searchParams.delete("npswap"); else u.searchParams.set("npswap", "1");
      u.searchParams.set("netplay", "host");
      location.href = u.toString();
    };
    panel.querySelector("#rvnp-copy").onclick = function () {
      var i = panel.querySelector("#rvnp-link"); i.select();
      (navigator.clipboard ? navigator.clipboard.writeText(i.value) : Promise.reject()).catch(function () { document.execCommand("copy"); });
      this.textContent = "Copied";
    };
    panel.querySelector("#rvnp-stop").onclick = stopHosting;
    if (room) { showLink(); setStatus(dc && dc.readyState === "open" ? "connected" : "waiting for your friend…", dc && dc.readyState === "open" ? "ok" : ""); }
  }

  function guestUrl() {
    var u = new URL("netplay-guest.html", location.href);
    u.searchParams.set("room", room);
    if (Q.signal) u.searchParams.set("signal", Q.signal);
    var t = document.title || ""; if (t) u.searchParams.set("title", t.slice(0, 80));
    if (SYS === "c64") { u.searchParams.set("sys", "c64"); u.searchParams.set("port", String(FRIEND_PORT)); }
    return u.toString();
  }
  function showLink() { var i = panel && panel.querySelector("#rvnp-link"); if (i) i.value = guestUrl(); }

  function newRoomId() {
    var a = "abcdefghjkmnpqrstuvwxyz23456789", s = "", r = new Uint32Array(8);
    crypto.getRandomValues(r); for (var i = 0; i < 8; i++) s += a[r[i] % a.length];
    return s;
  }
  function signalUrl(slot) { return SIGNAL + (SIGNAL.indexOf("?") < 0 ? "?" : "&") + "room=" + room + "&slot=" + slot; }
  function gatherDone(p) {
    return new Promise(function (res) {
      if (p.iceGatheringState === "complete") return res();
      var t = setTimeout(res, 4000);
      p.addEventListener("icegatheringstatechange", function () { if (p.iceGatheringState === "complete") { clearTimeout(t); res(); } });
    });
  }

  function startHosting() {
    var cv = document.getElementById("canvas");
    if (!cv || !cv.captureStream) { setStatus("this browser cannot stream the game", "bad"); return; }
    room = newRoomId(); showLink();
    pc = new RTCPeerConnection({ iceServers: ICE });
    var vs = cv.captureStream(50);
    vs.getVideoTracks().forEach(function (t) { pc.addTrack(t, vs); });
    var at = window.__rvNetAudio;
    if (at) at.stream.getAudioTracks().forEach(function (t) { pc.addTrack(t, at.stream); });
    else pc.addTransceiver("audio", { direction: "sendonly" });   // sound may start later
    dc = pc.createDataChannel("input", { ordered: true });
    dc.onopen = function () { setStatus("connected – your friend is " + TXT.who, "ok"); btn.textContent = "👥 Playing together"; };
    dc.onclose = function () { releaseAll(); setStatus("your friend left", "bad"); btn.textContent = "👥 Play together"; };
    dc.onmessage = function (e) {
      var m; try { m = JSON.parse(e.data); } catch (x) { return; }
      if (m.j) press(joyCode(m.j), !!m.down);
      else if (m.k && KEY_OK.test(m.k)) press(m.k, !!m.down);
      else if (m.ping) dc.send(JSON.stringify({ pong: m.ping }));
    };
    pc.onconnectionstatechange = function () {
      if (pc && (pc.connectionState === "failed" || pc.connectionState === "disconnected")) { releaseAll(); setStatus("connection lost", "bad"); }
    };
    // late audio: if the game's sound starts after hosting began, swap it in
    var audioCheck = setInterval(function () {
      if (!pc) return clearInterval(audioCheck);
      var a = window.__rvNetAudio; if (!a) return;
      var tr = a.stream.getAudioTracks()[0];
      var snd = pc.getSenders().filter(function (s) { return !s.track || s.track.kind === "audio"; })[0];
      if (tr && snd && snd.track !== tr) snd.replaceTrack(tr).catch(function () {});
      clearInterval(audioCheck);
    }, 1000);
    setStatus("creating the room…");
    pc.createOffer().then(function (o) { return pc.setLocalDescription(o); })
      .then(function () { return gatherDone(pc); })
      .then(function () {
        return fetch(signalUrl("offer"), { method: "POST", body: JSON.stringify(pc.localDescription) });
      })
      .then(function (r) {
        if (!r.ok) throw new Error("signal " + r.status);
        setStatus("waiting for your friend…");
        var tries = 0;
        polling = setInterval(function () {
          if (++tries > 600) { clearInterval(polling); setStatus("nobody joined – press Stop and try again", "bad"); return; }
          fetch(signalUrl("answer"), { cache: "no-store" }).then(function (r) {
            if (r.status !== 200) return;
            clearInterval(polling); polling = null;
            setStatus("connecting…");
            return r.json().then(function (ans) { return pc.setRemoteDescription(ans); });
          }).catch(function () {});
        }, 1500);
      })
      .catch(function (e) { setStatus("could not create a room (" + e.message + ")", "bad"); });
  }

  function stopHosting() {
    if (polling) clearInterval(polling); polling = null;
    releaseAll();
    try { dc && dc.close(); } catch (e) {} try { pc && pc.close(); } catch (e) {}
    pc = dc = null; room = null;
    btn.textContent = "👥 Play together";
    if (panel) { panel.remove(); panel = null; }
  }
  window.addEventListener("beforeunload", function () { try { pc && pc.close(); } catch (e) {} });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", makeUI); else makeUI();
  window.RVNetplay = { start: function () { if (!panel) openPanel(); if (!pc) startHosting(); return room; },
                       room: function () { return room; }, link: function () { return room ? guestUrl() : null; } };
})();
