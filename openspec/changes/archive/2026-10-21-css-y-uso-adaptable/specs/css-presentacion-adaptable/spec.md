# Spec Delta — css-presentacion-adaptable

## Purpose

Define la presentación visual y el uso adaptable de la interfaz de la librería: hoja de estilos externa única, identidad visual coherente con variables CSS y clases reutilizadas, layout con Flexbox/Grid, adaptación a 320 px y 1280 px sin desplazamiento horizontal de la página, contención del desplazamiento de las tablas, accesibilidad básica de CSS (foco visible, mensajes con texto, alts de imagen) y visualización de una vista a la vez degradable sin JavaScript.

## ADDED Requirements

### Requirement: Hoja de estilos externa enlazada
La página SHALL cargar sus estilos desde un único archivo externo `css/styles.css` enlazado con `<link>` en `index.html`, sin `<style>` en el documento y sin atributos `style` inline.

#### Scenario: Estilos cargados desde archivo externo
- **WHEN** se abre `index.html` con doble clic en el navegador
- **THEN** la hoja de estilos externa se aplica correctamente sin servidor ni herramientas de compilación, y la petición del archivo CSS se resuelve sin errores 404

#### Scenario: Sin estilos embebidos en el HTML
- **WHEN** se inspecciona `index.html`
- **THEN** no existen elementos `<style>` ni atributos `style` en ninguna etiqueta, y todo el CSS vive en `css/styles.css`

### Requirement: Variables CSS para colores y espaciado
La hoja de estilos SHALL definir custom properties en `:root` con una paleta de colores (fondo, superficie, texto, acento primario y estados de error/éxito) de contraste suficiente y una escala de espaciado reutilizable, y SHALL usar esas variables en las reglas en lugar de valores mágicos repetidos.

#### Scenario: Tokens declarados en `:root`
- **WHEN** se inspecciona `css/styles.css`
- **THEN** existen custom properties de colores y de espaciado declaradas en `:root` y las reglas las consumen mediante `var()`

#### Scenario: Contraste suficiente del texto
- **WHEN** se observa la interfaz en los colores definidos
- **THEN** el texto principal y los controles tienen contraste suficiente para ser legibles en fondo y superficie

### Requirement: Identidad visual coherente con clases reutilizadas
La interfaz SHALL presentar una identidad visual coherente —tipografía, tarjetas o bloques de contenido, formularios y botones— reutilizando las mismas clases CSS para elementos equivalentes de distintas vistas, con nomenclatura de clases siguiendo la convención BEM (bloque, elemento, modificador).

#### Scenario: Elementos equivalentes comparten estilo
- **WHEN** se comparan, por ejemplo, los formularios de Libros y Clientes o los botones de «Registrar libro» y «Registrar cliente»
- **THEN** usan las mismas clases y se ven visualmente equivalentes

#### Scenario: Nomenclatura BEM
- **WHEN** se revisan las clases definidas en `css/styles.css` y usadas en `index.html`
- **THEN** siguen la convención BEM (bloque, bloque\_\_elemento, bloque--modificador) con nombres comprensibles

### Requirement: Layout con Flexbox o Grid
La navegación, los listados y los formularios SHALL organizarse con Flexbox o CSS Grid, de modo que la barra de navegación, las zonas de contenido y los campos de formulario queden alineados de forma consistente.

#### Scenario: Navegación organizada con Flexbox o Grid
- **WHEN** se observa el `nav` en pantalla
- **THEN** sus enlaces están dispuestos con Flexbox o Grid (por ejemplo, en fila con espaciado uniforme) y no dependen de comportamiento heredado del navegador

#### Scenario: Formularios y listados maquetados
- **WHEN** se observan las vistas con formularios y listados
- **THEN** los campos, botones y bloques están alineados gracias a Flexbox o Grid, con consistencia entre vistas

### Requirement: Adaptación verificada a 320 px y 1280 px
La interfaz SHALL adaptarse a anchos de 320 px y 1280 px manteniendo textos y controles legibles y sin desplazamiento horizontal de la página completa, mediante diseño mobile-first con media queries.

