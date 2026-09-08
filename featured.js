// The three panels above the library: what to play, who sells these things,
// and where the rest of the scene lives.
//
// Everything here is editable without touching any code. Reorder, rewrite,
// delete — the panels hide themselves when their list is empty.

window.FEATURED_DATA = {

  // ---- Featured and recommended -----------------------------------------
  // Games worth pointing someone at. "id" must match an id in games.js; the
  // cover and title are taken from there, so only the blurb lives here.
  // One sentence is plenty. The panel rotates every 7 seconds.
  //
  // "shot" is a screenshot filename. The file goes in covers/ with a shot_
  // prefix - covers/shot_vp_38.jpg for shot: "vp_38.jpg" - because that is a
  // folder the update endpoint is already allowed to write to.
  //
  // "clipId" is an optional override for which recorded clip plays in this
  // slot, when it's not the same game id as "id". Race and Killer Bees are
  // only actually recorded on G7000 hardware (vp_01 / o2_47) - the G7400+
  // carts featured here (vp_01pl / vp_52pl) have no gameplay clip of their
  // own, only a YouTube video on their own game page. clipId lets the
  // banner show the real G7000 footage instead of falling back to that
  // embed, without changing what clip (if any) plays on the G7400+ game
  // page itself - that's still keyed off "id" via game.html's own logic.
  featured: [
    { id: "vp_38", shot: "vp_38.jpg",
      blurb: { en: "The one Atari sued over — and the best-selling cartridge the console ever had. Press P at the select screen to draw your own maze.",
          nl: "Die waar Atari een rechtszaak over aanspande — en de best verkochte cartridge die de console ooit heeft gehad. Druk op P in het keuzescherm om je eigen doolhof te tekenen.",
          de: "Das Spiel, wegen dem Atari klagte — und das meistverkaufte Modul, das die Konsole je hatte. Drück P im Auswahlbildschirm und zeichne dein eigenes Labyrinth.",
          fr: "Celui qui a valu un procès d'Atari — et la cartouche la plus vendue de toute l'histoire de la console. Appuyez sur P à l'écran de sélection pour dessiner votre propre labyrinthe.",
          pt: "Aquele que rendeu um processo da Atari — e o cartucho mais vendido que o console já teve. Aperte P na tela de seleção para desenhar seu próprio labirinto." } },
    { id: "vp_01pl", shot: "vp_01pl.jpg", clipId: "vp_01",
      blurb: { en: "Cartridge number one, and the first game in every Videopac box: a two-lane race, an overhead maze chase, and a codebreaking puzzle called Cryptogram, three in one. This is the G7400+ cut - extra graphics chip, extra scenery either side of the track.",
          nl: "Cartridge nummer één, en het eerste spel in elke Videopac-doos: een race over twee banen, een doolhofjacht van bovenaf en een codekraakpuzzel genaamd Cryptogram, drie in één. Dit is de G7400+-versie - extra grafische chip, extra decor aan weerszijden van de baan.",
          de: "Modul Nummer eins und das erste Spiel in jeder Videopac-Box: ein zweispuriges Rennen, eine Labyrinthjagd aus der Vogelperspektive und ein Code-Knack-Rätsel namens Cryptogram, drei in einem. Das hier ist die G7400+-Fassung - extra Grafikchip, extra Kulisse zu beiden Seiten der Strecke.",
          fr: "La cartouche numéro un, et le premier jeu livré dans chaque boîte Videopac : une course à deux voies, une poursuite en labyrinthe vue de dessus et un casse-tête de décryptage appelé Cryptogram, trois en un. Voici la version G7400+ - puce graphique supplémentaire, décor supplémentaire de chaque côté de la piste.",
          pt: "O cartucho número um, e o primeiro jogo em toda caixa de Videopac: uma corrida de duas pistas, uma perseguição em labirinto visto de cima e um quebra-cabeça de decifrar códigos chamado Cryptogram, três em um. Esta é a versão G7400+ - chip gráfico extra, cenário extra dos dois lados da pista." } },
    { id: "vp_43", shot: "vp_43.jpg",
      blurb: { en: "Philips' answer to Donkey Kong, and a genuinely hard platformer. Dig for gold, dodge the boulders, mind the pickaxe.",
          nl: "Philips' antwoord op Donkey Kong, en een oprecht moeilijke platformer. Graaf naar goud, ontwijk de rotsblokken, let op het houweel.",
          de: "Philips' Antwort auf Donkey Kong und ein ehrlich schwerer Plattformer. Grab nach Gold, weich den Felsbrocken aus, achte auf die Spitzhacke.",
          fr: "La réponse de Philips à Donkey Kong, et un jeu de plates-formes réellement difficile. Creusez pour trouver l'or, esquivez les rochers, attention à la pioche.",
          pt: "A resposta da Philips ao Donkey Kong, e um jogo de plataforma genuinamente difícil. Cave atrás de ouro, desvie das pedras, cuidado com a picareta." } },
    { id: "jo_demon-attack_pl", shot: "jo_demon-attack_pl.jpg",
      blurb: { en: "Imagic's shooter, licensed to Thomson-Brandt and given G7400 backgrounds that exist nowhere else. The French got the best version.",
          nl: "De shooter van Imagic, in licentie gegeven aan Thomson-Brandt en voorzien van G7400-achtergronden die nergens anders bestaan. De Fransen kregen de beste versie.",
          de: "Imagics Shooter, an Thomson-Brandt lizenziert und mit G7400-Hintergründen versehen, die es sonst nirgends gibt. Die Franzosen bekamen die beste Version.",
          fr: "Le shoot'em up d'Imagic, passé sous licence à Thomson-Brandt et doté de décors G7400 qui n'existent nulle part ailleurs. Les Français ont eu droit à la meilleure version.",
          pt: "O shooter da Imagic, licenciado para a Thomson-Brandt e com fundos de G7400 que não existem em nenhum outro lugar. Os franceses ficaram com a melhor versão." } },
    { id: "vp_52pl", shot: "vp_52pl.jpg", clipId: "o2_47",
      blurb: { en: "Ed Averett at his strangest: you are a swarm, and you eat other swarms. Nothing else on the machine plays like it.",
          nl: "Ed Averett op zijn vreemdst: jij bent een zwerm, en je eet andere zwermen op. Niets anders op de machine speelt zo.",
          de: "Ed Averett von seiner seltsamsten Seite: Du bist ein Schwarm und frisst andere Schwärme. Nichts sonst auf dem Gerät spielt sich so.",
          fr: "Ed Averett au sommet de son étrangeté : vous êtes un essaim, et vous dévorez d'autres essaims. Rien d'autre sur la machine ne se joue comme ça.",
          pt: "Ed Averett no seu momento mais estranho: você é um enxame, e você come outros enxames. Nada mais na máquina se joga assim." } },
    { id: "vp_51pl", shot: "vp_51pl.png",
      blurb: { en: "Sold as Attack of the Timelord in America, and licensed from a Gerry Anderson puppet series in Europe. One of the few cartridges written for the G7400's extra graphics chip.",
          nl: "In Amerika verkocht als Attack of the Timelord, in Europa gelicentieerd van een poppenserie van Gerry Anderson. Een van de weinige cartridges die geschreven zijn voor de extra grafische chip van de G7400.",
          de: "In Amerika als Attack of the Timelord verkauft, in Europa lizenziert nach einer Puppenserie von Gerry Anderson. Eines der wenigen Module, die für den zusätzlichen Grafikchip des G7400 geschrieben wurden.",
          fr: "Vendu sous le nom d'Attack of the Timelord en Amérique, et adapté sous licence d'une série de marionnettes de Gerry Anderson en Europe. L'une des rares cartouches écrites pour la puce graphique supplémentaire du G7400.",
          pt: "Vendido como Attack of the Timelord nos Estados Unidos e licenciado de uma série de marionetes de Gerry Anderson na Europa. Um dos poucos cartuchos escritos para o chip gráfico extra do G7400." } }
  ],

  // ---- Master Strategy Series --------------------------------------------
  // Its own banner, bigger than "featured" above - three games, always all
  // three shown at once rather than rotating, since there are only three and
  // the whole point is that each shipped with a physical board. "id" must
  // match an id in games.js. "year"/"fact" are the small print under the
  // title; "contents" is what was actually in the box, sourced from
  // odyssey2.info/strategy/. Two images per card, neither optional in the
  // markup even if the file is missing yet:
  //   - a gameplay slot, same three-layer fallback as the C64 homebrew
  //     panel: clips/clip_<id>.mp4 (drop one in and it just plays) -> the
  //     game's own gamepages.js YouTube video -> the cover.
  //   - "the board" - a real photo of the physical game board, sourced from
  //     odyssey2.info and stored as covers/board_<id>.jpg (the covers/
  //     folder rather than a new one, same reasoning as the shot_ prefix
  //     below: it is a folder every existing install can already receive an
  //     update into).
  masterStrategy: [
    { id: "vp_42", year: 1981, fact: { en: "Most Innovative Game of 1981 — Electronic Games",
          nl: "Meest Innovatieve Spel van 1981 — Electronic Games",
          de: "Innovativstes Spiel des Jahres 1981 — Electronic Games",
          fr: "Jeu le plus innovant de 1981 — Electronic Games",
          pt: "Jogo Mais Inovador de 1981 — Electronic Games" },
      blurb: { en: "Ten rings are scattered through dungeons, caverns and shifting halls. Pick Warrior, Wizard, Phantom or Changeling and race a second player to find them first - the board, overlay and forty-plus tokens turn the TV into just one part of the table.",
          nl: "Tien ringen liggen verspreid door kerkers, grotten en verschuivende zalen. Kies Warrior, Wizard, Phantom of Changeling en race tegen een tweede speler om ze als eerste te vinden - het bord, de overlay en ruim veertig fiches maken van de tv nog maar één onderdeel van de tafel.",
          de: "Zehn Ringe sind über Verliese, Höhlen und sich verschiebende Hallen verstreut. Wähle Warrior, Wizard, Phantom oder Changeling und liefer dir mit einem zweiten Spieler ein Rennen darum, wer sie zuerst findet - Spielbrett, Overlay und über vierzig Spielsteine machen den Fernseher zu nur einem Teil des Tisches.",
          fr: "Dix anneaux sont dispersés à travers donjons, cavernes et salles mouvantes. Choisissez le Warrior, le Wizard, le Phantom ou le Changeling et prenez un second joueur de vitesse pour les trouver le premier - le plateau, l'overlay et plus de quarante jetons font du téléviseur un simple élément de la table.",
          pt: "Dez anéis estão espalhados por masmorras, cavernas e salões que mudam de lugar. Escolha Warrior, Wizard, Phantom ou Changeling e dispute com um segundo jogador para achá-los primeiro - o tabuleiro, o overlay e mais de quarenta peças transformam a TV em apenas uma parte da mesa." },
      contents: [
        { en: "Game board, overlay &amp; compartment lid",
          nl: "Speelbord, overlay &amp; vakdeksel",
          de: "Spielbrett, Overlay &amp; Fachdeckel",
          fr: "Plateau de jeu, overlay &amp; couvercle de compartiment",
          pt: "Tabuleiro, overlay &amp; tampa do compartimento" },
        { en: "28-page rulebook",
          nl: "Regelboek van 28 pagina's",
          de: "28-seitiges Regelheft",
          fr: "Livret de règles de 28 pages",
          pt: "Livro de regras de 28 páginas" },
        { en: "10 ring tokens + 1 quest token",
          nl: "10 ringfiches + 1 questfiche",
          de: "10 Ringmarker + 1 Quest-Marker",
          fr: "10 jetons anneau + 1 jeton quête",
          pt: "10 peças de anel + 1 peça de missão" },
        { en: "3 nightmare &amp; 3 dragon tokens",
          nl: "3 nachtmerrie- &amp; 3 draakfiches",
          de: "3 Albtraum- &amp; 3 Drachenmarker",
          fr: "3 jetons cauchemar &amp; 3 jetons dragon",
          pt: "3 peças de pesadelo &amp; 3 de dragão" },
        { en: "8 possession tokens, 23 castle-location tokens",
          nl: "8 bezitsfiches, 23 kasteellocatiefiches",
          de: "8 Besitzmarker, 23 Burgort-Marker",
          fr: "8 jetons possession, 23 jetons de lieu de château",
          pt: "8 peças de posse, 23 peças de localização de castelo" },
        { en: "Hourglass",
          nl: "Zandloper",
          de: "Sanduhr",
          fr: "Sablier",
          pt: "Ampulheta" }
      ] },
    { id: "vp_41", year: 1982, fact: { en: "Honorable mention, Best Multi-Player Game of 1982 — Electronic Games",
          nl: "Eervolle vermelding, Beste Multiplayerspel van 1982 — Electronic Games",
          de: "Lobende Erwähnung, Bestes Mehrspielerspiel des Jahres 1982 — Electronic Games",
          fr: "Mention honorable, meilleur jeu multijoueur de 1982 — Electronic Games",
          pt: "Menção honrosa, Melhor Jogo Multijogador de 1982 — Electronic Games" },
      blurb: { en: "Risk with a video game instead of dice. Forty-three world powers, each rated for military and economic strength, and every battle is settled by playing the cartridge's own combat game rather than rolling anything.",
          nl: "Risk met een videospel in plaats van dobbelstenen. Drieënveertig wereldmachten, elk met een eigen militaire en economische score, en elk gevecht wordt beslecht door het gevechtsspel van de cartridge te spelen in plaats van ergens mee te gooien.",
          de: "Risk mit einem Videospiel statt Würfeln. Dreiundvierzig Weltmächte, jede mit eigener militärischer und wirtschaftlicher Stärke, und jede Schlacht wird durch das Kampfspiel des Moduls entschieden, statt irgendetwas zu würfeln.",
          fr: "Le Risk, avec un jeu vidéo à la place des dés. Quarante-trois puissances mondiales, chacune notée en force militaire et économique, et chaque bataille se règle en jouant le jeu de combat de la cartouche plutôt qu'en lançant quoi que ce soit.",
          pt: "Risk com um videogame no lugar dos dados. Quarenta e três potências mundiais, cada uma com força militar e econômica avaliada, e toda batalha é resolvida jogando o próprio jogo de combate do cartucho em vez de rolar qualquer coisa." },
      contents: [
        { en: { en: "Game board &amp; compartment lid",
          nl: "Speelbord &amp; vakdeksel",
          de: "Spielbrett &amp; Fachdeckel",
          fr: "Plateau de jeu &amp; couvercle de compartiment",
          pt: "Tabuleiro &amp; tampa do compartimento" },
          nl: "Speelbord &amp; vakdeksel",
          de: "Spielbrett &amp; Fachdeckel",
          fr: "Plateau de jeu &amp; couvercle de compartiment",
          pt: "Tabuleiro &amp; tampa do compartimento" },
        { en: "Instruction manual",
          nl: "Handleiding",
          de: "Anleitung",
          fr: "Manuel d'instructions",
          pt: "Manual de instruções" },
        { en: "228 colored magnets on 6 uncut sheets",
          nl: "228 gekleurde magneten op 6 ongesneden vellen",
          de: "228 farbige Magnete auf 6 ungeschnittenen Bögen",
          fr: "228 aimants colorés sur 6 planches non découpées",
          pt: "228 ímãs coloridos em 6 folhas não recortadas" },
        { en: "6 Homeland markers",
          nl: "6 Homeland-markers",
          de: "6 Heimatland-Marker",
          fr: "6 marqueurs de territoire d'origine",
          pt: "6 marcadores Homeland" },
        { en: "9 uncut sheets of Power Base Unit chips (108 total)",
          nl: "9 ongesneden vellen met Power Base Unit-chips (108 in totaal)",
          de: "9 ungeschnittene Bögen mit Power-Base-Unit-Chips (108 insgesamt)",
          fr: "9 planches non découpées de pions Power Base Unit (108 au total)",
          pt: "9 folhas não recortadas de fichas Power Base Unit (108 no total)" }
      ] },
    { id: "vp_46", year: 1982, fact: { en: "Most Innovative Game of 1982 — Electronic Games",
          nl: "Meest Innovatieve Spel van 1982 — Electronic Games",
          de: "Innovativstes Spiel des Jahres 1982 — Electronic Games",
          fr: "Jeu le plus innovant de 1982 — Electronic Games",
          pt: "Jogo Mais Inovador de 1982 — Electronic Games" },
      blurb: { en: "Twenty-seven real companies and commodities - IBM, McDonald's, gold, bonds - with prices that move on the news and never run the same way twice. Buy low, sell high, and end the year richer than up to three opponents.",
          nl: "Zevenentwintig echte bedrijven en grondstoffen - IBM, McDonald's, goud, obligaties - met koersen die op het nieuws bewegen en nooit twee keer hetzelfde verlopen. Koop laag, verkoop hoog, en eindig het jaar rijker dan maximaal drie tegenstanders.",
          de: "Siebenundzwanzig echte Unternehmen und Rohstoffe - IBM, McDonald's, Gold, Anleihen - mit Kursen, die auf Nachrichten reagieren und nie zweimal gleich verlaufen. Billig kaufen, teuer verkaufen und das Jahr reicher beenden als bis zu drei Gegenspieler.",
          fr: "Vingt-sept entreprises et matières premières réelles - IBM, McDonald's, l'or, les obligations - dont les cours réagissent à l'actualité et ne se comportent jamais deux fois de la même façon. Achetez bas, vendez haut, et terminez l'année plus riche que jusqu'à trois adversaires.",
          pt: "Vinte e sete empresas e commodities reais - IBM, McDonald's, ouro, títulos - com preços que se mexem conforme as notícias e nunca se repetem do mesmo jeito. Compre na baixa, venda na alta e termine o ano mais rico que até três adversários." },
      contents: [
        { en: { en: "Game board &amp; compartment lid",
          nl: "Speelbord &amp; vakdeksel",
          de: "Spielbrett &amp; Fachdeckel",
          fr: "Plateau de jeu &amp; couvercle de compartiment",
          pt: "Tabuleiro &amp; tampa do compartimento" },
          nl: "Speelbord &amp; vakdeksel",
          de: "Spielbrett &amp; Fachdeckel",
          fr: "Plateau de jeu &amp; couvercle de compartiment",
          pt: "Tabuleiro &amp; tampa do compartimento" },
        { en: "Two investment record pads",
          nl: "Twee blocnotes voor beleggingsoverzichten",
          de: "Zwei Blöcke für Investitionsprotokolle",
          fr: "Deux blocs de suivi des investissements",
          pt: "Dois blocos de registro de investimentos" },
        { en: "7 green &amp; 7 gold margin/share tokens",
          nl: "7 groene &amp; 7 gouden margin-/aandeelfiches",
          de: "7 grüne &amp; 7 goldene Margin-/Aktienmarker",
          fr: "7 jetons marge/action verts &amp; 7 dorés",
          pt: "7 peças verdes &amp; 7 douradas de margem/ação" },
        { en: "Gold &amp; silver prime-rate tokens",
          nl: "Gouden &amp; zilveren prime-rate-fiches",
          de: "Goldene &amp; silberne Leitzins-Marker",
          fr: "Jetons de taux directeur or &amp; argent",
          pt: "Peças douradas &amp; prateadas de taxa básica de juros" },
        { en: "Time-frame token",
          nl: "Tijdvakfiche",
          de: "Zeitrahmen-Marker",
          fr: "Jeton de période",
          pt: "Peça de período" }
      ],
      // br_9434 (Wall Street) is a standalone Brazilian G7000 release of
      // this same game, but it carries no vpNumber of its own, so it's
      // otherwise invisible to anything that cross-references the vault by
      // VP catalogue number - this is what puts it on the card (see
      // msCard() in app.js). See the matching "relatedTo" note on
      // br_9434's own page (gamepages.js) for the link back the other way.
      variants: [
        { id: "br_9434", label: "Brazil (standalone G7000 release, as \"Wall Street\")" }
      ] }
  ],

  // ---- Featured and recommended, C64 shelf ------------------------------
  // The same panel as above, but for the Commodore 64 shelf. "id" matches an
  // id in games.js; the cover comes from there and the blurb lives here. The
  // right-hand slot plays the game's own gameplay clip (the one already wired
  // into its game page) - muted, looping - so the screenshot actually moves.
  // No "shot" needed: the video id is taken from gamepages.js automatically.
  c64featured: [
    { id: "c64_paradroid",
      blurb: { en: "Andrew Braybrook's masterpiece: board an enemy droid, win a little logic duel for control of it, then turn its guns on the rest. Nothing on the machine feels quite this considered.",
          nl: "Het meesterwerk van Andrew Braybrook: enter een vijandelijke droid, win een klein logicaduel om de controle en richt zijn wapens daarna op de rest. Niets op de machine voelt zo doordacht.",
          de: "Andrew Braybrooks Meisterwerk: Entere einen feindlichen Droiden, gewinn ein kleines Logikduell um die Kontrolle über ihn und richte dann seine Waffen auf den Rest. Nichts auf dem Rechner wirkt so durchdacht.",
          fr: "Le chef-d'œuvre d'Andrew Braybrook : abordez un droïde ennemi, remportez un petit duel de logique pour en prendre le contrôle, puis retournez ses armes contre les autres. Rien sur la machine ne paraît aussi mûrement réfléchi.",
          pt: "A obra-prima de Andrew Braybrook: invada um dróide inimigo, vença um pequeno duelo de lógica pelo controle dele e vire as armas dele contra o resto. Nada na máquina parece tão bem pensado." } },
    { id: "c64_last_ninja",
      blurb: { en: "System 3's isometric adventure sold over four million copies and defined what a C64 blockbuster looked like — six loading screens, a Ben Daglish score, and puzzles that punished the impatient.",
          nl: "Het isometrische avontuur van System 3 verkocht meer dan vier miljoen keer en bepaalde hoe een C64-blockbuster eruitzag — zes laadschermen, een soundtrack van Ben Daglish, en puzzels die ongeduld afstraften.",
          de: "System 3s isometrisches Adventure verkaufte sich über vier Millionen Mal und definierte, wie ein C64-Blockbuster auszusehen hatte — sechs Ladebildschirme, ein Soundtrack von Ben Daglish und Rätsel, die Ungeduldige bestraften.",
          fr: "L'aventure isométrique de System 3 s'est vendue à plus de quatre millions d'exemplaires et a défini ce qu'était un blockbuster sur C64 — six écrans de chargement, une bande-son de Ben Daglish et des énigmes qui punissaient les impatients.",
          pt: "A aventura isométrica da System 3 vendeu mais de quatro milhões de cópias e definiu a cara de um blockbuster de C64 — seis telas de carregamento, uma trilha de Ben Daglish e quebra-cabeças que puniam os impacientes." } },
    { id: "c64_turrican2",
      blurb: { en: "Manfred Trenz and Chris Huelsbeck pushing the hardware to its limit in 1991 — vast scrolling worlds, a rotating beam weapon, and a soundtrack people still cover today.",
          nl: "Manfred Trenz en Chris Huelsbeck die de hardware in 1991 tot het uiterste dreven — uitgestrekte scrollende werelden, een roterend straalwapen, en een soundtrack die vandaag nog steeds gecoverd wordt.",
          de: "Manfred Trenz und Chris Huelsbeck treiben die Hardware 1991 an ihre Grenzen — riesige scrollende Welten, eine rotierende Strahlenwaffe und ein Soundtrack, den Leute bis heute covern.",
          fr: "Manfred Trenz et Chris Huelsbeck poussant la machine dans ses derniers retranchements en 1991 — de vastes mondes défilants, un rayon rotatif et une bande-son que l'on reprend encore aujourd'hui.",
          pt: "Manfred Trenz e Chris Huelsbeck levando o hardware ao limite em 1991 — mundos imensos com rolagem, uma arma de raio giratória e uma trilha sonora que o pessoal ainda regrava hoje." } },
    { id: "c64_impossible_mission",
      blurb: { en: "\"Another visitor. Stay a while... stay forever!\" Epyx's acrobatic search through a mad scientist's lair, with speech synthesis that stunned everyone in 1984.",
          nl: "\"Another visitor. Stay a while... stay forever!\" Epyx' acrobatische zoektocht door het hol van een gekke wetenschapper, met spraaksynthese die in 1984 iedereen verbijsterde.",
          de: "\"Another visitor. Stay a while... stay forever!\" Epyx' akrobatische Suche durch das Versteck eines verrückten Wissenschaftlers, mit einer Sprachausgabe, die 1984 alle umgehauen hat.",
          fr: "\"Another visitor. Stay a while... stay forever!\" La fouille acrobatique du repaire d'un savant fou signée Epyx, avec une synthèse vocale qui a sidéré tout le monde en 1984.",
          pt: "\"Another visitor. Stay a while... stay forever!\" A busca acrobática da Epyx pelo covil de um cientista louco, com uma síntese de voz que deixou todo mundo de queixo caído em 1984." } },
    { id: "c64_wizball",
      blurb: { en: "Sensible Software's strangest and best: bounce an unsteerable ball across the land to collect paint and give a grey world its colour back. A two-player cat helps.",
          nl: "Het vreemdste en beste van Sensible Software: stuiter een onbestuurbare bal over het land om verf te verzamelen en een grijze wereld zijn kleur terug te geven. Een kat voor speler twee helpt mee.",
          de: "Sensible Softwares seltsamstes und bestes Spiel: Lass einen unlenkbaren Ball übers Land hüpfen, sammle Farbe ein und gib einer grauen Welt ihre Farben zurück. Eine Katze für den zweiten Spieler hilft mit.",
          fr: "Le plus étrange et le meilleur de Sensible Software : faites rebondir une balle impossible à diriger à travers le pays pour récolter de la peinture et rendre ses couleurs à un monde gris. Un chat en deuxième joueur vous prête main-forte.",
          pt: "O mais estranho e o melhor da Sensible Software: faça quicar pelo cenário uma bola que não dá para dirigir, coletando tinta para devolver a cor a um mundo cinza. Um gato em dois jogadores ajuda." } },
    { id: "c64_ik_plus",
      blurb: { en: "Archer Maclean's three-way karate tournament — you, a rival, and a computer fighter all at once — with a bonus round batting bombs back. The high point of the genre on the 64.",
          nl: "Het karatetoernooi met drie vechters van Archer Maclean — jij, een rivaal en een computervechter tegelijk — plus een bonusronde waarin je bommen terugslaat. Het hoogtepunt van het genre op de 64.",
          de: "Archer Macleans Karateturnier zu dritt — du, ein Rivale und ein Computerkämpfer alle auf einmal — mit einer Bonusrunde, in der du Bomben zurückschlägst. Der Höhepunkt des Genres auf dem 64er.",
          fr: "Le tournoi de karaté à trois d'Archer Maclean — vous, un rival et un combattant géré par l'ordinateur, tous en même temps — avec un niveau bonus où l'on renvoie des bombes à la batte. Le sommet du genre sur le 64.",
          pt: "O torneio de caratê de três lados de Archer Maclean — você, um rival e um lutador do computador ao mesmo tempo — com uma fase bônus rebatendo bombas. O ponto alto do gênero no 64." } }
  ],

  // ---- Featured and recommended, PC shelf --------------------------------
  // Same shape and same reused rotator as c64featured above - the PC panel
  // calls c64FeatureRotator() directly rather than getting its own copy of
  // that ~80-line function, since the two are structurally identical (a
  // plain, non-link "main" box that builds its own inner cover link - see
  // the app.js comment at the call site for why that's safe to share and
  // c64HomebrewFeatureRotator isn't). "id" matches an id in games.js; the
  // right-hand slot plays clips/clip_<id>.mp4, same three-layer fallback as
  // every other clip-driven panel. Three of these six (Doom, Prince of
  // Persia, Leisure Suit Larry) are already playable in this Vault; the
  // other three (Keen 6, Duke Nukem, Space Quest IV) still need their ROM
  // file added under emulator/roms - see the romFile table Mike's working
  // from. Featured here regardless, same as any other shelf: this panel is
  // about the clip, not whether the cartridge is loaded yet.
  pcfeatured: [
    { id: "pc_doom",
      blurb: { en: "id Software's 1993 shareware release redefined the genre it named — three episodes of BFG-toting carnage that ran on almost anything and got copied onto more office PCs than any game before it.",
          nl: "De shareware-release van id Software uit 1993 herdefinieerde het genre waaraan het zijn naam gaf — drie episodes bloedbad met de BFG in de hand, draaiend op zowat alles en gekopieerd naar meer kantoor-pc's dan welk spel daarvoor ook.",
          de: "Die Shareware-Veröffentlichung von id Software definierte 1993 das Genre neu, dem sie ihren Namen gab — drei Episoden Gemetzel mit der BFG, die auf fast allem liefen und auf mehr Büro-PCs kopiert wurden als jedes Spiel davor.",
          fr: "La sortie shareware d'id Software en 1993 a redéfini le genre auquel elle a donné son nom — trois épisodes de carnage au BFG qui tournaient sur à peu près n'importe quoi et se sont retrouvés copiés sur plus de PC de bureau que n'importe quel jeu avant lui.",
          pt: "O lançamento shareware da id Software em 1993 redefiniu o gênero que ele mesmo batizou — três episódios de carnificina com BFG na mão que rodavam em quase qualquer coisa e foram copiados para mais PCs de escritório do que qualquer jogo antes dele." } },
    { id: "pc_prince_of_persia",
      blurb: { en: "Jordan Mechner rotoscoped his own brother's movements to make a video game character move like a person for the first time — sixty minutes on the clock, a sword, and traps built to kill you the moment you stop paying attention.",
          nl: "Jordan Mechner rotoscopeerde de bewegingen van zijn eigen broer om een videogamepersonage voor het eerst als een mens te laten bewegen — zestig minuten op de klok, een zwaard, en vallen gebouwd om je te doden zodra je even niet oplet.",
          de: "Jordan Mechner rotoskopierte die Bewegungen seines eigenen Bruders, damit sich eine Spielfigur zum ersten Mal wie ein Mensch bewegt — sechzig Minuten auf der Uhr, ein Schwert und Fallen, die dich in dem Moment töten, in dem du nicht mehr aufpasst.",
          fr: "Jordan Mechner a rotoscopé les mouvements de son propre frère pour qu'un personnage de jeu vidéo bouge enfin comme un être humain — soixante minutes au compteur, une épée et des pièges conçus pour vous tuer dès l'instant où vous relâchez votre attention.",
          pt: "Jordan Mechner rotoscopiou os movimentos do próprio irmão para fazer um personagem de videogame se mexer como uma pessoa pela primeira vez — sessenta minutos no relógio, uma espada e armadilhas feitas para te matar no instante em que você para de prestar atenção." } },
    { id: "pc_leisure_suit_larry",
      blurb: { en: "Al Lowe's text-parser comedy, the one Sierra kept a straight face selling — a disco-suited loser trying, and mostly failing, his way through a night out in Lost Wages.",
          nl: "De komedie met tekstparser van Al Lowe, degene die Sierra met een uitgestreken gezicht verkocht — een loser in discopak die zich een avondje Lost Wages door probeert te slaan, en daar meestal in faalt.",
          de: "Al Lowes Textparser-Komödie, die Sierra mit unbewegter Miene verkaufte — ein Loser im Discoanzug, der sich durch eine Nacht in Lost Wages versucht und dabei meistens scheitert.",
          fr: "La comédie à analyseur syntaxique d'Al Lowe, celle que Sierra vendait sans se départir de son sérieux — un loser en costume disco qui tente sa chance, et se plante le plus souvent, au fil d'une nuit de sortie à Lost Wages.",
          pt: "A comédia com parser de texto de Al Lowe, aquela que a Sierra vendia sem rir — um perdedor de terno de discoteca tentando, e quase sempre fracassando, atravessar uma noitada em Lost Wages." } },
    { id: "pc_keen6",
      blurb: { en: "The last of the original trilogy-of-trilogies: platforming through an alien mothership to rescue Keen's babysitter, with a Big Red Cannon prize waiting for anyone who beats it fast enough.",
          nl: "De laatste van de oorspronkelijke trilogie-van-trilogieën: platformen door een buitenaards moederschip om Keens oppas te redden, met een Big Red Cannon als prijs voor wie het snel genoeg uitspeelt.",
          de: "Der letzte Teil der ursprünglichen Trilogie aus Trilogien: Plattformhüpfen durch ein außerirdisches Mutterschiff, um Keens Babysitterin zu retten, mit einem Big-Red-Cannon-Preis für alle, die es schnell genug durchspielen.",
          fr: "Le dernier volet de la trilogie de trilogies d'origine : de la plate-forme à bord d'un vaisseau-mère extraterrestre pour délivrer la baby-sitter de Keen, avec un Big Red Cannon à gagner pour quiconque le termine assez vite.",
          pt: "O último da trilogia de trilogias original: plataforma dentro de uma nave-mãe alienígena para resgatar a babá do Keen, com um prêmio Big Red Cannon esperando quem terminasse rápido o bastante." } },
    { id: "pc_duke_nukem",
      blurb: { en: "Before the one-liners and the 3D engine, Duke's first outing was a straightforward Apogee side-scroller — one disk, one wisecracking hero, and the template everything after it built on.",
          nl: "Vóór de oneliners en de 3D-engine was Dukes eerste optreden een rechttoe rechtaan side-scroller van Apogee — één diskette, één held met een grote mond, en het sjabloon waarop alles erna voortbouwde.",
          de: "Vor den flotten Sprüchen und der 3D-Engine war Dukes erster Auftritt ein geradliniger Apogee-Sidescroller — eine Diskette, ein flapsiger Held und die Vorlage, auf der alles Spätere aufbaute.",
          fr: "Avant les répliques cultes et le moteur 3D, la première sortie de Duke était un simple jeu à défilement horizontal d'Apogee — une disquette, un héros à la langue bien pendue, et le modèle sur lequel tout le reste s'est construit.",
          pt: "Antes das tiradas e do motor 3D, a estreia do Duke foi um side-scroller direto da Apogee — um disquete, um herói cheio de piadas e o modelo em cima do qual tudo depois dele foi construído." } },
    { id: "pc_sq4",
      blurb: { en: "Roger Wilco gets thrown forward into his own sequel's marketing — Sierra's most self-aware entry in the series, parodying Star Trek, Terminator and its own back catalogue in the same breath.",
          nl: "Roger Wilco wordt vooruit geslingerd in de marketing van zijn eigen sequel — Sierra's meest zelfbewuste deel in de reeks, dat Star Trek, Terminator en zijn eigen back catalogue in één adem parodieert.",
          de: "Roger Wilco wird in die Werbung für sein eigenes Sequel katapultiert — Sierras selbstironischster Serienteil, der Star Trek, Terminator und den eigenen Backkatalog im selben Atemzug parodiert.",
          fr: "Roger Wilco se retrouve propulsé dans la campagne marketing de sa propre suite — l'épisode le plus conscient de lui-même de la série chez Sierra, qui parodie Star Trek, Terminator et son propre catalogue dans la même phrase.",
          pt: "Roger Wilco é jogado para a frente, direto no marketing da própria sequência — a entrada mais autoconsciente da Sierra na série, parodiando Star Trek, Terminator e o próprio catálogo no mesmo fôlego." } }
  ],

  // ---- Homebrew ---------------------------------------------------------
  // The other half of the story: games written for this console after it was
  // discontinued, by people who simply wanted to. Same shape as "featured",
  // with one addition - "shot" also takes an array, and two screenshots are
  // then stacked in the slot instead of one.
  homebrew: [
    { id: "new_amok", shot: "new_amok.jpg",
      blurb: { en: "The first one. John Dondzila brought Stern's Berzerk to the console in 1998, fifteen years after Philips walked away, and started everything below.",
          nl: "De allereerste. John Dondzila bracht Berzerk van Stern in 1998 naar de console, vijftien jaar nadat Philips ermee was gestopt, en zette alles hieronder in gang.",
          de: "Das erste. John Dondzila brachte Sterns Berzerk 1998 auf die Konsole, fünfzehn Jahre nachdem Philips sich zurückgezogen hatte, und stieß alles an, was hier darunter folgt.",
          fr: "Le tout premier. John Dondzila a porté le Berzerk de Stern sur la console en 1998, quinze ans après le départ de Philips, et a lancé tout ce qui suit.",
          pt: "O primeiro. John Dondzila trouxe o Berzerk da Stern para o console em 1998, quinze anos depois de a Philips ter abandonado o barco, e deu início a tudo o que vem abaixo." } },
    { id: "new_ktaa", shot: "new_ktaa.png",
      blurb: { en: "Sören Gust, 2003, under the Xype label — and one of the first homebrews to use the Plus graphics. Widely held to be among the best games on the machine, official ones included.",
          nl: "Sören Gust, 2003, onder het label Xype — en een van de eerste homebrews die de Plus-graphics gebruikte. Wordt breed gezien als een van de beste spellen op de machine, de officiële meegerekend.",
          de: "Sören Gust, 2003, unter dem Label Xype — und eines der ersten Homebrews, das die Plus-Grafik nutzt. Gilt weithin als eines der besten Spiele für das Gerät, die offiziellen eingeschlossen.",
          fr: "Sören Gust, 2003, sous le label Xype — et l'un des premiers homebrews à exploiter les graphismes Plus. Largement considéré comme l'un des meilleurs jeux de la machine, titres officiels compris.",
          pt: "Sören Gust, 2003, sob o selo Xype — e um dos primeiros homebrews a usar os gráficos Plus. Amplamente tido como um dos melhores jogos da máquina, oficiais incluídos." } },
    { id: "new_route66", shot: "new_route66.png",
      blurb: { en: "Rafael Cardoso and René van den Enden, 2007. Four levels — day, night, desert, snow — seven black cars to run down in each, and every one faster than the last.",
          nl: "Rafael Cardoso en René van den Enden, 2007. Vier levels — dag, nacht, woestijn, sneeuw — met in elk zeven zwarte auto's om van de weg te rijden, en elke auto sneller dan de vorige.",
          de: "Rafael Cardoso und René van den Enden, 2007. Vier Level — Tag, Nacht, Wüste, Schnee — sieben schwarze Autos zum Abräumen in jedem, und jedes schneller als das vorige.",
          fr: "Rafael Cardoso et René van den Enden, 2007. Quatre niveaux — jour, nuit, désert, neige — sept voitures noires à faucher dans chacun, et chacune plus rapide que la précédente.",
          pt: "Rafael Cardoso e René van den Enden, 2007. Quatro fases — dia, noite, deserto, neve — sete carros pretos para atropelar em cada uma, e cada um mais rápido que o anterior." } },
    { id: "new_pong_all", shot: "new_pong_all.png",
      blurb: { en: "It took thirty years for this console to get a Pong. René van den Enden's makes up for it with eleven variations, from squash to tennis to the 1972 original.",
          nl: "Het duurde dertig jaar voor deze console een Pong kreeg. Die van René van den Enden maakt dat goed met elf varianten, van squash tot tennis tot het origineel uit 1972.",
          de: "Diese Konsole hat dreißig Jahre auf ein Pong gewartet. Das von René van den Enden macht das mit elf Varianten wett, von Squash über Tennis bis zum Original von 1972.",
          fr: "Il aura fallu trente ans à cette console pour avoir son Pong. Celui de René van den Enden rattrape le retard avec onze variantes, du squash au tennis en passant par l'original de 1972.",
          pt: "Levou trinta anos para este console ganhar um Pong. O de René van den Enden compensa a demora com onze variações, do squash ao tênis até o original de 1972." } },
    { id: "new_mrroboto", shot: "new_mrroboto.png",
      blurb: { en: "Ted Foolery packed three different games into eight kilobytes, playable by one, two or nobody at all — and hid a puzzle in it that ran as a competition.",
          nl: "Ted Foolery propte drie verschillende spellen in acht kilobyte, speelbaar met één, twee of helemaal niemand — en verstopte er een puzzel in die als wedstrijd liep.",
          de: "Ted Foolery hat drei verschiedene Spiele in acht Kilobyte gepackt, spielbar für einen, zwei oder gar keinen Spieler — und ein Rätsel darin versteckt, das als Wettbewerb lief.",
          fr: "Ted Foolery a fait tenir trois jeux différents en huit kilo-octets, jouables à un, à deux ou par personne du tout — et y a caché une énigme qui a donné lieu à un concours.",
          pt: "Ted Foolery enfiou três jogos diferentes em oito kilobytes, jogáveis por um, dois ou ninguém — e escondeu ali um enigma que virou uma competição." } },
    { id: "new_ppp-o2em", shot: ["new_ppp-o2em.png", "new_ppp-o2em-2.png"],
      blurb: { en: "Tetris, essentially, and a good one: four variations, polyphonic music and enhanced graphics on a G7400. This is the build made to run under emulation — the cartridge version plays its music through The Voice.",
          nl: "In wezen Tetris, en een goede: vier varianten, polyfone muziek en verbeterde graphics op een G7400. Dit is de build die gemaakt is om onder emulatie te draaien — de cartridgeversie speelt zijn muziek via The Voice.",
          de: "Im Grunde Tetris, und ein gutes: vier Varianten, mehrstimmige Musik und verbesserte Grafik auf einem G7400. Das hier ist der Build für die Emulation — die Modulversion spielt ihre Musik über The Voice.",
          fr: "Un Tetris, en somme, et un bon : quatre variantes, une musique polyphonique et des graphismes améliorés sur G7400. Voici la version conçue pour tourner sous émulation — la version cartouche joue sa musique via The Voice.",
          pt: "Tetris, essencialmente, e um bom: quatro variações, música polifônica e gráficos melhorados num G7400. Esta é a build feita para rodar em emulação — a versão em cartucho toca a música pelo The Voice." } }
  ],

  // ---- Homebrew, C64 shelf ------------------------------------------
  // Same shape as "homebrew" above, but only shown on the C64 shelf page
  // (placeBlocks() in app.js gates it on state.platform === "C64"). Kept
  // as its own array, not mixed into "homebrew", so Videopac's panel
  // never shows a C64 game a Videopac visitor can't even play.
  c64homebrew: [
    { id: "c64_hb_c64anabalt", shot: "c64_hb_c64anabalt.png",
      blurb: { en: "RGCD's 16KB cartridge demake of Canabalt, 2012 — one button, infinite fall, and proof the C64 could still do a modern indie hit justice a decade after Philips-era rivals had all gone quiet.",
          nl: "RGCD's 16KB-cartridgedemake van Canabalt, 2012 — één knop, een eindeloze val, en het bewijs dat de C64 een moderne indiehit nog steeds recht kon doen, tien jaar nadat de rivalen uit het Philips-tijdperk allemaal waren verstomd.",
          de: "RGCDs 16-KB-Modul-Demake von Canabalt, 2012 — ein Knopf, endloser Sturz und der Beweis, dass der C64 einem modernen Indie-Hit immer noch gerecht wird, ein Jahrzehnt nachdem die Rivalen aus der Philips-Ära längst verstummt waren.",
          fr: "Le demake sur cartouche 16 Ko de Canabalt par RGCD, 2012 — un bouton, une chute infinie, et la preuve que le C64 pouvait encore rendre justice à un hit indépendant moderne, une décennie après que ses rivaux de l'ère Philips se sont tous tus.",
          pt: "O demake em cartucho de 16KB de Canabalt feito pela RGCD, 2012 — um botão, queda infinita e a prova de que o C64 ainda podia fazer jus a um sucesso indie moderno, uma década depois de os rivais da era Philips terem todos se calado." } },
    { id: "c64_hb_wolfling", shot: "c64_hb_wolfling.png",
      blurb: { en: "Lazycow, one of the most prolific names in modern C64 homebrew, sends a wolf cub jumping through a tight 2019 platformer built from scratch, thirty-six years after the machine launched.",
          nl: "Lazycow, een van de productiefste namen in moderne C64-homebrew, laat een wolvenwelp springen door een strakke platformer uit 2019, van de grond af opgebouwd, zesendertig jaar na de lancering van de machine.",
          de: "Lazycow, einer der produktivsten Namen im modernen C64-Homebrew, schickt ein Wolfsjunges durch einen knackigen, von Grund auf gebauten Plattformer von 2019, sechsunddreißig Jahre nach dem Marktstart der Maschine.",
          fr: "Lazycow, l'un des noms les plus prolifiques du homebrew C64 moderne, envoie un louveteau sauter dans un jeu de plates-formes millimétré de 2019, écrit de zéro trente-six ans après la sortie de la machine.",
          pt: "Lazycow, um dos nomes mais prolíficos do homebrew moderno de C64, põe um filhote de lobo para pular por um jogo de plataforma certeiro de 2019, feito do zero, trinta e seis anos depois do lançamento da máquina." } },
    { id: "c64_hb_hero_is_back", shot: "c64_hb_hero_is_back.png",
      blurb: { en: "Excess and Hokuto Force built an unofficial sequel to Activision's 1984 H.E.R.O. in 2025 — same jetpack, same dynamite, brand new caverns, over four decades on.",
          nl: "Excess en Hokuto Force bouwden in 2025 een onofficieel vervolg op H.E.R.O. van Activision uit 1984 — dezelfde jetpack, hetzelfde dynamiet, gloednieuwe grotten, ruim vier decennia later.",
          de: "Excess und Hokuto Force haben 2025 eine inoffizielle Fortsetzung zu Activisions H.E.R.O. von 1984 gebaut — gleiches Jetpack, gleiches Dynamit, brandneue Höhlen, über vier Jahrzehnte später.",
          fr: "Excess et Hokuto Force ont bâti en 2025 une suite non officielle au H.E.R.O. d'Activision de 1984 — même jetpack, même dynamite, cavernes inédites, plus de quarante ans plus tard.",
          pt: "Excess e Hokuto Force fizeram em 2025 uma sequência não oficial do H.E.R.O. de 1984 da Activision — mesma mochila a jato, mesma dinamite, cavernas totalmente novas, mais de quatro décadas depois." } },
    { id: "c64_hb_luftrauserz", shot: "c64_hb_luftrauserz.png",
      blurb: { en: "Triad squeezed 2014's PC dogfighter Luftrausers onto real C64 silicon in 2017 — physics-driven plane combat the hardware was never supposed to run.",
          nl: "Triad perste de pc-dogfighter Luftrausers uit 2014 in 2017 op echt C64-silicium — vliegtuiggevechten op basis van physics die de hardware nooit had moeten kunnen draaien.",
          de: "Triad hat den PC-Luftkampf Luftrausers von 2014 im Jahr 2017 auf echtes C64-Silizium gequetscht — physikgetriebene Flugzeugduelle, die auf dieser Hardware nie laufen sollten.",
          fr: "Triad a fait tenir Luftrausers, le jeu de combat aérien PC de 2014, sur du vrai silicium C64 en 2017 — des duels d'avions régis par la physique que la machine n'était jamais censée faire tourner.",
          pt: "A Triad espremeu o Luftrausers, jogo de combate aéreo de PC de 2014, no silício de verdade do C64 em 2017 — combate de aviões movido a física que o hardware nunca deveria rodar." } },
    { id: "c64_hb_bagman_strikes_back", shot: "c64_hb_bagman_strikes_back.png",
      blurb: { en: "LC-Games' 2022 tribute to the 1983 arcade platformer Bagman — a thief hauling gold up ladders, dodging guards, forty years and one homebrew scene later.",
          nl: "Het eerbetoon van LC-Games uit 2022 aan de arcadeplatformer Bagman uit 1983 — een dief die goud langs ladders omhoog sjouwt en bewakers ontwijkt, veertig jaar en één homebrewscene later.",
          de: "LC-Games' Hommage von 2022 an den Arcade-Plattformer Bagman von 1983 — ein Dieb, der Gold über Leitern schleppt und Wachen ausweicht, vierzig Jahre und eine Homebrew-Szene später.",
          fr: "L'hommage rendu en 2022 par LC-Games au jeu de plates-formes d'arcade Bagman de 1983 — un voleur qui hisse de l'or le long des échelles en esquivant les gardes, quarante ans et une scène homebrew plus tard.",
          pt: "O tributo de 2022 da LC-Games ao Bagman, jogo de plataforma de arcade de 1983 — um ladrão carregando ouro escada acima, desviando dos guardas, quarenta anos e uma cena homebrew depois." } },
    { id: "c64_hb_grid_pix", shot: "c64_hb_grid_pix.png",
      blurb: { en: "Excess brought Picross to the C64 in 2020 — a genre the original Videopac and C64 shelves never had — later picked up for a real boxed cartridge release.",
          nl: "Excess bracht Picross in 2020 naar de C64 — een genre dat de oorspronkelijke Videopac- en C64-schappen nooit hebben gehad — en werd later opgepikt voor een echte cartridge-uitgave in doos.",
          de: "Excess hat Picross 2020 auf den C64 gebracht — ein Genre, das es in den originalen Videopac- und C64-Regalen nie gab — und später wurde es sogar als echtes Modul in der Box aufgelegt.",
          fr: "Excess a porté Picross sur C64 en 2020 — un genre que les rayons d'origine du Videopac et du C64 n'ont jamais connu — repris ensuite pour une véritable sortie en cartouche sous boîte.",
          pt: "A Excess trouxe o Picross para o C64 em 2020 — um gênero que as prateleiras originais de Videopac e C64 nunca tiveram — depois aproveitado para um lançamento de verdade em cartucho com caixa." } }
  ],

  // ---- Homebrew, PC shelf ------------------------------------------
  // Same shape as "c64homebrew" above (id + blurb, no "shot" - the right-hand
  // slot is clip -> cover, there's no curated screenshot for these), shown
  // only on the PC shelf (placeBlocks() in app.js gates it on
  // state.platform === "PC"). Reuses c64HomebrewFeatureRotator() directly
  // rather than a third copy of that function - see the app.js comment at
  // the call site. The six here are picked by itch.io's own "popular" sort
  // among free/pay-what-you-want MS-DOS titles, not by whether this vault
  // has their DOS file yet - Gates Of Integrity, Dungeons of Noudar and
  // DISKSWEEPER are already playable; The Queen's Footsteps and Space
  // Cavern Blaster still need their DOS build added under emulator/roms
  // (both are pay-what-you-want on itch.io, including &pound;0) - same
  // "featured regardless" reasoning as the pcfeatured panel above.
  pchomebrew: [
    { id: "pc_hb_gates",
      blurb: { en: "Tarjan's from-scratch first-person dungeon RPG, still getting numbered point releases years after its first one — create a party at the Guild and go find out what's down there.",
          nl: "Tarjans van de grond af opgebouwde first-person dungeon-RPG, die jaren na de eerste versie nog steeds genummerde point releases krijgt — stel een gezelschap samen bij de Guild en ga uitzoeken wat daar beneden zit.",
          de: "Tarjans von Grund auf gebautes First-Person-Dungeon-RPG, das Jahre nach dem ersten Release immer noch nummerierte Point-Releases bekommt — stell in der Guild eine Gruppe zusammen und finde heraus, was da unten wartet.",
          fr: "Le RPG de donjon en vue subjective écrit de zéro par Tarjan, qui reçoit encore des versions numérotées des années après la première — créez un groupe à la Guilde et allez voir ce qui vous attend en bas.",
          pt: "O RPG de masmorra em primeira pessoa que Tarjan fez do zero, ainda recebendo versões numeradas anos depois da primeira — monte um grupo na Guild e vá descobrir o que tem lá embaixo." } },
    { id: "pc_hb_queens",
      blurb: { en: "Davide Bucci's steampunk-Italy text adventure, later released open source — type what you mean, and mean it precisely.",
          nl: "Het tekstavontuur van Davide Bucci in een steampunk-Italië, later open source uitgebracht — typ wat je bedoelt, en bedoel het precies.",
          de: "Davide Buccis Textadventure im Steampunk-Italien, später als Open Source veröffentlicht — tipp, was du meinst, und mein es genau.",
          fr: "L'aventure textuelle de Davide Bucci dans une Italie steampunk, passée ensuite en open source — tapez ce que vous voulez dire, et dites-le avec précision.",
          pt: "A aventura de texto de Davide Bucci numa Itália steampunk, depois liberada como código aberto — digite o que você quer dizer, e diga com precisão." } },
    { id: "pc_hb_spacecavern",
      blurb: { en: "dotmos built one cave-flyer and shipped it to five different 80s machines at once — C64, Amiga, Atari ST, Genesis, and this, the DOS cut.",
          nl: "dotmos bouwde één cave-flyer en bracht die tegelijk uit voor vijf verschillende machines uit de jaren 80 — C64, Amiga, Atari ST, Genesis, en deze, de DOS-versie.",
          de: "dotmos hat einen Höhlenflieger gebaut und ihn gleich auf fünf verschiedenen 80er-Rechnern veröffentlicht — C64, Amiga, Atari ST, Genesis und hier, die DOS-Fassung.",
          fr: "dotmos a développé un seul jeu de vol en caverne et l'a sorti d'un coup sur cinq machines différentes des années 80 — C64, Amiga, Atari ST, Genesis, et celle-ci, la version DOS.",
          pt: "dotmos fez um jogo de voo em cavernas e o lançou em cinco máquinas dos anos 80 de uma vez — C64, Amiga, Atari ST, Genesis e esta aqui, a versão DOS." } },
    { id: "pc_hb_noudar",
      blurb: { en: "Daniel Monteiro's first-person dungeon crawler, four years in the making and still one of the most-cited examples of what real DOS code can do today, not just look like.",
          nl: "De first-person dungeoncrawler van Daniel Monteiro, vier jaar in de maak en nog altijd een van de meest aangehaalde voorbeelden van wat echte DOS-code vandaag kan doen, en niet alleen hoe het eruitziet.",
          de: "Daniel Monteiros First-Person-Dungeon-Crawler, vier Jahre in Arbeit und bis heute eines der meistzitierten Beispiele dafür, was echter DOS-Code heute wirklich kann und nicht nur so aussieht.",
          fr: "Le dungeon crawler en vue subjective de Daniel Monteiro, quatre ans de développement et toujours l'un des exemples les plus cités de ce que du vrai code DOS sait faire aujourd'hui, et pas seulement imiter.",
          pt: "O dungeon crawler em primeira pessoa de Daniel Monteiro, quatro anos de desenvolvimento e ainda um dos exemplos mais citados do que código DOS de verdade consegue fazer hoje, não só aparentar." } },
    { id: "pc_hb_disksweeper",
      blurb: { en: "Minesweeper as a broken-floppy repair job, built for the DOS Games August Jam 2022 — same rules, entirely new excuse for them.",
          nl: "Minesweeper als reparatieklus voor kapotte diskettes, gemaakt voor de DOS Games August Jam 2022 — dezelfde regels, een compleet nieuw excuus ervoor.",
          de: "Minesweeper als Reparaturauftrag für kaputte Disketten, gebaut für den DOS Games August Jam 2022 — dieselben Regeln, eine völlig neue Ausrede dafür.",
          fr: "Le Démineur en version réparation de disquettes défectueuses, conçu pour la DOS Games August Jam 2022 — mêmes règles, tout autre prétexte pour les appliquer.",
          pt: "Minesweeper como um conserto de disquete estragado, feito para a DOS Games August Jam 2022 — mesmas regras, desculpa totalmente nova para elas." } },
    { id: "pc_hb_alienintruder",
      blurb: { en: "Juan J. Martínez's single-screen jump-and-run, released free in December 2024 — proof the scene isn't just a 90s revival, it shipped something new this week.",
          nl: "De jump-and-run op één scherm van Juan J. Martínez, in december 2024 gratis uitgebracht — het bewijs dat de scene niet zomaar een jaren 90-revival is, maar deze week iets nieuws uitbracht.",
          de: "Juan J. Martínez' Einzelbildschirm-Jump-and-run, im Dezember 2024 kostenlos erschienen — der Beweis, dass die Szene nicht bloß ein 90er-Revival ist, sondern diese Woche etwas Neues veröffentlicht hat.",
          fr: "Le jump-and-run à écran unique de Juan J. Martínez, sorti gratuitement en décembre 2024 — la preuve que la scène n'est pas qu'un revival des années 90, elle a sorti du neuf cette semaine.",
          pt: "O jump-and-run de tela única de Juan J. Martínez, lançado de graça em dezembro de 2024 — prova de que a cena não é só um revival dos anos 90, ela lançou coisa nova esta semana." } }
  ],

  // ---- Sponsors ---------------------------------------------------------
  // Shops and sellers. Each entry gets a banner slot, clearly marked as an
  // advert - a retro shop is welcome here, but nobody should mistake it for
  // a recommendation from the Vault.
  //
  //   name   shown as the heading
  //   url    where it goes
  //   text   one line of copy, theirs or yours
  //   image  optional, put the file in assets/ and give the filename here.
  //          Roughly 3:1 works best - 900x300 or so.
  //
  // Empty list = no advert panel at all.
  sponsors: [
    // No "image" = the slot runs the console's attract screen instead:
    // rainbow letters bouncing off the edges. Add an image and it takes over.
    { name: "Your shop here",
      url:  "mailto:hq@retrovault.world",
      text: { en: "Selling Videopac cartridges, consoles or spare joysticks? This slot is for you.",
          nl: "Verkoop je Videopac-cartridges, consoles of losse joysticks? Deze plek is voor jou.",
          de: "Du verkaufst Videopac-Module, Konsolen oder Ersatz-Joysticks? Dieser Platz ist für dich.",
          fr: "Vous vendez des cartouches Videopac, des consoles ou des joysticks de rechange ? Cet emplacement est pour vous.",
          pt: "Vende cartuchos, consoles ou joysticks avulsos de Videopac? Este espaço é para você." },
      attract: { en: "ADVERTISE HERE",
          nl: "ADVERTEER HIER",
          de: "HIER WERBEN",
          fr: "ANNONCEZ ICI",
          pt: "ANUNCIE AQUI" } }
  ],

  // ---- Keeping this console alive, C64 shelf -----------------------------
  // Same shape as "community" above, but for the C64 shelf - the sites and
  // projects that document, catalogue and still actively support this
  // machine. Shown only on the C64 shelf (placeBlocks() in app.js gates it
  // on state.platform === "C64").
  //
  // "what" (2026-08-12): now an { en, nl, de, fr, pt } object instead of a
  // plain string, same five codes as window.I18N in i18n.js. app.js's
  // communityWhat() picks window.currentLang() out of it, falling back to
  // .en - a plain string still works too (same fallback path), so this
  // isn't a breaking change for anyone editing this file by hand. Fixes the
  // bug where switching the site's language translated the "Keeping this
  // console alive" heading and intro line (those already went through
  // window.t()) but left every card's own text stuck in English, because
  // the card text was never hooked into i18n at all until now.
  c64community: [
    { name: "CSDb",
      tint: "#5b8def",
      url: "https://csdb.dk/",
      lang: "International",
      what: {
        en: "The scene's own database - releases, screenshots and history for practically everything written for the machine since 1982, including several of the 2020s homebrews on this shelf.",
        nl: "De eigen database van de scene - releases, screenshots en geschiedenis van vrijwel alles wat sinds 1982 voor de machine is geschreven, inclusief verschillende homebrews uit de jaren 2020 op deze plank.",
        de: "Die eigene Datenbank der Szene - Releases, Screenshots und Geschichte zu praktisch allem, was seit 1982 für die Maschine geschrieben wurde, einschließlich mehrerer Homebrews der 2020er in diesem Regal.",
        fr: "La base de données de la scène elle-même - sorties, captures d'écran et histoire de pratiquement tout ce qui a été écrit pour la machine depuis 1982, y compris plusieurs homebrews des années 2020 présents sur cette étagère.",
        pt: "O banco de dados da própria cena - lançamentos, capturas de tela e história de praticamente tudo que foi escrito para a máquina desde 1982, incluindo várias homebrews dos anos 2020 nesta prateleira."
      } },
    { name: "GameBase64",
      tint: "#2fb47c",
      url: "https://gamebase64.com/",
      lang: "International",
      what: {
        en: "The exhaustive commercial-game catalogue project this shelf's C64 ROMs and cover art were largely sourced from.",
        nl: "Het uitputtende catalogusproject voor commerciële games waar de C64-roms en cover-art van deze plank grotendeels vandaan komen.",
        de: "Das umfassende Katalogprojekt für kommerzielle Spiele, aus dem die C64-ROMs und Cover-Art dieses Regals größtenteils stammen.",
        fr: "Le projet de catalogue exhaustif des jeux commerciaux dont proviennent en grande partie les ROMs C64 et les jaquettes de cette étagère.",
        pt: "O extenso projeto de catálogo de jogos comerciais de onde vêm, em grande parte, as ROMs de C64 e as artes de capa desta prateleira."
      } },
    { name: "Lemon64",
      tint: "#e0865a",
      url: "https://www.lemon64.com/",
      lang: "International",
      what: {
        en: "One of the oldest and most active English-language C64 communities - reviews, box scans and a forum running since 2000.",
        nl: "Een van de oudste en actiefste Engelstalige C64-gemeenschappen - reviews, doosscans en een forum dat al sinds 2000 draait.",
        de: "Eine der ältesten und aktivsten englischsprachigen C64-Communitys - Rezensionen, Verpackungsscans und ein Forum, das seit 2000 läuft.",
        fr: "L'une des communautés C64 anglophones les plus anciennes et les plus actives - critiques, scans de boîtes et un forum actif depuis 2000.",
        pt: "Uma das comunidades C64 de língua inglesa mais antigas e ativas - resenhas, digitalizações de caixas e um fórum ativo desde 2000."
      } },
    { name: "C64-Wiki",
      tint: "#c07de0",
      url: "https://www.c64-wiki.com/wiki/Main_Page",
      lang: "International",
      what: {
        en: "A community-run encyclopedia covering hardware, software and scene history, article by article.",
        nl: "Een door de gemeenschap beheerde encyclopedie over hardware, software en scenegeschiedenis, artikel voor artikel.",
        de: "Eine von der Community betriebene Enzyklopädie zu Hardware, Software und Szenegeschichte, Artikel für Artikel.",
        fr: "Une encyclopédie animée par la communauté, couvrant le matériel, les logiciels et l'histoire de la scène, article par article.",
        pt: "Uma enciclopédia mantida pela comunidade, cobrindo hardware, software e a história da cena, artigo por artigo."
      } },
    { name: "Protovision",
      tint: "#e0c05a",
      url: "https://www.protovision.games/",
      lang: "Germany",
      what: {
        en: "Still publishing brand new physical C64 cartridges and hardware today - proof this machine never actually stopped.",
        nl: "Publiceert vandaag de dag nog steeds gloednieuwe fysieke C64-cartridges en hardware - het bewijs dat deze machine nooit echt is gestopt.",
        de: "Veröffentlicht bis heute brandneue physische C64-Module und Hardware - der Beweis, dass diese Maschine nie wirklich aufgehört hat.",
        fr: "Publie encore aujourd'hui de toutes nouvelles cartouches C64 physiques et du matériel - la preuve que cette machine n'a jamais vraiment cessé d'exister.",
        pt: "Ainda hoje lança cartuchos físicos e hardware totalmente novos para o C64 - prova de que esta máquina nunca realmente parou."
      } },
    { name: "usebox.net",
      tint: "#e05a7e",
      url: "https://www.usebox.net/jjm/games/",
      lang: "Spain",
      what: {
        en: "Juan J. Martínez's one-man studio, still writing genuinely native C64, DOS, MSX, CPC and Spectrum games and releasing them free under Creative Commons - this shelf's Rescuing Orc is his.",
        nl: "De eenmansstudio van Juan J. Martínez, die nog steeds echt native C64-, DOS-, MSX-, CPC- en Spectrum-spellen schrijft en ze gratis uitbrengt onder Creative Commons - Rescuing Orc op deze plank is van hem.",
        de: "Das Ein-Mann-Studio von Juan J. Martínez, das noch immer wirklich native C64-, DOS-, MSX-, CPC- und Spectrum-Spiele schreibt und sie kostenlos unter Creative Commons veröffentlicht - Rescuing Orc in diesem Regal stammt von ihm.",
        fr: "Le studio individuel de Juan J. Martínez, qui écrit encore de vrais jeux natifs pour C64, DOS, MSX, CPC et Spectrum et les publie gratuitement sous Creative Commons - le Rescuing Orc de cette étagère est de lui.",
        pt: "O estúdio de uma pessoa só de Juan J. Martínez, que ainda escreve jogos genuinamente nativos para C64, DOS, MSX, CPC e Spectrum e os lança de graça sob Creative Commons - o Rescuing Orc desta prateleira é dele."
      } },
    { name: "VICE",
      tint: "#4fb3bf",
      url: "https://vice-emu.sourceforge.io/",
      lang: "Open source",
      what: {
        en: "The open-source emulator core this shelf's browser player actually runs on under the hood.",
        nl: "De open-source emulatorkern waar de browserspeler van deze plank onder de motorkap eigenlijk op draait.",
        de: "Der Open-Source-Emulatorkern, auf dem der Browser-Player dieses Regals unter der Haube tatsächlich läuft.",
        fr: "Le cœur d'émulation open source sur lequel tourne réellement, sous le capot, le lecteur navigateur de cette étagère.",
        pt: "O núcleo de emulação de código aberto sobre o qual o player do navegador desta prateleira realmente roda por baixo dos panos."
      } }
  ],

  // ---- Keeping this console alive, PC shelf ------------------------------
  // Same shape as "c64community" above, but for the MS-DOS shelf - the
  // forums, catalogues and jam communities that document and actively grow
  // this shelf's homebrew section. Shown only on the PC shelf (placeBlocks()
  // in app.js gates it on state.platform === "PC"). "what" is a translated
  // object, see the note above c64community.
  pccommunity: [
    { name: "VOGONS",
      tint: "#5b8def",
      url: "https://www.vogons.org/",
      lang: "International",
      what: {
        en: "The largest active DOS and vintage-PC hardware forum on the internet - troubleshooting real DOSBox configs and real 486s in the same threads since 2003.",
        nl: "Het grootste actieve DOS- en vintage-pc-hardwareforum op internet - sinds 2003 worden in dezelfde topics zowel echte DOSBox-configuraties als echte 486's uitgeplozen.",
        de: "Das größte aktive DOS- und Vintage-PC-Hardware-Forum im Internet - seit 2003 werden in denselben Threads echte DOSBox-Konfigurationen und echte 486er behandelt.",
        fr: "Le plus grand forum actif sur le DOS et le matériel PC vintage sur internet - on y dépanne, dans les mêmes fils, de vraies configs DOSBox et de vrais 486 depuis 2003.",
        pt: "O maior fórum ativo sobre DOS e hardware de PC vintage da internet - resolvendo problemas de configurações reais do DOSBox e de 486 de verdade nos mesmos tópicos desde 2003."
      } },
    { name: "DOSGames.com",
      tint: "#2fb47c",
      url: "https://www.dosgames.com/",
      lang: "International",
      what: {
        en: "Free DOS game downloads and reviews running since 1998, with an active homebrew-author section covering exactly this scene.",
        nl: "Gratis DOS-gamedownloads en -reviews, al sinds 1998 online, met een actieve homebrew-auteurssectie die precies deze scene bestrijkt.",
        de: "Kostenlose DOS-Spiele-Downloads und Rezensionen, seit 1998 online, mit einem aktiven Homebrew-Autoren-Bereich, der genau diese Szene abdeckt.",
        fr: "Téléchargements et critiques de jeux DOS gratuits en ligne depuis 1998, avec une section active dédiée aux auteurs homebrew qui couvre exactement cette scène.",
        pt: "Downloads e resenhas gratuitas de jogos DOS no ar desde 1998, com uma seção ativa de autores homebrew que cobre exatamente essa cena."
      } },
    { name: "DOS haven",
      tint: "#e0865a",
      url: "https://www.doshaven.eu/",
      lang: "International",
      what: {
        en: "A blog and database built specifically around brand-new DOS releases - this shelf's homebrew picks lean on it more than anywhere else.",
        nl: "Een blog en database die specifiek is opgebouwd rond gloednieuwe DOS-releases - de homebrew-keuzes van deze plank leunen hier meer op dan op wat dan ook.",
        de: "Ein Blog und eine Datenbank, die sich gezielt um brandneue DOS-Veröffentlichungen dreht - die Homebrew-Auswahl dieses Regals stützt sich mehr darauf als auf alles andere.",
        fr: "Un blog et une base de données construits spécifiquement autour des toutes nouvelles sorties DOS - les choix homebrew de cette étagère s'y appuient plus que sur toute autre source.",
        pt: "Um blog e banco de dados construídos especificamente em torno de lançamentos DOS novinhos em folha - as escolhas homebrew desta prateleira dependem mais dele do que de qualquer outro lugar."
      } },
    { name: "Cyningstan DOS Games",
      tint: "#e0c05a",
      url: "http://dos.cyningstan.org.uk/",
      lang: "International",
      what: {
        en: "One developer still writing original 8088/CGA-era DOS games and giving away the source - two of them, Barren Planet and The Chambers Beneath, are on this shelf.",
        nl: "Eén ontwikkelaar die nog steeds originele DOS-spellen uit het 8088/CGA-tijdperk schrijft en de broncode weggeeft - twee daarvan, Barren Planet en The Chambers Beneath, staan op deze plank.",
        de: "Ein Entwickler, der noch immer originale DOS-Spiele aus der 8088/CGA-Ära schreibt und den Quellcode verschenkt - zwei davon, Barren Planet und The Chambers Beneath, stehen in diesem Regal.",
        fr: "Un développeur qui écrit encore des jeux DOS originaux de l'ère 8088/CGA et distribue le code source - deux d'entre eux, Barren Planet et The Chambers Beneath, sont sur cette étagère.",
        pt: "Um desenvolvedor que ainda escreve jogos DOS originais da era 8088/CGA e distribui o código-fonte de graça - dois deles, Barren Planet e The Chambers Beneath, estão nesta prateleira."
      } },
    { name: "DOS Games Jam",
      tint: "#c07de0",
      url: "https://itch.io/jam/dos-games-jam",
      lang: "International",
      what: {
        en: "The recurring itch.io jam family - DOSember every December, plus spring, summer and fall runs - that's the actual source of most of this shelf's homebrew, several of them jam entries themselves.",
        nl: "De terugkerende itch.io-jamfamilie - elke december DOSember, plus lente-, zomer- en herfsteditie - is de echte bron van het meeste homebrew op deze plank, waarvan meerdere zelf jam-inzendingen zijn.",
        de: "Die wiederkehrende itch.io-Jam-Familie - jedes Jahr im Dezember DOSember, dazu Frühlings-, Sommer- und Herbstausgaben - ist die eigentliche Quelle für die meisten Homebrews in diesem Regal, von denen einige selbst Jam-Beiträge sind.",
        fr: "La famille de jams itch.io récurrents - DOSember chaque décembre, plus les éditions de printemps, d'été et d'automne - est la véritable source de la plupart des homebrews de cette étagère, dont plusieurs sont eux-mêmes des créations de jam.",
        pt: "A recorrente família de jams do itch.io - o DOSember todo mês de dezembro, além das edições de primavera, verão e outono - é a fonte real da maior parte das homebrews desta prateleira, várias delas próprias participantes de jam."
      } },
    { name: "usebox.net",
      tint: "#e05a7e",
      url: "https://www.usebox.net/jjm/games/",
      lang: "Spain",
      what: {
        en: "Juan J. Martínez's one-man studio, writing genuinely native DOS games this decade and releasing them free under Creative Commons - three of this shelf's homebrews (Alien Intruder, Gold Mine Run! and The Return of Traxtor) are his.",
        nl: "De eenmansstudio van Juan J. Martínez, die dit decennium echt native DOS-spellen schrijft en ze gratis uitbrengt onder Creative Commons - drie homebrews op deze plank (Alien Intruder, Gold Mine Run! en The Return of Traxtor) zijn van hem.",
        de: "Das Ein-Mann-Studio von Juan J. Martínez, das in diesem Jahrzehnt wirklich native DOS-Spiele schreibt und sie kostenlos unter Creative Commons veröffentlicht - drei Homebrews in diesem Regal (Alien Intruder, Gold Mine Run! und The Return of Traxtor) stammen von ihm.",
        fr: "Le studio individuel de Juan J. Martínez, qui écrit cette décennie de vrais jeux DOS natifs et les publie gratuitement sous Creative Commons - trois homebrews de cette étagère (Alien Intruder, Gold Mine Run! et The Return of Traxtor) sont de lui.",
        pt: "O estúdio de uma pessoa só de Juan J. Martínez, que escreve nesta década jogos DOS genuinamente nativos e os lança de graça sob Creative Commons - três homebrews desta prateleira (Alien Intruder, Gold Mine Run! e The Return of Traxtor) são dele."
      } },
    { name: "js-dos",
      tint: "#4fb3bf",
      url: "https://js-dos.com/",
      lang: "Open source",
      what: {
        en: "The open-source DOSBox-in-the-browser project this shelf's player actually runs on under the hood.",
        nl: "Het open-source DOSBox-in-de-browser-project waar de speler van deze plank onder de motorkap eigenlijk op draait.",
        de: "Das Open-Source-Projekt DOSBox-im-Browser, auf dem der Player dieses Regals unter der Haube tatsächlich läuft.",
        fr: "Le projet open source DOSBox-dans-le-navigateur sur lequel tourne réellement, sous le capot, le lecteur de cette étagère.",
        pt: "O projeto de código aberto DOSBox-no-navegador sobre o qual o player desta prateleira realmente roda por baixo dos panos."
      } }
  ],

  // ---- Community --------------------------------------------------------
  // The people keeping this machine documented. Most of what is in the Vault
  // came from these sites; the least it can do is send traffic back. "what"
  // is a translated object, see the note above c64community. videopac.ch
  // added 2026-08-12: source of the German Conquest of the World and Quest
  // for the Rings manuals plus the multi-language glossary in the Wall
  // Street Fortune Hunt one, all three now in their games' Extras sections.
  community: [
    { name: "Odyssey Clube",
      tint: "#2fb47c",
      url: "https://odysseyclube.com",
      lang: "Brazil",
      what: {
        en: "The Brazilian releases: box scans, manuals, magazines and the game descriptions used on those pages here.",
        nl: "De Braziliaanse releases: doosscans, handleidingen, tijdschriften en de spelomschrijvingen die hier gebruikt worden.",
        de: "Die brasilianischen Veröffentlichungen: Verpackungsscans, Anleitungen, Magazine und die Spielbeschreibungen, die hier verwendet werden.",
        fr: "Les éditions brésiliennes : scans de boîtes, notices, magazines et les descriptions de jeux utilisées ici.",
        pt: "As edições brasileiras: digitalizações de caixas, manuais, revistas e as descrições dos jogos usadas aqui."
      } },
    { name: "The Odyssey² Homepage",
      tint: "#5b8def",
      url: "https://odyssey2.info",
      lang: "USA",
      what: {
        en: "William Cassidy's database — every cartridge by region, with prototypes and rumours carefully separated from releases.",
        nl: "William Cassidy's database — elke cartridge per regio, met prototypes en geruchten zorgvuldig gescheiden van echte releases.",
        de: "William Cassidys Datenbank — jedes Modul nach Region, mit Prototypen und Gerüchten sorgfältig von echten Veröffentlichungen getrennt.",
        fr: "La base de données de William Cassidy — chaque cartouche par région, avec prototypes et rumeurs soigneusement distingués des sorties officielles.",
        pt: "O banco de dados de William Cassidy — cada cartucho por região, com protótipos e boatos cuidadosamente separados dos lançamentos reais."
      } },
    { name: "Videopac.nl",
      tint: "#e0865a",
      url: "https://videopac.nl",
      lang: "Netherlands",
      what: {
        en: "Long-running fan site and forum, and the best source on the Jopac line and the French exclusives.",
        nl: "Al jarenlange fansite en forum, en de beste bron over de Jopac-lijn en de Franse exclusieves.",
        de: "Seit Jahren aktive Fanseite und Forum, und die beste Quelle zur Jopac-Reihe und den französischen Exklusivtiteln.",
        fr: "Site de fans et forum actif depuis des années, la meilleure source sur la gamme Jopac et les exclusivités françaises.",
        pt: "Site de fãs e fórum ativo há muitos anos, e a melhor fonte sobre a linha Jopac e os exclusivos franceses."
      } },
    { name: "Videopac.org",
      tint: "#c07de0",
      url: "http://www.videopac.org",
      lang: "International",
      what: {
        en: "Collector's database of cartridge variants, box numbers and packaging.",
        nl: "Verzamelaarsdatabase van cartridge-varianten, doosnummers en verpakking.",
        de: "Sammlerdatenbank zu Modulvarianten, Verpackungsnummern und Verpackung.",
        fr: "Base de données de collectionneurs sur les variantes de cartouches, numéros de boîte et emballages.",
        pt: "Banco de dados de colecionadores sobre variantes de cartuchos, números de caixa e embalagens."
      } },
    { name: "Internet Archive — Odyssey² manuals",
      tint: "#e0c05a",
      url: "https://archive.org/details/odysseymanuals",
      lang: "International",
      what: {
        en: "The scanned manual collection every manual reader in the Vault is drawn from.",
        nl: "De gescande handleidingencollectie waar elke handleiding-lezer in de Vault uit put.",
        de: "Die gescannte Anleitungssammlung, aus der jeder Anleitungs-Reader im Vault stammt.",
        fr: "La collection de notices numérisées dont provient chaque lecteur de notice dans le Vault.",
        pt: "A coleção de manuais digitalizados da qual vem cada leitor de manual do Vault."
      } },
    { name: "Rafael Cardoso — Jogos Odyssey",
      tint: "#e0865a",
      url: "https://www.youtube.com/@heatseekerbr",
      lang: "Brazil",
      what: {
        en: "The author of Route 66, still writing games for this console and posting each one as it comes — over a hundred videos of his own projects.",
        nl: "De maker van Route 66, die nog steeds spellen voor deze console schrijft en elk nieuw project deelt — meer dan honderd video's van zijn eigen werk.",
        de: "Der Autor von Route 66, der immer noch Spiele für diese Konsole schreibt und jedes neue Projekt postet — über hundert Videos seiner eigenen Arbeiten.",
        fr: "L'auteur de Route 66, qui écrit encore des jeux pour cette console et publie chacun d'eux au fil de l'eau — plus d'une centaine de vidéos de ses propres projets.",
        pt: "O autor de Route 66, que ainda escreve jogos para este console e publica cada um assim que fica pronto — mais de cem vídeos de seus próprios projetos."
      } },
    { name: "webretro",
      tint: "#4fb3bf",
      url: "https://github.com/BinBashBanana/webretro",
      lang: "Open source",
      what: {
        en: "The browser front-end for libretro that runs the games here, by BinBashBanana.",
        nl: "De browser-frontend voor libretro die de spellen hier draait, gemaakt door BinBashBanana.",
        de: "Das Browser-Frontend für libretro, das die Spiele hier zum Laufen bringt, von BinBashBanana.",
        fr: "L'interface navigateur pour libretro qui fait tourner les jeux ici, par BinBashBanana.",
        pt: "A interface de navegador para o libretro que roda os jogos aqui, feita por BinBashBanana."
      } },
    { name: "videopac.ch",
      tint: "#8a8f98",
      url: "https://videopac.ch",
      lang: "Switzerland",
      what: {
        en: "A Swiss collector's own boxed copies, scanned and shared — source of the German Conquest of the World and Quest for the Rings manuals in this Vault's Extras sections, plus the multi-language glossary bound into the Wall Street Fortune Hunt one.",
        nl: "De eigen boxed exemplaren van een Zwitserse verzamelaar, gescand en gedeeld — hier komen de Duitse handleidingen van Conquest of the World en Quest for the Rings in de Extras van deze Vault vandaan, plus de meertalige woordenlijst in de handleiding van Wall Street Fortune Hunt.",
        de: "Die eigenen originalverpackten Exemplare eines Schweizer Sammlers, gescannt und geteilt — Quelle der deutschen Anleitungen zu Conquest of the World und Quest for the Rings in den Extras dieses Vaults, sowie des mehrsprachigen Glossars in der Wall-Street-Fortune-Hunt-Anleitung.",
        fr: "Les propres exemplaires en boîte d'un collectionneur suisse, numérisés et partagés — source des notices allemandes de Conquest of the World et Quest for the Rings dans les Extras de ce Vault, ainsi que du glossaire multilingue relié dans celle de Wall Street Fortune Hunt.",
        pt: "Os próprios exemplares originais de um colecionador suíço, digitalizados e compartilhados — fonte dos manuais em alemão de Conquest of the World e Quest for the Rings nos Extras deste Vault, além do glossário multilíngue incluído no manual de Wall Street Fortune Hunt."
      } }
  ]
};
