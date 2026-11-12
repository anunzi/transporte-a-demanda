# Plan del bloque 2 — Datos y utilidades

Requiere: bloque 1 aprobado. Leer antes `docs/plan.md` (reglas comunes) y las secciones 5 y 6 del brief.

## Qué se entrega

La «historia» ficticia del martes 14 de abril de 2026, escrita una sola vez, y las utilidades que todas las pantallas usan para mostrarla: menú, pestañas y avisos, mapas y gráficos. Más **una página de prueba** que lo usa todo. Ninguna pantalla del inventario todavía.

## Archivos

```
tad-mockup/js/data.js      datos + funciones de consulta y de formato
tad-mockup/js/ui.js        pestañas, modales, panel lateral, avisos, desplegables, tablas ordenables, pasos
tad-mockup/js/nav.js       ítem activo del menú, migas, colapso del menú, enlace al índice
tad-mockup/js/maps.js      mapas con Leaflet
tad-mockup/js/charts.js    gráficos en SVG
tad-mockup/js/prueba.html  página de prueba (se queda en el proyecto, como css/demo.html)
herramientas/datos.py      comprobación de coherencia de los datos
```

## `data.js`: la historia canónica

Un único objeto `window.TAD`. Estos hechos son **fijos**; el resto de los datos se inventa alrededor de ellos respetando la sección 6 del brief.

### Dos momentos

- `TAD.ahora` = 14/04/2026 **09:40**. Lo usan el backoffice y la app del conductor.
- `TAD.ahoraSeguimiento` = 14/04/2026 **10:08**. Lo usan solo `viajero/seguimiento.html` y `app-viajero/seguimiento.html`.

### Flota, conductores y rutas de hoy

| Ruta | Vehículo | Conductor/a | A bordo 09:40 | Nota |
| --- | --- | --- | --- | --- |
| R1 | 1177 KJR (12 plazas, PMR) | Luis Benavente | 6 | |
| R2 | 4521 LKT (16 plazas, PMR) | Carmen Ortega | 5 | Retraso de 12 min por obras en la CM-1004 |
| R3 | 9951 KZD (19 plazas, PMR) | Fátima El Mansouri | 9 | Sustituye al 6604 LBC |
| R4 | 2293 MFG (8 plazas) | Andrés Pacheco | 3 | |
| — | 8830 MNP (9 plazas) | Rosa Calleja (turno de tarde) | — | Disponible, en la base de Valdecerro |
| — | 6604 LBC | — | — | En mantenimiento |

- Suma a bordo: 6 + 5 + 9 + 3 = **23**. Servicios activos: **4**. En el mapa del control: **5 vehículos** (el 6604 no aparece).
- Estados de flota: 5 en servicio (el 9951 como «En servicio (sustitución)»), 1 en mantenimiento, 0 en reserva, 3 adaptados PMR.
- Indicadores del día que se guardan como dato fijo (no se calculan): puntualidad 94 %, ocupación media 61 %, −38 % de km frente a servicio individual, 42 kg de CO₂ evitados.

### La ruta R2, parada por parada

Tiene que incluir, en este orden y con el retraso de 12 minutos aplicado desde antes de las 09:40:

- A las 09:40 el vehículo va camino de **Consultorio (Santa Olalla)**: llega en 2 min (09:42; prevista 09:30). Suben 3, baja 1 → quedan 7 a bordo.
- Siguiente recogida: **Navalespino**, prevista 10:00, estimada **10:12**. A las 10:08 el vehículo está a 4 min, con **7/16** plazas ocupadas. Ahí sube Josefa.
- Destino de Josefa: **Centro de Salud (Valdecerro)**.
- Las paradas anteriores a las 09:40 figuran como realizadas.

### La reserva de referencia

- Código **TAD-2026-04187**. Josefa Martín Ruiz, 78 años, Navalespino, perfil mayor, canal preferido teléfono.
- Navalespino → Centro de Salud (Valdecerro), ruta R2, vehículo 4521 LKT, conductora Carmen Ortega.
- Tarifa interzona 2,20 € con bonificación de mayor 50 % → **1,10 €**. Pago con tarjeta ···· 4417.
- Estado a las 09:40: Confirmada.

### Reservas del día (24)

- Estados a las 09:40: 9 Finalizadas (franja 07:00–09:00), 6 En curso, 7 Confirmadas (una es la de Josefa), 1 Cancelada, 1 Pendiente con alternativa propuesta.
- Cada reserva tiene número de viajeros. Las 6 «En curso» suman 23 y se reparten por ruta 6 / 5 / 9 / 3. Para lograrlo hay reservas de grupo (acompañantes, «Centro de día de Valdecerro», etc.).
- Cada reserva apunta a un usuario de los 12, a una ruta, a parada de origen y destino, hora, importe y forma de pago.
- Los 12 usuarios: 4 mayores, 2 PMR, 3 estudiantes, 3 generales. DNI con formato `00000000X` que **no** sea válido (letra de control incorrecta a propósito). Teléfonos con el formato `6XX XXX 123`, parcialmente ocultos.

### Resto de datos

