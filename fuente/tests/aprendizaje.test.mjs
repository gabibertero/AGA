// node --test tests/aprendizaje.test.mjs : lógica pura de Aprendizaje + integridad del banco.
import test from 'node:test';
import assert from 'node:assert/strict';
import { armarSesion, barajar, esCorrecta, resumen, mulberry32, UNIDADES } from '../src/scripts/aprendizaje-logica.js';
import { BANCO } from '../src/data/aprendizaje-banco.js';

const meta = BANCO.map((q) => ({ id: q.id, unidad: q.unidad, tipo: q.tipo, nOpc: (q.tipo === 'graf' ? q.forma : q.tipo) === 'mc' ? q.opc.length : 0 }));
const semillas = Array.from({ length: 300 }, (_, i) => i * 7919 + 1);

test('banco: ids únicos, campos completos, mínimo por unidad y por tipo', () => {
  assert.equal(new Set(BANCO.map((q) => q.id)).size, BANCO.length);
  for (const q of BANCO) {
    assert.ok(UNIDADES.includes(q.unidad) && q.id.startsWith(q.unidad.toLowerCase() + '-'), q.id);
    assert.ok(['mc', 'dev', 'graf'].includes(q.tipo) && q.enun, q.id);
    const forma = q.tipo === 'graf' ? q.forma : q.tipo;
    if (q.tipo === 'graf') assert.ok(q.fig && ['mc', 'dev'].includes(q.forma), q.id);
    if (forma === 'mc') {
      assert.ok(q.opc.length >= 3 && Number.isInteger(q.correcta) && q.correcta >= 0 && q.correcta < q.opc.length && q.expl, q.id);
      assert.equal(new Set(q.opc).size, q.opc.length, `${q.id}: opciones repetidas`);
    } else assert.ok(q.modelo?.length, q.id);
  }
  for (const u of UNIDADES) {
    const qs = BANCO.filter((q) => q.unidad === u);
    assert.ok(qs.length >= 8, u);
    for (const t of ['mc', 'dev', 'graf']) assert.ok(qs.some((q) => q.tipo === t), `${u} sin ${t}`);
  }
});

test('barajar: permutación, no muta, determinista por semilla', () => {
  for (const s of semillas) {
    const xs = [1, 2, 3, 4, 5, 6, 7];
    const a = barajar(mulberry32(s), xs);
    assert.deepEqual([...a].sort(), xs);
    assert.deepEqual(xs, [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(a, barajar(mulberry32(s), xs));
  }
});

test('armarSesion por unidad: solo esa unidad, sin repetidos, orden es permutación', () => {
  for (const s of semillas) for (const u of UNIDADES) {
    const ses = armarSesion(meta, { unidad: u, n: 0, semilla: s });
    const pool = meta.filter((q) => q.unidad === u);
    assert.equal(ses.length, pool.length);
    assert.equal(new Set(ses.map((x) => x.id)).size, ses.length);
    for (const x of ses) {
      const q = meta.find((m) => m.id === x.id);
      assert.equal(q.unidad, u);
      if (q.nOpc) assert.deepEqual([...x.orden].sort(), [...Array(q.nOpc).keys()]);
      else assert.equal(x.orden, null);
    }
  }
});

test('armarSesion mezcla: respeta n, parejo entre unidades y sin repetidos', () => {
  for (const s of semillas) {
    const ses = armarSesion(meta, { unidad: 'mezcla', n: 9, semilla: s });
    assert.equal(ses.length, 9);
    assert.equal(new Set(ses.map((x) => x.id)).size, 9);
    for (const u of UNIDADES) assert.equal(ses.filter((x) => x.id.startsWith(u.toLowerCase() + '-')).length, 3);
  }
  assert.equal(armarSesion(meta, { unidad: 'mezcla', n: 0, semilla: 3 }).length, meta.length);
  assert.equal(armarSesion(meta, { unidad: 'mezcla', n: 999, semilla: 3 }).length, meta.length);
});

test('misma semilla = misma sesión; semillas distintas varían', () => {
  assert.deepEqual(armarSesion(meta, { unidad: 'mezcla', n: 10, semilla: 42 }), armarSesion(meta, { unidad: 'mezcla', n: 10, semilla: 42 }));
  const firmas = new Set(semillas.map((s) => armarSesion(meta, { unidad: 'mezcla', n: 10, semilla: s }).map((x) => x.id).join()));
  assert.ok(firmas.size > 100);
});

test('la correcta cae en posiciones distintas y esCorrecta sigue a la opción original', () => {
  const q = meta.find((m) => m.nOpc === 4);
  const posiciones = new Set();
  for (const s of semillas) {
    const { orden } = armarSesion([q], { unidad: q.unidad, semilla: s })[0];
    const pos = orden.indexOf(2);
    posiciones.add(pos);
    assert.ok(esCorrecta(orden, 2, pos));
    assert.ok(!esCorrecta(orden, 2, (pos + 1) % 4));
  }
  assert.equal(posiciones.size, 4);
  assert.equal(esCorrecta(null, 0, 0), false);
});

test('resumen cuenta y descarta valores inválidos', () => {
  assert.deepEqual(resumen(['a', 'b', 'c', 'd'], { a: 'bien', b: 'mal', c: 'basura' }), { bien: 1, medias: 0, mal: 1, sin: 2 });
});
