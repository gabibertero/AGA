// U9 — Planos.
import { ri, rv, dot, cross, sub, norm, norm2, gcdN, deg, nt, vt, pt, poly, lin, vecNormaEntera, paralelos } from './util.js';
const pr = (x) => (x < 0 ? `(${x})` : `${x}`);
const XYZ = ['x', 'y', 'z'];

const eq = (n, d) => `${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']], d)}=0`;
const primitivo = (v) => { const g = gcdN(v) || 1; return v.map((x) => x / g); };
const det = (a, b) => `\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\${a.join('&')}\\\\${b.join('&')}\\end{vmatrix}`;

export function planoTresPuntos(r) {
  let A, B, C, n;
  do { A = rv(r, 3); B = rv(r, 3); C = rv(r, 3); n = cross(sub(B, A), sub(C, A)); } while (!norm2(n));
  const g = gcdN(n), np = primitivo(n), d = -dot(np, A) + 0;
  return {
    unidad: 'U9', titulo: 'Plano por tres puntos',
    enunciado: `Hallar la ecuación general del plano que pasa por $${pt('A', A)}$, $${pt('B', B)}$ y $${pt('C', C)}$.`,
    preguntas: [{ etq: 'ecuación del plano (cualquier múltiplo no nulo sirve)', valor: d, plano: [...np, d], tol: 0.001 }],
    pasos: [
      `**Dos vectores del plano:** $\\vec{AB}=${vt(sub(B, A))}$, $\\vec{AC}=${vt(sub(C, A))}$ (no paralelos, los puntos no están alineados).`,
      `**Normal:** $\\vec n=\\vec{AB}\\times\\vec{AC}=${det(sub(B, A), sub(C, A))}=${vt(n)}$${g > 1 ? `; dividiendo por ${g}: $\\vec n=${vt(np)}$` : ''}.`,
      `**Ecuación:** $\\vec n\\cdot(X-A)=0$ ⇒ $${np.map((c, i) => `${pr(c)}(${lin(A[i], XYZ[i])})`).join('+')}=0$.`,
      `**Desarrollando:** $${eq(np, d)}$ (es $d=-\\vec n\\cdot A=${d}$).`,
      `**Control:** $B$ y $C$ cumplen la ecuación.`,
    ],
    resultado: `$${eq(np, d)}$`,
    datos: { A, B, C, n: np, d },
  };
}

const ijk = (v) => poly([[v[0], '\\hat\\imath'], [v[1], '\\hat\\jmath'], [v[2], '\\hat k']]);
const evalPl = (n, d, P) => dot(n, P) + d;

// Modelo 2, Ej1: plano paralelo a dos vectores y que contiene un punto. n = v×u.
export function planoPuntoVectores(r) {
  let v, u, c;
  do { v = rv(r, 3); u = rv(r, 3); c = cross(v, u); } while (!norm2(c));
  const P = rv(r, 3), g = gcdN(c), n = primitivo(c), d = -dot(n, P) + 0;
  return {
    unidad: 'U9', titulo: 'Plano por un punto, paralelo a dos vectores',
    enunciado: `Encontrar la ecuación del plano $\\pi$ que es paralelo a los vectores $\\bar v = ${ijk(v)}$ y $\\bar u = ${ijk(u)}$ y contiene al punto $(${P.map(nt).join(';')})$.`,
    preguntas: [{ etq: 'ecuación del plano (cualquier múltiplo no nulo sirve)', valor: d, plano: [...n, d], tol: 0.001 }],
    pasos: [
      `**Idea:** si $\\pi$ es paralelo a $\\bar v$ y $\\bar u$ (no paralelos entre sí), su normal es perpendicular a ambos: $\\vec n=\\bar v\\times\\bar u$.`,
      `**Normal:** $\\vec n=${det(v, u)}=${vt(c)}$${g > 1 ? `; dividiendo por ${g}: $${vt(n)}$` : ''}.`,
      `**Ecuación:** $${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']], 0)}+d=0$ y pasa por $(${P.map(nt).join(';')})$ ⇒ $d=-\\vec n\\cdot P=${d}$.`,
      `**Plano:** $${eq(n, d)}$.`,
      `**Control:** $\\vec n\\cdot\\bar v=${dot(n, v)}$ y $\\vec n\\cdot\\bar u=${dot(n, u)}$ (ambos 0).`,
    ],
    resultado: `$${eq(n, d)}$`,
    datos: { v, u, P, n, d },
  };
}

