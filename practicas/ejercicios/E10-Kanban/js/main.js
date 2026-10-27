// E10 · Tablero kanban: punto de entrada
import { iniciarTablero } from './tablero.js';
import { detectar } from './soporte.js';
import { resumen } from './modelo.js';

const soporte = detectar();
const estado = document.querySelector('#estado');
const raiz = document.querySelector('#tablero');

if (!soporte.transiciones) {
  estado.textContent =
    'Tu navegador no anima los cambios del tablero: funciona igual, sin animaciones.';
}

iniciarTablero(raiz, {
  ...soporte,
  // El tablero llama a esta función después de cada cambio
  alCambiar: ({ tablero, accion }) => {
    estado.textContent = `Última acción: ${accion} · ${resumen(tablero)}`;
  },
});
