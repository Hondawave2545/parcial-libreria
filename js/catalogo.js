(function() {
  "use strict";

  function obtenerEditorial(idEditorial) {
    if (!window.datosLibreria || !Array.isArray(window.datosLibreria.editoriales)) {
      return "—";
    }
    for (var i = 0; i < window.datosLibreria.editoriales.length; i++) {
      if (window.datosLibreria.editoriales[i].id === idEditorial) {
        return window.datosLibreria.editoriales[i].nombre || "—";
      }
    }
    return "—";
  }

  function obtenerGenero(idGenero) {
    if (idGenero === null || idGenero === undefined || idGenero === "") {
      return "Sin clasificar";
    }
    if (!window.datosLibreria || !Array.isArray(window.datosLibreria.generos)) {
      return "—";
    }
    for (var i = 0; i < window.datosLibreria.generos.length; i++) {
      if (window.datosLibreria.generos[i].id === idGenero) {
        return window.datosLibreria.generos[i].nombre || "—";
      }
    }
    return "—";
  }

  function obtenerAutores(idsAutores) {
    if (!Array.isArray(idsAutores) || idsAutores.length === 0) {
      return "—";
    }
    if (!window.datosLibreria || !Array.isArray(window.datosLibreria.autores)) {
      return "—";
    }
    var nombres = [];
    for (var i = 0; i < idsAutores.length; i++) {
      var idAutor = idsAutores[i];
      var encontrado = null;
      for (var j = 0; j < window.datosLibreria.autores.length; j++) {
        if (window.datosLibreria.autores[j].id === idAutor) {
          encontrado = window.datosLibreria.autores[j];
          break;
        }
      }
      if (encontrado && encontrado.nombre) {
        nombres.push(encontrado.nombre);
      } else {
        nombres.push("—");
      }
    }
    return nombres.join(", ");
  }

  function crearCelda(texto) {
    var td = document.createElement("td");
    if (texto === undefined || texto === null) {
      td.textContent = "";
    } else {
      td.textContent = String(texto);
    }
    return td;
  }

  function crearFilaLibro(libro) {
    var tr = document.createElement("tr");
    tr.appendChild(crearCelda(libro.titulo));
    tr.appendChild(crearCelda(libro.isbn));
    tr.appendChild(crearCelda(obtenerEditorial(libro.idEditorial)));
    tr.appendChild(crearCelda(obtenerGenero(libro.idGenero)));
    tr.appendChild(crearCelda(obtenerAutores(libro.idsAutores)));
    var precioTexto = "";
    if (libro.precio !== undefined && libro.precio !== null) {
      precioTexto = Number(libro.precio).toFixed(2);
    }
    tr.appendChild(crearCelda(precioTexto));
    return tr;
  }

  function filtrarLibrosPorTitulo(texto) {
    var libros = [];
    if (window.datosLibreria && Array.isArray(window.datosLibreria.libros)) {
      libros = window.datosLibreria.libros;
    }
    var busqueda = String(texto === undefined || texto === null ? "" : texto).trim().toLowerCase();
    if (busqueda === "") {
      return libros.slice();
    }
    var resultado = [];
    for (var i = 0; i < libros.length; i++) {
      var titulo = libros[i].titulo ? String(libros[i].titulo).toLowerCase() : "";
      if (titulo.indexOf(busqueda) !== -1) {
        resultado.push(libros[i]);
      }
    }
    return resultado;
  }

  function actualizarMensajes(librosFiltrados, busquedaNormalizadaVacia) {
    var mensajeVacio = document.getElementById("mensaje-catalogo-vacio");
    var mensajeSinResultados = document.getElementById("mensaje-sin-resultados");
    var hayLibrosTotales = false;
    if (window.datosLibreria && Array.isArray(window.datosLibreria.libros)) {
      hayLibrosTotales = window.datosLibreria.libros.length > 0;
    }
    if (mensajeVacio) {
      if (!hayLibrosTotales) {
        mensajeVacio.textContent = "El catálogo no tiene libros cargados.";
        mensajeVacio.removeAttribute("hidden");
      } else {
        mensajeVacio.setAttribute("hidden", "hidden");
      }
    }
    if (mensajeSinResultados) {
      if (hayLibrosTotales && !busquedaNormalizadaVacia && librosFiltrados.length === 0) {
        mensajeSinResultados.textContent = "No se encontraron libros que coincidan con la búsqueda.";
        mensajeSinResultados.removeAttribute("hidden");
      } else {
        mensajeSinResultados.setAttribute("hidden", "hidden");
      }
    }
  }

  function renderizarCatalogo(libros) {
    var tbody = document.getElementById("listado-libros");
    if (!tbody) {
      return;
    }
    tbody.replaceChildren();
    if (!Array.isArray(libros)) {
      libros = [];
    }
    for (var i = 0; i < libros.length; i++) {
      tbody.appendChild(crearFilaLibro(libros[i]));
    }
    var inputBusqueda = document.getElementById("busqueda-titulo");
    var busquedaTexto = inputBusqueda ? inputBusqueda.value : "";
    var busquedaNormalizadaVacia = String(busquedaTexto).trim() === "";
    actualizarMensajes(libros, busquedaNormalizadaVacia);
  }

  function manejarBusqueda() {
    var inputBusqueda = document.getElementById("busqueda-titulo");
    var texto = inputBusqueda ? inputBusqueda.value : "";
    var filtrados = filtrarLibrosPorTitulo(texto);
    renderizarCatalogo(filtrados);
  }

  function inicializarCatalogo() {
    var inputBusqueda = document.getElementById("busqueda-titulo");
    if (inputBusqueda) {
      inputBusqueda.addEventListener("input", manejarBusqueda);
    }
    var todos = [];
    if (window.datosLibreria && Array.isArray(window.datosLibreria.libros)) {
      todos = window.datosLibreria.libros.slice();
    }
    renderizarCatalogo(todos);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarCatalogo);
  } else {
    inicializarCatalogo();
  }
})();
