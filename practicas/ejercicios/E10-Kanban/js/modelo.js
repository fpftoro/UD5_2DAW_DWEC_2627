/**
 * Datos del tablero y operaciones sobre ellos. Funciones puras, sin DOM: reciben un tablero y
 * devuelven uno nuevo.
 * @module modelo
 */

/**
 * @typedef {object} Tarjeta
 * @property {string} id
 * @property {string} texto
 * @property {number} columna Índice de la columna.
 */

/**
 * @typedef {object} Tablero
 * @property {string[]} columnas Títulos de las columnas.
 * @property {Tarjeta[]} tarjetas En el orden en que se muestran dentro de cada columna.
 * @property {number} siguienteId
 */

/**
 * Crea un tablero vacío.
 * @param {string[]} columnas Títulos (sin espacios en los extremos y sin vacíos).
 * @returns {Tablero}
 * @throws {Error} Si no hay ninguna columna.
 */
export function crearTablero(columnas) {
  // TODO
}

/**
 * Añade una tarjeta al final de una columna.
 * @param {Tablero} tablero
 * @param {number} columna
 * @param {string} texto
 * @returns {Tablero}
 * @throws {Error} Si el texto está vacío.
 * @throws {RangeError} Si la columna no existe.
 */
export function anadirTarjeta(tablero, columna, texto) {
  // TODO
}

/**
 * Mueve una tarjeta a otra columna (al final). Si la columna destino no existe, no hace nada.
 * @param {Tablero} tablero
 * @param {string} id
 * @param {number} destino
 * @returns {Tablero}
 */
export function moverTarjeta(tablero, id, destino) {
  // TODO
}

/**
 * Borra una tarjeta.
 * @param {Tablero} tablero
 * @param {string} id
 * @returns {Tablero}
 */
export function borrarTarjeta(tablero, id) {
  // TODO
}

/**
 * Tarjetas de una columna, en orden.
 * @param {Tablero} tablero
 * @param {number} columna
 * @returns {Tarjeta[]}
 */
export function tarjetasDe(tablero, columna) {
  // TODO
}

/**
 * Resumen del tablero: «5 tareas · 2 hechas» (la última columna son las hechas).
 * @param {Tablero} tablero
 * @returns {string}
 */
export function resumen(tablero) {
  // TODO
}
