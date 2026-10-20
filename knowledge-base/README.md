# Parcial 1 — Frontend de Librería (Programación III) — Base de Conocimiento

Base de conocimiento generada a partir de los documentos del proyecto.

**Fuente única**: `docs/Consigna Primer Parcial (2).pdf` — "UNIDAD HTML, CSS Y JAVASCRIPT · PARCIAL 1 · Parcial 1: frontend de una librería" (Materia: Programación III, Tecnicatura Universitaria en Programación; Revisor de la unidad: Prof. Matías Torres).

## Índice de Archivos

| Archivo | Contenido |
|---------|-----------|
| [01_vision_y_objetivos.md](01_vision_y_objetivos.md) | Propósito, objetivos de la consigna, actores, alcance del parcial y fuera de alcance |
| [02_descripcion_general.md](02_descripcion_general.md) | Stack (HTML/CSS/JS nativo), arquitectura estática en navegador, ausencia total de integraciones |
| [03_actores_y_roles.md](03_actores_y_roles.md) | Actores (sin autenticación), permisos, vistas públicas |
| [04_modelo_de_datos.md](04_modelo_de_datos.md) | Entidades (libros, editoriales, géneros, autores, clientes, ventas, renglones), ERD, seed mínimo, localStorage |
| [05_reglas_de_negocio.md](05_reglas_de_negocio.md) | Reglas codificadas (RN-*) por dominio: catálogo, altas, ventas, persistencia, entrega |
| [06_funcionalidades.md](06_funcionalidades.md) | Los 6 ejercicios como épicas con sus puntos e historias de usuario; distribución de puntos (100) |
| [07_flujos_principales.md](07_flujos_principales.md) | Flujos extremo a extremo: carga inicial, búsqueda, altas, venta, historial, recarga |
| [08_arquitectura_propuesta.md](08_arquitectura_propuesta.md) | Patrones, estructura de directorios de la entrega, seguridad, formato de entrega y README |
| [09_decisiones_y_supuestos.md](09_decisiones_y_supuestos.md) | Decisiones fijadas por la consigna (DD-*) y supuestos inferidos (SU-*) |
| [10_preguntas_abiertas.md](10_preguntas_abiertas.md) | Inconsistencias y preguntas abiertas priorizadas (no resueltas por la fuente) |

## Quick Start para Desarrolladores

1. Entender el dominio → [01](01_vision_y_objetivos.md), [03](03_actores_y_roles.md)
2. Entender los datos → [04](04_modelo_de_datos.md)
3. Entender las reglas → [05](05_reglas_de_negocio.md)
4. Entender la arquitectura → [02](02_descripcion_general.md), [08](08_arquitectura_propuesta.md)
5. Implementar → [07](07_flujos_principales.md), [06](06_funcionalidades.md)
6. Antes de codificar → [10](10_preguntas_abiertas.md)

## Resumen Ejecutivo

Frontend exclusivo de una librería (HTML semántico, CSS propio y JavaScript nativo, sin frameworks ni CDNs) con catálogo, altas de libros y clientes, venta simulada e historial, persistiendo en `localStorage`. Evalúa 6 ejercicios con 100 puntos y se entrega como carpeta con `index.html` y `README.md`, sin dependencias ni compilación.
