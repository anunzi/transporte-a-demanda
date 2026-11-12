# Plan del bloque 1 — Sistema de diseño

Fecha: 2026-11-12 · Pedido por Matías · Planificado con Fable, lo programa Opus.

Este plan concreta el bloque 1 de la sección 8 del brief (`docs/punto-de-partida.md`). Si algo de aquí contradice al brief, manda el brief, salvo las decisiones anotadas en `CLAUDE.md`.

## Qué se entrega

Las «piezas de Lego» con las que después se arman las 30 pantallas: colores, tipografía, componentes, los tres armazones de página, el logo, los iconos y **una página de muestra** donde se ve todo junto. **Ninguna pantalla del inventario todavía.**

Al terminar, se para y Matías revisa la página de muestra.

## Archivos a crear

Todo dentro de `tad-mockup/` (carpeta nueva en la raíz del repositorio):

```
tad-mockup/
├── css/
│   ├── tokens.css
│   ├── components.css
│   ├── layout-backoffice.css
│   ├── layout-mobile.css
│   ├── layout-public.css
│   └── demo.html
├── assets/
│   ├── logo-tad.svg            (horizontal: pictograma + «TAD» + «Plataforma Digital TAD»)
│   ├── logo-tad-compacto.svg   (pictograma + «TAD»)
│   ├── icons/                  (32 iconos, un .svg por icono)
│   └── illustrations/          (vacía por ahora, con un .gitkeep)
└── (carpetas viajero/, app-viajero/, app-conductor/, control/, motor/, crm/, flota/, economica/, admin/, bi/, js/ vacías con .gitkeep)
```

Además, fuera de `tad-mockup/`: `.claude/launch.json` con un servidor estático local (por ejemplo `python -m http.server` sobre `tad-mockup/`) para poder revisar en el navegador.

## Decisiones ya tomadas (no volver a discutirlas)

1. **Sin JavaScript en este bloque.** `ui.js` es del bloque 2. En la página de muestra, modal, panel lateral y aviso se muestran en su estado abierto con una clase (`.is-open`), sin interacción.
2. **Rutas relativas siempre.** `demo.html` está en `css/`, así que carga `tokens.css` directo y los assets con `../assets/…`.
3. **Marca en un solo lugar.** El nombre «TAD», el logo y los colores solo aparecen en los dos SVG del logo y en `tokens.css`. La marca puede cambiar.
4. **Logo dibujado con trazos, no con texto.** Las letras «TAD» van como formas (`<path>`), para que el logo se vea igual aunque no cargue la tipografía. Pictograma: una furgoneta simple sobre una línea de ruta con dos puntos de parada. Usa `--tad-blue-900` y `--tad-green-700` (en el SVG van los valores escritos, porque un SVG externo no lee las variables; es la única excepción a «sin colores escritos a mano»). Incluir una variante en claro para el menú lateral oscuro: se resuelve con el mismo archivo copiado inline y `currentColor`.
5. **Tipografía.** Inter desde Google Fonts, pesos 400/500/600/700, con `display=swap` y `preconnect`. La pila de respaldo del brief va en `--font-sans`. Si Google Fonts no carga, todo debe seguir legible.
6. **Sin modo oscuro.** Solo tema claro.
7. **Punto de quiebre del backoffice.** El menú lateral se colapsa a 72 px por debajo de 1200 px de ancho, así a 1024 px ya está colapsado y no hay scroll horizontal.
8. **Foco de teclado.** `:focus-visible` con contorno de 3 px y separación de 2 px, en un token `--focus-ring`. Tiene que verse sobre fondo blanco y sobre el menú azul oscuro (ahí, contorno claro).
9. **Animaciones mínimas** (transiciones de 150 ms) y respetando `prefers-reduced-motion`.

## Atención: colores del brief que no pasan accesibilidad AA

El brief exige contraste 4.5:1 en texto. Con cálculo aproximado, estos usos **no llegan**:

| Combinación | Contraste aprox. | Problema |
| --- | --- | --- |
| Texto blanco sobre `--tad-orange-600` | 3,0 | Cabecera del centro de control, botones de aviso |
| Texto blanco sobre `--tad-teal-600` | 4,1 | Cabecera de Flota |
| Texto blanco sobre `--tad-blue-500` | 4,1 | Color «info» |
| Texto `--tad-orange-600` sobre `--tad-orange-100` | < 3 | Badge «Retraso / Pendiente» |
| Texto `--ink-500` sobre blanco o `--surface-alt` | 4,2–4,4 | Texto secundario |

