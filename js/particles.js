// ==========================================================
// Lightweight mouse-reactive particle network — hero background only.
// Plain canvas 2D, no library. Pauses when hero is off-screen or the
// tab is hidden, and skips entirely for prefers-reduced-motion.
// ==========================================================
(function () {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("hero");

  let width, height, particles;
  let mouse = { x: -9999, y: -9999 };
  let running = true;
  let rafId = null;

  const PARTICLE_COUNT = 55;
  const LINK_DISTANCE = 130;
  const MOUSE_RADIUS = 150;

  function getAccentColor() {
    return (
      getComputedStyle(document.body).getPropertyValue("--accent").trim() ||
      "#6fffa0"
    );
  }

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    const accent = getAccentColor();

    // update + draw dots
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // gentle mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.x += (dx / dist) * force * 1.2;
        p.y += (dy / dist) * force * 1.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    });

    // draw connecting lines between nearby particles
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.25;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Pause when hero scrolls out of view
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop())),
    { threshold: 0.05 },
  );

  // Pause when tab is hidden
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  document.addEventListener("DOMContentLoaded", () => {
    resize();
    createParticles();
    observer.observe(hero);
    start();
  });
})();
