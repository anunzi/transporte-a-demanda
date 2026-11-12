# Plataforma Digital TAD — Brief para construir el mockup visual

Este documento es la especificación completa del mockup. Leelo entero antes de escribir código. Si algo no está definido acá, preguntá antes de asumir.

---

## 1. Objetivo

Construir un **mockup visual, navegable y no funcional** de la Plataforma Digital TAD (Transporte de Viajeros a Demanda), una plataforma pensada para que administraciones públicas gestionen la reserva, planificación, operación, seguimiento y análisis del transporte a demanda en zonas rurales y despobladas.

El mockup se usará para presentar el proyecto ante organismos públicos y en una solicitud de fondos europeos (FEDER). Tiene que verse como un producto real, serio, institucional y accesible. No tiene backend, no persiste datos, no autentica a nadie: todo lo que se ve es HTML, CSS y JavaScript estático con datos ficticios.

**Resultado esperado**: una carpeta estática con ~30 pantallas enlazadas entre sí, una página índice con miniaturas de todas, y un sistema de diseño compartido, lista para subir por FTP a un hosting compartido y abrir desde `https://dominio/tad/`.

---

## 2. Restricciones técnicas (no negociables)

- **HTML, CSS y JavaScript vanilla**. Sin build, sin bundler, sin framework (nada de React, Vue, Tailwind con build, npm). Se sube la carpeta tal cual al hosting.
- **Rutas relativas** en todos los enlaces y assets (`../css/tokens.css`, no `/css/tokens.css`), porque el mockup vivirá en una subcarpeta del dominio.
- **Sin dependencias externas** salvo dos permitidas por CDN: Leaflet (mapas) y Google Fonts. Si un CDN falla, la pantalla tiene que seguir siendo legible.
- **Un único sistema de diseño**: `css/tokens.css` (variables) y `css/components.css` (componentes). Ninguna pantalla define colores, fuentes o espaciados propios fuera de esos archivos. Si hace falta algo nuevo, se agrega al sistema, no a la pantalla.
- **Responsive**: el backoffice se diseña para escritorio (1440 px) y tiene que degradar bien a 1024 px; las pantallas de viajero web funcionan en escritorio y móvil; las apps móviles se muestran dentro de un marco de teléfono de 390 × 844 px.
- **Accesibilidad AA**: contraste mínimo 4.5:1 en texto, foco visible, etiquetas en todos los inputs, textos alternativos en iconos con significado, tamaño mínimo de botón 44 × 44 px en móvil. Es una plataforma pública; esto se va a revisar.
- **Idioma**: castellano de España (usted/tú formal, "ayuntamiento", "municipio", "viajero", "conductor", "PMR"). Nada de anglicismos innecesarios en la interfaz visible.
- **Peso**: ninguna página supera 1 MB cargada. Sin imágenes pesadas; usar SVG inline o CSS para ilustraciones.
- **Sin datos reales**: todos los nombres, DNI, teléfonos, matrículas y direcciones son ficticios (ver sección 6).

---

## 3. Estructura del proyecto

```
tad-mockup/
├── index.html                  # Página índice con miniaturas de todas las pantallas
├── login.html                  # Acceso con selector de perfil
├── landing.html                # Landing institucional del servicio
├── css/
│   ├── tokens.css              # Variables: colores, tipografía, espaciado, sombras, radios
│   ├── components.css          # Componentes reutilizables
│   ├── layout-backoffice.css   # Sidebar + topbar + área de contenido
│   ├── layout-mobile.css       # Marco de teléfono y layout de app móvil
│   └── layout-public.css       # Layout de portal web del viajero y landing
├── js/
│   ├── nav.js                  # Menú lateral, breadcrumbs, estado activo, navegación entre pantallas
│   ├── data.js                 # Datos ficticios compartidos (municipios, paradas, vehículos, usuarios, viajes)
│   ├── charts.js               # Gráficos simples en SVG/canvas a partir de data.js
│   ├── maps.js                 # Inicialización de Leaflet con marcadores y rutas fijas
│   └── ui.js                   # Tabs, modales, toasts, dropdowns, tablas ordenables (solo visual)
├── assets/
│   ├── logo-tad.svg
│   ├── icons/                  # Iconos SVG propios (un archivo por icono, mismo estilo)
│   └── illustrations/          # Ilustraciones SVG ligeras para estados vacíos y landing
├── viajero/                    # Portal web del viajero (5 pantallas)
├── app-viajero/                # App móvil del viajero (5 pantallas)
├── app-conductor/              # App móvil del conductor (4 pantallas)
├── control/                    # Centro de control operativo (2)
├── motor/                      # Motor de optimización (2)
├── crm/                        # CRM y atención ciudadana (2)
├── flota/                      # Gestión de flota (2)
├── economica/                  # Gestión económica (2)
├── admin/                      # Administración pública (2)
├── bi/                         # Business Intelligence (2)
└── README.md                   # Cómo desplegar y cómo está organizado
```

