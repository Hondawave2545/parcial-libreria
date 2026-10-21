# Spec Delta — altas-de-libros-y-clientes

## Purpose

Define el comportamiento de los formularios de alta de libros y clientes: opciones generadas a partir de los datos locales, validaciones de unicidad y de relaciones, alta en memoria con identificadores estables y actualización sin recarga de los listados, el catálogo y las opciones relacionadas de la vista Ventas.

## ADDED Requirements

### Requirement: Opciones de los selectores del formulario de libro generadas desde los datos locales
El formulario de alta de libro SHALL poblar sus selectores de editorial, género y autores a partir de las colecciones de datos locales, ofreciendo la editorial y los autores como selección múltiple cuando corresponda y la opción «Sin clasificar» en el selector de género para representar la ausencia de género.

#### Scenario: Selectores poblados al abrir la página
- **WHEN** se abre la página
- **THEN** el selector de editorial muestra una opción por cada editorial existente, el de género muestra una opción por cada género existente más la opción «Sin clasificar», y el selector múltiple de autores muestra una opción por cada autor existente

#### Scenario: Opción Sin clasificar seleccionada
- **WHEN** el usuario registra un libro eligiendo «Sin clasificar» en el género
- **THEN** el libro queda guardado sin género asignado y el catálogo lo presenta con «Sin clasificar»

### Requirement: Validación de campos obligatorios del libro
El sistema SHALL rechazar el alta de un libro cuyo título o ISBN estén vacíos o contengan solo espacios.

#### Scenario: Título vacío
- **WHEN** el usuario envía el formulario de libro con el título vacío o con solo espacios
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

#### Scenario: ISBN vacío
- **WHEN** el usuario envía el formulario de libro con el ISBN vacío o con solo espacios
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

### Requirement: Unicidad del ISBN comparado sin espacios ni guiones
El sistema SHALL rechazar el alta de un libro cuyo ISBN ya exista en los datos locales, comparando ambos valores sin espacios ni guiones y sin distinguir mayúsculas de minúsculas; no se valida dígito de control.

#### Scenario: ISBN duplicado con formato diferente
- **WHEN** el usuario registra un libro con un ISBN que, al quitarle espacios y guiones, coincide con el de un libro existente
- **THEN** se muestra un mensaje de error indicando que el ISBN ya existe y el libro no se agrega

#### Scenario: ISBN con espacios y guiones equivalentes
- **WHEN** un libro existe con ISBN «978-3-16» y el usuario registra otro con «978 3 16»
- **THEN** el sistema detecta la duplicidad y rechaza el alta

### Requirement: Validación del precio del libro
El sistema SHALL rechazar el alta de un libro cuyo precio no sea numérico o no sea mayor que cero.

#### Scenario: Precio no numérico, cero o negativo
- **WHEN** el usuario envía el formulario de libro con un precio que no es un número o que es cero o negativo
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

### Requirement: Existencia de la editorial y de los autores del libro
El sistema SHALL rechazar el alta de un libro cuya editorial no exista en los datos locales o que no tenga al menos un autor seleccionado, o cuyo autor seleccionado no exista en los datos locales.

#### Scenario: Sin autores seleccionados
- **WHEN** el usuario envía el formulario de libro sin seleccionar ningún autor
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

#### Scenario: Editorial o autor inexistente
- **WHEN** el formulario de libro referencia una editorial o un autor que no existe en los datos locales
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

### Requirement: Género opcional pero existente si se asigna
El sistema SHALL aceptar un libro sin género asignado y SHALL rechazar el alta si el género asignado no corresponde a un género existente en los datos locales.

#### Scenario: Libro sin género
- **WHEN** el usuario elige «Sin clasificar»
- **THEN** el alta procede y el libro se guarda sin género

#### Scenario: Género inexistente
- **WHEN** el formulario de libro referencia un género que no existe en los datos locales
- **THEN** se muestra un mensaje de error asociado al formulario y el libro no se agrega

### Requirement: Validación de campos obligatorios del cliente
El sistema SHALL rechazar el alta de un cliente cuyo nombre completo o email estén vacíos o contengan solo espacios.

#### Scenario: Nombre o email vacío
- **WHEN** el usuario envía el formulario de cliente con el nombre completo o el email vacíos o con solo espacios
- **THEN** se muestran mensajes de error asociados al formulario y el cliente no se agrega

### Requirement: Formato válido del email del cliente
El sistema SHALL rechazar el alta de un cliente cuyo email no tenga un formato de email válido.

#### Scenario: Email con formato inválido
- **WHEN** el usuario envía el formulario de cliente con un email sin formato válido (por ejemplo, sin «@» ni dominio)
- **THEN** se muestra un mensaje de error asociado al formulario y el cliente no se agrega

### Requirement: Unicidad del email del cliente
El sistema SHALL rechazar el alta de un cliente cuyo email ya exista en los datos locales, comparando sin espacios exteriores y sin distinguir mayúsculas de minúsculas.

#### Scenario: Email existente en mayúsculas
- **WHEN** existe un cliente con email «lucia.ramirez@example.com» y el usuario registra « LUCIA.RAMIREZ@EXAMPLE.COM »
- **THEN** se muestra un mensaje de error indicando que el email ya existe y el cliente no se agrega

### Requirement: Envío de formularios controlado y alta condicionada a todas las validaciones
El envío de los formularios de alta SHALL controlarse con `preventDefault`, y el registro solo SHALL agregarse si todas las comprobaciones de validación pasan; los errores se muestran cerca del formulario que los originó.

