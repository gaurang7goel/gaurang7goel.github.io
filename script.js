const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setHeaderState = () => {
  if (!header) return;
  header.dataset.elevated = String(window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        );
      });
    });
  },
  { rootMargin: "-40% 0px -52% 0px", threshold: 0 },
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 },
);

document
  .querySelectorAll(
    ".value-card, .stack-column, .cert-card, .vision-item, .contact-form",
  )
  .forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
    revealObserver.observe(element);
  });

const form = document.querySelector("#contact-form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) return;

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:gaurang7goel@gmail.com?subject=${subject}&body=${body}`;
});

const canvas = document.querySelector("#data-canvas");
const context = canvas?.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let width = 0;
let height = 0;
let nodes = [];
let rafId = 0;

const palette = ["#52f5bd", "#54c6ff", "#ff765f", "#f0c850"];

const resizeCanvas = () => {
  if (!canvas || !context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const nodeCount = width < 680 ? 30 : 58;
  nodes = Array.from({ length: nodeCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.42,
    vy: (Math.random() - 0.5) * 0.42,
    r: 1.8 + Math.random() * 2.6,
    color: palette[index % palette.length],
  }));
};

const drawCanvas = () => {
  if (!context) return;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(8, 17, 15, 0.16)";
  context.fillRect(0, 0, width, height);

  nodes.forEach((node, index) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    nodes.slice(index + 1).forEach((other) => {
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.hypot(dx, dy);
      const limit = width < 680 ? 122 : 155;

      if (distance > limit) return;

      const alpha = 1 - distance / limit;
      context.strokeStyle = `rgba(244, 240, 232, ${alpha * 0.18})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(node.x, node.y);
      context.lineTo(other.x, other.y);
      context.stroke();
    });

    context.fillStyle = node.color;
    context.shadowColor = node.color;
    context.shadowBlur = 12;
    context.beginPath();
    context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
  });

  if (!prefersReducedMotion.matches) {
    rafId = requestAnimationFrame(drawCanvas);
  }
};

if (canvas && context) {
  resizeCanvas();
  drawCanvas();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rafId);
    resizeCanvas();
    drawCanvas();
  });
}
