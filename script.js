// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const isHidden = mobileMenu.hasAttribute('hidden');
  hamburger.setAttribute('aria-expanded', String(isHidden));
  if (isHidden) mobileMenu.removeAttribute('hidden');
  else mobileMenu.setAttribute('hidden', '');
});
mobileMenu.addEventListener('click', e => {
  if (e.target.matches('a')) { mobileMenu.setAttribute('hidden',''); hamburger.setAttribute('aria-expanded','false'); }
});

// Header shadow + back-to-top
const header = document.querySelector('.site-header');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header.classList.toggle('scrolled', y > 8);
  toTop.classList.toggle('show', y > 600);
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Intersection animations + progress bars
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('in');

    // animate skill meters
    entry.target.querySelectorAll('.meter').forEach(m => {
      const lvl = +m.dataset.level || 0;
      const span = m.querySelector('span');
      requestAnimationFrame(() => (span.style.width = `${lvl}%`));
    });

    // counters
    entry.target.querySelectorAll('.num[data-count]').forEach(el => {
      const target = +el.dataset.count;
      const time = 1000 + Math.random() * 800;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / time, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else if (el.textContent.endsWith('0') && target < 100) el.textContent = target; // ensure exact
      };
      requestAnimationFrame(step);
    });

    io.unobserve(entry.target);
  }
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

// Scroll spy (desktop nav)
const spyLinks = [...document.querySelectorAll('[data-spy]')];
const sections = spyLinks.map(a => document.querySelector(a.getAttribute('href')));
const activate = (i) => spyLinks.forEach((a,j)=>a.classList.toggle('active', j===i));
const spy = () => {
  const y = window.scrollY + 130;
  let idx = 0;
  for (let i=0;i<sections.length;i++){
    const s = sections[i];
    if (s && s.offsetTop <= y) idx = i;
  }
  activate(idx);
};
spy(); window.addEventListener('scroll', spy);

// Bot track: drag to scroll (mobile nicety)
const botTrack = document.getElementById('botTrack');
let isDown = false, startX = 0, scrollLeft = 0;
const start = (e) => { isDown = true; startX = (e.pageX || e.touches?.[0].pageX) - botTrack.offsetLeft; scrollLeft = botTrack.scrollLeft; };
const move = (e) => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches?.[0].pageX) - botTrack.offsetLeft; botTrack.scrollLeft = scrollLeft - (x - startX); };
['mousedown','touchstart'].forEach(ev=>botTrack.addEventListener(ev,start,{passive:true}));
['mousemove','touchmove'].forEach(ev=>botTrack.addEventListener(ev,move,{passive:false}));
['mouseleave','mouseup','touchend','touchcancel'].forEach(ev=>botTrack.addEventListener(ev,()=>isDown=false));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
