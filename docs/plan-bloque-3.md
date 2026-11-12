# Plan del bloque 3 — Backoffice (14 pantallas, 4 sesiones)

Requiere: bloques 1 y 2 aprobados. Leer antes `docs/plan.md` y la sección 7 del brief (ahí está el contenido de cada pantalla; este plan no lo repite).

## Reglas del bloque

- Todas usan `layout-backoffice.css`, con `<body data-module="…" data-page="…">`.
- Menú lateral y barra superior **idénticos** en las 14 (los comprueba `menu.py`).
- Diseño para 1440 px; a 1024 px el menú se colapsa y no hay scroll horizontal.
- Todo dato sale de `TAD`. Los botones de acción abren un aviso o un modal; no cambian nada.
- Cada pantalla lleva el enlace «← Índice del mockup».
- El backoffice muestra las **09:40**.

## Sesión 3a — Centro de control (2 pantallas)

Es la más importante: fija el armazón que copian las otras doce.

1. **Antes de nada**, definir el menú lateral definitivo. Grupos y enlaces:
   - Operación: Centro de control (`control/mapa.html`), Incidencias (`control/incidencias.html`)
   - Planificación: Rutas del día (`motor/rutas.html`), Reglas operativas (`motor/reglas.html`)
   - Atención ciudadana: Bandeja (`crm/bandeja.html`), Ficha de usuario (`crm/usuario.html`)
   - Flota: Vehículos (`flota/vehiculos.html`), Ficha de vehículo (`flota/vehiculo.html`)
   - Económica: Tarifas (`economica/tarifas.html`), Facturación (`economica/facturacion.html`)
   - Administración: Cuadro de mando (`admin/cuadro-mando.html`), Territorio (`admin/territorio.html`)
   - Análisis: Dashboard (`bi/dashboard.html`), Informes (`bi/informes.html`)
   - «IA responsable» **no va en el menú** (decidido por Matías, ver `CLAUDE.md`).
   - Usuario del pie del menú: una operadora ficticia (por ejemplo «Marta Iglesias · Operadora»), agregada a `data.js`.
2. Guardar el armazón vacío como `tad-mockup/control/_plantilla.html` para que las siguientes sesiones lo copien. (Se borra en el bloque 7.)
3. `control/mapa.html`: mapa al 65 % con 5 vehículos, 4 rutas, 18 paradas y la zona de obras; panel derecho con los 4 indicadores (4 · 23 · 94 % · 61 %), lista de vehículos y filtros; reloj «14/04/2026 09:40». Al pulsar un vehículo en la lista, el mapa lo centra.
4. `control/incidencias.html`: tabla, panel lateral con detalle y línea de tiempo, acciones, y tarjeta de vehículos de sustitución (coherente: el 9951 ya está sustituyendo; disponible queda el 8830).
5. Crear `herramientas/enlaces.py`, `menu.py` y `datos_sueltos.py`. `enlaces.py` acepta por ahora una lista de pantallas «todavía no construidas».

Matías revisa: ¿esta pantalla, proyectada en una reunión, transmite «producto real»?

## Sesión 3b — Motor de optimización y Flota (4)

- `motor/rutas.html`: lista de 4 rutas, mapa de la seleccionada, tabla de la secuencia de paradas, franja de métricas («24 reservas → 4 rutas · −38 % km · 61 % · 42 kg CO₂»), botón «Replanificar» con modal. Por defecto, seleccionada la R2.
- `motor/reglas.html`: formulario por secciones y panel «IA responsable» con 3 interruptores y enlace a la explicación (abre un modal con un texto breve y claro sobre por qué se agruparon así las reservas).
- `flota/vehiculos.html`: indicadores (6 · 5 · 1 · 0 · 3 PMR, ya ajustados), tabla, filtros, «Añadir vehículo» (modal).
- `flota/vehiculo.html`: ficha del 4521 LKT con telemetría, mini mapa, calendario de mantenimiento, documentos, incidencias y gráfico de consumo de 30 días.

## Sesión 3c — CRM y Económica (4)

- `crm/bandeja.html`: tres columnas. El hilo abierto por defecto es la llamada de Josefa atendida por el asistente de voz (con transcripción resumida, y que termina en la reserva TAD-2026-04187); también hay una conversación de WhatsApp. No nombrar proveedores tecnológicos.
- `crm/usuario.html`: ficha de Josefa con pestañas; en Viajes aparece TAD-2026-04187.
- `economica/tarifas.html`: tablas de tarifas y bonificaciones, métodos de pago con interruptores, y simulador que **sí calcula** con `TAD.tarifa()` (es lo único «vivo» y luce mucho en una demo).
- `economica/facturacion.html`: indicadores, 4 pestañas, tabla y tarjeta «Liquidación marzo 2026» con desglose por municipio. En «Facturas a usuarios» aparece el recibo de TAD-2026-04187 (1,10 €).

## Sesión 3d — Administración pública y BI (4)

- `admin/cuadro-mando.html`: 6 indicadores grandes, evolución mensual, cumplimiento de SLA, tabla por municipio, «Generar informe mensual».
- `admin/territorio.html`: mapa de los 5 municipios coloreados por demanda, lista de municipios y núcleos, editor de zonas (solo apariencia), informes programados.
- `bi/dashboard.html`: filtros y los 6 gráficos del brief, más la tarjeta de predicción con línea punteada.
- `bi/informes.html`: generador a la izquierda, vista previa a la derecha, lista de informes generados.
- Los indicadores del mes en Administración y en BI salen del **mismo** historial de 30 días: tienen que coincidir.
- Al cerrar: `enlaces.py` sin excepciones para el backoffice.

## Cómo se da por terminada cada sesión

- Cada pantalla abre sin errores en consola, revisada a 1440 px y a 1024 px.
- `menu.py`, `enlaces.py`, `datos_sueltos.py`, `colores_sueltos.py`, `contraste.py` y `datos.py` pasan.
- Si hizo falta un componente nuevo: está en `components.css` y en `css/demo.html`.
- Commit, bitácora y resumen para Matías con la lista de pantallas para abrir.

## Mensaje de arranque (cambiar la letra de la sesión)

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-3.md.
Construye la sesión 3a del bloque 3 siguiendo el plan. Solo esas pantallas.
Revisa cada pantalla en el navegador a 1440 y 1024 px y corre las herramientas antes de terminar.
Al final: commit en main, línea en la bitácora y resumen en lenguaje simple para Matías.
```
