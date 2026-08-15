const revealEls = document.querySelectorAll('.reveal');
const revealBtn = document.getElementById('revealBtn');
const celebrateBtn = document.getElementById('celebrateBtn');
const sparkleBtn = document.getElementById('sparkleBtn');
const letterCard = document.getElementById('letterCard');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const heartContainer = document.querySelector('.floating-hearts');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

const showerHearts = () => {
  const heartCount = 18;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
    heart.style.animationDuration = `${(10 + Math.random() * 12).toFixed(2)}s`;
    heart.style.setProperty('--drift', `${(Math.random() * 160 - 80).toFixed(2)}px`);
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
  }
};

const createBurst = () => {
  const particles = [];
  const colors = ['#ff6ec7', '#f9a8d4', '#c084fc', '#7dd3fc', '#fef08a'];

  for (let i = 0; i < 140; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      r: Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * 12,
      dy: (Math.random() - 0.5) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
    });
  }

  let frame = 0;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.06;
      p.alpha -= 0.006;

      ctx.beginPath();
      ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    frame += 1;
    if (frame < 90 && particles.some((p) => p.alpha > 0)) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  render();
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

revealBtn.addEventListener('click', () => {
  letterCard.classList.add('visible');
  letterCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showerHearts();
  createBurst();
});

celebrateBtn.addEventListener('click', () => {
  showerHearts();
  createBurst();
});

sparkleBtn.addEventListener('click', () => {
  showerHearts();
  createBurst();
  document.body.style.transition = 'filter 0.5s ease';
  document.body.style.filter = 'brightness(1.08) saturate(1.2)';
  setTimeout(() => {
    document.body.style.filter = 'none';
  }, 500);
});

setInterval(() => {
  showerHearts();
}, 3500);

setTimeout(() => {
  letterCard.classList.add('visible');
}, 500);
