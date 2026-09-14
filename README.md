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
- `projekte.html` gebaut: Karten-Grid → Detailansicht (gleiches Muster wie bei den Zertifikaten), erstes echtes Projekt "Diese Website" mit echtem Screenshot statt Platzhalter.
- Drei ältere Commits mit versehentlichem `Co-Authored-By: Claude`-Trailer (aus einer Session vor der `AGENTS.md`-Regel) per Rebase bereinigt und neu gepusht.
- Kontakt (E-Mail + Telefon, mit Icons) als eigene Injection `templates/contact-info.html` ergänzt — bewusst getrennt vom Footer, damit sie später auch auf einer eigenen Kontaktformular-Seite wiederverwendet werden kann, ohne auf jeder Seite zu laufen.
- Footer auf `about.html` und `services.html` nachgerüstet (fehlte komplett); `services.html` fehlte zusätzlich das `<body>`-Tag — beides behoben, Titel "Certifacts" → "Services".
- Navigation ist jetzt sticky (bleibt beim Scrollen oben sichtbar).
- Regel "README nach jeder Aufgabe nachziehen" in `AGENTS.md` ergänzt (Abschnitt "Dokumentation").
- Nav-Reihenfolge geändert: Home, About, Services, Projekte, Galerie, Drinks, Blog, Zertifikationen.
- Nav-Reihenfolge nochmal angepasst, About ans Ende: Home, Services, Projekte, Galerie, Drinks, Blog, Zertifikationen, About.
- Nav-Reihenfolge nochmal angepasst, Galerie hinter Blog: Home, Services, Projekte, Drinks, Blog, Galerie, Zertifikationen, About.

### 2026-09-15
- Zweites echtes Projekt in `projekte.html`: "Timer mit Kalkulation" (separates Repo `Cost_Calculation_Stoppwatch`) — Zeiterfassung von Arbeitsschritten + Umsatzkalkulation, verbindet Gastro-Erfahrung mit Code.
- App als eigenständige, funktionierende Unterseite unter `projekte/timer/` eingebettet (eigenes Dark-Theme, eigene Pfade, kein Homepage-Styling) statt nur Screenshot — mit "Zurück zu Projekte"-Leiste oben, damit man wieder rausfindet.
- Detailansicht in `projekte.html` unterstützt jetzt optionale Aktions-Links ("App live ausprobieren", "Original auf GitHub").

### Ideen / offene Punkte (noch nicht umgesetzt)
- Drittes Projekt für `projekte.html` noch offen (eine App wurde geprüft und verworfen, "calculation-App"/Vue — passte nicht).
- Kontaktformular als eigene Injection (`templates/contact-form.html`), nur auf einer Kontakt-Seite, nicht überall.
- Ordner `Zertifikate` (Yoga, Bridgehouse, Excel, Product Owner, Kaufmännische Fachkraft) noch nicht integriert — bräuchte eigene Kategorie(n) jenseits von CSS/JS/DB/AI/Python.
- `html/galerie.html`: Tippfehler `green_water_ducks02.webpp` (doppeltes p) — Bild lädt bei größeren Viewports nicht (echtes Broken-Image).
- `html/about.html` und `html/services.html`: totes Script `js/certifications.js` eingebunden, obwohl die Seiten keine passenden Elemente haben.
- Drinks-Daten: 9 Start-Drinks sind hartcodiertes HTML, eigene Drinks laufen über LocalStorage/JS — zwei parallele Datenmodelle für dieselbe Sache.
- Kein Favicon, keine Meta-Description/Open-Graph-Tags.
- Seite ist aktuell nicht live/öffentlich geteilt (Stand 2026-09-13).

## Autor

Luca Giona 