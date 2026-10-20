# Decisiones y Supuestos

## Decisiones documentadas

Decisiones **fijadas por la consigna** (`docs/Consigna Primer Parcial (2).pdf`); no son opcionales.

### DD-01 — Alcance exclusivamente frontend
**Decisión**: solo HTML, CSS y JavaScript nativo; sin backend, API, base de datos, servidor, librerías, frameworks ni CDNs.
**Contexto**: la consigna desarrolla exclusivamente el frontend y simula datos/operaciones en el navegador; el contexto de backend pertenece al TP de otro docente.
**Alternativas consideradas**: conectar con backend/API (prohibida), usar frameworks (prohibido).
**Justificación**: es la restricción central de la evaluación; usar librerías o frameworks incumple el alcance técnico y se informa en la evaluación.
**Trade-offs aceptados**: sin seguridad ni integridad garantizada; todo el estado vive en el navegador.

### DD-02 — localStorage como único almacenamiento
**Decisión**: persistir libros, clientes y ventas en `localStorage`; datos ficticios en arrays y objetos con identificadores estables.
**Contexto**: se requiere persistencia entre aperturas sin servidor.
**Alternativas consideradas**: cookies, IndexedDB, memoria volátil, backend — no elegidas; la consigna nombra `localStorage`.
**Justificación**: requisito explícito del Ejercicio 6.
**Trade-offs aceptados**: almacenamiento por navegador/perfil/ubicación, sin compartir entre usuarios, sin duplicar seed al reabrir.

### DD-03 — Precio unitario histórico por copia
**Decisión**: al confirmar la venta, copiar el precio unitario al renglón como valor histórico; el historial no relee el precio actual del catálogo.
**Contexto**: la consigna exige que la venta conserve sus importes aún si cambia el precio de catálogo guardado (caso manual 6 y comprobación guiada por el docente).
**Alternativas consideradas**: referenciar el libro y recalcular (incumple el requisito).
**Justificación**: requisito explícito del Ejercicio 5.
**Trade-offs aceptados**: los datos descriptivos del libro quedan duplicados en la venta.

### DD-04 — Comparación de ISBN sin espacios ni guiones
**Decisión**: validar unicidad de ISBN comparando sin espacios ni guiones y sin implementar dígito de control.
**Contexto**: simplificación admitida explícitamente para este parcial.
**Alternativas consideradas**: normalización EAN-13 con dígito de control (no requerida).
**Justificación**: texto literal de la consigna (Ejercicio 4).
**Trade-offs aceptados**: ISBNs mal formados con mismo dígito podrían colisionar.

### DD-05 — Múltiples páginas o secciones con navegación clara
**Decisión**: la consigna **permite** varias páginas HTML o secciones de una misma página; queda a elección del implementador (ver PA-05).
**Contexto**: "Se permite usar varias páginas o secciones de una misma página, siempre que exista navegación clara entre las vistas".
**Alternativas consideradas**: ambas son válidas; la entrega contempla "los demás HTML si corresponden".
**Justificación**: decisión abierta por la consigna, no resuelta por la fuente.
**Trade-offs aceptados**: multi-página = más archivos; single-page = más JS de navegación.

### DD-06 — Conjunto inicial de datos ficticios
**Decisión**: seed mínimo fijado por la consigna: ≥ 6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes ficticios; cada libro con 1 editorial existente y ≥ 1 autores existentes; género opcional.
**Contexto**: el catálogo debe funcionar desde el primer inicio.
**Alternativas consideradas**: arrancar vacío (incumple la consigna).
**Justificación**: requisito explícito del Ejercicio 3.
**Trade-offs aceptados**: contenido específico (nombres, precios) no definido por la consigna (PA-07).

### DD-07 — Formato de entrega
**Decisión**: carpeta o comprimido con `index.html`, demás HTML si corresponden, carpetas de CSS/JS/recursos locales y `README.md`; sin dependencias ni compilación.
**Contexto**: forma de entrega fijada por la consigna.
**Alternativas consideradas**: proyecto con build/npm (prohibido).
**Justificación**: requisito explícito.
**Trade-offs aceptados**: nada moderno de tooling (bundlers, transpilers).

