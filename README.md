# Librería - Parcial 1 (en desarrollo con SDD)

**Materia:** Programación III  
**Integrantes:** Ada Yoselie Aquino  
**Repositorio:** https://github.com/Hondawave2545/parcial-libreria  

Frontend de una librería hecho solo con HTML, CSS y JavaScript nativos.
No usa librerías, frameworks ni CDNs. Los datos son ficticios y todo se
simula en el navegador (sin backend, API, base de datos ni servidor).

> **Estado de este README:** documenta la entrega final del proyecto hasta el
> cambio C-06 (persistencia con `localStorage` y verificación de casos manuales).

## Metodología

El proyecto se desarrolla con **SDD (Spec-Driven Development)** usando
OpenSpec y OpenCode con Active Stack. Cada ejercicio de la consigna es un
cambio independiente, con este ciclo: propuesta, revisión manual, apply,
verificación en el navegador, archive y commit.

- La consigna está en `docs/`.
- La base de conocimiento está en `knowledge-base/`.
- El plan de cambios está en `CHANGES.md`.
- Las propuestas en curso están en `openspec/changes/` y las terminadas en
  `openspec/changes/archive/`.

## Cómo abrir el proyecto

1. Descomprimir la carpeta (si vino comprimida).
2. Hacer doble clic en `index.html`. Se abre en el navegador.
3. No hace falta npm, servidor ni instalar nada.

## Navegación entre vistas

Es una sola página con 5 secciones y un menú con enlaces a cada una. Al
abrir la página se ven todas las secciones una debajo de otra; al hacer clic
en un enlace del menú se muestra solo la sección elegida.

- **Catálogo:** buscador por título y listado de libros.
- **Libros:** alta de libros y listado de libros registrados.
- **Clientes:** alta de clientes y listado de clientes registrados.
- **Ventas:** selección de cliente, renglones y resumen de la venta.
- **Historial:** listado de ventas y detalle de cada una.

## Estructura de archivos actual

- `index.html`: estructura de las 5 vistas.
- `css/styles.css`: estilos del proyecto.
- `js/datos.js`: datos iniciales (libros, editoriales, géneros, autores,
  clientes) y colección de ventas.
- `js/catalogo.js`: catálogo y filtro por título.
- `js/formularios.js`: alta de libros y clientes, validaciones, selectores y
  listados.
- `js/ventas.js`: composición y confirmación de la venta.
- `js/historial.js`: listado de ventas y detalle.
- `js/persistencia.js`: gestión de `localStorage`, rehidratación y congelamiento de precios históricos.
- `docs/`: consigna del parcial.
- `knowledge-base/`: base de conocimiento derivada de la consigna.
- `CHANGES.md`: plan de los 6 cambios.
- `openspec/`: propuestas, diseños, especificaciones y tareas de cada cambio.

## Avance por cambio

| Cambio | Ejercicio | Puntos | Estado |
|---|---|---|---|
| C-01 Estructura y pantallas HTML | 1 | 20 | **Terminado**: revisado en el navegador, archivado y subido |
| C-02 CSS y uso adaptable | 2 | 20 | **Terminado**: verificado a 320 px y 1280 px, con teclado y contraste del foco; archivado y subido |
| C-03 Datos locales, catálogo y filtro | 3 | 15 | **Terminado**: verificado en el navegador, archivado y subido |
| C-04 Alta de libros y clientes | 4 | 15 | **Terminado**: verificado en el navegador, archivado y subido |
| C-05 Venta simulada e historial | 5 | 20 | **Terminado**: verificado en el navegador, archivado y subido |
| C-06 Persistencia, verificación y README | 6 | 10 | **Terminado**: verificado en el navegador con `localStorage`, archivado y subido |

## Funcionalidades implementadas

- Estructura HTML semántica con `header`, `nav`, `main` y `footer`, campos con
  etiqueta asociada, botones con texto descriptivo y tablas con encabezados.
- Estilos propios con Flexbox y Grid, adaptables a 320 px y 1280 px, con foco
  visible y mensajes de error expresados con texto.
- Datos locales con identificadores estables: 6 libros, 2 editoriales,
  2 géneros, 3 autores y 3 clientes ficticios.
- Catálogo generado con JavaScript y filtro por título (sin distinguir
  mayúsculas, con coincidencias parciales y sin espacios en los extremos). Un
  libro sin género se muestra como «Sin clasificar».
- Alta de libros y clientes con validaciones, errores cerca del formulario y
  actualización de listados, catálogo y selectores sin recargar la página.
- Venta simulada: cliente existente, renglones con cantidad entera mayor que
  cero, sin libros repetidos, cantidades editables, renglones que se pueden
  quitar, subtotales y total con dos decimales.
- Confirmación de venta con identificador, fecha, cliente, renglones y total.
  El precio unitario se copia al renglón como valor histórico.
