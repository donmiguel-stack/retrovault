/* Retro Vault - game page behaviour.
   Split out of game.html on 2026-09-18, together with game.css, so the
   pre-rendered per-game pages in game/ can share one copy instead of
   embedding 100 KB of script each. Loaded by game.html and by every
   generated game/<id>.html.

   Two hooks exist for the generated pages:
     window.RV_GAME_ID    - the game to render, instead of reading ?id=
     window.RV_STATIC_META - set when the page already carries its own
                             title/description/canonical/JSON-LD in the
                             served HTML, so setGameMeta() must not run
                             and append a second copy of everything. */
(function () {
  var COVER_COLORS = ["#5b8def","#3ba97a","#c07de0","#e0865a","#d65a7e","#8a8f98","#e0c05a","#4fb3bf"];
  function hashColor(str){var h=0;for(var i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;return COVER_COLORS[h%COVER_COLORS.length];}
  function initials(title){
    var w=title.replace(/[^a-zA-Z0-9 ]/g,"").trim().split(/\s+/).filter(Boolean);
    if(!w.length)return "?";
    if(w.length===1)return w[0].slice(0,2).toUpperCase();
    return (w[0][0]+w[1][0]).toUpperCase();
  }
  function el(tag, cls, text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}

  document.querySelectorAll("[data-i18n]").forEach(function(el){ el.textContent = window.t(el.dataset.i18n); });
  document.documentElement.lang = window.currentLang();

  // ---- Japanese (hiragana) prose ----------------------------------------
  // The per-game prose (gamepages.js history/note, cheats.js, tips.js) is
  // written once in English. The Japanese pack is a sidecar keyed by the same
  // games.js ids (gamepages-ja.js / cheats-ja.js / tips-ja.js) rather than
  // {en,ja} objects inside the data files, so the catalogue keeps one source
  // of truth and the other four languages are untouched. Every lookup below
  // falls back to the English string, so a gap in the translation still
  // renders instead of going blank.
  var JA_ON = window.currentLang() === "ja";
  function jaPage(gid){ return (JA_ON && window.GAMEPAGES_JA && window.GAMEPAGES_JA[gid]) || null; }
  function jaTip(gid){ return (JA_ON && window.TIPS_JA && window.TIPS_JA[gid]) || null; }
  // cheats are an array per id; the Japanese file holds the same number of
  // entries in the same order, so merge by index and keep the English
  // entry's img/alt/source fields. A length mismatch means the packs have
  // drifted - fall back to English whole rather than pairing them up wrong.
  function jaCheats(list, gid){
    if (!JA_ON || !list || !window.CHEATS_JA) return list;
    var j = window.CHEATS_JA[gid];
    if (!j || j.length !== list.length) return list;
    return list.map(function (c, i) {
      var m = {};
      Object.keys(c).forEach(function (k) { m[k] = c[k]; });
      if (j[i].label !== undefined) m.label = j[i].label;
      if (j[i].text !== undefined) m.text = j[i].text;
      return m;
    });
  }

  // window.RV_GAME_ID is set by the pre-rendered pages in game/, which know
  // which game they are without a query string. game.html still reads ?id=.
  var id = window.RV_GAME_ID || new URLSearchParams(location.search).get("id");
  var games = (window.GAMES_DATA && window.GAMES_DATA.games) || [];
  var g = games.find(function(x){return x.id===id;});
  var page = document.getElementById("page");
  document.getElementById("loading").remove();

  if (!g) {
    // No id, or an id that is not in the catalogue: game.html on its own is a
    // shell with nothing in it. It used to be a live, indexable, contentless
    // page - Search Console had it as a crawled duplicate - so keep it out of
    // the index while still letting a crawler follow the links in the topbar.
    var rb = document.head.querySelector('meta[name="robots"]');
    if (rb) rb.setAttribute("content", "noindex, follow");
    page.appendChild(el("p","missing-note",(((window.SETUP_I18N||{})[window.currentLang()]||(window.SETUP_I18N||{}).en||{}).s_notFound)||"Game not found."));
    return;
  }
  var data = (window.GAMEPAGES_DATA && window.GAMEPAGES_DATA[g.id]) || {};

  // ---- per-game metadata for search engines -------------------------------
  // Every game page is the same game.html with a different ?id=, so without
  // this all 361 of them look like one page called "Retro Vault" and none can
  // rank for its own game. Google runs the page's JavaScript, so setting these
  // here works; social scrapers do not, which is why the og:/twitter: tags in
  // the head are static and generic (see the note up there).
  function setGameMeta() {
    var PLATFORM = {
      "G7000": "Philips Videopac G7000 / Magnavox Odyssey\u00b2",
      "G7400+": "Philips Videopac G7400",
      "C64": "Commodore 64",
      "PC": "MS-DOS",
      "Amiga": "Commodore Amiga"
    };
    var platform = PLATFORM[g.platform] || g.platform;

    // Title: the game, then just enough to tell it apart from the same title
    // on another machine, then the site. Kept short - search results cut off
    // around 60 characters.
    var bits = [];
    if (g.vpNumber) bits.push("Videopac " + g.vpNumber);
    else bits.push(g.platform === "PC" ? "MS-DOS" : (g.platform === "C64" ? "C64" : (g.platform === "Amiga" ? "Amiga" : "Videopac")));
    if (g.year) bits.push(g.year);
    document.title = g.title + " \u2014 " + bits.join(", ") + " | Retro Vault";

    // Description: the game's own history, which is real prose a person wrote,
    // trimmed at a sentence end rather than mid-word. Falls back to a built
    // sentence for the titles that have no history on file.
    var jp = jaPage(g.id);
    var prose = (jp && jp.history) || (data.history && data.history.text) || "";
    var tail = window.t("metaTail");
    // A search result shows roughly 155 characters of this, and about half
    // that many when they are Japanese - so budget for the tail sentence and
    // trim the history to fit, at a sentence end where there is one and a word
    // boundary otherwise. A description cut mid-word looks broken in results.
    var cjk = /[\u3040-\u30ff\u4e00-\u9fff]/.test(prose);
    var budget = (cjk ? 75 : 155) - tail.length - 1;
    var desc;
    if (prose) {
      desc = prose.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (desc.length > budget) {
        var cut = desc.slice(0, budget);
        var stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("\u3002"));
        desc = stop > budget * 0.45
          ? cut.slice(0, stop + 1)
          : cut.replace(/\s+\S*$/, "").replace(/[,;:\u3001\-\u2014]$/, "") + "\u2026";
      }
    } else {
      desc = g.title + " for the " + platform +
             (g.year ? ", released in " + g.year : "") +
             (g.publisher ? " by " + g.publisher : "") + ".";
    }
    desc = desc.replace(/\s+$/, "") + " " + tail;

    function meta(sel, attr, val) {
      var m = document.head.querySelector(sel);
      if (!m) { m = document.createElement("meta"); m.setAttribute(attr, sel.replace(/.*="|"\]$/g, "")); document.head.appendChild(m); }
      m.setAttribute("content", val);
    }
    meta('meta[name="description"]', "name", desc);
    meta('meta[property="og:title"]', "property", document.title);
    meta('meta[property="og:description"]', "property", desc);

    // The canonical deliberately drops every query string except id - ?lang=
    // and any utm_ tags are the same page, not new ones.
    // Points at the pre-rendered page, not at this one. game.html?id= and
    // game/<id>.html are the same page; the generated one is the address we
    // want indexed, because its metadata is in the served HTML rather than
    // written here after the fact.
    // An alternate dump canonicalises to its primary, exactly as the
    // pre-rendered page in game/ does - otherwise game.html?id=<alternate>
    // would nominate a different address than the generated page for the same
    // cartridge, and the two would argue.
    var canonId = (window.VAULT_ALT && window.VAULT_ALT.primaryOf(g.id)) || g.id;
    var canon = "https://demo.retrovault.world/game/" + encodeURIComponent(canonId) + ".html";
    var link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canon;
    meta('meta[property="og:url"]', "property", canon);

    var gen = (window.GENRE_DATA && window.GENRE_DATA[g.id]) || {};
    var ld = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": g.title,
      "url": canon,
      "gamePlatform": platform,
      "description": desc,
      "inLanguage": "en",
      "isPartOf": { "@type": "CollectionPage", "name": "Retro Vault", "url": "https://demo.retrovault.world/" }
    };
    if (g.year) ld.datePublished = String(g.year);
    if (g.publisher) ld.publisher = { "@type": "Organization", "name": g.publisher };
    if (g.developer) ld.author = { "@type": "Organization", "name": g.developer };
    if (gen.genre) ld.genre = gen.genre;
    if (data.video && data.video.id) {
      ld.trailer = { "@type": "VideoObject", "name": data.video.title || (g.title + " gameplay"),
                     "embedUrl": "https://www.youtube.com/embed/" + data.video.id };
    }
    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  }
  // A pre-rendered page in game/ already carries the real title, description,
  // canonical and JSON-LD in its served HTML - which is the whole point of
  // generating it - so running setGameMeta() there would append a second copy
  // of all of it.
  if (!window.RV_STATIC_META) {
    try { setGameMeta(); } catch (e) { document.title = g.title + " | Retro Vault"; }
  }

  // ---- hero ----
  var hero = el("div","game-hero");
  var cover = el("div","hero-cover", initials(g.title));
  cover.style.background = hashColor(g.category + g.title);
  var img = new Image();
  img.alt = g.title + " box art";
  // ?v= so a newly added cover isn't hidden behind the browser's cached miss
  var COVER_V = 24;
  img.onerror = function(){
    if(this.dataset.stage==="png"){this.dataset.stage="jpg";this.src="covers/"+g.id+".jpg?v="+COVER_V;}
    else if(data.manual && data.manual.item){this.dataset.stage="manual";this.src="manuals/"+data.manual.item+"/p00.jpg";}
    else this.remove();
  };
  img.dataset.stage="png";
  img.src="covers/"+g.id+".png?v="+COVER_V;
  cover.appendChild(img);
  if (/Homebrew/.test(g.category)) {
    var rib = el("span","cover-ribbon", window.t("cat_homebrew"));
    cover.appendChild(rib);
  }

  // Click the cover to see the art full size. The hero thumbnail is 220px wide
  // and crops to 3/4, which throws away most of what is actually on a box scan
  // or a fan-made poster - small print, the screenshot panel, the credits.
  // Wired only once the image has really loaded, so the coloured initials tile
  // that stands in for a missing cover never behaves like a button. vp_03 is
  // skipped: its cover is already a button for the football easter egg below.
  var coverLoaded = false;
  img.addEventListener("load", function(){ coverLoaded = true; });
  if (g.id !== "vp_03") {
    cover.classList.add("cover-zoomable");
    cover.tabIndex = 0;
    cover.setAttribute("role", "button");
    cover.setAttribute("aria-label", g.title + " \u2014 view the cover full size");
    var openCoverZoom = function(){
      if (!coverLoaded || document.querySelector(".cover-zoom")) return;
      var ov = el("div","cover-zoom");
      var big = new Image();
      big.src = img.src;
      big.alt = img.alt;
      ov.appendChild(big);
      // Size it here rather than in CSS: fill the window, but never blow a
      // small scan up more than 1.6x, which is about where these covers stop
      // looking like art and start looking like pixels. Both dimensions are
      // set from one scale factor, so nothing can stretch.
      var fit = function(){
        var nw = big.naturalWidth, nh = big.naturalHeight;
        if (!nw || !nh) return;
        var scale = Math.min((window.innerWidth - 48) / nw, (window.innerHeight - 48) / nh, 1.6);
        big.style.width = Math.round(nw * scale) + "px";
        big.style.height = Math.round(nh * scale) + "px";
      };
      if (big.complete) fit(); else big.addEventListener("load", fit);
      window.addEventListener("resize", fit);
      var onKey = function(e){ if (e.key === "Escape") close(); };
      function close(){
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", fit);
        ov.remove();
        cover.focus();
      }
      ov.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
      document.body.appendChild(ov);
    };
    cover.addEventListener("click", openCoverZoom);
    cover.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCoverZoom(); }
    });
  }
  hero.appendChild(cover);

  // American Football (vp_03) easter egg - the ball the runner is
  // cradling launches out of his grip and sails off screen, a beat after
  // the cover art loads (and again on click, since the cover doubles as a
  // button here). Position/size are read off the painted ball's actual
  // spot in covers/vp_03.png - see the CSS comment above .af-ball for the
  // measurements. Skips itself entirely under prefers-reduced-motion.
  if (g.id === "vp_03") {
    cover.style.cursor = "pointer";
    cover.title = "Hut hut - hike it!";
    var afPlaying = false;
    var launchFootball = function(){
      if (afPlaying) return;
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      var rect = cover.getBoundingClientRect();
      if (!rect.width) return;
      afPlaying = true;
      var startSize = rect.width * 0.164;
      var startLeft = rect.left + rect.width * 0.0977 - startSize / 2;
      var startTop = rect.top + rect.height * 0.7263 - startSize / 2;
      var ball = new Image();
      ball.className = "af-ball";
      ball.alt = "";
      ball.src = "assets/football-launch.png";
      ball.style.width = startSize + "px";
      ball.style.height = "auto";
      ball.style.transform = "translate(" + startLeft + "px," + startTop + "px)";
      document.body.appendChild(ball);
      var finalWidth = Math.min(190, Math.max(110, window.innerWidth * 0.12));
      var scale = finalWidth / startSize;
      var dx = (window.innerWidth - startLeft) + 260;
      var dy = -(startTop + startSize) - 220;
      var anim = ball.animate([
        { transform:"translate("+startLeft+"px,"+startTop+"px) scale(1) rotate(0deg)", offset:0, opacity:1 },
        { transform:"translate("+(startLeft+dx*0.12)+"px,"+(startTop+dy*0.08)+"px) scale(1.15) rotate(70deg)", offset:0.16, opacity:1 },
        { transform:"translate("+(startLeft+dx)+"px,"+(startTop+dy)+"px) scale("+scale+") rotate(620deg)", offset:1, opacity:0.15 }
      ], { duration:1400, easing:"cubic-bezier(.4,0,.2,1)", fill:"forwards" });
      anim.onfinish = function(){ ball.remove(); afPlaying = false; };
    };
    img.addEventListener("load", function onAfLoad(){
      if (img.dataset.stage === "manual") return;
      img.removeEventListener("load", onAfLoad);
      setTimeout(launchFootball, 800);
    });
    cover.addEventListener("click", launchFootball);
  }

  var info = el("div","hero-info");
  info.appendChild(el("h1",null,g.title));
  var meta = el("div","hero-meta");
  var pb = el("span","badge "+(g.platform==="G7400+"?"badge-g7400":g.platform==="C64"?"badge-c64":g.platform==="PC"?"badge-pc":"badge-g7000"), g.platform);
  meta.appendChild(pb);
  // same wording as the library chips, so the category follows the language too
  var CAT_KEYS = {
    "Official Videopac (EU)":"cat_eu", "Official Videopac (French)":"cat_french",
    "Official Odyssey2 (US)":"cat_us", "Imagic":"cat_imagic",
    "Parker Brothers":"cat_parker", "Jopac (French)":"cat_jopac",
    "Philips Brazil":"cat_brazil", "PAL dumps":"cat_pal",
    "Modified / fixed":"cat_modified", "Rare / unreleased":"cat_rare",
    "Utility / unknown":"cat_rare", "Homebrew (community)":"cat_homebrew",
    "Homebrew (this project)":"cat_homebrew",
    "Commodore 64":"cat_c64",
    "MS-DOS":"cat_pc"
  };
  var catKey = CAT_KEYS[g.category];
  meta.appendChild(el("span","badge badge-cat", catKey ? window.t(catKey) : g.category));
  if (g.vpNumber) meta.appendChild(el("span","badge badge-cat","VP #"+g.vpNumber));
  // which surviving dump this entry is - see VARIANT_LABELS in app.js
  var VARIANT_LABELS = {"banked-rom":["var_banked","varx_banked"],"alt-dump":["var_alt","varx_alt"]};
  var variantKeys = (g.tags||[]).map(function(t){return VARIANT_LABELS[t];}).filter(Boolean)[0];
  if (variantKeys) meta.appendChild(el("span","badge badge-variant", window.t(variantKeys[0])));
  // what kind of game it is, from genres.js
  var gen = (window.GENRE_DATA || {})[g.id];
  if (gen) {
    meta.appendChild(el("span","badge badge-cat", window.t("g_"+gen.genre)));
    meta.appendChild(el("span","badge badge-cat", window.t("p_"+gen.players)));
  }
  info.appendChild(meta);
  // year, publisher and developer, for shelves whose catalogue carries them
  if (g.year || g.publisher) {
    var credits = [g.year, g.publisher];
    if (g.developer && g.developer !== g.publisher) credits.push(g.developer);
    info.appendChild(el("p","alt-name", credits.filter(Boolean).join(" \u00b7 ")));
  }
  if (gen && gen.unsure) {
    var un = el("p","variant-note", window.t("unsureNote"));
    info.appendChild(un);
  }

  if (data.history) {
    var jp = jaPage(g.id);
    info.appendChild(el("p","history-text", (jp && jp.history) || data.history.text));
    // Most histories are lifted from Wikipedia and credited as such. The
    // homebrews mostly aren't in Wikipedia at all, so those carry a written
    // note and either their own source link or none.
    var src = el("p","history-source");
    if (data.history.wikiTitle) {
      src.innerHTML = window.t("histFrom")+' <a href="'+data.history.url+'" target="_blank" rel="noopener">Wikipedia: '+data.history.wikiTitle+'</a>';
      info.appendChild(src);
    } else if (data.history.source) {
      src.innerHTML = data.history.url
        ? window.t("srcLabel")+' <a href="'+data.history.url+'" target="_blank" rel="noopener">'+data.history.source+'</a>'
        : window.t("srcLabel")+' '+data.history.source;
      info.appendChild(src);
    }
  } else {
    info.appendChild(el("p","history-text", window.t("noHistory")));
  }

  // more than one dump of this cart survives - say what this one is
  if (variantKeys) {
    var vn = el("p","variant-note");
    vn.innerHTML = window.t(variantKeys[1]);
    info.appendChild(vn);
  }

  // Brazilian release of the same cartridge, if there was one
  var br = (window.BRAZIL_DATA && window.BRAZIL_DATA[g.id]) || null;
  if (br) {
    var bl = el("p","alt-name");
    bl.innerHTML = window.t('knownAs') + ' <strong>' + br.title + '</strong> ' +
                   '<span class="alt-num">' + br.num + '</span>';
    info.appendChild(bl);
  }

  // US release of the same cartridge, if it was renamed over there
  var usa = (window.USA_DATA && window.USA_DATA[g.id]) || null;
  if (usa) {
    var ul = el("p","alt-name");
    ul.innerHTML = window.t('usAs') + ' <strong>' + usa.title + '</strong> ' +
                   '<span class="alt-num">' + usa.num + '</span>';
    info.appendChild(ul);
  }

  // what was in the original box besides the cartridge
  var pack = (window.PACKAGING_DATA && window.PACKAGING_DATA[g.id]) || null;
  if (pack) {
    var pl = el("p","pack-line");
    pl.innerHTML = '<span class="badge badge-pack">' + pack.kind + '</span> ' + pack.detail;
    info.appendChild(pl);
  }

  // favorite toggle - same localStorage key the library grid uses
  var FAV_KEY = "VideopacVault_favorites";
  function readFavs(){ try { return JSON.parse(localStorage.getItem(FAV_KEY)||"{}")||{}; } catch(e){ return {}; } }
  var favBtn = el("button","fav-toggle");
  function paintFav(){
    var on = !!readFavs()[g.id];
    favBtn.classList.toggle("on", on);
    favBtn.innerHTML = (on ? "&#9733; " : "&#9734; ") + (on ? window.t("inFav") : window.t("addFav"));
  }
  favBtn.type = "button";
  favBtn.addEventListener("click", function(){
    var f = readFavs();
    if (f[g.id]) delete f[g.id]; else f[g.id] = 1;
    try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch(e){}
    paintFav();
  });
  paintFav();

  // Homebrew/copyright-free titles the Vault ships as a direct download
  // (homebrew-downloads/, see downloads.js) - looked up here too, not just
  // in the "download from the Vault" block below, so the gating logic just
  // past this can offer it as a fallback when emulator/roms/ is empty.
  var dl = (window.DOWNLOAD_DATA || {})[g.id];
  // On sale through the Vault's own store (store.js) - takes precedence
  // over downloads.js/hosted.js, which should never list it anyway.
  var sale = window.VaultStore ? window.VaultStore.game(g.id) : null;
  if (sale) dl = null;
  var start = el("button","start-btn");
  start.appendChild(el("span","tri"));
  start.appendChild(document.createTextNode("START"));
  // each shelf plays through its own emulator - Videopac/C64 through webretro's
  // libretro cores, PC through js-dos (see emulator/dos.html), Amiga through
  // vAmigaWeb (see emulator/amiga.html)
  var CORES = { "C64": "vice_x64" };
  // The Vault's own file host (hosted.js): the BIOS plus the abandonware
  // part of all three shelves (Videopac since 2026-09-04, C64 and MS-DOS
  // since 2026-09-06), served from retrovault.world rather than from this
  // repo. Used two ways below - as a third place to look for the ROM after
  // emulator/roms/ and homebrew-downloads/, and (Videopac only) as a BIOS
  // fallback the emulator page only tries when its local bios/ is empty.
  var HOSTED = window.HOSTED_FILES || null;
  function hostedRomUrl() {
    if (!HOSTED || !HOSTED.base || !HOSTED.roms) return null;
    if (HOSTED.roms.indexOf(g.romFile) === -1) return null;
    return HOSTED.base + "roms/" + encodeURIComponent(g.romFile);
  }
  function hostedBiosParam() {
    if (!HOSTED || !HOSTED.base || !HOSTED.bios) return "";
    if (g.platform === "PC" || g.platform === "C64" || g.platform === "Amiga") return "";
    return "&biosbase=" + encodeURIComponent(HOSTED.base + HOSTED.bios);
  }
  // Videopac only: a cartridge can ask for a specific BIOS image (gamepages.js
  // "bios"). Default is g7400.bin for every title; VP05 Blackjack needs the
  // G7000 one (o2rom.bin) because its shuffle calls an undocumented BIOS
  // routine that only exists there.
  function gameBiosParam() {
    var b = (window.GAMEPAGES_DATA && window.GAMEPAGES_DATA[g.id] || {}).bios;
    if (!b || g.platform === "PC" || g.platform === "C64" || g.platform === "Amiga") return "";
    return "&bios=" + encodeURIComponent(b);
  }
  // Videopac only: a cartridge can ask for a control override (gamepages.js
  // "keys"). "j2arrows" moves joystick 2 onto the arrow keys + Left Ctrl, for
  // a game that reads joystick 2 AND watches the console keyboard - the stock
  // W/A/S/D + Q binds are all console keyboard keys, so they fight the game.
  // emulator/assets/base.js has the full reasoning.
  function gameKeysParam() {
    var k = (window.GAMEPAGES_DATA && window.GAMEPAGES_DATA[g.id] || {}).keys;
    if (!k || g.platform === "PC" || g.platform === "C64" || g.platform === "Amiga") return "";
    return "&keys=" + encodeURIComponent(k);
  }
  start.addEventListener("click", function(){
    var fb = start.dataset.dlfallback ? "&dlfallback=" + encodeURIComponent(start.dataset.dlfallback) : "";
    // bought through the Vault's store (store.js): the emulator page fetches
    // the stamped ROM itself, with the license saved in this browser
    if (start.dataset.store) fb += "&store=" + encodeURIComponent(start.dataset.store);
    if (g.platform === "PC") {
      // dos.html keeps the zip name (js-dos keys its saves off it) and gets
      // the hosted copy as a separate &hosted= URL to fall back to.
      var hz = start.dataset.hosted ? "&hosted=" + encodeURIComponent(start.dataset.hosted) : "";
      location.href = "emulator/dos.html?zip=" + encodeURIComponent(g.romFile) +
                      "&title=" + encodeURIComponent(g.title) +
                      "&id=" + encodeURIComponent(g.id) + fb + hz;
    } else if (g.platform === "Amiga") {
      // amiga.html keeps the disk's own filename (same reasoning as dos.html
      // above) and takes the hosted copy as a separate &hosted= fallback.
      var hz2 = start.dataset.hosted ? "&hosted=" + encodeURIComponent(start.dataset.hosted) : "";
      location.href = "emulator/amiga.html?disk=" + encodeURIComponent(g.romFile) +
                      "&title=" + encodeURIComponent(g.title) +
                      "&id=" + encodeURIComponent(g.id) + fb + hz2;
    } else {
      var rom = start.dataset.hosted ? start.dataset.hosted : g.romFile;
      location.href = "emulator/index.html?core=" + (CORES[g.platform] || "o2em") +
                      "&rom=" + encodeURIComponent(rom) + fb + hostedBiosParam() + gameBiosParam() + gameKeysParam();
    }
  });
  info.appendChild(document.createElement("br"));
  var actions = el("div","hero-actions");
  // START appears only once we know something will actually load - checked
  // live with a HEAD request, so dropping a file into emulator/roms/ is all
  // it takes, and nobody hits an error screen (or, on the Videopac shelf,
  // the emulator core's raw browser alert()) from a button that was always
  // going to fail. For the handful of homebrew/copyright-free titles the
  // Vault ships itself (homebrew-downloads/, see downloads.js), a missing
  // emulator/roms/ file isn't the end of it - checked there too before
  // giving up, and the emulator page is told where to find it via
  // &dlfallback= so it can actually play it (see assets/base.js /
  // dos.html's resolveBundleUrl - both only try this path when told to).
  var romNote = el("p","missing-note","");
  info.appendChild(romNote);
  function vaultShowStart(fromDownloads, hostedUrl, storeId) {
    romNote.remove();
    if (fromDownloads) start.dataset.dlfallback = dl.file;
    if (storeId) {
      start.dataset.store = storeId;
      start.title = window.t("storePlays");
    }
    if (hostedUrl) {
      start.dataset.hosted = hostedUrl;
      start.title = window.t("playsHosted");
    }
    actions.insertBefore(start, actions.firstChild);
  }
  function vaultShowMissing() {
    var key = g.platform === "PC" ? "pc_noRom" : (g.platform === "C64" ? "c64_noRom" : (g.platform === "Amiga" ? "amiga_noRom" : "vp_noRom"));
    romNote.textContent = window.t(key, { file: g.romFile });
    // Where to get it (romsources.js): for titles the Vault can neither ship
    // nor host, point at a preservation copy and spell out the three steps.
    var src = (window.ROM_SOURCES || {})[g.id];
    if (!src || !src.url || !src.file) return;
    var box = el("div", "get-box");
    box.appendChild(el("h3", null, window.t("getRomHead")));
    var ol = document.createElement("ol");
    var s1 = document.createElement("li");
    s1.innerHTML = window.t("getRomStep1", {
      file: "<code>" + esc(src.file) + "</code>",
      site: '<a href="' + esc(src.url) + '" target="_blank" rel="noopener nofollow">' + esc(src.site || "archive.org") + "</a>"
    });
    var s2 = document.createElement("li");
    var bare = /\.(d64|crt|prg|t64|bin|adf|adz|dms)$/i.test(src.file);   // a disk image, not a zip - no "no need to unzip"
    // Amiga: the preserved copies are .adf disk images shipped inside a zip, and
    // unlike the PC shelf (where emulator/dos.html takes the zip as-is) the
    // Amiga player wants the bare .adf - so say "unzip it, rename what's inside".
    var zippedDisk = /\.zip$/i.test(src.file) && /\.(adf|adz|dms)$/i.test(g.romFile || "");
    var step2key = zippedDisk ? "getRomStep2zipfile" : bare ? "getRomStep2file" : "getRomStep2";
    s2.innerHTML = window.t(step2key, { file: "<code>" + esc(g.romFile) + "</code>" });
    var s3 = document.createElement("li");
    s3.innerHTML = window.t("getRomStep3", { folder: "<code>emulator/roms/</code>" });
    ol.appendChild(s1); ol.appendChild(s2); ol.appendChild(s3);
    box.appendChild(ol);
    if (src.manual) {
      var mn = el("p", "get-note");
      mn.innerHTML = window.t("getRomManual") + ' <a href="' + esc(src.manual) + '" target="_blank" rel="noopener nofollow">' + esc(src.site || "archive.org") + "</a>";
      box.appendChild(mn);
    }
    if (src.note) box.appendChild(el("p", "get-note", src.note));
    romNote.insertAdjacentElement("afterend", box);
  }
  // A game on sale, not in emulator/roms/: START only with a license saved in
  // this browser (Amiga excepted - its player needs a real file, so buyers
  // download their copy instead). Called again after unlock/remove.
  // The Update button only refreshes top-level files, never emulator/ - so
  // an install from before the store has a game.html that knows about it
  // but an emulator page that doesn't. Ask the emulator page itself; if it
  // can't fetch from the store, the buyer gets the download route instead
  // (same as Amiga) until they grab a fresh copy of the Vault.
  var storeEmuOk = null;
  function storeEmuReady() {
    if (storeEmuOk) return storeEmuOk;
    var f = g.platform === "PC" ? "emulator/dos.html" : "emulator/assets/base.js";
    storeEmuOk = g.platform === "Amiga" ? Promise.resolve(false) :
      fetch(f, { cache: "no-cache" }).then(function (r) { return r.ok ? r.text() : ""; })
        .then(function (t) { return t.indexOf("VaultStore") !== -1; }, function () { return false; });
    return storeEmuOk;
  }
  function storeGate() {
    var lic = window.VaultStore.license(g.id);
    storeEmuReady().then(function (emuOk) {
      if (lic && emuOk) {
        if (!start.parentNode) vaultShowStart(false, null, g.id);
        return;
      }
      if (start.parentNode && start.dataset.store) start.remove();
      romNote.textContent = window.t(lic ? "storeAmigaNote" : "storeNeedKey");
      if (!romNote.parentNode) actions.insertAdjacentElement("beforebegin", romNote);
    });
  }
  function esc(str) { return String(str).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // Last resort, after roms/ and homebrew-downloads/: the Vault's own file
  // host (hosted.js). Same HEAD-before-button discipline - the host has to
  // answer, with CORS, before START appears.
  function vaultTryHosted() {
    var url = hostedRomUrl();
    if (!url) { vaultShowMissing(); return; }
    fetch(url, { method: "HEAD", mode: "cors" })
      .then(function (r) { if (r.ok) vaultShowStart(false, url); else vaultShowMissing(); })
      .catch(vaultShowMissing);
  }
  // store preview (tools/store_preview.py): act as if roms/ were empty, so
  // the page shows what a buyer without the file would see
  (sale && window.VaultStore.preview ? Promise.reject(0) :
  fetch("emulator/roms/" + encodeURIComponent(g.romFile), { method: "HEAD" }))
    .then(function (r) {
      if (r.ok) { vaultShowStart(false); return; }
      throw 0;
    })
    .catch(function () {
      if (sale) { storeGate(); return; }
      if (!dl) { vaultTryHosted(); return; }
      fetch("homebrew-downloads/" + encodeURIComponent(dl.file), { method: "HEAD" })
        .then(function (r) { if (r.ok) vaultShowStart(true); else vaultTryHosted(); })
        .catch(vaultTryHosted);
    });
  actions.appendChild(favBtn);
  info.appendChild(actions);

  // ---- for sale ----
  // Somebody selling the real cartridge, from shops.js. An outside shop, no
  // cut taken, and the price carries the date it was checked - second-hand
  // stock moves, and a number with no date on it quietly becomes a lie.
  // The button sits in the same row as START and the favourite toggle, set a
  // little further off so it reads as a different kind of thing; the shop and
  // the date it was priced go on a line underneath.
  var offers = (window.SHOPS_DATA && window.SHOPS_DATA[g.id]) || [];
  offers.forEach(function (o) {
    var col = el("div","buy-col");
    var a = document.createElement("a");
    a.className = "buy-btn";
    a.href = o.url; a.target = "_blank"; a.rel = "noopener nofollow";
    a.innerHTML = '<span class="buy-label">' + window.t("buyThis") + '</span>' +
                  '<span class="buy-price">' + o.price + '</span>';
    col.appendChild(a);
    // Just the shop on screen. The condition and the date the price was last
    // seen stay in shops.js and ride along as the hover title, so the line
    // reads clean but the number is still dated somewhere. Hung below the
    // button rather than placed in the flow, so the row still centres on the
    // buttons alone and START does not shift.
    // "variant" is for when the cartridge on sale is not the one on this page
    // - the same game in another region's box. Says so on the line itself,
    // because someone who knows the boxes will spot it anyway. An i18n key
    // (rel_eu, rel_us, rel_br, rel_fr) follows the language picker; anything
    // else is printed as written.
    var vt = "";
    if (o.variant) {
      var tr = window.t(o.variant);
      vt = " · " + (tr && tr !== o.variant ? tr : o.variant);
    }
    var line = el("p","buy-note", o.shop + vt);
    line.title = (o.note ? o.note + " · " : "") +
      (o.checked ? window.t("priceChecked", { date: o.checked }) : "");
    col.appendChild(line);
    actions.appendChild(col);
  });

  // ---- support the creator ----
  // Free/pay-what-you-want homebrew, from support.js. A link straight to the
  // creator's own release page - itch.io or wherever they actually put it -
  // so a tip goes to them, not through the Vault. Styled apart from Buy so
  // the two do not read as the same kind of link; nothing here is a purchase.
  var support = (window.SUPPORT_DATA && window.SUPPORT_DATA[g.id]) || [];
  support.forEach(function (s) {
    var scol = el("div","support-col");
    var sa = document.createElement("a");
    sa.className = "support-btn";
    sa.href = s.url; sa.target = "_blank"; sa.rel = "noopener nofollow";
    sa.innerHTML = '<span class="support-heart">&#9829;</span>' +
                   '<span class="support-label">' + window.t("supportCreator") + '</span>';
    scol.appendChild(sa);
    var sline = el("p","support-note", s.note || s.creator);
    sline.title = (s.creator || "") +
      (s.creator && s.checked ? " \u00b7 " : "") +
      (s.checked ? window.t("linkChecked", { date: s.checked }) : "");
    scol.appendChild(sline);
    actions.appendChild(scol);
  });

  // ---- the cartridge release ----
  // Facts about the physical homebrew cartridge, from products.js - author,
  // year, ROM size, what came in the box, whether the shop still has it -
  // lifted from the shop's own product page (Packrat Video Games / Good
  // Deal Games) and linked back to it. Not a Buy button (shops.js stays
  // off) and no price: that is the shop's to print, not ours. Rendered as
  // a small spec sheet underneath the action row.
  var product = (window.PRODUCT_DATA && window.PRODUCT_DATA[g.id]) || null;
  if (product) {
    var pbox = el("div","product-box");
    pbox.appendChild(el("div","product-head", window.t("productHead")));
    var pgrid = el("dl","product-grid");
    function prow(labelKey, val) {
      if (!val) return;
      pgrid.appendChild(el("dt","", window.t(labelKey)));
      pgrid.appendChild(el("dd","", val));
    }
    prow("productAuthor", product.author);
    prow("productYear", product.year);
    prow("productPublisher", product.publisher);
    prow("productRom", product.rom);
    prow("productTv", product.tv);
    prow("productSystems", product.systems);
    prow("productVoice", product.voice);
    prow("productPlayers", product.players);
    prow("productBox", product.box);
    prow("productAvail", product.availability);
    pbox.appendChild(pgrid);
    if (product.blurb) pbox.appendChild(el("p","product-blurb", product.blurb));
    if (product.url) {
      var pl = el("p","product-source");
      pl.appendChild(document.createTextNode(window.t("productSource") + " "));
      var pa = document.createElement("a");
      pa.href = product.url; pa.target = "_blank"; pa.rel = "noopener nofollow";
      pa.textContent = product.shop || product.url;
      pl.appendChild(pa);
      if (product.checked) pl.appendChild(document.createTextNode(" \u00b7 " + window.t("linkChecked", { date: product.checked })));
      pbox.appendChild(pl);
    }
    info.appendChild(pbox);
  }

  // ---- download from the Vault ----
  // Homebrew/copyright-free games the Vault hosts itself, in
  // homebrew-downloads/ (see downloads.js) - not user-supplied ROMs, and
  // unlike Buy/Support, not a link elsewhere. Hidden until a HEAD request
  // confirms the file is really there, same discipline as the START button
  // above - no button that leads to a 404.
  if (dl) {
    var dcol = el("div","dl-col");
    dcol.style.display = "none";
    var da = document.createElement("a");
    da.className = "dl-btn";
    da.href = "homebrew-downloads/" + encodeURIComponent(dl.file);
    da.setAttribute("download", "");
    da.innerHTML = '<span class="dl-icon">&#8681;</span>' +
                   '<span class="dl-label">' + window.t("downloadRom") + '</span>';
    dcol.appendChild(da);
    dcol.appendChild(el("p","dl-note", dl.note || window.t("dlFree")));
    actions.appendChild(dcol);
    fetch("homebrew-downloads/" + encodeURIComponent(dl.file), { method: "HEAD" })
      .then(function (r) { if (r.ok) dcol.style.display = ""; })
      .catch(function () {});
  }
  // ---- sold through the Vault ----
  // Homebrew the Vault sells itself (store.js). Not licensed on this device:
  // Buy (the Lemon Squeezy checkout, in a new tab) plus an "I have a key"
  // form. Licensed: a Download button for a stamped copy, and who it is
  // licensed to, with a way to free this device's slot on the key.
  if (sale) {
    var scol = el("div","store-col");
    var spanel = el("div","store-panel");
    actions.appendChild(scol);
    actions.insertAdjacentElement("afterend", spanel);
    var storeErr = function (e) {
      var r = (e && e.message) || "server";
      var k = { invalid: "storeErr_invalid", limit: "storeErr_limit", "wrong-product": "storeErr_wrong",
                revoked: "storeErr_revoked", network: "storeErr_network", "slow-down": "storeErr_busy",
                "no-license": "storeErr_invalid" }[r] || "storeErr_server";
      return window.t(k);
    };
    var renderStore = function () {
      scol.innerHTML = ""; spanel.innerHTML = "";
      if (window.VaultStore.preview) {
        // storepreview: say so, in plain English - this is a dev view only
        var pv = el("p","store-help");
        pv.innerHTML = "<strong>Store preview</strong> — example price, pretend checkout, any key works " +
          "(WRONG / FULL show the errors). <a href=\"?id=" + encodeURIComponent(g.id) + "&storepreview=0\">Leave preview</a>";
        spanel.appendChild(pv);
      }
      var lic = window.VaultStore.license(g.id);
      if (!lic) {
        var buy = document.createElement("a");
        buy.className = "store-btn";
        buy.href = sale.checkout; buy.target = "_blank"; buy.rel = "noopener";
        buy.innerHTML = '<span class="store-label">' + window.t("storeBuy") + '</span>' +
                        (sale.price ? '<span class="store-price">' + esc(sale.price) + '</span>' : "");
        scol.appendChild(buy);
        if (sale.author) scol.appendChild(el("p","store-note", window.t("storeBy", { author: sale.author })));
        var open = el("button","store-link", window.t("storeHaveKey"));
        open.type = "button";
        var form = el("form","store-form");
        form.hidden = true;
        var input = document.createElement("input");
        input.type = "text"; input.autocomplete = "off"; input.spellcheck = false;
        input.placeholder = window.t("storeKeyPh");
        var go = el("button", null, window.t("storeUnlock"));
        go.type = "submit";
        form.appendChild(input); form.appendChild(go);
        var msg = el("p","store-msg","");
        var help = el("p","store-help", window.t("storeKeyHelp"));
        help.hidden = true;
        open.addEventListener("click", function () {
          form.hidden = false; help.hidden = false; open.hidden = true; input.focus();
        });
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          msg.textContent = "";
          go.disabled = true; go.textContent = window.t("storeWorking");
          window.VaultStore.activate(g.id, input.value).then(function () {
            renderStore(); storeGate();
          }, function (e) {
            go.disabled = false; go.textContent = window.t("storeUnlock");
            msg.textContent = storeErr(e);
          });
        });
        spanel.appendChild(open); spanel.appendChild(form); spanel.appendChild(msg); spanel.appendChild(help);
        return;
      }
      var dbtn = el("button","store-btn");
      dbtn.type = "button";
      dbtn.innerHTML = '<span class="dl-icon">&#8681;</span><span class="store-label">' + window.t("storeDownload") + '</span>';
      scol.appendChild(dbtn);
      scol.appendChild(el("p","store-note", window.t("storeDlNote")));
      var line = el("p","store-licensed");
      line.innerHTML = "<strong>" + esc(window.t("storeLicensed", { name: lic.name || "\u2014" })) + "</strong>" +
        (lic.order ? " \u00b7 " + esc(window.t("storeOrder", { order: lic.order })) : "") + " \u00b7 ";
      var rm = el("button","store-link", window.t("storeRemove"));
      rm.type = "button";
      rm.addEventListener("click", function () {
        if (!rm.dataset.armed) { rm.dataset.armed = "1"; rm.textContent = window.t("storeRemoveAgain"); return; }
        rm.disabled = true;
        window.VaultStore.remove(g.id).then(function () { renderStore(); storeGate(); });
      });
      line.appendChild(rm);
      var dmsg = el("p","store-msg","");
      spanel.appendChild(line); spanel.appendChild(dmsg);
      dbtn.addEventListener("click", function () {
        dmsg.textContent = "";
        dbtn.disabled = true;
        window.VaultStore.fetchRom(g.id, true).then(function (buf) {
          dbtn.disabled = false;
          var url = URL.createObjectURL(new Blob([buf], { type: "application/octet-stream" }));
          var a = document.createElement("a");
          a.href = url; a.download = g.romFile;
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
        }, function (e) {
          dbtn.disabled = false;
          dmsg.textContent = storeErr(e);
          if (!window.VaultStore.license(g.id)) { renderStore(); storeGate(); }
        });
      });
    };
    renderStore();
  }

  hero.appendChild(info);
  page.appendChild(hero);

  // ---- controls ----
  // Mapping verified against the O2EM libretro core source + this build's
  // RetroArch keybinds: RetroPad B = "G" = the joystick's single action
  // button; arrows = the joystick; number keys pass straight through.
  //
  // Tab/Game Focus does NOT gate whether key presses reach the console's
  // keyboard - it only stops the browser/RetroArch grabbing keys as hotkeys.
  // Letters and numbers always reach the console directly.
  //
  // The G-key bleed into on-screen name fields is NOT authentic hardware
  // behaviour (an earlier version of this note said it was - wrong). Standalone
  // O2EM keeps a joykeystab[] table so a key used for the joystick is masked
  // out of the keyboard scan; the libretro port never populates it (set_joykeys
  // is commented out in src/keyboard.c), so "g" registers as BOTH fire and the
  // console's G key. Fixable only by moving fire off a key that exists on the
  // Odyssey2 keyboard.
  //
  // Related, and now fixed in emulator/assets/base.js: webretro's stock binds
  // put RetroPad buttons on "y","e","p","r","o", and this core maps those
  // buttons to console number keys 0-4 - so typing P also typed 2, which broke
  // K.C. Munchkin's create-a-maze (RESET then P) and every other
  // keyboard-driven title. Those binds are now "nul".
  var cSec = el("div","section");
  cSec.appendChild(el("h2",null,window.t("controls")));

  // Wall Street ticker - a green stock-ticker banner above the controls box,
  // "BUY BITCOIN [symbol]" scrolling left to right on a loop. The EU release
  // and its standalone Brazilian rebrand (br_9434, same game per gamepages.js
  // relatedTo note) both get it.
  var WALLST_IDS = ["vp_46", "br_9434"];
  if (WALLST_IDS.indexOf(g.id) !== -1) {
    var tickerWrap = el("div", "wallst-ticker");
    var track = el("div", "wallst-ticker-track");
    var phrase = 'BUY BITCOIN <span class="btc-sym">B</span>';
    var repeated = Array(6).fill(phrase).join(" &bull; ");
    var msg1 = el("span", "wallst-msg"); msg1.innerHTML = repeated;
    var msg2 = el("span", "wallst-msg"); msg2.innerHTML = repeated;
    track.appendChild(msg1);
    track.appendChild(msg2);
    tickerWrap.appendChild(track);
    cSec.appendChild(tickerWrap);
  }

  // long-form control text lives in setup-i18n.js, one pack per language
  var L = (window.SETUP_I18N || {})[window.currentLang()] || (window.SETUP_I18N || {}).en || {};
  function LT(key){ return L[key] || ((window.SETUP_I18N||{}).en||{})[key] || ""; }
  var cBox = el("div","controls-box");
  var style = data.input || "joystick";

  function row(grid, keysHtml, action){
    var k = el("span"); k.innerHTML = keysHtml; grid.appendChild(k);
    var a = el("span","kact"); a.innerHTML = action; grid.appendChild(a);
  }
  var grid = el("div","controls-grid");
  var ARROWS = '<span class="kbd">&#8592;</span> <span class="kbd">&#8593;</span> <span class="kbd">&#8595;</span> <span class="kbd">&#8594;</span>';
  // A cartridge with a per-game control override (gamepages.js "keys") gets a
  // table describing what actually works on it, not the machine's general one.
  // Half of the standard rows are wrong or harmful on such a game: it starts
  // from fire rather than a SELECT GAME number, it ignores joystick 1, and -
  // the reason the override exists at all - every key in the A-Z/Space/Enter
  // row reaches the console keyboard, which this kind of game reacts to.
  // The three explainer notes below (c_hidden, c_bleed, c_stick2) are skipped
  // for the same reason; c_saveNote stays, save states work like anywhere else.
  if (data.keys === "j2arrows") {
    row(grid, ARROWS + ' + <span class="kbd">&#96;</span>', LT("c_j2"));
    row(grid, '<span class="kbd">F5</span>', LT("c_reset"));
    row(grid, '<span class="kbd">F2</span> <span class="kbd">F3</span>', LT("c_state"));
  } else {
  row(grid, '<span class="kbd">0</span>&ndash;<span class="kbd">9</span>', LT("c_pick"));
  if (style === "joystick" || style === "mixed") {
    row(grid, ARROWS + ' + <span class="kbd">G</span>', LT("c_j1"));
    row(grid, '<span class="kbd">W</span> <span class="kbd">A</span> <span class="kbd">S</span> <span class="kbd">D</span> + <span class="kbd">Q</span>', LT("c_j2"));
  }
  row(grid, '<span class="kbd">A</span>&ndash;<span class="kbd">Z</span> <span class="kbd">Space</span> <span class="kbd">Enter</span>', LT("c_kbd"));
  row(grid, '<span class="kbd">F5</span>', LT("c_reset"));
  // F2/F3 are RetroArch's save/load state hotkeys and act on whichever slot is
  // picked in the emulator's States menu - see c_saveNote below.
  row(grid, '<span class="kbd">F2</span> <span class="kbd">F3</span>', LT("c_state"));
  row(grid, '<span class="kbd">Right Shift</span>', LT("c_osk"));
  if (style === "keyboard" || style === "mixed") {
    row(grid, '<span class="kbd">Tab</span>', LT("c_focus"));
  }
  }
  cBox.appendChild(grid);

  // A tip that only applies to this cartridge, from gamepages.js. Written once,
  // in English, because it describes one game rather than the machine — the
  // notes below it come from setup-i18n.js and follow the language picker.
  if (data.note) {
    var nOwn = el("p","controls-note own-note");
    nOwn.innerHTML = (jaPage(g.id) || {}).note || data.note;
    cBox.appendChild(nOwn);
  }

  if (style === "keyboard") {
    var n1 = el("p","controls-note");
    n1.innerHTML = LT("c_kbdNote");
    cBox.appendChild(n1);
  } else if (style === "mixed") {
    var n2 = el("p","controls-note");
    n2.innerHTML = LT("c_mixNote");
    cBox.appendChild(n2);
  }
  if (!data.keys) {
  var nHidden = el("p","controls-note");
  nHidden.innerHTML = LT("c_hidden");
  cBox.appendChild(nHidden);
  var nBleed = el("p","controls-note");
  nBleed.innerHTML = LT("c_bleed");
  cBox.appendChild(nBleed);
  var nStick2 = el("p","controls-note");
  nStick2.innerHTML = LT("c_stick2");
  cBox.appendChild(nStick2);
  }
  var nSave = el("p","controls-note");
  nSave.innerHTML = LT("c_saveNote");
  cBox.appendChild(nSave);

  // ---- cheats (Videopac shelf) ----
  // cBox is built for every platform but only ever appended to the page via
  // cSec below, in the G7000/G7400+ branch - the PC and C64 branches build
  // their own separate boxes and never touch cBox at all. So attaching the
  // cheats block here, unconditionally, is enough to keep it off the PC
  // shelf without extra platform checks (the C64 branch has its own,
  // near-identical cheats block further down, since it needs per-entry
  // source links instead of the single odyssey2.info one used here). Data
  // comes from cheats.js (sourced from odyssey2.info's community cheat
  // page), keyed by games.js id - hidden by default behind a native
  // <details> disclosure so it doesn't spoil the page, revealed on click.
  var cheats = jaCheats((window.CHEATS_DATA && window.CHEATS_DATA[g.id]) || null, g.id);
  if (cheats) {
    var cheatsBox = document.createElement("details");
    cheatsBox.className = "cheats-box";
    var cheatsSum = document.createElement("summary");
    cheatsSum.innerHTML = window.t("revealCheats");
    cheatsBox.appendChild(cheatsSum);
    var cheatsBody = el("div","cheats-body");
    cheats.forEach(function (c) {
      var item = el("div","cheats-item");
      if (c.label) item.appendChild(el("h4",null,c.label));
      item.appendChild(el("p",null,c.text));
      // the site's own diagram/screenshot for cheats where the trick is a
      // specific on-screen spot or message - shown as-is, including the
      // handful that are animated GIFs (P.T. Barnum's Acrobats)
      if (c.img) {
        var cImg = new Image();
        cImg.className = "cheats-img";
        cImg.src = "assets/cheats/" + c.img;
        cImg.alt = c.alt || "";
        cImg.loading = "lazy";
        item.appendChild(cImg);
      }
      cheatsBody.appendChild(item);
    });
    var cheatsSrc = el("p","cheats-source");
    cheatsSrc.innerHTML = window.t("srcLabel")+' <a href="https://odyssey2.info/cheats/" target="_blank" rel="noopener">odyssey2.info</a>';
    cheatsBody.appendChild(cheatsSrc);
    cheatsBox.appendChild(cheatsBody);
    cBox.appendChild(cheatsBox);
  }

  // ---- tips (C64/PC shelves, StrategyWiki) ----
  // Same idea as the cheats block above but a different source: one short
  // in-house tip per game, each linking back to its own StrategyWiki guide
  // page (tips.js) rather than one shared source link. Written as a shared
  // helper since it's called from three different places (Videopac's cBox
  // right here, plus the C64 and PC boxes further down). Returns null
  // (renders nothing) when tips.js has no entry for this game id.
  function buildTipsBox(id) {
    var tip = (window.TIPS_DATA && window.TIPS_DATA[id]) || null;
    // walkthroughs.js: a full step-by-step walkthrough elsewhere (The
    // Walkthrough King) - listed under the tip, or alone when there is none
    var wt = (window.WALKTHROUGH_DATA && window.WALKTHROUGH_DATA[id]) || null;
    if (!tip && !wt) return null;
    var box = document.createElement("details");
    box.className = "tips-box";
    var sum = document.createElement("summary");
    sum.innerHTML = window.t("revealTips");
    box.appendChild(sum);
    var body = el("div","tips-body");
    if (tip) {
      var item = el("div","tips-item");
      var jt = jaTip(id);
      item.appendChild(el("p",null,(jt && jt.text) || tip.text));
      body.appendChild(item);
      var src = el("p","tips-source");
      src.innerHTML = window.t("srcLabel")+' <a href="'+tip.url+'" target="_blank" rel="noopener">StrategyWiki</a> '+window.t("tipsSrcTail");
      body.appendChild(src);
    }
    if (wt) {
      var w = el("p","tips-source tips-walkthrough");
      w.innerHTML = '📖 ' + window.t("fullWalkthrough") + ' <a href="'+wt.url+'" target="_blank" rel="noopener">'+wt.site+'</a>';
      body.appendChild(w);
    }
    box.appendChild(body);
    return box;
  }
  var vpTipsBox = buildTipsBox(g.id);
  if (vpTipsBox) cBox.appendChild(vpTipsBox);

  // Pick Axe Pete easter egg - the miner himself, taking a swing at his own
  // controls box, on every dump of VP43 (EU + G7400+ Plus-graphics + the
  // community mod all share the id list below).
  var PETE_IDS = ["vp_43", "vp_43pl", "mod_43pl"];
  if (PETE_IDS.indexOf(g.id) !== -1) {
    cBox.classList.add("pete-hit");
    var peteWrap = el("span", "pete-axe");
    var peteImg = new Image();
    peteImg.src = "assets/pickaxe-pete.png";
    peteImg.alt = "";
    peteWrap.appendChild(peteImg);
    cBox.appendChild(peteWrap);
  }

  // The Mousing Cat easter egg - tilts his head and purrs, EU + French
  // releases both share the same id list below.
  var CAT_IDS = ["vp_47", "Vp47_F"];
  if (CAT_IDS.indexOf(g.id) !== -1) {
    var catWrap = el("span", "cat-wrap");
    var purrText = el("span", "purr-text", "purrrr");
    catWrap.appendChild(purrText);
    var catImgWrap = el("span", "cat-img");
    var catImg = new Image();
    catImg.src = "assets/mousing-cat.png";
    catImg.alt = "";
    catImgWrap.appendChild(catImg);
    catWrap.appendChild(catImgWrap);
    cBox.appendChild(catWrap);
  }

  // Quest for the Rings easter egg - the green dragon perched on the box,
  // breathing fire. EU + French releases share the same id list.
  var QR_IDS = ["vp_42", "Vp42_F"];
  if (QR_IDS.indexOf(g.id) !== -1) {
    var qrWrap = el("span", "qr-wrap");
    var qrDragon = el("span", "qr-dragon");
    var qrImg = new Image();
    qrImg.src = "assets/qr-dragon.png";
    qrImg.alt = "";
    qrDragon.appendChild(qrImg);
    var qrFlame = el("span", "qr-flame");
    for (var qf = 0; qf < 3; qf++) qrFlame.appendChild(document.createElement("i"));
    qrWrap.appendChild(qrFlame);
    qrWrap.appendChild(qrDragon);
    cBox.appendChild(qrWrap);
  }

  // Morse easter egg - a little lamp on the box blinks "WELCOME VISITOR"
  // in real Morse timing. EU + French releases share the same id list.
  var MORSE_IDS = ["vp_45", "Vp45_F"];
  if (MORSE_IDS.indexOf(g.id) !== -1) {
    var morseLamp = el("span", "morse-lamp");
    cBox.appendChild(morseLamp);
  }

  cSec.appendChild(cBox);
  if (g.platform === "PC") {
    // DOS games ran on a real PC keyboard (and sometimes a mouse), not a
    // joystick, and js-dos reads keys straight off the browser once the page
    // has focus - there's no RetroArch-style hotkey layer fighting it for
    // Tab/Enter/etc the way the Videopac and C64 shelves have. So this box is
    // just the per-game note (exact keys for that title) plus the couple of
    // things every DOS game on this shelf shares.
    var pcSec = el("div","section");
    pcSec.appendChild(el("h2",null,window.t("controls")));
    var pcBox = el("div","controls-box");
    if (data.note) {
      var pcNote = el("p","controls-note own-note");
      pcNote.innerHTML = (jaPage(g.id) || {}).note || data.note;
      pcBox.appendChild(pcNote);
    }
    var pcClick = el("p","controls-note");
    pcClick.innerHTML = window.t("pc_clickNote");
    pcBox.appendChild(pcClick);
    var pcEsc = el("p","controls-note");
    pcEsc.innerHTML = window.t("pc_escNote");
    pcBox.appendChild(pcEsc);
    // The DOS shelf has no save states - js-dos holds filesystem changes in
    // memory until the player commits them, which is what the Save link in
    // dos.html's top bar does.
    var pcSave = el("p","controls-note");
    pcSave.innerHTML = window.t("pc_saveNote");
    pcBox.appendChild(pcSave);
    var pcTipsBox = buildTipsBox(g.id);
    if (pcTipsBox) pcBox.appendChild(pcTipsBox);
    if (g.id === "pc_leisure_suit_larry") {
      var ken = el("span", "ken-note");
      var kenImg = new Image();
      kenImg.src = "assets/ken-sent-me.png";
      kenImg.alt = "Ken sent me";
      kenImg.title = "Ken sent me";
      ken.appendChild(kenImg);
      pcBox.appendChild(ken);
    }
    pcSec.appendChild(pcBox);
    page.appendChild(pcSec);
  } else if (g.platform === "Amiga") {
    // The engine (vAmigaWeb, in emulator/amiga.html) has its own on-screen
    // toolbar - disk swap, virtual keyboard, fullscreen, joystick/mouse
    // toggle - none of which are the Vault's own RetroArch-style hotkeys
    // (F2/F3 save states, Right Shift OSK) that the generic cBox above
    // documents for the webretro-driven shelves. Showing that box here would
    // describe controls that don't exist on this shelf, so Amiga gets its
    // own short box instead: the per-game note, then a pointer at the
    // engine's own toolbar rather than a list of keys that don't apply.
    var amSec = el("div","section");
    amSec.appendChild(el("h2",null,window.t("controls")));
    var amBox = el("div","controls-box");
    if (data.note) {
      var amNote = el("p","controls-note own-note");
      amNote.innerHTML = (jaPage(g.id) || {}).note || data.note;
      amBox.appendChild(amNote);
    }
    var amToolbar = el("p","controls-note");
    amToolbar.innerHTML = window.t("amiga_toolbarNote");
    amBox.appendChild(amToolbar);
    // Which of the Amiga's two ports the mouse / a gamepad is plugged into is a
    // choice the player has to make in the emulator's own toolbar - the shelf
    // launches with keys on port 2 and nothing on port 1, so a mouse game looks
    // dead until port 1 is switched to "mouse".
    var amPorts = el("p","controls-note");
    amPorts.innerHTML = window.t("amiga_portsNote");
    amBox.appendChild(amPorts);
    var amSave = el("p","controls-note");
    amSave.innerHTML = window.t("amiga_saveNote");
    amBox.appendChild(amSave);
    var amTipsBox = buildTipsBox(g.id);
    if (amTipsBox) amBox.appendChild(amTipsBox);
    amSec.appendChild(amBox);
    page.appendChild(amSec);
  } else if (g.platform !== "C64") {
    page.appendChild(cSec);
  } else {
    var c64Sec = el("div","section");
    c64Sec.appendChild(el("h2",null,window.t("controls")));
    var c64Box = el("div","controls-box");
    var c64Grid = el("div","controls-grid");
    row(c64Grid, '<span class="kbd">&#8592;</span> <span class="kbd">&#8593;</span> <span class="kbd">&#8595;</span> <span class="kbd">&#8594;</span> + <span class="kbd">G</span>', window.t("c64_j1"));
    row(c64Grid, '<span class="kbd">W</span> <span class="kbd">A</span> <span class="kbd">S</span> <span class="kbd">D</span> + <span class="kbd">Q</span>', window.t("c64_j2"));
    row(c64Grid, '<span class="kbd">Right&nbsp;Shift</span>', window.t("c64_vkbd"));
    row(c64Grid, '<span class="kbd">A</span>&ndash;<span class="kbd">Z</span> <span class="kbd">0</span>&ndash;<span class="kbd">9</span> <span class="kbd">Space</span> <span class="kbd">Enter</span>', LT("c_kbd"));
    // Missing before this fix: on the C64 shelf, Arrows/G and WASD/Q are wired
    // as joystick 1/2 (see the two rows above), which means those specific
    // keys - including Enter/Return, since RETURN doubles as "joystick 1
    // start" - are intercepted before they reach the C64's own keyboard,
    // unless Game Focus is on. Any keyboard-driven C64 game whose real
    // controls happen to land on one of those letters (checked against
    // Castle Wolfenstein: RETURN to begin, and G/T/Q are all real in-game
    // keys there) is unplayable without this row. The generic (non-C64)
    // control box already had this tip for "keyboard"/"mixed" games; the C64
    // box just never carried it.
    row(c64Grid, '<span class="kbd">Tab</span>', LT("c_focus"));
    row(c64Grid, '<span class="kbd">F2</span> <span class="kbd">F3</span>', LT("c_state"));
    c64Box.appendChild(c64Grid);
    // a per-game tip (gamepages.js "note"), then the two things that trip
    // everyone up on the C64 shelf: cracked-intro screens and the Mac F-keys.
    if (data.note) {
      var c64Note = el("p","controls-note own-note");
      c64Note.innerHTML = (jaPage(g.id) || {}).note || data.note;
      c64Box.appendChild(c64Note);
    }
    var c64Start = el("p","controls-note");
    c64Start.innerHTML = window.t("c64_startHelp");
    c64Box.appendChild(c64Start);
    var c64Mac = el("p","controls-note");
    c64Mac.innerHTML = window.t("c64_macNote");
    c64Box.appendChild(c64Mac);
    var c64Save = el("p","controls-note");
    c64Save.innerHTML = window.t("c64_saveNote");
    c64Box.appendChild(c64Save);

    // ---- cheats (C64 shelf) ----
    // Same CHEATS_DATA source as the Videopac cBox block above, but C64
    // entries carry their own per-entry `source` line (GameFAQs, C64-Wiki,
    // StrategyWiki, Mix n' Mojo...) instead of one hardcoded odyssey2.info
    // link, and the label/text are set via innerHTML rather than the el()
    // helper's textContent so the <strong>/entity formatting in cheats.js
    // renders instead of showing up as literal markup.
    var c64Cheats = jaCheats((window.CHEATS_DATA && window.CHEATS_DATA[g.id]) || null, g.id);
    if (c64Cheats) {
      var c64CheatsBox = document.createElement("details");
      c64CheatsBox.className = "cheats-box";
      var c64CheatsSum = document.createElement("summary");
      c64CheatsSum.innerHTML = window.t("revealCheats");
      c64CheatsBox.appendChild(c64CheatsSum);
      var c64CheatsBody = el("div","cheats-body");
      c64Cheats.forEach(function (c) {
        var item = el("div","cheats-item");
        if (c.label) {
          var h4 = document.createElement("h4");
          h4.innerHTML = c.label;
          item.appendChild(h4);
        }
        var p = document.createElement("p");
        p.innerHTML = c.text;
        item.appendChild(p);
        if (c.img) {
          var cImg = new Image();
          cImg.className = "cheats-img";
          cImg.src = "assets/cheats/" + c.img;
          cImg.alt = c.alt || "";
          cImg.loading = "lazy";
          item.appendChild(cImg);
        }
        if (c.source) {
          var cSrcP = el("p","cheats-source");
          // cheats.js stores these as a ready-to-render 'Source: <a>...</a>'
          // string, one per entry. The link is the same in every language, so
          // only the label in front of it is swapped for the translated one.
          cSrcP.innerHTML = c.source.replace(/^Source:/, window.t("srcLabel"));
          item.appendChild(cSrcP);
        }
        c64CheatsBody.appendChild(item);
      });
      c64CheatsBox.appendChild(c64CheatsBody);
      c64Box.appendChild(c64CheatsBox);
    }

    var c64TipsBox = buildTipsBox(g.id);
    if (c64TipsBox) c64Box.appendChild(c64TipsBox);

    // The Last Ninja easter egg - a fighter ripped straight from this very
    // .d64's sprite bank (see tools note: 63-byte multicolor sprite blocks,
    // top/bottom halves stored 10 blocks apart in the level file), standing
    // guard on the controls box and striking with his staff every few seconds.
    if (g.id === "c64_last_ninja") {
      var njWrap = el("span", "ninja-wrap");
      var njStance = new Image();
      njStance.src = "assets/ninja-stance.png";
      njStance.alt = "";
      njStance.className = "ninja-pose ninja-stance";
      var njStrike = new Image();
      njStrike.src = "assets/ninja-strike.png";
      njStrike.alt = "";
      njStrike.className = "ninja-pose ninja-strike";
      njWrap.appendChild(njStance);
      njWrap.appendChild(njStrike);
      c64Box.appendChild(njWrap);
    }

    // Zak McKracken easter egg - Zak peeks over the top edge of the controls
    // box, ducks back down and pops up again somewhere else. See .zak-peek.
    if (g.id === "c64_zak_mckracken") {
      var zkWrap = el("span", "zak-peek");
      var zkImg = new Image();
      zkImg.src = "assets/zak-peek.png";
      zkImg.alt = "";
      zkWrap.appendChild(zkImg);
      c64Box.appendChild(zkWrap);
      var zkReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (zkReduced) {
        zkWrap.classList.add("up");
      } else {
        var zkLast = -1;
        function zkPop(){
          var boxW = c64Box.clientWidth || 700;
          var slots = Math.max(3, Math.floor((boxW - 60) / 90));
          var pick;
          do { pick = Math.floor(Math.random() * slots); } while (pick === zkLast && slots > 1);
          zkLast = pick;
          zkWrap.style.left = (24 + pick * ((boxW - 60 - 47) / Math.max(1, slots - 1))) + "px";
          zkWrap.classList.add("up");
          setTimeout(function(){
            zkWrap.classList.remove("up");
            setTimeout(zkPop, 900 + Math.random() * 2600);
          }, 2200 + Math.random() * 1800);
        }
        setTimeout(zkPop, 1200);
      }
    }

    c64Sec.appendChild(c64Box);
    page.appendChild(c64Sec);
  }

  // ---- other versions of this game (see alternates.js) ----
  // The shelf shows one card per game; the other dumps of the same cartridge
  // (French release, G7000/G7400+ variant, community mods, alt dumps) are
  // listed here on the primary's page. An alternate's own page gets a note
  // pointing back at the entry the shelf actually shows.
  if (window.VAULT_ALT) {
    var altIds = window.VAULT_ALT.altsOf(g.id);
    var primId = window.VAULT_ALT.primaryOf(g.id);
    function gameById(id){ return games.find(function(x){ return x.id === id; }); }
    if (altIds && altIds.length) {
      var aSec = el("div","section");
      aSec.appendChild(el("h2",null,window.t("altVersions")));
      var aBox = el("div","alt-box");
      var aNote = el("p","alt-note",window.t("altNote"));
      aBox.appendChild(aNote);
      var aList = el("ul","alt-list");
      altIds.forEach(function(id){
        var ag = gameById(id);
        if (!ag) return;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "game.html?id=" + encodeURIComponent(id);
        a.textContent = ag.title;
        li.appendChild(a);
        var meta = el("span","alt-meta"," — " + ag.platform + " · " + ag.category);
        li.appendChild(meta);
        aList.appendChild(li);
      });
      aBox.appendChild(aList);
      aSec.appendChild(aBox);
      page.appendChild(aSec);
    } else if (primId) {
      var pg = gameById(primId);
      if (pg) {
        var pSec = el("div","section");
        var pBox = el("div","alt-box alt-backref");
        var pNote = el("p","alt-note");
        pNote.innerHTML = window.t("altOf", { title:
          '<a href="game.html?id=' + encodeURIComponent(primId) + '">' + pg.title + '</a>' });
        pBox.appendChild(pNote);
        pSec.appendChild(pBox);
        page.appendChild(pSec);
      }
    }
  }

  // ---- extras (your own scans: original manual, maps, boards) ----
  var extras = (window.EXTRAS_DATA && window.EXTRAS_DATA[g.id]) || null;
  if (extras) {
    var eSec = el("div","section");
    var eH = el("h2",null,window.t("extras"));
    eH.appendChild(el("span","sec-note",LT("s_extras")));
    eSec.appendChild(eH);
    var eList = el("div","extras-list");
    Object.keys(extras).forEach(function(kind){
      var file = "extras/" + extras[kind];
      var label = kind === "manual" ? LT("s_origManual") : kind === "map" ? LT("s_map") : kind.charAt(0).toUpperCase()+kind.slice(1);
      var wrap = el("div");
      wrap.appendChild(el("h3",null,label));
      if (/\.pdf$/i.test(file)) {
        var ifr = document.createElement("iframe");
        ifr.className = "extras-pdf";
        ifr.src = file;
        ifr.title = label + " - " + g.title;
        wrap.appendChild(ifr);
      } else {
        var im = new Image();
        im.className = "extras-img";
        im.src = file;
        im.alt = label + " - " + g.title;
        wrap.appendChild(im);
      }
      var dl = el("p","extras-dl");
      dl.innerHTML = '<a href="'+file+'" target="_blank" rel="noopener">Open ' + label.toLowerCase() + ' in a new tab</a>';
      wrap.appendChild(dl);
      eList.appendChild(wrap);
    });
    eSec.appendChild(eList);
    page.appendChild(eSec);
  }

  // ---- manual ----
  var mSec = el("div","section");
  var mH = el("h2",null,window.t("manual"));
  // Two kinds of manual: a scan of the printed booklet (data.manual.item,
  // page images under manuals/) and, for a game that never had a booklet,
  // the instructions the author wrote themselves (data.manual.text).
  if (data.manual && data.manual.item) mH.appendChild(el("span","sec-note","scan: "+data.manual.source+" (archive.org)"));
  else if (data.manual) mH.appendChild(el("span","sec-note","from "+data.manual.source));
  mSec.appendChild(mH);

  if (data.manual && data.manual.item) {
    var m = data.manual, cur = 0;
    var reader = el("div","manual-reader");
    var stage = el("div","manual-stage");
    var pageImg = new Image();
    pageImg.alt = "Manual page";
    pageImg.addEventListener("click", function(){ pageImg.classList.toggle("zoomed"); });
    stage.appendChild(pageImg);
    var prev = el("div","manual-nav prev","◀");
    var next = el("div","manual-nav next","▶");
    stage.appendChild(prev); stage.appendChild(next);
    reader.appendChild(stage);

    var bar = el("div","manual-bar");
    var bPrev = el("button",null,"◀ Prev");
    var counter = el("span",null,"");
    var bNext = el("button",null,"Next ▶");
    bar.appendChild(bPrev); bar.appendChild(counter); bar.appendChild(bNext);
    reader.appendChild(bar);

    var thumbs = el("div","manual-thumbs");
    var thumbImgs = [];
    for (var p=0;p<m.pages;p++)(function(p){
      var t = new Image();
      t.loading="lazy";
      t.src = "manuals/"+m.item+"/p"+String(p).padStart(2,"0")+".jpg";
      t.addEventListener("click", function(){ show(p); });
      thumbs.appendChild(t); thumbImgs.push(t);
    })(p);
    reader.appendChild(thumbs);

    function show(p){
      cur = Math.max(0, Math.min(m.pages-1, p));
      pageImg.classList.remove("zoomed");
      pageImg.src = "manuals/"+m.item+"/p"+String(cur).padStart(2,"0")+".jpg";
      counter.textContent = window.t("pageLabel") + " " + (cur+1) + " / " + m.pages;
      thumbImgs.forEach(function(t,i){ t.classList.toggle("active", i===cur); });
    }
    prev.addEventListener("click", function(){ show(cur-1); });
    next.addEventListener("click", function(){ show(cur+1); });
    bPrev.addEventListener("click", function(){ show(cur-1); });
    bNext.addEventListener("click", function(){ show(cur+1); });
    document.addEventListener("keydown", function(e){
      if(e.key==="ArrowLeft") show(cur-1);
      if(e.key==="ArrowRight") show(cur+1);
    });
    show(0);
    mSec.appendChild(reader);
  } else if (data.manual && data.manual.text) {
    // Written once, in English, like the controls note above it - it describes
    // this one game rather than the machine, so it does not follow the
    // language picker the way setup-i18n.js strings do.
    var mt = el("div","manual-text");
    mt.innerHTML = data.manual.text;
    if (data.manual.url) {
      var msrc = el("p","manual-source");
      msrc.innerHTML = 'Source: <a href="' + esc(data.manual.url) +
        '" target="_blank" rel="noopener">' + esc(data.manual.source) + '</a>';
      mt.appendChild(msrc);
    }
    mSec.appendChild(mt);
  } else {
    mSec.appendChild(el("p","missing-note",LT("s_noManual")));
  }
  page.appendChild(mSec);

  // ---- video ----
  var vSec = el("div","section");
  var vH = el("h2",null,window.t("gameplay"));
  vSec.appendChild(vH);
  if (data.video) {
    vH.appendChild(el("span","sec-note",data.video.title));
    var wrap = el("div","video-wrap");
    // The game's own page shows the real gameplay video (YouTube) when one
    // exists - it's a proper playthrough with sound, which is what belongs
    // on a dedicated page. The local mp4s are short muted preview loops made
    // for the featured/homebrew banners; here they're only a fallback for
    // entries that have no YouTube video at all (or if the embed's own
    // network request fails).
    function showClip() {
      var clip = document.createElement("video");
      clip.className = "video-clip";
      clip.src = "clips/clip_" + g.id + ".mp4?v=" + (window.CLIP_V || 1);
      clip.autoplay = true; clip.muted = true; clip.loop = true;
      clip.playsInline = true; clip.preload = "auto"; clip.controls = true;
      clip.addEventListener("error", function () {
        // Neither a YouTube id nor a working local clip - say so instead of
        // leaving the empty 16:9 .video-wrap box (sized/backgrounded for a
        // video/iframe) sitting there as a big black rectangle.
        wrap.replaceWith(el("p", "missing-note", LT("s_noVideo")));
      }, { once: true });
      wrap.innerHTML = "";
      wrap.appendChild(clip);
      var pr = clip.play && clip.play(); if (pr && pr.catch) pr.catch(function(){});
    }
    function showYouTube() {
      var ifr = document.createElement("iframe");
      ifr.src = "https://www.youtube-nocookie.com/embed/" + data.video.id;
      ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      ifr.allowFullscreen = true;
      ifr.title = data.video.title;
      wrap.appendChild(ifr);
    }
    if (data.video.id) {
      showYouTube();
    } else {
      showClip();
    }
    vSec.appendChild(wrap);
  } else {
    vSec.appendChild(el("p","missing-note",LT("s_noVideo")));
  }
  page.appendChild(vSec);

  // ---- advert (C64 shelf only) ----
  if (g.platform === "C64" && window.buildC64Ad) {
    var adSec = el("div","section c64ad-section");
    var adLink = document.createElement("a");
    var sp = ((window.FEATURED_DATA || {}).sponsors || [])[0] || null;
    adLink.href = (sp && sp.url) || "#"; adLink.target = "_blank"; adLink.rel = "noopener sponsored";
    adLink.className = "c64ad-link";
    adLink.appendChild(window.buildC64Ad(sp));
    var adTag = el("span","sponsor-tag", window.t("sponsored"));
    adLink.appendChild(adTag);
    adSec.appendChild(adLink);
    page.appendChild(adSec);
  }
})();
