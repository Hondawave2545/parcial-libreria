# Proposal — alta-libros-y-clientes (C-04 · Ejercicio 4 · 15 pts)

## Why

C-01 a C-03 dejaron el HTML, el CSS y el catálogo con filtro funcionando, pero las vistas Libros y Clientes siguen inertes: los formularios `#form-alta-libro` y `#form-alta-cliente` no tienen comportamiento, los selectores de editorial/género/autores están vacíos, los listados `#listado-libros-registrados` y `#listado-clientes` no se renderizan y los selectores de la vista Ventas (`#select-cliente`, `#select-libro-venta`) no se pueblan. El Ejercicio 4 (15 puntos: libros y selectores 6; clientes 4; validación y actualización 5) exige registrar libros y clientes con validación en cliente y actualizar todas las vistas afectadas sin recargar; sin esta capa no se cumplirían US-013 a US-015, C-05 no tendría cómo poblar sus selectores de venta y C-06 no tendría altas que persistir.

## What Changes

- Se crea `js/formularios.js` con el comportamiento de ambos formularios de alta: población de selectores, validación, alta en memoria y actualización de vistas (RN-DAT-06: funciones y manejadores con responsabilidades reconocibles).
- Selectores del formulario de libro generados desde `js/datos.js`: editorial y género desde sus arrays; autores en el `<select multiple>` existente (RN-LIB-01, US-013). El selector de género incluye la opción **«Sin clasificar»** que representa `idGenero: null` (RN-LIB-02).
- Validación de libro: título e ISBN no vacíos (RN-LIB-03); ISBN inexistente comparado **sin espacios ni guiones** y sin dígito de control (RN-LIB-04); precio numérico **> 0** (RN-LIB-05); editorial y **todos** los autores seleccionados existen, con **≥ 1 autor** (RN-LIB-06); género opcional pero existente si se asigna (RN-LIB-07).
- Validación de cliente: nombre completo y email no vacíos (RN-CLI-02); email con formato válido (RN-CLI-03); email único comparado **sin espacios exteriores y sin distinguir mayúsculas** (RN-CLI-04). Sin campo de apellido separado (RN-CLI-01, US-014).
- `preventDefault` en el `submit` de ambos formularios (RN-FORM-01); errores mostrados **cerca del formulario** en los contenedores existentes `#errores-libro` / `#errores-cliente` (RN-FORM-02); solo se agrega el registro si **todas** las comprobaciones pasan (RN-FORM-03).
- Alta en memoria sobre `window.datosLibreria`: el libro o cliente nuevo se agrega a su array con **id estable** consecutivo (p. ej. `lib-07`, `cli-04`) y relaciones que referencian ids existentes de editorial/género/autores.
- Tras un alta correcta, **sin recargar la página** (RN-FORM-04, US-015) se actualizan: el listado correspondiente (`#listado-libros-registrados` o `#listado-clientes`), el catálogo (reutilizando el render de C-03 respetando el filtro activo) y las opciones relacionadas, incluidos `#select-cliente` y `#select-libro-venta` de la vista Ventas (RN-FORM-04, US-015).
- Mensaje de operación correcta en `#mensaje-resultado-libro` / `#mensaje-resultado-cliente` y mensajes de listado vacío en `#mensaje-libros-vacios` / `#mensaje-clientes-vacios`, usando las clases `.message` y la propiedad `hidden` ya existentes.
- Resolución de **PA-DAT-03** (abierta en C-03): mecanismo concreto de reutilización del render del catálogo — ver design.md D1.
- **Fuera de alcance (OUT)**: editar ni eliminar registros (RN-FORM-05); altas de editoriales, géneros o autores (RN-DAT-04); `localStorage`/persistencia (C-06); ventas e historial (C-05); librerías, frameworks, CDNs, npm, backend, `fetch` y módulos ES (RN-GLO-03, RN-DAT-04); cambios de diseño visual amplios en `css/styles.css`.

## Capabilities

### New Capabilities

- `altas-de-libros-y-clientes`: alta de libros y clientes desde los formularios existentes con opciones generadas a partir de los datos locales, validación de unicidad y de relaciones (ISBN, email, precio, editorial/género/autores), alta en memoria con identificadores estables, y actualización sin recarga de los listados, el catálogo y las opciones relacionadas de la vista Ventas.

### Modified Capabilities

_(ninguna — `estructura-y-navegacion-html`, `css-presentacion-adaptable` y `datos-locales-y-catalogo` no cambian a nivel de requisitos: se reutilizan los formularios, contenedores, mensajes, clases y el render del catálogo ya definidos; el catálogo se vuelve a renderizar después de un alta, pero su comportamiento observable —filtro, estados, mensajes— es idéntico al especificado en C-03.)_

## Impact

- **Archivos nuevos**: `js/formularios.js` (directorio `js/` ya existente).
- **Archivos existentes afectados**: `index.html` — únicamente una etiqueta `<script src="js/formularios.js">` agregada después de `js/catalogo.js` al final del `body`. `js/catalogo.js` — modificación mínima para exponer el render y el filtro reutilizables (design.md D1); el comportamiento visible del catálogo no cambia. `js/datos.js` — no se modifica. **No** se modifica `css/styles.css` (las clases `.form`, `.input`, `.label`, `.btn`, `.message`, `.message--error|--success|--info` de C-02 ya estilizan todo lo necesario; los mensajes distinguen error/éxito por texto y marcador `::before`, no solo por color — PA-CSS-04 se cierra escribiendo el prefijo textual desde el JS).
- **Contratos del HTML consumidos**: `#form-alta-libro` (`#libro-titulo`, `#libro-isbn`, `#libro-precio`, `#libro-editorial`, `#libro-genero`, `#libro-autores`), `#errores-libro`, `#mensaje-resultado-libro`, `#listado-libros-registrados`, `#mensaje-libros-vacios`; `#form-alta-cliente` (`#cliente-nombre`, `#cliente-email`), `#errores-cliente`, `#mensaje-resultado-cliente`, `#listado-clientes`, `#mensaje-clientes-vacios`; `#select-cliente` y `#select-libro-venta` (Ventas); contratos de datos de `window.datosLibreria` y funciones de render de `js/catalogo.js`.
- **Sistemas/APIs**: no aplica — sin backend, red, dependencias ni módulos ES; la página sigue abriéndose con doble clic (`file://`).
- **Dependencias**: requiere C-03 archivado. C-05 reutilizará los arrays enriquecidos con las altas (y los selectores ya poblados); C-06 persistirá también los registros dados de alta aquí. El registro escrito de los casos manuales 2 y 3 (ISBN duplicado, emails) queda para el README de C-06 (RN-ENT-01).
