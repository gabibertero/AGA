// Parcial aleatorio (sin DOM) que mezcla el formato del Modelo 1 y el Modelo 2:
// 1 cónica + 2 ejercicios distintos de rectas y planos, 100 puntos. Los modelos originales quedan tal cual en sus páginas.
import { mulberry32, ri, pick } from './util.js';
import { CATALOGO } from './index.js';
import { conica, parabolaPunto } from './conicas.js';
import { general, generalTex } from './conica.js';

const g = (u, id) => CATALOGO[u].items.find((i) => i.id === id).gen;
// Lo que más toma la cátedra: elipse e hipérbola, después parábola y por último circunferencia.
export const PESOS = { elipse: 3, hiperbola: 3, parabola: 2, circunferencia: 1 };
const RECTAS_PLANOS = [g('U9p', 'planoperp'), g('U9p', 'planovec'), g('U9p', 'planorecta'), g('U9r', 'posrel')];
const SEMIEJES = { elipse: [[5, 3], [5, 4]], hiperbola: [[3, 4], [4, 3], [3, 2], [2, 3]] };

export function tipoConica(r) {
  let x = r() * Object.values(PESOS).reduce((a, b) => a + b, 0);
  for (const [t, w] of Object.entries(PESOS)) if ((x -= w) < 0) return t;
  return 'elipse';
}

// Cónica con números del tamaño de los modelos (9x²+25y²−54x+100y−44=0): centro sin ceros y |F| ≤ 150.
export function conicaParcial(r, tipo = tipoConica(r)) {
  if (tipo === 'parabola' && r() < 0.5) return parabolaPunto(r); // formato Modelo 2 (radio vector)
  for (;;) {
    const nz = () => pick(r, [-1, 1]) * ri(r, 1, 4);
    const spec = { tipo, h: nz(), k: nz(), ori: pick(r, ['h', 'v']) };
    if (tipo === 'circunferencia') spec.a = ri(r, 2, 5);
    else if (tipo === 'parabola') Object.assign(spec, { p: pick(r, [1, 2, 3]), ori: pick(r, ['der', 'izq', 'arr', 'aba']) });
    else [spec.a, spec.b] = pick(r, SEMIEJES[tipo]);
    const gen = general(spec);
    if (Math.abs(gen.F) <= 150) return { ...conica(r, { spec }), tipo, enunciado: `Graficar la siguiente cónica, previamente encontrar los elementos característicos de la misma. Escribir su ecuación ordinaria. $$${generalTex(gen)}$$` };
  }
}

export function armarParcial(rng = mulberry32(Math.floor(Math.random() * 2 ** 31))) {
  const sem = () => mulberry32(Math.floor(rng() * 2 ** 31));
  const [i, j] = [ri(rng, 0, 3), ri(rng, 0, 2)];
  const otros = [RECTAS_PLANOS[i], RECTAS_PLANOS.filter((_, k) => k !== i)[j]].map((gen) => gen(sem()));
  const con = conicaParcial(sem());
  // Modelo 1 abre con la cónica; Modelo 2 la deja al final.
  const orden = rng() < 0.5 ? [con, ...otros] : [...otros, con];
  return { ejercicios: orden.map((e, k) => ({ numero: k + 1, puntos: [30, 30, 40][k], ...e })) };
}
