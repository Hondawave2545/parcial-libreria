# Visión y Objetivos

## Propósito del sistema

Construir el **frontend de una librería** que presenta su catálogo y registra libros, clientes y ventas, como evaluación parcial de la unidad HTML, CSS y JavaScript de la materia Programación III.

El proyecto representa una librería que presenta su catálogo y registra libros, clientes y ventas. Se toma como contexto el TP backend de Programación III del otro docente (documento no incluido en esta consigna). Esta consigna desarrolla **exclusivamente el frontend**: los datos y las operaciones se simulan en el navegador.

## Objetivos de la consigna (según enunciado)

1. Construir interfaces con HTML semántico y CSS propio para un sistema de librería.
2. Relacionar formularios, listados y navegación con las entidades del proyecto.
3. Aplicar JavaScript nativo para representar datos locales, modificar el DOM y responder a eventos.
4. Validar entradas y comprobar el comportamiento mediante casos manuales reproducibles.

## Objetivos por actor

| Actor | Objetivo principal | Objetivos secundarios |
|-------|--------------------|-----------------------|
| Alumno (autor del trabajo) | Demostrar dominio de HTML semántico, CSS y JS nativo en un caso real de librería | Entregar carpeta válida (index.html + README.md); registrar casos manuales reales (sin marcar pruebas no ejecutadas) |
| Docente / evaluador | Evaluar el funcionamiento observado y la correspondencia entre interfaz, datos y documentación | Verificar casos manuales guiados (p. ej. precio histórico en localStorage); comprobar 320 px / 1280 px y navegación por teclado |
| Usuario de la interfaz (sin sesión) | Navegar el catálogo y buscar libros por título | Dar de alta libros y clientes; componer y confirmar ventas; consultar el historial |

## Alcance v1.0 (Parcial 1 — ejercicios 1 a 6, total 100 puntos)

- 5 vistas con navegación clara desde `index.html`: **Catálogo**, **Libros**, **Clientes**, **Ventas**, **Historial** (varias páginas o secciones de una misma página).
- Catálogo con buscador por título (ignora mayúsculas/minúsculas, coincidencias parciales, trim) y listado de libros (título, ISBN, editorial, género, autores, precio; sin género → «Sin clasificar»).
- Formularios de alta de libros (título, ISBN, precio, editorial, género, autores) y de clientes (nombre completo, email) con validaciones y listados.
- Venta simulada: selección de cliente, renglones (libro + cantidad entera > 0), subtotales con 2 decimales, total, confirmación.
- Historial de ventas con detalle inmutable (precio unitario copiado como valor histórico).
- Datos ficticios en arrays/objetos con identificadores estables; seed mínimo: 6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes.
- Persistencia en `localStorage` de libros, clientes y ventas (carga de ejemplos en el primer inicio, sin duplicar al reabrir).
- Identidad visual propia con CSS en archivos externos, Flexbox o Grid, verificación a 320 px y 1280 px, accesibilidad básica (foco visible, recorrido por teclado, errores con texto, textos alternativos).
- `README.md` con los contenidos exigidos (ver [08_arquitectura_propuesta.md](08_arquitectura_propuesta.md)) y resultados de los 8 casos manuales.

## Fuera de alcance

- Backend, API, base de datos, servidor ni conexión con el backend (referido al TP de otro docente).
- Librerías, frameworks ni CDNs de CSS o JavaScript; dependencias instaladas; herramientas de compilación; npm.
- Inicio de sesión real, autenticación o autorización.
- Gestión de stock, cobros, medios de pago ni facturación fiscal.
- Editar ni eliminar registros (libros/clientes) desde la interfaz; editar ni eliminar ventas confirmadas.
- Altas, bajas y modificaciones de editoriales, géneros o autores; traer datos con `fetch`.
- Implementación del dígito de control del ISBN (se compara sin espacios ni guiones).
- Pantalla para editar precios de catálogo.
- Seguridad o integridad garantizada por servidor (las validaciones son solo para la práctica).
- Penalizaciones adicionales y mínimo de aprobación: la consigna **no los fija**.

## Métricas de éxito

- **100 puntos** disponibles según la distribución de criterios (ver [06_funcionalidades.md](06_funcionalidades.md)).
- Los **8 casos manuales** de la consigna registrados en el README con su resultado observado real.
- La entrega es una carpeta/zip con `index.html` y `README.md` que abre sin npm.
- La interfaz es usable a 320 px y 1280 px, con foco visible y sin desplazamiento horizontal de la página.
