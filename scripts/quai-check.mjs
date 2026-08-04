#!/usr/bin/env node
/* Porte du plan de quai. Trois choses qu'un œil ne rattrape pas :

   ① Longueur ∝ durée. C'est la promesse du plan. Une bande dont la largeur ne
     vaut plus sa durée transforme un relevé honnête en illustration.
   ② Les bandes d'un même poste ne se chevauchent pas, et aucune ne sort du
     cadre. Un chevauchement dirait deux missions simultanées ; c'est faux.
   ③ Un libellé déclaré `inside` tient réellement dans sa bande à 390 px, dans
     les DEUX langues. La maquette mesurait ça dans le navigateur ; ici le
     libellé est posé au build, donc la vérification remplace la mesure. */
import { quai } from '../src/lib/quai.mjs';
import en from '../src/i18n/quai-labels.en.mjs';
import fr from '../src/i18n/quai-labels.fr.mjs';

/* Largeur de piste au pire cas : 390 px d'écran, moins deux gouttières de
   4vw (15,6 px), moins les 2 × 1 px de bordure et le rembourrage du bloc du
   plan (1 rem de chaque côté sous 640 px). Sous 640 px la colonne de libellé
   de poste passe à 0 (--lanelbl), donc la piste occupe toute la largeur. */
const TRACK_MIN = 390 - 2 * 15.6 - 2 * 1 - 2 * 16;

/* JetBrains Mono à .585rem = 9,36 px, chasse fixe 0,6 em, plus .08 em
   d'approche, en capitales. Le rembourrage intérieur du libellé vaut .65 rem
   à gauche et une marge de respiration à droite. Estimation volontairement
   généreuse : c'est une porte, elle doit se déclencher AVANT que ça déborde. */
const CH = 9.36 * (0.6 + 0.08);
const PAD = 24;
const textWidth = (s) => s.length * CH + PAD;

const plan = quai();
let failed = 0;
const fail = (msg) => {
  console.error(`FAIL ${msg}`);
  failed++;
};

// ① et ②
for (const lane of plan.lanes) {
  let prevRight = -Infinity;
  for (const bar of lane.bars) {
    const expected = (bar.months / plan.span) * 100;
    if (Math.abs(bar.width - expected) > 0.01) {
      fail(
        `bande ${bar.id} : largeur ${bar.width.toFixed(2)} % pour ${bar.months} mois, attendu ${expected.toFixed(2)} %`,
      );
    }
    if (bar.left < -0.01 || bar.left + bar.width > 100.01) {
      fail(
        `bande ${bar.id} : sort du cadre (${bar.left.toFixed(2)} % → ${(bar.left + bar.width).toFixed(2)} %)`,
      );
    }
    if (bar.left < prevRight - 0.01) {
      fail(`poste ${lane.id} : la bande ${bar.id} chevauche la précédente`);
    }
    prevRight = bar.left + bar.width;
    console.log(
      `ok   ${lane.id}/${bar.id} : ${bar.months} mois → ${bar.width.toFixed(2)} % à ${bar.left.toFixed(2)} %`,
    );
  }
}

// ③
for (const [lang, dict] of [
  ['fr', fr],
  ['en', en],
]) {
  for (const lane of plan.lanes) {
    for (const bar of lane.bars) {
      const label = dict.bars[bar.id];
      if (label === undefined) {
        fail(`libellé ${lang} manquant pour la bande ${bar.id}`);
        continue;
      }
      if (!bar.inside || !label) continue;
      const avail = (bar.width / 100) * TRACK_MIN;
      const need = textWidth(label);
      if (need > avail) {
        fail(
          `bande ${bar.id} (${lang}) : « ${label} » demande ${need.toFixed(0)} px, la bande n'en offre que ${avail.toFixed(0)} px à 390 px. Passer « inside » à false dans src/lib/quai.mjs.`,
        );
      } else {
        console.log(
          `ok   ${bar.id} (${lang}) : libellé intérieur, ${need.toFixed(0)} px sur ${avail.toFixed(0)} px`,
        );
      }
    }
  }
}

console.log(failed ? `\n${failed} échec(s) sur le plan de quai` : '\nLe plan de quai est cohérent');
process.exit(failed ? 1 : 0);
