# Design — css-y-uso-adaptable (C-02)

## Context

C-01 quedó archivado: `index.html` tiene las 5 vistas, navegación por anclas, formularios, tablas, mensajes con `hidden` y ids estables (design.md de C-01, D3), pero **cero CSS**: no existe `css/`, no hay `<link>` ni estilos embebidos. Este change añade la capa de presentación sin tocar la lógica ni la estructura. Restricciones duras: solo CSS nativo — sin frameworks, CDNs, preprocesadores, npm ni `<script>` (RN-GLO-03, RN-ENT-04); separación estructura/estilos/comportamiento (RN-GLO-02); el HTML solo se toca para enlazar el CSS, agregar clases y envolver tablas. El grading es el Ejercicio 2 (20 pts: coherencia y organización 8; adaptación 8; accesibilidad básica 4). Ver proposal.md — Why y spec delta `specs/css-presentacion-adaptable/spec.md`.

## Goals / Non-Goals

**Goals:**
- Un `css/styles.css` externo que, abierto con doble clic en `index.html`, deje identidad visual coherente, layout con Flexbox/Grid y adaptación verificable a 320 px y 1280 px sin scroll horizontal de la página.
- Foco visible y mensajes comprensibles sin depender del color (US-009), y desplazamiento de tablas contenido en cada tabla (US-008).
- Clases BEM reutilizables que C-03 a C-06 puedan heredar sin renombrar nada; `index.html` solo recibe `<link>`, clases y 5 envoltorios de tabla.
- Degradación elegiente: si el navegador no soporta las pseudo-clases de la mejora «una vista a la vez», la página queda como hoy (secciones apiladas, anclas funcionando).

**Non-Goals:**
- JavaScript, `<script>`, lógica de datos, frameworks CSS, CDNs, preprocesadores o build (RN-GLO-03) — OUT explícito del change.
- Reestructurar HTML: cambiar `id`, mover secciones, agregar envoltorios de campos, `<style>` o atributos `style`.
- Estados dinámicos que requieren JS (resaltar la vista activa del nav, marcar campo inválido, escribir textos de mensajes) — los textos de error/éxito los escribirá el JS de C-04/C-05; C-02 solo deja el estilo.
- Enmascarar el scroll horizontal ocultándolo (`overflow-x: hidden` en `body`/`html`): eso trucaría la verificación de 320 px en lugar de resolverla.

## Decisions

### D1 — Un único archivo externo `css/styles.css`
**Decisión**: toda la hoja de estilos vive en `css/styles.css`, enlazada con `<link rel="stylesheet" href="css/styles.css">` en el `head` de `index.html`.
**Rationale**: la estructura de directorios de la KB (`08_arquitectura_propuesta.md`) prevé `css/` para estilos; el alcance del Ejercicio 2 cabe holgadamente en un archivo (estilo SU-01 del proyecto: un archivo hasta que el alcance lo justifique). Un solo archivo facilita verificar «sin `<style>` ni inline» y el pedido explícito de hoja externa (US-007, RN-GLO-02).
**Alternativas consideradas**: varios archivos (`base.css`, `layout.css`, …) con `@import` — innecesario ahora y `@import` encadena peticiones; separar solo si el archivo crece. Estilos en `<style>`/inline — prohibidos por la consigna.

### D2 — Convención BEM con clases sobre el marcado existente
**Decisión**: nomenclatura BEM (bloque, `bloque__elemento`, `bloque--modificador`) con este mapeo sobre los elementos actuales:
- `.site-header` / `.site-header__title` (header, h1) · `.site-nav`, `.site-nav__list`, `.site-nav__item`, `.site-nav__link` · `.site-footer` (footer).
- `.view` en las 5 `section` de `main` (elegido sobre `.section`, que chocaría con la etiqueta `<section>`) y `.view__title` en sus `h2`; **los `id` no cambian**.
- `.form` en los dos `form`. Etiquetas → bloque independiente `.label`; inputs/selects → bloque independiente `.input`; botones → `.btn` con modificadores `--primario`, `--secundario`, `--peligro`. **Se usan las mismas clases en campos equivalentes de todas las vistas** (incluida la fila de controles de Ventas, que no tiene `form`) (US-007).
- `.table-wrapper` (bloque independiente) envolviendo cada `<table>`; `.table` en la tabla misma; dentro del bloque se estilizan `th`/`td` con selectores estructurales descendentes (`.table th`, `.table td`) sin clase por celda.
- `.message` con modificadores `--error`, `--success`, `--info` en los contenedores de mensaje y en las `ul[role=alert]` de errores; `.card` en `#resumen-venta` y `#detalle-venta` (tarjetas de la identidad visual), con `.card__total` en `#total-venta`.
**Rationale**: el scope prohíbe agregar envoltorios de campo (solo se pueden agregar `<link>`, clases y envoltorios de tabla), por lo que un bloque `form-field` con `form-field__label`/`form-field__input` **no tiene nodo dónde vivir**: los campos se resuelven como bloques independientes sobre `label`/`input`, que es BEM válido (como `.btn` sobre `<button>`) y garantiza la reutilización de clases equivalente=clase idéntica (US-007). Las celdas de tabla son partes estructurales, no entidades estilizables por separado: clasificarlas agregaría decenas de atributos sin beneficio.
**Alternativas consideradas**: wrappers `.form-field` por campo — descartado por el scope; selectores `label { }`/`input { }` genéricos sin clase — pierden reutilización explícita y la organización que puntúa el Ejercicio 2; clases en español (`.etiqueta`, `.campo`) — coherentes con los ids en español, pero se mantienen los nombres en inglés del listado de decisiones ya tomadas, que son la convención BEM habitual.

