#!/usr/bin/env node
/* Rapatrie les polices depuis Google Fonts, sous-ensemble `latin` seul, et les
   dépose dans public/fonts. À lancer à la main, jamais en CI : les fichiers
   sont versionnés, et le site ne doit à aucun moment dépendre d'une origine
   tierce à l'exécution.

   Pourquoi le sous-ensemble `latin` standard, et surtout pas un sous-ensemble
   taillé sur le texte du jour via le paramètre `text=` : la plage `latin` de
   Google couvre déjà tout le français, œ compris, plus &, @, ·, –, ’, «», …
   et €. Un sous-ensemble sur mesure produit des fichiers plus légers mais lie
   les polices à un instantané de la copie : la première phrase ajoutée
   réintroduit le défaut en silence.

   Zen Old Mincho est le cas qui justifie ce script à lui seul. C'est une
   police japonaise : la famille complète pèse plusieurs mégaoctets de kana et
   de kanji dont ce site n'affiche pas un seul glyphe.

   Et elle n'est PAS variable, contrairement aux deux autres : Google en rend
   un fichier par graisse. On ne demande donc que les graisses réellement
   posées par base.css — 700 pour h2/h3 et 900 pour le h1 — et aucune autre.
   Déclarer une plage 400–900 sur un fichier unique laisserait le navigateur
   synthétiser un faux gras, ce qui se voit immédiatement sur un mincho. */
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = new URL('../public/fonts/', import.meta.url);

/* L'en-tête User-Agent décide du format servi : sans un navigateur moderne
   annoncé, l'API rend du TTF et le gain de poids disparaît. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

/* `weights: null` = famille variable, un seul fichier couvre l'axe.
   `weights: [...]` = famille statique, un fichier par graisse demandée. */
const FAMILIES = [
  { file: 'ZenOldMincho', query: 'Zen+Old+Mincho:wght@700;900', weights: [700, 900] },
  { file: 'Archivo', query: 'Archivo:wght@400..600', weights: null },
  { file: 'JetBrainsMono', query: 'JetBrains+Mono:wght@400..500', weights: null },
];

await mkdir(OUT, { recursive: true });
let total = 0;

for (const { file, query, weights } of FAMILIES) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}&display=swap`, {
    headers: { 'User-Agent': UA },
  }).then((r) => {
    if (!r.ok) throw new Error(`${file} : la feuille répond ${r.status}`);
    return r.text();
  });

  /* Google précède chaque @font-face d'un commentaire portant le nom du
     sous-ensemble. Découper sur ces commentaires isole le bloc `latin` des
     centaines de tranches numérotées d'une police japonaise. */
  const blocks = css.split('/*').filter((b) => b.startsWith(' latin '));
  if (!blocks.length) throw new Error(`${file} : aucun bloc « latin » dans la feuille`);

  const pick = (block) => {
    const m = block.match(/url\((https:[^)]+\.woff2)\)/);
    if (!m) throw new Error(`${file} : aucun woff2 dans le bloc latin`);
    return m[1];
  };

  const wanted = weights
    ? weights.map((w) => {
        const b = blocks.find((x) => new RegExp(`font-weight:\\s*${w}\\b`).test(x));
        if (!b) throw new Error(`${file} : graisse ${w} absente du sous-ensemble latin`);
        return { name: `${file}-${w}`, url: pick(b) };
      })
    : [{ name: file, url: pick(blocks[0]) }];

  for (const { name, url } of wanted) {
    const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
    await writeFile(new URL(`${name}.woff2`, OUT), buf);
    total += buf.length;
    console.log(`${name}.woff2 — ${(buf.length / 1024).toFixed(1)} Kio`);
  }
}

/* Budget : les polices sont le premier poste de poids de la page. Au-delà de
   110 Kio, c'est qu'un axe ou une graisse non désirée est revenu. */
const BUDGET = 110 * 1024;
console.log(`\nTotal : ${(total / 1024).toFixed(1)} Kio (budget ${BUDGET / 1024} Kio)`);
if (total > BUDGET) {
  console.error('Budget des polices dépassé.');
  process.exit(1);
}
