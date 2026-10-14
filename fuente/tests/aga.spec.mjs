import { test, expect } from '@playwright/test';

const M1 = 'segundo-parcial/parciales/modelo1-p2/';
const ej1 = (page) => page.locator('[data-id="modelo1-p2#1"]');

test('Home carga y sus links devuelven 200', async ({ page, request }) => {
  await page.goto('');
  await expect(page.locator('h1')).toContainText('Álgebra y Geometría Analítica');
  const hrefs = await page.locator('main a').evaluateAll((as) => as.map((a) => a.href));
  expect(hrefs.some((h) => h.includes('/primer-parcial/'))).toBe(true);
  expect(hrefs.some((h) => h.includes('/segundo-parcial/'))).toBe(true);
  for (const h of [...new Set(hrefs)]) expect((await request.get(h)).status(), h).toBe(200);
});

test('modelo1 muestra KaTeX renderizado', async ({ page }) => {
  await page.goto(M1);
  await expect(ej1(page).locator('.katex').first()).toBeVisible();
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('$$');
});

test('progreso guarda con prefijo aga:v1:', async ({ page }) => {
  await page.goto(M1);
  await ej1(page).getByLabel('Resuelto').check();
  await page.reload();
  await expect(ej1(page).getByLabel('Resuelto')).toBeChecked();
  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toContain('aga:v1:estado:modelo1-p2#1');
  expect(claves.every((k) => k.startsWith('aga:v1:'))).toBe(true);
});

test('con localStorage roto no hay errores', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.addInitScript(() => {
    const falla = () => { throw new Error('storage roto'); };
    Storage.prototype.getItem = falla;
    Storage.prototype.setItem = falla;
  });
  await page.goto(M1);
  await ej1(page).getByLabel('Resuelto').check();
  await expect(ej1(page).getByLabel('Resuelto')).toBeChecked();
  expect(errores).toEqual([]);
});

test.describe('sin scroll horizontal a 390px', () => {
  test.use({ viewport: { width: 390, height: 800 } });
  for (const [nombre, ruta] of [['Home', ''], ['2º parcial', 'segundo-parcial/'], ['modelo1', M1], ['modelo2', 'segundo-parcial/parciales/modelo2-p2/']]) {
    test(nombre, async ({ page }) => {
      await page.goto(ruta);
      const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(sw).toBeLessThanOrEqual(iw);
    });
  }
});

// ---- Modo examen ----
const M2 = 'segundo-parcial/parciales/modelo2-p2/';
const sol = (page) => page.locator('[data-ejercicio] [data-solucion]');
async function entrar(page, ruta) {
  await page.goto(ruta);
  await page.getByRole('button', { name: 'Modo examen' }).click();
  await page.getByRole('button', { name: 'Empezar' }).click();
}
const corregir = async (page, n, nombre) =>
  page.locator(`[data-ejercicio] >> nth=${n}`).getByRole('button', { name: nombre, exact: true }).click();

test('modo examen: oculta soluciones, pistas y tabla; entregar las revela', async ({ page }) => {
  await entrar(page, M1);
  await ej1(page).getByRole('button', { name: 'Ver solución completa' }).waitFor({ state: 'hidden' });
  for (const l of await sol(page).all()) await expect(l).toBeHidden();
  await expect(page.locator('[data-pista]').first()).toBeHidden();
  await expect(page.locator('[data-respuestas]')).toBeHidden();
  await expect(page.locator('[data-ejercicio] h2').first()).toBeVisible(); // enunciados siguen
  await expect(page.getByText('Solución elaborada').first()).toBeHidden(); // ningún bloque de solución se filtra
  await expect(page.locator('[data-ex="reloj"]')).toHaveText('120:00');
  await expect(page.locator('[data-criterios]').first()).toBeHidden(); // criterios no se filtran en el examen
  await page.getByRole('button', { name: 'Entregar' }).click();
  await expect(ej1(page).locator('[data-solucion]').first()).toBeVisible();
  await expect(ej1(page).locator('[data-criterios]')).toContainText('A medias');
  await expect(page.locator('[data-respuestas]')).toBeVisible();
  await expect(ej1(page).locator('.recordatorio')).toContainText('primera instancia por resultados');
});

test('modo examen: Bien, A medias, Mal en M1 da 45 y persiste', async ({ page }) => {
  await entrar(page, M1);
  await page.getByRole('button', { name: 'Entregar' }).click();
  await corregir(page, 0, 'Bien');
  await corregir(page, 1, 'A medias');
  await corregir(page, 2, 'Mal');
  await expect(page.locator('[data-ex="nota"]')).toHaveText('45');
  await expect(page.getByRole('button', { name: 'Bien', exact: true }).first()).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('[data-ex="ultimo"]')).toContainText('45/100');
  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toContain('aga:v1:examen:modelo1-p2');
});

test('modo examen: entregar sin autocorregir no pisa el último intento', async ({ page }) => {
  await entrar(page, M1);
  await page.getByRole('button', { name: 'Entregar' }).click();
  await corregir(page, 0, 'Bien');
  await page.getByRole('button', { name: 'Salir del modo examen' }).click();
  await entrar(page, M1);
  await page.getByRole('button', { name: 'Entregar' }).click();
  await page.reload();
  await expect(page.locator('[data-ex="ultimo"]')).toContainText('30/100');
});

test('modo examen: M2 reparte igual y avisa', async ({ page }) => {
  await entrar(page, M2);
  await page.getByRole('button', { name: 'Entregar' }).click();
  for (let i = 0; i < 3; i++) await corregir(page, i, 'Bien');
  await expect(page.locator('[data-ex="nota"]')).toHaveText('100');
  await corregir(page, 2, 'A medias');
  await expect(page.locator('[data-ex="nota"]')).toHaveText('83.3');
  await expect(page.locator('[data-ex="oficial"]')).toContainText('reparto igual');
});

test('modo examen: pausa, salir restaura la vista normal', async ({ page }) => {
  await entrar(page, M1);
  await page.getByRole('button', { name: 'Pausar' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar' })).toBeVisible();
  await page.getByRole('button', { name: 'Salir del modo examen' }).click();
  await expect(ej1(page).getByRole('button', { name: 'Ver solución completa' })).toBeVisible();
  await expect(page.locator('body')).not.toHaveAttribute('data-examen', /.*/);
});

test('modo examen: sin JS se ve todo', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://localhost:4321/AGA/' });
  const page = await ctx.newPage();
  await page.goto(M1);
  await expect(page.locator('[data-examen-panel]')).toBeHidden();
  await expect(ej1(page).locator('h2')).toBeVisible();
  await ctx.close();
});

test.describe('modo examen a 390px', () => {
  test.use({ viewport: { width: 390, height: 800 } });
  for (const [nombre, ruta] of [['modelo1', M1], ['modelo2', M2]]) {
    test(`sin scroll horizontal en ${nombre}`, async ({ page }) => {
      await entrar(page, ruta);
      const medir = () => page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      let [sw, iw] = await medir();
      expect(sw).toBeLessThanOrEqual(iw);
      await page.getByRole('button', { name: 'Entregar' }).click();
      [sw, iw] = await medir();
      expect(sw).toBeLessThanOrEqual(iw);
    });
  }
});
