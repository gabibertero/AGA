// SVG de una cónica (cadena de texto, sin DOM). Colores y tipografía por clases .lab-* (ver LabConicas.astro).
const f = (n) => Math.round(n * 10) / 10;

export function svgConica(el, { ancho = 640 } = {}) {
  const { tipo, h, k, spec: s } = el;
  const xs = [0, h], ys = [0, k];
  el.pts.forEach((q) => { xs.push(q.x); ys.push(q.y); });
  if (tipo === 'circunferencia') { xs.push(h - el.r, h + el.r); ys.push(k - el.r, k + el.r); }
  if (tipo === 'elipse') { const hx = s.ori === 'v' ? s.b : s.a, hy = s.ori === 'v' ? s.a : s.b; xs.push(h - hx, h + hx); ys.push(k - hy, k + hy); }
  if (tipo === 'hiperbola') { const hx = s.ori === 'v' ? s.b : s.a, hy = s.ori === 'v' ? s.a : s.b; xs.push(h - hx - 2, h + hx + 2); ys.push(k - hy - 2, k + hy + 2); }
  if (el.dir) { if (el.dir.x !== undefined) xs.push(el.dir.x); else ys.push(el.dir.y); }
  if (tipo === 'parabola') { xs.push(h - 2, h + 2); ys.push(k - 2, k + 2); }
  const xmin = Math.floor(Math.min(...xs) - 1.5), xmax = Math.ceil(Math.max(...xs) + 1.5);
  const ymin = Math.floor(Math.min(...ys) - 1.5), ymax = Math.ceil(Math.max(...ys) + 1.5);
  const padL = 30, padT = 10, padB = 24, padR = 12;
  const rx = xmax - xmin, ry = ymax - ymin;
  const u = Math.min((ancho - padL - padR) / rx, 520 / ry);
  const W = padL + padR + rx * u, H = padT + padB + ry * u;
  const X = (x) => f(padL + (x - xmin) * u), Y = (y) => f(padT + (ymax - y) * u);
  const paso = Math.max(1, Math.ceil(22 / u));
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${f(H)}" style="max-width:${f(W)}px" class="lab-svg" role="img" aria-label="${etiqueta(el)}"><defs><clipPath id="lab-clip"><rect x="${padL}" y="${padT}" width="${f(rx * u)}" height="${f(ry * u)}"/></clipPath></defs>`);
  // grilla, ejes y escala de a 1
  for (let x = xmin; x <= xmax; x++) {
    out.push(`<line class="lab-grid" x1="${X(x)}" y1="${padT}" x2="${X(x)}" y2="${f(H - padB)}"/>`);
    if (x !== 0) out.push(`<line class="lab-tick" x1="${X(x)}" y1="${Y(0) - 3}" x2="${X(x)}" y2="${Y(0) + 3}"/>`);
    if (x !== 0 && x % paso === 0) out.push(`<text class="lab-num" x="${X(x)}" y="${Math.min(Y(0) + 15, H - 8)}" text-anchor="middle">${x}</text>`);
  }
  for (let y = ymin; y <= ymax; y++) {
    out.push(`<line class="lab-grid" x1="${padL}" y1="${Y(y)}" x2="${f(W - padR)}" y2="${Y(y)}"/>`);
    if (y !== 0) out.push(`<line class="lab-tick" x1="${X(0) - 3}" y1="${Y(y)}" x2="${X(0) + 3}" y2="${Y(y)}"/>`);
    if (y !== 0 && y % paso === 0) out.push(`<text class="lab-num" x="${Math.max(X(0) - 7, 22)}" y="${Y(y) + 4}" text-anchor="end">${y}</text>`);
  }
  out.push(`<line class="lab-eje" x1="${padL}" y1="${Y(0)}" x2="${f(W - padR)}" y2="${Y(0)}"/><line class="lab-eje" x1="${X(0)}" y1="${padT}" x2="${X(0)}" y2="${f(H - padB)}"/>`);
  out.push(`<text class="lab-num" x="${X(0) - 6}" y="${Y(0) + 14}" text-anchor="end">0</text><text class="lab-ax" x="${f(W - padR - 2)}" y="${Y(0) - 6}" text-anchor="end">x</text><text class="lab-ax" x="${X(0) + 6}" y="${padT + 10}">y</text>`);
  // ejes de simetría, asíntotas y directriz (recortados al área)
  out.push('<g clip-path="url(#lab-clip)">');
  for (const e of el.ejes) out.push(e.x !== undefined ? `<line class="lab-simetria" x1="${X(e.x)}" y1="${padT}" x2="${X(e.x)}" y2="${f(H)}"/>` : `<line class="lab-simetria" x1="${padL}" y1="${Y(e.y)}" x2="${f(W)}" y2="${Y(e.y)}"/>`);
  for (const m of el.asint) out.push(`<line class="lab-asint" x1="${X(xmin)}" y1="${Y(k + m * (xmin - h))}" x2="${X(xmax)}" y2="${Y(k + m * (xmax - h))}"/>`);
  if (el.dir) out.push(el.dir.x !== undefined ? `<line class="lab-dir" x1="${X(el.dir.x)}" y1="${padT}" x2="${X(el.dir.x)}" y2="${f(H)}"/>` : `<line class="lab-dir" x1="${padL}" y1="${Y(el.dir.y)}" x2="${f(W)}" y2="${Y(el.dir.y)}"/>`);
  const path = (pts) => `<polyline class="lab-curva" points="${pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')}"/>`;
  const barrer = (n, a, b, fn) => Array.from({ length: n + 1 }, (_, i) => fn(a + ((b - a) * i) / n));
  if (tipo === 'circunferencia') out.push(`<circle class="lab-curva" cx="${X(h)}" cy="${Y(k)}" r="${f(el.r * u)}"/>`);
  else if (tipo === 'elipse') out.push(path(barrer(180, 0, 2 * Math.PI, (t) => (s.ori === 'v' ? [h + s.b * Math.cos(t), k + s.a * Math.sin(t)] : [h + s.a * Math.cos(t), k + s.b * Math.sin(t)]))));
  else if (tipo === 'hiperbola') {
    for (const sg of [1, -1]) out.push(path(barrer(160, -5, 5, (t) => { const uu = sg * s.a * Math.cosh(t), vv = s.b * Math.sinh(t); return s.ori === 'v' ? [h + vv, k + uu] : [h + uu, k + vv]; })));
  } else {
    const S = Math.sqrt(4 * s.p * Math.max(rx, ry)) * 1.2 + 2;
    out.push(path(barrer(200, -S, S, (t) => { const q = (t * t) / (4 * s.p); return { der: [h + q, k + t], izq: [h - q, k + t], arr: [h + t, k + q], aba: [h + t, k - q] }[s.ori]; })));
  }
  out.push('</g>');
  if (el.dir) { // rótulos l (directriz) y a (eje) de la parábola
    out.push(el.dir.x !== undefined ? `<text class="lab-rot lab-t-a" x="${X(el.dir.x) + 5}" y="${padT + 12}">l</text><text class="lab-rot lab-t-a" x="${f(W - padR - 2)}" y="${Y(k) - 5}" text-anchor="end">a</text>` : `<text class="lab-rot lab-t-a" x="${f(W - padR - 2)}" y="${Y(el.dir.y) - 5}" text-anchor="end">l</text><text class="lab-rot lab-t-a" x="${X(h) + 5}" y="${padT + 12}">a</text>`);
  }
  // puntos rotulados
  for (const q of el.pts) {
    const der = q.x >= h - 1e-9, arr = q.y >= k - 1e-9;
    const dx = q.n === 'C' || q.n === 'V' && tipo === 'parabola' ? 7 : der ? 7 : -7;
    const dy = q.n === 'C' ? 16 : arr ? -8 : 15;
    out.push(`<circle class="lab-pt lab-g-${q.g}" cx="${X(q.x)}" cy="${Y(q.y)}" r="4.5"/><text class="lab-rot lab-t-${q.g}" x="${X(q.x) + dx}" y="${Y(q.y) + dy}" text-anchor="${dx > 0 ? 'start' : 'end'}">${q.n}</text>`);
  }
  out.push('</svg>');
  return out.join('');
}

export function etiqueta(el) {
  const nom = { circunferencia: 'Circunferencia', elipse: 'Elipse', hiperbola: 'Hipérbola', parabola: 'Parábola' }[el.tipo];
  return `${nom} con ${el.tipo === 'parabola' ? 'vértice' : 'centro'} en (${el.h}; ${el.k}); sus elementos están listados debajo.`;
}
