import { mountVisual } from './teorico-1p-visuals.js';
const prefix='aga:v1:teorico-1p:';
function read(key) { try { const v=JSON.parse(localStorage.getItem(prefix+key)||'{}'); return v&&typeof v==='object'&&!Array.isArray(v)?v:{}; } catch {return {};} }
function write(key,value) {try {localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{return false;}}
export function updateOverview() {
  document.querySelectorAll('[data-unit-link]').forEach(el=>{
    const state=read(el.dataset.unitLink);
    const values=Object.values(state.states||{});
    el.querySelector('[data-unit-progress]').textContent=`· ${values.filter(x=>x==='understood').length} entendidas · ${values.filter(x=>x==='review').length} para repasar`;
  });
  const last=read('last');
  const link=[...document.querySelectorAll('[data-unit-link]')].find(a=>a.dataset.unitLink===last.unit);
  const resume=document.querySelector('[data-resume]');
  if(link&&resume&&/^[a-z0-9-]+$/.test(last.lesson||'')) {
    const a=document.createElement('a');a.className='btn btn-primario';a.href=link.href+'#'+last.lesson;a.textContent='Seguir donde dejaste →';resume.append(a);resume.hidden=false;
  }
}
export function initTutor() {
  const root=document.querySelector('[data-tutor]');if(!root)return;
  const unit=root.dataset.unit, cards=[...root.querySelectorAll('[data-lesson]')],jumps=[...root.querySelectorAll('[data-jump]')];
  const stored=read(unit), state={last:stored.last,states:stored.states&&typeof stored.states==='object'?stored.states:{},notes:stored.notes&&typeof stored.notes==='object'?stored.notes:{}};
  let index=0;
  const status=root.querySelector('[data-save-status]');
  function save(){status.textContent=write(unit,state)?'Guardado en este navegador.':'No se pudo guardar en este navegador. Podés seguir estudiando durante esta visita.';}
  function refresh(){
    const understood=cards.filter(c=>state.states[c.dataset.id]==='understood').length;
    const review=cards.filter(c=>state.states[c.dataset.id]==='review').length;
    root.querySelector('[data-progress]').textContent=`${understood}/${cards.length} entendidas · ${review} para repasar`;
    cards.forEach((card,i)=>{
      const s=state.states[card.dataset.id];
      card.querySelector('[data-current-state]').textContent=s==='understood'?'✓ Entendido':s==='review'?'↻ Para repasar':'Pendiente';
      jumps[i].dataset.state=s||'pending';jumps[i].querySelector('[data-state-icon]').textContent=s==='understood'?'✓':s==='review'?'↻':'';
      card.querySelectorAll('[data-mark]').forEach(b=>b.setAttribute('aria-pressed',String(s===b.dataset.mark)));
    });
  }
  function show(i,focus=false){
    index=Math.max(0,Math.min(cards.length-1,i));
    cards.forEach((c,n)=>{c.hidden=n!==index;if(n!==index)c.querySelector('[data-visual]').replaceChildren();});
    jumps.forEach((a,n)=>{if(n===index)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
    const card=cards[index],host=card.querySelector('[data-visual]');mountVisual(host);
    const draft=card.querySelector('[data-draft]');draft.value=typeof state.notes[card.dataset.id]==='string'?state.notes[card.dataset.id]:'';
    root.querySelector('[data-counter]').textContent=`${index+1}/${cards.length}`;
    root.querySelector('[data-prev]').disabled=index===0;
    root.querySelector('[data-next]').hidden=index===cards.length-1;root.querySelector('[data-finish]').hidden=index!==cards.length-1;
    state.last=card.dataset.id;save();write('last',{unit,lesson:card.dataset.id});refresh();
    if(focus)card.querySelector('[data-lesson-title]').focus({preventScroll:false});
  }
  function fromHash(focus=false){const id=location.hash.slice(1)||state.last;const i=cards.findIndex(c=>c.dataset.id===id);show(i<0?0:i,focus);}
  root.querySelector('[data-prev]').addEventListener('click',()=>{location.hash=cards[index-1].dataset.id;});
  root.querySelector('[data-next]').addEventListener('click',()=>{location.hash=cards[index+1].dataset.id;});
  root.addEventListener('click',e=>{const b=e.target.closest('[data-mark]');if(!b)return;const id=cards[index].dataset.id;state.states[id]=state.states[id]===b.dataset.mark?'pending':b.dataset.mark;save();refresh();});
  root.addEventListener('input',e=>{if(!e.target.matches('[data-draft]'))return;state.notes[cards[index].dataset.id]=e.target.value;save();});
  window.addEventListener('hashchange',()=>fromHash(true));fromHash();
}
