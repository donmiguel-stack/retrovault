# Part 2: the panel itself - featured.js data, i18n intro, template, app.js.
import json, io, sys
def rd(p): return io.open(p, encoding="utf-8").read()
def wr(p, s): io.open(p, "w", encoding="utf-8").write(s)
if "amhomebrew" in rd("featured.js"):
    sys.exit("already applied")

B = [
("am_tiny_pixel_adventure", {
 "en": "Released in 2024 and still being updated - the build on this shelf is from this month. HooGames2017's bright OCS platformer: stomp what you can, shoot the rest with a quiver that never quite holds enough, and fetch seven jars of honey for a key.",
 "nl": "Uitgebracht in 2024 en nog altijd in ontwikkeling - de versie op deze plank is van deze maand. Een kleurrijke OCS-platformer van HooGames2017: spring op wat kan, schiet de rest neer met een pijlkoker die nooit helemaal vol genoeg is, en haal zeven potten honing op voor een sleutel.",
 "de": "2024 erschienen und immer noch in Arbeit - die Fassung in diesem Regal ist von diesem Monat. HooGames2017s bunter OCS-Plattformer: spring auf, was sich zertreten lässt, schieß den Rest mit einem Köcher ab, der nie ganz reicht, und hol sieben Gläser Honig für einen Schlüssel.",
 "fr": "Sorti en 2024 et toujours mis à jour - la version de ce rayon date de ce mois-ci. Le jeu de plates-formes OCS tout en couleurs de HooGames2017 : écrasez ce qui peut l'être, tirez sur le reste avec un carquois jamais assez rempli, et rapportez sept pots de miel contre une clé.",
 "pt": "Lançado em 2024 e ainda recebendo atualizações - a versão desta prateleira é deste mês. O jogo de plataforma OCS colorido da HooGames2017: pule em cima do que der, acerte o resto com uma aljava que nunca tem flechas suficientes e busque sete potes de mel em troca de uma chave.",
 "ja": "2024ねんに でて、いまも アップデートが つづいています。この たなの バージョンは こんげつの ものです。HooGames2017 の カラフルな OCS アクションです。ふめる てきは ふんで、のこりは かずの すくない やで うち、ハチミツを 7つ あつめて カギを もらいます。"}),
("am_tenebra2", {
 "en": "Haplo's dark puzzle sequel, on the Amiga since 2023. A man who refuses to set foot in the dark, thirty-five chapters to lead him through, and now a portal gun. Press Y at the first prompt for the classic look.",
 "nl": "Haplo's duistere puzzelvervolg, sinds 2023 op de Amiga. Een man die weigert een voet in het donker te zetten, vijfendertig hoofdstukken om hem doorheen te loodsen, en nu ook een portaalpistool. Druk bij de eerste vraag op Y voor de klassieke look.",
 "de": "Haplos düstere Rätsel-Fortsetzung, seit 2023 auf dem Amiga. Ein Mann, der keinen Fuß ins Dunkle setzt, fünfunddreißig Kapitel, durch die du ihn lotsen musst, und jetzt auch eine Portalkanone. Drück bei der ersten Frage Y für den klassischen Look.",
 "fr": "La suite sombre du jeu de réflexion de Haplo, sur Amiga depuis 2023. Un homme qui refuse de poser le pied dans le noir, trente-cinq chapitres pour l'en sortir, et désormais un pistolet à portails. Appuyez sur Y à la première question pour l'aspect classique.",
 "pt": "A sombria continuação de quebra-cabeça de Haplo, no Amiga desde 2023. Um homem que se recusa a pisar no escuro, trinta e cinco capítulos para guiá-lo e, agora, uma arma de portais. Aperte Y na primeira pergunta para o visual clássico.",
 "ja": "Haplo の くらい パズルの つづきで、2023ねんから Amiga で あそべます。くらやみに あしを ふみいれない おとこを、35の しょうで みちびきます。こんかいは ポータルガンも あります。さいしょの しつもんで Y を おすと クラシックな みためで あそべます。"}),
("am_ooze", {
 "en": "A Spectrum game that kept growing: Haplo and Andy Johns took it to the C64, then gave the 2023 Amiga version a map almost twice the size. You are a green blob that can flip gravity, and the guards are robots.",
 "nl": "Een Spectrum-spel dat bleef groeien: Haplo en Andy Johns brachten het naar de C64 en gaven de Amiga-versie uit 2023 daarna een kaart die bijna twee keer zo groot is. Jij bent een groene klodder die de zwaartekracht kan omdraaien, en de bewakers zijn robots.",
 "de": "Ein Spectrum-Spiel, das immer weiter wuchs: Haplo und Andy Johns brachten es auf den C64 und gaben der Amiga-Fassung von 2023 dann eine fast doppelt so große Karte. Du bist ein grüner Klecks, der die Schwerkraft umdrehen kann, und die Wachen sind Roboter.",
 "fr": "Un jeu Spectrum qui n'a pas cessé de grandir : Haplo et Andy Johns l'ont porté sur C64, puis ont donné à la version Amiga de 2023 une carte presque deux fois plus grande. Vous êtes une goutte verte capable d'inverser la gravité, et les gardes sont des robots.",
 "pt": "Um jogo de Spectrum que não parou de crescer: Haplo e Andy Johns o levaram ao C64 e depois deram à versão de Amiga de 2023 um mapa quase duas vezes maior. Você é uma gosma verde que inverte a gravidade, e os guardas são robôs.",
 "ja": "ZX Spectrum から はじまり、どんどん おおきく なった ゲームです。Haplo と Andy Johns が C64 に いしょくし、2023ねんの Amiga ばんでは マップを ほぼ 2ばいに しました。あなたは じゅうりょくを ひっくりかえせる みどりの スライムで、みはりは ロボットです。"}),
("am_yoomp", {
 "en": "A beach ball bouncing down a textured 3D tube, twenty-seven levels long. zr-games rebuilt the C64 and Atari 8-bit Yoomp! for the 16-bit machine, and were still adding music to it in 2025.",
 "nl": "Een strandbal die door een getextureerde 3D-buis stuitert, zevenentwintig levels lang. zr-games bouwde de C64- en Atari 8-bit-Yoomp! opnieuw op voor de 16-bitmachine, en voegde er in 2025 nog muziek aan toe.",
 "de": "Ein Wasserball, der durch eine texturierte 3D-Röhre hüpft, siebenundzwanzig Level lang. zr-games hat das Yoomp! von C64 und Atari 8-Bit für die 16-Bit-Maschine neu gebaut und 2025 noch Musik nachgeliefert.",
 "fr": "Un ballon de plage qui rebondit dans un tube 3D texturé, sur vingt-sept niveaux. zr-games a reconstruit le Yoomp! du C64 et de l'Atari 8 bits pour la machine 16 bits, et y ajoutait encore de la musique en 2025.",
 "pt": "Uma bola de praia quicando por um tubo 3D texturizado, ao longo de vinte e sete fases. A zr-games reconstruiu o Yoomp! do C64 e do Atari 8 bits para a máquina de 16 bits, e ainda estava acrescentando músicas em 2025.",
 "ja": "ビーチボールが もようの ついた 3D の チューブを はずみながら すすむ、27ステージの ゲームです。zr-games が C64 と Atari 8ビットの Yoomp! を 16ビットの マシンむけに つくりなおし、2025ねんにも おんがくを ついか していました。"}),
("am_shift", {
 "en": "A Flash puzzler rebuilt for machines from the eighties. Press a button and black and white trade places, so the floor you stand on becomes the wall you fall past. Haplo's 2024 Amiga version has forty-five levels, one of them secret.",
 "nl": "Een Flash-puzzelspel, opnieuw gebouwd voor machines uit de jaren tachtig. Eén druk op de knop en zwart en wit wisselen van plaats: de vloer waar je op staat wordt de muur waar je langs valt. Haplo's Amiga-versie uit 2024 heeft vijfenveertig levels, waarvan één geheim.",
 "de": "Ein Flash-Rätselspiel, neu gebaut für Rechner aus den Achtzigern. Ein Knopfdruck, und Schwarz und Weiß tauschen die Plätze - der Boden, auf dem du stehst, wird zur Wand, an der du vorbeifällst. Haplos Amiga-Fassung von 2024 hat fünfundvierzig Level, eines davon geheim.",
 "fr": "Un jeu de réflexion Flash reconstruit pour des machines des années quatre-vingt. Une pression sur un bouton et le noir et le blanc échangent leur place : le sol sur lequel vous êtes devient le mur le long duquel vous tombez. La version Amiga de Haplo, en 2024, compte quarante-cinq niveaux, dont un secret.",
 "pt": "Um quebra-cabeça de Flash reconstruído para máquinas dos anos oitenta. Aperte um botão e o preto e o branco trocam de lugar: o chão em que você pisa vira a parede por onde você cai. A versão de Amiga de Haplo, de 2024, tem quarenta e cinco fases, uma delas secreta.",
 "ja": "Flash の パズルゲームを、80ねんだいの マシンむけに つくりなおしました。ボタンを おすと くろと しろが いれかわり、たっていた ゆかが、おちていく さきの かべに なります。Haplo の 2024ねんの Amiga ばんは 45ステージで、その うち 1つは ひみつの ステージです。"}),
("am_yeet", {
 "en": "Zooperdan's 2025 rune puzzle: push runes off the edge of the board until exactly one is left. Fifty puzzles, a stock A500 with half a megabyte, and one wrong push is all it takes to trap yourself.",
 "nl": "Het runenpuzzelspel van zooperdan uit 2025: duw runen van de rand van het bord tot er precies één over is. Vijftig puzzels, een standaard A500 met een halve megabyte, en één verkeerde duw is genoeg om jezelf vast te zetten.",
 "de": "Zooperdans Runen-Rätsel von 2025: Schieb Runen über den Rand des Bretts, bis genau eine übrig ist. Fünfzig Rätsel, ein serienmäßiger A500 mit einem halben Megabyte, und ein falscher Schubs reicht, um dich festzusetzen.",
 "fr": "Le casse-tête de runes de zooperdan, sorti en 2025 : poussez les runes hors du plateau jusqu'à ce qu'il n'en reste qu'une. Cinquante énigmes, un A500 de série avec un demi-mégaoctet, et une seule mauvaise poussée suffit à vous coincer.",
 "pt": "O quebra-cabeça de runas de zooperdan, de 2025: empurre runas para fora do tabuleiro até sobrar exatamente uma. Cinquenta desafios, um A500 de fábrica com meio megabyte, e um único empurrão errado basta para você ficar sem saída.",
 "ja": "zooperdan の 2025ねんの ルーン パズルです。ばんの はしから ルーンを おしだして、さいごに 1つだけ のこします。パズルは 50もん、ふつうの A500 と 0.5メガバイトで うごきます。1かい おしまちがえる だけで、てづまりに なります。"}),
]

