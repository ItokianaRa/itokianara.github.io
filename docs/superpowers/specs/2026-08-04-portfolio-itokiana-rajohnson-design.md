# Portfolio Itokiana Rajohnson · spec

**Date** : 4 août 2026 · **Statut** : conception validée, implémentée
**Maquette de référence** : `.unwanted/preview.html` (D.A. « document de printemps », cerisier)
**Sources factuelles** : `.unwanted/about/masters/CV_Itokiana_Rajohnson_MASTER.md` (21/07/2026)
**Socle repris de** : `E:\Dev\lionel-ratovo-portfolio` : même stack, mêmes portes de vérification

---

## 0. Décisions arrêtées

| Sujet | Décision |
|---|---|
| Accord en français | **Féminin**, comme la maquette. Le CV maître écrit au masculin ; arbitré le 04/08/2026 en faveur de la maquette. |
| Arborescence | **Page unique** + `/en/` + 404. Pas d'étude de cas séparée : la maquette n'y renvoie nulle part et le coût réel serait la rédaction. |
| Langues | Bilingue FR / EN, **FR par défaut**, sans préfixe |
| Stack | Astro 7 + Tailwind 4, statique, zéro dépendance runtime |
| Déploiement | GitHub Pages, `ItokianaRa/itokianara.github.io`, site d'utilisateur servi à la racine |
| CV | Le PDF existant (`CV_Itokiana_Rajohnson_04_2026.pdf`), FR seul, même lien dans les deux langues |
| Thème | Trois états cycliques système → clair → sombre, défaut « système » |
| Contact | E-mail en entités numériques · téléphone révélé au clic · lien NEXTRI |

**Pourquoi cette reprise plutôt qu'une construction neuve.** Le portfolio de
Lionel a coûté cher parce qu'il a été construit de zéro en découvrant chaque
décision au fil de l'eau. Ici le socle est déjà payé : thème, i18n, mouvement,
portes de vérification, CI. Seuls diffèrent les jetons, les polices, la pièce
maîtresse et le contenu. Aucun super-PRD n'a été rédigé pour ce projet ; ce
document tient lieu de trace, et le code porte le reste en commentaires.

---

## 1. La thèse

> **Ce qui se décide en réunion, je le fais arriver en production.**

L'angle est **la passerelle** : entre le Ministère et les développeurs, entre
les testeurs et les développeurs, entre Madagascar et Maurice. Ce n'est pas une
formule, c'est ce que le CV maître documente sur les trois terrains, et c'est
le bloc « Le fil » qui le nomme explicitement.

**Pourquoi cet angle.** Un développeur full stack de plus, il y en a des
milliers. Quelqu'un qui code *et* tient la circulation entre trois parties qui
n'ont pas de langue commune, beaucoup moins. Et il est défendable en entretien,
ce qui n'aurait pas été le cas d'un angle « architecte ».

**Le risque, et sa neutralisation.** Un recruteur purement technique peut lire
« elle code moins ». Chaque affirmation de conduite est donc ancrée dans un
fait technique nommé, et la section 03 est entièrement faite de livraisons.

## 2. Règles de contenu, non négociables

Reprises du CV maître et étendues au site. Elles priment sur toute
considération esthétique.

1. **Aucun chiffre indéfendable en entretien technique.**
2. **Aucune capture d'écran** du SIF, du SIGFU, ni des comptes Mercedes-Benz,
   Smart ou Pampers : systèmes d'État et comptes clients d'agence.
3. **Aucun projet fictif**, aucune démo simulée, **aucun profil social**. Le CV
   maître n'en mentionne aucun, en afficher un serait un fait fabriqué.
4. **Aucun compteur de vanité.**
5. **Là où la source est muette, le site est muet.** Ketrika, Vidy Varotra et
   Kotikota n'affichent aucune pile technique parce que le CV maître n'en donne
   pas ; la déduire de la liste de compétences serait de la fabrication.
6. **Les deux entrées BICI restent distinctes** (décision du 21/07/2026) : c'est
   du consultanat, le travail est fait chez le client. La continuité d'emploi
   se lit sur le filet d'armateur du plan, pas par une fusion des lignes.

## 3. Direction artistique

Le problème est le même que chez Lionel : **un portfolio de développeuse sans
une seule capture d'écran**. Le vide visuel est le vrai risque.

La réponse est le cerisier, dessiné et jamais écrit, sans idéogramme, parce
qu'un caractère qu'on ne sait pas lire est un décor exotique alors qu'une fleur
se lit sans traduction.

- **Fibre de washi** en superposition, turbulence anisotrope (0,86 × 0,022) :
  c'est ce rapport qui donne des fibres couchées et non un bruit uniforme.
- **Pétale échancré**, cinq par fleur, posés à 70°/76°/68°/74°/72° et à des
  échelles variant de 3 % : une fleur vraie n'est pas symétrique, et l'œil lit
  la symétrie parfaite comme du gabarit.
