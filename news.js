// The news ticker tape that runs along the top of the homebrew panel on the
// Videopac shelf. One line, scrolling, dismissable - no popup, nothing
// covering the page, nothing for a blocker to eat.
//
// Everything here is editable without touching any code.
//
//   id    a short unique slug for this item. The ids of the items currently
//         showing are what a visitor's "I've seen this" flag is keyed on, so
//         ADDING AN ITEM BRINGS THE TAPE BACK for everyone who dismissed the
//         previous one. Editing the text of an existing item does not - bump
//         "version" below if a rewrite should count as news again.
//   date  ISO date the item became news. Items older than maxAgeDays drop
//         off the tape by themselves, so nothing here goes stale on its own.
//   href  where the item links to. Optional - an item without one is plain
//         text on the tape.
//   text  an { en, nl, de, fr, pt, ja } object, resolved by window.tx() like
//         every other blurb in featured.js. The "ja" text is kanji-free on
//         purpose - hiragana with katakana for loanwords. Keep it that way.
//
// Newest first. When the list is empty, or every item has aged out, the tape
// is not rendered at all and the homebrew panel looks exactly as it did.
window.NEWS_DATA = {

  // Bump this string to force the tape back for everyone, whatever they
  // dismissed - use it when an item's text changes rather than a new one
  // being added. Leave it alone otherwise.
  version: "1",

  // How long an item stays news, in days.
  maxAgeDays: 60,

  // How fast the tape runs, in pixels per second. The tape is drawn in the
  // Videopac's own wide-set characters (20 px a letter), so 90 reads at
  // about the pace the old small type did at 45.
  speed: 90,

  items: [
    { id: "gog-2026-11",
      date: "2026-11-16",
      href: "index.html?shelf=pc",
      text: {
        en: "Retro Vault is now a GOG.com affiliate. Buy the DOS classics DRM-free on GOG and play them right here. New on the PC shelf: Police Quest, Quest for Glory and Gabriel Knight",
        nl: "Retro Vault is nu GOG.com-affiliate. Koop de DOS-klassiekers DRM-vrij bij GOG en speel ze gewoon hier. Nieuw op de pc-plank: Police Quest, Quest for Glory en Gabriel Knight",
        de: "Retro Vault ist jetzt GOG.com-Affiliate. Kauf die DOS-Klassiker DRM-frei bei GOG und spiel sie direkt hier. Neu im PC-Regal: Police Quest, Quest for Glory und Gabriel Knight",
        fr: "Retro Vault est désormais affilié à GOG.com. Achetez les classiques DOS sans DRM sur GOG et jouez-y ici même. Nouveau sur l’étagère PC : Police Quest, Quest for Glory et Gabriel Knight",
        pt: "O Retro Vault agora é afiliado da GOG.com. Compre os clássicos de DOS sem DRM na GOG e jogue aqui mesmo. Novidade na prateleira de PC: Police Quest, Quest for Glory e Gabriel Knight",
        ja: "Retro Vault は GOG.com の アフィリエイトに なりました。 DOS の クラシックを GOG で DRM なしで かって、 ここで そのまま あそべます。 PC の たなに Police Quest、 Quest for Glory、 Gabriel Knight が くわわりました" } },
    { id: "demo-tribute-2026-11",
      date: "2026-11-16",
      href: "game.html?id=new_demo-tribute",
      text: {
        en: "The Bootleg Sessions: A Demo Tribute — our own G7400 demo with music, a voice, raster bars, plasma and a spinning cube. Free download, source on GitHub",
        nl: "The Bootleg Sessions: A Demo Tribute — onze eigen G7400-demo met muziek, een stem, rasterbalken, plasma en een draaiende kubus. Gratis te downloaden, broncode op GitHub",
        de: "The Bootleg Sessions: A Demo Tribute — unsere eigene G7400-Demo mit Musik, Stimme, Rasterbalken, Plasma und rotierendem Würfel. Kostenloser Download, Quellcode auf GitHub",
        fr: "The Bootleg Sessions: A Demo Tribute — notre propre démo G7400 avec musique, voix, raster bars, plasma et un cube qui tourne. Téléchargement gratuit, code source sur GitHub",
        pt: "The Bootleg Sessions: A Demo Tribute — nossa própria demo de G7400 com música, voz, raster bars, plasma e um cubo girando. Download grátis, código-fonte no GitHub",
        ja: "The Bootleg Sessions: A Demo Tribute — わたしたちの G7400 デモです。 おんがく、 こえ、 ラスターバー、 プラズマ、 まわる キューブ。 むりょうで ダウンロードでき、 ソースは GitHub に あります" } },
    { id: "bird-hunt-2026-09",
      date: "2026-09-19",
      href: "game.html?id=new_bird-hunt",
      text: {
        en: "Bird Hunt — a new Videopac homebrew by Ahnl66, free to play",
        nl: "Bird Hunt — een nieuwe Videopac-homebrew van Ahnl66, gratis te spelen",
        de: "Bird Hunt — ein neues Videopac-Homebrew von Ahnl66, kostenlos spielbar",
        fr: "Bird Hunt — un nouveau homebrew Videopac signé Ahnl66, gratuit",
        pt: "Bird Hunt — um novo homebrew de Videopac por Ahnl66, grátis",
        ja: "Bird Hunt — Ahnl66 の あたらしい Videopac ホームブリュー。むりょうで あそべます" } }
  ]
};
