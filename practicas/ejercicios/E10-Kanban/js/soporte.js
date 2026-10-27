/**
 * Detección de las características que usa el tablero.
 *
 * La URL admite `?sin=transiciones` para simular que el navegador no tiene la API View Transitions.
 * @module soporte
 */

/**
 * @param {string} [busqueda=globalThis.location?.search ?? '']
 * @returns {{ transiciones: boolean }}
 */
export function detectar(busqueda = globalThis.location?.search ?? '') {
  // TODO
}