s = rd("featured.js")
anchor = "  // ---- Homebrew, PC shelf ------------------------------------------"
assert s.count(anchor) == 1
out = ("  // ---- Homebrew, Amiga shelf ---------------------------------------\n"
       "  // Same shape as \"pchomebrew\" below, shown only on the Amiga shelf\n"
       "  // (placeBlocks() in app.js gates it on state.platform === \"Amiga\").\n"
       "  // This is the \"still being written\" half of the shelf: the 1990s PD and\n"
       "  // shareware disks already fill the grid, so these six are modern releases\n"
       "  // only (2023-2026). Which six: itch.io's own popular sort for free Amiga\n"
       "  // games (itch.io/games/free/tag-amiga, checked 2026-10-11), first six that\n"
       "  // are original games - not ports of commercial arcade/console titles -\n"
       "  // single-disk, and run on the shelf's stock A500 under AROS. Skipped on\n"
       "  // the way down: Bruce Lee, Castlevania AGA, Turrican II AGA, OutRun,\n"
       "  // Wonderboy (ports); Nelumbo (Windows only); The Lost Pixel (AGA);\n"
       "  // Tiger Claw (no Amiga build on its itch page); Dr. Dangerous and Space\n"
       "  // Cavern Blaster (boot on Kickstart 1.3 only - crash/blank under AROS, so\n"
       "  // public visitors couldn't play them). Haplo is on it three times because\n"
       "  // that is what the list says. Tenebra 2, Ooze and Yoomp! have paid\n"
       "  // physical editions, so they play locally but aren't hosted - see\n"
       "  // downloads.js.\n"
       "  amhomebrew: [\n")
