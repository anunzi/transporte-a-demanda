/* ==========================================================================
   Plataforma Digital TAD — gráficos en SVG (window.TADGrafico)

   Sin librerías. Los colores son tokens de tokens.css («--chart-1», «--ruta-r2»…),
   así que si cambia la paleta cambian los gráficos. Cada gráfico lleva título y
   descripción accesibles y una tabla oculta con los datos para lectores de pantalla.

   TADGrafico.linea(el, { titulo, etiquetas:[…], series:[{ nombre, valores:[…], color:"--chart-1",
                          discontinua:false, area:false }], unidad:"", alto:240, min:0 })
   TADGrafico.area(el, mismo formato)                 → línea con área rellena
   TADGrafico.barras(el, { titulo, etiquetas, series, unidad, alto, horizontal:false })
   TADGrafico.donut(el, { titulo, datos:[{ nombre, valor, color }], centro:"49", subcentro:"viajeros" })
   TADGrafico.medidor(el, { titulo, valor:94, max:100, unidad:"%", objetivo:95 })
   TADGrafico.sparkline(el, valores, "--chart-1")
   `el` puede ser un selector o un elemento; se le añade la clase .c-chart.
   ========================================================================== */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var ANCHO = 600;
  var cuenta = 0;

  function el(x) { return typeof x === "string" ? document.querySelector(x) : x; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* Coma decimal y punto de miles también en 4 cifras (1.939), igual que TAD.fmt */
  function num(n, dec) {
    var max = dec == null ? 1 : dec, v = Number(n), t = Math.abs(v).toFixed(max);
    if (max > 0) t = t.replace(/0+$/, "").replace(/\.$/, "");
    var p = t.split(".");
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (v < 0 ? "−" : "") + p.join(",");
  }
  function color(c) { return "var(" + (c || "--chart-1") + ")"; }
  function redondo(max) {
    if (max <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(max)));
    var m = max / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  }

  /** Crea el <svg> accesible con título, descripción y tabla oculta. */
  function lienzo(cont, alto, op, filas) {
    cont = el(cont);
    cont.classList.add("c-chart");
    var id = "graf-" + (++cuenta);
    var tabla = "";
    if (filas && filas.length) {
      tabla = '<table class="u-visually-hidden"><caption>' + esc(op.titulo || "Datos del gráfico") + "</caption><thead><tr>" +
        filas[0].map(function (c) { return '<th scope="col">' + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        filas.slice(1).map(function (f) { return "<tr>" + f.map(function (c, i) { return i ? "<td>" + esc(c) + "</td>" : '<th scope="row">' + esc(c) + "</th>"; }).join("") + "</tr>"; }).join("") +
        "</tbody></table>";
    }
    cont.innerHTML = '<svg viewBox="0 0 ' + ANCHO + " " + alto + '" role="img" aria-labelledby="' + id + "-t " + id + '-d" preserveAspectRatio="xMidYMid meet">' +
      '<title id="' + id + '-t">' + esc(op.titulo || "Gráfico") + "</title>" +
      '<desc id="' + id + '-d">' + esc(op.descripcion || "") + "</desc></svg>" + tabla;
    return { cont: cont, svg: cont.querySelector("svg") };
  }

  function nodo(padre, tipo, attrs, texto) {
    var n = document.createElementNS(NS, tipo);
    for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (texto != null) n.textContent = texto;
    padre.appendChild(n);
    return n;
  }

  function leyenda(cont, items) {
    if (items.length < 2) return;
    var ul = document.createElement("ul");
    ul.className = "c-chart__legend";
    ul.setAttribute("aria-hidden", "true");
    ul.innerHTML = items.map(function (it) {
      var cls = "c-chart__key" + (it.tipo === "linea" ? " c-chart__key--line" : "") + (it.discontinua ? " c-chart__key--dashed" : "");
      var estilo = it.discontinua ? "border-color:" + color(it.color) : "background:" + color(it.color);
      return '<li><span class="' + cls + '" style="' + estilo + '"></span>' + esc(it.nombre) + "</li>";
    }).join("");
    cont.appendChild(ul);
  }

  /* ---------------- Ejes comunes ---------------- */
  function ejes(svg, op, alto, maxV, minV) {
    var m = { izq: 44, der: 12, arr: 12, aba: 28 };
    var w = ANCHO - m.izq - m.der, h = alto - m.arr - m.aba;
    var pasos = 4;
    for (var i = 0; i <= pasos; i++) {
      var v = minV + (maxV - minV) * i / pasos;
      var y = m.arr + h - h * i / pasos;
      nodo(svg, "line", { x1: m.izq, x2: ANCHO - m.der, y1: y, y2: y, "class": i ? "c-chart__grid" : "c-chart__axis" });
      nodo(svg, "text", { x: m.izq - 8, y: y + 4, "text-anchor": "end", "class": "c-chart__label" }, num(v, 0) + (op.unidadEje || ""));
    }
    var et = op.etiquetas || [];
    var cada = Math.max(1, Math.ceil(et.length / (op.maxEtiquetas || 8)));
    return { m: m, w: w, h: h, cada: cada, et: et };
  }

  /* ---------------- Línea / área ---------------- */
  function linea(cont, op) {
    var alto = op.alto || 240;
    var series = op.series || [];
    var todos = [].concat.apply([], series.map(function (s) { return s.valores.filter(function (v) { return v != null; }); }));
    var minV = op.min != null ? op.min : 0;
    var maxV = op.max != null ? op.max : redondo(Math.max.apply(null, todos) * 1.05);
    var filas = [["", ].concat(series.map(function (s) { return s.nombre; }))];
    (op.etiquetas || []).forEach(function (e, i) { filas.push([e].concat(series.map(function (s) { return s.valores[i] == null ? "—" : num(s.valores[i]) + (op.unidad || ""); }))); });
    var c = lienzo(cont, alto, op, filas), svg = c.svg;
    var g = ejes(svg, op, alto, maxV, minV);
    var n = Math.max.apply(null, series.map(function (s) { return s.valores.length; }));
    var x = function (i) { return g.m.izq + (n === 1 ? g.w / 2 : g.w * i / (n - 1)); };
    var y = function (v) { return g.m.arr + g.h - g.h * (v - minV) / (maxV - minV); };
    g.et.forEach(function (e, i) {
      if (i % g.cada === 0 || i === g.et.length - 1) nodo(svg, "text", { x: x(i), y: alto - 8, "text-anchor": "middle", "class": "c-chart__label" }, e);
    });
    series.forEach(function (s) {
      var pts = [];
      s.valores.forEach(function (v, i) { if (v != null) pts.push([x(i), y(v), v, i]); });
      if (!pts.length) return;
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
      if (s.area || op.area) {
        nodo(svg, "path", { d: d + " L" + pts[pts.length - 1][0].toFixed(1) + " " + y(minV) + " L" + pts[0][0].toFixed(1) + " " + y(minV) + " Z",
          style: "fill:" + color(s.color) + ";fill-opacity:0.15;stroke:none" });
      }
      nodo(svg, "path", { d: d, "class": "c-chart__line" + (s.discontinua ? " c-chart__line--dashed" : ""), style: "stroke:" + color(s.color) });
      if (pts.length <= 31) pts.forEach(function (p) {
        var punto = nodo(svg, "circle", { cx: p[0], cy: p[1], r: 3.5, "class": "c-chart__dot", style: "fill:" + color(s.color) });
        nodo(punto, "title", {}, (op.etiquetas ? op.etiquetas[p[3]] + ": " : "") + num(p[2]) + (op.unidad || ""));
      });
    });
    leyenda(c.cont, series.map(function (s) { return { nombre: s.nombre, color: s.color, tipo: "linea", discontinua: s.discontinua }; }));
    return c;
  }
  function area(cont, op) { op.area = true; return linea(cont, op); }

  /* ---------------- Barras ---------------- */
  function barras(cont, op) {
    var alto = op.alto || 240;
    var series = op.series || [];
    var et = op.etiquetas || [];
    var maxV = op.max != null ? op.max : redondo(Math.max.apply(null, [].concat.apply([], series.map(function (s) { return s.valores; }))) * 1.05);
    var filas = [[""].concat(series.map(function (s) { return s.nombre; }))];
    et.forEach(function (e, i) { filas.push([e].concat(series.map(function (s) { return num(s.valores[i]) + (op.unidad || ""); }))); });
    var c = lienzo(cont, alto, op, filas), svg = c.svg;
    var g = ejes(svg, op, alto, maxV, 0);
    g.cada = 1;
    var grupo = g.w / et.length, hueco = grupo * 0.25, ancho = (grupo - hueco) / series.length;
    et.forEach(function (e, i) {
      var x0 = g.m.izq + grupo * i + hueco / 2;
      series.forEach(function (s, j) {
        var v = s.valores[i], hb = g.h * v / maxV;
        var b = nodo(svg, "rect", { x: x0 + ancho * j, y: g.m.arr + g.h - hb, width: Math.max(ancho - 2, 2), height: hb, rx: 3, "class": "c-chart__bar", style: "fill:" + color(s.color) });
        nodo(b, "title", {}, e + " · " + s.nombre + ": " + num(v) + (op.unidad || ""));
        if (op.valores) nodo(svg, "text", { x: x0 + ancho * j + ancho / 2 - 1, y: g.m.arr + g.h - hb - 6, "text-anchor": "middle", "class": "c-chart__value" }, num(v) + (op.unidad || ""));
      });
      nodo(svg, "text", { x: x0 + (grupo - hueco) / 2, y: alto - 8, "text-anchor": "middle", "class": "c-chart__label" }, e);
    });
    leyenda(c.cont, series.map(function (s) { return { nombre: s.nombre, color: s.color }; }));
    return c;
  }

  /* ---------------- Donut ---------------- */
  function donut(cont, op) {
    var alto = op.alto || 240;
    var datos = op.datos || [];
    var total = datos.reduce(function (a, d) { return a + d.valor; }, 0);
    var filas = [["", "Valor", "Porcentaje"]];
    datos.forEach(function (d) { filas.push([d.nombre, num(d.valor), num(100 * d.valor / total, 0) + " %"]); });
    var c = lienzo(cont, alto, op, filas), svg = c.svg;
    var cx = ANCHO / 2, cy = alto / 2, r = alto / 2 - 16, grosor = r * 0.36;
    var radio = r - grosor / 2, circ = 2 * Math.PI * radio, acum = 0;
    nodo(svg, "circle", { cx: cx, cy: cy, r: radio, "class": "c-chart__track", "stroke-width": grosor });
    datos.forEach(function (d) {
      var frac = d.valor / total;
      var s = nodo(svg, "circle", {
        cx: cx, cy: cy, r: radio, fill: "none", "class": "c-chart__slice", "stroke-width": grosor,
        "stroke-dasharray": (circ * frac - 2).toFixed(2) + " " + (circ - circ * frac + 2).toFixed(2),
        "stroke-dashoffset": (-circ * acum).toFixed(2), transform: "rotate(-90 " + cx + " " + cy + ")", style: "stroke:" + color(d.color)
      });
      nodo(s, "title", {}, d.nombre + ": " + num(d.valor) + " (" + num(100 * frac, 0) + " %)");
      acum += frac;
    });
    if (op.centro != null) nodo(svg, "text", { x: cx, y: cy + (op.subcentro ? 4 : 10), "text-anchor": "middle", "class": "c-chart__big" }, op.centro);
    if (op.subcentro) nodo(svg, "text", { x: cx, y: cy + 24, "text-anchor": "middle", "class": "c-chart__label" }, op.subcentro);
    leyenda(c.cont, datos.map(function (d) { return { nombre: d.nombre + " · " + num(100 * d.valor / total, 0) + " %", color: d.color }; }));
    return c;
  }

  /* ---------------- Medidor (semicírculo) ---------------- */
  function medidor(cont, op) {
    var alto = op.alto || 200, max = op.max || 100, v = Math.max(0, Math.min(op.valor, max));
    var c = lienzo(cont, alto, { titulo: op.titulo, descripcion: op.descripcion || (op.titulo + ": " + num(op.valor) + (op.unidad || "") + (op.objetivo ? ". Objetivo: " + op.objetivo + (op.unidad || "") : "")) }, null);
    var svg = c.svg, cx = ANCHO / 2, cy = alto - 30, r = Math.min(ANCHO / 2, alto) - 40, grosor = 22;
    var punto = function (f) { var a = Math.PI * (1 - f); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
    var arco = function (f0, f1) { var a = punto(f0), b = punto(f1); return "M" + a[0].toFixed(1) + " " + a[1].toFixed(1) + " A" + r + " " + r + " 0 0 1 " + b[0].toFixed(1) + " " + b[1].toFixed(1); };
    nodo(svg, "path", { d: arco(0, 1), "class": "c-chart__track", "stroke-width": grosor, "stroke-linecap": "round" });
    nodo(svg, "path", { d: arco(0, v / max), fill: "none", "stroke-width": grosor, "stroke-linecap": "round", style: "stroke:" + color(op.color || "--chart-2") });
    if (op.objetivo) {
      var a = punto(op.objetivo / max), b = [cx + (r + 18) * Math.cos(Math.PI * (1 - op.objetivo / max)), cy - (r + 18) * Math.sin(Math.PI * (1 - op.objetivo / max))];
      nodo(svg, "line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": "c-chart__axis", "stroke-width": 2 });
    }
    nodo(svg, "text", { x: cx, y: cy - 8, "text-anchor": "middle", "class": "c-chart__big" }, num(op.valor) + (op.unidad || ""));
    if (op.objetivo) nodo(svg, "text", { x: cx, y: cy + 18, "text-anchor": "middle", "class": "c-chart__label" }, "Objetivo " + num(op.objetivo) + (op.unidad || ""));
    return c;
  }

  /* ---------------- Minigráfico ---------------- */
  function sparkline(cont, valores, col) {
    cont = el(cont);
    var w = 96, h = 28, min = Math.min.apply(null, valores), max = Math.max.apply(null, valores), rango = max - min || 1;
    var pts = valores.map(function (v, i) { return (2 + (w - 4) * i / (valores.length - 1)).toFixed(1) + "," + (h - 3 - (h - 6) * (v - min) / rango).toFixed(1); }).join(" ");
    cont.innerHTML = '<svg class="c-kpi__spark" viewBox="0 0 ' + w + " " + h + '" aria-hidden="true" focusable="false"><polyline fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="' + pts + '" style="stroke:' + (col ? color(col) : "currentColor") + '"/></svg>';
    return cont;
  }

  window.TADGrafico = { linea: linea, area: area, barras: barras, donut: donut, medidor: medidor, sparkline: sparkline };
})();
