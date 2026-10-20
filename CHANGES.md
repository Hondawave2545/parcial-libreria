# CHANGES — Secuencia de Implementación

> Índice canónico de todos los changes del proyecto **Parcial 1 — Librería (frontend HTML/CSS/JS nativo)**.
> Cada change corresponde a **un ejercicio de la consigna** y es atómico: un agente puede implementarlo en una sesión.
> **Leer este archivo antes de ejecutar cualquier `/opsx:propose`.**
>
> **Alcance técnico duro**: solo HTML, CSS y JavaScript nativo. Sin librerías, frameworks, CDNs, npm, bundlers, Docker ni backend. Las pruebas son **manuales** y se registran en el `README.md`.

---

## Cómo usar este documento

1. Identificar el change a implementar y verificar que sus dependencias estén completadas (archivadas en `openspec/changes/archive/`).
2. Leer los docs de la knowledge-base indicados en "Leer antes".
3. Ejecutar `/opsx:propose` con el nombre del change.
4. Al terminar, archivarlo con `/opsx:archive`.
5. Marcar el checkbox `[x]` en este archivo.

---

## Árbol de dependencias

> La consigna es **lineal por diseño**: cada ejercicio reutiliza lo construido por el anterior. No hay forks reales.

```
C-01 estructura-y-pantallas-html        (Ej. 1 · 20 pts)
  └── C-02 css-y-uso-adaptable          (Ej. 2 · 20 pts)
        └── C-03 datos-locales-catalogo-filtro   (Ej. 3 · 15 pts)
              └── C-04 alta-libros-y-clientes    (Ej. 4 · 15 pts)
                    └── C-05 venta-simulada-e-historial   (Ej. 5 · 20 pts)
                          └── C-06 persistencia-verificacion-readme  (Ej. 6 · 10 pts)
```

### Paralelismo por fase

> Cada "gate" es un punto de sincronización. **En este proyecto casi no hay paralelismo**: la cadena es lineal y cada change depende del inmediatamente anterior. Los gates se listan con un solo change ejecutable por vez.

```
GATE 0: ninguna
  → C-01 estructura-y-pantallas-html        [Agente A]

GATE 1: C-01 ✓
  → C-02 css-y-uso-adaptable                [Agente A]

GATE 2: C-02 ✓
  → C-03 datos-locales-catalogo-filtro      [Agente A]

GATE 3: C-03 ✓
  → C-04 alta-libros-y-clientes             [Agente A]

GATE 4: C-04 ✓
  → C-05 venta-simulada-e-historial         [Agente A]

GATE 5: C-05 ✓
  → C-06 persistencia-verificacion-readme   [Agente A]
```

### Camino crítico (6 changes — mínimo irreducible)

```
C-01 → C-02 → C-03 → C-04 → C-05 → C-06
```

### Plan óptimo con 3 agentes

> **Nota honesta**: por la naturaleza lineal de la consigna (cada ejercicio extiende el anterior) **no hay trabajo paralelizable real**. Un solo agente debe ejecutar la cadena completa en orden. La tabla queda con una única columna activa.

```
Paso │ Agente A (Frontend)              │ Agente B │ Agente C
─────┼──────────────────────────────────┼──────────┼──────────
  1  │ C-01 estructura-y-pantallas-html │    —     │    —
  2  │ C-02 css-y-uso-adaptable         │    —     │    —
  3  │ C-03 datos-locales-catalogo-filtro│   —     │    —
  4  │ C-04 alta-libros-y-clientes      │    —     │    —
  5  │ C-05 venta-simulada-e-historial  │    —     │    —
  6  │ C-06 persistencia-verificacion…  │    —     │    —
```

---

## FASE 1 — Estructura y presentación (Ejercicios 1 y 2)

### [C-01] `estructura-y-pantallas-html`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 1 — HTML: estructura y pantallas — **20 puntos** (vistas y navegación: 10; semántica, formularios y estados: 10)
- **Scope**: Estructura HTML de las 5 vistas + navegación clara
  - `index.html` como entrada obligatoria del proyecto (RN-ENT-04, US-001)
  - Vistas: **Catálogo**, **Libros**, **Clientes**, **Ventas**, **Historial** — como secciones de `index.html` o páginas separadas (DD-05 / PA-05)
  - Navegación entre vistas con `header` + `nav` semánticos; landmarks `main`, `section`, `footer`
  - Catálogo: título de la librería, campo de búsqueda por título y contenedor de listado (US-002)
  - Libros: `form` de alta (título, ISBN, precio, editorial, género, autores) + contenedor de listado (US-003, US-013)
  - Clientes: `form` de alta (nombre completo, email) + contenedor de listado (US-003, US-014)
  - Ventas: selector de cliente, zona de composición de renglones y contenedor de resumen (US-004)
  - Historial: contenedor de listado de ventas + zona de detalle (US-005)
  - Semántica y accesibilidad de marcado: cada campo con `<label>` asociada, botones con texto descriptivo, tablas con `<thead>`/`<th>` (RN-FORM-06, US-006)
  - Contenedores/mensajes previstos para: listas vacías, búsquedas sin resultados y operaciones correctas o rechazadas (RN-FORM-07, US-006) — solo el marcado/estado, sin lógica JS todavía
  - Los campos y estados del HTML contemplan lo que luego consumirá JavaScript (US-006)
  - **Sin** CSS propio (se aborda en C-02) y **sin** lógica JS de datos (C-03)
