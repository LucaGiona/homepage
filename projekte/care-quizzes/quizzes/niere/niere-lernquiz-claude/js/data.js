const DATA_SOURCES = [
  ["./data/niere_begriffe.json", normalizeTerms],
  ["./data/niere.json", normalizeKnowledgeQuestions]
];

export async function loadQuizData(subject) {
  const responses = await Promise.all(
    DATA_SOURCES.map(([path]) => fetch(path))
  );

  if (responses.some((response) => !response.ok)) {
    throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
  }

  const payloads = await Promise.all(
    responses.map((response) => response.json())
  );

  return payloads.flatMap((payload, index) => {
    const [, normalize] = DATA_SOURCES[index];
    return normalize(payload, subject);
  });
}

export function normalizeTerms(terms, subject) {
  return terms.map((term) => ({
    uid: `${subject}-begriff-${term.id}`,
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
    acceptedAnswers: [
      term.fachbegriff,
      ...(term.alternativen ?? [])
    ],
    predefinedOptions: [],
    explanation: term.erklaerung,
    sourcePage: null
  }));
}

export function normalizeKnowledgeQuestions(questions, subject) {
  return questions.map((question) => {
    const acceptedAnswers =
      question.akzeptierteAntworten ??
      (question.richtigeAntwort ? [question.richtigeAntwort] : []);

    return {
      uid: `${subject}-frage-${question.id}`,
      subject,
      group: question.thema,
      subcategory: question.kategorie,
      sourceKind: "knowledge",
      originalMode: question.typ,
      question: question.frage,
      correctAnswer:
        question.richtigeAntwort ??
        acceptedAnswers[0] ??
        "",
      acceptedAnswers,
      predefinedOptions: question.antworten ?? [],
      explanation: question.erklaerung,
      sourcePage: question.quelleSeite ?? null
    };
  });
}