Solución (sin cambiar cómo se ve la paleta; se **agregan** tonos, no se reemplazan):

- Agregar tonos oscuros **solo para texto**: `--tad-orange-800`, `--tad-yellow-800`, `--tad-teal-800`, `--tad-green-800`, `--tad-red-800`, `--tad-purple-800`, y `--ink-600` para texto secundario. Agregar los fondos suaves que faltan: `--tad-teal-100`, `--tad-purple-100`.
- Cada acento de módulo define su pareja: `--accent` (fondo) y `--on-accent` (color del texto encima). Naranja y amarillo llevan texto `--ink-900`; verde, rojo, morado y los azules 700/900 llevan blanco; teal lleva blanco solo si se oscurece a un tono que pase, o `--ink-900` si no.
- Los badges usan fondo `-100` + texto `-800`.
- **Verificar con un script** (`herramientas/contraste.py`; y `herramientas/colores_sueltos.py` para los colores escritos a mano — ver `docs/plan.md`) todas las parejas texto/fondo que usa el sistema y pegar la tabla de resultados en el informe final. Elegir los valores exactos de los tonos nuevos para que pasen 4.5:1.

## `tokens.css`

- Paleta completa del brief (sección 4.2), más `--tad-teal-600: #0f8b8d`, `--tad-purple-600: #6a3fb5` y los tonos nuevos de arriba.
- Semánticos del brief, más `--color-text`, `--color-text-muted`, `--color-border`, `--focus-ring`.
- Tipografía: `--font-sans`; escala `--fs-12 … --fs-36` (12/14/16/18/22/28/36); pesos; interlineados 1.5 y 1.2.
- Espaciado `--sp-1` (4 px) … `--sp-8` (32 px), `--sp-10`, `--sp-12`. Radios `--r-sm/md/lg/pill`. Sombras `--shadow-1` y `--shadow-2`, nada más.
- Medidas de armazón: `--sidebar-w: 256px`, `--sidebar-w-collapsed: 72px`, `--topbar-h: 64px`, `--phone-w: 390px`, `--phone-h: 844px`.
- Acento por módulo con `body[data-module="…"]` que fija `--accent` y `--on-accent`. Valores de `data-module`: `viajero`, `motor`, `control`, `conductor`, `crm`, `flota`, `economica`, `admin`, `bi`. («IA responsable» queda fuera por ahora: pendiente de decisión.)

## `components.css`

Todos los componentes de la sección 4.5 del brief, con prefijo `.c-`, nombres estilo BEM (`.c-card__header`, `.c-btn--primary`), y **cada uno con estados hover, focus-visible y disabled**. Lista de control:

`c-btn` (primary, secondary, ghost, danger, sm, lg, icon) · `c-field` + `c-input`, `c-select`, `c-textarea`, `c-checkbox`, `c-radio`, `c-switch` (con etiqueta, ayuda y error) · `c-card` · `c-kpi` (valor, etiqueta, variación ↑/↓, hueco para sparkline) · `c-table` (cabecera fija, hover, acciones, estado vacío) · `c-badge` (success, warning, danger, info, neutral) · `c-tabs` · `c-breadcrumb` · `c-pagination` · `c-modal` · `c-drawer` · `c-toast` · `c-timeline` · `c-stepper` · `c-map` (altura fija, leyenda superpuesta, y estado «Mapa no disponible» en gris) · `c-avatar` · `c-chip` · `c-empty-state` · `c-alert` · `c-phone-frame` (notch, barra de estado con 9:41, señal y batería, contenido con scroll).

Reglas: ningún color, fuente o medida escritos a mano fuera de `tokens.css`; botones de al menos 44 × 44 px dentro de `.c-phone-frame` y en el layout público en móvil.

## Los tres layouts

