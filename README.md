# Homepage

Dieses Repository dient der Entwicklung meiner persönlichen Homepage.  
Hier werde alle Schritte dokumentiert, die für die Umsetzung und das Deployment notwenidig sind.

### EN – English 🇬🇧


*This repository is dedicated to the development of my personal homepage.  
All steps necessary for implementation and deployment will be documented here.*

## Features
- HTML + CSS + JS
  
[link to page](https://lucagionahomepage.netlify.app/)

## work on Deployment 
 via Netlify

## Entwicklungs-Tagebuch

Kurzer Verlauf, was wann gemacht wurde. Ältere Historie davor: siehe `git log`.

### 2026-09-13
- `AGENTS.md` und `CLAUDE.md` angelegt: Projektregeln festgehalten (Pfade, Templates, Accessibility, kein Platzhalter-Content, keine KI-Attribution in Commits/PRs).
- Bestehendes `CODE_REVIEW.txt` durchgegangen — viele der dort gelisteten Bugs waren zu dem Zeitpunkt schon behoben (lang-Attribute, CSS-Pfad Galerie, HTML-Struktur Impressum/Datenschutz).

### 2026-09-14
- Komplettes Redesign von `css/style.css`: Design-Tokens (Farben/Radius/Spacing), Navigation, Buttons, Formulare, Drink-Cards als Grid, Zertifikate-Liste, responsive Breakpoint.
- Dabei entdeckt und gefixt, weil es die Styling-Aufgabe sonst blockiert hätte: `drinks.html` lud `/style.css` statt `/css/style.css` (kein Styling sichtbar).
- Platzhalter entfernt: Testbilder (picsum/placehold.co) in `galerie.html`, Lorem-Ipsum auf `blog.html`/`projekte.html`, falscher Titel "Certifacts" auf `about.html`, Platzhaltertext "Some very good drinks" auf der Startseite.
- Galerie-Bilder um ~30 % verkleinert (max-width 70 %).
- Zertifikat "Functional First Steps Dark" umbenannt → "Functional First Steps" (Datei + Code).
- Zertifikate-Seite umgebaut: von einer flachen Liste zu Kategorien → Liste → Zertifikat (Drill-down), mit Zurück-Navigation und Fokus-Management. 6 Kategorien: CSS, JavaScript, Datenbanken, AI, Python, Weitere.
- 14 neue Zertifikate aus `Certification_abAug25` integriert, kryptische Dateinamen (z. B. `UC-19e91d74-...pdf`) anhand des PDF-Inhalts sauber benannt und einsortiert. PNG-Vorschauen automatisch aus den PDFs erzeugt (ImageMagick, 300 dpi).
- Cross-Document View Transitions aktiviert (`@view-transition { navigation: auto; }` in `style.css`) für weiche Seitenübergänge zwischen den HTML-Seiten (Chrome/Edge; sonst normaler Seitenwechsel als Fallback).
- Dieses Tagebuch begonnen.

### Ideen / offene Punkte (noch nicht umgesetzt)
- Ordner `Zertifikate` (Yoga, Bridgehouse, Excel, Product Owner, Kaufmännische Fachkraft) noch nicht integriert — bräuchte eigene Kategorie(n) jenseits von CSS/JS/DB/AI/Python.
- `html/galerie.html`: Tippfehler `green_water_ducks02.webpp` (doppeltes p) — Bild lädt bei größeren Viewports nicht (echtes Broken-Image).
- `html/services.html`: fehlendes `<body>`-Tag, fehlender Footer im Vergleich zu allen anderen Seiten.
- `html/about.html`: totes Script `js/certifications.js` eingebunden, obwohl die Seite keine passenden Elemente hat; Footer fehlt komplett.
- Drinks-Daten: 9 Start-Drinks sind hartcodiertes HTML, eigene Drinks laufen über LocalStorage/JS — zwei parallele Datenmodelle für dieselbe Sache.
- Kein Favicon, keine Meta-Description/Open-Graph-Tags.
- Seite ist aktuell nicht live/öffentlich geteilt (Stand 2026-09-13).

## Autor

Luca Giona 