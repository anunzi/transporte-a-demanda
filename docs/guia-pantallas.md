# Guía para construir pantallas de la maqueta TAD

Para quien construya pantallas (bloques 3 a 6). Leer antes `CLAUDE.md`, `docs/plan.md`, el plan del bloque y la sección 7 del brief (`docs/punto-de-partida.md`), que dice qué lleva cada pantalla.

## Reglas que no se negocian

- HTML, CSS y JS puros. Scripts clásicos con `defer`; el código de la pantalla va en un `<script>` al final que espera a `DOMContentLoaded`.
- Rutas relativas siempre (`../css/tokens.css`).
- **Ningún color, fuente ni medida propia.** Solo clases `.c-*` y layouts existentes, y tokens `var(--…)`. Si hace falta maquetar algo (rejillas, márgenes), usar `style="…"` con tokens o las rejillas `bo-grid--*`, `pub-grid--*`. No se crean colores nuevos.
- **No se tocan los archivos compartidos** (`css/*.css`, `js/*.js`, `assets/`) salvo que el plan lo diga. Si falta un componente, anótalo en tu informe final.
- **Ningún dato escrito a mano** en el HTML (nombres, matrículas, códigos, horas, importes, conteos): todo se pinta desde `window.TAD`. Lo comprueba `herramientas/datos_sueltos.py`. Dentro del `<script>` sí se pueden usar ids para buscar (`TAD.vehiculo("4521 LKT")`), aunque es mejor `TAD.reservaReferencia()`.
- Castellano de España en la interfaz (sin voseo, sin anglicismos innecesarios, sin «lorem ipsum» ni «TODO»).
- Accesibilidad AA: etiquetas en todos los campos, foco visible, iconos decorativos con `aria-hidden`, botones de solo icono con `aria-label`, encabezados en orden.
- Los botones que en el producto real harían algo (Guardar, Confirmar, Asignar…) abren un aviso (`data-toast`) o una ventana (`data-open`). Nada se guarda.
- Cada pantalla lleva el enlace «← Índice del mockup» (`../index.html`).

## Backoffice (control, motor, crm, flota, economica, admin, bi)

1. Escribir el contenido en `herramientas/fuentes/<id>.html` (ver `control-mapa.html` y `control-incidencias.html` como ejemplo). Tres bloques: `<!--ACCIONES-->` (botones de la cabecera), `<!--MAIN-->` (contenido), `<!--SCRIPT-->` (JS) y `<!--FIN-->`. Si no hay mapa: línea `<!--SIN-MAPA-->`.
2. Generar: `python herramientas/nueva_pantalla.py <id> herramientas/fuentes/<id>.html`. Pone menú, barra superior, título, módulo e iconos. **Para cambiar una pantalla, se edita la fuente y se vuelve a generar** (no el HTML generado).
3. El `<id>` y el archivo salen de `TAD.pantallas` en `js/data.js`.

## Portal del viajero, apps y landing

No hay generador: se escribe el HTML directamente en `tad-mockup/…`. Usar `layout-public.css` o `layout-mobile.css` (ver los ejemplos de `css/demo.html`, sección «Armazones de página»). Marcadores `{{i:icono}}` y `{{logo:…}}` y luego `python herramientas/iconos.py <archivo>` para copiarlos en línea. Cabecera y pie (o barras de app) idénticos en todas las pantallas del mismo grupo.

`<body>` lleva siempre `data-module` y `data-page` (de `TAD.pantallas`). En las pantallas de seguimiento del viajero, además `data-momento="seguimiento"` (hora 10:08).

## Qué hay disponible

**Datos (`js/data.js`, `window.TAD`)**: `TAD.meta`, `municipios`, `nucleos`, `paradas`, `obras`, `vehiculos`, `conductores`, `personal`, `usuarios`, `rutas` (con `servicios` → `paradas` con `prevista`, `retraso`, `estimada`, `suben`, `bajan`, y `trazado`), `reservas`, `incidencias`, `tarifas`, `reglas`, `optimizacion`, `historial` (30 días), `mensual`, `prediccion`, `liquidacion`, `liquidaciones`, `facturas`, `conversaciones`, `reclamaciones`, `encuestas`, `satisfaccion`, `informes`, `informesProgramados`, `kpisHoy`, `pantallas`. Abrir el archivo para ver los campos.