- 5 municipios, 12 núcleos, 18 paradas (tipos fija, virtual, intercambiador), todos con coordenadas alrededor de 40.9 N, −3.6 O. Zonas A y B.
- Por vehículo: km, próxima ITV, seguro «Mutua Comarcal», último mantenimiento, consumo medio, posición a las 09:40 (y para el 4521, también a las 10:08).
- 2 incidencias, tal como las describe el brief.
- Historial de 30 días (15/03 a 13/04/2026): viajes, viajeros, km, ocupación, puntualidad y CO₂ por día. **Valores fijos escritos en el archivo**, sin azar, con menos actividad los fines de semana.
- Tarifas y bonificaciones de la sección 6.6. Liquidación de marzo de 2026: unos 11.400 € de ingresos y 2.900 € de bonificaciones, con desglose por municipio.
- Facturas (usuarios, ayuntamientos, operadores), conversaciones del CRM, encuestas y reclamación de Josefa, informes generados: lo mínimo que piden las pantallas de la sección 7.

### Funciones dentro de `TAD`

- Consulta: `TAD.reserva(codigo)`, `TAD.usuario(id)`, `TAD.vehiculo(matricula)`, `TAD.ruta(id)`, `TAD.parada(id)`, `TAD.reservasDe(usuarioId)`, `TAD.viajerosEnParada(rutaId, paradaId)`, `TAD.tarifa(origen, destino, perfil)`.
- Formato: `TAD.fmt.euros(1.1)` → «1,10 €», `TAD.fmt.hora`, `TAD.fmt.fecha`, `TAD.fmt.porcentaje` (con espacio antes de %, como en España), `TAD.fmt.estado(estado)` → clase de badge.

## `herramientas/datos.py`

Lee `data.js` (los datos deben ir en un bloque que se pueda extraer como JSON) y falla si algo no cierra:

- 24 reservas con el reparto de estados 9/6/7/1/1.
- Las «En curso» suman 23 y coinciden por ruta con «a bordo».
- Ningún vehículo supera sus plazas en ningún tramo de ninguna ruta.
- Toda reserva apunta a usuario, ruta y paradas que existen; todo conductor y vehículo de una ruta existe.
- El importe de cada reserva es el que da `tarifa()` con su bonificación.
- La liquidación de marzo suma lo mismo que su desglose por municipio.
- Los conteos de flota (5/1/0, 3 PMR) salen de la lista de vehículos.
- 12 usuarios con el reparto 4/2/3/3; 18 paradas; 12 núcleos; 5 municipios.

## `ui.js`

Comportamiento solo visual, activado por atributos `data-` (sin escribir JavaScript en cada pantalla):

- Pestañas, modal, panel lateral, aviso (`toast`), desplegable, tabla ordenable, pasos del flujo de reserva (siguiente/anterior), chips de filtro, interruptores.
- `data-toast="Reserva confirmada…"` en cualquier botón muestra el aviso.
- Accesible: roles y `aria-` correctos, tecla Esc cierra, el foco queda atrapado dentro del modal y vuelve al botón que lo abrió, los avisos se anuncian (`aria-live`).

## `nav.js`

- Marca el ítem activo del menú leyendo `data-page` del `<body>`; fija el acento con `data-module`.
- Arma las migas a partir de `data-page`.
- Botón para colapsar el menú lateral.
- El menú y la barra superior siguen escritos en cada HTML, como pide el brief; `nav.js` no los genera.

## `maps.js`

- Leaflet 1.9.4 por CDN, con comprobación de integridad (SRI). Fondo de OpenStreetMap **con su atribución visible** (es obligatoria).
- Si Leaflet no cargó o los mosaicos fallan: el contenedor queda en gris con «Mapa no disponible».
- Funciones: `TADMapa.crear(elemento, opciones)` y capas para paradas (por tipo), rutas (líneas fijas con puntos intermedios), vehículos (color por estado), zona de obras (polígono), municipios (áreas aproximadas, coloreadas por demanda), calor de demanda por parada (círculos) y parada resaltada.
- Marcadores hechos con HTML/SVG propio (no las imágenes por defecto de Leaflet, que fallan con rutas relativas).
- Leyenda superpuesta.

## `charts.js`

SVG generado desde los datos, con colores leídos de los tokens (`getComputedStyle`), título y descripción accesibles, y una tabla de datos oculta para lectores de pantalla.

Tipos: línea, línea con tramo de predicción punteado, barras, área, donut, medidor (gauge) y minigráfico (sparkline).

## `js/prueba.html`

Una página con el armazón del backoffice que muestre: la ficha de la reserva TAD-2026-04187 leída de los datos, la tabla de las 24 reservas ordenable, un mapa con todas las capas, un gráfico de cada tipo y un botón para cada comportamiento de `ui.js`.

## Cómo se da por terminado

- `datos.py` pasa.
- `prueba.html` sin errores en consola; mapa y gráficos visibles.
- Con el CDN de Leaflet bloqueado: «Mapa no disponible» y el resto de la página funciona.
- Recorrido con teclado: modal, panel lateral y pestañas se manejan sin ratón.
- `contraste.py` y `colores_sueltos.py` siguen pasando.

## Qué revisa Matías

1. ¿La historia del día es creíble para alguien de una administración pública?
2. ¿Los nombres de pueblos, paradas y personas suenan bien?
3. ¿El mapa con rutas dibujadas «a mano» se ve aceptable?
4. ¿Los gráficos tienen el aspecto serio que se busca?

## Mensaje de arranque

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-2.md.
Construye el bloque 2 (datos y utilidades) siguiendo el plan. No generes pantallas del inventario.
Corre herramientas/datos.py y revisa js/prueba.html en el navegador antes de terminar.
Al final: commit en main, línea en la bitácora y resumen en lenguaje simple para Matías.
```
