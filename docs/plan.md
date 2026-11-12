# Plan general de la maqueta TAD

Fecha: 2026-11-12 · Pedido por Matías · Planificado con Fable, lo programa Opus.

La especificación es `docs/punto-de-partida.md` (el brief). Este plan no la repite: la ordena en sesiones de trabajo, fija las decisiones que el brief deja abiertas y dice cómo se comprueba cada entrega. Si un plan contradice al brief, manda el brief, salvo las decisiones anotadas en `CLAUDE.md`.

## Mapa del proyecto

| Sesión | Plan | Qué se entrega | Pantallas | Qué revisa Matías |
| --- | --- | --- | --- | --- |
| 1 | `plan-bloque-1.md` | Sistema de diseño y página de muestra | 0 | Aspecto general: logo, colores, componentes |
| 2 | `plan-bloque-2.md` | Datos ficticios, mapas, gráficos, menú, y página de prueba | 0 | Que la «historia» del día sea creíble |
| 3a | `plan-bloque-3.md` | Centro de control (define el armazón del backoffice) | 2 | La pantalla más importante de la demo |
| 3b | `plan-bloque-3.md` | Motor de optimización y Flota | 4 | |
| 3c | `plan-bloque-3.md` | CRM y Económica | 4 | |
| 3d | `plan-bloque-3.md` | Administración pública y BI | 4 | Backoffice completo y navegable |
| 4 | `plan-bloque-4.md` | Portal web del viajero | 5 | Flujo de reserva de punta a punta |
| 5a | `plan-bloque-5.md` | App móvil del viajero | 5 | |
| 5b | `plan-bloque-5.md` | App móvil del conductor | 4 | Las dos apps |
| 6 | `plan-bloque-6.md` | Landing, acceso e índice | 3 | La puerta de entrada de la presentación |
| 7 | `plan-bloque-7.md` | Control de calidad, README y publicación | 0 | Lista de control completa y el enlace público |

Total: 30 pantallas + índice, en 11 sesiones. Cada sesión termina con commit en `main`, una línea en `docs/bitacora.md` y un resumen en lenguaje simple para Matías. **Se para al final de cada sesión hasta que Matías dé el OK.**

## Orden y dependencias

- 1 → 2 → 3a van sí o sí en ese orden: todo lo demás se apoya en ellos.
- Después de 3a, el resto (3b, 3c, 3d, 4, 5a, 5b) no depende entre sí. Por defecto se hace **en fila**, que es lo más simple de revisar.
- Si se quiere acelerar, esas seis sesiones pueden correr en paralelo, cada una en su propia copia de trabajo, con una condición: **ninguna toca los archivos compartidos** (`css/tokens.css`, `css/components.css`, los layouts, `js/*.js`). Si a una le falta un componente, lo anota en su resumen y se agrega al sistema en una sesión aparte.
- 6 va después de que existan todas las pantallas (el índice las enlaza). 7 va al final.

## Reglas comunes a todas las sesiones

1. Leer `CLAUDE.md`, el brief completo y el plan del bloque antes de escribir código.
2. Todo vive en `tad-mockup/`. Rutas relativas siempre. Sin framework, sin compilación, sin dependencias externas salvo Leaflet y Google Fonts.
3. Ningún color, fuente ni medida fuera de `css/tokens.css`. Si falta un componente, se agrega a `components.css` y a la página de muestra, no a la pantalla.
4. Los datos salen de `js/data.js`. En el HTML no se escribe a mano ningún dato que exista ahí (nombres, matrículas, horas, importes, conteos).
5. Interfaz en castellano de España, sin voseo, sin «lorem ipsum», sin «TODO» visibles, sin datos reales.
6. Los scripts van con `defer` y como scripts clásicos (no módulos), para que la maqueta también abra con doble clic desde una carpeta.
7. Antes de dar algo por terminado: abrirlo en el navegador local, mirar la consola y correr las comprobaciones de `herramientas/`.
8. Nada se sube al hosting hasta el bloque 7, y solo con el OK de Matías.

## Herramientas de comprobación

Viven en `herramientas/` (raíz del repositorio, fuera de `tad-mockup/`, no se suben al hosting). Son scripts de Python sin dependencias. Se van creando en el bloque donde hacen falta y se corren en todos los siguientes:

| Script | Lo crea | Qué comprueba |
| --- | --- | --- |
| `contraste.py` | Bloque 1 | Todas las parejas texto/fondo del sistema llegan a 4.5:1 |
| `colores_sueltos.py` | Bloque 1 | No hay colores escritos a mano fuera de `tokens.css` |
| `datos.py` | Bloque 2 | Las cuentas de `data.js` cierran (ver plan del bloque 2) |
| `enlaces.py` | Bloque 3a | Ningún `href` ni `src` local apunta a un archivo que no existe |
| `menu.py` | Bloque 3a | El menú lateral y la barra superior son idénticos en todo el backoffice |
| `datos_sueltos.py` | Bloque 3a | Ninguna matrícula, nombre o código de reserva está escrito a mano en un HTML |
| `peso.py` | Bloque 7 | Ninguna página con sus archivos supera 1 MB |
| `todo.py` | Bloque 7 | Corre todas las anteriores y saca un informe |

## Decisiones tomadas

Las de marca, publicación, mapa, vehículo 9951 KZD y Cl@ve están en `CLAUDE.md`. Las que se tomaron al planificar:

- **Dos momentos del día.** El brief fija el reloj a las 09:40, pero la pantalla de seguimiento dice «Llegada estimada 10:12 (4 min)». Las dos cosas son ciertas si la maqueta muestra dos momentos: **09:40** en todo el backoffice y la app del conductor, y **10:08** en las dos pantallas de seguimiento del viajero. La recogida de Josefa estaba prevista a las 10:00 y llega 10:12 por el retraso de 12 minutos de la ruta R2. Detalle en el plan del bloque 2.
- **Reservas de grupo.** Para que 6 reservas «en curso» sumen los 23 viajeros a bordo que pide el brief, algunas reservas son de varias personas (acompañantes y grupos del centro de día).
- **Rutas dibujadas a mano.** Las rutas en el mapa son líneas fijas aproximadas; no van pegadas exactamente a las carreteras, porque eso exigiría un servicio externo de rutas.
- **Límites municipales inventados.** Los 5 municipios se dibujan como áreas aproximadas alrededor de sus núcleos.
- **Miniaturas del índice.** Esquemas en SVG por tipo de pantalla, no capturas (pesan menos y no hay que rehacerlas si cambia algo). Se puede revisar en el bloque 6.

## Pendiente de Matías

- **Logo de Cl@ve**: para el bloque 6 hace falta el archivo del logo, o el OK para redibujarlo.
- **OK de publicación**: en el bloque 7.
