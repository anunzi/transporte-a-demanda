"""Comprueba que el menú lateral y la barra superior sean idénticos en todo el backoffice.

Uso:  python herramientas/menu.py

Compara el <aside class="bo-sidebar"> y el <header class="bo-topbar"> de cada pantalla del
backoffice (carpetas control, motor, crm, flota, economica, admin y bi) con los de
control/_plantilla.html (o, si ya no existe, con los de control/mapa.html).
Además comprueba que cada pantalla tenga data-page y data-module válidos y que el menú
enlace a todas las pantallas del backoffice. Sale con código 1 si algo difiere.
"""
import difflib
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "tad-mockup"
CARPETAS = ["control", "motor", "crm", "flota", "economica", "admin", "bi"]


def trozos(texto):
    aside = re.search(r'<aside class="bo-sidebar".*?</aside>', texto, re.S)
    top = re.search(r'<header class="bo-topbar">.*?</header>', texto, re.S)
    return (aside.group(0) if aside else None, top.group(0) if top else None)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    data = (RAIZ / "js" / "data.js").read_text(encoding="utf-8")
    datos = json.loads(re.search(r"/\*DATOS-INICIO\*/(.*?)/\*DATOS-FIN\*/", data, re.S).group(1))
    pantallas = {p["archivo"]: p for p in datos["pantallas"]}
    ref_path = RAIZ / "control" / "_plantilla.html"
    if not ref_path.exists():
        ref_path = RAIZ / "control" / "mapa.html"
    ref_aside, ref_top = trozos(ref_path.read_text(encoding="utf-8"))
    errores = []

    backoffice = [p for p in pantallas if p.split("/")[0] in CARPETAS]
    for archivo in backoffice:
        if f'href="../{archivo}"' not in ref_aside:
            errores.append(f"El menú no enlaza a {archivo}.")

    revisadas = 0
    for carpeta in CARPETAS:
        for html in sorted((RAIZ / carpeta).glob("*.html")):
            rel = html.relative_to(RAIZ).as_posix()
            if html.name.startswith("_"):
                continue
            revisadas += 1
            texto = html.read_text(encoding="utf-8")
            aside, top = trozos(texto)
            for nombre, a, b in (("menú lateral", aside, ref_aside), ("barra superior", top, ref_top)):
                if a is None:
                    errores.append(f"{rel}: no tiene {nombre}.")
                elif a != b:
                    diff = list(difflib.unified_diff(b.splitlines(), a.splitlines(), lineterm="", n=0))[2:6]
                    errores.append(f"{rel}: el {nombre} es distinto al de la plantilla:\n    " + "\n    ".join(diff))
            m = re.search(r'<body[^>]*data-module="([^"]+)"[^>]*data-page="([^"]+)"', texto)
            if not m:
                errores.append(f"{rel}: falta data-module o data-page en <body>.")
            elif rel in pantallas and (pantallas[rel]["id"] != m.group(2) or pantallas[rel]["modulo"] != m.group(1)):
                errores.append(f"{rel}: data-page/data-module no coinciden con TAD.pantallas ({pantallas[rel]['id']}, {pantallas[rel]['modulo']}).")
            if 'aria-current="page"' in (aside or ""):
                errores.append(f"{rel}: el menú trae aria-current escrito a mano (lo pone nav.js).")
    for e in errores:
        print("DISTINTO:", e)
    print(f"\n{revisadas} pantallas del backoffice revisadas, {len(errores)} problemas.")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
