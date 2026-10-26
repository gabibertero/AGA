// Propiedades matemáticas de los generadores del laboratorio (sin dependencias): node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { mulberry32, dot, cross, sub, add, mul, norm, norm2, triple, parseNum, parsePlano, verificar, nt } from '../src/scripts/lab/util.js';
import { angulo, proyeccion, area, mixto } from '../src/scripts/lab/vectores.js';
import { rectaDosPuntos, posicionRelativa } from '../src/scripts/lab/rectas.js';
import { planoPuntoVectores, planoPuntoRecta, planoTresPuntos, planoPerpInterseccion, distPuntoPlano, anguloPlanos } from '../src/scripts/lab/planos.js';
import { conica, parabolaPunto } from '../src/scripts/lab/conicas.js';
import { general, evalGeneral, elementos, ordinariaTex } from '../src/scripts/lab/conica.js';
import { svgConica } from '../src/scripts/lab/plot-conica.js';
import { CATALOGO } from '../src/scripts/lab/index.js';
import { armarParcial } from '../src/scripts/lab/parcial.js';

const N = 300;
const seeds = Array.from({ length: N }, (_, i) => i + 1);
const cerca = (a, b, m = '', e = 1e-8) => assert.ok(Math.abs(a - b) < e, `${m}: ${a} vs ${b}`);
const cerca3 = (u, v, m) => u.forEach((x, i) => cerca(x, v[i], m));
const deg = (r) => (r * 180) / Math.PI;

test('util: parseNum y verificar', () => {
  cerca(parseNum('3/2'), 1.5); cerca(parseNum('1,5'), 1.5); cerca(parseNum('√5'), Math.sqrt(5)); cerca(parseNum('sqrt(5)/2'), Math.sqrt(5) / 2);
  cerca(parseNum('2√5'), 2 * Math.sqrt(5)); cerca(parseNum('√(5)'), Math.sqrt(5)); cerca(parseNum('−3/2'), -1.5); cerca(parseNum('010'), 10);
  cerca(parseNum('-√2/2'), -Math.SQRT1_2); cerca(parseNum('3(1+2)'), 9); cerca(parseNum(' 1 + 2 * 3 '), 7);
  for (const x of ['2**3', 'alert(1)', '1/0', '(1', '1+', '√-1']) assert.ok(Number.isNaN(parseNum(x)), x);
  assert.ok(Number.isNaN(parseNum('alert(1)'))); assert.ok(Number.isNaN(parseNum('')));
  assert.equal(verificar({ valor: 2 }, '4/2'), 'bien'); assert.equal(verificar({ valor: 2 }, '3'), 'mal'); assert.equal(verificar({ valor: 2 }, 'x'), 'invalido');
  assert.equal(nt(0.5), '\\frac{1}{2}'); assert.equal(nt(Math.sqrt(8)), '2\\sqrt{2}');
});

test('ángulo entre vectores: cos θ = u·v/(|u||v|) y es un ángulo lindo', () => {
  for (const s of seeds) {
    const { datos: { u, v, ang }, preguntas } = angulo(mulberry32(s));
    cerca(deg(Math.acos(dot(u, v) / (norm(u) * norm(v)))), ang, `semilla ${s}`, 1e-6);
    assert.equal(preguntas[0].valor, ang);
  }
});

test('proyección: (u − proy)·v = 0 y proy = comp·v/|v|', () => {
  for (const s of seeds) {
    const { datos: { u, v, comp, proy } } = proyeccion(mulberry32(s));
    cerca(dot(sub(u, proy), v), 0, `semilla ${s}`);
    cerca3(proy, mul(comp / norm(v), v), `semilla ${s}`);
    cerca(comp, dot(u, v) / norm(v)); assert.ok(Number.isInteger(norm(v)));
  }
});

