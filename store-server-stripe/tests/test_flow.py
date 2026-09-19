import json, time, hmac, hashlib, urllib.request, urllib.parse, sqlite3, os, sys

BASE = 'http://127.0.0.1:9010'
SECRET = 'whsec_testsecret'
DB = '/home/claude/stripe-test/private/licenses.sqlite'
ok, fail = [], []

def check(name, cond, detail=''):
    (ok if cond else fail).append(name + (' — ' + detail if detail and not cond else ''))

def req(path, data=None, headers=None, method=None, raw=False, origin=None):
    url = BASE + path
    body = None
    h = dict(headers or {})
    if origin: h['Origin'] = origin
    if isinstance(data, dict):
        body = urllib.parse.urlencode(data).encode()
        h.setdefault('Content-Type', 'application/x-www-form-urlencoded')
    elif isinstance(data, bytes):
        body = data
    r = urllib.request.Request(url, data=body, headers=h, method=method)
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, (resp.read() if raw else resp.read().decode()), dict(resp.headers)
    except urllib.error.HTTPError as e:
        return e.code, (e.read() if raw else e.read().decode()), dict(e.headers)

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
opener = urllib.request.build_opener(NoRedirect)

def get_noredirect(path):
    try:
        with opener.open(BASE + path) as r:
            return r.status, dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers)

def event(typ, obj, eid=None, ts=None, secret=SECRET, tamper=False):
    ev = {'id': eid or ('evt_' + hashlib.md5(json.dumps(obj, sort_keys=True).encode()).hexdigest()[:16]),
          'type': typ, 'data': {'object': obj}}
    payload = json.dumps(ev)
    t = ts or int(time.time())
    sig = hmac.new(secret.encode(), f'{t}.{payload}'.encode(), hashlib.sha256).hexdigest()
    if tamper: sig = 'f' * 64
    return payload.encode(), {'Stripe-Signature': f't={t},v1={sig}', 'Content-Type': 'application/json'}

def db():
    c = sqlite3.connect(DB); c.row_factory = sqlite3.Row; return c

# ---------------------------------------------------------------- 1. checkout
code, headers = get_noredirect('/checkout.php?game=new_test')
check('checkout returns 303 to Stripe', code == 303 and 'checkout.stripe.example' in headers.get('Location',''), f'{code} {headers.get("Location")}')
code2, _ = get_noredirect('/checkout.php?game=no_such_game')
check('unknown game refused', code2 == 404, str(code2))

time.sleep(0.6)
cap = [c for c in json.load(open('captured.json')) if c['auth']]
p = cap[-1]['params']
check('session: price + qty', p.get('line_items[0][price]') == ['price_TEST123'] and p.get('line_items[0][quantity]') == ['1'])
check('session: automatic_tax on', p.get('automatic_tax[enabled]') == ['true'])
check('session: tax_id_collection on', p.get('tax_id_collection[enabled]') == ['true'])
check('session: metadata.game', p.get('metadata[game]') == ['new_test'] and p.get('client_reference_id') == ['new_test'])
check('session: NO payment_method_types', not any(k.startswith('payment_method_types') for k in p))
check('session: integration_identifier tagged', len(p.get('integration_identifier',[''])[0].split('-')[-1]) == 8)
check('session: success_url carries the placeholder', '{CHECKOUT_SESSION_ID}' in p.get('success_url',[''])[0])
check('session: bearer + pinned API version', cap[-1]['auth'] == 'Bearer rk_test_dummy' and cap[-1]['version'] == '2026-08-26.dahlia')

# ---------------------------------------------------------------- 2. webhook
paid = {'id':'cs_live_1','object':'checkout.session','payment_status':'paid','payment_intent':'pi_1',
        'amount_total':699,'currency':'eur','metadata':{'game':'new_test'},
        'customer_details':{'email':'buyer@example.com','name':'Ada Lovelace'}}