items = []
for gid, bl in B:
    lines = ",\n          ".join('%s: %s' % (k, json.dumps(bl[k], ensure_ascii=False)) for k in ("en","nl","de","fr","pt","ja"))
    items.append('    { id: "%s",\n      blurb: { %s } }' % (gid, lines))
out += ",\n".join(items) + "\n  ],\n\n"
wr("featured.js", s.replace(anchor, out + anchor))

# ---- i18n.js: Amiga-specific intro next to each language's homebrewIntro
INTRO = {
 "en": "Commodore went bankrupt in 1994. Nobody told the people still writing for the Amiga - these six are the most popular free releases on itch.io right now, all from the last few years.",
 "nl": "Commodore ging in 1994 failliet. Niemand heeft dat verteld aan de mensen die nog steeds voor de Amiga schrijven - dit zijn de zes populairste gratis releases op itch.io van dit moment, allemaal van de laatste paar jaar.",
 "de": "Commodore ging 1994 pleite. Den Leuten, die immer noch für den Amiga schreiben, hat das niemand gesagt - das hier sind die sechs beliebtesten kostenlosen Veröffentlichungen auf itch.io, alle aus den letzten paar Jahren.",
 "fr": "Commodore a fait faillite en 1994. Personne ne l'a dit à ceux qui écrivent encore pour l'Amiga - voici les six sorties gratuites les plus populaires du moment sur itch.io, toutes de ces dernières années.",
 "pt": "A Commodore faliu em 1994. Ninguém avisou quem ainda escreve para o Amiga - estes são os seis lançamentos gratuitos mais populares do itch.io agora, todos dos últimos anos.",
 "ja": "Commodore は 1994ねんに とうさん しました。でも、いまも Amiga の ゲームを つくっている ひとたちは とまりません。ここに あるのは itch.io で いま いちばん にんきの ある むりょうの 6ほんで、どれも ここ すうねんの さくひんです。",
}
s = rd("i18n.js")
import re
starts = [m.start() for m in re.finditer(r"\n    homebrewIntro: ", s)]
assert len(starts) == 6, len(starts)
langs = ["en","nl","de","fr","pt","ja"]
for pos, lang in reversed(list(zip(starts, langs))):
    eol = s.index("\n", pos + 1)
    s = s[:eol] + "\n    amHomebrewIntro: " + json.dumps(INTRO[lang], ensure_ascii=False) + "," + s[eol:]
