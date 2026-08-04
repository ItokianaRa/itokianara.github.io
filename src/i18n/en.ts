import quai from './quai-labels.en.mjs';

/* The English copy. Same shape as fr.ts, key for key: utils.ts types the
   dictionary from the French one, so a missing key fails `astro check`
   rather than rendering `undefined` on a live page.

   Same content rules as the French: every fact traces to the master CV, and
   nothing is added here that the CV does not support. */
export default {
  nav: {
    who: 'Who I am',
    work: 'How I work',
    delivered: 'What I have delivered',
    path: 'Career',
    contact: 'Contact',
  },
  skip: 'Skip to content',
  themeLabel: 'Theme',
  themeStates: { system: 'system', light: 'light', dark: 'dark' },
  langSwitch: 'French version',
  name: 'Itokiana Rajohnson',

  meta: {
    title: 'Itokiana Rajohnson · Senior Full Stack Developer',
    jobTitle: 'Senior Full Stack Developer',
    description:
      'Senior full stack developer and project support, based in Antananarivo. Five years on systems already in production: the Ivorian national land registry, port applications, the web accounts of international brands.',
  },

  hero: {
    status: 'Open to opportunities',
    title: 'What gets decided in the meeting, I get',
    titleAccent: 'into production',
    lead: 'Senior full stack developer. Five years on systems that are already running when I arrive: a national land registry, a port authority, the web accounts of international brands.',
    places: ['Antananarivo', 'Abidjan', 'Mauritius'],
    ctaCv: 'Download the CV',
    ctaContact: 'Get in touch',
  },

  quai,

  authority: {
    label: 'Systems and accounts I have worked on',
    items: [
      { context: "Côte d'Ivoire · via IGN FI", name: 'Ministry of Urban Planning' },
      { context: 'Port management', name: 'SPAT' },
      { context: 'International account', name: 'Mercedes-Benz' },
      { context: 'International account', name: 'Pampers' },
    ],
  },

  who: {
    n: '01',
    heading: 'Who I am',
    body: [
      'Itokiana Rajohnson, from Antananarivo. I work on systems that are already in service when I arrive: a national land registry mid-overhaul, port applications in production, the web accounts of international brands.',
    ],
    bodyBeforeLink:
      'I write code, and I keep things moving between the client, the testers and the development team: gathering requirements, writing specifications, estimating effort, tracking fixes through to a stable release. I come alone when the job fits one person. When it does not, there are three of us: ',
    nextriLink: 'NEXTRI',
    bodyAfterLink: ', a collective of engineers in Antananarivo.',
    fiche: [
      { label: 'Working since', value: '2021' },
      { label: 'Assignments', value: '4' },
      { label: 'Ground covered', value: "Côte d'Ivoire · Mauritius · Madagascar" },
      { label: 'Teams led', value: 'Up to 15 developers' },
      { label: 'Education', value: "Master's MIAGE · MBDS" },
      { label: 'Languages', value: 'Malagasy · French · English (read, written)' },
    ],
  },

  work: {
    n: '02',
    heading: 'How I work',
    steps: [
      {
        role: 'kon',
        title: 'Framing the need',
        field: 'Ministry of Urban Planning · via IGN FI',
        body: 'What the client says in a meeting becomes technical specifications and effort estimates. Across more than five sprints, those estimates were what the team planned against.',
      },
      {
        role: 'ymb',
        title: 'Delivering on top of what exists',
        field: 'BICI · Antananarivo',
        body: 'HR and stock management modules built into an existing, undocumented codebase, with no interruption to the service in production. Test scenarios written, fixes tracked through to closure.',
      },
      {
        role: 'wkk',
        title: 'Holding a distributed team together',
        field: 'RAPP IO Mauritius',
        body: 'Coordinating, with a colleague, the Madagascar team (eight people) on the Mercedes-Benz, Smart and Pampers accounts: the quality of their work and their technical support, and the link between Madagascar and Mauritius.',
      },
    ],
    thread: {
      label: 'The thread',
      body: 'Across all three, the same place: between two sides with no common language, that someone has to hold together for the delivery to land.',
      items: [
        'The Ministry and the developers',
        'The testers and the developers',
        'Madagascar and Mauritius',
      ],
    },
  },

  delivered: {
    n: '03',
    heading: 'What I have delivered',
    items: [
      {
        role: 'kon',
        client: 'Ministry of Urban Planning, Housing and the Living Environment',
        place: "Côte d'Ivoire · via IGN FI",
        period: 'January 2024 → present',
        title: 'SIF & SIGFU portal',
        body: 'Building the business features of the national land registry system and its public portal. Rebuilt the online application module: from a single request per plot and per applicant, to handling several applicants and several plots, in line with how the client actually works. And, alongside the code, the bridge between the test team and the developers, so that what ships holds.',
        facts: ['9 developers · 3 testers', 'More than 5 sprints estimated'],
      },
      {
        role: 'ymb',
        client: 'BICI',
        place: 'Antananarivo',
        period: 'February 2023 → January 2024',
        title: 'SPAT harbour master & Road Fund',
        body: 'Led delivery on business applications already in production: invoicing and quayside operations. Added new HR and stock management modules on top of an undocumented codebase, with no interruption to the service. Distributed and framed the work across the team, from what end clients reported.',
        facts: ['~100 users', '10 to 15 developers · 1 remote'],
      },
      {
        role: 'wkk',
        client: 'RAPP IO Mauritius',
        place: 'Madagascar · Mauritius',
        period: 'May 2021 → January 2023',
        title: 'International accounts',
        body: 'Coordinating, with a colleague, the local Madagascar team on the Mercedes-Benz, Smart and Pampers accounts, covering the quality of their work and their technical support. Technical liaison between the Madagascar and Mauritius sites, keeping multi-brand web production continuous.',
        facts: ['Local team of 8', '3 brands'],
      },
    ],
    alsoLabel: 'Also delivered',
    also: [
      {
        title: 'Akaiky',
        body: 'Back office for school supplies management.',
        stack: 'PHP · MySQL',
      },
      {
        title: 'Magilux',
        body: 'Business ERP for the paint industry.',
        stack: 'PHP · Angular · MySQL',
      },
      {
        title: 'CEMEDI',
        body: 'Management system for a medical centre.',
        stack: 'Java · Oracle · JavaScript',
      },
      {
        title: 'Ketrika · Vidy Varotra · Kotikota',
        body: 'E-commerce and crowdfunding platforms.',
        stack: '',
      },
    ],
  },

  path: {
    n: '04',
    heading: 'Career',
    rows: [
      {
        period: 'January 2024 → present',
        title: 'Full Stack Developer & Project Support',
        employer: "IGN FI consultant · Abidjan, Côte d'Ivoire",
      },
      {
        period: 'February 2023 → January 2024',
        title: 'Java Developer & Assistant Project Manager',
        employer: 'BICI · Antananarivo, Madagascar',
      },
      {
        period: 'May 2021 → January 2023',
        title: 'Lead Webmaster',
        employer: 'RAPP IO Mauritius consultant · Antananarivo, Madagascar',
      },
      {
        period: 'March 2021 → April 2021',
        title: 'Java Developer',
        employer: 'BICI · Antananarivo, Madagascar',
      },
      {
        period: '2020 → 2022',
        title: "Master's MIAGE · MBDS track · BSc in Computer Science",
        employer: "Université Côte d'Azur & IT University · Antananarivo",
      },
    ],
  },

  contact: {
    n: '05',
    heading: 'Get in touch',
    doors: [
      {
        title: 'A role to fill?',
        body: 'Permanent or long-term contract, on site in Antananarivo or remote. The full CV is available to download.',
        go: 'Download the CV',
      },
      {
        title: 'A project to deliver?',
        body: 'Alone when the job fits one person. Three-strong with NEXTRI when it does not.',
        go: 'Send a message',
      },
    ],
    revealPhone: 'Show the number',
    nextri: 'NEXTRI, a collective of engineers',
  },

  footer: {
    rights: '© {year} Itokiana Rajohnson',
    built: 'Antananarivo · Madagascar',
  },

  notFound: {
    title: 'Page not found',
    body: 'This address leads nowhere. The site is a single page, and it is still there.',
    home: 'Back to the home page',
  },
};
