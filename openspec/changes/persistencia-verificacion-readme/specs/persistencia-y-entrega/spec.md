# Spec Delta — persistencia-y-entrega

## Purpose

Definir la conservación de libros, clientes y ventas en el almacenamiento local del navegador y su recuperación al reabrir la aplicación sin duplicar los datos de ejemplo, junto con la entrega documentada mediante un `README.md` que incluya los contenidos exigidos, el registro de los 8 casos manuales de la consigna y la guía de la comprobación guiada del precio histórico.

## ADDED Requirements

### Requirement: Conservación de libros, clientes y ventas en el almacenamiento local
El sistema SHALL conservar en el almacenamiento local del navegador los libros, clientes y ventas registrados por el usuario, y SHALL recuperarlos al volver a abrir la aplicación.

#### Scenario: Registros recuperados tras reabrir la aplicación
- **WHEN** el usuario registra un libro, un cliente y una venta, cierra el navegador y vuelve a abrir la aplicación
- **THEN** el catálogo, el listado de clientes y el historial muestran esos mismos registros

#### Scenario: El contenido guardado sobrevive al cierre del navegador
- **WHEN** el usuario cierra por completo el navegador y vuelve a abrir la página de entrada
- **THEN** los registros guardados siguen disponibles sin volver a escribirlos

### Requirement: Carga de los datos de ejemplo en el primer inicio
En la primera apertura, cuando no existe un catálogo guardado, el sistema SHALL cargar los datos de ejemplo —libros y clientes— y SHALL dejar la colección de ventas vacía.

#### Scenario: Primera apertura sin catálogo guardado
- **WHEN** el usuario abre la aplicación por primera vez en un navegador sin datos guardados
- **THEN** el catálogo muestra los libros de ejemplo y el listado de clientes muestra los clientes de ejemplo

#### Scenario: La primera apertura no inventa ventas
- **WHEN** el usuario abre la aplicación por primera vez y abre la vista de historial
- **THEN** el historial se muestra vacío y no existe ninguna venta registrada

### Requirement: Recuperación de los registros guardados sin duplicar los datos iniciales
Al reabrir la aplicación con un catálogo guardado, el sistema SHALL reemplazar los datos de ejemplo por los registros guardados, de modo que los datos iniciales NO se dupliquen.

#### Scenario: Reapertura tras un alta de libro
- **WHEN** el usuario registra un libro, recarga la página y vuelve a mirar el catálogo
- **THEN** el catálogo muestra el libro registrado una sola vez junto a los ejemplos, sin filas repetidas

#### Scenario: Reapertura repetida sin acumulación
- **WHEN** el usuario recarga la página varias veces después de registrar un cliente
- **THEN** la cantidad de libros y de clientes se mantiene igual y ninguno de los ejemplos aparece duplicado

### Requirement: Clave y estructura del catálogo guardado definidas y documentadas
El sistema SHALL definir una clave única y una estructura de contenido para el catálogo guardado, y el `README.md` SHALL documentar esa clave, la estructura del contenido y la forma de localizar el precio de un libro dentro de ella.

#### Scenario: La clave del catálogo guardado está documentada
- **WHEN** el lector busca en el `README.md` la ubicación del catálogo guardado
- **THEN** encuentra el nombre exacto de la clave y las herramientas del navegador donde se puede inspeccionar

#### Scenario: La estructura permite localizar el precio de un libro
- **WHEN** el docente sigue las instrucciones del `README.md` y abre el contenido guardado con las herramientas de almacenamiento del navegador
- **THEN** puede identificar el libro buscado y leer o modificar su precio sin tocar las ventas

### Requirement: Funcionamiento y límites del almacenamiento local explicados en el README
El `README.md` SHALL explicar cómo funciona el almacenamiento local y sus límites: depende del navegador, del perfil y de la ubicación de apertura de la página, no comparte información entre usuarios y puede no estar disponible.

#### Scenario: El README explica de qué depende el almacenamiento
- **WHEN** el lector busca en el `README.md` la sección sobre el almacenamiento local
- **THEN** encuentra que depende del navegador, del perfil y de la ubicación de apertura de la página

#### Scenario: El README advierte que no se comparte información entre usuarios
- **WHEN** el lector busca los límites del almacenamiento local en el `README.md`
- **THEN** encuentra que los datos no se comparten entre usuarios ni entre equipos

