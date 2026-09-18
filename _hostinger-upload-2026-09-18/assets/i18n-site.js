// Retro Vault landing page — interface translation.
// Same six languages as the Vault app itself (EN/NL/DE/FR/PT-BR/JA), same
// "row of flags, no dropdown" pattern. Game titles, brand names, code
// samples and award citations are left as-is on purpose, same rule the
// Vault app uses for its own catalogue: only the surrounding prose moves.
//
// The Japanese pack is written without kanji - hiragana with katakana for
// loanwords - because it is aimed at young Japanese readers. Keep it that
// way when editing, and see the html[lang="ja"] block in index.html for the
// typography that goes with it.
(function(){
  "use strict";

  var LANG_KEY = "rv-site-lang";

  var FLAGS = {
    en: { name: "English", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"14\" fill=\"#012169\"/><path d=\"M0 0l20 14M20 0L0 14\" stroke=\"#fff\" stroke-width=\"2.8\"/><path d=\"M0 0l20 14M20 0L0 14\" stroke=\"#C8102E\" stroke-width=\"1.4\"/><path d=\"M10 0v14M0 7h20\" stroke=\"#fff\" stroke-width=\"4.6\"/><path d=\"M10 0v14M0 7h20\" stroke=\"#C8102E\" stroke-width=\"2.6\"/></svg>" },
    nl: { name: "Nederlands", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"14\" fill=\"#fff\"/><rect width=\"20\" height=\"4.67\" fill=\"#AE1C28\"/><rect y=\"9.33\" width=\"20\" height=\"4.67\" fill=\"#21468B\"/></svg>" },
    de: { name: "Deutsch", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"4.67\" fill=\"#000\"/><rect y=\"4.67\" width=\"20\" height=\"4.67\" fill=\"#D00\"/><rect y=\"9.33\" width=\"20\" height=\"4.67\" fill=\"#FFCE00\"/></svg>" },
    fr: { name: "Français", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"14\" fill=\"#fff\"/><rect width=\"6.67\" height=\"14\" fill=\"#002395\"/><rect x=\"13.33\" width=\"6.67\" height=\"14\" fill=\"#ED2939\"/></svg>" },
    pt: { name: "Português (BR)", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"14\" fill=\"#009B3A\"/><path d=\"M10 1.6L18.2 7 10 12.4 1.8 7z\" fill=\"#FEDF00\"/><circle cx=\"10\" cy=\"7\" r=\"3.1\" fill=\"#002776\"/><path d=\"M6.9 6.2a3.1 3.1 0 0 0 6.2 .55\" stroke=\"#fff\" stroke-width=\".85\" fill=\"none\"/></svg>" },
    ja: { name: "にほんご", flag: "<svg viewBox=\"0 0 20 14\" width=\"20\" height=\"14\"><rect width=\"20\" height=\"14\" fill=\"#fff\"/><circle cx=\"10\" cy=\"7\" r=\"4.2\" fill=\"#BC002D\"/></svg>" }
  };

  var BAT_HTML = '<span class="bat-trigger-wrap"><button type="button" class="bat-signal-link" id="batSignalBtn">bat-signal</button><span class="bat-beam" id="batBeam" aria-hidden="true"><span class="bat-beam-cone"></span><span class="bat-disc"></span><span class="bat-glyph"><img src="assets/bat-signal.png" alt="" width="19" height="9"></span></span></span>';
  var MAIL_HTML = '<span class="contact-mail">hq&#8202;[at]&#8202;retrovault.world</span>';

  var T = {};

  T.nl = {
    "nav.vault":"De Vault","nav.screens":"Schermafbeeldingen","nav.demo":"🕹 Live demo","nav.ms":"Master Strategy","nav.homebrew":"Homebrew","nav.tour":"Rondleiding","nav.license":"Licentie","nav.download":"Downloaden",
    "hero.tag":"Een bibliotheek in Steam-stijl voor de machines die het allemaal begonnen.",
    "hero.free":"Gratis &amp; open om te lezen.",
    "hero.btnDownload":"Download de Vault — gratis",
    "hero.btnDemo":"🕹 Bekijk de live demo",
    "hero.btnTour":"▶ Bekijk de rondleiding",
    "stats.releases":"gecatalogiseerde releases",
    "stats.shelves":"schappen — Videopac, C64, Amiga, MS-DOS",
    "stats.downloads":"gratis homebrew- &amp; PD-games om te downloaden",
    "stats.languages":"talen — EN·NL·DE·FR·PT·JA",
    "stats.cheats":"verborgen cheat-artikelen",
    "vault.kicker":"De Vault",
    "vault.h2":"Je jeugdschap, herbouwd als een moderne gamebibliotheek.",
    "vault.p1":"Steam maakte het normaal om je games te bekijken als een muur vol boxart — doorzoekbaar, filterbaar, één klik verwijderd van spelen. De machines die de thuisgame <em>uitvonden</em> kregen die behandeling nooit. Retro Vault geeft het ze alsnog: een bibliotheekschil die volledig op je eigen computer draait, in je browser, offline als je wilt, en een cartridge uit 1979 met evenveel zorg behandelt als Steam een nieuwe release.",
    "vault.p2":"Elke game krijgt een echte pagina: originele boxart, screenshots, uitgever, jaar, genre, aantal spelers — en waar de geschiedenis iets heeft achtergelaten, bewaart de Vault het. Verborgen cheat-artikelen uit de community. Homebrew-spotlights voor de ontwikkelaars die vandaag nog games maken voor deze machines, met links om ze te steunen. Een uitgelichte rail, favorieten, en zoeken per schap, waardoor bijna 400 releases doorbladerbaar aanvoelen in plaats van archeologisch.",
    "vault.p3":"Alles speelt direct in de browser, zonder installaties — de ingebouwde emulators (O2EM, VICE, vAmigaWeb en DOSBox, gecompileerd naar WebAssembly) doen hun werk zodra je een bestand in de juiste map zet.",
    "vault.shelf.vp.p":"De volledige Europese Videopac-reeks plus Amerikaanse Odyssey²- en Braziliaanse varianten — G7000- en G7400+-releases, The Voice-titels, meertalige boxart, en de homebrewscene die de console nooit liet sterven.",
    "vault.shelf.c64.p":"De grootste hits van de bestverkochte thuiscomputer aller tijden — plus een homebrewschap met gloednieuwe C64-games, gameplayclips en \"steun de maker\"-links naar de mensen die ze nu maken.",
    "vault.shelf.pc.p":"Doom, Commander Keen, Duke Nukem, King's Quest, X-COM — het shareware- en floppytijdperk, draaiend op een WebAssembly-DOSBox met besturingsnotities per game.",
    "vault.shelf.amiga.p":"Het nieuwste schap. 27 public-domain-, shareware- en homebrewgames die bij de Vault zitten en meteen spelen — Deluxe Galaga, MegaBall, Sqrxz en consorten — plus klassiekers als Turrican, Stunt Car Racer en Lotus Turbo Challenge 2, op vAmigaWeb met de open-source AROS-Kickstart ingebouwd.",
    "vault.feat1.h3":"Spelen in de browser","vault.feat1.p":"O2EM, VICE, vAmigaWeb en DOSBox ingebouwd als WebAssembly-cores. Klik op een cover, druk op START, speel.",
    "vault.feat2.h3":"Echte boxart","vault.feat2.p":"Originele scans op elke kaart — Philips-, Magnavox- en Braziliaanse edities, geen placeholder-tegels.",
    "vault.feat3.h3":"Cheats &amp; geheimen","vault.feat3.p":"118 door de community aangeleverde cheat-artikelen, verborgen achter een onthulling, sommige met de originele diagrammen.",
    "vault.feat4.h3":"Homebrew-spotlight","vault.feat4.p":"Nieuwe games voor 40 jaar oude machines, met clips en directe links om de makers te steunen.",
    "vault.feat5.h3":"Zes talen","vault.feat5.p":"English, Nederlands, Deutsch, Français, Português en 日本語 — de hele schil, niet alleen de menu's.",
    "vault.feat7.h3":"Saves die blijven","vault.feat7.p":"Negen save-stateslots per game op het Videopac- en C64-schap — F2 opslaan, F3 laden — snapshots via het eigen menu van de emulator op het Amiga-schap, en DOS-games bewaren hun eigen ingebouwde saves. Alles blijft in je browser, op je eigen machine.","screens.play":"▶ Speel dit schap live","vault.feat6.h3":"Ingebouwde updates","vault.feat6.p":"Eén knop controleert de officiële repo en haalt nieuwe games, art en features naar je installatie.",
    "screens.kicker":"Schermafbeeldingen",
    "screens.h2":"Neem een kijkje.",
    "screens.sub":"Rechtstreeks uit de Vault — klik op een schermafbeelding om te vergroten. Of sla de plaatjes over en <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">bekijk het echte werk live</a>.",
    "screens.cap1":"<b>Het Videopac-schap</b>213 releases, uitgelichte rail, filters en een UI in zes talen.",
    "screens.cap2":"<b>Het Amiga-schap</b>Het nieuwste schap — 35 titels, waarvan 27 public-domain- en homebrewgames die meteen spelen.",
    "screens.cap3":"<b>Het Commodore 64-schap</b>Klassiekers bovenaan, een levende homebrewscene eronder.",
    "screens.cap4":"<b>Het MS-DOS-schap</b>Het sharewaretijdperk, van Keen tot Doom tot King's Quest.",
    "ms.kicker":"1981 – 1982 · De Videopac-museumstukken",
    "ms.p1":"In 1981 probeerden ontwerpers Ron Bradford en Steve Lehner — met Ed Averett, de man achter het grootste deel van de Odyssey²-catalogus, als programmeur — iets wat niemand anders deed: games die <b>half videogame, half bordspel</b> waren. Elke doos bevatte een volledig speelbord, stapels fiches en een spelregelboekje, en de console deed alleen waar consoles goed in waren — de actie, het rekenwerk, de scheidsrechter. Drie games verschenen voordat Philips de markt verliet. Een vierde, een Sherlock Holmes-game, was in ontwikkeling toen de stekker eruit ging en is nooit afgemaakt.",
    "ms.p2":"De Vault geeft de reeks een eigen expositie op het Videopac-schap: het echte bord gefotografeerd voor elke game, wat er in de doos zat, en gameplaybeelden.",
    "ms.card1.p":"Tien ringen verspreid door kerkers en verschuivende gangen. Kies Krijger, Tovenaar, Fantoom of Wisselvorm en race tegen een andere speler om ze als eerste te vinden — het bord, de overlay en de ruim veertig fiches maken van de tv slechts één onderdeel van de speeltafel.",
    "ms.card2.p":"Risk, maar dan met een videogame in plaats van dobbelstenen. Drieënveertig wereldmachten, elk beoordeeld op militaire en economische kracht — en elke veldslag wordt beslecht door het eigen gevecht van de cartridge te spelen in plaats van te dobbelen.",
    "ms.card3.p":"Zevenentwintig echte bedrijven en grondstoffen — IBM, McDonald's, goud, obligaties — met koersen die meebewegen met het nieuws en nooit twee keer hetzelfde verlopen. Koop laag, verkoop hoog, en eindig het jaar rijker dan tot drie tegenstanders.",
    "ms.blabel":"Het speelbord",
    "ms.note":"Alle drie staan op het Videopac-schap van de Vault, met doosinhoud, bordfoto's en gameplay — het dichtste wat je komt bij het opnieuw openen van de dozen.",
    "hb.kicker":"Nog Steeds In Ontwikkeling",
    "hb.h2":"Homebrew, springlevend",
    "hb.p1":"Op elk schap in de Vault speelt zich onder de klassiekers hetzelfde af: mensen schrijven nog steeds gloednieuwe games voor deze machines, decennia nadat de fabrikanten zijn gestopt. Retro Vault steunt en promoot homebrewwerk actief — het is de reden dat Videopac, C64, Amiga en MS-DOS geen museumstukken zijn, en elk schap heeft zijn eigen roterende homebrew-spotlight met gameplayclips en een directe link naar de makers.",
    "hb.card1.badge":"Videopac homebrew","hb.card1.p":"De eerste. John Dondzila bracht Sterns Berzerk in 1998 naar de console, vijftien jaar nadat Philips was gestopt, en zette daarmee alles hieronder in gang.",
    "hb.card2.badge":"C64 homebrew","hb.card2.p":"RGCD's 16KB-cartridge-demake van Canabalt, 2012 — één knop, oneindig vallen, en het bewijs dat de C64 een moderne indiehit decennia later nog steeds recht kon doen.",
    "hb.card3.badge":"MS-DOS homebrew","hb.card3.p":"Tarjans from-scratch first-person dungeon-RPG, dat nog steeds genummerde puntreleases krijgt, jaren na de eerste — stel een groep samen bij het Gilde en ontdek wat daar beneden op je wacht.",
    "hb.card4.badge":"Amiga-homebrew",
    "hb.card4.p":"Edgar Vigdals shareware-eerbetoon aan Namco's Galaga, rondgegaan via PD-bibliotheken en Aminet en nog altijd gratis — een van de 27 Amiga-games die bij de Vault zitten en meteen spelen.",
    "hb.note":"Deze vier zijn maar een greep — elk schap in de Vault roteert door meerdere homebrewkeuzes met clips en \"steun de maker\"-links. <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Bekijk de live demo</a> om ze allemaal te zien.",
    "tour.kicker":"De Rondleiding",
    "tour.h2":"Bekijk de Vault in actie.",
    "tour.sub":"Een geleide wandeling langs de schappen, de gamepagina's en de emulators.",
    "tour.note":"Gefilmd op het Videopac-schap — een bijgewerkte rondleiding langs de C64-, Amiga- en MS-DOS-schappen is onderweg.",
    "dl.kicker":"Downloaden",
    "dl.h2":"Haal de Vault. Begin met spelen.",
    "dl.step1.h3":"Download de Vault","dl.step1.p":"Pak de ZIP (~195&nbsp;MB — alle boxart zit erin) of clone de repo. Windows, macOS en Linux; alles met een moderne browser.",
    "dl.step2.h3":"Voeg je eigen gamebestanden toe","dl.step2.p":"Voor games die niet meer verkocht worden hoef je niets te doen — ruim 300 Videopac-, C64-, Amiga- en MS-DOS-titels spelen meteen, zowel in de demo als in je eigen installatie. Wat niemand meer verkoopt komt van onze eigen bestandsserver, en 77 homebrew-, public-domain- en freewaregames — waaronder alle speelbare titels van het Amiga-schap — zitten als gratis download bij de Vault. Voor alles wat nóg te koop is: zet je eigen cartridge- en schijfdumps in de map <code>emulator/roms</code> — bestanden die je zelf hebt gedumpt van games die je bezit; voor 44 daarvan wijst de gamepagina naar een archiefkopie, zodat je zelf kunt beslissen. Weet je niet waar je moet zoeken? Onze <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources-pagina</a> noemt de gebruikelijke plekken, per schap.","dl.step2.btn":"⬇ Download de games","dl.step3.click":"klik hier","stats.online":"online speelbaar — geen bestanden nodig",
    "dl.step3.h3":"Open het en speel","dl.step3.p":"Pak de ZIP uit en dubbelklik daarna op <code>Retro Vault.app</code> (Mac — heeft een eigen icoon, sleep het naar je Bureaublad, Programma's of het Dock) of <code>Start Retro Vault.bat</code> (Windows) — dat controleert of Python aanwezig is, installeert het voor je als dat niet zo is, en opent de Vault in je browser. Geen terminal nodig. De updateknop houdt je installatie vanaf dan actueel.",
    "dl.btn1":"⬇ Download de Vault (195&nbsp;MB)",
    "dl.btn2":"Bekijk op GitHub",
    "dl.fine":"Gratis onder de Retro Vault License. In de download zelf zitten geen game-ROMs en geen BIOS — titels die niet meer verkocht worden laden vanaf onze eigen bestandsserver, en alles wat nog te koop is lever je zelf aan. Nog niet zeker? <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Klik eerst door de live demo</a>.",
    "faq.h2":"Vragen die mensen echt stellen.",
    "faq.q1.summary":"Moet ik nog iets anders installeren dan de Vault zelf?",
    "faq.q1.p":"Geen handmatige installatie nodig — in de ZIP zit een starter: dubbelklik op <code>Retro Vault.app</code> op de Mac (een echte app met een eigen icoon — sleep hem naar je Bureaublad, Programma's of het Dock) of <code>Start Retro Vault.bat</code> op Windows, en die regelt <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">Python</a> voor je, en installeert het automatisch als het nog niet op je computer staat. Alleen de eerste keer krijg je mogelijk één melding: <b>Mac</b> — rechtsklik op de app → \"Open\" → \"Open\" (macOS bevestigt daarmee alleen dat het een gedownload bestand vertrouwt). <b>Windows</b> — klik bij de SmartScreen-melding op \"Meer info\" → \"Toch uitvoeren\". Daarna is het gewoon dubbelklikken. Liever Python zelf eerst installeren? <b>Mac:</b> open Terminal en voer <code>xcode-select --install</code> uit. <b>Windows:</b> haal de installer van <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org</a> en vink tijdens de installatie <b>\"Add python.exe to PATH\"</b> aan.",
    "faq.q2.summary":"Wat is Python, en waarom heb ik het nodig om alleen maar mijn games te bekijken?",
    "faq.q2.p":"Python is een programmeertaal die toevallig een ingebouwde miniwebserver meelevert (<code>python3 serve.py</code> in de Vault-map zet hem aan). Browsers blokkeren veel van wat de Vault nodig heeft — het laden van de WebAssembly-emulatorcores, het ophalen van gamedata — wanneer een pagina rechtstreeks vanaf een bestand op schijf wordt geopend. Dezelfde bestanden in plaats daarvan serveren via <code>http://localhost</code>, ook al is dat nog steeds 100% lokaal, is wat de browser ertoe brengt het als een gewone website te behandelen en alles te laten laden.",
    "faq.q3.summary":"Is \"localhost\" veilig? Verlaat er iets mijn computer?",
    "faq.q3.p":"Er verlaat niets je machine. <code>localhost</code> betekent gewoon \"deze computer praat met zichzelf\" — Python serveert bestanden van je eigen harde schijf naar je eigen browser, via een verbinding die het internet nooit raakt. Er worden geen games, saves of bestanden ergens geüpload.",
    "faq.q4.summary":"Op welke browsers en besturingssystemen draait het?",
    "faq.q4.p":"<b>Chrome zouden wij kiezen.</b> Firefox werkt ook prima, alleen met één extra klik voordat een game start. Wij zouden Safari vermijden — die wist opgeslagen sitegegevens na ongeveer een week zonder bezoek, en juist daar staan je favorieten en savegames. Ze draaien allemaal op Windows, macOS of Linux — alles wat modern genoeg is voor WebAssembly. Geen installaties naast Python, geen plugins.",
    "faq.q5.summary":"Moet ik de originele games al bezitten?",
    "faq.q5.p":"Voor de meeste niet meer. Retro Vault host de niet meer verkrijgbare titels zelf — ruim 300 Videopac-, C64-, Amiga- en MS-DOS-games die vandaag door niemand meer verkocht worden starten zonder dat je iets toevoegt, zowel in de <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">demo</a> als in je eigen installatie. Games die nóg te koop zijn, zijn de andere helft: die zal de Vault nooit meebrengen, daarvoor lever je zelf een dump van een exemplaar dat je bezit — de <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources</a>-pagina noemt waar mensen meestal kijken. Homebrew en rechtenvrije releases zitten er al bij. Zie de <a href=\"#license\">Licentie</a> hieronder voor de juridische details.","faq.q8.summary":"Kan ik gewoon spelen, zonder iets te downloaden?","faq.q8.p":"Ja. De <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">live demo</a> is de echte Vault, draaiend op onze eigen server — kies een schap, klik op een cover, spelen maar. Titels die niet meer verkocht worden laden hun gamebestanden bij ons; de rest staat wel in het schap, maar blijft op slot tot je je eigen bestand toevoegt. De Vault downloaden geeft je hetzelfde offline, plus je eigen bestanden, je eigen favorieten en savegames die op je eigen machine blijven.",
    "faq.q9.summary":"Heb ik een Amiga-Kickstart-ROM nodig?",
    "faq.q9.p":"Nee. Het Amiga-schap start op AROS, de gratis open-source vervanger van de Kickstart die bij de emulator zit, en elke public-domain- en homebrewtitel op het schap is daarop getest. Een paar commerciële games willen per se het echte werk: heb je een Kickstart 1.3-image (<a href=\"https://www.amigaforever.com/\" target=\"_blank\" rel=\"noopener\">Amiga Forever</a> is de legale manier om er een te krijgen), noem het dan <code>kick.rom</code>, zet het in <code>emulator/roms</code> en de Vault pikt het vanzelf op. Een Commodore-Kickstart leveren of hosten wij nooit.",
    "faq.q6.summary":"Wacht... zag ik nou een UFO?",
    "faq.q7.summary":"Hoe neem ik contact op?",
    "faq.q7.p":"Voor vragen, toestemmingen of verwijderverzoeken bereik je het team via " + MAIL_HTML + " — expres zo geschreven om spambots buiten de deur te houden, vervang het gewoon door het symbool. Bugmeldingen en ideeën zijn ook welkom op de <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">GitHub issue tracker</a>. Je kunt ook het " + BAT_HTML + " activeren.",
    "lic.kicker":"Licentie",
    "lic.h2":"Vrij te gebruiken. Niet vrij te klonen.",
    "lic.p1":"Retro Vault wordt uitgebracht onder de <b>Retro Vault License v1.0</b> — freeware met zichtbare broncode. In gewone taal:",
    "lic.li1":"<b>Je mag</b> het downloaden, gebruiken, voor altijd bewaren, en je eigen kopie aanpassen zoals je wilt.",
    "lic.li2":"<b>Je mag niet</b> het rehosten, klonen of afgeleide versies publiceren, of het commercieel gebruiken zonder schriftelijke toestemming.",
    "lic.li3":"<b>Er zit geen gameinhoud bij.</b> Gametitels, boxart en handelsmerken zijn eigendom van hun respectievelijke eigenaren en verschijnen ter identificatie en behoud.",
    "lic.li4":"De meegeleverde emulatorcores (O2EM, VICE, vAmigaWeb, DOSBox) zijn losse GPL-projecten onder hun eigen licenties; de AROS-Kickstartvervanger valt onder de AROS Public License.",
    "lic.p2":"Volledige tekst: <a href=\"https://github.com/donmiguel-stack/retrovault/blob/main/LICENSE.md\">LICENSE.md op GitHub</a>. Voor toestemmingen en verwijderverzoeken open je een issue op de <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">officiële repository</a> of schrijf je naar " + MAIL_HTML + ".",
    "footer.catalogue":"<a href=\"https://demo.retrovault.world/catalogue.html\">Alle spellen in de Vault, op één lijst</a>",
    "footer.contact":"Vragen of verwijderverzoeken: " + MAIL_HTML,
    "footer.trademark":"Videopac, Odyssey², Commodore 64, Amiga en alle gametitels, artwork en handelsmerken zijn eigendom van hun respectievelijke eigenaren. Dit is een niet-commercieel bewaarproject."
  };

  T.de = {
    "nav.vault":"Der Vault","nav.screens":"Screenshots","nav.demo":"🕹 Live-Demo","nav.ms":"Master Strategy","nav.homebrew":"Homebrew","nav.tour":"Rundgang","nav.license":"Lizenz","nav.download":"Download",
    "hero.tag":"Eine Bibliothek im Steam-Stil für die Maschinen, mit denen alles anfing.",
    "hero.free":"Kostenlos &amp; offen einsehbar.",
    "hero.btnDownload":"Vault herunterladen — kostenlos",
    "hero.btnDemo":"🕹 Live-Demo ansehen",
    "hero.btnTour":"▶ Rundgang ansehen",
    "stats.releases":"katalogisierte Veröffentlichungen",
    "stats.shelves":"Regale — Videopac, C64, Amiga, MS-DOS",
    "stats.downloads":"kostenlose Homebrew- &amp; PD-Spiele zum Download",
    "stats.languages":"Sprachen — EN·NL·DE·FR·PT·JA",
    "stats.cheats":"versteckte Cheat-Artikel",
    "vault.kicker":"Der Vault",
    "vault.h2":"Dein Kindheitsregal, neu aufgebaut wie eine moderne Spielebibliothek.",
    "vault.p1":"Steam hat es normal gemacht, seine Spiele als Wand aus Boxart zu durchstöbern — durchsuchbar, filterbar, nur einen Klick vom Spielen entfernt. Die Maschinen, die das Heimgaming <em>erfunden</em> haben, haben diese Behandlung nie bekommen. Retro Vault gibt sie ihnen: eine Bibliotheksoberfläche, die komplett auf deinem eigenen Rechner läuft, in deinem Browser, offline wenn du willst, und ein Modul von 1979 mit derselben Sorgfalt behandelt wie Steam eine Neuveröffentlichung.",
    "vault.p2":"Jedes Spiel bekommt eine echte Seite: originale Boxart, Screenshots, Publisher, Jahr, Genre, Spielerzahl — und wo die Geschichte etwas hinterlassen hat, bewahrt der Vault es. Versteckte, aus der Community stammende Cheat-Artikel. Homebrew-Spotlights für die Entwickler, die heute noch Spiele für diese Maschinen machen, mit Links, um sie zu unterstützen. Eine Featured-Leiste, Favoriten und eine Suche pro Regal, die fast 400 Veröffentlichungen durchstöberbar statt archäologisch wirken lassen.",
    "vault.p3":"Alles läuft direkt im Browser, ohne Installation — die eingebauten Emulatoren (O2EM, VICE, vAmigaWeb und DOSBox, zu WebAssembly kompiliert) übernehmen die Arbeit, sobald du eine Datei in den richtigen Ordner legst.",
    "vault.shelf.vp.p":"Der komplette europäische Videopac-Katalog plus US-Odyssey²- und brasilianische Varianten — G7000- und G7400+-Veröffentlichungen, The-Voice-Titel, mehrsprachige Boxart, und die Homebrew-Szene, die die Konsole nie sterben ließ.",
    "vault.shelf.c64.p":"Die größten Hits des meistverkauften Heimcomputers aller Zeiten — plus ein Homebrew-Regal mit brandneuen C64-Spielen, Gameplay-Clips und \"Unterstütze den Macher\"-Links zu den Leuten, die sie gerade jetzt entwickeln.",
    "vault.shelf.pc.p":"Doom, Commander Keen, Duke Nukem, King's Quest, X-COM — die Shareware- und Diskettenära, laufend auf einem WebAssembly-DOSBox mit Steuerungshinweisen pro Spiel.",
    "vault.shelf.amiga.p":"Das neueste Regal. 27 Public-Domain-, Shareware- und Homebrew-Spiele, die mit dem Vault kommen und sofort laufen — Deluxe Galaga, MegaBall, Sqrxz und Co. — dazu Klassiker wie Turrican, Stunt Car Racer und Lotus Turbo Challenge 2, auf vAmigaWeb mit eingebautem Open-Source-Kickstart AROS.",
    "vault.feat1.h3":"Im Browser spielen","vault.feat1.p":"O2EM, VICE, vAmigaWeb und DOSBox als eingebaute WebAssembly-Cores. Cover anklicken, START drücken, spielen.",
    "vault.feat2.h3":"Echte Boxart","vault.feat2.p":"Originalscans auf jeder Karte — Philips-, Magnavox- und brasilianische Editionen, keine Platzhalterkacheln.",
    "vault.feat3.h3":"Cheats &amp; Geheimnisse","vault.feat3.p":"118 aus der Community stammende Cheat-Artikel, hinter einem Klick versteckt, manche mit den originalen Diagrammen.",
    "vault.feat4.h3":"Homebrew-Spotlight","vault.feat4.p":"Neue Spiele für 40 Jahre alte Maschinen, mit Clips und direkten Links, um die Macher zu unterstützen.",
    "vault.feat5.h3":"Sechs Sprachen","vault.feat5.p":"English, Nederlands, Deutsch, Français, Português und 日本語 — die ganze Oberfläche, nicht nur die Menüs.",
    "vault.feat7.h3":"Spielstände, die bleiben","vault.feat7.p":"Neun Speicherstand-Slots pro Spiel auf dem Videopac- und dem C64-Regal — F2 speichert, F3 lädt — Snapshots über das eigene Menü des Emulators auf dem Amiga-Regal, und DOS-Spiele behalten ihre eigenen Spielstände. Alles bleibt in deinem Browser, auf deinem Rechner.","screens.play":"▶ Dieses Regal live spielen","vault.feat6.h3":"Eingebaute Updates","vault.feat6.p":"Ein Knopf prüft das offizielle Repo und holt neue Spiele, Artwork und Funktionen in deine Installation.",
    "screens.kicker":"Screenshots",
    "screens.h2":"Schau dich um.",
    "screens.sub":"Direkt aus dem Vault — klick auf ein Bild zum Vergrößern. Oder überspring die Bilder und <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">sieh dir das Original live an</a>.",
    "screens.cap1":"<b>Das Videopac-Regal</b>213 Veröffentlichungen, Featured-Leiste, Filter und eine UI in sechs Sprachen.",
    "screens.cap2":"<b>Das Amiga-Regal</b>Das neueste Regal — 35 Titel, davon 27 Public-Domain- und Homebrew-Spiele, die sofort laufen.",
    "screens.cap3":"<b>Das Commodore-64-Regal</b>Klassiker oben, eine lebendige Homebrew-Szene darunter.",
    "screens.cap4":"<b>Das MS-DOS-Regal</b>Die Shareware-Ära, von Keen über Doom bis King's Quest.",
    "ms.kicker":"1981 – 1982 · Die Videopac-Museumsstücke",
    "ms.p1":"1981 versuchten die Designer Ron Bradford und Steve Lehner — mit Ed Averett, der Programmierer hinter dem Großteil des Odyssey²-Katalogs, an der Umsetzung — etwas, das sonst niemand tat: Spiele, die <b>halb Videospiel, halb Brettspiel</b> waren. Jede Schachtel enthielt ein vollständiges Spielbrett, Stapel von Spielsteinen und ein Regelheft, und die Konsole übernahm nur das, worin Konsolen gut waren — die Action, die Rechenarbeit, den Schiedsrichter. Drei erschienen, bevor Philips den Markt verließ. Ein viertes, ein Sherlock-Holmes-Spiel, war in Arbeit, als das Licht ausging, und wurde nie fertiggestellt.",
    "ms.p2":"Der Vault gibt der Serie eine eigene Ausstellung im Videopac-Regal: das echte Spielbrett, für jedes Spiel fotografiert, der Packungsinhalt und Gameplay-Aufnahmen.",
    "ms.card1.p":"Zehn Ringe, verstreut durch Verliese und sich verschiebende Hallen. Wähle Krieger, Zauberer, Phantom oder Wechselbalg und wetteifere mit einem anderen Spieler darum, sie zuerst zu finden — das Brett, die Overlay-Folie und die über vierzig Spielsteine machen den Fernseher nur zu einem Teil des Tisches.",
    "ms.card2.p":"Risk, nur mit einem Videospiel statt Würfeln. Dreiundvierzig Weltmächte, jede bewertet nach militärischer und wirtschaftlicher Stärke — und jede Schlacht wird entschieden, indem man das eigene Kampfspiel des Moduls spielt, statt zu würfeln.",
    "ms.card3.p":"Siebenundzwanzig echte Unternehmen und Rohstoffe — IBM, McDonald's, Gold, Anleihen — mit Kursen, die sich mit den Nachrichten bewegen und nie zweimal gleich verlaufen. Billig kaufen, teuer verkaufen, das Jahr reicher beenden als bis zu drei Gegner.",
    "ms.blabel":"Das Spielbrett",
    "ms.note":"Alle drei haben ihren Platz im Videopac-Regal des Vaults, mit Packungsinhalt, Brettfotos und Gameplay — so nah dran, die Schachteln noch einmal zu öffnen, wie es nur geht.",
    "hb.kicker":"Wird Noch Immer Gemacht",
    "hb.h2":"Homebrew, quicklebendig",
    "hb.p1":"Auf jedem Regal im Vault läuft unter den Klassikern dasselbe: Leute schreiben immer noch brandneue Spiele für diese Maschinen, Jahrzehnte nachdem die Hersteller sich zurückgezogen haben. Retro Vault unterstützt und fördert Homebrew-Arbeit aktiv — deshalb sind Videopac, C64, Amiga und MS-DOS keine reinen Museumsstücke, und jedes Regal hat sein eigenes rotierendes Homebrew-Spotlight mit Gameplay-Clips und einem direkten Link zu den Machern.",
    "hb.card1.badge":"Videopac-Homebrew","hb.card1.p":"Das erste. John Dondzila brachte Sterns Berzerk 1998 auf die Konsole, fünfzehn Jahre nachdem Philips sich zurückgezogen hatte, und stieß damit alles Folgende an.",
    "hb.card2.badge":"C64-Homebrew","hb.card2.p":"RGCDs 16-KB-Modul-Demake von Canabalt, 2012 — ein Knopf, endloser Fall, und der Beweis, dass der C64 einem modernen Indie-Hit auch Jahrzehnte nach dem Start noch gerecht werden konnte.",
    "hb.card3.badge":"MS-DOS-Homebrew","hb.card3.p":"Tarjans von Grund auf neu geschriebenes Dungeon-RPG aus der Ich-Perspektive, das noch Jahre nach der ersten Version nummerierte Punktreleases bekommt — stell eine Gruppe in der Gilde zusammen und finde heraus, was da unten wartet.",
    "hb.card4.badge":"Amiga-Homebrew",
    "hb.card4.p":"Edgar Vigdals Shareware-Hommage an Namcos Galaga, verbreitet über PD-Bibliotheken und das Aminet und bis heute kostenlos — eines von 27 Amiga-Spielen, die mit dem Vault kommen und sofort laufen.",
    "hb.note":"Diese vier sind nur eine Kostprobe — jedes Regal im Vault rotiert durch mehrere Homebrew-Auswahlen mit Clips und \"Unterstütze den Macher\"-Links. <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Sieh dir die Live-Demo an</a>, um sie alle zu sehen.",
    "tour.kicker":"Der Rundgang",
    "tour.h2":"Sieh den Vault in Aktion.",
    "tour.sub":"Ein geführter Rundgang durch die Regale, die Spieleseiten und die Emulatoren.",
    "tour.note":"Gefilmt im Videopac-Regal — ein aktualisierter Rundgang durch die C64-, Amiga- und MS-DOS-Regale ist unterwegs.",
    "dl.kicker":"Download",
    "dl.h2":"Hol dir den Vault. Und leg los.",
    "dl.step1.h3":"Vault herunterladen","dl.step1.p":"Schnapp dir die ZIP (~195&nbsp;MB — die ganze Boxart ist enthalten) oder klone das Repo. Windows, macOS und Linux; alles mit einem modernen Browser.",
    "dl.step2.h3":"Eigene Spieldateien hinzufügen","dl.step2.p":"Für längst vergriffene Spiele musst du gar nichts tun — über 300 Videopac-, C64-, Amiga- und MS-DOS-Titel laufen sofort, in der Demo wie in deiner eigenen Installation. Was niemand mehr verkauft, kommt von unserem eigenen Dateiserver, und 77 Homebrew-, Public-Domain- und Freeware-Spiele — darunter alle spielbaren Titel des Amiga-Regals — liegen dem Vault als kostenloser Download bei. Für alles, was noch verkauft wird: Leg deine eigenen Modul- und Diskettendumps in den Ordner <code>emulator/roms</code> — Dateien, die du von Spielen erstellt hast, die dir gehören; bei 44 davon verweist die Spielseite auf eine Archivkopie, damit du selbst entscheiden kannst. Du weißt nicht, wo du suchen sollst? Unsere <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources-Seite</a> nennt die üblichen Anlaufstellen, Regal für Regal.","dl.step2.btn":"⬇ Spiele herunterladen","dl.step3.click":"hier klicken","stats.online":"online spielbar — ohne eigene Dateien",
    "dl.step3.h3":"Öffnen und spielen","dl.step3.p":"Entpacke sie und doppelklicke dann auf <code>Retro Vault.app</code> (Mac — hat ein eigenes Symbol, zieh sie auf deinen Schreibtisch, in Programme oder ins Dock) oder <code>Start Retro Vault.bat</code> (Windows) — das prüft, ob Python vorhanden ist, installiert es bei Bedarf für dich und öffnet den Vault in deinem Browser. Kein Terminal nötig. Der Update-Knopf hält deine Installation danach aktuell.",
    "dl.btn1":"⬇ Vault herunterladen (195&nbsp;MB)",
    "dl.btn2":"Auf GitHub ansehen",
    "dl.fine":"Kostenlos unter der Retro Vault License. Der Download selbst enthält keine Spiel-ROMs und kein BIOS — vergriffene Titel laden von unserem eigenen Dateiserver, und alles, was noch verkauft wird, bringst du selbst mit. Noch unsicher? <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Erst durch die Live-Demo klicken</a>.",
    "faq.h2":"Fragen, die wirklich gestellt werden.",
    "faq.q1.summary":"Muss ich außer dem Vault selbst noch etwas installieren?",
    "faq.q1.p":"Keine manuelle Installation nötig — in der ZIP steckt ein Starter: Doppelklicke auf <code>Retro Vault.app</code> auf dem Mac (eine echte App mit eigenem Symbol — zieh sie auf deinen Schreibtisch, in Programme oder ins Dock) oder <code>Start Retro Vault.bat</code> unter Windows, und er kümmert sich automatisch um <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">Python</a> — er installiert es, falls es noch nicht auf deinem Rechner ist. Nur beim ersten Mal kann eine einmalige Meldung erscheinen: <b>Mac</b> — Rechtsklick auf die App → \"Öffnen\" → \"Öffnen\" (macOS bestätigt damit nur, dass es einer heruntergeladenen Datei vertraut). <b>Windows</b> — bei der SmartScreen-Warnung auf \"Weitere Informationen\" → \"Trotzdem ausführen\" klicken. Danach reicht ein einfacher Doppelklick. Lieber Python vorher selbst installieren? <b>Mac:</b> Terminal öffnen und <code>xcode-select --install</code> ausführen. <b>Windows:</b> den Installer von <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org</a> holen und bei der Installation <b>\"Add python.exe to PATH\"</b> ankreuzen.",
    "faq.q2.summary":"Was ist Python, und warum brauche ich es nur, um meine Spiele durchzustöbern?",
    "faq.q2.p":"Python ist eine Programmiersprache, die zufällig einen eingebauten Mini-Webserver mitbringt (<code>python3 serve.py</code> im Vault-Ordner schaltet ihn ein). Browser blockieren vieles, was der Vault braucht — das Laden der WebAssembly-Emulator-Cores, das Abrufen von Spieldaten — wenn eine Seite direkt von einer Datei auf der Festplatte geöffnet wird. Dieselben Dateien stattdessen über <code>http://localhost</code> auszuliefern, obwohl es immer noch zu 100% lokal ist, bringt den Browser dazu, es wie eine normale Website zu behandeln und alles laden zu lassen.",
    "faq.q3.summary":"Ist \"localhost\" sicher? Verlässt irgendetwas meinen Rechner?",
    "faq.q3.p":"Nichts verlässt deinen Rechner. <code>localhost</code> bedeutet einfach \"dieser Computer redet mit sich selbst\" — Python liefert Dateien von deiner eigenen Festplatte an deinen eigenen Browser aus, über eine Verbindung, die das Internet nie berührt. Es werden keine Spiele, Spielstände oder Dateien irgendwohin hochgeladen.",
    "faq.q4.summary":"Auf welchen Browsern und Betriebssystemen läuft es?",
    "faq.q4.p":"<b>Chrome wäre unsere Wahl.</b> Firefox funktioniert auch gut, nur mit einem zusätzlichen Klick, bevor ein Spiel startet. Von Safari würden wir abraten — es löscht gespeicherte Website-Daten nach etwa einer Woche ohne Besuch, und genau dort liegen deine Favoriten und Spielstände. Alle laufen unter Windows, macOS oder Linux — alles, was modern genug für WebAssembly ist. Keine Installationen außer Python, keine Plugins.",
    "faq.q5.summary":"Muss ich die Originalspiele bereits besitzen?",
    "faq.q5.p":"Für die meisten nicht mehr. Retro Vault hostet die vergriffenen Titel selbst — über 300 Videopac-, C64-, Amiga- und MS-DOS-Spiele, die heute niemand mehr verkauft, starten ohne jedes Zutun, in der <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Demo</a> wie in deiner eigenen Installation. Spiele, die noch verkauft werden, sind die andere Hälfte: die wird der Vault nie mitliefern, dafür bringst du deinen eigenen Dump eines Exemplars mit, das dir gehört — die <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources</a>-Seite nennt die üblichen Anlaufstellen. Homebrew und rechtefreie Veröffentlichungen sind bereits enthalten. Die rechtlichen Details stehen unten bei der <a href=\"#license\">Lizenz</a>.","faq.q8.summary":"Kann ich einfach spielen, ohne etwas herunterzuladen?","faq.q8.p":"Ja. Die <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Live-Demo</a> ist der echte Vault, auf unserem eigenen Server — Regal wählen, Cover anklicken, spielen. Vergriffene Titel laden ihre Spieldateien bei uns; der Rest steht zwar im Regal, bleibt aber gesperrt, bis du deine eigene Datei hinzufügst. Der Download gibt dir dasselbe offline, dazu deine eigenen Dateien, deine Favoriten und Spielstände, die auf deinem Rechner bleiben.",
    "faq.q9.summary":"Brauche ich ein Amiga-Kickstart-ROM?",
    "faq.q9.p":"Nein. Das Amiga-Regal startet mit AROS, dem freien Open-Source-Ersatz für den Kickstart, der beim Emulator dabei ist, und jeder Public-Domain- und Homebrew-Titel im Regal wurde damit getestet. Ein paar kommerzielle Spiele bestehen auf dem Original: Wenn du ein Kickstart-1.3-Image besitzt (<a href=\"https://www.amigaforever.com/\" target=\"_blank\" rel=\"noopener\">Amiga Forever</a> ist der legale Weg dorthin), nenn es <code>kick.rom</code>, leg es in <code>emulator/roms</code>, und der Vault findet es von selbst. Einen Commodore-Kickstart liefern oder hosten wir nie.",
    "faq.q6.summary":"Moment... hab ich gerade ein UFO gesehen?",
    "faq.q7.summary":"Wie erreiche ich euch?",
    "faq.q7.p":"Für Fragen, Genehmigungen oder Löschanfragen erreichst du das Team unter " + MAIL_HTML + " — absichtlich so geschrieben, um Spambots fernzuhalten, einfach das Symbol einsetzen. Bug-Reports und Feature-Ideen sind auch im <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">GitHub-Issue-Tracker</a> willkommen. Alternativ kannst du das " + BAT_HTML + " aktivieren.",
    "lic.kicker":"Lizenz",
    "lic.h2":"Frei nutzbar. Nicht frei zu klonen.",
    "lic.p1":"Retro Vault wird unter der <b>Retro Vault License v1.0</b> veröffentlicht — Freeware mit einsehbarem Quellcode. Auf gut Deutsch:",
    "lic.li1":"<b>Du darfst</b> es herunterladen, nutzen, für immer behalten und deine eigene Kopie beliebig anpassen.",
    "lic.li2":"<b>Du darfst nicht</b> es weiterverbreiten, Klone oder abgeleitete Versionen veröffentlichen, oder es ohne schriftliche Erlaubnis kommerziell nutzen.",
    "lic.li3":"<b>Es sind keine Spielinhalte enthalten.</b> Spieltitel, Boxart und Marken gehören ihren jeweiligen Eigentümern und erscheinen zu Identifikations- und Bewahrungszwecken.",
    "lic.li4":"Die mitgelieferten Emulator-Cores (O2EM, VICE, vAmigaWeb, DOSBox) sind eigenständige GPL-Projekte unter ihren eigenen Lizenzen; der AROS-Kickstart-Ersatz steht unter der AROS Public License.",
    "lic.p2":"Vollständiger Text: <a href=\"https://github.com/donmiguel-stack/retrovault/blob/main/LICENSE.md\">LICENSE.md auf GitHub</a>. Für Genehmigungen und Löschanfragen eröffne ein Issue im <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">offiziellen Repository</a> oder schreib an " + MAIL_HTML + ".",
    "footer.catalogue":"<a href=\"https://demo.retrovault.world/catalogue.html\">Alle Spiele im Vault, in einer Liste</a>",
    "footer.contact":"Fragen oder Löschanfragen: " + MAIL_HTML,
    "footer.trademark":"Videopac, Odyssey², Commodore 64, Amiga und alle Spieltitel, Artworks und Marken sind Eigentum ihrer jeweiligen Rechteinhaber. Dies ist ein nicht-kommerzielles Bewahrungsprojekt."
  };

  T.fr = {
    "nav.vault":"Le Vault","nav.screens":"Captures d'écran","nav.demo":"🕹 Démo en direct","nav.ms":"Master Strategy","nav.homebrew":"Homebrew","nav.tour":"Visite","nav.license":"Licence","nav.download":"Télécharger",
    "hero.tag":"Une bibliothèque façon Steam pour les machines qui ont tout commencé.",
    "hero.free":"Gratuit &amp; en accès libre.",
    "hero.btnDownload":"Télécharger le Vault — gratuit",
    "hero.btnDemo":"🕹 Voir la démo en direct",
    "hero.btnTour":"▶ Regarder la visite",
    "stats.releases":"jeux catalogués",
    "stats.shelves":"étagères — Videopac, C64, Amiga, MS-DOS",
    "stats.downloads":"jeux homebrew &amp; DP à télécharger gratuitement",
    "stats.languages":"langues — EN·NL·DE·FR·PT·JA",
    "stats.cheats":"astuces cachées",
    "vault.kicker":"Le Vault",
    "vault.h2":"L'étagère de votre enfance, reconstruite comme une ludothèque moderne.",
    "vault.p1":"Steam a rendu normal le fait de parcourir ses jeux comme un mur de jaquettes — cherchable, filtrable, à un clic de jouer. Les machines qui ont <em>inventé</em> le jeu à la maison n'ont jamais eu droit à ce traitement. Retro Vault le leur offre enfin : une interface de bibliothèque qui tourne entièrement sur votre propre ordinateur, dans votre navigateur, hors ligne si vous le souhaitez, et qui traite une cartouche de 1979 avec le même soin que Steam accorde à une nouveauté.",
    "vault.p2":"Chaque jeu a sa vraie page : jaquette originale, captures d'écran, éditeur, année, genre, nombre de joueurs — et là où l'histoire a laissé une trace, le Vault la conserve. Des astuces cachées venues de la communauté. Des coups de projecteur homebrew pour les développeurs qui créent encore des jeux pour ces machines aujourd'hui, avec des liens pour les soutenir. Un rail de mise en avant, des favoris, et une recherche par étagère qui rendent près de 400 jeux faciles à parcourir plutôt qu'à fouiller comme des archives.",
    "vault.p3":"Tout se joue directement dans le navigateur, sans installation — les émulateurs intégrés (O2EM, VICE, vAmigaWeb et DOSBox, compilés en WebAssembly) font le travail dès qu'un fichier atterrit dans le bon dossier.",
    "vault.shelf.vp.p":"L'intégralité du catalogue Videopac européen, plus les variantes Odyssey² américaines et brésiliennes — sorties G7000 et G7400+, titres The Voice, jaquettes multilingues, et la scène homebrew qui n'a jamais laissé mourir la console.",
    "vault.shelf.c64.p":"Les plus grands succès de l'ordinateur personnel le plus vendu de tous les temps — plus une étagère homebrew de jeux C64 tout neufs, avec des extraits de gameplay et des liens \"soutenez le créateur\" vers les gens qui les font en ce moment même.",
    "vault.shelf.pc.p":"Doom, Commander Keen, Duke Nukem, King's Quest, X-COM — l'ère de la shareware et des disquettes, tournant sur un DOSBox en WebAssembly avec des notes de contrôle par jeu.",
    "vault.shelf.amiga.p":"La plus récente des étagères. 27 jeux du domaine public, shareware et homebrew livrés avec le Vault et jouables tout de suite — Deluxe Galaga, MegaBall, Sqrxz et compagnie — plus des classiques comme Turrican, Stunt Car Racer et Lotus Turbo Challenge 2, sur vAmigaWeb avec le Kickstart libre AROS intégré.",
    "vault.feat1.h3":"Jouer dans le navigateur","vault.feat1.p":"O2EM, VICE, vAmigaWeb et DOSBox intégrés en cœurs WebAssembly. Cliquez sur une jaquette, appuyez sur START, jouez.",
    "vault.feat2.h3":"De vraies jaquettes","vault.feat2.p":"Des scans originaux sur chaque fiche — éditions Philips, Magnavox et brésiliennes, pas de vignettes génériques.",
    "vault.feat3.h3":"Astuces &amp; secrets","vault.feat3.p":"118 astuces fournies par la communauté, cachées derrière un clic, certaines avec les schémas d'origine.",
    "vault.feat4.h3":"Coup de projecteur homebrew","vault.feat4.p":"De nouveaux jeux pour des machines vieilles de 40 ans, avec des extraits et des liens directs pour soutenir leurs créateurs.",
    "vault.feat5.h3":"Six langues","vault.feat5.p":"English, Nederlands, Deutsch, Français, Português et 日本語 — toute l'interface, pas seulement les menus.",
    "vault.feat7.h3":"Des sauvegardes qui restent","vault.feat7.p":"Neuf emplacements de sauvegarde d’état par jeu sur les étagères Videopac et C64 — F2 sauvegarde, F3 charge — des instantanés via le menu de l’émulateur sur l’étagère Amiga, et les jeux DOS gardent leurs propres sauvegardes internes. Tout reste dans votre navigateur, sur votre machine.","screens.play":"▶ Jouer à cette étagère en direct","vault.feat6.h3":"Mises à jour intégrées","vault.feat6.p":"Un bouton vérifie le dépôt officiel et ajoute de nouveaux jeux, illustrations et fonctionnalités à votre installation.",
    "screens.kicker":"Captures d'écran",
    "screens.h2":"Jetez un œil.",
    "screens.sub":"Tout droit sorti du Vault — cliquez sur une image pour l'agrandir. Ou passez les images et <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">découvrez le vrai site en direct</a>.",
    "screens.cap1":"<b>L'étagère Videopac</b>213 jeux, rail de mise en avant, filtres et interface en six langues.",
    "screens.cap2":"<b>L'étagère Amiga</b>La plus récente — 35 titres, dont 27 jeux du domaine public et homebrew jouables tout de suite.",
    "screens.cap3":"<b>L'étagère Commodore 64</b>Les classiques en haut, une scène homebrew bien vivante en dessous.",
    "screens.cap4":"<b>L'étagère MS-DOS</b>L'ère de la shareware, de Keen à Doom en passant par King's Quest.",
    "ms.kicker":"1981 – 1982 · Les pièces de musée Videopac",
    "ms.p1":"En 1981, les concepteurs Ron Bradford et Steve Lehner — avec Ed Averett, l'homme derrière la majorité du catalogue Odyssey², à la programmation — ont tenté quelque chose que personne d'autre ne faisait : des jeux <b>mi-jeu vidéo, mi-jeu de plateau</b>. Chaque boîte contenait un plateau de jeu complet, des piles de jetons et un livret de règles, et la console ne gérait que ce dans quoi les consoles excellaient — l'action, le calcul, l'arbitrage. Trois jeux sont sortis avant que Philips ne quitte le marché. Un quatrième, un jeu Sherlock Holmes, était en cours de développement quand tout s'est arrêté, et n'a jamais été terminé.",
    "ms.p2":"Le Vault offre à la série sa propre exposition sur l'étagère Videopac : le vrai plateau photographié pour chaque jeu, le contenu de la boîte, et des images de gameplay.",
    "ms.card1.p":"Dix anneaux dispersés dans des donjons et des salles mouvantes. Choisissez Guerrier, Sorcier, Fantôme ou Métamorphe et affrontez un autre joueur pour les trouver en premier — le plateau, le calque et la quarantaine de jetons font de la télé un simple élément de la table.",
    "ms.card2.p":"Le Risk, mais avec un jeu vidéo à la place des dés. Quarante-trois puissances mondiales, chacune notée selon sa force militaire et économique — et chaque bataille se règle en jouant au mini-jeu de combat propre à la cartouche plutôt qu'en lançant quoi que ce soit.",
    "ms.card3.p":"Vingt-sept vraies entreprises et matières premières — IBM, McDonald's, or, obligations — avec des cours qui bougent au fil de l'actualité et ne se répètent jamais de la même façon. Achetez bas, vendez haut, terminez l'année plus riche que jusqu'à trois adversaires.",
    "ms.blabel":"Le plateau de jeu",
    "ms.note":"Les trois jeux vivent sur l'étagère Videopac du Vault avec le contenu de la boîte, des photos du plateau et du gameplay — ce qui se rapproche le plus de rouvrir les boîtes.",
    "hb.kicker":"Toujours En Fabrication",
    "hb.h2":"Le homebrew, bien vivant",
    "hb.p1":"Sur chaque étagère du Vault, la même chose se joue sous les classiques : des gens continuent d'écrire des jeux tout neufs pour ces machines, des décennies après le départ des fabricants. Retro Vault soutient et met activement en avant le travail homebrew — c'est la raison pour laquelle Videopac, C64, Amiga et MS-DOS ne sont pas de simples pièces de musée, et chaque étagère a son propre coup de projecteur homebrew tournant, avec extraits de gameplay et lien direct vers les créateurs.",
    "hb.card1.badge":"Homebrew Videopac","hb.card1.p":"Le tout premier. John Dondzila a porté Berzerk de Stern sur la console en 1998, quinze ans après le départ de Philips, lançant tout ce qui a suivi.",
    "hb.card2.badge":"Homebrew C64","hb.card2.p":"Le remake en cartouche de 16 Ko de Canabalt par RGCD, 2012 — un seul bouton, une chute infinie, et la preuve que le C64 pouvait encore rendre justice à un hit indé moderne des décennies après son lancement.",
    "hb.card3.badge":"Homebrew MS-DOS","hb.card3.p":"Le RPG-donjon à la première personne créé de toutes pièces par Tarjan, qui reçoit encore des mises à jour numérotées des années après sa première sortie — formez un groupe à la Guilde et allez découvrir ce qui se trouve en bas.",
    "hb.card4.badge":"Homebrew Amiga",
    "hb.card4.p":"L'hommage shareware d'Edgar Vigdal au Galaga de Namco, diffusé par les bibliothèques DP et Aminet et toujours offert gratuitement — l'un des 27 jeux Amiga livrés avec le Vault et jouables tout de suite.",
    "hb.note":"Ces quatre-là ne sont qu'un échantillon — chaque étagère du Vault fait tourner plusieurs sélections homebrew avec extraits et liens \"soutenez le créateur\". <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Découvrez la démo en direct</a> pour tous les voir.",
    "tour.kicker":"La Visite",
    "tour.h2":"Voyez le Vault en action.",
    "tour.sub":"Une visite guidée à travers les étagères, les fiches de jeu et les émulateurs.",
    "tour.note":"Filmée sur l'étagère Videopac — une visite actualisée couvrant les étagères C64, Amiga et MS-DOS arrive bientôt.",
    "dl.kicker":"Télécharger",
    "dl.h2":"Récupérez le Vault. Et jouez.",
    "dl.step1.h3":"Téléchargez le Vault","dl.step1.p":"Récupérez le ZIP (~195&nbsp;Mo — toutes les jaquettes sont incluses) ou clonez le dépôt. Windows, macOS et Linux ; tout appareil avec un navigateur moderne.",
    "dl.step2.h3":"Ajoutez vos propres fichiers de jeu","dl.step2.p":"Pour les jeux épuisés, vous n’avez rien à faire — plus de 300 titres Videopac, C64, Amiga et MS-DOS se lancent tout de suite, dans la démo comme dans votre propre installation. Ceux que plus personne ne vend viennent de notre propre serveur de fichiers, et 77 jeux homebrew, du domaine public et freeware — dont tous les titres jouables de l’étagère Amiga — sont livrés avec le Vault en téléchargement gratuit. Pour tout ce qui est encore vendu : déposez vos propres dumps de cartouches et de disquettes dans le dossier <code>emulator/roms</code> — des fichiers que vous avez vous-même extraits de jeux que vous possédez ; pour 44 d’entre eux, la page du jeu renvoie vers une copie d’archive pour que vous décidiez vous-même. Vous ne savez pas où chercher ? Notre <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">page Resources</a> liste les endroits habituels, étagère par étagère.","dl.step2.btn":"⬇ Télécharger les jeux","dl.step3.click":"cliquez ici","stats.online":"jouables en ligne — sans fichiers",
    "dl.step3.h3":"Ouvrez-le et jouez","dl.step3.p":"Décompressez-le, puis double-cliquez sur <code>Retro Vault.app</code> (Mac — a sa propre icône, glissez-la sur votre Bureau, dans Applications ou sur le Dock) ou <code>Start Retro Vault.bat</code> (Windows) — il vérifie la présence de Python, l'installe pour vous si besoin, et ouvre le Vault dans votre navigateur. Aucun terminal requis. Le bouton de mise à jour garde ensuite votre installation à jour.",
    "dl.btn1":"⬇ Télécharger le Vault (195&nbsp;Mo)",
    "dl.btn2":"Voir sur GitHub",
    "dl.fine":"Gratuit sous la Retro Vault License. Le téléchargement lui-même ne contient aucune ROM de jeu ni fichier BIOS — les titres épuisés se chargent depuis notre propre serveur de fichiers, et tout ce qui est encore vendu, vous le fournissez vous-même. Pas encore sûr ? <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Parcourez d’abord la démo en direct</a>.",
    "faq.h2":"Les questions qu'on nous pose vraiment.",
    "faq.q1.summary":"Dois-je installer autre chose que le Vault lui-même ?",
    "faq.q1.p":"Aucune installation manuelle nécessaire — le ZIP contient un lanceur : double-cliquez sur <code>Retro Vault.app</code> sur Mac (une vraie application avec sa propre icône — glissez-la sur votre Bureau, dans Applications ou sur le Dock) ou <code>Start Retro Vault.bat</code> sur Windows, et il s'occupe de <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">Python</a> pour vous, en l'installant automatiquement s'il n'est pas déjà sur votre machine. La première fois seulement, un message ponctuel peut apparaître : <b>Mac</b> — clic droit sur l'application → « Ouvrir » → « Ouvrir » (macOS confirme simplement qu'il fait confiance à un fichier téléchargé). <b>Windows</b> — sur l'avertissement SmartScreen, cliquez sur « Plus d'infos » → « Exécuter quand même ». Ensuite, un simple double-clic suffit. Vous préférez installer Python vous-même d'abord ? <b>Mac :</b> ouvrez le Terminal et lancez <code>xcode-select --install</code>. <b>Windows :</b> récupérez l'installeur sur <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org</a> et cochez <b>« Add python.exe to PATH »</b> pendant l'installation.",
    "faq.q2.summary":"Qu'est-ce que Python, et pourquoi en ai-je besoin juste pour parcourir mes jeux ?",
    "faq.q2.p":"Python est un langage de programmation qui embarque justement un mini-serveur web (<code>python3 serve.py</code> dans le dossier du Vault l'active). Les navigateurs bloquent une bonne partie de ce dont le Vault a besoin — le chargement des cœurs d'émulation WebAssembly, la récupération des données de jeu — quand une page est ouverte directement depuis un fichier sur le disque. Servir ces mêmes fichiers via <code>http://localhost</code> à la place, même si c'est toujours 100% local, c'est ce qui pousse le navigateur à le traiter comme un site normal et à tout laisser charger.",
    "faq.q3.summary":"Est-ce que « localhost » est sûr ? Est-ce que quelque chose quitte mon ordinateur ?",
    "faq.q3.p":"Rien ne quitte votre machine. <code>localhost</code> signifie simplement « cet ordinateur se parle à lui-même » — Python sert des fichiers depuis votre propre disque dur vers votre propre navigateur, via une connexion qui ne touche jamais internet. Aucun jeu, sauvegarde ou fichier n'est envoyé où que ce soit.",
    "faq.q4.summary":"Sur quels navigateurs et systèmes d'exploitation ça fonctionne ?",
    "faq.q4.p":"<b>Chrome est celui qu'on choisirait.</b> Firefox fonctionne bien aussi, avec juste un clic de plus avant qu'un jeu démarre. On éviterait Safari — il efface les données de site stockées après environ une semaine sans visite, et c'est justement là que vivent vos favoris et sauvegardes. Tous fonctionnent sous Windows, macOS ou Linux — tout ce qui est assez récent pour WebAssembly. Aucune installation en dehors de Python, aucun plugin.",
    "faq.q5.summary":"Dois-je déjà posséder les jeux originaux ?",
    "faq.q5.p":"Plus pour la plupart. Retro Vault héberge lui-même les titres épuisés — plus de 300 jeux Videopac, C64, Amiga et MS-DOS que plus personne ne vend démarrent sans rien ajouter, dans la <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">démo</a> comme dans votre propre installation. Les jeux encore commercialisés sont l’autre moitié : ceux-là, le Vault ne les fournira jamais, et vous apportez votre propre dump d’un exemplaire que vous possédez — la page <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources</a> indique où les gens cherchent habituellement. Les homebrews et sorties libres de droits sont déjà incluses. Voir la <a href=\"#license\">Licence</a> ci-dessous pour les détails juridiques.","faq.q8.summary":"Puis-je simplement jouer, sans rien télécharger ?","faq.q8.p":"Oui. La <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">démo en direct</a> est le vrai Vault, hébergé sur notre propre serveur — choisissez une étagère, cliquez sur une jaquette, jouez. Les titres épuisés chargent leurs fichiers chez nous ; les autres sont sur l’étagère mais restent verrouillés tant que vous n’ajoutez pas le vôtre. Télécharger le Vault vous donne la même chose hors ligne, plus vos propres fichiers, vos favoris et vos sauvegardes, qui restent sur votre machine.",
    "faq.q9.summary":"Ai-je besoin d'une ROM Kickstart Amiga ?",
    "faq.q9.p":"Non. L’étagère Amiga démarre sur AROS, le remplaçant libre et open source du Kickstart fourni avec l’émulateur, et chaque titre du domaine public et homebrew de l’étagère a été testé avec. Quelques jeux commerciaux exigent l’original : si vous possédez une image Kickstart 1.3 (<a href=\"https://www.amigaforever.com/\" target=\"_blank\" rel=\"noopener\">Amiga Forever</a> est la voie légale pour en obtenir une), nommez-la <code>kick.rom</code>, déposez-la dans <code>emulator/roms</code> et le Vault la trouve tout seul. Nous ne fournissons ni n’hébergeons jamais de Kickstart Commodore.",
    "faq.q6.summary":"Attendez... je viens de voir un OVNI ?",
    "faq.q7.summary":"Comment vous contacter ?",
    "faq.q7.p":"Pour toute question, autorisation ou demande de retrait, contactez l'équipe à " + MAIL_HTML + " — écrit ainsi exprès pour tenir les robots spammeurs à distance, remplacez simplement par le symbole. Les rapports de bugs et idées de fonctionnalités sont aussi les bienvenus sur le <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">suivi d'issues GitHub</a>. Vous pouvez aussi activer le " + BAT_HTML + ".",
    "lic.kicker":"Licence",
    "lic.h2":"Libre d'utilisation. Pas libre de clonage.",
    "lic.p1":"Retro Vault est distribué sous la <b>Retro Vault License v1.0</b> — un freeware au code source visible. En clair :",
    "lic.li1":"<b>Vous pouvez</b> le télécharger, l'utiliser, le garder pour toujours, et modifier votre propre copie comme bon vous semble.",
    "lic.li2":"<b>Vous ne pouvez pas</b> le réhéberger, publier des clones ou des versions dérivées, ni l'utiliser commercialement sans autorisation écrite.",
    "lic.li3":"<b>Aucun contenu de jeu n'est inclus.</b> Les titres, jaquettes et marques appartiennent à leurs propriétaires respectifs et apparaissent à des fins d'identification et de préservation.",
    "lic.li4":"Les cœurs d'émulation inclus (O2EM, VICE, vAmigaWeb, DOSBox) sont des projets GPL distincts, sous leurs propres licences ; le remplaçant de Kickstart AROS relève de l'AROS Public License.",
    "lic.p2":"Texte complet : <a href=\"https://github.com/donmiguel-stack/retrovault/blob/main/LICENSE.md\">LICENSE.md sur GitHub</a>. Pour les autorisations et demandes de retrait, ouvrez une issue sur le <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">dépôt officiel</a> ou écrivez à " + MAIL_HTML + ".",
    "footer.catalogue":"<a href=\"https://demo.retrovault.world/catalogue.html\">Tous les jeux du Vault, en une liste</a>",
    "footer.contact":"Questions ou demandes de retrait : " + MAIL_HTML,
    "footer.trademark":"Videopac, Odyssey², Commodore 64, Amiga et tous les titres de jeux, illustrations et marques sont la propriété de leurs détenteurs respectifs. Ceci est un projet de préservation non commercial."
  };

  T.pt = {
    "nav.vault":"O Vault","nav.screens":"Capturas de tela","nav.demo":"🕹 Demo ao vivo","nav.ms":"Master Strategy","nav.homebrew":"Homebrew","nav.tour":"Tour","nav.license":"Licença","nav.download":"Baixar",
    "hero.tag":"Uma biblioteca no estilo Steam para as máquinas que começaram tudo.",
    "hero.free":"Grátis &amp; de código aberto para leitura.",
    "hero.btnDownload":"Baixar o Vault — grátis",
    "hero.btnDemo":"🕹 Ver a demo ao vivo",
    "hero.btnTour":"▶ Assistir ao tour",
    "stats.releases":"lançamentos catalogados",
    "stats.shelves":"prateleiras — Videopac, C64, Amiga, MS-DOS",
    "stats.downloads":"jogos homebrew &amp; PD para baixar grátis",
    "stats.languages":"idiomas — EN·NL·DE·FR·PT·JA",
    "stats.cheats":"guias de cheats escondidos",
    "vault.kicker":"O Vault",
    "vault.h2":"A prateleira da sua infância, reconstruída como uma biblioteca de jogos moderna.",
    "vault.p1":"A Steam tornou normal navegar pelos seus jogos como um mural de capas — pesquisável, filtrável, a um clique de jogar. As máquinas que <em>inventaram</em> os jogos em casa nunca tiveram esse tratamento. O Retro Vault dá a elas: uma interface de biblioteca que roda inteiramente no seu próprio computador, no seu navegador, offline se você quiser, e trata um cartucho de 1979 com o mesmo cuidado que a Steam dá a um lançamento novo.",
    "vault.p2":"Cada jogo ganha uma página de verdade: capa original, capturas de tela, publicadora, ano, gênero, número de jogadores — e onde a história deixou algo para trás, o Vault preserva. Guias de cheats escondidos, vindos da comunidade. Destaques homebrew para os desenvolvedores que ainda fazem jogos para essas máquinas hoje, com links para apoiá-los. Uma faixa de destaques, favoritos, e busca por prateleira, que fazem quase 400 lançamentos parecerem navegáveis em vez de arqueológicos.",
    "vault.p3":"Tudo roda direto no navegador, sem instalação — os emuladores embutidos (O2EM, VICE, vAmigaWeb e DOSBox, compilados para WebAssembly) fazem o trabalho assim que você coloca um arquivo na pasta certa.",
    "vault.shelf.vp.p":"Todo o catálogo europeu do Videopac, mais as variantes americanas do Odyssey² e as brasileiras — lançamentos G7000 e G7400+, títulos The Voice, capas em vários idiomas, e a cena homebrew que nunca deixou o console morrer.",
    "vault.shelf.c64.p":"Os maiores sucessos do computador pessoal mais vendido de todos os tempos — mais uma prateleira homebrew de jogos novinhos para C64, com clipes de gameplay e links \"apoie o criador\" para quem está fazendo eles agora mesmo.",
    "vault.shelf.pc.p":"Doom, Commander Keen, Duke Nukem, King's Quest, X-COM — a era shareware e dos disquetes, rodando em um DOSBox WebAssembly com notas de controle por jogo.",
    "vault.shelf.amiga.p":"A prateleira mais nova. 27 jogos de domínio público, shareware e homebrew que vêm com o Vault e rodam na hora — Deluxe Galaga, MegaBall, Sqrxz e companhia — além de clássicos como Turrican, Stunt Car Racer e Lotus Turbo Challenge 2, no vAmigaWeb com o Kickstart de código aberto AROS embutido.",
    "vault.feat1.h3":"Jogue no navegador","vault.feat1.p":"O2EM, VICE, vAmigaWeb e DOSBox embutidos como núcleos WebAssembly. Clique numa capa, aperte START, jogue.",
    "vault.feat2.h3":"Capas de verdade","vault.feat2.p":"Digitalizações originais em cada card — edições Philips, Magnavox e brasileiras, não imagens genéricas.",
    "vault.feat3.h3":"Cheats &amp; segredos","vault.feat3.p":"118 guias de cheats enviados pela comunidade, escondidos atrás de um clique, alguns com os diagramas originais.",
    "vault.feat4.h3":"Destaque homebrew","vault.feat4.p":"Jogos novos para máquinas de 40 anos, com clipes e links diretos para apoiar seus criadores.",
    "vault.feat5.h3":"Seis idiomas","vault.feat5.p":"English, Nederlands, Deutsch, Français, Português e 日本語 — a interface inteira, não só os menus.",
    "vault.feat7.h3":"Saves que ficam","vault.feat7.p":"Nove slots de save state por jogo nas prateleiras Videopac e C64 — F2 salva, F3 carrega — snapshots pelo menu do próprio emulador na prateleira Amiga, e os jogos de DOS mantêm os próprios saves internos. Tudo fica no seu navegador, na sua máquina.","screens.play":"▶ Jogue esta prateleira ao vivo","vault.feat6.h3":"Atualizações embutidas","vault.feat6.p":"Um botão verifica o repositório oficial e traz novos jogos, artes e recursos para a sua instalação.",
    "screens.kicker":"Capturas de tela",
    "screens.h2":"Dê uma olhada.",
    "screens.sub":"Direto do Vault — clique em qualquer imagem para ampliar. Ou pule as imagens e <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">veja a coisa real ao vivo</a>.",
    "screens.cap1":"<b>A prateleira Videopac</b>213 lançamentos, faixa de destaques, filtros e interface em seis idiomas.",
    "screens.cap2":"<b>A prateleira Amiga</b>A mais nova — 35 títulos, 27 deles jogos de domínio público e homebrew que rodam na hora.",
    "screens.cap3":"<b>A prateleira Commodore 64</b>Clássicos em cima, uma cena homebrew viva embaixo.",
    "screens.cap4":"<b>A prateleira MS-DOS</b>A era shareware, de Keen a Doom até King's Quest.",
    "ms.kicker":"1981 – 1982 · As Peças de Museu do Videopac",
    "ms.p1":"Em 1981, os designers Ron Bradford e Steve Lehner — com Ed Averett, o responsável pela programação da maior parte do catálogo do Odyssey², cuidando do código — tentaram algo que mais ninguém fazia: jogos que eram <b>metade videogame, metade jogo de tabuleiro</b>. Cada caixa trazia um tabuleiro completo, pilhas de peças e um livro de regras, e o console cuidava só do que consoles faziam bem — a ação, os cálculos, o juiz. Três foram lançados antes de a Philips deixar o mercado. Um quarto, um jogo do Sherlock Holmes, estava em produção quando as luzes se apagaram, e nunca foi terminado.",
    "ms.p2":"O Vault dá à série sua própria exposição na prateleira Videopac: o tabuleiro real fotografado para cada jogo, o que vinha na caixa, e imagens de gameplay.",
    "ms.card1.p":"Dez anéis espalhados por masmorras e salões que mudam de lugar. Escolha Guerreiro, Mago, Fantasma ou Metamorfo e corra contra outro jogador para achá-los primeiro — o tabuleiro, o overlay e as mais de quarenta peças fazem da TV apenas uma parte da mesa.",
    "ms.card2.p":"Risk, só que com um videogame em vez de dados. Quarenta e três potências mundiais, cada uma avaliada por força militar e econômica — e cada batalha é decidida jogando o próprio minijogo de combate do cartucho, em vez de rolar qualquer coisa.",
    "ms.card3.p":"Vinte e sete empresas e commodities reais — IBM, McDonald's, ouro, títulos — com preços que se movem com as notícias e nunca se repetem da mesma forma. Compre na baixa, venda na alta, termine o ano mais rico que até três adversários.",
    "ms.blabel":"O tabuleiro",
    "ms.note":"Os três estão na prateleira Videopac do Vault, com o conteúdo da caixa, fotos do tabuleiro e gameplay — o mais perto que se chega de abrir as caixas de novo.",
    "hb.kicker":"Ainda Sendo Feito",
    "hb.h2":"Homebrew, vivo e bem",
    "hb.p1":"Em cada prateleira do Vault, a mesma coisa acontece por baixo dos clássicos: gente ainda escrevendo jogos novinhos para essas máquinas, décadas depois de os fabricantes terem ido embora. O Retro Vault apoia e promove ativamente o trabalho homebrew — é a razão de Videopac, C64, Amiga e MS-DOS não serem apenas peças de museu, e cada prateleira traz seu próprio destaque homebrew rotativo, com clipes de gameplay e um link direto para quem está fazendo.",
    "hb.card1.badge":"Homebrew Videopac","hb.card1.p":"O primeiro. John Dondzila trouxe o Berzerk da Stern para o console em 1998, quinze anos depois de a Philips ter saído, e deu início a tudo que veio depois.",
    "hb.card2.badge":"Homebrew C64","hb.card2.p":"O demake em cartucho de 16KB de Canabalt, da RGCD, 2012 — um botão só, queda infinita, e a prova de que o C64 ainda conseguia fazer justiça a um sucesso indie moderno décadas após seu lançamento.",
    "hb.card3.badge":"Homebrew MS-DOS","hb.card3.p":"O RPG de masmorra em primeira pessoa feito do zero por Tarjan, que continua recebendo versões numeradas anos depois da primeira — monte um grupo na Guilda e vá descobrir o que tem lá embaixo.",
    "hb.card4.badge":"Homebrew Amiga",
    "hb.card4.p":"A homenagem shareware de Edgar Vigdal ao Galaga da Namco, que circulou por bibliotecas PD e pelo Aminet e continua de graça — um dos 27 jogos de Amiga que vêm com o Vault e rodam na hora.",
    "hb.note":"Esses quatro são só uma amostra — cada prateleira do Vault reveza entre vários destaques homebrew com clipes e links \"apoie o criador\". <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Veja a demo ao vivo</a> para conferir todos.",
    "tour.kicker":"O Tour",
    "tour.h2":"Veja o Vault em ação.",
    "tour.sub":"Um passeio guiado pelas prateleiras, páginas de jogos e emuladores.",
    "tour.note":"Filmado na prateleira Videopac — um tour atualizado cobrindo as prateleiras C64, Amiga e MS-DOS está a caminho.",
    "dl.kicker":"Baixar",
    "dl.h2":"Pegue o Vault. E jogue.",
    "dl.step1.h3":"Baixe o Vault","dl.step1.p":"Pegue o ZIP (~195&nbsp;MB — todas as capas estão nele) ou clone o repositório. Windows, macOS e Linux; qualquer coisa com um navegador moderno.",
    "dl.step2.h3":"Adicione seus próprios arquivos de jogo","dl.step2.p":"Para os jogos fora de catálogo você não precisa fazer nada — mais de 300 títulos Videopac, C64, Amiga e MS-DOS rodam na hora, tanto na demo quanto na sua própria instalação. O que ninguém mais vende vem do nosso próprio servidor de arquivos, e 77 jogos homebrew, de domínio público e freeware — incluindo todos os títulos jogáveis da prateleira Amiga — já vêm com o Vault como download gratuito. Para tudo o que ainda está à venda: coloque seus próprios dumps de cartucho e disquete na pasta <code>emulator/roms</code> — arquivos que você mesmo extraiu de jogos que possui; para 44 deles, a página do jogo aponta para uma cópia de preservação, para você decidir por conta própria. Não sabe onde procurar? Nossa <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">página de Resources</a> lista os lugares de costume, prateleira por prateleira.","dl.step2.btn":"⬇ Baixar os jogos","dl.step3.click":"clique aqui","stats.online":"jogáveis online — sem arquivos",
    "dl.step3.h3":"Abra e jogue","dl.step3.p":"Descompacte e dê um duplo clique em <code>Retro Vault.app</code> (Mac — tem ícone próprio, arraste para a Área de Trabalho, Aplicativos ou o Dock) ou <code>Start Retro Vault.bat</code> (Windows) — ele verifica se o Python está instalado, instala automaticamente se não estiver, e abre o Vault no seu navegador. Sem terminal. O botão de atualização mantém sua instalação em dia dali em diante.",
    "dl.btn1":"⬇ Baixar o Vault (195&nbsp;MB)",
    "dl.btn2":"Ver no GitHub",
    "dl.fine":"Grátis sob a Retro Vault License. O download em si não traz nenhuma ROM de jogo nem arquivo de BIOS — os títulos fora de catálogo carregam do nosso próprio servidor de arquivos, e tudo o que ainda está à venda você fornece. Ainda não tem certeza? <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">Veja a demo ao vivo primeiro</a>.",
    "faq.h2":"Perguntas que as pessoas realmente fazem.",
    "faq.q1.summary":"Preciso instalar mais alguma coisa além do Vault?",
    "faq.q1.p":"Não precisa instalar nada manualmente — o ZIP já vem com um iniciador: dê duplo clique em <code>Retro Vault.app</code> no Mac (um app de verdade, com ícone próprio — arraste para a Área de Trabalho, Aplicativos ou o Dock) ou <code>Start Retro Vault.bat</code> no Windows, e ele cuida do <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">Python</a> pra você, instalando automaticamente caso ainda não esteja no seu computador. Só na primeira vez pode aparecer um aviso único: <b>Mac</b> — clique com o botão direito no app → \"Abrir\" → \"Abrir\" (o macOS só está confirmando que confia em um arquivo baixado). <b>Windows</b> — no aviso do SmartScreen, clique em \"Mais informações\" → \"Executar assim mesmo\". Depois disso é só duplo clique. Prefere instalar o Python você mesmo antes? <b>Mac:</b> abra o Terminal e rode <code>xcode-select --install</code>. <b>Windows:</b> pegue o instalador em <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org</a> e marque <b>\"Add python.exe to PATH\"</b> durante a instalação.",
    "faq.q2.summary":"O que é Python, e por que eu preciso dele só para navegar pelos meus jogos?",
    "faq.q2.p":"Python é uma linguagem de programação que, por acaso, vem com um mini servidor web embutido (<code>python3 serve.py</code> na pasta do Vault liga ele). Navegadores bloqueiam boa parte do que o Vault precisa — carregar os núcleos de emulação em WebAssembly, buscar dados dos jogos — quando uma página é aberta direto de um arquivo no disco. Servir esses mesmos arquivos por <code>http://localhost</code> em vez disso, mesmo continuando 100% local, é o que faz o navegador tratar tudo como um site normal e deixar tudo carregar.",
    "faq.q3.summary":"O \"localhost\" é seguro? Alguma coisa sai do meu computador?",
    "faq.q3.p":"Nada sai da sua máquina. <code>localhost</code> só quer dizer \"este computador falando com ele mesmo\" — o Python serve arquivos do seu próprio disco rígido para o seu próprio navegador, por uma conexão que nunca toca a internet. Nenhum jogo, save ou arquivo é enviado a lugar nenhum.",
    "faq.q4.summary":"Em quais navegadores e sistemas operacionais funciona?",
    "faq.q4.p":"<b>Chrome é o que a gente escolheria.</b> O Firefox funciona bem também, só com um clique a mais antes de o jogo começar. Evitaríamos o Safari — ele apaga dados salvos do site depois de cerca de uma semana sem visitas, e é exatamente ali que ficam seus favoritos e saves. Qualquer um deles roda em Windows, macOS ou Linux — qualquer coisa moderna o bastante para WebAssembly. Nenhuma instalação além do Python, nenhum plugin.",
    "faq.q5.summary":"Preciso já ter os jogos originais?",
    "faq.q5.p":"Para a maioria, não mais. O Retro Vault hospeda ele mesmo os títulos fora de catálogo — mais de 300 jogos Videopac, C64, Amiga e MS-DOS que ninguém mais vende iniciam sem você adicionar nada, tanto na <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">demo</a> quanto na sua própria instalação. Os jogos ainda à venda são a outra metade: esses o Vault nunca vai trazer, e você fornece o seu próprio dump de uma cópia que possui — a página de <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources</a> mostra onde as pessoas costumam procurar. Homebrews e lançamentos livres de direitos autorais já vêm incluídos. Veja a <a href=\"#license\">Licença</a> abaixo para os detalhes legais.","faq.q8.summary":"Dá para jogar sem baixar nada?","faq.q8.p":"Dá. A <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">demo ao vivo</a> é o Vault de verdade, rodando no nosso próprio servidor — escolha uma prateleira, clique numa capa, jogue. Os títulos fora de catálogo carregam os arquivos direto da gente; o resto aparece na prateleira, mas fica travado até você adicionar o seu. Baixar o Vault dá a mesma coisa offline, além dos seus próprios arquivos, favoritos e saves, que ficam na sua máquina.",
    "faq.q9.summary":"Preciso de uma ROM Kickstart do Amiga?",
    "faq.q9.p":"Não. A prateleira Amiga inicia com o AROS, o substituto livre e de código aberto do Kickstart que vem com o emulador, e todos os títulos de domínio público e homebrew da prateleira foram testados com ele. Alguns jogos comerciais exigem o original: se você tem uma imagem do Kickstart 1.3 (o <a href=\"https://www.amigaforever.com/\" target=\"_blank\" rel=\"noopener\">Amiga Forever</a> é o jeito licenciado de conseguir uma), renomeie para <code>kick.rom</code>, coloque em <code>emulator/roms</code> e o Vault a encontra sozinho. Nunca distribuímos nem hospedamos um Kickstart da Commodore.",
    "faq.q6.summary":"Espera... eu acabei de ver um OVNI?",
    "faq.q7.summary":"Como entro em contato?",
    "faq.q7.p":"Para dúvidas, permissões ou pedidos de remoção, fale com a equipe em " + MAIL_HTML + " — escrito assim de propósito para afastar os spambots, é só trocar pelo símbolo. Relatos de bugs e ideias também são bem-vindos no <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">issue tracker do GitHub</a>. Alternativamente, você pode ativar o " + BAT_HTML + ".",
    "lic.kicker":"Licença",
    "lic.h2":"Livre para usar. Não livre para clonar.",
    "lic.p1":"O Retro Vault é distribuído sob a <b>Retro Vault License v1.0</b> — freeware com código-fonte visível. Em linguagem simples:",
    "lic.li1":"<b>Você pode</b> baixar, usar, guardar para sempre, e modificar sua própria cópia como quiser.",
    "lic.li2":"<b>Você não pode</b> hospedar em outro lugar, publicar clones ou versões derivadas, ou usar comercialmente sem permissão por escrito.",
    "lic.li3":"<b>Nenhum conteúdo de jogo está incluído.</b> Títulos de jogos, capas e marcas pertencem aos respectivos donos e aparecem para fins de identificação e preservação.",
    "lic.li4":"Os núcleos de emulação inclusos (O2EM, VICE, vAmigaWeb, DOSBox) são projetos GPL separados, sob suas próprias licenças; o substituto de Kickstart AROS está sob a AROS Public License.",
    "lic.p2":"Texto completo: <a href=\"https://github.com/donmiguel-stack/retrovault/blob/main/LICENSE.md\">LICENSE.md no GitHub</a>. Para permissões e pedidos de remoção, abra uma issue no <a href=\"https://github.com/donmiguel-stack/retrovault/issues\">repositório oficial</a> ou escreva para " + MAIL_HTML + ".",
    "footer.catalogue":"<a href=\"https://demo.retrovault.world/catalogue.html\">Todos os jogos do Vault, numa lista</a>",
    "footer.contact":"Dúvidas ou pedidos de remoção: " + MAIL_HTML,
    "footer.trademark":"Videopac, Odyssey², Commodore 64, Amiga e todos os títulos de jogos, artes e marcas são propriedade de seus respectivos donos. Este é um projeto de preservação não-comercial."
  };

  T.ja = {
    "nav.vault":"ヴォールト",
    "nav.screens":"スクリーンショット",
    "nav.ms":"Master Strategy",
    "nav.homebrew":"ホームブリュー",
    "nav.tour":"ツアー",
    "nav.license":"ライセンス",
    "nav.demo":"🕹 ライブデモ",
    "nav.download":"ダウンロード",
    "hero.tag":"すべてを はじめた ゲームきの ために つくった、Steamスタイルの ライブラリです。",
    "hero.btnDownload":"ヴォールトを ダウンロード — むりょう",
    "hero.btnDemo":"🕹 ライブデモを みてみる",
    "hero.btnTour":"▶ ツアーを みる",
    "hero.free":"むりょう &amp; こうかい。だれでも よめます。",
    "stats.releases":"カタログずみの ソフト",
    "stats.online":"オンラインで あそべる — ファイルは いりません",
    "stats.shelves":"たな — Videopac, C64, Amiga, MS-DOS",
    "stats.downloads":"むりょうで ダウンロードできる ホームブリュー・PDゲーム",
    "stats.languages":"ことば — EN·NL·DE·FR·PT·JA",
    "stats.cheats":"かくれた ウラわざきじ",
    "vault.kicker":"ヴォールト",
    "vault.h2":"こどものころの たなを、いまどきの ゲームライブラリとして つくりなおしました。",
    "vault.p1":"Steamは、ゲームを パッケージアートの かべみたいに ながめるのを ふつうに しました。けんさくも しぼりこみも できて、ワンクリックで あそべます。でも、ホームゲームを<em>はつめいした</em>ゲームきたちは、そんな あつかいを うけたことが ありませんでした。Retro Vaultは、それを かなえます。じぶんの コンピューターの なかだけで うごく ライブラリで、ブラウザで つかえて、オフラインでも だいじょうぶ。そして 1979ねんの カートリッジも、Steamが あたらしい ソフトに する ていねいさと おなじように あつかいます。",
    "vault.p2":"どの ゲームにも、ほんとうの ページが あります。パッケージアート、スクリーンショット、はつばいもと、ねん、ジャンル、プレイヤーすう。れきしが なにかを のこした ばあいは、ヴォールトが それを まもります。コミュニティから あつめた、かくれた ウラわざきじも あります。いまも この ゲームきの ために ゲームを つくりつづける ひとたちを しょうかいする、ホームブリューコーナーも あります。つくった ひとを おうえんする リンクつきです。おすすめの れつ、おきにいり、たなごとの けんさくで、やく400の ソフトを かんたんに さがせます。むずかしい さぎょうは いりません。",
    "vault.p3":"すべて、ブラウザだけで あそべます。インストールは いりません。O2EM、VICE、vAmigaWeb、DOSBoxという ないぞうの エミュレーター(WebAssemblyで つくられています)が、ファイルを ただしい フォルダに いれた しゅんかんに はたらきます。",
    "vault.shelf.vp.p":"ヨーロッパの Videopacシリーズを ぜんぶ そろえました。アメリカの Odyssey²や、ブラジルばんも あります。G7000と G7400+の ソフト、The Voiceの タイトル、いろいろな ことばの パッケージアート、そして この ゲームきを しなせなかった ホームブリューシーンも。",
    "vault.shelf.c64.p":"れきしじょう いちばん うれた ホームコンピューターの、だいけっさくばかり。さらに、あたらしい C64ゲームの ホームブリューコーナーも あります。プレイえいぞうと、いま つくっている ひとを おうえんする リンクが ついています。",
    "vault.shelf.pc.p":"Doom、Commander Keen、Duke Nukem、King's Quest、X-COM — シェアウェアと フロッピーの じだいです。WebAssemblyばんの DOSBoxで うごき、ゲームごとの そうさほうほうも のっています。",
    "vault.shelf.amiga.p":"いちばん あたらしい たなです。ヴォールトに はいっていて すぐに あそべる、パブリックドメイン・シェアウェア・ホームブリューの ゲームが 27こ — Deluxe Galaga、MegaBall、Sqrxz など。さらに Turrican、Stunt Car Racer、Lotus Turbo Challenge 2 などの めいさくも あります。vAmigaWebで うごき、オープンソースの Kickstart「AROS」が ないぞうされています。",
    "vault.feat1.h3":"ブラウザで あそぶ",
    "vault.feat1.p":"O2EM、VICE、vAmigaWeb、DOSBoxが WebAssemblyコアとして ないぞうされています。パッケージを クリックして、STARTを おして、あそぶだけ。",
    "vault.feat2.h3":"ほんものの パッケージアート",
    "vault.feat2.p":"どの カードにも、オリジナルの スキャンが あります。Philips、Magnavox、ブラジルばんなど、かりの がぞうでは ありません。",
    "vault.feat3.h3":"ウラわざ &amp; ひみつ",
    "vault.feat3.p":"コミュニティから あつまった 118この ウラわざきじが、かくされています。クリックすると でてきます。オリジナルの ずかいが ついている ものも あります。",
    "vault.feat4.h3":"ホームブリュー しょうかい",
    "vault.feat4.p":"40ねん まえの ゲームきの ために つくられた、あたらしい ゲームたち。プレイえいぞうと、つくった ひとを おうえんする リンクつきです。",
    "vault.feat5.h3":"6つの ことば",
    "vault.feat5.p":"English、Nederlands、Deutsch、Français、Português、日本語 — メニューだけじゃなく、ぜんぶ たいおうしています。",
    "vault.feat7.h3":"きえない セーブ",
    "vault.feat7.p":"Videopacたなと C64たなでは、ゲームごとに 9この セーブステートが つかえます。F2で セーブ、F3で ロードです。Amigaたなでは、エミュレーターの メニューから スナップショットを ほぞんできます。DOSの ゲームは、ゲームじたいの セーブきのうを つかいます。すべて じぶんの ブラウザ、じぶんの コンピューターの なかに のこります。",
    "vault.feat6.h3":"ないぞうの アップデート",
    "vault.feat6.p":"ボタン ひとつで こうしきの リポジトリを チェックして、あたらしい ゲームや アートや きのうを じぶんの インストールに とりこみます。",
    "screens.kicker":"スクリーンショット",
    "screens.h2":"ちょっと のぞいてみましょう。",
    "screens.sub":"ヴォールトから そのまま — しゃしんを クリックすると おおきく なります。がぞうを とばして、<a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">ほんものを ライブで みる</a>のも いいですね。",
    "screens.cap1":"<b>Videopacの たな</b>213の ソフト、おすすめの れつ、フィルター、6つの ことばに たいおうした がめん。",
    "screens.play":"▶ この たなを ライブで あそぶ",
    "screens.cap2":"<b>Amigaの たな</b>いちばん あたらしい たなです — 35タイトルの うち 27こは、すぐに あそべる パブリックドメインと ホームブリューの ゲームです。",
    "screens.cap3":"<b>Commodore 64の たな</b>うえには めいさくたち、したには いまも いきている ホームブリューシーン。",
    "screens.cap4":"<b>MS-DOSの たな</b>シェアウェアの じだい。Keenから Doom、King's Questまで。",
    "ms.kicker":"1981 – 1982 · Videopacの はくぶつかん てんじひん",
    "ms.p1":"1981ねん、デザイナーの Ron Bradfordと Steve Lehnerが——プログラムは、Odyssey²の カタログの ほとんどを てがけた Ed Averettが たんとう——だれも やっていない ことに ちょうせんしました。それは、<b>はんぶん ビデオゲームで、はんぶん ボードゲーム</b>という ゲームです。どの はこにも、まるごと 1つの ゲームばん、たくさんの コマ、ルールブックが はいっていました。そして ゲームきは、ゲームきが とくいな ぶぶんだけを たんとうしました——アクション、けいさん、しんぱんやくです。3ぽん はつばいされた あとに、Philipsは この しじょうから てを ひきました。4ほんめの Sherlock Holmesの ゲームは、とちゅうまで つくられていましたが、あかりが きえたときに みかんせいの ままに なりました。",
    "ms.p2":"ヴォールトは、この シリーズの ために Videopacの たなに とくべつな コーナーを つくりました。ゲームごとに ほんものの ばんを さつえいした しゃしん、はこの なかみ、プレイえいぞうが みられます。",
    "ms.card1.p":"10この リングが、ダンジョンと うごく へやの なかに ちらばっています。Warrior、Wizard、Phantom、Changelingから 1つを えらんで、ほかの プレイヤーと どちらが さきに みつけられるか きそいます。ばん、オーバーレイ、40いじょうの コマで、テレビは テーブルの ほんの いちぶに なります。",
    "ms.blabel":"ゲームばん",
    "ms.card2.p":"サイコロの かわりに ビデオゲームを つかう Riskです。43の くにが、ぐんじりょくと けいざいりょくで ひょうかされています。たたかいは サイコロを ふるのではなく、カートリッジの なかの せんとうゲームで きまります。",
    "ms.card3.p":"27の ほんものの かいしゃと しょうひん——IBM、McDonald's、きん、さいけんなど——ニュースで ねだんが うごき、いつも ちがう てんかいに なります。やすく かって、たかく うって、さいごには さいだい3にんの あいてより おかねもちに なりましょう。",
    "ms.note":"3ぽん とも、ヴォールトの Videopacの たなに あります。はこの なかみ、ばんの しゃしん、プレイえいぞうつきです。もういちど はこを あける かんかくに いちばん ちかいと おもいます。",
    "hb.kicker":"いまも つくられています",
    "hb.h2":"ホームブリューは、げんきに いきています",
    "hb.p1":"ヴォールトの どの たなでも、めいさくの したで おなじ ことが おきています。メーカーが いなくなってから なんじゅうねんも たった いまも、ひとびとは この ゲームきの ために あたらしい ゲームを つくりつづけています。Retro Vaultは、ホームブリューの かつどうを つよく おうえん・しょうかいしています。だから Videopac、C64、Amiga、MS-DOSは、ただの はくぶつかん てんじひんでは ありません。どの たなにも、プレイえいぞうと つくった ひとへの リンクつきの、じゅんばんに かわる ホームブリューしょうかいコーナーが あります。",
    "hb.card1.badge":"Videopac ホームブリュー",
    "hb.card1.p":"さいしょの 1つ。John Dondzilaが、Philipsが いなくなってから 15ねんごの 1998ねんに、Sternの Berzerkを この ゲームきに もってきました。ここから ぜんぶが はじまりました。",
    "hb.card2.badge":"C64 ホームブリュー",
    "hb.card2.p":"RGCDが 2012ねんに つくった、Canabaltの 16KBカートリッジばん(デメイク)です。ボタン 1つ、おわらない らっか。はつばいから なんじゅうねんも たった C64が、いまの インディーヒットも ちゃんと つくれる しょうこです。",
    "hb.card3.badge":"MS-DOS ホームブリュー",
    "hb.card3.p":"Tarjanが 1から つくった、1にんしょうの ダンジョンRPGです。さいしょの はつばいから なんねんも たった いまも、ばんごうつきの アップデートが つづいています。Guildで パーティーを つくって、したに なにが あるか たしかめに いきましょう。",
    "hb.card4.badge":"Amiga ホームブリュー",
    "hb.card4.p":"Edgar Vigdalが つくった、ナムコの ギャラガへの シェアウェアの オマージュです。PDライブラリや Aminetで ひろまり、いまも むりょうで くばられています。ヴォールトに はいっていて すぐに あそべる、27この Amigaゲームの ひとつです。",
    "hb.note":"この 4つは、ほんの いちれいです。ヴォールトの どの たなでも、いくつもの ホームブリューさくひんが じゅんばんに しょうかいされます。プレイえいぞうと、つくった ひとを おうえんする リンクつきです。ぜんぶ みたい ときは、<a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">ライブデモを のぞいてみて</a>ください。",
    "tour.kicker":"ツアー",
    "tour.h2":"うごいている ヴォールトを みてみましょう。",
    "tour.sub":"たな、ゲームの ページ、エミュレーターを あんないする ツアーです。",
    "tour.note":"Videopacの たなで さつえいしました。C64、Amiga、MS-DOSの たなを あつかう あたらしい ツアーも、じゅんびちゅうです。",
    "dl.kicker":"ダウンロード",
    "dl.h2":"ヴォールトを てにいれて、あそびはじめましょう。",
    "dl.step1.h3":"ヴォールトを ダウンロード",
    "dl.step1.p":"ZIPファイル(やく195&nbsp;MB — パッケージアートも ぜんぶ はいっています)を てにいれるか、リポジトリを クローンしましょう。Windows、macOS、Linux — さいしんの ブラウザが あれば なんでも どうぞ。",
    "dl.step2.h3":"じぶんの ゲームファイルを ついかする",
    "dl.step2.p":"はいばんに なった ゲームには、なにも ひつようありません。300いじょうの Videopac、C64、Amiga、MS-DOSタイトルが、デモでも じぶんの インストールでも すぐに あそべます。もう だれも うっていない ものは わたしたち じしんの ファイルホストから よみこまれ、77この ホームブリュー・パブリックドメイン・フリーウェアの ゲーム(Amigaたなの あそべる タイトルは ぜんぶ ふくまれます)は、むりょうの ダウンロードとして ヴォールトに はいっています。まだ うっている ものに ついては、じぶんの カートリッジや ディスクから ダンプした ファイルを <code>emulator/roms</code>フォルダに いれてください——じぶんの もっている ゲームから とった ファイルです。そのうち 44こは、ゲームページに ほぞんばんの コピーへの リンクが あるので、じぶんで きめられます。どこを さがせば いいか わからない ときは、<a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resourcesページ</a>で、たなごとに よくある ばしょを しょうかいしています。",
    "dl.step2.btn":"⬇ ゲームを ダウンロード",
    "dl.step3.h3":"ひらいて あそぶ",
    "dl.step3.p":"ZIPを かいとうしたら、<code>Retro Vault.app</code>を ダブルクリック(Mac — じぶんの アイコンが あるので、デスクトップや Applications、Dockに ドラッグしても いいです)、または <code>Start Retro Vault.bat</code>を ダブルクリック(Windows)してください。Pythonが あるか チェックして、なければ じどうで インストールし、ブラウザで ヴォールトを ひらきます。ターミナルは いりません。そのあとは、アップデートボタンで インストールを さいしんの ままに できます。",
    "dl.step3.click":"ここを クリック",
    "dl.btn1":"⬇ ヴォールトを ダウンロード(195&nbsp;MB)",
    "dl.btn2":"GitHubで みる",
    "dl.fine":"Retro Vault Licenseの もとで むりょうです。ダウンロードファイルじたいには、ゲームROMも BIOSも はいっていません — はいばんに なった タイトルは わたしたちの ファイルホストから よみこまれ、まだ うっている ものは じぶんで ようい してください。まだ まよっている ひとは、さきに <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">ライブデモを のぞいてみて</a>ください。",
    "faq.h2":"みんなが ほんとうに きく しつもん。",
    "faq.q1.summary":"ヴォールト いがいに、なにか インストールする ひつようは ありますか?<span class=\"q-ico\">+</span>",
    "faq.q1.p":"かんたんな インストールは いりません — ZIPの なかに ランチャーが はいっています。Macでは <code>Retro Vault.app</code>を ダブルクリック(じぶんの アイコンを もつ ほんものの アプリです — デスクトップ、Applications、Dockに ドラッグできます)。Windowsでは <code>Start Retro Vault.bat</code>を ダブルクリックしてください。すると <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">Python</a>の めんどうを みてくれます。まだ コンピューターに なければ、じどうで インストールされます。さいしょの 1かいだけ、こんな ひょうじが でるかもしれません。<b>Mac</b> — アプリを みぎクリック→\"Open\"→\"Open\"(macOSが、ダウンロードした ファイルを しんようして いいか かくにんしているだけです)。<b>Windows</b> — SmartScreenの けいこくで \"しょうさいじょうほう\"→\"じっこう\"を クリックします。そのあとは、ふつうに ダブルクリックするだけです。さきに じぶんで Pythonを インストールしたい ひとは?<b>Mac:</b> ターミナルを ひらいて <code>xcode-select --install</code>を じっこうしてください。<b>Windows:</b> <a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener\">python.org</a>から インストーラーを もらって、セットアップちゅうに <b>\"Add python.exe to PATH\"</b>に チェックを いれてください。",
    "faq.q2.summary":"Pythonって なに?ゲームを みるだけなのに、どうして ひつようなの?<span class=\"q-ico\">+</span>",
    "faq.q2.p":"Pythonは プログラムを つくる ことばですが、たまたま ちいさな ウェブサーバーが さいしょから ついています。ランチャー(または じぶんで じっこうする ばあいは、ヴォールトフォルダの なかで <code>python3 serve.py</code>)が、それを オンに します。ブラウザは、ページを ディスクの ファイルから ちょくせつ ひらいた とき、ヴォールトに ひつような おおくの こと——WebAssemblyの エミュレーターコアを よみこんだり、ゲームデータを とってきたり——を ブロックします。おなじ ファイルを <code>http://localhost</code>けいゆで サーブすると(それでも 100% ローカルの ままです)、ブラウザは ふつうの ウェブサイトのように あつかって、すべてを ちゃんと よみこんで くれます。",
    "faq.q3.summary":"\"localhost\"は あんぜん?なにか コンピューターの そとに でていく?<span class=\"q-ico\">+</span>",
    "faq.q3.p":"なにも コンピューターの そとには でていきません。<code>localhost</code>は、たんに「この コンピューターが じぶん じしんと はなしている」という いみです。Pythonは、じぶんの ハードドライブから じぶんの ブラウザへ、インターネットに いっさい つながらない せつぞくで、ファイルを おくっています。ゲームも、セーブデータも、ファイルも、どこにも アップロードされません。",
    "faq.q4.summary":"どの ブラウザと OSで うごきますか?<span class=\"q-ico\">+</span>",
    "faq.q4.p":"<b>わたしたちなら Chromeを えらびます。</b>Firefoxも もんだいなく うごきますが、ゲームを はじめる まえに もう 1かい クリックが ひつようです。Safariは おすすめしません — やく 1しゅうかん アクセスが ないと、ほぞんされた サイトの データを けしてしまいます。そこには、おきにいりや セーブデータも ふくまれています。どれも Windows、macOS、Linuxで うごきます — WebAssemblyが うごく くらい あたらしい ものなら なんでも。Python いがいの インストールも、プラグインも いりません。",
    "faq.q8.summary":"なにも ダウンロードしないで、あそぶだけって できますか?<span class=\"q-ico\">+</span>",
    "faq.q8.p":"できます。<a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">ライブデモ</a>は、わたしたちの サーバーで うごく ほんものの ヴォールトです。たなを えらんで、パッケージを クリックして、あそぶだけ。はいばんに なった タイトルは、わたしたちから ゲームファイルを よみこみます。のこりの ソフトは たなに ならんでいますが、じぶんの ファイルを ついかするまで ロックされたままです。ヴォールトを ダウンロードすると、おなじ ことが オフラインで できます。それに、じぶんの ファイル、じぶんの おきにいり、じぶんの コンピューターに のこる セーブデータも てにはいります。",
    "faq.q9.summary":"Amigaの Kickstart ROMは ひつようですか?<span class=\"q-ico\">+</span>",
    "faq.q9.p":"いいえ。Amigaたなは、エミュレーターに ついてくる むりょうで オープンソースの Kickstartの かわり「AROS」で うごきます。たなの パブリックドメインと ホームブリューの タイトルは、ぜんぶ AROSで テストしました。いくつかの しょうようゲームは ほんものを ひつようと します。Kickstart 1.3の イメージを もっている ばあいは(<a href=\"https://www.amigaforever.com/\" target=\"_blank\" rel=\"noopener\">Amiga Forever</a>が せいしきな てにいれかたです)、なまえを <code>kick.rom</code> に して <code>emulator/roms</code> に いれてください。ヴォールトが じどうで みつけます。コモドールの Kickstartを わたしたちが くばったり ホストしたり することは ありません。",
    "faq.q5.summary":"オリジナルの ゲームを もう もっていないと だめですか?<span class=\"q-ico\">+</span>",
    "faq.q5.p":"ほとんどの ものは、もう もっていなくても だいじょうぶです。Retro Vault じしんが、はいばんに なった タイトルを ホストしています — いま だれも うっていない 300いじょうの Videopac、C64、Amiga、MS-DOSゲームは、<a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world\">デモ</a>でも じぶんの インストールでも、なにも ついかせずに あそべます。まだ うっている ゲームは、もう はんぶんです。それらは ヴォールトには ぜったいに はいりません。じぶんの もっている コピーから とった ダンプを じぶんで ようい してください — <a target=\"_blank\" rel=\"noopener\" href=\"https://demo.retrovault.world/resources.html\">Resources</a>ページに、みんなが よく さがす ばしょが のっています。ホームブリューと、ちょさくけんの ない ソフトは、さいしょから ヴォールトに はいっています。ほうてきな くわしい ないようは、したの <a href=\"#license\">License</a>を みてください。",
    "faq.q6.summary":"まって……いま UFOが みえた?<span class=\"q-ico\">+</span>",
    "faq.q7.summary":"どうやって れんらくすれば いいですか?<span class=\"q-ico\">+</span>",
    "faq.q7.p":"しつもん、きょか、さくじょの いらいは、<span class=\"contact-mail\">hq [at] retrovault.world</span>まで — スパムボットを よけるために わざと こう かいています。[at]を きごうに いれかえてください。バグほうこくや きのうの アイデアも、<a href=\"https://github.com/donmiguel-stack/retrovault/issues\">GitHub issue tracker</a>で かんげいします。または、<span class=\"bat-trigger-wrap\">\n      <button type=\"button\" class=\"bat-signal-link\" id=\"batSignalBtn\">bat-signal</button>\n      <span class=\"bat-beam\" id=\"batBeam\" aria-hidden=\"true\">\n        <span class=\"bat-beam-cone\"></span>\n        <span class=\"bat-disc\"></span>\n        <span class=\"bat-glyph\"><img src=\"assets/bat-signal.png\" alt=\"\" width=\"19\" height=\"9\"></span>\n      </span>\n    </span>を オンに することも できます。",
    "lic.kicker":"ライセンス",
    "lic.h2":"つかうのは むりょう。クローンするのは だめ。",
    "lic.p1":"Retro Vaultは、<b>Retro Vault License v1.0</b>の もとで こうかいされています — ソースが みえる フリーウェアです。かんたんに いうと:",
    "lic.li1":"<b>できる こと</b> — ダウンロードする、つかう、ずっと もっておく、じぶんの コピーを すきなように へんこうする。",
    "lic.li2":"<b>できない こと</b> — さいはいふする、クローンや はせいばんを こうかいする、しょめんでの きょかなしに しょうぎょうてきに つかう。",
    "lic.li3":"<b>ゲームの なかみは ふくまれていません。</b>ゲームの タイトル、パッケージアート、しょうひょうは、それぞれの けんりしゃの ものです。しきべつと ほぞんの ために けいさいしています。",
    "lic.li4":"どうこんされている エミュレーターコア(O2EM、VICE、vAmigaWeb、DOSBox)は、それぞれ べつの GPLプロジェクトで、じぶんたちの ライセンスに したがっています。Kickstartの かわりの AROSは、AROS Public Licenseです。",
    "lic.p2":"ぜんぶんは、<a href=\"https://github.com/donmiguel-stack/retrovault/blob/main/LICENSE.md\">GitHubの LICENSE.md</a>で よめます。きょかや さくじょの いらいは、<a href=\"https://github.com/donmiguel-stack/retrovault/issues\">こうしきの リポジトリ</a>で issueを たてるか、<span class=\"contact-mail\">hq [at] retrovault.world</span>まで れんらくしてください。",
    "footer.catalogue":"<a href=\"https://demo.retrovault.world/catalogue.html\">ヴォールトの ぜんぶの ゲームを ひとつの リストで</a>",
    "footer.contact":"しつもんや さくじょの いらいは: <span class=\"contact-mail\">hq [at] retrovault.world</span>",
    "footer.trademark":"Videopac、Odyssey²、Commodore 64、Amiga、そして すべての ゲームタイトル、アートワーク、しょうひょうは、それぞれの けんりしゃの ものです。これは、ひえいりの ほぞんプロジェクトです。"
  };


  var original = Object.create(null);

  // Which language a visitor lands on, decided once on load.
  // A saved choice wins; otherwise the browser's own language list is matched
  // on the primary subtag so a Japanese or Dutch visitor sees their language
  // on the first visit; English is the fallback. An auto-detected language is
  // deliberately not saved, so a stored value always means the visitor chose
  // it from the flag row.
  function knownLang(code){
    if(!code) return null;
    code = String(code).toLowerCase();
    if(FLAGS[code]) return code;
    var base = code.split("-")[0];          // ja-JP -> ja, pt-BR -> pt
    return FLAGS[base] ? base : null;
  }
  var AUTO_LANG = (function(){
    var saved = null;
    try { saved = knownLang(localStorage.getItem(LANG_KEY)); } catch(e){}
    if(saved) return saved;
    var list = [];
    try { list = navigator.languages || (navigator.language ? [navigator.language] : []); } catch(e){}
    for(var i=0;i<list.length;i++){ var m = knownLang(list[i]); if(m) return m; }
    return "en";
  })();

  function currentLang(){
    var v = null;
    try { v = localStorage.getItem(LANG_KEY); } catch(e){}
    return (v && FLAGS[v]) ? v : AUTO_LANG;
  }

  // The Vault app is on a different domain, so browser storage cannot carry
  // the language across. Stamp it onto every link pointing there instead -
  // the app reads ?lang= on arrival. Re-run on each language change, because
  // some of these links live inside the translated strings themselves and are
  // replaced wholesale by applyLang.
  function stampDemoLinks(lang){
    document.querySelectorAll('a[href*="demo.retrovault.world"]').forEach(function(a){
      try {
        var u = new URL(a.href, location.href);
        u.searchParams.set("lang", lang);
        a.href = u.toString();
      } catch(e){}
    });
  }

  function captureOriginal(){
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      if(!el._i18nCaptured){
        el._i18nOriginal = el.innerHTML;
        el._i18nCaptured = true;
      }
    });
  }

  function applyLang(lang){
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      var dict = T[lang];
      if(lang === "en" || !dict || typeof dict[key] === "undefined"){
        el.innerHTML = el._i18nOriginal;
      } else {
        el.innerHTML = dict[key];
      }
    });
    try { document.documentElement.lang = lang; } catch(e){}
    stampDemoLinks(lang);
    if(window.bindBatSignal) window.bindBatSignal();
  }

  function buildSwitcher(){
    var wrap = document.getElementById("siteLangFlags");
    if(!wrap) return;
    Object.keys(FLAGS).forEach(function(code){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "flag-btn";
      b.dataset.lang = code;
      b.innerHTML = FLAGS[code].flag;
      b.title = FLAGS[code].name;
      b.setAttribute("aria-label", FLAGS[code].name);
      wrap.appendChild(b);
    });
    function mark(){
      wrap.querySelectorAll(".flag-btn").forEach(function(b){
        b.classList.toggle("active", b.dataset.lang === currentLang());
      });
    }
    mark();
    wrap.addEventListener("click", function(e){
      var b = e.target.closest(".flag-btn");
      if(!b) return;
      try { localStorage.setItem(LANG_KEY, b.dataset.lang); } catch(err){}
      mark();
      applyLang(b.dataset.lang);
    });
  }

  captureOriginal();
  buildSwitcher();
  applyLang(currentLang());
})();
