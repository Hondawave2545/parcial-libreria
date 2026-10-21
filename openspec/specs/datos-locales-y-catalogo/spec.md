# datos-locales-y-catalogo Specification

## Purpose

Define el modelo de datos local en memoria que alimenta el catálogo de la librería y el comportamiento de la vista Catálogo: renderizado de libros desde JavaScript con inserción segura como texto y filtro por título con sus estados de resultado.

## Requirements

### Requirement: Datos locales con identificadores estables
El sistema SHALL representar libros, editoriales, géneros, autores y clientes como arrays de objetos en memoria, donde cada registro posee un identificador estable y único dentro de su colección.

#### Scenario: Colecciones e identificadores presentes
- **WHEN** se inspeccionan los datos locales cargados por la página
- **THEN** existen las colecciones de libros, editoriales, géneros, autores y clientes, y cada registro tiene un identificador estable que no depende de su posición visible en pantalla

#### Scenario: Identificadores únicos por colección
- **WHEN** se recorren los registros de una misma colección
- **THEN** no hay dos registros con el mismo identificador

### Requirement: Seed inicial ficticio y coherente
El sistema SHALL iniciar con al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios, y cada libro SHALL referenciar una editorial existente y uno o más autores existentes; el género es opcional y, si está asignado, SHALL corresponder a un género existente.

#### Scenario: Cantidades mínimas del seed
- **WHEN** se abre la página por primera vez
- **THEN** los datos locales contienen al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes

#### Scenario: Relaciones coherentes de los libros
- **WHEN** se revisa cada libro del seed
- **THEN** su editorial referenciada existe, tiene al menos un autor referenciado que existe, y su género, si está presente, corresponde a un género existente

#### Scenario: Libro sin género
- **WHEN** se revisa el seed
- **THEN** existe al menos un libro sin género asignado, de modo que la presentación de «Sin clasificar» pueda comprobarse

### Requirement: Datos locales en memoria sin red ni administración de catálogos auxiliares
El sistema SHALL obtener los datos desde archivos locales cargados con la página, sin usar `fetch` ni ninguna petición de red, y NO SHALL ofrecer altas, bajas ni modificaciones de editoriales, géneros o autores.

#### Scenario: Carga sin peticiones de red
- **WHEN** se abre `index.html` con doble clic y se inspecciona la actividad de red del navegador
- **THEN** los datos se cargan desde los archivos locales del proyecto y no se realiza ninguna petición `fetch` ni solicitud remota

#### Scenario: Catálogos auxiliares de solo lectura
- **WHEN** se revisan las vistas de la interfaz
- **THEN** no existe ningún control para dar de alta, modificar o eliminar editoriales, géneros o autores

### Requirement: Renderizado del catálogo desde JavaScript
La vista Catálogo SHALL generar el listado de libros con JavaScript a partir del array de libros, mostrando para cada uno título, ISBN, editorial, género, autores y precio.

#### Scenario: Catálogo generado desde los datos
- **WHEN** se abre la página
- **THEN** la tabla del catálogo muestra una fila por cada libro de los datos locales, generada por JavaScript y no escrita de forma fija en el HTML

#### Scenario: Campos visibles por libro
- **WHEN** se observa una fila del catálogo
- **THEN** se muestran el título, el ISBN, el nombre de la editorial, el género, los nombres de los autores y el precio del libro

### Requirement: Presentación de género ausente
Cuando un libro no tiene género asignado, la vista Catálogo SHALL mostrar el texto «Sin clasificar» en su lugar.

#### Scenario: Libro sin género en el catálogo
- **WHEN** se renderiza un libro cuyo género no está asignado
- **THEN** la celda de género muestra «Sin clasificar» en lugar de un valor vacío o un identificador interno

### Requirement: Inserción de datos como texto en el DOM
El sistema SHALL insertar los datos del catálogo en el DOM como texto, sin interpretarlos como HTML.

#### Scenario: Caracteres especiales se muestran literalmente
- **WHEN** un título, nombre o precio contiene caracteres que podrían interpretarse como marcado HTML
- **THEN** el catálogo los muestra como texto visible y no crea elementos ni ejecuta contenido a partir de ellos

### Requirement: Filtro por título sin distinguir mayúsculas y con coincidencias parciales
El campo de búsqueda del catálogo SHALL filtrar los libros por título sin distinguir mayúsculas de minúsculas y aceptando coincidencias parciales en cualquier parte del título.

#### Scenario: Búsqueda en minúsculas encuentra título con mayúsculas
- **WHEN** el usuario escribe en minúsculas una parte de un título que en los datos tiene mayúsculas
- **THEN** el catálogo muestra los libros cuyo título coincide

#### Scenario: Coincidencia parcial
- **WHEN** el usuario escribe un fragmento que aparece en el medio o al inicio de un título
- **THEN** el catálogo muestra ese libro

### Requirement: Normalización de espacios en la búsqueda
El filtro SHALL eliminar los espacios sobrantes en los extremos del texto de búsqueda antes de comparar.

#### Scenario: Búsqueda con espacios extremos
- **WHEN** el usuario escribe un título rodeado de espacios al inicio o al final
- **THEN** el resultado es el mismo que el de la búsqueda sin esos espacios

### Requirement: Estado de búsqueda vacía
Cuando la búsqueda está vacía o contiene solo espacios, el catálogo SHALL mostrar todos los libros.

#### Scenario: Campo vacío
- **WHEN** el campo de búsqueda está vacío
- **THEN** el catálogo muestra todos los libros de los datos locales

#### Scenario: Solo espacios
- **WHEN** el campo de búsqueda contiene únicamente espacios
- **THEN** el catálogo muestra todos los libros de los datos locales

### Requirement: Estado sin coincidencias
Cuando la búsqueda no coincide con ningún título, el sistema SHALL mostrar un mensaje claro de que no hay resultados y NO SHALL mostrar una tabla vacía sin explicación.

#### Scenario: Búsqueda sin resultados
- **WHEN** el usuario escribe un texto que no coincide con ningún título
- **THEN** se muestra un mensaje textual que informa que no se encontraron libros y el listado queda sin filas

#### Scenario: El mensaje desaparece al haber resultados
- **WHEN** el usuario corrige la búsqueda y vuelve a haber coincidencias
- **THEN** el mensaje de sin resultados deja de mostrarse y el catálogo vuelve a listar los libros coincidentes

### Requirement: Estado de catálogo vacío
Cuando no existen libros en los datos locales, el sistema SHALL mostrar un mensaje claro de catálogo vacío en lugar de una tabla sin filas y sin explicación.

#### Scenario: Sin libros cargados
- **WHEN** el array de libros está vacío al renderizar el catálogo
- **THEN** se muestra un mensaje textual que informa que el catálogo no tiene libros

### Requirement: Funciones y eventos con responsabilidades reconocibles
El comportamiento del catálogo SHALL organizarse en funciones y manejadores de eventos acotados y con responsabilidades identificables, de modo que el renderizado, el filtrado y la actualización de estados puedan distinguirse entre sí.

#### Scenario: Búsqueda responde al evento de entrada
- **WHEN** el usuario escribe en el campo de búsqueda
- **THEN** el catálogo se actualiza como respuesta a ese evento sin recargar la página

#### Scenario: Responsabilidades separadas
- **WHEN** se revisa el código del catálogo
- **THEN** se identifican funciones diferenciadas para resolver los datos mostrados, construir o renderizar las filas y aplicar el filtro, sin una única función que concentre todo el comportamiento
