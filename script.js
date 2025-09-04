// Helper: prefers-reduced-motion
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme toggle with localStorage
(function themeToggle(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const apply = mode => {
    document.documentElement.dataset.theme = mode;
    btn.querySelector('.toggle-icon').textContent = mode === 'dark' ? '☾' : '☀';
  };
  const saved = localStorage.getItem('theme');
  const init = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(init);
  btn.addEventListener('click', () => {
    const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('theme', next);
  });
})();

// Scroll reveal using IntersectionObserver
(function revealOnScroll(){
  const els = document.querySelectorAll('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  els.forEach(el => io.observe(el));
})();

// Subtle tilt on cards based on pointer
(function tiltCards(){
  const cards = document.querySelectorAll('.tilt');
  const strength = 6;
  cards.forEach(card => {
    let raf = null;
    function onMove(e){
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - .5) * strength;
      const ry = (x - .5) * -strength;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `translateY(-2px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }
    function reset(){
      if(raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    }
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', reset);
  });
})();

// Decorative math particles in header
(function mathParticles(){
  const field = document.getElementById('math-field');
  if(!field || reduceMotion) return;
  const glyphs = ['∇', 'Δ', 'Σ', 'π', 'λ', 'μ', 'Vₘ', 'V₍my₎', 'Cₘ', 'Rᵢ', 'rₚₙ'];
  const count = 18;
  const frag = document.createDocumentFragment();
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'math';
    s.textContent = glyphs[i % glyphs.length];
    const startX = Math.random()*100;
    const size = 16 + Math.random()*28;
    const duration = 12 + Math.random()*10;
    const delay = -Math.random()*duration;
    s.style.left = startX+'%';
    s.style.bottom = (-10 - Math.random()*30)+'vh';
    s.style.fontSize = size+'px';
    s.style.animationDuration = duration+'s';
    s.style.animationDelay = delay+'s';
    s.style.opacity = (0.07 + Math.random()*0.14).toFixed(2);
    frag.appendChild(s);
  }
  field.appendChild(frag);
})();

// Smooth scroll focus management for accessibility
(function smoothFocus(){
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        setTimeout(() => target.removeAttribute('tabindex'), 500);
      }
    });
  });
})();
