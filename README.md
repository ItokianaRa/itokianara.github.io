# Portfolio — Itokiana Rajohnson

Site statique d'une page, bilingue français / anglais, publié sur GitHub Pages
à l'adresse <https://itokianara.github.io>.

Direction artistique : **le document de printemps** — washi, mincho, encre. Le
cerisier est présent mais toujours *dessiné*, jamais écrit : pas d'idéogramme,
des fleurs à cinq pétales échancrés, un rameau fuselé en séparateur, un sceau
en fleur, un lavis sur deux surfaces, des bourgeons sur le poste libre.

## Démarrer

```sh
pnpm install
pnpm dev            # http://localhost:4321
```

## Les commandes qui comptent

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm verify` | La porte complète, la même qu'en intégration continue |
| `pnpm contrast` | Contraste AA de chaque jeton de texte, sur les deux thèmes |
| `pnpm quai` | Cohérence du plan de quai : longueur ∝ durée, pas de chevauchement, libellés qui tiennent |
| `pnpm budget` | JavaScript expédié par page, gzippé, budget 6 Kio |
| `pnpm content` | Fuites dans `dist/`, parité FR/EN, structure |
| `pnpm test` | Playwright, Chromium et Firefox |
| `pnpm fonts` | Re-télécharge les polices sous-ensemblées (à la main, jamais en CI) |
| `pnpm icons` | Régénère les favicons |

`pnpm verify` enchaîne `lint → check → build → contrast → quai → budget →
content`. Elle tourne aussi dans le workflow de déploiement, pas seulement dans
celui d'intégration : les deux partent en parallèle sur un push vers `main`, et
sans elle un site ratant une porte serait publié pendant que l'autre workflow
rougit.

## Ce qui est particulier ici

**Le plan de quai est calculé, pas dessiné.** `src/lib/quai.mjs` porte les
dates ; la longueur de chaque bande vaut sa durée. Corriger une date suffit à
redessiner le plan, et la bande du Ministère grossit d'elle-même à chaque
construction. Tout ce calcul tourne **au build** : le plan ne coûte pas un
octet de JavaScript et reste entier quand JS est désactivé.

**Le budget JavaScript est tenu par mesure, pas par intention.**
`scripts/js-budget.mjs` extrait le corps de chaque `<script>` de chaque page et
le gzippe. Mesuré : **1,4 Kio** sur un budget de 6 Kio, pour le thème, la
révélation du numéro, la couche de mouvement et le défilement amorti.

**Les polices sont auto-hébergées, sous-ensemble `latin` seul.** Zen Old Mincho
est une police japonaise dont la famille complète pèse plusieurs mégaoctets de
kana et de kanji ; le site n'en affiche aucun. Total des trois familles :
**97 Kio**. Aucun appel à Google Fonts en production — `pnpm content` échoue si
un s'y glisse.

**Le contraste est une porte, pas une intention.** Chaque couleur de terrain est
dédoublée : `--kon` pour le graphique, `--kon-t` pour le texte, assombrie
jusqu'à franchir 4,5:1 sur la pire surface du thème. Les valeurs `-t` sont
mesurées par `scripts/contrast.mjs`, pas choisies à l'œil. Le script mesure
aussi le libellé posé à l'intérieur d'une bande du plan, sur l'aplat composé.

**Le numéro de téléphone n'est jamais dans le HTML servi.** Il est encodé et
reconstruit au clic. `pnpm content` et un test Playwright cherchent chacun ses
formes en clair, l'un dans le HTML livré, l'autre dans le DOM après exécution.

## Contenu

Chaque fait affiché trace vers `CV_Itokiana_Rajohnson_MASTER.md`. Les règles du
CV maître s'appliquent au site sans exception :

1. Aucun chiffre indéfendable en entretien technique.
2. Aucune capture d'écran du SIF, du SIGFU, ni des comptes clients d'agence —
   systèmes d'État et comptes d'agence.
3. Aucun projet fictif, aucune démo simulée, aucun profil social inventé.
4. Aucun compteur de vanité.
5. Là où le CV maître est muet, on n'affiche rien : Ketrika, Vidy Varotra et
   Kotikota n'ont pas de pile technique parce que la source n'en donne pas.

Les sources vivent dans `.unwanted/`, **jamais versionné** : elles portent des
numéros et des adresses personnelles, et ce dépôt est public.

## Traduire

Toute la copie est dans `src/i18n/fr.ts` et `src/i18n/en.ts`. Le français est la
forme de référence : `Record<Lang, typeof fr>` dans `utils.ts` fait échouer
`astro check` si une clé manque en anglais. Les longueurs de tableaux, que le
typage ne voit pas, sont comparées par `pnpm content` sur les deux pages
rendues.

Les libellés du plan de quai sont à part, dans `quai-labels.{fr,en}.mjs` : ils
sont lus à la fois par le site et par `scripts/quai-check.mjs`, qui tourne sous
Node hors de la chaîne Astro.

## Déploiement

Push sur `main` → `deploy.yml` → GitHub Pages. `astro.config.mjs` garde `site`
et `base` en un seul endroit : un passage vers un domaine propre ne demande
aucune reprise de code.
