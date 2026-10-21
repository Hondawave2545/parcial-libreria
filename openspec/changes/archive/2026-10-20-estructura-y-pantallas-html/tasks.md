# Tasks — estructura-y-pantallas-html (C-01)

> Todo es HTML puro: sin CSS embebido, sin `<style>`, sin `<script>`, sin librerías, CDNs ni referencias a archivos inexistentes (`css/`, `js/` se agregan en C-02/C-03). Convenciones de ids según design.md (D3). Verificación manual abriendo `index.html` con doble clic en el navegador.

## 1. Esqueleto base y navegación de index.html

- [x] 1.1 Crear `index.html` en la raíz con doctype, `<html lang="es">`, `<head>` con `charset` y `viewport`, y título de la librería — verificación: el archivo abre con doble clic sin errores y muestra el título en la pestaña
- [x] 1.2 Agregar `header` con el nombre de la librería (texto de trabajo, PA-07), `nav` con 5 enlaces (`#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`) y `footer` — verificación: inspeccionando el HTML existen `header`, `nav` y `footer`, y los 5 enlaces apuntan a los ids de sus vistas
- [x] 1.3 Crear `main` con las 5 secciones (`<section id="catalogo">`, `#libros`, `#clientes`, `#ventas`, `#historial`), cada una con un título (`h2`) visible — verificación: al abrir la página se leen las 5 vistas y cada enlace del nav lleva a su sección

## 2. Vista Catálogo

- [x] 2.1 En `#catalogo`: campo de búsqueda (`input type="text"` con `id="busqueda-titulo"`) con `<label>` asociada — verificación: el campo tiene etiqueta asociada (for/id) que lo describe
- [x] 2.2 Agregar tabla del listado con `thead`/`th` de título, ISBN, editorial, género, autores y precio, y `<tbody id="listado-libros">` vacío — verificación: la tabla tiene encabezados descriptivos y el tbody existe vacío (los datos llegan en C-03)
- [x] 2.3 Agregar los mensajes previstos: `#mensaje-catalogo-vacio` (lista vacía) y `#mensaje-sin-resultados` (búsqueda sin resultados), ambos `<p>` con `hidden` junto al listado — verificación: los dos elementos existen en el HTML de la sección, con `hidden`

## 3. Vista Libros

- [x] 3.1 Crear `#form-alta-libro` con `novalidate` y campos etiquetados: título (text), ISBN (text), precio (`type="text"` con `inputmode="decimal"`, **no** `type="number"`), editorial (`select`), género (`select`) y autores (`select multiple`), este último con `label` que aclara la selección múltiple — verificación: el form lleva `novalidate`, cada campo tiene `label` asociada, el precio es `type="text" inputmode="decimal"` y los selectores existen vacíos (opciones las genera C-04)
- [x] 3.2 Agregar botón `type="submit"` dentro del form con texto descriptivo (p. ej. «Registrar libro») — verificar: el botón se lee como acción, no solo símbolo
- [x] 3.3 Agregar tabla del listado de libros registrados con `thead`/`th` (título, ISBN, editorial, género, autores, precio) y `<tbody id="listado-libros-registrados">` vacío, más `#mensaje-libros-vacios` (hidden) cerca del listado, `#mensaje-resultado-libro` (hidden, resultado de la operación) y la lista `#errores-libro` (`<ul role="alert" hidden>`) cerca del formulario — verificación: tabla con encabezados (incluidas editorial, género y autores), y el mensaje de vacío, el de resultado y la lista de errores existen en la sección

## 4. Vista Clientes

- [x] 4.1 Crear `#form-alta-cliente` con `novalidate` y campos etiquetados: nombre completo (text) y email (type="email"), sin campo de apellido — verificación: el form lleva `novalidate`, dos campos con `label` asociada y sin campo de apellido (RN-CLI-01)
- [x] 4.2 Agregar botón `type="submit"` con texto descriptivo (p. ej. «Registrar cliente») — verificación: el botón describe su acción
- [x] 4.3 Agregar tabla del listado de clientes con `thead`/`th` (nombre completo, email) y `<tbody id="listado-clientes">` vacío, más `#mensaje-clientes-vacios` (hidden) cerca del listado, `#mensaje-resultado-cliente` (hidden, resultado de la operación) y la lista `#errores-cliente` (`<ul role="alert" hidden>`) cerca del formulario — verificación: encabezados y los tres elementos (vacío, resultado, errores) presentes en la sección

## 5. Vista Ventas

- [x] 5.1 Agregar selector de cliente (`#select-cliente`, select con label, vacío por ahora); junto al botón `type="button"` «Agregar renglón», agregar selector de libro (`#select-libro-venta`, select con label, vacío por ahora) y campo de cantidad (`#input-cantidad-venta`, `type="text"` con `inputmode="numeric"`, con label) — verificación: selector de cliente, selector de libro y campo de cantidad tienen etiqueta; el botón describe la acción; la cantidad es `type="text" inputmode="numeric"` (no `number`)
- [x] 5.2 Agregar tabla `#renglones-venta` con `thead`/`th` de libro, cantidad, precio unitario, subtotal y una columna para quitar renglón (con botón `type="button"` texto «Quitar»), `<tbody>` vacío — verificación: encabezados completos según RN-VEN-04 y el tbody existe
- [x] 5.3 Agregar `#resumen-venta` con el total (`#total-venta`, texto inicial «Total: 0.00» o vacío) y botón `type="button"` «Confirmar venta», más `#mensaje-resultado-venta` (hidden) para el resultado de la operación — verificación: resumen, total y botón presentes; el mensaje existe con `hidden`

## 6. Vista Historial

- [x] 6.1 Agregar tabla `#listado-historial` con `thead`/`th` de identificador, fecha, cliente y total (y columna «Ver detalle» con botón `type="button"` texto descriptivo), `<tbody>` vacío — verificación: encabezados según RN-VEN-09 y tbody presente
- [x] 6.2 Agregar `#detalle-venta` como zona reservada (sección con título «Detalle de la venta», contenido vacío) y `#mensaje-historial-vacio` (hidden) — verificación: la zona de detalle y el mensaje existen en la sección

## 7. Verificación integral del HTML

- [x] 7.1 Recorrer todas las vistas y confirmar: cada campo con `label` asociada (incluidos selector de libro y cantidad en Ventas), cada botón con texto descriptivo, cada tabla con `thead`/`th` (listado de libros con editorial, género y autores), los formularios de alta con `novalidate`, precio `type="text" inputmode="decimal"` y cantidad `type="text" inputmode="numeric"`, y los mensajes/estados previstos presentes con `hidden` (incluidas las listas `role="alert"` de errores) — verificación: inspección manual del HTML coincide con el spec delta (RN-FORM-06, RN-FORM-07)
- [x] 7.2 Confirmar que `index.html` no contiene `<style>`, CSS inline, `<script>`, `<link>` a css ni referencias a CDNs/librerías, y que la navegación por teclado llega a los 5 enlaces del nav — verificación: búsqueda en el archivo y recorrido con Tab en el navegador sin errores en consola

## Workflow follow-up

- Archivar el change con `/opsx archive` cuando el review del Ejercicio 1 esté conforme, y marcar el checkbox de C-01 en `CHANGES.md`.
