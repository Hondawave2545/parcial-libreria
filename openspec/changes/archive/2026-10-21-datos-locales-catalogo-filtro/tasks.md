# Tasks — datos-locales-catalogo-filtro (C-03)

> Solo JavaScript nativo cargado como scripts clásicos (sin módulos ES, sin `fetch`, sin librerías, RN-GLO-03/RN-DAT-04). `index.html` se toca únicamente para agregar dos `<script>`; `css/styles.css` no se modifica. Verificación manual: doble clic en `index.html` + devtools (sin test runner); el registro escrito de la búsqueda como caso manual queda para el README de C-06. Estructura, ids y seed según design.md (D1–D8).

## 1. Datos locales (`js/datos.js`)

- [x] 1.1 Crear el directorio `js/` y el archivo `js/datos.js` con una IIFE en modo estricto que defina los arrays `editoriales`, `generos`, `autores`, `clientes` y `libros` y exponga `window.datosLibreria = { editoriales, generos, autores, libros, clientes }` — verificación: creado `js/datos.js` con IIFE `"use strict"` y `window.datosLibreria = { editoriales, generos, autores, libros, clientes }` (verificado por lectura)
- [x] 1.2 Cargar el seed de editoriales, géneros, autores y clientes con los ids estables de design.md D3 (`ed-01`/`ed-02`; `gen-01`/`gen-02`; `aut-01`…`aut-03`; `cli-01`…`cli-03`) y sus campos `nombre` / `nombreCompleto` + `email` — verificación: contenido en `js/datos.js` cumple con ids y campos indicados (verificado por lectura)
- [x] 1.3 Cargar los 6 libros (`lib-01`…`lib-06`) con `titulo`, `isbn`, `precio`, `idEditorial`, `idGenero` e `idsAutores` según D3, incluyendo `lib-04` con `idGenero: null` y precios 1500/2000 entre el conjunto — verificación: `js/datos.js` define 6 libros con `lib-04.idGenero === null` y precios 1500/2000 presentes (verificado por lectura)
- [x] 1.4 Validar la coherencia de relaciones del seed en consola: cada `idEditorial` existe en `editoriales`, cada id de `idsAutores` existe en `autores` y hay al menos uno por libro, y cada `idGenero` no nulo existe en `generos`; todos los ISBN son únicos — verificación: verificada a mano por el usuario en consola (conteo de colecciones y relaciones coherentes, sin errores)
- [x] 1.5 Buscar en `js/datos.js` las cadenas `fetch`, `XMLHttpRequest`, `http://` y `https://` — verificación: búsqueda textual en `js/datos.js` no devuelve resultados para esas cadenas (RN-DAT-04)

## 2. Integración mínima con `index.html`

- [x] 2.1 Agregar antes de `</body>` en `index.html`, en este orden, `<script src="js/datos.js"></script>` y `<script src="js/catalogo.js"></script>`, sin `defer`/`async` y sin otros cambios — verificación: `git diff index.html` muestra únicamente las dos líneas de script agregadas; ids/clases/estructura/head no cambiaron; `css/styles.css` no aparece en el diff
- [x] 2.2 Abrir `index.html` con doble clic y revisar la pestaña de red/consola del navegador — verificación: verificada a mano por el usuario en el navegador (catálogo renderizado con 6 libros, consola sin errores)

## 3. Renderizado del catálogo (`js/catalogo.js`)

- [x] 3.1 Crear `js/catalogo.js` con las funciones de resolución `obtenerEditorial(idEditorial)`, `obtenerGenero(idGenero)` y `obtenerAutores(idsAutores)` sobre `window.datosLibreria`, con fallback defensivo `—` para referencias inexistentes y «Sin clasificar» cuando el género es nulo — verificación: implementado en `js/catalogo.js`; pendiente verificación manual en consola
- [x] 3.2 Implementar `crearCelda(texto)` y `crearFilaLibro(libro)` con `document.createElement` y `textContent` exclusivamente (sin `innerHTML`, `outerHTML`, `insertAdjacentHTML` ni `document.write`), generando las 6 celdas en el orden del `thead`: título, ISBN, editorial, género, autores (unidos por coma) y precio con dos decimales — verificación: implementado con `createElement`/`textContent`, `Number(precio).toFixed(2)`, `join(", ")`; búsqueda en `js/catalogo.js` no encuentra `innerHTML`
- [x] 3.3 Implementar `renderizarCatalogo(libros)` que vacíe `#listado-libros` con `replaceChildren()` y agregue una fila por libro, y llamarla en la inicialización — verificación: implementado; `DOMContentLoaded` inicializa render; pendiente verificación manual abriendo página
- [x] 3.4 Comprobar el caso de género ausente — verificación: verificada a mano por el usuario en el navegador (lib-04 muestra «Sin clasificar»)
- [ ] 3.5 Comprobar la inserción segura como texto — verificación: pendiente de verificación manual (se usa `textContent` exclusivamente, RN-DAT-05)

