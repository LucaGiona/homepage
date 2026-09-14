# Pflege-Lernquiz

Die bisherige Auge-und-Ohr-App enthält jetzt zusätzlich Fragen zu:

- Pflegeversicherung
- Pflegegraden
- Leistungen der Pflegeversicherung
- Entlassungs- und Überleitungsmanagement

## Start in VS Code

Die JSON-Dateien werden mit `fetch()` geladen. Deshalb sollte die App über
einen lokalen Server gestartet werden.

1. Den Ordner `pflege-lernquiz` in VS Code öffnen.
2. Die Erweiterung **Live Server** installieren.
3. Rechtsklick auf `index.html`.
4. **Open with Live Server** auswählen.

## Ordnerstruktur

```text
pflege-lernquiz/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    ├── auge.json
    ├── ohr.json
    └── pflegeversicherung.json
```

## Themenauswahl

- **Auge**
- **Ohr**
- **Auge & Ohr**
- **Pflegeversicherung**
- **Alle Themen**

Der Bereich-Schalter passt sich an das gewählte Thema an:

- Auge/Ohr: Anatomie und Erkrankungen
- Pflegeversicherung: Pflegeversicherung, Pflegegrade, Leistungen und Entlassungsmanagement

## Unterschiedliche JSON-Strukturen

`auge.json` und `ohr.json` enthalten Fachbegriffe:

```json
{
  "id": 1,
  "kategorie": "anatomie",
  "de": "Hornhaut",
  "fachbegriff": "Kornea",
  "alternativen": ["Cornea"],
  "erklaerung": "Der durchsichtige vordere Teil der äußeren Augenhaut."
}
```

`pflegeversicherung.json` enthält vollständige Quizfragen:

```json
{
  "id": 1,
  "thema": "pflegeversicherung",
  "kategorie": "grundlagen",
  "typ": "multiple-choice",
  "frage": "In welchem Sozialgesetzbuch ist die Pflegeversicherung geregelt?",
  "antworten": ["SGB V", "SGB XI", "SGB VI", "SGB VII"],
  "richtigeAntwort": "SGB XI",
  "erklaerung": "Das 11. Buch des Sozialgesetzbuchs regelt die rechtlichen Grundlagen der Pflegeversicherung."
}
```

Die JavaScript-Datei normalisiert beide Formate beim Laden auf ein gemeinsames
internes Fragenformat.

## Texteingabe ohne Antwort

Wer bei einer Texteingabe-Frage die Lösung nicht kennt, kann das Feld leer
lassen und Enter drücken (oder auf "Antwort prüfen" klicken). Die Frage
wird dann als falsch gewertet und die richtige Antwort inkl. Erklärung
direkt angezeigt, statt eine Eingabe zu erzwingen. Bei Multiple-Choice-Fragen
muss weiterhin eine Option ausgewählt werden.
