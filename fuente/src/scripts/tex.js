// KaTeX en build (Astro, sin DOM): texto con $...$ inline -> HTML. El texto es propio del sitio (no del usuario).
import katex from 'katex';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const k = (t, displayMode) => katex.renderToString(t, { throwOnError: true, displayMode });
// Soporta **negrita** fuera de las fórmulas. Un `$` sin cerrar es un error de redacción: falla el build.
export function conTex(s) {
  const partes = s.split('$');
  if (partes.length % 2 === 0) throw new Error(`conTex: "$" sin cerrar en: ${s}`);
  return partes.map((p, i) => (i % 2 ? k(p, false) : esc(p).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))).join('');
}
export const texPuro = (t) => k(t, false);

// Líneas de una respuesta modelo -> HTML: "- " viñetas, "1. " numeradas, "$$...$$" fórmula centrada, otra cosa = párrafo.
export function bloques(lineas) {
  let out = '';
  let lista = null; // 'ul' | 'ol'
  const cerrar = () => { if (lista) out += `</${lista}>`; lista = null; };
  for (const l of lineas) {
    const vi = l.match(/^- (.*)$/s);
    const nu = l.match(/^\d+\. (.*)$/s);
    const disp = l.match(/^\$\$(.*)\$\$$/s);
    if (vi || nu) {
      const t = vi ? 'ul' : 'ol';
      if (lista !== t) { cerrar(); out += `<${t}>`; lista = t; }
      out += `<li>${conTex((vi || nu)[1])}</li>`;
    } else {
      cerrar();
      out += disp ? `<div class="q-disp">${k(disp[1], true)}</div>` : `<p>${conTex(l)}</p>`;
    }
  }
  cerrar();
  return out;
}
