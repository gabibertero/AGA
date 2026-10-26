import { test, expect } from '@playwright/test';
const B = '/AGA/';
for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 800 }]) {
  test(`hoja y parcial aleatorio ${vp.width}px`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto(`${B}segundo-parcial/parciales/modelo1-p2/`);
    const hoja = page.locator('[data-hoja]');
    await expect(hoja).toBeVisible();
    await expect(hoja.locator('.hoja-ej')).toHaveCount(3);
    await expect(hoja.locator('.hoja-escaneo')).toHaveCount(1);
    await expect(hoja.getByText('Pista')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await hoja.getByRole('link', { name: /Generar otros parciales/ }).click();
    await expect(page.locator('[data-p-hoja] .par-ej')).toHaveCount(3);
    await expect(page.locator('[data-p-hoja] .eyebrow').nth(2)).toContainText('40 pts');
    await page.locator('[data-p-ver]').click();
    await expect(page.locator('[data-p-sol]').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
