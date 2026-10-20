# Funcionalidades

Organizadas por **épica = ejercicio del parcial** (los 6 ejercicios, total **100 puntos**), con historias de usuario en formato `US-NNN`.

## Distribución de puntos (Criterios de evaluación)

| Ejercicio | Tema | Puntos | Desglose |
|-----------|------|--------|----------|
| 1 | HTML: estructura y pantallas | **20** | Vistas y navegación: 10; semántica, formularios y estados: 10 |
| 2 | CSS: presentación y uso adaptable | **20** | Coherencia y organización: 8; adaptación: 8; accesibilidad básica: 4 |
| 3 | Datos locales, catálogo y filtro | **15** | Modelo y ejemplos: 5; renderizado: 5; filtro y estados: 5 |
| 4 | Alta de libros y clientes | **15** | Libros y selectores: 6; clientes: 4; validación y actualización: 5 |
| 5 | Venta simulada e historial | **20** | Composición y validaciones: 8; cálculos: 5; confirmación e historial inmutable: 7 |
| 6 | Persistencia, verificación y documentación | **10** | Persistencia: 4; pruebas manuales registradas: 3; documentación y entrega: 3 |
| **Total** | | **100** | |

---

## Épica 1: Ejercicio 1 · Estructura y pantallas HTML — 20 puntos

### US-001 — Navegación entre vistas desde index.html
**Como** usuario de la interfaz
**Quiero** navegar claramente entre las vistas del sistema desde `index.html`
**Para** acceder a todas las operaciones de la librería

**Criterios de aceptación**:
- [ ] `index.html` es la entrada del proyecto (CA: vistas y navegación · 10 pts)
- [ ] Existe navegación clara entre: Catálogo, Libros, Clientes, Ventas, Historial
- [ ] Se permite usar varias páginas o secciones de una misma página
- [ ] Se incluyen encabezado, navegación y contenido principal con etiquetas semánticas

**Reglas relacionadas**: RN-ENT-04

### US-002 — Vista Catálogo
**Como** usuario
**Quiero** ver el catálogo con título de la librería, buscador por título y listado de libros
**Para** consultar los libros disponibles

**Criterios de aceptación**:
- [ ] Título de la librería, buscador por título y listado de libros
- [ ] Cada libro muestra título, ISBN, editorial, género, autores y precio
- [ ] Si no tiene género asignado, se muestra «Sin clasificar»

**Reglas relacionadas**: RN-CAT-01, RN-CAT-02

### US-003 — Vistas Libros y Clientes
**Como** usuario
**Quiero** contar con formularios de alta y listados de libros y clientes
**Para** registrar y consultar los datos de la librería

**Criterios de aceptación**:
- [ ] Libros: formulario de alta y listado de libros registrados
- [ ] Clientes: formulario de alta y listado de clientes registrados

**Reglas relacionadas**: RN-FORM-06, RN-FORM-07

### US-004 — Vista Ventas
**Como** usuario
**Quiero** componer una venta con selección de cliente, renglones y resumen
**Para** registrar una venta simulada

**Criterios de aceptación**:
- [ ] Selección de cliente, composición de renglones y resumen de la venta

**Reglas relacionadas**: RN-VEN-01, RN-VEN-04

### US-005 — Vista Historial
**Como** usuario
**Quiero** ver el listado de ventas y acceder a sus detalles
**Para** consultar ventas anteriores

**Criterios de aceptación**:
- [ ] Listado de ventas y acceso a sus detalles
- [ ] Los listados y el historial se conectan con los datos locales

**Reglas relacionadas**: RN-VEN-09

### US-006 — Semántica, formularios y estados (10 pts)
**Como** docente/evaluador
**Quiero** que la interfaz use semántica correcta, etiquetas asociadas y estados claros
**Para** evaluar la calidad del HTML

**Criterios de aceptación**:
- [ ] Cada campo posee una etiqueta asociada
- [ ] Los botones tienen textos que describen su acción
- [ ] Las tablas incluyen encabezados
- [ ] Mensajes para listas vacías, búsquedas sin resultados y operaciones correctas o rechazadas
- [ ] La estructura contempla los campos y estados que utiliza JavaScript

