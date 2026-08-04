#!/usr/bin/env node
/* Garde de contenu, exécutée sur le site CONSTRUIT et non sur les sources.
   C'est délibéré : ce qui compte est ce qui part chez le visiteur, et une
   fuite peut naître d'un composant aussi bien que d'un dictionnaire.

   Trois familles, une seule porte.

   ① Les fuites. Le numéro de téléphone ne doit jamais apparaître en clair, et
     aucune origine tierce ne doit être appelée. Ces deux règles vivaient dans
     des étapes shell de la CI chez Lionel, donc hors de `pnpm verify`, donc
     hors du workflow de déploiement — une régression aurait été publiée, et la
     CI aurait rougi quelques minutes plus tard, après publication. Ici la
     porte se ferme avant le déploiement.

   ② La parité des deux langues. TypeScript garantit qu'aucune CLÉ ne manque
     dans en.ts, mais il ne dit rien de la LONGUEUR des tableaux : une fiche à
     six cellules en français et cinq en anglais compile parfaitement et rend
     une page anglaise amputée, en silence. On compte donc les éléments rendus
     dans les deux pages et on les compare.

   ③ La structure. Un seul h1 par page, et l'attribut de langue correct. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const rel = (p) => relative(process.cwd(), p).replace(/\\/g, '/');
let failed = 0;
const fail = (msg) => {
  console.error(`FAIL ${msg}`);
  failed++;
};

/* ── ① fuites ─────────────────────────────────────────────────────────────
   Le numéro est cherché sur ses chiffres seuls, séparateurs retirés : une
   fuite s'écrirait aussi bien « +261 38 61 391 66 » que « +261386139166 »,
   « 038 61 391 66 » ou « 38.61.391.66 », et un motif calé sur une seule de
   ces formes laisserait passer les autres. La suite de neuf chiffres retenue
   est commune au format international et au format local.

   ANGLE MORT ASSUMÉ : cette porte lit des octets, et le texte d'un PDF est
   compressé. Elle ne voit donc RIEN du contenu de dist/cv/, et son feu vert
   ne dit strictement rien sur ce fichier. Ce qu'un PDF déposé dans public/
   expose relève d'une relecture humaine. */
const PHONE_DIGITS = '386139166';

const FUITES = [
  {
    test: (txt) =>
      new RegExp(
        `(?:\\+?261|0)?[^0-9a-zA-Z]{0,3}${PHONE_DIGITS.split('').join('[^0-9a-zA-Z]{0,3}')}`,
      ).test(txt),
    quoi: 'numéro de téléphone en clair',
  },
  {
    test: (txt) => /fonts\.(googleapis|gstatic)\.com/i.test(txt),
    quoi: 'appel à Google Fonts (les polices sont auto-hébergées)',
  },
  {
    // Le CV maître ne mentionne aucun profil social. En afficher un serait un
    // fait fabriqué, exactement comme inventer un projet.
    test: (txt) => /linkedin\.com|github\.com\/(?!ItokianaRa\/)/i.test(txt),
    quoi: 'lien vers un profil social',
  },
];

for (const file of walk('dist')) {
  // latin1 : les octets sont conservés tels quels, donc un binaire est fouillé
  // sans erreur de décodage, comme le ferait `grep -r`.
  const txt = readFileSync(file, 'latin1');
  for (const { test, quoi } of FUITES) {
    if (test(txt)) fail(`${rel(file)} : ${quoi}`);
  }
}
console.log('ok   aucune fuite dans dist/');

/* ── ② parité des deux langues ───────────────────────────────────────────── */
const fr = readFileSync('dist/index.html', 'utf8');
const en = readFileSync('dist/en/index.html', 'utf8');

const count = (html, re) => (html.match(re) ?? []).length;

/* Chaque motif doit compter EXACTEMENT ce que son nom annonce, sinon la porte
   se rassure elle-même. Les deux entrées qui portent un `zone` sont extraites
   de leur bloc avant d'être comptées : un `class="mono"` compté sur la page
   entière en trouve trente-deux et ne dit rien des trois lieux du hero. */
const STRUCTURES = [
  {
    nom: 'cellules de la fiche',
    zone: /<div class="fiche[^"]*">([\s\S]*?)<\/section>/,
    re: /<strong>/g,
  },
  { nom: 'lieux du hero', zone: /<div class="places">([\s\S]*?)<\/div>/, re: /<span/g },
  { nom: "noms du bandeau d'autorité", re: /<article class="rv"/g },
  { nom: 'temps de travail', re: /class="tp rv"/g },
  { nom: 'éléments du fil', re: /<li>/g },
  { nom: 'réalisations', re: /class="rl rv"/g },
  { nom: 'projets « également livré »', re: /<h4>/g },
  { nom: 'lignes du parcours', re: /class="row rv"/g },
  { nom: 'portes de contact', re: /class="door rv"/g },
  { nom: 'bandes du plan de quai', re: /class="bar[ "]/g },
  { nom: 'postes du plan de quai', re: /class="lane"/g },
];

for (const { nom, re, zone } of STRUCTURES) {
  const slice = (html) => {
    if (!zone) return html;
    const m = html.match(zone);
    if (!m) {
      fail(`zone « ${nom} » introuvable — le motif a dérivé du balisage`);
      return '';
    }
    return m[1];
  };
  const a = count(slice(fr), re);
  const b = count(slice(en), re);
  if (a !== b) fail(`parité FR/EN : ${a} ${nom} en français, ${b} en anglais`);
  else if (a === 0) fail(`aucun élément trouvé pour « ${nom} » — le motif a dérivé du balisage`);
  else console.log(`ok   ${nom} : ${a} des deux côtés`);
}

/* ── ③ structure ─────────────────────────────────────────────────────────── */
for (const [nom, html, lang] of [
  ['dist/index.html', fr, 'fr'],
  ['dist/en/index.html', en, 'en'],
]) {
  const h1 = count(html, /<h1[\s>]/g);
  if (h1 !== 1) fail(`${nom} : ${h1} élément(s) h1, il en faut exactement un`);
  if (!new RegExp(`<html lang="${lang}"`).test(html)) fail(`${nom} : attribut lang absent ou faux`);
}
console.log('ok   un seul h1 par page, attribut de langue correct');

console.log(failed ? `\n${failed} échec(s) de contenu` : '\nLe contenu passe toutes les gardes');
process.exit(failed ? 1 : 0);
