// Launch commands for PC games dropped into emulator/roms/ as a PLAIN zip
// (say, straight from archive.org's softwarelibrary_msdos_games collection)
// rather than as a ready-made js-dos bundle. dos.html reads this when the
// zip it was handed has no .jsdos/dosbox.conf: it unpacks the zip in the
// browser, strips a single top-level folder if the whole game sits in one
// (archive.org's "Ppersia/", "LSL1/"...), writes a dosbox.conf around the
// files with the command below as the last [autoexec] line, and hands the
// result to js-dos. Nothing is written back to disk; the wrapping happens
// again on every start (it takes well under a second for these sizes).
//
// Keyed by the zip's file name as listed in games.js (romFile), because that
// is the one thing dos.html always knows. Each entry:
//   run:   the command(s) - a string, or an array of lines for a menu
//   conf:  optional per-section overrides of the standard dosbox.conf
//          template (see dos.html), e.g. {sblaster: {irq: 5}}
//   alt:   a single program to try when "run" doesn't fit the zip's layout
//          (Spear of Destiny: the GOG bundle has M1/M2/M3 folders and a menu
//          script, archive.org's zip has id's own picker SOD.EXE instead)
//   keepRoot: true to NOT strip a single top-level folder - for games whose
//          config hard-codes C:\<folder>\... paths (Larry 6 CD)
//
// If the file a "run" line names isn't actually in the zip (an archive.org
// zip laid out differently from the bundle the line was written for),
// dos.html ignores the entry and falls back to the guessing rules; when the
// file sits in a subfolder it gets a "cd" in front automatically, so
// "DOOM2.EXE" also works for Final Doom's tnt/ and plutonia/ folders.
//
// Games not listed here still start: dos.html falls back to (1) SIERRA.COM /
// SIERRA.EXE if present (every Sierra AGI/SCI game), (2) an .EXE/.COM/.BAT
// whose name matches the zip's, (3) the only executable in the folder,
// (4) the first .BAT, then .EXE, then .COM. The table is there for the games
// where a guess would be wrong or where the bundle Mike built by hand
// carried something the file set alone doesn't say (Doom's sound driver
// choice, Lemmings' VGA build, Duke 3D's IRQ).
//
// "unverified" = taken from the game's known file layout, not from a bundle
// that has actually been booted in this vault; fix the line if it's wrong.
window.DOS_LAUNCH = {
  // ---- the shelf as it was built (commands copied from each bundle) ----
  "LSL1.zip":        { run: "LSL1.COM" },        // the bundle used _LSL1.BAT, which just cd's into a folder that isn't there and runs this
  "PRINCE.zip":      { run: "PRINCE.EXE" },
  "SOFTPORN.zip":    { run: "SOFTPORN.EXE" },
  "LSL1VGA.zip":     { run: "SCIDHUV.EXE" },     // archive.org VGA remake zip; the fallback would pick LSL1VGA.BAT, same thing
  "LSL2.zip":        { run: "SIERRA.COM" },
  "LSL3.zip":        { run: "SIERRA.COM" },
  "LSL5.zip":        { run: "SCIDHUV.EXE" },
  "LSL6.zip":        { run: ["cd LSL6CD", "SIERRA.EXE"], keepRoot: true },   // archive.org CD repack: RESOURCE.CFG points at C:\lsl6cd\aud, so the folder must stay
  "DOOM.zip":        { run: "DOOM.EXE" },
  "KEEN1.zip":       { run: "KEEN1.EXE" },
  "CIVILIZATION.zip":{ run: "CIV.EXE" },
  "SIMCITY.zip":     { run: "SIMCITY.EXE" },
  "DUNE2.zip":       { run: "DUNE2.EXE" },
  "TIM.zip":         { run: "TIM.EXE" },
  "OREGON.zip":      { run: "OREGON.EXE" },
  "PC_LEMMINGS.zip": { run: "lemvga /v" },        // skip the autodet/lemmings.bat machine picker
  "onml.zip":        { run: "vgalemm2 -v -x" },
  "xmas.zip":        { run: "vgal -x" },
  "holiday.zip":     { run: "vgalemmi -e -x" },
  "lem2.zip":        { run: "l2" },
  "anwol.zip":       { run: "l3cd c:\\" },
  "bloodmoney.zip":  { run: "bm" },
  "OUTRUN.zip":      { run: "OUTRUN.EXE" },
  "WOLF3D.zip":      { run: "wolf3d.exe" },
  "DUKE2.zip":       { run: "nukem2.exe" },
  "DUKE3D.zip":      { run: "duke3d.exe", conf: { cpu: { cycles: "max" } } },   // no IRQ override here: the GOG bundle's DUKE3D.CFG wants IRQ 5 (baked into that bundle's own conf), archive.org's wants DOSBox's default 7 - the game refuses to start on a mismatch
  "GTA1.zip":        { run: ["cd gtados", "k.exe", "call dino.bat"] },   // k.exe picks the Miles sound driver first
  "SQ1.zip":         { run: "sq.com" },
  "SQ2.zip":         { run: "sierra.com" },
  "SQ3.zip":         { run: "sierra.com" },
  "SQ4.zip":         { run: "sierra.exe" },
  "SQ5.zip":         { run: "sierra.exe" },
  "DUKE1.zip":       { run: [
    "@echo off", "cls", "echo.",
    "echo   ======================================",
    "echo    DUKE NUKEM  (1991) - Apogee Software",
    "echo   ======================================",
    "echo     1) Episode 1 - Shrapnel City",
    "echo     2) Episode 2 - Mission: Moonbase",
    "echo     3) Episode 3 - Trapped in the Future", "echo.",
    "choice /c123 /s Episode [1-3]: /n",
    "if errorlevel 3 goto e3", "if errorlevel 2 goto e2", "if errorlevel 1 goto e1",
    ":e1", "dn1.exe", "exit", ":e2", "dn2.exe", "exit", ":e3", "dn3.exe", "exit" ] },
  "SPEAR.zip":       { alt: "SOD.EXE", run: [
    "@echo off", "cls", "echo.",
    "echo   ==========================================",
    "echo    SPEAR OF DESTINY (1992) - id Software",
    "echo   ==========================================",
    "echo     1) Spear of Destiny",
    "echo     2) Mission 2 - Return to Danger",
    "echo     3) Mission 3 - Ultimate Challenge", "echo.",
    "choice /c123 /s Mission [1-3]: /n",
    "if errorlevel 3 goto m3", "if errorlevel 2 goto m2", "if errorlevel 1 goto m1",
    ":m1", "cd M1", "cls", "spear.exe", "exit",
    ":m2", "cd M2", "cls", "spear.exe", "exit",
    ":m3", "cd M3", "cls", "spear.exe", "exit" ] },
  // ---- placeholders on the shelf, never bundled here (unverified) ----
  "DOOM2.zip":       { run: "DOOM2.EXE" },
  "TNT.zip":         { run: "DOOM2.EXE" },       // vanilla doom2.exe picks up TNT.WAD on its own
  "PLUTONIA.zip":    { run: "DOOM2.EXE" },
  "KEEN2.zip":       { run: "KEEN2.EXE" },
  "KEEN3.zip":       { run: "KEEN3.EXE" },
  "KEEN4.zip":       { run: "KEEN4E.EXE" },      // registered Keen 4-6 ship EGA (..E) and CGA (..C) builds
  "KEEN5.zip":       { run: "KEEN5E.EXE" },
  "KEEN6.zip":       { run: "KEEN6E.EXE" },
  "XCOM.zip":        { run: "UFO.BAT", conf: { cpu: { cycles: 12000 } } }   // X-COM misbehaves at max cycles
  // KQ1-7 and SQ6 are left to the SIERRA.COM/SIERRA.EXE rule.
};
