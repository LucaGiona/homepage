# HNO-Lernquiz (ChatGPT-Version)

Interaktives Lernquiz zu Nase, Ohr, Rachen und Kehlkopf für die Pflegeausbildung. Die Umsetzung folgt der modularen ChatGPT-Version von „Frau F. muss umziehen“.

## Start

Da die sieben JSON-Dateien mit `fetch()` geladen werden, muss die App über einen lokalen Webserver gestartet werden, zum Beispiel in VS Code mit **Live Server**.

## Inhalte

- Themen: Nase, Ohr, Rachen, Kehlkopf oder alle Themen
- Fachbegriffe in beide Übersetzungsrichtungen
- Wissensfragen als Multiple Choice und Texteingabe
- Filterung nach fachlichem Bereich
- Auswahl von 5, 10, 15 oder 20 Fragen
- Punkteanzeige, Fortschritt und unmittelbare Erklärungen

## Tastaturbedienung

- `Enter` gibt eine Texteingabe ab.
- Bei leerem Textfeld zeigt `Enter` die richtige Antwort und Erklärung an; die Frage zählt als falsch.
- Nach dem Feedback öffnet ein weiteres `Enter` die nächste Frage.
- Multiple-Choice-Fragen benötigen weiterhin eine ausgewählte Antwort.

## Datenquellen

Die HNO-Dateien in `data/` basieren auf `source/Lernheft_Nase_1.pdf`, `source/Lernheft_Rachen.pdf` und `source/Lernheft_Kehlkopf.pdf`. `ohr.json` ist eine lauffähige Kopie aus der ChatGPT-Version von „Frau F. muss umziehen“. Die Wissensfragen enthalten die jeweilige PDF-Seite in `quelleSeite`; die JSON-Strukturen entsprechen den Vorlagen in `templates/json/`.
