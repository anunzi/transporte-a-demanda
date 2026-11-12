/* ==========================================================================
   Plataforma Digital TAD — navegación (window.TADNav)

   Lee <body data-page="control-mapa" data-module="control"> y:
   - marca con aria-current="page" el enlace del menú que apunta a esa pantalla
     (menú lateral .bo-nav__link, menú público .pub-nav__link, pestañas de app .app-tabbar__tab);
   - rellena las migas en el elemento [data-breadcrumb];
   - rellena la hora de la maqueta en [data-tad-reloj] ("14/04/2026 09:40")
     y en [data-tad-hora] ("09:40"); con body[data-momento="seguimiento"] usa las 10:08;
   - colapsa el menú lateral con el botón .bo-sidebar__toggle (se recuerda en este navegador);
   - pone el usuario ([data-tad-usuario-nombre|cargo|iniciales]): concejala en admin y bi, operadora en el resto;
   - rellena los avisos de la campana ([data-tad-avisos], [data-tad-avisos-n]) con las incidencias de hoy.
   El menú y la barra superior van escritos en cada HTML: este archivo no los genera.
   Necesita data.js cargado antes.
   ========================================================================== */
(function () {
  "use strict";

  var CLAVE_MENU = "tad-menu-colapsado";

  function $all(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  /** Ruta relativa desde la página actual hasta la raíz de la maqueta ("../" o ""). */
  function base() {
    var b = document.body.getAttribute("data-base");
    if (b != null) return b;
    var p = TAD.pantallas.filter(function (x) { return x.id === document.body.getAttribute("data-page"); })[0];
    return p && p.archivo.indexOf("/") !== -1 ? "../" : "";
  }

  function marcarActivo(pagina) {
    var p = TAD.pantallas.filter(function (x) { return x.id === pagina; })[0];
    if (!p) return;
    var archivo = p.archivo.split("/").pop();
    var carpeta = p.archivo.indexOf("/") !== -1 ? p.archivo.split("/")[0] : "";
    $all(".bo-nav__link, .pub-nav__link, .app-tabbar__tab").forEach(function (a) {
      var dp = a.getAttribute("data-page");
      var activo;
      if (dp) activo = dp === pagina;
      else {
        var href = (a.getAttribute("href") || "").replace(/^(\.\.\/)+/, "");
        activo = href === p.archivo || (href === archivo && carpeta && location.pathname.indexOf("/" + carpeta + "/") !== -1);
      }
      if (activo) a.setAttribute("aria-current", "page");
      else if (a.getAttribute("aria-current") === "page") a.removeAttribute("aria-current");
    });
  }

  function migas(pagina) {
    var cont = document.querySelector("[data-breadcrumb]");
    var p = TAD.pantallas.filter(function (x) { return x.id === pagina; })[0];
    if (!cont || !p) return;
    var partes = [];
    if (p.grupo) partes.push({ texto: p.grupo });
    partes.push({ texto: p.nombre, actual: true });
    var ol = document.createElement("ol");
    partes.forEach(function (x) {
      var li = document.createElement("li");
      if (x.actual) {
        var s = document.createElement("span");
        s.setAttribute("aria-current", "page");
        s.textContent = x.texto;
        li.appendChild(s);
      } else li.textContent = x.texto;
      ol.appendChild(li);
    });
    cont.innerHTML = "";
    cont.appendChild(ol);
  }

  function reloj() {
    var h = TAD.momento();
    $all("[data-tad-reloj]").forEach(function (el) { el.textContent = TAD.fmt.fecha(TAD.fecha) + " " + h; });
    $all("[data-tad-hora]").forEach(function (el) { el.textContent = h; });
    $all("[data-tad-fecha]").forEach(function (el) {
      var estilo = el.getAttribute("data-tad-fecha");
      el.textContent = estilo === "larga" ? TAD.fmt.fechaLarga(TAD.fecha) : TAD.fmt.fecha(TAD.fecha);
    });
  }

  function menuColapsable() {
    var boton = document.querySelector(".bo-sidebar__toggle");
    if (!boton) return;
    var guardado = null;
    try { guardado = localStorage.getItem(CLAVE_MENU); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    var aplicar = function (col) {
      document.body.classList.toggle("is-sidebar-collapsed", col);
      boton.setAttribute("aria-expanded", col ? "false" : "true");
      boton.setAttribute("aria-label", col ? "Desplegar el menú" : "Plegar el menú");
    };
    aplicar(guardado === "1");
    boton.addEventListener("click", function () {
      var col = !document.body.classList.contains("is-sidebar-collapsed");
      aplicar(col);
      try { localStorage.setItem(CLAVE_MENU, col ? "1" : "0"); } catch (e) { /* idem */ }
    });
  }

  /** Usuario del pie del menú y avatar de la barra superior: operadora o concejala según el módulo. */
  function usuario() {
    var modulo = document.body.getAttribute("data-module");
    var p = TAD.persona(modulo === "admin" || modulo === "bi" ? "ad1" : "op1");
    if (!p) return;
    $all("[data-tad-usuario-nombre]").forEach(function (el) { el.textContent = p.nombre; });
    $all("[data-tad-usuario-cargo]").forEach(function (el) { el.textContent = p.cargo.split(" · ")[0]; });
    $all("[data-tad-usuario-iniciales]").forEach(function (el) { el.textContent = p.iniciales; el.setAttribute("title", p.nombre); });
  }

  /** Avisos de la campana: incidencias de hoy. */
  function avisos() {
    var hoy = TAD.incidencias.filter(function (i) { return i.fecha === TAD.fecha; });
    var b = base();
    $all("[data-tad-avisos-n]").forEach(function (el) { el.textContent = hoy.length; });
    $all("[data-tad-avisos-boton]").forEach(function (el) { el.setAttribute("aria-label", "Notificaciones: " + hoy.length + " de hoy"); });
    $all("[data-tad-avisos]").forEach(function (menu) {
      menu.innerHTML = hoy.map(function (i) {
        return '<a class="c-dropdown__item" href="' + b + 'control/incidencias.html#' + i.id + '"><span><strong>' + TAD.fmt.html(i.hora) + "</strong> · " + TAD.fmt.html(i.titulo) + "</span></a>";
      }).join("") + '<div class="c-dropdown__sep"></div><a class="c-dropdown__item" href="' + b + 'control/incidencias.html">Ver todas las incidencias</a>';
    });
  }

  function iniciar() {
    if (!window.TAD) return;
    var pagina = document.body.getAttribute("data-page");
    marcarActivo(pagina);
    migas(pagina);
    reloj();
    usuario();
    avisos();
    menuColapsable();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();

  window.TADNav = { base: base, marcarActivo: marcarActivo, migas: migas };
})();
