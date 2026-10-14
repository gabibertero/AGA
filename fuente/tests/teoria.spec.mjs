import { test, expect } from '@playwright/test';

const PREG = 'segundo-parcial/teoria/';
const MACHETES = ['u8', 'u9', 'u10-conicas', 'u10-cuadricas'];
const sinScrollH = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

test('el preguntero carga con KaTeX y sin placeholder', async ({ page }) => {
  await page.goto(PREG);
  await expect(page.locator('h1')).toHaveText('Preguntero teórico');
  expect(await page.locator('[data-pregunta]').count()).toBeGreaterThanOrEqual(40);
  await expect(page.locator('main')).not.toContainText('Próximamente');
  await page.locator('details[data-resp]').first().locator('summary').click();
  await expect(page.locator('.katex').first()).toBeVisible();
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('$$');
});

test('filtrar por unidad muestra solo esa unidad', async ({ page }) => {
  await page.goto(PREG);
  const total = await page.locator('[data-pregunta]').count();
  const u10 = await page.locator('[data-pregunta][data-unidad="U10"]').count();
  await page.locator('[data-filtro="U10"]').click();
  await expect(page.locator('[data-pregunta]:not([hidden])')).toHaveCount(u10);
  expect(u10).toBeLessThan(total);
  await expect(page.locator('[data-pregunta][data-unidad="U8"]').first()).toBeHidden();
  await page.locator('[data-filtro="todas"]').click();
  await expect(page.locator('[data-pregunta]:not([hidden])')).toHaveCount(total);
});

test('la respuesta está oculta hasta pedirla', async ({ page }) => {
  await page.goto(PREG);
  const p = page.locator('[data-id="u8-02"]');
  await expect(p.locator('.resp')).toBeHidden();
  await p.locator('summary').click();
  await expect(p.locator('.resp')).toBeVisible();
  await p.locator('summary').click();
  await expect(p.locator('.resp')).toBeHidden();
});

test('"la sé" persiste al recargar y usa el prefijo aga:v1:', async ({ page }) => {
  await page.goto(PREG);
  const p = page.locator('[data-id="u9-05"]');
  await p.getByRole('button', { name: /La sé/ }).click();
  await expect(p.getByRole('button', { name: /La sé/ })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(p.getByRole('button', { name: /La sé/ })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('aga:v1:preg:u9-05'))).toBe('sabe');
  await p.getByRole('button', { name: /Repasar/ }).click();
  await page.locator('[data-filtro="repasar"]').click();
  await expect(page.locator('[data-pregunta]:not([hidden])')).toHaveCount(1);
});

test('el simulacro arma 3 preguntas (U9, U8/U9, U10) y el cronómetro anda', async ({ page }) => {
  await page.goto(PREG);
  await page.locator('[data-crono]').check();
  await page.locator('[data-armar]').click();
  const sim = page.locator('[data-sim-lista] .preg');
  await expect(sim).toHaveCount(3);
  const unidades = await sim.evaluateAll((els) => els.map((e) => e.dataset.unidad));
  expect(unidades[0]).toBe('U9');
  expect(['U8', 'U9']).toContain(unidades[1]);
  expect(unidades[2]).toBe('U10');
  await expect(sim.nth(0).locator('.resp')).toBeHidden();
  await expect(page.locator('[data-reloj]')).toBeVisible();
  await expect(page.locator('[data-reloj]')).toHaveText(/^(29:5\d|30:00)/);
});

test('los machetes renderizan KaTeX sin errores', async ({ page }) => {
  await page.goto('segundo-parcial/machetes/');
  await expect(page.locator('main li.tarjeta')).toHaveCount(MACHETES.length);
  for (const m of MACHETES) {
    await page.goto(`segundo-parcial/machetes/${m}/`);
    await expect(page.locator('.machete .katex').first()).toBeVisible();
    await expect(page.locator('.katex-error')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('$$');
    await expect(page.locator('main')).toContainText('Errores frecuentes');
  }
});

test('390px: sin scroll horizontal en preguntero y machetes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(PREG);
  await page.evaluate(() => document.querySelectorAll('details[data-resp]').forEach((d) => (d.open = true)));
  expect(await sinScrollH(page)).toBe(true);
  await page.locator('[data-armar]').click();
  expect(await sinScrollH(page)).toBe(true);
  for (const m of MACHETES) {
    await page.goto(`segundo-parcial/machetes/${m}/`);
    expect(await sinScrollH(page), m).toBe(true);
  }
});

test.describe('sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('muestra las preguntas y no los filtros', async ({ page }) => {
    await page.goto(PREG);
    await expect(page.locator('[data-pregunta]').first()).toBeVisible();
    await expect(page.locator('[data-filtro]').first()).toBeHidden();
    await expect(page.locator('[data-armar]')).toBeHidden();
  });
});
