# Design — datos-locales-catalogo-filtro (C-03)

## Context

C-01 y C-02 están archivados: `index.html` contiene las 5 vistas, la tabla del catálogo con `<tbody id="listado-libros">`, el campo `#busqueda-titulo` y los mensajes `#mensaje-catalogo-vacio` / `#mensaje-sin-resultados` (con `hidden` y clases `.message`), todo ya estilizado en `css/styles.css`. No existe `js/` ni ningún comportamiento dinámico. La restricción dura del proyecto es HTML/CSS/JS nativo sin librerías, sin npm, sin backend y **sin `fetch`**; además, la entrega se abre con doble clic sobre `index.html` (`file://`), lo que condiciona cómo se cargan los scripts. El HTML de C-01/C-02 no se puede reestructurar: solo se permite agregar lo mínimo imprescindible para el JS. Ver proposal.md — Why — y el delta `specs/datos-locales-y-catalogo/spec.md`.

## Goals / Non-Goals

**Goals:**
- Un seed local de datos coherente y con identificadores estables que C-04, C-05 y C-06 puedan reutilizar sin renombrar nada.
- Render del catálogo y filtro por título en JavaScript nativo, con inserción segura como texto y estados explícitos (todo, sin coincidencias, vacío).
- Tocar `index.html` solo para agregar dos `<script>`; no tocar CSS ni ids, clases o estructura existentes.
- Funciones y manejadores acotados, con responsabilidades reconocibles (RN-DAT-06).

**Non-Goals:**
- Validaciones o formularios de alta (C-04), ventas/historial (C-05) y `localStorage` (C-06).
- Persistencia, duplicación o recuperación de datos entre recargas.
- CRUD de editoriales, géneros o autores y cualquier petición de red (`fetch`, XHR, CDNs).
- Uso de ES modules, bundlers, TypeScript o cualquier herramienta de compilación.

## Decisions

### D1 — JavaScript clásico con namespace global, no módulos ES
**Decisión**: `js/datos.js` y `js/catalogo.js` se cargan como scripts clásicos (`<script src="..."></script>`, sin `type="module"`). `datos.js` expone un único punto de acceso global `window.datosLibreria = { editoriales, generos, autores, libros, clientes }`, construido dentro de una IIFE que evita fugas de variables sueltas.
**Rationale**: la página se abre con doble clic (`file://`) y los navegadores bloquean los módulos ES por CORS en ese esquema. Los scripts clásicos cargados desde archivos locales funcionan sin servidor ni build, tal como exige la entrega (RN-ENT-04). Un namespace único da contratos claros entre archivos y no contamina el global con cinco variables sueltas.
**Alternativas consideradas**: `type="module"` — falla al abrir con `file://`; cinco `const` globales — funciona, pero el contrato entre archivos queda implícito y es más fácil de romper; un solo archivo `js/app.js` — mezclaría datos con comportamiento y perdería la separación por responsabilidad que la KB propone (`datos.js` / `catalogo.js`).

### D2 — Forma de los datos y convención de identificadores
**Decisión**: cada colección es un array de objetos planos con ids de texto estables y legibles:
- Editorial: `{ id: "ed-01", nombre }`.
- Género: `{ id: "gen-01", nombre }`.
- Autor: `{ id: "aut-01", nombre }`.
- Cliente: `{ id: "cli-01", nombreCompleto, email }`.
- Libro: `{ id: "lib-01", titulo, isbn, precio, idEditorial, idGenero, idsAutores: [] }` (`idGenero: null` representa género ausente).

Los ids siguen el patrón `<prefijo>-NN` con prefijos `ed`, `gen`, `aut`, `cli`, `lib`; no se derivan de índices ni de nombres, por lo que no cambian al reordenar arrays.
**Rationale**: coincide con las entidades de `knowledge-base/04_modelo_de_datos.md` (`idEditorial`, `idGenero`, `idsAutores`, `nombreCompleto`) y con el estilo de ids ya usado en el HTML (`#listado-libros`, `#busqueda-titulo`). Los ids estables son requisito explícito (RN-DAT-01) y serán la base de las búsquedas de C-04/C-05.
**Alternativas consideradas**: ids numéricos autoincrementales — dependen del orden del seed y complican referencias cruzadas legibles; guardar objetos anidados (libro con el objeto editorial completo) — duplicaría datos y rompería la normalización 1:N que muestra el ERD.

