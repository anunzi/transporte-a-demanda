/* ==========================================================================
   Plataforma Digital TAD — datos y cálculos de Administración pública y BI

   Amplía window.TAD (js/data.js) con lo que solo usan las pantallas de
   admin/ y bi/. Se carga después de data.js:
     <script defer src="../js/datos/admin-bi.js"></script>

   - TAD.adminBI: datos ficticios que no están en data.js (SLA, cobertura por
     núcleo, reparto por perfil, ocupación por franja, ajustes por municipio).
   - TAD.analitica: cálculos a partir de TAD.historial (30 días). Cuadro de
     mando, Territorio, Dashboard e Informes usan las mismas funciones, así que
     los indicadores del mes coinciden en todas las pantallas.
   El reparto por municipio sale de la liquidación de marzo (TAD.liquidacion).
   ========================================================================== */
(function () {
  "use strict";
  var TAD = window.TAD;
  if (!TAD) return;

  TAD.adminBI = {
    /** Acuerdos de nivel de servicio del contrato. «origen» indica de dónde sale el valor. */
    sla: [
      { id: "disponibilidad", nombre: "Disponibilidad del servicio", valor: 99.6, objetivo: 99, unidad: "%", sentido: "mayor", decimales: 1,
        nota: "Horas con vehículo disponible sobre horas contratadas" },
      { id: "puntualidad", nombre: "Puntualidad", origen: "historial", objetivo: 92, unidad: "%", sentido: "mayor", decimales: 0,
        nota: "Recogidas dentro de la ventana de ±10 minutos" },
      { id: "respuesta", nombre: "Tiempo de respuesta a incidencias", valor: 12, objetivo: 15, unidad: "min", sentido: "menor", decimales: 0,
        nota: "Desde el aviso hasta la primera actuación del centro de control" },
      { id: "atendidas", nombre: "Solicitudes de viaje atendidas", valor: 99.1, objetivo: 98, unidad: "%", sentido: "mayor", decimales: 1,
        nota: "Reservas confirmadas sobre reservas solicitadas" }
    ],

    /** Población a menos de 300 m de una parada (fija o virtual), por núcleo. */
    cobertura: {
      "valdecerro": 96, "el-chaparral": 88, "robledillo": 94, "la-dehesa": 81, "puente-viejo": 76, "santa-olalla": 95,
      "las-huertas": 84, "navalespino": 93, "cerro-alto": 79, "la-majada": 72, "fuentelviejo": 92, "el-molino": 74
    },

    /** Reparto de viajeros por perfil en los últimos 30 días (porcentaje). */
    perfiles: [
      { perfil: "mayor", pct: 44, color: "--chart-1" },
      { perfil: "estudiante", pct: 22, color: "--chart-2" },
      { perfil: "general", nombre: "Sin bonificación", pct: 18, color: "--chart-6" },
      { perfil: "PMR", pct: 9, color: "--chart-4" },
      { perfil: "familia numerosa", pct: 7, color: "--chart-5" }
    ],

    /** Ocupación media por franja horaria en días laborables (porcentaje de plazas). */
    franjas: [
      { franja: "07–09", ocupacion: 72 },
      { franja: "09–12", ocupacion: 64 },
      { franja: "12–14", ocupacion: 38 },
      { franja: "14–16", ocupacion: 31 },
      { franja: "16–19", ocupacion: 58 },
      { franja: "19–21", ocupacion: 34 }
    ],

    /** Diferencia de cada municipio con la media de la comarca (puntos). */
    ajusteMunicipio: {
      "valdecerro": { puntualidad: 1, ocupacion: 4 },
      "robledillo": { puntualidad: 0, ocupacion: -1 },
      "santa-olalla": { puntualidad: -2, ocupacion: 2 },
      "navalespino": { puntualidad: 0, ocupacion: -3 },
      "fuentelviejo": { puntualidad: -1, ocupacion: -6 }
    },

    /** Plantillas del generador de informes. */
    plantillas: [
      { id: "Diario", descripcion: "Operación del último día cerrado", dias: 1 },
      { id: "Semanal", descripcion: "Últimos 7 días", dias: 7 },
      { id: "Mensual", descripcion: "Últimos 30 días", dias: 30 },
      { id: "Anual", descripcion: "Desde el inicio del servicio", meses: true },
      { id: "Impacto", descripcion: "Impacto social y ambiental", meses: true }
    ],

    /** Destinatarios habituales de los informes. */
    destinatarios: ["Pleno de los 5 ayuntamientos", "Consorcio de Transportes", "Concejalía de Movilidad", "Centro de control", "Solicitud FEDER"]
  };

  /* ---------------- Reparto por municipio (largest remainder) ---------------- */
  var cuotas = {};
  TAD.liquidacion.desglose.forEach(function (d) { cuotas[d.municipio] = d.viajeros / TAD.liquidacion.viajeros; });
  var MUNS = TAD.municipios.map(function (m) { return m.id; });

  /** Reparte un entero entre municipios según su cuota, sin perder ni ganar unidades. */
  function repartir(total) {
    var base = {}, resto = [], suma = 0;
    MUNS.forEach(function (id) {
      var exacto = total * cuotas[id];
      base[id] = Math.floor(exacto);
      suma += base[id];
      resto.push([id, exacto - base[id]]);
    });
    resto.sort(function (a, b) { return b[1] - a[1]; });
    for (var i = 0; i < total - suma; i++) base[resto[i][0]]++;
    return base;
  }
  function limitar(v) { return Math.max(0, Math.min(100, v)); }

  // Historial de cada municipio, precalculado una vez
  var porMun = {};
  MUNS.forEach(function (id) { porMun[id] = []; });
  TAD.historial.forEach(function (d) {
    var vj = repartir(d.viajes), vs = repartir(d.viajeros), km = repartir(d.km), co = repartir(Math.round(d.co2 * 10));
    MUNS.forEach(function (id) {
      var aj = TAD.adminBI.ajusteMunicipio[id];
      porMun[id].push({
        fecha: d.fecha, viajes: vj[id], viajeros: vs[id], km: km[id], co2: co[id] / 10,
        puntualidad: limitar(d.puntualidad + aj.puntualidad), ocupacion: limitar(d.ocupacion + aj.ocupacion)
      });
    });
  });

  var marzo = TAD.mensual.filter(function (m) { return m.mes === TAD.liquidacion.mes; })[0];
  var costeKm = TAD.liquidacion.costeOperacion / marzo.km;

  TAD.analitica = {
    /** Cuota de viajeros de un municipio (0–1), según la liquidación de marzo. */
    cuota: function (municipio) { return municipio ? cuotas[municipio] : 1; },

    /** Últimos `n` días del historial (todos si no se indica), de la comarca o de un municipio.
        `saltar`: días recientes que se dejan fuera (p. ej. 7 para la semana anterior). */
    serie: function (n, municipio, saltar) {
      var lista = municipio ? porMun[municipio] : TAD.historial, fin = lista.length - (saltar || 0);
      return lista.slice(Math.max(0, fin - (n || lista.length)), fin);
    },

    /** Indicadores de un periodo: los mismos en Administración y en BI. */
    indicadores: function (n, municipio, saltar) {
      var dias = TAD.analitica.serie(n, municipio, saltar);
      var t = { viajes: 0, viajeros: 0, km: 0, co2: 0, pPunt: 0, pOcup: 0 };
      dias.forEach(function (d) {
        t.viajes += d.viajes; t.viajeros += d.viajeros; t.km += d.km; t.co2 += d.co2;
        t.pPunt += d.puntualidad * d.viajes; t.pOcup += d.ocupacion * d.viajes;
      });
      return {
        dias: dias.length,
        desde: dias[0].fecha,
        hasta: dias[dias.length - 1].fecha,
        viajes: t.viajes,
        viajeros: t.viajeros,
        km: t.km,
        // CO₂ por municipio: reparto del total redondeado, para que la suma cuadre
        co2: municipio ? repartir(TAD.analitica.indicadores(n, null, saltar).co2)[municipio] : Math.round(t.co2),
        puntualidad: Math.round(t.pPunt / t.viajes),
        ocupacion: Math.round(t.pOcup / t.viajes),
        costePorViajero: Math.round(t.km * costeKm / t.viajeros * 100) / 100,
        satisfaccion: TAD.satisfaccion.media
      };
    },

    /** Indicadores por municipio para el mismo periodo (las sumas cuadran con el total). */
    porMunicipio: function (n, saltar) {
      return TAD.municipios.map(function (m) {
        var k = TAD.analitica.indicadores(n, m.id, saltar);
        k.municipio = m;
        k.porMil = k.viajeros / m.habitantes * 1000;
        return k;
      });
    },

    /** Viajeros de cada núcleo de un municipio (reparto por habitantes). */
    porNucleo: function (n, municipio) {
      var total = TAD.analitica.indicadores(n, municipio).viajeros;
      var nucleos = TAD.nucleos.filter(function (x) { return x.municipio === municipio; });
      var hab = nucleos.reduce(function (a, x) { return a + x.habitantes; }, 0), asignado = 0;
      return nucleos.map(function (x, i) {
        var v = i === nucleos.length - 1 ? total - asignado : Math.round(total * x.habitantes / hab);
        asignado += v;
        return { nucleo: x, viajeros: v, paradas: TAD.paradas.filter(function (p) { return p.nucleo === x.id; }).length,
          cobertura: TAD.adminBI.cobertura[x.id] };
      });
    },

    /** Cobertura de un municipio: media de sus núcleos ponderada por habitantes. */
    cobertura: function (municipio) {
      var nucleos = TAD.nucleos.filter(function (x) { return x.municipio === municipio; });
      var hab = nucleos.reduce(function (a, x) { return a + x.habitantes; }, 0);
      return Math.round(nucleos.reduce(function (a, x) { return a + TAD.adminBI.cobertura[x.id] * x.habitantes; }, 0) / hab);
    },

    /** Viajeros por perfil en un periodo, con nombres de la tabla de bonificaciones. */
    perfiles: function (n, municipio) {
      var total = TAD.analitica.indicadores(n, municipio).viajeros, asignado = 0, lista = TAD.adminBI.perfiles;
      return lista.map(function (p, i) {
        var b = TAD.tarifas.bonificaciones.filter(function (x) { return x.perfil === p.perfil; })[0];
        var v = i === lista.length - 1 ? total - asignado : Math.round(total * p.pct / 100);
        asignado += v;
        return { nombre: p.nombre || (b ? b.nombre : p.perfil), valor: v, color: p.color };
      });
    },

    /** Ocupación por franja (con el ajuste del municipio). */
    franjas: function (municipio) {
      var aj = municipio ? TAD.adminBI.ajusteMunicipio[municipio].ocupacion : 0;
      return TAD.adminBI.franjas.map(function (f) { return { franja: f.franja, ocupacion: limitar(f.ocupacion + aj) }; });
    },

    /** Predicción de viajeros de la próxima semana (de la comarca o de un municipio). */
    prediccion: function (municipio) {
      return TAD.prediccion.map(function (p) { return { fecha: p.fecha, viajeros: Math.round(p.viajeros * TAD.analitica.cuota(municipio)) }; });
    },

    /** Valor actual de un SLA. */
    valorSla: function (s) { return s.origen === "historial" ? TAD.analitica.indicadores().puntualidad : s.valor; },

    /** ¿Se cumple el SLA? */
    cumpleSla: function (s) {
      var v = TAD.analitica.valorSla(s);
      return s.sentido === "menor" ? v <= s.objetivo : v >= s.objetivo;
    },

    /** Reparte un entero entre los municipios según su cuota: { municipio: unidades }. */
    repartir: repartir,

    /** Coste de operación por km (marzo), para estimar el coste por viajero. */
    costeKm: costeKm
  };
})();
