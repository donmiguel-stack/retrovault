<?php
/* Retro Vault teletext relay - https://retrovault.world/teletext/nos.php?p=101
 *
 * demo.retrovault.world/teletext.html shows live NOS Teletekst in the style of
 * the Videopac G7400's EF9340/EF9341 display. NOS publishes the pages as JSON
 * (teletekst-data.nos.nl) but sends no CORS header, so a browser on another
 * site cannot read them directly. This file fetches one page and hands it on,
 * unchanged, with a CORS header for the Vault's own origins only.
 *
 *   GET ?p=101      -> NOS JSON for page 101          (200)
 *   GET ?p=649-2    -> subpage 2 of page 649          (200)
 *   unknown page    -> {"error":"notfound"}           (404)
 *   NOS unreachable -> last cached copy if any (X-Teletext-Stale: 1), else 502
 *
 * Kept polite on purpose: every page is cached for 60 s and shared by all
 * visitors, so NOS sees at most one request per page per minute no matter how
 * many people are watching, plus a per-IP limit against scripted abuse.
 * Nothing else lives here: no keys, no config, no database. */

declare(strict_types=1);

const TTL         = 60;        // seconds a cached page counts as fresh
const STALE_MAX   = 86400;     // serve a cached page this old when NOS is down
const RATE_LIMIT  = 240;       // requests per IP ...
const RATE_WINDOW = 600;       // ... per 10 minutes
const UPSTREAM    = 'https://teletekst-data.nos.nl/json/';
const ORIGINS     = ['https://demo.retrovault.world', 'https://retrovault.world'];

$cacheDir = __DIR__ . '/cache';

function cors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ORIGINS, true)
        || preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Expose-Headers: X-Teletext-Stale, X-Teletext-Age');
    }
    header('Cross-Origin-Resource-Policy: cross-origin');
}
function out(string $json, int $code, int $maxAge): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: public, max-age=' . $maxAge);
    header('X-Content-Type-Options: nosniff');
    echo $json;
    exit;
}
function fail(string $why, int $code): void {
    out(json_encode(['error' => $why]), $code, $code === 404 ? 60 : 0);
}

cors();
$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') { http_response_code(204); exit; }
if ($method !== 'GET' && $method !== 'HEAD') fail('method', 405);

// Pages 100-899, optional subpage 1-99. Nothing else ever reaches NOS.
$p = (string) ($_GET['p'] ?? '');
if (!preg_match('/^[1-8]\d\d(-[1-9]\d?)?$/', $p)) fail('badpage', 400);

if (!is_dir($cacheDir)) @mkdir($cacheDir, 0700, true);

// --- per-IP rate limit (one small file per IP hash, fixed window) -----------
$ipKey = $cacheDir . '/rl_' . substr(hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '?') . __FILE__), 0, 20);
$now = time();
$rl = @json_decode((string) @file_get_contents($ipKey), true);
if (!is_array($rl) || ($now - (int) ($rl['t'] ?? 0)) > RATE_WINDOW) $rl = ['t' => $now, 'n' => 0];
$rl['n']++;
@file_put_contents($ipKey, json_encode($rl), LOCK_EX);
if ($rl['n'] > RATE_LIMIT) { header('Retry-After: 60'); fail('ratelimit', 429); }

// --- cache -------------------------------------------------------------------
$file = $cacheDir . '/p_' . $p . '.json';
$age = is_file($file) ? $now - (int) filemtime($file) : PHP_INT_MAX;
if ($age < TTL) {
    header('X-Teletext-Age: ' . $age);
    out((string) file_get_contents($file), 200, TTL - $age);
}

// --- fetch from NOS ----------------------------------------------------------
$ch = curl_init(UPSTREAM . $p);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_TIMEOUT        => 6,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_USERAGENT      => 'RetroVault-Teletext/1.0 (+https://retrovault.world)',
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
$body = curl_exec($ch);
$code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

if ($code === 200 && is_string($body) && $body !== '') {
    $data = json_decode($body, true);
    if (is_array($data) && isset($data['content']) && is_string($data['content'])) {
        @file_put_contents($file . '.tmp', $body, LOCK_EX);
        @rename($file . '.tmp', $file);
        header('X-Teletext-Age: 0');
        out($body, 200, TTL);
    }
}
// NOS answers an unknown page with 404 or an empty 200.
if ($code === 404 || ($code === 200 && ($body === '' || $body === false))) fail('notfound', 404);

// NOS unreachable or answered nonsense: an older copy beats nothing.
if ($age < STALE_MAX) {
    header('X-Teletext-Stale: 1');
    header('X-Teletext-Age: ' . $age);
    out((string) file_get_contents($file), 200, 15);
}
fail('upstream', 502);
