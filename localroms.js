// Your own copy, kept in this browser (2026-09-24).
//
// A visitor who owns a game but has no emulator/roms/ folder to put it in -
// anyone on the public site, or on a phone - can drop the file on the game's
// page instead. It goes into this browser's IndexedDB, keyed by games.js id,
// and never leaves the device: nothing is uploaded, the server never sees it.
// From then on START plays it, on this browser only, until "Forget" removes it.
//
// Loaded by game.html and by the three emulator pages (emulator/index.html,
// emulator/dos.html, emulator/amiga.html). They share one origin, so the file
// saved on the game page is there when the emulator asks for it.
//
//   VaultLocal.put(id, file)   store a File/Blob; resolves {name, size}
//   VaultLocal.get(id)         resolves {name, size, data: ArrayBuffer} or null
//   VaultLocal.info(id)        resolves {name, size} or null (no bytes)
//   VaultLocal.remove(id)      resolves when gone
//
// Every call resolves (null / false) rather than rejecting when IndexedDB is
// blocked - a private window or a locked-down browser just behaves as if
// nothing was ever stored.
(function () {
  var DB = "RetroVaultLocal", STORE = "roms";
  var dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      try {
        var rq = indexedDB.open(DB, 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore(STORE); };
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { rej(rq.error); };
      } catch (e) { rej(e); }
    });
    return dbp;
  }
  function tx(mode, fn) {
    return open().then(function (db) {
      return new Promise(function (res, rej) {
        var t = db.transaction(STORE, mode);
        var out = fn(t.objectStore(STORE));
        t.oncomplete = function () { res(out && "result" in out ? out.result : undefined); };
        t.onerror = function () { rej(t.error); };
        t.onabort = function () { rej(t.error); };
      });
    });
  }
  function readBuf(blob) {
    if (blob.arrayBuffer) return blob.arrayBuffer();
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { res(fr.result); };
      fr.onerror = function () { rej(fr.error); };
      fr.readAsArrayBuffer(blob);
    });
  }
  window.VaultLocal = {
    put: function (id, file) {
      // stored as bytes, not as the File - a File handle from a drop can go
      // stale once the page that received it is gone (Safari)
      return readBuf(file).then(function (buf) {
        var rec = { name: file.name || id, size: buf.byteLength, data: buf, added: Date.now() };
        return tx("readwrite", function (s) { s.put(rec, id); })
          .then(function () { return { name: rec.name, size: rec.size }; });
      });
    },
    get: function (id) {
      if (!id) return Promise.resolve(null);
      return tx("readonly", function (s) { return s.get(id); })
        .then(function (r) { return r || null; }, function () { return null; });
    },
    info: function (id) {
      return this.get(id).then(function (r) { return r ? { name: r.name, size: r.size } : null; });
    },
    remove: function (id) {
      return tx("readwrite", function (s) { s.delete(id); }).then(function () { return true; }, function () { return false; });
    }
  };
})();
