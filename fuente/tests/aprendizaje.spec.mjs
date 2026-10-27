import { test, expect } from '@playwright/test';

const T = 'segundo-parcial/teorico/';
const APR = `${T}aprendizaje/`;
const sinScrollH = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

test('ruteo: 2º parcial -> Teórico/Práctico, hubs y páginas existentes', async ({ page }) => {
  await page.goto('segundo-parcial/');
  await expect(page.getByRole('link', { name: /Entrar a Teórico/ })).toBeVisible();
  await page.getByRole('link', { name: /Entrar a Práctico/ }).click();
  await expect(page).toHaveURL(/segundo-parcial\/practico\/$/);
  await expect(page.locator('a[href$="segundo-parcial/laboratorio/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="segundo-parcial/parciales/modelo1-p2/"]').first()).toBeVisible();
  await page.goto(T);
  for (const r of ['teoria', 'machete', 'aprendizaje']) await expect(page.locator(`a[href$="${T}${r}/"]`).first()).toBeVisible();
  await expect(page.locator('a[href$="segundo-parcial/teoria/"]')).toBeVisible(); // preguntero existente
  await expect(page.locator('a[href$="segundo-parcial/machetes/"]')).toBeVisible();
});

for (const s of ['u8', 'u9', 'u10']) {
  test(`teoría ${s}: KaTeX sin errores, figuras y 390px`, async ({ page }) => {
    await page.goto(`${T}teoria/${s}/`);
    await expect(page.locator('.katex').first()).toBeVisible();
    await expect(page.locator('.katex-error')).toHaveCount(0);
    expect(await page.locator('.teo-fig svg').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('main')).not.toContainText('$');
    expect(await sinScrollH(page)).toBe(true);
  });
}

test('machete combinado: todas las unidades y sin scroll horizontal', async ({ page }) => {
  await page.goto(`${T}machete/`);
  await expect(page.locator('.m-banda')).toHaveCount(4);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  expect(await page.locator('.m-fila').count()).toBeGreaterThan(60);
  expect(await sinScrollH(page)).toBe(true);
});

test('aprendizaje sin JS: se ve el banco completo con respuestas', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://localhost:4321/AGA/' });
  const page = await ctx.newPage();
  await page.goto(APR);
  expect(await page.locator('[data-q]').count()).toBeGreaterThanOrEqual(70);
  await expect(page.locator('[data-config]')).toBeHidden();
  await page.locator('.q-sinjs summary').first().click();
  await expect(page.locator('.q-resp').first()).toBeVisible();
  await ctx.close();
});

test('aprendizaje: sesión de una unidad, opción múltiple y persistencia', async ({ page }) => {
  await page.goto(APR);
  await expect(page.locator('[data-q]')).toHaveCount(0); // JS retira el banco estático
  await page.locator('[data-unidad-btn="U9"]').click();
  await expect(page.locator('[data-unidad-btn="U9"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-n]').selectOption('5');
  await page.locator('[data-empezar]').click();
  await expect(page.locator('[data-cont]')).toHaveText('Pregunta 1 de 5');
  for (let n = 0; n < 5; n++) {
    await expect(page.locator('[data-stage] .chip-u')).toHaveText('U9');
    const mc = page.locator('[data-stage] .ap-opc');
    if (await mc.count()) {
      await mc.first().click();
      await expect(page.locator('[data-aviso]')).toContainText(/Correcto|Incorrecto/);
      await expect(page.locator('[data-stage] .ap-opc[data-v="ok"]')).toHaveCount(1);
      await expect(page.locator('[data-stage] .q-resp')).toBeVisible();
    } else {
      await expect(page.locator('[data-stage] .q-resp')).toBeHidden();
      await page.locator('[data-ver]').click();
      await expect(page.locator('[data-stage] .q-resp')).toBeVisible();
      await page.locator('[data-r="medias"]').click();
      await expect(page.locator('[data-r="medias"]')).toHaveAttribute('aria-pressed', 'true');
    }
    expect(await sinScrollH(page)).toBe(true);
    await page.locator('[data-sig]').click();
  }
  await expect(page.locator('[data-resumen]')).toContainText('5 preguntas');
  const claves = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('aga:v1:apr:')));
  expect(claves.length).toBeGreaterThanOrEqual(5);
  await page.reload();
  await expect(page.locator('[data-unidad-btn="U9"]')).toHaveAttribute('aria-pressed', 'true');
});

