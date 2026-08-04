import { expect, test } from '@playwright/test';

/* Le sélecteur de thème a trois états et non deux (système → clair → sombre),
   et c'est « système » le défaut. Ce cycle casse en silence de deux façons :
   la clé de stockage écrite quand elle devrait être effacée, et l'OS qui
   cesse d'être suivi une fois qu'on est repassé sur « système ». */

test('le thème cycle sur trois états et persiste', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const btn = page.locator('#theme-toggle');

  await expect(html).toHaveAttribute('data-theme-pref', 'system');

  await btn.click();
  await expect(html).toHaveAttribute('data-theme-pref', 'light');
  await expect(html).toHaveAttribute('data-theme', 'light');

  await btn.click();
  await expect(html).toHaveAttribute('data-theme-pref', 'dark');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  // La préférence survit au rechargement, et le script bloquant la repose
  // AVANT le premier rendu : il n'y a donc jamais de passage par le clair.
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(html).toHaveAttribute('data-theme-pref', 'dark');

  // Troisième clic : retour à « système ». La clé doit être EFFACÉE, pas
  // réécrite, sans quoi l'OS ne reprend jamais la main.
  await btn.click();
  await expect(html).toHaveAttribute('data-theme-pref', 'system');
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
});

test('sur « système », le thème suit l’OS en direct', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');

  await expect(html).toHaveAttribute('data-theme', 'dark');

  // Sans rechargement : c'est l'écouteur de matchMedia qui doit répondre.
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(html).toHaveAttribute('data-theme', 'light');

  // Une fois une préférence explicite posée, l'OS ne doit PLUS être suivi.
  await page.locator('#theme-toggle').click(); // system → light
  await page.locator('#theme-toggle').click(); // light  → dark
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(html).toHaveAttribute('data-theme', 'dark');
});