### D3 — Identidad visual: variables en `:root`, tipografía de sistema y paleta concreta
**Decisión**: tokens en `:root`:
```css
:root {
  /* Colores */
  --color-bg: #f7f5f2;        /* fondo general, cálido claro */
  --color-surface: #ffffff;   /* tarjetas, tablas, campos */
  --color-text: #1f2933;      /* texto principal (~13:1 sobre bg) */
  --color-text-muted: #52606d;/* texto secundario (~6.5:1 sobre bg) */
  --color-border: #d9d5cd;
  --color-primary: #1d4ed8;   /* acento/enlaces/botón primario (~6.7:1 con texto blanco) */
  --color-primary-dark: #1e40af; /* hover/active */
  --color-error: #b42318;     /* texto de error sobre fondos claros (~6.6:1) */
  --color-error-bg: #fef3f2;
  --color-success: #15803d;
  --color-success-bg: #ecfdf3;
  --color-focus: #b45309;     /* contorno de foco (~5:1 sobre bg y surface) */
  /* Espaciado (escala base 0.25rem) */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem;
}
```
Tipografía: pila de fuentes del sistema (`system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`), cuerpo 1rem con `line-height: 1.5`, títulos con escala en `rem` — **sin fuentes externas** (serían CDN, RN-GLO-03). Todas las reglas consumen `var()` de estos tokens.
**Rationale**: US-007 exige variables para colores y espaciado y coherencia; los valores elegidos dan contraste suficiente (texto principal > 7:1, secundario y estados > 4.5:1) para la accesibilidad básica del Ejercicio 2. `rem` + escala única = coherencia de espaciado reutilizable.
**Alternativas consideradas**: valores mágicos repetidos — pierde los puntos de organización; paleta con fuentes de Google — CDN prohibido; contraste «a ojo» sin verificar — se verifica con la calculadora de contraste de devtools.
**Nota**: la paleta y la tipografía son supuestos de presentación (SU-06, PA-CSS-02); cambiarlas solo toca `:root`.

### D4 — Layout por componente: qué usa Flexbox y qué usa Grid
**Decisión**:
- **Flexbox**: `.site-header` (título + nav, columna a fila con wrap) y `.site-nav__list` (fila con `flex-wrap` a 320 px, fila compacta a ≥48rem); fila de controles de Ventas (`label`/`select`/`input`/`.btn`) a ≥48rem con `flex-wrap` y bloques de ancho completo (h2, tabla, resumen, mensajes con `flex-basis: 100%`); grupos de botones.
- **Grid**: `.view` como grid de 1 columna con `gap` (apilado ordenado de h2, form, mensajes, tabla); `.form` con `grid-template-columns: max-content 1fr` a ≥48rem — los hijos alternan `label`/control, así que el auto-placement ubica etiqueta en columna 1 y campo en columna 2 sin wrappers, con `.btn` en `grid-column: 1 / -1`; a <48rem, 1 columna. `main` centrado con `max-width` fluido.
- **Tablas**: no participan del layout de la vista; `.table-wrapper` las deja a ancho natural con su propio scroll (D6).
**Rationale**: Flexbox para filas de elementos que van y vienen (nav, controles con wrap); Grid cuando hay parejas o pilas estructurales estables (campo↔etiqueta, bloques de sección). Cumple literalmente «Flexbox **o** Grid para navegación, listados y formularios» (US-008) eligiendo la herramienta por caso.
**Alternativas consideradas**: todo Flexbox — el acoplamiento etiqueta/campo en formularios quedaría a mano de márgenes frágiles; wrappers por campo con Grid — prohibidos por el scope (D2).

