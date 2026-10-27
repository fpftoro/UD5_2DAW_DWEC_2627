# E10 · Tablero kanban (integrador)

**Tipo:** corrección por IA

Construye desde JavaScript un **tablero kanban** sobre un HTML mínimo: columnas y tarjetas creadas con plantillas, tareas que se añaden, se mueven y se borran, cambios **animados** si el navegador lo permite (con una alternativa si no), las tres capas separadas, **tests de DOM** y **pruebas de extremo a extremo**. Junta todo lo visto en la unidad.

**CE:** RA6 a, b, c, d, e, f, g, h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. Como los ejercicios de la UD2 con dependencias de npm, **construye su imagen** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (UD2, tema 9, apartado 9.3.2). Además, el `Dockerfile` instala el navegador Chromium de Playwright con las librerías del sistema que necesita, así que no tienes que descargarlo tú. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda bastante más que en otros ejercicios, porque descarga la imagen, la construye y descarga el navegador. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

La página usa módulos, así que necesita un servidor: no la abras con doble clic. Al abrir el contenedor, VS Code arranca solo el servidor de la página (`serve`, en el puerto 3510) y abre <http://localhost:3510> en el navegador de tu equipo. Si no se abre, búscala en el panel **Puertos** de VS Code: la columna **Dirección reenviada** da la dirección exacta (si el 3510 de tu equipo ya está ocupado, VS Code usa otro número). Si paras el servidor, vuelve a lanzarlo en la terminal del contenedor con `npx --yes serve@14.2.6 --listen 3510 .`.

Ejecuta los tests, las pruebas de extremo a extremo, ESLint y Prettier en la terminal de VS Code, que ya es la del contenedor. `npm run e2e` aprovecha el servidor de la página que ya está en marcha.

## Punto de partida

```text
├── package.json · vitest.config.js   ← scripts test, e2e, lint, format y format:check (Vitest con happy-dom, sin e2e/)
├── playwright.config.js              ← carpeta e2e/, servidor de la página y Chromium (no se modifica)
├── index.html          ← un <main id="tablero" data-columnas="…"> vacío y dos <template> (no se modifica)
├── css/estilos.css     ← estilos de columnas, tarjetas y botones desactivados (no se modifica)
├── js/
│   ├── main.js         ← punto de entrada (no se modifica)
│   ├── modelo.js       ← seis funciones puras, sin programar
│   ├── vista.js        ← pintarTablero, sin programar
│   ├── tablero.js      ← iniciarTablero, sin programar
│   └── soporte.js      ← detectar, sin programar (View Transitions)
├── tests/
│   ├── plantillas.js   ← prepara el documento de prueba con las plantillas de index.html
│   └── modelo.test.js  ← un primer test
├── e2e/
│   └── tablero.spec.js ← una primera prueba de extremo a extremo (falla hasta que programes el tablero)
└── README.md           ← plantilla de entrega
```

## Requisitos

**Modelo** (`js/modelo.js`), sin DOM y sin modificar el tablero recibido:

1. `crearTablero`, `anadirTarjeta`, `moverTarjeta`, `borrarTarjeta`, `tarjetasDe` y `resumen`, según su JSDoc y el contrato.

**Vista** (`js/vista.js`):

2. `pintarTablero(raiz, tablero)` crea **una columna por título** clonando `#plantilla-columna` y **una tarjeta por tarea** clonando `#plantilla-tarjeta`, las rellena con `textContent`, pone `data-columna`, `data-id` y `aria-label` en la columna y en los botones, y desactiva (`disabled`) los botones de mover sin destino. Sustituye el contenido de la raíz **de una vez**. Actualiza el título de la pestaña con el resumen.

**Comportamiento** (`js/tablero.js`):

3. `iniciarTablero(raiz, { transiciones, alCambiar })` crea el tablero con las columnas de `data-columnas`, lo pinta y devuelve un objeto con el _getter_ `tablero`.
4. **Delegación**: todos los oyentes en la raíz (las columnas y las tarjetas se vuelven a crear en cada cambio).
   - `click` en el botón **Añadir** de una columna: añade la tarea de su campo `.nueva-tarea` y devuelve el foco al campo de esa columna. Con el texto vacío (o solo espacios), no hace nada.
   - `keydown` con la tecla **Intro** (`evento.key === 'Enter'`) en el campo: lo mismo que el botón.
   - `click` en los botones de mover (con `data-direccion`) y de borrar.
5. Cada cambio vuelve a pintar el tablero y llama a la función `alCambiar({ tablero, accion })` que recibe en las opciones (si la recibe), con `accion` igual a `'añadir'`, `'mover'` o `'borrar'`. `main.js` la usa para escribir el resumen en `#estado`.

**Compatibilidad** (`js/soporte.js`):

6. `detectar(busqueda)` detecta si el navegador tiene la API **View Transitions** (`document.startViewTransition` es una función), y admite `?sin=transiciones` para simular que no. Si la tiene, `iniciarTablero` pinta cada cambio dentro de `document.startViewTransition(…)` y el navegador lo anima; si no, lo pinta directamente. El tablero funciona igual en los dos casos (`main.js` ya avisa de que no hay animaciones).
7. Investiga en MDN la compatibilidad de View Transitions (desde qué versión de Chrome, Firefox y Safari, y su estado Baseline) y anótala en el README.

