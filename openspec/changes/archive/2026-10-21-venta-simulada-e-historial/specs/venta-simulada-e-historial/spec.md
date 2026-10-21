# Spec Delta — venta-simulada-e-historial

## Purpose

Definir el comportamiento de la venta simulada y de su historial: composición de una venta con cliente y renglones válidos, edición y recálculo de importes antes de confirmar, confirmación con registro de identificador, fecha, cliente, renglones y total con precio unitario copiado como valor histórico, e historial de ventas inmutable de solo lectura.

## ADDED Requirements

### Requirement: Composición de la venta con cliente existente y renglón válido
La vista Ventas SHALL permitir seleccionar un cliente existente y agregar renglones con un libro existente y una cantidad entera mayor que cero; cada renglón agregado SHALL quedar visible en la zona de composición.

#### Scenario: Renglón válido agregado a la venta
- **WHEN** el usuario selecciona un cliente existente, un libro existente y una cantidad entera mayor que cero y agrega el renglón
- **THEN** la zona de composición muestra una fila nueva con el libro, la cantidad, el precio unitario y el subtotal del renglón

#### Scenario: Libro inexistente
- **WHEN** el usuario intenta agregar un renglón sin haber elegido un libro o con un libro que no existe en los datos locales
- **THEN** se muestra un mensaje de error, no se agrega ningún renglón y la venta mantiene sus renglones previos

#### Scenario: Cantidad no entera o no mayor que cero
- **WHEN** el usuario intenta agregar un renglón con cantidad vacía, cero, negativa o decimal
- **THEN** se muestra un mensaje de error, no se agrega ningún renglón y la venta mantiene sus renglones previos

### Requirement: Rechazo del libro repetido dentro de la misma venta
El sistema SHALL informar el duplicado y NO SHALL crear un segundo renglón del mismo libro dentro de una misma venta.

#### Scenario: Libro ya presente en la venta
- **WHEN** el usuario intenta agregar un libro que ya tiene un renglón en la venta en borrador
- **THEN** se muestra un mensaje de error que informa el duplicado y la venta conserva un único renglón de ese libro

#### Scenario: Duplicado con cantidad distinta
- **WHEN** el usuario intenta agregar el mismo libro con una cantidad distinta a la del renglón existente
- **THEN** se rechaza el intento, no se crea una fila adicional y el renglón existente conserva su cantidad

### Requirement: Edición de cantidades y eliminación de renglones antes de confirmar
Antes de confirmar la venta, el sistema SHALL permitir cambiar la cantidad de cada renglón y quitar renglones, recalculando los importes en vivo.

#### Scenario: Cambio de la cantidad de un renglón
- **WHEN** el usuario cambia la cantidad de un renglón por un valor entero mayor que cero
- **THEN** el subtotal de ese renglón y el total de la venta se actualizan inmediatamente

#### Scenario: Renglón quitado
- **WHEN** el usuario quita un renglón de la zona de composición
- **THEN** el renglón desaparece de la tabla y el total de la venta se recalcula con los renglones restantes

### Requirement: Contenido visible de cada renglón
Cada renglón de la venta SHALL mostrar el libro, la cantidad, el precio unitario y el subtotal.

#### Scenario: Columnas del renglón
- **WHEN** se observa una fila de la zona de composición de renglones
- **THEN** se ven el título del libro, la cantidad, el precio unitario y el subtotal del renglón

### Requirement: Cálculo de subtotales y total con dos decimales
El subtotal de un renglón SHALL ser el producto de su cantidad por su precio unitario, el total de la venta SHALL ser la suma de los subtotales y todos los importes SHALL presentarse con dos decimales.

#### Scenario: Cálculo de referencia de la consigna
- **WHEN** el usuario agrega 2 unidades de un libro de precio 1500 y 1 unidad de un libro de precio 2000
- **THEN** los subtotales se muestran como 3000.00 y 2000.00 y el total de la venta se muestra como 5000.00

#### Scenario: Todos los importes con dos decimales
- **WHEN** se observa el precio unitario, el subtotal o el total de la venta
- **THEN** el importe se presenta siempre con dos decimales, con punto como separador decimal

### Requirement: Validaciones que bloquean la confirmación
El sistema SHALL impedir confirmar una venta sin cliente, sin renglones o con cantidades inválidas, y SHALL mostrar los rechazos en un contenedor de errores cercano a los controles de composición.

#### Scenario: Confirmación sin cliente
- **WHEN** el usuario confirma una venta sin haber seleccionado un cliente
- **THEN** se muestra un mensaje de error, no se registra ninguna venta y la venta en borrador se conserva

#### Scenario: Confirmación sin renglones
- **WHEN** el usuario confirma una venta sin ningún renglón
- **THEN** se muestra un mensaje de error, no se registra ninguna venta y la venta en borrador se conserva

#### Scenario: Confirmación con cantidad inválida
- **WHEN** el usuario confirma una venta en la que alguna cantidad no es un entero mayor que cero
- **THEN** se muestra un mensaje de error, el renglón inválido queda marcado visualmente y no se registra ninguna venta

### Requirement: Registro de la venta al confirmar
Al confirmar una venta válida, el sistema SHALL registrar la venta con un identificador nuevo y único, la fecha de la confirmación, el cliente, los renglones y el total.

#### Scenario: Venta registrada
- **WHEN** el usuario confirma una venta con cliente, al menos un renglón y cantidades válidas
- **THEN** el historial contiene una venta con identificador, fecha, cliente, renglones y total

