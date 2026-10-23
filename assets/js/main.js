/* Roble · comportamiento de la página
   Sin librerías. El scroll suave lo hace el CSS (scroll-behavior). */
(() => {
  'use strict';

  /* ==========================================================
     CONFIGURACIÓN de WhatsApp
     ----------------------------------------------------------
     WHATSAPP_NUMBER: número de WhatsApp de Roble con código
     de país, solo dígitos, sin "+" ni espacios.
     Hoy: +506 7077-1546.
     Si el número cambia, cambialo aquí y también en los enlaces
     de index.html (buscá 50670771546); esos enlaces solo se usan
     si el navegador no ejecuta JavaScript.
     ========================================================== */
  const WHATSAPP_NUMBER = '50670771546';
  const WHATSAPP_MESSAGE = 'Hola, quiero información sobre el Bachillerato por Madurez de Roble.';

  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const fab = document.querySelector('[data-fab]');
  const closing = document.getElementById('cierre');

  /* ---------- Botones de WhatsApp ---------- */
  function setupWhatsApp() {
    const valid = /^\d{8,15}$/.test(WHATSAPP_NUMBER);
    if (!valid) {
      console.warn('[Roble] Número de WhatsApp inválido: revisá WHATSAPP_NUMBER en assets/js/main.js');
      return;
    }
    const href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    document.querySelectorAll('[data-whatsapp]').forEach((a) => { a.href = href; });
  }

  /* ---------- Encabezado: sombra, progreso y botón flotante ---------- */
  function setupScrollState() {
    let ticking = false;
    // El botón flotante se esconde cuando ya hay un botón "Quiero información" a la vista.
    const visibleCtas = new Set();

    function update() {
      ticking = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;

      header.classList.toggle('is-scrolled', y > 8);
      header.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

      if (fab) {
        const pastHero = y > window.innerHeight * 0.6;
        fab.classList.toggle('is-visible', pastHero && visibleCtas.size === 0);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    if (fab && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleCtas.add(entry.target);
          else visibleCtas.delete(entry.target);
        });
        update();
      });
      document.querySelectorAll('main .btn[data-whatsapp]').forEach((btn) => io.observe(btn));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- Menú móvil ---------- */
  function setupMenu() {
    if (!toggle || !nav) return;
    const desktop = window.matchMedia('(min-width: 64rem)');

    function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', (e) => { if (isOpen() && !header.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
    });
    desktop.addEventListener('change', () => setOpen(false));
  }

  /* ---------- Opción activa del menú según la sección visible ---------- */
  function setupScrollSpy() {
    if (!nav || !('IntersectionObserver' in window)) return;

    const links = Array.from(nav.querySelectorAll('ul a[href^="#"]'));
    const sections = links
      .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (closing) sections.push(closing);

    function setActive(id) {
      links.forEach((a) => {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    // Línea de lectura al 45% de la altura de la ventana.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-45% 0px -54% 0px' });

    sections.forEach((s) => io.observe(s));
    setActive('inicio');
  }

  /* ---------- Aparición suave al hacer scroll ---------- */
  function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) return;

    root.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => io.observe(el));
  }

  setupWhatsApp();
  setupScrollState();
  setupMenu();
  setupScrollSpy();
  setupReveal();
})();
