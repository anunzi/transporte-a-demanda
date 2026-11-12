/* ==========================================================================
   Plataforma Digital TAD — datos de apoyo para Motor de optimización y Flota
   (sesión 3b). Amplía window.TAD; se carga DESPUÉS de js/data.js.

   Aquí solo va lo que no existe en data.js: parámetros extra de las reglas,
   estado de los interruptores de «IA responsable», telemetría, calendario de
   mantenimiento, documentos y consumo diario de 30 días de cada vehículo.
   Todo es ficticio y fijo (sin azar): la maqueta se ve igual cada vez.
   Las fechas de ITV, seguro y último mantenimiento se leen de TAD.vehiculos
   para que no puedan contradecirse.
   ========================================================================== */
(function () {
  "use strict";
  var TAD = window.TAD;
  if (!TAD) return;

  /* ---------------- Motor: reglas y última planificación ---------------- */
  TAD.reglasMotor = {
    diasServicio: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    tiempoMaximoViajeMin: 60,
    ocupacionObjetivoPct: 85,
    plazasPmrReservadas: 1,
    esperaMaximaMin: 5,
    desvioMaximoMin: 12,
    ia: [
      { id: "prediccion", nombre: "Predicción de demanda", activo: true,
        texto: "Estima cuántas reservas habrá en los próximos 7 días para preparar la flota y los turnos." },
      { id: "recursos", nombre: "Recomendación de recursos", activo: true,
        texto: "Propone qué vehículo y qué conductor asignar a cada ruta. La operadora confirma siempre." },
      { id: "simulacion", nombre: "Simulación de escenarios", activo: false,
        texto: "Permite probar cambios (cortes de carretera, más demanda) sin tocar la planificación real." }
    ],
    ultimaPlanificacion: {
      hora: "06:48",
      motivo: "Replanificación tras la avería del vehículo de la ruta R3",
      responsable: "op1",
      revisadaPorPersona: true
    }
  };

  /* ---------------- Flota: ficha detallada por vehículo ---------------- */
  // Consumo de los últimos 30 días, en el mismo orden que TAD.historial.
  // km recorridos por el vehículo cada día y consumo en l/100 km.
  var CONSUMO_4521 = {
    km: [14, 49, 46, 50, 47, 44, 18, 12, 50, 45, 47, 49, 46, 16, 14, 49, 46, 51, 47, 44, 18, 12, 50, 45, 47, 49, 46, 16, 14, 49],
    l100: [9.9, 10.4, 10.3, 10.5, 10.4, 10.2, 10.0, 9.8, 10.6, 10.3, 10.4, 10.5, 10.3, 10.1, 9.9, 10.5, 10.3, 10.6, 10.4, 10.2, 10.0, 9.8, 10.7, 10.4, 10.5, 10.6, 10.4, 10.1, 9.9, 10.5]
  };

  function fichaDe(matricula, extra) {
    var v = TAD.vehiculo(matricula);
    var consumo = TAD.historial.map(function (d, i) {
      var km = extra.consumo.km[i], l100 = extra.consumo.l100[i];
      return { fecha: d.fecha, km: km, l100: l100, litros: Math.round(km * l100) / 100 };
    });
    var mantenimientos = extra.mantenimientos.concat([
      { fecha: v.ultimoMantenimiento, tipo: "Preventivo", titulo: "Revisión de 145.000 km: aceite, filtros y frenos", estado: "Hecho", taller: "Taller de Valdecerro" },
      { fecha: v.itv, tipo: "ITV", titulo: "Inspección técnica anual", estado: "Programado", taller: "Estación ITV comarcal" },
      { fecha: v.seguro.vence, tipo: "Seguro", titulo: "Renovación de la póliza " + v.seguro.poliza, estado: "Programado", taller: v.seguro.compania }
    ]).sort(function (a, b) { return a.fecha.localeCompare(b.fecha); });
    return {
      matricula: matricula,
      bastidor: extra.bastidor,
      matriculacion: extra.matriculacion,
      combustible: extra.combustible,
      base: extra.base,
      telemetria: extra.telemetria,
      mantenimientos: mantenimientos,
      documentos: extra.documentos.concat([
        { nombre: "Póliza de seguro", detalle: v.seguro.compania + " · " + v.seguro.poliza, vence: v.seguro.vence, formato: "PDF · 312 KB" }
      ]),
      consumo: consumo
    };
  }

  var fichas = {};
  fichas["4521 LKT"] = fichaDe("4521 LKT", {
    bastidor: "WDB9066331S0XXXXX",
    matriculacion: "2020-09-18",
    combustible: "Diésel",
    base: "Base de la Estación de autobuses",
    consumo: CONSUMO_4521,
    telemetria: {
      // Velocidad cada 2 minutos entre las 09:10 y las 09:40 (km/h). Paradas en
      // Las Huertas y en el cruce de la CM-1004; tramo lento por el desvío de las obras.
      velocidades: [52, 58, 55, 47, 40, 28, 15, 0, 22, 25, 20, 24, 0, 31, 40, 46],
      desde: "09:10",
      pasoMin: 2,
      consumoInstantaneo: 11.2,
      combustiblePct: 64,
      autonomiaKm: 410,
      temperaturaMotor: 89,
      neumaticos: "Presión correcta",
      rampa: "Plegada",
      puertas: "Cerradas",
      ultimaSenal: TAD.ahora
    },
    mantenimientos: [
      { fecha: "2025-09-17", tipo: "ITV", titulo: "ITV anual: resultado favorable", estado: "Hecho", taller: "Estación ITV comarcal" },
      { fecha: "2026-01-19", tipo: "Correctivo", titulo: "Cambio de pastillas de freno delanteras", estado: "Hecho", taller: "Taller de Valdecerro" },
      { fecha: "2026-04-07", tipo: "Correctivo", titulo: "Revisión de la rampa PMR por ruido al desplegarse (sin avería)", estado: "Hecho", taller: "Taller de Valdecerro", incidencia: "INC-0398" },
      { fecha: "2026-05-12", tipo: "Preventivo", titulo: "Revisión de 150.000 km: aceite, filtros y correa", estado: "Programado", taller: "Taller de Valdecerro" },
      { fecha: "2026-06-15", tipo: "Preventivo", titulo: "Revisión anual de la rampa PMR", estado: "Programado", taller: "Servicio técnico de la rampa" }
    ],
    documentos: [
      { nombre: "Permiso de circulación", detalle: "Expedido por Tráfico", vence: null, formato: "PDF · 188 KB" },
      { nombre: "Ficha técnica", detalle: "Tarjeta ITV con las reformas de accesibilidad", vence: null, formato: "PDF · 540 KB" },
      { nombre: "Informe de la última ITV", detalle: "Resultado favorable", vence: null, formato: "PDF · 226 KB" },
      { nombre: "Certificado de la rampa PMR", detalle: "Revisión anual del fabricante", vence: "2026-06-15", formato: "PDF · 97 KB" },
      { nombre: "Autorización de transporte de viajeros", detalle: "Tarjeta de transporte (VD)", vence: "2027-01-31", formato: "PDF · 145 KB" }
    ]
  });

  /** Ficha ampliada de un vehículo (solo existe la del 4521 LKT en la maqueta). */
  TAD.fichaVehiculo = function (matricula) { return fichas[matricula] || null; };

  /** Días que faltan desde la fecha de la maqueta hasta una fecha ISO. */
  TAD.diasHasta = function (iso) {
    var a = TAD.fecha.split("-"), b = iso.split("-");
    return Math.round((Date.UTC(+b[0], +b[1] - 1, +b[2]) - Date.UTC(+a[0], +a[1] - 1, +a[2])) / 86400000);
  };
})();
