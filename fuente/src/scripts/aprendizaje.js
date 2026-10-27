// Aprendizaje (teórico): UI de práctica. La lógica pura está en aprendizaje-logica.js.
// Las preguntas ya vienen renderizadas (KaTeX en build) dentro de [data-banco]; acá solo se mueven nodos.
import { leer, guardar } from './progreso.js';
import { armarSesion, esCorrecta, resumen, RESULTADOS, UNIDADES } from './aprendizaje-logica.js';

const $ = (s) => document.querySelector(s);
const banco = $('[data-banco]');
const cfg = $('[data-config]');
const ses = $('[data-sesion]');
const fin = $('[data-fin]');
const stage = $('[data-stage]');
const btnVer = $('[data-ver]');
const grupoEval = $('[data-eval]');
const btnSig = $('[data-sig]');
const aviso = $('[data-aviso]');
const cont = $('[data-cont]');
const ETIQ = { bien: 'Bien', medias: 'A medias', mal: 'Mal' };

// Con JS el banco estático se retira del DOM (quedan los nodos en memoria, sin ids duplicados de SVG).
const originales = new Map();
const meta = [];
banco.querySelectorAll('[data-q]').forEach((a) => {
  const d = a.dataset;
  meta.push({ id: d.id, unidad: d.unidad, tipo: d.tipo, nOpc: Number(d.nopc) || 0 });
  originales.set(d.id, a);
});
banco.remove();
document.querySelectorAll('[data-js]').forEach((e) => (e.hidden = false));

const resultado = (id) => { const v = leer('apr:' + id); return RESULTADOS.includes(v) ? v : undefined; };

let unidad = leer('apr:unidad');
if (![...UNIDADES, 'mezcla'].includes(unidad)) unidad = 'mezcla';
let sesion = [];
let i = 0;
let sess = {};
let respondida = false;
let actual = null;

function pintarConfig() {
  document.querySelectorAll('[data-unidad-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.unidadBtn === unidad)));
  $('[data-prog]').textContent = 'Tu avance (última vez «Bien»): ' + UNIDADES.map((u) => {
    const qs = meta.filter((q) => q.unidad === u);
    return `${u} ${qs.filter((q) => resultado(q.id) === 'bien').length}/${qs.length}`;
  }).join(' · ');
}
document.querySelectorAll('[data-unidad-btn]').forEach((b) => (b.onclick = () => { unidad = b.dataset.unidadBtn; guardar('apr:unidad', unidad); pintarConfig(); }));

$('[data-empezar]').onclick = () => {
  const semilla = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0;
  sesion = armarSesion(meta, { unidad, n: Number($('[data-n]').value), semilla });
  i = 0; sess = {};
  cfg.hidden = true; fin.hidden = true; ses.hidden = false;
  mostrar();
};
$('[data-nueva]').onclick = () => { fin.hidden = true; cfg.hidden = false; pintarConfig(); $('#ap-cfg-t').scrollIntoView({ block: 'start' }); };

function marcarEval(r) {
  grupoEval.querySelectorAll('[data-r]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.r === r)));
}
function guardarResultado(id, r) { sess[id] = r; guardar('apr:' + id, r); }

function mostrar() {
  const { id, orden } = sesion[i];
  const art = originales.get(id).cloneNode(true);
  const resp = art.querySelector('.q-resp');
  art.querySelector('.q-sinjs').remove();
  actual = { id, orden, art, resp, forma: art.dataset.forma };
  respondida = false;
  aviso.textContent = '';
  resp.hidden = true;
  if (actual.forma === 'mc') {
    const lis = [...art.querySelectorAll('.q-opts > li')];
    const caja = document.createElement('div');
    caja.className = 'ap-opcs';
    caja.setAttribute('role', 'group');
    caja.setAttribute('aria-label', 'Opciones');
    orden.forEach((orig, pos) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ap-opc';
      b.setAttribute('aria-pressed', 'false');
      const letra = document.createElement('span');
      letra.className = 'ap-letra';
      letra.textContent = String.fromCharCode(65 + pos) + ')';
      const txt = document.createElement('span');
      txt.className = 'ap-txt';
      txt.append(...lis[orig].childNodes);
      b.append(letra, txt);
      b.onclick = () => responderMC(pos, caja);
      caja.append(b);
    });
    art.querySelector('.q-opts').replaceWith(caja);
  }
  art.append(resp);
  stage.replaceChildren(art);
  btnVer.hidden = actual.forma !== 'dev';
  btnVer.setAttribute('aria-expanded', 'false');
  btnVer.textContent = 'Ver respuesta modelo';
  grupoEval.hidden = true;
  marcarEval(undefined);
  btnSig.textContent = i === sesion.length - 1 ? 'Ver resumen' : 'Siguiente';
  cont.textContent = `Pregunta ${i + 1} de ${sesion.length}`;
  $('[data-barra]').style.setProperty('--p', Math.round((100 * i) / sesion.length) + '%');
  cont.focus({ preventScroll: true });
  ses.scrollIntoView({ block: 'start' });
}

function responderMC(pos, caja) {
  if (respondida) return;
  respondida = true;
  const correctaOrig = Number(actual.art.dataset.correcta);
  const ok = esCorrecta(actual.orden, correctaOrig, pos);
  const posOk = actual.orden.indexOf(correctaOrig);
  [...caja.children].forEach((b, p) => {
    b.disabled = true;
    if (p === pos) b.setAttribute('aria-pressed', 'true');
    if (p === posOk) b.dataset.v = 'ok'; else if (p === pos) b.dataset.v = 'mal';
  });
  guardarResultado(actual.id, ok ? 'bien' : 'mal');
  actual.resp.hidden = false;
  aviso.textContent = ok ? 'Correcto.' : `Incorrecto. La correcta era la ${String.fromCharCode(65 + posOk)}.`;
  btnSig.focus();
}

btnVer.onclick = () => {
  const abierto = actual.resp.hidden;
  actual.resp.hidden = !abierto;
  btnVer.setAttribute('aria-expanded', String(abierto));
  btnVer.textContent = abierto ? 'Ocultar respuesta modelo' : 'Ver respuesta modelo';
  grupoEval.hidden = !abierto;
  if (abierto) marcarEval(sess[actual.id]);
};
grupoEval.querySelectorAll('[data-r]').forEach((b) => (b.onclick = () => {
  guardarResultado(actual.id, b.dataset.r);
  marcarEval(b.dataset.r);
  aviso.textContent = `Guardado: ${ETIQ[b.dataset.r]}.`;
}));

btnSig.onclick = () => {
  if (i < sesion.length - 1) { i++; mostrar(); return; }
  const c = resumen(sesion.map((s) => s.id), sess);
  $('[data-resumen]').textContent = `${sesion.length} preguntas: ${c.bien} bien, ${c.medias} a medias, ${c.mal} mal, ${c.sin} sin responder.`;
  stage.replaceChildren();
  ses.hidden = true; fin.hidden = false;
  $('#ap-fin-t').focus();
};

addEventListener('storage', pintarConfig);
pintarConfig();
