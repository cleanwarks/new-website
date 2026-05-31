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

// ---------- WhatsApp auto-popup ----------
(function () {
  'use strict';

  var DISMISSED_KEY = 'cw_popup_dismissed';
  var WA_NUMBER     = '918304000046';
  var DELAY_MS      = 8000;

  // Don't show if already dismissed this session
  if (sessionStorage.getItem(DISMISSED_KEY)) return;

  // ---- Page-specific content ----
  function getPageContent() {
    var path = window.location.pathname.toLowerCase();

    if (/sofa/.test(path))
      return {
        msg: '👋 Sofa looking dull or stained?\nOur machine cleaning removes deep dirt & allergens!',
        wa:  'Hi! I\'m interested in sofa cleaning. Can you share the pricing?'
      };
    if (/mattress/.test(path))
      return {
        msg: '👋 Did you know mattresses collect dust mites & bacteria?\nWe deep clean and sanitise completely!',
        wa:  'Hi! I\'m interested in mattress cleaning. Can you share the pricing?'
      };
    if (/water-tank|tank/.test(path))
      return {
        msg: '👋 Is your water tank due for cleaning?\nDirty tanks affect your family\'s health!',
        wa:  'Hi! I need water tank cleaning. Can you give me a quote?'
      };
    if (/bathroom/.test(path))
      return {
        msg: '👋 Want a spotless, hygienic bathroom?\nWe deep clean tiles, grout, fixtures & more!',
        wa:  'Hi! I\'m interested in bathroom deep cleaning. Can you share details?'
      };
    if (/kitchen/.test(path))
      return {
        msg: '👋 Kitchen grease and grime building up?\nWe deep clean every corner including appliances!',
        wa:  'Hi! I\'m interested in kitchen deep cleaning. Can you share details?'
      };
    if (/deep/.test(path))
      return {
        msg: '👋 Ready for a full home transformation?\nOur deep clean covers every room, top to bottom!',
        wa:  'Hi! I\'m interested in home deep cleaning. Can you give me a quote?'
      };
    if (/pressure/.test(path))
      return {
        msg: '👋 Dirty driveway or terrace?\nOur pressure washing makes surfaces look brand new!',
        wa:  'Hi! I\'m interested in pressure washing services. Can you give me a quote?'
      };
    if (/carpet/.test(path))
      return {
        msg: '👋 Carpets trapping dust and odours?\nWe shampoo and deep clean for fresh results!',
        wa:  'Hi! I\'m interested in carpet cleaning. Can you share the pricing?'
      };
    if (/car/.test(path))
      return {
        msg: '👋 Car interior needs a refresh?\nWe shampoo seats, clean AC vents & more!',
        wa:  'Hi! I\'m interested in car interior cleaning. Can you share the pricing?'
      };
    if (/pricing|calculator/.test(path))
      return {
        msg: '👋 Want an exact quote for your home?\nChat with us and we\'ll give you the best price!',
        wa:  'Hi! I\'d like to get a quote for cleaning services.'
      };
    if (/contact|about/.test(path))
      return {
        msg: '👋 Have a question about our services?\nWe\'re happy to help — just send us a message!',
        wa:  'Hi Clean Warks! I have an enquiry about your services.'
      };
    if (path === '/' || path === '')
      return {
        msg: '👋 Hi there! Need professional cleaning?\nWe\'re just a message away!',
        wa:  'Hi Clean Warks! I\'d like to know more about your cleaning services.'
      };
    return {
      msg: '👋 Hi! Have a question?\nChat with us on WhatsApp — we respond fast!',
      wa:  'Hi Clean Warks! I have an enquiry about your services.'
    };
  }

  // ---- Build popup HTML ----
  function buildPopup() {
    var content = getPageContent();
    var waUrl   = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(content.wa);
    // Split message on \n for two-line display
    var lines   = content.msg.split('\n');
    var line1   = lines[0] || '';
    var line2   = lines[1] || '';

    var el = document.createElement('div');
    el.id  = 'cw-wa-popup';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Chat with us on WhatsApp');
    el.innerHTML =
      '<style>' +
      '#cw-wa-popup{' +
        'position:fixed;bottom:96px;right:24px;width:280px;' +
        'background:#fff;border-radius:16px;' +
        'box-shadow:0 4px 24px rgba(0,0,0,0.15);' +
        'border:1px solid #EAEAE4;overflow:hidden;' +
        'z-index:9999;font-family:"Plus Jakarta Sans",sans-serif;' +
        'opacity:0;transform:translateY(20px);' +
        'transition:opacity 0.3s ease-out,transform 0.3s ease-out;' +
      '}' +
      '#cw-wa-popup.cw-popup-show{opacity:1;transform:translateY(0);}' +
      '#cw-wa-popup.cw-popup-hide{opacity:0;transform:translateY(20px);transition:opacity 0.2s ease-in,transform 0.2s ease-in;}' +
      '.cw-popup-header{' +
        'background:#106172;padding:10px 14px;' +
        'display:flex;align-items:center;gap:8px;border-radius:16px 16px 0 0;' +
      '}' +
      '.cw-popup-header-left{display:flex;align-items:center;gap:8px;flex:1;min-width:0;}' +
      '.cw-popup-header svg{flex-shrink:0;}' +
      '.cw-popup-brand{color:#fff;font-weight:600;font-size:14px;white-space:nowrap;}' +
      '.cw-popup-close{' +
        'background:none;border:none;color:rgba(255,255,255,0.8);' +
        'cursor:pointer;font-size:18px;line-height:1;padding:2px 4px;' +
        'flex-shrink:0;transition:color 0.15s;' +
      '}' +
      '.cw-popup-close:hover{color:#fff;}' +
      '.cw-popup-body{padding:12px;}' +
      '.cw-popup-bubble{' +
        'background:#FEF8E1;border-radius:0 12px 12px 12px;' +
        'padding:12px;margin-bottom:8px;' +
      '}' +
      '.cw-popup-bubble p{margin:0;font-size:14px;color:#111;line-height:1.5;}' +
      '.cw-popup-bubble p+p{margin-top:4px;}' +
      '.cw-popup-reply{font-size:11px;color:#9CA3AF;margin-bottom:10px;}' +
      '.cw-popup-cta{' +
        'display:block;width:100%;box-sizing:border-box;' +
        'background:#25D366;color:#fff;' +
        'border:none;border-radius:100px;padding:10px;' +
        'font-family:"Plus Jakarta Sans",sans-serif;' +
        'font-size:14px;font-weight:700;text-align:center;' +
        'cursor:pointer;text-decoration:none;transition:background 0.15s;' +
      '}' +
      '.cw-popup-cta:hover{background:#1ebe5d;color:#fff;}' +
      '@media(max-width:430px){' +
        '#cw-wa-popup{width:260px;right:16px;bottom:88px;}' +
      '}' +
      '</style>' +
      '<div class="cw-popup-header">' +
        '<div class="cw-popup-header-left">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.825 9.825 0 0 0 12.04 2zm5.07 14.07c-.21.59-1.04 1.08-1.69 1.22-.44.09-1.02.17-2.97-.62-2.49-1.03-4.11-3.56-4.23-3.72-.13-.16-1-1.34-1-2.55s.64-1.81.86-2.06c.22-.25.49-.31.65-.31s.32 0 .47.01c.15 0 .35-.06.55.42.21.5.71 1.71.78 1.84.06.13.1.28.02.45-.09.16-.13.27-.25.42-.13.16-.27.35-.38.47-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.77.98.87 1.81 1.14 2.07 1.27.26.13.41.11.56-.06.16-.18.65-.76.83-1.02.18-.26.35-.21.59-.13.24.09 1.54.73 1.81.86.27.13.45.2.51.31.07.11.07.62-.14 1.21z"/></svg>' +
          '<span class="cw-popup-brand">Clean Warks</span>' +
        '</div>' +
        '<button class="cw-popup-close" id="cw-popup-close-btn" aria-label="Dismiss">&#x2715;</button>' +
      '</div>' +
      '<div class="cw-popup-body">' +
        '<div class="cw-popup-bubble">' +
          '<p>' + line1 + '</p>' +
          (line2 ? '<p>' + line2 + '</p>' : '') +
        '</div>' +
        '<p class="cw-popup-reply">Typically replies instantly</p>' +
        '<a href="' + waUrl + '" target="_blank" rel="noopener" class="cw-popup-cta">Chat on WhatsApp →</a>' +
      '</div>';

    return el;
  }

  // ---- Show / dismiss logic ----
  var popupEl = null;
  var timer   = null;

  function showPopup() {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    if (popupEl) return; // already shown

    popupEl = buildPopup();
    document.body.appendChild(popupEl);

    // Trigger enter animation after paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        popupEl.classList.add('cw-popup-show');
      });
    });

    // Dismiss button
    document.getElementById('cw-popup-close-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      dismissPopup();
    });
  }

  function dismissPopup() {
    if (!popupEl) return;
    popupEl.classList.remove('cw-popup-show');
    popupEl.classList.add('cw-popup-hide');
    setTimeout(function () {
      if (popupEl && popupEl.parentNode) popupEl.parentNode.removeChild(popupEl);
      popupEl = null;
    }, 200);
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  }

  // ---- Start timer ----
  timer = setTimeout(showPopup, DELAY_MS);

  // Clean up if page unloads before timer fires
  window.addEventListener('pagehide', function () { clearTimeout(timer); });

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