// Modelo 2, Ej2: plano por un punto que contiene la recta intersección de dos planos (haz de planos).
export function planoPuntoRecta(r) {
  let n1, n2, d1, d2, P, a, b;
  do {
    n1 = rv(r, 2); n2 = rv(r, 2); d1 = ri(r, -8, 8); d2 = ri(r, -8, 8); P = rv(r, 3);
    a = evalPl(n1, d1, P); b = evalPl(n2, d2, P);
  } while (!norm2(cross(n1, n2)) || !a || !b); // planos no paralelos y P fuera de la recta (ni sobre ningún plano)
  const N = [0, 1, 2].map((i) => b * n1[i] - a * n2[i]), D = b * d1 - a * d2;
  const g = gcdN([...N, D]) * (N.find((x) => x) < 0 ? -1 : 1); // sin factor común y con el primer coeficiente no nulo positivo
  const n = N.map((x) => x / g + 0), d = D / g + 0;
  return {
    unidad: 'U9', titulo: 'Plano por un punto que contiene a la recta intersección de dos planos',
    enunciado: `Encontrar la ecuación del plano $\\pi$ que pasa por el punto $${pt('P', P)}$ y contiene a la recta intersección entre $\\pi_1 = ${eq(n1, d1)}$ y $\\pi_2 = ${eq(n2, d2)}$.`,
    preguntas: [{ etq: 'ecuación del plano (cualquier múltiplo no nulo sirve)', valor: d, plano: [...n, d], tol: 0.001 }],
    pasos: [
      `**Haz de planos** que contienen a la recta: $\\pi_1+\\lambda\\pi_2=0$, es decir $(${eq(n1, d1).slice(0, -2)})+\\lambda(${eq(n2, d2).slice(0, -2)})=0$.`,
      `**Imponer $P$:** $\\pi_1(P)=${a}$ y $\\pi_2(P)=${b}$ ⇒ $${a}+${pr(b)}\\lambda=0$ ⇒ $\\lambda=${nt(-a / b)}$.`,
      `**Reemplazar:** $${b}\\,\\pi_1${a < 0 ? '+' : '-'}${Math.abs(a)}\\,\\pi_2=0$ (multiplicando por ${b}) ⇒ $${eq(N, D)}$${Math.abs(g) > 1 || g < 0 ? `; dividiendo por ${g}: $${eq(n, d)}$` : ''}.`,
      `**Control:** $P$ cumple la ecuación y la normal es combinación de $\\vec n_1=${vt(n1)}$ y $\\vec n_2=${vt(n2)}$.`,
    ],
    resultado: `$${eq(n, d)}$`,
    datos: { n1, d1, n2, d2, P, n, d },
  };
}

export function planoPerpInterseccion(r) {
  let n1, n2, c;
  do { n1 = rv(r, 2); n2 = rv(r, 2); c = cross(n1, n2); } while (!norm2(n1) || !norm2(n2) || !norm2(c));
  const d1 = ri(r, -5, 5), d2 = ri(r, -5, 5), P = rv(r, 3);
  const g = gcdN(c), n = primitivo(c), d = -dot(n, P) + 0;
  return {
    unidad: 'U9', titulo: 'Plano por un punto ⟂ a la recta intersección de dos planos',
    enunciado: `Sean $\\pi_1:\\ ${eq(n1, d1)}$ y $\\pi_2:\\ ${eq(n2, d2)}$, y sea $r=\\pi_1\\cap\\pi_2$. Hallar el plano que pasa por $${pt('P', P)}$ y es perpendicular a $r$.`,
    preguntas: [{ etq: 'ecuación del plano (cualquier múltiplo no nulo sirve)', valor: d, plano: [...n, d], tol: 0.001 }],
    pasos: [
      `**Director de $r$:** es perpendicular a $\\vec n_1=${vt(n1)}$ y a $\\vec n_2=${vt(n2)}$ ⇒ $\\vec d_r=\\vec n_1\\times\\vec n_2=${det(n1, n2)}=${vt(c)}$${g > 1 ? `; dividiendo por ${g}: $${vt(n)}$` : ''}.`,
      `**Normal del plano buscado:** el plano es ⟂ a $r$ ⇒ $\\vec n=\\vec d_r=${vt(n)}$.`,
      `**Ecuación:** $${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']], 0)}+d=0$ y pasa por $P$: $d=-\\vec n\\cdot P=${d}$.`,
      `**Plano:** $${eq(n, d)}$.`,
    ],
    resultado: `$${eq(n, d)}$`,
    datos: { n1, d1, n2, d2, P, n, d },
  };
}

