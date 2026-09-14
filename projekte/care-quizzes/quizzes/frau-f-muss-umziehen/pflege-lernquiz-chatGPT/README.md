# Pflege-Lernquiz

Die bisherige Auge-und-Ohr-App enthält jetzt zusätzlich Fragen zu:

- Pflegeversicherung
- Pflegegraden
- Leistungen der Pflegeversicherung
- Entlassungs- und Überleitungsmanagement
- Sturzrisikofaktoren und Sturzprophylaxe
- Goldenen Regeln im Umgang mit seh- und hörbeeinträchtigten Menschen

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
    ├── goldene_regeln.json
    ├── ohr.json
    ├── pflegeversicherung.json
    └── sturzprophylaxe.json
```

## Themenauswahl

- **Auge**
- **Ohr**
- **Auge & Ohr**
- **Pflegeversicherung**
- **Sturzprophylaxe**
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
