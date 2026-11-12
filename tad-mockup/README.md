# Plataforma Digital TAD — maqueta

Maqueta visual, navegable y **no funcional** de la Plataforma Digital TAD (Transporte de Viajeros a Demanda). Sirve para presentar el proyecto: todo lo que se ve es HTML, CSS y JavaScript con **datos ficticios**. No hay servidor, no se guarda nada y nadie inicia sesión de verdad.

Publicada en: https://dodgerblue-aardvark-898542.hostingersite.com/

## Cómo se recorre

- `index.html` es la **portada** (la landing institucional): es lo primero que se ve al abrir el sitio.
- Su botón de acceso lleva a `login.html`, donde se elige el perfil: Ciudadano → portal del viajero, Conductor → app del conductor, Operador → centro de control, Administración → cuadro de mando. Debajo, «Probar las versiones en la aplicación» abre la app del viajero y la del conductor.
- Dentro de cada perfil se navega con su propio menú. La barra superior «← Cambiar de perfil» vuelve al acceso.
- `paginas.html` es el **menú completo de páginas** (las 30 pantallas agrupadas por módulo), para el equipo: se llega desde un enlace discreto al pie del acceso.
- La historia es la de un solo día: **martes 14 de abril de 2026**. El backoffice y la app del conductor muestran las **09:40**; el seguimiento del viajero (web y app) muestra las **10:08**, cuando la furgoneta de Josefa está a 4 minutos.
- El hilo que une todas las pantallas: la reserva **TAD-2026-04187** de Josefa Martín, en la ruta **R2**, con el vehículo **4521 LKT** y la conductora **Carmen Ortega**, que va 12 minutos tarde por obras en la CM-1004.

## Organización

```
index.html (portada), login.html (acceso), paginas.html (menú de páginas), 404.html
css/        tokens.css (colores, tipografía, medidas), components.css (componentes .c-*),
            layout-backoffice.css, layout-public.css, layout-mobile.css, demo.html (muestra del sistema)
js/         data.js (todos los datos), ui.js (pestañas, ventanas, avisos…), nav.js (menú, migas, reloj),
            maps.js (mapas), charts.js (gráficos), prueba.html (página de prueba)
js/datos/   datos complementarios de cada grupo de pantallas
assets/     logo (2 versiones), 32 iconos, ilustraciones
viajero/ app-viajero/ app-conductor/ control/ motor/ crm/ flota/ economica/ admin/ bi/
```

Dependencias externas: tipografía Inter (Google Fonts), librería de mapas Leaflet y el mapa base del IGN. Si alguna falla, la maqueta sigue legible: la tipografía pasa a la del sistema y los mapas muestran «Mapa no disponible».

## Cambiar la marca

La marca TAD es provisional. Para cambiarla:

1. **Colores**: `css/tokens.css`. Las pantallas no tienen colores propios; todo sale de ahí.
2. **Logo**: `assets/logo-tad.svg` y `assets/logo-tad-compacto.svg`. En las páginas va copiado en línea: después de cambiar los SVG, volver a generar (ver «Añadir o cambiar una pantalla»).
3. **Nombre**: buscar «Plataforma Digital TAD» en los HTML y en `js/data.js` (`meta.nombre`).

Después, correr `python herramientas/contraste.py` para comprobar que los colores nuevos siguen cumpliendo la accesibilidad.

## Cambiar un dato

Todo dato (personas, matrículas, horas, importes, conteos) está en `js/data.js` y se pinta desde ahí. Se cambia en un solo lugar. Después, correr `python herramientas/datos.py`: comprueba que las cuentas sigan cerrando (viajeros a bordo, plazas, importes, liquidación…).

## Añadir o cambiar una pantalla

Las instrucciones completas están en `docs/guia-pantallas.md` del repositorio. En resumen:

- **Backoffice**: el contenido se escribe en `herramientas/fuentes/<id>.html` y se genera con `python herramientas/nueva_pantalla.py <id> herramientas/fuentes/<id>.html`, que pone el menú lateral y la barra superior a partir de `control/_plantilla.html`. Para cambiar el menú, se edita la plantilla y se regeneran las 14 pantallas.
- **Portal, apps, landing**: se edita el HTML directamente; los iconos se escriben como `{{i:nombre}}` y se copian en línea con `python herramientas/iconos.py <archivo>`.
- Registrar la pantalla nueva en `TAD.pantallas` (`js/data.js`) para que aparezca en el índice y en las migas.

## Publicar

```bash
bash herramientas/publicar.sh
```

Sube el contenido de `tad-mockup/` a la raíz del sitio (solo escribe en la carpeta de ese dominio, no borra nada del servidor) y añade una versión a los CSS y JS para que nadie vea archivos viejos guardados en caché. Para otro hosting basta con copiar el contenido de `tad-mockup/` tal cual (por FTP o desde el panel); funciona en la raíz o en una subcarpeta, porque todas las rutas son relativas. También se puede abrir `index.html` con doble clic, sin servidor.

## Control de calidad (2026-11-12)

| Punto del brief | Cómo se comprobó | Resultado |
| --- | --- | --- |
| Todas las pantallas abren desde el menú de páginas y vuelven | Menú dibujado desde `TAD.pantallas`; «Cambiar de perfil» en todas | OK (30 pantallas + menú) |
| Ningún enlace roto | `herramientas/enlaces.py` (estricto) | OK — 625 enlaces, 0 rotos |
| Mismo menú y barra superior; ítem activo correcto | `herramientas/menu.py`; `nav.js` marca el activo por `data-page` | OK — 14 pantallas idénticas |
| Datos coherentes en todas las pantallas | `herramientas/datos.py` y `datos_sueltos.py` | OK — 584 comprobaciones; 0 datos escritos a mano |
| Contraste AA | `herramientas/contraste.py` | OK — 90 parejas, todas cumplen |
| Foco visible con teclado | Revisión en navegador del sistema de diseño, portal y acceso | OK |
| Sin scroll horizontal a 1024 px (backoffice) y 390 px (portal y apps) | Recorrido automático en el navegador: 31 páginas a 1024 px y las 17 del portal, apps, landing, acceso e índice también a 390 px | OK — 48 pruebas, ninguna con desplazamiento de página |
| Sin errores en consola | Revisión en navegador del sitio publicado | OK (se añadió `favicon.ico`, que daba un 404 en cada página) |
| Mapas; «Mapa no disponible» si falla el CDN | Prueba con la librería de mapas bloqueada | OK |
| Peso inferior a 1 MB por página | `herramientas/peso.py` | OK — la más pesada, 227 KB |
| Textos sin relleno, sin voseo, sin datos reales | Búsquedas automáticas + revisión | OK |

Todo junto: `python herramientas/todo.py`.

## Limitaciones conocidas

- Las rutas del mapa son líneas aproximadas dibujadas a mano: no siguen la carretera exacta.
- Los límites de los municipios son áreas inventadas alrededor de sus núcleos.
- El mapa de fondo es real (IGN): junto a los pueblos ficticios se ven nombres de pueblos reales de la zona.
- Hay dos horas en la maqueta (09:40 y 10:08), a propósito, para que el seguimiento del viajero tenga sentido.
- El logo de Cl@ve del acceso está redibujado de forma aproximada.
- En tablas anchas del backoffice, a 1024 px la tabla se desplaza dentro de su propio recuadro (la página no).