### Requirement: README de entrega con los contenidos exigidos
El `README.md` SHALL indicar los pasos para abrir la página de entrada sin npm, la navegación entre vistas, las funcionalidades implementadas y las pendientes, la ubicación de los datos iniciales, la procedencia de imágenes ajenas si existen y quiénes realizan el trabajo.

#### Scenario: Apertura sin npm
- **WHEN** el lector sigue los pasos de apertura que documenta el `README.md`
- **THEN** encuentra que la página de entrada se abre con doble clic en el navegador, sin instalar dependencias ni ejecutar npm

#### Scenario: Autores, funcionalidades y datos iniciales declarados
- **WHEN** el docente revisa el `README.md` de la entrega
- **THEN** encuentra quiénes realizan el trabajo, las funcionalidades implementadas y las pendientes, la navegación entre vistas y la ubicación de los datos iniciales

### Requirement: Registro de los casos manuales con resultado esperado y resultado observado
El `README.md` SHALL registrar los 8 casos manuales de la consigna con su resultado esperado y su resultado observado, y NO SHALL presentar ningún caso como aprobado sin que se haya ejecutado.

#### Scenario: Los ocho casos están registrados
- **WHEN** el docente recorre el `README.md` buscando el registro de pruebas
- **THEN** encuentra los 8 casos de la consigna con su resultado esperado y su resultado observado

#### Scenario: Ningún caso se declara aprobado sin ejecutarse
- **WHEN** el resultado observado de un caso todavía no fue completado
- **THEN** el `README.md` lo muestra como pendiente y no lo presenta como aprobado

### Requirement: Comprobación guiada del precio histórico sin pantalla de edición de precios
El `README.md` SHALL describir la comprobación guiada del precio histórico en una copia del proyecto —modificando únicamente el precio dentro del catálogo guardado con las herramientas de almacenamiento del navegador, sin tocar las ventas— y el sistema NO SHALL ofrecer ninguna pantalla de edición de precios.

#### Scenario: La guía describe la comprobación guiada
- **WHEN** el docente sigue la guía de la comprobación guiada documentada en el `README.md`
- **THEN** confirma una venta, anota sus importes, modifica solo el precio del libro en el catálogo guardado —guardándolo como número, sin comillas—, recarga y el detalle conserva los importes confirmados

#### Scenario: No existe pantalla de edición de precios
- **WHEN** se revisan las cinco vistas de la aplicación
- **THEN** no existe ninguna pantalla ni ningún control para editar los precios del catálogo

### Requirement: Continuidad de la aplicación cuando el almacenamiento local no está disponible o es inválido
Cuando el almacenamiento local no esté disponible o su contenido no sea válido, el sistema SHALL seguir funcionando con los datos de la sesión y SHALL volver a los datos de ejemplo, sin interrumpir la aplicación.

#### Scenario: Almacenamiento local no disponible
- **WHEN** el navegador bloquea el almacenamiento local para la página abierta desde el sistema de archivos
- **THEN** la aplicación sigue funcionando con los datos de la sesión y el `README.md` explica ese límite

#### Scenario: Contenido guardado inválido
- **WHEN** el contenido guardado está corrupto o corresponde a una versión distinta
- **THEN** el sistema lo descarta, vuelve a los datos de ejemplo y la aplicación se puede seguir usando

#### Scenario: Contenido guardado con registros mal formados
- **WHEN** el contenido guardado es válido como JSON pero algún registro no cumple la forma esperada —por ejemplo, un libro con el precio como texto, o una venta con un renglón sin subtotal—
- **THEN** el sistema descarta todo el contenido guardado, vuelve a los datos de ejemplo y lo avisa en la consola

### Requirement: Entrega sin dependencias instaladas, sin herramientas de compilación y sin tests automatizados
La entrega SHALL reunir la página de entrada, los demás HTML si corresponden, las carpetas de CSS, JavaScript y recursos locales y el `README.md`, sin dependencias instaladas ni herramientas de compilación, y el proyecto NO SHALL incluir frameworks de testing ni archivos de tests automatizados.

#### Scenario: Contenido de la carpeta entregada
- **WHEN** se revisa la carpeta o el comprimido de la entrega
- **THEN** contiene la página de entrada, los demás HTML si corresponde, las carpetas de CSS, JavaScript y recursos locales y el `README.md`, sin carpetas de dependencias instaladas

#### Scenario: No hay tests automatizados
- **WHEN** se recorre el proyecto buscando configuración de pruebas
- **THEN** no existe ningún framework de testing, ningún archivo de tests automatizados ni ninguna configuración de runner
