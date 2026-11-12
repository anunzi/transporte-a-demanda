/* ==========================================================================
   Plataforma Digital TAD — datos de las apps móviles (window.TAD.apps)

   Datos que solo usan las apps (bloque 5) y que no están en js/data.js:
   ajustes del perfil de Josefa, métodos de pago guardados en la app,
   chat de la conductora con la central y tipos de incidencia.
   Se carga después de data.js:
     <script defer src="../js/data.js"></script>
     <script defer src="../js/datos/apps.js"></script>
   Todo es ficticio y coherente con data.js (mismo día, 14/04/2026, mismas horas).
   ========================================================================== */
(function () {
  "use strict";
  if (!window.TAD) return;

  window.TAD.apps = {
    /** Central de operaciones (la que atiende el teléfono y el chat). */
    central: {
      nombre: "Central TAD",
      telefono: "900 XXX XXX",
      operadora: "op1"
    },

    /** App del viajero: la usuaria de la demo es Josefa (u01). */
    viajero: {
      usuario: "u01",
      pagos: [
        { id: "tarjeta", nombre: "Tarjeta", detalle: "···· 4417", principal: true },
        { id: "bizum", nombre: "Bizum", detalle: "Vinculado a tu teléfono", principal: false }
      ],
      avisos: {
        elegido: "sms",
        opciones: [
          { id: "app", nombre: "Notificaciones de la app" },
          { id: "sms", nombre: "SMS" },
          { id: "llamada", nombre: "Llamada de teléfono" },
          { id: "whatsapp", nombre: "WhatsApp" }
        ]
      },
      idioma: {
        elegido: "es",
        opciones: [
          { id: "es", nombre: "Castellano" },
          { id: "ca", nombre: "Català" },
          { id: "gl", nombre: "Galego" },
          { id: "eu", nombre: "Euskara" },
          { id: "en", nombre: "English" }
        ]
      },
      accesibilidad: { textoGrande: false, altoContraste: false },
      /** Atajos de la pantalla de inicio. */
      atajos: [
        { id: "repetir", titulo: "Repetir último viaje", icono: "ruta" },
        { id: "bonificaciones", titulo: "Mis bonificaciones", icono: "euro" },
        { id: "ayuda", titulo: "Ayuda", icono: "telefono" }
      ]
    },

    /** App del conductor: la conductora de la demo es Carmen Ortega (c1). */
    conductor: {
      id: "c1",
      tiposIncidencia: [
        { id: "retraso", nombre: "Retraso", icono: "reloj" },
        { id: "averia", nombre: "Avería", icono: "furgoneta" },
        { id: "no-presentado", nombre: "Usuario no presentado", icono: "usuario" },
        { id: "accidente", nombre: "Accidente", icono: "alerta" },
        { id: "otra", nombre: "Otra", icono: "mensaje" }
      ],
      /** Chat de hoy con la central (coincide con el historial de INC-0412). */
      chat: [
        { hora: "06:55", de: "central", texto: "Buenos días, Carmen. Hoy llevas la R2 con el 4521 LKT. Vehículo revisado y sin avisos." },
        { hora: "06:58", de: "conductora", texto: "Buenos días. Salgo hacia Fuentelviejo." },
        { hora: "09:22", de: "conductora", texto: "Central, hay obras en la CM-1004 pasado Las Huertas. Corte parcial, no se puede pasar." },
        { hora: "09:24", de: "central", texto: "Obras en la CM-1004, desvío por Robledillo." },
        { hora: "09:25", de: "conductora", texto: "Recibido. Voy por el camino de Robledillo." },
        { hora: "09:31", de: "central", texto: "Avisados por SMS y en la app los 3 viajeros afectados. Retraso estimado: 12 minutos." },
        { hora: "09:36", de: "central", texto: "En el Consultorio de Santa Olalla sube Ana Ruiz con acompañante: necesita la rampa." }
      ]
    }
  };
})();
