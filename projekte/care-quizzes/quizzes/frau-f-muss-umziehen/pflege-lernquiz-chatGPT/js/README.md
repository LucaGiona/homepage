# JavaScript-Refactoring

Die ursprüngliche `app.js` enthielt die gesamte Logik des Pflege-Lernquiz in
einer Datei. Mit mehr als 750 Zeilen wurde es zunehmend schwierig, einzelne
Bereiche schnell zu finden, zu verstehen und unabhängig zu bearbeiten.

Dieses Refactoring teilt den Code deshalb nach Verantwortlichkeiten in mehrere
ES-Module auf. Das Verhalten und die Bedienung des Quiz bleiben dabei
unverändert.

## Neue Modulstruktur

```text
js/
├── app.js
├── config.js
├── data.js
├── dom.js
├── quiz-engine.js
├── ui.js
├── utils.js
└── README.md
```

## Zuständigkeiten

### `app.js`

Der Einstiegspunkt der Anwendung. Die Datei verwaltet den aktuellen
Quiz-Zustand und verbindet die anderen Module miteinander.

Zu ihren Aufgaben gehören:

- Themenauswahl steuern
- Quiz starten und zurücksetzen
- aktuelle Frage und Punktestand verwalten
- Antworten prüfen lassen
- Klick- und Tastaturereignisse registrieren
- Anwendung initialisieren

Die Datei enthält keine eigene Datenaufbereitung und möglichst wenig direkte
Darstellungslogik.

### `config.js`

Enthält statische Konfigurationen und Beschriftungen:

- Bezeichnungen der Themen
- Bezeichnungen der Kategorien
- Zuordnung der Kategorien zu einem Thema
- Ermittlung der verfügbaren Kategorien für die aktuelle Themenauswahl

Neue Themen oder Kategorien können dadurch zentral ergänzt werden.

### `data.js`

Ist für das Laden und Vereinheitlichen der Quizdaten zuständig:

- lädt alle JSON-Dateien parallel mit `fetch()`
- prüft, ob alle Dateien erfolgreich geladen wurden
- normalisiert Fachbegriffe und Wissensfragen
- führt unterschiedliche JSON-Strukturen in einem gemeinsamen Fragenformat
  zusammen

Die Funktion `loadQuizData()` liefert die fertig aufbereiteten Fragen an
`app.js` zurück.

### `dom.js`

Sammelt alle dauerhaft benötigten DOM-Elemente an einer zentralen Stelle.
Andere Module importieren diese Referenzen, anstatt dieselben Elemente mehrfach
mit `document.querySelector()` zu suchen.

### `quiz-engine.js`

Enthält die fachliche Quizlogik:

- Fragen nach Thema und Kategorie filtern
- zufällige Fragen für einen Durchlauf auswählen
- Fragemodus bestimmen
- Fachbegriffe in beide Richtungen abfragen
- Antwortmöglichkeiten für Multiple Choice erzeugen
- Eingaben mit den akzeptierten Antworten vergleichen

Dieses Modul ist weitgehend unabhängig von der Benutzeroberfläche.

### `ui.js`

Kümmert sich um die Darstellung im Browser:

- Kategorien im Auswahlfeld aktualisieren
- aktiven Themen-Button markieren
- Start-, Quiz- und Ergebnisansicht wechseln
- Fragen und Antwortfelder darstellen
- Benutzereingaben auslesen
- Eingabefelder nach der Auswertung deaktivieren
- Ergebnistext erzeugen

### `utils.js`

Enthält kleine, allgemein verwendbare Hilfsfunktionen:

- `shuffleArray()` mischt ein Array, ohne das ursprüngliche Array zu verändern
- `normalizeAnswer()` vereinheitlicht Antworten für den Vergleich
- `escapeHtml()` schützt dynamische Texte bei der HTML-Ausgabe

## ES-Module

Damit die Dateien mit `import` und `export` zusammenarbeiten, wurde die
Einbindung in `index.html` geändert:

```html
<script type="module" src="./js/app.js"></script>
```

`app.js` ist der einzige Einstiegspunkt. Alle weiteren JavaScript-Dateien
werden von dort direkt oder indirekt importiert.

## Anwendung lokal starten

Die Anwendung verwendet sowohl ES-Module als auch `fetch()` zum Laden der
JSON-Dateien. Sie sollte deshalb über einen lokalen Webserver geöffnet werden,
nicht direkt als `file://`-Datei.

Beispiel mit VS Code:

1. Projektordner in VS Code öffnen.
2. Erweiterung **Live Server** installieren.
3. Rechtsklick auf `index.html`.
4. **Open with Live Server** auswählen.

Alternativ im Ordner `pflege-lernquiz-chatGPT`:

```bash
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Ergebnis des Refactorings

- `app.js` wurde von rund 750 auf etwa 150 Zeilen verkleinert.
- Daten, Quizlogik und Darstellung sind voneinander getrennt.
- Einzelne Bereiche lassen sich schneller finden und bearbeiten.
- Neue Datenquellen, Kategorien oder Darstellungsvarianten können gezielter
  ergänzt werden.
- Gemeinsam verwendete Logik ist nicht mehr über die Hauptdatei verteilt.

## Durchgeführte Prüfungen

Nach dem Refactoring wurden folgende Punkte geprüft:

- Syntax aller JavaScript-Module
- vollständiges Laden der Module und JSON-Dateien
- Start eines neuen Quiz
- Darstellung einer Frage und ihrer Antwortmöglichkeiten
- Auswahl und Auswertung einer richtigen Antwort
- Aktualisierung des Punktestands
- Anzeige des Buttons für die nächste Frage
- Browser-Konsole auf JavaScript-Fehler

Bei diesen Prüfungen wurden keine JavaScript-Fehler festgestellt.

## Hinweise für weitere Änderungen

- Neue UI-Darstellung gehört in der Regel nach `ui.js`.
- Neue Quizregeln gehören nach `quiz-engine.js`.
- Neue Datenquellen oder JSON-Formate gehören nach `data.js`.
- Neue Bezeichnungen und Themenzuordnungen gehören nach `config.js`.
- `app.js` sollte hauptsächlich den Ablauf koordinieren.
- Abhängigkeiten sollten möglichst nur in eine Richtung laufen, damit keine
  zirkulären Imports entstehen.
