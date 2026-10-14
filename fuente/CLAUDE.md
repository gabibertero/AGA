# AGA — sitio de estudio (fuente Astro)

Proyecto Astro en `fuente/`; el build sale a `../docs` (GitHub Pages, base `/AGA/`). Primer parcial: HTML estáticos en `public/primer-parcial/` (no tocar). Inventario de fuentes: `docs/inventario/`.

- CRÍTICO: `outDir` es `../docs`. Nunca `../` ni la raíz del repo: Astro vacía outDir y borraría `.git`. Los HTML/`assets/` de la raíz del repo no se tocan.
- `build.assets = 'assets-astro'` (sin guion bajo: Jekyll ignora carpetas con `_`); `public/.nojekyll` presente.
- Material original de la materia (fuera de `github/`): solo lectura.
- Fidelidad: enunciados oficiales tal cual; lo ilegible → "pendiente de revisión"; oficial y elaborado siempre separados; cada ejercicio con archivo + página.
- Repo público: nada de nombres, legajos ni firmas en imágenes publicadas.
- localStorage con try/catch y prefijo `aga:v1:`; nunca borrar progreso al actualizar.
- Links internos siempre con `import.meta.env.BASE_URL`.
- Verificación: `npm run build` y `npm test` (Playwright). Resultados de soluciones con sympy (ver `docs/estandar-soluciones.md`).
- Español rioplatense. No hacer commit ni push sin pedido.
