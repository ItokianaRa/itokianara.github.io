/**
 * Rend le jeu d'icônes du site.
 *
 *   pnpm run icons
 *
 * LE DESSIN : une fleur de cerisier, et l'initiale d'Itokiana en son cœur.
 *
 * La forme de l'icône EST la thématique, et c'est le principe repris du jeu
 * d'icônes de Lionel. Chez lui, le favicon est un carré parce que sa direction
 * artistique est la planche cadastrale : le carré n'est pas un cadre, c'est une
 * parcelle. Poser la même tuile carrée ici en aurait fait un contenant neutre,
 * et le cerisier n'aurait plus tenu qu'à une couleur. La fleur est donc
 * découpée à même le canevas, sans fond : ce sont ses cinq pétales échancrés
 * qui portent le sens, et la lettre vient s'y loger.
 *
 * La géométrie de la fleur est EXACTEMENT celle de Sprite.astro : mêmes angles
 * inégaux (70°/76°/68°/74°/72°), mêmes échelles à 3 % près, même bascule de
 * −8°. Une fleur vraie n'est pas symétrique, et l'œil lit la symétrie parfaite
 * comme du gabarit.
 *
 * LA LETTRE tient dans le cœur, là où les cinq pétales se recouvrent et où la
 * matière est pleine. Elle est composée dans Zen Old Mincho, la police de titre
 * du site. Le choix du mincho n'est pas décoratif : ses empattements donnent au
 * « I » capital deux fortes barres horizontales, en tête et en pied. La
 * silhouette est large et refermée, là où un « I » de grotesque serait une
 * barre verticale indistinguable dans 16 px. Vérifié au rendu, pas déduit.
 *
 * LA CONTRAINTE TECHNIQUE, héritée du jeu d'icônes de Lionel : une
 * `@font-face` déclarée dans le document hôte ne traverse pas un SVG chargé en
 * `data:` URI, et la lettre y retombe sur une police de substitution. La fleur
 * est donc un SVG en ligne et la lettre un vrai nœud de texte HTML posé
 * par-dessus, dans un document où la police est réellement appliquée. Chromium
 * rasterise via Playwright, déjà présent pour les tests : aucune dépendance de
 * rendu d'image n'est ajoutée au projet.
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
const PETAL = '#c08894';
const INK = '#23201e';

/* Le tracé d'un pétale, copié de Sprite.astro : taille étroite, ventre large,
   échancrure au sommet. C'est l'échancrure qui fait qu'on reconnaît un
   cerisier et pas une marguerite. */
const PETALE =
  'M0 1.1 C-2.7-1.3 -5.5-4.4 -5.6-8.1 C-5.7-11.1 -3.9-13.1 -1.9-12.8 ' +
  'C-1-12.6 -.35-11.6 0-9.5 C.35-11.6 1-12.6 1.9-12.8 C3.9-13.1 5.7-11.1 5.6-8.1 ' +
  'C5.5-4.4 2.7-1.3 0 1.1 Z';

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

/**
 * `fleur` : diamètre de la fleur en fraction du côté.
 * `lettre` : corps de la police en fraction du côté.
 *
 * Le rapport lettre/fleur n'est PAS constant, et c'est le seul réglage qui
 * demande de l'œil ici. Il monte quand la taille baisse : à 48 px, une lettre
 * à 0,44 laisse voir les cinq échancrures et la fleur se lit comme une fleur ;
 * à 16 px, ces échancrures tombent sous le pixel de toute façon, la fleur
 * devient une pastille ronde, et c'est alors la LETTRE qui doit porter
 * l'identification. Un premier essai gardait 0,50 partout : à 16 px, les
 * empattements tombaient sous le pixel et le « I » se réduisait à une tache
 * verticale.
 *
 * Pas d'icône 192, 512 ni maskable : ce site n'a pas de manifeste, donc rien
 * ne les référencerait. Le jour où il en gagne un, les ajouter ici ; la
 * maskable devra tenir dans les 80 % centraux (zone sûre d'Android), et
 * demandera un aplat derrière la fleur puisque Android impose un fond plein.
 */
const TARGETS = [
  { file: 'favicon-16.png', size: 16, fleur: 1, lettre: 0.64 },
  { file: 'favicon-32.png', size: 32, fleur: 1, lettre: 0.52 },
  { file: 'favicon-48.png', size: 48, fleur: 1, lettre: 0.46 },
  // iOS arrondit les coins : la fleur rentre un peu pour ne pas s'y faire
  // rogner les pétales.
  { file: 'apple-touch-icon.png', size: 180, fleur: 0.88, lettre: 0.4 },
];

/** Le .ico embarque trois PNG : licite depuis Vista, lu par tous les navigateurs. */
const ICO_SIZES = [16, 32, 48];

function page(font, { size, fleur, lettre }) {
  return `<!doctype html><meta charset="utf-8"><style>
    @font-face{font-family:Mincho;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:900}
    /* Aucun fond : le canevas reste transparent et c'est la silhouette de la
       fleur qui découpe l'icône. Un aplat carré derrière elle en referait le
       contenant neutre qu'on cherche justement à éviter. */
    html,body{margin:0;padding:0;width:${size}px;height:${size}px;background:transparent}
    .mark{position:relative;width:${size}px;height:${size}px;display:grid;place-items:center}
    .mark svg{position:absolute;inset:0;margin:auto}
    .l{position:relative;font-family:Mincho;font-weight:900;
       font-size:${(lettre * size).toFixed(2)}px;line-height:1;color:${INK};
       /* Le cœur de la fleur n'est pas au centre géométrique du canevas : le
          groupe est basculé de −8° et écrasé à .96 en hauteur, ce qui fait
          remonter la zone de recouvrement des cinq pétales. Sans cette
          correction, la lettre mord l'échancrure du pétale du bas. */
       transform:translateY(${(size * 0.02).toFixed(2)}px)}
  </style><div class="mark">${fleurSvg((fleur * size).toFixed(2))}<span class="l">I</span></div>`;
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
   SOUS-PIXEL et dépose des franges orange et bleues le long des jambages,
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
     de substitution, et l'icône part avec un « I » de grotesque, exactement le défaut que ce script existe pour éviter. */
  await p.evaluate(() => document.fonts.load('900 100px Mincho').then(() => document.fonts.ready));
  const png = await p.screenshot({ omitBackground: true });
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
