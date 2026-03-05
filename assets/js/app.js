const STORAGE_KEYS = {
  theme:    "vsrn_theme",
  progress: "vsrn_progress"
};

/* ---- Theme ---- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  applyTheme(saved);

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.textContent    = saved === "dark" ? "Aydinlik Mod" : "Karanlik Mod";
  toggle.setAttribute("aria-label", saved === "dark" ? "Aydinlik moda gec" : "Karanlik moda gec");

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next    = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEYS.theme, next);
    applyTheme(next);
    toggle.textContent = next === "dark" ? "Aydinlik Mod" : "Karanlik Mod";
    toggle.setAttribute("aria-label", next === "dark" ? "Aydinlik moda gec" : "Karanlik moda gec");
  });
}

/* ---- Mobile Nav ---- */
function initMobileNav() {
  const toggle  = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-links");
  if (!toggle || !navList) return;

  toggle.setAttribute("aria-label", "Navigasyon menusu");
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close on nav link click (mobile)
  navList.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navList.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---- Accordion ---- */
function initAccordion() {
  document.querySelectorAll(".accordion-header").forEach((btn) => {
    const item = btn.closest(".accordion-item");
    if (!item) return;

    // Set initial aria state
    const isOpen = item.classList.contains("open");
    btn.setAttribute("aria-expanded", String(isOpen));

    btn.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
}

/* ---- Copy Buttons ---- */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const selector = btn.getAttribute("data-copy-target");
      const target   = selector ? document.querySelector(selector) : null;
      if (!target) return;

      const ok  = await copyText(target.textContent || "");
      const old = btn.textContent;
      btn.textContent = ok ? "Kopyalandi ✓" : "Hata!";
      setTimeout(() => { btn.textContent = old; }, 1400);
    });
  });
}

/* ---- Progress ---- */
function readProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || "{}"); }
  catch { return {}; }
}

function writeProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

function refreshProgressUI() {
  const progress = readProgress();
  const checks   = document.querySelectorAll("[data-progress-id]");
  let total = 0, done = 0;

  checks.forEach((cb) => {
    const id = cb.getAttribute("data-progress-id");
    if (!id) return;
    total++;
    cb.checked = Boolean(progress[id]);
    if (progress[id]) done++;
  });

  const ratio = total ? Math.round((done / total) * 100) : 0;
  const bar   = document.querySelector(".progress-bar");
  const text  = document.querySelector("[data-progress-text]");
  if (bar)  bar.style.width = `${ratio}%`;
  if (text) text.textContent = `%${ratio} tamamlandi`;
}

function initProgress() {
  document.querySelectorAll("[data-progress-id]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = cb.getAttribute("data-progress-id");
      if (!id) return;
      const progress = readProgress();
      progress[id]   = cb.checked;
      writeProgress(progress);
      refreshProgressUI();
    });
  });
  refreshProgressUI();
}

/* ---- Scroll Reveal ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initAccordion();
  initCopyButtons();
  initProgress();
  initReveal();
});
