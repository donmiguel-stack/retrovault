/* Retro Vault - G7400 Teletext  (teletext.html)
 *
 * Live NOS Teletekst drawn the way a Philips Videopac G7400 would draw it:
 * the G7400's second video chip pair, the Thomson EF9340 "VIN" + EF9341 "GEN",
 * puts a 40 x 24 grid of 8 x 10 dot cells under a one-row service line -
 * 320 x 250 pixels, eight colours, 2 x 3 block mosaics. Teletext pages are the
 * same grid, so every NOS page maps onto that screen cell for cell.
 *
 * Data: NOS JSON via retrovault.world/teletext/nos.php (teletext-server/),
 * which only adds the CORS header NOS itself doesn't send, plus a 60 s shared
 * cache. Pages 400-405 are the Vault's own and never touch the network; they
 * are also what you get when the relay can't be reached.
 *
 * The font is an original 5 x 7 (+2 descender) drawing in the period style,
 * not the EF9341 character ROM.
 */
(function () {
  'use strict';

  var FONT = {" ":"000000000000000000","!":"040404040400040000","\"":"0a0a0a000000000000","#":"0a0a1f0a1f0a0a0000","$":"040f140e051e040000","%":"181902040813030000","&":"0c12140815120d0000","'":"040408000000000000","(":"020408080804020000",")":"080402020204080000","*":"0004150e1504000000","+":"0004041f0404000000",",":"000000000c04080000","-":"0000001f0000000000",".":"00000000000c0c0000","/":"000102040810000000","0":"0e11131519110e0000","1":"040c040404040e0000","2":"0e11010204081f0000","3":"1f02040201110e0000","4":"02060a121f02020000","5":"1f101e0101110e0000","6":"0608101e11110e0000","7":"1f0102040808080000","8":"0e11110e11110e0000","9":"0e11110f01020c0000",":":"000c0c000c0c000000",";":"000c0c000c04080000","<":"020408100804020000","=":"00001f001f00000000",">":"080402010204080000","?":"0e1101020400040000","@":"0e11010d15150e0000","A":"0e11111f1111110000","B":"1e11111e11111e0000","C":"0e11101010110e0000","D":"1c12111111121c0000","E":"1f10101e10101f0000","F":"1f10101e1010100000","G":"0e11101711110f0000","H":"1111111f1111110000","I":"0e04040404040e0000","J":"0702020202120c0000","K":"111214181412110000","L":"1010101010101f0000","M":"111b15151111110000","N":"111119151311110000","O":"0e11111111110e0000","P":"1e11111e1010100000","Q":"0e11111115120d0000","R":"1e11111e1412110000","S":"0f10100e01011e0000","T":"1f0404040404040000","U":"1111111111110e0000","V":"11111111110a040000","W":"1111111515150a0000","X":"11110a040a11110000","Y":"11110a040404040000","Z":"1f01020408101f0000","[":"0e08080808080e0000","\\":"001008040201000000","]":"0e02020202020e0000","^":"040a11000000000000","_":"0000000000001f0000","`":"080400000000000000","a":"00000e010f110f0000","b":"10101e1111111e0000","c":"00000e1010110e0000","d":"01010f1111110f0000","e":"00000e111f100e0000","f":"0609081c0808080000","g":"00000f1111110f010e","h":"101016191111110000","i":"04000c0404040e0000","j":"02000602020202120c","k":"101012141814120000","l":"0c04040404040e0000","m":"00001a151515110000","n":"000016191111110000","o":"00000e1111110e0000","p":"00001e1111111e1010","q":"00000f1111110f0101","r":"000016191010100000","s":"00000f100e011e0000","t":"08081c080809060000","u":"0000111111130d0000","v":"00001111110a040000","w":"0000111115150a0000","x":"0000110a040a110000","y":"0000111111110f010e","z":"00001f0204081f0000","{":"030404080404030000","|":"040404040404040000","}":"180404020404180000","~":"000008150200000000","°":"0c12120c0000000000","€":"07081e081e08070000","£":"0609081c0809160000","·":"000000040000000000","█":"1f1f1f1f1f1f1f1f1f","◀":"02060e1e0e06020000","▶":"080c0e0f0e0c080000","▲":"00040e1f0000000000","▼":"00001f0e0400000000","●":"000e1f1f1f0e000000","á":"02040e010f110f0000","à":"08040e010f110f0000","ä":"0a000e010f110f0000","â":"040a0e010f110f0000","ã":"0a140e010f110f0000","å":"040a0e010f110f0000","é":"02040e111f100e0000","è":"08040e111f100e0000","ë":"0a000e111f100e0000","ê":"040a0e111f100e0000","ı":"00000c0404040e0000","í":"02040c0404040e0000","ì":"08040c0404040e0000","ï":"0a000c0404040e0000","î":"040a0c0404040e0000","ó":"02040e1111110e0000","ò":"08040e1111110e0000","ö":"0a000e1111110e0000","ô":"040a0e1111110e0000","õ":"0a140e1111110e0000","ú":"0204111111130d0000","ù":"0804111111130d0000","ü":"0a00111111130d0000","û":"040a111111130d0000","ñ":"0a1416191111110000","ç":"00000e1010110e0408","ß":"0c1212141212141000","É":"1f10101e10101f0000","È":"1f10101e10101f0000","Ë":"1f10101e10101f0000","Ä":"0e11111f1111110000","Ö":"0e11111111110e0000","Ü":"1111111111110e0000","Ç":"0e11101010110e0000","Á":"0e11111f1111110000","Ó":"0e11111111110e0000","Ú":"1111111111110e0000","Í":"0e04040404040e0000"};

  var COLS = 40, ROWS = 25, CW = 8, CH = 10, W = COLS * CW, H = ROWS * CH;
  var PROXY = 'https://retrovault.world/teletext/nos.php?p=';
  try {
    var qp = new URLSearchParams(location.search).get('proxy');
    if (qp && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(qp)) PROXY = qp;
  } catch (e) { /* old browser: keep default */ }

  // The eight EF9340 colours, a touch softened the way a CRT softens them.
  var PAL = {
    black: [0, 0, 0], red: [255, 48, 40], green: [40, 240, 60], yellow: [255, 245, 60],
    blue: [50, 70, 255], magenta: [255, 60, 240], cyan: [50, 240, 255], white: [242, 242, 242]
  };
  var CODE = { k: 'black', r: 'red', g: 'green', y: 'yellow', b: 'blue', m: 'magenta', c: 'cyan', w: 'white' };
  var FAST = ['red', 'green', 'yellow', 'cyan'];

  // ---------------------------------------------------------------- language
  function lang() {
    try { return (window.currentLang && window.currentLang()) || 'en'; } catch (e) { return 'en'; }
  }
  var UI = {
    en: { live: 'Live: NOS Teletekst', stale: 'NOS feed slow - showing the last copy', offline: 'NOS not reachable - Vault pages 400-405 still work', loading: 'Searching for page', vault: 'Retro Vault page', sub: 'subpages: ▲ ▼', scan: 'Scanlines', p: 'Page', idx: 'Index', vlt: 'Vault' },
    nl: { live: 'Live: NOS Teletekst', stale: 'NOS reageert traag - laatste kopie', offline: 'NOS niet bereikbaar - Vault-pagina’s 400-405 werken wel', loading: 'Pagina zoeken', vault: 'Retro Vault-pagina', sub: 'subpagina’s: ▲ ▼', scan: 'Beeldlijnen', p: 'Pagina', idx: 'Index', vlt: 'Vault' },
    de: { live: 'Live: NOS Teletekst', stale: 'NOS antwortet langsam - letzte Kopie', offline: 'NOS nicht erreichbar - Vault-Seiten 400-405 gehen trotzdem', loading: 'Suche Seite', vault: 'Retro-Vault-Seite', sub: 'Unterseiten: ▲ ▼', scan: 'Scanlines', p: 'Seite', idx: 'Index', vlt: 'Vault' },
    fr: { live: 'En direct : NOS Teletekst', stale: 'NOS lent - dernière copie affichée', offline: 'NOS injoignable - les pages Vault 400-405 restent disponibles', loading: 'Recherche de la page', vault: 'Page Retro Vault', sub: 'sous-pages : ▲ ▼', scan: 'Lignes de balayage', p: 'Page', idx: 'Index', vlt: 'Vault' },
    pt: { live: 'Ao vivo: NOS Teletekst', stale: 'NOS lento - mostrando a última cópia', offline: 'NOS fora do ar - as páginas Vault 400-405 continuam funcionando', loading: 'Procurando a página', vault: 'Página do Retro Vault', sub: 'subpáginas: ▲ ▼', scan: 'Linhas de varredura', p: 'Página', idx: 'Índice', vlt: 'Vault' },
    ja: { live: 'ライブ: NOS テレテキスト', stale: 'NOS が おそい - まえの ページを ひょうじ', offline: 'NOS に つながらない - 400-405 は つかえます', loading: 'ページを さがしています', vault: 'Retro Vault の ページ', sub: 'サブページ: ▲ ▼', scan: 'スキャンライン', p: 'ページ', idx: 'もくじ', vlt: 'Vault' }
  };
  function ui(k) { var L = UI[lang()] || UI.en; return L[k] || UI.en[k]; }

  // ---------------------------------------------------------------- grid
  function blankGrid() {
    var g = [];
    for (var r = 0; r < ROWS; r++) {
      var row = [];
      for (var c = 0; c < COLS; c++) row.push({ ch: ' ', fg: 'white', bg: 'black', mos: 0, link: null });
      g.push(row);
    }
    return g;
  }

  // NOS sends mosaics as U+F020-U+F07F: the low byte is the teletext G1 code.
  // 0x40-0x5F in that range are "blast-through" capitals, as on a real set.
  function mosaicBits(code) {
    var v = code & 0x7f;
    if ((v & 0x40) && !(v & 0x20)) return null;          // a letter, not a mosaic
    return (v & 0x1f) | ((v & 0x40) ? 0x20 : 0);
  }

  // NOS page content (HTML spans with colour classes, one line per row) -> grid
  function parseNos(html) {
    var g = blankGrid();
    var doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    var r = 0, c = 0;
    function walk(node, st) {
      if (node.nodeType === 3) {
        var t = node.nodeValue;
        for (var i = 0; i < t.length; i++) {
          var ch = t[i];
          if (ch === '\n') { r++; c = 0; continue; }
          if (ch === '\r') continue;
          if (r >= ROWS || c >= COLS) { c++; continue; }
          var cell = g[r][c];
          cell.fg = st.fg; cell.bg = st.bg; cell.link = st.link;
          var code = ch.charCodeAt(0);
          if (code >= 0xf020 && code <= 0xf07f) {
            var m = mosaicBits(code);
            if (m === null) { cell.ch = String.fromCharCode(code & 0x7f); cell.mos = 0; }
            else { cell.ch = ' '; cell.mos = m | 0x100; }
          } else {
            cell.ch = ch; cell.mos = 0;
          }
          c++;
        }
        return;
      }
      if (node.nodeType !== 1) return;
      var s = { fg: st.fg, bg: st.bg, link: st.link };
      (node.getAttribute('class') || '').split(/\s+/).forEach(function (k) {
        if (!k) return;
        if (k.indexOf('bg-') === 0) { if (PAL[k.slice(3)]) s.bg = k.slice(3); }
        else if (PAL[k]) s.fg = k;
      });
      if (node.tagName === 'A') {
        var h = (node.getAttribute('href') || '').replace(/^#/, '');
        if (/^[1-8]\d\d(-\d{1,2})?$/.test(h)) s.link = h;
      }
      for (var n = node.firstChild; n; n = n.nextSibling) walk(n, s);
    }
    walk(doc.body.firstChild, { fg: 'white', bg: 'black', link: null });
    return g;
  }

  // The Vault's own pages use a tiny markup: {r} etc. set the foreground,
  // {R} etc. the background, {-} resets. "~b" is a full-width mosaic rule.
  function putText(g, r, src, startCol) {
    var fg = 'white', bg = 'black', c = startCol || 0;
    for (var i = 0; i < src.length; i++) {
      var ch = src[i];
      if (ch === '{') {
        var j = src.indexOf('}', i);
        var tok = src.slice(i + 1, j); i = j;
        if (tok === '-') { fg = 'white'; bg = 'black'; }
        else if (CODE[tok]) fg = CODE[tok];
        else if (CODE[tok.toLowerCase()]) bg = CODE[tok.toLowerCase()];
        continue;
      }
      if (c < COLS) { var cell = g[r][c]; cell.ch = ch; cell.fg = fg; cell.bg = bg; cell.mos = 0; }
      c++;
    }
    // a background set on the line runs to the right edge, as on a real page
    for (; c < COLS; c++) { if (bg !== 'black') g[r][c].bg = bg; }
  }
  function rule(g, r, col) {
    for (var c = 0; c < COLS; c++) { var x = g[r][c]; x.ch = ' '; x.mos = 0x100 | 12; x.fg = col; x.bg = 'black'; }
  }
  // Big mosaic lettering built from the font itself: 2 x 3 dots per cell.
  function logo(g, r0, text, fg, bg) {
    var px = [];                                  // 9 dot rows
    for (var y = 0; y < 9; y++) px.push([]);
    text.split('').forEach(function (ch) {
      var hx = FONT[ch] || FONT[' '];
      for (var y = 0; y < 9; y++) {
        var v = parseInt(hx.substr(y * 2, 2), 16);
        for (var x = 4; x >= 0; x--) px[y].push((v >> x) & 1);
        px[y].push(0);
      }
    });
    var cells = Math.ceil(px[0].length / 2), off = Math.max(0, Math.floor((COLS - cells) / 2));
    for (var rr = 0; rr < 3; rr++) {
      for (var c = 0; c < COLS; c++) { var cl = g[r0 + rr][c]; cl.ch = ' '; cl.bg = bg; cl.fg = fg; cl.mos = 0; }
      for (var k = 0; k < cells; k++) {
        var bits = 0, X = k * 2, Y = rr * 3;
        if (px[Y][X]) bits |= 1; if (px[Y][X + 1]) bits |= 2;
        if (px[Y + 1][X]) bits |= 4; if (px[Y + 1][X + 1]) bits |= 8;
        if (px[Y + 2][X]) bits |= 16; if (px[Y + 2][X + 1]) bits |= 32;
        if (off + k < COLS) g[r0 + rr][off + k].mos = 0x100 | bits;
      }
    }
  }
  function fastRow(g, list) {
    list.forEach(function (f, i) {
      var c0 = i * 10;
      for (var k = 0; k < 10; k++) {
        var cell = g[24][c0 + k];
        cell.ch = k < f[0].length ? f[0][k] : ' ';
        cell.fg = FAST[i]; cell.bg = 'black'; cell.mos = 0; cell.link = f[1];
      }
    });
  }

  // ---------------------------------------------------------------- Vault pages
  var VAULT = {
    en: {
      400: { logo: 'RETRO VAULT', rows: {
        4: '{c}TELETEXT FOR THE PHILIPS VIDEOPAC G7400',
        5: '~b',
        6: '{y} 401 {w}What if Philips had done this?',
        7: '{y} 402 {w}The G7400\'s teletext-style chip',
        8: '{y} 403 {w}The P2000T WiFi cartridge',
        9: '{y} 404 {w}Could a real cartridge do it?',
        10: '{y} 405 {w}How to use this page',
        11: '~b',
        12: '{g} NOS TELETEKST, LIVE',
        13: '{y} 100 {w}Index       {y}601 {w}Sport',
        14: '{y} 101 {w}News        {y}702 {w}Weather',
        15: '{y} 102 {w}Domestic    {y}730 {w}Traffic',
        16: '{y} 500 {w}Finance     {y}801 {w}Football',
        17: '~b',
        21: '{c} Type a page number, or click one.' },
        fast: [['News', '101'], ['Sport', '601'], ['Weather', '702'], ['Index', '100']] },
      401: { title: 'WHAT IF PHILIPS HAD DONE THIS?', rows: {
        3: ' In 1983 the Videopac G7400 got a second',
        4: ' video chip pair, the Thomson EF9340 and',
        5: ' EF9341. They draw 40 columns of text',
        6: ' and 2x3 block graphics in eight colours',
        7: ' - the exact ingredients of teletext.',
        9: ' Dutch TV had launched teletext in 1980.',
        10: ' Philips built the TV sets, the teletext',
        11: ' chips and the G7400 - and still nobody',
        12: ' ever plugged the two ideas together.',
        14: ' So this page does it, 43 years late:',
        15: ' live NOS Teletekst, drawn the way the',
        16: ' G7400\'s character generator would.',
        19: '{c} Next: {y}402{c} the chip in detail' },
        fast: [['Index', '400'], ['The chip', '402'], ['P2000T', '403'], ['News', '101']] },
      402: { title: 'THE G7400\'S TELETEXT-STYLE CHIP', rows: {
        3: '{y} EF9340 {w}"VIN"  video interface',
        4: '{y} EF9341 {w}"GEN"  character generator',
        6: '{c} Grid    {w}40 x 24 cells + service row',
        7: '{c} Cell    {w}8 x 10 dots',
        8: '{c} Screen  {w}320 x 250 pixels',
        9: '{c} Colours {w}8, foreground + background',
        10: '{c} Mosaic  {w}2 x 3 blocks per cell',
        11: '{c} Extras  {w}double height, blink',
        13: ' Teletext TVs used another chip, the',
        14: ' SAA5050 - but the same grid: 40 x 24',
        15: ' plus a header, eight colours, 2 x 3',
        16: ' mosaics. That is why a NOS page fits',
        17: ' the G7400 screen cell for cell.',
        19: '{g} This page draws all 80,000 pixels',
        20: '{g} itself. No web font involved.' },
        fast: [['Index', '400'], ['What if', '401'], ['P2000T', '403'], ['Cart', '404']] },
      403: { title: 'THE P2000T WIFI CARTRIDGE', rows: {
        3: ' The idea for this page came from Dutch',
        4: ' enthusiasts who built a cartridge that',
        5: ' puts a Philips P2000T (1981) on WiFi',
        6: ' and shows live NOS teletext.',
        8: ' The P2000T is a natural fit: its text',
        9: ' chip is the SAA5050, the very chip',
        10: ' teletext TVs used. The BBC Micro had',
        11: ' it too, and so did terminals for',
        12: ' Viditel, the Dutch videotex service.',
        14: ' Archived pages, rescued from old video',
        15: ' tapes that recorded the teletext data',
        16: ' along with the picture, can be browsed',
        17: ' on the same machine.',
        19: '{c} The G7400 has its own teletext-style',
        20: '{c} chip. See {y}402{c} and {y}404{c}.' },
        fast: [['Index', '400'], ['The chip', '402'], ['Cart', '404'], ['News', '101']] },
      404: { title: 'COULD A REAL G7400 CART DO IT?', rows: {
        3: ' Yes, in principle. One small board,',
        4: ' a Raspberry Pi Pico 2 W, does it all:',
        6: '{y} Core 1 {w}WiFi, fetches the page and',
        7: '        {w}converts it to EF9340 codes',
        8: '{y} Core 0 {w}pretends to be a ROM and',
        9: '        {w}answers the 8048 on the bus',
        11: ' A short 8048 program copies the 960',
        12: ' cells into the EF9340\'s video RAM. The',
        13: ' G7400 keyboard picks the page number.',
        15: '{c} Hard part: {w}bus timing. The loop on',
        16: ' core 0 must answer every read without',
        17: ' ever stalling, so WiFi stays on core 1.',
        19: '{g} Precedent: PicoPAC already runs games',
        20: '{g} from a Pico on G7000 and G7400.',
        22: '{y} Build plan: in the cart\'s manual.' },
        fast: [['Index', '400'], ['The chip', '402'], ['P2000T', '403'], ['News', '101']] },
      405: { title: 'HOW TO USE THIS PAGE', rows: {
        3: '{y} 0-9    {w}type a page number',
        4: '{y} ◀ ▶    {w}previous / next page',
        5: '{y} ▲ ▼    {w}previous / next subpage',
        6: '{y} R G Y B{w} the coloured Fastext keys',
        7: '{y} I      {w}index (100)',
        8: '{y} V      {w}Retro Vault pages (400)',
        10: ' Click any page number on the screen to',
        11: ' jump there. Pages refresh themselves',
        12: ' every minute, like the real thing.',
        14: ' A gamepad works too: D-pad changes',
        15: ' page, the face buttons are Fastext.',
        18: '{c} Pages 100-899 come live from NOS.',
        19: '{c} Pages 400-405 belong to the Vault.' },
        fast: [['Index', '400'], ['News', '101'], ['Sport', '601'], ['Weather', '702']] }
    },
    nl: {
      400: { logo: 'RETRO VAULT', rows: {
        4: '{c}TELETEKST VOOR DE PHILIPS VIDEOPAC G7400',
        5: '~b',
        6: '{y} 401 {w}Wat als Philips dit had gedaan?',
        7: '{y} 402 {w}De teletekst-chip van de G7400',
        8: '{y} 403 {w}De P2000T WiFi-cartridge',
        9: '{y} 404 {w}Kan een echte cartridge dit?',
        10: '{y} 405 {w}Zo werkt deze pagina',
        11: '~b',
        12: '{g} NOS TELETEKST, LIVE',
        13: '{y} 100 {w}Index       {y}601 {w}Sport',
        14: '{y} 101 {w}Nieuws      {y}702 {w}Weer',
        15: '{y} 102 {w}Binnenland  {y}730 {w}Verkeer',
        16: '{y} 500 {w}Financieel  {y}801 {w}Voetbal',
        17: '~b',
        21: '{c} Typ een paginanummer of klik erop.' },
        fast: [['Nieuws', '101'], ['Sport', '601'], ['Weer', '702'], ['Index', '100']] },
      401: { title: 'WAT ALS PHILIPS DIT HAD GEDAAN?', rows: {
        3: ' In 1983 kreeg de Videopac G7400 een',
        4: ' tweede videochip-paar: de Thomson',
        5: ' EF9340 en EF9341. Die tekenen 40',
        6: ' kolommen tekst en 2x3 blokgrafiek in',
        7: ' acht kleuren - precies wat teletekst',
        8: ' nodig heeft.',
        10: ' Teletekst was er sinds 1980. Philips',
        11: ' maakte de tv\'s, de teletekstchips en',
        12: ' de G7400 - en toch heeft niemand die',
        13: ' twee ooit aan elkaar geknoopt.',
        15: ' Dus doet deze pagina het, 43 jaar te',
        16: ' laat: live NOS Teletekst, getekend',
        17: ' zoals de G7400 het zou doen.',
        19: '{c} Verder: {y}402{c} de chip in detail' },
        fast: [['Index', '400'], ['De chip', '402'], ['P2000T', '403'], ['Nieuws', '101']] },
      402: { title: 'DE TELETEKST-CHIP VAN DE G7400', rows: {
        3: '{y} EF9340 {w}"VIN"  video-interface',
        4: '{y} EF9341 {w}"GEN"  tekengenerator',
        6: '{c} Raster  {w}40 x 24 vakjes + servicerij',
        7: '{c} Vakje   {w}8 x 10 puntjes',
        8: '{c} Scherm  {w}320 x 250 pixels',
        9: '{c} Kleuren {w}8, voor- en achtergrond',
        10: '{c} Mozaiek {w}2 x 3 blokjes per vakje',
        11: '{c} Extra   {w}dubbele hoogte, knipperen',
        13: ' Teletekst-tv\'s gebruikten een andere',
        14: ' chip, de SAA5050 - maar hetzelfde',
        15: ' raster: 40 x 24 plus kopregel, acht',
        16: ' kleuren, 2 x 3 mozaiek. Daarom past',
        17: ' een NOS-pagina vakje voor vakje.',
        19: '{g} Deze pagina tekent alle 80.000',
        20: '{g} pixels zelf. Geen webfont nodig.' },
        fast: [['Index', '400'], ['Wat als', '401'], ['P2000T', '403'], ['Cartridge', '404']] },
      403: { title: 'DE P2000T WIFI-CARTRIDGE', rows: {
        3: ' Het idee kwam van Nederlandse liefheb-',
        4: ' bers die een cartridge bouwden die een',
        5: ' Philips P2000T (1981) via WiFi live',
        6: ' NOS Teletekst laat tonen.',
        8: ' De P2000T is daar perfect voor: zijn',
        9: ' tekstchip is de SAA5050, dezelfde chip',
        10: ' als in teletekst-tv\'s. De BBC Micro',
        11: ' had hem ook, net als terminals voor',
        12: ' Viditel.',
        14: ' Gearchiveerde pagina\'s, gered van oude',
        15: ' videobanden waarop de teletekstdata',
        16: ' mee was opgenomen, zijn er ook op te',
        17: ' bekijken.',
        19: '{c} De G7400 heeft een eigen teletekst-',
        20: '{c} achtige chip. Zie {y}402{c} en {y}404{c}.' },
        fast: [['Index', '400'], ['De chip', '402'], ['Cartridge', '404'], ['Nieuws', '101']] },
      404: { title: 'KAN EEN ECHTE G7400-CART DIT?', rows: {
        3: ' In principe wel. Een klein bordje,',
        4: ' een Raspberry Pi Pico 2 W, doet alles:',
        6: '{y} Core 1 {w}WiFi, haalt de pagina op en',
        7: '        {w}zet die om naar EF9340-codes',
        8: '{y} Core 0 {w}doet zich voor als ROM en',
        9: '        {w}antwoordt de 8048 op de bus',
        11: ' Een kort 8048-programma kopieert de',
        12: ' 960 vakjes naar het video-RAM. Het',
        13: ' G7400-toetsenbord kiest de pagina.',
        15: '{c} Lastig: {w}de bustiming. De lus op core',
        16: ' 0 moet elke leesactie beantwoorden en',
        17: ' mag nooit haperen: WiFi zit op core 1.',
        19: '{g} Voorbeeld: PicoPAC draait al spellen',
        20: '{g} vanaf een Pico op G7000 en G7400.',
        22: '{y} Bouwplan: in de handleiding.' },
        fast: [['Index', '400'], ['De chip', '402'], ['P2000T', '403'], ['Nieuws', '101']] },
      405: { title: 'ZO WERKT DEZE PAGINA', rows: {
        3: '{y} 0-9    {w}typ een paginanummer',
        4: '{y} ◀ ▶    {w}vorige / volgende pagina',
        5: '{y} ▲ ▼    {w}vorige / volgende subpagina',
        6: '{y} R G Y B{w} de gekleurde Fastext-toetsen',
        7: '{y} I      {w}index (100)',
        8: '{y} V      {w}Retro Vault-pagina\'s (400)',
        10: ' Klik op een paginanummer op het scherm',
        11: ' om erheen te gaan. Pagina\'s verversen',
        12: ' elke minuut, net als het echte werk.',
        14: ' Een gamepad werkt ook: de D-pad bladert',
        15: ' de knoppen zijn de Fastext-toetsen.',
        18: '{c} 100-899 komt live van de NOS.',
        19: '{c} 400-405 zijn van de Vault.' },
        fast: [['Index', '400'], ['Nieuws', '101'], ['Sport', '601'], ['Weer', '702']] }
    }
  };
  function vaultPage(num, notice) {
    var set = VAULT[lang()] || VAULT.en, def = set[num] || VAULT.en[num];
    var g = blankGrid();
    if (def.logo) logo(g, 1, def.logo, 'yellow', 'blue');
    if (def.title) { putText(g, 1, '{Y}{b} ' + def.title); rule(g, 2, 'yellow'); }
    Object.keys(def.rows).forEach(function (r) {
      var s = def.rows[r];
      if (s.charAt(0) === '~') rule(g, +r, CODE[s.charAt(1)]); else putText(g, +r, s);
    });
    if (notice) putText(g, 22, notice);
    fastRow(g, def.fast);
    return { grid: g, prev: String(num > 400 ? num - 1 : 405), next: String(num < 405 ? num + 1 : 400),
             prevSub: '', nextSub: '', fast: def.fast.map(function (f) { return f[1]; }), vault: true };
  }
  function messagePage(lines, fast) {
    var g = blankGrid();
    logo(g, 2, lines[0], 'white', 'red');
    for (var i = 1; i < lines.length; i++) putText(g, 6 + i * 2, lines[i]);
    fastRow(g, fast);
    return { grid: g, prev: '', next: '', prevSub: '', nextSub: '', fast: fast.map(function (f) { return f[1]; }) };
  }

  // Bare page numbers in the text are links too, as on every teletext site.
  function autoLinks(g) {
    for (var r = 1; r < 24; r++) {
      var s = '';
      for (var c = 0; c < COLS; c++) s += g[r][c].mos ? '\u0000' : g[r][c].ch;
      var re = /(^|[^0-9])([1-8]\d\d)(?:[\/-]([1-9]\d?))?(?![0-9.,])/g, m;
      while ((m = re.exec(s))) {
        var start = m.index + m[1].length, target = m[2] + (m[3] ? '-' + m[3] : '');
        var len = m[0].length - m[1].length;
        for (var k = 0; k < len; k++) if (!g[r][start + k].link) g[r][start + k].link = target;
      }
    }
  }

  // ---------------------------------------------------------------- drawing
  // Embedded in the emulator page (emulator/teletext-cart.js) the page around
  // us is RetroArch's: look up our own controls inside #ttRoot only, and keep
  // keys away from the emulated console while the teletext screen is up.
  var ROOT = document.getElementById('ttRoot') || document;
  var EMBED = !!window.VAULT_TT_EMBED;
  var canvas = document.getElementById('ttScreen');
  var ctx = canvas.getContext('2d');
  canvas.width = W; canvas.height = H;
  var img = ctx.createImageData(W, H);
  var glyphCache = {};
  function glyph(ch) {
    if (glyphCache[ch]) return glyphCache[ch];
    var ALIAS = { '\u2013': '-', '\u2014': '-', '\u2018': "'", '\u2019': "'", '\u201C': '"', '\u201D': '"', '\u00AB': '"', '\u00BB': '"', '\u00A0': ' ', '\u2026': '.' };
    var hx = FONT[ALIAS[ch] || ch];
    if (!hx) {
      var base = ch.normalize ? ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : ch;
      hx = FONT[base] || FONT['?'];
    }
    var rows = [];
    for (var y = 0; y < 9; y++) rows.push(parseInt(hx.substr(y * 2, 2), 16));
    return (glyphCache[ch] = rows);
  }
  function setPx(x, y, col) {
    var i = (y * W + x) * 4;
    img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2]; img.data[i + 3] = 255;
  }
  function drawCell(r, c, cell, invert) {
    var fg = PAL[cell.fg] || PAL.white, bg = PAL[cell.bg] || PAL.black;
    if (invert) { var t = fg; fg = bg; bg = t; }
    var x0 = c * CW, y0 = r * CH, x, y;
    if (cell.mos) {
      var b = cell.mos & 0x3f;
      // 2 x 3 blocks in an 8 x 10 cell: 4 + 4 dots wide, 3 + 4 + 3 lines high
      var ys = [0, 3, 7, 10];
      for (y = 0; y < CH; y++) {
        var band = y < 3 ? 0 : (y < 7 ? 1 : 2);
        for (x = 0; x < CW; x++) {
          var bit = 1 << (band * 2 + (x < 4 ? 0 : 1));
          setPx(x0 + x, y0 + y, (b & bit) ? fg : bg);
        }
      }
      return;
    }
    var rows = glyph(cell.ch);
    for (y = 0; y < CH; y++) {
      var bits = y < 9 ? rows[y] : 0;
      for (x = 0; x < CW; x++) {
        // each dot is stretched one dot to the right, the way a CRT
        // character generator thickens its strokes: 5 dots drawn over 6
        var on = (x >= 1 && x <= 5 && ((bits >> (5 - x)) & 1)) || (x >= 2 && x <= 6 && ((bits >> (6 - x)) & 1));
        setPx(x0 + x, y0 + y, on ? fg : bg);
      }
    }
  }

  var state = {
    page: '100', shown: null, typed: '', loading: false, rolling: 0,
    live: null,          // true / 'stale' / false (offline) / null (unknown yet)
    hoverLink: null, timer: null, token: 0
  };

  function headerCells() {
    var g = blankGrid()[0];
    var num = state.typed ? (state.typed + '---').slice(0, 3) : state.page.slice(0, 3);
    var d = new Date(), nl = lang() === 'nl';
    var mon = (nl ? ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
                  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])[d.getMonth()];
    function two(n) { return (n < 10 ? '0' : '') + n; }
    var mid = (state.loading || state.typed) ? (' ' + String(100 + (state.rolling % 800)) + ' ') : 'G7400';
    var parts = [
      [' P' + num + ' ', state.typed || state.loading ? 'yellow' : 'white'],
      ['RETRO VAULT ', 'cyan'],
      [mid, state.loading || state.typed ? 'green' : 'yellow'],
      ['  ' + two(d.getDate()) + ' ' + mon + ' ', 'white'],
      [two(d.getHours()) + ':' + two(d.getMinutes()) + ':' + two(d.getSeconds()), 'yellow']
    ];
    var c = 0;
    parts.forEach(function (p) {
      for (var i = 0; i < p[0].length && c < COLS; i++, c++) { g[c].ch = p[0][i]; g[c].fg = p[1]; }
    });
    return g;
  }

  function render() {
    var g = state.shown ? state.shown.grid : blankGrid();
    var head = headerCells();
    for (var c = 0; c < COLS; c++) drawCell(0, c, head[c], false);
    for (var r = 1; r < ROWS; r++) {
      for (c = 0; c < COLS; c++) {
        var cell = g[r][c];
        drawCell(r, c, cell, !!(state.hoverLink && cell.link === state.hoverLink && !cell.mos));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---------------------------------------------------------------- status
  var statusEl = document.getElementById('ttStatus');
  var subEl = document.getElementById('ttSub');
  function setStatus() {
    if (!statusEl) return;
    var s = state.shown, txt, cls;
    if (state.loading) { txt = ui('loading') + ' ' + state.page + '…'; cls = 'load'; }
    else if (s && s.vault) { txt = ui('vault') + ' ' + state.page + (state.live === false ? ' · ' + ui('offline') : ''); cls = state.live === false ? 'off' : 'vault'; }
    else if (state.live === 'stale') { txt = ui('stale'); cls = 'stale'; }
    else if (state.live === false) { txt = ui('offline'); cls = 'off'; }
    else { txt = ui('live') + ' · ' + ui('p') + ' ' + state.page; cls = 'live'; }
    statusEl.textContent = txt;
    statusEl.className = 'tt-status ' + cls;
    if (subEl) subEl.textContent = (s && (s.nextSub || s.prevSub)) ? ui('sub') : '';
    var fb = ROOT.querySelectorAll('[data-fast]');
    for (var i = 0; i < fb.length; i++) {
      var t = s && s.fast ? s.fast[+fb[i].dataset.fast] : '';
      fb[i].title = t ? (ui('p') + ' ' + t) : '';
      fb[i].disabled = !t;
    }
  }

  // ---------------------------------------------------------------- loading
  function isVault(p) { return /^40[0-5]$/.test(p); }

  function show(p, page) {
    state.page = p; state.shown = page; state.loading = false; state.typed = '';
    try { history.replaceState(null, '', '#' + p); } catch (e) {}
    render(); setStatus();
  }

  // Text that goes ON the teletext screen: the font is Latin only, so Dutch
  // for Dutch visitors and English for everyone else.
  var GT = {
    en: { off: 'NOS not reachable right now', on: 'NOS Teletekst is live', nf: 'does not exist at NOS', tryp: 'Try', idx: 'index', news: 'News', vault: 'Vault', sport: 'Sport' },
    nl: { off: 'NOS nu niet bereikbaar', on: 'NOS Teletekst is live', nf: 'bestaat niet bij de NOS', tryp: 'Probeer', idx: 'index', news: 'Nieuws', vault: 'Vault', sport: 'Sport' }
  };
  function gt(k) { return (lang() === 'nl' ? GT.nl : GT.en)[k]; }
  function liveNotice() {
    if (state.live === false) return '{r} \u25CF {w}' + gt('off');
    if (state.live === true || state.live === 'stale') return '{g} \u25CF {w}' + gt('on');
    return '';
  }

  function go(p, quiet) {
    p = String(p);
    if (!/^[1-8]\d\d(-\d{1,2})?$/.test(p)) return;
    clearTimeout(state.timer);
    if (isVault(p)) { show(p, vaultPage(+p, p === '400' ? liveNotice() : '')); schedule(); return; }
    var my = ++state.token;
    state.page = p;
    if (!quiet) { state.loading = true; setStatus(); }
    var ctl = window.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctl) ctl.abort(); }, 9000);
    fetch(PROXY + encodeURIComponent(p), { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (res) {
        clearTimeout(to);
        var stale = res.headers.get('X-Teletext-Stale') === '1';
        if (res.status === 404) return { notfound: true };
        if (!res.ok) throw new Error('http ' + res.status);
        return res.json().then(function (j) { j._stale = stale; return j; });
      })
      .then(function (j) {
        if (my !== state.token) return;
        if (j.notfound) {
          state.live = true;
          show(p, messagePage(['P' + p.slice(0, 3), '{y} ' + p + '{w} ' + gt('nf'), '{c} ' + gt('tryp') + ' {y}100{c} (' + gt('idx') + ') / {y}400{c} (Retro Vault)'],
            [['Index', '100'], [gt('news'), '101'], [gt('vault'), '400'], [gt('sport'), '601']]));
          schedule(); return;
        }
        var g = parseNos(j.content || '');
        autoLinks(g);
        var fast = (j.fastTextLinks || []).slice(0, 4).map(function (f) { return f.page; });
        state.live = j._stale ? 'stale' : true;
        show(p, { grid: g, prev: j.prevPage || '', next: j.nextPage || '', prevSub: j.prevSubPage || '',
                  nextSub: j.nextSubPage || '', fast: fast });
        schedule();
      })
      .catch(function () {
        clearTimeout(to);
        if (my !== state.token) return;
        state.live = false;
        // A background refresh that fails keeps the page on screen; a page
        // the visitor asked for falls back to the Vault's own index.
        if (quiet && state.shown) { state.loading = false; setStatus(); schedule(); return; }
        show('400', vaultPage(400, liveNotice()));
        schedule();
      });
  }

  // While offline, check now and then whether NOS is back - without moving
  // the visitor off whatever Vault page they are reading.
  function probe() {
    fetch(PROXY + '100', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; state.live = true; })
      .catch(function () { state.live = false; })
      .then(function () {
        if (state.shown && state.shown.vault) show(state.page, vaultPage(+state.page, state.page === '400' ? liveNotice() : ''));
        else setStatus();
        schedule();
      });
  }

  // Live pages refresh every minute while the tab is visible.
  function schedule() {
    clearTimeout(state.timer);
    if (state.shown && state.shown.vault && state.live !== false) return;
    state.timer = setTimeout(function () {
      if (document.hidden) { schedule(); return; }
      if (state.live === false) { probe(); return; }
      go(state.page, true);
    }, state.live === false ? 120000 : 60000);
  }

  // ---------------------------------------------------------------- input
  function digit(d) {
    state.typed += d;
    if (state.typed.length === 1 && !/[1-8]/.test(d)) { state.typed = ''; return; }
    render();
    if (state.typed.length === 3) { var p = state.typed; state.typed = ''; go(p); }
  }
  function nav(which) {
    var s = state.shown; if (!s) return;
    var t = which === 'next' ? s.next : which === 'prev' ? s.prev : which === 'up' ? s.prevSub : s.nextSub;
    if (!t && (which === 'up' || which === 'down')) return;
    if (!t) {
      var n = parseInt(state.page, 10) + (which === 'next' ? 1 : -1);
      if (n < 100) n = 899; if (n > 899) n = 100;
      t = String(n);
    }
    go(t);
  }
  function fast(i) { var s = state.shown; if (s && s.fast && s.fast[i]) go(s.fast[i]); }

  if (EMBED) {
    window.addEventListener('keyup', function (e) {
      if (!/^F\d+$/.test(e.key)) e.stopPropagation();
    }, true);
  }
  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (EMBED && !/^F\d+$/.test(e.key)) e.stopPropagation();
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    var k = e.key;
    if (/^[0-9]$/.test(k)) { digit(k); e.preventDefault(); return; }
    var map = { ArrowRight: function () { nav('next'); }, ArrowLeft: function () { nav('prev'); },
      ArrowUp: function () { nav('up'); }, ArrowDown: function () { nav('down'); },
      r: function () { fast(0); }, g: function () { fast(1); }, y: function () { fast(2); }, b: function () { fast(3); },
      i: function () { go('100'); }, v: function () { go('400'); },
      Escape: function () { state.typed = ''; render(); }, Backspace: function () { state.typed = state.typed.slice(0, -1); render(); } };
    var f = map[k] || map[k.toLowerCase && k.toLowerCase()];
    if (f) { f(); e.preventDefault(); }
  }, true);

  ROOT.querySelectorAll('[data-key]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.key;
      if (/^\d$/.test(k)) digit(k);
      else if (k === 'prev' || k === 'next' || k === 'up' || k === 'down') nav(k);
      else go(k);
    });
  });
  ROOT.querySelectorAll('[data-fast]').forEach(function (b) {
    b.addEventListener('click', function () { fast(+b.dataset.fast); });
  });

  function cellAt(ev) {
    var r = canvas.getBoundingClientRect();
    var c = Math.floor((ev.clientX - r.left) / r.width * COLS);
    var row = Math.floor((ev.clientY - r.top) / r.height * ROWS);
    if (row < 1 || row >= ROWS || c < 0 || c >= COLS || !state.shown) return null;
    return state.shown.grid[row][c];
  }
  canvas.addEventListener('mousemove', function (ev) {
    var cell = cellAt(ev), l = cell && cell.link || null;
    canvas.style.cursor = l ? 'pointer' : '';
    if (l !== state.hoverLink) { state.hoverLink = l; render(); }
  });
  canvas.addEventListener('mouseleave', function () { if (state.hoverLink) { state.hoverLink = null; render(); } });
  canvas.addEventListener('click', function (ev) { var cell = cellAt(ev); if (cell && cell.link) go(cell.link); });

  // Gamepad: D-pad pages, face buttons are Fastext (A red, B green, X yellow, Y cyan).
  var padPrev = {};
  function pollPad() {
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var p = pads[i]; if (!p) continue;
      var acts = { 15: function () { nav('next'); }, 14: function () { nav('prev'); }, 12: function () { nav('up'); },
        13: function () { nav('down'); }, 0: function () { fast(0); }, 1: function () { fast(1); }, 2: function () { fast(2); },
        3: function () { fast(3); }, 9: function () { go('100'); }, 8: function () { go('400'); } };
      Object.keys(acts).forEach(function (b) {
        var down = p.buttons[b] && p.buttons[b].pressed, key = i + ':' + b;
        if (down && !padPrev[key]) acts[b]();
        padPrev[key] = down;
      });
    }
    requestAnimationFrame(pollPad);
  }
  if (!EMBED) window.addEventListener('gamepadconnected', function once() {
    window.removeEventListener('gamepadconnected', once); requestAnimationFrame(pollPad);
  });

  // Scanline toggle (remembered per browser)
  var scan = document.getElementById('ttScan'), tv = document.getElementById('ttTv');
  if (scan && tv) {
    var on = true;
    try { on = localStorage.getItem('VideopacVault_ttScan') !== '0'; } catch (e) {}
    scan.checked = on; tv.classList.toggle('scan', on);
    scan.addEventListener('change', function () {
      tv.classList.toggle('scan', scan.checked);
      try { localStorage.setItem('VideopacVault_ttScan', scan.checked ? '1' : '0'); } catch (e) {}
    });
  }

  // Header: clock ticks, and the page counter rolls while a page is searched for.
  setInterval(function () { state.rolling += 7; render(); }, 250);
  document.addEventListener('visibilitychange', function () { if (!document.hidden && state.live !== false) schedule(); });

  window.VaultTeletext = {
    go: go, relang: function () { if (state.shown && state.shown.vault) go(state.page); else setStatus(); },
    _state: state, _parse: parseNos
  };

  var start = (location.hash || '').replace('#', '');
  go(/^[1-8]\d\d(-\d{1,2})?$/.test(start) ? start : '100');
})();
