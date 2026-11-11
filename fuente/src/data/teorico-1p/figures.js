// Esquemas propios, con letras y parámetros. No dependen de servicios externos.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const colors={blue:'#245cba',green:'#08785f',amber:'#ac5911',purple:'#7943a5'};
const text=(x,y,s,c='#33443d',size=16)=>`<text x="${x}" y="${y}" fill="${c}" style="font-size:${size}px" text-anchor="middle">${esc(s)}</text>`;
const line=(x,y,X,Y,c='#b8c9c0',dash=false)=>`<path d="M${x},${y}L${X},${Y}" fill="none" stroke="${c}" stroke-width="2" ${dash?'stroke-dasharray="5 5"':''}/>`;
const arrow=(x,y,X,Y,c=colors.blue)=>{if(Math.hypot(X-x,Y-y)<.01)return `<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`;const a=Math.atan2(Y-y,X-x),d=11;return line(x,y,X,Y,c)+`<path d="M${X-d*Math.cos(a-.4)},${Y-d*Math.sin(a-.4)}L${X},${Y}L${X-d*Math.cos(a+.4)},${Y-d*Math.sin(a+.4)}" fill="none" stroke="${c}" stroke-width="3"/>`;};
const box=(x,y,w,h,label,c=colors.green)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="white" stroke="${c}"/>`+text(x+w/2,y+h/2+5,label,c);
function svg(body,title){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 310" role="img" aria-label="${esc(title)}">${body}</svg>`;}
function matrix(rows,x=190,y=65,highlight=()=>false){let h=rows.length,w=rows[0].length,dx=Math.min(75,330/w),dy=48;return `<path d="M${x-9},${y-22}h-10v${h*dy}h10M${x+w*dx-15},${y-22}h10v${h*dy}h-10" fill="none" stroke="#52675b" stroke-width="2"/>`+rows.map((r,i)=>r.map((v,j)=>(highlight(i,j)?`<rect x="${x+j*dx-3}" y="${y+i*dy-17}" width="${dx-6}" height="36" rx="6" fill="#dcebe6"/>`:'')+text(x+j*dx+dx/2-6,y+i*dy+7,v,highlight(i,j)?colors.green:'#33443d')).join('')).join('');}
const generic=[['a₁₁','a₁₂','a₁₃'],['a₂₁','a₂₂','a₂₃'],['a₃₁','a₃₂','a₃₃']];
export const vectorTypes=new Set(['vector','equipollent','classes','opposite','components','unit','angles','sum','subtract','scalar','parallel','combination','independence','dependence']);
export function vectorFigure(type,params={}){
 const angle=(params.angle??35)*Math.PI/180,len=params.length??2,k=params.k??1.5,a=params.a??1,b=params.b??1;
 const O=[190,215],u=[70,-75],v=[Math.cos(angle)*len*40,-Math.sin(angle)*len*40],p=(q)=>[O[0]+q[0],O[1]+q[1]];
 let body=arrow(65,215,525,215,'#b8c9c0')+arrow(190,280,190,30,'#b8c9c0')+text(535,235,'x')+text(173,28,'y')+text(176,236,'O');
 const draw=(q,name,c=colors.blue,start=O)=>arrow(...start,start[0]+q[0],start[1]+q[1],c)+text(start[0]+q[0]+15,start[1]+q[1]-13,name,c);
 const note=(s)=>text(300,299,s,colors.green,14);
 if(['sum','subtract','combination','dependence'].includes(type)){
  const U=type==='combination'?u.map(x=>x*a):u,V=type==='subtract'?v.map(x=>-x):type==='combination'?v.map(x=>x*b):v;
  const W=[U[0]+V[0],U[1]+V[1]];
  body+=draw(U,type==='combination'?'a·u':'u')+draw(V,type==='subtract'?'−v':type==='combination'?'b·v':'v',colors.purple)+draw(W,type==='subtract'?'u−v':type==='combination'?'w':'u+v',colors.green)+line(...p(U),...p(W),colors.purple,true)+line(...p(V),...p(W),colors.blue,true);
  body+=note(type==='dependence'?'u + v − (u + v) = 0 : relación no trivial':type==='combination'?'w = a·u + b·v':'La diagonal es la resultante');
 }else if(['scalar','parallel','opposite','unit','eigen'].includes(type)){
  const factor=type==='opposite'?-1:type==='unit'?(len===0?0:1/len):k;
  body+=draw(v,'v')+draw(v.map(x=>factor*x),type==='unit'?'v̂':type==='opposite'?'−v':'k·v',colors.green);
  body+=note(type==='unit'?(len===0?'v = 0 : no existe versor asociado':'‖v̂‖ = 1; misma dirección y sentido'):'El signo del escalar decide el sentido');
 }else if(type==='independence'){
  const w=[Math.cos(angle)*105,-Math.sin(angle)*105];body+=draw([105,0],'u')+draw(w,'v',colors.purple)+note(Math.abs(Math.sin(angle))<.0001?'Vectores alineados: LD':'Dos vectores no alineados: LI en ℝ²');
 }else{
  if(type==='vector'||type==='classes')body+=line(O[0]-v[0]*1.4,O[1]-v[1]*1.4,O[0]+v[0]*2,O[1]+v[1]*2,'#cad8cf',true);
  body+=draw(v,'v');
  if(type==='components'||type==='angles'){body+=line(...p(v),O[0]+v[0],O[1],colors.amber,true)+line(...p(v),O[0],O[1]+v[1],colors.amber,true)+text(O[0]+v[0]/2,240,'vₓ',colors.amber)+text(163,O[1]+v[1]/2,'vᵧ',colors.amber);}
  if(type==='angles'){const e=[O[0]+34*Math.cos(angle),O[1]-34*Math.sin(angle)];body+=`<path d="M224,215 A34,34 0 ${angle>Math.PI?1:0},0 ${e[0]},${e[1]}" fill="none" stroke="${colors.amber}"/>`+text(235,200,'α',colors.amber);}
  if(type==='equipollent'||type==='classes')body+=draw(v,'v',colors.green,[335,245])+note('Representantes equipolentes: mismo módulo, dirección y sentido');
  if(type==='vector')body+=text(205,197,'A')+text(O[0]+v[0]-6,O[1]+v[1]+24,'B')+note('Módulo = longitud · dirección = recta y paralelas · sentido = punta');
 }
 return svg(body,'Representación de '+type);
}
export function figure(type){
 if(vectorTypes.has(type))return vectorFigure(type);
 let s='';
 if(type.startsWith('class-')){
  const kind=type.slice(6), examples={
   'fila-columna':[['a','b','c']],rectangular:[['a','b','c'],['d','e','f']],cuadrada:generic,nula:[['0','0'],['0','0']],diagonal:[['a','0','0'],['0','b','0'],['0','0','c']],escalar:[['k','0','0'],['0','k','0'],['0','0','k']],identidad:[['1','0','0'],['0','1','0'],['0','0','1']],
   'triangular-superior':[['a','b','c'],['0','d','e'],['0','0','f']],'triangular-inferior':[['a','0','0'],['b','c','0'],['d','e','f']],simetrica:[['a','b','c'],['b','d','e'],['c','e','f']],antisimetrica:[['0','a','b'],['−a','0','c'],['−b','−c','0']],ortogonal:[['cos θ','−sin θ'],['sin θ','cos θ']]
  };
  const caption=kind==='ortogonal'?'Rotación: columnas ortonormales; AᵗA=I.':kind==='fila-columna'?'Fila: 1×n. La versión columna tiene tamaño m×1.':'Ejemplo genérico · se destacan las entradas diagonales.';
  return svg(matrix(examples[kind]||generic,190,75,(i,j)=>i===j)+text(300,265,caption,colors.green,14),'Matriz '+kind);
 }

 if(['matrix','classification','determinant','cofactor','transpose','triangular','echelon','rank','eigen-equation','characteristic','eigen-properties','multiplicity','diagonalization','adjugate'].includes(type)){
  let rows=generic,caption='La posición de aᵢⱼ indica fila i y columna j.',hi=(i,j)=>i===j;
  if(type==='classification'){rows=[['a','0','0'],['0','b','0'],['0','0','c']];caption='Diagonal: ceros fuera de la diagonal principal.';}
  if(type==='transpose'){rows=[['a₁₁','a₂₁','a₃₁'],['a₁₂','a₂₂','a₃₂'],['a₁₃','a₂₃','a₃₃']];caption='Aᵗ: la fila i de A pasa a ser la columna i.';hi=(i,j)=>j===0;}
  if(type==='cofactor'){caption='M₁₂: eliminar fila 1 y columna 2; C₁₂ = −M₁₂.';hi=(i,j)=>i!==0&&j!==1;}
  if(['triangular','echelon','rank','eigen-properties'].includes(type)){rows=[['a','b','c'],['0','d','e'],['0','0','f']];caption=type==='rank'?'Si a, d, f ≠ 0: tres pivotes y rango 3.':'Triangular: det(A) = a·d·f.';}
  if(['eigen-equation','characteristic'].includes(type)){rows=[['a−λ','b'],['c','d−λ']];caption='det(A−λI) = (a−λ)(d−λ)−bc.';}
  if(type==='determinant'){rows=[['a','b'],['c','d']];caption='det(A) = ad−bc: un escalar.';}
  if(type==='adjugate'){rows=[['C₁₁','C₂₁','C₃₁'],['C₁₂','C₂₂','C₃₂'],['C₁₃','C₂₃','C₃₃']];caption='Adj(A) = Cᵗ: transpuesta de la matriz de cofactores.';}
  if(type==='multiplicity'){rows=[['λ','c'],['0','λ']];caption='Si c ≠ 0: mₐ(λ)=2, m𝗀(λ)=1; no diagonalizable.';}
  if(type==='diagonalization'){rows=[['λ₁','0','0'],['0','λ₂','0'],['0','0','λ₃']];caption='D = P⁻¹AP; columnas de P: v₁, v₂, v₃, en ese orden.';}
  s=matrix(rows,190,75,hi)+text(300,265,caption,colors.green,14);
 }else if(type==='matrix-product'){
  s=matrix([['a','b','c'],['d','e','f']],35,75,i=>i===0)+text(260,120,'×')+matrix([['p','q'],['r','s'],['t','u']],300,75,(i,j)=>j===0)+text(300,265,'c₁₁ = ap + br + ct · fila 1 por columna 1',colors.green,15);
 }else if(type==='matrix-sum'){
  s=box(25,65,240,75,'A y B: mismo tamaño',colors.blue)+box(335,65,240,75,'C = A + B')+arrow(270,100,330,100)+text(300,220,'cᵢⱼ = aᵢⱼ + bᵢⱼ',colors.green,22)+text(300,265,'Cada entrada se suma con su homóloga.');
 }else if(type==='systems'||type==='rouche'){
  for(let i=0;i<3;i++){let x=25+i*195;s+=box(x,25,170,42,['SCD · única','SCI · infinitas','SI · ninguna'][i],[colors.blue,colors.green,colors.amber][i]);s+=line(x+15,205,x+150,100,colors.blue);s+=i===0?line(x+15,100,x+150,205,colors.purple):i===1?line(x+15,205,x+150,100,colors.purple,true):line(x+15,245,x+150,140,colors.purple);s+=text(x+85,285,['r = r′ = n','r = r′ < n','r < r′'][i],colors.green,17);}
 }else if(type==='system'||type==='cramer'||type==='transform-matrix'){
  s=matrix([['a','b'],['c','d']],55,85)+text(246,130,'·')+matrix([['x'],['y']],270,85)+text(390,130,'=')+matrix([['p'],['q']],430,85)+text(300,265,type==='cramer'?'A₁: columna 1 → b · A₂: columna 2 → b':'A: coeficientes · x: entrada · b: salida',colors.green,16);
 }else if(['inverse','row-ops','gauss','det-properties','sarrus'].includes(type)){
  const items={inverse:['[ A | I ]','[ I | A⁻¹ ]','Operar ambos bloques con las mismas operaciones elementales.'], 'row-ops':['Fᵢ ← Fᵢ + kFⱼ','Operación reversible','i ≠ j · se aplica a toda la fila, incluida la ampliada.'],gauss:['Escalonada','Reducida','Gauss: sustitución regresiva · Jordan: ceros arriba y abajo.'],'det-properties':['Fᵢ ↔ Fⱼ','det nuevo = −det A','Sumar kFⱼ a Fᵢ conserva det; escalar Fᵢ multiplica det por k.'],sarrus:['Orden 2: ad−bc','Orden 3: Sarrus','Para cualquier orden: Laplace o triangulación.']}[type];
  s=box(30,75,230,80,items[0],colors.blue)+box(340,75,230,80,items[1])+arrow(266,115,333,115)+text(300,235,items[2],colors.green,13);
 }else if(['space','operations','axioms','linearity','operator','application','map-types','composition','similarity','change-basis','rank-nullity','dimension','roots'].includes(type)){
  const data={space:['u, v ∈ V','u+v ∈ V','k ∈ ℝ, u ∈ V → ku ∈ V'],operations:['V × V → V','ℝ × V → V','Suma: interna · producto por escalar: externa'],axioms:['Suma: 5 axiomas','Escalares: 5 axiomas','0ᵥ: neutro de la suma · 1: identidad escalar'],linearity:['T(u+v)=T(u)+T(v)','T(ku)=kT(u)','Ambas igualdades: para todo u, v y k.'],operator:['V','V','T: V → V · mismo espacio de entrada y salida'],application:['v ∈ V','F(v) ∈ W','Toda entrada tiene una única imagen.'], 'map-types':['Inyectiva','Sobreyectiva','No repite imágenes · alcanza todo el codominio'],composition:['v → T(v)','S(T(v))','Primero T; después S · matriz BA'],similarity:['A en base B','D en base C','D = P⁻¹AP · mismo operador'], 'change-basis':['[v]ᵦ','[v]꜀','[v]꜀ = P꜀←ᵦ [v]ᵦ · mismo vector'], 'rank-nullity':['dim ker T','dim Im T','nulidad + rango = dim V = n'],dimension:['Base de V','n vectores','Todas las bases de V tienen la misma cantidad.'],roots:['Grado n','n raíces en ℂ','Se cuentan multiplicidades; pueden no ser todas reales.']}[type];
  s=box(25,65,250,90,data[0],colors.blue)+box(325,65,250,90,data[1])+arrow(280,110,320,110)+text(300,235,data[2],colors.green,15);
 }else if(type==='eigen'){s=vectorFigure('scalar',{k:1.8});return s.replace('k·v','λv').replace('Representación de scalar','Autovector v y su imagen Av = λv');
 }else if(['subspace','span','basis','kernel','eigenspace','affine'].includes(type)){
  s=arrow(55,240,550,240,'#b8c9c0')+arrow(230,285,230,30,'#b8c9c0')+text(215,261,'O');
  if(type==='affine'){s+=line(75,155,510,60,colors.purple)+text(430,50,'xₚ + ker A',colors.purple)+line(75,274,510,179,colors.green)+text(465,205,'ker A',colors.green);}
  else if(type==='kernel'||type==='eigenspace'){s+=line(150,280,550,80,colors.green)+text(420,260,type==='kernel'?'T(v) = 0 para v ∈ ker T':'Eλ = ker(A−λI)',colors.blue)+text(300,55,type==='kernel'?'Recta del núcleo en el dominio':'Autoespacio: incluye al cero',colors.green);}
  else{s+=`<path d="M70,220L320,65L535,130L280,285Z" fill="#dcebe6" stroke="#aacdbb"/>`+arrow(230,240,365,156,colors.blue)+text(380,146,'u',colors.blue)+arrow(230,240,330,270,colors.purple)+text(350,275,'v',colors.purple)+text(300,35,type==='basis'?'LI + generador = base':type==='span'?'Todas las combinaciones de u y v':'W: plano por el origen',colors.green);}
 }else{return vectorFigure('independence');}
 return svg(s,'Esquema: '+type);
}
