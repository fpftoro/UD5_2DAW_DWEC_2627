// E08 · Calculadora de propinas. No hace falta modificar este fichero.
const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const formulario = document.querySelector('#calculadora');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const importe = formulario.elements.importe.valueAsNumber;
  const porcentaje = Number(formulario.elements.porcentaje.value);
  const personas = formulario.elements.personas.valueAsNumber;
  if (!(importe > 0) || !Number.isInteger(personas) || personas < 1) {
    resultado.textContent = 'Revisa el importe y el número de personas';
    resultado.classList.add('error');
    return;
  }
  const total = importe * (1 + porcentaje / 100);
  resultado.classList.remove('error');
  resultado.textContent = `Total: ${euros.format(total)} · por persona: ${euros.format(total / personas)}`;
});

const ayuda = document.querySelector('#ayuda');
document.querySelector('#abrir-ayuda').addEventListener('click', () => {
  if ('showModal' in HTMLDialogElement.prototype) ayuda.showModal();
  else ayuda.setAttribute('open', '');
});