body, h = event('checkout.session.completed', paid)
st, out, _ = req('/webhook.php', body, h)
check('webhook accepts a signed event', st == 200, f'{st} {out}')
rows = db().execute('select * from licenses').fetchall()
check('one licence minted', len(rows) == 1 and rows[0]['game'] == 'new_test', str([dict(r) for r in rows]))
KEY = rows[0]['key'] if rows else ''
check('key format RV-XXXX-XXXX-XXXX-XXXX', len(KEY) == 22 and KEY.startswith('RV-') and KEY.count('-') == 4, KEY)
check('buyer name + email stored', rows and rows[0]['email'] == 'buyer@example.com' and rows[0]['name'] == 'Ada Lovelace')

st, out, _ = req('/webhook.php', body, h)          # exact replay
check('replayed event is a no-op', st == 200 and '"duplicate":true' in out, out)
check('still one licence after replay', len(db().execute('select * from licenses').fetchall()) == 1)

body_b, h_b = event('checkout.session.completed', dict(paid, id='cs_live_bad'), eid='evt_bad', tamper=True)
st, _, _ = req('/webhook.php', body_b, h_b)
check('forged signature rejected', st == 400, str(st))

body_o, h_o = event('checkout.session.completed', dict(paid, id='cs_live_old'), eid='evt_old', ts=int(time.time()) - 4000)
st, _, _ = req('/webhook.php', body_o, h_o)
check('replay of an old timestamp rejected', st == 400, str(st))

body_w, h_w = event('checkout.session.completed', dict(paid, id='cs_live_w'), eid='evt_w', secret='whsec_other')
st, _, _ = req('/webhook.php', body_w, h_w)
check('wrong signing secret rejected', st == 400, str(st))

# delayed payment method: completed-but-unpaid must NOT mint
unpaid = dict(paid, id='cs_ideal_1', payment_status='unpaid', payment_intent='pi_ideal')
b1, h1 = event('checkout.session.completed', unpaid, eid='evt_ideal_1')
st, out, _ = req('/webhook.php', b1, h1)
check('unpaid session mints nothing', st == 200 and '"pending":true' in out, out)
check('still one licence', len(db().execute('select * from licenses').fetchall()) == 1)
b2, h2 = event('checkout.session.async_payment_succeeded', dict(unpaid, payment_status='paid'), eid='evt_ideal_2')
st, out, _ = req('/webhook.php', b2, h2)
rows2 = db().execute("select * from licenses where checkout_session='cs_ideal_1'").fetchall()
check('async success mints the licence', st == 200 and len(rows2) == 1, out)
IDEAL_KEY = rows2[0]['key'] if rows2 else ''

# ---------------------------------------------------------------- 3. thanks
st, html, _ = req('/thanks.php?session_id=cs_live_1')
check('thank-you page shows the key', st == 200 and KEY in html, str(st))
st, js, _ = req('/thanks.php?poll=1&session_id=cs_nope')
check('poll for an unknown session says not ready', '"ok":false' in js, js)

# ---------------------------------------------------------------- 4. activation
def act(key, game='new_test', device='Test box'):
    st, out, _ = req('/api.php', {'action':'activate','key':key,'game':game,'device':device},
                     origin='https://demo.retrovault.world')
    return st, json.loads(out)

st, j = act(KEY)
check('activate works', st == 200 and j.get('ok') and j.get('instance'), json.dumps(j))
INST = j.get('instance')
check('activate reports usage 1 of 10', j.get('usage') == 1 and j.get('limit') == 10, json.dumps(j))
check('stamp code is 8 hex chars', len(j.get('code','')) == 8, json.dumps(j))

# sloppy retyping: lower case, spaces, O for 0 and I for 1
sloppy = KEY.lower().replace('-', ' ').replace('0','O').replace('1','I')
st, j2 = act(sloppy)
check('sloppy retyped key still works', st == 200 and j2.get('ok'), sloppy + ' -> ' + json.dumps(j2))

for i in range(8):
    st, j3 = act(KEY, device=f'box {i}')
check('10 slots all usable', j3.get('usage') == 10, json.dumps(j3))
st, j4 = act(KEY, device='one too many')
check('11th activation refused with "limit"', st == 403 and j4.get('reason') == 'limit', f'{st} {json.dumps(j4)}')

st, out, _ = req('/api.php', {'action':'deactivate','key':KEY,'game':'new_test','instance':INST},
                 origin='https://demo.retrovault.world')
