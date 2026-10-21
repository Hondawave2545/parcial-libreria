# Design — alta-libros-y-clientes (C-04)

## Context

C-01 a C-03 están archivados: `index.html` contiene los formularios `#form-alta-libro` (campos `#libro-titulo`, `#libro-isbn`, `#libro-precio`, `#libro-editorial`, `#libro-genero`, `#libro-autores` multiple) y `#form-alta-cliente` (`#cliente-nombre`, `#cliente-email`), ambos con `novalidate`; los contenedores de error `#errores-libro` / `#errores-cliente` (`ul.message.message--error` con `role="alert"` y `hidden`), los mensajes de resultado `#mensaje-resultado-*`, los listados `#listado-libros-registrados` / `#listado-clientes` con sus mensajes de vacío, y los selectores `#select-cliente` / `#select-libro-venta` de la vista Ventas. `js/datos.js` expone `window.datosLibreria` con ids estables (`lib-01`…`lib-06`, `cli-01`…`cli-03`, `ed-*`, `gen-*`, `aut-*`) y `js/catalogo.js` renderiza y filtra el catálogo, pero todo dentro de IIFEs sin exposición pública: `renderizarCatalogo` y `filtrarLibrosPorTitulo` no son alcanzables desde otro script. La restricción dura del proyecto se mantiene (JS nativo clásico, sin librerías, sin `fetch`, sin backend, `file://`); no hay test runner. Ver proposal.md — Why — y el delta `specs/altas-de-libros-y-clientes/spec.md`.

## Goals / Non-Goals

**Goals:**
- Poblar los selectores del formulario de libro y los selectores de la vista Ventas desde `window.datosLibreria`, con «Sin clasificar» en género (RN-LIB-01, RN-LIB-02).
- Validar y registrar libros y clientes en memoria con ids estables, mostrando errores cerca del formulario y actualizando todas las vistas dependientes sin recargar (RN-FORM-01…04).
- Cerrar la pregunta abierta **PA-DAT-03** de C-03 con un mecanismo de reutilización del catálogo que conserve el filtro activo y no cambie el comportamiento observable de la vista Catálogo.
- Tocar `index.html` solo para un `<script>`; tocar `js/catalogo.js` solo con un bloque mínimo de exposición; no tocar `js/datos.js` ni `css/styles.css`.
- Funciones y manejadores acotados, con responsabilidades reconocibles (RN-DAT-06).

**Non-Goals:**
- Editar ni eliminar libros o clientes (RN-FORM-05) y administrar editoriales, géneros o autores (RN-DAT-04).
- Composición de ventas, renglones o historial (C-05) y persistencia con `localStorage` (C-06).
- Validar dígito de control del ISBN (DD-04 lo descarta explícitamente).
- Frameworks, librerías, CDNs, npm, bundlers, módulos ES, backend, `fetch` o cualquier petición de red.
- Cambios de diseño visual amplios; se reutilizan las clases `.form`, `.input`, `.label`, `.btn`, `.message*` de C-02.

## Decisions

### D1 — Reutilización del catálogo (resolución de PA-DAT-03): facade `window.libreriaApp.catalogo.refrescar()`
**Decisión**: se crea un namespace pequeño de aplicación **`window.libreriaApp`** y `js/catalogo.js` expone bajo él un único método nuevo:

```js
window.libreriaApp = window.libreriaApp || {};
window.libreriaApp.catalogo = {
  refrescar: function () { manejarBusqueda(); }  // relee #busqueda-titulo y re-renderiza
};
```

