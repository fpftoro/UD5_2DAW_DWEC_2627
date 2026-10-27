// E04 · Destinos de la galería. No modifiques este fichero.
// Las imágenes son marcadores SVG generados en el propio navegador para no depender de servicios externos.
const imagen = (texto, color) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${color}"/><text x="200" y="160" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">${texto}</text></svg>`,
  )}`;

export const DESTINOS = [
  { id: 'kioto', nombre: 'Kioto', pais: 'Japón', continente: 'Asia', imagen: imagen('Kioto', '#c2255c') },
  { id: 'lisboa', nombre: 'Lisboa', pais: 'Portugal', continente: 'Europa', imagen: imagen('Lisboa', '#1c7ed6') },
  { id: 'cusco', nombre: 'Cusco', pais: 'Perú', continente: 'América', imagen: imagen('Cusco', '#2f9e44') },
  { id: 'granada', nombre: 'Granada', pais: 'España', continente: 'Europa', imagen: imagen('Granada', '#e67700') },
  { id: 'marrakech', nombre: 'Marrakech', pais: 'Marruecos', continente: 'África', imagen: imagen('Marrakech', '#862e9c') },
];
