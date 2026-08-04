import en from './en';
import fr from './fr';

export type Lang = 'fr' | 'en';

/* Le français est la forme de référence du dictionnaire, et le typage l'impose
   à l'anglais : une clé oubliée dans en.ts est une erreur de `astro check`,
   pas un « undefined » rendu sur une page en ligne. C'est aussi ce qui permet
   de traduire par morceaux sans jamais casser la mise en ligne. */
const DICT: Record<Lang, typeof fr> = { fr, en };

export const t = (lang: Lang) => DICT[lang];

/* Astro.url.pathname sert toujours le chemin FRANÇAIS, y compris sur une page
   réécrite en anglais : c'est donc lui l'entrée, jamais l'inverse. Base.astro
   et LangSwitch.astro en auraient chacun sa propre copie à trois lignes ; un
   seul point de calcul évite que les deux divergent un jour. */
export const bothPaths = (frPath: string): { frPath: string; enPath: string } => ({
  frPath,
  enPath: `/en${frPath}`,
});

/** Le mois de relevé, au format que porte le sceau : « 08 · 2026 ». */
export const stamp = ([y, m]: number[]) => `${String(m).padStart(2, '0')} · ${y}`;

/** Le même mois en « 08/2026 », pour la ligne de relevé de l'en-tête du plan. */
export const survey = ([y, m]: number[]) => `${String(m).padStart(2, '0')}/${y}`;
