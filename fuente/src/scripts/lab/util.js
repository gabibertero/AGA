// Utilidades puras (sin DOM): RNG con semilla, álgebra de 3-vectores y formato TeX.
export const mulberry32 = (a) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
export const nz = (r, a, b) => { let v; do v = ri(r, a, b); while (!v); return v; };
export const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
export const rv = (r, m) => [ri(r, -m, m), ri(r, -m, m), ri(r, -m, m)];

export const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
export const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
export const sub = (u, v) => u.map((x, i) => x - v[i]);
export const add = (u, v) => u.map((x, i) => x + v[i]);
export const mul = (k, v) => v.map((x) => k * x);
export const norm2 = (v) => dot(v, v);
export const norm = (v) => Math.sqrt(dot(v, v));
export const triple = (u, v, w) => dot(u, cross(v, w));
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const gcdN = (xs) => xs.reduce((g, x) => gcd(g, x), 0);
export const esCuadrado = (n) => Math.abs(Math.sqrt(n) - Math.round(Math.sqrt(n))) < 1e-9;
export const paralelos = (u, v) => norm2(cross(u, v)) === 0;
export const deg = (rad) => (rad * 180) / Math.PI;

// Ternas pitagóricas 3D: norma entera.
const PYT = [[1, 2, 2], [0, 3, 4], [2, 3, 6], [1, 4, 8], [2, 6, 9], [4, 4, 7]];
export function vecNormaEntera(r) {
  const b = [...pick(r, PYT)];
  for (let i = 2; i > 0; i--) { const j = ri(r, 0, i); [b[i], b[j]] = [b[j], b[i]]; }
  return b.map((x) => (r() < 0.5 ? -x : x));
}

// Número -> TeX: entero, fracción chica, m√n o decimal.
export function nt(x) {
  if (Math.abs(x) < 1e-9) return '0';
  const s = x < 0 ? '-' : '';
  const v = Math.abs(x);
  if (Math.abs(v - Math.round(v)) < 1e-9) return s + Math.round(v);
  for (let d = 2; d <= 60; d++) {
    if (Math.abs(v * d - Math.round(v * d)) < 1e-7) return `${s}\\frac{${Math.round(v * d)}}{${d}}`;
  }
  const q = Math.round(v * v);
  if (Math.abs(v * v - q) < 1e-7) {
    let m = 1, r = q;
    for (let f = 2; f * f <= r; f++) while (r % (f * f) === 0) { r /= f * f; m *= f; }
    return `${s}${m > 1 ? m : ''}\\sqrt{${r}}`;
  }
  return s + v.toFixed(2).replace('.', '{,}');
}
export const pt = (nombre, c) => `${nombre}(${c.map(nt).join(';')})`;
export const vt = (v) => `(${v.map(nt).join(';')})`;
// x-3, x+2, x
export const lin = (v, n) => (Math.abs(v) < 1e-9 ? n : v > 0 ? `${n}-${nt(v)}` : `${n}+${nt(-v)}`);
export const bin = (v, n) => (Math.abs(v) < 1e-9 ? n : `(${lin(v, n)})`);
// Polinomio lineal/cuadrático: [[coef,'x^2'],...] + término independiente (omite ceros).
export function poly(terms, c0 = 0) {
  let out = '';
  const all = [...terms, [c0, '']];
  for (const [c, v] of all) {
    if (Math.abs(c) < 1e-9) continue;
    const a = Math.abs(c);
    const mag = v && a === 1 ? '' : nt(a);
    out += (c < 0 ? '-' : out ? '+' : '') + mag + v;
  }
  return out || '0';
}

// Respuesta del usuario: "3/2", "1,5", "√5", "2√5", "sqrt(5)/2". Parser descendente (sin eval); NaN si es inválida.
export function parseNum(txt) {
  const s = String(txt ?? '').replace(/−/g, '-').replace(/sqrt/gi, '√').replace(/,/g, '.').replace(/\s+/g, '');
  let i = 0;
  const fail = () => { throw 0; };
  const factor = () => {
    const c = s[i];
    if (c === '-') { i++; return -factor(); }
    if (c === '√') { i++; const v = factor(); return v < 0 ? fail() : Math.sqrt(v); }
    if (c === '(') { i++; const v = expr(); if (s[i++] !== ')') fail(); return v; }
    const m = /^(\d+(\.\d+)?|\.\d+)/.exec(s.slice(i));
    if (!m) fail();
    i += m[0].length;
    return Number(m[0]);
  };
  const term = () => {
    let v = factor();
    for (;;) {
      if (s[i] === '*') { i++; v *= factor(); }
      else if (s[i] === '/') { i++; v /= factor(); }
      else if (s[i] === '√' || s[i] === '(') v *= factor(); // multiplicación implícita: 2√5, 3(1+2)
      else return v;
    }
  };
  const expr = () => {
    let v = term();
    while (s[i] === '+' || s[i] === '-') v += s[i++] === '+' ? term() : -term();
    return v;
  };
  try { const v = expr(); return i === s.length && Number.isFinite(v) ? v : NaN; } catch { return NaN; }
}
export function verificar(preg, txt) {
  if (!String(txt ?? '').trim()) return 'vacio';
  const v = parseNum(txt);
  if (Number.isNaN(v)) return 'invalido';
  return Math.abs(v - preg.valor) <= (preg.tol ?? 0.01) ? 'bien' : 'mal';
}
