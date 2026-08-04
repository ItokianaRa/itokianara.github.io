#!/usr/bin/env node
/* Garde de contenu, exécutée sur le site CONSTRUIT et non sur les sources.
   C'est délibéré : ce qui compte est ce qui part chez le visiteur, et une
   fuite peut naître d'un composant aussi bien que d'un dictionnaire.

   Trois familles, une seule porte.

   ① Les fuites. Le numéro de téléphone ne doit jamais apparaître en clair, et
     aucune origine tierce ne doit être appelée. Ces deux règles vivaient dans
     des étapes shell de la CI chez Lionel, donc hors de `pnpm verify`, donc
     hors du workflow de déploiement : une régression aurait été publiée, et la
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
  {
    /* L'ancienne adresse de NEXTRI, du temps où le collectif publiait depuis
       un dépôt de projet. Il a basculé sur un site d'utilisateur servi à la
       racine, et ce chemin rend désormais une 404. Le site portait les deux
       occurrences, dans Who.astro et Contact.astro, et rien ne l'a signalé :
       un lien sortant cassé ne casse aucune construction. C'est exactement ce
       qu'une porte doit attraper. */
    test: (txt) => /nextrimg\.github\.io\/nextri_portfolio/i.test(txt),
    quoi: 'ancienne adresse de NEXTRI (404 depuis le passage en site utilisateur)',
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
      fail(`zone « ${nom} » introuvable, le motif a dérivé du balisage`);
      return '';
    }
    return m[1];
  };
  const a = count(slice(fr), re);
  const b = count(slice(en), re);
  if (a !== b) fail(`parité FR/EN : ${a} ${nom} en français, ${b} en anglais`);
  else if (a === 0) fail(`aucun élément trouvé pour « ${nom} », le motif a dérivé du balisage`);
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

/* ── ④ typographie ────────────────────────────────────────────────────────
   Sur les SOURCES, jamais sur dist/ : c'est ce qui est écrit qu'il faut
   corriger, et une seule faute produirait sinon autant d'échecs que de pages
   construites.

   Le tiret cadratin est proscrit de tout le dépôt, copie du site comme
   commentaires de code. Ce n'est PAS une règle de typographie française : en
   français, ce tiret est parfaitement correct pour une incise. C'est une règle
   de voix. Il est devenu le signe le plus reconnaissable d'un texte écrit par
   une machine, et ce dépôt est public. Selon ce que le tiret faisait dans la
   phrase, il se remplace par deux-points, une virgule, des parenthèses, ou par
   une phrase coupée en deux.

   Le caractère lui-même n'est jamais écrit en clair ici, seulement construit
   par `fromCharCode` : sinon ce fichier se signalerait, et la porte ne
   pourrait plus jamais sortir à zéro.

   docs/ reste hors périmètre : les spécifications sont des documents de
   travail datés, pas la voix publiée du site. */
const CADRATIN = String.fromCharCode(0x2014);
const TYPO = [
  { motif: new RegExp(CADRATIN), quoi: 'tiret cadratin' },
  /* Double tiret employé comme tiret de prose. Les tirets d'options
     (--frozen-lockfile) et les propriétés personnalisées CSS (--tx3) sont
     collés à un mot et ne sont donc pas visés. */
  { motif: /\s--\s/, quoi: 'double tiret employé comme tiret' },
];
/* Une ligne réduite à trois tirets est un séparateur de frontmatter, dans les
   .astro comme dans les .md : jamais une faute. */
const FRONTMATTER = /^\s*---\s*$/;

for (const racine of ['src', 'scripts', 'tests', '.github']) {
  for (const f of walk(racine)) {
    if (/\.(woff2|png|ico|pdf)$/.test(f)) continue;
    readFileSync(f, 'utf8')
      .split(/\r?\n/)
      .forEach((ligne, i) => {
        if (FRONTMATTER.test(ligne)) return;
        for (const { motif, quoi } of TYPO) {
          if (motif.test(ligne)) fail(`typo ${rel(f)}:${i + 1} : ${quoi}`);
        }
      });
  }
}
console.log('ok   typographie des sources');

console.log(failed ? `\n${failed} échec(s) de contenu` : '\nLe contenu passe toutes les gardes');
process.exit(failed ? 1 : 0);