Cada pantalla es un archivo HTML independiente que carga los CSS y JS compartidos. No hay templating: el sidebar y la topbar se repiten en cada archivo de backoffice (es aceptable en un mockup; `nav.js` marca el ítem activo leyendo el `data-page` del `<body>`).

---

## 4. Sistema de diseño

### 4.1 Identidad

- **Nombre**: Plataforma Digital TAD. Claim: "Personas que nos mueven".
- **Tono visual**: institucional, limpio, flat, moderno, cercano. Referencia: portales de administraciones europeas modernas (gov.uk, administración digital española), no startups.
- **Logo**: texto "TAD" en tipografía de display con un pictograma simple de furgoneta o ruta. Crearlo como SVG en `assets/logo-tad.svg`. Versión horizontal (logo + "Plataforma Digital TAD") y versión compacta (solo "TAD").

### 4.2 Paleta (tokens en `tokens.css`)

```css
:root {
  /* Marca */
  --tad-blue-900: #0b3d6b;   /* titulares, sidebar */
  --tad-blue-700: #1457a3;   /* primario, botones, enlaces */
  --tad-blue-500: #2b7fd6;   /* hover, acentos */
  --tad-blue-100: #e3effb;   /* fondos suaves, badges */
  --tad-green-700: #2e7d4f;  /* sostenibilidad, éxito, "más movilidad" */
  --tad-green-100: #e4f3ea;
  --tad-orange-600: #e8740c; /* conductor, alertas medias */
  --tad-orange-100: #fdebd9;
  --tad-red-600: #c62828;    /* incidencias, errores */
  --tad-red-100: #fbe4e4;
  --tad-yellow-500: #f2b705; /* avisos */
  --tad-yellow-100: #fff6d6;

  /* Neutros */
  --ink-900: #14202b;
  --ink-700: #3a4a5a;
  --ink-500: #6b7a89;
  --ink-300: #c3ccd5;
  --ink-100: #eef2f6;
  --surface: #ffffff;
  --surface-alt: #f6f8fb;

  /* Semánticos */
  --color-primary: var(--tad-blue-700);
  --color-primary-hover: var(--tad-blue-900);
  --color-success: var(--tad-green-700);
  --color-warning: var(--tad-orange-600);
  --color-danger: var(--tad-red-600);
  --color-info: var(--tad-blue-500);
}
```

Cada módulo del backoffice tiene un color de acento que se usa solo en su cabecera y en el ítem activo del menú (no en todo el contenido):

| Módulo | Acento |
| --- | --- |
| Portal del viajero | blue-700 |
| Motor de optimización | green-700 |
| Centro de control | orange-600 |
| App del conductor | blue-900 |
| CRM | red-600 |
| Flota | teal (añadir `--tad-teal-600: #0f8b8d`) |
| Económica | yellow-500 (texto en ink-900) |
| Administración pública | blue-700 |
| BI | purple (añadir `--tad-purple-600: #6a3fb5`) |
| IA responsable | blue-900 |

### 4.3 Tipografía

- Familia: **Inter** (Google Fonts) para todo. Fallback: system-ui, -apple-system, Segoe UI, Roboto, sans-serif.
- Escala: 12 / 14 / 16 / 18 / 22 / 28 / 36 px. Cuerpo en 14 px en backoffice, 16 px en portal público y apps.
- Pesos: 400 (texto), 500 (etiquetas, botones), 600 (títulos de tarjeta), 700 (títulos de página).
- Interlineado 1.5 en texto, 1.2 en títulos.