> 📝 **Nota del Profesor**: `document.startViewTransition(actualizar)` hace una foto de lo que se ve, llama a `actualizar` (la función que cambia el DOM, aquí la que vuelve a pintar el tablero) y anima el paso de la foto al resultado. La llamada a `actualizar` no es inmediata: lo que tenga que pasar **después** de pintar, como devolver el foco al campo, tiene que ir dentro de esa función. El CSS del punto de partida ya desactiva la animación si el usuario prefiere menos movimiento (`prefers-reduced-motion`).

**Capas**: ningún estilo ni `innerHTML` en el JavaScript; el aspecto depende de clases y atributos (`disabled`), y la animación la hace el navegador.

**Pruebas y documentación**:

8. Tests con happy-dom en `tests/`: `modelo.test.js` (todas las funciones, casos límite y que no se modifica el tablero recibido), `vista.test.js` (estructura, contadores, texto sin interpretar, botones desactivados, que sustituye en lugar de añadir, título), `tablero.test.js` (añadir con el botón y con Intro, foco, texto vacío, mover con botones y botón desactivado, borrar, `alCambiar` con `vi.fn()`, y con y sin transiciones) y `soporte.test.js` (con y sin `startViewTransition`, y `?sin=transiciones`). happy-dom no tiene View Transitions: para probar el caso con transiciones, sustituye `document.startViewTransition` por un `vi.fn()` que llame al momento a la función que recibe, y bórralo después de cada test.
9. **Pruebas de extremo a extremo** en `e2e/tablero.spec.js` (tema 8, apartado 8.6), con la página real en Chromium (`npm run e2e`): añadir una tarea con el botón y otra con Intro (con el foco de vuelta en el campo, el título de la pestaña y el mensaje de `#estado`); mover una tarea hasta «Hecho» (con el botón → desactivado al final) y borrarla; y, con `/?sin=transiciones`, el aviso y que todo funciona igual. Busca las columnas por su nombre accesible (`getByRole('region', { name: 'Por hacer' })`) y los botones por su `aria-label`.
10. JSDoc en todos los módulos: qué HTML necesita la vista, qué estado pone en el DOM, qué eventos escucha el tablero y a quién avisa (con un `@callback` para `alCambiar`).
11. `npm test`, `npm run e2e`, `npm run lint` y `npm run format:check` sin errores. Completa el `README.md` y haz commits frecuentes.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `crearTablero(columnas)` | `{ columnas, tarjetas: [], siguienteId: 1 }`, con los títulos sin espacios y sin vacíos. `Error('El tablero necesita al menos una columna')` |
| `anadirTarjeta(tablero, columna, texto)` | Añade `{ id: 't<n>', texto, columna }` al final. `Error('La tarea no puede estar vacía')`; `RangeError('La columna <n> no existe')` |
| `moverTarjeta(tablero, id, destino)` | Mueve al final de la columna destino; si el destino no existe, el id no existe o es la misma columna, devuelve **el mismo** tablero |
| `borrarTarjeta`, `tarjetasDe` | Tablero sin esa tarjeta; tarjetas de una columna en orden |
| `resumen(tablero)` | `'3 tareas · 2 hechas'`, `'1 tarea · 1 hecha'` (la última columna son las hechas) |
| `pintarTablero(raiz, tablero)` | Estructura del requisito 2; título `Tablero · <resumen>` |
| `iniciarTablero(raiz, { transiciones = false, alCambiar } = {})` | Devuelve `{ tablero }`; llama a `alCambiar({ tablero, accion })` después de cada cambio |
| `detectar(busqueda)` | `{ transiciones: boolean }`; `?sin=transiciones` lo pone a `false` |
| Pruebas de extremo a extremo | `e2e/tablero.spec.js`, con `npm run e2e` (`playwright.config.js` sin cambios) |
| Secciones del README | `## Cómo ejecutarlo`, `## El árbol del tablero`, `## Módulos y capas`, `## Eventos`, `## Compatibilidad`, `## Pruebas`, `## Depuración`, `## Herramientas` |
| Integración continua | **Opcional**: `.github/workflows/ci.yml`, `package-lock.json` y la sección `## Integración continua (opcional)` del README. No se corrige |

## Criterios de evaluación

- ✅ Se reconoce y explica el árbol DOM que se genera
- ✅ Se usan con propiedad los objetos del modelo
- ✅ El acceso a la estructura es correcto y está verificado con tests de DOM y pruebas de extremo a extremo
- ✅ La estructura se crea con plantillas y se modifica con métodos del DOM
- ✅ Eventos de ratón y de teclado con delegación, y avisos con una función
- ✅ Se identifican las diferencias entre navegadores (View Transitions) y se ofrece una alternativa
- ✅ Las tres capas están separadas
- ✅ JSDoc, README, depuración, ESLint y Prettier
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
2. Rompe algo a propósito (por ejemplo, cambia el título de la pestaña que espera una prueba de `e2e/tablero.spec.js`), sube el cambio y comprueba que la ejecución sale en rojo en el paso que corresponde. Después, deshaz el cambio y comprueba que vuelve a verde.

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
