"""Busca enlaces rotos en la maqueta.

Uso:  python herramientas/enlaces.py                 (estricto: cualquier enlace roto es error)
      python herramientas/enlaces.py --pendientes    (los enlaces a pantallas del inventario que
                                                      todavía no existen se avisan, pero no fallan)

Revisa todos los href y src locales de los .html de tad-mockup/ (los de http, #, mailto: y tel:
no se revisan) y comprueba que el archivo exista. Sale con código 1 si hay algún roto.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "tad-mockup"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    pendientes_ok = "--pendientes" in sys.argv
    data = (RAIZ / "js" / "data.js").read_text(encoding="utf-8")
    datos = json.loads(re.search(r"/\*DATOS-INICIO\*/(.*?)/\*DATOS-FIN\*/", data, re.S).group(1))
    inventario = {p["archivo"] for p in datos["pantallas"]} | {"index.html", "paginas.html"}

    rotos, pendientes, revisados = [], set(), 0
    for html in sorted(RAIZ.rglob("*.html")):
        rel = html.relative_to(RAIZ).as_posix()
        if rel == "404.html":  # usa rutas absolutas a propósito (la sirve el hosting en cualquier carpeta)
            continue
        texto = html.read_text(encoding="utf-8")
        # Quitar los <script> en línea: allí las rutas se construyen con código
        sin_js = re.sub(r"<script>.*?</script>", "", texto, flags=re.S)
        for m in re.finditer(r'(?:href|src)="([^"]+)"', sin_js):
            url = m.group(1)
            if re.match(r"^(https?:|//|#|mailto:|tel:|data:|javascript:)", url):
                continue
            revisados += 1
            ruta = url.split("#")[0].split("?")[0]
            if not ruta:
                continue
            destino = (html.parent / ruta).resolve()
            if destino.is_dir():
                destino = destino / "index.html"
            if destino.exists():
                continue
            try:
                destino_rel = destino.relative_to(RAIZ.resolve()).as_posix()
            except ValueError:
                destino_rel = None
            if pendientes_ok and destino_rel in inventario:
                pendientes.add(destino_rel)
            else:
                rotos.append(f"{rel}: «{url}» no existe")
    for r in rotos:
        print("ROTO:", r)
    if pendientes:
        print("Pantallas enlazadas que todavía no existen (" + str(len(pendientes)) + "): " + ", ".join(sorted(pendientes)))
    print(f"\n{revisados} enlaces revisados, {len(rotos)} rotos.")
    sys.exit(1 if rotos else 0)


if __name__ == "__main__":
    main()