**Reglas relacionadas**: RN-FORM-06, RN-FORM-07

---

## Épica 2: Ejercicio 2 · Presentación con CSS y uso adaptable — 20 puntos

### US-007 — Identidad visual y organización CSS (8 pts)
**Como** usuario
**Quiero** una interfaz con identidad visual propia y coherente
**Para** usar el sistema con claridad

**Criterios de aceptación**:
- [ ] Colores, tipografía, espaciado, tarjetas, formularios y botones coherentes
- [ ] El CSS se mantiene en archivos externos
- [ ] Se reutilizan clases para elementos equivalentes

**Reglas relacionadas**: RN-GLO-02

### US-008 — Uso adaptable con Flexbox o Grid (8 pts)
**Como** usuario
**Quiero** que la interfaz sea legible a 320 px y 1280 px sin desplazamiento horizontal de la página
**Para** usarla en pantallas chicas y grandes

**Criterios de aceptación**:
- [ ] Se utiliza Flexbox o Grid para organizar el contenido
- [ ] Comprobado con ancho de 320 px y 1280 px: textos y controles legibles
- [ ] El contenido no provoca desplazamiento horizontal de toda la página
- [ ] Si una tabla necesita más espacio, se desplaza dentro de su propio contenedor

**Reglas relacionadas**: (criterio de adaptación)

### US-009 — Accesibilidad básica (4 pts)
**Como** usuario
**Quiero** poder operar la interfaz con teclado y entender los errores sin depender del color
**Para** acceder al sistema de forma inclusiva

**Criterios de aceptación**:
- [ ] Los controles conservan un foco visible y se recorren con el teclado
- [ ] Los mensajes de error se expresan con texto y no dependen únicamente de un color
- [ ] Las imágenes informativas tienen texto alternativo; las decorativas no repiten información innecesaria

**Reglas relacionadas**: (criterio de accesibilidad básica)

---

## Épica 3: Ejercicio 3 · Datos locales, catálogo y filtro — 15 puntos

### US-010 — Modelo de datos y ejemplos iniciales (5 pts)
**Como** usuario
**Quiero** que el sistema arranque con datos ficticios completos y consistentes
**Para** ver un catálogo funcionante

**Criterios de aceptación**:
- [ ] Libros, editoriales, géneros, autores y clientes como arrays y objetos con identificadores estables
- [ ] Al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios
- [ ] Cada libro relacionado con una editorial existente y uno o más autores existentes
- [ ] El género es opcional; si se asigna, corresponde a un género existente
- [ ] No se requiere traer datos con `fetch` ni CRUD de editoriales/géneros/autores

**Reglas relacionadas**: RN-DAT-01, RN-DAT-02, RN-DAT-03, RN-DAT-04

### US-011 — Renderizado del catálogo (5 pts)
**Como** usuario
**Quiero** que el catálogo se genere con JavaScript a partir del array de libros
**Para** ver los datos locales en pantalla

**Criterios de aceptación**:
- [ ] JavaScript genera el catálogo a partir del array de libros
- [ ] Cada libro muestra título, ISBN, editorial, género, autores y precio
- [ ] Los datos escritos por usuarios se insertan como texto en el DOM
- [ ] Eventos y funciones con responsabilidades reconocibles

**Reglas relacionadas**: RN-CAT-01, RN-CAT-02, RN-DAT-05, RN-DAT-06

### US-012 — Filtro por título y estados (5 pts)
**Como** usuario
**Quiero** buscar libros por título ignorando mayúsculas, con coincidencias parciales
**Para** encontrar libros rápidamente

**Criterios de aceptación**:
- [ ] Ignora diferencias entre mayúsculas y minúsculas
- [ ] Busca coincidencias parciales
- [ ] Elimina espacios sobrantes en los extremos de la búsqueda
- [ ] Una búsqueda vacía muestra todo el catálogo
- [ ] Una búsqueda sin coincidencias muestra un mensaje claro

