# Arquitectura Propuesta

> Todo lo siguiente respeta el alcance duro de la consigna: HTML, CSS y JavaScript nativo; sin frameworks, librerías, CDNs, servidor, API ni base de datos. Donde la consigna no fija un detalle, se marca como propuesta/supuesto (SU-xx en [09_decisiones_y_supuestos.md](09_decisiones_y_supuestos.md)).

## Patrones aplicados

| Patrón | Dónde se usa | Por qué |
|--------|--------------|---------|
| Separación estructura / estilos / comportamiento | HTML / CSS externo / JS | Exigido explícitamente: "separación entre estructura, estilos y comportamiento" |
| Renderizado desde datos | Catálogo, listados, historial, opciones de selectores | El catálogo se genera con JS a partir del array de libros; listados e historial se conectan con los datos locales |
| Módulos/funciones por responsabilidad | JS (vista, validaciones, cálculos, persistencia) | Exige "eventos y funciones con responsabilidades reconocibles" y "funciones acotadas" |
| Validación en cliente con `preventDefault` | Formularios de libros, clientes y venta | Exigido por la consigna; errores cerca del formulario |
| Capa de almacenamiento local | Lectura/escritura de libros, clientes y ventas en `localStorage` | Único mecanismo de persistencia permitido |
| Inserción segura como texto | Todo dato escrito por usuarios → DOM | Exigido: "los datos escritos por usuarios se insertan como texto en el DOM" |
| Valor histórico por copia | Precio unitario al confirmar la venta | Exigido: el historial no relee el precio del catálogo |

## Estructura de directorios (propuesta de entrega)

La consigna exige: carpeta o comprimido con `index.html`, los demás HTML si corresponden, carpetas de CSS, JavaScript y recursos locales, y `README.md`, **sin dependencias instaladas ni herramientas de compilación**. Nombres exactos de carpetas no fijados (SU-01):

```
parcial1-libreria/
├── index.html              ← entrada obligatoria
├── [otros .html]           ← solo si se elige multi-página (DD-05)
├── css/
│   └── styles.css          ← CSS externo, clases reutilizadas
├── js/
│   ├── datos.js            ← arrays/objetos iniciales (seed) (SU-02)
│   ├── catalogo.js         ← render + filtro (responsabilidad reconocible)
│   ├── formularios.js      ← altas y validaciones
│   ├── ventas.js           ← renglones, cálculos, confirmación
│   ├── historial.js        ← consulta inmutable
│   └── persistencia.js     ← localStorage (lectura/escritura/seed)
├── img/                    ← recursos locales, solo si existen
└── README.md               ← obligatorio (contenidos en RN-ENT-05)
```

La consigna no impone nombres de archivos JS: lo que exige es que la separación y la legibilidad sean evidentes.

## Seguridad

- **Autenticación**: no aplica — "no se requiere un inicio de sesión real".
- **Autorización**: no aplica — sin roles.
- **Validación de input**: toda en el cliente (no vacíos, formatos, unicidad de ISBN/email, precios > 0, cantidades enteras > 0, existencia de referencias). No hay validación server-side posible.
- **Inyección/DOM**: datos de usuarios insertados **como texto** en el DOM.
- **Secrets management**: no aplica — no hay credenciales ni variables de entorno.
- **Nota de la consigna**: validaciones y almacenamiento del navegador son solo para la práctica; no representan seguridad ni integridad garantizada por un servidor (RN-GLO-04).

## Variables de entorno

**No aplica.** No hay build, servidor ni configuración externa. El proyecto se abre directamente con `index.html` en el navegador (sin npm), tal como exige el README.

## Formato de entrega

- **Artefacto**: carpeta o archivo comprimido con `index.html`, los demás HTML si corresponden, carpetas de CSS, JavaScript y recursos locales, y `README.md`.
- **Excluido**: dependencias instaladas y herramientas de compilación.
- **README identifica a los autores** y contiene:
  1. Pasos para abrir `index.html` en el navegador sin npm.
  2. Navegación entre vistas.
  3. Funcionalidades implementadas y pendientes.
  4. Ubicación de los datos iniciales.
  5. Funcionamiento y límites de `localStorage` (depende del navegador, del perfil y de la ubicación de apertura; no comparte información entre usuarios).
  6. Resultados de los casos manuales (los 8 de la consigna).
  7. Procedencia de imágenes ajenas, si existen.
  8. Ubicación y estructura del catálogo guardado en `localStorage` (para reproducir la comprobación de precio histórico).
- **Alcance**: la entrega reúne el alcance completo del parcial. Fechas, canal de entrega y modalidad de trabajo los comunica el docente por separado (PA-01).
