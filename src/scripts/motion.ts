/* Ce module ne fait que deux choses, et la première n'a rien d'optionnel.

   ① Jouer le hero. motion.css pose `.js-motion .stagger > * { opacity: 0 }` et
      cette ligne est le SEUL chemin qui en sort : contrairement à `.rv`,
      `.stagger` n'a ni chemin natif dans le bloc `@supports`, ni chemin par
      IntersectionObserver. Elle est donc jouée en premier et hors de tout
      `try` partagé : une exception levée plus bas laisserait sinon le h1, le
      chapeau, les lieux et les deux boutons invisibles pour toujours, sur la
      seule page du site.

   ② Poser `.in` sur les blocs à révéler, et UNIQUEMENT si le navigateur ne
      sait pas piloter les timelines de défilement lui-même. Quand il le sait,
      motion.css fait tout et ce module n'ajoute pas un écouteur.

   Le plan de quai n'apparaît pas ici : sa géométrie est calculée au build et
   son accostage est une animation CSS pure. C'est la différence de fond avec
   la maquette, où tout le plan était construit en JavaScript au chargement. */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const native = CSS.supports('animation-timeline: view()') && !reduce;

for (const el of document.querySelectorAll('.stagger')) el.classList.add('shown');

try {
  if (!native && !reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('shown');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    for (const el of document.querySelectorAll('.rv')) io.observe(el);
  }
} catch {}
