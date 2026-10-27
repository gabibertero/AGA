import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promptCorreccion } from '../src/scripts/aprendizaje-logica.js';

test('arma el prompt con consigna y respuesta', () => {
  const p = promptCorreccion('Hallá la ecuación', 'x+y=0');
  assert.match(p, /nota del 1 al 10/);
  assert.match(p, /Consigna:\nHallá la ecuación/);
  assert.match(p, /Mi respuesta:\nx\+y=0/);
});

test('respuesta vacía queda marcada', () => {
  const p = promptCorreccion('Consigna X', '   ');
  assert.match(p, /Mi respuesta:\n\(en blanco\)/);
});

test('tolera enun/respuesta undefined', () => {
  const p = promptCorreccion();
  assert.match(p, /Consigna:\n\n/);
  assert.match(p, /\(en blanco\)/);
});