**Reglas relacionadas**: RN-CAT-03, RN-CAT-04, RN-CAT-05, RN-CAT-06, RN-CAT-07

---

## Épica 4: Ejercicio 4 · Alta de libros y clientes — 15 puntos

### US-013 — Formulario de alta de libros con selectores (6 pts)
**Como** usuario
**Quiero** registrar libros eligiendo editorial, género y autores desde opciones generadas de los datos locales
**Para** dar de alta libros completos y consistentes

**Criterios de aceptación**:
- [ ] Registra título, ISBN, precio y relaciones con editorial, género y autores
- [ ] Editorial y género mediante selectores; autores mediante selector múltiple o controles equivalentes
- [ ] El selector de género incluye «Sin clasificar»
- [ ] Las opciones se generan a partir de los datos locales

**Reglas relacionadas**: RN-LIB-01, RN-LIB-02

### US-014 — Formulario de alta de clientes (4 pts)
**Como** usuario
**Quiero** registrar clientes con nombre completo y email
**Para** poder seleccionarlos en una venta

**Criterios de aceptación**:
- [ ] Registra nombre completo y email (sin campo de apellido separado)
- [ ] Las opciones de selección de cliente se actualizan tras el alta

**Reglas relacionadas**: RN-CLI-01

### US-015 — Validación y actualización sin recarga (5 pts)
**Como** usuario
**Quiero** que el sistema rechace datos inválidos y actualice listados al dar de alta
**Para** confiar en los datos registrados

**Criterios de aceptación**:
- [ ] Libros: título e ISBN no vacíos; ISBN inexistente (comparado sin espacios ni guiones); precio numérico > 0; editorial y todos los autores existen; al menos un autor; género opcional pero existente si se asigna
- [ ] Clientes: nombre y email no vacíos; email con formato válido; email único comparado sin espacios exteriores y sin distinguir mayúsculas
- [ ] `preventDefault` en el envío; errores cerca del formulario
- [ ] Solo se agrega el registro si todas las comprobaciones pasan
- [ ] Tras un alta correcta, listado y opciones relacionadas se actualizan sin recargar la página
- [ ] No se exige editar ni eliminar registros

**Reglas relacionadas**: RN-LIB-03 a RN-LIB-07, RN-CLI-02 a RN-CLI-04, RN-FORM-01 a RN-FORM-05

---

## Épica 5: Ejercicio 5 · Venta simulada e historial — 20 puntos

### US-016 — Composición de la venta y validaciones (8 pts)
**Como** usuario
**Quiero** componer una venta con cliente, renglones y cantidades válidas, editables antes de confirmar
**Para** preparar una venta correcta

**Criterios de aceptación**:
- [ ] Se selecciona un cliente existente
- [ ] Al menos un renglón con un libro existente y una cantidad entera mayor que cero
- [ ] No se admiten libros repetidos en la misma venta (se modifica la cantidad o se informa el duplicado)
- [ ] Antes de confirmar, se permite cambiar cantidades y quitar renglones
- [ ] Se impide confirmar sin cliente, sin renglones o con cantidades inválidas

**Reglas relacionadas**: RN-VEN-01, RN-VEN-02, RN-VEN-03, RN-VEN-06

### US-017 — Cálculos de subtotal, total e importes (5 pts)
**Como** usuario
**Quiero** ver cada renglón con su subtotal y el total de la venta con dos decimales
**Para** verificar los importes antes de confirmar

**Criterios de aceptación**:
- [ ] Cada renglón muestra libro, cantidad, precio unitario y subtotal
- [ ] Subtotal = cantidad × precio; total = suma de subtotales
- [ ] Los importes se presentan con dos decimales

**Reglas relacionadas**: RN-VEN-04, RN-VEN-05

### US-018 — Confirmación e historial inmutable (7 pts)
**Como** usuario
**Quiero** confirmar una venta y luego consultarla en el historial con sus importes originales
**Para** tener un registro fiel de ventas pasadas

