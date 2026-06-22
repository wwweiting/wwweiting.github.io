/* ===================================================
   ACADEMIC PERSONAL PAGE — MAIN JS
   GSAP-enhanced, with native fallbacks.
   =================================================== */

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

// --- Navbar scroll effect ---
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile nav toggle ---
navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Active nav link highlight on scroll ---
function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// --- Abstract toggle ---
function toggleAbstract(el) {
  const abstract = el.nextElementSibling;
  if (!abstract) return;
  const isHidden = abstract.classList.toggle('hidden');
  el.classList.toggle('open', !isHidden);

  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}
window.toggleAbstract = toggleAbstract;

// --- Contact form redirect ---
const formNext = document.getElementById('form-next');
if (formNext) {
  formNext.value = window.location.href.split('#')[0] + '#contact';
}

// --- Profile image fallback ---
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; height:100%; display:flex; align-items:center;
      justify-content:center; background:#f4f4f5; color:#111; font-size:64px;
    `;
    placeholder.innerHTML = '<i class="fas fa-user-graduate"></i>';
    profileImg.parentElement.appendChild(placeholder);
  });
}

const animatedItems = '.research-card, .pub-entry, .timeline-item, .news-list li, .contact-info, .contact-social';
document.querySelectorAll(animatedItems).forEach(el => el.classList.add('fade-in'));

// --- GSAP animations ---
function initGSAP() {
  if (!window.gsap) {
    initIntersectionFallback();
    return;
  }

  const { gsap } = window;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('gsap-ready');
  gsap.defaults({ ease: 'power3.out', duration: reduceMotion ? 0 : 0.8 });

  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  // Home entrance sequence.
  const heroTimeline = gsap.timeline();
  heroTimeline
    .from('.hero-container', { y: 28, autoAlpha: 0, scale: 0.985, duration: 0.9 })
    .from('.hero-photo', { x: -24, autoAlpha: 0, duration: 0.7 }, '-=0.55')
    .from(['.hero-name', '.hero-title', '.hero-dept', '.hero-bio'], {
      y: 18,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.65
    }, '-=0.5')
    .fromTo('.btn-link',
      { y: 12, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.5 },
      '-=0.35'
    );

  // Ambient monochrome orbs.
  gsap.to('.blob-1', { x: 55, y: 35, scale: 1.08, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-2', { x: -45, y: -20, scale: 1.12, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-3', { x: 40, y: -45, scale: 0.96, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-4', { x: -35, y: 32, scale: 1.1, duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  if (window.ScrollTrigger) {
    gsap.set(animatedItems, { y: 34, autoAlpha: 0 });

    window.ScrollTrigger.batch(animatedItems, {
      start: 'top 86%',
      once: true,
      onEnter: batch => {
        gsap.fromTo(batch,
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7, overwrite: true }
        );
      }
    });

    // Gentle parallax for section glass panels.
    gsap.utils.toArray('.section .container').forEach((panel, index) => {
      gsap.fromTo(panel,
        { y: 24 },
        {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            refreshPriority: index
          }
        }
      );
    });
  }

  initGlassTilt(gsap, reduceMotion);
}

// Slight pointer-driven glass movement, using quickTo for performance.
function initGlassTilt(gsap, reduceMotion) {
  if (reduceMotion || window.matchMedia('(max-width: 720px)').matches) return;

  const panels = document.querySelectorAll('.hero-container, .research-card, .timeline-content, .contact-info, .contact-social');

  panels.forEach(panel => {
    const rotateXTo = gsap.quickTo(panel, 'rotationX', { duration: 0.35, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(panel, 'rotationY', { duration: 0.35, ease: 'power2.out' });
    const shineTo = gsap.quickTo(panel, '--shine-x', { duration: 0.35, ease: 'power2.out' });

    gsap.set(panel, {
      transformPerspective: 900,
      transformOrigin: 'center'
    });

    panel.addEventListener('mousemove', event => {
      const rect = panel.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      rotateXTo(py * -3.5);
      rotateYTo(px * 3.5);
      shineTo(`${px * 18}px`);
    });

    panel.addEventListener('mouseleave', () => {
      rotateXTo(0);
      rotateYTo(0);
      shineTo('0px');
    });
  });
}

function initIntersectionFallback() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  document.querySelectorAll(animatedItems).forEach(el => observer.observe(el));
}

window.addEventListener('load', initGSAP);
