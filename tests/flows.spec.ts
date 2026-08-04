import { expect, test } from '@playwright/test';

/* Les parcours qui cassent en silence. On ne teste pas ce qu'un coup d'œil
   rattrape (une couleur, un espacement), mais ce qui se dégrade sans que
   personne ne le voie : une ancre morte, un CV qui ne se télécharge plus, un
   numéro reparu en clair dans la source. */

const SECTIONS = ['qui', 'travail', 'livre', 'parcours', 'contact'];

for (const [lang, path] of [
  ['fr', '/'],
  ['en', '/en/'],
] as const) {
  test(`${lang} · chaque lien de navigation atteint sa section`, async ({ page }) => {
    await page.goto(path);
    for (const id of SECTIONS) {
      const target = page.locator(`#${id}`);
      await expect(target, `#${id} doit exister sur la page ${lang}`).toHaveCount(1);
      /* Le lien est cherché DANS la navigation, et non sur la page entière :
         « #contact » est aussi la cible du second bouton du hero, et un
         `toHaveCount(1)` global échouait sur cette seconde occurrence, qui
         est voulue : c'est la bifurcation par audience. */
      await expect(page.locator(`.nav a[href="#${id}"]`)).toHaveCount(1);
    }
  });
}

test("le CV se télécharge, et c'est bien un PDF", async ({ page, request }) => {
  await page.goto('/');
  const href = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
  expect(href).toBe('/cv/CV_Itokiana_Rajohnson.pdf');

  const res = await request.get(href as string);
  expect(res.status()).toBe(200);
  /* Les quatre premiers octets d'un PDF valide. Vérifier le seul code 200
     laisserait passer une page d'erreur servie en 200, ou un fichier tronqué
     par un dépôt partiel, deux pannes déjà vues sur GitHub Pages. */
  expect((await res.body()).subarray(0, 4).toString('latin1')).toBe('%PDF');
});

test('le numéro est absent de la source, et révélé au clic', async ({ page }) => {
  await page.goto('/');

  /* Neuf chiffres, séparateurs quelconques : une fuite s'écrirait aussi bien
     « +261 38 61 391 66 » que « +261386139166 » ou « 38.61.391.66 ». Le même
     motif que scripts/content-check.mjs, mais sur la page rendue et vivante :
     le script lit le HTML servi, ce test lit le DOM après exécution du
     JavaScript, et ce n'est pas la même chose. */
  const leak =
    /(?:\+?261|0)?[^0-9a-zA-Z]{0,3}3[^0-9a-zA-Z]{0,3}8[^0-9a-zA-Z]{0,3}6[^0-9a-zA-Z]{0,3}1[^0-9a-zA-Z]{0,3}3[^0-9a-zA-Z]{0,3}9[^0-9a-zA-Z]{0,3}1[^0-9a-zA-Z]{0,3}6[^0-9a-zA-Z]{0,3}6/;
  expect(await page.content()).not.toMatch(leak);

  await page.locator('#phone').click();
  const tel = page.locator('a[href^="tel:"]');
  await expect(tel).toHaveCount(1);
  await expect(tel).toHaveAttribute('href', 'tel:+261386139166');
  await expect(tel).toHaveText('+261 38 61 391 66');
});

test('la bascule de langue mène à la page équivalente, jamais à l’accueil', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

  await page.locator('#lang-switch').click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  await page.locator('#lang-switch').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});