check('deactivate frees a slot', json.loads(out).get('ok'), out)
st, j5 = act(KEY, device='after freeing one')
check('activate works again after freeing', st == 200 and j5.get('usage') == 10, json.dumps(j5))
INST2 = j5.get('instance')

st, j6 = act(KEY, game='new_other')
check('a key for another game is refused', st == 403 and j6.get('reason') == 'wrong-product', f'{st} {json.dumps(j6)}')
st, j7 = act('RV-ZZZZ-ZZZZ-ZZZZ-ZZZZ')
check('unknown key refused', st == 403 and j7.get('reason') == 'invalid', json.dumps(j7))

# ---------------------------------------------------------------- 5. the ROM
st, blob, hdrs = req('/api.php', {'action':'rom','key':KEY,'game':'new_test','instance':INST2},
                     raw=True, origin='https://demo.retrovault.world')
orig = open('private/Test Game.bin','rb').read()
check('ROM served', st == 200 and len(blob) > 0, str(st))
check('ROM size unchanged by the stamp', len(blob) == len(orig), f'{len(blob)} vs {len(orig)}')
row = db().execute('select * from licenses where key=?', (KEY,)).fetchone()
expect = b'RV#' + str(row['id']).encode() + b'/'
check('stamp written into the filler run', expect in blob, repr(blob[1024:1060]))
check('code in the file matches the one activate returned', j5.get('code','').encode() in blob)
check('game code outside the filler is untouched', blob[:1024] == orig[:1024] and blob[1088:] == orig[1088:])
check('licensee name in the header', 'Ada' in urllib.parse.unquote(hdrs.get('X-Vault-Licensee','')))

# ---------------------------------------------------------------- 6. refunds
b, h = event('charge.refunded', {'id':'ch_1','object':'charge','payment_intent':'pi_1',
                                 'amount':699,'amount_refunded':699}, eid='evt_refund')
st, out, _ = req('/webhook.php', b, h)
check('refund accepted', st == 200, out)
st, j8 = act(KEY)
check('a refunded key stops working', st == 403 and j8.get('reason') == 'revoked', f'{st} {json.dumps(j8)}')
st, blob2, _ = req('/api.php', {'action':'rom','key':KEY,'game':'new_test','instance':INST2},
                   raw=True, origin='https://demo.retrovault.world')
check('a refunded key can no longer fetch the ROM', st == 403, str(st))

# a partial refund is not a revocation
b, h = event('charge.refunded', {'id':'ch_2','object':'charge','payment_intent':'pi_ideal',
                                 'amount':699,'amount_refunded':100}, eid='evt_partial')
req('/webhook.php', b, h)
st, j9 = act(IDEAL_KEY)
check('a partial refund leaves the key alone', st == 200 and j9.get('ok'), f'{st} {json.dumps(j9)}')

b, h = event('charge.dispute.created', {'id':'dp_1','object':'dispute','payment_intent':'pi_ideal'}, eid='evt_dispute')
req('/webhook.php', b, h)
st, j10 = act(IDEAL_KEY)
check('a disputed key stops working', st == 403 and j10.get('reason') == 'revoked', f'{st} {json.dumps(j10)}')

# ---------------------------------------------------------------- 7. misc
st, out, _ = req('/api.php', {}, method='GET', origin='https://demo.retrovault.world')
check('GET on api.php refused', st == 405, str(st))
st, _, hdrs = req('/api.php', {}, method='OPTIONS', origin='https://demo.retrovault.world')
check('CORS preflight allows the Vault origin', hdrs.get('Access-Control-Allow-Origin') == 'https://demo.retrovault.world', json.dumps(hdrs))
st, _, hdrs = req('/api.php', {}, method='OPTIONS', origin='https://evil.example')
check('CORS refuses an unknown origin', 'Access-Control-Allow-Origin' not in hdrs, json.dumps(hdrs))

print('\n'.join('  PASS  ' + o for o in ok))
print('\n'.join('  FAIL  ' + f for f in fail))
print(f'\n{len(ok)} passed, {len(fail)} failed')
sys.exit(1 if fail else 0)
