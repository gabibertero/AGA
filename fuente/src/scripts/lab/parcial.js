// Parcial aleatorio con el formato de la cátedra (sin DOM): mismos tipos, orden y puntajes que cada modelo.
import { mulberry32 } from './util.js';
import { CATALOGO } from './index.js';

const g = (u, id) => CATALOGO[u].items.find((i) => i.id === id).gen;
// Modelo 2 no tiene puntajes impresos (escaneo verificado): reparto 33/33/34.
export const FORMATOS = {
  modelo1: { nombre: 'Modelo 1', ejercicios: [[30, g('U10', 'elipse')], [30, g('U9p', 'planoperp')], [40, g('U9r', 'posrel')]] },
  modelo2: { nombre: 'Modelo 2', ejercicios: [[33, g('U9p', 'planovec')], [33, g('U9p', 'planorecta')], [34, g('U10', 'parabolapunto')]] },
};

export function armarParcial(modelo, rng = mulberry32(Math.floor(Math.random() * 2 ** 31))) {
  const f = FORMATOS[modelo];
  if (!f) throw new Error('modelo desconocido: ' + modelo);
  return { modelo, nombre: f.nombre, ejercicios: f.ejercicios.map(([puntos, gen], i) => ({ numero: i + 1, puntos, ...gen(mulberry32(Math.floor(rng() * 2 ** 31))) })) };
}
