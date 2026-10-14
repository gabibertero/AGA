import { test, expect } from '@playwright/test';

const dia = (delta) => { const d = new Date(); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

test('cuenta regresiva calcula días y persiste', async ({ page }) => {
  await page.goto('');
  await page.locator('#f-p2').fill(dia(10));
  await expect(page.locator('[data-fecha=p2] [data-dias]')).toHaveText('Faltan 10 días');
  await page.reload();
  await expect(page.locator('#f-p2')).toHaveValue(dia(10));
  await expect(page.locator('[data-fecha=p2] [data-dias]')).toHaveText('Faltan 10 días');
  expect(await page.evaluate(() => localStorage.getItem('aga:v1:fecha:p2'))).toBe(dia(10));
});

test('progreso: estado vacío y puntaje del examen', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('[data-prog-vacio]')).toBeVisible();
  await page.evaluate(() => {
    localStorage.setItem('aga:v1:examen:modelo1-p2', JSON.stringify({ nota: 72.5, usado: 3000 }));
    localStorage.setItem('aga:v1:estado:modelo1-p2#1', 'resuelto');
  });
  await page.reload();
  await expect(page.locator('[data-prog-datos]')).toBeVisible();
  await expect(page.locator('[data-p-hechos]')).toHaveText('1');
  await expect(page.locator('[data-p-prom]')).toContainText('72.5');
  await expect(page.locator('[data-examen=modelo1-p2] [data-ex-estado]')).toContainText('72.5/100');
});

test('seguir donde dejaste aparece tras visitar un parcial', async ({ page }) => {
  await page.goto('segundo-parcial/parciales/modelo1-p2/');
  await page.goto('');
  await expect(page.locator('[data-seguir] a')).toHaveAttribute('href', /modelo1-p2/);
});

test('el tema se alterna y persiste', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('');
  const btn = page.getByRole('button', { name: 'Modo oscuro' });
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
  await btn.click();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'dark');
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('aga:v1:tema'))).toBe('dark');
});

for (const tema of ['light', 'dark']) {
  test(`sin scroll horizontal a 390px (${tema})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: tema });
    await page.goto('');
    const w = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    expect(w[0]).toBeLessThanOrEqual(w[1]);
  });
}

test('el Inicio funciona con localStorage roto', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.addInitScript(() => {
    const falla = () => { throw new Error('storage roto'); };
    Storage.prototype.getItem = falla; Storage.prototype.setItem = falla;
  });
  await page.goto('');
  await expect(page.locator('h1')).toContainText('AGA');
  await expect(page.locator('[data-prog-vacio]')).toBeVisible();
  expect(errores).toEqual([]);
});

test('todos los links del Home dan 200', async ({ page, request }) => {
  await page.goto('');
  const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.href).filter((h) => h.startsWith(location.origin)));
  expect(hrefs.length).toBeGreaterThan(15);
  for (const h of [...new Set(hrefs)]) expect((await request.get(h)).status(), h).toBe(200);
});
