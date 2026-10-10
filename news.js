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
    { id: "le-sprint-g7400-2026-10",
      date: "2026-10-10",
      href: "game.html?id=new_le-sprint",
      text: {
        en: "Le Sprint now races in a G7400 stadium. Beat the 6.28 record and your runner jumps for joy",
        nl: "Le Sprint loopt nu in een G7400-stadion. Verbeter het record van 6.28 en je loper springt van blijdschap",
        de: "Le Sprint läuft jetzt in einem G7400-Stadion. Schlag den Rekord von 6.28 und dein Läufer springt vor Freude",
        fr: "Le Sprint se court maintenant dans un stade G7400. Battez le record de 6.28 et votre coureur saute de joie",
        pt: "Le Sprint agora corre num estádio do G7400. Bata o recorde de 6.28 e seu corredor pula de alegria",
        ja: "Le Sprint が G7400 の スタジアムで はしれるように なりました。 6.28 の きろくを やぶると ランナーが とびあがって よろこびます" } },
    { id: "teletext-2026-10",
      date: "2026-10-01",
      href: "game.html?id=new_teletext",
      text: {
        en: "G7400 Teletext — live NOS Teletekst, drawn Videopac-style",
        nl: "G7400 Teletekst — live NOS Teletekst in Videopac-stijl",
        de: "G7400-Videotext — Live-Videotext der NOS im Videopac-Stil",
        fr: "Télétexte G7400 — le télétexte de la NOS en direct, façon Videopac",
        pt: "Teletexto do G7400 — o teletexto da NOS ao vivo, no estilo Videopac",
        ja: "G7400 テレテキスト — NOS の テレテキストを ライブで、 Videopac ふうに" } },
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
