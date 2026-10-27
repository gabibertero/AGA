// Aprendizaje (teórico): UI de práctica. La lógica pura está en aprendizaje-logica.js.
// Las preguntas ya vienen renderizadas (KaTeX en build) dentro de [data-banco]; acá solo se mueven nodos.
import { leer, guardar } from './progreso.js';
import { armarSesion, esCorrecta, resumen, aRepasar, promptCorreccion, nuevaDemo, elegirDemo, resultadoDemo, ordenHueco, mulberry32, RESULTADOS, UNIDADES } from './aprendizaje-logica.js';

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
if (![...UNIDADES, 'mezcla', 'repasar'].includes(unidad)) unidad = 'mezcla';
let sesion = [];
let i = 0;
let sess = {};
let respondida = false;
let actual = null;

const mediasChk = $('[data-incluir-medias]');
const cfgAviso = $('[data-cfg-aviso]');
const guardados = () => Object.fromEntries(meta.map((q) => [q.id, resultado(q.id)]));
const idsRepasar = () => aRepasar(meta.map((q) => q.id), guardados(), { medias: mediasChk.checked });

function pintarConfig() {
  $('[data-n-repasar]').textContent = idsRepasar().length;
  mediasChk.closest('[data-medias-fila]').hidden = unidad !== 'repasar';
  cfgAviso.textContent = '';
  document.querySelectorAll('[data-unidad-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.unidadBtn === unidad)));
  $('[data-prog]').textContent = 'Tu avance (última vez «Bien»): ' + UNIDADES.map((u) => {
    const qs = meta.filter((q) => q.unidad === u);
    return `${u} ${qs.filter((q) => resultado(q.id) === 'bien').length}/${qs.length}`;
  }).join(' · ');
}
mediasChk.onchange = pintarConfig;
document.querySelectorAll('[data-unidad-btn]').forEach((b) => (b.onclick = () => { unidad = b.dataset.unidadBtn; guardar('apr:unidad', unidad); pintarConfig(); }));

$('[data-empezar]').onclick = () => {
  const semilla = (crypto.getRandomValues(new Uint32Array(1))[0]) >>> 0;
  const repasar = unidad === 'repasar';
  const solo = repasar ? idsRepasar() : null;
  if (repasar && !solo.length) {
    cfgAviso.textContent = mediasChk.checked
      ? 'No tenés preguntas falladas ni a medias todavía. Practicá una unidad y volvé.'
      : 'No tenés preguntas falladas todavía. Practicá una unidad y volvé (podés incluir también las «a medias»).';
    return;
  }
  sesion = armarSesion(meta, { unidad: repasar ? 'mezcla' : unidad, n: Number($('[data-n]').value), semilla, solo });
  i = 0; sess = {};
  cfg.hidden = true; fin.hidden = true; ses.hidden = false;
  mostrar();
};
$('[data-nueva]').onclick = () => { fin.hidden = true; cfg.hidden = false; pintarConfig(); $('#ap-cfg-t').scrollIntoView({ block: 'start' }); };

// Enunciado en texto plano (sin el MathML oculto de KaTeX), recortado.
function enunCorto(id) {
  const e = originales.get(id).querySelector('.q-enun').cloneNode(true);
  e.querySelectorAll('.katex-mathml').forEach((m) => m.remove());
  const t = e.textContent.replace(/\s+/g, ' ').trim();
  return t.length > 110 ? t.slice(0, 107) + '…' : t;
}

async function copiar(texto) {
  try { await navigator.clipboard.writeText(texto); return true; } catch (e) {}
  try {
    const t = document.createElement('textarea');
    t.value = texto; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.append(t); t.select();
    const ok = document.execCommand('copy'); t.remove(); return ok;
  } catch (e) { return false; }
}

// Preguntas "a desarrollar": campo para escribir la respuesta + botón que copia el prompt de corrección.
// El borrador se guarda por pregunta (apr-resp:<id>) para no perderlo al navegar.
function montarDev(art, id) {
  const enun = art.dataset.enunRaw || '';
  const caja = document.createElement('div');
  caja.className = 'ap-dev';
  const lab = document.createElement('label');
  lab.className = 'ap-dev-lab'; lab.htmlFor = 'ap-dev-ta';
  lab.textContent = 'Tu respuesta';
  const ta = document.createElement('textarea');
  ta.id = 'ap-dev-ta'; ta.className = 'ap-dev-ta'; ta.rows = 6;
  ta.placeholder = 'Escribí tu desarrollo acá…';
  try { ta.value = leer('apr-resp:' + id) || ''; } catch (e) {}
  ta.oninput = () => { try { guardar('apr-resp:' + id, ta.value); } catch (e) {} };
  const acc = document.createElement('div');
  acc.className = 'ap-dev-acc';
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'btn';
  btn.textContent = 'Copiar para corregir con IA (1–10)';
  const estado = document.createElement('span');
  estado.className = 'ap-dev-ok suave'; estado.setAttribute('role', 'status');
  btn.onclick = async () => {
    const ok = await copiar(promptCorreccion(enun, ta.value));
    estado.textContent = ok ? 'Copiado. Pegalo en Claude, ChatGPT o Gemini.' : 'No se pudo copiar; seleccioná el texto y copialo a mano.';
  };
  acc.append(btn, estado);
  caja.append(lab, ta, acc);
  art.append(caja);
}

// Demostración guiada: huecos en orden (uno por paso), ✓/✗ con .ap-opc, revela el porqué.
// Resultado único apr:<id>: 'bien' si no hubo ningún fallo, 'mal' si lo hubo (lógica en aprendizaje-logica.js).
function montarDemo(art) {
  const demo = art.querySelector('.q-demo');
  demo.hidden = false;
  const pasos = [...demo.querySelectorAll('[data-paso]')];
  let est = nuevaDemo(pasos.length);
  const r = mulberry32(crypto.getRandomValues(new Uint32Array(1))[0] >>> 0);
  pasos.forEach((li, k) => {
    li.hidden = k > 0;
    const h = li.querySelector('[data-hueco]');
    const okIdx = Number(h.dataset.ok);
    const pista = h.dataset.pista;
    const ops = [...h.children];
    const slot = li.querySelector('[data-slot]');
    const caja = document.createElement('div');
    caja.className = 'ap-opcs';
    caja.setAttribute('role', 'group');
    caja.setAttribute('aria-label', 'Opciones del paso ' + (k + 1));
    const botones = ordenHueco(r, ops.length).map((orig, pos) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'ap-opc';
      const letra = document.createElement('span');
      letra.className = 'ap-letra'; letra.textContent = String.fromCharCode(65 + pos) + ')';
      const txt = document.createElement('span');
      txt.className = 'ap-txt';
      txt.append(...[...ops[orig].childNodes].map((n) => n.cloneNode(true)));
      b.append(letra, txt);
      b.onclick = () => {
        if (k !== est.paso) return;
        const ok = orig === okIdx;
        est = elegirDemo(est, ok);
        b.disabled = true;
        b.dataset.v = ok ? 'ok' : 'mal';
        if (!ok) {
          const t = document.createElement('span');
          t.className = 'sr-only'; t.textContent = ' (incorrecta)';
          b.append(t);
          aviso.textContent = 'La opción ' + letra.textContent.replace(')', '') + ' no es.' + (pista ? ' Pista: ' + pista + '.' : ' Probá con otra.');
          const sig = caja.querySelector('button:not(:disabled)');
          if (sig) sig.focus();
          return;
        }
        caja.querySelectorAll('button').forEach((x) => (x.disabled = true));
        slot.replaceChildren(...[...ops[okIdx].childNodes].map((n) => n.cloneNode(true)));
        slot.dataset.ok = '';
        slot.setAttribute('role', 'img'); slot.setAttribute('aria-label', 'Hueco completado: ' + slot.textContent);
        li.querySelector('[data-porque]').hidden = false;
        if (k + 1 < pasos.length) {
          pasos[k + 1].hidden = false; aviso.textContent = 'Correcto. Siguiente paso.';
          pasos[k + 1].tabIndex = -1; pasos[k + 1].focus();
          return;
        }
        const res = resultadoDemo(est);
        guardarResultado(actual.id, res);
        actual.resp.hidden = false;
        aviso.textContent = res === 'bien' ? 'Demostración completa, sin errores.' : 'Demostración completa, pero con errores: queda para repasar.';
        btnSig.focus();
      };
      return b;
    });
    caja.append(...botones);
    h.replaceWith(caja);
  });
}

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
  if (actual.forma === 'dev') montarDev(art, id);
  if (actual.forma === 'demo') montarDemo(art);
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
  const lista = $('[data-repasar-lista]');
  lista.replaceChildren();
  for (const [estado, rotulo] of [['mal', 'Para repasar (mal)'], ['medias', 'A medias']]) {
    const ids = sesion.map((s) => s.id).filter((id) => sess[id] === estado);
    if (!ids.length) continue;
    const h = document.createElement('h3');
    h.textContent = rotulo;
    const ul = document.createElement('ul');
    ids.forEach((id) => { const li = document.createElement('li'); li.textContent = `${id}: ${enunCorto(id)}`; ul.append(li); });
    lista.append(h, ul);
  }
  stage.replaceChildren();
  ses.hidden = true; fin.hidden = false;
  $('#ap-fin-t').focus();
};

addEventListener('storage', pintarConfig);
pintarConfig();
