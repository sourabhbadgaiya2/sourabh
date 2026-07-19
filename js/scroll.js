// ==========================================================
// NOTE: Lenis (synthetic smooth-scroll) has been removed.
// Lenis re-implements scrolling in JS on top of native scroll — even
// tuned well, it adds a calculation step between your input and the
// screen, which reads as "delay" especially on touchpads. Native
// scroll has zero synthetic delay, so we rely on that instead, plus
// CSS `scroll-behavior: smooth` (already in style.css) for anchor-link
// jumps. GSAP ScrollTrigger works fine directly against native scroll,
// no bridging code needed.
// ==========================================================
window.lenis = null;

