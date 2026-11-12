/* ==========================================================================
   Plataforma Digital TAD — comportamiento visual (window.TADUI)

   Solo apariencia: nada se guarda ni se envía. Se activa con atributos en
   el HTML, sin escribir JavaScript en cada pantalla:

   Pestañas      <div class="c-tabs" role="tablist"> con <button role="tab" aria-controls="panel-x">
                 y <div class="c-tabpanel" role="tabpanel" id="panel-x">
   Modal/panel   <button data-open="id-del-modal">  ·  dentro: <button data-close>
                 (el destino es un .c-modal o un .c-drawer con ese id)
   Aviso         <button data-toast="Reserva confirmada. Hemos enviado un SMS…"
                         data-toast-title="Reserva confirmada" data-toast-type="danger">
   Desplegable   <div class="c-dropdown"><button data-dropdown aria-controls="menu-x">…
                 <div class="c-dropdown__menu" id="menu-x">…</div></div>
   Tabla         <table class="c-table" data-sortable> y en el <th> un <button class="c-table__sort">
                 (cada <td> puede llevar data-value para ordenar por número u hora)
   Filtros       <div class="c-chip-group" data-filter-target="id-tabla" data-filter-key="estado">
                 con <button class="c-chip" data-filter="En curso" aria-pressed="false">
                 y en cada <tr data-estado="En curso">. Un chip con data-filter="" muestra todo.
   Pasos         <div data-stepper> con <ol class="c-stepper">, paneles [data-step] y botones
                 [data-step-next] / [data-step-prev] / [data-step-go="2"]

   API: TADUI.toast(texto, {titulo, tipo}), TADUI.abrir(id), TADUI.cerrar(), TADUI.iniciar(raiz)
   ========================================================================== */