`formularios.js` (y luego C-05/C-06) llaman a `window.libreriaApp.catalogo.refrescar()` tras agregar un libro. El cambio en `js/catalogo.js` es **solo este bloque de exposición** al final del archivo: ninguna función existente se modifica, el evento `input` del filtro sigue funcionando igual y la página de catálogo es observablemente idéntica a la de C-03. `js/datos.js` **no se modifica en absoluto**.
**Rationale**: la pregunta PA-DAT-03 planteaba exponer `renderizarCatalogo` en `window.datosLibreria` o en un namespace de aplicación; se elige el namespace de aplicación por estas razones: (a) `window.datosLibreria` es el **contrato de datos** (D1 de C-03) y mezclar ahí una función de presentación rompe la separación datos/comportamiento que la KB y RN-GLO-02 valoran; (b) `renderizarCatalogo(libros)` recibe un array **ya filtrado**: exponerla cruda obligaría a `formularios.js` a duplicar la coordinación del filtro (leer `#busqueda-titulo`, trim, llamar `filtrarLibrosPorTitulo`, pasar el resultado), con el riesgo de que esa copia se desincronice de los estados de C-03; en cambio `refrescar()` encapsula esa coordinación dentro del propio módulo dueño del filtro. Además `manejarBusqueda()` ya hace exactamente lo necesario (lee el valor actual del input, filtra y re-renderiza, actualizando `#mensaje-catalogo-vacio`/`#mensaje-sin-resultados` vía `actualizarMensajes`), por lo que la exposición es una delegación de una línea. El namespace `window.libreriaApp` queda como lugar estable para que C-05 agregue, p. ej., `window.libreriaApp.ventas`.
**Alternativas consideradas**: `window.datosLibreria.renderizarCatalogo` — contamina el namespace de datos y expone una función que requiere el array pre-filtrado (riesgo de desincronizar el filtro); `window.renderizarCatalogo` / `window.filtrarLibrosPorTitulo` globales — pollution del scope global y misma duplicación de la lógica de filtro en el consumidor; que `formularios.js` re-implemente el render del catálogo — duplicaría `crearFilaLibro`/resolutores y violaría RN-DAT-06; mover el render a un nuevo archivo — rewrite innecesario de C-03.

### D2 — Coordinación con el filtro activo y sus estados
**Decisión**: `refrescar()` **nunca recibe el array ni el texto como parámetro**: siempre relee `#busqueda-titulo` en el momento de la llamada, normaliza con la misma rutina de C-03 (`trim().toLowerCase()`, coincidencia parcial) y delega en `renderizarCatalogo(filtrados)`, que a su vez llama a `actualizarMensajes(libros, busquedaNormalizadaVacia)`.
**Rationale**: el valor del filtro en el DOM es la única fuente de verdad del estado visible del catálogo; re-leerlo en cada refresco garantiza que tras un alta se mantengan exactamente los mismos estados de C-03: búsqueda vacía → todos los libros (incluido el nuevo); búsqueda que coincide con el libro nuevo → el libro aparece; búsqueda sin coincidencias → `#mensaje-sin-resultados`; datos vacíos → `#mensaje-catalogo-vacio`. No hay estado de filtro duplicado en `formularios.js`.
**Alternativas consideradas**: pasar el texto de búsqueda como argumento — requiere que el llamador lea el input y replica el contrato del filtro fuera de su módulo; guardar el último filtro en una variable de módulo — crea una segunda fuente de verdad que puede quedar obsoleta si el usuario escribe mientras tanto.

### D3 — Punto único de orquestación de refresco: `refrescarVistasLibro()` / `refrescarVistasCliente()` en `formularios.js`
**Decisión**: cada alta exitosa llama a **una** función orquestadora en `formularios.js`:
- `refrescarVistasLibro()` → `renderizarListadoLibros()` (render de `#listado-libros-registrados` con su mensaje de vacío), `window.libreriaApp.catalogo.refrescar()` y `poblarSelectorLibrosVenta()` (`#select-libro-venta`).
- `refrescarVistasCliente()` → `renderizarListadoClientes()` (render de `#listado-clientes` con su mensaje de vacío) y `poblarSelectorClientesVenta()` (`#select-cliente`).

Cada función de render/populación es pequeña y de un solo destino; la orquestadora es el único punto que lista todas las vistas dependientes de un alta (RN-FORM-04).
**Rationale**: con actualizaciones dispersas dentro del manejador de submit es fácil olvidar una vista (el caso típico: olvidar el selector de Ventas, que exige US-015 explícitamente); un punto único por tipo de alta hace el inventario de dependencias explícito, testeable a la lectura y fácil de extender en C-05. Los renders de listado y selectores viven en `formularios.js` porque son comportamiento nuevo de esta vista; no se agregan a `catalogo.js`, cuya responsabilidad sigue siendo la vista Catálogo.
**Alternativas consideradas**: que cada manejador llame directamente a 3-4 funciones de render — mismo resultado observable pero el inventario de dependencias queda implícito y se duplica entre los dos forms; un único `refrescarTodo()` global — refrescaría vistas sin relación con el alta (p. ej. clientes al registrar un libro) y acoplaría ambos formularios.

