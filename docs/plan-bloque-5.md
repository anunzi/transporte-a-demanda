# Plan del bloque 5 — Apps móviles (9 pantallas, 2 sesiones)

Requiere: bloques 1 y 2 aprobados. Leer antes `docs/plan.md` y la sección 7 del brief.

## Reglas del bloque

- Todas usan `layout-mobile.css`: la pantalla va dentro de `.c-phone-frame` (390 × 844 px), centrada, con el nombre de la pantalla debajo y el enlace «← Índice del mockup» fuera del marco.
- En una ventana más baja que el teléfono, el marco se achica en proporción; nunca se corta.
- Texto a 16 px, botones de 44 × 44 px como mínimo, sin scroll horizontal dentro del marco.
- Los mapas dentro del marco usan las mismas funciones de `maps.js`.

## Sesión 5a — App del viajero (5)

`<body data-module="viajero">`. Barra superior de 56 px y barra inferior de 4 pestañas (Inicio · Reservar · Mis viajes · Perfil). La usuaria es Josefa.

Destino de las pestañas: Inicio → `home.html`; Perfil → `perfil.html`; Reservar → `confirmacion.html` (la app no tiene pantalla de flujo de reserva en el inventario); Mis viajes → `seguimiento.html`. No se inventan pantallas nuevas.

1. **`onboarding.html`** — 3 láminas con ilustración SVG propia y ligera, puntos de paginación, «Empezar» → `home.html`. Sin barra inferior. Las láminas se pasan con botón y con deslizamiento.
2. **`home.html`** — Saludo, reserva rápida, próximo viaje (10:00, Navalespino, 4521 LKT), atajos.
3. **`confirmacion.html`** — «Reserva confirmada», QR grande, código **TAD-2026-04187**, detalles, «Añadir al calendario» y «Compartir» (avisos). El QR es un patrón fijo en SVG con aspecto de QR; no hace falta que sea legible.
4. **`seguimiento.html`** — Muestra las **10:08**. Mapa a pantalla completa y tarjeta inferior deslizable con «10:12 (4 min)», Carmen Ortega, 4521 LKT y botón de llamada. La tarjeta tiene dos posiciones (recogida y abierta) y se cambia con un toque en el tirador.
5. **`perfil.html`** — Datos, badge «Mayor · bonificación 50 %», pagos (tarjeta ···· 4417, Bizum), canal de avisos, idioma, accesibilidad (texto grande y alto contraste: los interruptores **sí** cambian el aspecto dentro del marco, es un buen detalle para la demo), cerrar sesión → `../login.html`.

Las tres ilustraciones del onboarding se guardan en `assets/illustrations/` y se reutilizan en el bloque 6.

## Sesión 5b — App del conductor (4)

`<body data-module="conductor">`. Variante de **alto contraste**, botones muy grandes, sin barra inferior. La conductora es Carmen Ortega, vehículo 4521 LKT, turno de mañana. Muestra las **09:40**.

1. **`servicios.html`** — Cabecera «Carmen Ortega · 4521 LKT · Turno de mañana»; servicios del día con hora, trayecto, viajeros y estado; botón grande «Iniciar servicio R2» → `navegacion.html`. (La R2 ya está en curso a las 09:40: el botón dice «Continuar servicio R2» si así queda más coherente; elegir una y mantenerla.)
2. **`navegacion.html`** — Mapa con la R2 y la próxima parada; tarjeta «Próxima parada: Consultorio (Santa Olalla) · 2 min · 3 viajeros suben, 1 baja»; secuencia de paradas con las realizadas tachadas (Navalespino, con Josefa, aparece más abajo); «He llegado» → `recogida.html`.
3. **`recogida.html`** — Los 3 viajeros que suben en Consultorio (Santa Olalla), con badge de perfil; validar por QR (cámara simulada: un recuadro oscuro con marco de enfoque), PIN de 4 dígitos o lista; «Confirmar recogida» y «No se ha presentado».
4. **`incidencias.html`** — Tipos en tarjetas grandes, nota, envío, y el chat con la central («Obras en la CM-1004, desvío por Robledillo»).

Acceso entre pantallas: un menú simple en la barra superior (Servicios · Incidencias).

## Cómo se da por terminada cada sesión

- Cada pantalla abre sin errores en consola; revisada en ventana grande y en ventana de 390 px de ancho.
- Sin scroll horizontal dentro del marco.
- `contraste.py` cubre también la variante de alto contraste del conductor.
- Pasan todas las herramientas.
- Commit, bitácora y resumen para Matías.

## Qué revisa Matías

1. ¿Las dos apps se ven como apps de verdad dentro del teléfono?
2. ¿La del conductor se entiende de un vistazo, como para usarla al volante?
3. ¿El recorrido del conductor (servicios → navegación → recogida) se sigue bien?

## Mensaje de arranque (cambiar la letra de la sesión)

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-5.md.
Construye la sesión 5a del bloque 5 siguiendo el plan. Solo esas pantallas.
Revisa en el navegador, corre las herramientas y, al final: commit en main,
línea en la bitácora y resumen en lenguaje simple para Matías.
```
