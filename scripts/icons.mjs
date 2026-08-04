/**
 * Rend le jeu d'icônes du site.
 *
 *   pnpm run icons
 *
 * Le dessin : une tuile de papier crème, une fleur de cerisier en rose cendré,
 * un filet vermillon en pied. C'est le seul monogramme que ce site puisse
 * porter honnêtement — le cerisier EST la direction artistique, et une
 * initiale « I » dans 16 px serait une barre verticale indistinguable.
 *
 * Contrairement au jeu d'icônes de Lionel, aucune police n'entre ici : la
 * fleur est un tracé. Ça supprime le problème qui l'obligeait à dessiner sa
 * tuile en HTML — une `@font-face` déclarée dans le document hôte ne traverse
 * pas un SVG chargé en `data:` URI, et sa lettre y retombait sur une police de
 * substitution. La tuile passe quand même par Chromium via Playwright, déjà
 * présent pour les tests : aucune dépendance de rendu d'image n'est ajoutée.
 *
 * La géométrie est EXACTEMENT celle de Sprite.astro : mêmes angles inégaux
 * (70°/76°/68°/74°/72°), mêmes échelles à 3 % près, même bascule de −8° du
 * groupe. Premier essai fait avec cinq pétales réguliers à 72°, au motif que
 * l'asymétrie ne se verrait pas à 16 px : à 180 px, l'icône iOS rendait une
 * rosace de horloger, pas une fleur. C'est précisément cette irrégularité qui
 * fait lire un cerisier plutôt qu'un engrenage, et elle ne coûte rien.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

/* Les jetons du thème clair, recopiés depuis tokens.css. Un favicon ne peut
   pas s'inverser selon le thème du visiteur : il est figé, et le papier crème
   est ce qui le détache aussi bien sur un onglet clair que sur un onglet
   sombre. Une tuile encre disparaîtrait dans un onglet sombre. */
const PAPER = '#faf5ec';
const PETAL = '#c08894';
const SHU = '#c9432e';

const TARGETS = [
  { file: 'favicon-16.png', size: 16, fleur: 0.78, filet: 0.16 },
  { file: 'favicon-32.png', size: 32, fleur: 0.78, filet: 0.16 },
  { file: 'favicon-48.png', size: 48, fleur: 0.78, filet: 0.16 },
  // iOS arrondit les coins : la fleur s'écarte un peu plus des bords.
  { file: 'apple-touch-icon.png', size: 180, fleur: 0.66, filet: 0.13 },
];

/** Le .ico embarque trois PNG : licite depuis Vista, lu par tous les navigateurs. */
const ICO_SIZES = [16, 32, 48];

const PETALE =
  'M0 1.1 C-2.7-1.3 -5.5-4.4 -5.6-8.1 C-5.7-11.1 -3.9-13.1 -1.9-12.8 ' +
  'C-1-12.6 -.35-11.6 0-9.5 C.35-11.6 1-12.6 1.9-12.8 C3.9-13.1 5.7-11.1 5.6-8.1 ' +
  'C5.5-4.4 2.7-1.3 0 1.1 Z';

/* Les cinq pétales, avec leurs angles et leurs échelles inégaux : la copie
   conforme de Sprite.astro. Une fleur vraie n'est pas symétrique, et l'œil lit
   la symétrie parfaite comme du gabarit. */
const POSES = [
  '',
  'rotate(70) scale(.97,1.03)',
  'rotate(146) scale(1.03,.98)',
  'rotate(214) scale(.98,1.01)',
  'rotate(288) scale(1.02,.99)',
];

const fleurSvg = (px) =>
  `<svg width="${px}" height="${px}" viewBox="-14 -14 28 28" xmlns="http://www.w3.org/2000/svg">` +
  `<g fill="${PETAL}" transform="rotate(-8) scale(1,.96)">` +
  POSES.map((p) => `<path d="${PETALE}"${p ? ` transform="${p}"` : ''}/>`).join('') +
  '</g></svg>';

function page({ size, fleur, filet }) {
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;width:${size}px;height:${size}px}
    .tuile{position:relative;width:${size}px;height:${size}px;background:${PAPER};overflow:hidden}
    .f{position:absolute;inset:0;display:grid;place-items:center;
       /* Remontée optique : le filet pèse en bas, la fleur doit s'en écarter. */
       padding-bottom:${(filet * 1.6 * 100).toFixed(2)}%}
    .filet{position:absolute;left:0;right:0;bottom:0;height:${(filet * 100).toFixed(2)}%;background:${SHU}}
  </style><div class="tuile"><div class="f">${fleurSvg((fleur * size).toFixed(2))}</div><div class="filet"></div></div>`;
}

function ico(entries) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2); // type : icône
  head.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, png } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 vaut 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); // plans
    e.writeUInt16LE(32, 6); // bits par pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += png.length;
  }
  return Buffer.concat([head, ...dir, ...entries.map((e) => e.png)]);
}

const browser = await chromium.launch();
const rendered = new Map();

for (const target of TARGETS) {
  const p = await browser.newPage({
    viewport: { width: target.size, height: target.size },
    deviceScaleFactor: 1,
  });
  await p.setContent(page(target));
  const png = await p.screenshot();
  await p.close();
  await writeFile(join(PUBLIC, target.file), png);
  rendered.set(target.size, png);
  console.log(`ok   ${target.file.padEnd(24)} ${String(target.size).padStart(3)}px`);
}

await writeFile(
  join(PUBLIC, 'favicon.ico'),
  ico(ICO_SIZES.map((size) => ({ size, png: rendered.get(size) }))),
);
console.log(`ok   ${'favicon.ico'.padEnd(24)} ${ICO_SIZES.join(' + ')}px`);

await browser.close();