**Criterios de aceptación**:
- [ ] Al confirmar se registra identificador, fecha, cliente, renglones y total
- [ ] El precio unitario se copia al renglón como valor histórico (no se relee del precio actual del catálogo)
- [ ] Se conservan los datos descriptivos necesarios para leer esa venta
- [ ] El historial muestra identificador, fecha, cliente y total, y permite consultar los renglones
- [ ] Las ventas confirmadas no se editan ni eliminan desde la interfaz
- [ ] La confirmación limpia el formulario y muestra un mensaje de resultado

**Reglas relacionadas**: RN-VEN-07, RN-VEN-08, RN-VEN-09, RN-VEN-10, RN-VEN-11

---

## Épica 6: Ejercicio 6 · Persistencia, verificación y documentación — 10 puntos

### US-019 — Persistencia en localStorage (4 pts)
**Como** usuario
**Quiero** que mis libros, clientes y ventas se conserven al cerrar y reabrir el navegador
**Para** no perder el trabajo registrado

**Criterios de aceptación**:
- [ ] `localStorage` conserva libros, clientes y ventas
- [ ] En el primer inicio se cargan los ejemplos
- [ ] Al volver a abrir se recuperan los registros guardados sin duplicar los datos iniciales

**Reglas relacionadas**: RN-PER-01, RN-PER-02

### US-020 — Pruebas manuales registradas (3 pts)
**Como** docente/evaluador
**Quiero** encontrar en el README los resultados observados de los casos manuales
**Para** verificar el comportamiento real del sistema

**Criterios de aceptación**:
- [ ] README registra los 8 casos manuales con su resultado esperado/observado:
  - Búsqueda con parte del título en mayúsculas; luego búsqueda vacía y texto inexistente → coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados
  - Alta de libro con ISBN existente y luego con ISBN nuevo → el duplicado se rechaza; el válido aparece en catálogo y selección de venta
  - Alta de cliente con email inválido, email existente en mayúsculas y email nuevo → se rechazan los dos primeros; el nuevo aparece en listado y selección
  - Venta sin cliente, cantidad cero/negativa/decimal, libro repetido → no se confirma; el duplicado no crea otro renglón
  - Venta válida: dos unidades a 1500 y una a 2000 → subtotales 3000 y 2000; total 5000; detalle conservado en el historial
  - Venta confirmada y cambio exclusivo del precio de catálogo guardado (copia de prueba) → tras recargar, precio unitario, subtotales y total conservan los valores confirmados
  - Recarga después de altas y venta → se recuperan datos sin duplicar ejemplos ni ventas
  - Navegación por teclado y anchos de 320 px y 1280 px → foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita
- [ ] Si un caso falla o una funcionalidad queda pendiente, se registra el comportamiento real; no se indica una prueba como aprobada sin ejecutarla

**Reglas relacionadas**: RN-ENT-01, RN-ENT-02, RN-ENT-03

### US-021 — Documentación y entrega (3 pts)
**Como** docente/evaluador
**Quiero** recibir una carpeta con `index.html` y un `README.md` completo
**Para** evaluar la entrega

**Criterios de aceptación**:
- [ ] Carpeta o comprimido con `index.html`, los demás HTML si corresponden, carpetas de CSS, JavaScript y recursos locales, y `README.md`
- [ ] Sin dependencias instaladas ni herramientas de compilación
- [ ] README identifica a quienes realizan el trabajo
- [ ] README contiene: pasos para abrir `index.html` sin npm; navegación entre vistas; funcionalidades implementadas y pendientes; ubicación de los datos iniciales; funcionamiento y límites de `localStorage`; resultados de los casos manuales; procedencia de imágenes ajenas, si existen
- [ ] README explica que el almacenamiento depende del navegador, del perfil y de la ubicación de apertura, y que no comparte información entre usuarios
- [ ] README identifica la ubicación y estructura del catálogo guardado en `localStorage`

**Reglas relacionadas**: RN-PER-03, RN-PER-04, RN-ENT-04, RN-ENT-05, RN-ENT-06
