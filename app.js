(function () {
  // Bump when you add or replace anything in covers/ (see renderCard).
  var COVER_V = 28;
  // Bump when you add or re-record anything in clips/ (featured gameplay clips).
  var CLIP_V = 7;

  // Attract-screen palette, same letters as the SELECT GAME splash. Declared
  // up here because render() runs before the code further down this file.
  var ATTRACT_COLORS = ["#4ade80", "#ff6fc9", "#b39bff", "#3bffe9", "#ffffff",
                        "#ffd23b", "#ff4d4d", "#ff9d3b", "#a6e13c", "#5c8dff"];

  var COVER_COLORS = [
    "#5b8def", "#3ba97a", "#c07de0", "#e0865a",
    "#d65a7e", "#8a8f98", "#e0c05a", "#4fb3bf"
  ];

  // Category groups: raw catalogue "category" values collapse into these
  // for filtering/badging, per platform (G7000/G7400+) already handled separately.
  var CATEGORY_GROUPS = [
    { key: "eu",       label: "Videopac (EU)",  color: "#5b8def", match: ["Official Videopac (EU)"] },
    { key: "french",   label: "French dump",    color: "#4fb3bf", match: ["Official Videopac (French)"] },
    { key: "us",       label: "Odyssey2 (US)",  color: "#3ba97a", match: ["Official Odyssey2 (US)"] },
    { key: "imagic",   label: "Imagic",         color: "#e0c05a", match: ["Imagic"] },
    { key: "parker",   label: "Parker Brothers",color: "#d65a7e", match: ["Parker Brothers"] },
    { key: "jopac",    label: "Jopac",          color: "#8a6fe0", match: ["Jopac (French)"] },
    { key: "brazil",   label: "Philips Brazil", color: "#2fb47c", match: ["Philips Brazil"] },
    { key: "pal",      label: "PAL",            color: "#5ac48a", match: ["PAL dumps"] },
    { key: "modified", label: "Modified",       color: "#e0865a", match: ["Modified / fixed"] },
    { key: "rare",     label: "Rare",           color: "#c07de0", match: ["Rare / unreleased", "Utility / unknown"] },
    { key: "homebrew", label: "Homebrew",       color: "#e05a7e", match: ["Homebrew (this project)", "Homebrew (community)"] },
    { key: "c64",      label: "Commodore 64",   color: "#b98a5f", match: ["Commodore 64"] },
    { key: "pc",       label: "MS-DOS",         color: "#4a7fd6", match: ["MS-DOS"] }
  ];

  var CATEGORY_LOOKUP = {};
  CATEGORY_GROUPS.forEach(function (grp) {
    grp.match.forEach(function (rawCat) { CATEGORY_LOOKUP[rawCat] = grp; });
  });

  function platformBadge(p) {
    return p === "G7400+" ? "badge-g7400" : p === "C64" ? "badge-c64" : p === "PC" ? "badge-pc" : "badge-g7000";
  }

  function groupFor(g) {
    return CATEGORY_LOOKUP[g.category] || { key: "other", label: g.category, color: "#8a8f98" };
  }

  // Chip and badge wording comes from i18n.js so it follows the language
  // picker; the English label in CATEGORY_GROUPS is the fallback.
  function catLabel(grp) {
    var k = "cat_" + grp.key, v = window.t(k);
    return (v && v !== k) ? v : grp.label;
  }

  // Several carts appear more than once with the SAME title, platform and
  // category, because more than one dump of them survives - e.g. Neutron Star
  // has a plain 8K image, a full 12K bank-switched image, and a corrected
  // version of that 12K image. The rows were indistinguishable in the grid,
  // so surface the dump type from the tags.
  var VARIANT_LABELS = { "banked-rom": "var_banked", "alt-dump": "var_alt" };
  function variantFor(g) {
    for (var i = 0; i < g.tags.length; i++) {
      if (VARIANT_LABELS[g.tags[i]]) return window.t(VARIANT_LABELS[g.tags[i]]);
    }
    return null;
  }

  // What a game actually is, from genres.js - filters that combine with the
  // origin filters above, so "G7400 + shooter + two players" is one query.
  var GENRE_ORDER = ["action","platformer","shooter","fighting","maze","sports",
                     "racing","strategy","puzzle","adventure","education","gambling","utility"];
  var PLAYER_ORDER = ["p1","p12","p2"];
  function genreOf(g) { return ((window.GENRE_DATA || {})[g.id] || {}).genre || null; }
  function playersOf(g) { return ((window.GENRE_DATA || {})[g.id] || {}).players || null; }

  function buildFacetChips(el, order, values, labelKey, stateKey, allLabel) {
    var counts = {};
    platformGames().forEach(function (g) {
      var v = values(g); if (v) counts[v] = (counts[v] || 0) + 1;
    });
    var entries = [];
    order.forEach(function (k) {
      if (counts[k]) entries.push({ key: k, label: window.t(labelKey + k), count: counts[k] });
    });
    fillSelect(el, allLabel, entries, state[stateKey]);
  }

  // Shelf order. The catalogue is a numbered series - Videopac 1 through 60 -
  // so that is the order a collector expects, not the alphabet. Entries with
  // no Videopac number (US, Brazilian, Jopac, prototypes, homebrew) follow
  // afterwards, grouped by where they came from.
  var CATEGORY_RANK = {
    eu: 0, french: 1, pal: 2, us: 3, brazil: 4, jopac: 5,
    imagic: 6, parker: 7, modified: 8, rare: 9, homebrew: 10, c64: 11, pc: 12
  };
  function shelfKey(g) {
    var n = parseInt(g.vpNumber, 10);
    var rank = CATEGORY_RANK[groupFor(g).key];
    return [isNaN(n) ? 1 : 0, isNaN(n) ? 0 : n, rank === undefined ? 12 : rank, g.title.toLowerCase()];
  }
  function bySort(a, b) {
    if (state.sort === "az") return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
    var ka = shelfKey(a), kb = shelfKey(b);
    for (var i = 0; i < ka.length; i++) {
      if (ka[i] < kb[i]) return -1;
      if (ka[i] > kb[i]) return 1;
    }
    return 0;
  }

  function hashColor(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return COVER_COLORS[h % COVER_COLORS.length];
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function initials(title) {
    var words = title.replace(/[^a-zA-Z0-9 ]/g, "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // ---- Favorites -------------------------------------------------------
  // Stored in localStorage, which lives in the browser profile on disk, so it
  // survives closing the tab, quitting the browser and rebooting. It is per
  // browser and per origin though: favorites saved on http://localhost:8000
  // won't show up in a different browser, and clearing "site data" wipes them.
  // Export/Import below writes them to a small JSON file you can keep or move.
  // NOTE: the app is branded "Retro Vault" now, but every localStorage key
  // keeps its original VideopacVault_ prefix on purpose - renaming the keys
  // would silently orphan saved favorites and settings in every install.
  var FAV_KEY = "VideopacVault_favorites";
  var favorites = {};
  try {
    favorites = JSON.parse(localStorage.getItem(FAV_KEY) || "{}") || {};
  } catch (e) {
    favorites = {};
  }
  function isFav(id) { return !!favorites[id]; }
  function favCount() { return Object.keys(favorites).length; }
  function saveFavs() {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch (e) {
      alert("Could not save favorites - your browser is blocking local storage for this page.");
    }
  }
  function toggleFav(id) {
    if (favorites[id]) delete favorites[id];
    else favorites[id] = 1;
    saveFavs();
    updateListChips();
  }

  function hasPackaging(id) {
    return !!(window.PACKAGING_DATA && window.PACKAGING_DATA[id]);
  }

  var SORT_KEY = "VideopacVault_sort";
  var SHELF_KEY = "VideopacVault_shelf";
  var savedShelf = localStorage.getItem(SHELF_KEY);
  // G7000/G7400+ used to be their own standalone shelves; they're now a
  // console filter living under Category, on the Videopac shelf. Anyone whose
  // browser still has one of those old values saved lands on Videopac with
  // that console pre-selected in the Category dropdown, instead of losing
  // the setting outright.
  var savedConsole = null;
  if (savedShelf === "G7000" || savedShelf === "G7400+") {
    savedConsole = savedShelf;
    savedShelf = "videopac";
  }
  if (["videopac", "C64", "PC"].indexOf(savedShelf) === -1) savedShelf = "videopac";
  localStorage.setItem(SHELF_KEY, savedShelf);
  var state = {
    games: [], platform: savedShelf, category: savedConsole || "all", query: "", list: "all",
    sort: localStorage.getItem(SORT_KEY) || "number",
    genre: "all", players: "all"
  };

  var grid = document.getElementById("grid");
  var emptyState = document.getElementById("emptyState");
  var resultCount = document.getElementById("resultCount");
  var categorySel = document.getElementById("categorySel");
  var genreSel = document.getElementById("genreSel");
  var playerSel = document.getElementById("playerSel");
  var sortSel = document.getElementById("sortSel");
  var clearBtn = document.getElementById("clearFilters");
  var searchInput = document.getElementById("search");

  if (window.GAMES_DATA && window.GAMES_DATA.games) {
    state.games = window.GAMES_DATA.games;
    buildCategoryChips(platformGames());
    buildFacets();
    updateListChips();
    applyLang();
    buildShowcase();
    syncShelfChips();
    render();
  } else {
    grid.innerHTML = '<p style="padding:24px;color:#e0865a;">games.js did not load - make sure games.js sits next to index.html and is included before app.js.</p>';
  }

  // The games on the active shelf. Counts, placeholders and filter options
  // are all computed from this rather than the whole catalogue, so the
  // Videopac shelf says 213 games and the C64/PC shelves say their own number -
  // the shelves never mix.
  function platformGames() {
    return state.games.filter(function (g) {
      if (state.platform === "all") return true;
      if (state.platform === "videopac") return g.platform !== "C64" && g.platform !== "PC";
      return g.platform === state.platform;
    });
  }

  function syncShelfChips() {
    document.querySelectorAll("#platformChips .chip").forEach(function (c) {
      c.classList.toggle("active", c.dataset.platform === state.platform);
    });
    // The featured panels are shelf-specific and always built, just shown or
    // hidden per active shelf: the Videopac one on every shelf except C64/PC,
    // the C64 one only on the C64 shelf, the PC one only on the PC shelf.
    var sc = document.getElementById("showcase");
    if (sc) sc.hidden = state.platform === "C64" || state.platform === "PC";
    var c64sc = document.getElementById("c64showcase");
    if (c64sc) c64sc.hidden = state.platform !== "C64";
    var pcsc = document.getElementById("pcshowcase");
    if (pcsc) pcsc.hidden = state.platform !== "PC";
  }

  function fillSelect(sel, allLabel, entries, current) {
    var html = '<option value="all">' + allLabel + '</option>';
    entries.forEach(function (e) {
      html += '<option value="' + e.key + '">' + e.label + ' (' + e.count + ')</option>';
    });
    sel.innerHTML = html;
    sel.value = current;
    sel.classList.toggle("on", current !== "all");
  }

  // G7000 and G7400+ aren't their own shelf any more - they're a console
  // filter that only makes sense on the Videopac shelf, so they show up as
  // two extra entries at the top of the Category dropdown instead of as
  // standalone chips. Reuses state.category (their keys, "G7000"/"G7400+",
  // never collide with a CATEGORY_GROUPS key), so matches() below treats them
  // as just another category value.
  function buildCategoryChips(games) {
    var counts = {};
    games.forEach(function (g) { var key = groupFor(g).key; counts[key] = (counts[key] || 0) + 1; });
    var entries = [];
    if (state.platform === "videopac") {
      var consoleCounts = { "G7000": 0, "G7400+": 0 };
      games.forEach(function (g) { if (consoleCounts[g.platform] !== undefined) consoleCounts[g.platform]++; });
      ["G7000", "G7400+"].forEach(function (p) {
        if (consoleCounts[p]) entries.push({ key: p, label: p, count: consoleCounts[p] });
      });
    }
    CATEGORY_GROUPS.forEach(function (grp) {
      if (counts[grp.key]) entries.push({ key: grp.key, label: catLabel(grp), count: counts[grp.key] });
    });
    fillSelect(categorySel, window.t("allCats") + " (" + games.length + ")", entries, state.category);
  }

  function matches(g) {
    if (state.list === "fav" && !isFav(g.id)) return false;
    if (state.list === "pack" && !hasPackaging(g.id)) return false;
    if (state.platform === "videopac") { if (g.platform === "C64" || g.platform === "PC") return false; }
    else if (state.platform !== "all" && g.platform !== state.platform) return false;
    if (state.genre !== "all" && genreOf(g) !== state.genre) return false;
    if (state.players !== "all" && playersOf(g) !== state.players) return false;
    if (state.category !== "all") {
      if (state.category === "G7000" || state.category === "G7400+") {
        if (g.platform !== state.category) return false;
      } else if (groupFor(g).key !== state.category) return false;
    }
    if (state.query) {
      var q = state.query.toLowerCase();
      // search the regional names too, so "Thunderball" finds Flipper and
      // "Bacara" finds Blackjack
      var hay = g.title + " " + g.filename;
      var br = (window.BRAZIL_DATA || {})[g.id], us = (window.USA_DATA || {})[g.id];
      if (br) hay += " " + br.title + " " + br.num;
      if (us) hay += " " + us.title + " " + us.num;
      if (hay.toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  }

  // The community panel sits partway down the library rather than at the top -
  // it reads as a signpost you come across, not a banner you scroll past.
  // An empty advert slot doesn't need artwork - it gets the console's own
  // attract-screen treatment instead: rainbow letters bouncing off the edges,
  // the way the Videopac idled when nobody was playing.
  function attractBanner(text) {
    var wrap = document.createElement("span");
    wrap.className = "attract";
    var word = document.createElement("span");
    word.className = "attract-word";
    var n = 0;
    text.split("").forEach(function (ch) {
      if (ch === " ") {
        word.appendChild(Object.assign(document.createElement("span"),
          { className: "attract-space" }));
      } else {
        var el = document.createElement("span");
        el.className = "attract-letter";
        el.textContent = ch;
        el.style.color = ATTRACT_COLORS[n % ATTRACT_COLORS.length];
        word.appendChild(el);
        n++;
      }
    });
    wrap.appendChild(word);

    // DVD-logo drift. Starts once the element has a measurable size.
    var x = 0, y = 0, dx = 0.7, dy = 0.45, shift = 0, raf = null;
    function step() {
      var bw = wrap.clientWidth, bh = wrap.clientHeight;
      var ww = word.offsetWidth, wh = word.offsetHeight;
      if (bw && ww) {
        x += dx; y += dy;
        var maxX = bw - ww, maxY = bh - wh;
        if (x <= 0 || x >= maxX) { dx = -dx; x = Math.max(0, Math.min(x, maxX)); recolour(); }
        if (y <= 0 || y >= maxY) { dy = -dy; y = Math.max(0, Math.min(y, maxY)); recolour(); }
        word.style.transform = "translate(" + x + "px," + y + "px)";
      }
      raf = requestAnimationFrame(step);
    }
    function recolour() {
      shift++;
      word.querySelectorAll(".attract-letter").forEach(function (el, i) {
        el.style.color = ATTRACT_COLORS[(i + shift) % ATTRACT_COLORS.length];
      });
    }
    raf = requestAnimationFrame(step);
    // ...and pause it when scrolled out of view, so it isn't burning a core
    // in the background. Started above rather than here: the observer's first
    // callback doesn't arrive until the element is in the document.
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !raf) raf = requestAnimationFrame(step);
          else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
        });
      }).observe(wrap);
    }
    return wrap;
  }

  // The C64-style advert banner lives in c64ad.js (shared with game.html):
  // window.buildC64Ad(sponsor) returns the animated banner element.
  function c64AdBlock() {
    var sp = ((window.FEATURED_DATA || {}).sponsors || [])[0] || null;
    var strip = document.createElement("div"); strip.className = "sponsor-strip c64-ad-strip";
    var a = document.createElement("a"); a.className = "c64ad-link";
    a.href = (sp && sp.url) || "#"; a.target = "_blank"; a.rel = "noopener sponsored";
    a.appendChild(window.buildC64Ad(sp));
    var tag = document.createElement("span"); tag.className = "sponsor-tag"; tag.textContent = window.t("sponsored");
    a.appendChild(tag);
    strip.appendChild(a);
    return strip;
  }

  // The PC-style advert banner lives in pcad.js (shared with game.html):
  // window.buildPcAd(sponsor) returns the animated banner element.
  function pcAdBlock() {
    var sp = ((window.FEATURED_DATA || {}).sponsors || [])[0] || null;
    var strip = document.createElement("div"); strip.className = "sponsor-strip pc-ad-strip";
    var a = document.createElement("a"); a.className = "pcad-link";
    a.href = (sp && sp.url) || "#"; a.target = "_blank"; a.rel = "noopener sponsored";
    a.appendChild(window.buildPcAd(sp));
    var tag = document.createElement("span"); tag.className = "sponsor-tag"; tag.textContent = window.t("sponsored");
    a.appendChild(tag);
    strip.appendChild(a);
    return strip;
  }

  function sponsorBlock() {
    var list = (window.FEATURED_DATA || {}).sponsors || [];
    var tpl = document.getElementById("sponsorTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    list.forEach(function (sp) {
      var a = document.createElement("a");
      a.className = "sponsor" + (sp.image ? "" : " sponsor-empty");
      a.href = sp.url;
      a.target = "_blank";
      a.rel = "noopener sponsored";
      if (sp.image) {
        var img = document.createElement("img");
        img.src = "assets/" + sp.image;
        img.alt = "";
        a.appendChild(img);
      } else {
        a.appendChild(attractBanner(sp.attract || "ADVERTISE HERE"));
      }
      var tag = document.createElement("span");
      tag.className = "sponsor-tag";
      tag.textContent = window.t("sponsored");
      a.appendChild(tag);
      var sr = document.createElement("span");
      sr.className = "sponsor-sr";
      sr.textContent = sp.name + " — " + (sp.text || "");
      a.appendChild(sr);
      node.appendChild(a);
    });
    return node;
  }

  // ---- The featured layout, used twice ---------------------------------
  // Once at the top of the page, once for the homebrew panel inside the grid.
  // Cover on the left, blurb in the middle, a screenshot on the right, and a
  // column of thumbnails that also rotate on their own.
  function gameById(id) {
    return state.games.filter(function (g) { return g.id === id; })[0];
  }

  // "shot" takes a filename or a list of them; two are shown side by side.
  //
  // They live in covers/ under a shot_ prefix rather than in a folder of their
  // own, and that is deliberate. The update endpoint only writes to a fixed
  // whitelist of folders, and that whitelist lives in serve.py - which the
  // updater deliberately never overwrites, since a remote list should not be
  // able to widen its own permissions. So anything in a new folder can never
  // reach an existing install. Put new files where the updater is already
  // allowed to write.
  function shotMarkup(shot) {
    if (!shot) return "";
    var list = Array.isArray(shot) ? shot : [shot];
    var imgs = list.map(function (s) {
      return '<img class="feature-shot" src="covers/shot_' + s + '" alt="">';
    }).join("");
    return list.length > 1 ? '<div class="feature-shots">' + imgs + '</div>' : imgs;
  }

  // The right-hand slot prefers a locally-recorded gameplay clip over the
  // static shot_ screenshot, same three-layer idea as the C64 panels below
  // (clip -> YouTube -> still image) - but Videopac's still image is a
  // curated shot_ screenshot (already good, deliberately picked per game),
  // not generic cover art, so that's what the final fallback restores rather
  // than a cover. Both callers of featureRotator() (the top-of-page panel
  // and the Videopac homebrew panel) already use an <a class="feature-main">
  // wrapper, so - unlike the C64 split - one shared implementation covers
  // both without any nested-anchor problem.
  function videopacClipFallback(box, shotVal) {
    var vid = box.getAttribute("data-vid");
    if (vid) {
      box.innerHTML = '<iframe src="' + ytEmbed(vid) + '" title="" loading="lazy" ' +
        'frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" ' +
        'allowfullscreen></iframe>';
    } else {
      box.outerHTML = shotMarkup(shotVal);
    }
  }

  // Returns a function that stops the rotation - the homebrew panel is thrown
  // away and rebuilt on every resize, and its old timer has to go with it.
  function featureRotator(main, list, picks) {
    var at = 0, timer = null;

    function videoSlot(g, pick) {
      var gp = (window.GAMEPAGES_DATA || {})[g.id] || {};
      var vid = gp.video && gp.video.id ? gp.video.id : "";
      // clipId lets a featured pick play a different game's recorded clip
      // than the one it links to - see the comment on "clipId" in
      // featured.js. The YouTube fallback (data-vid) still comes from this
      // pick's own game id, so a clip load failure recovers to the correct
      // embed rather than the substitute game's.
      var clipId = (pick && pick.clipId) || g.id;
      return '<div class="feature-video" data-gid="' + g.id + '" data-vid="' + vid + '">' +
        '<video class="feature-clip" src="clips/clip_' + clipId + '.mp4?v=' + CLIP_V + '" ' +
        'autoplay muted loop playsinline preload="auto"></video></div>';
    }

    function wireClip(shotVal) {
      var box = main.querySelector(".feature-video");
      if (!box) return;
      var v = box.querySelector("video");
      if (!v) return;
      v.addEventListener("error", function () { videopacClipFallback(box, shotVal); }, { once: true });
      var p = v.play && v.play();
      if (p && p.catch) p.catch(function () {});
    }

    function show(n) {
      at = (n + picks.length) % picks.length;
      var pick = picks[at], g = gameById(pick.id);
      var gen = (window.GENRE_DATA || {})[g.id] || {};
      main.href = "game.html?id=" + encodeURIComponent(g.id);
      var homebrew = groupFor(g).key === "homebrew";
      main.innerHTML =
        '<span class="feature-cover-wrap">' +
        '<img class="feature-cover" src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
        'onerror="this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'">' +
        (homebrew ? '<span class="cover-ribbon">' + window.t("cat_homebrew") + '</span>' : '') +
        '</span>' +
        '<div class="feature-copy">' +
        '<h3>' + g.title + '</h3>' +
        '<p class="feature-blurb">' + pick.blurb + '</p>' +
        '<div class="feature-meta">' +
        '<span class="badge ' + platformBadge(g.platform) + '">' + g.platform + '</span>' +
        (gen.genre ? '<span class="badge badge-cat">' + window.t("g_" + gen.genre) + '</span>' : '') +
        (gen.players ? '<span class="badge badge-cat">' + window.t("p_" + gen.players) + '</span>' : '') +
        '</div></div>' + videoSlot(g, pick);
      wireClip(pick.shot);
      list.querySelectorAll(".feature-thumb").forEach(function (b, n2) {
        b.classList.toggle("on", n2 === at);
      });
    }

    list.innerHTML = picks.map(function (p, n) {
      var g = gameById(p.id);
      // same .png-then-.jpg fallback as the big cover, or a jpg-only cover
      // (Terrahawks, for one) shows as a broken thumbnail
      return '<button class="feature-thumb" data-i="' + n + '">' +
             '<img src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
             'onerror="this.onerror=null;this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'">' +
             '<span>' + g.title + '</span></button>';
    }).join("");
    list.querySelectorAll(".feature-thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        show(parseInt(this.dataset.i, 10));
        clearInterval(timer);            // stop rotating once someone chooses
        timer = null;
      });
    });

    show(0);
    timer = setInterval(function () { show(at + 1); }, 7000);
    return function () { if (timer) clearInterval(timer); timer = null; };
  }

  // The C64 featured panel is the same idea, but the right-hand slot plays the
  // game's own gameplay clip instead of a still - muted, looping - so the
  // screenshot actually moves. It rotates more slowly than the Videopac panel
  // (14s) so a clip has time to actually play before the next one loads.
  //
  // Three layers, best first, each falling back to the next automatically:
  //   1. a locally-recorded clip at clips/clip_<id>.mp4  (instant, offline,
  //      no YouTube chrome) - preferred whenever the file is present;
  //   2. the game's YouTube gameplay embed (gamepages.js video id) if there
  //      is no local clip but the machine is online;
  //   3. the cover, if there's neither.
  // The <video> element's own error event does the 1->2/3 hop, so dropping a
  // new clip into clips/ upgrades that game with no code or config change.
  function ytEmbed(vid) {
    // youtube-nocookie + muted is what makes autoplay/loop allowed.
    return "https://www.youtube-nocookie.com/embed/" + vid +
      "?autoplay=1&mute=1&loop=1&playlist=" + vid +
      "&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1";
  }

  // When a local clip is missing, its <video> fires "error"; swap the slot for
  // the YouTube embed, or the cover if the game has no video id either.
  function c64ClipFallback(box) {
    var vid = box.getAttribute("data-vid");
    var gid = box.getAttribute("data-gid");
    var href = box.getAttribute("data-href");
    if (vid) {
      box.innerHTML = '<iframe src="' + ytEmbed(vid) + '" title="" loading="lazy" ' +
        'frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" ' +
        'allowfullscreen></iframe>';
    } else {
      box.classList.add("feature-video-fallback");
      box.innerHTML = '<a href="' + href + '"><img src="covers/' + gid + '.png?v=' + COVER_V +
        '" alt="" onerror="this.onerror=null;this.src=\'covers/' + gid + '.jpg?v=' + COVER_V + '\'"></a>';
    }
  }

  function c64FeatureRotator(main, list, picks) {
    var at = 0, timer = null;

    function videoSlot(g, href) {
      var gp = (window.GAMEPAGES_DATA || {})[g.id] || {};
      var vid = gp.video && gp.video.id ? gp.video.id : "";
      // Always reach for the local clip first; data-* carries what the error
      // handler needs to fall back to.
      return '<div class="feature-video" data-gid="' + g.id + '" data-vid="' + vid +
        '" data-href="' + href.replace(/"/g, "&quot;") + '">' +
        '<video class="feature-clip" src="clips/clip_' + g.id + '.mp4?v=' + CLIP_V + '" ' +
        'autoplay muted loop playsinline preload="auto"></video></div>';
    }

    // Wire the freshly-rendered clip: kick playback (autoplay policies) and
    // arm the missing-file fallback.
    function wireClip() {
      var box = main.querySelector(".feature-video");
      if (!box) return;
      var v = box.querySelector("video");
      if (!v) return;
      v.addEventListener("error", function () { c64ClipFallback(box); }, { once: true });
      var p = v.play && v.play();
      if (p && p.catch) p.catch(function () {});
    }

    function show(n) {
      at = (n + picks.length) % picks.length;
      var pick = picks[at], g = gameById(pick.id);
      var gen = (window.GENRE_DATA || {})[g.id] || {};
      var href = "game.html?id=" + encodeURIComponent(g.id);
      main.innerHTML =
        '<a class="feature-cover-wrap" href="' + href + '">' +
        '<img class="feature-cover" src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
        'onerror="this.onerror=null;this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'"></a>' +
        '<div class="feature-copy">' +
        '<h3><a href="' + href + '">' + g.title + '</a></h3>' +
        '<p class="feature-blurb">' + pick.blurb + '</p>' +
        '<div class="feature-meta">' +
        '<span class="badge ' + platformBadge(g.platform) + '">' + g.platform + '</span>' +
        (gen.genre ? '<span class="badge badge-cat">' + window.t("g_" + gen.genre) + '</span>' : '') +
        (gen.players ? '<span class="badge badge-cat">' + window.t("p_" + gen.players) + '</span>' : '') +
        '</div></div>' + videoSlot(g, href);
      wireClip();
      list.querySelectorAll(".feature-thumb").forEach(function (b, n2) {
        b.classList.toggle("on", n2 === at);
      });
    }

    list.innerHTML = picks.map(function (p, n) {
      var g = gameById(p.id);
      return '<button class="feature-thumb" data-i="' + n + '">' +
             '<img src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
             'onerror="this.onerror=null;this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'">' +
             '<span>' + g.title + '</span></button>';
    }).join("");
    list.querySelectorAll(".feature-thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        show(parseInt(this.dataset.i, 10));
        clearInterval(timer);            // stop rotating once someone chooses
        timer = null;
      });
    });

    show(0);
    timer = setInterval(function () { show(at + 1); }, 10000);
    return function () { if (timer) clearInterval(timer); timer = null; };
  }

  // Homebrew gets its own panel partway down the library. The games at the
  // top of the page are the ones Philips sold; these are the ones people
  // wrote afterwards, and they'd disappear among 213 covers otherwise.
  var hbStop = null;
  function homebrewBlock() {
    var picks = ((window.FEATURED_DATA || {}).homebrew || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("homebrewTpl");
    if (!picks.length || !tpl) return null;
    if (hbStop) hbStop();
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");
    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");
    node.querySelector(".hb-intro").textContent = window.t("homebrewIntro");
    hbStop = featureRotator(node.querySelector(".feature-main"),
                            node.querySelector(".feature-list"), picks);
    return node;
  }

  // The C64 shelf's own homebrew panel - same idea as the Videopac one above,
  // separate data (c64homebrew in featured.js) and template so a C64 pick
  // never leaks onto the Videopac page and vice versa. Unlike the Videopac
  // panel, the right-hand slot here plays each pick's own gameplay clip
  // instead of a static shot_ screenshot - same three-layer fallback as the
  // top-of-page C64 panel (local clips/clip_<id>.mp4 -> YouTube embed ->
  // cover art). Not a reuse of c64FeatureRotator because that one's main
  // element is a plain <div> and builds its own inner <a> around the cover;
  // this panel's main element is itself the <a> (see c64homebrewTpl), so
  // nesting another link inside it would be invalid markup. Kept as its own
  // function rather than patched into featureRotator so the Videopac
  // homebrew panel (which has no clips) is untouched.
  function c64HomebrewClipFallback(box) {
    var vid = box.getAttribute("data-vid");
    var gid = box.getAttribute("data-gid");
    if (vid) {
      box.innerHTML = '<iframe src="' + ytEmbed(vid) + '" title="" loading="lazy" ' +
        'frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" ' +
        'allowfullscreen></iframe>';
    } else {
      box.classList.add("feature-video-fallback");
      box.innerHTML = '<img src="covers/' + gid + '.png?v=' + COVER_V +
        '" alt="" onerror="this.onerror=null;this.src=\'covers/' + gid + '.jpg?v=' + COVER_V + '\'">';
    }
  }

  function c64HomebrewFeatureRotator(main, list, picks) {
    var at = 0, timer = null;

    function videoSlot(g) {
      var gp = (window.GAMEPAGES_DATA || {})[g.id] || {};
      var vid = gp.video && gp.video.id ? gp.video.id : "";
      return '<div class="feature-video" data-gid="' + g.id + '" data-vid="' + vid + '">' +
        '<video class="feature-clip" src="clips/clip_' + g.id + '.mp4?v=' + CLIP_V + '" ' +
        'autoplay muted loop playsinline preload="auto"></video></div>';
    }

    function wireClip() {
      var box = main.querySelector(".feature-video");
      if (!box) return;
      var v = box.querySelector("video");
      if (!v) return;
      v.addEventListener("error", function () { c64HomebrewClipFallback(box); }, { once: true });
      var p = v.play && v.play();
      if (p && p.catch) p.catch(function () {});
    }

    function show(n) {
      at = (n + picks.length) % picks.length;
      var pick = picks[at], g = gameById(pick.id);
      var gen = (window.GENRE_DATA || {})[g.id] || {};
      main.href = "game.html?id=" + encodeURIComponent(g.id);
      main.innerHTML =
        '<span class="feature-cover-wrap">' +
        '<img class="feature-cover" src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
        'onerror="this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'">' +
        '<span class="cover-ribbon">' + window.t("cat_homebrew") + '</span>' +
        '</span>' +
        '<div class="feature-copy">' +
        '<h3>' + g.title + '</h3>' +
        '<p class="feature-blurb">' + pick.blurb + '</p>' +
        '<div class="feature-meta">' +
        '<span class="badge ' + platformBadge(g.platform) + '">' + g.platform + '</span>' +
        (gen.genre ? '<span class="badge badge-cat">' + window.t("g_" + gen.genre) + '</span>' : '') +
        (gen.players ? '<span class="badge badge-cat">' + window.t("p_" + gen.players) + '</span>' : '') +
        '</div></div>' + videoSlot(g);
      wireClip();
      list.querySelectorAll(".feature-thumb").forEach(function (b, n2) {
        b.classList.toggle("on", n2 === at);
      });
    }

    list.innerHTML = picks.map(function (p, n) {
      var g = gameById(p.id);
      return '<button class="feature-thumb" data-i="' + n + '">' +
             '<img src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
             'onerror="this.onerror=null;this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'">' +
             '<span>' + g.title + '</span></button>';
    }).join("");
    list.querySelectorAll(".feature-thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        show(parseInt(this.dataset.i, 10));
        clearInterval(timer);
        timer = null;
      });
    });

    show(0);
    timer = setInterval(function () { show(at + 1); }, 7000);
    return function () { if (timer) clearInterval(timer); timer = null; };
  }

  // The Master Strategy Series banner - three games, always all three shown
  // at once (there are only three, and rotating one out of three defeats the
  // point of a banner that exists specifically to give them room). Bigger
  // and richer than the "featured" panel above it: box contents, a fact line,
  // and two media slots per card instead of one.
  //
  // The gameplay slot reuses the same three-layer fallback as the C64
  // homebrew panel - clips/clip_<id>.mp4 first (drop one in and it plays,
  // no code change needed), then the game's own gamepages.js YouTube video,
  // then the cover - so this works today and upgrades itself the moment a
  // clip is added. The board slot is a static photo of the physical board,
  // stored as covers/board_<id>.jpg (see the comment in featured.js for why
  // it lives in covers/ rather than a new folder).
  function msVideoFallback(box) {
    var vid = box.getAttribute("data-vid");
    var gid = box.getAttribute("data-gid");
    if (vid) {
      box.innerHTML = '<iframe src="' + ytEmbed(vid) + '" title="" loading="lazy" ' +
        'frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" ' +
        'allowfullscreen></iframe>';
    } else {
      box.innerHTML = '<img src="covers/' + gid + '.png?v=' + COVER_V +
        '" alt="" onerror="this.onerror=null;this.src=\'covers/' + gid + '.jpg?v=' + COVER_V + '\'">';
    }
  }

  function wireMsClips(host) {
    host.querySelectorAll(".ms-video").forEach(function (box) {
      var v = box.querySelector("video");
      if (!v) return;
      v.addEventListener("error", function () { msVideoFallback(box); }, { once: true });
      var p = v.play && v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  function msCard(pick) {
    var g = gameById(pick.id);
    if (!g) return "";
    var href = "game.html?id=" + encodeURIComponent(g.id);
    var gp = (window.GAMEPAGES_DATA || {})[g.id] || {};
    var vid = gp.video && gp.video.id ? gp.video.id : "";
    var contents = (pick.contents || []).map(function (c) { return "<li>" + c + "</li>"; }).join("");
    return (
      '<div class="ms-card">' +
        '<div class="ms-card-top">' +
          '<a href="' + href + '"><img class="ms-card-cover" src="covers/' + g.id + '.png?v=' + COVER_V + '" alt="" ' +
          'onerror="this.onerror=null;this.src=\'covers/' + g.id + '.jpg?v=' + COVER_V + '\'"></a>' +
          '<div class="ms-card-head">' +
            '<h3><a href="' + href + '">' + g.title + '</a></h3>' +
            '<span class="ms-year">' + pick.year + '</span>' +
            (pick.fact ? '<span class="ms-fact">' + pick.fact + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<p class="ms-blurb">' + pick.blurb + '</p>' +
        (contents ? '<ul class="ms-contents">' + contents + '</ul>' : '') +
        '<div class="ms-media">' +
          '<div class="ms-media-box">' +
            '<div class="ms-media-frame ms-video" data-gid="' + g.id + '" data-vid="' + vid + '">' +
              '<video class="ms-clip" src="clips/clip_' + g.id + '.mp4?v=' + CLIP_V + '" ' +
              'autoplay muted loop playsinline preload="auto"></video>' +
            '</div>' +
            '<span class="ms-media-cap">' + window.t("gameplay") + '</span>' +
          '</div>' +
          '<div class="ms-media-box">' +
            '<div class="ms-media-frame ms-board-frame">' +
              '<img src="covers/board_' + g.id + '.jpg" alt="">' +
            '</div>' +
            '<span class="ms-media-cap">' + window.t("msBoardLabel") + '</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // Built the same way as homebrewBlock()/communityBlock() - a <template>
  // clone dropped mid-grid by placeBlocks(), not a fixed section pinned to
  // the top of the page. Sits on its own between the sponsor strip and the
  // homebrew panel rather than immediately next to either one (see the
  // spacing comment in placeBlocks()), so it reads as a banner you scroll
  // to, not one stacked directly on top of another.
  function masterStrategyBlock() {
    var picks = ((window.FEATURED_DATA || {}).masterStrategy || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("msTpl");
    if (!picks.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".ms-grid").innerHTML = picks.map(msCard).join("");
    wireMsClips(node);
    return node;
  }

  var c64HbStop = null;
  function c64HomebrewBlock() {
    var picks = ((window.FEATURED_DATA || {}).c64homebrew || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("c64homebrewTpl");
    if (!picks.length || !tpl) return null;
    if (c64HbStop) c64HbStop();
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");
    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");
    node.querySelector(".hb-intro").textContent = window.t("homebrewIntro");
    c64HbStop = c64HomebrewFeatureRotator(node.querySelector(".feature-main"),
                                          node.querySelector(".feature-list"), picks);
    return node;
  }

  // The PC shelf's own homebrew panel - same idea as the two above, separate
  // data (pchomebrew in featured.js) and template (pchomebrewTpl) so a PC
  // pick never leaks onto the Videopac or C64 pages. Reuses
  // c64HomebrewFeatureRotator() directly rather than a third copy of that
  // function - pchomebrewTpl's main element is the <a> itself, same shape as
  // c64homebrewTpl (unlike c64FeatureRotator's plain-div main, which is what
  // the top-of-page pcfeatured panel reuses instead - see the comment there).
  // The three-layer fallback still applies even though none of these six
  // picks has a gameplay clip yet: an empty clips/clip_<id>.mp4 404s
  // immediately, and since these homebrew games have no gamepages.js video
  // id either, it falls straight through to the cover - so the panel looks
  // right today and just starts playing clips the moment Mike drops them in,
  // no code change needed.
  var pcHbStop = null;
  function pcHomebrewBlock() {
    var picks = ((window.FEATURED_DATA || {}).pchomebrew || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var tpl = document.getElementById("pchomebrewTpl");
    if (!picks.length || !tpl) return null;
    if (pcHbStop) pcHbStop();
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");
    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");
    node.querySelector(".hb-intro").textContent = window.t("homebrewIntro");
    pcHbStop = c64HomebrewFeatureRotator(node.querySelector(".feature-main"),
                                         node.querySelector(".feature-list"), picks);
    return node;
  }

  // Loops the community carousel: Next past the last card wraps back to the
  // first, Previous from the first wraps to the last. Shared by both the
  // Videopac and C64 "keeping this console alive" panels so the behaviour
  // stays identical on both shelves.
  function wireCommunityCarousel(node, track) {
    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var dir = parseInt(this.dataset.dir, 10);
        var max = track.scrollWidth - track.clientWidth;
        var atEnd = track.scrollLeft >= max - 4;
        var atStart = track.scrollLeft <= 4;
        if (dir > 0 && atEnd) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else if (dir < 0 && atStart) {
          track.scrollTo({ left: max, behavior: "smooth" });
        } else {
          track.scrollBy({ left: track.clientWidth * 0.8 * dir, behavior: "smooth" });
        }
      });
    });
  }

  // The community panel is a carousel: on a 14-inch screen six cards wrapped
  // onto a second line and webretro ended up orphaned down there on its own.
  function communityBlock() {
    var list = (window.FEATURED_DATA || {}).community || [];
    var tpl = document.getElementById("communityTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=communityHead]").textContent = window.t("communityHead");
    node.querySelector(".community-intro").textContent = window.t("communityIntro");
    var track = node.querySelector(".community-track");
    track.innerHTML = list.map(function (c) {
      return '<a class="community-item" href="' + c.url + '" target="_blank" rel="noopener" ' +
        'style="--tint:' + (c.tint || "#8a8f98") + '">' +
        '<span class="cname">' + c.name +
        (c.lang ? '<span class="clang">' + c.lang + '</span>' : '') + '</span>' +
        '<p class="cwhat">' + c.what + '</p></a>';
    }).join("");
    wireCommunityCarousel(node, track);
    return node;
  }

  // The C64 shelf's own "keeping this console alive" panel - same carousel
  // as the Videopac one above, separate data (c64community in featured.js)
  // and template so a C64 site never shows on the Videopac page or vice versa.
  function c64CommunityBlock() {
    var list = (window.FEATURED_DATA || {}).c64community || [];
    var tpl = document.getElementById("c64communityTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=communityHead]").textContent = window.t("communityHead");
    node.querySelector(".community-intro").textContent = window.t("communityIntro");
    var track = node.querySelector(".community-track");
    track.innerHTML = list.map(function (c) {
      return '<a class="community-item" href="' + c.url + '" target="_blank" rel="noopener" ' +
        'style="--tint:' + (c.tint || "#8a8f98") + '">' +
        '<span class="cname">' + c.name +
        (c.lang ? '<span class="clang">' + c.lang + '</span>' : '') + '</span>' +
        '<p class="cwhat">' + c.what + '</p></a>';
    }).join("");
    wireCommunityCarousel(node, track);
    return node;
  }

  // The PC shelf's own "keeping this console alive" panel - same carousel
  // as the Videopac/C64 ones above, separate data (pccommunity in
  // featured.js) and template so a DOS site never shows on the Videopac or
  // C64 pages or vice versa.
  function pcCommunityBlock() {
    var list = (window.FEATURED_DATA || {}).pccommunity || [];
    var tpl = document.getElementById("pccommunityTpl");
    if (!list.length || !tpl) return null;
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-i18n=communityHead]").textContent = window.t("communityHead");
    node.querySelector(".community-intro").textContent = window.t("communityIntro");
    var track = node.querySelector(".community-track");
    track.innerHTML = list.map(function (c) {
      return '<a class="community-item" href="' + c.url + '" target="_blank" rel="noopener" ' +
        'style="--tint:' + (c.tint || "#8a8f98") + '">' +
        '<span class="cname">' + c.name +
        (c.lang ? '<span class="clang">' + c.lang + '</span>' : '') + '</span>' +
        '<p class="cwhat">' + c.what + '</p></a>';
    }).join("");
    wireCommunityCarousel(node, track);
    return node;
  }

  // The advert and community panels span the full grid width, so dropping one
  // mid-row leaves the rest of that row empty. Work out how many columns the
  // grid actually has and land them on a row boundary instead. The count
  // changes with the window, hence the re-run on resize.
  function gridColumns() {
    var t = getComputedStyle(grid).gridTemplateColumns;
    return t && t !== "none" ? t.split(" ").filter(Boolean).length : 1;
  }

  function placeBlocks(total) {
    grid.querySelectorAll(".sponsor-strip, .homebrew-strip, .ms-strip, .community, .c64-ad-strip, .pc-ad-strip")
        .forEach(function (n) { n.remove(); });
    var cols = gridColumns();
    var cards = grid.querySelectorAll(".card");

    function insertAt(node, wanted) {
      if (!node) return;
      var row = Math.max(1, Math.round(wanted / cols));   // nearest whole row
      var idx = row * cols;
      if (idx >= cards.length) return;
      grid.insertBefore(node, cards[idx]);
    }
    // The C64 shelf gets its own C64-style advert and none of the Videopac
    // homebrew/community panels (those are Videopac content).
    if (state.platform === "C64") {
      if (total >= 6) insertAt(c64AdBlock(), Math.min(12, Math.floor(total / 2)));
      if (total >= 40) insertAt(c64HomebrewBlock(), Math.min(80, Math.floor(total * 2 / 3)));
      if (total >= 20) insertAt(c64CommunityBlock(), Math.min(50, Math.floor(total * 5 / 6)));
      return;
    }
    // The PC shelf gets its own DOS-style advert, its own homebrew panel and
    // its own "keeping this console alive" panel, and none of the Videopac
    // homebrew/community panels (those are Videopac content) - same
    // reasoning as the C64 branch above.
    if (state.platform === "PC") {
      if (total >= 6) insertAt(pcAdBlock(), Math.min(12, Math.floor(total / 2)));
      if (total >= 30) insertAt(pcHomebrewBlock(), Math.min(60, Math.floor(total * 2 / 3)));
      if (total >= 20) insertAt(pcCommunityBlock(), Math.min(50, Math.floor(total * 5 / 6)));
      return;
    }
    if (total < 60) return;                       // too short to bother
    insertAt(sponsorBlock(), Math.min(36, Math.floor(total / 3)));
    insertAt(homebrewBlock(), Math.min(96, Math.floor(total * 2 / 3)));
    // Sits between homebrew and community rather than at a literal total/2 -
    // the middle of the list by fraction alone lands right on homebrew's own
    // heels (2/3 of the way is only a handful of cards past 1/2), which would
    // read as two banners stacked back to back. This keeps roughly a row or
    // two of ordinary game cards on both sides of it instead.
    insertAt(masterStrategyBlock(), Math.min(130, Math.floor(total * 3 / 5)));
    insertAt(communityBlock(), Math.min(160, Math.floor(total * 6 / 7)));
  }

  var replaceTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(replaceTimer);
    replaceTimer = setTimeout(function () {
      placeBlocks(grid.querySelectorAll(".card").length);
    }, 150);
  });

  function render() {
    var filtered = state.games.filter(matches).sort(bySort);
    if (typeof updateListChips === "function" && clearBtn) {
      var anyOn = state.category !== "all" || state.genre !== "all" || state.players !== "all" ||
                  state.platform !== "videopac" || state.list !== "all" || !!state.query;
      clearBtn.hidden = !anyOn;
    }
    var shelfTotal = platformGames().length;
    resultCount.textContent = window.t("results", { shown: filtered.length, total: shelfTotal });
    searchInput.placeholder = window.t("search", { n: shelfTotal });
    emptyState.hidden = filtered.length !== 0;
    grid.innerHTML = "";
    var frag = document.createDocumentFragment();
    // drop the community panel in around a third of the way down, but only on
    // a decent-sized list - it would dominate a five-result search
    filtered.forEach(function (g) { frag.appendChild(renderCard(g)); });
    grid.appendChild(frag);
    placeBlocks(filtered.length);
  }

  function renderCard(g) {
    var card = document.createElement("div");
    card.className = "card";
    card.title = g.title + " - manual, history & play";

    var cover = document.createElement("div");
    cover.className = "cover";
    cover.style.background = hashColor(g.category + g.title);
    cover.textContent = initials(g.title);

    // Cover art - opt-in, for every category (official releases,
    // homebrew, mods, rare dumps, all of it). No cover images ship
    // with this app; drop your own scans, or images you've sourced
    // yourself, into covers/<id>.jpg. See covers/README.txt. Falls
    // back to the initials tile above if no matching image exists or
    // it fails to load.
    // COVER_V is bumped whenever a cover is added or swapped. Without it the
    // browser keeps serving its cached *miss* for a cover that didn't exist
    // when the page was first opened, so a newly added scan stays invisible
    // even after a hard refresh.
    var img = new Image();
    img.className = "cover-art";
    img.alt = g.title + " box art";
    img.loading = "lazy";
    img.onerror = function () {
      if (this.dataset.stage === "png") {
        this.dataset.stage = "jpg";
        this.src = "covers/" + g.id + ".jpg?v=" + COVER_V;
      } else {
        this.remove();
      }
    };
    img.dataset.stage = "png";
    img.src = "covers/" + g.id + ".png?v=" + COVER_V;
    cover.appendChild(img);

    // Homebrew games are easy to mistake for official releases in the grid,
    // and four of them borrow an official box for want of art of their own.
    if (groupFor(g).key === "homebrew") {
      var rib = document.createElement("span");
      rib.className = "cover-ribbon";
      rib.textContent = window.t("cat_homebrew");
      cover.appendChild(rib);
    }

    var body = document.createElement("div");
    body.className = "card-body";

    var t = document.createElement("p");
    t.className = "card-title";
    t.textContent = g.title;

    var meta = document.createElement("div");
    meta.className = "card-meta";

    var pbadge = document.createElement("span");
    pbadge.className = "badge " + platformBadge(g.platform);
    pbadge.textContent = g.platform;
    meta.appendChild(pbadge);

    var grp = groupFor(g);
    var cbadge = document.createElement("span");
    cbadge.className = "badge badge-cat-dyn";
    cbadge.style.setProperty("--badge-color", grp.color);
    cbadge.textContent = catLabel(grp);
    meta.appendChild(cbadge);

    var variant = variantFor(g);
    if (variant) {
      var vbadge = document.createElement("span");
      vbadge.className = "badge badge-variant";
      vbadge.textContent = variant;
      meta.appendChild(vbadge);
    }

    var pack = window.PACKAGING_DATA && window.PACKAGING_DATA[g.id];
    if (pack) {
      var pbadge2 = document.createElement("span");
      pbadge2.className = "badge badge-pack";
      pbadge2.textContent = pack.kind;
      pbadge2.title = pack.detail;
      meta.appendChild(pbadge2);
    }

    // star sits on the cover so it doesn't push the card layout around
    var star = document.createElement("button");
    star.className = "fav-btn" + (isFav(g.id) ? " on" : "");
    star.type = "button";
    star.innerHTML = "&#9733;";
    star.title = isFav(g.id) ? "Remove from favorites" : "Add to favorites";
    star.setAttribute("aria-label", star.title);
    star.addEventListener("click", function (e) {
      e.stopPropagation();               // don't open the game page
      toggleFav(g.id);
      this.classList.toggle("on", isFav(g.id));
      this.title = isFav(g.id) ? "Remove from favorites" : "Add to favorites";
      if (state.list === "fav") render(); // drop it out of the list immediately
    });
    cover.appendChild(star);

    body.appendChild(t);
    body.appendChild(meta);
    card.appendChild(cover);
    card.appendChild(body);

    card.addEventListener("click", function () {
      window.location.href = "game.html?id=" + encodeURIComponent(g.id);
    });

    return card;
  }

  document.getElementById("platformChips").addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll("#platformChips .chip").forEach(function (c) { c.classList.remove("active"); });
    btn.classList.add("active");
    state.platform = btn.dataset.platform;
    state.category = "all"; state.genre = "all"; state.players = "all";
    categorySel.classList.remove("on"); genreSel.classList.remove("on"); playerSel.classList.remove("on");
    buildCategoryChips(platformGames());
    buildFacets();
    updateListChips();
    localStorage.setItem(SHELF_KEY, state.platform);
    syncShelfChips();
    render();
  });

  function updateListChips() {
    document.getElementById("favCount").textContent = favCount();
    document.getElementById("packCount").textContent =
      state.games.filter(function (g) { return hasPackaging(g.id); }).length;
    document.querySelectorAll("#favChip, #packChip").forEach(function (b) {
      b.classList.toggle("active", b.dataset.list === state.list);
    });
    // export/import belong next to the star, not buried in Setup - but only
    // once you are actually looking at your favourites
    var favIo = document.getElementById("favIo");
    if (favIo) favIo.hidden = state.list !== "fav";
    // only offer the reset when something is actually filtered
    var on = state.category !== "all" || state.genre !== "all" || state.players !== "all" ||
             state.platform !== "videopac" || state.list !== "all" || !!state.query;
    clearBtn.hidden = !on;
  }

  document.querySelectorAll("#favChip, #packChip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      // clicking the active one turns it back off
      state.list = (state.list === this.dataset.list) ? "all" : this.dataset.list;
      updateListChips();
      render();
    });
  });

  function buildFacets() {
    buildFacetChips(genreSel, GENRE_ORDER, genreOf, "g_", "genre", window.t("allGenres"));
    buildFacetChips(playerSel, PLAYER_ORDER, playersOf, "p_", "players", window.t("allPlayers"));
    sortSel.innerHTML = '<option value="number">' + window.t("sortNumber") + '</option>' +
                        '<option value="az">' + window.t("sortAZ") + '</option>';
    sortSel.value = state.sort;
  }

  function onFacetChange(sel, stateKey) {
    sel.addEventListener("change", function () {
      state[stateKey] = this.value;
      this.classList.toggle("on", this.value !== "all");
      render();
    });
  }
  onFacetChange(categorySel, "category");
  onFacetChange(genreSel, "genre");
  onFacetChange(playerSel, "players");

  sortSel.addEventListener("change", function () {
    state.sort = this.value;
    localStorage.setItem(SORT_KEY, state.sort);
    render();
  });

  clearBtn.addEventListener("click", function () {
    state.category = state.genre = state.players = "all";
    state.platform = "videopac";
    state.list = "all"; state.query = ""; searchInput.value = "";
    localStorage.setItem(SHELF_KEY, "videopac");
    syncShelfChips();
    buildCategoryChips(platformGames());
    buildFacets();
    updateListChips();
    render();
  });

  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.trim();
    render();
  });

  // ---- Favorites export / import ---------------------------------------
  // localStorage belongs to the browser, not to this folder, so favorites do
  // not travel when the Vault is copied or shared. These two buttons move them
  // as a small JSON file.
  var favIoNote = document.getElementById("favIoNote");
  function note(msg) {
    favIoNote.textContent = msg;
    favIoNote.classList.add("ok");
    setTimeout(function () { favIoNote.classList.remove("ok"); }, 4000);
  }

  document.getElementById("exportFavs").addEventListener("click", function () {
    var ids = Object.keys(favorites);
    if (!ids.length) { note("Nothing to export yet - star a few games first."); return; }
    var payload = {
      app: "Retro Vault",
      kind: "favorites",
      exported: new Date().toISOString().slice(0, 10),
      ids: ids
    };
    var blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "retro-vault-favorites.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    note("Exported " + ids.length + " favorite" + (ids.length === 1 ? "" : "s") + ".");
  });

  var importInput = document.getElementById("importFavsFile");
  document.getElementById("importFavs").addEventListener("click", function () { importInput.click(); });
  importInput.addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var ids;
      try {
        var parsed = JSON.parse(reader.result);
        // accept both our own file and a bare array of ids
        ids = Array.isArray(parsed) ? parsed : parsed.ids;
        if (!Array.isArray(ids)) throw new Error("no id list");
      } catch (e) {
        note("That doesn't look like a favorites file.");
        return;
      }
      var known = {};
      state.games.forEach(function (g) { known[g.id] = 1; });
      var added = 0, skipped = 0;
      ids.forEach(function (id) {
        if (!known[id]) { skipped++; return; }   // game not in this catalogue
        if (favorites[id]) return;                // already starred
        favorites[id] = 1;
        added++;
      });
      saveFavs();
      updateListChips();
      render();
      note("Added " + added + " favorite" + (added === 1 ? "" : "s") +
           (skipped ? " (" + skipped + " not in this library)" : "") + ".");
    };
    reader.readAsText(file);
    this.value = "";   // let the same file be picked again
  });

  // ---- language ---------------------------------------------------------
  // Only the interface is translated. Game titles stay exactly as printed on
  // the cartridge, which is the whole point of a catalogue.
  // Language as a row of flags - five clicks' worth of choice does not need
  // a dropdown, and the flags read faster than the language names.
  var langFlags = document.getElementById("langFlags");
  if (langFlags && window.I18N) {
    Object.keys(window.I18N).forEach(function (code) {
      var b = document.createElement("button");
      b.className = "flag-btn";
      b.dataset.lang = code;
      b.innerHTML = window.I18N[code]._flag;   // small inline SVG, not emoji
      b.title = window.I18N[code]._name;
      b.setAttribute("aria-label", window.I18N[code]._name);
      langFlags.appendChild(b);
    });
    function markLang() {
      langFlags.querySelectorAll(".flag-btn").forEach(function (b) {
        b.classList.toggle("active", b.dataset.lang === window.currentLang());
      });
    }
    markLang();
    langFlags.addEventListener("click", function (e) {
      var b = e.target.closest(".flag-btn");
      if (!b) return;
      localStorage.setItem(window.I18N_KEY, b.dataset.lang);
      markLang();
      applyLang();
      buildCategoryChips(platformGames());
      buildFacets();
      updateListChips();
      render();
    });
  }

  // ---- Showcase --------------------------------------------------------
  // Featured games, sponsor banners and the community links, all driven by
  // featured.js. Any panel with an empty list simply doesn't appear.
  var featStop = null;
  var c64FeatStop = null;
  var pcFeatStop = null;

  function buildShowcase() {
    var data = window.FEATURED_DATA || {};
    var host = document.getElementById("showcase");
    if (!host) return;

    var picks = (data.featured || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var sponsors = data.sponsors || [];
    var community = data.community || [];
    if (!picks.length && !sponsors.length && !community.length) return;

    host.hidden = state.platform === "C64" || state.platform === "PC";

    // --- featured
    if (picks.length) {
      featStop = featureRotator(document.getElementById("featureMain"),
                                document.getElementById("featureList"), picks);
    }

    // --- the C64 featured panel, its own section, shown only on that shelf
    var c64picks = (data.c64featured || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var c64host = document.getElementById("c64showcase");
    if (c64host && c64picks.length) {
      c64host.hidden = state.platform !== "C64";
      c64FeatStop = c64FeatureRotator(document.getElementById("c64FeatureMain"),
                                      document.getElementById("c64FeatureList"), c64picks);
    }

    // --- the PC featured panel, its own section, shown only on that shelf.
    // Reuses c64FeatureRotator() as-is rather than a third copy of the same
    // ~80 lines: #pcFeatureMain is a plain <div> that builds its own inner
    // cover link, exactly like #c64FeatureMain (unlike the homebrew panels,
    // whose "main" element IS the link, which is why those got their own
    // function - see the comment above c64HomebrewFeatureRotator). Nothing
    // inside c64FeatureRotator/c64ClipFallback is actually C64-specific -
    // platform, id and clip path all come from the pick's own game data.
    var pcpicks = (data.pcfeatured || []).filter(function (f) {
      return state.games.some(function (g) { return g.id === f.id; });
    });
    var pchost = document.getElementById("pcshowcase");
    if (pchost && pcpicks.length) {
      pchost.hidden = state.platform !== "PC";
      pcFeatStop = c64FeatureRotator(document.getElementById("pcFeatureMain"),
                                     document.getElementById("pcFeatureList"), pcpicks);
    }
  }

  // ---- Updates ---------------------------------------------------------
  // Catalogue data only, and strictly opt-in: check tells you what changed,
  // and nothing is written until you press the second button.
  var checkBtn = document.getElementById("checkUpdates");
  var applyBtn = document.getElementById("applyUpdates");
  var updNote = document.getElementById("updateNote");
  var pendingFiles = [];

  function say(msg, ok) {
    if (!updNote) return;
    updNote.textContent = msg;
    updNote.classList.toggle("ok", !!ok);
  }

  // Same check from the top bar: open Setup at that section and run it, so the
  // result and the Download button appear in one place rather than two.
  var updateModal = document.getElementById("updateModal");
  var updateBtn = document.getElementById("updateBtn");
  if (updateBtn && updateModal) {
    updateBtn.addEventListener("click", function () {
      updateModal.hidden = false;
      // check straight away - the panel exists to answer one question
      var c = document.getElementById("checkUpdates");
      if (c) c.click();
    });
    document.getElementById("closeUpdate").addEventListener("click", function () { updateModal.hidden = true; });
    updateModal.addEventListener("click", function (e) { if (e.target === updateModal) updateModal.hidden = true; });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !updateModal.hidden) updateModal.hidden = true;
    });
  }

  if (checkBtn) {
    checkBtn.addEventListener("click", function () {
      say(window.t("updChecking"));
      applyBtn.hidden = true;
      fetch("/_update/check").then(function (r) { return r.json(); }).then(function (d) {
        if (!d.ok) {
          say(window.t(d.reason === "authoring" ? "updAuthoring"
                     : d.reason === "no-source" ? "updNoSource" : "updFail"));
          return;
        }
        pendingFiles = d.added.concat(d.changed);
        rememberUpdates(pendingFiles.length);
        if (!pendingFiles.length) { say(window.t("updNone"), true); return; }
        say(window.t("updFound", { n: pendingFiles.length, mb: (d.bytes / 1048576).toFixed(1) }));
        applyBtn.hidden = false;
      }).catch(function () { say(window.t("updFail")); });
    });
  }

  // The button watches by itself: on load, every five minutes while the page
  // is open, and whenever you come back to the tab. Five minutes rather than
  // one because GitHub serves the manifest with max-age=300 - ask more often
  // than that and the CDN hands back the same cached copy, so a faster poll
  // cannot give a fresher answer. The check itself is cheap: the server hashes
  // the local files, which is around 0.2 seconds for the whole catalogue.
  var UPD_SEEN = "VideopacVault_updSeen";
  var UPD_EVERY = 5 * 60 * 1000;
  var lastCheck = 0, updTimer = null;

  function markUpdates(n) {
    if (!updateBtn) return;
    updateBtn.classList.toggle("has-updates", n > 0);
    if (n > 0) updateBtn.title = window.t("updWaiting", { n: n });
    else updateBtn.removeAttribute("title");
  }

  function rememberUpdates(n) {
    markUpdates(n);
    lastCheck = Date.now();
    try {
      localStorage.setItem(UPD_SEEN, JSON.stringify({ at: lastCheck, n: n }));
    } catch (e) { /* private mode: the badge just won't survive a reload */ }
  }

  function stopWatching() {
    if (updTimer) { clearInterval(updTimer); updTimer = null; }
  }

  function quietCheck(force) {
    if (!updateBtn) return;
    if (!force && Date.now() - lastCheck < UPD_EVERY) return;
    lastCheck = Date.now();                  // claim the slot before the fetch
    fetch("/_update/check").then(function (r) { return r.json(); }).then(function (d) {
      // On the machine where the Vault is written there is nothing to watch
      // for, and no source configured means nowhere to look.
      if (!d.ok && (d.reason === "authoring" || d.reason === "no-source")) {
        stopWatching(); markUpdates(0); return;
      }
      rememberUpdates(d.ok ? d.added.length + d.changed.length : 0);
    }).catch(function () { /* offline: leave the button as it was */ });
  }

  // Show the last known answer straight away, then go and get a fresh one.
  try {
    var saved = JSON.parse(localStorage.getItem(UPD_SEEN) || "{}");
    if (saved.n != null) markUpdates(saved.n);
  } catch (e) { /* first run, or someone edited it by hand */ }
  quietCheck(true);
  updTimer = setInterval(quietCheck, UPD_EVERY);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) quietCheck();     // back in the tab: is it still true?
  });

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      say(window.t("updChecking"));
      fetch("/_update/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: pendingFiles })
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (!d.ok) { say(window.t("updFail")); return; }
        rememberUpdates(0);                      // nothing waiting any more
        var msg = window.t("updDone", { n: d.written.length });
        if (d.skipped && d.skipped.length) {
          msg += " " + window.t("updSkipped", { n: d.skipped.length });
        }
        say(msg, true);
        applyBtn.hidden = true;
      }).catch(function () { say(window.t("updFail")); });
    });
  }

  function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = window.t(el.dataset.i18n);
    });
    // the long-form Setup text lives in setup-i18n.js and is HTML, not plain
    var pack = (window.SETUP_I18N || {})[window.currentLang()] || (window.SETUP_I18N || {}).en;
    if (pack) {
      document.querySelectorAll("[data-s]").forEach(function (el) {
        if (pack[el.dataset.s]) el.innerHTML = pack[el.dataset.s];
      });
      var exp = document.getElementById("exportFavs"), imp = document.getElementById("importFavs");
      if (exp) exp.textContent = window.t("exportFav");
      if (imp) imp.textContent = window.t("importFav");
    }
    searchInput.placeholder = window.t("search", { n: platformGames().length });
    document.getElementById("setupBtn").textContent = window.t("setup");
    document.documentElement.lang = window.currentLang();
  }

  var setupModal = document.getElementById("setupModal");
  document.getElementById("setupBtn").addEventListener("click", function () { setupModal.hidden = false; });
  document.getElementById("closeSetup").addEventListener("click", function () { setupModal.hidden = true; });
  setupModal.addEventListener("click", function (e) { if (e.target === setupModal) setupModal.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !setupModal.hidden) setupModal.hidden = true; });
})();