### D3 — Contenido del seed (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes)
**Decisión**: seed ficticio con este contenido mínimo:

| Colección | Registros |
|-----------|-----------|
| Editoriales | `ed-01` Editorial Andina · `ed-02` Ediciones del Sur |
| Géneros | `gen-01` Novela · `gen-02` Ensayo |
| Autores | `aut-01` Ana Pérez · `aut-02` Luis Gómez · `aut-03` María Fernández |
| Clientes | `cli-01` Lucía Ramírez · `cli-02` Diego Torres · `cli-03` Sofía Herrera |
| Libros | 6 libros (`lib-01`…`lib-06`) con ISBN únicos; precios 1500, 2000, 1750, 1250, 1500, 2100 |

Relaciones: todos los libros referencian una editorial existente y al menos un autor existente; `lib-04` queda **sin género** (`idGenero: null`) para comprobar «Sin clasificar»; los precios incluyen **1500** y **2000** para el caso manual de ventas de C-05.
**Rationale**: cubre los mínimos de RN-DAT-02 y las reglas de coherencia de RN-DAT-03, ejercita el caso de género ausente (RN-CAT-02) y prepara el ejemplo de cálculo 2×1500 + 1×2000 = 5000 de C-05. El contenido es ficticio y editable (PA-07, PA-DAT-01).
**Alternativas consideradas**: un libro por combinación para maximizar variedad — innecesario y ruidoso; seed sin libro sin género — obligaría a crear un caso artificial en C-04 para probar «Sin clasificar».

### D4 — `index.html`: solo dos etiquetas `<script>` al final del `body`
**Decisión**: agregar antes de `</body>`, en este orden, `<script src="js/datos.js"></script>` y `<script src="js/catalogo.js"></script>`. Sin `defer` ni `async` (los scripts están al final del documento), sin tocar el `<head>`, sin ids nuevos, sin clases nuevas y sin cambios en `css/styles.css`.
**Rationale**: es la adición mínima que habilita el comportamiento y respeta la restricción dura del usuario. El orden importa: `datos.js` debe definir `window.datosLibreria` antes de que `catalogo.js` lo consuma.
**Alternativas consideradas**: scripts con `defer` en el `<head>` — también válido, pero agrega cambios en dos zonas del documento; un único `<script>` con todo inline — mezcla responsabilidades y dificulta la lectura; importar CSS/JS por CDN — prohibido.

### D5 — Render con `createElement` + `textContent`, nunca `innerHTML`
**Decisión**: `catalogo.js` construye cada fila con `document.createElement("tr")` y celdas `document.createElement("td")`, asignando valores con `textContent`. El `tbody` se limpia con `replaceChildren()` antes de volver a poblarlo. No se usa `innerHTML`, `outerHTML`, `insertAdjacentHTML` ni `document.write`.
**Rationale**: RN-DAT-05 exige insertar datos como texto para que caracteres como `<` o `&` se muestren literalmente y no se interpreten como marcado. El dataset es local, pero la regla se aplica igual porque los libros serán editables en C-04 y la buena práctica debe quedar desde ahora.
**Alternativas consideradas**: `innerHTML` con plantillas — más corto de escribir, pero viola RN-DAT-05; `<template>` en HTML — requeriría tocar más el HTML.

### D6 — Funciones acotadas y flujo de render/filtro
**Decisión**: `catalogo.js` define:
- `obtenerEditorial(idEditorial)`, `obtenerGenero(idGenero)`, `obtenerAutores(idsAutores)` → resuelven referencias a objetos/nombres, con fallback defensivo (`—` para referencias faltantes y «Sin clasificar» para género ausente).
- `crearCelda(texto)` → `td` con `textContent`.
- `crearFilaLibro(libro)` → `tr` con las 6 celdas (título, ISBN, editorial, género, autores, precio).
- `renderizarCatalogo(libros)` → vacía `#listado-libros`, agrega una fila por libro y actualiza los mensajes de estado.
- `filtrarLibrosPorTitulo(texto)` → devuelve el array filtrado (`trim().toLowerCase()`, `includes`); si la búsqueda normalizada queda vacía, devuelve todos los libros.
- `manejarBusqueda(evento)` → lee `evento.target.value`, filtra y vuelve a renderizar.
- `inicializarCatalogo()` → registra el evento `input` en `#busqueda-titulo` y hace el render inicial.