- Historial de ventas con detalle de renglones, sin edición ni eliminación.
- Persistencia con `localStorage` (C-06): guardado automático del estado,
  recuperación de datos al recargar la página e inmutabilidad de precios
  históricos mediante `Object.freeze()`.
- Datos de usuario insertados como texto en el DOM (sin `innerHTML`).

## Funcionalidades pendientes

- Pantalla para editar precios: no la exige la consigna.
- Editar o eliminar libros, clientes o ventas: no lo exige la consigna.

## Datos iniciales y localStorage

**Datos iniciales:** están en `js/datos.js`, dentro del objeto
`window.datosLibreria`. Incluyen 6 libros (uno de ellos, «Crónicas Perdidas»,
sin género), 2 editoriales, 2 géneros, 3 autores y 3 clientes. Se verificó en
la consola del navegador que las colecciones tienen 6, 2, 2, 3 y 3 elementos.

**localStorage:** implementado en C-06 en el archivo `js/persistencia.js`.
Se utiliza la clave `"libreria.datos.v1"` con estructura JSON que almacena
la versión (`1`), libros, clientes y ventas. El almacenamiento depende del
navegador, del perfil de usuario y de la ubicación de apertura (`file://` o
servidor local), y no comparte información entre usuarios distintos.

## Casos manuales

Entorno de prueba: Microsoft Edge 155.0.4283.62 (64 bits).

Se registra el comportamiento realmente observado.

| Caso | Resultado esperado | Resultado observado |
|---|---|---|
| Búsqueda con parte del título en mayúsculas; luego vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados | Con «CR» en mayúsculas aparecen «Crónicas Perdidas» y «Pensamientos Críticos». Con el campo vacío o con solo espacios se muestran los 6 libros sin mensajes. Con espacios alrededor de una palabra sigue encontrando el libro. Con texto inexistente se muestra «No se encontraron libros que coincidan con la búsqueda.» Observación: la búsqueda distingue acentos («CRO» no encuentra «Crónicas»). |
| Alta de libro con ISBN existente y luego nuevo | El duplicado se rechaza; el válido aparece en catálogo y selección de venta | Un ISBN ya cargado se rechaza con el mensaje de ISBN existente, tanto con guiones como con espacios o sin guiones. Un ISBN nuevo se registra con mensaje de alta correcta, aparece en el listado de Libros, en el catálogo y en el selector de libros de Ventas sin recargar, y el formulario se limpia (el autor queda desmarcado). |
| Alta de libro con datos inválidos | Se rechazan los datos inválidos | Se rechazan: precios cero, negativo o no numérico, falta de autor y título con solo espacios. Se acepta el precio «15,5». |
| Alta de cliente con email inválido, existente en mayúsculas y nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección | Un email sin formato válido se rechaza. Un email ya registrado se rechaza, también escrito en mayúsculas y con espacios. Un email nuevo se registra con el mensaje «Cliente registrado correctamente». |
| Venta sin cliente, cantidad cero, negativa o decimal; libro repetido | No se confirma; el duplicado no crea otro renglón | No se confirma la venta sin cliente, sin renglones ni con cantidades cero, negativa, decimal o no numérica. El libro repetido no crea otro renglón. |
| Venta válida: 2 unidades a 1500 y 1 a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial | Subtotales 3000.00 y 2000.00 y total 5000.00. Al cambiar o quitar un renglón el total se recalcula. Al confirmar aparece el mensaje de resultado, el formulario se limpia y la venta se ve en el Historial sin recargar. «Ver detalle» muestra los renglones y sus importes. |
| Cambio exclusivo del precio de catálogo, en una copia de prueba | El historial conserva precio unitario, subtotales y total confirmados | Se confirmó una venta y se modificó el precio del libro en el catálogo dentro de `localStorage`. Al recargar y consultar el detalle de la venta, el precio unitario, subtotales y total conservaron los valores confirmados originalmente sin alterarse. |
| Recarga después de altas y venta | Se recuperan datos sin duplicar ejemplos ni ventas | Se realizaron altas de cliente y libro, y una venta válida. Al presionar F5 para recargar la página, `persistencia.js` recuperó los datos guardados en `localStorage` manteniendo todos los registros nuevos sin duplicar los ejemplos iniciales. |
| Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio | A 320 px se lee todo y la página no tiene desplazamiento horizontal (`document.documentElement.scrollWidth <= clientWidth` devolvió `true`); la tabla del Historial se desplaza dentro de su propio contenedor. A 1280 px todas las vistas se ven en orden. Con Tab, Shift+Tab y Enter se recorren los enlaces del menú, los botones y los campos, y el foco se ve en todos. Contraste del foco calculado a mano: aprox. 4,6:1 sobre el fondo y 5:1 sobre tarjetas y campos. |

## Verificaciones no ejecutadas

- C-04, tareas 1.2 y 2.3: piden llamar desde la consola del navegador a funciones internas. No se ejecutaron y quedan sin marcar.

## Imágenes ajenas

El proyecto no usa imágenes de terceros.