test('área: |u×v|² = |u|²|v|² − (u·v)², cruz ⟂ u y v, triángulo = mitad', () => {
  for (const s of seeds) {
    const { datos: { u, v, c, area: a, tri } } = area(mulberry32(s));
    cerca(norm2(c), norm2(u) * norm2(v) - dot(u, v) ** 2, `semilla ${s}`);
    cerca(dot(c, u), 0); cerca(dot(c, v), 0);
    cerca(a, tri ? norm(c) / 2 : norm(c));
  }
});

test('producto mixto: determinante (Sarrus) y coplanaridad', () => {
  let cop = 0;
  for (const s of seeds) {
    const { datos: { u, v, w, t, copl } } = mixto(mulberry32(s));
    const sar = u[0] * v[1] * w[2] + u[1] * v[2] * w[0] + u[2] * v[0] * w[1] - u[2] * v[1] * w[0] - u[0] * v[2] * w[1] - u[1] * v[0] * w[2];
    assert.equal(t, sar, `semilla ${s}`);
    assert.equal(copl, t === 0);
    if (copl) { cop++; assert.ok(norm2(cross(u, v)) > 0); }
  }
  assert.ok(cop > 20 && cop < N - 20, 'mezcla de coplanares y no coplanares');
});

test('recta por dos puntos: A en t=0, B en t=1, M = A + t0·d', () => {
  for (const s of seeds) {
    const { datos: { A, B, d, t0, M }, preguntas } = rectaDosPuntos(mulberry32(s));
    cerca3(add(A, mul(0, d)), A); cerca3(add(A, d), B, `semilla ${s}`); cerca3(add(A, mul(t0, d)), M);
    assert.equal(preguntas[0].valor, t0);
  }
});

const sistemaMin = (P1, d1, P2, d2) => { // mínimos cuadrados de |P1+t d1 − P2 − s d2|: devuelve distancia
  const w = sub(P1, P2), a = dot(d1, d1), b = dot(d1, d2), c = dot(d2, d2), dd = dot(d1, w), e = dot(d2, w), den = a * c - b * b;
  const t = (b * e - c * dd) / den, sx = (a * e - b * dd) / den;
  return norm(sub(add(P1, mul(t, d1)), add(P2, mul(sx, d2))));
};
test('posición relativa: concurrentes (punto en ambas), paralelas y alabeadas (distancia)', () => {
  for (const kind of ['concurrentes', 'paralelas', 'alabeadas']) for (const s of seeds) {
    const { datos: D, preguntas } = posicionRelativa(mulberry32(s), { kind });
    if (kind === 'concurrentes') {
      cerca3(add(D.P1, mul(D.t0, D.d1)), D.corte, `semilla ${s}`); cerca3(add(D.P2, mul(D.s0, D.d2)), D.corte, `semilla ${s}`);
      assert.equal(preguntas[0].valor, D.corte[0]);
    } else if (kind === 'paralelas') {
      assert.equal(norm2(cross(D.d1, D.d2)), 0);
      const t = dot(sub(D.P2, D.P1), D.d1) / norm2(D.d1), pie = add(D.P1, mul(t, D.d1)); // pie de la perpendicular
      cerca(norm(sub(D.P2, pie)), D.dist, `semilla ${s}`); cerca(preguntas[0].valor, D.dist);
      assert.ok(D.dist > 0);
    } else {
      assert.ok(norm2(cross(D.d1, D.d2)) > 0 && D.triple !== 0);
      cerca(sistemaMin(D.P1, D.d1, D.P2, D.d2), D.dist, `semilla ${s}`, 1e-7); cerca(preguntas[0].valor, D.dist);
    }
  }
});

test('plano por tres puntos contiene A, B y C', () => {
  for (const s of seeds) {
    const { datos: { A, B, C, n, d }, preguntas } = planoTresPuntos(mulberry32(s));
    for (const P of [A, B, C]) cerca(dot(n, P) + d, 0, `semilla ${s}`);
    assert.equal(preguntas[0].valor, d); assert.ok(norm2(n) > 0);
  }
});

