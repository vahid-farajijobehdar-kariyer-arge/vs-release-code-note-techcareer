const STORAGE_KEYS = {
  theme: "vsrn_theme",
  progress: "vsrn_progress"
};

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  applyTheme(saved);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  toggle.textContent = saved === "dark" ? "Light Moda Gec" : "Koyu Moda Gec";
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEYS.theme, next);
    applyTheme(next);
    toggle.textContent = next === "dark" ? "Light Moda Gec" : "Koyu Moda Gec";
  });
}

function initAccordion() {
  document.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      if (!item) return;
      item.classList.toggle("open");
    });
  });
}

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
      const target = selector ? document.querySelector(selector) : null;
      if (!target) return;
      const ok = await copyText(target.textContent || "");
      const old = btn.textContent;
      btn.textContent = ok ? "Kopyalandi" : "Kopyalanamadi";
      setTimeout(() => {
        btn.textContent = old;
      }, 1200);
    });
  });
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || "{}");
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

function refreshProgressUI() {
  const progress = readProgress();
  const checks = document.querySelectorAll("[data-progress-id]");
  let total = 0;
  let done = 0;
  checks.forEach((cb) => {
    const id = cb.getAttribute("data-progress-id");
    if (!id) return;
    total += 1;
    cb.checked = Boolean(progress[id]);
    if (progress[id]) done += 1;
  });
  const ratio = total ? Math.round((done / total) * 100) : 0;
  const bar = document.querySelector(".progress-bar");
  const text = document.querySelector("[data-progress-text]");
  if (bar) bar.style.width = `${ratio}%`;
  if (text) text.textContent = `%${ratio} tamamlandi`;
}

function initProgress() {
  document.querySelectorAll("[data-progress-id]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = cb.getAttribute("data-progress-id");
      if (!id) return;
      const progress = readProgress();
      progress[id] = cb.checked;
      writeProgress(progress);
      refreshProgressUI();
    });
  });
  refreshProgressUI();
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAccordion();
  initCopyButtons();
  initProgress();
});
