(function() {
  "use strict";

  var CLAVE = "libreria.datos.v1";
  var VERSION = 1;

  var almacenamientoDisponible = false;

  function esTexto(valor) {
    return typeof valor === "string";
  }

  function esNumero(valor) {
    return typeof valor === "number" && isFinite(valor);
  }

  function esRegistro(valor) {
    return valor !== null && typeof valor === "object" && !Array.isArray(valor);
  }

  function comprobarAlmacenamiento() {
    try {
      var almacen = window.localStorage;
      if (!almacen) {
        return false;
      }
      var clavePrueba = CLAVE + ".prueba";
      almacen.setItem(clavePrueba, "1");
      almacen.removeItem(clavePrueba);
      return true;
    } catch (error) {
      return false;
    }
  }

  function leerGuardado() {
    try {
      var almacen = window.localStorage;
      if (!almacen) {
        return null;
      }
      var texto = almacen.getItem(CLAVE);
      if (texto === null || texto === undefined) {
        return null;
      }
      return String(texto);
    } catch (error) {
      console.warn("Persistencia: no se pudo leer la clave \"" + CLAVE + "\" del almacenamiento local.", error);
      return null;
    }
  }

  function revisarColeccionBase(coleccion, nombre) {
    if (!Array.isArray(coleccion)) {
      return "la colección \"" + nombre + "\" no es una lista.";
    }
    for (var i = 0; i < coleccion.length; i++) {
      if (!esRegistro(coleccion[i]) || !esTexto(coleccion[i].id)) {
        return "un registro de la colección \"" + nombre + "\" no tiene un \"id\" de tipo texto.";
      }
    }
    return null;
  }

  function revisarLibro(libro) {
    if (!esTexto(libro.titulo) || !esTexto(libro.isbn) || !esTexto(libro.idEditorial)) {
      return "un libro no tiene \"titulo\", \"isbn\" e \"idEditorial\" de tipo texto.";
    }
    if (!esNumero(libro.precio)) {
      return "un libro no tiene \"precio\" de tipo número.";
    }
    if (!Array.isArray(libro.idsAutores)) {
      return "un libro no tiene \"idsAutores\" de tipo lista.";
    }
    if (libro.idGenero !== null && !esTexto(libro.idGenero)) {
      return "un libro no tiene \"idGenero\" de tipo texto ni nulo.";
    }
    return null;
  }

  function revisarCliente(cliente) {
    if (!esTexto(cliente.nombreCompleto) || !esTexto(cliente.email)) {
      return "un cliente no tiene \"nombreCompleto\" ni \"email\" de tipo texto.";
    }
    return null;
  }

  function revisarVenta(venta) {
    if (!esTexto(venta.fecha) || !esTexto(venta.idCliente) || !esTexto(venta.nombreCompleto)) {
      return "una venta no tiene \"fecha\", \"idCliente\" ni \"nombreCompleto\" de tipo texto.";
    }
    if (!esNumero(venta.total)) {
      return "una venta no tiene \"total\" de tipo número.";
    }
    if (!Array.isArray(venta.renglones)) {
      return "una venta no tiene \"renglones\" de tipo lista.";
    }
    for (var i = 0; i < venta.renglones.length; i++) {
      var renglon = venta.renglones[i];
      if (!esRegistro(renglon)) {
        return "un renglón de venta no es un objeto.";
      }
      if (!esTexto(renglon.titulo)) {
        return "un renglón de venta no tiene \"titulo\" de tipo texto.";
      }
      if (!esNumero(renglon.cantidad) || !esNumero(renglon.precioUnitario) || !esNumero(renglon.subtotal)) {
        return "un renglón de venta no tiene \"cantidad\", \"precioUnitario\" ni \"subtotal\" de tipo número.";
      }
    }
    return null;
  }

  function revisarFormaPayload(payload) {
    if (!esRegistro(payload)) {
      return "el contenido guardado no es un objeto JSON.";
    }
    if (payload.version !== VERSION) {
      return "el contenido guardado corresponde a otra versión (se esperaba la versión " + VERSION + ").";
    }
    var problemaBase = revisarColeccionBase(payload.libros, "libros");
    if (problemaBase !== null) {
      return problemaBase;
    }
    problemaBase = revisarColeccionBase(payload.clientes, "clientes");
    if (problemaBase !== null) {
      return problemaBase;
    }
    problemaBase = revisarColeccionBase(payload.ventas, "ventas");
    if (problemaBase !== null) {
      return problemaBase;
    }
    var problema = null;
    for (var i = 0; i < payload.libros.length; i++) {
      problema = revisarLibro(payload.libros[i]);
      if (problema !== null) {
        return problema;
      }
    }
    for (var j = 0; j < payload.clientes.length; j++) {
      problema = revisarCliente(payload.clientes[j]);
      if (problema !== null) {
        return problema;
      }
    }
    for (var k = 0; k < payload.ventas.length; k++) {
      problema = revisarVenta(payload.ventas[k]);
      if (problema !== null) {
        return problema;
      }
    }
    return null;
  }

  function analizarGuardado(textoGuardado) {
    if (textoGuardado === null || textoGuardado === undefined || String(textoGuardado).trim() === "") {
      return { payload: null, motivo: "no hay ningún contenido guardado en la clave \"" + CLAVE + "\"." };
    }
    var objeto = null;
    try {
      objeto = JSON.parse(textoGuardado);
    } catch (error) {
      return { payload: null, motivo: "el contenido guardado no es un JSON válido." };
    }
    var problema = revisarFormaPayload(objeto);
    if (problema !== null) {
      return { payload: null, motivo: problema };
    }
    return { payload: objeto, motivo: null };
  }

  function esPayloadValido(textoGuardado) {
    return analizarGuardado(textoGuardado).motivo === null;
  }

  function serializarEstado() {
    if (!window.datosLibreria) {
      return null;
    }
    var datos = window.datosLibreria;
    return {
      version: VERSION,
      libros: Array.isArray(datos.libros) ? datos.libros : [],
      clientes: Array.isArray(datos.clientes) ? datos.clientes : [],
      ventas: Array.isArray(datos.ventas) ? datos.ventas : []
    };
  }

  function guardar() {
    if (!almacenamientoDisponible) {
      console.warn("Persistencia: el almacenamiento local no está disponible; los datos de esta sesión no se conservarán al cerrar.");
      return false;
    }
    var payload = serializarEstado();
    if (payload === null) {
      console.warn("Persistencia: no hay datos de la librería para guardar; no se modificó el contenido guardado.");
      return false;
    }
    var texto = JSON.stringify(payload);
    if (!esPayloadValido(texto)) {
      console.warn("Persistencia: el estado de la sesión no cumple la forma esperada; no se guardó en la clave \"" + CLAVE + "\".");
      return false;
    }
    try {
      window.localStorage.setItem(CLAVE, texto);
      return true;
    } catch (error) {
      console.error("Persistencia: no se pudo guardar el catálogo en la clave \"" + CLAVE + "\".", error);
      return false;
    }
  }

  function congelarVentas(ventas) {
    for (var i = 0; i < ventas.length; i++) {
      var venta = ventas[i];
      if (!esRegistro(venta)) {
        continue;
      }
      if (Array.isArray(venta.renglones)) {
        for (var j = 0; j < venta.renglones.length; j++) {
          Object.freeze(venta.renglones[j]);
        }
        Object.freeze(venta.renglones);
      }
      Object.freeze(venta);
    }
  }

  function hidratar() {
    var texto = leerGuardado();
    var analisis = analizarGuardado(texto);
    if (analisis.payload === null) {
      if (texto !== null) {
        console.warn("Persistencia: se descarta el contenido guardado de la clave \"" + CLAVE + "\" porque " + analisis.motivo + " La aplicación vuelve a los datos de ejemplo.");
      }
      return false;
    }
    if (!window.datosLibreria) {
      console.warn("Persistencia: no se encontraron los datos de la librería; no se pudo rehidratar el contenido guardado.");
      return false;
    }
    var payload = analisis.payload;
    window.datosLibreria.libros = payload.libros;
    window.datosLibreria.clientes = payload.clientes;
    window.datosLibreria.ventas = payload.ventas;
    congelarVentas(payload.ventas);
    return true;
  }

  function inicializar() {
    almacenamientoDisponible = comprobarAlmacenamiento();
    if (!almacenamientoDisponible) {
      console.warn("Persistencia: el almacenamiento local no está disponible en este navegador o en esta ubicación de apertura; la aplicación funciona con los datos de la sesión, pero no los conserva al cerrar.");
      return false;
    }
    var hidratado = hidratar();
    if (!hidratado) {
      guardar();
    }
    return hidratado;
  }

  window.libreriaApp = window.libreriaApp || {};
  window.libreriaApp.persistencia = {
    guardar: guardar,
    cargar: leerGuardado,
    hidratar: hidratar,
    estaDisponible: function() {
      return almacenamientoDisponible;
    }
  };

  inicializar();
})();