test('plano ⟂ a π1∩π2 por P: normal ⟂ n1 y n2, contiene P', () => {
  for (const s of seeds) {
    const { datos: { n1, n2, P, n, d }, preguntas } = planoPerpInterseccion(mulberry32(s));
    cerca(dot(n, n1), 0); cerca(dot(n, n2), 0); cerca(dot(n, P) + d, 0, `semilla ${s}`);
    assert.equal(preguntas[0].valor, d);
  }
});

test('distancia punto-plano: pie de la perpendicular está en el plano a esa distancia', () => {
  for (const s of seeds) {
    const { datos: { n, d, P, dist } } = distPuntoPlano(mulberry32(s));
    const foot = sub(P, mul((dot(n, P) + d) / norm2(n), n));
    cerca(dot(n, foot) + d, 0, `semilla ${s}`); cerca(norm(sub(P, foot)), dist, `semilla ${s}`);
  }
});

test('ángulo entre planos: cos θ = |n1·n2|/(|n1||n2|)', () => {
  for (const s of seeds) {
    const { datos: { n1, n2, ang } } = anguloPlanos(mulberry32(s));
    cerca(deg(Math.acos(Math.abs(dot(n1, n2)) / (norm(n1) * norm(n2)))), ang, `semilla ${s}`, 1e-6);
  }
});

test('cónicas: la ordinaria expandida da la general; elementos cumplen la ecuación y c²', () => {
  const vistos = new Set();
  for (const tipo of ['circunferencia', 'elipse', 'hiperbola', 'parabola']) for (const s of seeds) {
    const { datos: { spec, g, el }, preguntas } = conica(mulberry32(s), { tipo });
    vistos.add(`${tipo}-${spec.ori}`);
    const { h, k, a, b, p } = spec;
    // La ordinaria, desarrollada a mano por tipo, es proporcional a la general (coef. 1 en la variable al cuadrado).
    const f = (x, y) => evalGeneral(g, x, y);
    // c² = a² ∓ b²
    if (tipo === 'elipse') cerca(el.c ** 2, a * a - b * b); if (tipo === 'hiperbola') cerca(el.c ** 2, a * a + b * b);
    // vértices, extremos del eje menor/conjugado: ecuación original. Elipse: V y A; hipérbola: solo V.
    for (const q of el.pts) {
      if (['C', 'F'].includes(q.n) || q.g === 'f' || (q.g === 'c' && tipo !== 'circunferencia') || (q.g === 'a' && (tipo === 'hiperbola' || tipo === 'parabola'))) continue; // A no pertenece a la curva
      cerca(f(q.x, q.y), 0, `${tipo} s${s} ${q.n}`, 1e-6);
    }
    // extremos del lado recto (en todas las cónicas)
    for (const q of el.pts.filter((x) => x.g === 'lr')) cerca(f(q.x, q.y), 0, `${tipo} s${s} ${q.n}`, 1e-6);
    // definición geométrica
    const F = el.pts.find((x) => x.n === 'F'), Fp = el.pts.find((x) => x.n === "F'"), V = el.pts.find((x) => x.n === 'V');
    const dist = (P, Q) => Math.hypot(P.x - Q.x, P.y - Q.y);
    if (tipo === 'elipse') for (const A of el.pts.filter((x) => x.g === 'a')) cerca(dist(A, F) + dist(A, Fp), 2 * a, 'suma de distancias');
    if (tipo === 'hiperbola') cerca(Math.abs(dist(V, F) - dist(V, Fp)), 2 * a, 'dif. de distancias');
    if (tipo === 'parabola') { // d(V,F) = p = d(V, directriz); L equidista de F y de la directriz
      cerca(dist(V, F), p); const L = el.pts.find((x) => x.n === 'L');
      const dd = el.dir.x !== undefined ? Math.abs(L.x - el.dir.x) : Math.abs(L.y - el.dir.y);
      cerca(dist(L, F), dd, 'L equidista de F y directriz'); cerca(el.lr, 4 * p);
    }
    if (tipo === 'circunferencia') cerca(f(h + a, k), 0);
    assert.deepEqual(preguntas.slice(0, 2).map((q) => q.valor), [h, k]);
    // el generador se puede resolver a partir de la general: completar cuadrados reproduce (h, k)
    if (tipo !== 'parabola') { cerca(-g.D / (2 * g.A), h); cerca(-g.E / (2 * g.C), k); }
  }
  assert.ok(vistos.has('elipse-h') && vistos.has('elipse-v') && vistos.has('hiperbola-v') && vistos.has('parabola-aba'));
});