### D4 — Altas en memoria con ids estables derivados del máximo existente
**Decisión**: el libro o cliente nuevo se pusha al array correspondiente de `window.datosLibreria` con la **misma forma** que el seed (libro: `{ id, titulo, isbn, precio, idEditorial, idGenero, idsAutores }`; cliente: `{ id, nombreCompleto, email }`). El id se genera con una función pura `siguienteId(prefijo, coleccion)`: recorre la colección, extrae el sufijo numérico de los ids que empiezan con `"<prefijo>-"`, toma el máximo y devuelve `"<prefijo>-NN"` con el máximo + 1 y relleno a 2 dígitos (`lib-07`, `cli-04`, …). El ISBN se guarda **tal como fue validado** (con trim; los guiones/espacios internos se conservan) porque la unicidad se compara normalizando a la hora de validar, no almacenando; el precio se guarda como `Number`; el género «Sin clasificar» se guarda como `idGenero: null`; `idsAutores` es el array de ids seleccionados en el orden del selector.
**Rationale**: el patrón `<prefijo>-NN` con sufijo numérico ya lo define el seed de C-03 (D2) y la KB exige ids estables (RN-DAT-01); derivarlos del máximo existente evita colisiones, no depende de la longitud del array (que podría cambiar con C-06) ni de `Date`/aleatoriedad, y es legible en consola. Guardar relaciones como ids (no objetos anidados) mantiene la normalización del ERD y hace que los resolutores de `catalogo.js` y los selectores funcionen igual para libros semilla y libros nuevos. C-06 podrá persistir y rehidratar estos mismos arrays sin cambiar la forma.
**Alternativas consideradas**: `Date.now()`/`Math.random()` como id — ilegible y no sigue el patrón del seed; `coleccion.length + 1` — colisiona si algún registro se elimina o si el orden cambia al persistir (C-06); guardar el objeto editorial/autor completo en el libro — duplica datos y rompe la normalización; normalizar el ISBN al guardarlo (quitar guiones) — cambiaría la forma visible del dato respecto de lo que escribió el usuario y del seed, que sí conserva guiones.

### D5 — Estrategia de errores: lista a nivel de formulario con prefijo textual
**Decisión**: la validación es **por formulario, con una lista de mensajes**: cada envío limpia `#errores-libro` / `#errores-cliente` (o `#mensaje-resultado-*` del otro estado) y, si hay fallos, llena ese `ul` con un `<li>` por regla violada construido con `document.createElement("li")` + `textContent`, con texto explícito iniciado en **«Error: …»** (p. ej. «Error: el ISBN ya existe…»). El contenedor se muestra quitando `hidden`. Solo se agrega el registro si la lista de errores queda vacía (RN-FORM-03). En éxito: se ocultan los errores, se muestra `#mensaje-resultado-libro` / `#mensaje-resultado-cliente` con texto de operación correcta y se limpian los campos del formulario.
**Rationale**: el HTML de C-01 ya entrega un único contenedor accesible por formulario (`ul[role="alert"]` con clase `.message--error`, que C-02 estiliza con marcador «⚠ »); no existen contenedores por campo y la restricción impide reestructurar el HTML, por lo que la lista a nivel de formulario es la única estrategia sin markup nuevo. El prefijo «Error: …» escrito por el JS **cierra PA-CSS-04** (decisión heredada de C-02): el texto generado por `::before` no siempre lo anuncian los lectores de pantalla, así que el marcador textual va en el contenido real; color y `::before` quedan como refuerzo visual, nunca como única señal. Los mensajes se reescriben en cada submit (no se acumulan) y `role="alert"` annuncia la lista cuando aparece.
**Alternativas consideradas**: `aria-invalid` + mensaje por campo — requiere agregar contenedores al HTML (fuera de la restricción mínima); un solo párrafo con todos los errores concatenados — peor legibilidad y no escala con `ul/li`; toast o `alert()` — rompe el patrón de mensajes cerca del formulario (RN-FORM-02) y `alert()` es intrusivo.

