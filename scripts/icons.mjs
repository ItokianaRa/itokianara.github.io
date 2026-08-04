/**
 * Rend le jeu d'icônes du site.
 *
 *   pnpm run icons
 *
 * Le dessin : une tuile de papier crème, l'initiale d'Itokiana en encre, un
 * filet vermillon en pied. Les trois couleurs sont celles du thème clair, et
 * la lettre est composée dans la police de titre du site — le favicon est donc
 * un fragment de la page, pas un logo posé à côté.
 *
 * POURQUOI UNE LETTRE, alors que la première version portait une fleur.
 * L'objection tenait : dans 16 px, un « I » est une barre verticale, et rien
 * ne la distingue d'un filet. Elle tombe avec Zen Old Mincho. C'est un mincho,
 * donc un caractère à empattements : son « I » capital porte deux fortes
 * barres horizontales, en tête et en pied. La silhouette obtenue est un H
 * couché, large et refermé — reconnaissable là où un « I » de grotesque ne
 * l'est pas. Vérifié au rendu, pas déduit.
 *
 * Le cerisier ne disparaît pas pour autant : il reste dans le papier crème,
 * dans le filet vermillon du sceau, et dans le dessin même de la lettre.
 *
 * LA CONTRAINTE TECHNIQUE, héritée du jeu d'icônes de Lionel : une
 * `@font-face` déclarée dans le document hôte ne traverse pas un SVG chargé en
 * `data:` URI — la lettre y retombe sur une police de substitution. La tuile
 * est donc dessinée en HTML, où la police est réellement appliquée, et
 * Chromium rasterise via Playwright, déjà présent pour les tests. Aucune
 * dépendance de rendu d'image n'est ajoutée au projet.
 *
 * La police est embarquée en base64 dans la page : le sous-ensemble latin
 * contient « I », et c'est le même fichier que sert le site.
 */
import { readFile, writeFile } from 'node:fs/promises';
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
const INK = '#23201e';
const SHU = '#c9432e';

/**
 * `lettre` : hauteur de la police en fraction du côté. `filet` : hauteur du
 * filet en pied.
 *
 * La lettre grossit dans les petites tailles : à 16 px, chaque pixel de
 * hampe compte, et les empattements doivent rester au moins à un pixel plein
 * pour que la silhouette tienne. À 180 px, elle respire au contraire.
 *
 * Pas d'icône 192, 512 ni maskable : ce site n'a pas de manifeste, donc rien
 * ne les référencerait. Le jour où il en gagne un, les ajouter ici ; la
 * maskable devra rétrécir sa lettre aux 80 % centraux (zone sûre d'Android)
 * tout en gardant la tuile à fond perdu.
 */
const TARGETS = [
  { file: 'favicon-16.png', size: 16, lettre: 0.86, filet: 0.16 },
  { file: 'favicon-32.png', size: 32, lettre: 0.82, filet: 0.16 },
  { file: 'favicon-48.png', size: 48, lettre: 0.8, filet: 0.16 },
  // iOS arrondit les coins : la lettre s'écarte un peu plus des bords.
  { file: 'apple-touch-icon.png', size: 180, lettre: 0.7, filet: 0.13 },
];

/** Le .ico embarque trois PNG : licite depuis Vista, lu par tous les navigateurs. */
const ICO_SIZES = [16, 32, 48];

function page(font, { size, lettre, filet }) {
  return `<!doctype html><meta charset="utf-8"><style>
    @font-face{font-family:Mincho;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:900}
    html,body{margin:0;padding:0;width:${size}px;height:${size}px}
    .tuile{position:relative;width:${size}px;height:${size}px;background:${PAPER};overflow:hidden}
    .l{position:absolute;inset:0;display:grid;place-items:center;
       /* Remontée optique : le filet pèse en bas, la lettre doit s'en écarter. */
       padding-bottom:${(filet * 1.6 * 100).toFixed(2)}%;
       font-family:Mincho;font-weight:900;font-size:${(lettre * size).toFixed(2)}px;
       line-height:1;color:${INK}}
    .filet{position:absolute;left:0;right:0;bottom:0;height:${(filet * 100).toFixed(2)}%;background:${SHU}}
  </style><div class="tuile"><div class="l">I</div><div class="filet"></div></div>`;
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

const font = (await readFile(join(PUBLIC, 'fonts', 'ZenOldMincho-900.woff2'))).toString('base64');

/* `--disable-lcd-text` : sans lui, Chromium rend la lettre en crénelage
   SOUS-PIXEL et dépose des franges orange et bleues le long des jambages —
   visibles à l'œil nu dès qu'on agrandit un favicon de 16 px. Ces franges ne
   sont justes que sur une dalle RVB dans cet ordre précis ; partout ailleurs,
   et à toute autre échelle, elles ressortent comme de la couleur parasite dans
   une icône qui n'en a que trois. Le lissage en niveaux de gris est le seul
   correct pour une image qu'on ne contrôle pas.
   `--force-color-profile=srgb` fige le profil, sinon les trois couleurs
   dérivent selon l'écran de la machine qui lance le script. */
const browser = await chromium.launch({
  args: ['--disable-lcd-text', '--force-color-profile=srgb'],
});
const rendered = new Map();

for (const target of TARGETS) {
  const p = await browser.newPage({
    viewport: { width: target.size, height: target.size },
    deviceScaleFactor: 1,
  });
  await p.setContent(page(font, target));
  /* Attendre le chargement réel de la police, et pas seulement `fonts.ready` :
     sans cette garantie, Chromium rasterise parfois la lettre dans la police
     de substitution, et l'icône part avec un « I » de grotesque — c'est
     exactement le défaut que ce script existe pour éviter. */
  await p.evaluate(() => document.fonts.load('900 100px Mincho').then(() => document.fonts.ready));
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
