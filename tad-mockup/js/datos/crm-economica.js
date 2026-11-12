/* ==========================================================================
   Plataforma Digital TAD — datos de apoyo de CRM y Económica (bloque 3c)

   Amplía window.TAD con datos que no están en js/data.js y que solo usan
   crm/bandeja.html, crm/usuario.html, economica/tarifas.html y
   economica/facturacion.html. Se carga con defer después de data.js.
   Todo es ficticio y coherente con data.js:
   - los viajes anteriores de Josefa (u01) cuadran con la reclamación
     REC-0057 (09/03/2026, 20 min de retraso, viaje abonado) y con las
     encuestas del 07/04/2026;
   - los importes salen de TAD.tarifa() (P14 zona B → P02 zona A: 2,20 € −50 %).
   ========================================================================== */
(function () {
  "use strict";
  var TAD = window.TAD;
  if (!TAD) return;

  /* Viajes anteriores a hoy (el de hoy está en TAD.reservas). */
  TAD.viajesAnteriores = [
    { codigo: "TAD-2026-01822", usuario: "u01", fecha: "2026-02-17", hora: "10:05", origen: "P14", destino: "P02", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Pago a bordo", canal: "teléfono", estado: "Finalizada", retraso: 0 },
    { codigo: "TAD-2026-01849", usuario: "u01", fecha: "2026-02-17", hora: "12:20", origen: "P02", destino: "P14", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Pago a bordo", canal: "teléfono", estado: "Finalizada", retraso: 3 },
    { codigo: "TAD-2026-02655", usuario: "u01", fecha: "2026-03-09", hora: "09:30", origen: "P14", destino: "P02", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Tarjeta en app", canal: "teléfono", estado: "Finalizada", retraso: 20, abonado: true, reclamacion: "REC-0057" },
    { codigo: "TAD-2026-03204", usuario: "u01", fecha: "2026-03-24", hora: "09:15", origen: "P14", destino: "P05", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Tarjeta en app", canal: "teléfono", estado: "Finalizada", retraso: 0 },
    { codigo: "TAD-2026-03231", usuario: "u01", fecha: "2026-03-24", hora: "16:25", origen: "P05", destino: "P14", ruta: "R3", viajeros: 1, perfil: "mayor", pago: "Tarjeta en app", canal: "teléfono", estado: "Finalizada", retraso: 0 },
    { codigo: "TAD-2026-03890", usuario: "u01", fecha: "2026-04-07", hora: "10:00", origen: "P14", destino: "P02", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Tarjeta en app", canal: "teléfono", estado: "Finalizada", retraso: 4 },
    { codigo: "TAD-2026-03917", usuario: "u01", fecha: "2026-04-07", hora: "12:10", origen: "P02", destino: "P14", ruta: "R2", viajeros: 1, perfil: "mayor", pago: "Tarjeta en app", canal: "teléfono", estado: "Finalizada", retraso: 0 }
  ];

  /* Notas internas del equipo sobre cada ciudadano. autor: id de TAD.personal o texto. */
  TAD.notasUsuarios = [
    { usuario: "u01", fecha: "2026-04-14", hora: "08:54", autor: "Asistente de voz", texto: "Ha dicho que viaja con andador. Se le asigna un vehículo con rampa y se avisa al conductor." },
    { usuario: "u01", fecha: "2026-03-11", hora: "11:20", autor: "op1", texto: "Tras la reclamación de marzo: prioridad en la recogida cuando el viaje es para una cita médica. Llamarla si hay más de 10 minutos de retraso." },
    { usuario: "u01", fecha: "2026-02-16", hora: "17:05", autor: "op1", texto: "Prefiere que la llamen por la mañana. No usa la app; los avisos, por SMS o por llamada." }
  ];

  /* Preferencias de contacto y necesidades. */
  TAD.preferenciasUsuarios = {
    u01: {
      alta: "2026-02-16",
      canales: [
        { canal: "Llamada de teléfono", activo: true },
        { canal: "SMS", activo: true },
        { canal: "WhatsApp", activo: false },
        { canal: "Correo electrónico", activo: false }
      ],
      horario: "Por la mañana (09:00–13:00)",
      idioma: "Castellano",
      necesidades: ["Andador", "Vehículo con rampa", "Ayuda para subir"],
      contacto: "Hija · 6XX XXX 456",
      consentimiento: "Acepta avisos del servicio y encuestas"
    }
  };

  /* Bandeja: datos de atención que no están en TAD.conversaciones. */
  TAD.bandeja = {
    tiempoMedioRespuesta: 1.4,   // minutos, hoy
    resueltasAsistentePct: 78    // % del último mes sin pasar a una persona
  };

  /* Tarifas vigentes. */
  TAD.tarifasVigencia = {
    desde: "2026-01-01",
    aprobacion: "Asamblea del Consorcio de Transportes del 12/12/2025",
    // Trayectos de ejemplo para calcular la tabla con TAD.tarifa()
    ejemplos: [
      { tipo: "Dentro de la Zona A", corto: "Zona A", origen: "P01", destino: "P02" },
      { tipo: "Dentro de la Zona B", corto: "Zona B", origen: "P08", destino: "P09" },
      { tipo: "Entre zonas (A ↔ B)", corto: "Interzona", origen: "P08", destino: "P01" }
    ]
  };
})();
