// NEXORA'26 — interactive layer
// Replace this URL with your real registration form before deployment.
const REGISTRATION_URL = "https://forms.gle/hKzeyoaoxtE71fiG8";

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const modal = document.querySelector("#modal");
const registerBtn = document.querySelector("#registerBtn");
const modalClose = document.querySelector("#modalClose");
const copyConfig = document.querySelector("#copyConfig");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

registerBtn?.addEventListener("click", () => {
  if (REGISTRATION_URL.trim()) {
    window.open(REGISTRATION_URL, "_blank", "noopener,noreferrer");
  } else {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

copyConfig?.addEventListener("click", async () => {
  const note = 'const REGISTRATION_URL = "PASTE-YOUR-REGISTRATION-LINK-HERE";';
  try {
    await navigator.clipboard.writeText(note);
    copyConfig.textContent = "COPIED ✓";
    setTimeout(() => copyConfig.textContent = "COPY CONFIG NOTE", 1400);
  } catch {
    copyConfig.textContent = "EDIT SCRIPT.JS";
  }
});

// Mouse-follow glow for desktop
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

// Reveal cards as they enter the viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".event-card, .role-block, .terminal, .register-section").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .65s ease, transform .65s ease";
  observer.observe(el);
});
