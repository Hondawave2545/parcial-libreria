# Reglas de Negocio

Cada regla tiene un código único `RN-{DOMINIO}-{NN}` para trazabilidad. Todas provienen de la consigna del Parcial 1.

## Dominio: Catálogo y filtro (RN-CAT)

- **RN-CAT-01**: El catálogo se genera con JavaScript a partir del array de libros. Cada libro muestra título, ISBN, editorial, género, autores y precio.
- **RN-CAT-02**: Si un libro no tiene género asignado, se muestra «Sin clasificar».
- **RN-CAT-03**: El filtro por título ignora diferencias entre mayúsculas y minúsculas.
- **RN-CAT-04**: El filtro por título busca coincidencias parciales.
- **RN-CAT-05**: El filtro elimina espacios sobrantes en los extremos de la búsqueda (trim).
- **RN-CAT-06**: Una búsqueda vacía muestra todo el catálogo.
- **RN-CAT-07**: Una búsqueda sin coincidencias muestra un mensaje claro.

## Dominio: Datos locales (RN-DAT)

- **RN-DAT-01**: Libros, editoriales, géneros, autores y clientes se representan mediante arrays y objetos con identificadores estables.
- **RN-DAT-02**: El conjunto inicial incluye al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios.
- **RN-DAT-03**: Cada libro se relaciona con una editorial existente y uno o más autores existentes; el género es opcional y, si se asigna, corresponde a un género existente.
- **RN-DAT-04**: No se requiere traer datos con `fetch` ni administrar altas, bajas y modificaciones de editoriales, géneros o autores.
- **RN-DAT-05**: Los datos escritos por usuarios se insertan como texto en el DOM (no como HTML).
- **RN-DAT-06**: Se utilizan eventos y funciones con responsabilidades reconocibles.

## Dominio: Alta de libros (RN-LIB)

- **RN-LIB-01**: El formulario registra título, ISBN, precio y las relaciones con editorial, género y autores; las opciones se generan a partir de los datos locales (editorial y género en selectores; autores en selector múltiple o controles equivalentes).
- **RN-LIB-02**: El selector de género incluye la opción «Sin clasificar», que representa la ausencia de género.
- **RN-LIB-03**: Título e ISBN no deben estar vacíos.
- **RN-LIB-04**: El ISBN no debe existir en el conjunto local; se compara **sin espacios ni guiones** y no se requiere dígito de control.
- **RN-LIB-05**: El precio debe ser numérico y mayor que cero.
- **RN-LIB-06**: La editorial y todos los autores seleccionados deben existir en los datos locales; se selecciona al menos un autor.
- **RN-LIB-07**: El género puede quedar sin asignar; si se asigna, debe existir en los datos locales.

## Dominio: Alta de clientes (RN-CLI)

- **RN-CLI-01**: El formulario registra nombre completo y email; no se requiere un campo de apellido separado.
- **RN-CLI-02**: Nombre completo y email no deben estar vacíos.
- **RN-CLI-03**: El email debe tener formato válido.
- **RN-CLI-04**: No puede existir otro cliente con el mismo email; la comparación es sin espacios exteriores y sin distinguir mayúsculas de minúsculas.

## Dominio: Envío de formularios y actualización (RN-FORM)

- **RN-FORM-01**: El envío se controla con `preventDefault`.
- **RN-FORM-02**: Los errores se muestran cerca del formulario.
- **RN-FORM-03**: Solo se agrega el registro si todas las comprobaciones pasan.
- **RN-FORM-04**: Tras un alta correcta, el listado y las opciones relacionadas se actualizan **sin recargar la página**.
- **RN-FORM-05**: No se exige editar ni eliminar registros.
- **RN-FORM-06**: Cada campo posee una etiqueta asociada; los botones tienen textos que describen su acción; las tablas incluyen encabezados.
- **RN-FORM-07**: Deben existir mensajes para listas vacías, búsquedas sin resultados y operaciones correctas o rechazadas.

## Dominio: Ventas (RN-VEN)

