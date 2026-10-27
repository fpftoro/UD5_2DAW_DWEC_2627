# E01 · Explorador del árbol del documento

**Tipo:** autocorrección

Una página que se analiza a sí misma: dibuja el árbol DOM de un artículo, cuenta sus nodos por tipo, demuestra la diferencia entre colecciones vivas y estáticas, e inspecciona el elemento que pulses.

**CE:** RA6 a, b

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3501) y abre <http://localhost:3501> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3501 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3501 .`.

## Punto de partida

`index.html` tiene, a la izquierda, un artículo de muestra (con un comentario, textos, enlaces y una lista) y, a la derecha, los paneles que hay que rellenar. `js/main.js` está vacío.

## Requisitos

1. **Árbol:** escribe en `#arbol` (con `textContent`) el árbol del artículo `#muestra`, generado con una función **recursiva** que recorra `childNodes`. Una línea por nodo con sangría según la profundidad: los elementos con su etiqueta, `#id` y `.clases`; los comentarios como `<!-- … -->`; los textos entre comillas y los que solo tienen espacios como `(espacios)`.
2. **Tipos:** en `#tipos`, cuántos nodos hay de cada tipo en el artículo (elementos, textos y comentarios), con su `nodeType`. Usa las constantes `Node.ELEMENT_NODE`… y un `Map`.
3. **Colecciones:** guarda **al cargar** `querySelectorAll('li')` y `children` de la lista `#recetas`. El botón «Añadir receta» crea un `<li>` nuevo con `createElement`, lo añade a la lista, vuelve a pintar el árbol y muestra en `#colecciones` la longitud de **las dos colecciones guardadas**.
4. **Inspector:** con **un solo** oyente en el artículo, al pulsar cualquier elemento muestra en `#inspector`: su etiqueta, su cadena de herencia (recorriendo los prototipos), sus atributos, su padre, cuántos nodos y elementos hijos tiene, y sus hermanos elemento anterior y siguiente. El elemento pulsado se marca con la clase `seleccionado` (y se desmarca el anterior).

**Entrega.** Completa el `README.md`: cómo abres la página, qué ves en cada comprobación de «Comprueba tu solución» y por qué hay más textos que elementos.

## Comprueba tu solución

- El árbol empieza por `article#muestra`, la siguiente línea es `│ (espacios)` y aparece `│ <!-- Artículo de muestra -->`.
- Los tipos dicen 1 comentario, y hay más nodos de texto que elementos. Explica por qué en la sección «Más textos que elementos» del README.
- Al pulsar «Añadir receta» dos veces: `querySelectorAll (estática): 3 · children (viva): 5`, y el árbol muestra las recetas nuevas.
- Al pulsar el `<strong>`: `Herencia: HTMLElement → Element → Node → EventTarget`, padre `P`, 1 nodo y 0 elementos hijos. Al pulsar el enlace: `HTMLAnchorElement → HTMLElement → …` y su `href="#recetas"` entre los atributos. Es un enlace interno: la página baja hasta las recetas sin salir de ella.
- Al pulsar «Gazpacho»: hermano anterior `LI`, siguiente `LI`.
- Compara tu árbol con el panel **Elementos** de las DevTools: tienen la misma estructura.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
