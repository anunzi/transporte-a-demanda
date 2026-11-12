"""Crea una pantalla del backoffice a partir de tad-mockup/control/_plantilla.html.

Uso:
  python herramientas/nueva_pantalla.py <id-de-pantalla> <archivo-de-contenido.html>

- <id-de-pantalla> es el id de TAD.pantallas (p. ej. «motor-rutas»): de ahí salen la ruta del
  archivo, el título, el módulo y el icono de la cabecera.
- <archivo-de-contenido.html> tiene tres bloques, cada uno opcional salvo MAIN:
    <!--ACCIONES--> … botones de la cabecera de la página …
    <!--MAIN--> … contenido que va dentro de <main>, debajo de la cabecera …
    <!--SCRIPT--> … código JavaScript de la pantalla (sin la etiqueta <script>) …
    <!--FIN-->
  Puede usar marcadores {{i:icono}}. Si la pantalla no tiene mapa, añadir la línea
  <!--SIN-MAPA--> y se quitan Leaflet y maps.js.
- Escribe tad-mockup/<archivo> con el menú y la barra superior idénticos a la plantilla
  y copia los iconos en línea. Si el archivo ya existe, lo sobrescribe.
"""
import json
import re
import sys
from pathlib import Path

HERR = Path(__file__).resolve().parent
RAIZ = HERR.parent / "tad-mockup"
sys.path.insert(0, str(HERR))
import iconos  # noqa: E402

ICONO_MODULO = {"control": "mapa", "motor": "ruta", "crm": "mensaje", "flota": "furgoneta",
                "economica": "euro", "admin": "inicio", "bi": "grafico"}
NOMBRE_MODULO = {"control": "Centro de control", "motor": "Motor de optimización", "crm": "CRM y atención ciudadana",
                 "flota": "Gestión de flota", "economica": "Gestión económica", "admin": "Administración pública",
                 "bi": "Business Intelligence"}


def bloque(texto, nombre):
    m = re.search(rf"<!--{nombre}-->(.*?)(?=<!--(?:ACCIONES|MAIN|SCRIPT|FIN)-->)", texto, re.S)
    return m.group(1).strip("\n") if m else ""


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    pid, fuente = sys.argv[1], Path(sys.argv[2])
    data = (RAIZ / "js" / "data.js").read_text(encoding="utf-8")
    datos = json.loads(re.search(r"/\*DATOS-INICIO\*/(.*?)/\*DATOS-FIN\*/", data, re.S).group(1))
    p = next((x for x in datos["pantallas"] if x["id"] == pid), None)
    if not p:
        raise SystemExit(f"No existe la pantalla «{pid}» en TAD.pantallas.")
    texto = fuente.read_text(encoding="utf-8")
    plantilla = (RAIZ / "control" / "_plantilla.html").read_text(encoding="utf-8")

    html = plantilla
    html = html.replace("<title>TÍTULO DE LA PANTALLA · Plataforma Digital TAD</title>", f"<title>{p['nombre']} · Plataforma Digital TAD</title>")
    html = re.sub(r"<!--\s*PLANTILLA DEL BACKOFFICE.*?-->\n", "", html, flags=re.S)
    html = html.replace('data-module="control" data-page="control-mapa"', f'data-module="{p["modulo"]}" data-page="{pid}"')
    html = html.replace('<span class="bo-pagehead__module">' + iconos.icono("mapa") + " Centro de control</span>",
                        '<span class="bo-pagehead__module">' + iconos.icono(ICONO_MODULO[p["modulo"]]) + " " + NOMBRE_MODULO[p["modulo"]] + "</span>")
    html = html.replace('<h1 class="bo-pagehead__title">TÍTULO DE LA PANTALLA</h1>', f'<h1 class="bo-pagehead__title">{p["nombre"]}</h1>')
    html = html.replace('<div class="bo-pagehead__actions"></div>', '<div class="bo-pagehead__actions">' + bloque(texto, "ACCIONES") + "</div>")
    html = html.replace("      <!-- CONTENIDO DE LA PANTALLA -->", bloque(texto, "MAIN"))
    script = bloque(texto, "SCRIPT")
    html = re.sub(r"<script>\ndocument\.addEventListener\(\"DOMContentLoaded\".*?</script>",
                  lambda m: "<script>\n" + script + "\n</script>", html, flags=re.S)
    if "<!--SIN-MAPA-->" in texto:
        html = re.sub(r"<!-- Solo en pantallas con mapa: -->\n<link[^\n]*leaflet[^\n]*\n", "", html)
        html = re.sub(r"<!-- Solo en pantallas con mapa: -->\n<script[^\n]*leaflet[^\n]*\n", "", html)
        html = html.replace('<script defer src="../js/maps.js"></script>\n', "")
    else:
        html = html.replace("<!-- Solo en pantallas con mapa: -->\n", "")
    html = iconos.expandir(html)
    resto = re.findall(r"\{\{(?:i|logo):[^}]*\}\}", html)
    if resto:
        raise SystemExit(f"Quedan marcadores sin resolver: {resto}")
    destino = RAIZ / p["archivo"]
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(html, encoding="utf-8", newline="\n")
    gk = destino.parent / ".gitkeep"
    if gk.exists():
        gk.unlink()
    print(f"Escrita {destino.relative_to(RAIZ.parent)}")


if __name__ == "__main__":
    main()
