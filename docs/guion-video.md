# Vídeo de presentación TAD — guion

Pedido por Matías el 2026-11-16. Es un vídeo corto de motion graphics para la portada (`index.html`) que presenta el servicio y explica cómo funciona.

## Ficha

| | |
| --- | --- |
| Duración | 60–65 segundos |
| Formato | 16:9, 1920 × 1080, 30 fps. Exportar MP4 (H.264), idealmente menos de 10 MB |
| Uso | Portada de la maqueta, en la cabecera. Se reproduce con controles; si arranca solo, irá **sin sonido** y con subtítulos, así que el texto en pantalla tiene que entenderse sin la voz |
| Idioma | Castellano de España (como la interfaz) |
| Marca | Solo TAD. Sin logos de Kuanthico ni de Anunzi, sin logos de administraciones, de la UE ni de empresas (tampoco de WhatsApp ni de Bizum: se nombran, pero sin su logo) |
| Datos | Ficticios, los mismos de la maqueta: Josefa, Navalespino, Valdecerro, Comarca de la Sierra Norte |

## Estilo visual

- **Ilustración plana (flat)**: formas geométricas con esquinas redondeadas, sin degradados fuertes ni 3D, con sombras muy suaves o ninguna. Limpio, cálido e institucional, nada «startup».
- **Iconos de línea**, como los de la plataforma: trazo de 1,75 px a escala 24 px, extremos y uniones redondeados.
- **Personas**: siluetas simples y amables, sin rasgos detallados. Incluir personas mayores, alguien en silla de ruedas y un estudiante.
- **Paisaje rural**: colinas, pueblos pequeños con casas de tejado a dos aguas, un campanario y carreteras curvas. Usar pocos colores.
- **Vehículo**: furgoneta blanca de 9 plazas con una franja azul y rampa trasera. Es la misma forma que el pictograma del logo TAD.
- **Movimiento**: suave y con propósito, con transiciones de 0,4–0,6 s y curvas *ease-in-out*. Las rutas se dibujan como una línea que avanza (*line draw*) y los elementos entran con un pequeño rebote o un fundido con desplazamiento. Nada de giros ni efectos llamativos.
- **Texto en pantalla**: pocas palabras por escena, como máximo 2 líneas, alineado a la izquierda o centrado, que aparecen al ritmo de la voz.
- **Música**: instrumental, acústica y optimista (guitarra o piano suave con percusión ligera), alrededor de 100 BPM y siempre por debajo de la voz (unos −18 dB). Que sea libre de derechos.

## Colores (los de la plataforma, `css/tokens.css`)

| Uso | Color | Hex |
| --- | --- | --- |
| Titulares, fondos oscuros, logo | Azul oscuro | `#0B3D6B` |
| Color principal: botones, furgoneta, texto destacado | Azul | `#1457A3` |
| Acentos gráficos, agua, cielo | Azul claro | `#2B7FD6` |
| Fondos suaves | Azul muy claro | `#E3EFFB` |
| Ruta del logo, campo, «confirmado», sostenibilidad | Verde | `#2E7D4F` |
| Fondos de campo suaves | Verde muy claro | `#E4F3EA` |
| Avisos, «próxima parada», puntos de recogida | Amarillo | `#F2B705` |
| Conductor | Naranja | `#E8740C` |
| Rutas en el mapa (una por color) | Morado / Verde azulado | `#6A3FB5` / `#0F8B8D` |
| Texto principal | Tinta | `#14202B` |
| Texto secundario | Gris | `#6B7A89` |
| Fondos neutros | Gris muy claro | `#EEF2F6` |
| Fondo general | Blanco | `#FFFFFF` |

Proporción aproximada: mucho blanco y azul muy claro; azul oscuro y azul para lo importante; verde y amarillo solo como acentos. El rojo (`#C62828`) no se usa: el tono del vídeo es positivo.

## Tipografía

