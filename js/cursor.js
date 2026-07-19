// ==========================================================
// Custom animated cursor (desktop only)
// ==========================================================
(function () {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveEls = "a, button, input, textarea, .tag, .project-card, .contact-link";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveEls)) {
      ring.classList.add("cursor-ring--active");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveEls)) {
      ring.classList.remove("cursor-ring--active");
    }
  });
})();