### D5 — Una vista a la vez con `:target` + `:has()` dentro de `@supports` (CSS puro)
**Decisión**: mejora opcional envuelta en `@supports selector(:has(*))`:
```css
@supports selector(:has(*)) {
  main:has(> section:target) > section:not(:target) { display: none; }
  main:not(:has(section:target)) > #catalogo { display: grid; }
}
```
- Con una ancla activa (`#clientes`, etc.) se oculta toda sección de primer nivel que no sea la target. **Sin ancla activa no se oculta nada**: las cinco secciones quedan apiladas en el orden del documento. La regla `main:not(:has(section:target)) > #catalogo { display: grid; }` fija el `display` base de Catálogo cuando no hay target —el mismo que el base de `.view` (`grid`), para no perder el layout apilado con `gap`— sin producir ocultamiento por sí sola.
- La regla de ocultamiento exige `main:has(> section:target)` (target de **hijo directo**): si en el futuro algo apunta a un id anidado como `#detalle-venta`, `#historial` no se oculta y la página degrada al apilado en vez de quedar en blanco.
- `#detalle-venta` vive dentro de `#historial`, no es hijo directo de `main`: nunca recibe la regla de ocultamiento y queda visible cuando Historial está activa.
- Sin JS, sin tocar ids, sin cambiar la estructura. El snippet base del planteo (`main > section:not(:target) { display: none; }` + `main:not(:has(> section:target)) > #catalogo { display: block; }`) se descartó porque ocultaría todo el contenido al abrir; la versión implementada exige un target de **hijo directo** para ocultar, por lo que el estado inicial es el apilado.
**Rationale**: la consigna no exige «una vista a la vez» pero mejora la usabilidad del patrón de C-01 (D1 de C-01: secciones + anclas) manteniéndolo 100% CSS; `@supports selector(:has(*))` es la red de seguridad para navegadores sin `:has()` (PA-CSS-01). El estado inicial apilado conserva la descubribilidad del contenido y coincide con la degradación: la mejora solo actúa al navegar. **Ajuste posterior al review (2026-10-21)**: el comportamiento observable es «todas las secciones apiladas al abrir; una sola vista al activar un enlace», y spec, design y tasks quedaron alineados a ese comportamiento (no se modifica el CSS).
**Alternativas consideradas**: ocultar secciones con JS — viola «sin scripts» de este change; ocultar todo excepto el target desde la carga (`main > section:not(:target) { display: none; }`) — se descartó porque complejiza el caso de target anidado y oculta el contenido inicial; `display` en base `block` y fallback `grid` — se evita un cambio de display que rompería el `gap` de la vista apilada.

### D6 — Envoltorio `.table-wrapper` con `overflow-x: auto`
**Decisión**: cada `<table>` se envuelve en `<div class="table-wrapper">` (5 tablas) y `.table-wrapper { overflow-x: auto; }`. Es la **única** adición estructural de HTML del change, además del `<link>` y las clases.
**Rationale**: US-008 exige que el desplazamiento quede contenido en la tabla; sin envoltorio, una tabla ancha (6 columnas del catálogo a 320 px) empuja el ancho de la página y rompe el «sin scroll horizontal» a 320 px. `overflow-x: auto` solo muestra la barra cuando hace falta.
**Alternativas consideradas**: `display: block` en la tabla — contención a medias y rompe la semántica de tabla; `overflow-x` en `main` o `body` — enmascara el problema y afecta a toda la página.

### D7 — Accesibilidad básica en CSS: foco, texto en mensajes y alts
**Decisión**:
- Regla global `:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }` aplicada a `a`, `input`, `select`, `button` — **nunca** `outline: none` sin reemplazo. El `outline-offset` hace que el contorno se pinte sobre el fondo de la página, visible también sobre botones primarios.
- `.message--error` / `--success` combinan **borde izquierdo + fondo tenue + color del texto + marcador visual de texto** (`::before` con contenido como «⚠ » / «✓ »), de modo que el color nunca es la única señal; además el **texto** del mensaje lo aportará el JS (C-04/C-05) con prefijos explícitos («Error: …») — ver PA-CSS-04.
- Imágenes: el HTML actual no tiene ninguna; el spec delta fija el requisito condicional (informativa → `alt` descriptivo; decorativa → `alt` vacío/sin redundancia) y C-02 solo define `img { max-width: 100% }` como preparación (US-009).
**Rationale**: US-009 (Ejercicio 2, 4 pts de accesibilidad) pide literalmente foco visible, errores con texto y alts; todo es verificable a mano con Tab y con devtools.
**Alternativas consideradas**: usar solo color rojo/verde para errores — justamente lo que prohíbe la consigna; depender de `:invalid` — los forms llevan `novalidate` y sin `required` no se activa (C-01, D5/D7).

