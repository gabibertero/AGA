// Preguntero teórico: filtros, marcas "la sé / repasar" (aga:v1:preg:<id>) y simulacro con cronómetro.
import { leer, guardar } from './progreso.js';

const preguntas = [...document.querySelectorAll('[data-pregunta]')];
const MARCAS = ['sabe', 'repasar'];
const ETIQ = { sabe: '✓ La sé', repasar: '↻ Para repasar' };
let filtro = 'todas';
document.querySelectorAll('[data-js]').forEach((e) => (e.hidden = false)); // sin JS quedan ocultos

function pintarMarca(art) {
  const m = leer('preg:' + art.dataset.id);
  const marca = MARCAS.includes(m) ? m : '';
  if (marca) art.dataset.estado = marca; else delete art.dataset.estado;
  art.querySelectorAll('[data-marca]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.marca === marca)));
  art.querySelector('[data-estado-txt]').textContent = ETIQ[marca] || '';
}

function aplicarFiltro() {
  let visibles = 0;
  preguntas.forEach((art) => {
    const ok = filtro === 'todas' || (filtro === 'repasar' ? art.dataset.estado === 'repasar' : art.dataset.unidad === filtro);
    art.hidden = !ok;
    if (ok) visibles++;
  });
  document.querySelectorAll('[data-seccion]').forEach((s) => (s.hidden = !s.querySelector('[data-pregunta]:not([hidden])')));
  document.querySelector('[data-vacio]').hidden = visibles > 0;
  document.querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === filtro)));
  const sabe = preguntas.filter((a) => a.dataset.estado === 'sabe').length;
  const rep = preguntas.filter((a) => a.dataset.estado === 'repasar').length;
  const cont = document.querySelector('[data-contador]');
  cont.textContent = `${sabe} de ${preguntas.length} sabidas · ${rep} para repasar · mostrando ${visibles}`;
  const f = document.activeElement; // si la tarjeta con el foco quedó oculta, no perder el foco
  if (!f || f === document.body || f.closest('[hidden]')) { cont.tabIndex = -1; cont.focus(); }
}

preguntas.forEach((art) => {
  pintarMarca(art);
  art.querySelectorAll('[data-marca]').forEach((b) => {
    b.onclick = () => {
      const actual = leer('preg:' + art.dataset.id);
      guardar('preg:' + art.dataset.id, actual === b.dataset.marca ? '' : b.dataset.marca); // volver a tocar = desmarcar
      pintarMarca(art);
      aplicarFiltro();
    };
  });
});
document.querySelectorAll('[data-filtro]').forEach((b) => (b.onclick = () => { filtro = b.dataset.filtro; aplicarFiltro(); }));
addEventListener('storage', () => { preguntas.forEach(pintarMarca); aplicarFiltro(); });
aplicarFiltro();

// ---- Simulacro: una de recta (U9), una de U8/U9 y una de cónicas (U10), como T1/T2 ----
const sorteo = (clave) => {
  const pool = preguntas.filter((a) => a.dataset.sim === clave);
  return pool[Math.floor(Math.random() * pool.length)];
};
const lista = document.querySelector('[data-sim-lista]');
const reloj = document.querySelector('[data-reloj]');
const aviso = document.querySelector('[data-sim-aviso]');
let timer = null;

function parar() { clearInterval(timer); timer = null; }
function pintarReloj(seg) {
  reloj.textContent = `${String(Math.floor(seg / 60)).padStart(2, '0')}:${String(seg % 60).padStart(2, '0')}`;
}

document.querySelector('[data-armar]').onclick = () => {
  parar();
  reloj.hidden = true;
  reloj.removeAttribute('data-fin');
  aviso.textContent = '';
  lista.replaceChildren();
  ['A', 'B', 'C'].map(sorteo).filter(Boolean).forEach((orig, i) => {
    const c = orig.cloneNode(true);
    c.removeAttribute('id'); c.removeAttribute('data-id'); c.removeAttribute('data-pregunta'); c.removeAttribute('hidden'); // el clon es solo lectura
    c.querySelector('.preg-acc')?.remove();
    c.querySelector('[data-estado-txt]')?.remove();
    c.querySelector('details')?.removeAttribute('open');
    c.querySelector('.preg-tit').textContent = `Pregunta ${i + 1}. ` + c.querySelector('.preg-tit').textContent;
    lista.append(c);
  });
  if (document.querySelector('[data-crono]').checked) {
    let resto = Number(document.querySelector('[data-minutos]').value) * 60;
    reloj.hidden = false;
    pintarReloj(resto);
    timer = setInterval(() => {
      resto--;
      pintarReloj(Math.max(resto, 0));
      if (resto <= 0) { parar(); reloj.dataset.fin = ''; reloj.textContent += ' · tiempo'; aviso.textContent = 'Se terminó el tiempo del simulacro.'; }
    }, 1000);
  }
  lista.firstElementChild?.scrollIntoView({ block: 'nearest' });
};
