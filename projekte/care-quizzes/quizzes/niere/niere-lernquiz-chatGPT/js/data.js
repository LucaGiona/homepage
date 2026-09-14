const DATA_SOURCES = [
  ["./data/niere.json", normalizeKnowledgeQuestions],
  ["./data/niere_begriffe.json", normalizeTerms]
];

export async function loadQuizData() {
  const responses = await Promise.all(DATA_SOURCES.map(([path]) => fetch(path)));
  if (responses.some((response) => !response.ok)) {
    throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
  }
  const dataSets = await Promise.all(responses.map((response) => response.json()));
  return dataSets.flatMap((data, index) => DATA_SOURCES[index][1](data));
}

function getSubjectForGroup(group) {
  if (["physiologie", "anatomie"].includes(group)) return "grundlagen";
  if (["dialyse", "pflege_labor"].includes(group)) return "pflege";
  return "erkrankungen";
}

function normalizeTerms(terms) {
  return terms.map((term) => ({
    uid: `niere-begriff-${term.id}`,
    subject: getSubjectForGroup(term.kategorie),
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

function normalizeKnowledgeQuestions(questions) {
  return questions.map((question) => {
    const acceptedAnswers = question.akzeptierteAntworten ??
      (question.richtigeAntwort ? [question.richtigeAntwort] : []);
    return {
      uid: `niere-${question.id}`,
      subject: getSubjectForGroup(question.thema),
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
