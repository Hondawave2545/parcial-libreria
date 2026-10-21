# Spec Delta — estructura-y-navegacion-html

## Purpose

Define la estructura HTML semántica de la interfaz de la librería: punto de entrada `index.html`, las 5 vistas (Catálogo, Libros, Clientes, Ventas, Historial), la navegación clara entre ellas, los formularios con etiquetas asociadas, las tablas con encabezados y los contenedores previstos para estados y mensajes. Es la base sobre la que se aplicarán estilos (C-02) y comportamiento JavaScript (C-03 a C-06).

## ADDED Requirements

### Requirement: Entrada del proyecto en index.html
El proyecto SHALL disponer de `index.html` como entrada obligatoria que puede abrirse directamente en el navegador (doble clic, sin servidor, sin npm, sin compilación) y presenta la aplicación de la librería.

#### Scenario: Apertura directa de index.html
- **WHEN** se abre `index.html` en un navegador desde el sistema de archivos
- **THEN** se muestra la interfaz de la librería con su navegación y vista de contenido, sin necesidad de servidor, instalaciones ni herramientas de compilación

### Requirement: Navegación clara entre las cinco vistas
La interfaz SHALL incluir una navegación clara y accesible desde `index.html` hacia las vistas: Catálogo, Libros, Clientes, Ventas e Historial.

#### Scenario: Acceso a las cinco vistas
- **WHEN** un usuario recorre la navegación principal
- **THEN** existen enlaces o controles identificables para Catálogo, Libros, Clientes, Ventas e Historial, y cada uno lleva a la vista correspondiente

### Requirement: Marcado semántico de la página
La página SHALL usar etiquetas semánticas: `header` con la identificación de la librería, `nav` con la navegación, `main` con el contenido de la vista activa y `footer` con el pie de página.

#### Scenario: Landmarks semánticos presentes
- **WHEN** se inspecciona el marcado de `index.html`
- **THEN** existen elementos `header`, `nav`, `main` y `footer`, y el contenido principal de las vistas reside dentro de `main`

### Requirement: Vista Catálogo con buscador y listado
La vista Catálogo SHALL mostrar el título de la librería, un campo de búsqueda por título y un contenedor de listado de libros. Cada libro del listado SHALL presentar título, ISBN, editorial, género, autores y precio.

#### Scenario: Estructura del catálogo
- **WHEN** se abre la vista Catálogo
- **THEN** se ven el título de la librería, un campo de búsqueda con su etiqueta y un contenedor de listado de libros cuyas columnas o campos son título, ISBN, editorial, género, autores y precio

### Requirement: Vista Libros con formulario de alta y listado
La vista Libros SHALL incluir un formulario de alta con campos para título, ISBN, precio, editorial, género y autores, más un contenedor del listado de libros registrados. El listado SHALL exponer las columnas editorial, género y autores, además de título, ISBN y precio.

#### Scenario: Estructura de la vista Libros
- **WHEN** se abre la vista Libros
- **THEN** se ve un formulario con los campos título, ISBN, precio, editorial, género y autores, un botón de alta con texto descriptivo y un contenedor del listado de libros

#### Scenario: Columnas del listado de libros registrados
- **WHEN** se inspecciona la tabla del listado de libros registrados
- **THEN** sus encabezados incluyen editorial, género y autores, además de título, ISBN y precio

### Requirement: Vista Clientes con formulario de alta y listado
La vista Clientes SHALL incluir un formulario de alta con campos para nombre completo y email (sin campo de apellido separado), más un contenedor del listado de clientes registrados.

#### Scenario: Estructura de la vista Clientes
- **WHEN** se abre la vista Clientes
- **THEN** se ve un formulario con los campos nombre completo y email, un botón de alta con texto descriptivo y un contenedor del listado de clientes

### Requirement: Vista Ventas con cliente, renglones y resumen
La vista Ventas SHALL incluir un selector de cliente, un selector de libro con su etiqueta y un campo de cantidad con su etiqueta (para elegir el libro y la cantidad a agregar), una zona de composición de renglones de venta (libro, cantidad, precio unitario, subtotal) y un contenedor de resumen de la venta con el total.