### 4.4 Espaciado, radios, sombras

- Escala de espaciado en múltiplos de 4: `--sp-1: 4px` … `--sp-8: 32px`, `--sp-10: 40px`, `--sp-12: 48px`.
- Radios: `--r-sm: 6px` (inputs, badges), `--r-md: 10px` (tarjetas, botones), `--r-lg: 16px` (modales, paneles), `--r-pill: 999px`.
- Sombras: `--shadow-1` suave para tarjetas, `--shadow-2` para elementos flotantes. Nada más.

### 4.5 Componentes (en `components.css`)

Todos con clases con prefijo `.c-`:

- `.c-btn` con variantes `--primary`, `--secondary`, `--ghost`, `--danger`, `--sm`, `--lg`, `--icon`.
- `.c-input`, `.c-select`, `.c-textarea`, `.c-checkbox`, `.c-radio`, `.c-switch`, con `.c-field` (label + input + ayuda + error).
- `.c-card` con `.c-card__header`, `.c-card__body`, `.c-card__footer`.
- `.c-kpi`: tarjeta de indicador con valor grande, etiqueta, variación (↑ 4,2 %) y mini sparkline opcional.
- `.c-table`: tabla de datos con cabecera fija, filas con hover, columna de acciones, paginación visual, estado vacío.
- `.c-badge` con variantes de estado: `--success` (En servicio, Confirmada), `--warning` (Retraso, Pendiente), `--danger` (Incidencia, Cancelada), `--info` (Programada), `--neutral` (Finalizada).
- `.c-tabs`, `.c-breadcrumb`, `.c-pagination`.
- `.c-modal`, `.c-drawer` (panel lateral), `.c-toast`.
- `.c-timeline` (para historial de un viaje o de una reserva).
- `.c-stepper` (para el flujo de reserva: 1 Origen y destino → 2 Fecha y hora → 3 Viajeros → 4 Confirmación).
- `.c-map` (contenedor de Leaflet con altura fija y leyenda superpuesta).
- `.c-avatar`, `.c-chip` (filtros), `.c-empty-state`, `.c-alert`.
- `.c-phone-frame`: marco de teléfono con notch, barra de estado (hora 9:41, señal, batería) y área de contenido con scroll.

Reglas:

- Ningún componente usa colores hardcodeados; solo tokens.
- Cada componente tiene estado hover, focus-visible y disabled.
- Iconos: SVG inline de 20 px con `stroke="currentColor"` y `fill="none"`, trazo 1.75. Mismo estilo en todos (tipo Lucide/Feather). Guardarlos en `assets/icons/` y copiar inline donde se usan.

### 4.6 Layouts

**Backoffice** (`layout-backoffice.css`): sidebar fijo de 256 px a la izquierda (fondo `--tad-blue-900`, texto claro, logo arriba, menú agrupado por módulo, usuario abajo) + topbar de 64 px (breadcrumb, buscador global, campana de notificaciones con contador, selector de territorio "Comarca de la Sierra Norte", avatar) + área de contenido con padding 32 px y fondo `--surface-alt`. En 1024 px el sidebar se colapsa a iconos de 72 px.

**Portal web del viajero** (`layout-public.css`): cabecera blanca con logo, menú (Inicio · Reservar · Mis viajes · Ayuda), botón "Mi cuenta"; contenido centrado en 1200 px; footer institucional con logos ficticios de "Ayuntamiento", "Consorcio de Transportes" y "Cofinanciado por la Unión Europea" (solo texto y pictogramas propios, no reproducir el emblema de la UE).

**Apps móviles** (`layout-mobile.css`): la pantalla se renderiza dentro de `.c-phone-frame` centrado en la página sobre fondo `--surface-alt`, con el nombre de la pantalla debajo. La app tiene barra superior de 56 px y, en la del viajero, barra de navegación inferior con 4 pestañas (Inicio · Reservar · Mis viajes · Perfil). La del conductor no tiene barra inferior: es una app de tarea única.

---

## 5. Navegación global

