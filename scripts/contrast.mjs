#!/usr/bin/env node
// Vérifie chaque jeton porteur de texte contre la pire surface de son thème.
// Lit src/styles/tokens.css, donc la porte ne peut pas dériver des jetons.
import { readFileSync } from 'node:fs';
import { LANES } from '../src/lib/quai.mjs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

function tokensFor(theme) {
  const block = css.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*{([^}]*)}`, 's'));
  if (!block) throw new Error(`Aucun bloc de jetons pour le thème « ${theme} »`);
  const out = {};
  for (const [, k, v] of block[1].matchAll(/--([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) out[k] = v;
  return out;
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (h) => {
  const [r, g, b] = rgb(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/* Les quatre surfaces sur lesquelles du texte se pose dans le flux normal.
   --wash en fait partie : le bandeau d'autorité et le bloc « Le fil » y posent
   du texte, et rien ne dit a priori que --bg3 soit pire que lui. */
const SURFACES = ['bg', 'bg2', 'bg3', 'wash'];

const PAIRS = [
  { fg: 'tx', on: SURFACES, need: 4.5 },
  { fg: 'tx2', on: SURFACES, need: 4.5 },
  { fg: 'kon-t', on: SURFACES, need: 4.5 },
  { fg: 'ymb-t', on: SURFACES, need: 4.5 },
  { fg: 'wkk-t', on: SURFACES, need: 4.5 },
  { fg: 'sak-t', on: SURFACES, need: 4.5 },
  { fg: 'shu-t', on: SURFACES, need: 4.5 },
  // Le bouton principal : libellé papier sur son aplat vermillon.
  { fg: 'bg', on: ['shu-t'], need: 4.5 },
  // La surface inversée du contact.
  { fg: 'inv-tx', on: ['inv-bg'], need: 4.5 },
  { fg: 'inv-tx2', on: ['inv-bg'], need: 4.5 },
  { fg: 'inv-sak', on: ['inv-bg'], need: 4.5 },
  { fg: 'inv-shu', on: ['inv-bg'], need: 4.5 },
];

let failed = 0;
const check = (theme, fg, bg, need, note) => {
  const r = ratio(fg, bg);
  const ok = r >= need;
  if (!ok) failed++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${theme.padEnd(5)} ${note}: ${r.toFixed(2)} (seuil ${need})`,
  );
};

for (const theme of ['light', 'dark']) {
  const t = tokensFor(theme);
  for (const { fg, on, need } of PAIRS) {
    if (!t[fg]) {
      console.error(`FAIL ${theme}: jeton --${fg} absent`);
      failed++;
      continue;
    }
    for (const bgName of on) {
      if (!t[bgName]) {
        console.error(`FAIL ${theme}: jeton --${bgName} absent`);
        failed++;
        continue;
      }
      check(theme, t[fg], t[bgName], need, `--${fg} sur --${bgName}`);
    }
  }
}

/* Les bandes du plan de quai posent leur libellé SUR l'aplat de la bande, pas
   sur le papier : la couleur du rôle composée à son opacité de rendu. Sans ce
   bloc, changer une couleur de terrain ou faire entrer un libellé dans une
   bande plus claire ferait tomber le texte sous 4,5:1 sans que rien ne le
   signale. Seules les bandes qui portent réellement un libellé intérieur sont
   mesurées : basculer `inside` à true dans quai.mjs fait donc entrer la bande
   dans la porte, ce qui est exactement le moment où la question se pose. */
const BAR_ALPHA = 0.86;
const compose = (bg, fg, a) =>
  `#${rgb(bg)
    .map((v, i) => Math.round(v * (1 - a) + rgb(fg)[i] * a))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;

for (const theme of ['light', 'dark']) {
  const t = tokensFor(theme);
  for (const lane of LANES) {
    for (const bar of lane.bars) {
      if (!bar.inside) continue;
      if (!t[lane.role]) {
        console.error(`FAIL ${theme}: jeton --${lane.role} absent (bande ${bar.id})`);
        failed++;
        continue;
      }
      const fill = compose(t.bg, t[lane.role], BAR_ALPHA);
      check(theme, t.bg, fill, 4.5, `--bg sur la bande ${bar.id} (--${lane.role} @ ${BAR_ALPHA})`);
    }
  }
}

console.log(failed ? `\n${failed} échec(s) de contraste` : '\nToutes les paires passent WCAG AA');
process.exit(failed ? 1 : 0);
