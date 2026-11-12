# Bitácora

- 2026-11-12 · inicio · Proyecto creado: maqueta de Transporte a demanda para Kuanthico, aparte del panel. Matías.
- 2026-11-12 · documento de partida · Matías pasó el brief `TAD-MOCKUP-BRIEF.md`; quedó guardado sin cambios en `docs/punto-de-partida.md`.
- 2026-11-12 · marca · La maqueta **no lleva marca de Kuanthico ni de Anunzi**. Por ahora la marca es TAD y puede cambiar más adelante. Matías.
- 2026-11-12 · alcance y stack · Quedan definidos por el brief: maqueta navegable no funcional (30 pantallas + índice), HTML/CSS/JS puros, datos ficticios. Matías (vía brief).
- 2026-11-12 · forma de trabajo · Se planifica con Fable y se programa con Opus. Se construye por bloques (sección 8 del brief) con parada para revisión al final de cada uno. Matías.

- 2026-11-12 · publicación · Se aloja en un sitio nuevo de Hostinger en la misma cuenta de Anunzi: `dodgerblue-aardvark-898542.hostingersite.com`, carpeta `public_html/tad/`. Acceso SSH verificado (solo lectura): la carpeta existe y está vacía salvo la página por defecto de Hostinger. Matías.
- 2026-11-12 · mapa · Se acepta el mapa real de fondo con nombres de pueblos reales. Matías.
- 2026-11-12 · vehículo 9951 KZD · Queda «En servicio (sustitución)»; se ajustan los conteos de flota. Matías.
- 2026-11-12 · Cl@ve · El enlace «Acceder con Cl@ve» lleva el logo, como excepción a «sin logos reales». Matías.

- 2026-11-12 · publicación · Corrección: la maqueta va en la **raíz** del sitio nuevo, no en una subcarpeta `tad/`. Matías.
- 2026-11-12 · plan bloque 1 · Escrito `docs/plan-bloque-1.md` (sistema de diseño). Incluye un hallazgo: varios colores del brief no llegan al contraste AA con texto blanco; se resuelve agregando tonos oscuros para texto, sin cambiar la paleta. Matías pidió el plan.
- 2026-11-12 · plan completo · Escritos el plan general (`docs/plan.md`) y los planes de los bloques 2 a 7: 11 sesiones en total. Decisiones tomadas al planificar: dos momentos del día (09:40 en backoffice y conductor, 10:08 en el seguimiento del viajero), reservas de grupo para que cierren los 23 viajeros a bordo, rutas y límites municipales dibujados a mano, miniaturas del índice en esquema. Matías pidió el plan del proyecto entero.
- 2026-11-12 · IA responsable · No va en el menú lateral ni tiene pantalla propia; queda solo el panel dentro de las reglas del motor, como pide el brief. Matías.
- 2026-11-12 · bloque 1 terminado · Sistema de diseño en `tad-mockup/` (tokens, componentes, tres armazones, logo, 32 iconos) y página de muestra `tad-mockup/css/demo.html`. Herramientas `contraste.py` (85 parejas, todas pasan; tabla en `docs/contraste.md`) y `colores_sueltos.py` (0 colores sueltos). Revisado en navegador a 1440, 1024 y 390 px, con teclado y sin Google Fonts. Decisiones: Flota usa como acento un verde azulado más oscuro (`--tad-teal-700`) porque el del brief no pasa AA ni con texto blanco ni oscuro; naranja y amarillo llevan texto oscuro; bordes de campos en `--ink-500`; app del conductor en tema oscuro con botón principal amarillo. Pendiente: revisión de Matías. Matías pidió el bloque.
- 2026-11-12 · publicación · Bloque 1 aprobado («todo perfecto») y publicado con el OK de Matías en la raíz de `https://dodgerblue-aardvark-898542.hostingersite.com/` para mostrarlo al cliente. Se quitó la página de bienvenida de Hostinger (`default.php`; copia guardada fuera del repositorio). `index.html` es **provisional** (lleva al sistema de diseño) hasta el bloque 6. `robots.txt` y `noindex` para que no aparezca en buscadores. Matías.

## Pendientes y dudas abiertas (2026-11-12)

- **Logo de Cl@ve**: para el bloque 6 hace falta el archivo, o el OK para redibujarlo.
- **Miniaturas del índice**: ¿esquemas o capturas reales? Se decide en el bloque 6.