wr("i18n.js", s)

# ---- index.html: template + cache-bust
s = rd("index.html")
anchor = '<template id="msTpl">'
tpl = ('<template id="amhomebrewTpl">\n  <div class="homebrew-strip">\n    <div class="hb-head">\n      <div>\n'
       '        <h3><span data-i18n="homebrewHead">Still being written</span><span class="hb-word"></span></h3>\n'
       '        <p class="hb-intro" data-i18n="amHomebrewIntro"></p>\n      </div>\n    </div>\n'
       '    <div class="feature-row">\n      <a class="feature-main" href="#"></a>\n      <div class="feature-list"></div>\n'
       '    </div>\n  </div>\n</template>\n\n')
assert s.count(anchor) == 1
s = s.replace(anchor, tpl + anchor)
for a, b in [("i18n.js?v=135", "i18n.js?v=136"), ("games.js?v=128", "games.js?v=129"), ("genres.js?v=121", "genres.js?v=122"),
             ("gamepages.js?v=146", "gamepages.js?v=147"), ("featured.js?v=117", "featured.js?v=118"), ("app.js?v=141", "app.js?v=142")]:
    assert s.count(a) == 1, a
    s = s.replace(a, b)
wr("index.html", s)

# ---- versions.js (game pages)
s = rd("versions.js")
for a, b in [('["i18n.js", 134]', '["i18n.js", 136]'), ('["games.js", 128]', '["games.js", 129]'), ('["genres.js", 121]', '["genres.js", 122]'),
             ('["support.js", 110]', '["support.js", 111]'), ('["downloads.js", 114]', '["downloads.js", 115]'),
             ('["featured.js", 117]', '["featured.js", 118]'), ('["gamepages.js", 146]', '["gamepages.js", 147]')]:
    assert s.count(a) == 1, a
    s = s.replace(a, b)
