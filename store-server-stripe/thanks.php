<?php
/* Retro Vault store - the page a buyer lands on after paying.
 *
 * It only *reads* what webhook.php wrote. It never fulfils anything itself:
 * if this page were the one handing out keys, every buyer who closed the tab
 * would go without. Usually the webhook has already landed by the time the
 * browser gets here; when it hasn't, the page waits and retries.
 *
 *   GET /store/thanks.php?session_id=cs_...          -> the page
 *   GET /store/thanks.php?session_id=cs_...&poll=1   -> {ok, key?} as JSON */

declare(strict_types=1);
require __DIR__ . '/lib.php';
require __DIR__ . '/lib_license.php';
$cfg = require __DIR__ . '/config.php';

$sid = (string) ($_GET['session_id'] ?? '');
$poll = !empty($_GET['poll']);

$row = null;
if (preg_match('/^cs_[A-Za-z0-9_]+$/', $sid)) {
    try {
        $st = license_db($cfg)->prepare('SELECT * FROM licenses WHERE checkout_session = ?');
        $st->execute([$sid]);
        $row = $st->fetch() ?: null;
    } catch (Throwable $e) {
        error_log('vault thanks: ' . $e);
    }
}

if ($poll) {
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode($row
        ? ['ok' => true, 'key' => $row['key'], 'game' => $row['game']]
        : ['ok' => false]);
    exit;
}

$game = (string) ($row['game'] ?? '');
$title = (string) ($cfg['products'][$game]['title'] ?? 'your game');
$page = (string) ($cfg['products'][$game]['game_url']
                  ?? (($cfg['game_url_base'] ?? '') . rawurlencode($game)));
$key = (string) ($row['key'] ?? '');
$limit = (int) ($row['activation_limit'] ?? ($cfg['activation_limit'] ?? 10));
$support = (string) ($cfg['mail_from'] ?? 'hq@retrovault.world');

header('Cache-Control: no-store');
header('Content-Type: text/html; charset=utf-8');
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Your licence key — Retro Vault</title>
<style>
:root{--bg:#0f1115;--surface:#171a21;--border:#2a2e37;--text:#e9edf2;--dim:#9aa3af;--mute:#6b7280;--accent:#5b8def;--hb:#e05a7e;--radius:10px}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);line-height:1.6;
     font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:640px;margin:0 auto;padding:64px 24px}
h1{font-size:clamp(24px,4vw,34px);margin:0 0 10px}
p{color:var(--dim)}
.keybox{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--hb);
        border-radius:var(--radius);padding:22px 24px;margin:26px 0}
.key{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:clamp(18px,3.4vw,26px);
     letter-spacing:.06em;color:var(--text);word-break:break-all;margin:0 0 14px}
.btn{display:inline-block;padding:11px 18px;border:1px solid var(--border);border-radius:8px;
     background:var(--accent);color:#fff;font-weight:600;text-decoration:none;font-size:14px;cursor:pointer}
.btn.ghost{background:var(--surface);color:var(--dim)}
.btn:hover{text-decoration:none}
.row{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.fine{color:var(--mute);font-size:13px}
code{background:#1e2229;padding:1px 6px;border-radius:5px;font-size:12.5px}
a{color:var(--accent)}
</style>
</head>
<body>
<div class="wrap">
<?php if ($key !== ''): ?>
  <h1>Thank you — <?= htmlspecialchars($title, ENT_QUOTES) ?> is yours.</h1>
  <p>A copy of this key is on its way to your inbox as well.</p>
  <div class="keybox">
    <p class="key" id="key"><?= htmlspecialchars($key, ENT_QUOTES) ?></p>
    <div class="row">
      <button class="btn" id="copy" type="button">Copy key</button>
      <a class="btn ghost" href="<?= htmlspecialchars($page, ENT_QUOTES) ?>">Go to the game and play</a>
    </div>
  </div>
  <p>On the game's page, click <b>I have a licence key</b> and paste it in. The key works on up to
  <?= $limit ?> of your own browsers and machines — the online Vault and a downloaded Vault each
  count as one. Run out of room? Use <b>Remove from this device</b> on a machine you no longer use,
  or mail <a href="mailto:<?= htmlspecialchars($support, ENT_QUOTES) ?>"><?= htmlspecialchars($support, ENT_QUOTES) ?></a> and we'll reset it.</p>
<?php else: ?>
  <h1>Payment received — one moment.</h1>
  <p id="wait">Your key is being issued. This page will show it as soon as it is ready
  (usually a second or two).</p>
  <p class="fine">If it doesn't appear, don't worry and don't pay again: the key is also emailed
  to you. Mail <a href="mailto:<?= htmlspecialchars($support, ENT_QUOTES) ?>"><?= htmlspecialchars($support, ENT_QUOTES) ?></a>
  if nothing arrives within a few minutes — with a bank payment such as iDEAL it can take longer to
  settle.</p>
<?php endif; ?>
</div>
<script>
(function(){
  var btn = document.getElementById('copy');
  if (btn) btn.addEventListener('click', function(){
    var k = document.getElementById('key').textContent.trim();
    (navigator.clipboard ? navigator.clipboard.writeText(k) : Promise.reject())
      .then(function(){ btn.textContent = 'Copied'; }, function(){ btn.textContent = 'Select it and copy'; });
  });

  // No key yet: the webhook is still in flight. Poll, backing off, for ~2 min.
  var waiting = document.getElementById('wait');
  if (!waiting) return;
  var sid = new URLSearchParams(location.search).get('session_id');
  if (!sid) return;
  var tries = 0;
  (function poll(){
    if (++tries > 20) return;
    fetch('thanks.php?poll=1&session_id=' + encodeURIComponent(sid), {cache:'no-store'})
      .then(function(r){ return r.json(); })
      .then(function(j){ if (j && j.ok) location.reload(); else setTimeout(poll, Math.min(1000 * tries, 8000)); })
      .catch(function(){ setTimeout(poll, 8000); });
  })();
})();
</script>
</body>
</html>