- `index.html` muestra una cuadrícula de tarjetas, una por pantalla, agrupadas por módulo, con una miniatura (captura o ilustración simplificada en SVG), nombre y descripción de una línea. Es la página desde la que se presenta el mockup.
- `login.html` tiene cuatro accesos: **Ciudadano** → `viajero/home.html`; **Conductor** → `app-conductor/servicios.html`; **Operador** → `control/mapa.html`; **Administración** → `admin/cuadro-mando.html`. El login no valida nada: cualquier texto en los campos y el botón lleva a la pantalla.
- Dentro del backoffice, el sidebar enlaza todas las pantallas de todos los módulos. `nav.js` resalta la activa.
- Las apps móviles enlazan entre sus propias pantallas con los botones y pestañas que corresponden al flujo real.
- Toda pantalla tiene un enlace discreto "← Índice del mockup" en la esquina superior derecha (fuera del marco de la app) para volver a `index.html`.
- Los botones que en el producto real dispararían una acción (Guardar, Confirmar, Asignar) abren un `.c-toast` de confirmación ("Reserva confirmada. Hemos enviado un SMS al 6XX XXX 123") o un modal, pero no cambian datos.

---

## 6. Datos ficticios (`js/data.js`)

Un único objeto `TAD` exportado en `window.TAD` que usan todas las pantallas. Los datos tienen que ser coherentes entre sí: el mismo viaje aparece igual en el portal del viajero, en el centro de control, en la app del conductor y en facturación.

### 6.1 Territorio: Comarca de la Sierra Norte (ficticia)

5 municipios y 12 núcleos, con coordenadas plausibles en una zona rural del interior de España (usar un área alrededor de 40.9 N, -3.6 W para que Leaflet muestre carreteras rurales reales de OpenStreetMap):

| Municipio | Núcleos | Habitantes |
| --- | --- | --- |
| Valdecerro (cabecera comarcal, centro de salud, instituto, estación de autobuses) | Valdecerro, El Chaparral | 4.800 |
| Robledillo de la Sierra | Robledillo, La Dehesa, Puente Viejo | 1.350 |
| Santa Olalla del Río | Santa Olalla, Las Huertas | 980 |
| Navalespino | Navalespino, Cerro Alto, La Majada | 720 |
| Fuentelviejo | Fuentelviejo, El Molino | 540 |

Paradas: 18 paradas con nombre, núcleo, coordenadas y tipo (`fija`, `virtual`, `intercambiador`). Ejemplos: "Plaza Mayor (Valdecerro)", "Centro de Salud (Valdecerro)", "Instituto Sierra Norte", "Estación de autobuses", "Iglesia (Robledillo)", "Consultorio (Santa Olalla)", "Cruce de La Majada (virtual)".

Zonas tarifarias: Zona A (Valdecerro), Zona B (resto de municipios).

### 6.2 Flota

6 vehículos:

| Matrícula | Modelo | Plazas | PMR | Estado |
| --- | --- | --- | --- | --- |
| 4521 LKT | Mercedes Sprinter | 16 | Sí (rampa) | En servicio |
| 8830 MNP | Ford Transit | 9 | No | En servicio |
| 1177 KJR | Renault Master | 12 | Sí (elevador) | En servicio |
| 6604 LBC | Fiat Ducato | 9 | No | Mantenimiento |
| 2293 MFG | Mercedes Vito | 8 | No | En servicio |
| 9951 KZD | Iveco Daily | 19 | Sí (rampa) | Reserva |

Cada vehículo tiene: km totales, próxima ITV, seguro (compañía ficticia "Mutua Comarcal", vencimiento), último mantenimiento, consumo medio, posición GPS actual.

### 6.3 Conductores

5 conductores: Carmen Ortega, Luis Benavente, Fátima El Mansouri, Andrés Pacheco, Rosa Calleja. Cada uno con turno (mañana/tarde), vehículo asignado hoy, teléfono ficticio (6XX XXX XXX), estado (En ruta, Disponible, Descanso).

### 6.4 Usuarios / viajeros

12 usuarios con nombre, DNI ficticio (formato 00000000X, nunca válido), teléfono, municipio, perfil (`general`, `mayor`, `PMR`, `estudiante`), canal preferido (app, teléfono, WhatsApp), bonificación aplicada. Mezcla realista: 4 mayores, 2 PMR, 3 estudiantes, 3 generales. Ejemplos: "Josefa Martín Ruiz, 78 años, Navalespino, teléfono, bonificación mayor 50 %", "Iván Serrano, 16 años, Fuentelviejo, estudiante, app".

