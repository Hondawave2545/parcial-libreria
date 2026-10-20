# Actores y Roles

> Nota: la consigna establece explícitamente que **no se requiere un inicio de sesión real**. No hay roles ni autenticación; este archivo es acordemente breve.

## Actores del sistema

| Actor | Descripción | Cómo interactúa |
|-------|-------------|-----------------|
| Usuario de la interfaz (visitante, sin sesión) | Cualquier persona que abra `index.html` en el navegador; identidad no verificada | Navega las vistas, busca en el catálogo, da de alta libros/clientes, compone y confirma ventas, consulta el historial |
| Alumno (autor) | Quien desarrolla y entrega el trabajo | Escribe HTML/CSS/JS, define los datos ficticios, ejecuta y registra los casos manuales en el README |
| Docente / evaluador | Quien revisa y evalúa (Prof. Matías Torres, revisor de la unidad) | Observa el funcionamiento, pide la comprobación guiada del precio histórico en una copia del proyecto, revisa README y criterios |

## RBAC — Matriz de permisos

No aplica: no hay roles, usuarios ni autenticación. Todas las operaciones de la interfaz (leer catálogo, alta de libros/clientes, registrar ventas, consultar historial) están abiertas a quien abre la página. No existe autorización diferenciada.

| "Rol" | Recurso | Permisos |
|-------|---------|----------|
| Cualquiera (sin sesión) | Catálogo, libros, clientes, ventas, historial, `localStorage` del navegador propio | CRUD de hecho: **C**rear (altas y ventas), **R**ead (listados, catálogo, historial). **U**pdate/D**e**lete de registros: no exigidos por la consigna; ventas confirmadas son inmutables |

## Rutas públicas

Todas las vistas son públicas y accesibles sin autenticación, desde `index.html`:

1. `index.html` → entrada del proyecto (obligatoria).
2. Catálogo — título de la librería, buscador por título y listado de libros.
3. Libros — formulario de alta y listado de libros registrados.
4. Clientes — formulario de alta y listado de clientes registrados.
5. Ventas — selección de cliente, composición de renglones y resumen de la venta.
6. Historial — listado de ventas y acceso a sus detalles.

Puede implementarse como varias páginas HTML o como secciones de una misma página, siempre que exista navegación clara entre las vistas (ver SU/DD en [09_decisiones_y_supuestos.md](09_decisiones_y_supuestos.md)).
