# Sourabh Badgaiya — Portfolio (Dev Build)

Vanilla HTML/CSS/JS portfolio. GSAP + ScrollTrigger for animation, Lenis for smooth
scroll, Lucide for icons. Dark/light theme toggle. All content is currently **dummy
data** so the site is fully browsable while you build — replace before shipping.

## Run locally

No build step. Just serve the folder (opening `index.html` directly also works,
but a local server avoids any CORS quirks with fonts/icons):

```bash
npx serve .
# or
python3 -m http.server 5500
```

## Design concept

Terminal / git-log themed dark portfolio. Hero is a fake terminal window that types
out your name and role (`$ whoami`). "Journey" section is styled as a `git log`
of your career. JetBrains Mono for headings/labels, Inter for body copy. Accent
color is a terminal green (`--accent`), with git-diff red (`--accent-2`) used only
for the "dummy data" flags so real content is easy to find and remove.

## File map

```
portfolio/
├── index.html          → all sections, linked to css/js below
├── css/
│   ├── style.css        → tokens, layout, components
│   ├── animations.css   → keyframes + reveal base states (GSAP targets these)
│   └── responsive.css   → breakpoints (980px, 760px, 480px)
├── js/
│   ├── cursor.js         → custom dot + ring cursor (desktop only)
│   ├── scroll.js         → Lenis smooth scroll, synced to ScrollTrigger
│   ├── gsap.js            → load-in timeline, terminal typing, scroll reveals, stat counters
│   └── script.js          → theme toggle, mobile nav, scroll progress/top, active nav link, form
└── assets/
    ├── images/, icons/, fonts/  → empty, drop real files in
    └── resume.pdf                → not included yet, add your real resume here
```

## TODO before going live (search for `dummy-flag` in index.html)

- [ ] Real email, phone, location
- [ ] Real About Me story (currently placeholder bio)
- [ ] Real LinkedIn URL
- [ ] Confirm/replace tech stack for AI Workflow SaaS Platform & Coaching Platform
      (Tacoza's stack is filled in from memory: Django REST Framework + Next.js + PostgreSQL)
- [ ] Add `assets/resume.pdf`
- [ ] Achievements / Certifications / Open Source sections — not built yet, only
      placeholders exist in the source data doc (add a section once you have content)
- [ ] Wire the contact form to a real backend or a service like Formspree —
      right now it's a front-end-only demo (no emails actually sent)
- [ ] Swap the initials avatar (`SB`) for a real photo if you want one
- [ ] Add real project links once repos/live URLs are public

## Notes

- No localStorage/sessionStorage is used anywhere (theme resets each page load by design).
- Reduced-motion users get animations disabled automatically.
- Cursor customization auto-disables on touch devices.