### D6 — Utilidades de normalización y validación
**Decisión**: `formularios.js` define helpers puros reutilizables:
- `normalizarIsbn(valor)` → `String(valor).trim().replace(/[\s-]/g, "").toLowerCase()` para la comparación de unicidad (RN-LIB-04; DD-04: sin dígito de control).
- `normalizarEmail(valor)` → `String(valor).trim().toLowerCase()` para unicidad (RN-CLI-04).
- `esEmailValido(valor)` → regex simple `^[^\s@]+@[^\s@]+\.[^\s@]+$` sobre el valor con trim (RN-CLI-03).
- `parsearPrecio(valor)` → `Number(String(valor).trim().replace(",", "."))` y verificar `isFinite` y `> 0` (RN-LIB-05; acepta coma decimal porque el teclado español la produce, y el campo es `type="text" inputmode="decimal"` por diseño de C-01).
Cada validación devuelve su mensaje (o cadena vacía si pasa); el manejador colecta los mensajes en orden de campo y los vuelca en la lista.
**Rationale**: normalizar solo **a la hora de comparar** y no al almacenar permite que «978-3-16», «978 3 16» y «978316» colisionen (caso manual 2) mientras el dato visible conserva lo escrito por el usuario. Los helpers son funciones puras con responsabilidad nombrable (RN-DAT-06) y verificables en consola.
**Alternativas consideradas**: regex de ISBN estricta — la consigna no exige formato, solo unicidad sin espacios ni guiones; `parseFloat` directo — aceptaría `"12abc"` como 12; validar con `required`/`type="number"` del navegador — desactivado con `novalidate` por diseño de C-01 y no cubre unicidad.

