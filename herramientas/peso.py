"""Calcula el peso de cada página de la maqueta con sus archivos propios.

Uso:  python herramientas/peso.py

Suma el HTML y los CSS, JS e imágenes locales que enlaza (href/src). No cuenta lo que se
carga de internet (tipografía, librería de mapas, teselas del mapa), que el navegador
descarga una sola vez y comparte entre páginas. Límite del brief: 1 MB por página.
Sale con código 1 si alguna lo supera.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "tad-mockup"
LIMITE = 1024 * 1024


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    filas, excedidas = [], 0
    for html in sorted(RAIZ.rglob("*.html")):
        if html.name.startswith("_"):
            continue
        texto = html.read_text(encoding="utf-8")
        total = html.stat().st_size
        vistos = set()
        for m in re.finditer(r'(?:href|src)="([^"]+)"', texto):
            url = m.group(1).split("?")[0].split("#")[0]
            if re.match(r"^(https?:|//|#|mailto:|tel:|data:)", url) or not url or url.endswith(".html") or url.endswith("/"):
                continue
            ruta = (RAIZ / url.lstrip("/")) if url.startswith("/") else (html.parent / url)
            ruta = ruta.resolve()
            if ruta in vistos or not ruta.is_file():
                continue
            vistos.add(ruta)
            total += ruta.stat().st_size
        filas.append((total, html.relative_to(RAIZ).as_posix()))
        excedidas += total > LIMITE
    for total, rel in sorted(filas, reverse=True):
        marca = "  SUPERA 1 MB" if total > LIMITE else ""
        print(f"{total / 1024:8.0f} KB  {rel}{marca}")
    print(f"\n{len(filas)} páginas. La más pesada: {max(filas)[0] / 1024:.0f} KB. {excedidas} superan 1 MB.")
    sys.exit(1 if excedidas else 0)


if __name__ == "__main__":
    main()
