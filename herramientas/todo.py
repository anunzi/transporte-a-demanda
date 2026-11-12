"""Corre todas las comprobaciones de la maqueta y resume el resultado.

Uso:  python herramientas/todo.py

Ejecuta, en orden: datos, contraste, colores sueltos, datos escritos a mano, menú del
backoffice, enlaces (modo estricto) y peso. Sale con código 1 si alguna falla.
"""
import subprocess
import sys
from pathlib import Path

HERR = Path(__file__).resolve().parent
PRUEBAS = [
    ("Las cuentas de los datos cierran", ["datos.py"]),
    ("Contraste de colores AA", ["contraste.py"]),
    ("Sin colores fuera de tokens.css", ["colores_sueltos.py"]),
    ("Sin datos escritos a mano en el HTML", ["datos_sueltos.py"]),
    ("Menú y barra superior idénticos", ["menu.py"]),
    ("Sin enlaces rotos", ["enlaces.py"]),
    ("Ninguna página supera 1 MB", ["peso.py"]),
]


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    fallos = 0
    for nombre, args in PRUEBAS:
        r = subprocess.run([sys.executable, str(HERR / args[0])] + args[1:], capture_output=True, text=True, encoding="utf-8")
        ultima = [l for l in r.stdout.strip().splitlines() if l.strip()][-1] if r.stdout.strip() else ""
        ok = r.returncode == 0
        fallos += not ok
        print(f"{'OK      ' if ok else 'FALLA   '} {nombre} — {ultima}")
        if not ok:
            print("         " + "\n         ".join(r.stdout.strip().splitlines()[:10]))
    print(f"\n{len(PRUEBAS) - fallos} de {len(PRUEBAS)} comprobaciones correctas.")
    sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main()
