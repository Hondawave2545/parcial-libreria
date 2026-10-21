(function() {
  "use strict";

  var editoriales = [
    { id: "ed-01", nombre: "Editorial Andina" },
    { id: "ed-02", nombre: "Ediciones del Sur" }
  ];

  var generos = [
    { id: "gen-01", nombre: "Novela" },
    { id: "gen-02", nombre: "Ensayo" }
  ];

  var autores = [
    { id: "aut-01", nombre: "Ana Pérez" },
    { id: "aut-02", nombre: "Luis Gómez" },
    { id: "aut-03", nombre: "María Fernández" }
  ];

  var clientes = [
    { id: "cli-01", nombreCompleto: "Lucía Ramírez", email: "lucia.ramirez@example.com" },
    { id: "cli-02", nombreCompleto: "Diego Torres", email: "diego.torres@example.com" },
    { id: "cli-03", nombreCompleto: "Sofía Herrera", email: "sofia.herrera@example.com" }
  ];

  var libros = [
    { id: "lib-01", titulo: "Cumbres borrascosas", isbn: "978-0000000001", precio: 1500, idEditorial: "ed-01", idGenero: "gen-01", idsAutores: ["aut-01"] },
    { id: "lib-02", titulo: "El ensayo moderno", isbn: "978-0000000002", precio: 2000, idEditorial: "ed-02", idGenero: "gen-02", idsAutores: ["aut-02"] },
    { id: "lib-03", titulo: "La casa de los sueños", isbn: "978-0000000003", precio: 1750, idEditorial: "ed-01", idGenero: "gen-01", idsAutores: ["aut-01", "aut-03"] },
    { id: "lib-04", titulo: "Crónicas perdidas", isbn: "978-0000000004", precio: 1250, idEditorial: "ed-02", idGenero: null, idsAutores: ["aut-03"] },
    { id: "lib-05", titulo: "Voces del norte", isbn: "978-0000000005", precio: 1500, idEditorial: "ed-01", idGenero: "gen-01", idsAutores: ["aut-02", "aut-03"] },
    { id: "lib-06", titulo: "Pensamiento crítico", isbn: "978-0000000006", precio: 2100, idEditorial: "ed-02", idGenero: "gen-02", idsAutores: ["aut-01", "aut-02"] }
  ];

  window.datosLibreria = {
    editoriales: editoriales,
    generos: generos,
    autores: autores,
    libros: libros,
    ventas: [],
    clientes: clientes
  };
})();
