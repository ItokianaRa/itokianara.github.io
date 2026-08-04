/* The berth plan, in English. See quai-labels.fr.mjs for why this is .mjs.
   Same keys, same order: a missing key fails scripts/quai-check.mjs. */
export default {
  title: 'Berth occupancy plan',
  survey: 'Scale 1 month · surveyed {date}',
  alt: 'Berth occupancy plan of the career. Each band is as long as the assignment lasted: the SIF land system and the SIGFU portal for the Ivorian Ministry since January 2024, the harbour master and road fund applications at BICI from February 2023 to January 2024, the Mercedes-Benz, Smart and Pampers accounts at RAPP IO from May 2021 to January 2023, and a twelve-month open berth for the next project.',
  lanes: {
    min: "Ministry · Côte d'Ivoire",
    bici: 'BICI · Antananarivo',
    rapp: 'RAPP IO · Mauritius',
    free: 'Open berth',
  },
  bars: {
    sif: 'SIF · SIGFU',
    bici21: '',
    spat: 'Harbour master · Road fund',
    rapp: 'Mercedes-Benz · Smart · Pampers',
    free: 'Alone · or three-strong with NEXTRI',
  },
  legend: {
    kon: 'Land registry · Ministry',
    ymb: 'Port · SPAT',
    wkk: 'International brands',
    free: 'Open berth · 12 months',
  },
  contract: {
    label: 'Employer',
    text: 'Under BICI contract · 03/2021 → 01/2024',
  },
  today: 'Today',
};