### 6.5 Viajes y reservas

- Fecha de referencia del mockup: **martes 14 de abril de 2026**, 09:40 (hora que muestra el centro de control).
- 24 reservas para hoy, repartidas en 3 franjas (07:00–09:00 colegio e instituto, 09:00–12:00 centro de salud y gestiones, 16:00–19:00 regreso). Estados: 9 Finalizadas, 6 En curso, 7 Confirmadas, 1 Cancelada, 1 Pendiente (alternativa propuesta).
- 4 rutas planificadas para hoy, cada una con vehículo, conductor, secuencia de paradas con horas, ocupación y km.
- 2 incidencias: "Retraso 12 min por obras en la CM-1004 (ruta R2)" y "Vehículo 6604 LBC fuera de servicio, sustituido por 9951 KZD".
- Historial de 30 días de métricas agregadas por día (viajes, viajeros, km, ocupación media, puntualidad, CO₂ evitado) para los gráficos de BI y Admin.

### 6.6 Tarifas y facturación

- Tarifa general: 1,50 € por trayecto en Zona A, 2,20 € interzona. Bonificaciones: mayores 50 %, PMR 50 %, estudiantes 40 %, familia numerosa 20 %.
- Pagos: tarjeta en app, Bizum, pago a bordo. Facturas mensuales a ayuntamientos y al consorcio. Liquidación mensual de marzo 2026 con importes plausibles (unos 11.400 € de ingresos, 2.900 € de bonificaciones subvencionadas, etc.).

---

## 7. Inventario de pantallas (30)

Para cada pantalla: nombre de archivo, propósito, bloques que tiene y qué datos muestra. Respetar el orden de construcción de la sección 8.

### Landing y acceso (2)

**`landing.html` — Landing institucional**
Hero con claim "Personas que nos mueven", subtítulo "Transporte a demanda para que ningún pueblo se quede atrás", dos botones (Reservar un viaje · Cómo funciona). Franja de 6 públicos con icono (áreas rurales, movilidad municipal, transporte social y sanitario, estudiantes, mayores y PMR, conexión rural-urbano). Sección "Cómo funciona" en 4 pasos. Sección de 4 resultados con cifras (viajes al mes, municipios conectados, satisfacción, CO₂ evitado). Bloque "Para administraciones" que enlaza a `login.html`. Footer institucional.

**`login.html` — Acceso**
Tarjeta centrada con logo, selector de perfil en 4 tarjetas grandes (Ciudadano, Conductor, Operador, Administración), campos usuario/contraseña y botón "Entrar". Enlace "Acceder con Cl@ve" (solo visual) y "Registrarme como ciudadano".

### Portal web del viajero (5) — carpeta `viajero/`

**`home.html`** — Cabecera con saludo "Hola, Josefa", tarjeta "Reservar ahora" con origen, destino, fecha, hora y botón; tarjeta "Tu próximo viaje" con hora, parada, vehículo y botón de seguimiento; accesos rápidos (Repetir último viaje, Mis bonificaciones, Ayuda). Aviso informativo "Hoy hay obras en la CM-1004: posibles retrasos de 10–15 minutos".

**`registro.html`** — Formulario en 3 pasos (stepper): datos personales con DNI y teléfono, perfil especial con subida de documento acreditativo (zona de arrastrar y soltar, solo visual), verificación por SMS. Texto legal RGPD con checkbox.

**`reservar.html`** — Flujo completo en stepper de 4 pasos dentro de una misma página con pestañas: 1) origen y destino con selector de paradas y mapa, 2) fecha, franja horaria, reserva puntual o recurrente (días de la semana), 3) viajeros (número, PMR, acompañante), 4) resumen con tarifa calculada, bonificación aplicada y botón "Confirmar reserva". Al confirmar, toast de confirmación.

**`seguimiento.html`** — Mapa Leaflet grande con la posición del vehículo 4521 LKT, la ruta R2 dibujada y la parada del usuario resaltada. Panel lateral con "Llegada estimada 10:12 (4 min)", conductor, matrícula, plazas ocupadas 7/16, botón "Llamar a la central" y "Cancelar viaje". Línea de tiempo del viaje.

