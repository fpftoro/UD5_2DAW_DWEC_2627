/**
 * Comportamiento del tablero: une el modelo y la vista y responde a los eventos.
 *
 * Eventos, todos con delegación en la raíz (las columnas y las tarjetas se vuelven a crear en cada
 * cambio): `click` en los botones de añadir, mover y borrar, y `keydown` (Intro) en el campo de
 * cada columna. Si el navegador tiene View Transitions, cada cambio se anima.
 * Después de cada cambio llama a `alCambiar({ tablero, accion })`.
 * @module tablero
 */
import { crearTablero, anadirTarjeta, moverTarjeta, borrarTarjeta } from './modelo.js';
import { pintarTablero } from './vista.js';

/** @import { Tablero } from './modelo.js' */

/**
 * Función a la que avisa el tablero después de cada cambio.
 * @callback AlCambiar
 * @param {{ tablero: Tablero, accion: string }} cambio El tablero nuevo y la acción:
 *   `'añadir'`, `'mover'` o `'borrar'`.
 * @returns {void}
 */

/**
 * Inicia un tablero en un elemento.
 *
 * @param {HTMLElement} raiz Elemento con `data-columnas="Título 1,Título 2,…"`.
 * @param {{ transiciones?: boolean, alCambiar?: AlCambiar }} [opciones] Si se animan los cambios
 *   (ver soporte.js) y a quién se avisa de ellos.
 * @returns {{ readonly tablero: Tablero }}
 */
export function iniciarTablero(raiz, { transiciones = false, alCambiar } = {}) {
  // TODO
}
