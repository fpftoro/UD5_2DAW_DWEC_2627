/**
 * Pinta el tablero en el DOM a partir de los datos, con las plantillas del HTML.
 *
 * Plantillas necesarias en el documento: `#plantilla-columna` (con `.titulo`, `.contador`,
 * `.tarjetas`, el campo `.nueva-tarea` y el botón `.anadir`) y `#plantilla-tarjeta` (con `.texto`
 * y los botones `.mover[data-direccion]` y `.borrar`).
 *
 * Estado en el DOM: `data-columna` en cada columna, `data-id` en cada tarjeta y `disabled` en los
 * botones de mover sin destino.
 * @module vista
 */
import { tarjetasDe, resumen } from './modelo.js';

/** @import { Tablero, Tarjeta } from './modelo.js' */

/**
 * Pinta el tablero entero en `raiz`, sustituyendo lo que hubiera.
 * @param {HTMLElement} raiz
 * @param {Tablero} tablero
 */
export function pintarTablero(raiz, tablero) {
  // TODO
}
