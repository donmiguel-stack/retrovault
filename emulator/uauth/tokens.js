// Cloud-storage keys for webretro's "load a ROM from Google Drive / Dropbox /
// OneDrive" picker.
//
// Blanked deliberately. The Vault loads ROMs from your own roms/ folder, so the
// cloud picker is never used, and the keys that shipped here are not ours -
// they belong to webretro's author and are already published in that project
// and in dozens of forks of it. Carrying someone else's credentials serves no
// purpose and trips GitHub's secret scanner.
//
// Want the cloud picker back? Put your own keys here; this is the file
// uauth.js reads.

// Google Drive
var googleProjectId = "";
var googleApiKey = "";
var googleOauthClientId = "";
// scope: https://www.googleapis.com/auth/drive.readonly

// Dropbox
var dropboxAppKey = "";

// OneDrive
var onedriveClientId = "";
