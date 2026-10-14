// U10 — Generador: ecuación general -> reconocer, completar cuadrados, ordinaria y elementos.
import { ri, pick, nt, lin, poly } from './util.js';
import { general, generalTex, ordinariaTex, elementos, elementosTex, NOMBRES, TIPOS } from './conica.js';

const EL = [[5, 3], [5, 4], [10, 6], [10, 8]];
const HI = [[3, 4], [4, 3], [6, 8], [8, 6]];

export function specAzar(r, tipo) {
  const h = ri(r, -4, 4), k = ri(r, -4, 4);
  if (tipo === 'circunferencia') return { tipo, h, k, a: ri(r, 2, 6) };
  if (tipo === 'elipse') { const [a, b] = pick(r, EL); return { tipo, h, k, a, b, ori: pick(r, ['h', 'v']) }; }
  if (tipo === 'hiperbola') { const [a, b] = pick(r, HI); return { tipo, h, k, a, b, ori: pick(r, ['h', 'v']) }; }
  return { tipo, h, k, p: pick(r, [1, 2, 3, 0.5, 1.5]), ori: pick(r, ['der', 'izq', 'arr', 'aba']) };
}

export function conica(r, o = {}) {
  const s = specAzar(r, o.tipo ?? pick(r, TIPOS));
  const g = general(s), el = elementos(s), { tipo, h, k } = s;
  const { A, C, D, E, F } = g;
  const gtex = generalTex(g), otex = ordinariaTex(s);
  const pasos = [];
  const nombre = { circunferencia: 'circunferencia (coeficientes de $x^2$ e $y^2$ iguales)', elipse: 'elipse (coeficientes de $x^2$ e $y^2$ del mismo signo y distintos)', hiperbola: 'hipérbola (coeficientes de $x^2$ e $y^2$ de signo contrario)', parabola: 'parábola (una sola variable al cuadrado)' }[tipo];
  pasos.push(`**Reconocer:** $A=${A}$, $C=${C}$, sin término $xy$ ⇒ ${nombre}, con ejes paralelos a los coordenados.`);
  const mx = (v, n) => `${v < 0 ? '-' : '+'}${Math.abs(v) === 1 ? '' : Math.abs(v)}${n}`;
  const sg = (v) => (v < 0 ? `${v}` : `+${v}`);
  const sqb = (v, n) => `${v ? `(${lin(v, n)})` : n}^2`;
  const gp = (c, inner, first) => `${c < 0 ? '-' : first ? '' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}${inner}`;
  if (tipo === 'parabola') {
    const hor = s.ori === 'der' || s.ori === 'izq';
    const v = hor ? 'y' : 'x', w = hor ? 'x' : 'y', cv = hor ? E : D, sq0 = hor ? k : h, dw = hor ? D : E;
    pasos.push(`**Agrupar** la variable que está al cuadrado: $${v}^2${mx(cv, v)}=${poly([[-dw, w]], -F)}$.`);
    pasos.push(`**Completar cuadrados:** se suma $\\left(\\frac{${cv}}{2}\\right)^2=${sq0 * sq0}$ a ambos miembros: $${sqb(sq0, v)}=${poly([[-dw, w]], -F + sq0 * sq0)}$.`);
    pasos.push(`**Sacar factor común** en el segundo miembro: $${otex}$.`);
    pasos.push(`**Leer:** vértice $V(${nt(h)};${nt(k)})$ y $4p=${nt(4 * el.ps)}$ ⇒ $p=${nt(el.ps)}$ (la distancia $V$–$F$ es $|p|=${nt(s.p)}$); abre hacia ${{ der: 'la derecha', izq: 'la izquierda', arr: 'arriba', aba: 'abajo' }[s.ori]}.`);
  } else {
    const dx = D / A, dy = E / C, rhs = -F + A * h * h + C * k * k;
    pasos.push(`**Agrupar por variable:** $${gp(A, `(x^2${mx(dx, 'x')})`, true)}${gp(C, `(y^2${mx(dy, 'y')})`, false)}=${-F}$.`);
    pasos.push(`**Completar cuadrados** (lo que se suma adentro se suma a la derecha multiplicado por el coeficiente de afuera): $${gp(A, `(x^2${mx(dx, 'x')}+${h * h})`, true)}${gp(C, `(y^2${mx(dy, 'y')}+${k * k})`, false)}=${-F}${sg(A * h * h)}${sg(C * k * k)}=${rhs}$.`);
    pasos.push(`**Factorizar:** $${gp(A, sqb(h, 'x'), true)}${gp(C, sqb(k, 'y'), false)}=${rhs}$.`);
    pasos.push(`**Dividir por ${rhs}** para que el segundo miembro sea $1$: $${otex}$.`);
    if (tipo === 'circunferencia') pasos.push(`**Leer:** centro $C(${nt(h)};${nt(k)})$ y radio $r=${nt(s.a)}$.`);
    else {
      const may = tipo === 'elipse' ? 'el mayor denominador' : 'el denominador del término positivo';
      pasos.push(`**Leer:** $a^2=${s.a * s.a}$ (${may}, que marca el eje focal ${s.ori === 'v' ? 'vertical' : 'horizontal'}), $b^2=${s.b * s.b}$, $c^2=a^2${tipo === 'elipse' ? '-' : '+'}b^2=${el.c * el.c}$ ⇒ $a=${s.a}$, $b=${s.b}$, $c=${nt(el.c)}$.`);
    }
  }
  pasos.push(`**Elementos** (notación de cátedra${tipo === 'elipse' || tipo === 'hiperbola' ? "; $M,M'$ es rótulo propio para el 2.º lado recto" : ''}), siempre desde el centro/vértice:\n${elementosTex(el).map((x) => `$${x}$`).join('\n')}`);
  const pq = (etq, valor) => ({ etq, valor, tol: 0.001 });
  const pregs = tipo === 'parabola' ? [pq('h del vértice', h), pq('k del vértice', k), pq('p (con signo)', el.ps)]
    : tipo === 'circunferencia' ? [pq('h', h), pq('k', k), pq('r', s.a)]
      : [pq('h', h), pq('k', k), pq('c', el.c)];
  return {
    unidad: 'U10', titulo: `Cónica: ${NOMBRES[tipo].toLowerCase()}`,
    enunciado: `Dada la ecuación $${gtex}$, reconocer la cónica, completar cuadrados, escribir su ecuación ordinaria y hallar todos sus elementos.`,
    preguntas: pregs,
    pasos,
    resultado: `$${otex}$`,
    datos: { spec: s, g, el },
  };
}
