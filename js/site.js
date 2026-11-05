/* hayden.faulkner.codes — no dependencies */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById('theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#262626' : '#cdf0a8');
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
    }
    window.dispatchEvent(new Event('themechange'));
  }

  applyTheme(root.getAttribute('data-theme') || 'dark', false);
  toggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');

  function setMenu(open) {
    links.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Scroll: nav background + spinning × ---------- */
  var bigX = document.querySelector('.big-x');
  var ticking = false;

  function onScroll() {
    ticking = false;
    nav.classList.toggle('scrolled', window.scrollY > 24);
    if (bigX && !reduceMotion) {
      var r = bigX.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        bigX.style.setProperty('--spin', ((window.innerHeight - r.top) * 0.05).toFixed(2) + 'deg');
      }
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  // Stagger siblings that enter together
  reveals.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
      return c.classList.contains('reveal');
    });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i * 70, 420) + 'ms');
  });

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion || isNaN(target)) return;
    var start = null;
    var dur = 1100;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  function show(el) {
    el.classList.add('in');
    var num = el.querySelector('[data-count]');
    if (num) countUp(num);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(show);
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contact form (Web3Forms) ---------- */
  var form = document.getElementById('contact-form');
  if (form && window.fetch) {
    var status = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(text, kind) {
      status.textContent = text;
      status.className = 'form__status' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      if (!data.access_key || data.access_key.indexOf('YOUR_') === 0) {
        setStatus('This form is not connected yet. Please use LinkedIn below.', 'err');
        return;
      }

      submitBtn.disabled = true;
      setStatus('Sending\u2026');

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (!json.success) throw new Error(json.message || 'Send failed');
          form.reset();
          setStatus('Message sent. Thanks, I will get back to you soon.', 'ok');
        })
        .catch(function () {
          setStatus('That did not send. Please try again, or use LinkedIn below.', 'err');
        })
        .then(function () { submitBtn.disabled = false; });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Hero field: a grid of × that reacts to the pointer ---------- */
  var canvas = document.getElementById('field');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentNode;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var GAP = 46;
    var w = 0, h = 0, cols = 0, rows = 0;
    var pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    var colour = '#cdf0a8';
    var running = false;
    var visible = true;

    function readColour() {
      colour = getComputedStyle(root).getPropertyValue('--fg').trim() || colour;
    }

    function resize() {
      var r = hero.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      if (!running) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = colour;
      ctx.lineCap = 'square';

      // Ease the pointer so the ripple trails behind the cursor
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      var time = t * 0.0006;
      var offX = (w - (cols - 1) * GAP) / 2;
      var offY = (h - (rows - 1) * GAP) / 2;

      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var x = offX + i * GAP;
          var y = offY + j * GAP;

          var dx = x - pointer.x;
          var dy = y - pointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var near = Math.max(0, 1 - dist / 230);
          near = near * near;

          var wave = (Math.sin(i * 0.45 + j * 0.3 + time * 2) + 1) / 2;
          var size = 2.2 + wave * 1.3 + near * 8;
          var alpha = 0.12 + wave * 0.1 + near * 0.7;
          var rot = near * Math.PI / 2 + wave * 0.25;

          var c = Math.cos(rot) * size;
          var s = Math.sin(rot) * size;

          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.5 + near * 1.4;
          ctx.beginPath();
          ctx.moveTo(x - c + s, y - s - c);
          ctx.lineTo(x + c - s, y + s + c);
          ctx.moveTo(x - c - s, y - s + c);
          ctx.lineTo(x + c + s, y + s - c);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(t) {
      if (!running) return;
      draw(t);
      requestAnimationFrame(loop);
    }

    function setRunning(on) {
      on = on && visible && !reduceMotion && !document.hidden;
      if (on === running) return;
      running = on;
      if (running) requestAnimationFrame(loop);
    }

    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (!pointer.active) {
        pointer.active = true;
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    });
    hero.addEventListener('pointerleave', function () {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
    });

    window.addEventListener('resize', resize);
    window.addEventListener('themechange', function () {
      readColour();
      if (!running) draw(0);
    });
    document.addEventListener('visibilitychange', function () { setRunning(true); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        setRunning(true);
      }).observe(hero);
    }

    readColour();
    resize();
    setRunning(true);
  }
})();
