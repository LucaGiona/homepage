# HNO-Lernquiz (Claude-Version)

Lernquiz zu Ohr, Nase, Rachen und Kehlkopf für die Pflegeausbildung. Ohr
stammt aus der vorhandenen Fachbegriff-Datenbank (`ohr.json` aus `Frau F.
muss umziehen`), Nase/Rachen/Kehlkopf basieren auf den I-care-Lernheften im
Ordner `source/`.

## Start in VS Code

Die JSON-Dateien werden mit `fetch()` geladen. Deshalb sollte die App über
einen lokalen Server gestartet werden.

1. Den Ordner `pflege-lernquiz-claude` in VS Code öffnen.
2. Die Erweiterung **Live Server** installieren.
3. Rechtsklick auf `index.html`.
4. **Open with Live Server** auswählen.

## Ordnerstruktur

```text
pflege-lernquiz-claude/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    ├── ohr_begriffe.json
    ├── nase_begriffe.json
    ├── nase_fragen.json
    ├── rachen_begriffe.json
    ├── rachen_fragen.json
    ├── kehlkopf_begriffe.json
    └── kehlkopf_fragen.json
```

## Themenauswahl

- **Ohr**
- **Nase**
- **Rachen**
- **Kehlkopf**
- **Alle Themen**

Der Bereich-Schalter passt sich an das gewählte Thema an (z. B. Aufbau,
Anatomie/Erkrankungen für Ohr; Aufbau,
Nasennebenhöhlen, Feinbau, Gefäße & Nerven, Funktionen, Krankheitslehre für
Nase; Rachenabschnitte, Muskulatur & Mandeln für Rachen; Knorpel, Glottis für
Kehlkopf).

## Zwei JSON-Strukturen je Thema

`*_begriffe.json` enthält Fachbegriffe (Vokabelkarten), analog zu
`auge.json`/`ohr.json` im Projekt "Frau F. muss umziehen":

```json
{
  "id": 1,
  "kategorie": "knorpel",
  "de": "Schildknorpel",
  "fachbegriff": "Cartilago thyroidea",
  "alternativen": [],
  "erklaerung": "Größter Kehlkopfknorpel, bildet den Adamsapfel."
}
```

`*_fragen.json` enthält vollständige Quizfragen (Multiple Choice oder
Texteingabe):

```json
{
  "id": 2,
  "thema": "kehlkopf",
  "kategorie": "knorpel",
  "typ": "text",
  "frage": "Wie lautet der Fachbegriff für den Kehldeckel?",
  "akzeptierteAntworten": ["Epiglottis"],
  "erklaerung": "Der Kehldeckel wird als Epiglottis bezeichnet und verschließt den Kehlkopf beim Schlucken.",
  "quelleSeite": 4
}
```

Die JavaScript-Datei normalisiert beide Formate beim Laden auf ein
gemeinsames internes Fragenformat (siehe `normalizeTerms` und
`normalizeKnowledgeQuestions` in `js/app.js`).

## Quelle

- Ohr: Kopie von
  `quizzes/frau-f-muss-umziehen/pflege-lernquiz-claude/data/ohr.json`.
- Nase, Rachen, Kehlkopf: Lernhefte `source/Lernheft_Nase_1.pdf`,
  `source/Lernheft_Rachen.pdf` und `source/Lernheft_Kehlkopf.pdf`
  (I care Anatomie, Physiologie, ISBN 978-3-132-45218-3, © 2025 Thieme,
  Kapitel 8 Atmungssystem).

## Texteingabe ohne Antwort

Wer bei einer Texteingabe-Frage die Lösung nicht kennt, kann das Feld leer
lassen und Enter drücken (oder auf "Antwort prüfen" klicken). Die Frage
wird dann als falsch gewertet und die richtige Antwort inkl. Erklärung
direkt angezeigt, statt eine Eingabe zu erzwingen. Bei Multiple-Choice-Fragen
muss weiterhin eine Option ausgewählt werden.
