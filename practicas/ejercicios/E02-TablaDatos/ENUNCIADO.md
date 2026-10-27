# E02 · Tabla desde un array de objetos

**Tipo:** autocorrección

Construye desde JavaScript una tabla de notas a partir de un array de objetos, con filtro, ordenación por columnas y una fila de resumen.

**CE:** RA6 c, d

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el mismo entorno que usaste en la UD1 (tema 5, apartado 5.4), con Node.js y npm, sin instalar nada en tu equipo. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda unos minutos, porque descarga la imagen.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3502) y abre <http://localhost:3502> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3502 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3502 .`.

## Punto de partida

- `index.html`: un campo de búsqueda y una `<table id="tabla">` que solo tiene su `<caption>`.
- `estilos.css`: ya tiene los estilos de la cabecera ordenada (`aria-sort`), de los suspensos (`.suspenso`) y del pie.
- `js/datos.js`: el array `ALUMNOS` (uno de los nombres contiene `<script>`).
- `js/main.js`: vacío.

## Requisitos

1. Crea **una sola vez** la estructura de la tabla con métodos del DOM: un `<thead>` con un `<th scope="col">` por columna (Alumno, Grupo, Nota), cada uno con un `<button>` y un atributo `data-campo`; un `<tbody>` vacío y un `<tfoot>` con una fila de dos celdas (la primera ocupa dos columnas). Puedes usar `createElement` y los métodos de las tablas (`createTFoot`, `insertRow`, `insertCell`).
2. Escribe una función `pintar()` que rellene el `<tbody>` **sustituyendo todas sus filas de una vez** (`replaceChildren`), con una fila por alumno visible:
   - El texto de cada celda con `textContent`.
   - La nota con `Intl.NumberFormat` (entre 1 y 2 decimales).
   - La fila con la clase `suspenso` si la nota es menor que 5 (`classList.toggle` con condición).
3. **Filtro:** al escribir en `#filtro` (evento `input`), solo se ven los alumnos cuyo nombre contiene el texto, sin distinguir mayúsculas.
4. **Ordenación:** un único oyente en el `<thead>`. Al pulsar una cabecera se ordena por esa columna; al pulsarla otra vez, en sentido contrario. Los textos se ordenan con `Intl.Collator('es')` y los números por su valor. La cabecera activa lleva `aria-sort="ascending"` o `"descending"` y las demás no lo llevan. Al cargar, ordenada por nombre ascendente.
5. **Pie:** `N de 5 alumnos` y `Media: X` de los visibles (o `—` si no hay ninguno).
6. Sin `innerHTML` en todo el ejercicio.

**Entrega.** Completa el `README.md`: cómo abres la página y qué ves en cada comprobación de «Comprueba tu solución».

## Comprueba tu solución

- Al cargar: ana Gómez, Íñigo Sáez <script>, Lucía Pérez, Marta Díaz, Óscar Ruiz (las tildes y la minúscula de «ana» no alteran el orden). Pie: `5 de 5 alumnos` y `Media: 6,25`.
- El nombre `Íñigo Sáez <script>` se ve con `<script>` como texto.
- Las filas de Óscar y Marta tienen el número en rojo.
- Pulsa «Nota» dos veces: de mayor a menor (9,25 primero) y la flecha ▼ en esa cabecera.
- Escribe `ez` en el buscador: Íñigo Sáez, Lucía Pérez y ana Gómez (en el orden activo), `3 de 5 alumnos`. Escribe `zz`: tabla vacía y `—`.
- En el panel Elementos, la tabla tiene `thead`, `tbody` y `tfoot`; y en `index.html` siguen sin estar.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen del curso no se borra, así que la próxima vez el contenedor se vuelve a crear en pocos segundos.
