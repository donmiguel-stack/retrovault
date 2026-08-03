(function () {
  // Bump when you add or replace anything in covers/ (see renderCard).
  var COVER_V = 18;

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
    { key: "homebrew", label: "Homebrew",       color: "#e05a7e", match: ["Homebrew (this project)", "Homebrew (community)"] }
  ];

  var CATEGORY_LOOKUP = {};
  CATEGORY_GROUPS.forEach(function (grp) {
    grp.match.forEach(function (rawCat) { CATEGORY_LOOKUP[rawCat] = grp; });
  });

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
  var GENRE_ORDER = ["action","shooter","maze","sports","racing","strategy",
                     "puzzle","adventure","education","gambling","utility"];
  var PLAYER_ORDER = ["p1","p12","p2"];
  function genreOf(g) { return ((window.GENRE_DATA || {})[g.id] || {}).genre || null; }
  function playersOf(g) { return ((window.GENRE_DATA || {})[g.id] || {}).players || null; }

  function buildFacetChips(el, order, values, labelKey, stateKey, allLabel) {
    var counts = {};
    state.games.forEach(function (g) {
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
    imagic: 6, parker: 7, modified: 8, rare: 9, homebrew: 10
  };
  function shelfKey(g) {
    var n = parseInt(g.vpNumber, 10);
    var rank = CATEGORY_RANK[groupFor(g).key];
    return [isNaN(n) ? 1 : 0, isNaN(n) ? 0 : n, rank === undefined ? 11 : rank, g.title.toLowerCase()];
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
  var state = {
    games: [], platform: "all", category: "all", query: "", list: "all",
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
    buildCategoryChips(state.games);
    buildFacets();
    updateListChips();
    applyLang();
    buildShowcase();
    render();
  } else {
    grid.innerHTML = '<p style="padding:24px;color:#e0865a;">games.js did not load - make sure games.js sits next to index.html and is included before app.js.</p>';
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

  function buildCategoryChips(games) {
    var counts = {};
    games.forEach(function (g) { var key = groupFor(g).key; counts[key] = (counts[key] || 0) + 1; });
    var entries = [];
    CATEGORY_GROUPS.forEach(function (grp) {
      if (counts[grp.key]) entries.push({ key: grp.key, label: catLabel(grp), count: counts[grp.key] });
    });
    fillSelect(categorySel, window.t("allCats") + " (" + games.length + ")", entries, state.category);
  }

  function matches(g) {
    if (state.list === "fav" && !isFav(g.id)) return false;
    if (state.list === "pack" && !hasPackaging(g.id)) return false;
    if (state.platform !== "all" && g.platform !== state.platform) return false;
    if (state.genre !== "all" && genreOf(g) !== state.genre) return false;
    if (state.players !== "all" && playersOf(g) !== state.players) return false;
    if (state.category !== "all" && groupFor(g).key !== state.category) return false;
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

  // Returns a function that stops the rotation - the homebrew panel is thrown
  // away and rebuilt on every resize, and its old timer has to go with it.
  function featureRotator(main, list, picks) {
    var at = 0, timer = null;

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
        '<span class="badge ' + (g.platform === "G7400+" ? "badge-g7400" : "badge-g7000") + '">' + g.platform + '</span>' +
        (gen.genre ? '<span class="badge badge-cat">' + window.t("g_" + gen.genre) + '</span>' : '') +
        (gen.players ? '<span class="badge badge-cat">' + window.t("p_" + gen.players) + '</span>' : '') +
        '</div></div>' + shotMarkup(pick.shot);
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
    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = track.clientWidth * 0.8 * parseInt(this.dataset.dir, 10);
        track.scrollBy({ left: step, behavior: "smooth" });
      });
    });
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
    grid.querySelectorAll(".sponsor-strip, .homebrew-strip, .community")
        .forEach(function (n) { n.remove(); });
    if (total < 60) return;                       // too short to bother
    var cols = gridColumns();
    var cards = grid.querySelectorAll(".card");

    function insertAt(node, wanted) {
      if (!node) return;
      var row = Math.max(1, Math.round(wanted / cols));   // nearest whole row
      var idx = row * cols;
      if (idx >= cards.length) return;
      grid.insertBefore(node, cards[idx]);
    }
    insertAt(sponsorBlock(), Math.min(36, Math.floor(total / 3)));
    insertAt(homebrewBlock(), Math.min(96, Math.floor(total * 2 / 3)));
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
                  state.platform !== "all" || state.list !== "all" || !!state.query;
      clearBtn.hidden = !anyOn;
    }
    resultCount.textContent = window.t("results", { shown: filtered.length, total: state.games.length });
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
    pbadge.className = "badge " + (g.platform === "G7400+" ? "badge-g7400" : "badge-g7000");
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
             state.platform !== "all" || state.list !== "all" || !!state.query;
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
    state.category = state.genre = state.players = state.platform = "all";
    state.list = "all"; state.query = ""; searchInput.value = "";
    document.querySelectorAll("#platformChips .chip").forEach(function (c) {
      c.classList.toggle("active", c.dataset.platform === "all");
    });
    buildCategoryChips(state.games);
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
      app: "Videopac Odyssey Vault",
      kind: "favorites",
      exported: new Date().toISOString().slice(0, 10),
      ids: ids
    };
    var blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "videopac-vault-favorites.json";
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
      buildCategoryChips(state.games);
      buildFacets();
      updateListChips();
      render();
    });
  }

  // ---- Showcase --------------------------------------------------------
  // Featured games, sponsor banners and the community links, all driven by
  // featured.js. Any panel with an empty list simply doesn't appear.
  var SHOWCASE_KEY = "VideopacVault_showcase";
  var featStop = null;

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

    host.hidden = localStorage.getItem(SHOWCASE_KEY) === "off";

    // --- featured
    if (picks.length) {
      featStop = featureRotator(document.getElementById("featureMain"),
                                document.getElementById("featureList"), picks);
    }

    var toggle = document.getElementById("showcaseToggle");
    toggle.addEventListener("click", function () {
      var off = !host.hidden;
      host.hidden = off;
      localStorage.setItem(SHOWCASE_KEY, off ? "off" : "on");
    });
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
    searchInput.placeholder = window.t("search", { n: state.games.length });
    document.getElementById("setupBtn").textContent = window.t("setup");
    document.documentElement.lang = window.currentLang();
  }

  var setupModal = document.getElementById("setupModal");
  document.getElementById("setupBtn").addEventListener("click", function () { setupModal.hidden = false; });
  document.getElementById("closeSetup").addEventListener("click", function () { setupModal.hidden = true; });
  setupModal.addEventListener("click", function (e) { if (e.target === setupModal) setupModal.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !setupModal.hidden) setupModal.hidden = true; });
})();
