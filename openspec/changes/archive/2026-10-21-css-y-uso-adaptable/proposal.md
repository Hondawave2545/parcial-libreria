# Proposal — css-y-uso-adaptable (C-02 · Ejercicio 2 · 20 pts)

## Why

C-01 dejó la estructura HTML de las 5 vistas completa pero **sin ningún estilo**: `index.html` no tiene `<link>`, no existe `css/` y la página se renderiza con las hojas de estilo por defecto del navegador. El Ejercicio 2 (20 puntos: coherencia y organización 8; adaptación 8; accesibilidad básica 4) exige aplicar sobre esa estructura una hoja de estilos externa con identidad visual coherente, layout moderno y adaptación a 320 px/1280 px; sin esto, C-03 a C-06 renderizarían datos sobre una interfaz sin pulir y no se cumplirían US-007 a US-009.

## What Changes

- Se crea `css/styles.css` como **única** hoja de estilos externa, enlazada desde `index.html` con `<link>` (sin `<style>`, sin estilos inline) (US-007, RN-GLO-02).
- Identidad visual propia y coherente: **variables CSS** (custom properties) en `:root` para paleta de colores y escala de espaciado, tipografía, tarjetas, formularios y botones, reutilizando las **mismas clases** para elementos equivalentes; nomenclatura de clases según **convención BEM** (US-007, RN-GLO-02).
- Layout con **Flexbox o Grid** para navegación, listados y formularios (US-008).
- Adaptación **mobile-first** verificada a **320 px y 1280 px**: textos y controles legibles y **sin scroll horizontal de la página completa** (US-008).
- Cada `<table>` envuelta en su propio contenedor `<div class="table-wrapper">` con `overflow-x: auto`, de modo que el desplazamiento horizontal quede contenido en la tabla (US-008). Única adición estructural de HTML junto con las clases y el `<link>`.
- Accesibilidad básica en CSS: foco visible con `:focus-visible` en todos los controles, mensajes de error/success diferenciados **por texto y no solo por color**, y reglas de `alt` para imágenes (informativas con texto alternativo, decorativas sin redundancia) aplicables cuando existan imágenes (US-009; el HTML actual no tiene imágenes).
- Mejora opcional de una vista a la vez con CSS puro (`:target` + `:has()` dentro de `@supports`, degradando al layout apilado actual en navegadores sin soporte); sin JavaScript y **sin modificar los `id`** existentes.
- **Se toca `index.html` solo para**: enlazar el CSS, agregar clases BEM y envolver las tablas. Ningún `id` cambia; no cambia la estructura de vistas.
- **Fuera de alcance (OUT)**: JavaScript/`<script>`, lógica de datos, librerías, frameworks CSS, CDNs, preprocesadores, npm o herramientas de compilación — todo ello viola RN-GLO-03 y la consigna.

## Capabilities

### New Capabilities

- `css-presentacion-adaptable`: presentación visual y uso adaptable de la interfaz de la librería — hoja de estilos externa única, identidad visual coherente con variables CSS y clases reutilizadas (BEM), layout con Flexbox/Grid, adaptación a 320 px y 1280 px sin scroll horizontal de página, contención del desplazamiento de las tablas, accesibilidad básica de CSS (foco visible, errores con texto, alts de imagen) y visualización de una vista a la vez degradable sin JS.

### Modified Capabilities

_(ninguna — `estructura-y-navegacion-html` no cambia a nivel de requisitos: sus 13 requirements siguen válidos; el envoltorio de tablas y las clases son detalles de implementación que este change estiliza, no reestructura.)_

## Impact

- **Archivos nuevos**: `css/styles.css` (directorio `css/` nuevo en la raíz, según `knowledge-base/08_arquitectura_propuesta.md` §Estructura de directorios).
- **Archivos existentes afectados**: `index.html` — solo `<link rel="stylesheet" href="css/styles.css">` en el `head`, clases BEM en elementos existentes y envoltorios `<div class="table-wrapper">` alrededor de las 5 tablas. Sin cambios de `id`, sin mover secciones, sin `<style>` ni atributos `style`.
- **Sistemas/APIs**: no aplica — sin backend, red, librerías ni dependencias (RN-GLO-03, DD-01); todo se verifica abriendo `index.html` con doble clic.
- **Dependencias**: requiere C-01 archivado (estructura HTML base). C-03 a C-06 heredan las clases/variables definidas aquí; la verificación final a 320/1280 px y por teclado se retoma en C-06 (consigna manual, caso 8).

## Preguntas abiertas relevantes (no se cierran en este change)

- **PA-CSS-01**: ¿es aceptable el soporte de `:has()` para la mejora «una vista a la vez»? La degradación elegida (`@supports selector(:has(*))` → layout apilado actual) es la red de seguridad; ver design.md (D5).
- **PA-CSS-02 / SU-06**: paleta de colores y tipografía concretas son supuestos de presentación; la consigna solo exige coherencia y contraste suficiente — aprobación final pendiente (ver design.md, D3).
- **PA-CSS-03**: conveniencia de `scroll-behavior: smooth` y desplazamiento de `:target` si el header llegara a hacerse sticky (hoy no lo es) — registrar ajuste si el review lo pide.
