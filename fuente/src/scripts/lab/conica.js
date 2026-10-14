// Cónicas con ejes paralelos a los coordenados: ecuaciones, elementos y TeX. Sin DOM.
// spec: { tipo, h, k, a, b, p, ori }. circunferencia: a = radio. elipse/hipérbola: ori 'h'|'v' (eje focal).
// parábola: p > 0 es |p| (distancia V–F) y ori 'der'|'izq'|'arr'|'aba' (hacia dónde abre); en pantalla se muestra el p con signo de cátedra (U10 p. 55-58: y²=4px, p<0 abre a la izquierda/abajo).
import { nt, lin, poly, gcdN, pt } from './util.js';

export const TIPOS = ['circunferencia', 'elipse', 'hiperbola', 'parabola'];
export const NOMBRES = { circunferencia: 'Circunferencia', elipse: 'Elipse', hiperbola: 'Hipérbola', parabola: 'Parábola' };

// Coeficientes de Ax²+Cy²+Dx+Ey+F=0 (sin término xy), reducidos por el mcd.
export function general(s) {
  const { tipo, h, k, a, b, p, ori } = s;
  let g;
  if (tipo === 'circunferencia') g = [1, 1, -2 * h, -2 * k, h * h + k * k - a * a];
  else if (tipo === 'elipse') {
    g = ori === 'v'
      ? [a * a, b * b, -2 * a * a * h, -2 * b * b * k, a * a * h * h + b * b * k * k - a * a * b * b]
      : [b * b, a * a, -2 * b * b * h, -2 * a * a * k, b * b * h * h + a * a * k * k - a * a * b * b];
  } else if (tipo === 'hiperbola') {
    g = ori === 'v'
      ? [-a * a, b * b, 2 * a * a * h, -2 * b * b * k, -a * a * h * h + b * b * k * k - a * a * b * b]
      : [b * b, -a * a, -2 * b * b * h, 2 * a * a * k, b * b * h * h - a * a * k * k - a * a * b * b];
  } else {
    const q = 4 * p;
    g = { der: [0, 1, -q, -2 * k, k * k + q * h], izq: [0, 1, q, -2 * k, k * k - q * h], arr: [1, 0, -2 * h, -q, h * h + q * k], aba: [1, 0, -2 * h, q, h * h - q * k] }[ori];
  }
  const m = gcdN(g) || 1;
  const [A, C, D, E, F] = g.map((x) => x / m);
  return { A, C, D, E, F };
}
export const evalGeneral = (g, x, y) => g.A * x * x + g.C * y * y + g.D * x + g.E * y + g.F;
export const generalTex = (g) => `${poly([[g.A, 'x^2'], [g.C, 'y^2'], [g.D, 'x'], [g.E, 'y']], g.F)}=0`;

const sq = (v, n) => (Math.abs(v) < 1e-9 ? `${n}^2` : `(${lin(v, n)})^2`);
const coef = (q) => (q === 1 ? '' : q === -1 ? '-' : nt(q));
const binE = (v, n) => (Math.abs(v) < 1e-9 ? n : `(${lin(v, n)})`);
export function ordinariaTex(s) {
  const { tipo, h, k, a, b, p, ori } = s;
  const X = sq(h, 'x'), Y = sq(k, 'y'), fr = (n, d) => `\\frac{${n}}{${nt(d)}}`;
  if (tipo === 'circunferencia') return `${X}+${Y}=${nt(a * a)}`;
  if (tipo === 'elipse') return ori === 'v' ? `${fr(X, b * b)}+${fr(Y, a * a)}=1` : `${fr(X, a * a)}+${fr(Y, b * b)}=1`;
  if (tipo === 'hiperbola') return ori === 'v' ? `${fr(Y, a * a)}-${fr(X, b * b)}=1` : `${fr(X, a * a)}-${fr(Y, b * b)}=1`;
  const q = 4 * p;
  return { der: `${Y}=${coef(q)}${binE(h, 'x')}`, izq: `${Y}=${coef(-q)}${binE(h, 'x')}`, arr: `${X}=${coef(q)}${binE(k, 'y')}`, aba: `${X}=${coef(-q)}${binE(k, 'y')}` }[ori];
}

