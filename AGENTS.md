# AGENTS.md

Repo-weite Regeln für Coding-Agenten (Claude Code, Codex, etc.) in diesem
Projekt. Bei Widerspruch zwischen dieser Datei und älteren Notizen
(z. B. `CODE_REVIEW.txt`) gilt diese Datei — sie ist die aktuelle Quelle.

## Projekt

Statische, mehrseitige Homepage (Vanilla HTML + CSS + JS, kein Framework,
kein Build-Tool), Deployment via Netlify (automatisch bei Push/Merge auf
`main`). Inhalt ist durchgehend Deutsch.

## Git, Commits, Pull Requests — wichtig

- **Niemals Claude, Codex, "AI"/"Assistant" oder ähnliches als Autor,
  Co-Autor oder Mitwirkenden nennen** — nicht in Commit-Messages, nicht
  als `Co-authored-by:`-Trailer, nicht in PR-Beschreibungen, Issues,
  Code-Kommentaren oder sonstigen Inhalten, die auf GitHub landen.
- Commits laufen ausschließlich unter dem menschlichen Git-Autor. Keine
  generierten Signatur-/Attribution-Zeilen anhängen.

## Architektur-Grundsatz

- Kein Framework, kein Build-Tool, keine neue Package-Manager-Abhängigkeit
  einführen, ohne das explizit mit dem Projektinhaber abzustimmen. Die
  Einfachheit (reines HTML/CSS/JS) ist eine bewusste Entscheidung, kein
  Zwischenstand.

## Pfade

- Immer absolute, root-relative Pfade mit führendem `/` verwenden
  (`/css/style.css`, `/js/…`, `/html/…`). Relative Pfade brechen, sobald
  eine Seite aus einem Unterordner (`html/`) heraus referenziert wird —
  das war die Ursache mehrerer realer Bugs in diesem Projekt.
- Nach jeder Pfadänderung: Ergebnis im Browser oder per Link-Check
  prüfen, nicht nur den Code lesen.

## Templates

- Navigation, Footer und Kontakt-Infos werden ausschließlich in
  `templates/nav.html`, `templates/footer.html` bzw.
  `templates/contact-info.html` gepflegt und über `js/nav.js` per
  `fetch()` in jede Seite eingebunden. Markup dieser Bausteine niemals
  in einzelne Seiten hineinkopieren.
- Ein künftiges Kontaktformular bekommt ein eigenes Template + eigenen
  Container + eigenen `fetch()`-Aufruf, und wird nur auf der
  betreffenden Seite eingebunden, nicht überall.

## Seitenstruktur

- Jede `.html`-Seite folgt demselben Grundgerüst: `<!DOCTYPE html>`,
  `<html lang="de">`, vollständiger `<head>`, `<body>` mit Header/Nav,
  `<main>`, Footer (inkl. Links zu Impressum & Datenschutz).
- Kein `<body>` darf fehlen, keine Seite darf strukturell von den
  anderen abweichen (Referenz: `index.html`, `html/about.html`).

## Sprache & Inhalt

- `lang="de"` auf jeder Seite.
- Keine Platzhalter-/Test-Inhalte im Hauptzweig: keine
  picsum.photos-/placehold.co-Bilder, keine Platzhaltertitel wie
  "test", kein Lorem Ipsum, keine toten Testlinks/-labels.
- Alt-Texte müssen zum jeweiligen Bild passen, nicht von einem anderen
  Bild kopiert sein.

## Accessibility

- Bestehende ARIA-Patterns (`aria-expanded`, `aria-controls`,
  `aria-live`, `role`, `aria-label`/`-describedby`) beibehalten und bei
  neuen interaktiven Elementen konsequent weiterführen.
- `.visually-hidden` bleibt das sr-only-Pattern (absolute Positionierung
  + Clip, siehe `css/style.css`). Niemals auf `display: none` ändern —
  das entfernt den Inhalt auch aus dem Accessibility-Tree und macht die
  Klasse für Screenreader wirkungslos.

## Rechtliches

- Impressum und Datenschutzerklärung müssen von jeder Seite aus
  erreichbar/verlinkt bleiben (Pflicht in Deutschland).

## Bekannte offene Punkte

- Details und Historie zu bekannten Bugs stehen in `CODE_REVIEW.txt`
  (Stand 2026-08-10). Das ist ein Snapshot, kein Live-Dokument — vor
  Nutzung gegen den aktuellen Code prüfen statt blind zu übernehmen.

## Dokumentation

- Nach jeder Aufgabe, die Struktur, Verhalten oder Inhalt der Seite
  ändert: `README.md` → Abschnitt "Entwicklungs-Tagebuch" noch in
  derselben Session nachziehen (Datum, kurzer Stichpunkt was gemacht
  wurde). Erledigte Punkte aus "Ideen / offene Punkte" dort entfernen,
  neu entstandene Ideen ergänzen.
- Das Tagebuch ist bewusst knapp gehalten (Stichpunkte, kein Fließtext)
  — nicht nachträglich zusammenfassen oder ausschmücken, nur ergänzen.