#### Scenario: Identificadores correlativos y únicos
- **WHEN** el usuario confirma dos ventas en la misma sesión
- **THEN** cada venta registrada tiene un identificador distinto y correlativo (por ejemplo, `ven-01` y `ven-02`)

### Requirement: Precio unitario histórico copiado al renglón
El precio unitario SHALL copiarse al renglón como valor propio en el momento de la composición y SHALL conservarse al confirmar; el historial y el detalle NO SHALL releer el precio del catálogo.

#### Scenario: El precio del catálogo cambia después de la venta
- **WHEN** el precio de un libro del catálogo cambia después de confirmada una venta y se consulta esa venta en el historial
- **THEN** el detalle muestra el precio unitario, los subtotales y el total originales de la venta

#### Scenario: Datos descriptivos conservados en el renglón
- **WHEN** se consulta el detalle de una venta
- **THEN** cada renglón muestra el título y el ISBN del libro tal como estaban al confirmar la venta, sin necesidad de consultar el catálogo

### Requirement: Historial de ventas con identificador, fecha, cliente y total
La vista Historial SHALL listar las ventas registradas mostrando identificador, fecha, cliente y total, y SHALL permitir consultar los renglones de una venta desde la venta guardada.

#### Scenario: Listado del historial
- **WHEN** el usuario abre la vista Historial con ventas registradas
- **THEN** el listado muestra una fila por venta con su identificador, fecha, cliente y total

#### Scenario: Consulta del detalle de una venta
- **WHEN** el usuario pide ver el detalle de una venta del historial
- **THEN** la zona de detalle muestra el identificador, la fecha, el cliente, el total y los renglones leídos desde la venta guardada

#### Scenario: Historial sin ventas
- **WHEN** no hay ninguna venta registrada
- **THEN** se muestra un mensaje textual que informa que no hay ventas registradas y el listado queda sin filas

### Requirement: Inmutabilidad de las ventas confirmadas
Las ventas confirmadas NO SHALL ser editables ni eliminables desde la interfaz, y sus datos registrados no SHALL alterarse.

#### Scenario: Interfaz sin controles de edición ni eliminación
- **WHEN** se revisa la vista Historial y el detalle de una venta
- **THEN** no existe ningún control para editar o eliminar una venta confirmada

#### Scenario: Los datos de la venta no se alteran
- **WHEN** el usuario interactúa con la aplicación después de confirmar una venta
- **THEN** los renglones y el total de esa venta conservan los valores registrados al confirmarla

### Requirement: Limpieza del formulario y mensaje de resultado tras confirmar
Tras una confirmación correcta, el sistema SHALL mostrar un mensaje de resultado y SHALL limpiar la vista de composición para permitir una nueva venta.

#### Scenario: Mensaje de resultado y formulario limpio
- **WHEN** el usuario confirma una venta válida
- **THEN** se muestra un mensaje con el identificador y el total de la venta, el selector de cliente y el de libro vuelven a su opción inicial, el campo de cantidad queda vacío, la tabla de renglones queda vacía y el total vuelve a 0.00

#### Scenario: La venta recién confirmada aparece en el historial
- **WHEN** el usuario confirma una venta y luego abre la vista Historial sin recargar la página
- **THEN** la venta recién confirmada aparece en el listado del historial

### Requirement: Venta simulada sin stock, cobros ni facturación
La venta SHALL registrar solamente cantidades, precios y total; el sistema NO SHALL gestionar stock, cobros ni facturación fiscal.

#### Scenario: La interfaz no ofrece operaciones de stock ni de cobro
- **WHEN** se revisan las vistas Ventas e Historial
- **THEN** no existe ningún control de descuento de stock, de cobro ni de emisión de comprobante fiscal

### Requirement: Mensajes de rechazo y de estado con texto explícito
Los mensajes de error, de resultado y de estado vacío SHALL comunicar su significado con texto explícito, sin depender únicamente del color, y los errores de la vista Ventas SHALL presentarse en un contenedor situado junto a los controles de composición.

#### Scenario: Error identificable sin distinguir colores
- **WHEN** se rechaza una operación de la vista Ventas
- **THEN** el mensaje identifica claramente que se trata de un error, aun percibiendo la página en escala de grises

#### Scenario: Errores junto a los controles de composición
- **WHEN** el usuario interactúa con la zona de composición de la venta
- **THEN** los mensajes de rechazo aparecen en un contenedor de errores identificable dentro de la vista Ventas, próximo a los controles que los originan

### Requirement: Inserción de datos como texto en el DOM
El sistema SHALL insertar los datos de la venta y del historial en el DOM como texto, sin interpretarlos como HTML.

#### Scenario: Caracteres especiales se muestran literalmente
- **WHEN** un título, nombre de cliente o identificador contiene caracteres que podrían interpretarse como marcado HTML
- **THEN** el renglón y la fila del historial los muestran como texto visible y no crean elementos ni ejecutan contenido a partir de ellos

### Requirement: Funciones y eventos con responsabilidades reconocibles
El comportamiento de ventas e historial SHALL organizarse en funciones y manejadores de eventos acotados y con responsabilidades identificables, de modo que la composición, el cálculo, la confirmación y la consulta del historial puedan distinguirse entre sí.

#### Scenario: Responsabilidades separadas
- **WHEN** se revisa el código de la venta y del historial
- **THEN** se identifican funciones diferenciadas para agregar renglones, calcular importes, confirmar la venta, listar las ventas y mostrar el detalle, sin una única función que concentre todo el comportamiento

#### Scenario: Actualización del historial sin recargar la página
- **WHEN** el usuario confirma una venta
- **THEN** el historial se actualiza mostrando la venta nueva sin recargar la página
