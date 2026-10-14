// U8 — Vectores. Cada generador: (rng, opts) -> { unidad, titulo, enunciado, preguntas, pasos, resultado, datos }.
import { ri, pick, rv, nz, dot, cross, sub, mul, add, norm, norm2, triple, esCuadrado, paralelos, deg, nt, vt, pt, vecNormaEntera } from './util.js';

const ANG = [30, 45, 60, 90, 120, 135, 150];
const COS = { 30: '\\frac{\\sqrt3}{2}', 45: '\\frac{\\sqrt2}{2}', 60: '\\frac12', 90: '0', 120: '-\\frac12', 135: '-\\frac{\\sqrt2}{2}', 150: '-\\frac{\\sqrt3}{2}' };
export const cosTex = (a) => COS[a];
const pr = (x) => (x < 0 ? `(${x})` : `${x}`);
const tex = (v, n) => `\\vec{${n}}=${vt(v)}`;

export function angulo(r) {
  let u = [1, 0, 0], v = [1, 1, 0], ang = 45;
  for (let i = 0; i < 30000; i++) {
    const a = rv(r, 3), b = rv(r, 3);
    if (!norm2(a) || !norm2(b)) continue;
    const g = deg(Math.acos(dot(a, b) / (norm(a) * norm(b))));
    const k = ANG.find((x) => Math.abs(g - x) < 1e-7);
    if (k) { u = a; v = b; ang = k; break; }
  }
  const p = dot(u, v);
  return {
    unidad: 'U8', titulo: 'Ángulo entre vectores',
    enunciado: `Hallar el ángulo entre $${tex(u, 'u')}$ y $${tex(v, 'v')}$.`,
    preguntas: [{ etq: 'θ en grados', valor: ang, tol: 0.5 }],
    pasos: [
      `**Producto escalar:** $\\vec{u}\\cdot\\vec{v}=${u.map((x, i) => `${pr(x)}\\cdot${pr(v[i])}`).join('+')}=${p}$.`,
      `**Módulos:** $|\\vec{u}|=${nt(norm(u))}$, $|\\vec{v}|=${nt(norm(v))}$.`,
      `**Coseno:** $\\cos\\theta=\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}||\\vec{v}|}=${COS[ang]}$.`,
      `**Ángulo:** $\\theta=\\arccos\\left(${COS[ang]}\\right)=${ang}^\\circ$.`,
    ],
    resultado: `$\\theta=${ang}^\\circ$`,
    datos: { u, v, ang },
  };
}

export function proyeccion(r) {
  let u, v, p;
  do { u = rv(r, 4); v = vecNormaEntera(r); p = dot(u, v); } while (!p);
  const nv = norm(v), comp = p / nv, proy = mul(p / norm2(v), v);
  return {
    unidad: 'U8', titulo: 'Proyección de un vector sobre otro',
    enunciado: `Dados $${tex(u, 'u')}$ y $${tex(v, 'v')}$, hallar la proyección escalar de $\\vec{u}$ sobre $\\vec{v}$ y la proyección vectorial.`,
    preguntas: [{ etq: 'proy. escalar', valor: comp, tol: 0.01 }, { etq: 'x de la proy. vectorial', valor: proy[0], tol: 0.01 }],
    pasos: [
      `**Producto escalar:** $\\vec{u}\\cdot\\vec{v}=${p}$.`,
      `**Módulo de $\\vec{v}$:** $|\\vec{v}|=${nt(nv)}$.`,
      `**Proyección escalar:** $\\mathrm{comp}_{\\vec{v}}\\vec{u}=\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}=\\dfrac{${p}}{${nt(nv)}}=${nt(comp)}$.`,
      `**Proyección vectorial:** $\\mathrm{proy}_{\\vec{v}}\\vec{u}=\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|^2}\\,\\vec{v}=\\dfrac{${p}}{${norm2(v)}}${vt(v)}=${vt(proy)}$.`,
    ],
    resultado: `$\\mathrm{comp}=${nt(comp)}$, $\\mathrm{proy}=${vt(proy)}$`,
    datos: { u, v, comp, proy },
  };
}

