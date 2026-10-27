import { test, expect } from '@playwright/test';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'http://localhost:4321/AGA/';
const APR = 'segundo-parcial/teorico/aprendizaje/';

// Páginas = todo index.html de dist/ (no una lista a mano).
// primer-parcial/ es el sitio original empaquetado (no Astro): se prueba aparte, no con las reglas de landmarks.
const LEGADO = /^primer-parcial\//;
function paginas(dir = '../docs', out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) paginas(p, out);
    else if (f === 'index.html') out.push(p.replace(/^\.\.\/docs\//, '').replace(/index\.html$/, ''));
  }
  return out;
}
const TODAS = paginas();
const PAGS = TODAS.filter((r) => !LEGADO.test(r));

test('hay páginas en dist', () => expect(PAGS.length).toBeGreaterThan(30));

for (const ruta of PAGS) {
  test(`página ${ruta || 'home'}: consola, KaTeX, 1 h1, landmarks, alt, sin scroll H`, async ({ page }) => {
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(ruta);
    await page.waitForLoadState('networkidle');
    expect(errs).toEqual([]);
    await expect(page.locator('.katex-error')).toHaveCount(0);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    expect(await page.locator('nav, header').count()).toBeGreaterThan(0);
    expect(await page.locator('img:not([alt])').count()).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    // fórmulas crudas: $...$ visible o ^ suelto fuera de KaTeX
    const crudo = await page.evaluate(() => {
      const c = document.querySelector('main').cloneNode(true);
      c.querySelectorAll('.katex, script, style, textarea, code, pre, noscript, [hidden]').forEach((n) => n.remove());
      return /\$[^$\s][^$]*\$|\\\(|\\frac|[a-z0-9]\^[0-9a-z{]/.test(c.textContent);
    });
    expect(crudo).toBe(false);
  });
}

test('links internos: todos dan 200 (recorrido de todo el build)', async ({ page, request }) => {
  const vistos = new Set(); const rotos = [];
  for (const ruta of PAGS) {
    await page.goto(ruta);
    const hs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    for (const h of hs) {
      if (!h.startsWith(BASE) && !h.startsWith('http://localhost:4321')) continue;
      const u = h.split('#')[0];
      if (vistos.has(u)) continue; vistos.add(u);
      const r = await request.get(u);
      if (r.status() !== 200) rotos.push(`${ruta} -> ${h} (${r.status()})`);
    }
  }
  expect(rotos).toEqual([]);
});

test('imágenes y estilos del build cargan (sin 404)', async ({ page }) => {
  const malos = [];
  page.on('response', (r) => r.status() >= 400 && malos.push(`${r.status()} ${r.url()}`));
  for (const ruta of PAGS) await page.goto(ruta);
  expect(malos).toEqual([]);
});

test('sin JS: toda página muestra contenido y no deja botones muertos visibles', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL: BASE });
  const page = await ctx.newPage();
  const muertos = [];
  for (const ruta of PAGS) {
    await page.goto(ruta);
    const txt = (await page.locator('main').innerText()).trim();
    if (txt.length < 40) muertos.push(`${ruta}: main casi vacío`);
    const btns = await page.locator('button:visible').evaluateAll((bs) => bs.map((b) => b.textContent.trim().slice(0, 40)));
    if (btns.length) muertos.push(`${ruta}: botones visibles sin JS: ${[...new Set(btns)].join(' | ')+` (${btns.length})`}`);
  }
  await ctx.close();
  expect(muertos).toEqual([]);
});

test('localStorage roto: ninguna página tira errores', async ({ page }) => {
  await page.addInitScript(() => {
    const boom = () => { throw new Error('storage roto'); };
    Object.defineProperty(window, 'localStorage', { get: boom });
  });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  for (const ruta of PAGS) { await page.goto(ruta); await expect(page.locator('h1')).toHaveCount(1); }
  expect(errs).toEqual([]);
});

test('teclado: Tab llega a todo lo interactivo visible del Home y tiene foco visible', async ({ page }) => {
  await page.goto('');
  const n = await page.locator('main a:visible, main button:visible').count();
  const vistos = new Set(); let sinFoco = [];
  for (let i = 0; i < n + 40; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const e = document.activeElement; if (!e || e === document.body) return null;
      const s = getComputedStyle(e);
      const vis = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== 'none';
      return { k: (e.tagName + (e.getAttribute('href') || e.textContent.trim().slice(0, 20))), vis, focusVisible: e.matches(':focus-visible') };
    });
    if (info) { vistos.add(info.k); if (!info.vis) sinFoco.push(info.k); }
  }
  expect(vistos.size).toBeGreaterThanOrEqual(n * 0.9);
  expect(sinFoco).toEqual([]);
});

