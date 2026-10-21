(function() {
  "use strict";

  function normalizarIsbn(valor) {
    var str = String(valor === undefined || valor === null ? "" : valor);
    return str.trim().replace(/[\s-]/g, "").toLowerCase();
  }

  function normalizarEmail(valor) {
    var str = String(valor === undefined || valor === null ? "" : valor);
    return str.trim().toLowerCase();
  }

  function esEmailValido(valor) {
    var str = String(valor === undefined || valor === null ? "" : valor).trim();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
  }

  function parsearPrecio(valor) {
    var str = String(valor === undefined || valor === null ? "" : valor).trim().replace(",", ".");
    var num = Number(str);
    if (!isFinite(num)) {
      return NaN;
    }
    return num;
  }

  function siguienteId(prefijo, coleccion) {
    var pref = prefijo;
    var col = Array.isArray(coleccion) ? coleccion : [];
    var max = -1;
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
    if (sig < 0) {
      sig = 0;
    }
    return pref + "-" + String(sig).padStart(2, "0");
  }

  function validarLibro(datos) {
    var errores = [];
    var titulo = datos && datos.titulo !== undefined && datos.titulo !== null ? datos.titulo : "";
    var isbn = datos && datos.isbn !== undefined && datos.isbn !== null ? datos.isbn : "";
    var tituloTrim = String(titulo).trim();
    var isbnTrim = String(isbn).trim();
    if (tituloTrim === "") {
      errores.push("Error: el título del libro es obligatorio.");
    }
    if (isbnTrim === "") {
      errores.push("Error: el ISBN es obligatorio.");
    }

    var precioNum = parsearPrecio(datos && datos.precio !== undefined && datos.precio !== null ? datos.precio : "");
    if (!isFinite(precioNum) || precioNum <= 0) {
      errores.push("Error: el precio debe ser numérico y mayor que cero.");
    }

    var idEditorial = datos && datos.idEditorial !== undefined && datos.idEditorial !== null ? datos.idEditorial : "";
    var tieneEditorial = false;
    if (idEditorial !== "") {
      if (window.datosLibreria && Array.isArray(window.datosLibreria.editoriales)) {
        for (var e = 0; e < window.datosLibreria.editoriales.length; e++) {
          if (window.datosLibreria.editoriales[e].id === idEditorial) {
            tieneEditorial = true;
            break;
          }
        }
      }
    }
    if (!tieneEditorial) {
      errores.push("Error: debe seleccionarse una editorial válida.");
    }

    var idsAutores = [];
    if (datos && Array.isArray(datos.idsAutores)) {
      idsAutores = datos.idsAutores;
    }
    if (idsAutores.length === 0) {
      errores.push("Error: debe seleccionarse al menos un autor.");
    } else {
      if (window.datosLibreria && Array.isArray(window.datosLibreria.autores)) {
        for (var a = 0; a < idsAutores.length; a++) {
          var existeA = false;
          var aid = idsAutores[a];
          for (var aa = 0; aa < window.datosLibreria.autores.length; aa++) {
            if (window.datosLibreria.autores[aa].id === aid) {
              existeA = true;
              break;
            }
          }
          if (!existeA) {
            errores.push("Error: uno o más autores seleccionados no son válidos.");
            break;
          }
        }
      } else {
        errores.push("Error: uno o más autores seleccionados no son válidos.");
      }
    }

    var idGenero = datos && datos.idGenero !== undefined && datos.idGenero !== null ? datos.idGenero : "";
    if (idGenero !== "") {
      var tieneGenero = false;
      if (window.datosLibreria && Array.isArray(window.datosLibreria.generos)) {
        for (var g = 0; g < window.datosLibreria.generos.length; g++) {
          if (window.datosLibreria.generos[g].id === idGenero) {
            tieneGenero = true;
            break;
          }
        }
      }
      if (!tieneGenero) {
        errores.push("Error: el género seleccionado no es válido.");
      }
    }

    if (isbnTrim !== "") {
      var isbnNorm = normalizarIsbn(isbnTrim);
      if (window.datosLibreria && Array.isArray(window.datosLibreria.libros)) {
        for (var l = 0; l < window.datosLibreria.libros.length; l++) {
          var lib = window.datosLibreria.libros[l];
          var libIsbnNorm = lib && lib.isbn !== undefined && lib.isbn !== null ? normalizarIsbn(lib.isbn) : "";
          if (libIsbnNorm !== "" && libIsbnNorm === isbnNorm) {
            errores.push("Error: el ISBN ya existe en el sistema.");
            break;
          }
        }
      }
    }

    return errores;
  }

  function validarCliente(datos) {
    var errores = [];
    var nombre = datos && datos.nombreCompleto !== undefined && datos.nombreCompleto !== null ? datos.nombreCompleto : "";
    var email = datos && datos.email !== undefined && datos.email !== null ? datos.email : "";
    var nombreTrim = String(nombre).trim();
    var emailTrim = String(email).trim();
    if (nombreTrim === "") {
      errores.push("Error: el nombre completo es obligatorio.");
    }
    if (emailTrim === "") {
      errores.push("Error: el email es obligatorio.");
    } else {
      if (!esEmailValido(emailTrim)) {
        errores.push("Error: el email no tiene un formato válido.");
      } else {
        var emailNorm = normalizarEmail(emailTrim);
        if (window.datosLibreria && Array.isArray(window.datosLibreria.clientes)) {
          for (var c = 0; c < window.datosLibreria.clientes.length; c++) {
            var cli = window.datosLibreria.clientes[c];
            var cliEmailNorm = cli && cli.email !== undefined && cli.email !== null ? normalizarEmail(cli.email) : "";
            if (cliEmailNorm !== "" && cliEmailNorm === emailNorm) {
              errores.push("Error: el email ya existe en el sistema.");
              break;
            }
          }
        }
      }
    }
    return errores;
  }

  function poblarSelectorEditorial() {
    var sel = document.getElementById("libro-editorial");
    if (!sel) {
      return;
    }
    sel.replaceChildren();
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.editoriales) ? window.datosLibreria.editoriales : [];
    for (var i = 0; i < col.length; i++) {
      var opt = document.createElement("option");
      opt.value = col[i].id || "";
      opt.textContent = col[i].nombre || "";
      sel.appendChild(opt);
    }
  }

  function poblarSelectorGenero() {
    var sel = document.getElementById("libro-genero");
    if (!sel) {
      return;
    }
    sel.replaceChildren();
    var opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = "Sin clasificar";
    sel.appendChild(opt0);
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.generos) ? window.datosLibreria.generos : [];
    for (var i = 0; i < col.length; i++) {
      var opt = document.createElement("option");
      opt.value = col[i].id || "";
      opt.textContent = col[i].nombre || "";
      sel.appendChild(opt);
    }
  }

  function poblarSelectorAutores() {
    var sel = document.getElementById("libro-autores");
    if (!sel) {
      return;
    }
    sel.replaceChildren();
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.autores) ? window.datosLibreria.autores : [];
    for (var i = 0; i < col.length; i++) {
      var opt = document.createElement("option");
      opt.value = col[i].id || "";
      opt.textContent = col[i].nombre || "";
      sel.appendChild(opt);
    }
  }

  function poblarSelectorClientesVenta() {
    var sel = document.getElementById("select-cliente");
    if (!sel) {
      return;
    }
    sel.replaceChildren();
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Seleccione…";
    placeholder.disabled = true;
    sel.appendChild(placeholder);
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.clientes) ? window.datosLibreria.clientes : [];
    for (var i = 0; i < col.length; i++) {
      var opt = document.createElement("option");
      opt.value = col[i].id || "";
      opt.textContent = col[i].nombreCompleto || "";
      sel.appendChild(opt);
    }
  }

  function poblarSelectorLibrosVenta() {
    var sel = document.getElementById("select-libro-venta");
    if (!sel) {
      return;
    }
    sel.replaceChildren();
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Seleccione…";
    placeholder.disabled = true;
    sel.appendChild(placeholder);
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.libros) ? window.datosLibreria.libros : [];
    for (var i = 0; i < col.length; i++) {
      var opt = document.createElement("option");
      opt.value = col[i].id || "";
      opt.textContent = col[i].titulo || "";
      sel.appendChild(opt);
    }
  }

  function crearCeldaTexto(texto) {
    var td = document.createElement("td");
    td.textContent = texto === undefined || texto === null ? "" : String(texto);
    return td;
  }

  function renderizarListadoLibros() {
    var tbody = document.getElementById("listado-libros-registrados");
    var msgVacio = document.getElementById("mensaje-libros-vacios");
    if (!tbody) {
      return;
    }
    tbody.replaceChildren();
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.libros) ? window.datosLibreria.libros : [];
    for (var i = 0; i < col.length; i++) {
      var tr = document.createElement("tr");
      tr.appendChild(crearCeldaTexto(col[i].titulo));
      tr.appendChild(crearCeldaTexto(col[i].isbn));
      var editorial = col[i].idEditorial;
      var edNom = "—";
      if (window.datosLibreria && Array.isArray(window.datosLibreria.editoriales)) {
        for (var e = 0; e < window.datosLibreria.editoriales.length; e++) {
          if (window.datosLibreria.editoriales[e].id === editorial) {
            edNom = window.datosLibreria.editoriales[e].nombre || "—";
            break;
          }
        }
      }
      tr.appendChild(crearCeldaTexto(edNom));
      var generoId = col[i].idGenero;
      var genNom = "Sin clasificar";
      if (generoId !== null && generoId !== undefined && generoId !== "") {
        if (window.datosLibreria && Array.isArray(window.datosLibreria.generos)) {
          for (var g = 0; g < window.datosLibreria.generos.length; g++) {
            if (window.datosLibreria.generos[g].id === generoId) {
              genNom = window.datosLibreria.generos[g].nombre || "—";
              break;
            }
          }
        } else {
          genNom = "—";
        }
      }
      tr.appendChild(crearCeldaTexto(genNom));
      var autores = col[i].idsAutores;
      var autNoms = [];
      if (Array.isArray(autores) && autores.length > 0 && window.datosLibreria && Array.isArray(window.datosLibreria.autores)) {
        for (var a = 0; a < autores.length; a++) {
          var aid = autores[a];
          for (var aa = 0; aa < window.datosLibreria.autores.length; aa++) {
            if (window.datosLibreria.autores[aa].id === aid) {
              autNoms.push(window.datosLibreria.autores[aa].nombre || "—");
              break;
            }
          }
        }
      }
      tr.appendChild(crearCeldaTexto(autNoms.length === 0 ? "—" : autNoms.join(", ")));
      var precioTxt = "";
      if (col[i].precio !== undefined && col[i].precio !== null) {
        var pval = Number(col[i].precio);
        precioTxt = isFinite(pval) ? pval.toFixed(2) : String(col[i].precio);
      }
      tr.appendChild(crearCeldaTexto(precioTxt));
      tbody.appendChild(tr);
    }
    if (msgVacio) {
      if (col.length === 0) {
        msgVacio.textContent = "No hay libros registrados.";
        msgVacio.removeAttribute("hidden");
      } else {
        msgVacio.setAttribute("hidden", "hidden");
      }
    }
  }

  function renderizarListadoClientes() {
    var tbody = document.getElementById("listado-clientes");
    var msgVacio = document.getElementById("mensaje-clientes-vacios");
    if (!tbody) {
      return;
    }
    tbody.replaceChildren();
    var col = window.datosLibreria && Array.isArray(window.datosLibreria.clientes) ? window.datosLibreria.clientes : [];
    for (var i = 0; i < col.length; i++) {
      var tr = document.createElement("tr");
      tr.appendChild(crearCeldaTexto(col[i].nombreCompleto));
      tr.appendChild(crearCeldaTexto(col[i].email));
      tbody.appendChild(tr);
    }
    if (msgVacio) {
      if (col.length === 0) {
        msgVacio.textContent = "No hay clientes registrados.";
        msgVacio.removeAttribute("hidden");
      } else {
        msgVacio.setAttribute("hidden", "hidden");
      }
    }
  }

  function refrescarVistasLibro() {
    renderizarListadoLibros();
    if (window.libreriaApp && window.libreriaApp.catalogo && typeof window.libreriaApp.catalogo.refrescar === "function") {
      window.libreriaApp.catalogo.refrescar();
    }
    poblarSelectorLibrosVenta();
  }

  function refrescarVistasCliente() {
    renderizarListadoClientes();
    poblarSelectorClientesVenta();
  }

  function limpiarSelectMultiple(sel) {
    if (!sel) return;
    for (var i = 0; i < sel.options.length; i++) {
      sel.options[i].selected = false;
    }
  }

  function inicializarFormularios() {
    poblarSelectorEditorial();
    poblarSelectorGenero();
    poblarSelectorAutores();
    poblarSelectorClientesVenta();
    poblarSelectorLibrosVenta();
    renderizarListadoLibros();
    renderizarListadoClientes();

    var formLibro = document.getElementById("form-alta-libro");
    if (formLibro) {
      formLibro.addEventListener("submit", function(ev) {
        ev.preventDefault();
        var erroresUl = document.getElementById("errores-libro");
        var msgRes = document.getElementById("mensaje-resultado-libro");
        if (erroresUl) {
          erroresUl.textContent = "";
          erroresUl.setAttribute("hidden", "hidden");
        }
        if (msgRes) {
          msgRes.setAttribute("hidden", "hidden");
        }
        var titulo = document.getElementById("libro-titulo");
        var isbn = document.getElementById("libro-isbn");
        var precio = document.getElementById("libro-precio");
        var editorial = document.getElementById("libro-editorial");
        var genero = document.getElementById("libro-genero");
        var autores = document.getElementById("libro-autores");
        var datos = {
          titulo: titulo ? titulo.value : "",
          isbn: isbn ? isbn.value : "",
          precio: precio ? precio.value : "",
          idEditorial: editorial ? editorial.value : "",
          idGenero: genero && genero.value === "" ? null : (genero ? genero.value : null),
          idsAutores: []
        };
        if (autores) {
          for (var i = 0; i < autores.selectedOptions.length; i++) {
            datos.idsAutores.push(autores.selectedOptions[i].value);
          }
        }
        var errs = validarLibro(datos);
        if (errs.length > 0) {
          if (erroresUl) {
            erroresUl.replaceChildren();
            for (var j = 0; j < errs.length; j++) {
              var li = document.createElement("li");
              li.textContent = errs[j];
              erroresUl.appendChild(li);
            }
            erroresUl.removeAttribute("hidden");
          }
          return;
        }
        var nuevoLibro = {
          id: siguienteId("lib", window.datosLibreria && window.datosLibreria.libros),
          titulo: String(datos.titulo).trim(),
          isbn: String(datos.isbn).trim(),
          precio: parsearPrecio(datos.precio),
          idEditorial: datos.idEditorial,
          idGenero: datos.idGenero === "" ? null : datos.idGenero,
          idsAutores: datos.idsAutores.slice()
        };
        if (window.datosLibreria && Array.isArray(window.datosLibreria.libros)) {
          window.datosLibreria.libros.push(nuevoLibro);
        } else if (window.datosLibreria) {
          window.datosLibreria.libros = [nuevoLibro];
        }
        if (msgRes) {
          msgRes.textContent = "Libro registrado correctamente.";
          msgRes.removeAttribute("hidden");
        }
        if (titulo) titulo.value = "";
        if (isbn) isbn.value = "";
        if (precio) precio.value = "";
        if (editorial) editorial.selectedIndex = 0;
        if (genero) genero.selectedIndex = 0;
        limpiarSelectMultiple(autores);
        refrescarVistasLibro();
      });
    }

    var formCliente = document.getElementById("form-alta-cliente");
    if (formCliente) {
      formCliente.addEventListener("submit", function(ev) {
        ev.preventDefault();
        var erroresUl = document.getElementById("errores-cliente");
        var msgRes = document.getElementById("mensaje-resultado-cliente");
        if (erroresUl) {
          erroresUl.textContent = "";
          erroresUl.setAttribute("hidden", "hidden");
        }
        if (msgRes) {
          msgRes.setAttribute("hidden", "hidden");
        }
        var nombre = document.getElementById("cliente-nombre");
        var email = document.getElementById("cliente-email");
        var datos = {
          nombreCompleto: nombre ? nombre.value : "",
          email: email ? email.value : ""
        };
        var errs = validarCliente(datos);
        if (errs.length > 0) {
          if (erroresUl) {
            erroresUl.replaceChildren();
            for (var j = 0; j < errs.length; j++) {
              var li = document.createElement("li");
              li.textContent = errs[j];
              erroresUl.appendChild(li);
            }
            erroresUl.removeAttribute("hidden");
          }
          return;
        }
        var nuevoCliente = {
          id: siguienteId("cli", window.datosLibreria && window.datosLibreria.clientes),
          nombreCompleto: String(datos.nombreCompleto).trim(),
          email: String(datos.email).trim()
        };
        if (window.datosLibreria && Array.isArray(window.datosLibreria.clientes)) {
          window.datosLibreria.clientes.push(nuevoCliente);
        } else if (window.datosLibreria) {
          window.datosLibreria.clientes = [nuevoCliente];
        }
        if (msgRes) {
          msgRes.textContent = "Cliente registrado correctamente.";
          msgRes.removeAttribute("hidden");
        }
        if (nombre) nombre.value = "";
        if (email) email.value = "";
        refrescarVistasCliente();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarFormularios);
  } else {
    inicializarFormularios();
  }
})();