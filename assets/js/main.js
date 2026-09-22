/* Physiotherapie Sandra Richter — Interaktion
   Alles hier ist Zugabe, keine Voraussetzung: Ohne JavaScript bleibt die
   Seite vollständig lesbar, navigierbar und bedienbar. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Design: hell / dunkel ----------
     Hell ist der Standard — bewusst unabhängig von der Systemeinstellung des
     Geräts. Wer ein dunkles Betriebssystem nutzt, soll die Praxisseite
     trotzdem zuerst hell sehen. Dunkel gibt es nur über den Schalter in der
     Kopfzeile, und diese Wahl wird pro Gerät gemerkt.
     Das Setzen des Attributs beim Laden erledigt bereits das kurze Skript im
     Kopf der Seite; hier kommt nur die Bedienung dazu. */
  var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/>'
          + '<path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.1 6.1L4.6 4.6'
          + 'M19.4 19.4l-1.5-1.5M17.9 6.1l1.5-1.5M4.6 19.4l1.5-1.5"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true">'
           + '<path d="M20.5 14.2A8.6 8.6 0 019.8 3.5a8.6 8.6 0 1010.7 10.7z"/></svg>';

  var toggle = document.getElementById('theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var BAR = { light: '#F7F5F1', dark: '#0D1817' };

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* Privatmodus o. Ä. */ }
  }

  function paintToggle(theme) {
    if (!toggle) return;
    var dark = theme === 'dark';
    toggle.innerHTML = dark ? MOON : SUN;
    toggle.setAttribute('aria-label', dark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln');
  }

  // Ohne Attribut ist die Seite hell - so liefert sie das Stylesheet aus.
  paintToggle(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('psr-theme', next);
      paintToggle(next);
      // Die Browserleiste auf Mobilgeräten mitführen
      if (themeMeta) themeMeta.content = BAR[next];
    });
  }

  /* ---------- Navigation auf kleinen Bildschirmen ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    // Hintergrund nicht mitscrollen lassen, solange das Menü offen ist
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeNav() { setNav(false); }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    // Beim Wechsel zurück auf breite Bildschirme darf kein Zustand hängen bleiben
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && nav.classList.contains('is-open')) closeNav();
    });
  }

  /* ---------- Kopfzeile beim Scrollen absetzen ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Abschnitte einblenden ----------
     Ohne .is-in ist der Inhalt bereits sichtbar; die Klasse startet nur die
     Bewegung. Fällt JavaScript aus, steht die Seite trotzdem vollständig da. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Aktiven Abschnitt in der Navigation markieren ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]:not(.nav-cta)')
  );
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var mark = function (id) {
      navLinks.forEach(function (a) {
        var active = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-current', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) mark(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Terminanfrage (Vorschau) ---------- */
  var form = document.getElementById('termin-form');
  var note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var feld = form.querySelector('#f-name');
      var name = feld && feld.value ? feld.value.trim() : '';
      note.textContent = (name ? 'Danke, ' + name + ' – i' : 'I')
        + 'n dieser Vorschau wird noch nichts versendet. Auf der fertigen Seite '
        + 'geht die Anfrage direkt an die Praxis.';
      note.style.color = 'var(--brand)';
    });
  }

  /* ---------- Logo führt zum Seitenanfang ----------
     Ohne JavaScript erledigt das der Anker #start. Hier kommt nur weiches
     Scrollen dazu und das Aufräumen der Adresszeile. */
  Array.prototype.forEach.call(document.querySelectorAll('.brand'), function (brand) {
    brand.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      closeNav();
      var sanft = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: sanft ? 'smooth' : 'auto' });
      if (window.history && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });

  /* ---------- Jahreszahl ---------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
