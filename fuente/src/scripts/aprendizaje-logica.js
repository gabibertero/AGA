// Lógica pura de "Aprendizaje" (sin DOM, RNG inyectable): armado de sesión y corrección.
import { mulberry32 } from './lab/util.js';
export { mulberry32 };

export const UNIDADES = ['U8', 'U9', 'U10'];
export const RESULTADOS = ['bien', 'medias', 'mal'];

// Fisher–Yates con RNG inyectable (r() en [0,1)). No muta la entrada.
export function barajar(r, xs) {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// preguntas: [{id, unidad, tipo, nOpc}] (nOpc > 0 solo si es de opción múltiple).
// unidad: 'U8' | 'U9' | 'U10' | 'mezcla'. n <= 0 o mayor al pool = todas.
// solo: lista de ids para restringir el pool (modo repasar); null = sin restricción.
// Mezcla: reparte parejo entre unidades (round-robin sobre pools barajados) y baraja el resultado.
// Devuelve [{id, orden}] con orden = permutación de las opciones (null si no tiene).
export function armarSesion(preguntas, { unidad = 'mezcla', n = 0, semilla = 1, solo = null } = {}) {
  const r = mulberry32(semilla >>> 0);
  const permitidas = solo ? new Set(solo) : null;
  const pool = preguntas.filter((q) => (unidad === 'mezcla' || q.unidad === unidad) && (!permitidas || permitidas.has(q.id)));
  const max = n > 0 ? Math.min(n, pool.length) : pool.length;
  let elegidas;
  if (unidad === 'mezcla') {
    const pools = UNIDADES.map((u) => barajar(r, pool.filter((q) => q.unidad === u)));
    elegidas = [];
    for (let i = 0; elegidas.length < max; i++) {
      for (const p of pools) if (i < p.length && elegidas.length < max) elegidas.push(p[i]);
    }
    elegidas = barajar(r, elegidas);
  } else {
    elegidas = barajar(r, pool).slice(0, max);
  }
  return elegidas.map((q) => ({ id: q.id, orden: q.nOpc > 0 ? barajar(r, [...Array(q.nOpc).keys()]) : null }));
}

// pos = posición mostrada que eligió la persona; orden[pos] = índice original de esa opción.
export const esCorrecta = (orden, correcta, pos) => Array.isArray(orden) && orden[pos] === correcta;

// resultados: {id: 'bien'|'medias'|'mal'|undefined}. Ignora valores inválidos.
export function resumen(ids, resultados) {
  const c = { bien: 0, medias: 0, mal: 0, sin: 0 };
  for (const id of ids) c[RESULTADOS.includes(resultados[id]) ? resultados[id] : 'sin']++;
  return c;
}

// Ids a repasar: las que quedaron 'mal' (y, si medias, también las 'a medias'). resultados: {id: estado}.
export const aRepasar = (ids, resultados, { medias = false } = {}) =>
  ids.filter((id) => resultados[id] === 'mal' || (medias && resultados[id] === 'medias'));
