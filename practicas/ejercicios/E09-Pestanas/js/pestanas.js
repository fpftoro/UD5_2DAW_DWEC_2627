/**
 * Componente de pestañas accesible.
 *
 * HTML necesario: un contenedor con `id` y, dentro, un `<section data-titulo="…">` por pestaña.
 * Sin JavaScript, las secciones se ven una debajo de otra (mejora progresiva).
 *
 * Al iniciarse: crea un `role="tablist"` con un `<button role="tab">` por sección, convierte cada
 * sección en un `role="tabpanel"`, deja visible solo la activa (`hidden` en el resto) y añade la
 * clase `con-pestanas` al contenedor (para el CSS).
 *
 * Estado: `aria-selected` y `tabindex` en las pestañas; `hidden` en los paneles.
 *
 * Eventos: escucha `click` y `keydown` (flechas izquierda y derecha, Inicio y Fin) en la lista de
 * pestañas; al cambiar de pestaña, llama a la función `alCambiar({ indice, titulo })` que recibe en
 * las opciones.
 *
 * @module pestanas
 * @example
 * const ficha = iniciarPestanas(document.querySelector('#ficha'));
 * ficha.seleccionar(2);
 * ficha.activa; // 2
 */

/**
 * Inicia un componente de pestañas.
 *
 * @param {HTMLElement} contenedor
 * @param {{ inicial?: number, alCambiar?: function({ indice: number, titulo: string }): void }} [opciones]
 *   La pestaña que se ve al empezar y la función a la que se avisa al cambiar de pestaña.
 * @returns {{ seleccionar: function(number, boolean=): void, readonly activa: number }}
 * @throws {Error} Si el contenedor no tiene `id` o no tiene secciones.
 */
export function iniciarPestanas(contenedor, { inicial = 0, alCambiar } = {}) {
  // TODO
}