## Supuestos inferidos

### SU-01 — Estructura de carpetas y nombres de archivos
**Supuesto**: carpetas `css/`, `js/` (y `img/` si hay recursos), con nombres de módulos JS por responsabilidad.
**Origen**: la consigna exige "carpetas de CSS, JavaScript y recursos locales" pero no fija nombres.
**Riesgo si es falso**: bajo — cualquier estructura que abra sin build es válida.
**Cómo validar**: revisar el criterio "documentación y entrega" con el docente.

### SU-02 — Datos iniciales embebidos en archivos JS locales
**Supuesto**: el seed (arrays de libros, editoriales, géneros, autores, clientes) vive en archivos `.js` incluidos en el proyecto y se carga a `localStorage` en el primer inicio.
**Origen**: consigna dice "en el primer inicio se cargan los ejemplos", "arrays y objetos", "ubicación de los datos iniciales" en el README; prohíbe servidor/API.
**Riesgo si es falso**: si el docente espera seed en JSON u otro formato, habría que ajustar; impacto bajo porque el README documenta la ubicación.
**Cómo validar**: confirmar con el docente si JSON local es aceptable (JSON requiere `fetch` o script; `fetch` sobre `file://` puede fallar → se asume JS embebido).

### SU-03 — Editoriales, géneros y autores no se persisten en localStorage
**Supuesto**: solo libros, clientes y ventas se guardan en `localStorage` ( Ejercicio 6 los nombra así); editoriales/géneros/autores permanecen como datos estáticos en JS.
**Origen**: el Ejercicio 6 enumera únicamente "libros, clientes y ventas".
**Riesgo si es falso**: si un libro da de alta referencia una editorial y luego el seed no se recarga, la referencia podría perderse entre sesiones; impacto medio.
**Cómo validar**: ver PA-02 — queda como pregunta abierta, no cerrada.

### SU-04 — Identificador y fecha de venta de formato libre
**Supuesto**: el id de venta puede ser correlativo/único y la fecha la del momento de confirmación, en formato libre.
**Origen**: la consigna solo pide "registrar un identificador, fecha" sin especificar formato.
**Riesgo si es falso**: impacto bajo; el historial solo debe mostrar identificador, fecha, cliente y total.
**Cómo validar**: PA-04.

### SU-05 — Importes en una única moneda sin especificación
**Supuesto**: los precios son numéricos con dos decimales; la consigna no nombra moneda (ejemplos usan 1500/2000/5000 sin símbolo).
**Origen**: ejemplos de cálculo de la consigna.
**Riesgo si es falso**: solo cosmético (símbolo de moneda).
**Cómo validar**: decisión del implementador; no bloquea.

### SU-06 — Actualización "sin recargar" = re-render en memoria
**Supuesto**: tras un alta, se actualizan listados y selectores en el DOM desde el estado en memoria (y se persiste en `localStorage` cuando corresponde), sin `location.reload()`.
**Origen**: consigna: "se actualizan sin recargar la página".
**Riesgo si es falso**: muy bajo.
**Cómo validar**: caso manual 7 (recarga) lo verifica.

### SU-07 — El TP backend del otro docente queda completamente fuera
**Supuesto**: no hay que imitar nombres de entidades/campos de ese TP; solo se "toma como contexto".
**Origen**: "Se toma como contexto el TP backend de Programación III del otro docente".
**Riesgo si es falso**: si el docente espera nomenclatura alineada, podría pedir ajustes (IN-01).
**Cómo validar**: preguntar al docente si exige coincidencia de nombres con ese TP.

### SU-08 — Las imágenes son opcionales
**Supuesto**: el proyecto puede no incluir imágenes; si las incluye, deben ser locales y documentar procedencia en el README.
**Origen**: consigna habla de "imágenes informativas/decorativas" con alt, y de "procedencia de imágenes ajenas, **si existen**".
**Riesgo si es falso**: muy bajo.
**Cómo validar**: no requiere validación.