**`mis-viajes.html`** — Tabs (Próximos · Historial · Recurrentes). Tabla con fecha, trayecto, estado (badge), importe, acciones (Modificar, Cancelar, Ver recibo). Tarjeta lateral "Tus bonificaciones" y "Resumen del mes" (viajes, importe, CO₂ evitado).

### App móvil del viajero (5) — carpeta `app-viajero/`

Todas dentro de `.c-phone-frame`.

**`onboarding.html`** — 3 slides con ilustración y texto (Reserva en segundos · Sigue tu vehículo · Paga como quieras), puntos de paginación y botón "Empezar".

**`home.html`** — Saludo, tarjeta de reserva rápida, próximo viaje, atajos. Barra inferior.

**`confirmacion.html`** — Pantalla de reserva confirmada con QR grande (SVG generado o patrón estático), código de reserva "TAD-2026-04187", detalles y botones "Añadir al calendario" y "Compartir".

**`seguimiento.html`** — Mapa a pantalla completa con tarjeta inferior deslizable (bottom sheet) con ETA, conductor y botón de llamada.

**`perfil.html`** — Datos del usuario, perfil especial con badge "Mayor · bonificación 50 %", métodos de pago (tarjeta ···· 4417, Bizum), canal de notificaciones, idioma, accesibilidad (texto grande, alto contraste), cerrar sesión.

### App móvil del conductor (4) — carpeta `app-conductor/`

Todas dentro de `.c-phone-frame`. Diseño de alto contraste, botones grandes, pensado para usar en movimiento.

**`servicios.html`** — Cabecera "Carmen Ortega · 4521 LKT · Turno de mañana". Lista de servicios del día con hora, trayecto, viajeros y estado. Botón grande "Iniciar servicio R2".

**`navegacion.html`** — Mapa Leaflet con la ruta y la próxima parada; tarjeta "Próxima parada: Consultorio (Santa Olalla) · 2 min · 3 viajeros suben, 1 baja". Lista de secuencia de paradas con las ya realizadas tachadas. Botón "He llegado".

**`recogida.html`** — Lista de viajeros en esta parada con nombre, perfil (badge PMR/mayor), y tres formas de validar: escanear QR (botón que abre cámara simulada), PIN de 4 dígitos, marcar en lista. Botones "Confirmar recogida" y "No se ha presentado".

**`incidencias.html`** — Tipos de incidencia en tarjetas grandes (Retraso, Avería, Usuario no presentado, Accidente, Otra), campo de nota, botón de envío, y debajo el chat con la central (mensajes de hoy: "Obras en la CM-1004, desvío por Robledillo").

### Centro de control operativo (2) — carpeta `control/`

**`mapa.html`** — Pantalla principal del operador. Mapa Leaflet ocupando el 65 % con 5 vehículos (iconos de colores por estado), 4 rutas dibujadas, 18 paradas, 2 alertas geográficas (polígono de obras). Panel derecho con KPIs del día (Servicios activos 4, Viajeros a bordo 23, Puntualidad 94 %, Ocupación media 61 %), lista de vehículos con estado, conductor, ruta y ocupación, y filtros (municipio, estado, ruta). Reloj "14/04/2026 09:40".

**`incidencias.html`** — Tabla de incidencias (abiertas y cerradas) con prioridad, tipo, ruta, vehículo, hora, estado y responsable. Drawer lateral al hacer clic con detalle, línea de tiempo, acciones (Asignar vehículo de sustitución, Notificar viajeros, Replanificar ruta, Cerrar). Tarjeta "Vehículos de sustitución disponibles".

### Motor de optimización (2) — carpeta `motor/`

**`rutas.html`** — Planificación del día: a la izquierda lista de 4 rutas con vehículo, conductor, nº paradas, viajeros, km, duración; a la derecha mapa con la ruta seleccionada y tabla con la secuencia de paradas (hora, parada, suben, bajan, ocupación). Panel superior con métricas de la optimización: "Agrupación: 24 reservas → 4 rutas · −38 % km frente a servicio individual · ocupación media 61 % · 42 kg CO₂ evitados". Botón "Replanificar" que abre modal de confirmación.

