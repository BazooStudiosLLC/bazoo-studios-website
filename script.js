const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.getElementById('year').textContent = new Date().getFullYear();

const siteHeader = document.querySelector('.site-header');
const navigation = siteHeader?.querySelector('nav');
const navigationToggle = siteHeader?.querySelector('.nav-toggle');
if (siteHeader && navigation && navigationToggle) {
  navigationToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-open');
    navigationToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      siteHeader.classList.remove('is-open');
      navigationToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      siteHeader.classList.remove('is-open');
      navigationToggle.setAttribute('aria-expanded', 'false');
      navigationToggle.focus();
    }
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('in-view'));
}

if (!reducedMotion) {
  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });
}
