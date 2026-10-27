/**
 * Detección de las características que usa la página.
 *
 * Para probar las alternativas sin otro navegador, la URL admite `?sin=dialog,share,clipboard`,
 * que simula que esas características no existen.
 * @module soporte
 */

/**
 * @typedef {object} Soporte
 * @property {boolean} dialog `<dialog>` con `showModal`.
 * @property {boolean} share `navigator.share`.
 * @property {boolean} clipboard `navigator.clipboard.writeText`.
 */

/**
 * Detecta las características. No modifiques la parte de la simulación.
 * @param {string} [busqueda=location.search]
 * @returns {Soporte}
 */
export function detectar(busqueda = location.search) {
  const simuladas = new Set((new URLSearchParams(busqueda).get('sin') ?? '').split(','));
  return {
    dialog: false, // TODO: detecta <dialog> con showModal
    share: false, // TODO: detecta navigator.share
    clipboard: false, // TODO: detecta navigator.clipboard.writeText
  };
}
