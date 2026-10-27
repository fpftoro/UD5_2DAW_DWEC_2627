# E07 · Detección de características con alternativa

**Tipo:** autocorrección

Una página de recetas que usa `<dialog>`, `navigator.share` y el portapapeles **si existen**, y ofrece una alternativa que mantiene la funcionalidad **si no**. Una opción de la URL permite simular que no existen para probar las alternativas.

**CE:** RA6 f, g

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3507) y abre <http://localhost:3507> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3507 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3507 .`.

## Punto de partida

- `index.html`: la receta con dos botones, un `<dialog>` con los pasos, una lista `#soporte` y una zona de avisos.
- `estilos.css`: incluye la clase `.sin-soporte`, que muestra el `<dialog>` como una capa encima de la página en navegadores que no lo soportan.
- `js/soporte.js`: la función `detectar()` con la simulación (`?sin=…`) hecha, sin las tres detecciones.
- `js/main.js`: vacío.

## Requisitos

1. **Investiga** en MDN el estado Baseline de `<dialog>`, `navigator.share` y `navigator.clipboard.writeText`, y anótalo en la sección «Compatibilidad según MDN» del README: desde qué versión de Chrome, Firefox y Safari funciona cada uno y si es «Disponible ampliamente».
2. Completa `detectar()` con **detección de características** (nunca del navegador): `showModal` en `HTMLDialogElement.prototype`, `navigator.share` y `navigator.clipboard?.writeText` como funciones.
3. Muestra en `#soporte` una línea por característica: disponible o no disponible (se usa una alternativa).
4. **Ver los pasos**: con soporte, `showModal()`. Sin soporte, el mismo `<dialog>` con la clase `sin-soporte` y el atributo `hidden`, que el botón quita. El botón «Cerrar» (`#cerrar-pasos`) cierra los pasos en los dos casos: con `close()` si hay `<dialog>` y volviendo a poner `hidden` si no. En la alternativa, lleva tú el foco al botón «Cerrar» al abrir y a «Ver los pasos» al cerrar (con `<dialog>` lo hace el navegador).
5. **Compartir**: con `navigator.share`, el diálogo nativo de compartir (si el usuario lo cancela, no es un error); si no, copia el enlace con el portapapeles y lo avisa; y si tampoco (o si el navegador no da permiso para copiar), muestra el enlace en el aviso para que lo copie a mano.

> 📝 **Nota del Profesor**: `navigator.share` y `navigator.clipboard.writeText` terminan más tarde y pueden fallar. Escribe `async` delante de la función del oyente y `await` delante de cada llamada, dentro de un `try`/`catch` (UD3): si falla, se ejecuta el `catch`. Lo verás a fondo en la UD7 (asincronía).
6. Comprueba la página en **dos navegadores distintos** (por ejemplo, Chrome y Firefox, o un móvil) y anota en la sección «Prueba en dos navegadores» del README qué mostró cada uno.

**Entrega.** Completa el `README.md`: cómo abres la página, la compatibilidad según MDN, la prueba en dos navegadores y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

Los parámetros se escriben detrás de la dirección de la página: `/?sin=dialog` es <http://localhost:3507/?sin=dialog>. No pongas `index.html` delante del `?`: `serve` redirige `/index.html` a `/index` y por el camino se pierden los parámetros.

- Sin parámetros, en un navegador de escritorio actual: `<dialog>` disponible y portapapeles disponible; «Compartir» suele no estar disponible en escritorio (o sí en algunos, según el sistema).
- Abre `/?sin=dialog`: «Ver los pasos» muestra los pasos encima de la página y «Cerrar» los oculta, sin recargar.
- Abre `/?sin=share,clipboard` y pulsa «Compartir»: aparece «Copia este enlace: …».
- Abre `/?sin=share`: «Compartir» copia el enlace y lo avisa.
- Busca `userAgent` en tu código: no debe aparecer.
- Con `?sin=dialog`, navega con el teclado: al abrir los pasos el foco va al botón «Cerrar», y al cerrarlos vuelve a «Ver los pasos».

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