test('cónicas: general conocida del Modelo 1 (9x²+25y²−54x+100y−44=0) y ordinaria', () => {
  const s = { tipo: 'elipse', h: 3, k: -2, a: 5, b: 3, ori: 'h' };
  assert.deepEqual(general(s), { A: 9, C: 25, D: -54, E: 100, F: -44 });
  assert.equal(ordinariaTex(s), '\\frac{(x-3)^2}{25}+\\frac{(y+2)^2}{9}=1');
  const e = elementos(s); assert.equal(e.c, 4); cerca(e.lr, 18 / 5);
});

test('SVG de cónicas: se genera para todas las combinaciones de sliders', () => {
  for (const tipo of ['circunferencia', 'elipse', 'hiperbola', 'parabola']) for (const ori of tipo === 'parabola' ? ['der', 'izq', 'arr', 'aba'] : ['h', 'v'])
    for (const [h, k] of [[0, 0], [-6, 6], [6, -6]]) {
      const svg = svgConica(elementos({ tipo, h, k, a: 5, b: 3, p: 2, ori }), { ancho: 390 });
      assert.match(svg, /^<svg/); assert.doesNotMatch(svg, /NaN|undefined|Infinity/);
    }
});

test('catálogo: todos los generadores devuelven ejercicio completo', () => {
  for (const c of Object.values(CATALOGO)) for (const it of c.items) for (const s of seeds.slice(0, 50)) {
    const e = it.gen(mulberry32(s));
    assert.ok(e.enunciado && e.pasos.length >= 2 && e.preguntas.length >= 1 && e.resultado, `${it.id} ${s}`);
    const txt = e.enunciado + e.pasos.join('') + e.resultado;
    assert.doesNotMatch(txt, /NaN|undefined|Infinity|\+-|--/, `${it.id} ${s}: ${txt}`);
  }
});

test('elementos de cátedra: 1r5 (elipse) y modelo2-p2 (parábola, p con signo)', () => {
  const near = (q, x, y) => assert.ok(Math.hypot(q.x - x, q.y - y) < 1e-9, `${q.n}(${q.x};${q.y}) != (${x};${y})`);
  const pt = (el, n) => el.pts.find((q) => q.n === n);
  const e = elementos({ tipo: 'elipse', h: 3, k: -2, a: 3, b: 2, ori: 'v' });
  near(pt(e, 'L'), 13 / 3, -2 + Math.sqrt(5));
  const p = elementos({ tipo: 'parabola', h: 5, k: -1, p: 1, ori: 'izq' }); // (y+1)^2 = -4(x-5)
  near(pt(p, 'V'), 5, -1); near(pt(p, 'F'), 4, -1); near(pt(p, 'A'), 6, -1);
  near(pt(p, 'L'), 4, 1); near(pt(p, "L'"), 4, -3);
  assert.equal(p.ps, -1); assert.equal(p.dir.x, 6); assert.equal(p.lr, 4);
});

test('parcial aleatorio: formato de la cátedra', () => {
  for (const s of seeds.slice(0, 50)) {
    const p1 = armarParcial('modelo1', mulberry32(s));
    assert.deepEqual(p1.ejercicios.map((e) => e.puntos), [30, 30, 40]);
    assert.deepEqual(p1.ejercicios.map((e) => e.unidad), ['U10', 'U9', 'U9']);
    const p2 = armarParcial('modelo2', mulberry32(s));
    assert.equal(p2.ejercicios.length, 3);
    assert.equal(p2.ejercicios.reduce((a, e) => a + e.puntos, 0), 100);
    p2.ejercicios.forEach((e) => assert.ok(e.enunciado && e.pasos.length && e.resultado));
  }
  assert.throws(() => armarParcial('x'));
});