- **Dependencias**: ninguna
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 1 (US-001 a US-006)
  - `knowledge-base/03_actores_y_roles.md` §Rutas públicas
  - `knowledge-base/05_reglas_de_negocio.md` §Envío de formularios (RN-FORM-06, RN-FORM-07) y §Verificación y entrega (RN-ENT-04)
  - `knowledge-base/08_arquitectura_propuesta.md` §Estructura de directorios

---

### [C-02] `css-y-uso-adaptable`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 2 — CSS: presentación y uso adaptable — **20 puntos** (coherencia y organización: 8; adaptación: 8; accesibilidad básica: 4)
- **Scope**: Hoja de estilos externa + diseño adaptable sobre las vistas de C-01
  - `css/styles.css` externo (sin `<style>` embebido ni estilos inline) (US-007, RN-GLO-02)
  - Identidad visual coherente: variables CSS para colores y espaciado, tipografía, tarjetas, formularios y botones reutilizando las mismas clases para elementos equivalentes (US-007)
  - Layout con **Flexbox o Grid** para organizar navegación, listados y formularios (US-008)
  - Adaptación verificada a **320 px y 1280 px**: textos y controles legibles, **sin desplazamiento horizontal** de la página (US-008)
  - Tablas dentro de un contenedor propio con `overflow-x: auto` para que el desplazamiento quede contenido en la tabla (US-008)
  - Accesibilidad básica en CSS: foco visible en todos los controles (`:focus-visible`), mensajes de error expresados con texto y no solo color, alt en imágenes informativas y decorativas sin redundancia (US-009)
  - **Sin** frameworks CSS, sin CDNs y sin preprocesadores (RN-GLO-03)
- **Dependencias**: C-01
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 2 (US-007 a US-009)
  - `knowledge-base/05_reglas_de_negocio.md` §Excepciones globales (RN-GLO-02, RN-GLO-03)
  - `knowledge-base/01_vision_y_objetivos.md` §Alcance v1.0 (identidad visual, 320/1280 px)
  - `knowledge-base/08_arquitectura_propuesta.md` §Estructura de directorios + §Patrones (separación estructura/estilos/comportamiento)

---

## FASE 2 — Datos y catálogo (Ejercicio 3)

### [C-03] `datos-locales-catalogo-filtro`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 3 — Datos locales, catálogo y filtro — **15 puntos** (modelo y ejemplos: 5; renderizado: 5; filtro y estados: 5)
- **Scope**: Seed de datos locales + render del catálogo + filtro por título
  - `js/datos.js`: arrays/objetos con identificadores estables de **libros, editoriales, géneros, autores y clientes** (RN-DAT-01)
  - Seed mínimo: **≥ 6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes** ficticios (RN-DAT-02, DD-06) — contenido a elección (PA-07); el ejemplo de cálculo usa precios 1500 y 2000
  - Relaciones coherentes: cada libro con **una editorial existente** y **≥ 1 autor existente**; género opcional y, si se asigna, existente (RN-DAT-03)
  - Render del catálogo en JavaScript desde el array de libros (RN-CAT-01, US-011): cada libro muestra título, ISBN, editorial, género, autores y precio
  - Género ausente → se muestra **«Sin clasificar»** (RN-CAT-02, US-002)
  - Inserción de datos de usuario **como texto** en el DOM (`textContent`, no `innerHTML`) (RN-DAT-05)
  - `js/catalogo.js`: eventos y funciones con responsabilidades reconocibles (RN-DAT-06)
  - Filtro por título (US-012): ignora mayúsculas/minúsculas (RN-CAT-03), coincidencias parciales (RN-CAT-04), `trim` de espacios extremos (RN-CAT-05)
  - Estados del filtro: búsqueda vacía → todo el catálogo (RN-CAT-06); sin coincidencias → mensaje claro (RN-CAT-07)
  - **Sin** `fetch` y **sin** altas/bajas/modificaciones de editoriales, géneros o autores (RN-DAT-04)
