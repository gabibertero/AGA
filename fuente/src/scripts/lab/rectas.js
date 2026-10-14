// U9 — Rectas.
import { ri, pick, rv, nz, dot, cross, sub, add, mul, norm, norm2, triple, esCuadrado, paralelos, vecNormaEntera, nt, vt, pt, lin, poly } from './util.js';

const X = ['x', 'y', 'z'];
export const paramTex = (P, d) => `\\begin{cases}${X.map((n, i) => `${n}=${poly([[d[i], 't']], P[i])}`).join('\\\\')}\\end{cases}`;
export function simetricaTex(P, d) {
  const fr = [], ig = [];
  d.forEach((c, i) => (c ? fr.push(`\\frac{${lin(P[i], X[i])}}{${c}}`) : ig.push(`${X[i]}=${nt(P[i])}`)));
  return fr.join('=') + (ig.length ? (fr.length ? ',\\ ' : '') + ig.join(',\\ ') : '');
}

export function rectaDosPuntos(r) {
  let A, B;
  do { A = rv(r, 3); B = rv(r, 3); } while (!norm2(sub(B, A)));
  const d = sub(B, A), t0 = pick(r, [-2, -1, 2, 3]), M = add(A, mul(t0, d));
  return {
    unidad: 'U9', titulo: 'Recta por dos puntos',
    enunciado: `Hallar las ecuaciones paramétricas y simétricas de la recta que pasa por $${pt('A', A)}$ y $${pt('B', B)}$. Si el parámetro es $t$ (con $t=0$ en $A$ y $t=1$ en $B$), ¿para qué valor de $t$ se obtiene $${pt('M', M)}$?`,
    preguntas: [{ etq: 't de M', valor: t0, tol: 0.001 }],
    pasos: [
      `**Vector director:** $\\vec d=\\vec{AB}=B-A=${vt(d)}$.`,
      `**Paramétricas** (punto $A$ y director $\\vec d$): $$${paramTex(A, d)},\\quad t\\in\\mathbb{R}$$`,
      `**Simétricas** (se despeja $t$ de cada una${d.includes(0) ? '; una componente de $\\vec d$ es $0$, esa coordenada queda constante' : ''}): $$${simetricaTex(A, d)}$$`,
      `**Punto $M$:** $${pt('M', M)}=A+t\\,\\vec d$ ⇒ $t=${t0}$ (se verifica en las tres coordenadas).`,
    ],
    resultado: `$$${paramTex(A, d)}$$ $$${simetricaTex(A, d)}$$ $t_M=${t0}$`,
    datos: { A, B, d, t0, M },
  };
}

const eqComp = (P1, d1, P2, d2) => X.map((n, i) => `${poly([[d1[i], 't'], [-d2[i], 's']], P1[i] - P2[i])}=0`);

