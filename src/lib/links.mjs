/* Les liens sortants du site, en un seul endroit.
   ────────────────────────────────────────────────────────────────────────────
   Ce fichier existe à cause d'une panne réelle. L'adresse de NEXTRI était
   déclarée en constante dans Who.astro ET dans Contact.astro, deux copies de
   la même chaîne. Le collectif est passé d'un dépôt de projet
   (nextrimg.github.io/nextri_portfolio/) à un site d'utilisateur servi à la
   racine, et les deux copies ont pointé vers une 404 en même temps.

   Une seule déclaration ne rend pas l'adresse plus juste, mais elle rend la
   correction atomique : un lien sortant que ce dépôt ne contrôle pas doit
   toujours pouvoir se corriger en une ligne. */

/** Le collectif. Site d'utilisateur, servi à la racine du domaine. */
export const NEXTRI = 'https://nextrimg.github.io/';