- **Rameau fuselé** en séparateur, pleine largeur, sortant du cadre.
- **Sceau** : un hanko en fleur, qui ne marque que la ligne d'aujourd'hui.
- **Lavis de fleur** (`--wash`) sur deux surfaces seulement.

### La pièce maîtresse : le plan de quai

Le hero n'affiche pas de photo mais **le parcours dessiné en plan d'occupation
de postes portuaires**. Un poste par employeur, une bande par mission, et
**la longueur de chaque bande vaut sa durée**.

| Poste | Bande | Période | Mois | Rôle |
|---|---|---|---:|---|
| Ministère · Côte d'Ivoire | SIF · SIGFU | 01/2024 → | 31 | `kon` |
| BICI · Antananarivo | (sans libellé) | 03/2021 – 04/2021 | 2 | `ymb` |
| BICI · Antananarivo | Capitainerie · Fonds routier | 02/2023 – 01/2024 | 12 | `ymb` |
| RAPP IO · Maurice | Mercedes-Benz · Smart · Pampers | 05/2021 – 01/2023 | 21 | `wkk` |
| **Poste libre** | Seule · ou à trois avec NEXTRI | les 12 prochains mois | 12 | `sak` |

Le **filet d'armateur** court de 03/2021 à 01/2024 : BICI paie sans
interruption, y compris pendant la mission RAPP IO. Il dit la continuité
d'emploi sans fusionner les entrées, et le trou apparent du parcours disparaît
sans qu'une ligne du CV ait bougé.

Le **poste libre** est un hameçon d'inachèvement, coté à la même échelle que le
travail réel, et il porte la passerelle NEXTRI. C'est le seul endroit du plan
où la fleur est dessinée : deux bourgeons fermés, une seule fleur ouverte : la
branche est en train de s'ouvrir, elle ne l'est pas déjà.

**Écart assumé avec la maquette.** Là-bas le plan était construit en JavaScript
au chargement, donc payé par chaque visiteur et invisible sans JS. Ici le calcul
tourne au build (`src/lib/quai.mjs`) et `Quai.astro` en rend le résultat en HTML
statique. Conséquence sur la décision « le libellé tient-il dans la bande ? » :
la maquette la tranchait en mesurant le texte dans le navigateur, ce qui est
impossible au build. Elle est donc **déclarée** (`inside: true|false`) puis
**vérifiée** par `scripts/quai-check.mjs`, qui recalcule la largeur rendue à
390 px et la compare à la largeur estimée du libellé dans les deux langues.

## 4. Couleur

Quatre couleurs de terrain, et elles portent du sens. C'est la seule chose que
le rose ne prend pas. Chacune est dédoublée graphique / texte, comme chez
Lionel : `--kon` pour les aplats, `--kon-t` pour le texte, assombrie jusqu'à
franchir 4,5:1 sur la pire surface du thème.

| Jeton | Terrain |
|---|---|
| `--kon` 紺 | Foncier · Ministère |
| `--ymb` 山吹 | Portuaire · SPAT |
| `--wkk` 若草 | Marques internationales |
| `--sak` 灰桜 | Le poste libre, et l'ornement |
| `--shu` 朱 | Le sceau, l'action, la ligne d'aujourd'hui |

Le rose est un rose de teinture ancienne, *haizakura*, cendré, et non un rose
bonbon : chroma basse, teinte vers la terre cuite, il se pose sur le papier
crème sans crier.

**Une valeur a été changée par la porte, pas par le goût** : `--kon` en thème
sombre passait à 4,27:1 sous le libellé posé dans la bande du SIF. Éclairci de
`#6d93c4` à `#7fa3d0`, il donne 5,13:1.

## 5. Typographie

| Rôle | Famille | Poids servis |
|---|---|---|
| Titres | **Zen Old Mincho** | 700, 900 : **deux fichiers, famille non variable** |
| Corps | **Archivo** | variable 400–600, un fichier |
| Faits, cotes | **JetBrains Mono** | variable 400–500, un fichier |

Sous-ensemble `latin` standard de Google, jamais un sous-ensemble sur mesure
via `text=` : ce dernier lierait les polices à un instantané de la copie, et la
première phrase ajoutée réintroduirait le défaut en silence.

**Zen Old Mincho justifie le script à elle seule** : famille japonaise de
plusieurs mégaoctets dont le site n'affiche aucun glyphe. Et elle n'est **pas
variable**. Déclarer `font-weight: 400 900` sur un fichier unique ferait
synthétiser un faux gras pour le `h1`, ce qui se voit immédiatement sur un
mincho.

Mesuré : **97 Kio** pour les trois familles, budget 110 Kio, vérifié par
`scripts/fonts.mjs`. Préchargement de Zen Old Mincho 900 seul, qui porte le LCP.

