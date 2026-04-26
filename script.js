// ===== SMOOTH SCROLLING & NAVBAR INTERACTIONS =====
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  // Smooth scroll and active nav indicator
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Highlight active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.style.color = "#00d4ff";
      } else {
        link.style.color = "#b0b8d4";
      }
    });
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "slideInLeft 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".skill-category, .cert-card, .passion-card, .contact-card, .timeline-item",
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// ===== FORM HANDLING =====
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements[0].value;
  const email = form.elements[1].value;
  const message = form.elements[2].value;

  // Validate form
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Show success message
  const submitButton = form.querySelector(".btn");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Message Sent! 🎉";
  submitButton.style.background = "linear-gradient(135deg, #06d6a0, #00d4ff)";

  // Reset form
  form.reset();

  // Restore button after 3 seconds
  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.style.background = "";
  }, 3000);

  // Here you would typically send the data to a server
  console.log("Form Data:", { name, email, message });
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// ===== ADD FLOATING ANIMATION TO DATA STREAMS =====
window.addEventListener("load", () => {
  const dataStreams = document.querySelectorAll(".data-stream");
  dataStreams.forEach((stream, index) => {
    // Randomize animation duration for more organic feel
    const duration = 6 + Math.random() * 4;
    stream.style.animationDuration = `${duration}s`;
  });
});

// ===== TYPING EFFECT FOR HERO TITLE =====
const heroTitle = document.querySelector(".glitch-text");
if (heroTitle) {
  heroTitle.addEventListener("mouseenter", () => {
    heroTitle.style.animation = "glitch 0.3s infinite";
  });

  heroTitle.addEventListener("mouseleave", () => {
    heroTitle.style.animation = "glitch 0.5s infinite";
  });
}

// ===== CURSOR EFFECT FOR INTERACTIVE ELEMENTS =====
document.addEventListener("mousemove", (e) => {
  const buttons = document.querySelectorAll(".btn, .contact-card, .skill-tag");

  buttons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

// ===== SCROLL TO TOP BUTTON =====
const createScrollToTopButton = () => {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: #050811;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      button.style.display = "flex";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.15)";
    button.style.boxShadow = "0 0 50px rgba(0, 212, 255, 0.8)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 0 30px rgba(0, 212, 255, 0.5)";
  });
};

createScrollToTopButton();

// ===== LAZY LOADING FOR IMAGES =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ===== PRELOAD ANIMATIONS =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any modals or popups if they exist
  }

  // Quick access with Ctrl/Cmd + key
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "c") {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  }
});

// ===== CONSOLE EASTER EGG =====
console.log(
  "%c╔═══════════════════════════════════════════════════════╗",
  "color: #00d4ff; font-weight: bold;",
);
console.log(
  "%c║   Welcome to Gaurang Goel's Portfolio!               ║",
  "color: #00d4ff; font-weight: bold;",
);
console.log(
  "%c║   Data Engineer | Cloud Architect | AI Enthusiast     ║",
  "color: #00d4ff; font-weight: bold;",
);
console.log(
  "%c║                                                       ║",
  "color: #00d4ff; font-weight: bold;",
);
console.log(
  "%c║   Let's build something amazing together!            ║",
  "color: #ff006e; font-weight: bold;",
);
console.log(
  "%c╚═══════════════════════════════════════════════════════╝",
  "color: #00d4ff; font-weight: bold;",
);

console.log(
  "%cTech Stack: Azure | Databricks | Python | Data Governance",
  "color: #8338ec; font-weight: bold;",
);
console.log(
  "%cOpen to: Opportunities | Collaborations | Knowledge Sharing",
  "color: #06d6a0; font-weight: bold;",
);
