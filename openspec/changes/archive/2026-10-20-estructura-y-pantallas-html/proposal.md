# Proposal — estructura-y-pantallas-html (C-01 · Ejercicio 1 · 20 pts)

## Why

El parcial exige un frontend de librería en HTML/CSS/JS nativo donde el Ejercicio 1 (20 puntos: vistas y navegación 10; semántica, formularios y estados 10) es la base obligatoria del proyecto: sin `index.html` y las 5 vistas no hay nada sobre lo que aplicar CSS (C-02), renderizar datos (C-03), registrar altas (C-04), confirmar ventas (C-05) ni persistir (C-06). Es el primer change del camino crítico (GATE 0, sin dependencias).

## What Changes

- Se crea `index.html` como entrada obligatoria del proyecto (RN-ENT-04, US-001).
- Se estructuran las 5 vistas de la consigna: **Catálogo**, **Libros**, **Clientes**, **Ventas**, **Historial**, con navegación clara entre ellas (US-001 a US-005).
- Marcado semántico: `header` con título de la librería, `nav` con enlaces a las vistas, `main` con las secciones de vista, `footer` (DD-05, RN-FORM-06).
- Vista Catálogo: campo de búsqueda por título y contenedor de listado de libros (los datos se renderizan después, en C-03) (US-002).
- Vista Libros: `form` de alta (con `novalidate`) con título, ISBN, precio (`type="text"` + `inputmode="decimal"`), editorial, género y autores + contenedor del listado con esas mismas columnas (US-003).
- Vista Clientes: `form` de alta (con `novalidate`) con nombre completo y email + contenedor del listado (US-003).
- Vista Ventas: selector de cliente, selector de libro y campo de cantidad junto a la acción de agregar renglón, zona de composición de renglones y contenedor de resumen de la venta (US-004).
- Vista Historial: contenedor de listado de ventas y zona de detalle (US-005).
- Semántica de formularios y tablas: cada campo con `<label>` asociada, botones con texto descriptivo, tablas con `<thead>`/`<th>` (RN-FORM-06, US-006).
- Contenedores previstos (marcado y ubicación, sin lógica) para mensajes de: lista vacía, búsqueda sin resultados y operación correcta/rechazada (RN-FORM-07, US-006), más una lista de errores (`role="alert"`) junto a cada formulario de alta.
- **Sin** CSS propio (C-02) y **sin** lógica JS de datos (C-03): solo estructura HTML; las opciones de los selectores y los datos de listados se llenarán desde JavaScript en cambios posteriores.

## Capabilities

### New Capabilities

- `estructura-y-navegacion-html`: estructura HTML semántica de la interfaz de la librería — entrada `index.html`, las 5 vistas (Catálogo, Libros, Clientes, Ventas, Historial), navegación clara entre vistas, formularios con etiquetas asociadas, tablas con encabezados y contenedores previstos para estados/mensajes (listas vacías, sin resultados, operaciones correctas o rechazadas).

### Modified Capabilities

_(ninguna — el proyecto no tiene specs previas; `openspec list --specs` está vacío)_

## Impact

- **Archivos nuevos**: `index.html` en la raíz del proyecto (posiblemente más HTML si se opta por multi-página; ver pregunta abierta PA-05). Sin dependencias ni herramientas de compilación (RN-ENT-04, DD-07).
- **Archivos existentes afectados**: ninguno (el proyecto aún no tiene código).
- **Sistemas/APIs**: no aplica — sin backend, servidor ni red (DD-01).
- **Dependencias futuras**: C-02 aplica CSS sobre estas clases/estructura; C-03 a C-06 agregan `js/` y consumen los contenedores, campos e IDs que este change deja previstos. Cambiar la estructura después obliga a retoques en todos los cambios posteriores, por eso se fija ahora.

## Preguntas abiertas relevantes (no se cierran en este change)

- **PA-05**: ¿multi-página (varios `.html`) o secciones en `index.html`? La consigna admite ambas; ver design.md (asunción documentada, reversible).
- **PA-07 / SU-05**: contenidos concretos (nombre de la librería, textos de mensajes, moneda de los precios) no están fijados por la consigna; quedan como supuestos de presentación en design.md.
