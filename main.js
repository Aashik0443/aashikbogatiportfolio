/* ============================================================
   AASHIK BOGATI STUDIO — main.js
   Interactive behaviors: spotlight, scroll reveal, nav,
   project switcher, modal gallery, reading progress
   ============================================================ */

"use strict";

/* ─── Data ─── */

const projects = [
  {
    title: "LOGO DESIGN",
    image: "images/persons.png",
    tag: "Logo",
    brief: "Handcrafted Ashta Mangala, Bajra frames, desk organizers, LED frames, and functional gifting products designed for meaning and manufacture.",
     images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "Branding",
    image: "assets/aashik-logofolio.jpg",
    tag: "Identity systems",
    brief: "Distinctive marks, brand systems, and visual languages built for recognition across digital, print, and market touchpoints.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "SOCIAL MEDIA CREATIVES",
    image: "assets/aashik-desk-organizer.jpg",
    tag: "Social Media Posts",
    brief: "Scroll-stopping campaign systems, launch visuals, festive creatives, and conversion-focused social design.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "COMPANY PROFILE",
    image: "assets/eca17fec-727f-4654-aedc-b29315b67bac.png",
    tag: "Gifting Products",
    brief: "Premium profile documents that turn capability, culture, and proof into a polished client-facing narrative.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "PRODUCT DESIGN",
    image: "assets/aashik-led-jali.jpg",
    tag: "Prints",
    brief: "Elegant animated invitations with mood, pacing, typography, and cultural detail for memorable celebrations.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "PRINT DESIGN",
    image: "assets/aashik-logofolio.jpg",
    tag: "3D Print",
    brief: "Brochures, flyers, posters, and print-ready assets composed with editorial hierarchy and production precision.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "3D PRINT DESIGN",
    image: "assets/eca17fec-727f-4654-aedc-b29315b67bac.png",
    tag: "3D Print Design",
    brief: "Premium profile documents that turn capability, culture, and proof into a polished client-facing narrative.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
  {
    title: "VIDEO",
    image: "assets/aashik-led-jali.jpg",
    tag: "Video",
    brief: "Campaign key visuals, offer creatives, brand announcements, and sales materials for focused market impact.",
    images: [
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png",
      "images/logo1.png"
    ],
  },
];

const collaborations = [
  {
    image: "images/logos1.png",
  },
 {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
  {
    image: "images/logos1.png",
  },
];
/* ─── Spotlight cursor ─── */
function initSpotlight() {
  const el = document.getElementById("spotlight");
  if (!el) return;

  window.addEventListener("mousemove", (e) => {
    el.style.setProperty("--x", e.clientX + "px");
    el.style.setProperty("--y", e.clientY + "px");
  });
}

/* ─── Reading progress bar ─── */
function initReadingProgress() {
  const bar = document.getElementById("reading-progress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((scrolled / max) * 100).toFixed(2) + "%";
  }, { passive: true });
}

/* ─── Scroll reveal (IntersectionObserver) ─── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ─── Active nav link on scroll ─── */
function initActiveNav() {
  const links = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = [...links].map((l) =>
    document.querySelector(l.getAttribute("href"))
  ).filter(Boolean);

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = "#" + s.id;
    });
    links.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === current);
    });
  }, { passive: true });
}

/* ─── Build marquee track ─── */
function buildMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return;

  const doubled = [...collaborations, ...collaborations];
 track.innerHTML = doubled
  .map(
    (item) => `
      <div class="marquee-item">
        <img src="${item.image}" alt="logo" />
      </div>
    `
  )
  .join("");
}

/* ─── Project switcher & preview ─── */
let activeProjectIndex = 0;