### D7 — Población de selectores y manejo de la opción «Sin clasificar»
**Decisión**: `poblarSelectorEditorial()`, `poblarSelectorGenero()` y `poblarSelectorAutores()` vacían cada `select` con `replaceChildren()` y agregan una `option` por registro (`value = id`, `textContent = nombre`, construidas con `createElement`/`textContent`). El selector de género agrega **primero** una opción `<option value="">Sin clasificar</option>`; al enviar, un `value === ""` se traduce a `idGenero: null`. `poblarSelectorClientesVenta()` y `poblarSelectorLibrosVenta()` hacen lo mismo con `#select-cliente` y `#select-libro-venta`, incluyendo una opción placeholder deshabilitada «Seleccione…» para que la vista Ventas arranque sin selección (C-05 la validará). Estas funciones se ejecutan en la inicialización de `formularios.js` y de nuevo en cada `refrescarVistas*()` correspondiente.
**Rationale**: «Sin clasificar» como `value=""` → `null` mantiene el contrato de datos de C-03 (`idGenero: null`, D2) y coincide con cómo `obtenerGenero` ya lo presenta. Repoblar selectores completos (en lugar de insertar solo la opción nueva) garantiza coherencia total con los arrays en memoria tras cualquier alta y reutiliza una sola rutina entre init y refresh. El placeholder «Seleccione…` en Ventas evita que un cliente/libro quede seleccionado implícitamente por defecto, lo que sería confuso para C-05.
**Alternativas consideradas**: agregar solo la opción nueva al select — más eficiente, pero deja el select como fuente de verdad paralela a los arrays y complica la rehidratación de C-06; checkbox/radio de autores en lugar del `select multiple` — el HTML de C-01 ya fija el `select multiple` y RN-LIB-01 lo admite; no usar placeholder en Ventas — el primer elemento quedaría seleccionado por defecto.

### D8 — Mapa de archivos y arquitectura
**Decisión**:
- **Nuevo**: `js/formularios.js` — IIFE en modo estricto con: helpers de normalización (D6), población de selectores (D7), `validarLibro(datos)` y `validarCliente(datos)` que devuelven arrays de mensajes, alta en memoria con `siguienteId` (D4), renders `renderizarListadoLibros()` / `renderizarListadoClientes()`, orquestadores `refrescarVistasLibro()` / `refrescarVistasCliente()` (D3), manejadores de `submit` con `preventDefault` (D5) e inicialización en `DOMContentLoaded`.
- **Modificado mínimo**: `js/catalogo.js` — solo el bloque de exposición de D1 al final del archivo; ninguna función existente cambia.
- **Sin cambios**: `js/datos.js`, `css/styles.css`, los formularios/ids/estructura de `index.html` (salvo un `<script>`).
- **`index.html`**: agregar `<script src="js/formularios.js"></script>` **después** de `js/catalogo.js` (orden: datos → catálogo → formularios, porque formularios consume ambos).
**Rationale**: respeta la separación por responsabilidad de la KB (`datos` / `catalogo` / `formularios`) y la restricción de no rediseñar HTML/CSS. El script va después de `catalogo.js` para que `window.libreriaApp.catalogo` exista cuando `formularios.js` se inicialice (ambos definen comportamiento al `DOMContentLoaded`, por lo que el orden de carga basta).
**Alternativas consideradas**: dividir `formularios.js` en `validaciones.js` + `libros.js` + `clientes.js` — excesivo para 15 pts y para el tamaño del alcance; incluir el bloque D1 dentro de `datos.js` — mezclaría datos con render del catálogo.

### D9 — Verificación: manual en navegador, sin test runner
**Decisión**: este proyecto **no tiene ni tendrá** runner de tests, `package.json`, frameworks ni dependencias (RN-ENT-04, RN-GLO-03): la verificación es manual abriendo `index.html` con doble clic y usando la consola del navegador. Los casos manuales concretos (ISBN duplicado `978-3-16` vs `978316`, email en mayúsculas, alta respetando el filtro, selectores de Ventas sin recarga, etc.) quedan especificados como tareas de verificación en `tasks.md`; su **registro escrito** de resultados se hace en el `README.md` de C-06 (RN-ENT-01, decisión heredada de C-03).
**Rationale**: proponer vitest/jest/u otro framework contradice la restricción dura del parcial y el alcance de este change; documentar los casos ya en `tasks.md` deja la verificación ejecutable durante el apply y el registro escrito concentrado en C-06 como pide la consigna.
**Alternativas consideradas**: incluir tests automatizados — incumpliría RN-ENT-04 y la restricción de dependencias; verificar solo por lectura de código — insuficiente para reglas de unicidad y refresco en vivo.

## Risks / Trade-offs

- [`refrescar()` depende del DOM del catálogo (`#busqueda-titulo`, `#listado-libros`)] → es un contrato intra-app deliberado: el catálogo es una vista de esta misma página; si C-06 rehidrata datos, el mismo `refrescar()` sirve sin cambios.
- [Repoblar los selectores de Ventas en cada alta podría descartar una selección ya hecha por el usuario] → aceptable en C-04 porque la vista Ventas aún no tiene comportamiento (es de C-05); C-05 podrá preservar la selección si le hace falta.
- [La regex de email es simple y admite formas que un validador estricto rechazaría] → suficiente para RN-CLI-03 y el caso manual 3; no se busca validación de standards RFC completos (RN-GLO-04: la validación cliente no es seguridad).
- [`parsearPrecio` con coma decimal podría confundir con separador de miles] → el campo usa `inputmode="decimal"` y el caso de uso son precios como 1500 o 15,50; se documenta que se acepta un solo separador decimal.
- [El `select multiple` de autores es poco ergonáptico en móvil] → es el control fijado por C-01 y admitido por RN-LIB-01; no se cambia el HTML.
- [Orden de scripts frágil si alguien reordena los `<script>`] → el orden datos → catálogo → formularios queda documentado en D8 y es el mismo patrón ya usado por C-03.

## Migration Plan

No aplica: es un cambio agregado sobre una SPA sin datos persistidos; al recargar la página el estado vuelve al seed de C-03 (la persistencia es C-06). Rollback = quitar el `<script>` de `formularios.js` y el bloque de exposición de `catalogo.js`.

## Open Questions

- **PA-CSS-04** (heredada de C-02): cerrada en D5 — el prefijo textual «Error: …» lo escribe el JS como contenido del `<li>`, y el `::before` de C-02 queda como refuerzo visual.
- **PA-DAT-03** (heredada de C-03): cerrada en D1 — `window.libreriaApp.catalogo.refrescar()` con bloque mínimo de exposición en `js/catalogo.js`.
