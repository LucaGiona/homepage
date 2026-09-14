# Niere & Harnwege – Lernquiz

Interaktives Lernquiz für die Pflegeausbildung. Die Anwendung orientiert sich technisch an der modularen ChatGPT-Variante des Projekts `frau-f-muss-umziehen`.

## Inhalte

- Anatomie und Fachbegriffe
- Physiologie und Harnbildung
- akute und chronische Niereninsuffizienz
- Glomerulopathien
- Harnsteine und Harnwegsinfektionen
- Tumoren, Verletzungen und Gefäßerkrankungen
- Dialyse
- Pflege und Laborwerte

Die Fragen wurden anhand der drei bereitgestellten Lernhefte erstellt:

- `Lernheft_Niere_Anatomie_Physiologie.pdf`
- `Lernheft_Niere_Harnbildung.pdf`
- `Niere_Harnwege.pdf`

Die Quelldokumente selbst werden nicht in diesem Quizordner gespeichert.

## Aufbau

```text
niere/
└── niere-lernquiz-chatgpt/
    ├── index.html
    ├── css/style.css
    ├── data/
    │   ├── niere.json
    │   └── niere_begriffe.json
    └── js/
        ├── app.js
        ├── config.js
        ├── data.js
        ├── dom.js
        ├── quiz-engine.js
        ├── ui.js
        └── utils.js
```

`niere.json` enthält Wissensfragen. `niere_begriffe.json` enthält Fachbegriffe, die in beide Fragerichtungen abgefragt werden können.

## Lokal starten

Da die JSON-Dateien mit `fetch()` geladen werden, muss das Projekt über einen lokalen Webserver geöffnet werden. Beispielsweise im Repository-Stamm:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Anschließend ist das Quiz unter `http://127.0.0.1:8000/quizzes/niere/niere-lernquiz-chatgpt/` erreichbar.
