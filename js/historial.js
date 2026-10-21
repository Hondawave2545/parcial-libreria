(function() {
  "use strict";

  function obtenerVentas() {
    if (window.datosLibreria && Array.isArray(window.datosLibreria.ventas)) {
      return window.datosLibreria.ventas;
    }
    return [];
  }

  function formatearImporte(numero) {
    var valor = Number(numero);
    if (!isFinite(valor)) {
      return "0.00";
    }
    return valor.toFixed(2);
  }

  function formatearFecha(fechaIso) {
    var fecha = new Date(fechaIso);
    if (isNaN(fecha.getTime())) {
      return fechaIso === undefined || fechaIso === null ? "" : String(fechaIso);
    }
    return fecha.toLocaleString();
  }

  function crearCelda(texto) {
    var td = document.createElement("td");
    td.textContent = texto === undefined || texto === null ? "" : String(texto);
    return td;
  }

  function crearFilaVenta(venta) {
    var tr = document.createElement("tr");
    tr.appendChild(crearCelda(venta.id));
    tr.appendChild(crearCelda(formatearFecha(venta.fecha)));
    tr.appendChild(crearCelda(venta.nombreCompleto));
    tr.appendChild(crearCelda(formatearImporte(venta.total)));

    var tdAccion = document.createElement("td");
    var btnDetalle = document.createElement("button");
    btnDetalle.type = "button";
    btnDetalle.className = "btn btn--secundario";
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.setAttribute("data-venta-id", venta.id === undefined || venta.id === null ? "" : String(venta.id));
    tdAccion.appendChild(btnDetalle);
    tr.appendChild(tdAccion);

    return tr;
  }

  function renderizarHistorial() {
    var tabla = document.getElementById("listado-historial");
    var mensajeVacio = document.getElementById("mensaje-historial-vacio");
    if (!tabla) {
      return;
    }
    var tbody = tabla.tBodies && tabla.tBodies.length > 0 ? tabla.tBodies[0] : null;
    if (!tbody) {
      return;
    }
    tbody.replaceChildren();

    var ventas = obtenerVentas();
    for (var i = 0; i < ventas.length; i++) {
      tbody.appendChild(crearFilaVenta(ventas[i]));
    }

    if (mensajeVacio) {
      if (ventas.length === 0) {
        mensajeVacio.textContent = "No hay ventas registradas.";
        mensajeVacio.removeAttribute("hidden");
      } else {
        mensajeVacio.setAttribute("hidden", "hidden");
      }
    }
  }

  function buscarVentaPorId(idVenta) {
    var ventas = obtenerVentas();
    for (var i = 0; i < ventas.length; i++) {
      if (ventas[i] && String(ventas[i].id) === String(idVenta)) {
        return ventas[i];
      }
    }
    return null;
  }

  function obtenerContenedorDetalle() {
    var detalle = document.getElementById("detalle-venta");
    if (!detalle) {
      return null;
    }
    var contenedor = document.getElementById("detalle-venta-contenido");
    if (!contenedor) {
      contenedor = document.createElement("div");
      contenedor.id = "detalle-venta-contenido";
      detalle.appendChild(contenedor);
    }
    return contenedor;
  }

  function renderizarEstadoSinSeleccion() {
    var contenedor = obtenerContenedorDetalle();
    if (!contenedor) {
      return;
    }
    contenedor.replaceChildren();
    var mensaje = document.createElement("p");
    mensaje.className = "message message--info";
    mensaje.textContent = "Seleccione una venta para ver su detalle.";
    contenedor.appendChild(mensaje);
  }

  function crearFilaRenglonVenta(renglon) {
    var tr = document.createElement("tr");

    var tdLibro = document.createElement("td");
    tdLibro.appendChild(document.createTextNode(renglon.titulo === undefined || renglon.titulo === null ? "" : String(renglon.titulo)));
    tdLibro.appendChild(document.createElement("br"));
    tdLibro.appendChild(document.createTextNode("ISBN: " + (renglon.isbn === undefined || renglon.isbn === null ? "" : String(renglon.isbn))));
    tr.appendChild(tdLibro);

    tr.appendChild(crearCelda(renglon.cantidad));
    tr.appendChild(crearCelda(formatearImporte(renglon.precioUnitario)));
    tr.appendChild(crearCelda(formatearImporte(renglon.subtotal)));

    return tr;
  }

  function renderizarDetalleVenta(venta) {
    var contenedor = obtenerContenedorDetalle();
    if (!contenedor || !venta) {
      return;
    }
    contenedor.replaceChildren();

    var pId = document.createElement("p");
    pId.textContent = "Identificador: " + (venta.id === undefined || venta.id === null ? "" : String(venta.id));
    contenedor.appendChild(pId);

    var pFecha = document.createElement("p");
    pFecha.textContent = "Fecha: " + formatearFecha(venta.fecha);
    contenedor.appendChild(pFecha);

    var pCliente = document.createElement("p");
    pCliente.textContent = "Cliente: " + (venta.nombreCompleto === undefined || venta.nombreCompleto === null ? "" : String(venta.nombreCompleto));
    contenedor.appendChild(pCliente);

    var pTotal = document.createElement("p");
    pTotal.textContent = "Total: " + formatearImporte(venta.total);
    contenedor.appendChild(pTotal);

    var wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";

    var tabla = document.createElement("table");
    var thead = document.createElement("thead");
    var trHead = document.createElement("tr");
    var encabezados = ["Libro", "Cantidad", "Precio unitario", "Subtotal"];
    for (var h = 0; h < encabezados.length; h++) {
      var th = document.createElement("th");
      th.textContent = encabezados[h];
      trHead.appendChild(th);
    }
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    var tbody = document.createElement("tbody");
    var renglones = Array.isArray(venta.renglones) ? venta.renglones : [];
    for (var i = 0; i < renglones.length; i++) {
      tbody.appendChild(crearFilaRenglonVenta(renglones[i]));
    }
    tabla.appendChild(tbody);

    wrapper.appendChild(tabla);
    contenedor.appendChild(wrapper);
  }

  function manejarClickListado(ev) {
    var objetivo = ev ? ev.target : null;
    if (!objetivo || typeof objetivo.getAttribute !== "function") {
      return;
    }
    var idVenta = objetivo.getAttribute("data-venta-id");
    if (!idVenta) {
      return;
    }
    var venta = buscarVentaPorId(idVenta);
    if (!venta) {
      return;
    }
    renderizarDetalleVenta(venta);
  }

  function inicializarHistorial() {
    var tabla = document.getElementById("listado-historial");
    if (tabla) {
      tabla.addEventListener("click", manejarClickListado);
    }
    renderizarHistorial();
    renderizarEstadoSinSeleccion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarHistorial);
  } else {
    inicializarHistorial();
  }

  window.libreriaApp = window.libreriaApp || {};
  window.libreriaApp.historial = {
    refrescar: function() {
      renderizarHistorial();
    },
    restablecerDetalle: function() {
      renderizarEstadoSinSeleccion();
    }
  };
})();