Funciones: `TAD.reserva(codigo)`, `usuario(id)`, `vehiculo(matricula)`, `conductor(id)`, `ruta(id)`, `servicio(id)`, `parada(id)`, `municipio(id)`, `incidencia(id)`, `persona(id)`, `reservaReferencia()`, `reservasDe(usuarioId)`, `reservasDeRuta(id)`, `viajerosEnParada(ruta, parada)`, `aBordo(ruta, hora)`, `estadoParada(servicio, i)`, `servicioActual(ruta)`, `tarifa(origen, destino, perfil)`, `flota()`, `estadoVehiculo(v)`, `reservasPorEstado()`, `totales(dias)`, `suma(reservas)`, `momento()`.
Formato: `TAD.fmt.euros`, `numero`, `porcentaje`, `hora`, `fecha`, `fechaLarga`, `fechaCorta`, `mes`, `mesCorto`, `km`, `estado` (→ variante de badge), `badge(texto)`, `iniciales`, `html` (escapar).

**Comportamiento (`js/ui.js`)**, por atributos: pestañas (`role="tablist"`/`tab`/`tabpanel`), `data-open="id"` / `data-close`, `data-toast="…"` (+ `data-toast-title`, `data-toast-type="danger"`, `data-toast-close`), desplegable (`data-dropdown` + `aria-controls`), tabla ordenable (`.c-table__sort`; `data-value` en la celda para ordenar números), filtros con chips (`data-filter-target`, `data-filter-key`, `data-filter`), pasos (`data-stepper`, `data-step`, `data-step-next`/`prev`/`go`). API: `TADUI.toast()`, `TADUI.abrir(id)`, `TADUI.cerrar()`.

**Navegación (`js/nav.js`)**: marca el menú activo, migas (`[data-breadcrumb]`), reloj (`[data-tad-reloj]`, `[data-tad-hora]`, `[data-tad-fecha="larga"]`), usuario y avisos de la campana.

**Mapas (`js/maps.js`)**: `TADMapa.crear("#id")` y encadenar `.obras()`, `.rutas({ ids, destacar, todas })`, `.paradas({ ids, resaltar, soloRuta, etiquetas })`, `.vehiculos({ ids, seleccionar, alPulsar, etiquetas })`, `.municipios({ alPulsar })`, `.calor()`, `.encuadrar(margen)`, `.centrarEn(matricula, zoom)`, `.limpiar()`. Contenedor: `.c-map` con `.c-map__canvas` y `.c-map__fallback` («Mapa no disponible»). Leyenda: `.c-map__legend`.

**Gráficos (`js/charts.js`)**: `TADGrafico.linea`, `area`, `barras`, `donut`, `medidor`, `sparkline` (ver la cabecera del archivo). Colores con tokens `--chart-1…6`, `--ruta-r1…4`.

**Componentes** (ver `css/demo.html`): `c-btn`, `c-field`/`c-input`/`c-select`/`c-textarea`/`c-checkbox`/`c-radio`/`c-switch`, `c-card`, `c-kpi`, `c-table` (+ `is-num`, `is-wide`, `is-nowrap`), `c-badge`, `c-tabs`, `c-breadcrumb`, `c-pagination`, `c-modal`, `c-drawer`, `c-toast`, `c-timeline`, `c-stepper`, `c-map`, `c-avatar`, `c-chip`, `c-empty-state`, `c-alert`, `c-dropdown`, `c-progress`, `c-list` (`c-list__button`, `__title`, `__meta`, `__wide`), `c-datalist`, `c-phone-frame`, `c-skip-link`. Rejillas: `bo-grid--kpis|2|3|main-side|map`, `bo-stack`, `bo-sticky`, `bo-toolbar`, `pub-grid--2|3|main-side`.

## Comprobar antes de terminar

```bash
python herramientas/enlaces.py --pendientes
python herramientas/menu.py
python herramientas/datos_sueltos.py
python herramientas/colores_sueltos.py
python herramientas/datos.py
```

Y abrir cada pantalla en el navegador (servidor local: `python -m http.server 8765 --directory tad-mockup`): sin errores en consola, a 1440 y 1024 px (backoffice) o 1440 y 390 px (portal y apps), sin desplazamiento horizontal.

## Publicar

`bash herramientas/publicar.sh` (solo escribe en la carpeta del sitio de la maqueta).
