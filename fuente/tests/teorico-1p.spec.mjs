import { test, expect } from '@playwright/test';

test('recorrido U1–U7 con fórmulas y gráficos en todos los conceptos', async ({page})=>{
 test.setTimeout(120000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('primer-parcial/teorico/');
 await expect(page.locator('[data-unit-link]')).toHaveCount(7);
 for(let n=1;n<=7;n++){
  await page.goto(`primer-parcial/teorico/u${n}/`);
  await page.evaluate(()=>document.fonts.ready);
  const count=await page.locator('[data-jump]').count();
  expect(count).toBeGreaterThan(5);
  for(let i=0;i<count;i++){
   await page.locator('[data-jump]').nth(i).click();
   const card=page.locator('[data-lesson]:visible');
   await expect(card).toHaveCount(1);
   await expect(card.locator('svg[role=img]')).toHaveCount(1);
   await expect(card.locator('.tutor-definition')).toBeVisible();
   expect(await card.locator('.tutor-definition').innerText()).not.toMatch(/graficos\/|pendiente de revisión/);
   await expect(card.locator('.katex-error')).toHaveCount(0);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 expect(errors).toEqual([]);
});

test('borrador, marca y posición sobreviven a recarga y navegación',async({page})=>{
 await page.goto('primer-parcial/teorico/u2/#diagonal-traza');
 let card=page.locator('[data-lesson]:visible');
 await card.locator('[data-draft]').fill('Son los elementos que tienen subíndices iguales.');
 await card.locator('[data-mark=understood]').click();
 await page.reload();
 card=page.locator('[data-lesson]:visible');
 await expect(card.locator('[data-draft]')).toHaveValue('Son los elementos que tienen subíndices iguales.');
 await expect(card.locator('[data-mark=understood]')).toHaveAttribute('aria-pressed','true');
 await page.goto('primer-parcial/teorico/');
 await expect(page.locator('[data-resume] a')).toHaveAttribute('href',/u2\/#diagonal-traza$/);
 await page.locator('[data-resume] a').click();
 await expect(page.locator('[data-lesson]:visible h2')).toHaveText('Diagonal principal y traza');
});

test('controles de vector y navegación funcionan sin localStorage',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('sin storage')};Storage.prototype.setItem=()=>{throw Error('sin storage')};});
 await page.goto('primer-parcial/teorico/u1/');
 const svg=page.locator('[data-lesson]:visible svg[role=img]');const before=await svg.innerHTML();
 await page.getByLabel('Ángulo',{exact:true}).focus();
 await page.getByLabel('Ángulo',{exact:true}).press('Home');
 await page.getByLabel('Ángulo',{exact:true}).press('ArrowRight');
 expect(await svg.innerHTML()).not.toBe(before);
 await expect(page.locator('[data-save-status]')).toContainText('No se pudo guardar');
 await page.locator('[data-next]').click();
 await expect(page.locator('[data-lesson]:visible h2')).toHaveText('Segmentos equipolentes');
 expect(errors).toEqual([]);
});

test('las respuestas y esquemas se pueden leer sin JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto('http://localhost:4321/AGA/primer-parcial/teorico/u5/');
 await expect(page.locator('[data-lesson]:visible')).toHaveCount(9);
 await expect(page.locator('[data-lesson]:visible svg[role=img]')).toHaveCount(9);
 await context.close();
});
