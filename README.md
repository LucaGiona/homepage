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
- "Kalkulation mit Timer" umbenannt (Reihenfolge getauscht) und mit ironischem Beinamen "(die Kontrolletie App)" versehen, als eigene `<small>`-Zeile unter dem Titel statt inline.
- Drittes Projekt: "Melody Nelson Bar" — echte, live laufende Website (`melody-nelson.berlin`) der Cocktailbar, in der der Nutzer früher gearbeitet hat. Nur Screenshot + Link zur Live-Seite, keine Kopie im Repo (bewusst, da eigenständig laufende Fremd-/Altseite). Neuer optionaler `siteUrl`-Link in der Detailansicht dafür ergänzt.
- Bug gefunden: Beschreibungstexte in `projekte.html` nutzten `white-space: pre-line` mit manuell umgebrochenen Template-Strings — dadurch erschienen mitten im Satz Zeilenumbrüche. Behoben, indem `detail` jetzt ein Array von Absätzen ist (je ein `<p>`), `pre-line` entfernt.

- Viertes Projekt: "Care Quizzes" — Sammlung von Lernquizzes für die Pflegefachmann-Ausbildung (Herz, Niere, Gefäße, Blut, HNO u. a.), teils mit paralleler ChatGPT- und Claude-Variante desselben Themas zum direkten Vergleich. Eigenes GitHub-Repo (`care-quizzes`).
- Nur die eigentliche App kopiert (`index.html`, `css/`, `js/`, `quizzes/`, ~1,4 MB) — persönliche Lernheft-PDFs und Prompt-Templates aus dem Quellordner (~96 MB) bewusst ausgeschlossen, da nicht Teil der App.
- Als eigenständige Unterseite unter `projekte/care-quizzes/` eingebettet, gleiches Muster wie beim Timer (eigenes Theme, "Zurück zu Projekte"-Leiste, Link zum GitHub-Original).
- Fünftes Projekt: "Anatomie-Karteikarten" — Leitner-System-Karteikarten-App (Latein/Deutsch/Englisch) mit zwei unabhängigen Lernmodi (Freies Lernen, Wochenmodus). Eigenes GitHub-Repo (`karteikarten-app`). Nur die App kopiert (~150 KB), persönliche Lernheft-PDFs (~4,6 MB) aus dem Quellordner ausgeschlossen. Gleiches Einbettungsmuster wie bei Timer/Care Quizzes.
- Sechstes Projekt: "Sigismondo – Design-Varianten" — vier visuelle Design-Richtungen (Blue-Azul, Italian, Art Nouveau, Comic) derselben Bar-Demo-Website. Ordner `sigismondo_demo_pages` war unvollständig (fehlende CSS/JS/Bilder, leerer `pages-html/`-Ordner); die vollständige Version lag im Ordner `Salvatore` (eigenes GitHub-Repo `salvatore`).
- Beim Kopieren nur die tatsächlich referenzierten Bilder mitgenommen (17 MB statt 126 MB Quellordner). Absolute Root-Pfade (`/css/...`, `/assets/...`) in allen 6 HTML-Dateien auf relative Pfade umgeschrieben, je nach Verzeichnistiefe — sonst hätte die Seite nach der Einbettung ins Homepage-Root verlinkt statt in den eigenen Unterordner.
- Nebenbei einen echten kaputten Link gefunden und gefixt: zwei Seiten hatten einen von Cloudflare automatisch obfuskierten `mailto`-Link (`/cdn-cgi/l/email-protection#...`), der außerhalb von Cloudflare ins Leere läuft. Dekodiert (einfache XOR-Verschlüsselung) zu `contatto@barsigismondo.com` und durch einen echten `mailto:`-Link ersetzt.
- Die Demo-Seite selbst weist im Impressum explizit darauf hin, dass es sich um ein Demo-/Portfolioprojekt ohne echte Kontaktdaten handelt.
- "Zurück zur Übersicht"-Button in der Projekte-Detailansicht (`#project-back`) ist jetzt sticky (bleibt direkt unter der Nav kleben beim Scrollen). Bewusst nur dort, nicht bei den Zertifikaten (gleiche CSS-Klasse `.back-link`, aber gezielt über die ID eingegrenzt).
- Social-Media-Icons (GitHub, Instagram, Facebook, LinkedIn) im Footer ergänzt, oberhalb der Datenschutz/Impressum-Links — als `<img>` auf die bereits vorhandenen `assets/icons/*.svg` verlinkt, einheitlich über `.social-links`/`.social-links img` in `css/style.css` gestylt (alle gleich groß). Da der Footer sonst identisch über `templates/footer.html` eingebunden wird, hier bewusst je Seite direkt im HTML: nicht jede Seite passt zu jedem Kanal. Auswahl je Seite: Home alle vier; About alle vier; Services alle vier; Zertifikate LinkedIn+GitHub; Projekte GitHub; Drinks/Blog Instagram+Facebook; Galerie Instagram+Facebook; Impressum/Datenschutz bewusst keine (reine Rechtsseiten). Links zeigen aktuell auf `#` (Platzhalter, echte Profile fehlen noch).
- Auf der Galerie-Seite laufen die Social-Icons abweichend vom Rest: eigener Modifier `.social-links--floating` (`position: fixed`, rechter Viewportrand, vertikal zentriert, `flex-direction: column`) statt inline im Footer-Fluss — passend zur bildlastigen Seite. Unter 40rem (bestehender Breakpoint) fällt das per Media Query zurück auf normale, statische Reihe, damit die Sidebar auf schmalen Viewports keine Inhalte verdeckt.
- Portrait responsiv eingebaut: `<picture>` mit einer `<source>` (srcset über die drei bereits vorhandenen Auflösungen `assets/portraits/portrait1-{200,400,800}.webp` per Breiten-Deskriptoren + `sizes`, kein Media-Query-Art-Direction nötig, da alle drei dasselbe Bild in unterschiedlicher Auflösung sind) und `<img>`-Fallback auf die 400er-Version. Neue Klassen `.profile`/`.profile-photo`/`.profile-text` in `css/style.css` (Foto links, Text daneben, unter 40rem gestapelt mit zentriertem Foto).
- Portrait nachträglich von `about.html` auf `index.html` verschoben (neben "Meine Name ist Luca Maranta") — dort wirkt es als Hero-Einstieg passender; auf `about.html` wieder auf reinen Text zurückgebaut, um Dopplung zu vermeiden.
- Kleines rundes Badge unten rechts am Portrait ergänzt (Facebook-artiger Profilbild-Ring), mit dem bereits vorhandenen, bisher ungenutzten `assets/portraits/affePortrait.webp` (Astronauten-Affen-Figur) als verspielter Blickfang. Dafür `assets/portraits/affePortrait-badge.webp` als 160×160-Version erzeugt (ImageMagick) statt der Originaldatei mit 322 KB für ein Badge. Neue Klassen `.profile-photo-wrap` (Positionierungs-Container) und `.profile-badge` (runder Ausschnitt, Rahmen in Hintergrundfarbe) in `css/style.css`. Badge nachträglich von 40px auf 60px vergrößert.
- Affe als eigenständiges rundes Deko-Element (70px, `.affe-decoration`) unter der Nav auf `projekte.html`, `blog.html` und `drinks.html` ergänzt — rechtsbündig innerhalb des `.wrapper`-Containers (gleiche Breite/Rand wie Header/Main), mit Abstand nach unten statt direkt an der Nav zu kleben. Bewusst nur auf diesen drei Seiten, nicht überall.
- Profil-Layout auf `index.html` von starrer Zwei-Spalten-Flexbox auf klassisches Bild-Float umgestellt: `.profile-photo-wrap` jetzt `float: left`, Text läuft daneben und geht nach Ende des Bildes automatisch auf voller Breite weiter (statt in einer eigenen rechten Spalte gefangen zu bleiben). `.profile` bekommt dafür `display: flow-root` (moderner Clearfix, containt den Float sauber). Unter 40rem weiterhin gestapelt (Float aufgehoben, Bild zentriert).
- Links global auf "Unterstreichung nur beim Hovern/Fokus" umgestellt: Basis-`a`-Regel in `css/style.css` setzt jetzt `text-decoration: none`, `a:hover`/`a:focus-visible` setzen `text-decoration: underline`. Nav/Footer/Social-Links hatten das eigene Muster (kein Underline, stattdessen z. B. Border-Bottom) schon vorher und bleiben unverändert.
- "Funk und Presse"-Links auf der Startseite von losen `<a>`-Tags auf eine echte `<ul class="press-links">`-Liste umgebaut: mehr Abstand zwischen den Einträgen (Flex-Gap) plus Punkt-Trenner (`•`) per `::before` zwischen den Listenelementen, wenn sie nebeneinander liegen.
- Siebtes Projekt: "Skulptur + Raum" — Website-Neuaufbau für den Bildhauer Gøran Thie (eigenes, separates Repo `raum_skulpturen`, nicht in dieses Repo kopiert). Wie bei Melody Nelson nur Screenshot + Link, kein Code eingebettet — hier aber `repoUrl` statt `siteUrl`, weil das Projekt ein laufendes Kundenprojekt ist und noch nicht auf die eigentliche Domain deployed wurde (die aktuell dort noch live Seite ist die alte Version, nicht dieser Neuaufbau). Screenshot per Headless-Chrome vom lokal laufenden Stand erzeugt.
- "Skulptur + Raum" in der Projekte-Reihenfolge vor "Sigismondo" gezogen. Bei Sigismondo "Bar" durchgängig zu "Kaffee-Bistro" korrigiert (Summary + Detailtext), inkl. Artikel-Anpassung ("ein Kaffee-Bistro" statt "eine Bar").
- Screenshot für "Diese Website" (`assets/projekte/homepage.png`) aktualisiert — der alte Stand war veraltet (kein Portrait, alte Nav-Reihenfolge, unterstrichene Links). Neuer Screenshot per Headless-Chrome vom aktuellen lokalen Stand erzeugt und auf 1280×800 zugeschnitten.

