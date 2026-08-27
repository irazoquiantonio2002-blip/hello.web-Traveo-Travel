/* ==========================================================================
   TRAVEOR TRAVEL — interactions
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) root.classList.add('reduce');

  /* ===== LOADER ===== */
  (function () {
    var loader = document.getElementById('loader');
    var fill = loader && loader.querySelector('.ld-fill');
    if (!loader) { root.classList.add('loaded'); return; }
    var p = 0;
    var t = setInterval(function () {
      p += Math.random() * 20;
      if (p >= 100) { p = 100; clearInterval(t); }
      if (fill) fill.style.width = p + '%';
    }, 110);

    function done() {
      if (fill) fill.style.width = '100%';
      root.classList.add('loaded');
      setTimeout(function () { loader.classList.add('hide'); }, 280);
    }
    if (document.readyState === 'complete') setTimeout(done, 400);
    else window.addEventListener('load', function () { setTimeout(done, 400); });
    // hard fallback
    setTimeout(function () { loader.classList.add('hide'); root.classList.add('loaded'); }, 4500);
  })();

  /* ===== SCROLL PROGRESS ===== */
  (function () {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || window.pageYOffset) / max * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ===== NAV SCROLL STATE ===== */
  (function () {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ===== MOBILE MENU ===== */
  (function () {
    var ham = document.getElementById('ham');
    var mob = document.getElementById('mob');
    var scrim = document.getElementById('mobScrim');
    if (!ham || !mob) return;
    function setOpen(open) {
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
      mob.classList.toggle('open', open);
      if (scrim) scrim.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    ham.addEventListener('click', function () { setOpen(!mob.classList.contains('open')); });
    if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mob.classList.contains('open')) setOpen(false);
    });
  })();

  /* ===== SCROLL REVEAL ===== */
  (function () {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ===== HERO TYPEWRITER ===== */
  (function () {
    var el = document.getElementById('twText');
    if (!el) return;
    var words = ['México', 'el Caribe', 'Europa', 'Estados Unidos', 'Sudamérica', 'Asia', 'Turquía', 'Japón', 'cruceros', 'todo el mundo'];
    if (reduceMotion) { el.textContent = 'todo el mundo'; return; }
    var wi = 0, ci = 0, deleting = false;
    var SPEED = 65, PAUSE = 1500;
    function tick() {
      var word = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);
      if (!deleting && ci === word.length) { deleting = true; return setTimeout(tick, PAUSE); }
      if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      setTimeout(tick, deleting ? SPEED / 1.7 : SPEED);
    }
    tick();
  })();

  /* ===== HERO PARALLAX ===== */
  (function () {
    if (reduceMotion) return;
    var bg = document.querySelector('.hero-bg img');
    var floaters = document.querySelectorAll('.hero-float');
    var hero = document.getElementById('inicio');
    if (!hero) return;
    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      if (y < window.innerHeight) {
        if (bg) bg.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0) scale(1.05)';
        floaters.forEach(function (f) {
          var d = parseFloat(f.getAttribute('data-depth')) || 0.06;
          f.style.marginTop = (y * d * -1) + 'px';
        });
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  })();

  /* ===== HERO PARTICLES ===== */
  (function () {
    var canvas = document.getElementById('pcanvas');
    if (!canvas || reduceMotion) { if (canvas) canvas.style.display = 'none'; return; }
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, particles = [], raf = null, visible = true;

    function measure() {
      // the host section drives the real size; the canvas element alone can report
      // its intrinsic 300x150 before/if CSS sizing is not applied
      var host = canvas.parentElement || canvas;
      var pr = host.getBoundingClientRect();
      var hw = pr.width || host.offsetWidth;
      var hh = pr.height || host.offsetHeight;
      if (hw < 2 || hh < 2) {
        var cr = canvas.getBoundingClientRect();
        hw = cr.width; hh = cr.height;
      }
      return { w: Math.round(hw || window.innerWidth), h: Math.round(hh || window.innerHeight) };
    }

    function spawn(atEdge) {
      // atEdge=false -> anywhere in the hero; atEdge=true -> just outside a random edge
      var x, y;
      if (atEdge) {
        var side = Math.floor(Math.random() * 4);
        if (side === 0) { x = Math.random() * w; y = -8; }
        else if (side === 1) { x = w + 8; y = Math.random() * h; }
        else if (side === 2) { x = Math.random() * w; y = h + 8; }
        else { x = -8; y = Math.random() * h; }
      } else { x = Math.random() * w; y = Math.random() * h; }
      var ang = Math.random() * Math.PI * 2;
      var spd = Math.random() * 0.22 + 0.04;
      return {
        x: x, y: y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 0.06,        // slight upward drift
        r: Math.random() * 1.9 + 0.6,
        base: Math.random() * 0.42 + 0.28,
        tw: Math.random() * Math.PI * 2,        // twinkle phase
        tws: Math.random() * 0.02 + 0.006
      };
    }

    function build() {
      // density based: cover the WHOLE hero evenly, denser on bigger screens
      var target = Math.round((w * h) / 12000);
      target = Math.max(60, Math.min(target, 190));
      particles = [];
      for (var i = 0; i < target; i++) particles.push(spawn(false));
    }

    function resize() {
      var m = measure();
      if (m.w < 2 || m.h < 2) return false;
      w = m.w; h = m.h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      return true;
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.tw += p.tws;
        if (p.x < -12 || p.x > w + 12 || p.y < -12 || p.y > h + 12) {
          particles[i] = spawn(true);
          continue;
        }
        var o = p.base * (0.7 + 0.3 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(226,243,247,' + o.toFixed(3) + ')';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf && visible) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    // init — retry until the hero has a real size
    (function init(tries) {
      if (resize()) { start(); return; }
      if (tries > 0) requestAnimationFrame(function () { init(tries - 1); });
    })(60);
    window.addEventListener('load', resize);

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(resize, 150);
    }, { passive: true });
    if ('ResizeObserver' in window) {
      new ResizeObserver(function () { resize(); }).observe(canvas);
    }

    // pause when hero off-screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0 }).observe(canvas);
    }
  })();

  /* ===== EXPERIENCIAS — VIDEO CAROUSEL ===== */
  (function () {
    var rail = document.getElementById('expRail');
    var media = document.getElementById('expMedia');
    var poster = document.getElementById('expPoster');
    var video = document.getElementById('expVideo');
    var playBtn = document.getElementById('expPlay');
    var badge = document.getElementById('expBadge');
    var titleEl = document.getElementById('expTitle');
    var kickerEl = document.getElementById('expKicker');
    var linkEl = document.getElementById('expLink');
    var prev = document.getElementById('expPrev');
    var next = document.getElementById('expNext');
    if (!rail || !media || !poster || !video) return;

    var thumbs = Array.prototype.slice.call(rail.querySelectorAll('.exp-thumb'));
    var current = 0;
    var clearing = false;   // true while we intentionally tear down the <video>

    function resetVideo() {
      clearing = true;
      try { video.pause(); } catch (e) {}
      video.removeAttribute('src');
      while (video.firstChild) video.removeChild(video.firstChild);
      try { video.load(); } catch (e) {}
      media.classList.remove('playing', 'is-loading');
      // let the teardown 'error'/'emptied' events pass, then re-arm
      setTimeout(function () { clearing = false; }, 0);
    }

    function select(i, focusThumb) {
      if (i < 0 || i >= thumbs.length) return;
      current = i;
      var d = thumbs[i].dataset;
      resetVideo();
      poster.src = d.poster;
      poster.alt = d.title + ' — experiencia destacada de Traveor Travel';
      titleEl.textContent = d.title;
      kickerEl.textContent = d.kicker || 'Experiencia destacada';
      badge.textContent = d.badge || '';
      linkEl.href = d.link;
      linkEl.setAttribute('aria-label', 'Ver opciones de ' + d.title);
      playBtn.setAttribute('aria-label', 'Reproducir video de ' + d.title);
      thumbs.forEach(function (t, k) {
        t.classList.toggle('is-active', k === i);
        t.setAttribute('aria-current', k === i ? 'true' : 'false');
      });
      thumbs[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      if (focusThumb) thumbs[i].focus();
      updateNav();
    }

    function play() {
      var d = thumbs[current].dataset;
      if (!d.video) return;
      if (media.classList.contains('playing')) { return; }
      clearing = false;
      media.classList.add('playing', 'is-loading');
      video.src = d.video;
      video.load();
      var pr = video.play();
      if (pr && pr.catch) {
        pr.catch(function (err) {
          // AbortError = user switched clips mid-load: ignore. Anything else: back to poster.
          if (err && (err.name === 'AbortError')) return;
          resetVideo();
        });
      }
    }

    function updateNav() {
      if (prev) prev.disabled = current === 0;
      if (next) next.disabled = current === thumbs.length - 1;
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
    });
    playBtn.addEventListener('click', play);
    poster.addEventListener('click', play);
    if (prev) prev.addEventListener('click', function () { select(current - 1); });
    if (next) next.addEventListener('click', function () { select(current + 1); });

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); select(Math.min(current + 1, thumbs.length - 1), true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(Math.max(current - 1, 0), true); }
    });

    video.addEventListener('playing', function () { media.classList.remove('is-loading'); });
    video.addEventListener('waiting', function () { media.classList.add('is-loading'); });
    video.addEventListener('ended', resetVideo);
    video.addEventListener('error', function () {
      if (clearing) return;                 // ignore the error from tearing down src
      console.warn('Traveor: no se pudo cargar el video ' + (video.currentSrc || ''));
      resetVideo();
    });

    // pause (don't tear down) when the section scrolls out of view
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting && media.classList.contains('playing')) {
          try { video.pause(); } catch (e) {}
        }
      }, { threshold: 0.15 }).observe(media);
    }

    updateNav();
  })();

  /* ===== FOOTER YEAR (safety) ===== */
  (function () {
    var y = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  })();

})();
