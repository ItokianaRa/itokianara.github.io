/* Les mots du plan de quai, en français.
   ────────────────────────────────────────────────────────────────────────────
   Pourquoi ce fichier est en .mjs et non dans fr.ts : scripts/quai-check.mjs
   tourne sous Node, hors de la chaîne de compilation d'Astro, et doit lire ces
   libellés pour vérifier qu'un titre déclaré « intérieur » tient réellement
   dans sa bande à 390 px. Un fichier .mjs est le seul format que les deux
   côtés lisent sans outillage supplémentaire. fr.ts l'importe et le repose
   sous `quai`, donc il n'y a toujours qu'une seule source. */
export default {
  title: "Plan d'occupation des postes",
  /* {date} est remplacé par le mois de la construction : le plan se relève
     tout seul, il n'y a pas de date à tenir à jour à la main. */
  survey: 'Éch. 1 mois · relevé {date}',
  alt: "Plan d'occupation des postes du parcours. La longueur de chaque bande est proportionnelle à sa durée : le système foncier SIF et le portail SIGFU pour le Ministère ivoirien depuis janvier 2024, la capitainerie et le fonds routier chez BICI de février 2023 à janvier 2024, les comptes Mercedes-Benz, Smart et Pampers chez RAPP IO de mai 2021 à janvier 2023, et un poste libre de douze mois ouvert au prochain projet.",
  lanes: {
    min: "Ministère · Côte d'Ivoire",
    bici: 'BICI · Antananarivo',
    rapp: 'RAPP IO · Maurice',
    free: 'Poste libre',
  },
  bars: {
    sif: 'SIF · SIGFU',
    // Deux mois : la bande est trop courte pour porter un mot, et elle se lit
    // par sa position sur le poste BICI et par le filet d'armateur.
    bici21: '',
    spat: 'Capitainerie · Fonds routier',
    rapp: 'Mercedes-Benz · Smart · Pampers',
    free: 'Seule · ou à trois avec NEXTRI',
  },
  legend: {
    kon: 'Foncier · Ministère',
    ymb: 'Portuaire · SPAT',
    wkk: 'Marques internationales',
    free: 'Poste libre · 12 mois',
  },
  contract: {
    label: 'Armateur',
    text: 'Sous contrat BICI · 03/2021 → 01/2024',
  },
  today: "Aujourd'hui",
};
