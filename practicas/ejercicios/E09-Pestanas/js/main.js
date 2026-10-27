// E09 · Ficha del producto: inicia los componentes de pestañas de la página
import { iniciarPestanas } from './pestanas.js';

const registro = document.querySelector('#registro');

for (const contenedor of document.querySelectorAll('.pestanas')) {
  iniciarPestanas(contenedor, {
    // El componente llama a esta función cuando cambia de pestaña
    alCambiar: ({ titulo }) => {
      registro.textContent = `Mostrando «${titulo}» en ${contenedor.dataset.etiqueta}`;
    },
  });
}
