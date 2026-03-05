const quizData = [
  {
    q: "VS Code v1.110'da hangi ozellik sohbet gecmisini kisaltir?",
    options: ["Fork", "Context compaction", "Ghostty", "Theme icon"],
    answer: 1
  },
  {
    q: "Ajan davranisini izlemek icin hangi panel geldi?",
    options: ["Problems", "Extensions", "Agent Debug Panel", "Run and Debug"],
    answer: 2
  },
  {
    q: "Terminalde goruntu gostermeyi guclendiren protokol hangisi?",
    options: ["Kitty graphics protocol", "SSH2", "FTP", "SFTP"],
    answer: 0
  },
  {
    q: "15+ kursunda tema secimi nasil?",
    options: ["Sadece light", "Sadece dark", "Dark varsayilan + light toggle", "Mavi zorunlu"],
    answer: 2
  },
  {
    q: "Explore subagent icin dogru ifade hangisi?",
    options: ["Yazma ve silme yapar", "Sadece arama/okuma ile arastirir", "Sadece terminal acabilir", "Sadece Python calistirir"],
    answer: 1
  }
];

function renderQuiz() {
  const root = document.querySelector("#quiz-root");
  if (!root) return;
  root.innerHTML = quizData
    .map((item, idx) => {
      const options = item.options
        .map(
          (opt, optIdx) =>
            `<label><input type=\"radio\" name=\"q${idx}\" value=\"${optIdx}\"> ${opt}</label>`
        )
        .join("");
      return `<div class=\"quiz-question card\"><h3>${idx + 1}. ${item.q}</h3><div class=\"quiz-options\">${options}</div></div>`;
    })
    .join("");
}

function scoreQuiz() {
  let correct = 0;
  quizData.forEach((item, idx) => {
    const selected = document.querySelector(`input[name=\"q${idx}\"]:checked`);
    if (selected && Number(selected.value) === item.answer) correct += 1;
  });
  return correct;
}

function renderResultChart(correct, total) {
  const wrong = total - correct;
  const svg = document.querySelector("#quiz-chart");
  if (!svg) return;
  const max = total || 1;
  const cHeight = (correct / max) * 180;
  const wHeight = (wrong / max) * 180;
  svg.innerHTML = `
    <title>Quiz Performans Grafigi</title>
    <desc>Dogru ve yanlis soru sayisini gosteren sutun grafigi</desc>
    <rect x="0" y="0" width="320" height="220" fill="transparent" />
    <line x1="40" y1="190" x2="290" y2="190" stroke="currentColor" stroke-opacity="0.35" />
    <rect x="80" y="${190 - cHeight}" width="70" height="${cHeight}" fill="var(--ok)" rx="8" />
    <rect x="190" y="${190 - wHeight}" width="70" height="${wHeight}" fill="var(--danger)" rx="8" />
    <text x="95" y="205" font-size="12" fill="currentColor">Dogru</text>
    <text x="205" y="205" font-size="12" fill="currentColor">Yanlis</text>
    <text x="95" y="${180 - cHeight}" font-size="12" fill="currentColor">${correct}</text>
    <text x="205" y="${180 - wHeight}" font-size="12" fill="currentColor">${wrong}</text>
  `;
}

function initQuiz() {
  renderQuiz();
  const btn = document.querySelector("#quiz-submit");
  const out = document.querySelector("#quiz-result");
  if (!btn || !out) return;

  btn.addEventListener("click", () => {
    const correct = scoreQuiz();
    const total = quizData.length;
    const percent = Math.round((correct / total) * 100);
    let level = "Harika baslangic";
    if (percent >= 80) level = "Super! Konuya cok hakimsin";
    else if (percent >= 60) level = "Iyi gidiyorsun, biraz daha tekrar";
    out.textContent = `Skor: ${correct}/${total} (%${percent}) - ${level}`;
    renderResultChart(correct, total);
  });
}

document.addEventListener("DOMContentLoaded", initQuiz);
