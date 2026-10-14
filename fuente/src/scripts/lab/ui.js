// UI (DOM): generadores de ejercicios y cónicas interactivas. La lógica vive en los otros módulos.
import katex from 'katex';
import { mulberry32, verificar } from './util.js';
import { CATALOGO } from './index.js';
import { general, generalTex, ordinariaTex, elementos, elementosTex, NOMBRES } from './conica.js';
import { svgConica } from './plot-conica.js';

export function tex(el, src, display = false) {
  katex.render(src, el, { throwOnError: false, displayMode: display });
}
// Texto con **negrita**, $math$, $$display$$ y saltos de línea.
export function rich(el, str) {
  el.textContent = '';
  for (const parte of str.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/)) {
    if (!parte) continue;
    if (parte.startsWith('$$')) { const d = document.createElement('div'); tex(d, parte.slice(2, -2), true); el.append(d); }
    else if (parte.startsWith('$')) { const s = document.createElement('span'); tex(s, parte.slice(1, -1)); el.append(s); }
    else parte.split(/(\*\*[^*]+\*\*|\n)/).forEach((t) => {
      if (t === '\n') el.append(document.createElement('br'));
      else if (t.startsWith('**')) { const b = document.createElement('strong'); b.textContent = t.slice(2, -2); el.append(b); }
      else if (t) el.append(t);
    });
  }
}

export function iniciarGeneradores(root) {
  root.hidden = false; // sin JS queda oculto
  const q = (s) => root.querySelector(s);
  const tabs = [...root.querySelectorAll('[data-u]')], sel = q('[data-tipo]');
  let unidad = 'U8', ej = null;

  const cargarTipos = () => {
    sel.textContent = '';
    CATALOGO[unidad].items.forEach((it, i) => sel.append(new Option(it.nombre, String(i))));
  };
  function nuevo() {
    const item = CATALOGO[unidad].items[Number(sel.value) || 0];
    let e, prev = ej?.enunciado;
    for (let i = 0; i < 12; i++) { // evita repetir el mismo enunciado
      e = item.gen(mulberry32(Math.floor(Math.random() * 2 ** 31)));
      if (e.enunciado !== prev) break;
    }
    ej = e;
    q('[data-titulo]').textContent = e.titulo;
    root.querySelector('[data-ej]').dataset.unidad = e.unidad;
    rich(q('[data-enunciado]'), e.enunciado);
    const cont = q('[data-preguntas]');
    cont.textContent = '';
    e.preguntas.forEach((p, i) => {
      const id = `lab-resp-${i}`, w = document.createElement('div'), l = document.createElement('label'), inp = document.createElement('input');
      l.htmlFor = id; l.textContent = p.etq;
      Object.assign(inp, { id, type: 'text', inputMode: 'text', autocomplete: 'off' });
      inp.setAttribute('data-resp', i);
      w.className = 'lab-campo'; w.append(l, inp); cont.append(w);
    });
    q('[data-feedback]').textContent = ''; q('[data-feedback]').className = 'lab-fb';
    const sol = q('[data-solucion]'); sol.hidden = true; q('[data-ver]').setAttribute('aria-expanded', 'false');
  }
  q('[data-form]').onsubmit = (ev) => {
    ev.preventDefault();
    const est = ej.preguntas.map((p, i) => verificar(p, q(`[data-resp="${i}"]`).value));
    const fb = q('[data-feedback]');
    const ok = est.every((x) => x === 'bien');
    fb.className = 'lab-fb ' + (ok ? 'ok' : 'mal');
    fb.textContent = est.includes('vacio') ? 'Completá todos los campos.' : est.includes('invalido') ? 'Escribí un número (podés usar 3/2, 1,5 o √5).' : ok ? '¡Correcto!'
      : 'Todavía no: ' + est.map((x, i) => `${ej.preguntas[i].etq} ${x === 'bien' ? '✓' : '✗'}`).join(' · ');
  };
  q('[data-ver]').onclick = () => {
    const sol = q('[data-solucion]'), abrir = sol.hidden;
    if (abrir) {
      sol.textContent = '';
      const ol = document.createElement('ol');
      ej.pasos.forEach((p) => { const li = document.createElement('li'); rich(li, p); ol.append(li); });
      const res = document.createElement('p'); res.className = 'lab-res';
      rich(res, '**Resultado:** ' + ej.resultado);
      sol.append(ol, res);
    }
    sol.hidden = !abrir; q('[data-ver]').setAttribute('aria-expanded', String(abrir));
  };
  q('[data-otro]').onclick = nuevo;
  sel.onchange = nuevo;
  tabs.forEach((b) => (b.onclick = () => {
    unidad = b.dataset.u;
    tabs.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    cargarTipos(); nuevo();
  }));
  cargarTipos(); nuevo();
}