#### Scenario: Estructura de la vista Ventas
- **WHEN** se abre la vista Ventas
- **THEN** se ven un selector de cliente con su etiqueta, un selector de libro con su etiqueta y un campo de cantidad con su etiqueta junto a la acción de agregar renglón, una zona de renglones con encabezados de libro, cantidad, precio unitario y subtotal, un resumen con el total y botones con textos que describen sus acciones (por ejemplo, agregar renglón y confirmar venta)

### Requirement: Vista Historial con listado y detalle de ventas
La vista Historial SHALL incluir un contenedor del listado de ventas con identificador, fecha, cliente y total, más una zona destinada al detalle de la venta consultada.

#### Scenario: Estructura de la vista Historial
- **WHEN** se abre la vista Historial
- **THEN** se ve un listado de ventas con los encabezados identificador, fecha, cliente y total, y una zona reservada para mostrar el detalle de una venta

### Requirement: Etiqueta asociada en cada campo
Cada campo de formulario y de búsqueda SHALL tener una etiqueta (`label`) asociada que lo identifique.

#### Scenario: Campos etiquetados
- **WHEN** se inspeccionan los formularios de Catálogo, Libros, Clientes y Ventas
- **THEN** cada campo (texto, precio, cantidad, email, selector o selector múltiple) tiene una etiqueta asociada que describe su contenido, incluidos el selector de libro y el campo de cantidad de la vista Ventas

### Requirement: Campos numéricos sin validación nativa
Los campos de precio (Libros) y cantidad (Ventas) SHALL declararse como `type="text"` con `inputmode="decimal"` y `inputmode="numeric"` respectivamente, y los formularios de alta (Libros, Clientes) SHALL llevar el atributo `novalidate`, de modo que la validación quede reservada al JavaScript.

#### Scenario: Precio y cantidad sin `type="number"`
- **WHEN** se inspecciona el formulario de Libros y el de Ventas
- **THEN** el campo de precio es `type="text"` con `inputmode="decimal"` y el de cantidad es `type="text"` con `inputmode="numeric"`, ninguno de ellos `type="number"`

#### Scenario: Formularios de alta sin validación nativa
- **WHEN** se inspeccionan los formularios de alta de Libros y Clientes
- **THEN** ambos llevan el atributo `novalidate` y ningún campo usa `required`

### Requirement: Botones con texto descriptivo
Cada botón de la interfaz SHALL llevar un texto que describa su acción (por ejemplo, registrar libro, registrar cliente, agregar renglón, confirmar venta), sin depender solo de símbolos.

#### Scenario: Acciones identificables
- **WHEN** se revisan los botones de todas las vistas
- **THEN** cada botón tiene un texto legible que indica qué hace

### Requirement: Tablas con encabezados
Los listados y la composición de ventas SHALL presentarse en tablas con `thead` y celdas `th` que identifiquen cada columna.

#### Scenario: Encabezados de tabla presentes
- **WHEN** se inspeccionan las tablas de Catálogo, Libros, Clientes, Ventas e Historial
- **THEN** cada tabla tiene un `thead` con celdas `th` descriptivas para sus columnas

### Requirement: Contenedores previstos para estados y mensajes
La estructura SHALL dejar contenedores previstos (marcado y ubicación, sin lógica todavía) para: mensaje de lista vacía, mensaje de búsqueda sin resultados y mensaje de resultado de operación correcta o rechazada, allí donde corresponda según la vista. Además, junto a cada formulario de alta (Libros y Clientes) SHALL existir una lista de errores con `role="alert"`, distinta del mensaje de resultado de operación, destinada a recibir los errores de validación.

#### Scenario: Marcado de estados previsto
- **WHEN** se inspeccionan las vistas
- **THEN** existen elementos identificables destinados a mostrar, al menos: «lista vacía» en los listados, «sin resultados» en el catálogo tras buscar y «operación correcta o rechazada» junto a los formularios y la confirmación de venta

#### Scenario: Lista de errores con rol de alerta junto a los formularios
- **WHEN** se inspeccionan los formularios de alta de Libros y Clientes
- **THEN** junto a cada uno existe una lista (`ul`) con `role="alert"` y `hidden`, pensada para los errores de validación, separada del mensaje de resultado de operación

#### Scenario: Sin lógica de datos en este cambio
- **WHEN** se abre `index.html` sin JavaScript de datos cargado
- **THEN** la estructura, la navegación y los formularios son utilizables y comprensibles; los listados pueden mostrarse vacíos con su mensaje correspondiente y nada depende de librerías externas ni de red