- **RN-VEN-01**: La venta selecciona un cliente existente y agrega al menos un renglón con un libro existente y una cantidad **entera mayor que cero**.
- **RN-VEN-02**: No se admiten libros repetidos dentro de la misma venta: se modifica la cantidad del renglón existente **o** se informa el duplicado (ambas estrategias admitidas por la consigna; ver PA-06).
- **RN-VEN-03**: Antes de confirmar, se permite cambiar cantidades y quitar renglones.
- **RN-VEN-04**: Cada renglón muestra libro, cantidad, precio unitario y subtotal.
- **RN-VEN-05**: Subtotal = cantidad × precio unitario; total = suma de subtotales; los importes se presentan con **dos decimales**.
- **RN-VEN-06**: Se impide confirmar una venta sin cliente, sin renglones o con cantidades inválidas.
- **RN-VEN-07**: Al confirmar, se registra identificador, fecha, cliente, renglones y total.
- **RN-VEN-08**: El precio unitario se copia al renglón como **valor histórico**: al consultar el historial no se obtiene nuevamente desde el precio actual del catálogo. Se conservan también los datos descriptivos necesarios para leer esa venta.
- **RN-VEN-09**: El historial muestra identificador, fecha, cliente y total, y permite consultar los renglones.
- **RN-VEN-10**: Las ventas confirmadas no se editan ni eliminan desde la interfaz.
- **RN-VEN-11**: La confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado.

## Dominio: Persistencia (RN-PER)

- **RN-PER-01**: Se utiliza `localStorage` para conservar libros, clientes y ventas.
- **RN-PER-02**: En el primer inicio se cargan los ejemplos; al volver a abrir se recuperan los registros guardados **sin duplicar** los datos iniciales.
- **RN-PER-03**: El README explica que el almacenamiento depende del navegador, del perfil y de la ubicación de apertura, y que no comparte información entre usuarios.
- **RN-PER-04**: La ubicación y estructura del catálogo guardado se identifican en el README para reproducir la comprobación del precio histórico.

## Dominio: Verificación y entrega (RN-ENT)

- **RN-ENT-01**: Se registran en el README los resultados observados de los **8 casos manuales** de la consigna (búsqueda, ISBN duplicado, emails, venta inválida, venta 3000/2000/5000, precio histórico, recarga, teclado y anchos). Si un caso falla o queda pendiente, se registra el comportamiento real: **no se indica una prueba como aprobada sin ejecutarla**.
- **RN-ENT-02**: La comprobación del precio histórico se realiza de forma **guiada por el docente** en una copia del proyecto y con datos de prueba (se confirma una venta, se anotan sus importes, se modifica únicamente el precio del libro dentro del catálogo guardado con las herramientas de almacenamiento del navegador, sin modificar ni borrar las ventas, se recarga y se consulta el detalle).
- **RN-ENT-03**: No se exige una pantalla para editar precios.
- **RN-ENT-04**: Entrega = carpeta o comprimido con `index.html`, los demás HTML si corresponden, carpetas de CSS, JavaScript y recursos locales, y `README.md`; sin dependencias instaladas ni herramientas de compilación.
- **RN-ENT-05**: El README identifica a quienes realizan el trabajo y contiene: pasos para abrir `index.html` sin npm; navegación entre vistas; funcionalidades implementadas y pendientes; ubicación de los datos iniciales; funcionamiento y límites de `localStorage`; resultados de los casos manuales; procedencia de imágenes ajenas, si existen.
- **RN-ENT-06**: La entrega reúne el alcance completo del parcial. El docente comunica por separado las fechas, el canal de entrega y la modalidad de trabajo (ver PA-01).

## Dominio: Excepciones globales

- **RN-GLO-01**: Se evalúa el funcionamiento observado y la correspondencia entre interfaz, datos y documentación; la maqueta facilita el uso de las operaciones pero **el diseño no reemplaza las validaciones**.
- **RN-GLO-02**: Se valora código legible, nombres comprensibles, funciones acotadas y separación entre estructura, estilos y comportamiento.
- **RN-GLO-03**: El uso de librerías o frameworks **incumple el alcance técnico** y se informa en la evaluación; la consigna no fija penalizaciones adicionales ni un mínimo de aprobación.
- **RN-GLO-04**: Las validaciones y el almacenamiento del navegador sirven para la práctica; no representan seguridad ni integridad garantizada por un servidor.
- **RN-GLO-05**: La venta es simulada: registra cantidades y precios para obtener un total, **sin gestionar stock, cobros ni facturación fiscal**.