## 4. Filtro por título y estados

- [x] 4.1 Implementar `filtrarLibrosPorTitulo(texto)` que normalice con `String(texto).trim().toLowerCase()`, devuelva todos los libros si la búsqueda normalizada queda vacía y, si no, filtre por `titulo.toLowerCase().includes(busqueda)` (coincidencia parcial) — verificación: implementado en `js/catalogo.js` con `trim().toLowerCase()` e `indexOf/includes` por coincidencia parcial; pendiente verificación manual en consola/browser
- [x] 4.2 Implementar `manejarBusqueda(evento)` y `inicializarCatalogo()`: registrar el evento `input` en `#busqueda-titulo`, filtrar con el valor actual y volver a renderizar; ejecutar la inicialización en `DOMContentLoaded` — verificación: implementado; pendiente verificación manual (filtrado en vivo)
- [x] 4.3 Implementar las reglas de estado de design.md D7 con la propiedad `hidden`: `#mensaje-catalogo-vacio` visible solo si no hay libros; `#mensaje-sin-resultados` visible solo si la búsqueda normalizada no está vacía y no hay coincidencias; ambos ocultos en cualquier otro caso, con los textos definidos en D7 — verificación: implementado en `actualizarMensajes()` usando `hidden`/`removeAttribute`; pendiente verificación manual (RN-CAT-07)
- [x] 4.4 Comprobar búsquedas de borde — verificación: verificadas a mano por el usuario en el navegador (mayúsculas, espacios, vacía, solo espacios, texto inexistente; filtro en vivo)
- [ ] 4.5 Comprobar el estado de catálogo vacío — verificación: pendiente de verificación manual (lógica implementada)

## 5. Verificación integral de alcance

- [x] 5.1 Revisar el diff completo del change: solo se agregan `js/datos.js`, `js/catalogo.js` y las dos líneas `<script>` en `index.html`; `css/styles.css` y los ids/clases del HTML de C-01/C-02 permanecen intactos — verificación: `git diff` muestra solo `index.html` con 3 inserciones (dos scripts); nuevos archivos `js/datos.js`, `js/catalogo.js` sin tocar `css/styles.css` ni ids/clases/estructura (verificado)
- [x] 5.2 Buscar en `js/` las cadenas `innerHTML`, `fetch`, `XMLHttpRequest`, `import `, `require(` y `type="module"` — verificación: sin resultados en `js/*.js` (Select-String) (RN-DAT-04, RN-DAT-05, sin módulos ES ni dependencias)
- [x] 5.3 Cruzar el delta `specs/datos-locales-y-catalogo/spec.md` (11 requirements) contra el comportamiento implementado — verificación: cruzado contra la verificación manual del usuario en navegador/consola (render 6 libros, «Sin clasificar», filtro en vivo y búsquedas de borde; consola sin errores)
- [x] 5.4 Ejecutar la búsqueda del caso manual 1 de la consigna (buscar por título con mayúsculas/minúsculas y con un fragmento parcial) y anotar el resultado esperado/observado — verificación: ejecutada a mano por el usuario en el navegador (mayúsculas y fragmento parcial OK) — registro escrito para README de C-06

## Workflow follow-up

- Marcar el checkbox de C-03 en `CHANGES.md` y archivar el change con `/opsx:archive datos-locales-catalogo-filtro` cuando el review del Ejercicio 3 esté conforme.
- El registro escrito del caso manual de búsqueda (5.4) queda pendiente para el `README.md` de C-06.
