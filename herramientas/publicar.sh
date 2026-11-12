#!/usr/bin/env bash
# Publica tad-mockup/ en la raíz del sitio de la maqueta TAD.
# Uso: bash herramientas/publicar.sh
# - Solo escribe en la carpeta de este dominio. Sobrescribe lo que cambia; no borra nada del servidor.
# - No sube docs/, herramientas/, .gitkeep ni archivos que empiecen por «_».
# - A los .css y .js propios les añade ?v=<fecha-hora> en cada HTML publicado, para que ningún
#   navegador ni la caché del hosting sirvan una versión vieja (el código fuente no se toca).
set -euo pipefail
DOMINIO="dodgerblue-aardvark-898542.hostingersite.com"
DESTINO="domains/$DOMINIO/public_html"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
VERSION="$(date +%Y%m%d-%H%M%S)"
mkdir "$TMP/sitio"
tar -cf - -C "$RAIZ/tad-mockup" --exclude='.gitkeep' --exclude='_*' . | tar -xf - -C "$TMP/sitio"
python - "$TMP/sitio" "$VERSION" <<'PY'
import re, sys, pathlib
sys.stdout.reconfigure(encoding="utf-8")
raiz, v = pathlib.Path(sys.argv[1]), sys.argv[2]
patron = re.compile(r'((?:href|src)=")(?!https?:|//)([^"?#]+\.(?:css|js))(\?v=[^"]*)?"')
n = 0
for f in raiz.rglob("*.html"):
    t = f.read_text(encoding="utf-8")
    t2, k = patron.subn(lambda m: f'{m.group(1)}{m.group(2)}?v={v}"', t)
    if k:
        f.write_text(t2, encoding="utf-8", newline="\n"); n += k
print(f"Versión {v}: {n} referencias a CSS/JS actualizadas")
PY
tar -czf "$TMP/tad.tgz" -C "$TMP/sitio" .
echo "Paquete: $(du -h "$TMP/tad.tgz" | cut -f1), $(tar -tzf "$TMP/tad.tgz" | grep -vc '/$') archivos"
scp -q "$TMP/tad.tgz" "anunzi-hosting:$DESTINO/_tad.tgz"
ssh -o BatchMode=yes anunzi-hosting "set -e; cd ~/$DESTINO && [ \"\$(pwd)\" = \"\$HOME/$DESTINO\" ] && tar -xzf _tad.tgz && rm _tad.tgz && echo \"Publicado en \$(pwd)\""
rm -rf "$TMP"
echo "https://$DOMINIO/"
