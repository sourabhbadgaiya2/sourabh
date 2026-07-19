// ==========================================================
// GSAP animations: page-load sequence + scroll-triggered reveals
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Page load sequence ----------
  const tl = gsap.timeline({ delay: reduceMotion ? 0 : 0.2 });

  tl.to(".navbar", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
    .to(".eyebrow", { opacity: 1, duration: 0.4 }, "-=0.2")
    .from(".terminal-window", { opacity: 0, y: 24, duration: 0.6, ease: "power2.out" }, "-=0.2")
    .from(".hero-desc", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.3")
    .from(".hero-cta", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.3")
    .from(".hero-card", { opacity: 0, scale: 0.92, duration: 0.6, ease: "power2.out" }, "-=0.5");

  // ---------- Terminal typing effect ----------
  function typeText(el, text, speed = 55) {
    return new Promise((resolve) => {
      if (!el) return resolve();
      if (reduceMotion) {
        el.textContent = text;
        return resolve();
      }
      let i = 0;
      el.textContent = "";
      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  async function runTerminal() {
    const nameEl = document.getElementById("typedName");
    const roleEl = document.getElementById("typedRole");
    await new Promise((r) => setTimeout(r, 900));
    await typeText(nameEl, "Sourabh Badgaiya");
    await new Promise((r) => setTimeout(r, 300));
    await typeText(roleEl, "Full Stack Developer — MERN · Next.js · TypeScript");
  }
  runTerminal();

  // ---------- Scroll reveals ----------
  // Using ScrollTrigger.batch instead of one ScrollTrigger per element:
  // batching groups nearby elements into a handful of listeners instead of
  // 30+ individual ones, which is what was actually causing the scroll jank.
  const fadeTargets = gsap.utils.toArray(".explore-row .tag");
  const upTargets = gsap.utils.toArray(
    ".about-text, .about-stats .stat-card, .commit, .exp-card, .skill-group, .project-card, .mini-project, .contact-link, .contact-form, .section-title"
  );

  fadeTargets.forEach((el) => el.classList.add("reveal-fade"));
  upTargets.forEach((el) => el.classList.add("reveal-up"));

  ScrollTrigger.batch(fadeTargets, {
    start: "top 90%",
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out", overwrite: true }),
    once: true,
  });

  ScrollTrigger.batch(upTargets, {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", overwrite: true }),
    once: true,
  });

  // ---------- Animated stat counters ----------
  gsap.utils.toArray(".stat-num").forEach((el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 1.4,
          snap: { innerText: 1 },
          ease: "power1.out",
        });
      },
    });
  });
});
