/* Mangaba Edge AI — interações mínimas
   - Toggle de tema (light/dark) com persistência em localStorage
   - Active link no scroll
   - Reveal suave de seções
*/
(() => {
  const STORAGE_KEY = 'mangaba-theme';
  const root = document.documentElement;

  // --- Tema -----------------------------------------------------------------
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current =
        root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // --- Active link no scroll ------------------------------------------------
  const links = document.querySelectorAll('.nav__links a[href^="#"]');
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, a);
  });
  if ('IntersectionObserver' in window && map.size) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const link = map.get(e.target);
          if (!link) return;
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    map.forEach((_l, sec) => io.observe(sec));
  }

  // --- Reveal suave ---------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.section, .board, .card');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
  }

  // --- Bloqueio amigável nos links de download placeholder ------------------
  document.querySelectorAll('.link-card[data-asset]').forEach((el) => {
    el.addEventListener('click', (ev) => {
      if (el.getAttribute('href') === '#') {
        ev.preventDefault();
        el.setAttribute('aria-disabled', 'true');
        const label = el.querySelector('h3')?.textContent ?? 'Arquivo';
        el.querySelector('.link-card__arrow').textContent = '⌛';
        setTimeout(() => {
          el.querySelector('.link-card__arrow').textContent = '↗';
          alert(`${label} — publicação no GitHub Releases pendente. Acompanhe o repositório.`);
        }, 250);
      }
    });
  });
})();