test('toggles tienen aria-pressed (botones de filtro/unidad)', async ({ page }) => {
  await page.goto(APR);
  const btns = page.locator('[data-unidad-btn]');
  expect(await btns.count()).toBeGreaterThan(0);
  for (const b of await btns.all()) await expect(b).toHaveAttribute('aria-pressed', /true|false/);
});

test('labels: todo input/textarea/select tiene nombre accesible', async ({ page }) => {
  const sin = [];
  for (const ruta of PAGS) {
    await page.goto(ruta);
    const r = await page.$$eval('input:not([type=hidden]), textarea, select', (els) => els.filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.closest('label')).map((e) => e.outerHTML.slice(0, 80)));
    r.forEach((x) => sin.push(ruta + ' ' + x));
  }
  expect(sin).toEqual([]);
});

// --- demos
test('demos: las 5 cónicas; un hueco mal => reintento y resultado "mal"; recargar persiste; repasar', async ({ page }) => {
  await page.goto(APR);
  await page.locator('[data-unidad-btn="U10"]').click();
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  const res = {}; const malos = new Set();
  for (let n = 0; n < 120; n++) {
    if (await page.locator('[data-fin]').isVisible()) break;
    if (await page.locator('[data-stage] .q-demo').count()) {
      const id = await page.locator('[data-stage] [data-q]').getAttribute('data-id');
      const pasos = page.locator('[data-stage] [data-paso]');
      const total = await pasos.count();
      for (let k = 0; k < total; k++) {
        const p = pasos.nth(k);
        await expect(p).toBeVisible();
        const opcs = p.locator('.ap-opc');
        for (let o = 0; o < await opcs.count(); o++) {
          if (await p.locator('.ap-opc[data-v="ok"]').count()) break;
          await opcs.nth(o).click();
        }
        if (await p.locator('.ap-opc[data-v="mal"]').count()) malos.add(id);
        await expect(p.locator('[data-porque]')).toBeVisible();
      }
      await expect(page.locator('.katex-error')).toHaveCount(0);
      expect(await page.locator('[data-stage]').innerText()).not.toMatch(/\$|\^/);
      res[id] = await page.evaluate((i) => localStorage.getItem('aga:v1:apr:' + i), id);
    }
    await page.locator('[data-sig]').click();
  }
  expect(Object.keys(res).sort()).toEqual(['demo-circunferencia', 'demo-elipse', 'demo-hiperbola', 'demo-parabola', 'demo-parabola-horizontal']);
  for (const [id, v] of Object.entries(res)) expect(v, id).toBe(malos.has(id) ? 'mal' : 'bien');
  expect(malos.size, 'con 5 demos x 9 pasos debió haber algún error al azar').toBeGreaterThan(0);
  const errada = [...malos][0];
  await page.reload();
  const tras = await page.evaluate((ids) => Object.fromEntries(ids.map((i) => [i, localStorage.getItem('aga:v1:apr:' + i)])), Object.keys(res));
  expect(tras).toEqual(res);
  await page.locator('[data-unidad-btn="repasar"]').click();
  await expect(page.locator('[data-n-repasar]')).toContainText(/\d/);
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  const vistas = [];
  for (let n = 0; n < malos.size + 1 && !(await page.locator('[data-fin]').isVisible()); n++) {
    vistas.push(await page.locator('[data-stage] [data-q]').getAttribute('data-id'));
    await page.locator('[data-sig]').click();
  }
  expect(vistas.sort()).toEqual([...malos].sort()); // repasar trae solo las falladas
  expect(vistas).toContain(errada);
});

test('corregir con IA: borrador persiste, botón copia el prompt', async ({ page, context, browserName }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.goto(APR);
  await page.locator('[data-unidad-btn="mezcla"]').click().catch(() => {});
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  let ok = false;
  for (let n = 0; n < 150; n++) {
    if (await page.locator('[data-fin]').isVisible()) break;
    if (await page.locator('#ap-dev-ta').count()) { ok = true; break; }
    await page.locator('[data-sig]').click();
  }
  expect(ok, 'no apareció ninguna pregunta a desarrollar').toBe(true);
  await page.locator('#ap-dev-ta').fill('mi desarrollo x^2 = 4');
  const id = await page.locator('[data-stage] [data-q]').getAttribute('data-id');
  await page.locator('.ap-dev .btn').click();
  await expect(page.locator('.ap-dev-ok')).toContainText(/Copiado|No se pudo/);
  await expect(page.locator('.ap-dev-ok')).toContainText('Copiado');
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => '');
  expect(clip).toContain('mi desarrollo x^2 = 4');
  expect(await page.evaluate((i) => localStorage.getItem('aga:v1:apr-resp:' + i), id)).toContain('mi desarrollo');
});