function buildProjectList() {
  const listEl = document.getElementById("project-list");
  const previewImg = document.getElementById("preview-img");
  const previewTitle = document.getElementById("preview-title");
  const previewBrief = document.getElementById("preview-brief");
  if (!listEl) return;

  listEl.innerHTML = projects
    .map(
      (p, i) => `
      <button
        class="project-btn ${i === 0 ? "active" : ""}"
        data-index="${i}"
        aria-label="View ${p.title}"
      >
        <span>
          <span class="proj-title">${p.title}</span>
          <span class="proj-tag">${p.tag}</span>
        </span>
        <svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2.5"
             viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>`
    )
    .join("");

  function setActive(index) {
    activeProjectIndex = index;
    const p = projects[index];
    listEl.querySelectorAll(".project-btn").forEach((btn, i) =>
      btn.classList.toggle("active", i === index)
    );
    if (previewImg) previewImg.src = p.image;
    if (previewTitle) previewTitle.textContent = p.title;
    if (previewBrief) previewBrief.textContent = p.brief;
  }

  listEl.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".project-btn");
    if (btn) setActive(Number(btn.dataset.index));
  });

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-btn");
    if (btn) openModal(Number(btn.dataset.index));
  });

  // Preview click also opens modal
  const preview = document.getElementById("project-preview");
  if (preview) {
    preview.addEventListener("click", () => openModal(activeProjectIndex));
  }
}

/* ─── Modal ─── */
let selectedGalleryIndex = 0;

function openModal(projectIndex) {
  selectedGalleryIndex = projectIndex;
  const backdrop = document.getElementById("modal-backdrop");
  const modalTitle = document.getElementById("modal-title");
  const gallery = document.getElementById("modal-gallery");
  if (!backdrop) return;

  modalTitle.textContent = projects[projectIndex].title;

  gallery.innerHTML = projects[projectIndex].images
  .map(
    (img) => `
      <div class="gallery-tile">
        <div class="gallery-tile-img">
          <img src="${img}" alt="" loading="lazy" />
        </div>
      </div>
    `
  )
  .join("");

  gallery.querySelectorAll(".gallery-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      selectedGalleryIndex = Number(tile.dataset.index);
      gallery.querySelectorAll(".gallery-tile").forEach((t, i) =>
        t.classList.toggle("selected", i === selectedGalleryIndex)
      );
      modalTitle.textContent = projects[selectedGalleryIndex].title;
    });
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") tile.click();
    });
  });

  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const backdrop = document.getElementById("modal-backdrop");
  if (!backdrop) return;
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

function initModal() {
  document.getElementById("modal-close")?.addEventListener("click", closeModal);

  document.getElementById("modal-backdrop")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ─── Contact form feedback ─── */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("form-submit");
  if (!form || !btn) return;

  btn.addEventListener("click", () => {
    const name = form.querySelector("#f-name").value.trim();
    const email = form.querySelector("#f-email").value.trim();
    const msg = form.querySelector("#f-message").value.trim();

    if (!name || !email || !msg) {
      btn.textContent = "Please fill all fields ✕";
      btn.style.background = "oklch(0.577 0.245 27.325)";
      setTimeout(() => {
        btn.textContent = "Send Message →";
        btn.style.background = "";
      }, 2200);
      return;
    }

    btn.textContent = "Message Sent ✓";
    btn.style.background = "oklch(0.55 0.17 142)";
    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.style.background = "";
      form.reset();
    }, 3000);
  });
}

/* ─── Dynamic year ─── */
function setYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── Mobile hamburger menu ─── */
function initHamburger() {
  const btn    = document.getElementById("nav-hamburger");
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!btn || !drawer) return;

  function openDrawer() {
    btn.classList.add("open");
    drawer.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    btn.classList.remove("open");
    drawer.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    btn.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  // Close when any drawer link is tapped
  drawer.querySelectorAll("[data-drawer-link]").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });
}

/* ─── Init all ─── */
document.addEventListener("DOMContentLoaded", () => {
  initSpotlight();
  initReadingProgress();
  initScrollReveal();
  initActiveNav();
  buildMarquee();
  buildProjectList();
  initModal();
  initContactForm();
  initHamburger();
  setYear();
});
