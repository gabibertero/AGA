// Parcial aleatorio con el formato de la cátedra (sin DOM): mismos tipos, orden y puntajes que cada modelo.
import { mulberry32, ri, pick } from './util.js';
import { CATALOGO } from './index.js';
import { conica } from './conicas.js';
import { general, generalTex } from './conica.js';

const g = (u, id) => CATALOGO[u].items.find((i) => i.id === id).gen;
// Elipse con números del tamaño del Modelo 1 (9x²+25y²−54x+100y−44=0): semiejes 5/3 o 5/4, centro sin ceros, |F| ≤ 150.
export function elipseModelo(r) {
  for (;;) {
    const nz = () => pick(r, [-1, 1]) * ri(r, 1, 4);
    const [a, b] = pick(r, [[5, 3], [5, 4]]);
    const spec = { tipo: 'elipse', h: nz(), k: nz(), a, b, ori: pick(r, ['h', 'v']) };
    const gen = general(spec);
    if (Math.abs(gen.F) <= 150) return { ...conica(r, { spec }), enunciado: `Graficar la siguiente cónica, previamente encontrar los elementos característicos de la misma. Escribir su ecuación ordinaria. $$${generalTex(gen)}$$` };
  }
}
// Modelo 2 no tiene puntajes impresos (escaneo verificado): reparto 33/33/34.
export const FORMATOS = {
  modelo1: { nombre: 'Modelo 1', ejercicios: [[30, elipseModelo], [30, g('U9p', 'planoperp')], [40, g('U9r', 'posrel')]] },
  modelo2: { nombre: 'Modelo 2', ejercicios: [[33, g('U9p', 'planovec')], [33, g('U9p', 'planorecta')], [34, g('U10', 'parabolapunto')]] },
};

export function armarParcial(modelo, rng = mulberry32(Math.floor(Math.random() * 2 ** 31))) {
  const f = FORMATOS[modelo];
  if (!f) throw new Error('modelo desconocido: ' + modelo);
  return { modelo, nombre: f.nombre, ejercicios: f.ejercicios.map(([puntos, gen], i) => ({ numero: i + 1, puntos, ...gen(mulberry32(Math.floor(rng() * 2 ** 31))) })) };
}
