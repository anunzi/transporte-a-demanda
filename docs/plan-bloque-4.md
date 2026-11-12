# Plan del bloque 4 — Portal web del viajero (5 pantallas)

Requiere: bloques 1 y 2 aprobados (y 3a, para reutilizar las herramientas). Leer antes `docs/plan.md` y la sección 7 del brief.

## Reglas del bloque

- Todas usan `layout-public.css`, con `<body data-module="viajero" data-page="…">`. Cuerpo de texto a 16 px.
- Funcionan en escritorio **y en móvil** (390 px): sin scroll horizontal, botones de 44 × 44 px como mínimo.
- La usuaria que ha iniciado sesión es **Josefa Martín Ruiz**.
- Es el bloque donde más se va a mirar la accesibilidad: foco visible en todo, etiquetas en todos los campos, mensajes de error asociados al campo, orden de tabulación lógico.
- Cabecera y pie idénticos en las cinco. Enlace «← Índice del mockup» en todas.

## Pantallas

1. **`viajero/home.html`** — Saludo «Hola, Josefa»; tarjeta «Reservar ahora» (lleva a `reservar.html`); «Tu próximo viaje»: hoy, recogida prevista 10:00 en Navalespino, vehículo 4521 LKT, botón de seguimiento; accesos rápidos; aviso de obras en la CM-1004.
2. **`viajero/registro.html`** — Tres pasos con `c-stepper`: datos personales, perfil especial con zona de arrastrar y soltar (solo apariencia), verificación por SMS. Texto legal RGPD con casilla. Los datos de ejemplo de esta pantalla son de una persona nueva, no de Josefa.
3. **`viajero/reservar.html`** — Cuatro pasos en la misma página. El paso 4 muestra la tarifa **calculada** con `TAD.tarifa()` según origen, destino y perfil elegidos. Valores por defecto: los del viaje de Josefa (Navalespino → Centro de Salud, 2,20 € − 50 % = 1,10 €). «Confirmar reserva» muestra el aviso «Reserva confirmada. Hemos enviado un SMS al 6XX XXX 123» y ofrece ir a «Mis viajes».
4. **`viajero/seguimiento.html`** — Esta pantalla muestra las **10:08**. Mapa grande con el 4521 LKT, la ruta R2 y la parada de Josefa resaltada. Panel: «Llegada estimada 10:12 (4 min)», Carmen Ortega, 4521 LKT, 7/16 plazas, «Llamar a la central», «Cancelar viaje» (modal de confirmación). Línea de tiempo del viaje, con la nota del retraso por obras.
5. **`viajero/mis-viajes.html`** — Pestañas Próximos · Historial · Recurrentes. En Próximos, TAD-2026-04187. Tarjetas «Tus bonificaciones» (mayor 50 %) y «Resumen del mes».

## Recorrido que tiene que funcionar de corrido

Inicio → Reservar (4 pasos) → Confirmar → Mis viajes → Seguimiento → Inicio. Es el recorrido que se va a mostrar en la presentación.

## Cómo se da por terminado

- Las cinco abren sin errores en consola, revisadas a 1440 px y a 390 px.
- Recorrido completo **solo con teclado**, con el foco siempre visible.
- Con el CDN de mapas bloqueado, `seguimiento.html` muestra «Mapa no disponible» y el panel sigue sirviendo.
- Pasan todas las herramientas.
- Commit, bitácora y resumen para Matías.

## Qué revisa Matías

1. ¿Una persona mayor entendería cómo reservar?
2. ¿El recorrido completo se siente fluido para mostrarlo en vivo?
3. ¿El tono de los textos es el adecuado para un servicio público?

## Mensaje de arranque

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-4.md.
Construye el bloque 4 (portal web del viajero) siguiendo el plan. Solo esas cinco pantallas.
Revisa en el navegador a 1440 y 390 px, recorre todo con teclado y corre las herramientas.
Al final: commit en main, línea en la bitácora y resumen en lenguaje simple para Matías.
```