- **Dependencias**: C-02
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 3 (US-010 a US-012)
  - `knowledge-base/04_modelo_de_datos.md` §Entidades + §Seed data inicial
  - `knowledge-base/05_reglas_de_negocio.md` §Catálogo y filtro (RN-CAT-*), §Datos locales (RN-DAT-*)
  - `knowledge-base/07_flujos_principales.md` §Flujo 2 (búsqueda en el catálogo)

---

## FASE 3 — Altas y validaciones (Ejercicio 4)

### [C-04] `alta-libros-y-clientes`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 4 — Alta de libros y clientes — **15 puntos** (libros y selectores: 6; clientes: 4; validación y actualización: 5)
- **Scope**: Formularios de alta de libros y clientes con validación en cliente
  - `js/formularios.js`: alta de **libros** con título, ISBN, precio y relaciones con editorial, género y autores (RN-LIB-01, US-013)
  - Selectores de editorial y género generados desde los datos locales; selector **múltiple** de autores o control equivalente (RN-LIB-01)
  - Selector de género incluye la opción **«Sin clasificar»** (RN-LIB-02, US-013)
  - Validación de libro: título e ISBN no vacíos (RN-LIB-03); ISBN inexistente comparado **sin espacios ni guiones** (RN-LIB-04); precio numérico **> 0** (RN-LIB-05); editorial y **todos** los autores existen y hay **≥ 1 autor** (RN-LIB-06); género opcional pero existente si se asigna (RN-LIB-07)
  - Alta de **clientes**: nombre completo y email, sin campo de apellido separado (RN-CLI-01, US-014)
  - Validación de cliente: nombre y email no vacíos (RN-CLI-02); email con formato válido (RN-CLI-03); email único comparado **sin espacios exteriores y sin distinguir mayúsculas** (RN-CLI-04)
  - `preventDefault` en el envío (RN-FORM-01); errores mostrados **cerca del formulario** (RN-FORM-02)
  - Solo se agrega el registro si **todas** las comprobaciones pasan (RN-FORM-03)
  - Actualización del listado y de las opciones relacionadas (incluida la selección de libros/clientes de la vista Ventas) **sin recargar la página** (RN-FORM-04, US-015)
  - **No** se implementa editar ni eliminar registros (RN-FORM-05, US-015)
- **Dependencias**: C-03
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 4 (US-013 a US-015)
  - `knowledge-base/05_reglas_de_negocio.md` §Alta de libros (RN-LIB-*), §Alta de clientes (RN-CLI-*), §Envío de formularios (RN-FORM-*)
  - `knowledge-base/04_modelo_de_datos.md` §Entidades (Libro, Cliente; constraints de ISBN y email)
  - `knowledge-base/07_flujos_principales.md` §Flujo 3 (alta de libro) y §Flujo 4 (alta de cliente)

---

## FASE 4 — Venta simulada e historial (Ejercicio 5)

### [C-05] `venta-simulada-e-historial`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 5 — Venta simulada e historial — **20 puntos** (composición y validaciones: 8; cálculos: 5; confirmación e historial inmutable: 7)
- **Scope**: Composición de venta, cálculos, confirmación e historial inmutable
  - `js/ventas.js`: selección de un cliente existente y composición de renglones (libro existente + cantidad entera > 0) (RN-VEN-01, US-016)
  - Regla de libro repetido: se modifica la cantidad del renglón existente **o** se informa el duplicado — sin crear otro renglón (RN-VEN-02, PA-06)
  - Antes de confirmar: cambiar cantidades y quitar renglones (RN-VEN-03)
  - Cada renglón muestra libro, cantidad, precio unitario y subtotal; **subtotal = cantidad × precio**; **total = suma de subtotales**; importes con **dos decimales** (RN-VEN-04, RN-VEN-05, US-017)
  - Confirmación bloqueada si falta cliente, faltan renglones o hay cantidades inválidas (cero, negativas o decimales) (RN-VEN-06, US-016)
  - Al confirmar: registrar **identificador, fecha, cliente, renglones y total** (RN-VEN-07)
  - **Precio unitario copiado al renglón como valor histórico** (copia, no se relee del catálogo); conservar los datos descriptivos necesarios para leer la venta (RN-VEN-08, DD-03, US-018)
  - `js/historial.js`: historial muestra identificador, fecha, cliente y total, y permite consultar los renglones **desde la venta guardada** (RN-VEN-09, US-018)
  - Ventas confirmadas **no** se editan ni eliminan desde la interfaz (RN-VEN-10)
  - La confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado (RN-VEN-11, US-018)
  - Ejemplo de cálculo de referencia (caso manual 5): 2 × 1500 = 3000; 1 × 2000 = 2000; total 5000
  - Venta **simulada**: sin stock, sin cobros ni facturación (RN-GLO-05)
