// Inicio: cuenta regresiva, progreso, "seguir donde dejaste". Todo en try/catch: sin localStorage el Inicio se ve igual.
import { leer, guardar } from './progreso.js';

const $ = (s, r = document) => r.querySelector(s);
const base = import.meta.env.BASE_URL;

// --- Cuenta regresiva (fechas yyyy-mm-dd en hora local; días de calendario) ---
const dias = (iso, hoy = new Date()) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return null;
  const a = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.round((new Date(y, m - 1, d) - a) / 864e5);
};
const textoDias = (n) => (n === null ? 'Sin fecha' : n > 1 ? `Faltan ${n} días` : n === 1 ? 'Mañana' : n === 0 ? 'Es hoy' : n === -1 ? 'Fue ayer' : `Pasó hace ${-n} días`);
document.querySelectorAll('[data-fecha]').forEach((box) => {
  const k = 'fecha:' + box.dataset.fecha, inp = $('input', box), out = $('[data-dias]', box);
  const pintar = () => {
    const n = inp.value ? dias(inp.value) : null;
    out.textContent = textoDias(n);
    out.dataset.dias = n === null ? '' : String(n);
    out.classList.toggle('cerca', n !== null && n >= 0 && n <= 7);
  };
  inp.value = leer(k) || '';
  inp.onchange = () => { guardar(k, inp.value); pintar(); };
  pintar();
});

// --- Progreso: ejercicios resueltos + último puntaje por examen ---
const tarjeta = $('[data-total]');
const total = Number(tarjeta?.dataset.total) || 0;
let hechos = 0;
try { hechos = Object.keys(localStorage).filter((k) => k.startsWith('aga:v1:estado:') && localStorage.getItem(k) === 'resuelto').length; } catch { /* sin storage */ }
const notas = [];
document.querySelectorAll('[data-ex-fila]').forEach((fila) => {
  const ids = fila.dataset.ids.split(',').filter(Boolean);
  const ok = ids.filter((id) => leer('estado:' + id) === 'resuelto').length;
  let txt = `${ok}/${ids.length} resueltos`;
  try {
    const u = JSON.parse(leer('examen:' + fila.dataset.examen));
    if (Number.isFinite(u?.nota)) { notas.push(u.nota); txt += ` · último puntaje ${Number.isInteger(u.nota) ? u.nota : u.nota.toFixed(1)}/100`; }
  } catch { /* sin intento o corrupto */ }
  $('[data-ex-estado]', fila).textContent = txt;
});
if (tarjeta && (hechos || notas.length)) {
  $('[data-prog-vacio]').hidden = true;
  $('[data-prog-datos]').hidden = false;
  $('[data-p-hechos]').textContent = hechos;
  $('[data-p-barra]').style.setProperty('--p', (total ? Math.min(100, (hechos / total) * 100) : 0) + '%');
  const prom = notas.length ? notas.reduce((a, b) => a + b, 0) / notas.length : null;
  $('[data-p-prom]').textContent = prom === null ? 'Todavía no hiciste ningún modo examen.' : `Modo examen: ${notas.length} ${notas.length === 1 ? 'examen' : 'exámenes'} con puntaje · promedio ${prom.toFixed(1)}/100.`;
}

// --- Seguir donde dejaste ---
try {
  const u = JSON.parse(leer('ultimo'));
  const url = new URL(u.href, location.origin);
  if (url.origin === location.origin && url.pathname.startsWith(base) && u.t) {
    const p = $('[data-seguir]');
    p.textContent = '';
    const a = document.createElement('a');
    a.href = url.pathname;
    a.textContent = String(u.t).slice(0, 80);
    p.append('Seguir donde dejaste: ', a);
    p.hidden = false;
  }
} catch { /* nada guardado */ }
