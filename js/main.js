/* ==========================================
   NAVBAR: scroll state & active link
   ========================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // FAB visibility
  const fabCta = document.getElementById('fabCta');
  if (window.scrollY > 400) {
    fabCta.classList.add('visible');
  } else {
    fabCta.classList.remove('visible');
  }
});

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close on nav link click
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});

/* ==========================================
   SCROLL REVEAL
   ========================================== */
const revealEls = document.querySelectorAll(
  '.hero-badge, .hero-title, .hero-sub, .hero-actions, .hero-stats,' +
  '.about-image-wrap, .about-content,' +
  '.kf-card, .ks-card, .topic-card,' +
  '.service-card, .services-guarantee,' +
  '.cs-card, .testimonial,' +
  '.contact-info, .contact-form-wrap,' +
  '.section-header'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ==========================================
   CASE STUDY FILTERS
   ========================================== */
const filterBtns = document.querySelectorAll('.cs-filter');
const csCards = document.querySelectorAll('.cs-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    csCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity .3s, transform .3s';
      if (match) {
        card.style.opacity = '1';
        card.style.transform = '';
        card.style.pointerEvents = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }
    });
  });
});

/* ==========================================
   CONTACT FORM SUBMISSION
   ========================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Đã gửi thành công!';
    btn.style.background = 'var(--accent2)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ==========================================
   COUNTER ANIMATION (hero stats)
   ========================================== */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (Number.isInteger(target) ? Math.round(start) : start.toFixed(1)) + suffix;
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      const targets = [
        { val: 150, suffix: '+' },
        { val: 7, suffix: '+' },
        { val: 3.8, suffix: 'x' },
        { val: 50, suffix: 'B+' },
      ];
      statNums.forEach((el, i) => {
        if (targets[i]) {
          animateCounter(el, targets[i].val, targets[i].suffix);
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ==========================================
   SMOOTH SCROLL (fallback for older browsers)
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
