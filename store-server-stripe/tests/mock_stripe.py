import json, threading, urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

CAPTURED = []

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_POST(self):
        n = int(self.headers.get('content-length', 0))
        body = self.rfile.read(n).decode()
        CAPTURED.append({'path': self.path, 'body': body,
                         'auth': self.headers.get('Authorization'),
                         'version': self.headers.get('Stripe-Version'),
                         'params': urllib.parse.parse_qs(body)})
        if self.path == '/v1/checkout/sessions':
            out = {'id': 'cs_test_' + str(len(CAPTURED)),
                   'url': 'https://checkout.stripe.example/c/pay/cs_test_' + str(len(CAPTURED)),
                   'object': 'checkout.session'}
            code = 200
        else:
            out = {'error': {'message': 'unexpected path ' + self.path}}
            code = 404
        raw = json.dumps(out).encode()
        self.send_response(code)
        self.send_header('content-type', 'application/json')
        self.send_header('content-length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

def serve():
    srv = ThreadingHTTPServer(('127.0.0.1', 9011), H)
    srv.serve_forever()

if __name__ == '__main__':
    t = threading.Thread(target=serve, daemon=True)
    t.start()
    import time
    # dump captured requests on demand
    import signal, sys
    def dump(*a):
        open('captured.json','w').write(json.dumps(CAPTURED, indent=1))
        sys.exit(0)
    signal.signal(signal.SIGTERM, dump)
    signal.signal(signal.SIGINT, dump)
    while True:
        time.sleep(0.2)
        open('captured.json','w').write(json.dumps(CAPTURED, indent=1))