// ---- Cónicas interactivas ----
const ORI = { h: ['h', 'Eje focal horizontal'], v: ['v', 'Eje focal vertical'] };
const ORI_P = [['der', 'Abre a la derecha'], ['izq', 'Abre a la izquierda'], ['arr', 'Abre hacia arriba'], ['aba', 'Abre hacia abajo']];

export function iniciarConicas(root) {
  root.hidden = false;
  const q = (s) => root.querySelector(s);
  const c = { tipo: q('[data-c-tipo]'), ori: q('[data-c-ori]'), h: q('[data-c-h]'), k: q('[data-c-k]'), a: q('[data-c-a]'), b: q('[data-c-b]'), p: q('[data-c-p]') };
  const campo = (n) => c[n].closest('.lab-campo');
  const graf = q('[data-c-graf]');

  function oriOpciones() {
    const par = c.tipo.value === 'parabola', cur = c.ori.value;
    c.ori.textContent = '';
    (par ? ORI_P : [ORI.h, ORI.v]).forEach(([v, t]) => c.ori.append(new Option(t, v)));
    c.ori.value = [...c.ori.options].some((o) => o.value === cur) ? cur : c.ori.options[0].value;
  }
  function pintar() {
    const t = c.tipo.value;
    const dosEjes = t === 'elipse' || t === 'hiperbola';
    campo('b').hidden = !dosEjes; campo('p').hidden = t !== 'parabola'; campo('a').hidden = t === 'parabola';
    campo('ori').hidden = t === 'circunferencia';
    q('[data-c-a-etq]').textContent = t === 'circunferencia' ? 'r (radio)' : t === 'elipse' ? 'a (semieje mayor)' : 'a (semieje real)';
    // Elipse: b < a siempre.
    c.a.min = t === 'elipse' ? 2 : 1;
    if (t === 'elipse') { if (+c.a.value < 2) c.a.value = 2; c.b.max = String(+c.a.value - 1); if (+c.b.value >= +c.a.value) c.b.value = String(+c.a.value - 1); } else c.b.max = '8';
    for (const n of ['h', 'k', 'a', 'b', 'p']) c[n].closest('.lab-campo').querySelector('output').textContent = c[n].value.replace('.', ',');
    const s = { tipo: t, h: +c.h.value, k: +c.k.value, a: +c.a.value, b: +c.b.value, p: +c.p.value, ori: c.ori.value };
    const el = elementos(s), g = general(s);
    graf.innerHTML = svgConica(el, { ancho: Math.max(280, Math.floor(graf.clientWidth || 640)) });
    tex(q('[data-c-ord]'), ordinariaTex(s), true);
    tex(q('[data-c-gen]'), generalTex(g), true);
    const ul = q('[data-c-elem]');
    ul.textContent = '';
    elementosTex(el).forEach((l) => { const li = document.createElement('li'); tex(li, l); ul.append(li); });
    q('[data-c-nombre]').textContent = NOMBRES[t].toLowerCase();
  }
  oriOpciones(); pintar();
  c.tipo.onchange = () => { oriOpciones(); pintar(); };
  for (const n of ['ori', 'h', 'k', 'a', 'b', 'p']) c[n].addEventListener('input', pintar);
  let w = graf.clientWidth;
  new ResizeObserver(() => { if (Math.abs(graf.clientWidth - w) > 8) { w = graf.clientWidth; pintar(); } }).observe(graf);
}