(function () {
  "use strict";

  var ICONO_CHECK = '<svg class="c-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  var ICONO_ALERTA = '<svg class="c-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 4.5 2.8 17.7A2 2 0 0 0 4.5 20.7h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4.5M12 17.2v.1"/></svg>';
  var ICONO_CERRAR = '<svg class="c-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var FOCO = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function $all(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }
  function esc(s) { return window.TAD ? TAD.fmt.html(s) : String(s); }

  /* ---------------- Aviso emergente ---------------- */
  var region = null;
  function toast(texto, op) {
    op = op || {};
    if (!region) {
      region = document.createElement("div");
      region.className = "c-toast-region";
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    var t = document.createElement("div");
    t.className = "c-toast is-open" + (op.tipo === "danger" ? " c-toast--danger" : "");
    t.setAttribute("role", op.tipo === "danger" ? "alert" : "status");
    t.innerHTML = (op.tipo === "danger" ? ICONO_ALERTA : ICONO_CHECK) +
      '<div class="c-toast__body">' + (op.titulo ? '<strong class="c-toast__title">' + esc(op.titulo) + "</strong>" : "") + esc(texto) + "</div>" +
      '<button class="c-toast__close" type="button" aria-label="Cerrar aviso">' + ICONO_CERRAR + "</button>";
    region.appendChild(t);
    var quitar = function () { if (t.parentNode) t.parentNode.removeChild(t); };
    t.querySelector(".c-toast__close").addEventListener("click", quitar);
    setTimeout(quitar, op.duracion || 5000);
    return t;
  }

  /* ---------------- Modal y panel lateral ---------------- */
  var abierto = null, origen = null;
  function abrir(id, desde) {
    var el = document.getElementById(id);
    if (!el) return;
    if (abierto) cerrar();
    abierto = el;
    origen = desde || document.activeElement;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    var caja = el.querySelector(".c-modal__dialog, .c-drawer__panel") || el;
    if (!caja.hasAttribute("tabindex")) caja.setAttribute("tabindex", "-1");
    var primero = $all(FOCO, caja)[0];
    (primero || caja).focus();
    document.body.style.overflow = "hidden";
  }
  function cerrar() {
    if (!abierto) return;
    abierto.classList.remove("is-open");
    abierto.setAttribute("aria-hidden", "true");
    abierto = null;
    document.body.style.overflow = "";
    if (origen && origen.focus) origen.focus();
    origen = null;
  }

  /* ---------------- Pestañas ---------------- */
  function activarTab(tab, foco) {
    var lista = tab.closest('[role="tablist"]');
    $all('[role="tab"]', lista).forEach(function (t) {
      var sel = t === tab;
      t.setAttribute("aria-selected", sel ? "true" : "false");
      t.setAttribute("tabindex", sel ? "0" : "-1");
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !sel;
    });
    if (foco) tab.focus();
    tab.dispatchEvent(new CustomEvent("tad:tab", { bubbles: true, detail: { id: tab.getAttribute("aria-controls") } }));
  }

  /* ---------------- Tabla ordenable ---------------- */
  function valorCelda(td) {
    if (!td) return "";
    var dv = td.getAttribute("data-value");
    if (dv != null && dv !== "" && !isNaN(dv)) return parseFloat(dv);   // valor interno: 9.9
    var v = dv != null ? dv : td.textContent.trim();
    if (/^\d{1,2}:\d{2}$/.test(v)) return parseInt(v.replace(":", ""), 10);
    var n = v.replace(/[€%\s]/g, "").replace(/\./g, "").replace(",", ".");  // formato español: 1.234,56
    return n !== "" && !isNaN(n) ? parseFloat(n) : v.toLowerCase();
  }
  function ordenar(boton) {
    var th = boton.closest("th"), tabla = th.closest("table"), tbody = tabla.tBodies[0];
    var col = Array.prototype.indexOf.call(th.parentNode.children, th);
    var asc = th.getAttribute("aria-sort") !== "ascending";
    $all("th[aria-sort]", tabla).forEach(function (x) { x.removeAttribute("aria-sort"); });
    th.setAttribute("aria-sort", asc ? "ascending" : "descending");
    var filas = $all("tr", tbody).filter(function (tr) { return !tr.classList.contains("c-table__empty"); });
    filas.sort(function (a, b) {
      var x = valorCelda(a.children[col]), y = valorCelda(b.children[col]);
      return (x > y ? 1 : x < y ? -1 : 0) * (asc ? 1 : -1);
    });
    filas.forEach(function (tr) { tbody.appendChild(tr); });
  }

  /* ---------------- Filtros con chips ---------------- */
  function filtrar(chip) {
    var grupo = chip.closest(".c-chip-group");
    var multiple = grupo.hasAttribute("data-filter-multiple");
    if (multiple) {
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
    } else {
      $all(".c-chip[data-filter]", grupo).forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
    }
    var destino = document.getElementById(grupo.getAttribute("data-filter-target"));
    var clave = grupo.getAttribute("data-filter-key");
    if (!destino || !clave) return;
    var activos = $all('.c-chip[data-filter][aria-pressed="true"]', grupo).map(function (c) { return c.getAttribute("data-filter"); });
    var todos = activos.length === 0 || activos.indexOf("") !== -1;
    $all("[data-" + clave + "]", destino).forEach(function (el) {
      el.classList.toggle("is-filtered-out", !todos && activos.indexOf(el.getAttribute("data-" + clave)) === -1);
      if (el.tagName !== "TR") el.hidden = !todos && activos.indexOf(el.getAttribute("data-" + clave)) === -1;
    });
    grupo.dispatchEvent(new CustomEvent("tad:filtro", { bubbles: true, detail: { clave: clave, valores: activos } }));
  }

  /* ---------------- Pasos ---------------- */
  function irAPaso(cont, n, foco) {
    var pasos = $all("[data-step]", cont);
    n = Math.max(1, Math.min(n, pasos.length));
    cont.setAttribute("data-step-actual", n);
    pasos.forEach(function (p, i) { p.hidden = i + 1 !== n; });
    $all(".c-stepper__step", cont).forEach(function (li, i) {
      li.classList.toggle("is-done", i + 1 < n);
      li.classList.toggle("is-current", i + 1 === n);
      if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
    var actual = pasos[n - 1];
    var titulo = actual && actual.querySelector("h2, h3, legend");
    if (titulo && foco !== false) { titulo.setAttribute("tabindex", "-1"); titulo.focus(); }
    cont.dispatchEvent(new CustomEvent("tad:paso", { bubbles: true, detail: { paso: n } }));
  }

  /* ---------------- Desplegables ---------------- */
  function cerrarDesplegables(excepto) {
    $all("[data-dropdown][aria-expanded=\"true\"]").forEach(function (b) {
      if (b === excepto) return;
      b.setAttribute("aria-expanded", "false");
      var m = document.getElementById(b.getAttribute("aria-controls"));
      if (m) m.classList.remove("is-open");
    });
  }

  /* ---------------- Inicialización ---------------- */
  function iniciar(raiz) {
    raiz = raiz || document;
    $all('[role="tablist"]', raiz).forEach(function (lista) {
      var tabs = $all('[role="tab"]', lista);
      var sel = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
      if (sel) activarTab(sel, false);
    });
    $all("[data-stepper]", raiz).forEach(function (c) { irAPaso(c, parseInt(c.getAttribute("data-step-actual") || "1", 10), false); });
    $all(".c-modal, .c-drawer", raiz).forEach(function (m) {
      if (!m.classList.contains("is-open")) m.setAttribute("aria-hidden", "true");
    });
    $all("[data-dropdown]", raiz).forEach(function (b) { b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-haspopup", "true"); });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : e.target.parentNode;
    var el;
    if ((el = t.closest("[data-open]"))) { e.preventDefault(); abrir(el.getAttribute("data-open"), el); return; }
    if ((el = t.closest("[data-close]"))) { e.preventDefault(); cerrar(); return; }
    if (t.classList && (t.classList.contains("c-modal") || t.classList.contains("c-drawer")) && t === abierto) { cerrar(); return; }
    if ((el = t.closest("[data-toast]"))) {
      e.preventDefault();
      toast(el.getAttribute("data-toast"), { titulo: el.getAttribute("data-toast-title"), tipo: el.getAttribute("data-toast-type") });
      if (el.hasAttribute("data-toast-close")) cerrar();
    }
    if ((el = t.closest('[role="tab"]'))) { activarTab(el, true); return; }
    if ((el = t.closest(".c-table__sort"))) { ordenar(el); return; }
    if ((el = t.closest(".c-chip[data-filter]"))) { filtrar(el); return; }
    if ((el = t.closest("[data-step-next], [data-step-prev], [data-step-go]"))) {
      var cont = el.closest("[data-stepper]");
      var n = parseInt(cont.getAttribute("data-step-actual") || "1", 10);
      irAPaso(cont, el.hasAttribute("data-step-go") ? parseInt(el.getAttribute("data-step-go"), 10) : n + (el.hasAttribute("data-step-next") ? 1 : -1));
      return;
    }
    if ((el = t.closest("[data-dropdown]"))) {
      var menu = document.getElementById(el.getAttribute("aria-controls"));
      var abrirlo = el.getAttribute("aria-expanded") !== "true";
      cerrarDesplegables(el);
      el.setAttribute("aria-expanded", abrirlo ? "true" : "false");
      if (menu) {
        menu.classList.toggle("is-open", abrirlo);
        if (abrirlo) { var p = menu.querySelector(".c-dropdown__item"); if (p) p.focus(); }
      }
      return;
    }
    if (!t.closest(".c-dropdown__menu")) cerrarDesplegables();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (abierto) { cerrar(); return; }
      var b = document.querySelector('[data-dropdown][aria-expanded="true"]');
      if (b) { cerrarDesplegables(); b.focus(); }
      return;
    }
    // Foco atrapado dentro del modal o panel abierto
    if (e.key === "Tab" && abierto) {
      var foc = $all(FOCO, abierto).filter(function (x) { return x.offsetParent !== null; });
      if (!foc.length) return;
      var pri = foc[0], ult = foc[foc.length - 1];
      if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      return;
    }
    // Flechas en pestañas
    var tab = e.target.closest && e.target.closest('[role="tab"]');
    if (tab && /^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) {
      var tabs = $all('[role="tab"]:not([disabled])', tab.closest('[role="tablist"]'));
      var i = tabs.indexOf(tab);
      var j = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      e.preventDefault();
      activarTab(tabs[j], true);
    }
    // Flechas dentro de un desplegable abierto
    var item = e.target.closest && e.target.closest(".c-dropdown__menu.is-open .c-dropdown__item");
    if (item && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      var items = $all(".c-dropdown__item", item.closest(".c-dropdown__menu"));
      var k = items.indexOf(item) + (e.key === "ArrowDown" ? 1 : -1);
      e.preventDefault();
      items[(k + items.length) % items.length].focus();
    }
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { iniciar(); });
  else iniciar();

  window.TADUI = { toast: toast, abrir: abrir, cerrar: cerrar, iniciar: iniciar, irAPaso: irAPaso };
})();
