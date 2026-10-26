import { test, expect } from '@playwright/test';

const URL = 'segundo-parcial/laboratorio/';
const errores = (page) => { const e = []; page.on('console', (m) => m.type() === 'error' && e.push(m.text())); page.on('pageerror', (x) => e.push(String(x))); return e; };

test('carga, "Otro" cambia el ejercicio y "Ver solución" muestra pasos', async ({ page }) => {
  const err = errores(page);
  await page.goto(URL);
  await expect(page.locator('h1')).toHaveText('Laboratorio');
  const enun = page.locator('[data-enunciado]');
  await expect(enun.locator('.katex').first()).toBeVisible();
  const antes = await enun.innerText();
  await page.getByRole('button', { name: 'Otro', exact: true }).click();
  await expect(enun).not.toHaveText(antes);
  await page.getByRole('button', { name: 'Ver solución', exact: true }).click();
  expect(await page.locator('[data-solucion] li').count()).toBeGreaterThan(1);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  expect(err).toEqual([]);
});

test('verificación numérica: la respuesta correcta da ✓, una incorrecta no', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('button', { name: 'U8 · Vectores' }).click();
  await page.locator('[data-tipo]').selectOption({ label: 'Ángulo entre vectores' });
  const inp = page.getByLabel('θ en grados');
  await inp.fill('999');
  await page.getByRole('button', { name: 'Verificar' }).click();
  await expect(page.locator('[data-feedback]')).toContainText('Todavía no');
  await page.getByRole('button', { name: 'Ver solución', exact: true }).click();
  const ang = (await page.locator('.lab-res .katex-html').innerText()).match(/(\d+)/)[1];
  await inp.fill(ang);
  await page.getByRole('button', { name: 'Verificar' }).click();
  await expect(page.locator('[data-feedback]')).toHaveText('¡Correcto!');
});

test('todas las unidades generan ejercicios', async ({ page }) => {
  const err = errores(page);
  await page.goto(URL);
  for (const u of ['U9 · Rectas', 'U9 · Planos', 'U10 · Cónicas', 'U8 · Vectores']) {
    await page.getByRole('button', { name: u }).click();
    await expect(page.locator('[data-enunciado] .katex').first()).toBeVisible();
  }
  expect(err).toEqual([]);
});

test('cónicas interactivas: los sliders actualizan ecuación y gráfico', async ({ page }) => {
  const err = errores(page);
  await page.goto(URL);
  const ord = page.locator('[data-c-ord]'), gen = page.locator('[data-c-gen]');
  await expect(ord).toContainText('25');
  const ord0 = await ord.innerText(), gen0 = await gen.innerText();
  await page.getByLabel(/^h \(abscisa/).fill('-4');
  await expect(ord).not.toHaveText(ord0);
  await expect(gen).not.toHaveText(gen0);
  await expect(page.getByLabel(/^h \(abscisa/)).toHaveValue('-4');
  await expect(page.locator('[data-c-graf] svg')).toHaveAttribute('aria-label', /centro en \(-4; -2\)/);
  await page.getByLabel('Tipo', { exact: true }).selectOption('parabola');
  await expect(page.getByLabel(/^p \(distancia/)).toBeVisible();
  await page.getByLabel(/^p \(distancia/).fill('3');
  await expect(ord).toContainText('12');
  await page.getByLabel('Tipo', { exact: true }).selectOption('hiperbola');
  await expect(page.locator('[data-c-graf] text', { hasText: /^V'$/ })).toBeVisible();
  await expect(page.locator('[data-c-graf] .lab-asint')).toHaveCount(2);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  expect(err).toEqual([]);
});

test('390px: sin scroll horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL);
  await page.getByLabel('Tipo', { exact: true }).selectOption('hiperbola');
  await expect(page.locator('[data-c-graf] svg')).toBeVisible();
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  expect(sw).toBeLessThanOrEqual(iw);
});