test('planoPuntoVectores: P en el plano y normal ⟂ a v y u', () => {
  for (const s of seeds) {
    const { datos: { v, u, P, n, d } } = planoPuntoVectores(mulberry32(s));
    assert.ok(norm2(cross(v, u)) > 0 && norm2(n) > 0);
    assert.equal(dot(n, v), 0); assert.equal(dot(n, u), 0); assert.equal(dot(n, P) + d, 0);
  }
});

test('planoPuntoRecta: P en el plano y la recta intersección está contenida', () => {
  for (const s of seeds) {
    const { datos: { n1, d1, n2, d2, P, n, d } } = planoPuntoRecta(mulberry32(s));
    assert.ok(norm2(cross(n1, n2)) > 0);
    assert.equal(dot(n, P) + d, 0);
    assert.ok(dot(n1, P) + d1 !== 0 || dot(n2, P) + d2 !== 0); // P fuera de la recta
    // n y d son combinación lineal de (n1,d1) y (n2,d2): el director de la recta es ⟂ n
    assert.ok(dot(n, cross(n1, n2)) === 0);
    // un punto de la recta (resolviendo con z libre) cumple el plano: A = (d2*n1 - d1*n2)... verificamos por rango
    const M = [[...n1, d1], [...n2, d2], [...n, d]];
    const det3 = (a) => a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
    for (const cols of [[0, 1, 3], [0, 2, 3], [1, 2, 3]]) assert.ok(det3(M.map((f) => cols.map((c) => f[c]))) === 0);
  }
});

test('parabolaPunto: el punto está en la parábola y radio vector = distancia a la directriz', () => {
  for (const s of seeds) {
    const e = parabolaPunto(mulberry32(s)), { g, el, P, radio, dist } = e.datos;
    assert.ok(Number.isInteger(P[0]) && Number.isInteger(P[1]));
    cerca(evalGeneral(g, P[0], P[1]), 0, 'P en la parábola');
    cerca(radio, dist, 'radio vector');
    cerca(e.preguntas.at(-1).valor, radio);
    assert.equal(el.tipo, 'parabola');
  }
});

test('modelo2: tres ejercicios exactos', () => {
  const p = armarParcial('modelo2', mulberry32(7));
  assert.deepEqual(p.ejercicios.map((e) => e.titulo.split(':')[0].slice(0, 5)), ['Plano', 'Plano', 'Paráb']);
});

test('planos: se acepta cualquier múltiplo no nulo (signo opuesto, ×2) y se rechaza lo demás', () => {
  const tx = (n, d) => `${n[0]}x${n[1] < 0 ? '' : '+'}${n[1]}y${n[2] < 0 ? '' : '+'}${n[2]}z${d < 0 ? '' : '+'}${d}=0`;
  assert.deepEqual(parsePlano('3x-2y+7z-23=0'), [3, -2, 7, -23]);
  assert.deepEqual(parsePlano('-x + z = 4'), [-1, 0, 1, -4]);
  assert.equal(parsePlano('3x+*y'), null); assert.equal(parsePlano('x=y=0'), null);
  for (const gen of [planoTresPuntos, planoPuntoVectores, planoPuntoRecta, planoPerpInterseccion]) for (const s of seeds.slice(0, 100)) {
    const { datos: { n, d }, preguntas: [q] } = gen(mulberry32(s));
    assert.equal(verificar(q, tx(n, d)), 'bien');
    assert.equal(verificar(q, tx(n.map((x) => -x), -d)), 'bien', 'signo opuesto');
    assert.equal(verificar(q, tx(n.map((x) => 2 * x), 2 * d)), 'bien', '×2');
    assert.equal(verificar(q, tx(n, d + 1)), 'mal');
    assert.equal(verificar(q, '0x+0y+0z+0=0'), 'mal');
    assert.equal(verificar(q, 'hola'), 'invalido');
  }
});
