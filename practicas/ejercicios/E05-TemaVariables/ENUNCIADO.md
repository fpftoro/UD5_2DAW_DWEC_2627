# E05 · Tema con clases y variables CSS

**Tipo:** autocorrección

Un panel de ajustes que cambia el tema, el color de acento, el tamaño de letra y la densidad de un blog, sin escribir un solo estilo desde JavaScript: el código cambia el **estado** y el CSS decide el **aspecto**.

**CE:** RA6 d, h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3505) y abre <http://localhost:3505> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3505 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3505 .`.

## Punto de partida

`index.html` tiene el formulario de ajustes y dos entradas del blog. `estilos.css` solo tiene los estilos básicos del `body`. `js/main.js` está vacío.

## Requisitos

**CSS** (`estilos.css`):

1. Define en `:root` variables para los colores (`--fondo`, `--texto`, `--tarjeta`, `--acento`), el tamaño de letra (`--tamano-letra`) y el espaciado (`--espacio`), y úsalas en los estilos del `body`, los enlaces, el título y las entradas.
2. Con `:root[data-tema='oscuro']`, los colores del tema oscuro. Con `@media (prefers-color-scheme: dark)` y `:root[data-tema='sistema']`, los mismos colores, solo si el sistema prefiere el oscuro.
3. Con `:root.compacto`, un `--espacio` menor.

**JavaScript** (`js/main.js`):

4. Una función `aplicar(valores)` que **solo**: pone el atributo `data-tema` en `<html>`, cambia las variables `--acento` y `--tamano-letra` con `style.setProperty`, y añade o quita la clase `compacto` con `classList.toggle`.
5. Aplica los ajustes mientras el usuario los cambia: eventos `input` (deslizador y color, en tiempo real) y `change` (radios y casilla), con **un oyente por tipo de evento en el formulario**, no uno por campo. Lee los valores de los campos con `querySelector` dentro del formulario: `value` en el color y el deslizador, `checked` en la casilla y, en el tema, el botón de opción marcado (`[name="tema"]:checked`).
6. **Restablecer** devuelve el formulario y la página a los valores iniciales. `formulario.reset()` devuelve los campos a los valores escritos en el HTML (lo verás con más detalle en la UD6); después, vuelve a aplicarlos.
7. Ninguna propiedad de estilo concreta (`style.color`, `style.background`…) en el JavaScript.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Busca `.style.` en `main.js`: solo aparece en `style.setProperty('--…')`.
- Elige «Oscuro»: fondo oscuro. Elige «Del sistema» y emula `prefers-color-scheme: dark` en las DevTools (Renderizado): también oscuro; emula `light`: claro.
- Mueve el selector de color: el título, los enlaces y el borde de las entradas cambian **mientras** lo mueves.
- Mueve el deslizador: el texto crece y decrece en tiempo real.
- Marca «Vista compacta»: el espacio de las entradas se reduce.
- En el panel Elementos, `<html>` tiene `data-tema="…"`, `class="compacto"` (si está marcado) y `style="--acento: …; --tamano-letra: …"`; ningún otro elemento tiene `style`.
- Pulsa «Restablecer»: todo vuelve al estado inicial.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
