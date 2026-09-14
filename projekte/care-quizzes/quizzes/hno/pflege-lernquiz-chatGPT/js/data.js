const DATA_SOURCES = [
  ["./data/nase_begriffe.json", (data) => normalizeTerms(data, "nase")],
  ["./data/nase_fragen.json", (data) => normalizeKnowledgeQuestions(data, "nase")],
  ["./data/ohr.json", (data) => normalizeTerms(data, "ohr")],
  ["./data/rachen_begriffe.json", (data) => normalizeTerms(data, "rachen")],
  ["./data/rachen_fragen.json", (data) => normalizeKnowledgeQuestions(data, "rachen")],
  ["./data/kehlkopf_begriffe.json", (data) => normalizeTerms(data, "kehlkopf")],
  ["./data/kehlkopf_fragen.json", (data) => normalizeKnowledgeQuestions(data, "kehlkopf")]
];

export async function loadQuizData() {
  const responses = await Promise.all(DATA_SOURCES.map(([path]) => fetch(path)));
  if (responses.some((response) => !response.ok)) throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
  const dataSets = await Promise.all(responses.map((response) => response.json()));
  return dataSets.flatMap((data, index) => DATA_SOURCES[index][1](data));
}

function normalizeTerms(terms, subject) {
  return terms.map((term) => ({
    uid: `${subject}-begriff-${term.id}`, subject, group: term.kategorie, sourceKind: "term", originalMode: null,
    de: term.de, fachbegriff: term.fachbegriff, alternatives: term.alternativen ?? [], question: "",
    correctAnswer: term.fachbegriff, acceptedAnswers: [term.fachbegriff, ...(term.alternativen ?? [])],
    predefinedOptions: [], explanation: term.erklaerung, sourcePage: null
  }));
}

function normalizeKnowledgeQuestions(questions, subject) {
  return questions.map((question) => {
    const acceptedAnswers = question.akzeptierteAntworten ?? (question.richtigeAntwort ? [question.richtigeAntwort] : []);
    return {
      uid: `${subject}-frage-${question.id}`, subject, group: question.kategorie, sourceKind: "knowledge",
      originalMode: question.typ, question: question.frage,
      correctAnswer: question.richtigeAntwort ?? acceptedAnswers[0] ?? "", acceptedAnswers,
      predefinedOptions: question.antworten ?? [], explanation: question.erklaerung, sourcePage: question.quelleSeite ?? null
    };
  });
}
