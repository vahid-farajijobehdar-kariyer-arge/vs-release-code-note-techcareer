# vs-release-code-note-techcareer

VS Code v1.110 release notes temel bolumlerini 15+ yas icin Turkce ve interaktif bir kurs formatinda sunan GitHub Pages uyumlu proje.

## Icerik

- Cok sayfali yapi: `index` + 3 modul + `quiz` + `kaynaklar`
- VS Code benzeri high-contrast dark tema (varsayilan)
- Light/Dark toggle (kalici tercih)
- Interaktif bilesenler:
  - Acilir kartlar
  - Kod kopyalama
  - Ilerleme cubugu
  - Quiz puanlama
- SVG gorsellestirmeler:
  - Kategori dagilimi
  - Zaman cizelgesi
  - Gelisim radar
  - Quiz performans

## Lokal Calistirma

Bu proje statik oldugu icin dosyalari tarayicida acman yeterli.

- Ana dosya: `index.html`

## GitHub Repo ve Pages

1. Klasore gir:
   - `cd vs-release-code-note-techcareer`
2. Git baslat:
   - `git init`
   - `git add .`
   - `git commit -m "Ilk surum: VS Code v1.110 TR interaktif landing"`
3. GitHub repo olustur (GitHub CLI varsa):
   - `gh repo create vs-release-code-note-techcareer --public --source=. --remote=origin --push`
4. GitHub'da Pages ac:
   - Repository Settings -> Pages -> Build and deployment -> Deploy from a branch
   - Branch: `main` / `root`

## Kaynak

- https://code.visualstudio.com/updates/v1_110
