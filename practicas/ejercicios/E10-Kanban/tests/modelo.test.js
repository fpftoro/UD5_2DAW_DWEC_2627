import { describe, it, expect } from 'vitest';
import { crearTablero } from '../js/modelo.js';

describe('crearTablero', () => {
  it('limpia los títulos y descarta los vacíos', () => {
    expect(crearTablero([' A ', '', 'B']).columnas).toEqual(['A', 'B']);
  });

  // TODO: el resto de tests del enunciado, en este fichero, en vista.test.js y en tablero.test.js
});
