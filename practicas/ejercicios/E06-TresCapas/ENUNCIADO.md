# E06 · Refactorizar una página a tres capas

**Tipo:** autocorrección

Una página de ofertas que funciona, pero mezcla contenido, aspecto y comportamiento en un solo fichero. Sepárala en tres capas sin cambiar lo que hace.

**CE:** RA6 h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

Tu versión de la página cargará `js/main.js` como módulo, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3506) y abre <http://localhost:3506> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3506 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3506 .`.

## Punto de partida

`index.html` contiene todo: estilos en un `<style>` y en atributos `style`, etiquetas `<font>`, funciones globales en un `<script>`, atributos `onclick`, un enlace `javascript:` y un JavaScript que guarda el estado de cada oferta **en su color de fondo**. Ábrelo y comprueba qué hace: cerrar el aviso, marcar y desmarcar ofertas como favoritas y contar los favoritos.

## Requisitos

1. **Contenido** (`index.html`): HTML semántico, sin `style`, sin `<style>`, sin `<font>`, sin `onclick` ni `javascript:`, y sin `<script>` con código. Usa `<h1>` para el título, una lista para las ofertas, un `<button>` para marcar cada oferta (con `aria-pressed` y `aria-label`) y otro para cerrar el aviso. Añade `lang="es"` y `meta viewport`.
2. **Aspecto** (`css/estilos.css`): todos los estilos, con clases que digan **qué es** cada cosa. El aspecto de una oferta favorita depende de una **clase de estado**.
3. **Comportamiento** (`js/main.js`, como módulo):
   - Cerrar el aviso con el atributo `hidden`.
   - Marcar una oferta alterna su clase de estado, `aria-pressed` y el icono ★/☆; **un solo oyente** en la lista.
   - El contador se calcula contando los elementos con la clase de estado, y se escribe con `textContent`.
   - Sin `var`, sin `==`, sin `innerHTML` y sin ninguna propiedad de estilo.
4. Completa la tabla de la sección «Cambios» del README: **problema en el original**, **qué capa se mezclaba** y **cambio realizado**, con al menos ocho filas.

**Entrega.** Completa el `README.md`: cómo abres la página, qué ves en cada comprobación de «Comprueba tu solución» y la tabla de cambios.

## Comprueba tu solución

- La página hace exactamente lo mismo que antes, con el mismo aspecto.
- Busca en tu proyecto `style=`, `<style`, `onclick`, `javascript:`, `<font`, `.style.` e `innerHTML`: no debe aparecer ninguno.
- Desactiva el CSS (en Firefox: Ver → Estilo de página → Sin estilo): el contenido se entiende (título, lista, botones).
- Usa la página **solo con el teclado** (Tabulador e Intro): puedes marcar favoritos y cerrar el aviso. En el original, no.
- Cambia en el CSS el fondo de los favoritos: el comportamiento sigue funcionando (en el original, el JavaScript dejaría de saber qué está marcado).

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