export function distPuntoPlano(r) {
  let n, d, P, num;
  do { n = vecNormaEntera(r); d = ri(r, -6, 6); P = rv(r, 4); num = dot(n, P) + d; } while (!num);
  const dist = Math.abs(num) / norm(n);
  return {
    unidad: 'U9', titulo: 'Distancia de un punto a un plano',
    enunciado: `Calcular la distancia de $${pt('P', P)}$ al plano $\\pi:\\ ${eq(n, d)}$.`,
    preguntas: [{ etq: 'distancia', valor: dist, tol: 0.01 }],
    pasos: [
      `**Fórmula:** $d(P,\\pi)=\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}$.`,
      `**Numerador:** $|${n.map((c, i) => `${pr(c)}\\cdot${pr(P[i])}`).join('+')}+${pr(d)}|=|${num}|=${Math.abs(num)}$.`,
      `**Denominador:** $|\\vec n|=\\sqrt{${norm2(n)}}=${nt(norm(n))}$.`,
      `**Distancia:** $d=\\dfrac{${Math.abs(num)}}{${nt(norm(n))}}=${nt(dist)}$.`,
    ],
    resultado: `$d=${nt(dist)}$`,
    datos: { n, d, P, dist },
  };
}

export function anguloPlanos(r) {
  const OK = [30, 45, 60, 90];
  let n1 = [1, 0, 0], n2 = [1, 1, 0], ang = 45;
  for (let i = 0; i < 30000; i++) {
    const a = rv(r, 3), b = rv(r, 3);
    if (!norm2(a) || !norm2(b) || paralelos(a, b)) continue;
    const g = deg(Math.acos(Math.abs(dot(a, b)) / (norm(a) * norm(b))));
    const k = OK.find((x) => Math.abs(g - x) < 1e-7);
    if (k) { n1 = a; n2 = b; ang = k; break; }
  }
  const d1 = ri(r, -5, 5), d2 = ri(r, -5, 5), p = dot(n1, n2);
  const COS = { 30: '\\frac{\\sqrt3}{2}', 45: '\\frac{\\sqrt2}{2}', 60: '\\frac12', 90: '0' };
  return {
    unidad: 'U9', titulo: 'Ángulo entre dos planos',
    enunciado: `Hallar el ángulo (agudo o recto) entre $\\pi_1:\\ ${eq(n1, d1)}$ y $\\pi_2:\\ ${eq(n2, d2)}$.`,
    preguntas: [{ etq: 'θ en grados', valor: ang, tol: 0.5 }],
    pasos: [
      `**El ángulo entre planos es el de sus normales:** $\\vec n_1=${vt(n1)}$, $\\vec n_2=${vt(n2)}$.`,
      `**Producto escalar:** $\\vec n_1\\cdot\\vec n_2=${p}$; módulos $|\\vec n_1|=${nt(norm(n1))}$, $|\\vec n_2|=${nt(norm(n2))}$.`,
      `**Coseno** (con valor absoluto, para el ángulo agudo): $\\cos\\theta=\\dfrac{|${p}|}{${nt(norm(n1))}\\cdot${nt(norm(n2))}}=${COS[ang]}$.`,
      `**Ángulo:** $\\theta=${ang}^\\circ$.`,
    ],
    resultado: `$\\theta=${ang}^\\circ$`,
    datos: { n1, d1, n2, d2, ang },
  };
}