#### Scenario: Formulario con errores
- **WHEN** el usuario envía un formulario con al menos una validación fallida
- **THEN** no se produce ninguna navegación ni recarga, se muestran los mensajes de error cerca del formulario correspondiente y no se agrega ningún registro

#### Scenario: Formulario válido
- **WHEN** el usuario envía un formulario donde todas las validaciones pasan
- **THEN** se agrega el registro, se limpian los mensajes de error y se muestra un mensaje de operación correcta

### Requirement: Alta en memoria con identificador estable
Al pasar las validaciones, el sistema SHALL agregar el libro o cliente a su colección de datos locales en memoria con un identificador nuevo, estable y único dentro de su colección, y con relaciones que referencian ids existentes de editorial, género y autores.

#### Scenario: Libro agregado con relaciones coherentes
- **WHEN** se registra un libro válido
- **THEN** el array de libros locales contiene el nuevo libro con un id que no existía previamente y con `idEditorial`, `idGenero` e `idsAutores` que corresponden a registros existentes

#### Scenario: Cliente agregado
- **WHEN** se registra un cliente válido
- **THEN** el array de clientes locales contiene el nuevo cliente con un id que no existía previamente, su nombre completo y su email tal como fueron normalizados

### Requirement: Actualización de listados y catálogo sin recargar la página
Tras un alta correcta, el sistema SHALL actualizar sin recargar la página el listado de la vista correspondiente (libros o clientes) y, en el caso de los libros, el catálogo, respetando el texto de búsqueda activo y sus estados de resultado.

#### Scenario: Libro registrado aparece en el listado y el catálogo
- **WHEN** se registra un libro válido
- **THEN** el listado de libros de la vista Libros y la tabla del catálogo muestran el libro nuevo sin recargar la página

#### Scenario: Catálogo respeta el filtro activo tras un alta
- **WHEN** el catálogo tiene un texto de búsqueda activo y se registra un libro cuyo título no coincide con esa búsqueda
- **THEN** el catálogo se vuelve a renderizar mostrando solo los libros que coinciden con el filtro activo, y el libro nuevo no aparece en esa vista filtrada

#### Scenario: Cliente registrado aparece en su listado
- **WHEN** se registra un cliente válido
- **THEN** el listado de clientes muestra el cliente nuevo sin recargar la página

### Requirement: Actualización de las opciones de la vista Ventas sin recargar la página
Tras un alta correcta, el sistema SHALL actualizar sin recargar la página las opciones de los selectores de cliente y de libro de la vista Ventas, incluyendo el registro nuevo.

#### Scenario: Libro disponible en la selección de venta
- **WHEN** se registra un libro válido
- **THEN** el selector de libro de la vista Ventas incluye el libro nuevo como opción, sin recargar la página

#### Scenario: Cliente disponible en la selección de venta
- **WHEN** se registra un cliente válido
- **THEN** el selector de cliente de la vista Ventas incluye el cliente nuevo como opción, sin recargar la página

### Requirement: Mensajes de listado vacío y de resultado de la operación
El sistema SHALL mostrar un mensaje claro cuando el listado de libros o de clientes de las vistas Libros y Clientes está vacío, y SHALL mostrar un mensaje de operación correcta junto al formulario tras cada alta exitosa, usando contenedores de mensaje accesibles y texto explícito, sin depender del color como única señal.

#### Scenario: Listado vacío
- **WHEN** la colección correspondiente (libros o clientes) no tiene registros al renderizar su listado
- **THEN** se muestra un mensaje textual que informa que no hay registros y la tabla queda sin filas

#### Scenario: Mensaje de éxito y limpieza de errores
- **WHEN** se completa un alta exitosa
- **THEN** se muestra un mensaje textual de operación correcta cerca del formulario, los mensajes de error previos dejan de mostrarse y el mensaje incluye texto explícito, no solo color

### Requirement: Sin administración de catálogos auxiliares ni edición o eliminación de registros
El sistema SHALL ofrecer únicamente el alta de libros y clientes; NO SHALL ofrecer controles para editar ni eliminar registros, ni para dar de alta, modificar o eliminar editoriales, géneros o autores.

#### Scenario: Formularios sin edición ni eliminación
- **WHEN** se revisan las vistas de la interfaz
- **THEN** los listados de libros y clientes muestran los datos sin acciones de edición ni eliminación, y no existe ningún control para administrar editoriales, géneros o autores

### Requirement: Funciones y eventos con responsabilidades reconocibles
El comportamiento de los formularios SHALL organizarse en funciones y manejadores de eventos acotados y con responsabilidades identificables, de modo que la población de opciones, la validación, el alta y la actualización de vistas puedan distinguirse entre sí.

#### Scenario: Responsabilidades separadas
- **WHEN** se revisa el código de los formularios
- **THEN** se identifican funciones diferenciadas para poblar opciones, validar cada formulario, agregar registros y actualizar los listados y selectores relacionados, sin una única función que concentre todo el comportamiento

#### Scenario: Inserción de datos como texto en el DOM
- **WHEN** los listados muestran títulos, nombres o emails proporcionados por el usuario
- **THEN** los valores se insertan como texto y caracteres que podrían interpretarse como marcado HTML se muestran literalmente, sin crear elementos ni ejecutar contenido
