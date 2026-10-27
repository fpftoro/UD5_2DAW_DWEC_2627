# E03 · Lista de tareas

**Tipo:** autocorrección

La clásica lista de tareas, hecha solo con el DOM: crear, marcar, borrar y limpiar, con un único oyente para todas las tareas.

**CE:** RA6 d, e

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3503) y abre <http://localhost:3503> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3503 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3503 .`.

## Punto de partida

`index.html` tiene un campo con su botón «Añadir», una lista vacía, un párrafo de estado y un botón para borrar las completadas. `estilos.css` ya define `.completada` y `.vacia`. `js/main.js` está vacío.

## Requisitos

1. Una función `crearTarea(texto)` que devuelve un `<li data-id="…">` con una casilla (`.marcar`), un `<span class="texto">` y un botón (`.borrar`), creados con `createElement`. El texto, con `textContent`. La casilla y el botón llevan un `aria-label` que incluye el texto.
2. Al pulsar «Añadir» (evento `click`) o la tecla Intro en el campo (evento `keydown` con `evento.key === 'Enter'`): si el texto sin espacios no está vacío, añade la tarea **al principio** de la lista, vacía el campo y le devuelve el foco. Las dos formas llaman a la misma función.
3. **Un solo oyente** `click` en la lista (delegación con `closest` y `matches`):
   - La casilla marca o desmarca la tarea con la clase `completada`.
   - El botón la elimina con `remove()`.
4. **Borrar las completadas** elimina todas las que tienen la clase. El botón está **desactivado** (`disabled`) si no hay ninguna completada.
5. Después de cada cambio, `#pendientes` dice `N tareas pendientes de M` (o `1 tarea pendiente…`; sin texto si no hay ninguna tarea) y, si la lista se queda vacía, aparece un `<li class="vacia">No hay tareas</li>`, que desaparece al añadir una.
6. Sin `innerHTML`, sin `onclick` y sin estilos en el JavaScript.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Al cargar: «No hay tareas» en la lista, el párrafo de estado sin texto y «Borrar las completadas» desactivado.
- Añade «Comprar pan» y «Llamar al médico»: «Llamar al médico» queda arriba; `2 tareas pendientes de 2`.
- Marca una: se tacha, `1 tarea pendiente de 2` y el botón de limpiar se activa. Desmárcala: vuelve a estar pendiente.
- Añade la tarea `<b>Estudiar</b>`: se ve con las etiquetas.
- Intenta añadir una tarea con solo espacios: no se añade nada.
- Borra todas las tareas una a una: vuelve a aparecer «No hay tareas».
- En el panel Elementos, la lista tiene **un** oyente de `click` (pestaña **Procesadores de eventos**, *Event Listeners*), aunque haya muchas tareas.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
