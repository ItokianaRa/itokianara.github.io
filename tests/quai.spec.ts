import { expect, test } from '@playwright/test';

/* Le plan de quai est la pièce maîtresse de la page, et c'est aussi la seule
   chose du site dont la géométrie est calculée. Deux propriétés doivent tenir
   dans un vrai navigateur, là où scripts/quai-check.mjs ne juge que des
   nombres :

   ① Le plan existe SANS JavaScript. C'est toute la différence avec la
     maquette, où il était construit au chargement : là-bas, JS coupé, le
     visiteur trouvait un cadre vide.
   ② Aucun libellé ne déborde de son cadre, à 390 px comme à 1440 px. C'est la
     panne que la maquette réglait en mesurant le texte dans le navigateur, et
     que ce site règle en déclarant puis en vérifiant. */

test('le plan est rendu sans JavaScript', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');

  await expect(page.locator('.plan .bar')).toHaveCount(5);
  await expect(page.locator('.plan .lane')).toHaveCount(4);
  await expect(page.locator('.plan .seal')).toHaveCount(1);
  /* Les bandes doivent avoir une largeur RÉELLE, pas seulement exister : une
     animation d'entrée mal repliée les laisserait à scaleX(0), donc présentes
     dans le DOM et invisibles à l'écran.

     L'attente est indispensable et n'est pas du confort : l'accostage part
     à 0,3 s et dure 1,1 s, et il est en CSS pur : il se joue donc aussi
     lorsque JavaScript est coupé, ce qui est précisément ce que ce test
     vérifie. Mesurer tout de suite après `goto` mesure le début de
     l'animation, pas son résultat. */
  await expect
    .poll(async () => (await page.locator('.plan .bar').first().boundingBox())?.width ?? 0, {
      timeout: 5000,
    })
    .toBeGreaterThan(20);

  await ctx.close();
});

for (const width of [390, 768, 1440]) {
  test(`à ${width} px, aucun élément du plan ne déborde`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const plan = await page.locator('.plan').boundingBox();
    expect(plan).not.toBeNull();

    for (const sel of ['.bar', '.blabel', '.seal']) {
      const items = page.locator(`.plan ${sel}`);
      for (let i = 0; i < (await items.count()); i++) {
        const b = await items.nth(i).boundingBox();
        if (!b) continue;
        // Une tolérance d'un pixel : les pourcentages calculés tombent sur des
        // fractions, et un arrondi de rendu ne vaut pas un débordement.
        expect(b.x, `${sel} #${i} sort à gauche`).toBeGreaterThanOrEqual((plan?.x ?? 0) - 1);
        expect(b.x + b.width, `${sel} #${i} sort à droite`).toBeLessThanOrEqual(
          (plan?.x ?? 0) + (plan?.width ?? 0) + 1,
        );
      }
    }
  });
}

test('la page entière ne défile jamais horizontalement', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
