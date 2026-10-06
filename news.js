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

  // How fast the tape runs, in pixels per second. 45 is a comfortable read.
  speed: 45,

  items: [
    { id: "le-sprint-2026-10",
      date: "2026-10-06",
      href: "game.html?id=new_le-sprint",
      text: {
        en: "New on the shelf: Le Sprint — a two-player Videopac race from Skrolli Party 2026. Waggle the joystick, beat your friend",
        nl: "Nieuw in de kast: Le Sprint — een race voor twee spelers op de Videopac, van Skrolli Party 2026. Wrik aan je joystick en klop je vriend",
        de: "Neu im Regal: Le Sprint — ein Rennen für zwei Spieler auf dem Videopac, von der Skrolli Party 2026. Joystick rütteln, Freund schlagen",
        fr: "Nouveau sur l'étagère : Le Sprint — une course à deux joueurs sur Videopac, sortie à la Skrolli Party 2026. Secouez le joystick, battez votre ami",
        pt: "Novo na prateleira: Le Sprint — uma corrida para dois jogadores no Videopac, da Skrolli Party 2026. Sacuda o joystick e vença seu amigo",
        ja: "あたらしく くわわりました: Le Sprint — Skrolli Party 2026 で でた ふたりよう の かけっこゲーム。ジョイスティックを さゆうに ゆらして、ともだちに かとう" } },
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
