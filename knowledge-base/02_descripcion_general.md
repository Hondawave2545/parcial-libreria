# Descripción General

## Stack tecnológico

| Capa | Tecnologías | Versión mínima |
|------|-------------|----------------|
| Estructura | HTML semántico (`header`, `nav`, `main`, tablas, formularios con etiquetas asociadas) | No especificada en la consigna |
| Presentación | CSS propio en archivos externos; Flexbox o Grid; reutilización de clases | No especificada en la consigna |
| Comportamiento | JavaScript nativo (DOM, eventos, funciones con responsabilidades reconocibles) | No especificada en la consigna |
| Almacenamiento | `localStorage` del navegador (libros, clientes, ventas) | No especificada en la consigna |
| Recursos | Imágenes/estilos/scripts incluidos en el proyecto (locales, sin CDN) | No aplica |

Restricción dura de la consigna: se utilizan **únicamente HTML, CSS y JavaScript nativos**. Los estilos, scripts, imágenes y demás recursos se incluyen en el proyecto. No se usan librerías, frameworks ni CDNs de CSS o JavaScript. Su uso incumple el alcance técnico y se informa en la evaluación.

## Arquitectura general

Arquitectura estática de página única o multi-página, 100 % en el navegador, sin servidor:

```
┌──────────────────────────────────────────────────────┐
│ index.html (+ otros .html si corresponden)           │
│  ├── header / nav (navegación entre vistas)          │
│  └── main (Catálogo · Libros · Clientes · Ventas ·   │
│            Historial)                                │
│         ▲ render (DOM)                               │
│         │                                            │
│  ┌──────┴───────┐    eventos (submit, input, click)  │
│  │ JS nativo    │◄────────────────────────────────── │
│  │ (vistas,     │                                    │
│  │  validación, │── arrays/objetos en memoria ──┐    │
│  │  cálculos)   │                              │    │
│  └──────────────┘                              ▼    │
│                                     localStorage     │
│                                     (libros,         │
│                                      clientes,       │
│                                      ventas)         │
└──────────────────────────────────────────────────────┘
        Sin API · Sin BD · Sin servidor · Sin backend
```

Justificación: la consigna exige que los datos y las operaciones se simulen en el navegador y prohíbe backend, API y base de datos. La separación exigida entre estructura, estilos y comportamiento (HTML / CSS / JS) define las tres capas del proyecto.

## Integraciones externas

| Servicio | Propósito | Tipo |
|----------|-----------|------|
| Ninguno | La consigna no requiere API, base de datos, servidor ni conexión con el backend | No aplica |

Tampoco se requiere inicio de sesión real, servicios de autenticación, pasarelas de pago ni proveedores de imágenes externos (las imágenes, si existen, deben incluirse en el proyecto y documentar su procedencia en el README).

## API REST (no aplica)

No existen endpoints. Toda la persistencia ocurre vía `localStorage` y toda la lógica en el navegador. Los datos escritos por usuarios se insertan como texto en el DOM (no se usa `fetch`).
