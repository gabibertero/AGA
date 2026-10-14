// Falla si hay ids de <Ejercicio> duplicados, sin prefijo del examen, o sin fuente/pagina.
import { readdirSync, readFileSync } from 'node:fs';
import { idsDeEjercicios } from '../src/scripts/ids.js';

const vistos = new Map();
const errores = [];
const dir = new URL('../src/content/parciales/', import.meta.url);

for (const f of readdirSync(dir).filter((n) => n.endsWith('.mdx'))) {
  const texto = readFileSync(new URL(f, dir), 'utf8');
  const examen = texto.match(/^id:\s*"?([^"\n]+?)"?\s*$/m)?.[1];
  if (!examen) errores.push(`${f}: frontmatter sin id`);
  for (const [tag] of texto.matchAll(/<Ejercicio\b[^>]*>/g)) {
    const [id] = idsDeEjercicios(tag);
    if (!id) { errores.push(`${f}: Ejercicio sin id`); continue; }
    if (examen && !id.startsWith(`${examen}#`)) errores.push(`${f}: id "${id}" no empieza con "${examen}#"`);
    if (vistos.has(id)) errores.push(`id duplicado "${id}" en ${f} y ${vistos.get(id)}`);
    vistos.set(id, f);
    for (const n of ['fuente', 'pagina']) {
      if (!new RegExp(`(?<![\\w-])${n}=(?:"[^"]+"|\\{[^}]+\\})`).test(tag)) errores.push(`${f}: ${id} sin ${n}`);
    }
  }
}
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
console.log(`check-ids OK: ${vistos.size} ejercicios, sin duplicados.`);