## 6. Mouvement

`ease-out-expo` partout, aucun rebond. Rien n'anime de propriété de mise en
page : `transform`, `opacity`, `clip-path` seulement.

- **① Entrée** : l'accostage des bandes, du plus ancien au plus récent, puis
  les libellés, puis le sceau qui tombe. C'est le pic. Animation CSS pure,
  donc elle se joue aussi sans JavaScript.
- **② Défilement** : timelines CSS natives (`animation-timeline: view()`), avec
  repli `IntersectionObserver` pour Firefox et Safari.
- **③ Amortissement** : implémentation maison, sans dépendance, souris
  uniquement, coupée par `prefers-reduced-motion`.

Tout le fichier vit sous `prefers-reduced-motion: no-preference`.

**Collision relevée le 04/08/2026** : la couche de mouvement héritée de Lionel
posait la classe `.in` sur les blocs révélés, alors que la maquette utilise
déjà `.in` comme conteneur de mise en page (`.hdr .in`, `.hero .in`,
`.auth .in`, `.ftr .in`). Le hero devenait lui-même une grille à deux colonnes,
titre d'un côté, pastille et chapeau de l'autre. L'état s'appelle désormais
`.shown`. Aucun test ne l'avait vu : c'est une vérification visuelle qui l'a
trouvé.

### Le favicon

Tuile de papier crème, **l'initiale d'Itokiana en encre**, filet vermillon en
pied. Les trois couleurs sont celles du thème clair, et la lettre composée dans Zen Old
Mincho, la police de titre du site. Le favicon est un fragment de la page, pas
un logo posé à côté.

La première version portait une fleur, au motif qu'un « I » dans 16 px serait
une barre verticale indistinguable. L'objection ne tenait que pour un
grotesque : en mincho, le « I » capital porte deux fortes barres horizontales
en tête et en pied, et la silhouette obtenue est large et refermée. Vérifié au
rendu à 16, 32 et 48 px, pas déduit.

Deux drapeaux Chromium sont indispensables au rendu (`scripts/icons.mjs`) :
`--disable-lcd-text`, sans quoi le crénelage sous-pixel dépose des franges
orange et bleues le long des jambages, justes sur une dalle RVB dans cet
ordre, parasites partout ailleurs ; et `--force-color-profile=srgb`, sans quoi
les trois couleurs dérivent selon l'écran de la machine qui lance le script.

## 7. Accessibilité

| Exigence | Niveau |
|---|---|
| Contraste texte | AA sur les deux thèmes, **zéro échec, vérifié par script** |
| Mouvement | `prefers-reduced-motion` neutralise tout |
| Sémantique | `header`/`main`/`section`/`article`/`footer`, un seul `h1`, vérifié |
| Plan de quai | `role="img"` + `aria-label` décrivant le contenu, pas la forme |
| Lien d'évitement | premier élément focusable |
| Cible tactile | 44 × 44 px minimum |

## 8. Vérification

`pnpm verify` = `lint → check → build → contrast → quai → budget → content`,
branchée dans **les deux** workflows.

Playwright, Chromium et Firefox, 24 cas :

1. Chaque lien de navigation atteint sa section, dans les deux langues.
2. Le CV se télécharge et commence bien par `%PDF` : un 200 seul laisserait
   passer une page d'erreur ou un fichier tronqué.
3. Le numéro est absent de la source et révélé au clic.
4. La bascule de langue mène à la page équivalente, jamais à l'accueil.
5. Le thème cycle sur trois états, persiste, et cesse de suivre l'OS dès
   qu'une préférence explicite est posée.
6. **Le plan est rendu sans JavaScript**, avec des bandes de largeur réelle.
7. Aucun élément du plan ne déborde à 390, 768 et 1440 px, et la page ne
   défile jamais horizontalement.

**Pas de tests unitaires.** Il n'y a pas de logique à tester sur un site de
contenu, hors la géométrie du plan, et celle-là a sa propre porte.

## 9. Ce qui reste ouvert

1. **Le PDF du CV est celui d'avril 2026, en français seul.** Le bouton porte
   le même lien dans les deux langues. Le jour où une version anglaise existe,
   c'est un fichier à déposer et une ligne à changer.
2. **Aucune image de partage (`og:image`).** Les métadonnées OpenGraph sont
   posées sans vignette ; un partage sur LinkedIn ou WhatsApp rendra donc une
   carte sans image.
3. **Lighthouse n'a pas été passé.** Les budgets sont tenus et mesurés (JS
   1,4 Kio gzip, polices 97 Kio), mais le score lui-même reste à relever à la
   main avant la mise en ligne.
4. **La photo.** Le hero fonctionne sans, et rien n'en dépend. L'ajouter
   demanderait de reprendre la grille du hero, où le plan occupe la colonne
   droite.
