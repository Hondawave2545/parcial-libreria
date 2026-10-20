# Preguntas Abiertas

Fuente única: `docs/Consigna Primer Parcial (2).pdf`. Las preguntas abajo **no están resueltas por la consigna** y no deben cerrarse sin confirmación del docente.

## Inconsistencias detectadas

### IN-01 — Referencia a un documento externo no provisto
**Documento A dice**: "Se toma como contexto el TP backend de Programación III del otro docente."
**Documento B dice**: ese TP no está incluido en `docs/` (fuente única = consigna del Parcial 1).
**Impacto**: posible divergencia en nombres de entidades/campos respecto de lo que el docente espera alineado con el otro curso.
**Resolución propuesta**: preguntar al docente si exige nomenclatura coincidente con ese TP (asumido como libre en SU-07).

### IN-02 — Criterios de aprobación no definidos (no inconsistencia, vacío explícito)
**La consigna dice**: "esta consigna no fija penalizaciones adicionales ni un mínimo de aprobación" (a pesar de informar el uso de frameworks como incumplimiento).
**Impacto**: no hay umbral de aprobación conocido; solo existe la distribución de 100 puntos.
**Resolución propuesta**: confirmar con el docente si existe nota mínima o regla de promoción (no deducible de la fuente).

## Preguntas abiertas (priorizadas)

| Prioridad | ID | Pregunta | Bloquea | Decisor |
|-----------|----|----------|---------|---------|
| Alta | PA-01 | ¿Cuáles son las fechas, el canal de entrega y la modalidad de trabajo? (la consigna dice que el docente los comunica por separado) | Entrega final | Docente |
| Alta | PA-02 | ¿Las editoriales, géneros y autores se persisten en `localStorage` también, o quedan solo como datos estáticos en JS? (solo "libros, clientes y ventas" están nombrados en el Ejercicio 6) | Diseño de datos y persistencia (Ej. 6) | Docente |
| Alta | PA-03 | ¿Cuál es la clave/estructura exacta del catálogo guardado en `localStorage`? El README debe identificarla para reproducir la comprobación guiada de precio histórico | Ejercicio 6 (documentación, 3 pts) | Docente / Implementador |
| Media | PA-04 | ¿Qué formato tienen el identificador y la fecha de venta (correlativo/UUID, `dd/mm/aaaa`, ISO)? | Historial (Ej. 5) | Implementador / Docente |
| Media | PA-05 | ¿Se entrega multi-página (varios HTML) o con secciones en `index.html`? Ambas son válidas según la consigna | Estructura de navegación (Ej. 1) | Implementador |
| Media | PA-06 | Ante libro repetido en la venta, ¿se modifica la cantidad del renglón existente **o** se informa el duplicado? (la consigna admite ambas) | Composición de ventas (Ej. 5) | Implementador / Docente |
| Media | PA-07 | ¿Cuáles son los datos seed exactos (nombres, precios ficticios)? La consigna fija cantidades mínimas pero no contenidos; el ejemplo de cálculo usa 1500/2000 | Modelo y ejemplos (Ej. 3, 5 pts) | Implementador |
| Baja | PA-08 | ¿Qué ocurre si `localStorage` contiene datos corruptos o de otra versión? No hay manejo definido en la consigna | Robustez (no evaluada explícitamente) | Implementador |
| Baja | PA-09 | ¿Qué navegador/sistema operativo se usa para la evaluación (320 px / 1280 px, teclado, `localStorage`)? | Casos manuales 7 y 8 | Docente |
| Baja | PA-10 | ¿Debe incluirse el nombre de la materia/carrera/curso en portada del README más allá de "identificar a quienes realizan el trabajo"? | Formato del README (Ej. 6, 3 pts) | Docente |

## Nota

Ninguna de estas preguntas fue cerrada por el autor de la KB. Toda regla no contemplada aquí permanece **sin definir** hasta confirmación del docente.
