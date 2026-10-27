# E08 · La misma página en tres motores con Playwright

**Tipo:** autocorrección

Escribe pruebas de extremo a extremo con **Playwright** para una calculadora de propinas y ejecútalas en los tres motores de los navegadores: **Chromium** (Chrome, Edge), **Firefox** y **WebKit** (Safari).

**CE:** RA6 f, g

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. Como los ejercicios de la UD2 con dependencias de npm, **construye su imagen** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (UD2, tema 9, apartado 9.3.2). Además, el `Dockerfile` instala los navegadores de Playwright de los tres motores (Chromium, Firefox y WebKit) con las librerías del sistema que necesitan, así que no tienes que descargarlos tú. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda bastante más que en otros ejercicios, porque descarga la imagen, la construye y descarga los navegadores. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3508) y abre <http://localhost:3508> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3508 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3508 .`.

Ejecuta las pruebas, ESLint y Prettier en la terminal de VS Code, que ya es la del contenedor. `npm run e2e` aprovecha el servidor de la página que ya está en marcha.

## Punto de partida

```text
├── package.json              ← scripts e2e, lint, format y format:check (Playwright 1.63.0)
├── playwright.config.js      ← tres proyectos: chromium, firefox y webkit, y el servidor de la página (no se modifica)
├── index.html · estilos.css · js/main.js   ← la calculadora, que ya funciona
├── e2e/
│   └── calculadora.spec.js   ← una primera prueba
└── README.md                 ← plantilla de entrega
```

```bash
npm run e2e                   # ejecuta las pruebas en los tres motores
```

> 📝 **Nota del Profesor**: Playwright necesita sus propios navegadores, con la misma versión que el paquete `@playwright/test` de `package.json` (por eso va fija, sin `^`). El Dev Container de este ejercicio ya los trae instalados. Fuera de él, la primera vez hay que descargarlos con `npx playwright install --with-deps` (varios cientos de MB; en Linux pide permisos de administrador para las librerías del sistema).

## Requisitos

1. Añade a `calculadora.spec.js` pruebas para:
   - El cálculo con 80 €, 15 % y 4 personas: `Total: 92,00 € · por persona: 23,00 €`.
   - El porcentaje por defecto (10 %).
   - El aviso de error con un importe de `0`, que además añade la clase `error`.
   - Abrir y cerrar la ayuda (el `<dialog>` se ve y deja de verse).
2. Busca los elementos como un usuario: `getByRole`, `getByLabel`, `getByText`. **No** uses selectores CSS ni clases.
3. Usa `test.beforeEach` para abrir la página antes de cada prueba.
4. Ejecuta las pruebas en los tres motores y anota en el README cómo las has ejecutado, la salida y una tabla prueba × motor (sección «Pruebas»), y **al menos dos diferencias** que hayas observado entre los motores, aunque las pruebas pasen (sección «Diferencias entre los motores»): por ejemplo, en la validación nativa del formulario o en el aspecto de los controles.
5. `npm run lint` y `npm run format:check` sin errores.

**Entrega.** Completa el `README.md`: cómo ejecutas las pruebas, su salida, las diferencias entre los motores, qué ves en cada comprobación de «Comprueba tu solución» y la salida de ESLint y Prettier.

## Comprueba tu solución

- `npm run e2e` termina con `15 passed` (5 pruebas × 3 motores).
- Rompe a propósito el cálculo en `js/main.js` (por ejemplo, quita el `1 +`): fallan las mismas pruebas en los tres motores. Deshaz el cambio.
- Haz una captura de la página con cada motor y compáralas: `npx playwright screenshot --browser=webkit http://localhost:3508 img/webkit.png` (y lo mismo con `chromium` y `firefox`). Verás el motor de Safari aunque no uses un Mac.
- `npx playwright show-report --host 0.0.0.0` sirve el informe con cada prueba en cada motor: ábrelo en <http://localhost:9323> (el Dev Container reenvía ese puerto).
- Deja el importe vacío y pulsa «Calcular» a mano en Chrome y en Firefox: el mensaje nativo es distinto. Anótalo en «Diferencias entre los motores».

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen que ha construido el `Dockerfile` tampoco se borra (se llama `vsc-` seguido del nombre de la carpeta), así que la próxima vez no hace falta construirla de nuevo. Ocupa bastante (unos 3 GB, con los tres navegadores): si necesitas espacio, bórrala desde la pestaña **Images** de Docker Desktop o con `docker image rm <nombre>`.