### D8 — Media queries mobile-first con un breakpoint a 48rem
**Decisión**: estilos base pensados para 320 px (apilados, flex-wrap, sin anchos fijos, `min-width: 0` y `max-width: 100%` en controles, `box-sizing: border-box` global); **un** breakpoint `@media (min-width: 48rem)` (~768 px) que activa header en fila, formulario en 2 columnas, fila de Ventas y layout cómodo — el ancho de 1280 px queda cubierto de forma fluida (`main` con `max-width` centrado). Verificación manual en devtools a 320 px y 1280 px.
**Rationale**: dos anchos exigidos (320 y 1280) quedan cubiertos con una sola media query si no hay anchos fijos; mobile-first evita reglas negativas. 48rem es el corte clásico tablet/desktop y deja margen de prueba en 320 px.
**Alternativas consideradas**: breakpoint en 1280 px exacto — hace falta adaptar desde mucho antes (tablet); `overflow-x: hidden` en `body` para «pasar» la prueba de 320 px — prohibido por D6/Non-Goals: oculta el síntoma.

## Risks / Trade-offs

- [`:has()` sin soporte deja la mejora de vista desactivada] → es intencional: `@supports` degrada al apilado actual, que es funcional y el estado evaluado en C-01 (PA-CSS-01).
- [Si C-05/C-06 escriben un `location.hash` anidado (p. ej. `#detalle-venta`), las vistas de primer nivel podrían no comportarse como «una vista a la vez»] → las reglas de D5 exigen target hijo directo de `main` para ocultar, así que se degrada al apilado en vez de dejar la página vacía; revisar en C-05 si se adopta hash anidado.
- [La paleta/contraste elegidos no tienen aprobación del docente] → PA-CSS-02: son supuestos de presentación centralizados en `:root`; ajustarlos no toca reglas ni tareas.
- [Ocultar secciones con `display: none` saca la vista oculta del árbol de accesibilidad y del foco] → deseable en el patrón de una vista a la vez; en degradación todo vuelve a estar visible.
- [Grid de formulario de 2 columnas depende de que los hijos sigan alternando label/control] → el marcado de C-01 es estrictamente alterno; si un change futuro agrega hijos al `form`, el auto-placement los coloca mal — verificar en la revisión de C-04/C-05.
- [Nuevos envoltorios `.table-wrapper` cambian el ancestro de las tablas] → los `id` de `tbody` y la estructura interna de cada tabla quedan intactos; `querySelector` por id/tabla de C-03 en adelante sigue funcionando.
- [Sin clase de «vista activa» en el nav, el enlace seleccionado no se resalta] → no lo exige la consigna ni US-007/008/009; ver PA-CSS-05.

## Open Questions

- **PA-CSS-01**: ¿es aceptable el soporte de `:has()` como mejora opcional? La red de seguridad es el `@supports` → layout apilado idéntico al actual.
- **PA-CSS-02 / SU-06**: paleta concreta y tipografía (D3) como supuestos de presentación — aprobación final pendiente; coherencia y contraste son lo que exige la consigna.
- **PA-CSS-03**: si más adelante el header se hace sticky, evaluar `scroll-padding-top` para que `:target` no tape el inicio de la vista; `scroll-behavior: smooth` es opcional y hoy no se aplica (header no sticky, sin decisión tomada).
- **PA-CSS-04**: quién escribe el prefijo textual de error («Error: …»): se recomienda que sea el **contenido** que pone el JS (C-04/C-05) porque el texto generado por `::before` no siempre lo anuncian los lectores de pantalla; el `::before` de D7 queda como refuerzo visual. Confirmar al implementar C-04.
- **PA-CSS-05**: ¿resaltar el enlace de la vista actual (`aria-current` + clase)? Requiere JS o selectores frágiles (`:target` no alcanza al `nav` desde `main`); fuera del alcance de C-02 salvo indicación.
