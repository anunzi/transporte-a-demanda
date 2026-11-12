# Transporte a demanda — guía para Claude

Maqueta visual de la **Plataforma Digital TAD** (Transporte de Viajeros a Demanda).
Es un proyecto **aparte del panel de Anunzi**: no comparte código, base de datos ni despliegues con `anunzi-panel`.

## Punto de partida
- El documento de partida es `docs/punto-de-partida.md` (el brief completo de la maqueta, copiado tal cual lo pasó Matías). **Leerlo entero antes de escribir código**; es la especificación y manda sobre cualquier suposición.
- Las decisiones y pendientes se anotan en `docs/bitacora.md` con fecha (AAAA-MM-DD) y quién lo pidió.

## Idioma y tono
- **Al hablar con Matías y el equipo**: español neutro latinoamericano, con **tuteo**. **Nunca voseo** (no «podés», «tenés», «verificá»). Primero qué pasa y qué se propone, después el detalle técnico: no son programadores.
- **En la interfaz de la maqueta**: castellano de España («ayuntamiento», «municipio», «viajero», «conductor», «PMR»), como pide el brief. Tampoco voseo.

## Marca
- La maqueta sale con la marca **TAD** («Plataforma Digital TAD»). **No lleva marca de Kuanthico ni de Anunzi**: no nombrarlas en ninguna pantalla.
- La marca TAD es provisional y puede cambiar: nombre, logo y colores deben vivir en un solo lugar (logo SVG + `css/tokens.css`) para poder cambiarlos sin tocar las pantallas.
- No nombrar en la interfaz a los proveedores tecnológicos que se usen por detrás. Sin logos reales de administraciones, de la Unión Europea ni de empresas (única excepción: el logo de Cl@ve en el acceso, pedido por Matías).

## Reglas de trabajo
1. **Nada de este proyecto toca el hosting del panel**: prohibido `public_html/whatsapp-gpt`, `public_html/staging`, `~/domains/staging.anunzi.net` y los dominios de otros clientes. Si se publica en el hosting, va en su propia carpeta o subdominio, y solo con el OK de Matías.
2. Sin credenciales, tokens ni datos personales reales en el código ni en el repositorio. En la maqueta, solo datos ficticios (sección 6 del brief).
3. Cambios chicos y explicados. Lee el código antes de afirmar algo; si no pudiste verificarlo, dilo.
4. Commits en `main` de `anunzi/transporte-a-demanda`. Publicar o desplegar algo, solo con el OK de Matías.
5. Se construye **por bloques, en el orden de la sección 8 del brief, y se para al final de cada bloque** para que Matías revise. No se empieza un bloque sin cerrar el anterior.
6. No inventar pantallas fuera del inventario del brief ni cambiar el sistema de diseño desde una pantalla.

## Definido (2026-11-12, según el brief)
- **Alcance**: maqueta visual, navegable y **no funcional**: 30 pantallas + página índice, con datos ficticios. Sin servidor, sin base de datos, sin inicio de sesión real.
- **Stack**: HTML, CSS y JavaScript puros, sin framework ni paso de compilación. Únicas dependencias externas: Leaflet (mapas) y Google Fonts.
- **Carpeta**: la maqueta vive en `tad-mockup/` dentro de este repositorio; esa carpeta es la que se sube al hosting.
- **Forma de trabajo**: se planifica con Fable y se programa con Opus.

## Publicación (definido 2026-11-12)
- Va en un sitio nuevo de Hostinger, dentro de la misma cuenta de hosting de Anunzi: `dodgerblue-aardvark-898542.hostingersite.com` (dominio provisional).
- Se llega con el mismo acceso SSH de siempre (`anunzi-hosting`). Carpeta del sitio: `~/domains/dodgerblue-aardvark-898542.hostingersite.com/public_html/`. La maqueta se sube a la **raíz del sitio** (`public_html/`, no a una subcarpeta `tad/`): queda en `https://dodgerblue-aardvark-898542.hostingersite.com/`. Las rutas del código siguen siendo relativas, como pide el brief. En la raíz hay un `default.php` de Hostinger (página de bienvenida) que habrá que reemplazar en la primera subida.
- **En esa cuenta viven también el panel y los sitios de otros clientes**: solo se escribe dentro de la carpeta de este dominio. Las demás carpetas de `~/domains/` no se tocan nunca.
- Cada subida necesita el OK de Matías.

## Decisiones sobre dudas del brief (2026-11-12, Matías)
- **Mapa**: se acepta el fondo real con nombres de pueblos reales junto a los ficticios.
- **Vehículo 9951 KZD**: pasa a «En servicio (sustitución)» porque reemplaza al 6604 LBC; ajustar los conteos de flota (5 en servicio, 1 en mantenimiento, 0 en reserva) en todas las pantallas.
- **«Acceder con Cl@ve»**: lleva el logo de Cl@ve. Es la única excepción a la regla de «sin logos reales».

## Planes por bloque
- Bloque 1 (sistema de diseño): `docs/plan-bloque-1.md`.

## Pendiente de definir
- **«IA responsable»**: tiene color de módulo en el brief pero no pantalla propia. Si va o no en el menú lateral se decide más adelante; mientras tanto, no ponerla en el menú.
