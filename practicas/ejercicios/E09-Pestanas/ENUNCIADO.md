# E09 · Componente de pestañas accesible

**Tipo:** corrección por IA

Programa un componente de **pestañas** reutilizable que se construye con el DOM a partir de un HTML mínimo, funciona con el ratón y con el teclado, es accesible, avisa de sus cambios llamando a una función que recibe y está probado con **tests de DOM** en happy-dom y con **pruebas de extremo a extremo** en Chromium con Playwright.

**CE:** RA6 b, c, d, e, h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. Como los ejercicios de la UD2 con dependencias de npm, **construye su imagen** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (UD2, tema 9, apartado 9.3.2). Además, el `Dockerfile` instala el navegador Chromium de Playwright con las librerías del sistema que necesita, así que no tienes que descargarlo tú. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda bastante más que en otros ejercicios, porque descarga la imagen, la construye y descarga el navegador. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3509) y abre <http://localhost:3509> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3509 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3509 .`.

Ejecuta los tests, las pruebas de extremo a extremo, ESLint y Prettier en la terminal de VS Code, que ya es la del contenedor. `npm run e2e` aprovecha el servidor de la página que ya está en marcha.

## Punto de partida

```text
├── package.json          ← scripts test, e2e, lint, format y format:check (Vitest con happy-dom y Playwright)
├── vitest.config.js      ← entorno happy-dom, sin la carpeta e2e/
├── playwright.config.js  ← carpeta e2e/, servidor de la página y Chromium (no se modifica)
├── index.html            ← dos componentes con sus secciones; sin JavaScript se ve todo (no se modifica)
├── estilos.css           ← estilos de .con-pestanas, [role='tab'], [aria-selected] y [hidden]
├── js/
│   ├── main.js           ← inicia los componentes y escucha su evento (no se modifica)
│   └── pestanas.js       ← iniciarPestanas, con su JSDoc, sin programar
├── tests/
│   └── pestanas.test.js  ← un primer test
├── e2e/
│   └── pestanas.spec.js  ← una primera prueba de extremo a extremo
└── README.md             ← plantilla de entrega
```

Abre la página en el navegador (apartado «Entorno de trabajo»). Antes de programar, comprueba que **sin** tu código las secciones se ven una debajo de otra, cada una con su título.

## Requisitos

**El componente** (`js/pestanas.js`): `iniciarPestanas(contenedor, { inicial = 0, alCambiar } = {})`, según su JSDoc y el contrato.

1. Comprueba que el contenedor tiene `id` y secciones hijas directas (`:scope > section`); si no, lanza los errores del contrato.
2. **Construye** con `createElement` (sin `innerHTML`) un `<div role="tablist">` con `aria-label` (de `data-etiqueta`) y un `<button type="button" role="tab">` por sección, con el texto de su `data-titulo` (`textContent`). Lo inserta al principio del contenedor.
3. **Modifica** cada sección: `role="tabpanel"`, `id`, `aria-labelledby` y `tabindex="0"`; y cada pestaña: `id` y `aria-controls`. Los `id` siguen el patrón `<id del contenedor>-pestana-N` y `<id del contenedor>-panel-N`. Añade la clase `con-pestanas` al contenedor.
4. **Estado:** solo la pestaña activa tiene `aria-selected="true"` y `tabindex="0"` (las demás, `"false"` y `-1`), y solo su panel está visible (`hidden` en los demás).
5. **Eventos** (un oyente por tipo en la lista de pestañas, con delegación):
   - `click` en una pestaña la selecciona.
   - `keydown`: flecha derecha e izquierda (dando la vuelta en los extremos), Inicio y Fin seleccionan y **enfocan** la pestaña. Otras teclas no hacen nada.
6. Al cambiar de pestaña (no al iniciar ni al pulsar la que ya está activa), llama a la función `alCambiar({ indice, titulo })` que recibe en las opciones, si la recibe (UD3: funciones como valores). Así el componente avisa sin saber qué hace con el aviso `main.js`.
7. Devuelve un objeto con `seleccionar(indice)` y un _getter_ `activa`.
8. Ni estilos ni `innerHTML` en el JavaScript: el aspecto depende de `role`, `aria-selected`, `hidden` y la clase `con-pestanas`, que ya están en el CSS.

**Pruebas y documentación**:

