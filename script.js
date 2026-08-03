const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.getElementById('year').textContent = new Date().getFullYear();

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

const matrixCanvas = document.getElementById('matrix-rain');
if (matrixCanvas && !reducedMotion) {
  const context = matrixCanvas.getContext('2d', { alpha: true });
  const maskCanvas = document.createElement('canvas');
  const maskContext = maskCanvas.getContext('2d', { willReadFrequently: true });
  const pointer = { x: innerWidth * .7, y: innerHeight * .2 };
  let width = 0;
  let height = 0;
  let fontSize = 15;
  let columns = [];
  let mask = null;
  let lastFrame = 0;

  const rebuildMask = () => {
    maskCanvas.width = Math.max(1, Math.floor(width));
    maskCanvas.height = Math.max(1, Math.floor(height));
    maskContext.clearRect(0, 0, width, height);
    maskContext.fillStyle = '#fff';
    maskContext.textAlign = 'center';
    maskContext.textBaseline = 'middle';
    maskContext.font = `800 ${Math.min(width * .16, 190)}px Manrope, sans-serif`;
    const center = height * .5;
    maskContext.fillText('BAZOO', width * .5, center - Math.min(width * .07, 82));
    maskContext.fillText('STUDIOS', width * .5, center + Math.min(width * .07, 82));
    mask = maskContext.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data;
  };

  const resizeMatrix = () => {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    matrixCanvas.width = Math.floor(width * ratio);
    matrixCanvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    fontSize = width < 650 ? 13 : 15;
    const count = Math.ceil(width / fontSize);
    columns = Array.from({ length: count }, (_, index) => ({
      x: index * fontSize,
      y: Math.random() * height,
      speed: .55 + Math.random() * 1.35,
      length: 5 + Math.floor(Math.random() * 9)
    }));
    rebuildMask();
  };

  const isLogoPixel = (x, y) => {
    if (!mask || x < 0 || y < 0 || x >= width || y >= height) return false;
    return mask[(Math.floor(y) * maskCanvas.width + Math.floor(x)) * 4 + 3] > 80;
  };

  const drawMatrix = (time) => {
    requestAnimationFrame(drawMatrix);
    if (time - lastFrame < 38) return;
    lastFrame = time;
    context.clearRect(0, 0, width, height);
    context.font = `500 ${fontSize}px DM Mono, monospace`;
    context.textAlign = 'center';

    columns.forEach((column) => {
      column.y += column.speed * fontSize * .52;
      if (column.y - column.length * fontSize > height) {
        column.y = -Math.random() * height * .45;
        column.speed = .55 + Math.random() * 1.35;
      }

      for (let trail = 0; trail < column.length; trail += 1) {
        const y = column.y - trail * fontSize;
        if (y < -fontSize || y > height + fontSize) continue;
        const logo = isLogoPixel(column.x, y);
        const distance = Math.hypot(column.x - pointer.x, y - pointer.y);
        const glow = Math.max(0, 1 - distance / 300);
        const alpha = logo
          ? Math.max(.38, 1 - trail / (column.length * 1.35))
          : (.025 + glow * .25) * (1 - trail / column.length);
        context.fillStyle = logo
          ? `rgba(239, 65, 69, ${alpha})`
          : `rgba(200, 46, 49, ${alpha})`;
        context.fillText(Math.random() > .5 ? '1' : '0', column.x, y);
      }
    });
  };

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  window.addEventListener('resize', resizeMatrix, { passive: true });
  resizeMatrix();
  requestAnimationFrame(drawMatrix);
}
