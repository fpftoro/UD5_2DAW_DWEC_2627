# Tablero kanban

<!-- Completa cada sección. Borra los comentarios como este cuando termines. -->

## Cómo ejecutarlo

<!-- Cómo ver la página (también con ?sin=transiciones) y cómo pasar los tests, ESLint y Prettier. -->

## El árbol del tablero

<!-- Dibuja (árbol de texto o diagrama Mermaid) el DOM de #tablero con dos columnas y una tarjeta,
     tal como queda después de pintarTablero. Indica qué nodos vienen de cada plantilla y qué atributos
     pone el código. Explica por qué el HTML inicial casi no tiene contenido. -->

## Módulos y capas

<!-- Tabla módulo | responsabilidad | ¿usa el DOM? Y qué hay en cada capa (HTML, CSS, JS): qué clases y
     atributos de estado pone el JavaScript y qué hace el CSS con ellos. -->

| Módulo | Responsabilidad | ¿Usa el DOM? |
|--------|-----------------|:------------:|
| | | |

## Eventos

<!-- Qué eventos escucha el tablero, en qué elemento y por qué con delegación (piensa en qué pasa al
     volver a pintar). Cómo distingues el botón pulsado y la tecla Intro. A quién avisa el tablero
     de cada cambio (alCambiar) y qué hace main.js con ese aviso. -->

## Compatibilidad

<!-- Qué dice MDN de View Transitions (versiones de Chrome, Firefox y Safari, y estado Baseline),
     cómo la detectas y qué pasa cuando no está. Cómo has probado la alternativa (?sin=transiciones
     y, si puedes, un navegador sin la API). -->

## Pruebas

<!-- 1. Pega la salida de `npm test` y la de `npm run e2e`.
     2. Qué prueba cada fichero, y cada prueba de extremo a extremo. Di de qué tipo es cada uno en la
        pirámide y qué compruebas con Playwright que no puedes comprobar con happy-dom.
     3. Cómo simulas los clics y la tecla Intro, cómo compruebas alCambiar y cómo pruebas el caso
        con transiciones en happy-dom, que no las tiene. -->

## Depuración

<!-- Un problema real que resolviste con el panel Elementos, un punto de ruptura de DOM o de eventos,
     o el depurador: qué veías, qué herramienta usaste y qué cambiaste. -->

## Herramientas

<!-- Pega la salida de `npm run lint` y de `npm run format:check`. -->

## Integración continua (opcional)

<!-- Solo si has hecho el apartado opcional de integración continua del enunciado; si no, borra esta sección.
     1. Enlace a una ejecución en verde de la pestaña Actions de tu repositorio.
     2. Captura de esa ejecución con sus pasos: guárdala en img/ y enlázala aquí.
     3. Captura de una ejecución en rojo provocada a propósito, y qué cambiaste para provocarla. -->