test('aprendizaje: mezcla con gráficos, KaTeX y localStorage roto', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('bloqueado'); } }); });
  await page.goto(APR);
  await page.locator('[data-unidad-btn="mezcla"]').click();
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  const unidades = new Set();
  let figuras = 0;
  for (let n = 0; n < 100; n++) {
    unidades.add(await page.locator('[data-stage] .chip-u').textContent());
    figuras += await page.locator('[data-stage] .q-fig svg').count();
    await expect(page.locator('.katex-error')).toHaveCount(0);
    if (await page.locator('[data-sig]').textContent() === 'Ver resumen') break;
    await page.locator('[data-sig]').click();
  }
  expect(unidades.size).toBe(3);
  expect(figuras).toBeGreaterThan(5);
  await page.locator('[data-sig]').click();
  await expect(page.locator('[data-fin]')).toBeVisible();
});

test('aprendizaje en 390px: opciones y figura sin desborde', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(APR);
  await page.locator('[data-unidad-btn="U10"]').click();
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  for (let n = 0; n < 40; n++) {
    expect(await sinScrollH(page)).toBe(true);
    if (await page.locator('[data-sig]').textContent() === 'Ver resumen') break;
    await page.locator('[data-sig]').click();
  }
});

test('repasar: sin falladas avisa; con falladas arma la sesión solo con ellas y las lista al final', async ({ page }) => {
  await page.goto(APR);
  await page.locator('[data-unidad-btn="repasar"]').click();
  await expect(page.locator('[data-n-repasar]')).toHaveText('0');
  await page.locator('[data-empezar]').click();
  await expect(page.locator('[data-cfg-aviso]')).toContainText('No tenés preguntas falladas');
  await expect(page.locator('[data-sesion]')).toBeHidden();
  // Se marcan 2 como falladas y 1 como "a medias" (mismo formato que guarda la UI).
  await page.evaluate(() => {
    localStorage.setItem('aga:v1:apr:u8-mc-01', 'mal');
    localStorage.setItem('aga:v1:apr:u9-dev-01', 'mal');
    localStorage.setItem('aga:v1:apr:u10-mc-01', 'medias');
    localStorage.setItem('aga:v1:apr:u8-mc-02', 'bien');
  });
  await page.reload();
  await page.locator('[data-unidad-btn="repasar"]').click();
  await expect(page.locator('[data-n-repasar]')).toHaveText('2');
  await page.locator('[data-incluir-medias]').check();
  await expect(page.locator('[data-n-repasar]')).toHaveText('3');
  await page.locator('[data-incluir-medias]').uncheck();
  await page.locator('[data-n]').selectOption('0');
  await page.locator('[data-empezar]').click();
  await expect(page.locator('[data-cont]')).toHaveText('Pregunta 1 de 2');
  for (let n = 0; n < 2; n++) {
    const mc = page.locator('[data-stage] .ap-opc');
    if (await mc.count()) {
      // Fuerza el error: clickea una opción que no sea la correcta (la correcta ya viene marcada tras responder).
      await mc.first().click();
      if (await page.locator('[data-stage] .ap-opc[data-v="mal"]').count() === 0) {
        await page.evaluate(() => localStorage.setItem('aga:v1:apr:u8-mc-01', 'mal'));
      }
    } else {
      await page.locator('[data-ver]').click();
      await page.locator('[data-r="mal"]').click();
    }
    await page.locator('[data-sig]').click();
  }
  await expect(page.locator('[data-fin]')).toBeVisible();
  await expect(page.locator('[data-repasar-lista]')).toContainText('u9-dev-01');
  await expect(page.locator('[data-repasar-lista] .katex')).toHaveCount(0);
});
