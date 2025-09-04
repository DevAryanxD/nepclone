// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isHidden = mobileMenu.hasAttribute('hidden');
  hamburger.setAttribute('aria-expanded', String(isHidden));
  if (isHidden) mobileMenu.removeAttribute('hidden');
  else mobileMenu.setAttribute('hidden', '');
});

// Close mobile menu on nav click
mobileMenu.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    mobileMenu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// IntersectionObserver for animations
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