**`reglas.html`** — Configuración de reglas operativas por territorio: formulario en secciones (Horarios de servicio por franja, Capacidad y tipos de vehículo, Ventanas de tiempo máximas (15 min antes / 10 min después), Prioridades (PMR, sanitario, escolar), Radio de parada virtual, Antelación mínima de reserva). Panel lateral "IA responsable" con 3 switches (Predicción de demanda, Recomendación de recursos, Simulación de escenarios) y enlace "Ver explicación de la última planificación".

### CRM y atención ciudadana (2) — carpeta `crm/`

**`bandeja.html`** — Bandeja multicanal: columna izquierda con conversaciones (icono de canal: teléfono, WhatsApp, email, chat web), nombre, último mensaje, hora, estado. Centro con el hilo seleccionado (una llamada atendida por el asistente de voz con transcripción resumida y una conversación de WhatsApp). Derecha: ficha rápida del ciudadano y acciones (Crear reserva, Abrir reclamación, Enviar encuesta).

**`usuario.html`** — Ficha de Josefa Martín Ruiz: datos, perfil especial, bonificaciones, preferencias de canal, pestañas (Viajes, Reclamaciones, Encuestas, Notas). Historial de viajes en tabla, una reclamación resuelta, resultados de 3 encuestas (NPS, puntualidad, trato).

### Gestión de flota (2) — carpeta `flota/`

**`vehiculos.html`** — KPIs (6 vehículos, 4 en servicio, 1 en mantenimiento, 1 en reserva, 3 adaptados PMR). Tabla con matrícula, modelo, plazas, PMR, estado, conductor hoy, km, próxima ITV, alertas. Filtros y botón "Añadir vehículo".

**`vehiculo.html`** — Ficha de 4521 LKT: tarjeta de datos, telemetría en vivo (velocidad, consumo, km de hoy, posición en mini mapa), calendario de mantenimiento (preventivo, correctivo, ITV), documentos (seguro, ficha técnica), historial de incidencias, gráfico de consumo últimos 30 días.

### Gestión económica (2) — carpeta `economica/`

**`tarifas.html`** — Tabla de tarifas por zona y tipo, tabla de bonificaciones por perfil con porcentaje y quién la financia (ayuntamiento, consorcio), métodos de pago activos (tarjeta, Bizum, a bordo) con switches, simulador de tarifa (origen, destino, perfil → importe).

**`facturacion.html`** — KPIs del mes (ingresos, bonificaciones subvencionadas, pendiente de cobro). Tabs: Facturas a usuarios, Facturas a ayuntamientos, Facturas a operadores, Liquidaciones. Tabla con número, fecha, destinatario, importe, estado (Pagada, Pendiente, Vencida). Tarjeta "Liquidación marzo 2026" con desglose por municipio y botón "Exportar".

### Administración pública (2) — carpeta `admin/`

**`cuadro-mando.html`** — Cuadro de mando ejecutivo para el alcalde o la concejalía: 6 KPIs grandes (viajeros del mes, viajes, coste por viajero, puntualidad, satisfacción, CO₂ evitado), gráfico de evolución mensual, cumplimiento de SLA (disponibilidad 99,6 %, puntualidad 94 %, tiempo de respuesta en incidencias), tabla por municipio, botón "Generar informe mensual".

**`territorio.html`** — Mapa con los 5 municipios coloreados por demanda, lista de municipios y núcleos con población, paradas, viajeros del mes y cobertura; editor visual de zonas tarifarias (solo apariencia); panel de informes periódicos programados (semanal al consorcio, mensual al pleno).

### Business Intelligence (2) — carpeta `bi/`

**`dashboard.html`** — Dashboard con filtros de periodo y municipio. Gráficos: viajes por día (línea), ocupación por franja (barras), viajeros por perfil (donut), puntualidad (gauge), CO₂ evitado acumulado (área), mapa de calor de demanda por parada. Tarjeta "Análisis de demanda: predicción próxima semana" con línea punteada.

**`informes.html`** — Generador de informes: selector de plantilla (Diario, Semanal, Mensual, Anual, Impacto), periodo, destinatarios, formato (PDF, Excel), vista previa del informe en el lado derecho (portada, resumen, 2 gráficos, tabla). Lista de informes generados con descarga (enlaces que no hacen nada).

