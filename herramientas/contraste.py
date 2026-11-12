"""Comprueba el contraste (WCAG 2.1 AA) de todas las parejas texto/fondo del sistema de diseño.

Uso:  python herramientas/contraste.py            (tabla en pantalla)
      python herramientas/contraste.py --md       (tabla en Markdown)

Lee los valores reales de tad-mockup/css/tokens.css, así que si cambia la paleta
basta con volver a correrlo. Sale con código 1 si alguna pareja no llega al mínimo.
- Texto: 4,5:1
- Elementos que no son texto (bordes de campos, foco, interruptores): 3:1
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
TOKENS = RAIZ / "tad-mockup" / "css" / "tokens.css"

TEXTO, GRAFICO = 4.5, 3.0

# (uso, color de primer plano, fondo, mínimo)
PAREJAS = [
    # Texto general
    ("Texto principal sobre blanco", "--color-text", "--surface", TEXTO),
    ("Texto principal sobre fondo suave", "--color-text", "--surface-alt", TEXTO),
    ("Texto secundario sobre blanco", "--color-text-muted", "--surface", TEXTO),
    ("Texto secundario sobre fondo suave", "--color-text-muted", "--surface-alt", TEXTO),
    ("Texto secundario sobre gris claro", "--color-text-muted", "--ink-100", TEXTO),
    ("Enlace sobre blanco", "--color-link", "--surface", TEXTO),
    ("Enlace sobre fondo suave", "--color-link", "--surface-alt", TEXTO),
    ("Título de página (azul oscuro) sobre fondo suave", "--tad-blue-900", "--surface-alt", TEXTO),
    # Botones
    ("Botón principal", "--surface", "--tad-blue-700", TEXTO),
    ("Botón principal, ratón encima", "--surface", "--tad-blue-900", TEXTO),
    ("Botón secundario", "--tad-blue-700", "--surface", TEXTO),
    ("Botón secundario/discreto, ratón encima", "--tad-blue-800", "--tad-blue-100", TEXTO),
    ("Botón de peligro", "--surface", "--tad-red-600", TEXTO),
    ("Botón de peligro, ratón encima", "--surface", "--tad-red-800", TEXTO),
    ("Botón desactivado", "--color-disabled-text", "--color-disabled-bg", TEXTO),
    # Formularios
    ("Mensaje de error de un campo", "--tad-red-800", "--surface", TEXTO),
    ("Texto de campo desactivado", "--color-disabled-text", "--color-disabled-bg", TEXTO),
    # Etiquetas de estado
    ("Etiqueta «En servicio / Confirmada»", "--tad-green-800", "--tad-green-100", TEXTO),
    ("Etiqueta «Retraso / Pendiente»", "--tad-orange-800", "--tad-orange-100", TEXTO),
    ("Etiqueta «Incidencia / Cancelada»", "--tad-red-800", "--tad-red-100", TEXTO),
    ("Etiqueta «Programada»", "--tad-blue-800", "--tad-blue-100", TEXTO),
    ("Etiqueta «Finalizada»", "--ink-700", "--ink-100", TEXTO),
    # Indicadores
    ("Variación positiva (↑)", "--tad-green-800", "--surface", TEXTO),
    ("Variación negativa (↓)", "--tad-red-800", "--surface", TEXTO),
    # Navegación
    ("Página actual de la paginación", "--surface", "--tad-blue-700", TEXTO),
    ("Filtro (chip) activado", "--tad-blue-800", "--tad-blue-100", TEXTO),
    ("Contador de pestaña", "--ink-700", "--ink-100", TEXTO),
    ("Menú del portal público", "--ink-700", "--surface", TEXTO),
    ("Pestaña inactiva de la app", "--ink-600", "--surface", TEXTO),
    ("Pestaña activa de la app", "--tad-blue-700", "--surface", TEXTO),
    ("Enlace «Índice del mockup» en la franja gris", "--ink-600", "--ink-100", TEXTO),
    # Avisos
    ("Aviso emergente (toast)", "--surface", "--ink-900", TEXTO),
    ("Botón cerrar del aviso emergente", "--ink-300", "--ink-900", TEXTO),
    ("Alerta informativa", "--ink-900", "--tad-blue-100", TEXTO),
    ("Alerta de éxito", "--ink-900", "--tad-green-100", TEXTO),
    ("Alerta de retraso", "--ink-900", "--tad-orange-100", TEXTO),
    ("Alerta de error", "--ink-900", "--tad-red-100", TEXTO),
    ("«Mapa no disponible»", "--ink-700", "--ink-100", TEXTO),
    # Avatares
    ("Avatar azul", "--tad-blue-800", "--tad-blue-100", TEXTO),
    ("Avatar verde", "--tad-green-800", "--tad-green-100", TEXTO),
    ("Avatar naranja", "--tad-orange-800", "--tad-orange-100", TEXTO),
    ("Avatar morado", "--tad-purple-800", "--tad-purple-100", TEXTO),
    # Menú lateral y pie (fondo azul oscuro)
    ("Menú lateral: enlaces", "--ink-100", "--tad-blue-900", TEXTO),
    ("Menú lateral: títulos de grupo y rol", "--ink-300", "--tad-blue-900", TEXTO),
    ("Menú lateral: nombre de usuario", "--surface", "--tad-blue-900", TEXTO),
    ("Contador de la campana", "--surface", "--tad-red-600", TEXTO),
    ("Pie institucional: texto", "--ink-100", "--tad-blue-900", TEXTO),
    ("Pie institucional: texto pequeño", "--ink-300", "--tad-blue-900", TEXTO),
    # App del conductor (alto contraste)
    ("Conductor: texto sobre fondo", "--surface", "--ink-900", TEXTO),
    ("Conductor: texto secundario sobre fondo", "--ink-300", "--ink-900", TEXTO),
    ("Conductor: texto sobre tarjeta", "--surface", "--ink-800", TEXTO),
    ("Conductor: texto secundario sobre tarjeta", "--ink-300", "--ink-800", TEXTO),
    ("Conductor: botón principal (amarillo)", "--ink-900", "--tad-yellow-500", TEXTO),
    ("Conductor: botón principal, ratón encima", "--ink-900", "--tad-yellow-100", TEXTO),
    ("Conductor: rótulo «Próxima parada»", "--tad-yellow-500", "--tad-blue-900", TEXTO),
    ("Conductor: datos de la próxima parada", "--ink-100", "--tad-blue-900", TEXTO),
    # Mapas y gráficos (bloque 2)
    ("Etiquetas y ejes de los gráficos", "--chart-text", "--surface", TEXTO),
    ("Etiqueta y tooltip del mapa", "--surface", "--ink-900", TEXTO),
    ("Icono del vehículo en servicio", "--surface", "--estado-servicio", GRAFICO),
    ("Icono del vehículo con retraso", "--ink-900", "--estado-retraso", GRAFICO),
    ("Icono del vehículo parado", "--surface", "--estado-parado", GRAFICO),
    # Elementos que no son texto (3:1)
    ("Borde de los campos de formulario", "--color-border-strong", "--surface", GRAFICO),
    ("Foco de teclado sobre blanco", "--focus-color", "--surface", GRAFICO),
    ("Foco de teclado sobre fondo suave", "--focus-color", "--surface-alt", GRAFICO),
    ("Foco de teclado sobre azul oscuro", "--focus-color-on-dark", "--tad-blue-900", GRAFICO),
    ("Foco de teclado en la app del conductor", "--focus-color-on-dark", "--ink-900", GRAFICO),
    ("Interruptor apagado", "--ink-500", "--surface", GRAFICO),
    ("Interruptor encendido", "--tad-green-700", "--surface", GRAFICO),
    ("Casilla y opción marcadas", "--tad-blue-700", "--surface", GRAFICO),
    ("Círculo de paso pendiente", "--ink-500", "--surface", GRAFICO),
    ("Ruta del logo sobre azul oscuro", "--tad-green-300", "--tad-blue-900", GRAFICO),
    ("Ruta del logo sobre blanco", "--tad-green-700", "--surface", GRAFICO),
]


def leer_tokens():
    css = re.sub(r"/\*.*?\*/", "", TOKENS.read_text(encoding="utf-8"), flags=re.S)
    raiz = re.search(r":root\s*\{(.*?)\n\}", css, re.S).group(1)
    base = dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", raiz))
    modulos = {}
    for sel, cuerpo in re.findall(r"(body\[data-module[^{]+)\{([^}]*)\}", css):
        decl = dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", cuerpo))
        for nombre in re.findall(r'data-module="([\w-]+)"', sel):
            modulos[nombre] = decl
    return base, modulos


def resolver(valor, tabla, base):
    valor = valor.strip()
    for _ in range(10):
        m = re.fullmatch(r"var\((--[\w-]+)\)", valor)
        if not m:
            break
        valor = (tabla.get(m.group(1)) or base[m.group(1)]).strip()
    if not re.fullmatch(r"#[0-9a-fA-F]{6}", valor):
        raise ValueError(f"No sé leer el color {valor!r}")
    return valor


def luminancia(hexa):
    canales = [int(hexa[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in canales]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contraste(a, b):
    la, lb = sorted([luminancia(a), luminancia(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    base, modulos = leer_tokens()
    filas = []
    for uso, fg, bg, minimo in PAREJAS:
        cf, cb = resolver(f"var({fg})", {}, base), resolver(f"var({bg})", {}, base)
        filas.append((uso, fg, bg, contraste(cf, cb), minimo))
    for nombre, decl in modulos.items():
        filas.append((f"Módulo {nombre}: cabecera y menú activo", "--on-accent", "--accent",
                      contraste(resolver(decl["--on-accent"], decl, base), resolver(decl["--accent"], decl, base)), TEXTO))
        filas.append((f"Módulo {nombre}: texto sobre fondo suave", "--accent-text", "--accent-soft",
                      contraste(resolver(decl["--accent-text"], decl, base), resolver(decl["--accent-soft"], decl, base)), TEXTO))

    md = "--md" in sys.argv
    fallos = 0
    if md:
        print("| Uso | Texto / elemento | Fondo | Contraste | Mínimo | Resultado |")
        print("| --- | --- | --- | --- | --- | --- |")
    for uso, fg, bg, c, minimo in filas:
        ok = c >= minimo
        fallos += not ok
        res = "OK" if ok else "NO PASA"
        cifra = f"{c:.2f}".replace(".", ",")
        if md:
            print(f"| {uso} | `{fg}` | `{bg}` | {cifra}:1 | {str(minimo).replace('.', ',')}:1 | {res} |")
        else:
            print(f"{res:8} {cifra:>6}:1 (mín. {minimo})  {uso}")
    print(f"\n{len(filas)} parejas revisadas, {fallos} no pasan.")
    sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main()