export function posicionRelativa(r, o = {}) {
  const kind = o.kind ?? pick(r, ['paralelas', 'concurrentes', 'alabeadas']);
  let P1, P2, d1, d2, info = {};
  if (kind === 'concurrentes') {
    do { d1 = rv(r, 2); d2 = rv(r, 2); } while (!norm2(d1) || !norm2(d2) || paralelos(d1, d2));
    const Xp = rv(r, 4), t0 = nz(r, -2, 2), s0 = nz(r, -2, 2);
    P1 = sub(Xp, mul(t0, d1)); P2 = sub(Xp, mul(s0, d2)); info = { corte: Xp, t0, s0 };
  } else if (kind === 'paralelas') {
    d1 = vecNormaEntera(r); d2 = mul(pick(r, [-2, -1, 2]), d1);
    do { P1 = rv(r, 4); P2 = rv(r, 4); } while (paralelos(sub(P2, P1), d1));
    info = { dist: norm(cross(sub(P2, P1), d1)) / norm(d1) };
  } else {
    let c;
    for (let i = 0; i < 6000; i++) {
      d1 = rv(r, 3); d2 = rv(r, 3); P1 = rv(r, 4); P2 = rv(r, 4); c = cross(d1, d2);
      if (norm2(d1) && norm2(d2) && norm2(c) && esCuadrado(norm2(c)) && triple(sub(P2, P1), d1, d2)) break;
    }
    const T = triple(sub(P2, P1), d1, d2);
    info = { triple: T, dist: Math.abs(T) / norm(c) };
  }
  const L = (P, d, n) => `L_${n}:\\ ${paramTex(P, d).replace(/t/g, n === 1 ? 't' : 's')}`;
  const base = `Dadas $${L(P1, d1, 1)}$ y $${L(P2, d2, 2)}$, determinar su posición relativa. Si se cortan, hallar la coordenada $x$ del punto de corte; si no, la distancia entre ellas.`;
  const pq = kind === 'concurrentes' ? { etq: 'x del corte', valor: info.corte[0] } : { etq: 'distancia', valor: info.dist, tol: 0.01 };
  const dd = sub(P2, P1);
  let pasos;
  if (kind === 'concurrentes') {
    pasos = [
      `**Directores:** $\\vec d_1=${vt(d1)}$, $\\vec d_2=${vt(d2)}$: no son proporcionales ⇒ no son paralelas.`,
      `**Igualamos las rectas** ($P_1+t\\vec d_1=P_2+s\\vec d_2$): $$\\begin{cases}${eqComp(P1, d1, P2, d2).join('\\\\')}\\end{cases}$$`,
      `**Resolvemos:** el sistema es compatible con $t=${info.t0}$, $s=${info.s0}$ (se verifica en las tres ecuaciones).`,
      `**Punto de corte:** reemplazando $t$ en $L_1$: $${pt('P', info.corte)}$. Son **concurrentes** (coplanares y no paralelas).`,
    ];
  } else if (kind === 'paralelas') {
    pasos = [
      `**Directores:** $\\vec d_2=${nt(d2[0] / d1[0] || d2[1] / d1[1] || d2[2] / d1[2])}\\,\\vec d_1$ ⇒ las rectas son **paralelas**.`,
      `**$P_1$ no está en $L_2$**, así que no coinciden. Vector $\\vec{P_1P_2}=${vt(dd)}$.`,
      `**Distancia:** $d=\\dfrac{|\\vec{P_1P_2}\\times\\vec d_1|}{|\\vec d_1|}=\\dfrac{|${vt(cross(dd, d1))}|}{${nt(norm(d1))}}=${nt(info.dist)}$.`,
    ];
  } else {
    const c = cross(d1, d2);
    pasos = [
      `**Directores:** $\\vec d_1=${vt(d1)}$, $\\vec d_2=${vt(d2)}$: no proporcionales ⇒ no paralelas.`,
      `**Producto mixto** $[\\vec{P_1P_2},\\vec d_1,\\vec d_2]$ con $\\vec{P_1P_2}=${vt(dd)}$: vale $${info.triple}\\neq0$ ⇒ no son coplanares ⇒ **alabeadas** (el sistema del punto común es incompatible).`,
      `**Producto vectorial:** $\\vec d_1\\times\\vec d_2=${vt(c)}$, módulo $${nt(norm(c))}$.`,
      `**Distancia:** $d=\\dfrac{|[\\vec{P_1P_2},\\vec d_1,\\vec d_2]|}{|\\vec d_1\\times\\vec d_2|}=\\dfrac{${Math.abs(info.triple)}}{${nt(norm(c))}}=${nt(info.dist)}$.`,
    ];
  }
  return {
    unidad: 'U9', titulo: 'Posición relativa de dos rectas', enunciado: base,
    preguntas: [{ tol: 0.01, ...pq }],
    pasos,
    resultado: kind === 'concurrentes' ? `Concurrentes en $${pt('P', info.corte)}$` : kind === 'paralelas' ? `Paralelas, $d=${nt(info.dist)}$` : `Alabeadas, $d=${nt(info.dist)}$`,
    datos: { kind, P1, d1, P2, d2, ...info },
  };
}
