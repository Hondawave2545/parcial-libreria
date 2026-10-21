# Tasks — css-y-uso-adaptable (C-02)

> Todo es CSS nativo: sin frameworks, CDNs, preprocesadores ni `<script>` (RN-GLO-03). Clases BEM según design.md (D2); tokens según D3; `index.html` solo recibe `<link>`, clases y envoltorios de tabla — ningún `id` cambia. Verificación manual: doble clic en `index.html` + devtools (sin test runner; el registro final queda para C-06).

## 1. Archivo CSS, enlace y tokens

- [x] 1.1 Crear el directorio `css/` y el archivo `css/styles.css` en la raíz del proyecto — verificación: el archivo existe y está vacío de contenido de terceros
- [x] 1.2 Agregar `<link rel="stylesheet" href="css/styles.css">` en el `head` de `index.html` (antes del cierre de `head`, junto a `title`) — verificación: al abrir la página con doble clic, la pestaña de red de devtools muestra la petición de `styles.css` con estado 200 y sin 404
- [x] 1.3 Declarar en `:root` la paleta de colores, la escala de espaciado y la pila de fuentes del sistema exactamente según design.md D3 (bg, surface, text, text-muted, border, primary, primary-dark, error, error-bg, success, success-bg, focus; `--space-1..8`), usando `var()` en todas las reglas en lugar de valores repetidos — verificación: inspeccionando `:root` existen los tokens; un cálculo de contraste de devtools confirma texto principal > 7:1 y secundario/estados > 4.5:1 sobre sus fondos (PA-CSS-02)

## 2. Base, reset y tipografía

- [x] 2.1 Escribir el reset mínimo: `*, *::before, *::after { box-sizing: border-box; }`, márgenes a 0 en `body`, `h1`–`h3`, `p`, `ul`, y `body` con `font-family` de sistema, `font-size: 1rem`, `line-height: 1.5`, `color: var(--color-text)` y `background-color: var(--color-bg)` — verificación: la página se ve con fondo claro cálido, texto oscuro y sin dobles márgenes por defecto
- [x] 2.2 Definir la jerarquía tipográfica en `rem` para `h1`, `h2`, `h3` (títulos legibles y distinguibles) y regla base `a { color: var(--color-primary) }` — verificación: a 320 px y a 1280 px los títulos de las 5 vistas se leen completos y con jerarquía visible
- [x] 2.3 Agregar la regla preparatoria `img { max-width: 100%; height: auto; }` (aún sin imágenes en el HTML, asegura el comportamiento futuro de US-009) — verificación: la regla existe en `styles.css` y no afecta el render actual

## 3. Header, navegación y footer con Flexbox

- [x] 3.1 Agregar en `index.html` las clases BEM: `.site-header` en `header`, `.site-header__title` en el `h1`, `.site-nav` en `nav`, `.site-nav__list` en su `ul`, `.site-nav__item` en cada `li`, `.site-nav__link` en cada enlace y `.site-footer` en `footer` — verificación: los 7 tipos de clase existen en el HTML; ningún `id` ni `href` fue modificado
- [x] 3.2 Estilizar en CSS: `.site-header` en Flexbox (columna en base; fila con wrap y `align-items: center` a ≥48rem), `.site-nav__list` en fila con `flex-wrap: wrap` y `gap` de tokens, `.site-nav__link` con padding y estado hover using `--color-primary-dark`, `.site-footer` con borde superior y texto muted — verificación: a 320 px los enlaces del nav envuelven en varias filas sin scroll horizontal de página; a 1280 px título y navegación quedan en una fila alineada

## 4. Vistas (secciones) y mejora «una vista a la vez»

- [x] 4.1 Agregar la clase `.view` a las 5 `section` hijos de `main` y `.view__title` a sus `h2` (los `id` `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial` permanecen intactos; `#detalle-venta` **no** recibe `.view`, no es vista de primer nivel) — verificación: diff de `index.html` muestra solo atributos `class` agregados; los 5 ids siguen existiendo una sola vez cada uno
- [x] 4.2 Estilizar `.view` como Grid de 1 columna con `gap: var(--space-6)` y `main` con `max-width` fluido centrado y `padding-inline` — verificación: el contenido de cada vista se apila con separación uniforme y a 1280 px el ancho de lectura queda centrado, sin scroll horizontal
- [x] 4.3 Implementar la mejora de D5 dentro de `@supports selector(:has(*))`: regla de ocultamiento que exige target hijo directo (`main:has(> section:target) > section:not(:target) { display: none; }`) y regla de display de la vista inicial (`main:not(:has(section:target)) > #catalogo { display: grid; }`) — verificación (manual, 2026-10-21): al abrir la página se ven todas las secciones una debajo de otra; al hacer clic en un enlace del menú se muestra solo esa sección; recargar con `#historial` muestra Historial con su `#detalle-venta` interno visible; inspeccionando el CSS, ambas reglas están dentro del bloque `@supports` (degradación garantizada para navegadores sin `:has()`)

