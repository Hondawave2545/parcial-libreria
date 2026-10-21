# Proposal — datos-locales-catalogo-filtro (C-03 · Ejercicio 3 · 15 pts)

## Why

C-01 y C-02 dejaron la estructura HTML y el CSS completos, pero la vista Catálogo sigue con su `<tbody id="listado-libros">` vacío y el campo de búsqueda sin comportamiento: no existe ningún dato ni JavaScript en el proyecto. El Ejercicio 3 (15 puntos: modelo y ejemplos 5; renderizado 5; filtro y estados 5) exige un seed local de datos coherente, generar el catálogo desde JavaScript y filtrarlo por título con estados claros; sin esta capa, C-04 a C-06 no tendrían datos sobre los que dar de alta, vender ni persistir, y no se cumplirían US-010 a US-012.

## What Changes

- Se crea `js/datos.js` con el modelo de datos local como arrays y objetos con **identificadores estables** de libros, editoriales, géneros, autores y clientes (RN-DAT-01).
- Seed inicial ficticio con al menos **6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes** (RN-DAT-02, DD-06), con relaciones coherentes: cada libro referencia una editorial existente, uno o más autores existentes y, opcionalmente, un género existente (RN-DAT-03). Se incluye al menos un libro sin género para ejercitar «Sin clasificar» y precios 1500 y 2000 para el caso manual de C-05.
- Los datos se cargan **en memoria** desde el propio archivo; **sin `fetch`** y sin altas/bajas/modificaciones de editoriales, géneros o autores (RN-DAT-04).
- Se crea `js/catalogo.js` con funciones y eventos de responsabilidad reconocible (RN-DAT-06): resolver nombres de editorial/género/autores, construir la fila de un libro, renderizar el listado completo y filtrar por título.
- Render del catálogo en `#listado-libros` a partir del array de libros (RN-CAT-01, US-011): título, ISBN, editorial, género, autores y precio. Género ausente → **«Sin clasificar»** (RN-CAT-02).
- Todos los datos se insertan **como texto** en el DOM con `textContent`/`createElement`, nunca con `innerHTML` (RN-DAT-05).
- Filtro por título en `#busqueda-titulo` (US-012): sin distinguir mayúsculas/minúsculas (RN-CAT-03), con coincidencias parciales (RN-CAT-04) y `trim` de espacios extremos (RN-CAT-05).
- Estados del filtro: búsqueda vacía o solo espacios → catálogo completo (RN-CAT-06); sin coincidencias → mensaje claro en `#mensaje-sin-resultados` (RN-CAT-07); catálogo sin datos → `#mensaje-catalogo-vacio`.
- `index.html` se toca **solo** para agregar los `<script src="js/datos.js">` y `<script src="js/catalogo.js">` antes del cierre de `body`. No se modifican `id`, estructura, clases ni el CSS.
- **Fuera de alcance (OUT)**: validaciones y altas de libros/clientes (C-04), ventas e historial (C-05), `localStorage` (C-06), librerías, frameworks, CDNs, npm, backend y `fetch` (RN-GLO-03, RN-DAT-04).

## Capabilities

### New Capabilities

- `datos-locales-y-catalogo`: modelo de datos local en memoria con identificadores estables y relaciones coherentes (libros, editoriales, géneros, autores y clientes), render del catálogo desde JavaScript con inserción segura como texto, presentación de «Sin clasificar» ante género ausente, y filtro por título con sus estados (catálogo completo, sin coincidencias y catálogo vacío).

### Modified Capabilities

_(ninguna — `estructura-y-navegacion-html` y `css-presentacion-adaptable` no cambian a nivel de requisitos: se reutilizan los contenedores, campos y mensajes ya definidos; solo se agregan dos `<script>`.)_

## Impact

- **Archivos nuevos**: `js/datos.js` y `js/catalogo.js` (directorio `js/` nuevo en la raíz, según `knowledge-base/08_arquitectura_propuesta.md` §Estructura de directorios).
- **Archivos existentes afectados**: `index.html` — únicamente dos etiquetas `<script>` al final del `body`. **No** se modifica `css/styles.css`.
- **Contratos del HTML consumidos**: `#listado-libros` (`tbody` del catálogo), `#busqueda-titulo` (campo de búsqueda), `#mensaje-sin-resultados` y `#mensaje-catalogo-vacio` (mensajes con `hidden`), y las clases `.message`/`.message--info` ya estilizadas en C-02.
- **Sistemas/APIs**: no aplica — sin backend, red, dependencias ni módulos ES; los scripts se cargan como JavaScript clásico para funcionar al abrir `index.html` con doble clic (`file://`).
- **Dependencias**: requiere C-02 archivado. C-04 reutilizará `js/datos.js` para altas y selectores; C-05 reutilizará el array de libros; C-06 persistirá estos datos. El registro escrito de la búsqueda como caso manual queda para el README de C-06.

## Preguntas abiertas relevantes (no se cierran en este change)

- **PA-DAT-01**: los nombres, títulos, ISBN e importes concretos del seed son ficticios y elegidos por el implementador (RN-DAT-02, PA-07); no hay valores exigidos salvo el mínimo de registros y los precios 1500/2000 usados por el caso manual de ventas.
- **PA-DAT-02**: la forma exacta de exponer los datos entre scripts (namespace global vs. `const` de nivel superior) es una decisión técnica de design.md; no afecta el comportamiento observable.