9. Tests en `tests/pestanas.test.js` (happy-dom), con el HTML preparado en `beforeEach`: estructura creada, enlaces entre pestañas y paneles, estado inicial, otra pestaña inicial, clic, las cuatro teclas (y el foco), la vuelta en los extremos, `alCambiar` (con `vi.fn()`, comprobando sus datos) y que no se llama si no cambia ni al iniciar, los dos errores, y dos componentes en la misma página sin mezclarse.
10. **Pruebas de extremo a extremo** en `e2e/pestanas.spec.js` (tema 8, apartado 8.6), con la página real en Chromium (`npm run e2e`): al cargar, cada componente muestra solo su primer panel; al pulsar una pestaña se ve su panel y `#registro` lo dice; las flechas, Inicio y Fin mueven la selección y el foco (con la vuelta en los extremos); el Tabulador pasa de la pestaña activa a su panel; y, **sin JavaScript** (`test.use({ javaScriptEnabled: false })`), se ven todas las secciones con su título. Busca los elementos como un usuario (`getByRole`, `getByText`), no por clases.
11. Mantén el JSDoc del módulo, que documenta el HTML necesario, el estado y los eventos.
12. `npm test`, `npm run e2e`, `npm run lint` y `npm run format:check` sin errores. Completa el `README.md` y haz commits frecuentes.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| Exportación | `iniciarPestanas(contenedor, { inicial = 0, alCambiar } = {})` en `js/pestanas.js` |
| Devuelve | `{ seleccionar(indice), activa }` (`activa` es un _getter_ con el índice actual) |
| Errores | `Error('El contenedor de pestañas necesita un id')`; `Error('«#<id>» no tiene secciones')` |
| Estructura creada | `[role=tablist]` como primer hijo del contenedor, con `aria-label`; `button[role=tab]` con `id="<id>-pestana-N"` y `aria-controls="<id>-panel-N"`; secciones con `role="tabpanel"`, `id="<id>-panel-N"`, `aria-labelledby` y `tabindex="0"`; clase `con-pestanas` en el contenedor |
| Estado | `aria-selected`, `tabindex` (0 en la activa, -1 en las demás) y `hidden` en los paneles |
| Teclado | `ArrowRight`, `ArrowLeft` (circular), `Home`, `End`; la pestaña seleccionada recibe el foco |
| Aviso | `alCambiar({ indice, titulo })`, solo si cambia la pestaña (no al iniciar); sin `alCambiar`, el componente funciona igual |
| Tests | `tests/pestanas.test.js`, con `npm test` |
| Pruebas de extremo a extremo | `e2e/pestanas.spec.js`, con `npm run e2e` (`playwright.config.js` sin cambios) |
| Secciones del README | `## Cómo ejecutarlo`, `## Estructura que crea el componente`, `## Accesibilidad`, `## Eventos`, `## Separación de capas`, `## Pruebas`, `## Herramientas` |
| Integración continua | **Opcional**: `.github/workflows/ci.yml`, `package-lock.json` y la sección `## Integración continua (opcional)` del README. No se corrige |

## Criterios de evaluación

- ✅ Se identifican y usan los objetos del modelo y sus propiedades (roles, atributos ARIA, `hidden`, `tabIndex`)
- ✅ El código accede a la estructura con selectores y la verifica con errores y tests
- ✅ La estructura se crea y modifica con métodos del DOM, sin `innerHTML`
- ✅ Eventos de ratón y de teclado con delegación, y avisos con una función
- ✅ Las tres capas están separadas y la página funciona sin JavaScript
- ✅ Tests de DOM completos con happy-dom y pruebas de extremo a extremo con Playwright
- ✅ JSDoc, README, ESLint y Prettier
- ✅ Historial de commits progresivo y con mensajes descriptivos

## Integración continua (opcional)

> 📝 Este apartado es **opcional** y no cuenta para la corrección. Hazlo si en clase habéis visto GitHub Actions; si no, sáltatelo.

Tu repositorio de la tarea ya está en GitHub. Escribe un *workflow* de GitHub Actions que pase **todas las comprobaciones del proyecto** cada vez que subas cambios. Es como el de la UD4 (con `npm ci` y la caché de npm), con una novedad: también ejecuta las **pruebas de extremo a extremo**. La máquina de GitHub no trae los navegadores de Playwright, así que el *workflow* instala Chromium antes de ejecutarlas, como hace el `Dockerfile` de tu Dev Container. No hace falta un paso para arrancar el servidor de la página: lo arranca el `webServer` de `playwright.config.js`. Escríbelo tú, en `.github/workflows/ci.yml`, con estas orientaciones:

- Se ejecuta con cada `push` y cada *pull request* a la rama `main`.
- Tiene un único trabajo (*job*) que se ejecuta en `ubuntu-latest`.
- Sus pasos, en este orden, cada uno con un nombre (`name`) en español que diga qué hace:
  1. Descargar el código, con la acción `actions/checkout@v7`.
  2. Instalar Node.js 24 con la caché de npm, con la acción `actions/setup-node@v7`, `node-version: 24` y `cache: npm`.
  3. Instalar las dependencias con `npm ci`.
  4. Revisar el código con ESLint: `npm run lint`.
  5. Comprobar el formato con Prettier: `npm run format:check`.
  6. Ejecutar los tests: `npm test`.
  7. Instalar Chromium para Playwright, con las librerías del sistema que necesita: `npx playwright install --with-deps chromium`.
  8. Ejecutar las pruebas de extremo a extremo: `npm run e2e`.
- Sube también `package-lock.json`: lo creó `npm install` al abrir el contenedor. Sin él, `npm ci` falla. Si añades o actualizas una dependencia, vuelve a subirlo.
- Prettier también revisa el formato de `ci.yml`: ejecuta `npm run format` antes de subirlo.

Compruébalo:

1. Sube los cambios y abre la pestaña **Actions** del repositorio: la ejecución debe salir en verde, con los ocho pasos.
2. Rompe algo a propósito (por ejemplo, cambia el texto esperado de `#registro` en `e2e/pestanas.spec.js`), sube el cambio y comprueba que la ejecución sale en rojo en el paso que corresponde. Después, deshaz el cambio y comprueba que vuelve a verde.

Deja constancia en la sección «Integración continua (opcional)» del `README.md`: el enlace a la ejecución en verde y dos capturas en `img/`, una de la ejecución en verde con sus pasos y otra de la ejecución en rojo con el paso que falla.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen que ha construido el `Dockerfile` tampoco se borra (se llama `vsc-` seguido del nombre de la carpeta), así que la próxima vez no hace falta construirla de nuevo. Ocupa bastante (unos 2 GB, con Chromium): si necesitas espacio, bórrala desde la pestaña **Images** de Docker Desktop o con `docker image rm <nombre>`.
