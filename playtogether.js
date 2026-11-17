// "Play together" (online two-player, emulator/netplay.js) on the game pages
// and in the library: which games get the button, the explainer box and the
// "Online 2P" badge/filter, plus the per-game tips and the explainer video.
//
// For now the Videopac shelf only (G7000 / G7400+ and the rest of that shelf).
// The C64 shelf works in the emulator too (netplay.js), but is not advertised
// on the pages yet.
//
// Which games: every Videopac entry genres.js marks as two-player ("p12" or
// "p2"). To hide it on one game, add  playTogether: false  to that game's
// gamepages.js entry, or put the id in OFF below. A game-specific tip can go
// in gamepages.js as  playTogetherTip: { en: "...", nl: "...", ... }  (or a
// plain English string); the TIPS table below is keyed by title, so one entry
// covers every dump of a game.
(function () {
  // YouTube id of the explainer video. Swap it here when the video is updated.
  var VIDEO = "h8UvoMEz_jA";
  // Thumbnail shown until the visitor clicks play (no YouTube request before that).
  var POSTER = "assets/play-together-video.jpg";

  var OFF = [];

  var TIPS = {
    "Race / Spin-Out / Cryptogram": {
      en: "Press <b>2</b> at SELECT GAME for <b>Spin-Out</b>: two cars on one track, racing at the same time. (Game 1, Race, has only one car.)",
      nl: "Druk bij SELECT GAME op <b>2</b> voor <b>Spin-Out</b>: twee auto's op één circuit, die tegelijk racen. (Spel 1, Race, heeft maar één auto.)",
      de: "Bei SELECT GAME die <b>2</b> drücken für <b>Spin-Out</b>: zwei Autos auf einer Strecke, die gleichzeitig fahren. (Spiel 1, Race, hat nur ein Auto.)",
      fr: "À SELECT GAME, appuyez sur <b>2</b> pour <b>Spin-Out</b> : deux voitures sur le même circuit, en même temps. (Le jeu 1, Race, n'a qu'une voiture.)",
      pt: "Em SELECT GAME, aperte <b>2</b> para <b>Spin-Out</b>: dois carros na mesma pista, correndo ao mesmo tempo. (O jogo 1, Race, tem só um carro.)",
      ja: "SELECT GAME で <b>2</b> を おすと <b>スピンアウト</b>：ひとつの コースで 2だいの くるまが いっしょに はしります。（ゲーム 1 の レースは くるまが 1だい だけ。）"
    }
  };

  function isVideopac(g) {
    return !!g && g.platform !== "C64" && g.platform !== "PC" && g.platform !== "Amiga";
  }
  function page(g) { return ((window.GAMEPAGES_DATA || {})[g.id]) || {}; }

  function ok(g) {
    if (!isVideopac(g)) return false;
    if (OFF.indexOf(g.id) !== -1 || page(g).playTogether === false) return false;
    var p = ((window.GENRE_DATA || {})[g.id] || {}).players;
    return p === "p12" || p === "p2";
  }

  function tip(g) {
    var t = page(g).playTogetherTip || TIPS[g.title];
    return t ? (window.tx ? window.tx(t) : (t.en || t)) : "";
  }

  window.RV_NP = { video: VIDEO, poster: POSTER, ok: ok, tip: tip };
})();
