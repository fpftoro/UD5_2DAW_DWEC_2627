// HTML de prueba: las plantillas de index.html y un tablero vacío.
import { readFileSync } from 'node:fs';

// Vitest ejecuta los tests desde la raíz del proyecto (en happy-dom, import.meta.url no es un fichero)
const html = readFileSync('index.html', 'utf8');
const plantillas = html.match(/<template[\s\S]*?<\/template>/g).join('\n');

/**
 * Prepara el documento con las plantillas y un tablero con las columnas indicadas.
 * @param {string} [columnas='Por hacer,En curso,Hecho']
 * @returns {HTMLElement} El elemento raíz del tablero.
 */
export function prepararDocumento(columnas = 'Por hacer,En curso,Hecho') {
  document.body.innerHTML = `<main id="tablero" data-columnas="${columnas}"></main>${plantillas}`;
  return document.querySelector('#tablero');
}
