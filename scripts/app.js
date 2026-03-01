/* ============================================
   THE TECHNICAL EYE — Interactions
   ============================================ */

(function () {
  'use strict';

  // --- Custom cursor ---
  const cursor = document.querySelector('.cursor');
  if (cursor && matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  // --- Nav scroll state ---
  const nav = document.querySelector('.nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll reveal (IntersectionObserver) ---
  const scrollEls = document.querySelectorAll('[data-scroll]');
  if (scrollEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    scrollEls.forEach((el) => observer.observe(el));
  }

  // --- Works filter ---
  const filters = document.querySelectorAll('.works__filter');
  const cards = document.querySelectorAll('.work-card');

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((f) => { f.classList.remove('active'); f.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        // Re-trigger visibility for newly shown cards
        if (match && !card.classList.contains('visible')) {
          requestAnimationFrame(() => card.classList.add('visible'));
        }
      });
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
