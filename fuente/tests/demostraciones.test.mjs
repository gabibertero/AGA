import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEMOSTRACIONES } from '../src/data/demostraciones.js';

test('hay las 5 cónicas', () => {
  const ids = DEMOSTRACIONES.map((d) => d.id).sort();
  assert.deepEqual(ids, ['demo-circunferencia', 'demo-elipse', 'demo-hiperbola', 'demo-parabola', 'demo-parabola-horizontal']);
  const h = DEMOSTRACIONES.find((d) => d.id === 'demo-hiperbola');
  assert.equal(h.general, 'Ax^2+Cy^2+Dx+Ey+F=0');
  for (const d of DEMOSTRACIONES) for (const p of d.pasos) for (const s of p.linea)
    if (s.b?.pista) assert.ok(!s.b.pista.includes('^'), `${d.id}: pista sin ^`);
});

test('cada demostración tiene la forma esperada', () => {
  assert.ok(DEMOSTRACIONES.length > 0, 'hay al menos una demostración');
  const ids = new Set();
  for (const d of DEMOSTRACIONES) {
    assert.equal(d.tipo, 'demo', `${d.id}: tipo demo`);
    for (const campo of ['id', 'titulo', 'unidad', 'ordinaria', 'general']) {
      assert.equal(typeof d[campo], 'string', `${d.id}: ${campo} es string`);
      assert.ok(d[campo].length, `${d.id}: ${campo} no vacío`);
    }
    assert.ok(!ids.has(d.id), `${d.id}: id único`);
    ids.add(d.id);
    assert.ok(Array.isArray(d.pasos) && d.pasos.length, `${d.id}: tiene pasos`);
    let huecos = 0;
    for (const [n, p] of d.pasos.entries()) {
      assert.ok(p.que && p.porque, `${d.id} paso ${n}: que y porque`);
      assert.ok(Array.isArray(p.linea) && p.linea.length, `${d.id} paso ${n}: línea con segmentos`);
      for (const seg of p.linea) {
        const esFijo = typeof seg.t === 'string';
        const esHueco = seg.b && Array.isArray(seg.b.op);
        assert.ok(esFijo || esHueco, `${d.id} paso ${n}: segmento t fijo o b hueco`);
        if (esHueco) {
          huecos++;
          assert.ok(seg.b.op.length >= 2, `${d.id} paso ${n}: el hueco tiene ≥2 opciones`);
          assert.ok(Number.isInteger(seg.b.ok) && seg.b.ok >= 0 && seg.b.ok < seg.b.op.length,
            `${d.id} paso ${n}: ok dentro del rango de opciones`);
          assert.ok(seg.b.op.every((o) => typeof o === 'string' && o.length), `${d.id} paso ${n}: opciones TeX no vacías`);
        }
      }
    }
    assert.ok(huecos >= 1, `${d.id}: tiene al menos un hueco`);
  }
});
