// Contenu du CV, repris de CV_Itokiana_RAJOHNSON-Septembre2026.docx (2026-10-14), corrigé :
// NSGFH → SGFH (nom employé par le cas SIF du portfolio de Lionel) ; Node → Node.js ;
// web mastering → webmastering ; Phô restaurant → Phô Resto ; Master 2 MBDS → Master 2 MIAGE,
// parcours MBDS (intitulé du portfolio) ; Licence Informatique → Licence en informatique ;
// casse et ponctuation des intitulés harmonisées ; intitulés au féminin, comme le portfolio (2026-10-14). Les gabarits (templates.mjs) ne font que la forme.
// Les numéros ne sont pas versionnés (dépôt public) : cv/private.mjs, gitignoré,
// sur le modèle de cv/private.example.mjs. scripts/cv.mjs refuse de rendre sans lui.
import priv from './private.mjs';

export default {
  file: 'Itokiana_Rajohnson',
  last: 'RAJOHNSON RAKOTOVAO',
  first: 'Itokiana Mamy',
  short: 'Itokiana Rajohnson',
  title: 'Développeuse full-stack Java · Profil technico-fonctionnel',
  city: 'Antananarivo, Madagascar',
  phones: priv.phones,
  email: 'rajohnsonitokiana@gmail.com',
  linkedin: 'LinkedIn : Itokiana Rajohnson',
  site: 'itokianara.github.io',
  mobility: 'Disponible en remote ou en relocalisation',
  profile: [
    "Développeuse full-stack Java au profil technico-fonctionnel, avec plus de cinq ans d'expérience en IT : développement, estimation, rédaction de tickets et interface entre clients et équipes. J'ai contribué à des projets institutionnels et sectoriels variés (système d'information foncière, gestion portuaire, fonds routier, santé, ERP) à Madagascar, en Côte d'Ivoire et à Maurice, en environnement Agile (Scrum).",
  ],
  figures: [
    ['5 ans+', 'en IT'],
    ['3 pays', "Madagascar, Côte d'Ivoire, Maurice"],
    ['8 + 4', 'développeurs et testeurs sur le SIF'],
    ['~100', 'utilisateurs de SPAT Capitainerie'],
  ],
  jobs: [
    {
      title: 'Consultante développeuse full-stack',
      company: 'IGN FI',
      period: "Janvier 2024 - Aujourd'hui",
      start: 2024,
      end: 2026.8,
      role: 'kon',
      org: "Abidjan, Côte d'Ivoire (sur site et en remote) · équipe de 8 développeurs et 4 testeurs",
      tech: 'Java, Spring, JPA, Hibernate, Maven, Ext JS, Angular, API REST, PostgreSQL, Camunda, Ionic, Node.js',
      bullets: [
        [
          'Migration et livraisons',
          "participation à une partie de la migration de l'ancien système SGFH vers le SIF, projet ministériel de gestion foncière urbaine : première mise en production en juillet 2024, puis livraisons régulières après chaque lot de tickets",
        ],
        [
          'Développement',
          'fonctionnalités du back-office SIF et du portail de demandes en ligne (front-office de dépôt et de suivi des demandes ; application web et mobile en Ionic, backend Node.js) ; workflows de demandes sous Camunda (tâches et flux de traitement)',
        ],
        [
          'Portail',
          "refonte du module de demande en ligne pour l'aligner sur le back-office SIF : prise en charge des demandes portant sur plusieurs lots et plusieurs demandeurs",
        ],
        [
          'Cadrage',
          'estimation des tickets, puis traduction des demandes exprimées par les clients en réunion en tickets expliqués aux développeurs',
        ],
        [
          'Relation client',
          'assistance aux recettes, présentations et arbitrages : prise de notes et analyse des besoins exprimés par les clients',
        ],
        [
          'Qualité',
          "accompagnement des testeurs (explication des tickets, cas de test, priorités) et renfort de l'équipe de test pendant les périodes de rush",
        ],
      ],
    },
    {
      title: 'Développeuse Java et assistante cheffe de projet',
      company: 'BICI',
      period: 'Mars 2021 - Janvier 2024',
      start: 2021.2,
      end: 2024,
      role: 'ymb',
      org: 'Antananarivo, Madagascar · dont une mission de webmastering menée en parallèle pour RAPP IO Mauritius',
      tech: 'Java, JavaScript, Oracle, API REST, PostgreSQL',
      bullets: [
        [
          'Coordination',
          'coordination des projets SPAT Capitainerie (facturation et opérations de quai, environ 100 utilisateurs) et Fonds Routier',
        ],
        [
          'Interface',
          "interface entre les clients finaux et les développeurs (locaux et en remote) pour la distribution et l'explication des tâches",
        ],
        [
          'Assistance chef de projet',
          'création de scénarios de tests, suivi des corrections techniques, rédaction des tâches et suivi des développements',
        ],
        [
          'Développement',
          "reprise et évolution rapide de code existant pour l'intégration de nouveaux modules RH et gestion de stocks",
        ],
      ],
      projects: [
        [
          'Solutions métier',
          'SPAT Capitainerie (gestion portuaire), Fonds Routier, Phô Resto (ERP restaurant), Magilux (ERP peinture), CEMEDI (centre médical), Gallois (RH)',
        ],
        [
          'E-commerce et services',
          'Ketrika.com, Vidy Varotra, Kotikota (financement participatif)',
        ],
      ],
    },
    {
      title: 'Consultante Lead Webmaster',
      company: 'RAPP IO Mauritius',
      period: 'Mai 2021 - Janvier 2023',
      start: 2021.4,
      end: 2023,
      role: 'wkk',
      org: 'En partenariat avec BICI · dont deux mois et demi sur site à Maurice',
      tech: 'Contentful, AEM, Sitecore',
      bullets: [
        [
          'Encadrement',
          "encadrement et coordination de l'équipe locale pour des clients internationaux (Mercedes-Benz, Smart, Pampers)",
        ],
        [
          'Coordination technique',
          'point de contact technique pour assurer la fluidité de la production web entre les sites',
        ],
        ['Webmastering', 'modification des contenus des sites'],
      ],
    },
  ],
  skills: [
    ['Langages', 'Java, JavaScript'],
    ['Frameworks et front-end', 'Spring, JPA / Hibernate, Angular, Ext JS, Ionic, Node.js'],
    ['Bases de données', 'PostgreSQL, Oracle, MySQL'],
    ['Workflow et intégration', 'Camunda, API REST'],
    ['CMS et web', 'Contentful, AEM, Sitecore'],
    [
      'Outils et méthodes',
      'Git, Maven, Jira, Agile (Scrum), estimation de charge, rédaction technique',
    ],
  ],
  education: [
    {
      title: 'Master 2 MIAGE, parcours MBDS',
      period: '2022',
      org: "IT University et Université Côte d'Azur (ex-Nice Sophia Antipolis), Antananarivo",
    },
    { title: 'Licence en informatique', period: '2020', org: 'IT University, Antananarivo' },
  ],
  languages: [
    ['Malagasy', 'langue maternelle'],
    ['Français', 'courant'],
    ['Anglais', 'intermédiaire'],
  ],
};
