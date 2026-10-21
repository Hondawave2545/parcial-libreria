# Design — estructura-y-pantallas-html (C-01)

## Context

El proyecto está vacío: no existe código fuente, solo la knowledge base y el plan en `CHANGES.md`. Este change crea desde cero la capa de estructura HTML. Restricciones duras: solo HTML nativo, sin librerías, frameworks, CDNs, npm, servidor ni backend (DD-01, RN-GLO-03); sin CSS propio (se aplica en C-02) y sin lógica JS de datos (se aplica en C-03 en adelante). El objetivo de grading es el Ejercicio 1 (20 pts): vistas y navegación (10) + semántica, formularios y estados (10). Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Dejar `index.html` con las 5 vistas, navegación clara y landmarks semánticos verificables abriendo el archivo con doble clic.
- Dejar todos los campos, etiquetas, tablas, botones e IDs/contenedores que consumirán el CSS (C-02) y el JavaScript (C-03 a C-06), para no rehacer estructura después.
- Que el HTML sea evaluable manualmente en este change: semántica, `label`s, `thead`/`th` y marcado de mensajes.

**Non-Goals:**
- Cualquier regla visual (colores, layout, foco, responsive) — C-02.
- Renderizado de datos, filtros, validaciones, `preventDefault`, selectores poblados, persistencia — C-03 a C-06.
- Editar/eliminar registros, login, stock — la consigna no lo pide.
- Agregar `<link>` a `css/styles.css` o `<script>` a archivos `js/` todavía: esos archivos no existen y generarían errores 404; los agregan C-02 y C-03.

## Decisions

### D1 — Una sola página (`index.html`) con secciones y navegación por anclas
**Decisión**: las 5 vistas viven como secciones (`<section>`) dentro de un único `main` en `index.html`; la navegación del `nav` son enlaces con `href="#id-de-vista"`.
**Rationale**: la consigna admite multi-página o secciones en una misma página (DD-05, PA-05 — decisión del implementador). Con anclas, la navegación funciona **sin JavaScript** en C-01, que es el requisito duro de este change; en multi-página cada vista repetiría header/nav/footer y C-02 tendría que estilar 5 archivos. Además el JS posterior (C-03 a C-06) comparte un único documento y un único estado en memoria.
**Alternativas consideradas**: (a) multi-página con enlaces relativos — válida por la consigna, pero más archivos y más repetición; (b) mostrar/ocultar secciones con JS — prohibido en este change (sin lógica JS).
**Nota**: PA-05 queda registrada como pregunta abierta; cambiar a multi-página no altera los requisitos del spec delta (navegación clara entre las 5 vistas), solo la distribución de tareas.

### D2 — Listados como tablas semánticas
**Decisión**: catálogo, listado de libros, listado de clientes, renglones de venta e historial se maquetan como `<table>` con `<thead>`/`<th>` y un `<tbody>` inicialmente vacío (o con filas de ejemplo vacías no). El listado de libros registrados incluye las columnas **editorial, género y autores** además de título, ISBN y precio.
**Rationale**: el Ejercicio 1 puntúa "las tablas incluyen encabezados" (RN-FORM-06); la consigna describe cada libro/venta por múltiples campos alineados (título, ISBN, editorial, género, autores, precio / identificador, fecha, cliente, total), que encaja naturalmente en columnas. El listado de libros registrados debe exponer los mismos atributos del alta (editorial, género y autores) para que el evaluador los vea en columnas.
**Alternativas consideradas**: listas (`ul`/`article`) — la consigna no las prohíbe, pero "las tablas incluyen encabezados" premia el uso de tablas y C-02 ya prevé `overflow-x` en tablas.