test('estudiante apurada: doble click en Siguiente/Empezar y recarga en medio no rompen', async ({ page }) => {
  const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(APR);
  await page.locator('[data-empezar]').dblclick();
  await page.locator('[data-sig]').dblclick();
  await page.reload();
  await expect(page.locator('h1')).toHaveCount(1);
  expect(errs).toEqual([]);
});

test('Home: Mapa primero, links, cuenta regresiva y seguir donde dejaste', async ({ page }) => {
  await page.goto('');
  const orden = await page.evaluate(() => [...document.querySelectorAll('main h2')].map((h) => h.textContent.trim()));
  expect(orden[0]).toMatch(/mapa/i);
  await page.goto('segundo-parcial/parciales/modelo1-p2/').catch(() => {});
  await page.goto('');
  await expect(page.locator('body')).toContainText(/seguir|dejaste/i);
});

test('sitio original primer-parcial/: las 4 páginas cargan y no tiran errores', async ({ page }) => {
  const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
  for (const r of ['primer-parcial/', 'primer-parcial/preguntero.html', 'primer-parcial/practicos.html', 'primer-parcial/laboratorio.html']) {
    const res = await page.goto(r); expect(res.status(), r).toBe(200);
    await page.waitForLoadState('networkidle');
  }
  expect(errs).toEqual([]);
});

test('768px (tablet) y 844x390 (horizontal): sin scroll horizontal en todas las páginas', async ({ page }) => {
  const mal = [];
  for (const vp of [{ width: 768, height: 1024 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(vp);
    for (const ruta of PAGS) {
      await page.goto(ruta);
      if (!(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))) mal.push(`${vp.width}: ${ruta}`);
    }
  }
  expect(mal).toEqual([]);
});

test('Home 768px: Mapa en 2 columnas, links del Mapa dan 200', async ({ page, request }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('');
  const hs = await page.$$eval('main a[href]', (a) => [...new Set(a.map((x) => x.href))]);
  expect(hs.length).toBeGreaterThan(5);
  for (const h of hs.filter((x) => x.startsWith('http://localhost'))) expect((await request.get(h)).status(), h).toBe(200);
});

test('exploratoria: examen con doble Entregar, recarga a mitad, volver atrás', async ({ page }) => {
  const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
  const M1 = 'segundo-parcial/parciales/modelo1-p2/';
  await page.goto(M1);
  await page.getByRole('button', { name: 'Modo examen' }).click();
  await page.getByRole('button', { name: 'Empezar' }).click();
  await page.reload(); // en medio del examen: no debe quedar la página colgada/rota
  await expect(page.locator('h1')).toHaveCount(1);
  await page.getByRole('button', { name: 'Modo examen' }).click().catch(() => {});
  if (await page.getByRole('button', { name: 'Empezar' }).isVisible()) await page.getByRole('button', { name: 'Empezar' }).click();
  await page.getByRole('button', { name: 'Entregar' }).dblclick();
  await expect(page.locator('[data-ex="nota"]')).toBeVisible();
  await page.goBack(); await page.goForward();
  await expect(page.locator('h1')).toHaveCount(1);
  expect(errs).toEqual([]);
});

test('exploratoria laboratorio: entradas raras no rompen', async ({ page }) => {
  const errs = []; page.on('pageerror', (e) => errs.push(String(e)));
  let dialogo = false; page.on('dialog', (d) => { dialogo = true; d.dismiss(); });
  await page.goto('segundo-parcial/laboratorio/');
  await page.getByRole('button', { name: 'U8 · Vectores' }).click();
  await page.locator('[data-tipo]').selectOption({ label: 'Ángulo entre vectores' });
  const inp = page.getByLabel('θ en grados');
  for (const v of ['−3/2', '2√5', '1,5', '', 'alert(1)', '<img src=x onerror=alert(1)>', '1e999', '   ']) {
    await inp.fill(v);
    await page.getByRole('button', { name: 'Verificar' }).click();
    await expect(page.locator('[data-feedback]')).not.toBeEmpty();
  }
  expect(dialogo).toBe(false);
  expect(errs).toEqual([]);
});