### Índice (1)

**`index.html`** — Ya descrito en la sección 5. Agrupar por módulo con el color de acento de cada uno.

---

## 8. Orden de construcción

Trabajá en este orden y pará al final de cada bloque para que yo revise. No generes pantallas de un bloque sin haber cerrado el anterior.

1. **Sistema de diseño**: `tokens.css`, `components.css`, los tres layouts, iconos base (unos 30), logo. Crear `css/demo.html` con todos los componentes y variantes para revisarlos juntos. **Parar aquí.**
2. **Datos y utilidades**: `data.js` completo, `nav.js`, `ui.js`, `maps.js`, `charts.js`. Una pantalla de prueba que use todos.
3. **Backoffice**: `control/mapa.html` primero (es la pantalla más compleja y define el layout); luego el resto del backoffice de a 3–4 pantallas por tanda: motor, flota, CRM, económica, admin, BI.
4. **Portal web del viajero** (5 pantallas).
5. **Apps móviles**: viajero (5) y conductor (4).
6. **Landing, login e índice**.
7. **Control de calidad** (sección 9) y `README.md`.

---

## 9. Control de calidad antes de entregar

Revisá cada punto y dejá constancia en el README:

- Todas las pantallas abren desde `index.html` y vuelven a él.
- Ningún enlace roto (recorrer todos los `href` con un script).
- Mismo sidebar y misma topbar en todo el backoffice; ítem activo correcto en cada pantalla.
- Los mismos datos (reserva TAD-2026-04187 de Josefa Martín, ruta R2, vehículo 4521 LKT, conductora Carmen Ortega) aparecen coherentes en portal, app viajero, app conductor, centro de control, motor, CRM y facturación.
- Contraste AA verificado en texto sobre todos los fondos de acento.
- Foco visible al navegar con teclado en el portal del viajero y en el login.
- Sin scroll horizontal a 1024 px en backoffice ni a 390 px en apps.
- Las páginas cargan sin errores en consola.
- Leaflet carga el mapa en todas las pantallas que lo usan y, si el CDN falla, el contenedor muestra un fondo gris con el texto "Mapa no disponible".
- Peso de cada página con assets inferior a 1 MB.
- Textos sin faltas, sin lorem ipsum, sin anglicismos innecesarios, sin datos reales.

---

## 10. Despliegue

- El hosting es compartido, con acceso por FTP/cPanel. La carpeta `tad-mockup/` se sube completa a `public_html/tad/`.
- Todo tiene que funcionar abriendo `https://dominio/tad/index.html` y también `https://dominio/tad/` (incluir `index.html` en la raíz).
- No hace falta `.htaccess` salvo para forzar HTTPS si el hosting no lo hace.
- El README explica: estructura, cómo añadir una pantalla nueva, cómo cambiar la paleta, cómo subir al hosting.

---

## 11. Lo que no hay que hacer

- No usar frameworks ni build tools aunque parezca más rápido.
- No inventar pantallas fuera del inventario sin preguntar.
- No poner logos reales de administraciones, de la Unión Europea ni de empresas; usar texto y pictogramas propios.
- No usar fotografías de stock ni imágenes externas; ilustraciones SVG propias y ligeras.
- No dejar "Lorem ipsum", "TODO" ni placeholders visibles.
- No hardcodear datos en el HTML cuando existen en `data.js`; renderizarlos desde JS para que cambiarlos sea un solo lugar.
- No cambiar el sistema de diseño desde una pantalla: si falta algo, se añade al sistema y se aplica a todas.

---

## 12. Prompt de arranque para Claude Code

Copiá esto como primer mensaje:

```
Lee TAD-MOCKUP-BRIEF.md completo. Vas a construir el mockup visual de la Plataforma Digital TAD siguiendo ese documento al pie de la letra.

Empieza por el bloque 1 de la sección 8: crea la estructura de carpetas, tokens.css, components.css, los tres layouts, el logo SVG, unos 30 iconos SVG y css/demo.html con todos los componentes y variantes. No generes ninguna pantalla del inventario todavía. Cuando termines, dime qué has creado y qué decisiones de diseño has tomado, y espera mi revisión antes de continuar.
```
