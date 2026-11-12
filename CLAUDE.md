# Transporte a demanda — guía para Claude

Maqueta del proyecto **Transporte a demanda**, que se presenta a nombre de **Kuanthico** (partner de Anunzi).
Es un proyecto **aparte del panel de Anunzi**: no comparte código, base de datos ni despliegues con `anunzi-panel`.

## Punto de partida
- El documento inicial del proyecto va en `docs/punto-de-partida.md` (o el formato original en `docs/`). Leerlo antes de proponer nada.
- Las decisiones y pendientes se anotan en `docs/bitacora.md` con fecha (AAAA-MM-DD) y quién lo pidió.

## Idioma y tono
- Español neutro latinoamericano, con **tuteo**. **Nunca voseo** (no «podés», «tenés», «verificá»).
- Escribe para Matías y el equipo, que no son programadores: primero qué pasa y qué se propone, después el detalle técnico.

## Marca
- La maqueta sale con la marca de **Kuanthico**. No mencionar a Anunzi en la maqueta salvo que se pida.
- No nombrar en la interfaz a los proveedores tecnológicos que se usen por detrás.

## Reglas de trabajo
1. **Nada de este proyecto toca el hosting del panel**: prohibido `public_html/whatsapp-gpt`, `public_html/staging`, `~/domains/staging.anunzi.net` y los dominios de otros clientes. Si se publica en el hosting, va en su propia carpeta o subdominio, y solo con el OK de Matías.
2. Sin credenciales, tokens ni datos personales reales en el código ni en el repositorio. En la maqueta, usar datos de ejemplo.
3. Cambios chicos y explicados. Lee el código antes de afirmar algo; si no pudiste verificarlo, dilo.
4. Commits en `main` de `anunzi/transporte-a-demanda`. Publicar o desplegar algo, solo con el OK de Matías.

## Pendiente de definir
- Alcance de la maqueta: solo pantallas para mostrar, o algo funcional.
- Dónde se publica: enlace privado o subdominio (¿de Kuanthico?).
- Stack: se decide según el documento de partida.