Se escucha `input` (filtrado en vivo) y se inicializa en `DOMContentLoaded`.
**Rationale**: cada función tiene una responsabilidad nombrable (RN-DAT-06) y el flujo coincide con el Flujo 2 de la KB: evento → trim → comparación en minúsculas con coincidencia parcial → render del resultado o estado. `input` da respuesta inmediata sin botón extra.

**Alternativas consideradas**: escuchar `keyup` — dispara en teclas que no cambian el texto; filtrar solo al enviar un formulario — la vista Catálogo no tiene `form` de búsqueda; una sola función `render(libros)` que haga todo — concentra responsabilidades y dificulta C-04.

### D7 — Reglas de estado de los mensajes
**Decisión**:
- Con datos totales vacíos (`libros.length === 0`): se muestra `#mensaje-catalogo-vacio` con texto «El catálogo no tiene libros cargados.» y se oculta `#mensaje-sin-resultados`.
- Con búsqueda normalizada no vacía y 0 coincidencias: se muestra `#mensaje-sin-resultados` con «No se encontraron libros que coincidan con la búsqueda.» y se oculta el mensaje de catálogo vacío.
- En cualquier otro caso (búsqueda vacía o con resultados): ambos mensajes quedan ocultos.
El estado se controla con la propiedad `hidden` (ya presente en el HTML de C-01), no con estilos inline.
**Rationale**: cumple RN-CAT-06/07 y evita el silencio de una tabla vacía. Usar `hidden` mantiene la separación estructura/estilos (C-02 ya estiliza `.message`) y no requiere tocar CSS.
**Alternativas consideradas**: escribir/borrar el texto según el caso — deja menos trazabilidad; mostrar siempre un mensaje aunque la búsqueda sea parcial — confunde.

### D8 — Presentación de valores resueltos
**Decisión**: el género ausente se muestra como «Sin clasificar»; los autores se muestran unidos por coma en el orden del array `idsAutores`; el precio se muestra con dos decimales mediante `Number(precio).toFixed(2)` sin símbolo de moneda.
**Rationale**: «Sin clasificar» es literal de RN-CAT-02; la coma hace legible la lista de autores; los dos decimales preparan la coherencia con los importes de C-05 sin inventar una moneda que la consigna no fija.
**Alternativas consideradas**: `Intl.NumberFormat` — correcto, pero agrega configuración regional y no aporta sobre `toFixed(2)` para estos valores; mostrar el precio crudo — puede mostrar `1500` sin decimales y romper la consistencia visual con C-05.

## Risks / Trade-offs

- [Los módulos ES fallarían con `file://`] → se usa JavaScript clásico y namespace global (D1); verificado abriendo `index.html` con doble clic.
- [C-04 dará de alta libros en memoria y necesitará refrescar el catálogo] → este change deja `renderizarCatalogo(libros)` y `filtrarLibrosPorTitulo(texto)` reutilizables; C-04 deberá volver a invocar el render (o exponerlo) al agregar un libro. No se implementa ese enganche aquí.
- [Un id de editorial/autor inexistente en el seed dejaría celdas vacías] → los resolutores usan fallback defensivo y el seed se valida manualmente contra el mínimo de relaciones (RN-DAT-03).
- [Filtrar en cada `input` podría ser costoso con miles de libros] → el seed tiene 6 libros; para el alcance del parcial no hay problema. Si C-04/C-06 crecen, se puede agregar debounce sin cambiar el contrato.
- [El texto «Sin clasificar» también debe aparecer en el selector de género de C-04] → aquí solo se resuelve para el catálogo; C-04 reutilizará `idGenero: null` como señal.
- [El precio formateado con `toFixed(2)` no incluye moneda] → decisión explícita para no inventar un símbolo; si el docente pide uno, se ajusta solo la función de presentación.

## Open Questions

- **PA-DAT-01**: nombres, títulos, ISBN y precios del seed son ficticios y no requieren aprobación previa; si el review del Ejercicio 3 pide otro contenido, solo se edita `js/datos.js`.
- **PA-DAT-03**: exponer `renderizarCatalogo` en `window.datosLibreria` o en un namespace de aplicación para que C-04 lo reutilice — se decide al proponer C-04; este change no lo necesita.
