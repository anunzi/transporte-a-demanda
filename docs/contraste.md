# Contrastes del sistema de diseño

Generado con `python herramientas/contraste.py --md` el 2026-11-12 (bloque 1). Mínimo AA: 4,5:1 para texto y 3:1 para bordes, foco e interruptores.

| Uso | Texto / elemento | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- | --- |
| Texto principal sobre blanco | `--color-text` | `--surface` | 16,52:1 | 4,5:1 | OK |
| Texto principal sobre fondo suave | `--color-text` | `--surface-alt` | 15,53:1 | 4,5:1 | OK |
| Texto secundario sobre blanco | `--color-text-muted` | `--surface` | 6,15:1 | 4,5:1 | OK |
| Texto secundario sobre fondo suave | `--color-text-muted` | `--surface-alt` | 5,78:1 | 4,5:1 | OK |
| Texto secundario sobre gris claro | `--color-text-muted` | `--ink-100` | 5,47:1 | 4,5:1 | OK |
| Enlace sobre blanco | `--color-link` | `--surface` | 7,19:1 | 4,5:1 | OK |
| Enlace sobre fondo suave | `--color-link` | `--surface-alt` | 6,76:1 | 4,5:1 | OK |
| Título de página (azul oscuro) sobre fondo suave | `--tad-blue-900` | `--surface-alt` | 10,42:1 | 4,5:1 | OK |
| Botón principal | `--surface` | `--tad-blue-700` | 7,19:1 | 4,5:1 | OK |
| Botón principal, ratón encima | `--surface` | `--tad-blue-900` | 11,09:1 | 4,5:1 | OK |
| Botón secundario | `--tad-blue-700` | `--surface` | 7,19:1 | 4,5:1 | OK |
| Botón secundario/discreto, ratón encima | `--tad-blue-800` | `--tad-blue-100` | 7,61:1 | 4,5:1 | OK |
| Botón de peligro | `--surface` | `--tad-red-600` | 5,62:1 | 4,5:1 | OK |
| Botón de peligro, ratón encima | `--surface` | `--tad-red-800` | 8,15:1 | 4,5:1 | OK |
| Botón desactivado | `--color-disabled-text` | `--color-disabled-bg` | 5,47:1 | 4,5:1 | OK |
| Mensaje de error de un campo | `--tad-red-800` | `--surface` | 8,15:1 | 4,5:1 | OK |
| Texto de campo desactivado | `--color-disabled-text` | `--color-disabled-bg` | 5,47:1 | 4,5:1 | OK |
| Etiqueta «En servicio / Confirmada» | `--tad-green-800` | `--tad-green-100` | 6,91:1 | 4,5:1 | OK |
| Etiqueta «Retraso / Pendiente» | `--tad-orange-800` | `--tad-orange-100` | 5,60:1 | 4,5:1 | OK |
| Etiqueta «Incidencia / Cancelada» | `--tad-red-800` | `--tad-red-100` | 6,72:1 | 4,5:1 | OK |
| Etiqueta «Programada» | `--tad-blue-800` | `--tad-blue-100` | 7,61:1 | 4,5:1 | OK |
| Etiqueta «Finalizada» | `--ink-700` | `--ink-100` | 8,09:1 | 4,5:1 | OK |
| Variación positiva (↑) | `--tad-green-800` | `--surface` | 7,93:1 | 4,5:1 | OK |
| Variación negativa (↓) | `--tad-red-800` | `--surface` | 8,15:1 | 4,5:1 | OK |
| Página actual de la paginación | `--surface` | `--tad-blue-700` | 7,19:1 | 4,5:1 | OK |
| Filtro (chip) activado | `--tad-blue-800` | `--tad-blue-100` | 7,61:1 | 4,5:1 | OK |
| Contador de pestaña | `--ink-700` | `--ink-100` | 8,09:1 | 4,5:1 | OK |
| Menú del portal público | `--ink-700` | `--surface` | 9,10:1 | 4,5:1 | OK |
| Pestaña inactiva de la app | `--ink-600` | `--surface` | 6,15:1 | 4,5:1 | OK |
| Pestaña activa de la app | `--tad-blue-700` | `--surface` | 7,19:1 | 4,5:1 | OK |
| Enlace «Índice del mockup» en la franja gris | `--ink-600` | `--ink-100` | 5,47:1 | 4,5:1 | OK |
| Aviso emergente (toast) | `--surface` | `--ink-900` | 16,52:1 | 4,5:1 | OK |
| Botón cerrar del aviso emergente | `--ink-300` | `--ink-900` | 10,16:1 | 4,5:1 | OK |
| Alerta informativa | `--ink-900` | `--tad-blue-100` | 14,16:1 | 4,5:1 | OK |
| Alerta de éxito | `--ink-900` | `--tad-green-100` | 14,40:1 | 4,5:1 | OK |
| Alerta de retraso | `--ink-900` | `--tad-orange-100` | 14,21:1 | 4,5:1 | OK |
| Alerta de error | `--ink-900` | `--tad-red-100` | 13,62:1 | 4,5:1 | OK |
| «Mapa no disponible» | `--ink-700` | `--ink-100` | 8,09:1 | 4,5:1 | OK |
| Avatar azul | `--tad-blue-800` | `--tad-blue-100` | 7,61:1 | 4,5:1 | OK |
| Avatar verde | `--tad-green-800` | `--tad-green-100` | 6,91:1 | 4,5:1 | OK |
| Avatar naranja | `--tad-orange-800` | `--tad-orange-100` | 5,60:1 | 4,5:1 | OK |
| Avatar morado | `--tad-purple-800` | `--tad-purple-100` | 8,58:1 | 4,5:1 | OK |
| Menú lateral: enlaces | `--ink-100` | `--tad-blue-900` | 9,86:1 | 4,5:1 | OK |
| Menú lateral: títulos de grupo y rol | `--ink-300` | `--tad-blue-900` | 6,82:1 | 4,5:1 | OK |
| Menú lateral: nombre de usuario | `--surface` | `--tad-blue-900` | 11,09:1 | 4,5:1 | OK |
| Contador de la campana | `--surface` | `--tad-red-600` | 5,62:1 | 4,5:1 | OK |
| Pie institucional: texto | `--ink-100` | `--tad-blue-900` | 9,86:1 | 4,5:1 | OK |
| Pie institucional: texto pequeño | `--ink-300` | `--tad-blue-900` | 6,82:1 | 4,5:1 | OK |
| Conductor: texto sobre fondo | `--surface` | `--ink-900` | 16,52:1 | 4,5:1 | OK |
| Conductor: texto secundario sobre fondo | `--ink-300` | `--ink-900` | 10,16:1 | 4,5:1 | OK |
| Conductor: texto sobre tarjeta | `--surface` | `--ink-800` | 14,05:1 | 4,5:1 | OK |
| Conductor: texto secundario sobre tarjeta | `--ink-300` | `--ink-800` | 8,64:1 | 4,5:1 | OK |
| Conductor: botón principal (amarillo) | `--ink-900` | `--tad-yellow-500` | 9,09:1 | 4,5:1 | OK |
| Conductor: botón principal, ratón encima | `--ink-900` | `--tad-yellow-100` | 15,26:1 | 4,5:1 | OK |
| Conductor: rótulo «Próxima parada» | `--tad-yellow-500` | `--tad-blue-900` | 6,10:1 | 4,5:1 | OK |
| Conductor: datos de la próxima parada | `--ink-100` | `--tad-blue-900` | 9,86:1 | 4,5:1 | OK |
| Borde de los campos de formulario | `--color-border-strong` | `--surface` | 4,40:1 | 3,0:1 | OK |
| Foco de teclado sobre blanco | `--focus-color` | `--surface` | 7,19:1 | 3,0:1 | OK |
| Foco de teclado sobre fondo suave | `--focus-color` | `--surface-alt` | 6,76:1 | 3,0:1 | OK |
| Foco de teclado sobre azul oscuro | `--focus-color-on-dark` | `--tad-blue-900` | 6,10:1 | 3,0:1 | OK |
| Foco de teclado en la app del conductor | `--focus-color-on-dark` | `--ink-900` | 9,09:1 | 3,0:1 | OK |
| Interruptor apagado | `--ink-500` | `--surface` | 4,40:1 | 3,0:1 | OK |
| Interruptor encendido | `--tad-green-700` | `--surface` | 5,05:1 | 3,0:1 | OK |
| Casilla y opción marcadas | `--tad-blue-700` | `--surface` | 7,19:1 | 3,0:1 | OK |
| Círculo de paso pendiente | `--ink-500` | `--surface` | 4,40:1 | 3,0:1 | OK |
| Ruta del logo sobre azul oscuro | `--tad-green-300` | `--tad-blue-900` | 6,09:1 | 3,0:1 | OK |
| Ruta del logo sobre blanco | `--tad-green-700` | `--surface` | 5,05:1 | 3,0:1 | OK |
| Módulo viajero: cabecera y menú activo | `--on-accent` | `--accent` | 7,19:1 | 4,5:1 | OK |
| Módulo viajero: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 7,61:1 | 4,5:1 | OK |
| Módulo admin: cabecera y menú activo | `--on-accent` | `--accent` | 7,19:1 | 4,5:1 | OK |
| Módulo admin: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 7,61:1 | 4,5:1 | OK |
| Módulo motor: cabecera y menú activo | `--on-accent` | `--accent` | 5,05:1 | 4,5:1 | OK |
| Módulo motor: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 6,91:1 | 4,5:1 | OK |
| Módulo control: cabecera y menú activo | `--on-accent` | `--accent` | 5,46:1 | 4,5:1 | OK |
| Módulo control: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 5,60:1 | 4,5:1 | OK |
| Módulo conductor: cabecera y menú activo | `--on-accent` | `--accent` | 11,09:1 | 4,5:1 | OK |
| Módulo conductor: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 9,51:1 | 4,5:1 | OK |
| Módulo crm: cabecera y menú activo | `--on-accent` | `--accent` | 5,62:1 | 4,5:1 | OK |
| Módulo crm: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 6,72:1 | 4,5:1 | OK |
| Módulo flota: cabecera y menú activo | `--on-accent` | `--accent` | 5,56:1 | 4,5:1 | OK |
| Módulo flota: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 6,04:1 | 4,5:1 | OK |
| Módulo economica: cabecera y menú activo | `--on-accent` | `--accent` | 9,09:1 | 4,5:1 | OK |
| Módulo economica: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 5,90:1 | 4,5:1 | OK |
| Módulo bi: cabecera y menú activo | `--on-accent` | `--accent` | 7,02:1 | 4,5:1 | OK |
| Módulo bi: texto sobre fondo suave | `--accent-text` | `--accent-soft` | 8,58:1 | 4,5:1 | OK |

85 parejas revisadas, 0 no pasan.
