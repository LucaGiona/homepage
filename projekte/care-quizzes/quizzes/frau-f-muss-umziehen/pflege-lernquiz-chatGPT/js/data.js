const DATA_SOURCES = [
  ["./data/auge.json", (data) => normalizeTerms(data, "auge")],
  ["./data/ohr.json", (data) => normalizeTerms(data, "ohr")],
  ["./data/pflegeversicherung.json", (data) => normalizeKnowledgeQuestions(data, "pflege")],
  ["./data/sturzprophylaxe.json", (data) => normalizeKnowledgeQuestions(data, "sturz")],
  ["./data/goldene_regeln.json", (data) => normalizeQuestionsByArea(data, "goldene_regeln.json", "goldene-regeln", ["auge", "ohr"])],
  ["./data/lernzusammenfassung_zusatz.json", (data) => normalizeQuestionsByArea(data, "lernzusammenfassung_zusatz.json", "lernzusatz")]
];

export async function loadQuizData() {
  const responses = await Promise.all(
    DATA_SOURCES.map(([path]) => fetch(path))
  );

  if (responses.some((response) => !response.ok)) {
    throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
  }

  const dataSets = await Promise.all(
    responses.map((response) => response.json())
  );

  return dataSets.flatMap((data, index) => DATA_SOURCES[index][1](data));
}

function normalizeTerms(terms, subject) {
  return terms.map((term) => ({
    uid: `${subject}-${term.id}`,
    subject,
    group: term.kategorie,
    subcategory: term.kategorie,
    sourceKind: "term",
    originalMode: null,
    de: term.de,
    fachbegriff: term.fachbegriff,
    alternatives: term.alternativen ?? [],
    question: "",
    correctAnswer: term.fachbegriff,
    acceptedAnswers: [term.fachbegriff, ...(term.alternativen ?? [])],
    predefinedOptions: [],
    explanation: term.erklaerung,
    sourcePage: null
  }));
}

function normalizeQuestionsByArea(
  questions,
  sourceFile,
  uidPrefix,
  allowedAreas = ["auge", "ohr", "pflege"]
) {
  return questions.flatMap((question) => {
    if (!allowedAreas.includes(question.bereich)) {
      console.warn(`Unbekannter Bereich in ${sourceFile}`, question);
      return [];
    }

    return normalizeKnowledgeQuestions(
      [question],
      question.bereich,
      `${uidPrefix}-${question.bereich}`
    );
  });
}

function normalizeKnowledgeQuestions(questions, subject, uidNamespace = subject) {
  return questions.map((question) => {
    const acceptedAnswers = question.akzeptierteAntworten ??
      (question.richtigeAntwort ? [question.richtigeAntwort] : []);

    return {
      uid: `${uidNamespace}-${question.id}`,
      subject,
      group: question.thema,
      subcategory: question.kategorie,
      sourceKind: "knowledge",
      originalMode: question.typ,
      question: question.frage,
      correctAnswer: question.richtigeAntwort ?? acceptedAnswers[0] ?? "",
      acceptedAnswers,
      predefinedOptions: question.antworten ?? [],
      explanation: question.erklaerung,
      sourcePage: question.quelleSeite ?? null
    };
  });
}