## 5. Formularios, campos y botones (BEM)

- [x] 5.1 Agregar clases en `index.html`: `.form` en los dos `form`; `.label` en todos los `label` (Catálogo, Libros, Clientes y Ventas); `.input` en todos los `input` y `select` (incluidos `#select-cliente`, `#select-libro-venta`, `#input-cantidad-venta`); `.btn` en todos los `button` con su modificador (`--primario` en los submit «Registrar libro»/«Registrar cliente», `--secundario` en «Agregar renglón»/«Confirmar venta», y `--peligro` reservado para los futuros botones «Quitar» de renglones) — verificación: elementos equivalentes de vistas distintas comparten exactamente las mismas clases (US-007)
- [x] 5.2 Estilizar los bloques de campo: `.label` (peso/espaciado con tokens) y `.input` compartido para text/email/select (alto, padding, borde con `--color-border`, `background: var(--color-surface)`, `max-width: 100%`, `min-width: 0`), incluido `select[multiple]` con altura mayor — verificación: el formulario de Libros y el de Clientes se ven idénticos; a 320 px ningún campo se sale del viewport
- [x] 5.3 Estilizar `.form` con Grid: 1 columna en base; a ≥48rem `grid-template-columns: max-content 1fr` (auto-placement ubica etiqueta y campo en pareja gracias a la alternancia label/control del HTML de C-01) con `align-items: baseline` y `.form > .btn { grid-column: 1 / -1 }` — verificación: a 1280 px etiquetas alineadas a la izquierda y campos a la derecha, botón abajo de todo; a 320 px todo apilado y legible
- [x] 5.4 Estilizar los botones `.btn` base (padding con tokens, borde redondeado, cursor) y sus modificadores `--primario` (fondo `--color-primary`, texto blanco), `--secundario` (fondo surface, borde, texto primary) y `--peligro` (fondo/error) — verificación: «Registrar libro» y «Registrar cliente» se ven iguales; «Agregar renglón» y «Confirmar venta» se distinguen del primario pero entre sí son iguales
- [x] 5.5 En la vista Ventas: agregar el modificador `.view--acciones` a `#ventas` y, a ≥48rem, hacer de sus hijos directos una fila Flexbox con wrap donde h2, tabla, resumen y mensajes ocupan ancho completo (`flex-basis: 100%`) y etiquetas/controles/botón fluyen en fila con `gap` — verificación: a 1280 px cliente, libro, cantidad y «Agregar renglón» quedan en una fila alineada por la base; a 320 px se apilan sin solapes
- [x] 5.6 Agregar `.card` a `#resumen-venta` y `#detalle-venta`, `.card__total` a `#total-venta`, y estilizar la tarjeta (superficie, borde, radio, padding con tokens) — verificación: el resumen de venta y la zona de detalle se ven como tarjetas coherentes con la identidad visual

## 6. Tablas: envoltorios y desplazamiento contenido

- [x] 6.1 Envolver cada una de las 5 `<table>` en `index.html` con `<div class="table-wrapper">…</div>` (Catálogo, libros registrados, clientes, renglones de venta, historial) — verificación: existen 5 `.table-wrapper`, cada uno contiene una tabla; los `id` de `tbody` (`#listado-libros`, `#listado-libros-registrados`, `#listado-clientes`) y de tablas (`#renglones-venta`, `#listado-historial`) siguen intactos; es la única adición estructural permitida
- [x] 6.2 Estilizar `.table-wrapper { overflow-x: auto; }` y `.table` con `width: 100%`, `border-collapse`, encabezados (`th`) con tinte `--color-primary` sutil y texto legible, celdas con borde `--color-border` y padding de tokens — verificación: a 320 px, forzando una tabla ancha (por ejemplo agregando temporalmente columnas en devtools o ampliando contenido), la barra de scroll aparece **dentro** del `.table-wrapper` de esa tabla y el documento no genera scroll horizontal

## 7. Mensajes y estados (texto, no solo color)

