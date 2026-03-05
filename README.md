# VS Code v1.110 Kursu — Techcareer

**GitHub Copilot ve Claude Code ile Hizli Prototip** etkinligi icin hazirlanan, VS Code v1.110 release notes'unu Turkce ve interaktif formatta sunan GitHub Pages uyumlu mini kurs projesi.

---

## Etkinlik Bilgisi

| Alan | Detay |
|---|---|
| **Konu** | GitHub Copilot ve Claude Code ile Hizli Prototip |
| **Konusmaci** | Vahid Faraji — Sr. Applied AI Specialist @ Kariyer.net |
| **Saat** | 20.00 – 21.00 |
| **Katilimci** | 55 kisi |

---

## Proje Yapisi

```
vs-release-code-note-techcareer/
├── index.html                     # Ana sayfa + etkinlik karti
├── assets/
│   ├── css/styles.css             # AI design system, Techcareer yesil tema
│   ├── js/app.js                  # Tema, mobil nav, scroll reveal, progress
│   ├── js/quiz.js                 # Quiz motoru ve performans grafigi
│   └── svg/                       # Kategori, radar, zaman cizelgesi grafikleri
└── pages/
    ├── modul-agent.html           # Modul 1: Ajan Kontrolleri
    ├── modul-chat.html            # Modul 2: Sohbet ve Oturumlar
    ├── modul-editor-terminal.html # Modul 3: Editor + Terminal + Diller
    ├── quiz.html                  # Final Quiz (5 soru)
    └── kaynaklar.html             # Resmi linkler ve referans tablosu
```

---

## Ozellikler

### Tasarim
- AI hissi veren koyu renk paleti (derin uzay + elektrik mavisi + mor neon)
- **Techcareer marka yesili** (`#00d68f`) tipografi sistemine entegre
- Ambient radial gradient arkaplan
- Card hover glow efektleri + scroll reveal animasyonlari
- Brand badge gradient + pulse-glow animasyonu
- Light / Dark tema (localStorage ile kalici)

### Mobil Uyumluluk
- Hamburger menu (900px ve alti)
- 480px breakpoint ile tam telefon destegi
- Responsive grid: `hero-grid`, `grid-2`, `grid-3` → tek sutun

### Icerik
- **Modul 1** — Arka plan ajanlari, Claude ajanlar, Debug Paneli, Auto Approve, `/create-*` komutlari
- **Modul 2** — Session memory, `/compact`, `/fork`, model picker, dusunce cumlecikleri
- **Modul 3** — Kitty graphics, JS/TS birlestirme, NES uzak oneriler, Python Ortamlari GA
- **Quiz** — 5 soru, renkli skor mesaji, SVG performans grafigi
- **Kaynaklar** — Resmi dokuman linkleri + hizli referans tablosu

### Interaktif Bilesenler
- Accordion (aria-expanded destekli)
- Kod kopyalama butonu
- Ilerleme cubugu (localStorage)
- Canli etkinlik karti (55 katilimci listesi, kaydirilebilir)
- Scroll reveal (IntersectionObserver)

---

## Lokal Calistirma

Statik proje, derleme gerekmez:

```bash
# Direkt tarayicida ac
open index.html

# Ya da basit bir HTTP sunucusu ile
npx serve .
python3 -m http.server 8080
```

---

## GitHub Pages

Repository Settings → Pages → Branch: `main` / root klasor → Save

Yayinlanan adres: `https://<kullanici-adi>.github.io/vs-release-code-note-techcareer/`

---

## Kaynak

- [VS Code v1.110 Release Notes](https://code.visualstudio.com/updates/v1_110)
- [Copilot Agent Dokumantasyonu](https://code.visualstudio.com/docs/copilot/agents)
- [Python Environments Eklentisi](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-python-envs)
