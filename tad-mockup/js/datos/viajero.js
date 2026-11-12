/* ==========================================================================
   Plataforma Digital TAD — datos del portal web del viajero (TAD.viajero)

   Amplía window.TAD con lo que data.js no trae y necesita el portal:
   viajes recurrentes, próximos viajes (además del de hoy) e historial de la
   usuaria de la maqueta (la de TAD.reservaReferencia()), la central de
   reservas y la persona de ejemplo del formulario de registro.
   Cargar con <script defer> DESPUÉS de data.js.

   Coherencia con data.js:
   - Los códigos del historial son anteriores a los de hoy (TAD-2026-04131…)
     y los de los próximos viajes, posteriores (TAD-2026-04212 es el último de hoy).
   - El viaje del 09/03 es el de la reclamación REC-0057 (importe devuelto).
   - El del 07/04 es el que valoró en la encuesta de ese día.
   - Los importes salen de TAD.tarifa(): Navalespino (zona B) → Valdecerro
     (zona A) es interzona, 2,20 € con un 50 % de bonificación = 1,10 €.
   Todo es inventado.
   ========================================================================== */
(function () {
  "use strict";

  var TAD = window.TAD;
  if (!TAD) return;

  var ref = TAD.reservaReferencia();

  var V = {
    /** Usuaria con la sesión iniciada en el portal. */
    usuario: ref.usuario,

    /** Central de reservas (teléfono ficticio). */
    central: { telefono: "9XX XXX 100", horario: "De lunes a sábado, de 7:00 a 20:00" },

    /** Fecha que propone el formulario de reserva: el martes siguiente. */
    fechaSugerida: "2026-04-21",

    /** Código que recibe la reserva nueva al confirmar en reservar.html. */
    codigoNuevaReserva: "TAD-2026-04244",

    /** Viajes que se repiten cada semana. */
    recurrentes: [
      {
        id: "RR-01",
        dias: ["jueves"],
        hora: "10:00",
        origen: "P14",
        destino: "P01",
        viajeros: 1,
        perfil: "mayor",
        desde: "2026-02-05",
        estado: "Activa",
        motivo: "Mercado de los jueves en Valdecerro"
      }
    ],

    /** Próximos viajes, aparte del de hoy (que está en TAD.reservas). */
    proximos: [
      { codigo: "TAD-2026-04236", fecha: "2026-04-16", hora: "10:00", llegada: "10:32", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Confirmada", pago: "Tarjeta en app", recurrente: "RR-01" },
      { codigo: "TAD-2026-04241", fecha: "2026-04-23", hora: "10:00", llegada: "10:32", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Confirmada", pago: "Tarjeta en app", recurrente: "RR-01" }
    ],

    /** Viajes pasados, del más reciente al más antiguo. */
    historial: [
      { codigo: "TAD-2026-04102", fecha: "2026-04-09", hora: "10:00", llegada: "10:31", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", recurrente: "RR-01", vehiculo: "4521 LKT" },
      { codigo: "TAD-2026-04066", fecha: "2026-04-07", hora: "09:30", llegada: "10:02", origen: "P14", destino: "P02", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", vehiculo: "4521 LKT", valorado: true },
      { codigo: "TAD-2026-04031", fecha: "2026-04-02", hora: "10:00", llegada: "10:33", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", recurrente: "RR-01", vehiculo: "1177 KJR" },
      { codigo: "TAD-2026-03944", fecha: "2026-03-26", hora: "10:00", llegada: "10:30", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", recurrente: "RR-01", vehiculo: "4521 LKT" },
      { codigo: "TAD-2026-03871", fecha: "2026-03-19", hora: "10:00", llegada: "10:30", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Cancelada", pago: "Tarjeta en app", recurrente: "RR-01", nota: "La cancelaste el día anterior. No se cobró." },
      { codigo: "TAD-2026-03790", fecha: "2026-03-12", hora: "10:00", llegada: "10:32", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", recurrente: "RR-01", vehiculo: "4521 LKT" },
      { codigo: "TAD-2026-03742", fecha: "2026-03-09", hora: "09:15", llegada: "10:05", origen: "P14", destino: "P02", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", vehiculo: "6604 LBC", devuelto: true, reclamacion: "REC-0057" },
      { codigo: "TAD-2026-03703", fecha: "2026-03-05", hora: "10:00", llegada: "10:31", origen: "P14", destino: "P01", viajeros: 1, perfil: "mayor", estado: "Finalizada", pago: "Tarjeta en app", recurrente: "RR-01", vehiculo: "4521 LKT" }
    ],

    /** Persona nueva que rellena el registro (no es Josefa). DNI con letra que no corresponde: nunca válido. */
    registroEjemplo: {
      nombre: "Lucía",
      apellidos: "Prieto Sanz",
      dni: "00000093T",
      nacimiento: "1958-06-02",
      telefono: "6XX XXX 508",
      correo: "lucia.prieto@example.com",
      municipio: "robledillo",
      perfil: "mayor",
      documento: { nombre: "certificado-empadronamiento.pdf", tamano: "312 KB" }
    }
  };

  /** Importe de un viaje de la lista (0 si se canceló o se devolvió). */
  V.importe = function (v) {
    if (v.estado === "Cancelada" || v.devuelto) return 0;
    return TAD.tarifa(v.origen, v.destino, v.perfil).importe * v.viajeros;
  };

  /** Lo que se ahorra con la bonificación en un viaje. */
  V.ahorro = function (v) {
    if (v.estado === "Cancelada" || v.devuelto) return 0;
    var t = TAD.tarifa(v.origen, v.destino, v.perfil);
    return Math.round((t.base - t.importe) * 100) / 100 * v.viajeros;
  };

  /** CO₂ evitado por viaje compartido, en kg (media del día según el motor de optimización). */
  V.co2PorViaje = TAD.optimizacion.co2Evitado / TAD.optimizacion.reservas;

  V.recurrente = function (id) { return V.recurrentes.filter(function (r) { return r.id === id; })[0]; };

  TAD.viajero = V;
})();
