// "About the group" boxes on demo pages (genre "demo" in genres.js).
// Demos have nothing to control and no manual, so game-page.js shows this
// box instead of the Controls / Controller / Manual sections.
// Texts researched 2026-10-11 from Wikipedia, Demozoo, CSDb and Pouet - keep
// them factual; correct a group here and every page using it follows.
// English is the source text (country/text); "i18n" holds the nl, de, fr, pt
// and ja versions (ja kanji-free, like gamepages-ja.js). Anything missing
// falls back to English.
// DEMO_GROUP_OF maps a game id to one or more group slugs (co-productions).
// DEMO_NOTES is the "this is a demo" line at the bottom of the box, per
// language; DEMO_NOTE_OF says which one a page uses. The English wording is
// the same as the note in gamepages.js, which stays the source for English.
window.DEMO_GROUPS = {
 "pixar-theband": {
  "name": "Pixar & The Band",
  "country": "Belgium (The Band)",
  "founded": 1988,
  "text": "Megamaid is credited to two Amiga groups. The Band was a cracking and demo group founded in Belgium in February 1988 by Duncan. It also had sections in France, England and the USA. Its first release was a crack of Beyond the Ice Palace in March 1988, and in 1989 it recruited three Norwegians from The Morons: The Dude, Lightfoot and Mr. Mac. Pixar was a much smaller group that released a few productions together with The Band in 1989, including Megamaid, which placed 5th in the Amiga demo competition at the IT, Rawhead, The Band and IMP-666 Megaparty in 1989.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/2938/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=2863"
   },
   {
    "label": "Demozoo (Pixar)",
    "url": "https://demozoo.org/groups/108618/"
   }
  ],
  "i18n": {
   "nl": {
    "country": "België (The Band)",
    "text": "Megamaid wordt toegeschreven aan twee Amiga-groepen. The Band was een crack- en demogroep, in februari 1988 in België opgericht door Duncan. De groep had ook afdelingen in Frankrijk, Engeland en de VS. De eerste release was een crack van Beyond the Ice Palace in maart 1988, en in 1989 werden drie Noren van The Morons geronseld: The Dude, Lightfoot en Mr. Mac. Pixar was een veel kleinere groep die in 1989 enkele producties samen met The Band uitbracht, waaronder Megamaid, dat in 1989 vijfde werd in de Amiga-democompetitie op de IT, Rawhead, The Band and IMP-666 Megaparty."
   },
   "de": {
    "country": "Belgien (The Band)",
    "text": "Megamaid wird zwei Amiga-Gruppen zugeschrieben. The Band war eine Crack- und Demogruppe, die im Februar 1988 von Duncan in Belgien gegründet wurde. Sie hatte außerdem Sektionen in Frankreich, England und den USA. Ihre erste Veröffentlichung war im März 1988 ein Crack von Beyond the Ice Palace, und 1989 warb sie drei Norweger von The Morons an: The Dude, Lightfoot und Mr. Mac. Pixar war eine deutlich kleinere Gruppe, die 1989 einige Produktionen gemeinsam mit The Band veröffentlichte, darunter Megamaid, das 1989 beim IT, Rawhead, The Band and IMP-666 Megaparty den 5. Platz im Amiga-Demowettbewerb belegte."
   },
   "fr": {
    "country": "Belgique (The Band)",
    "text": "Megamaid est attribué à deux groupes Amiga. The Band était un groupe de cracking et de démo fondé en Belgique en février 1988 par Duncan. Il avait aussi des sections en France, en Angleterre et aux États-Unis. Sa première sortie fut un crack de Beyond the Ice Palace en mars 1988, et en 1989 il recruta trois Norvégiens issus de The Morons : The Dude, Lightfoot et Mr. Mac. Pixar était un groupe bien plus petit, qui sortit quelques productions avec The Band en 1989, dont Megamaid, classé 5e de la compétition de démos Amiga à l'IT, Rawhead, The Band and IMP-666 Megaparty en 1989."
   },
   "pt": {
    "country": "Bélgica (The Band)",
    "text": "Megamaid é creditado a dois grupos de Amiga. The Band foi um grupo de cracking e demos fundado na Bélgica em fevereiro de 1988 por Duncan. Também tinha seções na França, na Inglaterra e nos EUA. Seu primeiro lançamento foi um crack de Beyond the Ice Palace em março de 1988 e, em 1989, recrutou três noruegueses do The Morons: The Dude, Lightfoot e Mr. Mac. Pixar era um grupo bem menor que lançou algumas produções junto com The Band em 1989, incluindo Megamaid, que ficou em 5º lugar na competição de demos de Amiga na IT, Rawhead, The Band and IMP-666 Megaparty em 1989."
   },
   "ja": {
    "country": "ベルギー (The Band)",
    "text": "Megamaidは 2つの Amigaグループの さくひんと されています。The Bandは 1988ねん 2がつに ベルギーで Duncanが つくった、クラックと デモの グループです。フランス、イギリス、アメリカにも ぶが ありました。さいしょの さくひんは 1988ねん 3がつの Beyond the Ice Palaceの クラックで、1989ねんには The Moronsから ノルウェーの 3にん (The Dude、Lightfoot、Mr. Mac)が なかまに なりました。Pixarは もっと ちいさな グループで、1989ねんに The Bandと いっしょに いくつかの さくひんを だしました。そのひとつが Megamaidで、1989ねんの IT, Rawhead, The Band and IMP-666 Megapartyの Amigaデモ コンペで 5いに なりました。"
   }
  }
 },
 "spaceballs": {
  "name": "Spaceballs",
  "country": "Norway",
  "founded": 1989,
  "text": "Spaceballs is a Norwegian demogroup founded in Halden in 1988–89 by Rune Winsevik (Dark Helmet). Its breakthrough came with State of the Art, which won the Amiga demo competition at The Party in December 1992. Mobile: Destination Unknown placed 3rd at The Gathering in 1993, and the sequel 9 Fingers placed 4th at The Party later that year. Notable members included Dark Helmet, Lone Starr, Major Asshole, Yoghurt and Slummy. After 13 years on the Amiga, the group also began releasing Commodore 64 demos in 2002.",
  "links": [
   {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Spaceballs_(demogroup)"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/3/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=68"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Noorwegen",
    "text": "Spaceballs is een Noorse demogroep, in 1988–89 in Halden opgericht door Rune Winsevik (Dark Helmet). De doorbraak kwam met State of the Art, dat in december 1992 de Amiga-democompetitie op The Party won. Mobile: Destination Unknown werd in 1993 derde op The Gathering, en het vervolg 9 Fingers werd later dat jaar vierde op The Party. Bekende leden waren onder meer Dark Helmet, Lone Starr, Major Asshole, Yoghurt en Slummy. Na 13 jaar op de Amiga begon de groep in 2002 ook Commodore 64-demo's uit te brengen."
   },
   "de": {
    "country": "Norwegen",
    "text": "Spaceballs ist eine norwegische Demogruppe, die 1988–89 von Rune Winsevik (Dark Helmet) in Halden gegründet wurde. Der Durchbruch kam mit State of the Art, das im Dezember 1992 den Amiga-Demowettbewerb auf der The Party gewann. Mobile: Destination Unknown belegte 1993 auf der The Gathering den 3. Platz, und der Nachfolger 9 Fingers im selben Jahr später auf der The Party den 4. Platz. Zu den bekannten Mitgliedern zählten Dark Helmet, Lone Starr, Major Asshole, Yoghurt und Slummy. Nach 13 Jahren auf dem Amiga begann die Gruppe 2002 außerdem, Commodore 64-Demos zu veröffentlichen."
   },
   "fr": {
    "country": "Norvège",
    "text": "Spaceballs est un groupe de démo norvégien fondé à Halden en 1988–89 par Rune Winsevik (Dark Helmet). Sa percée vint avec State of the Art, qui remporta la compétition de démos Amiga à The Party en décembre 1992. Mobile: Destination Unknown se classa 3e à The Gathering en 1993, et sa suite 9 Fingers se classa 4e à The Party plus tard la même année. Parmi les membres notables figuraient Dark Helmet, Lone Starr, Major Asshole, Yoghurt et Slummy. Après 13 ans sur Amiga, le groupe commença aussi à sortir des démos Commodore 64 en 2002."
   },
   "pt": {
    "country": "Noruega",
    "text": "Spaceballs é um grupo de demos norueguês fundado em Halden em 1988–89 por Rune Winsevik (Dark Helmet). Seu grande sucesso veio com State of the Art, que venceu a competição de demos de Amiga na The Party em dezembro de 1992. Mobile: Destination Unknown ficou em 3º lugar na The Gathering em 1993, e a continuação 9 Fingers ficou em 4º lugar na The Party mais tarde naquele ano. Entre os membros de destaque estavam Dark Helmet, Lone Starr, Major Asshole, Yoghurt e Slummy. Depois de 13 anos no Amiga, o grupo também passou a lançar demos de Commodore 64 em 2002."
   },
   "ja": {
    "country": "ノルウェー",
    "text": "Spaceballsは ノルウェーの デモグループで、1988–89ねんに Haldenで Rune Winsevik (Dark Helmet)が つくりました。ゆうめいに なった きっかけは State of the Artで、1992ねん 12がつの The Partyの Amigaデモ コンペで ゆうしょう しました。Mobile: Destination Unknownは 1993ねんの The Gatheringで 3い、つづきの 9 Fingersは その としの あとに ひらかれた The Partyで 4いでした。おもな メンバーは Dark Helmet、Lone Starr、Major Asshole、Yoghurt、Slummyです。Amigaで 13ねん かつどうした あと、2002ねんから Commodore 64の デモも だしはじめました。"
   }
  }
 },
 "phenomena": {
  "name": "Phenomena",
  "country": "Sweden",
  "founded": 1987,
  "text": "Phenomena is a Swedish Amiga demogroup founded in early 1987 by Avalon and Silmarillion. Its 1989 Megademo won the Equinox and Horizon Party and was shown on the Swedish TV programme Bit för Bit. Members Megaman, Terminator and Firefox joined in 1989 and later worked in the Amiga games industry, with Firefox as the group's prolific musician. From 1990 to 1993 Phenomena helped organise demoparties every year. Enigma won the Amiga demo competition at the Anarchy Easter Party in 1991.",
  "links": [
   {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Phenomena_(Amiga_demogroup)"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/662/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=193"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Zweden",
    "text": "Phenomena is een Zweedse Amiga-demogroep, begin 1987 opgericht door Avalon en Silmarillion. Hun Megademo uit 1989 won de Equinox and Horizon Party en was te zien in het Zweedse tv-programma Bit för Bit. De leden Megaman, Terminator en Firefox sloten zich in 1989 aan en werkten later in de Amiga-gamesindustrie, waarbij Firefox de productieve muzikant van de groep was. Van 1990 tot 1993 hielp Phenomena elk jaar demoparty's te organiseren. Enigma won in 1991 de Amiga-democompetitie op de Anarchy Easter Party."
   },
   "de": {
    "country": "Schweden",
    "text": "Phenomena ist eine schwedische Amiga-Demogruppe, die Anfang 1987 von Avalon und Silmarillion gegründet wurde. Ihre Megademo von 1989 gewann die Equinox and Horizon Party und wurde in der schwedischen Fernsehsendung Bit för Bit gezeigt. Die Mitglieder Megaman, Terminator und Firefox stießen 1989 dazu und arbeiteten später in der Amiga-Spielebranche, wobei Firefox der produktive Musiker der Gruppe war. Von 1990 bis 1993 half Phenomena jedes Jahr bei der Organisation von Demopartys. Enigma gewann 1991 den Amiga-Demowettbewerb auf der Anarchy Easter Party."
   },
   "fr": {
    "country": "Suède",
    "text": "Phenomena est un groupe de démo Amiga suédois fondé début 1987 par Avalon et Silmarillion. Sa Megademo de 1989 remporta l'Equinox and Horizon Party et fut diffusée dans l'émission de télévision suédoise Bit för Bit. Les membres Megaman, Terminator et Firefox le rejoignirent en 1989 et travaillèrent plus tard dans l'industrie du jeu vidéo Amiga, Firefox étant le musicien prolifique du groupe. De 1990 à 1993, Phenomena contribua chaque année à l'organisation de demoparties. Enigma remporta la compétition de démos Amiga à l'Anarchy Easter Party en 1991."
   },
   "pt": {
    "country": "Suécia",
    "text": "Phenomena é um grupo de demos sueco de Amiga fundado no início de 1987 por Avalon e Silmarillion. Sua Megademo de 1989 venceu a Equinox and Horizon Party e foi exibida no programa de TV sueco Bit för Bit. Os membros Megaman, Terminator e Firefox entraram em 1989 e depois trabalharam na indústria de jogos de Amiga, sendo Firefox o prolífico músico do grupo. De 1990 a 1993, o Phenomena ajudou a organizar demopartys todos os anos. Enigma venceu a competição de demos de Amiga na Anarchy Easter Party em 1991."
   },
   "ja": {
    "country": "スウェーデン",
    "text": "Phenomenaは スウェーデンの Amigaの デモグループで、1987ねんの はじめに Avalonと Silmarillionが つくりました。1989ねんの Megademoは Equinox and Horizon Partyで ゆうしょうし、スウェーデンの テレビばんぐみ Bit för Bitで しょうかい されました。Megaman、Terminator、Firefoxは 1989ねんに くわわり、のちに Amigaの ゲームぎょうかいで はたらきました。Firefoxは グループの たくさんの きょくを つくった ミュージシャンです。1990ねんから 1993ねんまで、Phenomenaは まいとし デモパーティを ひらく てつだいを しました。Enigmaは 1991ねんの Anarchy Easter Partyの Amigaデモ コンペで ゆうしょう しました。"
   }
  }
 },
 "scoopex": {
  "name": "Scoopex",
  "country": "Austria (later international sections)",
  "founded": 1989,
  "text": "Scoopex was formed in Austria in early 1989 by former members of Megaforce, as an Amiga demo and cracking group. It later had sections in several countries, including Sweden, Finland, Denmark, Norway, Germany and France. The group was led by Ranger, then Trade, then Antibyte. Mental Hangover, made by the Finnish section, won the demo competition at the Swedish Elite Easter Conference in April 1990 and is often cited as an early example of the trackmo. Later wins included My Kingdom (with Haujobb) at The Party 1997, and the group has continued releasing productions into the 2020s.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/361/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=415"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Oostenrijk (later internationale afdelingen)",
    "text": "Scoopex werd begin 1989 in Oostenrijk gevormd door voormalige leden van Megaforce, als Amiga-demo- en crackgroep. Later kreeg de groep afdelingen in meerdere landen, waaronder Zweden, Finland, Denemarken, Noorwegen, Duitsland en Frankrijk. De groep werd geleid door Ranger, daarna Trade, daarna Antibyte. Mental Hangover, gemaakt door de Finse afdeling, won in april 1990 de democompetitie op de Swedish Elite Easter Conference en wordt vaak genoemd als vroeg voorbeeld van de trackmo. Latere overwinningen waren onder meer My Kingdom (met Haujobb) op The Party 1997, en de groep blijft producties uitbrengen tot in de jaren 2020."
   },
   "de": {
    "country": "Österreich (später internationale Sektionen)",
    "text": "Scoopex wurde Anfang 1989 in Österreich von ehemaligen Mitgliedern von Megaforce als Amiga-Demo- und Crackergruppe gegründet. Später hatte die Gruppe Sektionen in mehreren Ländern, darunter Schweden, Finnland, Dänemark, Norwegen, Deutschland und Frankreich. Geleitet wurde sie zuerst von Ranger, dann von Trade und dann von Antibyte. Mental Hangover, entstanden in der finnischen Sektion, gewann im April 1990 den Demowettbewerb auf der Swedish Elite Easter Conference und wird oft als frühes Beispiel für das Trackmo genannt. Zu den späteren Siegen zählte My Kingdom (mit Haujobb) auf der The Party 1997, und die Gruppe veröffentlicht bis in die 2020er Jahre weiter Produktionen."
   },
   "fr": {
    "country": "Autriche (puis sections internationales)",
    "text": "Scoopex fut formé en Autriche début 1989 par d'anciens membres de Megaforce, comme groupe de démo et de cracking sur Amiga. Il eut ensuite des sections dans plusieurs pays, dont la Suède, la Finlande, le Danemark, la Norvège, l'Allemagne et la France. Le groupe fut dirigé par Ranger, puis Trade, puis Antibyte. Mental Hangover, réalisé par la section finlandaise, remporta la compétition de démos à la Swedish Elite Easter Conference en avril 1990 et est souvent cité comme un des premiers exemples de trackmo. Parmi les victoires ultérieures, My Kingdom (avec Haujobb) à The Party 1997, et le groupe a continué à sortir des productions jusque dans les années 2020."
   },
   "pt": {
    "country": "Áustria (depois com seções internacionais)",
    "text": "Scoopex foi formado na Áustria no início de 1989 por ex-membros do Megaforce, como um grupo de demos e cracking de Amiga. Mais tarde teve seções em vários países, incluindo Suécia, Finlândia, Dinamarca, Noruega, Alemanha e França. O grupo foi liderado por Ranger, depois Trade e depois Antibyte. Mental Hangover, feito pela seção finlandesa, venceu a competição de demos na Swedish Elite Easter Conference em abril de 1990 e é frequentemente citado como um dos primeiros exemplos de trackmo. Entre as vitórias posteriores está My Kingdom (com Haujobb) na The Party 1997, e o grupo continua lançando produções na década de 2020."
   },
   "ja": {
    "country": "オーストリア (のちに いろいろな くにに ぶが できた)",
    "text": "Scoopexは 1989ねんの はじめに オーストリアで、Megaforceの もと メンバーが つくった Amigaの デモと クラックの グループです。のちに スウェーデン、フィンランド、デンマーク、ノルウェー、ドイツ、フランスなど、いくつもの くにに ぶが できました。リーダーは Ranger、つぎに Trade、そのつぎに Antibyteでした。フィンランドの ぶが つくった Mental Hangoverは、1990ねん 4がつの Swedish Elite Easter Conferenceの デモ コンペで ゆうしょうし、トラックモの はやい れいとして よく あげられます。そのあとの ゆうしょうには、The Party 1997の My Kingdom (Haujobbと いっしょ)が あります。グループは 2020ねんだいにも さくひんを だしつづけています。"
   }
  }
 },
 "sanity": {
  "name": "Sanity",
  "country": "Germany",
  "founded": 1990,
  "text": "Sanity is a German Amiga demogroup that began in March 1990 with the musicdisk Monthly Top Ten Gamesounds. Its founding members included Panther, Vindicator and Hawk. In August 1991 the group briefly declared itself dead with Sanity Is Dead, then re-formed a few days later. In 1992–93 it released World of Commodore, Interference and Arte, and Arte placed 3rd in the Amiga demo competition at The Party 1993. Members over the years included Chaos, Jester, Cougar and Mok, and in October 1994 the Brain Degenerator charts ranked Sanity the number one group.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/146/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=164"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Duitsland",
    "text": "Sanity is een Duitse Amiga-demogroep die in maart 1990 begon met de musicdisk Monthly Top Ten Gamesounds. Tot de oprichters behoorden Panther, Vindicator en Hawk. In augustus 1991 verklaarde de groep zichzelf kort dood met Sanity Is Dead, om een paar dagen later weer op te staan. In 1992–93 bracht de groep World of Commodore, Interference en Arte uit, en Arte werd derde in de Amiga-democompetitie op The Party 1993. Door de jaren heen waren Chaos, Jester, Cougar en Mok onder de leden, en in oktober 1994 zetten de Brain Degenerator-hitlijsten Sanity op nummer één van de groepen."
   },
   "de": {
    "country": "Deutschland",
    "text": "Sanity ist eine deutsche Amiga-Demogruppe, die im März 1990 mit der Musikdisk Monthly Top Ten Gamesounds begann. Zu den Gründungsmitgliedern gehörten Panther, Vindicator und Hawk. Im August 1991 erklärte sich die Gruppe mit Sanity Is Dead kurzzeitig für tot und formierte sich wenige Tage später neu. 1992–93 veröffentlichte sie World of Commodore, Interference und Arte, und Arte belegte auf der The Party 1993 den 3. Platz im Amiga-Demowettbewerb. Zu den Mitgliedern im Lauf der Jahre zählten Chaos, Jester, Cougar und Mok, und im Oktober 1994 führten die Brain-Degenerator-Charts Sanity als Gruppe auf Platz eins."
   },
   "fr": {
    "country": "Allemagne",
    "text": "Sanity est un groupe de démo Amiga allemand qui débuta en mars 1990 avec le musicdisk Monthly Top Ten Gamesounds. Parmi ses membres fondateurs figuraient Panther, Vindicator et Hawk. En août 1991, le groupe se déclara brièvement mort avec Sanity Is Dead, puis se reforma quelques jours plus tard. En 1992–93, il sortit World of Commodore, Interference et Arte, et Arte se classa 3e de la compétition de démos Amiga à The Party 1993. Parmi les membres au fil des ans figuraient Chaos, Jester, Cougar et Mok, et en octobre 1994 les classements Brain Degenerator placèrent Sanity au rang de groupe numéro un."
   },
   "pt": {
    "country": "Alemanha",
    "text": "Sanity é um grupo de demos alemão de Amiga que começou em março de 1990 com o musicdisk Monthly Top Ten Gamesounds. Entre os membros fundadores estavam Panther, Vindicator e Hawk. Em agosto de 1991, o grupo se declarou brevemente morto com Sanity Is Dead e voltou a se formar poucos dias depois. Em 1992–93 lançou World of Commodore, Interference e Arte, e Arte ficou em 3º lugar na competição de demos de Amiga na The Party 1993. Ao longo dos anos, passaram pelo grupo Chaos, Jester, Cougar e Mok, e em outubro de 1994 as paradas do Brain Degenerator colocaram o Sanity como o grupo número um."
   },
   "ja": {
    "country": "ドイツ",
    "text": "Sanityは ドイツの Amigaの デモグループで、1990ねん 3がつに ミュージックディスク Monthly Top Ten Gamesoundsで はじまりました。つくった メンバーには Panther、Vindicator、Hawkが います。1991ねん 8がつ、グループは Sanity Is Deadで すこしの あいだ 「しんだ」と せんげんしましたが、すうじつ あとに また つくりなおされました。1992–93ねんに World of Commodore、Interference、Arteを だし、Arteは 1993ねんの The Partyの Amigaデモ コンペで 3いでした。いろいろな メンバーが いて、Chaos、Jester、Cougar、Mokなどが います。1994ねん 10がつ、Brain Degeneratorの チャートで Sanityは 1いの グループに なりました。"
   }
  }
 },
 "silents": {
  "name": "The Silents",
  "country": "Sweden",
  "founded": 1987,
  "text": "The Silents was a Swedish group founded in May 1987 by Axel F, Benny-Hill, Snokie and Mawda, mostly from the former XL-Crackers. It started on the Commodore 64 as a cracking group, and in early 1988 most members moved to the Amiga, where the group turned to demos. It later had French, Norwegian, UK and German sections. Global Trash won the Amiga demo competition at the Amiga Summit Convention in 1991. The group was active until 2003, with a late run of PC releases.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/101/"
   },
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=1099"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=197"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Zweden",
    "text": "The Silents was een Zweedse groep, in mei 1987 opgericht door Axel F, Benny-Hill, Snokie en Mawda, grotendeels afkomstig van de voormalige XL-Crackers. Ze begonnen op de Commodore 64 als crackgroep, en begin 1988 stapten de meeste leden over op de Amiga, waar de groep zich op demo's richtte. Later kreeg de groep Franse, Noorse, Britse en Duitse afdelingen. Global Trash won in 1991 de Amiga-democompetitie op de Amiga Summit Convention. De groep was actief tot 2003, met een late reeks pc-releases."
   },
   "de": {
    "country": "Schweden",
    "text": "The Silents war eine schwedische Gruppe, die im Mai 1987 von Axel F, Benny-Hill, Snokie und Mawda gegründet wurde, größtenteils aus den ehemaligen XL-Crackers. Sie begann auf dem Commodore 64 als Crackergruppe, und Anfang 1988 wechselten die meisten Mitglieder zum Amiga, wo sich die Gruppe den Demos zuwandte. Später hatte sie französische, norwegische, britische und deutsche Sektionen. Global Trash gewann 1991 den Amiga-Demowettbewerb auf der Amiga Summit Convention. Die Gruppe war bis 2003 aktiv, mit einer späten Reihe von PC-Veröffentlichungen."
   },
   "fr": {
    "country": "Suède",
    "text": "The Silents était un groupe suédois fondé en mai 1987 par Axel F, Benny-Hill, Snokie et Mawda, pour la plupart issus des anciens XL-Crackers. Il débuta sur Commodore 64 comme groupe de cracking, et début 1988 la plupart des membres passèrent sur Amiga, où le groupe se tourna vers les démos. Il eut ensuite des sections française, norvégienne, britannique et allemande. Global Trash remporta la compétition de démos Amiga à l'Amiga Summit Convention en 1991. Le groupe fut actif jusqu'en 2003, avec une série tardive de sorties sur PC."
   },
   "pt": {
    "country": "Suécia",
    "text": "The Silents foi um grupo sueco fundado em maio de 1987 por Axel F, Benny-Hill, Snokie e Mawda, em sua maioria vindos do antigo XL-Crackers. Começou no Commodore 64 como grupo de cracking e, no início de 1988, a maioria dos membros migrou para o Amiga, onde o grupo passou a fazer demos. Mais tarde teve seções na França, na Noruega, no Reino Unido e na Alemanha. Global Trash venceu a competição de demos de Amiga na Amiga Summit Convention em 1991. O grupo esteve ativo até 2003, com uma fase final de lançamentos para PC."
   },
   "ja": {
    "country": "スウェーデン",
    "text": "The Silentsは 1987ねん 5がつに Axel F、Benny-Hill、Snokie、Mawdaが つくった スウェーデンの グループで、メンバーの おおくは もとの XL-Crackersの ひとたちでした。さいしょは Commodore 64の クラックグループで、1988ねんの はじめに ほとんどの メンバーが Amigaに うつり、デモを つくる ように なりました。のちに フランス、ノルウェー、イギリス、ドイツにも ぶが できました。Global Trashは 1991ねんの Amiga Summit Conventionの Amigaデモ コンペで ゆうしょう しました。グループは 2003ねんまで かつどうし、おわりの ころには PCの さくひんも だしました。"
   }
  }
 },
 "razor1911": {
  "name": "Razor 1911",
  "country": "Norway",
  "founded": 1985,
  "text": "Razor 1911 was founded in Norway in 1985 by Doctor No, Insane TTM and Sector9 as a Commodore 64 cracking group. The number 1911 is hexadecimal for 777. Between 1987 and 1988 the group moved to the Amiga, where it both cracked games and coded demos. Voyage placed 3rd in the Amiga demo competition at The Party 1991. The group later moved to the PC, and its 64k intro Insert No Coins won the public choice award at the 2011 Scene.org Awards.",
  "links": [
   {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Razor_1911"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/519/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=158"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Noorwegen",
    "text": "Razor 1911 werd in 1985 in Noorwegen opgericht door Doctor No, Insane TTM en Sector9 als Commodore 64-crackgroep. Het getal 1911 is hexadecimaal voor 777. Tussen 1987 en 1988 stapte de groep over op de Amiga, waar ze zowel games crackte als demo's codeerde. Voyage werd derde in de Amiga-democompetitie op The Party 1991. Later stapte de groep over op de pc, en hun 64k-intro Insert No Coins won de publieksprijs bij de Scene.org Awards 2011."
   },
   "de": {
    "country": "Norwegen",
    "text": "Razor 1911 wurde 1985 in Norwegen von Doctor No, Insane TTM und Sector9 als Commodore 64-Crackergruppe gegründet. Die Zahl 1911 ist hexadezimal 777. Zwischen 1987 und 1988 wechselte die Gruppe zum Amiga, wo sie sowohl Spiele crackte als auch Demos programmierte. Voyage belegte auf der The Party 1991 den 3. Platz im Amiga-Demowettbewerb. Später wechselte die Gruppe zum PC, und ihr 64k-Intro Insert No Coins gewann bei den Scene.org Awards 2011 den Publikumspreis."
   },
   "fr": {
    "country": "Norvège",
    "text": "Razor 1911 fut fondé en Norvège en 1985 par Doctor No, Insane TTM et Sector9 comme groupe de cracking Commodore 64. Le nombre 1911 est l'hexadécimal de 777. Entre 1987 et 1988, le groupe passa sur Amiga, où il crackait des jeux et programmait aussi des démos. Voyage se classa 3e de la compétition de démos Amiga à The Party 1991. Le groupe passa ensuite sur PC, et son intro de 64k Insert No Coins remporta le prix du choix du public aux Scene.org Awards 2011."
   },
   "pt": {
    "country": "Noruega",
    "text": "Razor 1911 foi fundado na Noruega em 1985 por Doctor No, Insane TTM e Sector9 como um grupo de cracking de Commodore 64. O número 1911 é hexadecimal para 777. Entre 1987 e 1988, o grupo migrou para o Amiga, onde crackeava jogos e programava demos. Voyage ficou em 3º lugar na competição de demos de Amiga na The Party 1991. Mais tarde o grupo passou para o PC, e sua intro de 64k Insert No Coins ganhou o prêmio de escolha do público no Scene.org Awards de 2011."
   },
   "ja": {
    "country": "ノルウェー",
    "text": "Razor 1911は 1985ねんに ノルウェーで Doctor No、Insane TTM、Sector9が つくった、Commodore 64の クラックグループです。1911という かずは、16しんほうで 777です。1987ねんから 1988ねんの あいだに Amigaに うつり、ゲームの クラックも デモの プログラムも しました。Voyageは 1991ねんの The Partyの Amigaデモ コンペで 3いでした。のちに PCに うつり、64kの イントロ Insert No Coinsが 2011ねんの Scene.org Awardsで パブリックチョイスしょうを とりました。"
   }
  }
 },
 "lemon": {
  "name": "Lemon.",
  "country": "Multinational (members from three countries, including Norway)",
  "founded": 1993,
  "text": "Lemon. is an Amiga demogroup formed in February 1993 by 16 members who left Anarchy, with Facet as main organiser. In mid-1993 several Norwegians joined from Andromeda. The group released Rink A Dink that year and co-organised The Party 1993, where it released its final intro, Dotro, before disbanding. Several members later joined Razor 1911, and Hannibal and J.A.D.E. went on to found the game developer Lemon. The group returned for Rink A Dink: Redux, which won the oldskool demo competition at Revision 2013.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/614/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=202"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Multinationaal (leden uit drie landen, waaronder Noorwegen)",
    "text": "Lemon. is een Amiga-demogroep, in februari 1993 gevormd door 16 leden die Anarchy verlieten, met Facet als belangrijkste organisator. Medio 1993 sloten zich verschillende Noren van Andromeda aan. De groep bracht dat jaar Rink A Dink uit en organiseerde The Party 1993 mee, waar ze hun laatste intro, Dotro, uitbrachten voordat de groep ophield te bestaan. Verschillende leden voegden zich later bij Razor 1911, en Hannibal en J.A.D.E. richtten daarna de gameontwikkelaar Lemon op. De groep keerde terug met Rink A Dink: Redux, dat de oldskool-democompetitie op Revision 2013 won."
   },
   "de": {
    "country": "Multinational (Mitglieder aus drei Ländern, darunter Norwegen)",
    "text": "Lemon. ist eine Amiga-Demogruppe, die im Februar 1993 von 16 Mitgliedern gegründet wurde, die Anarchy verlassen hatten, mit Facet als Hauptorganisator. Mitte 1993 stießen mehrere Norweger von Andromeda dazu. Die Gruppe veröffentlichte in jenem Jahr Rink A Dink und organisierte die The Party 1993 mit, wo sie ihr letztes Intro, Dotro, veröffentlichte, bevor sie sich auflöste. Mehrere Mitglieder wechselten später zu Razor 1911, und Hannibal und J.A.D.E. gründeten anschließend den Spieleentwickler Lemon. Die Gruppe kehrte mit Rink A Dink: Redux zurück, das auf der Revision 2013 den Oldskool-Demowettbewerb gewann."
   },
   "fr": {
    "country": "Multinational (membres de trois pays, dont la Norvège)",
    "text": "Lemon. est un groupe de démo Amiga formé en février 1993 par 16 membres ayant quitté Anarchy, avec Facet comme principal organisateur. À la mi-1993, plusieurs Norvégiens venus d'Andromeda le rejoignirent. Le groupe sortit Rink A Dink cette année-là et coorganisa The Party 1993, où il sortit sa dernière intro, Dotro, avant de se dissoudre. Plusieurs membres rejoignirent plus tard Razor 1911, et Hannibal et J.A.D.E. fondèrent ensuite le développeur de jeux Lemon. Le groupe revint avec Rink A Dink: Redux, qui remporta la compétition de démos oldskool à Revision 2013."
   },
   "pt": {
    "country": "Multinacional (membros de três países, incluindo a Noruega)",
    "text": "Lemon. é um grupo de demos de Amiga formado em fevereiro de 1993 por 16 membros que saíram do Anarchy, tendo Facet como principal organizador. Em meados de 1993, vários noruegueses vieram do Andromeda. O grupo lançou Rink A Dink naquele ano e coorganizou a The Party 1993, onde lançou sua última intro, Dotro, antes de se dissolver. Vários membros entraram depois no Razor 1911, e Hannibal e J.A.D.E. passaram a fundar a desenvolvedora de jogos Lemon. O grupo voltou com Rink A Dink: Redux, que venceu a competição de demos oldskool na Revision 2013."
   },
   "ja": {
    "country": "たこくせき (ノルウェーを ふくむ 3つの くにの メンバー)",
    "text": "Lemon.は 1993ねん 2がつに、Anarchyを ぬけた 16にんが つくった Amigaの デモグループで、Facetが まとめやくでした。1993ねんの なかごろ、Andromedaから ノルウェーの メンバーが なんにんか くわわりました。その としに Rink A Dinkを だし、The Party 1993を いっしょに ひらいて、さいごの イントロ Dotroを だして かいさんしました。のちに なんにんかの メンバーは Razor 1911に はいり、Hannibalと J.A.D.E.は ゲームかいはつがいしゃ Lemonを つくりました。グループは Rink A Dink: Reduxで もどってきて、Revision 2013の オールドスクール デモ コンペで ゆうしょう しました。"
   }
  }
 },
 "talent": {
  "name": "Talent",
  "country": "Norway",
  "founded": 1991,
  "text": "Talent is a Norwegian Amiga and PC demogroup founded in September 1991 at the Razor 1911 and IMP-666 Amiga Conference in Arendal. Most of its original members came from Hamar. Its first production, Neverending Fantasies, was released at that party. Q.E.D. placed 4th in the Amiga demo competition at The Gathering 1993, and its AGA sequel Q.E.D. 2 placed 4th there the following year. Prominent members included Boo, Orome and Jukebox, and the group later moved to the PC with demos such as Dreamscape and Possibly Maybe.",
  "links": [
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/292/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=39"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Noorwegen",
    "text": "Talent is een Noorse Amiga- en pc-demogroep, in september 1991 opgericht op de Razor 1911 and IMP-666 Amiga Conference in Arendal. De meeste oorspronkelijke leden kwamen uit Hamar. De eerste productie, Neverending Fantasies, werd op die party uitgebracht. Q.E.D. werd vierde in de Amiga-democompetitie op The Gathering 1993, en het AGA-vervolg Q.E.D. 2 werd daar het jaar erop ook vierde. Bekende leden waren onder meer Boo, Orome en Jukebox, en de groep stapte later over op de pc met demo's als Dreamscape en Possibly Maybe."
   },
   "de": {
    "country": "Norwegen",
    "text": "Talent ist eine norwegische Amiga- und PC-Demogruppe, die im September 1991 auf der Razor 1911 and IMP-666 Amiga Conference in Arendal gegründet wurde. Die meisten der ursprünglichen Mitglieder stammten aus Hamar. Ihre erste Produktion, Neverending Fantasies, erschien auf dieser Party. Q.E.D. belegte auf der The Gathering 1993 den 4. Platz im Amiga-Demowettbewerb, und der AGA-Nachfolger Q.E.D. 2 belegte dort im folgenden Jahr ebenfalls den 4. Platz. Zu den bekannten Mitgliedern zählten Boo, Orome und Jukebox, und die Gruppe wechselte später mit Demos wie Dreamscape und Possibly Maybe zum PC."
   },
   "fr": {
    "country": "Norvège",
    "text": "Talent est un groupe de démo norvégien sur Amiga et PC fondé en septembre 1991 à la Razor 1911 and IMP-666 Amiga Conference à Arendal. La plupart de ses membres d'origine venaient de Hamar. Sa première production, Neverending Fantasies, fut publiée lors de cette party. Q.E.D. se classa 4e de la compétition de démos Amiga à The Gathering 1993, et sa suite AGA Q.E.D. 2 s'y classa 4e l'année suivante. Parmi les membres marquants figuraient Boo, Orome et Jukebox, et le groupe passa ensuite sur PC avec des démos telles que Dreamscape et Possibly Maybe."
   },
   "pt": {
    "country": "Noruega",
    "text": "Talent é um grupo norueguês de demos de Amiga e PC fundado em setembro de 1991 na Razor 1911 and IMP-666 Amiga Conference em Arendal. A maioria dos membros originais era de Hamar. Sua primeira produção, Neverending Fantasies, foi lançada nessa festa. Q.E.D. ficou em 4º lugar na competição de demos de Amiga na The Gathering 1993, e sua continuação para AGA, Q.E.D. 2, ficou em 4º lugar no mesmo evento no ano seguinte. Entre os membros de destaque estavam Boo, Orome e Jukebox, e o grupo depois migrou para o PC com demos como Dreamscape e Possibly Maybe."
   },
   "ja": {
    "country": "ノルウェー",
    "text": "Talentは ノルウェーの Amigaと PCの デモグループで、1991ねん 9がつに Arendalでの Razor 1911 and IMP-666 Amiga Conferenceで できました。さいしょの メンバーの ほとんどは Hamarの ひとでした。さいしょの さくひん Neverending Fantasiesは、そのパーティで だされました。Q.E.D.は The Gathering 1993の Amigaデモ コンペで 4いに なり、AGAの つづき Q.E.D. 2は つぎの としに おなじ たいかいで 4いでした。おもな メンバーは Boo、Orome、Jukeboxで、のちに Dreamscapeや Possibly Maybeなどの デモで PCに うつりました。"
   }
  }
 },
 "blackmail": {
  "name": "Black Mail",
  "country": "Netherlands",
  "founded": 1988,
  "text": "Black Mail is a Dutch Commodore 64 demogroup founded in September 1988 from the remnants of I.C.E. Squad. CSDb credits the group with inventing the FLI graphics mode, a technique that lets the C64 change colours on every pixel line instead of every eight. Members included Mean1, Mister Ansie, Skyline and Hein. Dutch Breeze won the C64 demo competition at the Silicon Limited Winter Party in 1991.",
  "links": [
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=595"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/5732/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=546"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Nederland",
    "text": "Black Mail is een Nederlandse Commodore 64-demogroep, in september 1988 opgericht uit de resten van I.C.E. Squad. CSDb schrijft de groep de uitvinding van de FLI-grafische modus toe, een techniek waarmee de C64 kleuren op elke pixelregel kan wisselen in plaats van om de acht. Tot de leden behoorden Mean1, Mister Ansie, Skyline en Hein. Dutch Breeze won in 1991 de C64-democompetitie op de Silicon Limited Winter Party."
   },
   "de": {
    "country": "Niederlande",
    "text": "Black Mail ist eine niederländische Commodore 64-Demogruppe, die im September 1988 aus den Überresten von I.C.E. Squad gegründet wurde. CSDb schreibt der Gruppe die Erfindung des FLI-Grafikmodus zu, einer Technik, mit der der C64 die Farben in jeder Pixelzeile statt nur in jeder achten wechseln kann. Zu den Mitgliedern gehörten Mean1, Mister Ansie, Skyline und Hein. Dutch Breeze gewann 1991 den C64-Demowettbewerb auf der Silicon Limited Winter Party."
   },
   "fr": {
    "country": "Pays-Bas",
    "text": "Black Mail est un groupe de démo Commodore 64 néerlandais fondé en septembre 1988 à partir des restes de I.C.E. Squad. CSDb attribue au groupe l'invention du mode graphique FLI, une technique permettant au C64 de changer de couleurs à chaque ligne de pixels au lieu de toutes les huit. Parmi les membres figuraient Mean1, Mister Ansie, Skyline et Hein. Dutch Breeze remporta la compétition de démos C64 à la Silicon Limited Winter Party en 1991."
   },
   "pt": {
    "country": "Países Baixos",
    "text": "Black Mail é um grupo de demos holandês de Commodore 64 fundado em setembro de 1988 a partir dos remanescentes do I.C.E. Squad. O CSDb credita ao grupo a invenção do modo gráfico FLI, uma técnica que permite ao C64 trocar de cor a cada linha de pixels em vez de a cada oito. Entre os membros estavam Mean1, Mister Ansie, Skyline e Hein. Dutch Breeze venceu a competição de demos de C64 na Silicon Limited Winter Party em 1991."
   },
   "ja": {
    "country": "オランダ",
    "text": "Black Mailは 1988ねん 9がつに I.C.E. Squadの のこりの メンバーで つくられた、オランダの Commodore 64の デモグループです。CSDbは、このグループが FLIの がめんモードを はつめいしたと しています。これは、C64が いろを 8ラインに 1かいでは なく、1ラインごとに かえられる ぎじゅつです。メンバーには Mean1、Mister Ansie、Skyline、Heinが いました。Dutch Breezeは 1991ねんの Silicon Limited Winter Partyの C64デモ コンペで ゆうしょう しました。"
   }
  }
 },
 "crest": {
  "name": "Crest",
  "country": "Germany",
  "founded": 1988,
  "text": "Crest is a German Commodore 64 demo and cracking group founded by Crossbow and Goldrush in July 1988, known for its 'Thumbs Up!' motto. It has won many C64 competitions since the late 1980s, from One Year Crest in 1989 to Krestology at X'96 and Game Over at Deadline Reloaded in 2003. Deus Ex Machina, made with Oxyron, won the C64 demo competition at Mekka & Symposium 2000. Long-standing members include Crossbow, DeeKay, Xayne and The Syndrom.",
  "links": [
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=238"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/763/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=471"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Duitsland",
    "text": "Crest is een Duitse Commodore 64-demo- en crackgroep, in juli 1988 opgericht door Crossbow en Goldrush, bekend om het motto 'Thumbs Up!'. Sinds eind jaren tachtig won de groep veel C64-competities, van One Year Crest in 1989 tot Krestology op X'96 en Game Over op Deadline Reloaded in 2003. Deus Ex Machina, gemaakt met Oxyron, won de C64-democompetitie op Mekka & Symposium 2000. Tot de langst zittende leden horen Crossbow, DeeKay, Xayne en The Syndrom."
   },
   "de": {
    "country": "Deutschland",
    "text": "Crest ist eine deutsche Commodore 64-Demo- und Crackergruppe, die im Juli 1988 von Crossbow und Goldrush gegründet wurde und für ihr Motto 'Thumbs Up!' bekannt ist. Seit Ende der 1980er Jahre hat sie viele C64-Wettbewerbe gewonnen, von One Year Crest 1989 bis zu Krestology auf der X'96 und Game Over auf der Deadline Reloaded 2003. Deus Ex Machina, entstanden gemeinsam mit Oxyron, gewann den C64-Demowettbewerb auf der Mekka & Symposium 2000. Zu den langjährigen Mitgliedern zählen Crossbow, DeeKay, Xayne und The Syndrom."
   },
   "fr": {
    "country": "Allemagne",
    "text": "Crest est un groupe allemand de démo et de cracking Commodore 64 fondé par Crossbow et Goldrush en juillet 1988, connu pour sa devise « Thumbs Up! ». Il a remporté de nombreuses compétitions C64 depuis la fin des années 1980, de One Year Crest en 1989 à Krestology à X'96 et Game Over à Deadline Reloaded en 2003. Deus Ex Machina, réalisé avec Oxyron, remporta la compétition de démos C64 à Mekka & Symposium 2000. Parmi les membres de longue date figurent Crossbow, DeeKay, Xayne et The Syndrom."
   },
   "pt": {
    "country": "Alemanha",
    "text": "Crest é um grupo alemão de demos e cracking de Commodore 64 fundado por Crossbow e Goldrush em julho de 1988, conhecido pelo lema 'Thumbs Up!'. Venceu muitas competições de C64 desde o fim da década de 1980, de One Year Crest em 1989 a Krestology na X'96 e Game Over na Deadline Reloaded em 2003. Deus Ex Machina, feito com o Oxyron, venceu a competição de demos de C64 na Mekka & Symposium 2000. Entre os membros de longa data estão Crossbow, DeeKay, Xayne e The Syndrom."
   },
   "ja": {
    "country": "ドイツ",
    "text": "Crestは 1988ねん 7がつに Crossbowと Goldrushが つくった、ドイツの Commodore 64の デモと クラックの グループで、'Thumbs Up!'という モットーで しられています。1980ねんだいの おわりから、1989ねんの One Year Crestから、X'96の Krestologyや 2003ねんの Deadline Reloadedの Game Overまで、たくさんの C64コンペで ゆうしょう しました。Oxyronと つくった Deus Ex Machinaは、Mekka & Symposium 2000の C64デモ コンペで ゆうしょう しました。ながく いる メンバーは Crossbow、DeeKay、Xayne、The Syndromです。"
   }
  }
 },
 "oxyron": {
  "name": "Oxyron",
  "country": "Germany",
  "founded": 1991,
  "text": "Oxyron is a German Commodore 64 demogroup founded on 7 December 1991 by TTS, AKC, Yazoo and Graham. It is best known for its long-running Coma Light series: Coma Light 8 won the C64 demo competition at The Party 1992, and Coma Light 13 won at X'2012. Deus Ex Machina, made with Crest, won the C64 demo competition at Mekka & Symposium 2000, and Comaland won at X'2014. Members have included Axis, Graham, Yazoo, Fanta and Bitbreaker.",
  "links": [
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=7"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/762/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=529"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Duitsland",
    "text": "Oxyron is een Duitse Commodore 64-demogroep, op 7 december 1991 opgericht door TTS, AKC, Yazoo en Graham. De groep is vooral bekend van de langlopende Coma Light-serie: Coma Light 8 won de C64-democompetitie op The Party 1992, en Coma Light 13 won op X'2012. Deus Ex Machina, gemaakt met Crest, won de C64-democompetitie op Mekka & Symposium 2000, en Comaland won op X'2014. Tot de leden behoorden Axis, Graham, Yazoo, Fanta en Bitbreaker."
   },
   "de": {
    "country": "Deutschland",
    "text": "Oxyron ist eine deutsche Commodore 64-Demogruppe, die am 7. Dezember 1991 von TTS, AKC, Yazoo und Graham gegründet wurde. Am bekanntesten ist sie für die langlebige Coma-Light-Reihe: Coma Light 8 gewann den C64-Demowettbewerb auf der The Party 1992, und Coma Light 13 gewann auf der X'2012. Deus Ex Machina, entstanden gemeinsam mit Crest, gewann den C64-Demowettbewerb auf der Mekka & Symposium 2000, und Comaland gewann auf der X'2014. Zu den Mitgliedern zählten Axis, Graham, Yazoo, Fanta und Bitbreaker."
   },
   "fr": {
    "country": "Allemagne",
    "text": "Oxyron est un groupe de démo Commodore 64 allemand fondé le 7 décembre 1991 par TTS, AKC, Yazoo et Graham. Il est surtout connu pour sa longue série Coma Light : Coma Light 8 remporta la compétition de démos C64 à The Party 1992, et Coma Light 13 gagna à X'2012. Deus Ex Machina, réalisé avec Crest, remporta la compétition de démos C64 à Mekka & Symposium 2000, et Comaland gagna à X'2014. Parmi les membres figurent Axis, Graham, Yazoo, Fanta et Bitbreaker."
   },
   "pt": {
    "country": "Alemanha",
    "text": "Oxyron é um grupo de demos alemão de Commodore 64 fundado em 7 de dezembro de 1991 por TTS, AKC, Yazoo e Graham. É mais conhecido por sua longeva série Coma Light: Coma Light 8 venceu a competição de demos de C64 na The Party 1992, e Coma Light 13 venceu na X'2012. Deus Ex Machina, feito com o Crest, venceu a competição de demos de C64 na Mekka & Symposium 2000, e Comaland venceu na X'2014. Entre os membros estiveram Axis, Graham, Yazoo, Fanta e Bitbreaker."
   },
   "ja": {
    "country": "ドイツ",
    "text": "Oxyronは 1991ねん 12がつ 7かに TTS、AKC、Yazoo、Grahamが つくった、ドイツの Commodore 64の デモグループです。ながく つづく Coma Lightシリーズで もっとも しられています。Coma Light 8は The Party 1992の C64デモ コンペで、Coma Light 13は X'2012で ゆうしょう しました。Crestと つくった Deus Ex Machinaは Mekka & Symposium 2000の C64デモ コンペで ゆうしょうし、Comalandは X'2014で ゆうしょう しました。メンバーには Axis、Graham、Yazoo、Fanta、Bitbreakerが います。"
   }
  }
 },
 "boozedesign": {
  "name": "Booze Design",
  "country": "Sweden",
  "founded": 1991,
  "text": "Booze Design is a Swedish Commodore 64 demogroup founded by Trash and Vodka in June 1991. It is one of the most successful groups in modern C64 competitions. Royal Arte won the C64 demo competition at Mekka & Symposium 2001, and Edge of Disgrace won at X'2008. Other winning demos include Soul (X'98), Andropolis (LCP 2009) and 1991 (LCP 2011). Key members include HCL, JackAsser, Jailbird and Dane.",
  "links": [
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=505"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/1287/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=561"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Zweden",
    "text": "Booze Design is een Zweedse Commodore 64-demogroep, in juni 1991 opgericht door Trash en Vodka. Het is een van de succesvolste groepen in moderne C64-competities. Royal Arte won de C64-democompetitie op Mekka & Symposium 2001, en Edge of Disgrace won op X'2008. Andere winnende demo's zijn Soul (X'98), Andropolis (LCP 2009) en 1991 (LCP 2011). Belangrijke leden zijn HCL, JackAsser, Jailbird en Dane."
   },
   "de": {
    "country": "Schweden",
    "text": "Booze Design ist eine schwedische Commodore 64-Demogruppe, die im Juni 1991 von Trash und Vodka gegründet wurde. Sie gehört zu den erfolgreichsten Gruppen in modernen C64-Wettbewerben. Royal Arte gewann den C64-Demowettbewerb auf der Mekka & Symposium 2001, und Edge of Disgrace gewann auf der X'2008. Weitere siegreiche Demos sind Soul (X'98), Andropolis (LCP 2009) und 1991 (LCP 2011). Zu den wichtigsten Mitgliedern zählen HCL, JackAsser, Jailbird und Dane."
   },
   "fr": {
    "country": "Suède",
    "text": "Booze Design est un groupe de démo Commodore 64 suédois fondé par Trash et Vodka en juin 1991. C'est l'un des groupes les plus titrés des compétitions C64 modernes. Royal Arte remporta la compétition de démos C64 à Mekka & Symposium 2001, et Edge of Disgrace gagna à X'2008. Parmi les autres démos victorieuses : Soul (X'98), Andropolis (LCP 2009) et 1991 (LCP 2011). Parmi les membres clés figurent HCL, JackAsser, Jailbird et Dane."
   },
   "pt": {
    "country": "Suécia",
    "text": "Booze Design é um grupo de demos sueco de Commodore 64 fundado por Trash e Vodka em junho de 1991. É um dos grupos de maior sucesso nas competições modernas de C64. Royal Arte venceu a competição de demos de C64 na Mekka & Symposium 2001, e Edge of Disgrace venceu na X'2008. Outras demos vencedoras incluem Soul (X'98), Andropolis (LCP 2009) e 1991 (LCP 2011). Entre os membros principais estão HCL, JackAsser, Jailbird e Dane."
   },
   "ja": {
    "country": "スウェーデン",
    "text": "Booze Designは 1991ねん 6がつに Trashと Vodkaが つくった、スウェーデンの Commodore 64の デモグループです。いまの C64コンペで もっとも せいこうしている グループの ひとつです。Royal Arteは Mekka & Symposium 2001の C64デモ コンペで、Edge of Disgraceは X'2008で ゆうしょう しました。ほかに ゆうしょう した デモは、Soul (X'98)、Andropolis (LCP 2009)、1991 (LCP 2011)です。おもな メンバーは HCL、JackAsser、Jailbird、Daneです。"
   }
  }
 },
 "censordesign": {
  "name": "Censor Design",
  "country": "Sweden",
  "founded": 1989,
  "text": "Censor Design is a Swedish Commodore 64 group founded on 28 June 1989, with Bob among its founding members. The name was taken from the track Censor by the Canadian band Skinny Puppy. The group's best-known work is the Wonderland demo series, which began in 1989 and resumed in 2012 after Wonderland X in 1993. Wonderland XII won the C64 demo competition at BFP 2013, and later productions won at X'2018 and Revision.",
  "links": [
   {
    "label": "CSDb",
    "url": "https://csdb.dk/group/?id=2310"
   },
   {
    "label": "Demozoo",
    "url": "https://demozoo.org/groups/1273/"
   },
   {
    "label": "Pouët",
    "url": "https://www.pouet.net/groups.php?which=877"
   }
  ],
  "i18n": {
   "nl": {
    "country": "Zweden",
    "text": "Censor Design is een Zweedse Commodore 64-groep, opgericht op 28 juni 1989, met Bob onder de oprichters. De naam is ontleend aan het nummer Censor van de Canadese band Skinny Puppy. Het bekendste werk van de groep is de Wonderland-demoserie, die in 1989 begon en in 2012 werd hervat na Wonderland X in 1993. Wonderland XII won de C64-democompetitie op BFP 2013, en latere producties wonnen op X'2018 en Revision."
   },
   "de": {
    "country": "Schweden",
    "text": "Censor Design ist eine schwedische Commodore 64-Gruppe, die am 28. Juni 1989 gegründet wurde, mit Bob unter den Gründungsmitgliedern. Der Name stammt vom Stück Censor der kanadischen Band Skinny Puppy. Das bekannteste Werk der Gruppe ist die Demoreihe Wonderland, die 1989 begann und 2012 nach Wonderland X im Jahr 1993 fortgesetzt wurde. Wonderland XII gewann den C64-Demowettbewerb auf der BFP 2013, und spätere Produktionen gewannen auf der X'2018 und der Revision."
   },
   "fr": {
    "country": "Suède",
    "text": "Censor Design est un groupe suédois Commodore 64 fondé le 28 juin 1989, avec Bob parmi ses membres fondateurs. Le nom vient du morceau Censor du groupe canadien Skinny Puppy. L'œuvre la plus connue du groupe est la série de démos Wonderland, commencée en 1989 et reprise en 2012 après Wonderland X en 1993. Wonderland XII remporta la compétition de démos C64 à BFP 2013, et des productions ultérieures gagnèrent à X'2018 et à Revision."
   },
   "pt": {
    "country": "Suécia",
    "text": "Censor Design é um grupo sueco de Commodore 64 fundado em 28 de junho de 1989, tendo Bob entre seus membros fundadores. O nome foi tirado da faixa Censor, da banda canadense Skinny Puppy. A obra mais conhecida do grupo é a série de demos Wonderland, iniciada em 1989 e retomada em 2012 depois de Wonderland X em 1993. Wonderland XII venceu a competição de demos de C64 na BFP 2013, e produções posteriores venceram na X'2018 e na Revision."
   },
   "ja": {
    "country": "スウェーデン",
    "text": "Censor Designは 1989ねん 6がつ 28にちに、Bobなどが つくった スウェーデンの Commodore 64の グループです。なまえは、カナダの バンド Skinny Puppyの きょく Censorから とりました。いちばん ゆうめいな さくひんは Wonderland デモシリーズで、1989ねんに はじまり、1993ねんの Wonderland Xの あと、2012ねんに また はじまりました。Wonderland XIIは BFP 2013の C64デモ コンペで ゆうしょうし、そのあとの さくひんも X'2018と Revisionで ゆうしょう しました。"
   }
  }
 }
};
window.DEMO_GROUP_OF = {
 "am_megamaid": [
  "pixar-theband"
 ],
 "am_demo_sota": [
  "spaceballs"
 ],
 "am_demo_mobile": [
  "spaceballs"
 ],
 "am_demo_enigma": [
  "phenomena"
 ],
 "am_demo_mentalhangover": [
  "scoopex"
 ],
 "am_demo_interference": [
  "sanity"
 ],
 "am_demo_arte": [
  "sanity"
 ],
 "am_demo_globaltrash": [
  "silents"
 ],
 "am_demo_voyage": [
  "razor1911"
 ],
 "am_demo_rinkadink": [
  "lemon"
 ],
 "am_demo_qed": [
  "talent"
 ],
 "c64_demo_dutchbreeze": [
  "blackmail"
 ],
 "c64_demo_deusexmachina": [
  "crest",
  "oxyron"
 ],
 "c64_demo_royalarte": [
  "boozedesign"
 ],
 "c64_demo_wonderland12": [
  "censordesign"
 ]
};
window.DEMO_NOTES = {
 "amiga": {
  "en": "This is a demo, not a game: it boots from the disk and plays by itself, with nothing to control. Give it a moment &mdash; demos load their first part from disk before anything appears. <span class='kbd'>F5</span> starts it over.",
  "nl": "Dit is een demo, geen game: hij start op vanaf de diskette en speelt vanzelf af, er valt niets te besturen. Even geduld &mdash; demo's laden hun eerste onderdeel van diskette voordat er iets verschijnt. Met <span class='kbd'>F5</span> start je hem opnieuw.",
  "de": "Dies ist eine Demo, kein Spiel: Sie bootet von der Diskette und läuft von selbst, es gibt nichts zu steuern. Gib ihr einen Moment &mdash; Demos laden ihren ersten Teil von der Diskette, bevor etwas erscheint. <span class='kbd'>F5</span> startet sie neu.",
  "fr": "Ceci est une démo, pas un jeu : elle démarre depuis la disquette et se déroule toute seule, sans rien à contrôler. Patientez un instant &mdash; les démos chargent leur première partie depuis la disquette avant que quoi que ce soit n'apparaisse. <span class='kbd'>F5</span> la relance depuis le début.",
  "pt": "Isto é uma demo, não um jogo: ela inicia a partir do disquete e roda sozinha, sem nada para controlar. Dê um tempinho a ela &mdash; as demos carregam a primeira parte do disquete antes de qualquer coisa aparecer. <span class='kbd'>F5</span> reinicia.",
  "ja": "これは ゲームでは なく、デモです。ディスクから きどうして、ひとりでに ながれます。そうさする ところは ありません。すこし まって ください &mdash; デモは なにかが うつる まえに、ディスクから さいしょの ぶぶんを よみこみます。<span class='kbd'>F5</span>で さいしょから やりなおせます。"
 },
 "megamaid": {
  "en": "This is a demo, not a game: it boots from the disk and plays by itself, with nothing to control. It displays a scanned magazine photograph and is <strong>not safe for work</strong>.",
  "nl": "Dit is een demo, geen game: hij start op vanaf de diskette en speelt vanzelf af, er valt niets te besturen. Hij toont een gescande foto uit een tijdschrift en is <strong>niet geschikt voor op het werk</strong>.",
  "de": "Dies ist eine Demo, kein Spiel: Sie bootet von der Diskette und läuft von selbst, es gibt nichts zu steuern. Sie zeigt ein eingescanntes Magazinfoto und ist <strong>nicht jugendfrei</strong>.",
  "fr": "Ceci est une démo, pas un jeu : elle démarre depuis la disquette et se déroule toute seule, sans rien à contrôler. Elle affiche une photographie scannée d'un magazine et est <strong>déconseillée au travail</strong>.",
  "pt": "Isto é uma demo, não um jogo: ela inicia a partir do disquete e roda sozinha, sem nada para controlar. Ela exibe uma fotografia escaneada de revista e <strong>não é segura para o trabalho</strong>.",
  "ja": "これは ゲームでは なく、デモです。ディスクから きどうして、ひとりでに ながれます。そうさする ところは ありません。ざっしの しゃしんを スキャンした がぞうが うつるので、<strong>NSFW (しごとちゅうなどに みるのには ふさわしく ありません)</strong>。"
 },
 "c64": {
  "en": "This is a demo, not a game: it loads and then plays by itself, with nothing to control. It runs from side&nbsp;1 of the original multi-side release and will ask for the next side when it reaches that point &mdash; the Download button gives the complete set. Loading is slower here than for the games on this shelf, on purpose: demos use their own custom disk loaders, so the Vault switches true 1541 drive emulation on for them instead of the fast virtual-device load.",
  "nl": "Dit is een demo, geen game: hij laadt en speelt daarna vanzelf af, er valt niets te besturen. Hij draait vanaf kant&nbsp;1 van de originele release met meerdere kanten en vraagt om de volgende kant zodra hij dat punt bereikt &mdash; met de Download-knop krijg je de complete set. Laden gaat hier trager dan bij de games op deze plank, en dat is met opzet: demo's gebruiken hun eigen aangepaste diskloaders, daarom zet de Vault voor demo's echte 1541-drive-emulatie aan in plaats van het snelle laden via het virtuele apparaat.",
  "de": "Dies ist eine Demo, kein Spiel: Sie lädt und läuft dann von selbst, es gibt nichts zu steuern. Sie läuft von Seite&nbsp;1 der originalen Multi-Disk-Veröffentlichung und fragt nach der nächsten Seite, sobald sie diese Stelle erreicht &mdash; der Download-Button liefert das komplette Set. Das Laden dauert hier länger als bei den Spielen in diesem Regal, und zwar absichtlich: Demos verwenden eigene Disk-Loader, deshalb schaltet der Vault für sie die echte 1541-Laufwerksemulation ein, statt des schnellen Ladens über das virtuelle Gerät.",
  "fr": "Ceci est une démo, pas un jeu : elle se charge puis se déroule toute seule, sans rien à contrôler. Elle tourne depuis la face&nbsp;1 de la sortie originale en plusieurs faces et demandera la face suivante lorsqu'elle atteindra ce point &mdash; le bouton Télécharger fournit l'ensemble complet. Le chargement est plus lent ici que pour les jeux de cette étagère, volontairement : les démos utilisent leurs propres chargeurs de disque personnalisés, si bien que le Vault active pour elles l'émulation fidèle du lecteur 1541 au lieu du chargement rapide par périphérique virtuel.",
  "pt": "Isto é uma demo, não um jogo: ela carrega e depois roda sozinha, sem nada para controlar. Ela roda a partir do lado&nbsp;1 do lançamento original de vários lados e vai pedir o lado seguinte quando chegar a esse ponto &mdash; o botão Download fornece o conjunto completo. O carregamento aqui é mais lento do que nos jogos desta prateleira, de propósito: as demos usam seus próprios carregadores de disco personalizados, então o Vault ativa a emulação fiel da unidade 1541 para elas, em vez do carregamento rápido por dispositivo virtual.",
  "ja": "これは ゲームでは なく、デモです。よみこんだ あと、ひとりでに ながれます。そうさする ところは ありません。もとの マルチサイドばんの side&nbsp;1から うごいて、つぎの ところに くると つぎの sideを きかれます &mdash; Downloadボタンで ぜんぶの セットが もらえます。ここでは、この たなの ゲームより わざと ゆっくり よみこみます。デモは じぶんたち だけの ディスクローダーを つかうので、Vaultは はやい バーチャルデバイスの よみこみの かわりに、ほんものの 1541ドライブ エミュレーションを オンに します。"
 }
};
window.DEMO_NOTE_OF = {
 "am_megamaid": "megamaid",
 "am_demo_sota": "amiga",
 "am_demo_mobile": "amiga",
 "am_demo_enigma": "amiga",
 "am_demo_mentalhangover": "amiga",
 "am_demo_interference": "amiga",
 "am_demo_arte": "amiga",
 "am_demo_globaltrash": "amiga",
 "am_demo_voyage": "amiga",
 "am_demo_rinkadink": "amiga",
 "am_demo_qed": "amiga",
 "c64_demo_dutchbreeze": "c64",
 "c64_demo_deusexmachina": "c64",
 "c64_demo_royalarte": "c64",
 "c64_demo_wonderland12": "c64"
};