wr("versions.js", s)

# ---- app.js
s = rd("app.js")
anchor = "  // Loops the community carousel:"
assert s.count(anchor) == 1
fn = ('  // The Amiga shelf\'s own homebrew panel - same idea as the three above,\n'
      '  // separate data (amhomebrew in featured.js) and template (amhomebrewTpl).\n'
      '  // Reuses c64HomebrewFeatureRotator() like the PC one: clip -> YouTube ->\n'
      '  // cover. Its own intro line (amHomebrewIntro) because the shared one\n'
      '  // talks about "the console" and 1998, which is the Videopac\'s story.\n'
      '  var amHbStop = null;\n'
      '  function amHomebrewBlock() {\n'
      '    var picks = ((window.FEATURED_DATA || {}).amhomebrew || []).filter(function (f) {\n'
      '      return state.games.some(function (g) { return g.id === f.id; });\n'
      '    });\n'
      '    var tpl = document.getElementById("amhomebrewTpl");\n'
      '    if (!picks.length || !tpl) return null;\n'
      '    if (amHbStop) amHbStop();\n'
      '    var node = tpl.content.firstElementChild.cloneNode(true);\n'
      '    node.querySelector("[data-i18n=homebrewHead]").textContent = window.t("homebrewHead");\n'
      '    node.querySelector(".hb-word").textContent = window.t("cat_homebrew");\n'
      '    node.querySelector(".hb-intro").textContent = window.t("amHomebrewIntro");\n'
      '    amHbStop = c64HomebrewFeatureRotator(node.querySelector(".feature-main"),\n'
      '                                         node.querySelector(".feature-list"), picks);\n'
      '    return node;\n'
      '  }\n\n')
s = s.replace(anchor, fn + anchor)
old = ('    // The Amiga shelf gets its own Amiga-style advert and its own "keeping\n'
       '    // this console alive" panel, and none of the Videopac homebrew/community\n'
       '    // panels (those are Videopac content) - same reasoning as the two\n'
       '    // branches above. No homebrew panel: this shelf is mostly PD/freeware\n'
       '    // already, so a separate homebrew strip would be a panel about the same\n'
       '    // games the grid is showing.\n'
       '    if (state.platform === "Amiga") {\n'
       '      if (total >= 6) insertAt(amAdBlock(), Math.min(12, Math.floor(total / 2)));\n')
new = ('    // The Amiga shelf gets its own Amiga-style advert, its own "still being\n'
       '    // written" homebrew panel and its own "keeping this console alive" panel,\n'
       '    // and none of the Videopac ones - same reasoning as the two branches\n'
       '    // above. The homebrew panel is modern releases only (2023 on): the\n'
       '    // 1990s PD disks are already the bulk of the grid, so a panel of those\n'
       '    // would just repeat it.\n'
       '    if (state.platform === "Amiga") {\n'
       '      if (total >= 6) insertAt(amAdBlock(), Math.min(12, Math.floor(total / 2)));\n'
       '      if (total >= 30) insertAt(amHomebrewBlock(), Math.min(60, Math.floor(total * 2 / 3)));\n')
assert s.count(old) == 1
s = s.replace(old, new)
wr("app.js", s)
print("panel patched")
