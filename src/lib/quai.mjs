/* ═══ Le plan de quai ═══════════════════════════════════════════════════════
   La géométrie n'est pas dessinée : elle est calculée depuis les dates.
   Corriger une date suffit à redessiner le plan, et la bande du Ministère
   grossit d'elle-même à chaque construction. C'est ce qui rend le plan
   honnête — longueur ∝ durée, sans exception.

   Différence avec la maquette : là-bas tout était bâti par du JavaScript au
   chargement, donc payé par chaque visiteur et invisible sans JS. Ici le même
   calcul tourne au BUILD, et Quai.astro en rend le résultat en HTML statique.
   Le plan ne coûte plus un octet de JavaScript.

   Aucun libellé français ici : les mots vivent dans src/i18n/, parce que le
   plan est bilingue et que la géométrie ne l'est pas. Ce fichier ne connaît
   que des identifiants, des dates et des rôles de couleur. ────────────────── */

/** Origine du plan : mars 2021, première entrée du CV maître. */
const T0 = [2021, 3];

/** Le poste libre, en mois. Coté à la même échelle que le travail réel. */
const HORIZON = 12;

/* Un poste par employeur ou par terrain, une bande par mission.
   `role` est un jeton de couleur de tokens.css, jamais une couleur littérale.

   `inside` dit si le libellé tient DANS la bande ou s'il se pose à côté, sur
   le papier. La maquette tranchait en mesurant le texte dans le navigateur ;
   ici la décision est déclarée, puis vérifiée mécaniquement par
   scripts/quai-check.mjs, qui recalcule la largeur rendue de chaque bande à
   390 px et la compare à la largeur estimée de son libellé dans les deux
   langues. Déclarer plutôt que mesurer supprime le seul script que le plan
   demandait encore au navigateur ; le vérifier empêche la déclaration de
   devenir fausse en silence le jour où un libellé s'allonge. */
export const LANES = [
  {
    id: 'min',
    role: 'kon',
    bars: [{ id: 'sif', from: [2024, 1], to: 'now', inside: true }],
  },
  {
    id: 'bici',
    role: 'ymb',
    bars: [
      // Mars–avril 2021 : deux mois, avant les missions internationales. Trop
      // courte pour porter un libellé — la bande se lit par sa position sur
      // le poste et par le filet d'armateur qui part d'elle.
      { id: 'bici21', from: [2021, 3], to: [2021, 5] },
      { id: 'spat', from: [2023, 2], to: [2024, 2], inside: false },
    ],
  },
  {
    id: 'rapp',
    role: 'wkk',
    bars: [{ id: 'rapp', from: [2021, 5], to: [2023, 2], inside: false }],
  },
  {
    id: 'free',
    role: 'sak',
    bars: [{ id: 'free', from: 'now', to: 'end', free: true, inside: false }],
  },
];

/* Le filet d'armateur. BICI paie sans interruption de mars 2021 à janvier
   2024, y compris pendant la mission RAPP IO : c'est du consultanat, le
   travail est fait chez le client, mais l'employeur ne change pas. Le CV
   maître exige que les entrées restent DISTINCTES ; ce filet dit la
   continuité d'emploi sans les fusionner, et le trou apparent du parcours
   disparaît sans qu'une ligne du CV ait bougé. */
export const CONTRACT = { from: [2021, 3], to: [2024, 2] };

/** Graduations de l'axe. Pas de repère 2021 : l'origine du plan est mars,
 *  pas janvier, et une graduation posée au bord mentirait d'un trimestre. */
const AXIS_FROM = 2022;

/** Rang du mois depuis l'origine. */
const rank = ([y, m]) => (y - T0[0]) * 12 + (m - T0[1]);

/** Le mois courant, tronqué. Passer une date explicite rend le calcul
 *  reproductible dans les tests et dans quai-check.mjs. */
export const monthOf = (d = new Date()) => [d.getFullYear(), d.getMonth() + 1];

const addMonths = ([y, m], n) => {
  const i = y * 12 + (m - 1) + n;
  return [Math.floor(i / 12), (i % 12) + 1];
};

/**
 * Résout le plan complet pour un mois donné.
 * Tout est en pourcentage de l'empan, donc indépendant de la largeur rendue.
 */
export function quai(now = monthOf()) {
  const end = addMonths(now, HORIZON);
  const span = rank(end);
  const at = (d) => (d === 'now' ? now : d === 'end' ? end : d);
  const pct = (d) => (rank(at(d)) / span) * 100;

  let order = 0;
  const lanes = LANES.map((lane) => ({
    id: lane.id,
    role: lane.role,
    bars: lane.bars.map((b) => {
      const left = pct(b.from);
      const width = pct(b.to) - left;
      return {
        id: b.id,
        free: !!b.free,
        inside: !!b.inside,
        left,
        width,
        months: Math.round((width / 100) * span),
        /* Le libellé posé sur le papier va à droite de la bande, et bascule à
           gauche quand il n'y a plus de place à droite. Décidé ici sur la
           seule géométrie — aucune mesure de texte n'entre dans ce choix,
           donc il est stable d'une langue à l'autre. */
        flip: left + width > 55,
        /* L'accostage se joue bande par bande, de la plus ancienne à la plus
           récente : le plan se remplit dans le sens du temps. */
        delay: 0.3 + order++ * 0.15,
      };
    }),
  }));

  return {
    lanes,
    span,
    now,
    end,
    nowPct: pct('now'),
    /* Les années tombant dans l'empan, janvier par janvier. */
    years: Array.from({ length: end[0] - AXIS_FROM + 1 }, (_, i) => AXIS_FROM + i)
      .map((y) => ({ y, left: pct([y, 1]) }))
      .filter((t) => t.left >= 0 && t.left <= 100),
    contract: {
      left: pct(CONTRACT.from),
      width: pct(CONTRACT.to) - pct(CONTRACT.from),
    },
    /* Le poste libre porte ses bourgeons : c'est la branche qui n'a pas encore
       fleuri, et le seul endroit du plan où la fleur est dessinée. Deux
       bourgeons fermés et une seule fleur ouverte — la branche est en train de
       s'ouvrir, elle ne l'est pas déjà. */
    buds: [
      { left: 18, top: 26, size: 7, kind: 'bud', rotate: -18 },
      { left: 49, top: 62, size: 11, kind: 'blossom', rotate: 24 },
      { left: 79, top: 30, size: 6.5, kind: 'bud', rotate: 52 },
    ],
  };
}