- **Dependencias**: C-04
- **Governance**: MEDIO (lógica compuesta de composición, cálculos e inmutabilidad del historial)
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 5 (US-016 a US-018)
  - `knowledge-base/05_reglas_de_negocio.md` §Ventas (RN-VEN-*)
  - `knowledge-base/07_flujos_principales.md` §Flujo 5 (composición/confirmación) y §Flujo 6 (historial)
  - `knowledge-base/04_modelo_de_datos.md` §Entidades (Venta, Renglón; precio histórico) + §ERD
  - `knowledge-base/09_decisiones_y_supuestos.md` DD-03 (precio histórico por copia)

---

## FASE 5 — Persistencia, verificación y entrega (Ejercicio 6)

### [C-06] `persistencia-verificacion-readme`

- **Estado**: `[ ]` pendiente
- **Ejercicio**: Ej. 6 — Persistencia, verificación y documentación — **10 puntos** (persistencia: 4; pruebas manuales registradas: 3; documentación y entrega: 3)
- **Scope**: Persistencia en `localStorage`, casos manuales y documentación de entrega
  - `js/persistencia.js`: `localStorage` conserva **libros, clientes y ventas** (RN-PER-01, US-019)
  - **Primer inicio** → se cargan los ejemplos; al reabrir → se recuperan los registros guardados **sin duplicar** los datos iniciales (RN-PER-02)
  - Claves y estructura del catálogo guardado definidas y documentadas (PA-03, RN-PER-04); editoriales/géneros/autores quedan como datos estáticos salvo decisión contraria (SU-03 / PA-02)
  - `README.md` obligatorio con: pasos para abrir `index.html` **sin npm**; navegación entre vistas; funcionalidades implementadas y pendientes; ubicación de los datos iniciales; funcionamiento y límites de `localStorage` (depende de navegador, perfil y ubicación de apertura; no comparte información entre usuarios); procedencia de imágenes ajenas si existen; **ubicación y estructura del catálogo guardado** (RN-PER-03, RN-PER-04, RN-ENT-05, US-021)
  - `README.md` identifica a **quienes realizan el trabajo** (RN-ENT-05, US-021)
  - Registro de los **8 casos manuales** con resultado esperado/observado (RN-ENT-01, US-020): búsqueda, ISBN duplicado, emails, venta inválida, venta 3000/2000/5000, precio histórico, recarga, teclado y anchos 320/1280 px
  - Los casos se ejecutan y se registra el comportamiento **real**; no se marca una prueba como aprobada sin ejecutarla (RN-ENT-01)
  - Comprobación del precio histórico guiada por el docente en copia del proyecto, modificando solo el precio del catálogo guardado con las herramientas de almacenamiento del navegador, sin tocar las ventas (RN-ENT-02) — **no** se implementa pantalla de edición de precios (RN-ENT-03, SU/PA)
  - Entrega: carpeta o comprimido con `index.html`, demás HTML si corresponden, carpetas de CSS/JS/recursos locales y `README.md`, **sin dependencias instaladas ni herramientas de compilación** (RN-ENT-04, DD-07)
  - **Sin** frameworks de testing ni archivos de tests automatizados: las pruebas son manuales y viven en el README
- **Dependencias**: C-05
- **Governance**: BAJO
- **Leer antes**:
  - `knowledge-base/06_funcionalidades.md` §Épica 6 (US-019 a US-021)
  - `knowledge-base/05_reglas_de_negocio.md` §Persistencia (RN-PER-*) y §Verificación y entrega (RN-ENT-*)
  - `knowledge-base/04_modelo_de_datos.md` §Persistencia (localStorage)
  - `knowledge-base/08_arquitectura_propuesta.md` §Formato de entrega
  - `knowledge-base/07_flujos_principales.md` §Flujo 1 (carga inicial) y §Flujo 7 (recarga y verificación)

---

## Resumen

| Change | Ejercicio | Puntos | Depende de | Governance |
|--------|-----------|--------|------------|------------|
| C-01 `estructura-y-pantallas-html` | Ej. 1 | 20 | — | BAJO |
| C-02 `css-y-uso-adaptable` | Ej. 2 | 20 | C-01 | BAJO |
| C-03 `datos-locales-catalogo-filtro` | Ej. 3 | 15 | C-02 | BAJO |
| C-04 `alta-libros-y-clientes` | Ej. 4 | 15 | C-03 | BAJO |
| C-05 `venta-simulada-e-historial` | Ej. 5 | 20 | C-04 | MEDIO |
| C-06 `persistencia-verificacion-readme` | Ej. 6 | 10 | C-05 | BAJO |
| **Total** | | **100** | | |

**Camino crítico**: 6 changes (la cadena completa).
**Gates de paralelismo**: 6 (todos de un solo change — secuencia lineal).
**Primer change recomendado**: `C-01` (estructura-y-pantallas-html).

Para arrancar: `/opsx:propose C-01 estructura-y-pantallas-html`
