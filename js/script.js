document.addEventListener("DOMContentLoaded", () => {
  // Icons
  if (window.lucide) lucide.createIcons();

  // Fallback: if GSAP failed to load (e.g. offline), reveal content immediately
  if (typeof gsap === "undefined") {
    document.querySelectorAll(".navbar, .reveal-up, .reveal-fade, .reveal-left, .reveal-scale").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    const nameEl = document.getElementById("typedName");
    const roleEl = document.getElementById("typedRole");
    if (nameEl) nameEl.textContent = "Sourabh Badgaiya";
    if (roleEl) roleEl.textContent = "Full Stack Developer — MERN · Next.js · TypeScript";
  }

  // ---------- Loader ----------
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader && loader.classList.add("hidden"), 500);
  });
  // Fallback in case load event already fired / assets slow
  setTimeout(() => loader && loader.classList.add("hidden"), 2500);

  // ---------- Footer year ----------
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Theme toggle (persists for session only, no localStorage per platform constraints) ----------
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  themeToggle?.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    body.setAttribute("data-theme", isDark ? "light" : "dark");
  });

  // ---------- Mobile nav ----------
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger?.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // ---------- Navbar scrolled state + scroll progress + scroll-to-top + active link ----------
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("scrollProgress");
  const scrollTopBtn = document.getElementById("scrollTop");
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    navbar?.classList.toggle("scrolled", scrollY > 40);
    if (progressBar) progressBar.style.width = progress + "%";
    scrollTopBtn?.classList.toggle("visible", scrollY > 500);

    let currentId = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTopBtn?.addEventListener("click", () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // ---------- Contact form (front-end only placeholder) ----------
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const original = btn.textContent;
    btn.textContent = "Message sent (demo)";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 2200);
  });
});
