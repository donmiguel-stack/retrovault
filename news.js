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
    { id: "bird-hunt-2026-09",
      date: "2026-09-19",
      href: "game.html?id=new_bird-hunt",
      text: {
        en: "New on the shelf: Bird Hunt — a brand-new Videopac homebrew by Ahnl66, free to play and free to download",
        nl: "Nieuw in de kast: Bird Hunt — een gloednieuwe Videopac-homebrew van Ahnl66, gratis te spelen en gratis te downloaden",
        de: "Neu im Regal: Bird Hunt — ein brandneues Videopac-Homebrew von Ahnl66, kostenlos spielbar und kostenlos zum Download",
        fr: "Nouveau sur l'étagère : Bird Hunt — un homebrew Videopac tout neuf signé Ahnl66, jouable et téléchargeable gratuitement",
        pt: "Novo na prateleira: Bird Hunt — um homebrew de Videopac recém-saído do forno, por Ahnl66, grátis para jogar e baixar",
        ja: "あたらしく くわわりました: Bird Hunt — Ahnl66 が つくった できたての Videopac ホームブリューです。むりょうで あそべて、ダウンロードも できます" } }
  ]
};