export function elementos(s) {
  const { tipo, h, k, a, b, p, ori } = s;
  const el = { spec: s, tipo, h, k, pts: [], asint: [], dir: null, ejes: [] };
  const P = (n, x, y, g) => el.pts.push({ n, x, y, g });
  if (tipo === 'circunferencia') {
    P('C', h, k, 'c'); el.r = a; el.ejes = [{ y: k }, { x: h }];
  } else if (tipo === 'parabola') {
    const sg = ori === 'der' || ori === 'arr' ? 1 : -1, hor = ori === 'der' || ori === 'izq';
    const F = hor ? [h + sg * p, k] : [h, k + sg * p];
    P('V', h, k, 'v'); P('F', F[0], F[1], 'f');
    P('A', hor ? h - sg * p : h, hor ? k : k - sg * p, 'a');
    if (hor) { P('L', F[0], k + 2 * p, 'lr'); P("L'", F[0], k - 2 * p, 'lr'); el.dir = { x: h - sg * p }; el.ejes = [{ y: k }]; }
    else { P('L', h + 2 * p, F[1], 'lr'); P("L'", h - 2 * p, F[1], 'lr'); el.dir = { y: k - sg * p }; el.ejes = [{ x: h }]; }
    el.p = p; el.ps = sg * p; el.lr = 4 * p;
  } else {
    const at = (u, v) => (ori === 'v' ? [h + v, k + u] : [h + u, k + v]);
    const c = tipo === 'elipse' ? Math.sqrt(a * a - b * b) : Math.sqrt(a * a + b * b), l = (b * b) / a;
    P('C', h, k, 'c');
    P('V', ...at(a, 0), 'v'); P("V'", ...at(-a, 0), 'v');
    P('A', ...at(0, b), 'a'); P("A'", ...at(0, -b), 'a');
    P('F', ...at(c, 0), 'f'); P("F'", ...at(-c, 0), 'f');
    P('L', ...at(c, l), 'lr'); P("L'", ...at(c, -l), 'lr'); P('M', ...at(-c, l), 'lr'); P("M'", ...at(-c, -l), 'lr');
    Object.assign(el, { a, b, c, e: c / a, lr: 2 * l });
    el.ejes = [{ x: h }, { y: k }];
    if (tipo === 'hiperbola') el.asint = [ori === 'v' ? a / b : b / a, ori === 'v' ? -a / b : -b / a];
  }
  return el;
}
export const punto = (el, n) => el.pts.find((q) => q.n === n);

// Líneas de TeX (inline) con todos los elementos, en notación de cátedra.
export function elementosTex(el) {
  const { tipo, h, k, spec: s } = el, L = [], Pn = (...ns) => ns.map((n) => { const q = punto(el, n); return pt(n, [q.x, q.y]); }).join(',\\ ');
  const horiz = s.ori !== 'v';
  if (tipo === 'circunferencia') return [Pn('C'), `r=${nt(el.r)}`];
  if (tipo === 'parabola') {
    const hor = el.dir.x !== undefined;
    L.push(Pn('V'), `p=${nt(el.ps)}\\ (|p|=\\text{distancia } V\\text{ a }F)`, Pn('F'), Pn('A'));
    L.push(hor ? `l:\\ x=${nt(el.dir.x)}` : `l:\\ y=${nt(el.dir.y)}`);
    L.push(hor ? `a:\\ y=${nt(k)}` : `a:\\ x=${nt(h)}`);
    L.push(`LL'=|4p|=${nt(el.lr)}`, Pn('L', "L'"));
    return L;
  }
  const hip = tipo === 'hiperbola';
  L.push(Pn('C'));
  L.push(`a=${nt(el.a)},\\ b=${nt(el.b)},\\ c=\\sqrt{${hip ? 'a^2+b^2' : 'a^2-b^2'}}=${nt(el.c)}`);
  L.push(Pn('V', "V'"), Pn('A', "A'") + (hip ? '\\ (\\text{no pertenecen a la curva})' : ''), Pn('F', "F'"));
  L.push(`e=\\dfrac{c}{a}=${nt(el.e)}`, `LR=\\dfrac{2b^2}{a}=${nt(el.lr)}`, Pn('L', "L'"), Pn('M', "M'"));
  L.push(`\\text{eje focal: } ${horiz ? `y=${nt(k)}` : `x=${nt(h)}`}`);
  if (hip) {
    const m = Math.abs(el.asint[0]);
    L.push(`\\text{asíntotas: } ${lin(k, 'y')}=\\pm${m === 1 ? '' : nt(m)}${binE(h, 'x')}`);
  }
  return L;
}
