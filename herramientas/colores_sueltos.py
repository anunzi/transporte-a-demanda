"""Busca colores escritos a mano fuera de tad-mockup/css/tokens.css.

Uso:  python herramientas/colores_sueltos.py

Regla del brief: ninguna pantalla ni componente define colores propios; todo sale de
los tokens (var(--...)). Se revisan:
- archivos .css y .js completos (sin comentarios),
- en .html y .svg: bloques <style>, atributos style="" y atributos fill/stroke/color.
Se ignoran tokens.css y los dos SVG del logo (un SVG externo no puede leer variables).
Sale con código 1 si encuentra alguno.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
MAQUETA = RAIZ / "tad-mockup"
EXCLUIDOS = {"css/tokens.css", "assets/logo-tad.svg", "assets/logo-tad-compacto.svg"}

NOMBRES = ("white|black|red|green|blue|yellow|orange|purple|gray|grey|silver|navy|teal|"
           "maroon|olive|lime|aqua|fuchsia|pink|brown|gold|beige|tan|cyan|magenta|indigo|violet")
PATRONES = [
    re.compile(r"#[0-9a-fA-F]{3,8}\b"),
    re.compile(r"\b(?:rgba?|hsla?|hwb|lab|lch|oklch|oklab)\s*\("),
    re.compile(rf"(?:[:\s,(]|^)({NOMBRES})\b(?![-\w])", re.I),
]


def fragmentos_html(texto):
    """Devuelve (línea, fragmento) de las partes del HTML/SVG que llevan estilos."""
    for m in re.finditer(r"<style[^>]*>(.*?)</style>", texto, re.S | re.I):
        inicio = texto.count("\n", 0, m.start(1)) + 1
        for i, linea in enumerate(m.group(1).split("\n")):
            yield inicio + i, linea
    for m in re.finditer(r'\s(style|fill|stroke|color|stop-color|flood-color)="([^"]*)"', texto):
        yield texto.count("\n", 0, m.start()) + 1, f"{m.group(1)}: {m.group(2)}"


def fragmentos_codigo(texto):
    sin_comentarios = re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), texto, flags=re.S)
    for i, linea in enumerate(sin_comentarios.split("\n"), 1):
        yield i, re.sub(r"//.*$", "", linea) if "http" not in linea else linea


def es_valor_css(fragmento, m):
    """Para nombres de color, solo cuenta si está en la parte de valor de una declaración."""
    antes = fragmento[: m.start()]
    return ":" in antes


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    hallazgos = []
    for ruta in sorted(MAQUETA.rglob("*")):
        rel = ruta.relative_to(MAQUETA).as_posix()
        if ruta.suffix not in {".css", ".js", ".html", ".svg"} or rel in EXCLUIDOS:
            continue
        texto = ruta.read_text(encoding="utf-8")
        partes = fragmentos_html(texto) if ruta.suffix in {".html", ".svg"} else fragmentos_codigo(texto)
        for linea, frag in partes:
            for i, patron in enumerate(PATRONES):
                for m in patron.finditer(frag):
                    if i == 2 and not es_valor_css(frag, m):
                        continue
                    hallazgos.append(f"{rel}:{linea}: {m.group(0).strip()}  ←  {frag.strip()[:100]}")
    for h in hallazgos:
        print(h)
    print(f"\n{len(hallazgos)} colores escritos a mano fuera de tokens.css.")
    sys.exit(1 if hallazgos else 0)


if __name__ == "__main__":
    main()
