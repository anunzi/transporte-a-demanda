# Plan del bloque 7 — Control de calidad, README y publicación

Requiere: bloques 1 a 6 aprobados. Leer antes `docs/plan.md` y las secciones 9 y 10 del brief.

## Parte A — Control de calidad

Crear `herramientas/peso.py` y `herramientas/todo.py`, correr todo y revisar a mano lo que un script no ve. Cada punto de la sección 9 del brief queda con su resultado:

| Punto del brief | Cómo se comprueba |
| --- | --- |
| Todas las pantallas abren desde el índice y vuelven | `enlaces.py` + recorrido en el navegador |
| Ningún enlace roto | `enlaces.py` |
| Mismo menú y barra superior; ítem activo correcto | `menu.py` + mirar las 14 |
| Datos coherentes (TAD-2026-04187, R2, 4521 LKT, Carmen Ortega) | `datos.py`, `datos_sueltos.py` y abrir las 7 pantallas donde aparece la reserva |
| Contraste AA | `contraste.py` |
| Foco visible en portal y acceso | Recorrido con teclado |
| Sin scroll horizontal a 1024 px (backoffice) ni a 390 px (apps) | Navegador a esos anchos, las 30 pantallas |
| Sin errores en consola | Abrir las 31 páginas y leer la consola |
| Mapas cargan; sin CDN, «Mapa no disponible» | Probar con el CDN bloqueado |
| Menos de 1 MB por página | `peso.py` |
| Textos sin faltas, sin relleno, sin anglicismos, sin datos reales | Lectura completa + búsqueda de «lorem», «TODO», voseo y anglicismos frecuentes |

Además:

- Borrar lo que era de trabajo: `control/_plantilla.html`, los `.gitkeep` que sobren. `css/demo.html` y `js/prueba.html` se quedan.
- Probar que la maqueta abre con doble clic desde la carpeta (sin servidor).
- Probar en un segundo navegador.

Lo que falle se corrige en esta misma sesión si es chico; si es grande, se le cuenta a Matías antes.

## Parte B — README

`tad-mockup/README.md` (sube con la maqueta) explica, en lenguaje simple:

- Qué es y qué no es (maqueta sin datos reales ni funciones reales).
- Cómo está organizada la carpeta.
- Cómo añadir una pantalla nueva.
- Cómo cambiar la marca: nombre, logo y paleta, y en qué archivos.
- Cómo subirla a un hosting.
- El resultado del control de calidad, punto por punto, con fecha.
- Limitaciones conocidas: rutas del mapa aproximadas, límites municipales inventados, pueblos reales visibles en el mapa de fondo, las dos horas (09:40 y 10:08).

Actualizar también el `README.md` de la raíz del repositorio.

## Parte C — Publicación (solo con el OK explícito de Matías)

Destino: **raíz** del sitio `dodgerblue-aardvark-898542.hostingersite.com`, es decir `~/domains/dodgerblue-aardvark-898542.hostingersite.com/public_html/`, por el acceso SSH `anunzi-hosting`.

**Cuidado**: en esa cuenta están el panel de Anunzi y los sitios de otros clientes. Solo se escribe dentro de la carpeta de este dominio. Escribir la ruta completa en cada comando y releerla antes de ejecutarlo.

Pasos:

1. Mostrar a Matías qué se va a subir (lista de archivos y peso total) y pedir el OK.
2. Mirar qué hay en el destino. Hoy solo está `default.php`, la página de bienvenida de Hostinger; hay que quitarla para que se vea el `index.html`. Guardar una copia antes (por ejemplo `default.php.bak` fuera de `public_html`).
3. Subir **el contenido** de `tad-mockup/` (no la carpeta misma, ni `docs/`, ni `herramientas/`, ni `.claude/`, ni `.git/`).
4. Comprobar en el navegador: `https://dodgerblue-aardvark-898542.hostingersite.com/` y `/index.html` abren; HTTPS activo; mapas y tipografía cargan; sin errores en consola; recorrer 5 o 6 pantallas de distintos módulos.
5. `.htaccess` solo si el hosting no fuerza HTTPS por su cuenta.
6. Anotar en la bitácora fecha, commit publicado y enlace.

Buscadores: como es una maqueta para presentar, incluir `<meta name="robots" content="noindex">` en todas las páginas y un `robots.txt` que lo impida, salvo que Matías quiera lo contrario.

## Qué revisa Matías

1. La lista de control del README: ¿todo en verde?
2. El enlace público, abierto desde su computadora y desde su teléfono.
3. ¿Listo para mostrar?

## Mensaje de arranque

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-7.md.
Haz las partes A y B (control de calidad y README). No publiques nada todavía:
al terminar, muéstrale a Matías el resultado y qué se subiría, y espera su OK para la parte C.
```