### D3 — Convención de identificadores y clases para los ganchos de CSS y JS
**Decisión**: ids en kebab-case descriptivo en español, reservados desde ahora y **estables** para el resto de los cambios. Ganchos principales:
- Vistas: `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`.
- Catálogo: `#busqueda-titulo`, `#listado-libros`, `#mensaje-sin-resultados`, `#mensaje-catalogo-vacio`.
- Libros: `#form-alta-libro`, `#listado-libros-registrados`, `#mensaje-libros-vacios`, `#mensaje-resultado-libro`, `#errores-libro`.
- Clientes: `#form-alta-cliente`, `#listado-clientes`, `#mensaje-clientes-vacios`, `#mensaje-resultado-cliente`, `#errores-cliente`.
- Ventas: `#select-cliente`, `#select-libro-venta`, `#input-cantidad-venta`, `#renglones-venta`, `#resumen-venta`, `#total-venta`, `#mensaje-resultado-venta`.
- Historial: `#listado-historial`, `#detalle-venta`, `#mensaje-historial-vacio`.
**Rationale**: C-02 estiliza y C-03 a C-06 manipulan el DOM por estos ids; fijarlos ahora evita renombrar en cada change. Nombres en español porque todo el proyecto y la consigna están en español.
**Alternativas consideradas**: clases como ganchos (`.listado-libros`) — válidas, pero un listado/estado por vista es único en la página, y el id evita ambigüedad para JS.

### D4 — Mensajes de estado como elementos presentes con `hidden`
**Decisión**: cada mensaje previsto (lista vacía, sin resultados, operación correcta/rechazada) es un elemento real en el marcado (`<p id="...">` dentro de su vista/section, junto al contenedor que corresponda) con el atributo `hidden` y sin texto (o con texto de ejemplo removible por JS), listo para que el JS posterior lo muestre con `textContent`. Además, **junto a cada formulario de alta (libro, cliente) existe una lista de errores** `#errores-libro` / `#errores-cliente` como `<ul role="alert" hidden>` sin ítems, separada del mensaje de resultado de operación (`#mensaje-resultado-libro` / `#mensaje-resultado-cliente`): la lista recibe los errores de validación campo a campo y el mensaje de resultado comunica el éxito/fracaso de la operación.
**Rationale**: la consigna pide que "se incorporen mensajes" y que "la estructura contempla los campos y estados que utiliza JavaScript" (US-006, RN-FORM-07): el elemento debe existir en el HTML aunque aún no se muestre. `role="alert"` deja el contenedor de errores accesible y anunciable cuando el JS (C-04) lo pueble, y separar "errores de validación" de "resultado de la operación" evita mezclar dos estados distintos. `hidden` es HTML nativo, sin CSS ni JS.
**Alternativas consideradas**: crear los mensajes solo desde JS (C-03+) — no deja marcado que el evaluador vea en Ejercicio 1; mensajes siempre visibles — confunden al abrir la página sin datos; una sola zona de mensajes para errores y resultado — acopla dos estados que cambian en momentos distintos.

### D5 — Formularios nativos sin `action` ni `method`, con `novalidate`, botones `submit` dentro del form
**Decisión**: los `<form>` no llevan `action` ni `method` (no hay servidor); los formularios de alta (libro, cliente) llevan el atributo **`novalidate`** para desactivar la validación nativa del navegador (las validaciones son JavaScript en C-04); los botones de envío van **dentro** del form con `type="submit"` (el Ejercicio 4 aplicará `preventDefault`, RN-FORM-01); los botones de acciones que no envían (agregar renglón, confirmar venta, quitar renglón) van fuera o dentro con `type="button"`, siempre con texto descriptivo.
**Rationale**: `submit` + `preventDefault` es el patrón que exige la consigna; sin `action` el form no navega a ningún lado en C-01. `novalidate` garantiza que el navegador no muestre burbujas nativas y que los mensajes de error los emita el JS de C-04 en la lista `#errores-*` (D4), en línea con RN-FORM-02.

### D6 — Campos de selectores vacíos, poblados por JS después
**Decisión**: editorial y género son `<select>`; autores es `<select multiple>` (RN-LIB-01 admite "selector múltiple o controles equivalentes"). Todos se entregan **sin opciones** (o con una opción placeholder deshabilitada) porque las opciones se generan desde los datos locales en C-04; el selector de género deberá incluir luego «Sin clasificar» (RN-LIB-02, responsabilidad de C-04). El selector de cliente de la vista Ventas y el **selector de libro** de la vista Ventas (`#select-libro-venta`, junto al campo de cantidad `#input-cantidad-venta` y al botón «Agregar renglón»), igual.
**Rationale**: en C-01 no hay datos (C-03 los crea); hardcodear opciones sería contenido ficticio prematuro y rompería "las opciones se generan a partir de los datos locales".

