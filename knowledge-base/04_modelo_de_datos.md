# Modelo de Datos

## Dominios

- **Catálogo**: libros, editoriales, géneros y autores (datos ficticios representados con arrays y objetos de JavaScript, con identificadores estables).
- **Clientes**: clientes registrados mediante formulario de alta.
- **Ventas**: ventas simuladas con renglones y total; persisten en `localStorage` junto con libros y clientes.

## ERD (Entity Relationship Diagram)

```
Editorial 1 ──────── N Libro N ──────── N Autor
                          │
Genero (opcional) 1 ──────┘
                          │
                          N
                     Renglón de Venta
                     (con precio unitario
                      copiado = histórico)
                          │
                          N
Cliente 1 ────────────── N Venta 1 ────── N Renglón
```

- `Editorial` 1:N `Libro` — cada libro se relaciona con **una editorial existente**.
- `Autor` N:M `Libro` — cada libro tiene **uno o más autores existentes** (lista de ids en el libro).
- `Genero` 1:N `Libro` — **opcional**: si se asigna, corresponde a un género existente; si no, se muestra «Sin clasificar».
- `Cliente` 1:N `Venta` — la venta selecciona un cliente existente.
- `Venta` 1:N `Renglón` — cada renglón referencia un libro existente y guarda **precio unitario histórico** (copia, no se relee del catálogo).

## Entidades

### Libro
- Atributos: `id` (identificador estable), `titulo` (string, obligatorio), `isbn` (string, obligatorio, único), `precio` (number, > 0), `idEditorial` (ref a Editorial, obligatoria y existente), `idGenero` (ref a Genero, opcional; ausencia = «Sin clasificar»), `idsAutores` (array de refs a Autor, ≥ 1, todas existentes).
- Relaciones: N:1 con Editorial; N:M con Autor; N:1 con Genero (opcional).
- Constraints: ISBN único comparado **sin espacios ni guiones** (sin dígito de control); todos los ids referenciados deben existir en los datos locales.
- Índices relevantes: índice de ISBN para la validación de unicidad.

### Editorial
- Atributos: `id` (estable), `nombre` (string).
- Relaciones: 1:N con Libro.
- Constraints: conjunto inicial con **al menos 2 editoriales**. No se administran altas/bajas/modificaciones desde la interfaz.

### Genero
- Atributos: `id` (estable), `nombre` (string).
- Relaciones: 1:N con Libro (opcional).
- Constraints: conjunto inicial con **al menos 2 géneros**. No se administran altas/bajas/modificaciones. El formulario de libros incluye la opción «Sin clasificar» (ausencia de género).

### Autor
- Atributos: `id` (estable), `nombre` (string).
- Relaciones: N:M con Libro.
- Constraints: conjunto inicial con **al menos 3 autores**. No se administran altas/bajas/modificaciones.

### Cliente
- Atributos: `id` (estable), `nombreCompleto` (string, obligatorio), `email` (string, obligatorio, único).
- Relaciones: 1:N con Venta.
- Constraints: email único comparado **sin espacios exteriores y sin distinguir mayúsculas de minúsculas**; formato de email válido. No hay campo de apellido separado (no se requiere).
- Índices relevantes: índice de email para la validación de unicidad.

### Venta
- Atributos: `id` (identificador), `fecha`, `cliente` (referencia/datos descriptivos del cliente), `renglones` (array), `total` (number, suma de subtotales, presentado con 2 decimales).
- Renglón: libro (referencia + datos descriptivos necesarios para leer la venta), `cantidad` (entera > 0), `precioUnitario` (**valor histórico copiado al confirmar**), `subtotal` (cantidad × precioUnitario).
- Relaciones: N:1 con Cliente; 1:N con Renglón.
- Constraints: ≥ 1 renglón para confirmar; sin libros repetidos dentro de la misma venta; cantidades enteras > 0; inmutabilidad posterior (no se edita ni elimina desde la interfaz).

## Persistencia (localStorage)

| Clave/registro | Contenido | Nota |
|----------------|-----------|------|
| Libros | Array de libros | Ejercida en Ejercicio 6 |
| Clientes | Array de clientes | Ejercida en Ejercicio 6 |
| Ventas | Array de ventas con renglones e importes históricos | Ejercida en Ejercicio 6 |
| Editoriales / Géneros / Autores | **No mencionados** por la consigna en `localStorage` | Ver pregunta abierta PA-02 en [10_preguntas_abiertas.md](10_preguntas_abiertas.md) |

- En el **primer inicio** se cargan los ejemplos; al volver a abrir se recuperan los registros guardados **sin duplicar** los datos iniciales.
- Las claves exactas y la estructura del catálogo guardado **no están fijadas** por la consigna; el README debe indicar su ubicación y estructura para reproducir la comprobación guiada de precio histórico (PA-03).

## Seed data inicial

Requerido mínimo (datos ficticios, contenido a elección del alumno):

| Entidad | Cantidad mínima |
|---------|-----------------|
| Libros | 6 |
| Editoriales | 2 |
| Géneros | 2 |
| Autores | 3 |
| Clientes | 3 |

Reglas del seed: cada libro referencia una editorial existente y uno o más autores existentes; el género es opcional y, si se asigna, corresponde a un género existente. La consigna no especifica nombres ni precios concretos de los ejemplos (salvo el ejemplo de cálculo 1500/2000 de los casos manuales).
