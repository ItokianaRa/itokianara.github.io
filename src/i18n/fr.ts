import quai from './quai-labels.fr.mjs';

/* Toute la copie française du site.
   ────────────────────────────────────────────────────────────────────────────
   Chaque fait affiché ici trace vers .unwanted/about/masters/
   CV_Itokiana_Rajohnson_MASTER.md, dont les règles s'appliquent au site sans
   exception : aucun chiffre indéfendable en entretien, aucune capture d'écran
   des systèmes d'État ou des comptes d'agence, aucun projet inventé, aucun
   compteur de vanité. scripts/content-check.mjs vérifie mécaniquement que rien
   n'est entré ici qui ne soit dans le CV maître.

   L'accord est au féminin, comme la maquette validée. */
export default {
  nav: {
    who: 'Qui je suis',
    work: 'Comment je travaille',
    delivered: "Ce que j'ai livré",
    path: 'Parcours',
    contact: 'Contact',
  },
  skip: 'Aller au contenu',
  themeLabel: 'Thème',
  themeStates: { system: 'système', light: 'clair', dark: 'sombre' },
  langSwitch: 'Version anglaise',
  name: 'Itokiana Rajohnson',

  meta: {
    title: 'Itokiana Rajohnson · Développeuse Full Stack Senior',
    // Repris tel quel par le JSON-LD Person de Base.astro.
    jobTitle: 'Développeuse Full Stack Senior',
    description:
      'Développeuse Full Stack Senior et appui à la conduite de projet, à Antananarivo. Cinq ans sur des systèmes déjà en production : système foncier national ivoirien, applications portuaires, comptes web de marques internationales.',
  },

  hero: {
    status: 'Ouverte aux opportunités',
    // L'accent porte le filet rose : c'est le seul mot souligné de la page.
    title: 'Ce qui se décide en réunion, je le fais',
    titleAccent: 'arriver en production',
    lead: "Développeuse Full Stack Senior. Cinq ans sur des systèmes qui tournent déjà quand j'arrive : un système foncier national, une capitainerie de port, les comptes web de marques internationales.",
    places: ['Antananarivo', 'Abidjan', 'Maurice'],
    ctaCv: 'Télécharger le CV',
    ctaContact: 'Me contacter',
  },

  quai,

  authority: {
    label: "Systèmes et comptes sur lesquels j'ai travaillé",
    items: [
      { context: "Côte d'Ivoire · via IGN FI", name: "Ministère de l'Urbanisme" },
      { context: 'Gestion portuaire', name: 'SPAT' },
      { context: 'Compte international', name: 'Mercedes-Benz' },
      { context: 'Compte international', name: 'Pampers' },
    ],
  },

  who: {
    n: '01',
    heading: 'Qui je suis',
    body: [
      "Itokiana Rajohnson, depuis Antananarivo. Je travaille sur des systèmes déjà en service quand j'arrive : un système foncier national en pleine refonte, des applications portuaires en production, des comptes web de marques internationales.",
    ],
    // Le second paragraphe porte le lien NEXTRI : il est découpé pour que le
    // lien vive dans le balisage et non dans une chaîne de traduction.
    bodyBeforeLink:
      "Je code, et j'assure la circulation entre le client, les testeurs et l'équipe de développement : recueil du besoin, spécification, chiffrage, suivi des correctifs jusqu'à la livraison stable. Je viens seule quand le chantier tient dans une personne. Quand il dépasse, nous sommes trois : ",
    nextriLink: 'NEXTRI',
    bodyAfterLink: ", collectif d'ingénieurs à Antananarivo.",
    /* Fiche d'escale, de portée unique : tout ce qu'elle contient vaut pour la
       carrière entière. « 2021 » et non « 5 ans » : une date de départ ne
       dérive jamais. */
    fiche: [
      { label: 'En activité depuis', value: '2021' },
      { label: 'Missions', value: '4' },
      { label: 'Terrains', value: "Côte d'Ivoire · Maurice · Madagascar" },
      { label: 'Équipes encadrées', value: "Jusqu'à 15 développeurs" },
      { label: 'Formation', value: 'Master MIAGE · MBDS' },
      // Le CV maître est précis : anglais lu et écrit, très peu à l'oral. Le
      // site publie une version anglaise ; laisser « Anglais » seul laisserait
      // entendre un oral courant que le CV ne revendique pas.
      { label: 'Langues', value: 'Malagasy · Français · Anglais (lu, écrit)' },
    ],
  },

  work: {
    n: '02',
    heading: 'Comment je travaille',
    /* Trois temps, trois terrains DIFFÉRENTS. La règle est mécanique, pas
       éditoriale : chaque compétence est prouvée par une mission distincte,
       et c'est elle qui empêche la page de redevenir un monologue sur le SIF. */
    steps: [
      {
        role: 'kon',
        title: 'Cadrer',
        field: "Ministère de l'Urbanisme · via IGN FI",
        body: "Les besoins exprimés en réunion client deviennent des spécifications techniques et des estimations de charge. Sur plus de cinq sprints, ces estimations ont servi de base au planning de l'équipe.",
      },
      {
        role: 'ymb',
        title: "Livrer sur de l'existant",
        field: 'BICI · Antananarivo',
        body: "Modules RH et gestion de stocks intégrés dans une base de code existante et non documentée, sans interruption du service en production. Scénarios de test construits, corrections suivies jusqu'à clôture.",
      },
      {
        role: 'wkk',
        title: 'Tenir une équipe distribuée',
        field: 'RAPP IO Mauritius',
        body: "Coordination, avec un collègue, de l'équipe de Madagascar (huit personnes) sur les comptes Mercedes-Benz, Smart et Pampers : qualité de son travail et soutien technique, et liaison entre Madagascar et Maurice.",
      },
    ],
    thread: {
      label: 'Le fil',
      body: "Sur les trois terrains, la même place : entre deux parties qui n'ont pas de langue commune, et que quelqu'un doit tenir ensemble pour que la livraison arrive.",
      items: [
        'Le Ministère et les développeurs',
        'Les testeurs et les développeurs',
        'Madagascar et Maurice',
      ],
    },
  },

  delivered: {
    n: '03',
    heading: "Ce que j'ai livré",
    items: [
      {
        role: 'kon',
        client: "Ministère de l'Urbanisme, du Logement et du Cadre de Vie",
        place: "Côte d'Ivoire · via IGN FI",
        period: 'Janvier 2024 → présent',
        title: 'SIF & Portail SIGFU',
        body: "Développement des fonctionnalités métier du système foncier national et du portail public associé. Refonte du module de demande en ligne : d'une seule demande par lot et par demandeur, à la prise en charge de plusieurs demandeurs et plusieurs lots, conformément aux usages réels remontés par le client. Et, en parallèle du code, la passerelle entre l'équipe de test et les développeurs, pour que les livrables tiennent.",
        facts: ['9 développeurs · 3 testeurs', 'Plus de 5 sprints chiffrés'],
      },
      {
        role: 'ymb',
        client: 'BICI',
        place: 'Antananarivo',
        period: 'Février 2023 → janvier 2024',
        title: 'SPAT Capitainerie & Fonds Routier',
        body: "Pilotage de la livraison sur des applications métier déjà en production : facturation et opérations de quai. Intégration de nouveaux modules RH et gestion de stocks en reprenant une base de code non documentée, sans interruption du service. Tâches distribuées et cadrées auprès de l'équipe, à partir des demandes remontées par les clients finaux.",
        facts: ['~100 utilisateurs', '10 à 15 développeurs · 1 en remote'],
      },
      {
        role: 'wkk',
        client: 'RAPP IO Mauritius',
        place: 'Madagascar · Maurice',
        period: 'Mai 2021 → janvier 2023',
        title: 'Comptes internationaux',
        body: "Coordination, avec un collègue, de l'équipe locale de Madagascar sur les comptes Mercedes-Benz, Smart et Pampers, en assurant la qualité de son travail et son soutien technique. Liaison technique entre les sites de Madagascar et de Maurice pour la continuité de la production web multi-marques.",
        facts: ['Équipe locale de 8 personnes', '3 marques'],
      },
    ],
    alsoLabel: 'Également livré',
    /* Ketrika, Vidy Varotra et Kotikota n'affichent AUCUNE pile : le CV maître
       n'en donne pas, et en déduire une depuis la liste de compétences serait
       exactement le genre de fait fabriqué que les règles interdisent. */
    also: [
      {
        title: 'Akaiky',
        body: 'Back-office de gestion de fournitures scolaires.',
        stack: 'PHP · MySQL',
      },
      {
        title: 'Magilux',
        body: "ERP métier pour l'industrie de la peinture.",
        stack: 'PHP · Angular · MySQL',
      },
      {
        title: 'CEMEDI',
        body: 'Système de gestion pour centre médical.',
        stack: 'Java · Oracle · JavaScript',
      },
      {
        title: 'Ketrika · Vidy Varotra · Kotikota',
        body: 'Plateformes e-commerce et crowdfunding.',
        stack: '',
      },
    ],
  },

  path: {
    n: '04',
    heading: 'Parcours',
    rows: [
      {
        period: 'Janvier 2024 → présent',
        title: 'Développeuse Full Stack & Appui Projet',
        employer: "Consultante IGN FI · Abidjan, Côte d'Ivoire",
      },
      {
        period: 'Février 2023 → janvier 2024',
        title: 'Développeuse Java & Assistante à la conduite de projet',
        employer: 'BICI · Antananarivo, Madagascar',
      },
      {
        period: 'Mai 2021 → janvier 2023',
        title: 'Lead Webmaster',
        employer: 'Consultante RAPP IO Mauritius · Antananarivo, Madagascar',
      },
      {
        period: 'Mars 2021 → avril 2021',
        title: 'Développeuse Java',
        employer: 'BICI · Antananarivo, Madagascar',
      },
      {
        period: '2020 → 2022',
        title: 'Master MIAGE · parcours MBDS · Licence en informatique',
        employer: "Université Côte d'Azur & IT University · Antananarivo",
      },
    ],
  },

  contact: {
    n: '05',
    heading: 'Me contacter',
    doors: [
      {
        title: 'Un poste à pourvoir ?',
        body: 'CDI ou mission longue, sur site à Antananarivo ou en remote. Le CV complet est en téléchargement.',
        go: 'Télécharger le CV',
      },
      {
        title: 'Un projet à livrer ?',
        body: 'Seule quand le chantier tient dans une personne. À trois avec NEXTRI quand il dépasse.',
        go: 'Écrire un message',
      },
    ],
    // Le numéro n'est jamais dans le HTML servi : SiteFooter le décode au clic.
    revealPhone: 'Afficher le numéro',
    nextri: "NEXTRI, collectif d'ingénieurs",
  },

  footer: {
    rights: '© {year} Itokiana Rajohnson',
    built: 'Antananarivo · Madagascar',
  },

  notFound: {
    title: 'Page introuvable',
    body: 'Cette adresse ne mène nulle part. Le site tient en une page, et elle est toujours là.',
    home: "Revenir à l'accueil",
  },
};
