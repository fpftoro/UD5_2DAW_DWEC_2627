# E04 · Galería con `<template>`

**Tipo:** autocorrección

Una galería de destinos cuyas tarjetas se crean clonando un `<template>` del HTML, con filtros por continente y favoritos.

**CE:** RA6 d

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3504) y abre <http://localhost:3504> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3504 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3504 .`.

## Punto de partida

- `index.html`: una barra `#filtros` y una sección `#galeria` vacías, y un comentario donde va la plantilla.
- `estilos.css`: estilos de las tarjetas, de `.tarjeta.favorito` y de los filtros activos (`aria-pressed`).
- `js/destinos.js`: el array `DESTINOS`, con imágenes generadas en el navegador.
- `js/main.js`: vacío.

## Requisitos

1. Escribe en `index.html` un `<template id="plantilla-tarjeta">` con un `<article class="tarjeta">` que contenga una `<img>`, un `<h2 class="nombre">`, un `<p class="pais">` y un botón `.favorito` con `aria-pressed="false"`.
2. `crearTarjeta(destino)` clona la plantilla (`content.firstElementChild.cloneNode(true)`) y la rellena: `data-id`, `src` y `alt` (nombre y país) de la imagen, textos con `textContent`, la clase `favorito` y el estado del botón (`aria-pressed` y `★`/`☆`).
3. `pintarGaleria()` crea las tarjetas del continente activo en un `DocumentFragment` y sustituye el contenido de la galería **de una vez**. El título de la pestaña indica `Galería (N) · F favoritos` («favorito», en singular, si es uno).
4. Los botones de filtro se **generan** a partir de los continentes de los datos, sin repetir (`Set`), más «Todos» al principio. El activo lleva `aria-pressed="true"`.
5. Un oyente en `#filtros` y otro en `#galeria` (delegación). El botón de favorito añade o quita el destino de un `Set` de favoritos y vuelve a pintar.
6. Ningún `innerHTML` ni estilos en el JavaScript.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Al cargar: cinco tarjetas, los filtros `Todos · Asia · Europa · América · África` (en el orden en que aparecen en los datos) con «Todos» marcado, y el título `Galería (5) · 0 favoritos`.
- Pulsa «Europa»: Lisboa y Granada, y `Galería (2) · 0 favoritos`.
- Marca Granada como favorita: borde naranja, `★ Favorito` y el título `Galería (2) · 1 favorito`. Cambia a «Todos»: sigue marcada.
- Inspecciona una imagen: su `alt` es, por ejemplo, `Kioto (Japón)`.
- En el panel Elementos, el `<template>` sigue en el HTML pero no se ve en la página.
- Pon un punto de ruptura de DOM en `#galeria` (clic derecho en el panel Elementos → **Interrupción en** → **Subárbol modificado**, *Break on → Subtree modifications*) y cambia de filtro: el depurador se detiene **una sola vez**, en `replaceChildren`.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