### D7 — Tipo de dato de los inputs alineado a lo que validará el JS
**Decisión**: los campos numéricos se declaran como `type="text"` con pista de teclado, **no** `type="number"`: **precio** con `type="text"` e `inputmode="decimal"`; **cantidad** (Ventas) con `type="text"` e `inputmode="numeric"`. El **email** del cliente es `type="email"`; ISBN y demás campos de texto son `type="text"`; los selectores son `select`/`select multiple`. Los formularios de alta llevan `novalidate` (D5) y `required` no se usa (las validaciones son JS en C-04, no validación nativa del navegador).
**Rationale**: la consigna pide precio numérico > 0 y cantidad entera > 0 (RN-LIB-05, RN-VEN-01), pero esas validaciones son JavaScript (Ejercicio 4). `type="text"` + `inputmode` deja el control del formato y del mensaje de error enteramente en el JS, sin que el navegador bloquee el envío ni muestre burbujas nativas; `inputmode` solo sugiere el teclado adecuado en móvil. Se descarta `type="number"` porque su validación y su spinner interfieren con el manejo de errores por JS. `novalidate` refuerza esta misma decisión: el HTML no valida, valida el JS. Sin `required` por la misma razón: no disparar validación nativa que compita con los mensajes en la lista de errores (RN-FORM-02).

### D8 — Texto de marcador (nombre de la librería y mensajes)
**Decisión**: como la consigna no fija el nombre de la librería ni el texto exacto de los mensajes (PA-07 / SU-05), se usa un nombre de trabajo y textos neutros en español (p. ej. «Sin clasificar» solo cuando corresponde a regla explícita), marcados en tasks como editables.
**Rationale**: no se decide nada que la consigna evalúe; son textos de presentación sustituibles sin tocar estructura.

## Risks / Trade-offs

- [Los ids y la estructura fijados aquí los consumen C-02 a C-06; un rename posterior rompe varios cambios] → D3 documenta la lista completa y se congela en este change; cualquier change posterior que necesite un id nuevo lo agrega sin renombrar existentes.
- [Una sola página larga con 5 secciones sin CSS puede verse como un solo scroll poco claro] → aceptado: C-02 aplica estilos y (si se desea) visibilidad por vista; la navegación por anclas ya funciona en C-01 y es lo que se evalúa.
- [Si el docente prefería multi-página (PA-05), habría que partir el HTML] → D1 deja el cambio acotado a `index.html`; el spec delta no cambia (solo exige navegación clara a las 5 vistas). Decisión reversible hasta archivar C-01.
- [Sin `required` ni `pattern`, el HTML "valida" poco en C-01] → intencional: las validaciones son JavaScript (Ejercicio 4) y el diseño prohíbe mezclar comportamiento en este change; el spec solo pide campos, etiquetas y estados previstos.
- [Mensajes con `hidden` podrían pasar desapercibidos para el evaluador] → el marcado existe y es inspeccionable; en C-03+ se muestran con la lógica correspondiente. Se verifica manualmente con devtools o leyendo el HTML.
- [`type="text"` + `inputmode` en precio/cantidad no valida nada por sí solo en C-01] → intencional: la validación numérica la hará el JS de C-04 (RN-LIB-05, RN-VEN-01); `inputmode` solo mejora el teclado móvil y no bloquea ni transforma el valor.

## Open Questions

- **PA-05** (multi-página vs secciones): D1 elige secciones por ser decisión del implementador y no alterar requisitos; si el docente indicara lo contrario, solo cambia la distribución de tareas, no el spec.
- **PA-07 / SU-05**: nombre definitivo de la librería, textos literales de los mensajes y símbolo de moneda (si lo hubiera) — cosmético, se ajusta al momento de implementar o en C-02 sin rehacer estructura.