#### Scenario: A 320 px de ancho
- **WHEN** se visualiza la página a 320 px de ancho (herramientas de desarrollo del navegador)
- **THEN** los textos, campos y botones se leen completos, se ajustan al viewport y la página completa no tiene scroll horizontal

#### Scenario: A 1280 px de ancho
- **WHEN** se visualiza la página a 1280 px de ancho
- **THEN** el layout aprovecha el ancho disponible con la navegación, formularios y listados correctamente alineados y sin solapamientos

### Requirement: Desplazamiento de tablas contenido en cada tabla
Cada tabla de la interfaz SHALL estar envuelta en su propio contenedor con desplazamiento horizontal propio (`overflow-x: auto`), de modo que cuando una tabla es más ancha que el viewport el scroll ocurra dentro de su contenedor y no en la página completa.

#### Scenario: Tabla más ancha que el viewport
- **WHEN** una tabla tiene contenido que excede el ancho disponible (por ejemplo, a 320 px)
- **THEN** aparece una barra de desplazamiento dentro del contenedor de esa tabla y la página completa no se desplaza horizontalmente

### Requirement: Foco visible en todos los controles
Todos los controles interactivos (enlaces, campos, selectores y botones) SHALL mostrar un foco visible con `:focus-visible` de contraste alto cuando se navega con el teclado.

#### Scenario: Recorrido con teclado
- **WHEN** se presiona Tab para recorrer enlaces, campos y botones
- **THEN** cada control enfocado muestra un indicador de foco claramente visible (por ejemplo, un contorno de alto contraste)

### Requirement: Estados diferenciados por texto y no solo por color
Los mensajes de error y de éxito SHALL comunicar su significado con contenido textual (por ejemplo, un prefijo «Error:» o mensaje explícito), sin depender únicamente del color para distinguirse.

#### Scenario: Error legible sin distinguir colores
- **WHEN** se muestra un mensaje de error junto a un formulario
- **THEN** el texto del mensaje identifica claramente que se trata de un error, aun percibiendo la página en escala de grises

### Requirement: Alternativas de texto en imágenes
Si la interfaz contiene imágenes informativas, estas SHALL tener atributo `alt` con texto alternativo descriptivo; las imágenes decorativas SHALL declararse como tales (por ejemplo, `alt` vacío) sin repetir el texto adyacente.

#### Scenario: Imagen informativa con `alt`
- **WHEN** se agrega una imagen que aporta información (por ejemplo, una portada de libro)
- **THEN** su atributo `alt` describe esa información para quien no puede verla

#### Scenario: Imagen decorativa sin redundancia
- **WHEN** se agrega una imagen meramente decorativa
- **THEN** su `alt` está vacío o la imagen se marca como presentación, y no duplica texto visible en la página

### Requirement: Visualización de una vista a la vez con degradación
La navegación SHALL poder mostrar una vista a la vez usando exclusivamente CSS (sin JavaScript): al activar un ancla de una vista de primer nivel se muestra únicamente esa sección; sin ancla activa, las cinco secciones permanecen apiladas en el orden del documento. En navegadores sin soporte de las pseudo-clases requeridas, la interfaz SHALL degradar al comportamiento apilado de todas las secciones con navegación por anclas funcional.

#### Scenario: Sin ancla se ven todas las secciones apiladas
- **WHEN** se abre o recarga la página sin ancla en un navegador con soporte
- **THEN** se ven las cinco secciones una debajo de otra en el orden del documento (Catálogo primero), con la navegación por anclas disponible

#### Scenario: Una sola vista visible en navegador con soporte
- **WHEN** se hace clic en un enlace del nav (por ejemplo, «Clientes»)
- **THEN** se muestra únicamente la sección de Clientes con su contenido y las demás vistas de primer nivel quedan ocultas

#### Scenario: Degradación elegante sin soporte
- **WHEN** la página se abre en un navegador que no soporta las pseudo-clases empleadas
- **THEN** todas las secciones se muestran apiladas, la navegación por anclas sigue funcionando y nada resulta inaccesible

#### Scenario: Zona de detalle dentro de Historial
- **WHEN** se activa la vista Historial
- **THEN** la zona de detalle de venta (`#detalle-venta`) permanece visible dentro de su sección, al no ser una vista de primer nivel
