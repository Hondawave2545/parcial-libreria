(function() {
  "use strict";

  var borrador = [];

  function parsearCantidad(valor) {
    var str = String(valor === undefined || valor === null ? "" : valor).trim();
    if (!/^\d+$/.test(str)) {
      return null;
    }
    var numero = parseInt(str, 10);
    if (isNaN(numero) || numero <= 0) {
      return null;
    }
    return numero;
  }

  function formatearImporte(numero) {
    var valor = Number(numero);
    if (!isFinite(valor)) {
      return "0.00";
    }
    return valor.toFixed(2);
  }

  function calcularSubtotal(cantidad, precioUnitario) {
    var cant = Number(cantidad);
    var precio = Number(precioUnitario);
    if (!isFinite(cant) || !isFinite(precio)) {
      return 0;
    }
    return cant * precio;
  }

  function calcularTotal(renglones) {
    var lista = Array.isArray(renglones) ? renglones : [];
    var total = 0;
    for (var i = 0; i < lista.length; i++) {
      var renglon = lista[i];
      if (renglon && renglon.cantidadValida) {
        total += calcularSubtotal(renglon.cantidad, renglon.precioUnitario);
      }
    }
    return total;
  }

  function siguienteId(prefijo, coleccion) {
    var pref = prefijo;
    var col = Array.isArray(coleccion) ? coleccion : [];
    var max = 0;
    for (var i = 0; i < col.length; i++) {
      var id = col[i] && col[i].id ? String(col[i].id) : "";
      if (id.indexOf(pref + "-") === 0) {
        var suf = id.substring(pref.length + 1);
        var n = parseInt(suf, 10);
        if (!isNaN(n) && n > max) {
          max = n;
        }
      }
    }
    var sig = max + 1;
    if (sig < 1) {
      sig = 1;
    }
    return pref + "-" + String(sig).padStart(2, "0");
  }

  function crearCelda(texto) {
    var td = document.createElement("td");
    td.textContent = texto === undefined || texto === null ? "" : String(texto);
    return td;
  }

  function obtenerColeccion(nombre) {
    if (window.datosLibreria && Array.isArray(window.datosLibreria[nombre])) {
      return window.datosLibreria[nombre];
    }
    return [];
  }

  function leerClienteSeleccionado() {
    var sel = document.getElementById("select-cliente");
    if (!sel) {
      return null;
    }
    var id = sel.value;
    if (!id) {
      return null;
    }
    var clientes = obtenerColeccion("clientes");
    for (var i = 0; i < clientes.length; i++) {
      if (clientes[i] && clientes[i].id === id) {
        return clientes[i];
      }
    }
    return null;
  }

  function leerLibroSeleccionado() {
    var sel = document.getElementById("select-libro-venta");
    if (!sel) {
      return null;
    }
    var id = sel.value;
    if (!id) {
      return null;
    }
    var libros = obtenerColeccion("libros");
    for (var i = 0; i < libros.length; i++) {
      if (libros[i] && libros[i].id === id) {
        return libros[i];
      }
    }
    return null;
  }

  function leerCantidadIngresada() {
    var input = document.getElementById("input-cantidad-venta");
    return input ? input.value : "";
  }

  function mostrarErrores(mensajes) {
    var ul = document.getElementById("errores-venta");
    if (!ul) {
      return;
    }
    ul.replaceChildren();
    if (!mensajes || mensajes.length === 0) {
      ul.setAttribute("hidden", "hidden");
      return;
    }
    for (var i = 0; i < mensajes.length; i++) {
      var li = document.createElement("li");
      li.textContent = mensajes[i];
      ul.appendChild(li);
    }
    ul.removeAttribute("hidden");
  }

  function concatenarMensajes(listas) {
    var mensajes = [];
    for (var i = 0; i < listas.length; i++) {
      var lista = listas[i];
      if (!lista) {
        continue;
      }
      for (var j = 0; j < lista.length; j++) {
        mensajes.push(lista[j]);
      }
    }
    return mensajes;
  }

  function mensajeCantidadInvalida(titulo) {
    return "Error: la cantidad del renglón «" + titulo + "» debe ser un número entero mayor que cero.";
  }

  function mensajesRenglonesInvalidos() {
    var mensajes = [];
    for (var i = 0; i < borrador.length; i++) {
      if (!borrador[i].cantidadValida) {
        mensajes.push(borrador[i].errorCantidad);
      }
    }
    return mensajes;
  }

  function buscarRenglonPorLibro(idLibro) {
    for (var i = 0; i < borrador.length; i++) {
      if (borrador[i].idLibro === idLibro) {
        return borrador[i];
      }
    }
    return null;
  }

  function actualizarTotal() {
    var el = document.getElementById("total-venta");
    if (!el) {
      return;
    }
    el.textContent = "Total: " + formatearImporte(calcularTotal(borrador));
  }

  function marcarFilaInvalida(renglon, input, mensajeFila) {
    if (input) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("title", renglon.errorCantidad);
    }
    if (mensajeFila) {
      mensajeFila.textContent = renglon.errorCantidad;
      mensajeFila.removeAttribute("hidden");
    }
  }

  function limpiarFilaInvalida(input, mensajeFila) {
    if (input) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("title");
    }
    if (mensajeFila) {
      mensajeFila.setAttribute("hidden", "hidden");
    }
  }

  function crearFilaRenglon(renglon) {
    var tr = document.createElement("tr");

    tr.appendChild(crearCelda(renglon.titulo));

    var tdCantidad = document.createElement("td");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.setAttribute("inputmode", "numeric");
    input.value = renglon.cantidadTexto;
    tdCantidad.appendChild(input);

    var mensajeFila = document.createElement("p");
    mensajeFila.className = "message message--error";
    mensajeFila.setAttribute("hidden", "hidden");
    tdCantidad.appendChild(mensajeFila);
    tr.appendChild(tdCantidad);

    tr.appendChild(crearCelda(formatearImporte(renglon.precioUnitario)));

    var tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = renglon.cantidadValida
      ? formatearImporte(calcularSubtotal(renglon.cantidad, renglon.precioUnitario))
      : "—";
    tr.appendChild(tdSubtotal);

    var tdQuitar = document.createElement("td");
    var btnQuitar = document.createElement("button");
    btnQuitar.type = "button";
    btnQuitar.className = "btn btn--peligro";
    btnQuitar.textContent = "Quitar";
    tdQuitar.appendChild(btnQuitar);
    tr.appendChild(tdQuitar);

    input.addEventListener("change", function() {
      aplicarCambioCantidad(renglon, input, mensajeFila, tdSubtotal);
    });
    btnQuitar.addEventListener("click", function() {
      quitarRenglon(renglon);
    });

    if (!renglon.cantidadValida) {
      marcarFilaInvalida(renglon, input, mensajeFila);
    }

    return tr;
  }

  function renderizarRenglones() {
    var tabla = document.getElementById("renglones-venta");
    if (!tabla) {
      return;
    }
    var tbody = tabla.tBodies && tabla.tBodies.length > 0 ? tabla.tBodies[0] : null;
    if (!tbody) {
      return;
    }
    tbody.replaceChildren();
    for (var i = 0; i < borrador.length; i++) {
      tbody.appendChild(crearFilaRenglon(borrador[i]));
    }
    actualizarTotal();
  }

  function aplicarCambioCantidad(renglon, input, mensajeFila, tdSubtotal) {
    var valor = input ? input.value : "";
    var cantidad = parsearCantidad(valor);
    renglon.cantidadTexto = valor === undefined || valor === null ? "" : String(valor);
    if (cantidad === null) {
      renglon.cantidad = null;
      renglon.cantidadValida = false;
      renglon.errorCantidad = mensajeCantidadInvalida(renglon.titulo);
      marcarFilaInvalida(renglon, input, mensajeFila);
      tdSubtotal.textContent = "—";
    } else {
      renglon.cantidad = cantidad;
      renglon.cantidadValida = true;
      renglon.errorCantidad = "";
      limpiarFilaInvalida(input, mensajeFila);
      tdSubtotal.textContent = formatearImporte(calcularSubtotal(renglon.cantidad, renglon.precioUnitario));
    }
    actualizarTotal();
    mostrarErrores(mensajesRenglonesInvalidos());
  }

  function quitarRenglon(renglon) {
    for (var i = 0; i < borrador.length; i++) {
      if (borrador[i] === renglon) {
        borrador.splice(i, 1);
        break;
      }
    }
    renderizarRenglones();
    mostrarErrores(mensajesRenglonesInvalidos());
  }

  function agregarRenglon() {
    var libro = leerLibroSeleccionado();
    var cantidad = parsearCantidad(leerCantidadIngresada());
    var errores = [];

    if (!libro) {
      errores.push("Error: debe seleccionar un libro para agregar el renglón.");
    }
    if (cantidad === null) {
      errores.push("Error: la cantidad debe ser un número entero mayor que cero.");
    }
    if (errores.length > 0) {
      mostrarErrores(concatenarMensajes([errores, mensajesRenglonesInvalidos()]));
      return;
    }

    if (buscarRenglonPorLibro(libro.id)) {
      mostrarErrores(concatenarMensajes([[
        "Error: el libro ya está en la venta. Edite la cantidad del renglón existente o quítelo para volver a agregarlo."
      ], mensajesRenglonesInvalidos()]));
      return;
    }

    borrador.push({
      idLibro: libro.id,
      titulo: libro.titulo === undefined || libro.titulo === null ? "" : String(libro.titulo),
      isbn: libro.isbn === undefined || libro.isbn === null ? "" : String(libro.isbn),
      precioUnitario: Number(libro.precio),
      cantidad: cantidad,
      cantidadTexto: String(cantidad),
      cantidadValida: true,
      errorCantidad: ""
    });

    renderizarRenglones();
    mostrarErrores(mensajesRenglonesInvalidos());
  }

  function construirVenta(cliente) {
    var renglones = [];
    var total = 0;
    for (var i = 0; i < borrador.length; i++) {
      var renglon = borrador[i];
      var subtotal = calcularSubtotal(renglon.cantidad, renglon.precioUnitario);
      total += subtotal;
      renglones.push({
        idLibro: renglon.idLibro,
        titulo: renglon.titulo,
        isbn: renglon.isbn,
        cantidad: renglon.cantidad,
        precioUnitario: renglon.precioUnitario,
        subtotal: subtotal
      });
    }
    return {
      id: siguienteId("ven", obtenerColeccion("ventas")),
      fecha: new Date().toISOString(),
      idCliente: cliente.id,
      nombreCompleto: cliente.nombreCompleto === undefined || cliente.nombreCompleto === null ? "" : String(cliente.nombreCompleto),
      renglones: renglones,
      total: total
    };
  }

  function registrarVenta(venta) {
    for (var i = 0; i < venta.renglones.length; i++) {
      Object.freeze(venta.renglones[i]);
    }
    Object.freeze(venta.renglones);
    Object.freeze(venta);
    if (window.datosLibreria && Array.isArray(window.datosLibreria.ventas)) {
      window.datosLibreria.ventas.push(venta);
    } else if (window.datosLibreria) {
      window.datosLibreria.ventas = [venta];
    }
    if (window.libreriaApp && window.libreriaApp.persistencia && typeof window.libreriaApp.persistencia.guardar === "function") {
      window.libreriaApp.persistencia.guardar();
    }
  }

  function limpiarFormularioVenta() {
    var selCliente = document.getElementById("select-cliente");
    var selLibro = document.getElementById("select-libro-venta");
    var inputCantidad = document.getElementById("input-cantidad-venta");
    if (selCliente) {
      selCliente.selectedIndex = 0;
    }
    if (selLibro) {
      selLibro.selectedIndex = 0;
    }
    if (inputCantidad) {
      inputCantidad.value = "";
    }
    borrador.length = 0;
    renderizarRenglones();
    mostrarErrores([]);
  }

  function confirmarVenta() {
    var errores = [];
    var cliente = leerClienteSeleccionado();

    if (!cliente) {
      errores.push("Error: debe seleccionar un cliente para confirmar la venta.");
    }
    if (borrador.length === 0) {
      errores.push("Error: la venta debe tener al menos un renglón.");
    }
    errores = concatenarMensajes([errores, mensajesRenglonesInvalidos()]);

    if (errores.length > 0) {
      mostrarErrores(errores);
      return;
    }

    var venta = construirVenta(cliente);
    registrarVenta(venta);

    var mensaje = document.getElementById("mensaje-resultado-venta");
    if (mensaje) {
      mensaje.textContent = "Venta " + venta.id + " registrada correctamente. Total: " + formatearImporte(venta.total) + ".";
      mensaje.removeAttribute("hidden");
    }

    limpiarFormularioVenta();

    if (window.libreriaApp && window.libreriaApp.historial && typeof window.libreriaApp.historial.restablecerDetalle === "function") {
      window.libreriaApp.historial.restablecerDetalle();
    }
    if (window.libreriaApp && window.libreriaApp.historial && typeof window.libreriaApp.historial.refrescar === "function") {
      window.libreriaApp.historial.refrescar();
    }
  }

  function inicializarVentas() {
    var btnAgregar = document.getElementById("btn-agregar-renglon");
    if (btnAgregar) {
      btnAgregar.addEventListener("click", function() {
        agregarRenglon();
      });
    }
    var btnConfirmar = document.getElementById("btn-confirmar-venta");
    if (btnConfirmar) {
      btnConfirmar.addEventListener("click", function() {
        confirmarVenta();
      });
    }
    renderizarRenglones();
    mostrarErrores([]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarVentas);
  } else {
    inicializarVentas();
  }

  window.libreriaApp = window.libreriaApp || {};
  window.libreriaApp.ventas = {
    refrescar: function() {
      renderizarRenglones();
    }
  };
})();