- **Inter** (Google Fonts), la misma de la plataforma.
- Titulares de escena: Inter Bold (700), 72–96 px, en azul oscuro `#0B3D6B` o blanco sobre fondo azul oscuro.
- Textos de apoyo: Inter Medium (500), 40–48 px, en tinta `#14202B`.
- Etiquetas pequeñas (horas, nombres de parada): Inter SemiBold (600), 28–32 px.
- Interlineado 1,1 en titulares y 1,3 en textos.

## Logo

Usar el SVG de la maqueta: `tad-mockup/assets/logo-tad.svg` (completo) y `logo-tad-compacto.svg` (solo pictograma). El pictograma es una furgoneta sobre una línea de ruta verde con dos paradas.

- **Animación de cierre**: primero se dibuja la línea verde de izquierda a derecha y aparecen los dos puntos de parada. Después la furgoneta entra desde la izquierda y frena encima. Por último aparece el texto «TAD · Plataforma Digital» con el lema «Personas que nos mueven».

## Escenas

Las horas de la columna «Tiempo» son orientativas; al final mandan los tiempos de la locución.

| # | Tiempo | Imagen | Texto en pantalla | Voz en off |
| --- | --- | --- | --- | --- |
| 1 | 0–6 s | Paisaje de sierra al amanecer, con colinas y un pueblo pequeño. Una parada de autobús vacía con un cartel de horarios casi en blanco. Pasa una hoja con el viento. | — | En muchos pueblos, el autobús pasa dos veces al día… o no pasa. |
| 2 | 6–12 s | Tres viñetas a la vez: una señora mayor (Josefa) mirando un calendario con «Médico 10:45», un estudiante con mochila y un vecino con un carro de la compra. | Médico · Instituto · Mercado | Y para ir al médico, al instituto o al mercado, hace falta otra forma de moverse. |
| 3 | 12–17 s | Transición a fondo azul oscuro. Aparece el logo TAD con su animación corta. | **Transporte a demanda**<br>Sin horarios fijos. Sin líneas. | Esto es TAD: transporte a demanda. Sin horarios fijos ni líneas que memorizar. |
| 4 | 17–25 s | Josefa en casa. Alrededor aparecen 4 iconos de línea, uno tras otro: teléfono, burbuja de chat (WhatsApp, sin logo), ordenador y móvil. Una tarjeta de reserva se rellena: «Navalespino → Centro de Salud · martes 10:00». | **1. Reserva**<br>Dónde y cuándo | Tú dices dónde y cuándo: por teléfono, por WhatsApp, en la web o desde la app, hasta una hora antes. |
| 5 | 25–33 s | Mapa plano de la comarca visto desde arriba, con varios pueblos como puntos y varios vecinos con un marcador amarillo. Las líneas de ruta (azul, morado y verde azulado) se dibujan uniendo los puntos. | **2. Rutas compartidas**<br>Cada día, las que hacen falta | La plataforma junta los viajes de los vecinos y traza rutas compartidas, distintas cada día, según lo que se necesita. |
| 6 | 33–39 s | Primer plano de un móvil sencillo. Llega un mensaje: «TAD: tu viaje está confirmado. Recogida 10:12 en la Iglesia de Navalespino». Aparece un check verde. | **3. Confirmación**<br>Hora y parada | Te llega un mensaje con la hora y la parada de recogida. |
| 7 | 39–47 s | El mapa en el móvil: la furgoneta avanza por la ruta hacia la parada. Aparece una etiqueta amarilla «Llega en 4 min». Corte a la parada: la furgoneta frena, despliega la rampa y sube una persona en silla de ruedas; Josefa sube con su andador y la conductora la saluda. | **4. Recogida**<br>Sigue el vehículo en el mapa | Sigues la furgoneta en el mapa y, si hay un retraso, te avisamos. Los vehículos están adaptados, también para sillas de ruedas. |
| 8 | 47–53 s | La furgoneta llega al Centro de Salud de Valdecerro. Icono de pago con tres opciones (tarjeta, Bizum sin logo, efectivo) y un precio que baja de 2,20 € a 1,10 € con la etiqueta «Bonificación mayores −50 %». | **5. Llegada**<br>Pago con tu bonificación | Pagas con tarjeta, con Bizum o a bordo, con tu bonificación ya aplicada. |
| 9 | 53–59 s | Vista de un panel limpio, sin texto legible: un mapa con 4 furgonetas en movimiento y 3 gráficos sencillos que crecen (viajes, ocupación y costes). Arriba, el texto «Ayuntamiento». | **Para administraciones**<br>Todo, en tiempo real | Y el ayuntamiento lo ve todo en tiempo real: viajes, ocupación y costes. |
| 10 | 59–65 s | Fondo blanco. Animación completa del logo TAD. Debajo, el lema. Al final, mantener 1,5 s quieto. | **Personas que nos mueven**<br>Para que ningún pueblo se quede atrás | TAD. Personas que nos mueven. Para que ningún pueblo se quede atrás. |

