const quizData = [
  {
    q: "VS Code v1.110'da hangi ozellik uzun sohbet gecmisini kisaltir?",
    options: ["Fork", "Context compaction", "Ghostty", "Theme icon"],
    answer: 1
  },
  {
    q: "Ajan davranisini gercek zamanli izlemek icin hangi panel eklendi?",
    options: ["Problems", "Extensions", "Agent Debug Panel", "Run and Debug"],
    answer: 2
  },
  {
    q: "Terminalde yuksek kaliteli gorsel gosterimini saglayan protokol hangisidir?",
    options: ["Kitty graphics protocol", "SSH2", "FTP", "SFTP"],
    answer: 0
  },
  {
    q: "Explore subagent hakkinda dogru ifade hangisidir?",
    options: ["Yazma ve silme yapar", "Sadece arama/okuma ile arastirir", "Sadece terminal acabilir", "Dogrudan cagirilabilir"],
    answer: 1
  },
  {
    q: "JS ve TS ayarlarini birlesik yonetmek icin hangi prefix kullanilir?",
    options: ["editor.*", "js/ts.*", "lang.*", "code.*"],
    answer: 1
  }
];

function renderQuiz() {
  const root = document.querySelector("#quiz-root");
  if (!root) return;

  root.innerHTML = quizData.map((item, idx) => {
    const options = item.options.map((opt, optIdx) =>
      `<label>
        <input type="radio" name="q${idx}" value="${optIdx}" aria-label="${opt}">
        ${opt}
      </label>`
    ).join("");

    return `<div class="quiz-question card reveal reveal-delay-${(idx % 3) + 1}">
      <h3>${idx + 1}. ${item.q}</h3>
      <div class="quiz-options">${options}</div>
    </div>`;
  }).join("");

  // Trigger reveal for dynamically added elements
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    root.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }
}

function scoreQuiz() {
  let correct = 0;
  quizData.forEach((item, idx) => {
    const sel = document.querySelector(`input[name="q${idx}"]:checked`);
    if (sel && Number(sel.value) === item.answer) correct++;
  });
  return correct;
}

function renderResultChart(correct, total) {
  const svg = document.querySelector("#quiz-chart");
  if (!svg) return;

  const wrong   = total - correct;
  const barH    = 160;
  const baseline = 190;
  // Minimum bar height of 4px so 0 still shows a sliver
  const cH = correct > 0 ? Math.max(4, Math.round((correct / total) * barH)) : 0;
  const wH = wrong   > 0 ? Math.max(4, Math.round((wrong   / total) * barH)) : 0;

  const cY = baseline - cH;
  const wY = baseline - wH;

  svg.innerHTML = `
    <title>Quiz Performans Grafigi</title>
    <desc>${correct} dogru, ${wrong} yanlis</desc>
    <rect x="0" y="0" width="320" height="220" fill="transparent"/>
    <line x1="40" y1="${baseline}" x2="290" y2="${baseline}" stroke="currentColor" stroke-opacity="0.25" stroke-width="1"/>
    <rect x="75" y="${cH > 0 ? cY : baseline}" width="65" height="${cH}" fill="var(--ok)" rx="8" opacity="0.9"/>
    <rect x="185" y="${wH > 0 ? wY : baseline}" width="65" height="${wH}" fill="var(--danger)" rx="8" opacity="0.9"/>
    <text x="107" y="${baseline + 16}" font-size="11" fill="currentColor" text-anchor="middle">Dogru</text>
    <text x="217" y="${baseline + 16}" font-size="11" fill="currentColor" text-anchor="middle">Yanlis</text>
    ${cH > 0 ? `<text x="107" y="${cY - 6}" font-size="13" font-weight="700" fill="var(--ok)" text-anchor="middle">${correct}</text>` : ""}
    ${wH > 0 ? `<text x="217" y="${wY - 6}" font-size="13" font-weight="700" fill="var(--danger)" text-anchor="middle">${wrong}</text>` : ""}
    ${cH === 0 ? `<text x="107" y="${baseline - 8}" font-size="12" fill="var(--muted)" text-anchor="middle">0</text>` : ""}
    ${wH === 0 ? `<text x="217" y="${baseline - 8}" font-size="12" fill="var(--muted)" text-anchor="middle">0</text>` : ""}
  `;
}

function initQuiz() {
  renderQuiz();

  const btn = document.querySelector("#quiz-submit");
  const out = document.querySelector("#quiz-result");
  if (!btn || !out) return;

  btn.addEventListener("click", () => {
    const correct = scoreQuiz();
    const total   = quizData.length;
    const pct     = Math.round((correct / total) * 100);

    let level, color;
    if (pct === 100) { level = "Mukemmel! Her soruyu bildin."; color = "var(--ok)"; }
    else if (pct >= 80) { level = "Harika! Konuya cok hakimsin."; color = "var(--ok)"; }
    else if (pct >= 60) { level = "Iyi gidiyorsun, biraz daha tekrar yap."; color = "var(--warning)"; }
    else               { level = "Modulleri tekrar oku ve denemeye devam et."; color = "var(--danger)"; }

    out.innerHTML = `<span style="color:${color};font-weight:700;">${correct}/${total}</span> <span class="muted">(%${pct}) — ${level}</span>`;
    renderResultChart(correct, total);
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

document.addEventListener("DOMContentLoaded", initQuiz);
