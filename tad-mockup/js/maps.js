/* ==========================================================================
   Plataforma Digital TAD — mapas (window.TADMapa)

   En la página, antes de este archivo (y después de data.js):
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
           integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
     <script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
           integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

   Contenedor (ver .c-map en components.css):
     <div class="c-map" id="mapa">
       <div class="c-map__canvas"></div>
       <div class="c-map__fallback">Mapa no disponible</div>
     </div>

   Uso (todas las capas salen de window.TAD; se pueden encadenar):
     var m = TADMapa.crear("#mapa");
     m.obras().rutas().paradas({ resaltar: "P14" }).vehiculos().encuadrar();

   Si Leaflet no carga (sin conexión o CDN caído), el contenedor se queda en gris
   con «Mapa no disponible» y las llamadas no hacen nada: la página sigue funcionando.
   Las rutas son líneas aproximadas dibujadas a mano, no siguen la carretera exacta.
   Mapa base: IGN (Instituto Geográfico Nacional), sin clave de acceso.
   ========================================================================== */
(function () {
  "use strict";

  /* Mapa base oficial del Instituto Geográfico Nacional (IGN Base, licencia CC BY 4.0).
     Se usa este y no las teselas públicas de OpenStreetMap porque esas bloquean
     este tipo de uso («Access blocked»). La atribución es obligatoria por la licencia. */
  var TESELAS = "https://www.ign.es/wmts/ign-base?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=IGNBaseTodo&STYLE=default&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png";
  var ATRIBUCION = 'Mapa base: <a href="https://www.ign.es">IGN</a> (CC BY 4.0)';
  var ICONO_FURGONETA = '<svg class="c-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17H9.5M5 17H3.5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1H15l4.5 4.5H20a1.5 1.5 0 0 1 1.5 1.5v4a1 1 0 0 1-1 1H19"/><path d="M15 6v4.5h4.5M2.5 11H15"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg>';

  function el(x) { return typeof x === "string" ? document.querySelector(x) : x; }
  function esc(s) { return TAD.fmt.html(s); }

  /* Objeto vacío para cuando no hay Leaflet: mismas funciones, no hacen nada. */
  function sinMapa(cont) {
    if (cont) cont.classList.remove("is-loaded");
    var nada = {};
    ["paradas", "rutas", "vehiculos", "obras", "municipios", "calor", "encuadrar", "centrarEn", "seleccionar", "limpiar", "leyenda"].forEach(function (f) {
      nada[f] = function () { return nada; };
    });
    nada.disponible = false;
    return nada;
  }

  /* Envolvente convexa (para dibujar los municipios como áreas aproximadas). */
  function envolvente(puntos) {
    var p = puntos.slice().sort(function (a, b) { return a[1] - b[1] || a[0] - b[0]; });
    var cruz = function (o, a, b) { return (a[1] - o[1]) * (b[0] - o[0]) - (a[0] - o[0]) * (b[1] - o[1]); };
    var inf = [], sup = [];
    p.forEach(function (q) { while (inf.length >= 2 && cruz(inf[inf.length - 2], inf[inf.length - 1], q) <= 0) inf.pop(); inf.push(q); });
    p.slice().reverse().forEach(function (q) { while (sup.length >= 2 && cruz(sup[sup.length - 2], sup[sup.length - 1], q) <= 0) sup.pop(); sup.push(q); });
    return inf.slice(0, -1).concat(sup.slice(0, -1));
  }

  function crear(contenedor, opciones) {
    var cont = el(contenedor);
    opciones = opciones || {};
    if (!cont || !window.L || !window.TAD) return sinMapa(cont);
    var lienzo = cont.querySelector(".c-map__canvas") || cont;

    var mapa = L.map(lienzo, {
      center: opciones.centro || [40.905, -3.59],
      zoom: opciones.zoom || 12,
      scrollWheelZoom: opciones.rueda === true,
      zoomControl: opciones.zoomControl !== false,
      attributionControl: true
    });
    mapa.attributionControl.setPrefix(false);
    L.tileLayer(TESELAS, { maxZoom: 17, attribution: ATRIBUCION }).addTo(mapa);
    cont.classList.add("is-loaded");

    var hora = opciones.momento || TAD.momento();
    var esSeguimiento = hora === TAD.ahoraSeguimiento;
    var capas = [];
    var marcadoresVehiculo = {};

    function anadir(capa) { capa.addTo(mapa); capas.push(capa); return capa; }

    var api = { leaflet: mapa, disponible: true };

    /** Paradas. op: { ids:[…], resaltar:"P14", soloRuta:"R2", etiquetas:true } */
    api.paradas = function (op) {
      op = op || {};
      var ids = op.ids;
      if (op.soloRuta) {
        var s = TAD.servicioActual(op.soloRuta, hora);
        ids = s.paradas.map(function (p) { return p.parada; });
      }
      TAD.paradas.forEach(function (p) {
        if (ids && ids.indexOf(p.id) === -1 && p.id !== op.resaltar) return;
        var resaltada = p.id === op.resaltar;
        var tam = resaltada ? 22 : (p.tipo === "intercambiador" ? 14 : 12);
        var html = '<span class="c-map-stop c-map-stop--' + p.tipo + (resaltada ? " c-map-stop--resaltada" : "") + '"></span>';
        var m = anadir(L.marker(p.coord, {
          icon: L.divIcon({ className: "", html: html, iconSize: [tam, tam], iconAnchor: [tam / 2, tam / 2] }),
          title: p.nombre, alt: p.nombre, keyboard: !!op.teclado, zIndexOffset: resaltada ? 500 : 0
        }));
        m.bindTooltip(esc(p.nombre) + (p.tipo !== "fija" ? " · " + p.tipo : ""), {
          className: "c-map-tooltip", direction: "top", offset: [0, -tam / 2], permanent: resaltada || !!op.etiquetas
        });
      });
      return api;
    };

    /** Rutas. op: { ids:["R1"…], destacar:"R2", todas:false (todos los servicios del día) } */
    api.rutas = function (op) {
      op = op || {};
      TAD.rutas.forEach(function (r) {
        if (op.ids && op.ids.indexOf(r.id) === -1) return;
        var servicios = op.todas ? r.servicios : [TAD.servicioActual(r.id, hora)];
        servicios.forEach(function (s) {
          var clase = "c-map-route c-map-route--" + r.id.toLowerCase() + (op.destacar && op.destacar !== r.id ? " c-map-route--atenuada" : "");
          var linea = anadir(L.polyline(s.trazado, { className: clase, interactive: true }));
          linea.bindTooltip("Ruta " + r.id + " · " + esc(s.nombre), { className: "c-map-tooltip", sticky: true });
        });
      });
      return api;
    };

    /** Vehículos con posición. op: { ids:["4521 LKT"], seleccionar:"4521 LKT", etiquetas:true, alPulsar:function(matricula){} } */
    api.vehiculos = function (op) {
      op = op || {};
      TAD.vehiculos.forEach(function (v) {
        if (op.ids && op.ids.indexOf(v.matricula) === -1) return;
        var pos = esSeguimiento && v.posicionSeguimiento ? v.posicionSeguimiento : v.posicion;
        if (!pos) return;
        var ruta = v.rutaHoy ? TAD.ruta(v.rutaHoy) : null;
        var estado = !ruta || !v.velocidad ? "parado" : (ruta.retrasoMin > 0 ? "retraso" : "servicio");
        var html = '<span class="c-map-vehicle c-map-vehicle--' + estado + (op.seleccionar === v.matricula ? " is-selected" : "") + '">' + ICONO_FURGONETA + "</span>";
        var texto = v.matricula + (ruta ? " · Ruta " + ruta.id : " · " + (v.ubicacion || "Sin servicio")) +
          (ruta && ruta.retrasoMin ? " · retraso " + ruta.retrasoMin + " min" : "");
        var m = anadir(L.marker(pos, {
          icon: L.divIcon({ className: "", html: html, iconSize: [32, 32], iconAnchor: [16, 16] }),
          title: texto, alt: texto, keyboard: true, zIndexOffset: 1000
        }));
        m.bindTooltip(esc(texto), { className: "c-map-tooltip", direction: "top", offset: [0, -16], permanent: !!op.etiquetas });
        if (op.alPulsar) m.on("click keypress", function () { op.alPulsar(v.matricula); });
        marcadoresVehiculo[v.matricula] = m;
      });
      return api;
    };

    /** Zona de obras de la CM-1004. */
    api.obras = function () {
      var o = TAD.obras;
      anadir(L.polygon(o.poligono, { className: "c-map-works" })).bindTooltip(esc(o.nombre), { className: "c-map-tooltip", sticky: true });
      return api;
    };

    /** Municipios coloreados por demanda (viajeros de marzo por habitante, en 4 niveles). */
    api.municipios = function (op) {
      op = op || {};
      var porMun = {};
      TAD.liquidacion.desglose.forEach(function (d) { porMun[d.municipio] = d.viajeros / TAD.municipio(d.municipio).habitantes; });
      var valores = Object.keys(porMun).map(function (k) { return porMun[k]; }).sort(function (a, b) { return a - b; });
      TAD.municipios.forEach(function (mu) {
        var pts = [];
        TAD.nucleos.filter(function (n) { return n.municipio === mu.id; }).forEach(function (n) {
          var r = mu.cabecera ? 0.016 : 0.011;
          for (var a = 0; a < 12; a++) pts.push([n.coord[0] + r * 0.75 * Math.sin(a * Math.PI / 6), n.coord[1] + r * Math.cos(a * Math.PI / 6)]);
        });
        var nivel = Math.min(4, 1 + valores.indexOf(porMun[mu.id]) * 4 / valores.length | 0);
        var area = anadir(L.polygon(envolvente(pts), { className: "c-map-area c-map-area--" + nivel }));
        area.bindTooltip(esc(mu.nombre) + " · " + TAD.fmt.numero(porMun[mu.id] * 1000, 0) + " viajeros/1.000 hab. en marzo",
          { className: "c-map-tooltip", sticky: true });
        if (op.alPulsar) area.on("click", function () { op.alPulsar(mu.id); });
      });
      return api;
    };

    /** Mapa de calor de demanda: círculo por parada según las reservas del día. */
    api.calor = function () {
      var cuenta = {};
      TAD.reservas.forEach(function (r) {
        cuenta[r.origen] = (cuenta[r.origen] || 0) + r.viajeros;
        cuenta[r.destino] = (cuenta[r.destino] || 0) + r.viajeros;
      });
      TAD.paradas.forEach(function (p) {
        var n = cuenta[p.id] || 0;
        if (!n) return;
        anadir(L.circleMarker(p.coord, { radius: 6 + Math.sqrt(n) * 4, className: "c-map-heat" }))
          .bindTooltip(esc(p.nombre) + " · " + n + " viajeros hoy", { className: "c-map-tooltip" });
      });
      return api;
    };

    /** Encuadra todo lo dibujado. */
    api.encuadrar = function (margen) {
      var grupo = L.featureGroup(capas.filter(function (c) { return c.getLatLng || c.getBounds; }));
      if (grupo.getLayers().length) mapa.fitBounds(grupo.getBounds(), { padding: [margen || 30, margen || 30] });
      return api;
    };

    /** Centra en un vehículo y lo marca como seleccionado. */
    api.centrarEn = function (matricula, zoom) {
      var m = marcadoresVehiculo[matricula];
      if (!m) return api;
      Object.keys(marcadoresVehiculo).forEach(function (k) {
        var nodo = marcadoresVehiculo[k].getElement();
        var span = nodo && nodo.querySelector(".c-map-vehicle");
        if (span) span.classList.toggle("is-selected", k === matricula);
      });
      mapa.setView(m.getLatLng(), zoom || Math.max(mapa.getZoom(), 13), { animate: true });
      return api;
    };
    api.seleccionar = api.centrarEn;

    api.limpiar = function () {
      capas.forEach(function (c) { mapa.removeLayer(c); });
      capas = [];
      marcadoresVehiculo = {};
      return api;
    };

    // Si el contenedor cambia de tamaño (pestañas, paneles), recalcular
    if (window.ResizeObserver) new ResizeObserver(function () { mapa.invalidateSize(); }).observe(lienzo);
    return api;
  }

  window.TADMapa = { crear: crear };
})();
