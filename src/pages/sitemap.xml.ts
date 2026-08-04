import type { APIRoute } from 'astro';

/* Le site tient en deux pages indexables — l'accueil français et sa version
   anglaise. Un plan de site écrit à la main est ici plus honnête qu'une
   intégration : il n'y a rien à découvrir, et chaque <loc> passe par `site`
   d'astro.config.mjs, donc un changement de domaine n'en demande aucune
   reprise. La 404 n'y figure pas, elle est en `noindex`. */
const PAGES = ['/', '/en/'];

export const GET: APIRoute = ({ site }) => {
  const now = new Date().toISOString().slice(0, 10);
  const urls = PAGES.map((path) => {
    const loc = new URL(path, site).href;
    /* Chaque entrée déclare ses deux variantes : c'est le pendant des hreflang
       du <head>, et ce qui évite qu'un moteur traite les deux langues comme
       du contenu dupliqué. */
    const alt = PAGES.map(
      (p) =>
        `    <xhtml:link rel="alternate" hreflang="${p === '/' ? 'fr' : 'en'}" href="${new URL(p, site).href}"/>`,
    ).join('\n');
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
${alt}
    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL('/', site).href}"/>
  </url>`;
  }).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