## Texto completo de la voz en off (para ElevenLabs)

Tiene unas 140 palabras: entre 60 y 65 segundos a ritmo pausado. Las barras (/) marcan una pausa corta. Si se usa el texto tal cual en ElevenLabs, conviene quitarlas o cambiarlas por un punto.

> En muchos pueblos, el autobús pasa dos veces al día… o no pasa. /
> Y para ir al médico, al instituto o al mercado, hace falta otra forma de moverse. /
> Esto es TAD: transporte a demanda. Sin horarios fijos ni líneas que memorizar. /
> Tú dices dónde y cuándo: por teléfono, por WhatsApp, en la web o desde la app, hasta una hora antes. /
> La plataforma junta los viajes de los vecinos y traza rutas compartidas, distintas cada día, según lo que se necesita. /
> Te llega un mensaje con la hora y la parada de recogida. /
> Sigues la furgoneta en el mapa y, si hay un retraso, te avisamos. Los vehículos están adaptados, también para sillas de ruedas. /
> Pagas con tarjeta, con Bizum o a bordo, con tu bonificación ya aplicada. /
> Y el ayuntamiento lo ve todo en tiempo real: viajes, ocupación y costes. /
> TAD. Personas que nos mueven. Para que ningún pueblo se quede atrás.

### Indicaciones para la voz

- **Voz**: femenina o masculina adulta, con **acento de España** (no neutro latinoamericano). Cálida, cercana y tranquila, con tono de servicio público, no de anuncio comercial.
- **Ritmo**: pausado, unas 140 palabras por minuto. Dejar unos 0,5 s de silencio entre frases para que entren las animaciones.
- **«TAD»**: se pronuncia como una palabra, «tad». Si ElevenLabs lo deletrea, escribir «Tad» en el texto.
- **«WhatsApp»**: comprobar que suene «guásap». Si no, escribirlo «guásap» solo en el texto que se le pasa a ElevenLabs.
- Pedir dos archivos: la locución completa (WAV o MP3, 44,1 kHz) y, si se puede, una toma por escena para ajustar los tiempos con más facilidad.

## Subtítulos

Con la locución final se preparan los subtítulos (`.vtt`) a partir del texto de arriba, para que el vídeo se entienda sin sonido. Los genero yo cuando esté el audio con los tiempos definitivos.

## Integración en la portada (cuando esté el vídeo)

Hace falta:

- el MP4;
- una imagen fija para mostrar antes de reproducir (*poster*, JPG 1920 × 1080, idealmente el fotograma del logo de la escena 3).

Va en la cabecera de la portada, en el lugar de la ilustración actual, con estas condiciones:

- reproducción con controles;
- sin sonido si arranca solo;
- con subtítulos;
- si el vídeo no carga, se ve la ilustración actual en su lugar.
