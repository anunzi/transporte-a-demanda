"""Busca datos escritos a mano en el HTML de las pantallas.

Uso:  python herramientas/datos_sueltos.py

Regla del brief: los datos que existen en js/data.js (nombres de viajeros y conductores,
matrículas, códigos de reserva) no se escriben en el HTML; se pintan desde window.TAD.
Revisa las pantallas del inventario (TAD.pantallas) , index.html y paginas.html, sin contar los bloques
<script> (allí sí se pueden nombrar ids para buscar datos, p. ej. TAD.vehiculo("4521 LKT")).
No revisa css/demo.html ni js/prueba.html, que son páginas de muestra.
Sale con código 1 si encuentra alguno.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "tad-mockup"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    data = (RAIZ / "js" / "data.js").read_text(encoding="utf-8")
    D = json.loads(re.search(r"/\*DATOS-INICIO\*/(.*?)/\*DATOS-FIN\*/", data, re.S).group(1))
    buscar = []
    buscar += [(v["matricula"], "matrícula") for v in D["vehiculos"]]
    buscar += [(u["nombre"], "viajero") for u in D["usuarios"]]
    buscar += [(" ".join(u["nombre"].split()[:2]), "viajero") for u in D["usuarios"]]
    buscar += [(c["nombre"], "conductor") for c in D["conductores"]]
    buscar += [(p["nombre"], "personal") for p in D["personal"]]
    buscar += [(u["dni"], "DNI") for u in D["usuarios"]]
    patron_codigo = re.compile(r"TAD-2026-\d{5}")

    archivos = [RAIZ / p["archivo"] for p in D["pantallas"]] + [RAIZ / "paginas.html"]
    hallazgos, revisados = [], 0
    for html in archivos:
        if not html.exists():
            continue
        revisados += 1
        rel = html.relative_to(RAIZ).as_posix()
        texto = html.read_text(encoding="utf-8")
        sin_js = re.sub(r"<script\b[^>]*>.*?</script>", lambda m: "\n" * m.group(0).count("\n"), texto, flags=re.S)
        sin_js = re.sub(r"<!--.*?-->", lambda m: "\n" * m.group(0).count("\n"), sin_js, flags=re.S)
        for n, linea in enumerate(sin_js.split("\n"), 1):
            for valor, tipo in buscar:
                if valor in linea:
                    hallazgos.append(f"{rel}:{n}: {tipo} «{valor}» escrito a mano")
            for m in patron_codigo.finditer(linea):
                hallazgos.append(f"{rel}:{n}: código de reserva «{m.group(0)}» escrito a mano")
    for h in sorted(set(hallazgos)):
        print(h)
    print(f"\n{revisados} pantallas revisadas, {len(set(hallazgos))} datos escritos a mano.")
    sys.exit(1 if hallazgos else 0)


if __name__ == "__main__":
    main()