- **`layout-backoffice.css`**: menú lateral fijo de 256 px (fondo `--tad-blue-900`, logo arriba, grupos por módulo, usuario abajo), barra superior de 64 px (migas, buscador, campana con contador, selector de territorio «Comarca de la Sierra Norte», avatar), contenido con 32 px de margen sobre `--surface-alt`, cabecera de página con el acento del módulo. Colapsa a iconos bajo 1200 px.
- **`layout-public.css`**: cabecera blanca (logo, menú Inicio · Reservar · Mis viajes · Ayuda, botón «Mi cuenta»), contenido centrado a 1200 px, pie institucional con tres sellos ficticios en texto y pictograma propio («Ayuntamiento», «Consorcio de Transportes», «Cofinanciado por la Unión Europea»; sin el emblema real). En móvil el menú se apila.
- **`layout-mobile.css`**: página con `--surface-alt`, `.c-phone-frame` centrado, nombre de la pantalla debajo, barra superior de app de 56 px, barra inferior de 4 pestañas (variante viajero) y variante sin barra inferior y de alto contraste (conductor).
- En los tres: el enlace discreto «← Índice del mockup» arriba a la derecha.

## Iconos (32)

SVG de 24 × 24 de lienzo, pensados para mostrarse a 20 px, `fill="none"`, `stroke="currentColor"`, trazo 1.75, puntas y uniones redondeadas. Dibujados propios, mismo estilo en todos:

`inicio`, `mapa`, `ruta`, `parada`, `furgoneta`, `conductor`, `usuario`, `usuarios`, `calendario`, `reloj`, `campana`, `buscar`, `filtro`, `ajustes`, `telefono`, `mensaje`, `correo`, `alerta`, `incidencia`, `check`, `cerrar`, `mas`, `editar`, `descargar`, `flecha-derecha`, `flecha-izquierda`, `chevron-abajo`, `grafico`, `euro`, `documento`, `accesibilidad`, `hoja` (sostenibilidad).

## `css/demo.html`

Página única, en castellano de España, con índice arriba y una sección por tema:

1. Marca: los dos logos, sobre claro y sobre azul oscuro.
2. Colores: todas las muestras con nombre del token; los acentos por módulo con su texto encima.
3. Tipografía: la escala y los pesos.
4. Iconos: la rejilla de los 32 con su nombre.
5. Cada componente con **todas** sus variantes y estados (normal, hover forzado con clase, foco, deshabilitado, error).
6. Los tres layouts en miniatura: un backoffice de ejemplo, una cabecera y pie públicos, y dos teléfonos (viajero y conductor).

Textos de ejemplo tomados del brief (Josefa Martín, ruta R2, 4521 LKT…), nunca «lorem ipsum».

## Cómo se da por terminado

- `demo.html` abre en el navegador local **sin errores en consola**.
- Revisado a 1440 px, 1024 px y 390 px: sin scroll horizontal.
- Búsqueda automática: ningún color en hexadecimal fuera de `tokens.css` (excepto los dos SVG del logo).
- Tabla de contrastes generada por script, todo el texto en 4.5:1 o más.
- Recorrido con teclado (Tab) por la página de muestra: el foco se ve siempre.
- Con Google Fonts bloqueado, la página sigue legible.
- Peso de `demo.html` con todo cargado, por debajo de 1 MB.
- Commit en `main` y línea en `docs/bitacora.md`. **No se sube nada al hosting.**

## Qué revisa Matías al final

Abre la página de muestra y contesta:

1. ¿El logo y los colores se ven institucionales y serios?
2. ¿Los botones, tarjetas y tablas tienen el aspecto que esperas para presentar a un organismo público?
3. ¿El teléfono del viajero y el del conductor se distinguen bien?
4. ¿Algo que cambiar antes de construir las pantallas? (Es el momento más barato para hacerlo.)

## Mensaje de arranque para la sesión de Opus

```
Lee CLAUDE.md, docs/punto-de-partida.md completo, docs/plan.md y docs/plan-bloque-1.md.
Construye el bloque 1 (sistema de diseño) siguiendo el plan al pie de la letra,
dentro de tad-mockup/. No generes ninguna pantalla del inventario.
Verifica en el navegador local y con el script de contrastes antes de dar nada por terminado.
Al final: commit en main, línea en la bitácora, y cuéntale a Matías en lenguaje simple
qué creaste, qué decisiones de diseño tomaste y qué tiene que revisar. No subas nada al hosting.
```
