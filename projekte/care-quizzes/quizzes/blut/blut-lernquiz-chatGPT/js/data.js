const DATA_SOURCES = [
  ["./data/blut.json", normalizeKnowledgeQuestions],
  ["./data/blut_begriffe.json", normalizeTerms]
];

const GROUPS_BY_SUBJECT = {
  grundlagen: ["blut_aufbau", "blutgruppen", "haemostase"],
  erkrankungen: ["anaemien", "gerinnungsstoerungen", "thrombose", "entzuendung"],
  pflege: ["antikoagulation", "pflege_diagnostik"]
};

export async function loadQuizData() {
  const responses = await Promise.all(DATA_SOURCES.map(([path]) => fetch(path)));
  if (responses.some((response) => !response.ok)) throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
  const dataSets = await Promise.all(responses.map((response) => response.json()));
  return dataSets.flatMap((data, index) => DATA_SOURCES[index][1](data));
}

function getSubjectForGroup(group) {
  return Object.entries(GROUPS_BY_SUBJECT).find(([, groups]) => groups.includes(group))?.[0] ?? "grundlagen";
}

function normalizeTerms(terms) {
  return terms.map((term) => ({
    uid: `blut-begriff-${term.id}`, subject: getSubjectForGroup(term.kategorie), group: term.kategorie,
    subcategory: term.kategorie, sourceKind: "term", originalMode: null, de: term.de,
    fachbegriff: term.fachbegriff, alternatives: term.alternativen ?? [], question: "",
    correctAnswer: term.fachbegriff, acceptedAnswers: [term.fachbegriff, ...(term.alternativen ?? [])],
    predefinedOptions: [], explanation: term.erklaerung, sourcePage: null
  }));
}

function normalizeKnowledgeQuestions(questions) {
  return questions.map((question) => {
    const acceptedAnswers = question.akzeptierteAntworten ?? (question.richtigeAntwort ? [question.richtigeAntwort] : []);
    return {
      uid: `blut-${question.id}`, subject: getSubjectForGroup(question.thema), group: question.thema,
      subcategory: question.kategorie, sourceKind: "knowledge", originalMode: question.typ,
      question: question.frage, correctAnswer: question.richtigeAntwort ?? acceptedAnswers[0] ?? "",
      acceptedAnswers, predefinedOptions: question.antworten ?? [], explanation: question.erklaerung,
      sourcePage: question.quelleSeite ?? null
    };
  });
}