export function area(r, o = {}) {
  const tri = o.triangulo ?? r() < 0.5;
  let u, v, c;
  for (let i = 0; i < 4000; i++) {
    u = rv(r, 3); v = rv(r, 3); c = cross(u, v);
    if (norm2(c) && esCuadrado(norm2(c))) break;
  }
  const A0 = rv(r, 3), B = add(A0, u), C = add(A0, v);
  const n = norm(c), ar = tri ? n / 2 : n;
  const enun = tri
    ? `Hallar el área del triángulo de vértices $${pt('A', A0)}$, $${pt('B', B)}$ y $${pt('C', C)}$.`
    : `Hallar el área del paralelogramo determinado por $${tex(u, 'u')}$ y $${tex(v, 'v')}$.`;
  return {
    unidad: 'U8', titulo: tri ? 'Área del triángulo' : 'Área del paralelogramo',
    enunciado: enun,
    preguntas: [{ etq: 'Área', valor: ar, tol: 0.01 }],
    pasos: [
      ...(tri ? [`**Dos lados desde $A$:** $\\vec{AB}=${vt(u)}$, $\\vec{AC}=${vt(v)}$.`] : []),
      `**Producto vectorial:** $\\vec{u}\\times\\vec{v}=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\${u.join('&')}\\\\${v.join('&')}\\end{vmatrix}=${vt(c)}$.`,
      `**Módulo:** $|\\vec{u}\\times\\vec{v}|=${nt(n)}$ (área del paralelogramo).`,
      ...(tri ? [`**Triángulo = mitad:** $\\dfrac12\\cdot${nt(n)}=${nt(ar)}$.`] : []),
    ],
    resultado: `$\\text{Área}=${nt(ar)}$`,
    datos: { u, v, c, area: ar, tri },
  };
}

export function mixto(r, o = {}) {
  let u, v, w;
  const copl = o.coplanares ?? r() < 0.4;
  for (;;) {
    u = rv(r, 3); v = rv(r, 3);
    if (!norm2(cross(u, v))) continue;
    if (copl) { const a = nz(r, -2, 2), b = ri(r, -2, 2); w = add(mul(a, u), mul(b, v)); } else w = rv(r, 3);
    if (copl || triple(u, v, w)) break;
  }
  const t = triple(u, v, w);
  const cvw = cross(v, w);
  return {
    unidad: 'U8', titulo: 'Producto mixto: volumen y coplanaridad',
    enunciado: `Dados $${tex(u, 'u')}$, $${tex(v, 'v')}$ y $${tex(w, 'w')}$, calcular el producto mixto $[\\vec{u},\\vec{v},\\vec{w}]$, decidir si son coplanares y hallar el volumen del paralelepípedo que determinan.`,
    preguntas: [{ etq: '[u, v, w]', valor: t, tol: 0.01 }],
    pasos: [
      `**Determinante:** $[\\vec{u},\\vec{v},\\vec{w}]=\\begin{vmatrix}${u.join('&')}\\\\${v.join('&')}\\\\${w.join('&')}\\end{vmatrix}=${t}$.`,
      `**Control:** $\\vec{v}\\times\\vec{w}=${vt(cvw)}$ y $\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})=${t}$.`,
      t === 0
        ? '**Coplanares:** el producto mixto es $0$ ⇒ los tres vectores son coplanares (volumen $0$).'
        : `**No coplanares:** el producto mixto es distinto de $0$. Volumen del paralelepípedo $=|${t}|=${Math.abs(t)}$ (y del tetraedro, $${nt(Math.abs(t) / 6)}$).`,
    ],
    resultado: t === 0 ? '$[\\vec u,\\vec v,\\vec w]=0$: coplanares' : `$[\\vec u,\\vec v,\\vec w]=${t}$, $V=${Math.abs(t)}$`,
    datos: { u, v, w, t, copl: t === 0 },
  };
}

export { paralelos, pick, sub };
