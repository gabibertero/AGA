import { figure, vectorFigure, vectorTypes } from '../data/teorico-1p/figures.js';
export function mountVisual(host) {
 if(host.dataset.mounted==='true' && host.childElementCount)return;
 host.dataset.mounted='true';
 const type=host.dataset.visual;
 if(!vectorTypes.has(type)){if(!host.childElementCount)host.innerHTML=figure(type);return;}
 const picture=document.createElement('div');
 const controls=document.createElement('div');controls.className='tutor-sliders';
 const state={angle:35,length:2,k:1.5,a:1,b:1};
 function draw(){picture.innerHTML=vectorFigure(type,state);}
 const sliders=[['Ángulo','angle',0,180,1],['Módulo','length',0,2.5,.1]];
 if(['scalar','parallel'].includes(type))sliders.push(['Escalar k','k',-1.5,1.5,.1]);
 if(type==='combination'){sliders.splice(0,2);sliders.push(['Coeficiente a','a',0,1,.1],['Coeficiente b','b',0,1,.1]);}
 if(type==='independence')sliders.splice(1,1);
 if(type==='classes'||type==='equipollent')sliders.splice(0,2);
 for(const [label,key,min,max,step] of sliders){
  const row=document.createElement('label');row.className='tutor-slider';
  const name=document.createElement('span');name.textContent=label;
  const input=document.createElement('input');input.type='range';input.setAttribute('aria-label',label);Object.assign(input,{min:String(min),max:String(max),step:String(step),value:String(state[key])});
  const out=document.createElement('output');out.value=String(state[key]);
  input.addEventListener('input',()=>{state[key]=Number(input.value);out.value=input.value;draw();});row.append(name,input,out);controls.append(row);
 }
 host.replaceChildren(picture);if(sliders.length)host.append(controls);draw();
}
