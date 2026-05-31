/* Clean Warks — Shared interactions */
(function () {
  'use strict';

  // ---------- Sticky nav shadow ----------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu ----------
  const toggleBtn = document.querySelector('.nav-toggle');
  const closeBtn = document.querySelector('.nav-mobile-close');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  document.querySelectorAll('.nav-mobile a').forEach((a) => {
    a.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll-triggered fade-up ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
  }

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          cio.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  // ---------- Dynamic copyright year ----------
  document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Sidebar quick-enquiry form → WhatsApp ----------
  document.querySelectorAll('.sidebar-form').forEach((form) => {
    // Skip forms that already have a custom onsubmit
    if (form.getAttribute('onsubmit')) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameEl  = form.querySelector('input[name="name"]');
      const phoneEl = form.querySelector('input[name="phone"]');
      const cityEl  = form.querySelector('select[name="city"]');

      const name  = nameEl  ? nameEl.value.trim()  : '';
      const phone = phoneEl ? phoneEl.value.trim()  : '';
      const city  = cityEl  ? cityEl.value.trim()   : '';

      // Pick the phone number based on city
      const isBangalore = city.toLowerCase() === 'bangalore';
      const waNumber = isBangalore ? '917034455665' : '918304000046';

      // Derive service from page title or data attribute
      const serviceTag = form.dataset.service || document.title.split('|')[0].trim();

      const parts = ['Hi, I\'m interested in ' + serviceTag + '.'];
      if (name)  parts.push('Name: ' + name);
      if (phone) parts.push('Phone: ' + phone);
      if (city)  parts.push('City: ' + city.charAt(0).toUpperCase() + city.slice(1));

      const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(parts.join('\n'));
      window.open(waUrl, '_blank');

      // Visual feedback
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const orig = btn.innerHTML;
        btn.textContent = '✓ Opening WhatsApp…';
        btn.style.background = '#22C55E';
        btn.style.color = '#fff';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 3000);
      }
    });
  });

})();

// ---------- Contact page form → WhatsApp (global, safe to call from onsubmit) ----------
function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const originalHTML = btn ? btn.innerHTML : '';
  if (btn) { btn.textContent = 'Opening WhatsApp…'; btn.disabled = true; }

  const get = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const fname   = get('fname');
  const lname   = get('lname');
  const phone   = get('phone');
  const email   = get('email');
  const service = get('service');
  const city    = get('city');
  const message = get('message');

  const isBangalore = city.toLowerCase() === 'bangalore';
  const waNumber = isBangalore ? '917034455665' : '918304000046';

  const lines = [
    '👋 New enquiry from cleanwarks.com',
    '---',
    'Name: ' + fname + (lname ? ' ' + lname : ''),
    phone   ? 'Phone: '   + phone   : null,
    email   ? 'Email: '   + email   : null,
    service ? 'Service: ' + service : null,
    city    ? 'City: '    + city    : null,
    message ? 'Message: ' + message : null,
  ].filter(Boolean);

  const waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(lines.join('\n'));
  window.open(waUrl, '_blank');

  if (btn) {
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.825 9.825 0 0 0 12.04 2zm5.07 14.07c-.21.59-1.04 1.08-1.69 1.22-.44.09-1.02.17-2.97-.62-2.49-1.03-4.11-3.56-4.23-3.72-.13-.16-1-1.34-1-2.55s.64-1.81.86-2.06c.22-.25.49-.31.65-.31s.32 0 .47.01c.15 0 .35-.06.55.42.21.5.71 1.71.78 1.84.06.13.1.28.02.45-.09.16-.13.27-.25.42-.13.16-.27.35-.38.47-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.77.98.87 1.81 1.14 2.07 1.27.26.13.41.11.56-.06.16-.18.65-.76.83-1.02.18-.26.35-.21.59-.13.24.09 1.54.73 1.81.86.27.13.45.2.51.31.07.11.07.62-.14 1.21z"/></svg> Opening WhatsApp…';
    btn.style.background = '#22C55E';
    btn.style.color = '#fff';
    btn.disabled = false;
    setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.style.color = ''; }, 4000);
  }
}
