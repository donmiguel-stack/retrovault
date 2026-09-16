// Homebrew sold through the Vault. A buyer gets a license key by email from
// Lemon Squeezy (the shop that takes the payment and handles VAT), types it
// in once on the game page, and from then on the game plays from the Vault's
// store server - no account, no public file URL. Every copy the server sends
// is stamped with the order it came from (see store-server/README.md).
//
// Nothing here can make a ROM uncopyable - it runs in the browser. It makes
// passing the file around awkward (a key only works on a few devices) and
// traceable (each copy names its order), which is what the authors asked for.
//
// Loaded by game.html and by the emulator pages (emulator/index.html,
// emulator/dos.html); all three share one origin, so the license saved on the
// game page is there when the emulator asks for the ROM.
//
//   api       the store endpoint on retrovault.world (store-server/api.php)
//   games     one entry per game on sale, keyed by games.js id:
//     price     shown on the Buy button, as written
//     checkout  the Lemon Squeezy checkout link for this product
//     author    who made it - shown under the button
//
// Never list a game here that is also in downloads.js or hosted.js - those
// hand the file out for free. The product id, the file and the stamp settings
// live only on the server (store-server/config.php).

window.VAULT_STORE = {
  api: "https://retrovault.world/store/api.php",
  games: {
    // "new_example": { price: "€4.99", checkout: "https://retrovault.lemonsqueezy.com/buy/…", author: "Author Name" },
  }
};

// Local preview (tools/store_preview.py) - localhost only. ?storepreview=1 on
// any page switches this browser to the pretend store on localhost:8090 and
// its example games; ?storepreview=0 switches back. Preview licenses are kept
// under their own key, so they never mix with real ones. The synchronous
// request is deliberate (game.html needs the list before it draws) and only
// ever happens in preview mode on your own machine.
(function () {
  if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  var K = "VideopacVault_storePreview", on = false;
  try {
    var q = new URLSearchParams(location.search).get("storepreview");
    if (q === "1") localStorage.setItem(K, "1");
    if (q === "0") { localStorage.removeItem(K); localStorage.removeItem("VideopacVault_licenses_preview"); }
    on = localStorage.getItem(K) === "1";
  } catch (e) { return; }
  if (!on) return;
  var base = "http://localhost:8090/";
  try {
    var x = new XMLHttpRequest();
    x.open("GET", base + "preview.json", false);
    x.send();
    window.VAULT_STORE = { api: base + "api.php", games: JSON.parse(x.responseText).games, preview: true };
  } catch (e) {
    console.warn("Store preview is on, but tools/store_preview.py isn't running - showing the real store list.");
  }
})();

(function () {
  "use strict";
  var PREVIEW = !!(window.VAULT_STORE || {}).preview;
  var KEY = PREVIEW ? "VideopacVault_licenses_preview" : "VideopacVault_licenses";

  function all() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function write(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }
  function deviceName() {
    var ua = navigator.userAgent || "";
    var os = /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" :
             /iPhone|iPad/.test(ua) ? "iOS" : /Linux/.test(ua) ? "Linux" : "device";
    var br = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" :
             /Safari\//.test(ua) ? "Safari" : "browser";
    return "Retro Vault - " + os + " " + br + " (" + location.hostname + ")";
  }
  // A plain form POST: the browser sends it cross-origin without a preflight.
  function post(fields) {
    var cfg = window.VAULT_STORE || {};
    if (!cfg.api) return Promise.reject(new Error("network"));
    var body = new URLSearchParams();
    Object.keys(fields).forEach(function (k) { body.append(k, fields[k]); });
    return fetch(cfg.api, { method: "POST", body: body, mode: "cors", credentials: "omit", cache: "no-store" })
      .catch(function () { throw new Error("network"); });
  }
  function fail(r) {
    return r.json().catch(function () { return {}; }).then(function (j) {
      throw new Error((j && j.reason) || "server");
    });
  }

  window.VaultStore = {
    preview: PREVIEW,
    game: function (id) { return ((window.VAULT_STORE || {}).games || {})[id] || null; },
    license: function (id) { return all()[id] || null; },

    // key -> activates one device slot on the key, remembers it here
    activate: function (id, key) {
      key = String(key || "").trim();
      if (!key) return Promise.reject(new Error("invalid"));
      return post({ action: "activate", game: id, key: key, device: deviceName() }).then(function (r) {
        if (!r.ok) return fail(r);
        return r.json().then(function (j) {
          var lic = { key: key, instance: j.instance, name: j.name || "", order: j.order || "",
                      code: j.code || "", added: new Date().toISOString().slice(0, 10) };
          var a = all(); a[id] = lic; write(a);
          return lic;
        });
      });
    },

    // the ROM as an ArrayBuffer, stamped for this license
    fetchRom: function (id, download) {
      var lic = this.license(id);
      if (!lic) return Promise.reject(new Error("no-license"));
      var f = { action: "rom", game: id, key: lic.key, instance: lic.instance };
      if (download) f.download = "1";
      return post(f).then(function (r) {
        if (!r.ok) {
          // key refunded/disabled, or this device was removed elsewhere:
          // forget it here so the page offers Buy/Unlock again
          if (r.status === 403) { var a = all(); delete a[id]; write(a); }
          return fail(r);
        }
        return r.arrayBuffer();
      });
    },

    // frees this device's slot on the key, then forgets it here either way
    remove: function (id) {
      var lic = this.license(id);
      var a = all(); delete a[id]; write(a);
      if (!lic) return Promise.resolve();
      return post({ action: "deactivate", game: id, key: lic.key, instance: lic.instance })
        .then(function () {}, function () {});
    }
  };
})();