### Ideen / offene Punkte (noch nicht umgesetzt)
- Echte Profil-URLs für die Social-Media-Icons hinterlegen (aktuell `href="#"`), sobald die Accounts existieren/feststehen.
- Eine App wurde geprüft und verworfen: "calculation-App" (Vue) — passte inhaltlich/vom Reifegrad nicht.
- Kontaktformular als eigene Injection (`templates/contact-form.html`), nur auf einer Kontakt-Seite, nicht überall.
- Ordner `Zertifikate` (Yoga, Bridgehouse, Excel, Product Owner, Kaufmännische Fachkraft) noch nicht integriert — bräuchte eigene Kategorie(n) jenseits von CSS/JS/DB/AI/Python.
- `html/galerie.html`: Tippfehler `green_water_ducks02.webpp` (doppeltes p) — Bild lädt bei größeren Viewports nicht (echtes Broken-Image).
- `html/about.html` und `html/services.html`: totes Script `js/certifications.js` eingebunden, obwohl die Seiten keine passenden Elemente haben.
- Drinks-Daten: 9 Start-Drinks sind hartcodiertes HTML, eigene Drinks laufen über LocalStorage/JS — zwei parallele Datenmodelle für dieselbe Sache.
- Kein Favicon, keine Meta-Description/Open-Graph-Tags.
- Seite ist aktuell nicht live/öffentlich geteilt (Stand 2026-09-13).

## Autor

Luca Giona 