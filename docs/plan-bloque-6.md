# Plan del bloque 6 — Landing, acceso e índice (3 pantallas)

Requiere: todas las pantallas de los bloques 3, 4 y 5 construidas (el índice las enlaza). Leer antes `docs/plan.md` y las secciones 5 y 7 del brief.

## Pantallas

### `landing.html`

- Usa `layout-public.css`. Bloques, en orden: hero con el lema «Personas que nos mueven», subtítulo y dos botones (Reservar un viaje → `login.html`; Cómo funciona → ancla); franja de 6 públicos con icono; «Cómo funciona» en 4 pasos; 4 resultados con cifras; «Para administraciones» → `login.html`; pie institucional.
- Las 4 cifras salen de `TAD` (viajes del mes y CO₂ del historial; 5 municipios conectados; satisfacción de las encuestas).
- Ilustración del hero: SVG propio y ligero (paisaje rural con carretera y furgoneta), en la línea de las del onboarding.
- Sin fotos, sin logos reales.

### `login.html`

- Tarjeta centrada con logo, 4 tarjetas de perfil, usuario, contraseña y «Entrar».
- Destinos: Ciudadano → `viajero/home.html`; Conductor → `app-conductor/servicios.html`; Operador → `control/mapa.html`; Administración → `admin/cuadro-mando.html`.
- Las 4 tarjetas son un grupo de opciones (se manejan con flechas y con Tab). Por defecto, Ciudadano. «Entrar» lleva al destino del perfil elegido, con cualquier texto o sin texto en los campos.
- «Acceder con Cl@ve»: botón **con el logo de Cl@ve** (excepción aprobada por Matías). Usar el archivo que pase Matías; si no lo pasa, redibujarlo en SVG lo más fiel posible y avisarle. Solo visual: muestra un aviso.
- «Registrarme como ciudadano» → `viajero/registro.html`.
- El campo de contraseña es de mentira: no guardar ni enviar nada, y `autocomplete="off"`.

### `index.html`

- Es la página desde la que se presenta la maqueta. Título, una línea de explicación («Maqueta de demostración. Los datos son ficticios.») y la cuadrícula de tarjetas.
- Una tarjeta por pantalla (30), agrupadas por módulo, con el color de acento del módulo, miniatura, nombre y descripción de una línea.
- Orden de los grupos, pensado para contar la historia: Landing y acceso · Portal del viajero · App del viajero · App del conductor · Centro de control · Motor de optimización · CRM · Flota · Económica · Administración pública · BI.
- La lista de pantallas (archivo, nombre, descripción, módulo, tipo de miniatura) se agrega a `data.js` como `TAD.pantallas`, y el índice se dibuja desde ahí.
- **Miniaturas**: esquemas en SVG, uno por tipo de pantalla (unos 8: mapa con panel, tabla, tablero de indicadores, formulario, tres columnas, teléfono, teléfono con mapa, landing), dibujados con los tokens. Si Matías prefiere capturas reales, se cambia aquí: capturas a 480 px de ancho, comprimidas, sin pasar de 1 MB en total.
- Enlace discreto a `css/demo.html` («Sistema de diseño») al pie.

## Cómo se da por terminado

- Desde `index.html` se llega a las 30 pantallas y desde todas se vuelve.
- `enlaces.py` pasa **sin ninguna excepción**.
- `login.html`: los 4 perfiles llevan a su destino; se maneja entero con teclado y el foco se ve.
- `landing.html` revisada a 1440 px y a 390 px.
- Pasan todas las herramientas. Commit, bitácora y resumen para Matías.

## Qué revisa Matías

1. ¿El índice sirve para conducir una presentación?
2. ¿La landing transmite el mensaje en los primeros cinco segundos?
3. ¿Miniaturas en esquema o capturas reales?

## Mensaje de arranque

```
Lee CLAUDE.md, docs/punto-de-partida.md, docs/plan.md y docs/plan-bloque-6.md.
Construye el bloque 6 (landing, acceso e índice) siguiendo el plan.
Revisa en el navegador, corre las herramientas y, al final: commit en main,
línea en la bitácora y resumen en lenguaje simple para Matías.
```
