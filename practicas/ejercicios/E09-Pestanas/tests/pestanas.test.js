import { describe, it, expect, beforeEach } from 'vitest';
import { iniciarPestanas } from '../js/pestanas.js';

describe('iniciarPestanas', () => {
  let contenedor;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="pestanas" id="ficha" data-etiqueta="Información">
        <section data-titulo="Descripción"><h2>Descripción</h2></section>
        <section data-titulo="Especificaciones"><h2>Especificaciones</h2></section>
      </div>`;
    contenedor = document.querySelector('#ficha');
    iniciarPestanas(contenedor);
  });

  it('crea una lista de pestañas al principio del contenedor', () => {
    expect(contenedor.firstElementChild.getAttribute('role')).toBe('tablist');
  });

  // TODO: el resto de tests del enunciado
});
