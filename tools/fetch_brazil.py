#!/usr/bin/env python3
"""
Fetch the Philips Brazil (06AV94xx) ROMs and cover thumbnails from
odysseyclube.com into a staging folder.

Run it yourself:      python3 tools/fetch_brazil.py

Nothing is added to the library by this script. It downloads into
    _brazil_staging/roms/     the .bin files
    _brazil_staging/covers/   the cover thumbnails (140x193 png)
    _brazil_staging/manifest.json   name, size and md5 of every ROM

The manifest is the useful part: the md5s say which of these are
byte-identical to cartridges already in the Vault (most of them - the
Brazilian releases are largely the same programs under Portuguese names)
and which are genuinely different dumps worth adding as their own entry.

Only the Brazilian-exclusive dumps need to become new library rows; the
rest are already covered by the "known in Brazil as" line on the existing
game pages, which comes from brazil.js.
"""
import hashlib, json, os, sys, time, urllib.parse, urllib.request

ROMS = "https://images.odysseyclube.com/roms/brazil/"
COVERS = "https://images.odysseyclube.com/colecoes/philips-brasil/miniaturas/"
OUT = "_brazil_staging"

# (rom filename, cover filename)
GAMES = [
 ("06AV9400-Formula1-Interlagos-Criptologica.bin", "06AV9400-Formula 1-Interlagos-Cryptologic.png"),
 ("06AV9401-Bacara.bin", "06AV9401-Bacara.png"),
 ("06AV9402-Futebol-Americano.bin", "06AV9402-Futebol-Americano.png"),
 ("06AV9403-OsPanzersAtacam-BatalhaAeronaval.bin", "06AV9403-Os-Panzers-Atacam-Batalha-Aeronaval.png"),
 ("06AV9404-Boliche-Basquetebol.bin", "06AV9404-Boliche-Basquetebol.png"),
 ("06AV9405-Matemagica-JogoDaMemoria.bin", "06AV9405-Matemagica-Jogo-da-Memoria.png"),
 ("06AV9408-Basebol.bin", "06AV9408-Basebol.png"),
 ("06AV9410-Golfe.bin", "06AV9410-Golfe.png"),
 ("06AV9411-ConflitoCosmico.bin", None),
 ("06AV9412-PegueODinheiroECorra.bin", None),
 ("06AV9413-AcerteSeuNumero.bin", None),
 ("06AV9414-InvasoresDoCosmos.bin", None),
 ("06AV9415-Fliperama.bin", None),
 ("06AV9416-DueloNoVelhoOeste.bin", None),
 ("06AV9417-GuerraDeNervos.bin", None),
 ("06AV9418-EsquiNosAlpes.bin", None),
 ("06AV9419-Acoplagem-Resgate.bin", None),
 ("06AV9420-FutebolDeSalao-Hoquei.bin", None),
 ("06AV9421-LogicaChinesa.bin", None),
 ("06AV9422-Voleibol.bin", None),
 ("06AV9423-FutebolEletronico.bin", None),
 ("06AV9424-Bilhar.bin", None),
 ("06AV9425-Pachinko.bin", None),
 ("06AV9426-CacaNiqueis.bin", None),
 ("06AV9427-Barricada-Demolicao.bin", None),
 ("06AV9428-Alien.bin", None),
 ("06AV9429-EmBuscaAneisPerdidos.bin", None),
 ("06AV9430-Ovni.bin", None),
 ("06AV9431-AConquistaDoMundo.bin", None),
 ("06AV9432-MacacosMeMordam.bin", None),
 ("06AV9433-Criatividade.bin", None),
 ("06AV9434-WallStreet.bin", None),
 ("06AV9435-ComeCome2.bin", None),
 ("06AV9436-DefensoresDaLiberdade.bin", None),
 ("06AV9437-DidiNaMinaEncantada.bin", None),
 ("06AV9441-BatalhaMedieval.bin", None),
 ("06AV9442-ComeCome.bin", None),
 ("06AV9443-Acrobatas.bin", None),
 ("06AV9445-SenhorDasTrevas.bin", None),
 ("06AV9446-Tartarugas.bin", None),
 ("06AV9447-AbelhasAssassinas.bin", None),
 ("06AV9448-SerpenteDoPoder.bin", None),
 ("06AV9461-BombardeioSubmarino-TiroAoAlvo.bin", None),
 ("06AV9462-DesafioChines.bin", None),
 ("06AV9463-OMalabarista-JogoDaVelha.bin", None),
 ("06AV9464-OSegredoDoFarao.bin", None),
 ("06AV9468-Telegrafista.bin", None),
 ("06AV9469-OGatoEORato.bin", None),
 ("06AV9472-SuperBee.bin", None),
 ("06AV9473-BuracoNegro.bin", None),
 ("06AV9474-ClayPigeon.bin", None),
 ("06AV9475-ComandoNoturno.bin", None),
 ("06AV9476-BalaoTravesso.bin", None),
 ("06AV9477-BaraoVermelho.bin", None),
 ("06AV9481-DemonAttack.bin", None),
 ("06AV9482-Atlantis.bin", None),
 ("06AV9483-Frogger.bin", None),
 ("06AV9484-Popeye.bin", None),
 ("06AV9485-Qbert.bin", None),
 ("06AV9486-SuperCobra.bin", None),
]

def get(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(dest, "wb") as f:
        f.write(data)
    return data

os.makedirs(f"{OUT}/roms", exist_ok=True)
os.makedirs(f"{OUT}/covers", exist_ok=True)

manifest, failed = [], []
for i, (rom, cover) in enumerate(GAMES, 1):
    dest = f"{OUT}/roms/{rom}"
    try:
        data = get(ROMS + rom, dest)
        manifest.append({"rom": rom, "size": len(data),
                         "md5": hashlib.md5(data).hexdigest()})
        print(f"[{i:2}/{len(GAMES)}] {rom}  {len(data)} bytes")
    except Exception as e:
        failed.append((rom, str(e)))
        print(f"[{i:2}/{len(GAMES)}] FAILED {rom}: {e}")
    if cover:
        try:
            get(COVERS + urllib.parse.quote(cover), f"{OUT}/covers/{cover}")
        except Exception:
            pass
    time.sleep(0.3)          # be polite to their server

json.dump(manifest, open(f"{OUT}/manifest.json", "w"), indent=1)
print(f"\n{len(manifest)} ROMs downloaded, {len(failed)} failed")
print(f"manifest written to {OUT}/manifest.json")
if failed:
    print("failed:", ", ".join(f for f, _ in failed))
