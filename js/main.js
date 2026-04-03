/* ============================================================
   MAIN JS — Single source of truth for Nav, Footer, Cookie
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initNavigation();
  initScrollAnimations();
  initStats();
  initReviewForm();
  initContactForm();
  initCookieBanner();
});

/* ============================================================
   ОПРЕДЕЛЕНИЕ БАЗОВОГО ПУТИ — для подпапок (blog/ и др.)
   ============================================================ */
function getBase() {
  const scripts = document.querySelectorAll('script[src*="main.js"]');
  for (const s of scripts) {
    const src = s.getAttribute('src');
    if (src.includes('../')) return '../';
  }
  return '';
}

/* ============================================================
   ЕДИНОЕ МЕНЮ — менять только здесь
   ============================================================ */
function injectNav() {
  const placeholder = document.getElementById('site-nav');
  if (!placeholder) return;
  const b = getBase();

  placeholder.outerHTML = `
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="${b}./" class="nav-logo">
        <span class="logo-name">Доктор <em>Дубенец-Попова</em></span>
        <span class="logo-tagline">Путь к счастливому материнству</span>
      </a>
      <ul class="nav-links">
        <li><a href="${b}./">Главная</a></li>
        <li><a href="${b}about.html">Обо мне</a></li>
        <li><a href="${b}services.html">Направления</a></li>
        <li><a href="${b}blog.html">Блог</a></li>
        <li><a href="${b}reviews.html">Отзывы</a></li>
        <li><a href="${b}contact.html" class="nav-cta">Связаться</a></li>
      </ul>
      <div class="nav-hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="nav-mobile" id="mobileMenu">
    <a href="${b}./">Главная</a>
    <a href="${b}about.html">Обо мне</a>
    <a href="${b}services.html">Направления</a>
    <a href="${b}blog.html">Блог</a>
    <a href="${b}reviews.html">Отзывы</a>
    <a href="${b}contact.html" class="nav-cta">Связаться</a>
  </div>`;
}

/* ============================================================
   ЕДИНЫЙ ФУТЕР — менять только здесь
   ============================================================ */
function injectFooter() {
  const placeholder = document.getElementById('site-footer');
  if (!placeholder) return;
  const b = getBase();

  placeholder.outerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${b}./" class="nav-logo">
            <span class="logo-name">Доктор <em>Дубенец-Попова</em></span>
            <span class="logo-tagline">Путь к счастливому материнству</span>
          </a>
          <p>Информационный ресурс врача акушера-гинеколога. Материалы носят просветительский характер и не заменяют консультацию специалиста.</p>
          <p class="footer-disclaimer">Есть противопоказания.<br>Необходима консультация специалиста.</p>
        </div>
        <div>
          <h4>Навигация</h4>
          <ul class="footer-links">
            <li><a href="${b}about.html">Обо мне</a></li>
            <li><a href="${b}services.html">Направления</a></li>
            <li><a href="${b}blog.html">Блог</a></li>
            <li><a href="${b}reviews.html">Отзывы</a></li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <ul class="footer-links">
            <li><a href="https://t.me/ginecologicc" target="_blank" rel="noopener">Telegram-канал</a></li>
            <li><a href="${b}contact.html">Оставить заявку</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 dubenets.pro &mdash; Все права защищены</span>
        <div class="footer-legal">
          <a href="${b}privacy.html">Политика конфиденциальности</a>
          <span>&middot;</span>
          <a href="${b}sitemap.html">Карта сайта</a>
          <span>&middot;</span>
          <span>Сайт носит информационный характер</span>
        </div>
      </div>
    </div>
  </footer>

  <div class="cookie-banner" id="cookieBanner">
    <p>Сайт использует файлы cookie для корректной работы и анализа посещаемости. Продолжая использовать сайт, вы соглашаетесь с <a href="${b}privacy.html">политикой конфиденциальности</a>.</p>
    <div class="cookie-actions">
      <button class="cookie-accept" onclick="acceptCookie()">Принять</button>
      <button class="cookie-decline" onclick="declineCookie()">Отклонить</button>
    </div>
  </div>

  <a href="https://t.me/ginecologicc" class="floating-cta" target="_blank" rel="noopener" title="Написать в Telegram">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.12.098.153.229.168.327.016.098.036.322.02.496z"/></svg>
  </a>`;
}

/* ---------- Cookie ---------- */
function initCookieBanner() {
  if (localStorage.getItem('cookieConsent')) return;
  setTimeout(() => {
    document.getElementById('cookieBanner')?.classList.add('visible');
  }, 1500);
}
function acceptCookie() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieBanner')?.classList.remove('visible');
}
function declineCookie() {
  localStorage.setItem('cookieConsent', 'declined');
  document.getElementById('cookieBanner')?.classList.remove('visible');
}

/* ---------- Navigation ---------- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Подсветка активной страницы
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === './')) {
      a.classList.add('active');
    }
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ---------- Animated Counter ---------- */
function initStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('ru-RU') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ---------- Blog Rendering ---------- */
async function loadBlogPosts(containerId, limit) {
  try {
    const response = await fetch('blog-data.json');
    const posts = await response.json();
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = limit ? posts.slice(0, limit) : posts;
    container.innerHTML = items.map(post => `
      <a href="blog/${post.file}" class="blog-card fade-in">
        <div class="blog-card-image">
          <img src="${post.image || 'assets/blog-placeholder.jpg'}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <span class="blog-card-tag">${post.tag}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-card-meta">${post.date}</div>
        </div>
      </a>
    `).join('');
    initScrollAnimations();
  } catch (e) {
    console.log('Blog data not loaded:', e);
  }
}

/* ---------- Review Form ---------- */
function initReviewForm() {
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingInput = document.getElementById('ratingValue');
  const form = document.getElementById('reviewForm');
  const success = document.getElementById('reviewSuccess');

  if (!stars.length) return;

  stars.forEach(s => s.classList.add('active'));

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = star.dataset.value;
      if (ratingInput) ratingInput.value = val;
      stars.forEach(s => s.classList.toggle('active', s.dataset.value <= val));
    });
    star.addEventListener('mouseenter', () => {
      const val = star.dataset.value;
      stars.forEach(s => s.classList.toggle('hover', s.dataset.value <= val));
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn?.textContent;
      if (btn) { btn.textContent = 'Отправка...'; btn.disabled = true; }

      const name = document.getElementById('reviewName')?.value || '';
      const rating = ratingInput?.value || '5';
      const service = document.getElementById('reviewService')?.selectedOptions[0]?.text || '';
      const text = document.getElementById('reviewText')?.value || '';

      try {
        const res = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, contact: `${rating}/5`, topic: service, message: text, type: 'review' })
        });
        if (res.ok) {
          form.style.display = 'none';
          if (success) success.style.display = 'block';
        } else {
          throw new Error('Server error');
        }
      } catch {
        alert('Ошибка отправки. Напишите напрямую в Telegram @ginecologicc');
        if (btn) { btn.textContent = origText; btn.disabled = false; }
      }
    });
  }
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn?.textContent;
    if (btn) { btn.textContent = 'Отправка...'; btn.disabled = true; }

    const name = document.getElementById('name')?.value || '';
    const contact = document.getElementById('messenger')?.value || '';
    const topic = document.getElementById('topic')?.selectedOptions[0]?.text || '';
    const message = document.getElementById('message')?.value || '';

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, topic, message, type: 'contact' })
      });
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        throw new Error('Server error');
      }
    } catch {
      alert('Ошибка отправки. Напишите напрямую в Telegram @ginecologicc');
      if (btn) { btn.textContent = origText; btn.disabled = false; }
    }
  });
}

