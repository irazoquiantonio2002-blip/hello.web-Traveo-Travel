// ===== LOADER =====
(function(){
  const loader = document.getElementById('loader');
  const fill = document.querySelector('.ld-fill');
  if(!loader) return;
  let p = 0;
  const t = setInterval(()=>{
    p += Math.random()*18;
    if(p>=100){p=100;clearInterval(t);}
    if(fill) fill.style.width = p+'%';
  },120);
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      if(fill) fill.style.width='100%';
      setTimeout(()=>loader.classList.add('hide'),300);
    },400);
  });
})();

// ===== NAV SCROLL STATE =====
(function(){
  const nav = document.getElementById('nav');
  if(!nav) return;
  const onScroll = ()=>{
    if(window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

// ===== MOBILE MENU =====
(function(){
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  if(!ham || !mob) return;
  const close = ()=>{ ham.classList.remove('open'); ham.setAttribute('aria-expanded','false'); mob.classList.remove('open'); };
  ham.addEventListener('click', ()=>{
    const open = mob.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
  });
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
})();

// ===== SCROLL REVEAL =====
(function(){
  const items = document.querySelectorAll('.rev');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  items.forEach(el=>io.observe(el));
})();

// ===== HERO TYPEWRITER =====
(function(){
  const el = document.getElementById('twText');
  if(!el) return;
  const words = ['México','El Caribe','Europa','Estados Unidos','Sudamérica','Asia','Cruceros','Todo el mundo'];
  let wi = 0, ci = 0, deleting = false;
  const speed = 70, pause = 1400;
  function tick(){
    const word = words[wi];
    if(!deleting){
      ci++;
      el.textContent = word.slice(0,ci);
      if(ci === word.length){ deleting = true; return setTimeout(tick, pause); }
    } else {
      ci--;
      el.textContent = word.slice(0,ci);
      if(ci === 0){ deleting = false; wi = (wi+1) % words.length; }
    }
    setTimeout(tick, deleting ? speed/1.6 : speed);
  }
  tick();
})();

// ===== HERO PARTICLES (lightweight) =====
(function(){
  const canvas = document.getElementById('pcanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = 46;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  function makeParticles(){
    particles = Array.from({length:COUNT}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*2 + 0.6,
      vy: -(Math.random()*0.35 + 0.08),
      vx: (Math.random()-0.5)*0.15,
      o: Math.random()*0.5 + 0.15
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10){ p.y = h+10; p.x = Math.random()*w; }
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(220,244,255,${p.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  const ro = new ResizeObserver(()=>{ resize(); makeParticles(); });
  ro.observe(canvas);
  resize();
  makeParticles();
  draw();
})();
