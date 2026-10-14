// Gabarits du CV. Un export = un document rendu par scripts/cv.mjs.
// `ats` est la version pour les formulaires : une colonne, vrais titres, aucun
// tableau, aucun espacement de lettres (l'extraction lisait « P R O F I L »).
// Les autres sont les variantes design, à l'identité du portfolio (tokens.css, Sprite.astro).
import { doc, esc, mail, tel, web } from './lib.mjs';

const K = {
  bg: '#faf5ec',
  bg2: '#f3ecde',
  bg3: '#ede4d2',
  tx: '#23201e',
  tx2: '#5e574e',
  tx3: '#a79c8b',
  bd: '#ddd2bc',
  kon: '#2e4b6e',
  ymb: '#c98a1e',
  wkk: '#6f8b5b',
  sak: '#c08894',
  shu: '#c9432e',
  konT: '#2b4665',
  shuT: '#a3351f',
  sakT: '#814f5a',
  wash: '#f1e7e3',
  petal: '#c7969c',
  inv: '#23201e',
  invTx: '#faf5ec',
  invTx2: '#a79c8b',
  invBd: '#40392f',
  invSak: '#c9979e',
  invShu: '#e1604a',
};

// Symboles de src/components/Sprite.astro : la fleur, le bourgeon, la branche, le rameau.
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<g id="s-petal"><path d="M0 1.1 C-2.7-1.3 -5.5-4.4 -5.6-8.1 C-5.7-11.1 -3.9-13.1 -1.9-12.8 C-1-12.6 -.35-11.6 0-9.5 C.35-11.6 1-12.6 1.9-12.8 C3.9-13.1 5.7-11.1 5.6-8.1 C5.5-4.4 2.7-1.3 0 1.1 Z"/></g>
<symbol id="s-bl" viewBox="-14 -14 28 28"><g transform="rotate(-8) scale(1,.96)"><use href="#s-petal"/><use href="#s-petal" transform="rotate(70) scale(.97,1.03)"/><use href="#s-petal" transform="rotate(146) scale(1.03,.98)"/><use href="#s-petal" transform="rotate(214) scale(.98,1.01)"/><use href="#s-petal" transform="rotate(288) scale(1.02,.99)"/></g></symbol>
<symbol id="s-bud" viewBox="-8 -8 16 16"><path d="M0-6.9 C2.7-6.2 4.4-4 4.4-1.5 C4.4 1.6 2.4 3.6 0 3.6 C-2.4 3.6 -4.4 1.6 -4.4-1.5 C-4.4-4 -2.7-6.2 0-6.9 Z"/></symbol>
<symbol id="s-branch" viewBox="0 0 1200 100"><path fill="currentColor" d="M0 78.6 C 168 73.6, 300 61.4, 432 52.4 C 622 39.4, 834 29.4, 1200 21.2 L 1200 23 C 834 32.6, 622 44.6, 432 59.6 C 300 69.6, 168 81.8, 0 85.4 Z"/>
<g fill="none" stroke="currentColor" stroke-linecap="round"><path stroke-width="2.4" d="M243 72.4 C 258 62, 266 50, 264 37"/><path stroke-width="1.5" d="M257 60 C 266 55, 274 51, 282 48"/><path stroke-width="1.9" d="M596 47.4 C 613 43, 628 47, 640 58"/><path stroke-width="2.1" d="M900 30.2 C 914 19, 930 14, 946 19"/><path stroke-width="1.5" d="M414 60.6 C 426 55, 438 55.6, 447 61"/><path stroke-width="1.3" d="M1104 24.6 C 1116 19, 1128 18.4, 1138 22"/></g>
<g fill="currentColor"><use href="#s-bl" x="-17" y="-17" width="34" height="34" transform="translate(264,37) rotate(-12)"/><use href="#s-bl" x="-11" y="-11" width="22" height="22" transform="translate(282,48) rotate(58)"/><use href="#s-bl" x="-13" y="-13" width="26" height="26" transform="translate(640,58) rotate(26)"/><use href="#s-bl" x="-16" y="-16" width="32" height="32" transform="translate(946,19) rotate(-34)"/><use href="#s-bl" x="-10" y="-10" width="20" height="20" transform="translate(1138,22) rotate(48)"/><use href="#s-bl" x="-12" y="-12" width="24" height="24" transform="translate(70,80.6) rotate(-26)"/><use href="#s-bud" x="-5.5" y="-5.5" width="11" height="11" transform="translate(447,61) rotate(20)"/><use href="#s-bud" x="-4.6" y="-4.6" width="9.2" height="9.2" transform="translate(742,38.6) rotate(-42)"/><use href="#s-bud" x="-5" y="-5" width="10" height="10" transform="translate(176,77) rotate(60)"/><use href="#s-bud" x="-4.2" y="-4.2" width="8.4" height="8.4" transform="translate(1020,26) rotate(14)"/></g></symbol>
<symbol id="s-spray" viewBox="0 0 300 190"><path fill="currentColor" d="M2 180.4 C 64 168, 107 140, 141 101.6 C 183 54, 220 27.4, 297 18.2 L 297 21.8 C 222 31, 187 57.4, 145 104.6 C 110 143.6, 66 171.4, 3 184 Z"/>
<g fill="none" stroke="currentColor" stroke-linecap="round"><path stroke-width="2" d="M114 124 C 131 109, 140 88, 138 65"/><path stroke-width="1.7" d="M188 61 C 207 59, 221 70, 233 87"/><path stroke-width="1.5" d="M234 43 C 247 33, 263 31, 279 39"/><path stroke-width="1.2" d="M74 156 C 82 145, 92 139, 104 137"/></g>
<g fill="currentColor"><use href="#s-bl" x="-16" y="-16" width="32" height="32" transform="translate(138,65) rotate(-14)"/><use href="#s-bl" x="-13" y="-13" width="26" height="26" transform="translate(233,87) rotate(28)"/><use href="#s-bl" x="-15.5" y="-15.5" width="31" height="31" transform="translate(279,39) rotate(-38)"/><use href="#s-bl" x="-10.5" y="-10.5" width="21" height="21" transform="translate(186,60) rotate(52)"/><use href="#s-bl" x="-13" y="-13" width="26" height="26" transform="translate(296,19) rotate(10)"/><use href="#s-bl" x="-12" y="-12" width="24" height="24" transform="translate(104,137) rotate(-24)"/><use href="#s-bl" x="-9" y="-9" width="18" height="18" transform="translate(58,168) rotate(66)"/><use href="#s-bud" x="-4.4" y="-4.4" width="8.8" height="8.8" transform="translate(160,80) rotate(-20)"/><use href="#s-bud" x="-4" y="-4" width="8" height="8" transform="translate(252,58) rotate(34)"/><use href="#s-bud" x="-4.6" y="-4.6" width="9.2" height="9.2" transform="translate(88,150) rotate(-8)"/></g></symbol>
</defs></svg>`;
const use = (id, cls, vb) => {
  const [x, y, w, h] = vb.split(' ');
  return `<svg class="${cls}" viewBox="${vb}" aria-hidden="true"><use href="#${id}" x="${x}" y="${y}" width="${w}" height="${h}"/></svg>`;
};
const bl = (cls = 'bl') => use('s-bl', cls, '-14 -14 28 28');

const bullet = ([lead, text]) =>
  lead ? `<strong>${esc(lead)} :</strong> ${esc(text)}` : esc(text);
const contacts = (c) => [
  esc(c.city),
  ...c.phones.map(tel),
  mail(c.email),
  esc(c.linkedin),
  web(c.site),
];
const fullName = (c) => `${esc(c.last)} ${esc(c.first)}`;

/* ───────────────────────────── ATS ───────────────────────────── */
export function ats(c) {
  const css = `
  @page { size: A4; margin: 13mm 16mm 12mm; }
  body { font: 400 9.2pt/1.4 "Archivo", sans-serif; color: ${K.tx}; background: #fff; }
  h1 { font: 900 19pt/1.1 "Zen Old Mincho", serif; }
  .title { font-weight: 600; font-size: 10.5pt; margin-top: var(--I); }
  .contact { margin-top: var(--S); color: ${K.tx2}; }
  .contact a { color: ${K.tx}; }
  h2 { font: 700 10pt/1.1 "Archivo", sans-serif; margin: var(--E) 0 var(--I); padding-bottom: var(--S);
       border-bottom: 0.6pt solid ${K.bd}; position: relative; }
  h2::after { content: ""; position: absolute; left: 0; bottom: -0.8pt; width: 22pt; height: 1.6pt; background: ${K.shu}; }
  h3 { font-weight: 700; font-size: 9.8pt; margin-top: var(--I); }
  .meta { color: ${K.tx2}; }
  p + p { margin-top: 2pt; }
  li { padding-left: 10pt; position: relative; margin-top: 2pt; }
  li::before { content: "•"; position: absolute; left: 0; color: ${K.shu}; }
  `;
  const body = `
  <header>
    <h1>${fullName(c)}</h1>
    <p class="title">${esc(c.title)}</p>
    <p class="contact">${contacts(c).slice(0, 3).join(' · ')}</p>
    <p class="contact">${[esc(c.linkedin), web(c.site), esc(c.mobility)].join(' · ')}</p>
  </header>
  <h2>PROFIL</h2>${c.profile.map((p) => `<p>${esc(p)}</p>`).join('')}
  <h2>EXPÉRIENCE PROFESSIONNELLE</h2>
  ${c.jobs
    .map(
      (
        j,
      ) => `<h3>${esc(j.title)}</h3><p class="meta">${esc(j.company)} · ${esc(j.org)} · ${esc(j.period)}</p>
      <p><strong>Technologies :</strong> ${esc(j.tech)}</p>
      <ul>${j.bullets.map((b) => `<li>${bullet(b)}</li>`).join('')}${(j.projects ?? []).map((b) => `<li>${bullet(['Projets, ' + b[0].toLowerCase(), b[1]])}</li>`).join('')}</ul>`,
    )
    .join('')}
  <h2>COMPÉTENCES</h2>${c.skills.map(([k, v]) => `<p><strong>${esc(k)} :</strong> ${esc(v)}</p>`).join('')}
  <h2>FORMATION</h2>${c.education.map((e) => `<p><strong>${esc(e.title)}</strong> · ${esc(e.org)} · ${esc(e.period)}</p>`).join('')}
  <h2>LANGUES</h2><p>${c.languages.map(([l, n]) => `<strong>${esc(l)} :</strong> ${esc(n)}`).join(' · ')}</p>
  `;
  return doc(`CV ${c.short}`, css, body);
}

// Bloc d'expérience partagé par les variantes design.
const job = (j) => `<article class="job" style="--c:var(--${j.role})">
  <p class="when">${esc(j.period)}</p>
  <h3>${esc(j.title)} <span>· ${esc(j.company)}</span></h3>
  <p class="org">${esc(j.org)}</p>
  <p class="tech">${esc(j.tech)}</p>
  <ul>${j.bullets.map((b) => `<li>${bullet(b)}</li>`).join('')}</ul>
  ${(j.projects ?? []).map(([k, v]) => `<p class="proj"><b>${esc(k)}</b> ${esc(v)}</p>`).join('')}
</article>`;
const vars = `--kon:${K.kon};--ymb:${K.ymb};--wkk:${K.wkk};--sak:${K.sak};`;

/* ─────────────────── Variante retenue · EMAKI (2026-10-14) ───────────────────
   Un rouleau : une colonne centrée, beaucoup d'air, un sceau vermillon pour
   signature, la branche du portfolio entre les sections. Rien sur les côtés. */
export function emaki(c) {
  const initials = c.short
    .split(' ')
    .map((w) => w[0])
    .join('');
  const css = `
  :root { ${vars} }
  @page { size: A4; margin: 0; }
  html { background: ${K.bg}; }
  .sheet { padding: 15mm 30mm 13mm; }
  body { font: 400 8.6pt/1.5 "Archivo", sans-serif; color: ${K.tx}; }
  .mono { font-family: "JetBrains Mono", monospace; font-size: 6.4pt; text-transform: uppercase; letter-spacing: .1em; color: ${K.tx2}; }
  header { text-align: center; position: relative; }
  .seal { position: absolute; right: -14mm; top: 0; width: 15mm; height: 15mm; background: ${K.shu}; color: ${K.bg};
    display: grid; place-items: center; font: 900 15pt/1 "Zen Old Mincho", serif; transform: rotate(4deg); border-radius: 1.5pt; }
  h1 { font: 900 27pt/1.1 "Zen Old Mincho", serif; }
  h1 small { display: block; font: 700 12pt/1.3 "Zen Old Mincho", serif; color: ${K.tx2}; }
  .title { margin-top: var(--I); font: 700 10.5pt/1.3 "Zen Old Mincho", serif; color: ${K.shuT}; }
  .contact { margin-top: var(--I); }
  .contact span + span::before { content: " · "; }
  .lead { margin-top: var(--N); text-align: center; font-size: 9.6pt; line-height: 1.55; }
  .branch { display: block; width: calc(100% + 40mm); margin: var(--E) -20mm; height: 15mm; color: ${K.petal}; }
  h2 { text-align: center; font: 700 13.5pt/1 "Zen Old Mincho", serif; margin-bottom: var(--E); }
  h2 .mono { display: block; margin-bottom: var(--S); color: ${K.sakT}; }
  .job { margin-top: var(--N); }
  .job:first-of-type { margin-top: 0; }
  .when { text-align: center; font: 400 6.6pt "JetBrains Mono", monospace; text-transform: uppercase; letter-spacing: .1em; color: var(--c); }
  .job h3 { text-align: center; font: 700 11.5pt/1.25 "Zen Old Mincho", serif; margin-top: 2pt; }
  .job h3 span { color: ${K.tx2}; }
  .org, .tech { text-align: center; color: ${K.tx2}; margin-top: 2pt; }
  .tech { font: 400 6.6pt/1.5 "JetBrains Mono", monospace; }
  .job ul { margin-top: var(--I); }
  li { margin-top: var(--S); padding-left: 12pt; position: relative; }
  li::before { content: ""; position: absolute; left: 2pt; top: 4pt; width: 4pt; height: 4pt; transform: rotate(45deg); background: var(--c, ${K.sak}); }
  .proj { margin-top: var(--S); text-align: center; color: ${K.tx2}; }
  .proj b { font-weight: 600; color: ${K.tx}; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; gap: var(--E) 8mm; }
  .skills dt { color: ${K.sakT}; }
  .skills dd { margin-top: 2pt; }
  .end { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
  .end b { display: block; font: 700 9.4pt/1.3 "Zen Old Mincho", serif; }
  .end > div > div + div { margin-top: var(--E); }
  `;
  const branch = `<svg class="branch" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true"><use href="#s-branch" width="1200" height="100"/></svg>`;
  const body = `${SPRITE}
  <header>
    <span class="seal" aria-hidden="true">${esc(initials)}</span>
    <p class="mono">${esc(c.city)}</p>
    <h1 style="margin-top:var(--I)">${esc(c.first)}<small>${esc(c.last)}</small></h1>
    <p class="title">${esc(c.title)}</p>
    <p class="contact mono">${[...c.phones.map(tel), mail(c.email), web(c.site), esc(c.linkedin)].map((v) => `<span>${v}</span>`).join('')}</p>
    <p class="mono" style="margin-top:var(--S)">${esc(c.mobility)}</p>
  </header>
  <p class="lead">${esc(c.profile[0])}</p>
  ${branch}
  <h2><span class="mono">I</span>Expérience</h2>
  ${c.jobs.map(job).join('')}
  ${branch}
  <h2><span class="mono">II</span>Compétences</h2>
  <dl class="skills">${c.skills.map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  ${branch}
  <div class="end">
    <div><h2><span class="mono">III</span>Formation</h2>${c.education.map((e) => `<div><span class="mono">${esc(e.period)}</span><b>${esc(e.title)}</b><p>${esc(e.org)}</p></div>`).join('')}</div>
    <div><h2><span class="mono">IV</span>Langues</h2>${c.languages.map(([l, n]) => `<div><span class="mono">${esc(l)}</span><p>${esc(n)}</p></div>`).join('')}</div>
  </div>`;
  return doc(`${c.short} · CV`, css, body);
}
