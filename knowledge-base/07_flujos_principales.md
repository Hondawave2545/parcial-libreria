# Flujos Principales

Cada flujo se documenta extremo a extremo dentro del navegador (sin API ni servidor).

## Flujo 1: Carga inicial y persistencia
**Disparador**: el usuario abre `index.html`
**Actor**: usuario de la interfaz

**Pasos**:
1. El navegador carga `index.html`, CSS externo y scripts JS.
2. JS verifica `localStorage` (libros, clientes, ventas).
3. Si es el **primer inicio** (no hay datos), carga el conjunto inicial de ejemplos (≥ 6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes).
4. Si ya hay datos guardados, los recupera **sin duplicar** los datos iniciales.
5. El catálogo, listados y opciones de formularios se renderizan a partir de los datos resultantes.

**Casos de error**:
- `localStorage` sin datos y seed incompleto → se usa el seed definido en JS (consigna: conjunto inicial mínimo).
- Datos corruptos en `localStorage` → **no definido por la consigna** (ver PA-08).

## Flujo 2: Búsqueda en el catálogo
**Disparador**: el usuario escribe en el buscador por título (vista Catálogo)
**Actor**: usuario

**Pasos**:
1. Evento de entrada en el campo de búsqueda.
2. La función de filtro aplica trim (elimina espacios en los extremos).
3. Compara en minúsculas, con coincidencias parciales, contra el array de libros.
4. Renderiza el resultado: catálogo filtrado, o todo el catálogo si la búsqueda está vacía, o un mensaje claro si no hay coincidencias.

**Casos de error**:
- Búsqueda sin resultados → mensaje claro (no lista vacía en silencio).
- Texto solo con espacios → trim lo vacía ⇒ se muestra todo el catálogo.

## Flujo 3: Alta de un libro
**Disparador**: envío del formulario en la vista Libros
**Actor**: usuario

**Pasos**:
1. Las opciones de editorial, género (con «Sin clasificar») y autores se generan desde los datos locales.
2. `preventDefault` detiene el envío nativo.
3. Validaciones: título e ISBN no vacíos; ISBN inexistente (sin espacios ni guiones); precio numérico > 0; editorial existente; ≥ 1 autor y todos existen; género opcional pero existente si se asigna.
4. Si algo falla → mensajes de error cerca del formulario; no se agrega el registro.
5. Si todo pasa → se agrega el libro, se actualiza el listado y las opciones relacionadas (incluida la selección de libros de la vista Ventas) **sin recargar la página**, y se muestra mensaje de operación correcta.
6. El libro queda disponible en catálogo, listado y selección de venta.

**Casos de error**:
- ISBN duplicado → rechazo con mensaje (caso manual 2).
- Precio cero/negativo/no numérico → rechazo.
- Sin autores seleccionados → rechazo.

## Flujo 4: Alta de un cliente
**Disparador**: envío del formulario en la vista Clientes
**Actor**: usuario

**Pasos**:
1. `preventDefault`.
2. Validaciones: nombre completo y email no vacíos; formato de email válido; email único (trim + sin distinguir mayúsculas).
3. Si algo falla → errores cerca del formulario; no se agrega.
4. Si todo pasa → se agrega el cliente, se actualiza el listado y la selección de clientes de la vista Ventas sin recargar; mensaje de resultado.

**Casos de error**:
- Email inválido o existente (aunque esté en mayúsculas) → rechazo (caso manual 3).

## Flujo 5: Composición y confirmación de una venta
**Disparador**: interacciones en la vista Ventas
**Actor**: usuario

**Pasos**:
1. Se selecciona un cliente existente.
2. Se agrega un renglón: libro existente + cantidad entera > 0.
3. Si el libro ya está en la venta → se modifica la cantidad del renglón existente **o** se informa el duplicado (no crea otro renglón).
4. Antes de confirmar: se permiten cambiar cantidades y quitar renglones.
5. Cada renglón muestra libro, cantidad, precio unitario y subtotal (cantidad × precio); total = suma de subtotales; importes con 2 decimales.
6. Validación de confirmación: debe haber cliente, ≥ 1 renglón y cantidades válidas.
7. Al confirmar: se registra venta con identificador, fecha, cliente, renglones (con **precio unitario copiado como valor histórico**) y total; se persiste en `localStorage`; se limpia el formulario; se muestra mensaje de resultado.

**Casos de error**:
- Sin cliente / sin renglones / cantidad cero, negativa o decimal → no se confirma (caso manual 4).
- Libro repetido → no crea otro renglón.

**Cálculo de referencia** (caso manual 5): 2 unidades a 1500 → subtotal 3000; 1 unidad a 2000 → subtotal 2000; total 5000.

## Flujo 6: Consulta del historial (precio histórico)
**Disparador**: el usuario abre la vista Historial y consulta el detalle de una venta
**Actor**: usuario

**Pasos**:
1. Se listan las ventas: identificador, fecha, cliente y total.
2. Al acceder al detalle, los renglones se leen **desde la venta guardada**, con el precio unitario copiado al confirmar.
3. No se consulta el precio actual del catálogo.

**Casos de error**:
- Cambio posterior del precio del libro en el catálogo guardado → la venta conserva precio unitario, subtotales y total originales (caso manual 6; verificable con las herramientas de almacenamiento del navegador, sin pantalla de edición de precios).

## Flujo 7: Recarga y verificación
**Disparador**: recarga de la página / reapertura del navegador
**Actor**: usuario / docente evaluador

**Pasos**:
1. Se recuperan libros, clientes y ventas desde `localStorage`.
2. Los datos persisten sin duplicar ejemplos ni ventas (caso manual 7).
3. Navegación por teclado y anchos 320 px / 1280 px: foco visible, controles utilizables, tabla con desplazamiento propio si lo necesita (caso manual 8).

**Casos de error**:
- Ver PA-01: fechas, canal y modalidad de entrega los comunica el docente por separado.