- [x] 7.1 Agregar en `index.html` la clase `.message` con su modificador a cada contenedor de mensaje: `--info` en `#mensaje-catalogo-vacio`, `#mensaje-sin-resultados`, `#mensaje-libros-vacios`, `#mensaje-clientes-vacios`, `#mensaje-historial-vacio`; `--success` en `#mensaje-resultado-libro`, `#mensaje-resultado-cliente`, `#mensaje-resultado-venta`; `--error` en las listas `#errores-libro` y `#errores-cliente` (`ul[role=alert]`) — verificación: los 10 contenedores tienen `.message` + modificador; siguen con `hidden` y `role="alert"` donde correspondía (C-01)
- [x] 7.2 Estilizar `.message` (padding, margen, borde izquierdo grueso) y modificadores `--error` (borde/fondo/texto con `--color-error`/`--color-error-bg` + marcador visual `::before` tipo «⚠ »), `--success` (`--color-success` + «✓ ») e `--info` (borde neutro) — verificación: quitando temporalmente `hidden` en devtools, un mensaje de error se identifica como error por el texto/marcador y el borde, **no solo por el color** (comprobación renderizando en escala de grises); el texto literal lo aportará el JS de C-04/C-05 (PA-CSS-04)

## 8. Accesibilidad básica en CSS

- [x] 8.1 Escribir la regla global de foco `:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }` para `a`, `input`, `select` y `button`, sin ningún `outline: none` sin reemplazo — verificación: recorriendo la página solo con Tab, cada enlace, campo, selector y botón muestra el contorno ámbar visible; grep en `styles.css` confirma que no existe `outline: none`
- [x] 8.2 Verificar que el contraste del contorno de foco es suficiente sobre fondo y superficie (calculadora de devtools) y que también se ve sobre el botón primario gracias al `outline-offset` — verificación: contraste ≥ 3:1 del contorno contra el fondo circundante en ambos casos

## 9. Responsive mobile-first y verificación manual 320 px / 1280 px

- [x] 9.1 Consolidar el breakpoint único `@media (min-width: 48rem)` con los cambios de layout (header en fila, formulario 2 columnas, fila de acciones de Ventas) — verificación: en el modo responsive de devtools, el layout cambia al cruzar ~768 px y a 1280 px aprovecha el ancho fluido sin reglas de ancho fijo
- [x] 9.2 Releer `styles.css` buscando anchos fijos peligrosos: ningún `width`/`min-width` en `rem`/`px` que pueda exceder 320 px en el flujo de página; controles y bloques con `max-width: 100%` y `min-width: 0` donde son hijos de flex/grid; sin `overflow-x: hidden` en `body`/`html` — verificación: grep de `overflow-x` y de anchos; no hay enmascaramiento del scroll
- [x] 9.3 **Verificación a 320 px** (devtools, ancho 320 px, en Catálogo y en cada vista): textos y controles legibles y completos, formularios apilados, tablas con scroll interno, y `document.documentElement.scrollWidth <= clientWidth` (sin scroll horizontal de la página) — verificación: resultado comprobado en las 5 vistas y anotado para el registro de C-06
- [x] 9.4 **Verificación a 1280 px**: navegación en fila, formularios con etiquetas alineadas, fila de acciones de Ventas, tarjetas y tablas sin solapes ni scroll horizontal — verificación: captura o inspección conforme en las 5 vistas
- [x] 9.5 **Recorrido solo con teclado**: Tab/Shift+Tab por nav → Catálogo → Libros → Clientes → Ventas → Historial y footer; foco visible en todos los controles; Enter en cada enlace del nav muestra la vista correcta (mejora D5 activa) — verificación: recorrido completo sin perder el foco y sin controles invisibles

## 10. Verificación integral de alcance

- [x] 10.1 Buscar en `index.html`: cero ocurrencias de `<style`, `style=`, `<script` y de URLs `http://`/`https://` (sin CDNs ni librerías, RN-GLO-03) — verificación: las 4 búsquedas no devuelven resultados
- [x] 10.2 Buscar en `css/styles.css`: cero `@import`, cero `url(http`, cero referencias a frameworks — verificación: búsquedas sin resultados; el archivo es CSS nativo autocontenido
- [x] 10.3 Revisar el diff de `index.html`: solo se agregaron el `<link>`, atributos `class` y los 5 `<div class="table-wrapper">`; los 13 elementos con `id` del HTML de C-01 siguen presentes con los mismos valores — verificación: `git diff index.html` coincide con lo esperado (RN-GLO-02: separación estructura/estilos)
- [x] 10.4 Cruzar el spec delta `specs/css-presentacion-adaptable/spec.md` (11 requirements) contra lo implementado: cada requirement tiene al menos un escenario comprobado manualmente — verificación: checklist mental requirements→evidencia sin faltantes

## Workflow follow-up

- Marcar el checkbox de C-02 en `CHANGES.md` y archivar el change con `/opsx:archive css-y-uso-adaptable` cuando el review del Ejercicio 2 esté conforme.
- El registro escrito de las verificaciones a 320 px/1280 px y del recorrido por teclado (9.3–9.5) queda pendiente para el README/pruebas de C-06.
