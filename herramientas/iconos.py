"""Copia en línea los iconos y el logo dentro de un HTML de la maqueta.

Uso:  python herramientas/iconos.py tad-mockup/control/mapa.html [otro.html …]

En el HTML se escriben marcadores y el script los reemplaza en el mismo archivo:
  {{i:mapa}}                 icono de assets/icons/mapa.svg (20 px, clase .c-icon)
  {{i:mapa:lg}}              el mismo a 24 px (.c-icon--lg)
  {{logo:full}}              logo horizontal en línea (toma el color del texto)
  {{logo:compact:clase}}     logo compacto con una clase CSS
Después de correrlo no queda ningún marcador. Correrlo dos veces no cambia nada.
Los iconos se copian en línea (y no con <img>) para que tomen el color del texto
y para que la maqueta funcione también abriendo el archivo con doble clic.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "tad-mockup"


def icono(nombre, grande=False):
    ruta = RAIZ / "assets" / "icons" / f"{nombre}.svg"
    if not ruta.exists():
        raise SystemExit(f"No existe el icono «{nombre}» (assets/icons/{nombre}.svg).")
    svg = ruta.read_text(encoding="utf-8").strip()
    clase = "c-icon c-icon--lg" if grande else "c-icon"
    return svg.replace(' width="20" height="20"', f' class="{clase}" aria-hidden="true" focusable="false"')


def logo(tipo, clase=""):
    ruta = RAIZ / "assets" / ("logo-tad-compacto.svg" if tipo == "compact" else "logo-tad.svg")
    s = ruta.read_text(encoding="utf-8").strip()
    s = re.sub(r"<title[^>]*>.*?</title>", "", s)
    s = re.sub(r' width="\d+" height="\d+" role="img" aria-labelledby="t"', "", s)
    s = s.replace('fill="#2e7d4f" stroke="#2e7d4f"', 'style="fill:var(--logo-route);stroke:var(--logo-route)"')
    s = s.replace('stroke="#2e7d4f"', 'style="stroke:var(--logo-route)"')
    s = s.replace('fill="#ffffff"', 'style="fill:var(--logo-bg)"')
    s = s.replace("#0b3d6b", "currentColor")
    oculto = any(k in clase for k in ("bo-sidebar__logo", "pub-header__logo", "app-bar__logo"))
    etiqueta = "Plataforma Digital TAD" if tipo == "full" else "TAD"
    attrs = ' aria-hidden="true" focusable="false"' if oculto else f' role="img" aria-label="{etiqueta}"'
    if clase:
        attrs = f' class="{clase}"' + attrs
    return s.replace("<svg ", "<svg" + attrs + " ", 1)


def expandir(texto):
    texto = re.sub(r"\{\{i:([a-z-]+)(:lg)?\}\}", lambda m: icono(m.group(1), bool(m.group(2))), texto)
    texto = re.sub(r"\{\{logo:(full|compact)(?::([^}]*))?\}\}", lambda m: logo(m.group(1), m.group(2) or ""), texto)
    return texto


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    for arg in sys.argv[1:]:
        p = Path(arg)
        antes = p.read_text(encoding="utf-8")
        despues = expandir(antes)
        resto = re.findall(r"\{\{(?:i|logo):[^}]*\}\}", despues)
        if resto:
            raise SystemExit(f"{p}: quedan marcadores sin resolver: {resto}")
        if despues != antes:
            p.write_text(despues, encoding="utf-8", newline="\n")
            print(f"{p}: iconos copiados en línea")
        else:
            print(f"{p}: sin cambios")


if __name__ == "__main__":
    main()
