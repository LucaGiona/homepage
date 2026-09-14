// ─── translations.js ──────────────────────────────────────────────────────────

const translations = {
  de: {
    // Header
    appTitle:    "Zeitbasierte Produktionskalkulation",
    appSubtitle: "Workflow-Tracking und Kostenberechnung auf Basis real gemessener Zeit",

    // Info Modal
    infoTitle:    "Kurze Erklärung",
    infoP1Strong: "Arbeitszeit messen. Preise fundiert kalkulieren.",
    infoP1:       "Diese App verbindet präzise Zeiterfassung mit einer direkten Kalkulation, damit du deine Arbeit realistisch bewerten kannst – egal ob für Rezepturen, Dienstleistungen oder wiederkehrende Prozesse.",
    infoP2:       "Lege einen Titel an, definiere deine Arbeitsschritte und stoppe die Zeit für jeden einzelnen Schritt. Alle Zeiten werden automatisch zusammengeführt und können mit einem Klick in die Kalkulation übernommen werden.",
    infoCaption1: "Arbeitstitel anlegen und auswählen",
    infoCaption2: "Arbeitsschritte definieren und speichern",
    infoCaption3: "Stoppuhr für jeden Schritt starten",
    infoP3:       "In der Kalkulation bestimmst du deinen Zielpreis und die geplante Produktionszeit. Die App berechnet daraus deinen Brutto-Umsatz und gibt dir eine klare Orientierung für deine Preisstruktur.",
    infoCaption4: "Preis kalkulieren und Umsatz berechnen",
    infoP4:       "Für schnelle Einschätzungen kannst du die Kalkulation auch unabhängig von der Zeiterfassung nutzen und Zeiten manuell eingeben.",
    infoCaption5:    "Zeit manuell eingeben",
    infoScreensNote: "Screenshots zeigen aktuell die deutsche Version der App.",
    infoP5Strong: "Für bessere Entscheidungen bei Zeit, Preis und Wirtschaftlichkeit.",

    // Arbeitsschritte
    sectionHeading:   "Arbeitstitel",
    labelJobTitle:    "Arbeitstitel",
    btnNew:           "Neu",
    titleSelectDefault: "— Titel auswählen —",
    titleHint:        "Titel eingeben oder aus gespeicherten auswählen",
    titleError:       "Bitte einen Arbeitstitel eingeben.",
    btnSaveTitle:     "Speichern",
    stepsSection:     "Schritte definieren & Stoppuhr",
    btnAddStep:       "Weiteren Schritt",
    btnSaveSteps:     "Speichern",
    btnSessionStart:  "Stoppuhr starten",

    // Kalkulation
    calculationSection:    "Kalkulation",
    labelImportiertZeit:   "gestoppte Zeit Schritte import:",
    labelManualZeit:       "Zeit manuell eingeben (Richtwert)",
    labelMwSt:             "MwSt.",
    mwstManualOption:      "Manuell...",
    labelPreisNetto:       "Preis Netto",
    labelPreisBrutto:      "Preis Brutto",
    labelProduktionskosten: "Produktionskosten Brutto auf Zeit",
    prodManualOption:      "Manuell",
    labelUmsatzStunde:     "Umsatz / Zeit",

    // Zeit-Einheiten
    unitStd: "Std",
    unitMin: "Min",
    unitSek: "Sek",

    // Session Drawer
    drawerTotal:          "Total",
    btnExportKalkulation: "Zu Kalkulation exportieren",
    btnSessionNext:       "Nächster Schritt",
    btnSessionCancel:     "Abbrechen / Stop",

    // Placeholders
    placeholderJobTitle:    "z.B. Rezeptur nachmachen",
    placeholderStepInput:   "z.B. Vorbereitung Utensilien",
    placeholderStepMore:    "Noch mehr Schritte?",
    placeholderStepAdding:  "Weitere Schritte hinzufügen?",
    placeholderStepRequired: "Bitte zuerst Schritte eingeben!",

    // Dynamische Meldungen (steps.js / timer-steps.js)
    titleExists:         '„{title}" existiert bereits.',
    confirmDeleteTitle:  'Arbeitstitel „{title}" und alle zugehörigen Schritte wirklich löschen?',
    stepsSaved:          '„{title}": {count} {suffix} gespeichert.',
    stepSingular:        "Schritt",
    stepPlural:          "Schritte",

    // aria-labels (dynamisch)
    ariaEditStep:   "Schritt {index} bearbeiten",
    ariaDeleteStep: "Schritt {index} löschen",
    ariaSaveChange: "Änderung speichern",
    ariaCancelEdit: "Bearbeitung abbrechen",

    // Session Drawer (dynamisch)
    btnDone:  "Fertig",
    btnClose: "Schließen",
  },

  en: {
    // Header
    appTitle:    "Time-Based Production Calculator",
    appSubtitle: "Workflow tracking and cost calculation based on real measured time",

    // Info Modal
    infoTitle:    "Quick Explanation",
    infoP1Strong: "Measure working time. Calculate prices with confidence.",
    infoP1:       "This app combines precise time tracking with direct calculation, so you can realistically assess your work – whether for recipes, services, or recurring processes.",
    infoP2:       "Create a title, define your work steps, and stop the time for each individual step. All times are automatically merged and can be transferred to the calculation with one click.",
    infoCaption1: "Create and select a work title",
    infoCaption2: "Define and save work steps",
    infoCaption3: "Start the stopwatch for each step",
    infoP3:       "In the calculation, you set your target price and planned production time. The app calculates your gross revenue and gives you clear guidance for your pricing structure.",
    infoCaption4: "Calculate price and compute revenue",
    infoP4:       "For quick estimates, you can also use the calculation independently of time tracking and enter times manually.",
    infoCaption5:    "Enter time manually",
    infoScreensNote: "Screenshots currently show the German version of the app.",
    infoP5Strong: "For better decisions on time, price, and profitability.",

    // Arbeitsschritte
    sectionHeading:   "Work Title",
    labelJobTitle:    "Work Title",
    btnNew:           "New",
    titleSelectDefault: "— Select title —",
    titleHint:        "Enter a title or choose from saved ones",
    titleError:       "Please enter a work title.",
    btnSaveTitle:     "Save",
    stepsSection:     "Define Steps & Stopwatch",
    btnAddStep:       "Add Another Step",
    btnSaveSteps:     "Save",
    btnSessionStart:  "Start Stopwatch",

    // Kalkulation
    calculationSection:    "Calculation",
    labelImportiertZeit:   "Recorded time steps import:",
    labelManualZeit:       "Enter time manually (reference value)",
    labelMwSt:             "VAT",
    mwstManualOption:      "Custom...",
    labelPreisNetto:       "Net Price",
    labelPreisBrutto:      "Gross Price",
    labelProduktionskosten: "Gross Production Costs Over Time",
    prodManualOption:      "Manual",
    labelUmsatzStunde:     "Revenue / Time",

    // Zeit-Einheiten
    unitStd: "h",
    unitMin: "min",
    unitSek: "sec",

    // Session Drawer
    drawerTotal:          "Total",
    btnExportKalkulation: "Export to Calculation",
    btnSessionNext:       "Next Step",
    btnSessionCancel:     "Cancel / Stop",

    // Placeholders
    placeholderJobTitle:    "e.g. Recreate recipe",
    placeholderStepInput:   "e.g. Prepare utensils",
    placeholderStepMore:    "More steps?",
    placeholderStepAdding:  "Add more steps?",
    placeholderStepRequired: "Please enter steps first!",

    // Dynamische Meldungen (steps.js / timer-steps.js)
    titleExists:         "\"{title}\" already exists.",
    confirmDeleteTitle:  "Really delete work title \"{title}\" and all associated steps?",
    stepsSaved:          "\"{title}\": {count} {suffix} saved.",
    stepSingular:        "step",
    stepPlural:          "steps",

    // aria-labels (dynamisch)
    ariaEditStep:   "Edit step {index}",
    ariaDeleteStep: "Delete step {index}",
    ariaSaveChange: "Save change",
    ariaCancelEdit: "Cancel editing",

    // Session Drawer (dynamisch)
    btnDone:  "Done",
    btnClose: "Close",
  }
};
