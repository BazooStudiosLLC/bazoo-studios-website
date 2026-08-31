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

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
  const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const counter = gallery.querySelector('[data-gallery-count]');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === current);
    });
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle('is-active', thumbIndex === current);
      thumb.setAttribute('aria-current', thumbIndex === current ? 'true' : 'false');
    });
    if (counter) {
      counter.textContent = String(current + 1).padStart(2, '0');
    }
  };

  const restartTimer = () => {
    if (reducedMotion || slides.length < 2) return;
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(current + 1), 6500);
  };

  if (prev) {
    prev.addEventListener('click', () => {
      showSlide(current - 1);
      restartTimer();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      showSlide(current + 1);
      restartTimer();
    });
  }

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.addEventListener('click', () => {
      showSlide(thumbIndex);
      restartTimer();
    });
  });

  gallery.addEventListener('mouseenter', () => {
    if (timer) window.clearInterval(timer);
  });
  gallery.addEventListener('mouseleave', restartTimer);
  gallery.addEventListener('focusin', () => {
    if (timer) window.clearInterval(timer);
  });
  gallery.addEventListener('focusout', restartTimer);

  showSlide(0);
  restartTimer();
});
