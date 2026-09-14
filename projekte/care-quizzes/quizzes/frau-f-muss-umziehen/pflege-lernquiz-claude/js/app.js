const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const topicButtons = document.querySelectorAll("#topic-buttons .topic-button");
const categoryButtonsContainer = document.querySelector("#category-buttons");
const modeButtons = document.querySelectorAll("#mode-buttons .topic-button");
const amountSelect = document.querySelector("#amount-select");

const startButton = document.querySelector("#start-button");
const checkButton = document.querySelector("#check-button");
const nextButton = document.querySelector("#next-button");
const quitButton = document.querySelector("#quit-button");
const restartButton = document.querySelector("#restart-button");

const scoreElement = document.querySelector("#score");
const progressElement = document.querySelector("#progress");
const progressBar = document.querySelector("#progress-bar");
const categoryLabel = document.querySelector("#category-label");
const questionTypeElement = document.querySelector("#question-type");
const questionElement = document.querySelector("#question");
const answerArea = document.querySelector("#answer-area");
const feedbackElement = document.querySelector("#feedback");
const resultText = document.querySelector("#result-text");
const reviewList = document.querySelector("#review-list");

const GROUP_LABELS = {
  anatomie: "Anatomie",
  erkrankung: "Erkrankungen",
  pflegeversicherung: "Pflegeversicherung",
  pflegegrade: "Pflegegrade",
  leistungen: "Leistungen",
  entlassungsmanagement: "Entlassungsmanagement",
  risikofaktoren: "Risikofaktoren",
  einschaetzung: "Einschätzung",
  beratung: "Beratung",
  mobilitaet: "Mobilität",
  umgebung: "Umgebung",
  hilfsmittel: "Hilfsmittel",
  medikation: "Medikation",
  alltag: "Alltag",
  nach_sturz: "Nach einem Sturz",
  grundsaetze: "Grundsätze",
  umgang_hoerbeeintraechtigung: "Umgang mit Hörbeeinträchtigung",
  umgang_sehbeeintraechtigung: "Umgang mit Sehbeeinträchtigung",
  augenmedikamente: "Augenmedikamente",
  augenerkrankungen: "Augenerkrankungen",
  traenenwege: "Tränenwege",
  pupillenreaktion: "Pupillenreaktion",
  presbyakusis: "Presbyakusis",
  wohnformen: "Wohnformen",
  kurzzeitpflege: "Kurzzeitpflege",
  pflegebeduerftigkeit: "Pflegebedürftigkeit"
};

const TOPIC_LABELS = {
  auge: "Auge",
  ohr: "Ohr",
  sinnesorgane: "Auge & Ohr",
  pflege: "Pflegeversicherung",
  sturz: "Sturzprophylaxe",
  alle: "Alle Themen"
};

const SUBJECT_EMOJI = {
  auge: "👁️",
  ohr: "👂",
  pflege: "🏥",
  sturz: "🦯"
};

let allQuestions = [];
let quizQuestions = [];
let selectedTopic = "alle";
let selectedCategory = "alle";
let selectedMode = "gemischt";
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

async function loadQuizData() {
  try {
    const [
      eyeResponse,
      earResponse,
      careResponse,
      fallPreventionResponse,
      goldenRulesResponse,
      summaryResponse
    ] = await Promise.all([
      fetch("./data/auge.json"),
      fetch("./data/ohr.json"),
      fetch("./data/pflegeversicherung.json"),
      fetch("./data/sturzprophylaxe.json"),
      fetch("./data/goldene_regeln.json"),
      fetch("./data/lernzusammenfassung_zusatz.json")
    ]);

    if (
      !eyeResponse.ok ||
      !earResponse.ok ||
      !careResponse.ok ||
      !fallPreventionResponse.ok ||
      !goldenRulesResponse.ok ||
      !summaryResponse.ok
    ) {
      throw new Error("Die Quizdaten konnten nicht vollständig geladen werden.");
    }

    const [
      eyeTerms,
      earTerms,
      careQuestions,
      fallPreventionQuestions,
      goldenRuleQuestions,
      summaryQuestions
    ] = await Promise.all([
      eyeResponse.json(),
      earResponse.json(),
      careResponse.json(),
      fallPreventionResponse.json(),
      goldenRulesResponse.json(),
      summaryResponse.json()
    ]);

    allQuestions = [
      ...normalizeTerms(eyeTerms, "auge"),
      ...normalizeTerms(earTerms, "ohr"),
      ...normalizeCareQuestions(careQuestions),
      ...normalizeFallPreventionQuestions(fallPreventionQuestions),
      ...normalizeGoldenRuleQuestions(goldenRuleQuestions),
      ...normalizeSummaryQuestions(summaryQuestions)
    ];

    startButton.disabled = false;
    startButton.textContent = "Quiz starten";
  } catch (error) {
    startButton.disabled = true;
    startButton.textContent = "Quizdaten fehlen";

    startScreen.insertAdjacentHTML(
      "beforeend",
      `<p class="feedback wrong">
        ${escapeHtml(error.message)}<br>
        Starte das Projekt über einen lokalen Server, zum Beispiel mit Live Server.
      </p>`
    );

    console.error(error);
  }
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
    acceptedAnswers: [
      term.fachbegriff,
      ...(term.alternativen ?? [])
    ],
    predefinedOptions: [],
    explanation: term.erklaerung,
    sourcePage: null
  }));
}

function normalizeCareQuestions(questions) {
  return normalizeKnowledgeQuestions(questions, "pflege");
}

function normalizeFallPreventionQuestions(questions) {
  return normalizeKnowledgeQuestions(questions, "sturz", {
    groupField: "kategorie"
  });
}

function normalizeGoldenRuleQuestions(questions) {
  return questions.flatMap((question) => {
    if (question.bereich !== "auge" && question.bereich !== "ohr") {
      console.warn("Unbekannter Bereich in goldene_regeln.json", question);
      return [];
    }

    return normalizeKnowledgeQuestions([question], question.bereich, {
      uidNamespace: `goldene-regeln-${question.bereich}`
    });
  });
}

function normalizeSummaryQuestions(questions) {
  return questions.flatMap((question) => {
    if (
      question.bereich !== "auge" &&
      question.bereich !== "ohr" &&
      question.bereich !== "pflege"
    ) {
      console.warn(
        "Unbekannter Bereich in lernzusammenfassung_zusatz.json",
        question
      );
      return [];
    }

    return normalizeKnowledgeQuestions([question], question.bereich, {
      uidNamespace: `zusatz-${question.bereich}`
    });
  });
}

function normalizeKnowledgeQuestions(
  questions,
  subject,
  { uidNamespace = subject, groupField = "thema" } = {}
) {
  return questions.map((question) => {
    const acceptedAnswers =
      question.akzeptierteAntworten ??
      (question.richtigeAntwort ? [question.richtigeAntwort] : []);

    return {
      uid: `${uidNamespace}-${question.id}`,
      subject,
      group: question[groupField],
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

function selectTopic(topic) {
  selectedTopic = topic;

  topicButtons.forEach((button) => {
    const isActive = button.dataset.topic === topic;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateCategoryOptions();
}

function updateCategoryOptions() {
  const eyeGroups = [
    "anatomie",
    "erkrankung",
    "umgang_sehbeeintraechtigung",
    "augenmedikamente",
    "augenerkrankungen",
    "traenenwege",
    "pupillenreaktion"
  ];
  const earGroups = [
    "anatomie",
    "erkrankung",
    "umgang_hoerbeeintraechtigung",
    "presbyakusis"
  ];
  const sensoryOrganGroups = [
    "anatomie",
    "erkrankung",
    "umgang_sehbeeintraechtigung",
    "umgang_hoerbeeintraechtigung",
    "augenmedikamente",
    "augenerkrankungen",
    "traenenwege",
    "pupillenreaktion",
    "presbyakusis"
  ];
  const careGroups = [
    "pflegeversicherung",
    "pflegegrade",
    "leistungen",
    "entlassungsmanagement",
    "wohnformen",
    "kurzzeitpflege",
    "pflegebeduerftigkeit"
  ];
  const fallPreventionGroups = [
    "risikofaktoren",
    "einschaetzung",
    "beratung",
    "mobilitaet",
    "umgebung",
    "hilfsmittel",
    "medikation",
    "alltag",
    "nach_sturz",
    "grundsaetze"
  ];

  let groups = eyeGroups;

  if (selectedTopic === "ohr") {
    groups = earGroups;
  }

  if (selectedTopic === "sinnesorgane") {
    groups = sensoryOrganGroups;
  }

  if (selectedTopic === "pflege") {
    groups = careGroups;
  }

  if (selectedTopic === "sturz") {
    groups = fallPreventionGroups;
  }

  if (selectedTopic === "alle") {
    groups = [...sensoryOrganGroups, ...careGroups, ...fallPreventionGroups];
  }

  selectedCategory = "alle";
  categoryButtonsContainer.innerHTML = "";
  categoryButtonsContainer.append(
    createCategoryButton("alle", "Alle Bereiche")
  );

  const categoryButtonsRow = document.createElement("div");
  categoryButtonsRow.className = "topic-buttons-row";

  groups.forEach((group) => {
    categoryButtonsRow.append(
      createCategoryButton(group, GROUP_LABELS[group])
    );
  });

  categoryButtonsContainer.append(categoryButtonsRow);
}

function createCategoryButton(value, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className =
    value === "alle" ? "topic-button topic-button--alle is-active" : "topic-button";
  button.dataset.category = value;
  button.setAttribute("aria-pressed", String(value === "alle"));
  button.textContent = label;
  button.addEventListener("click", () => selectCategory(value));

  return button;
}

function selectCategory(category) {
  selectedCategory = category;

  categoryButtonsContainer.querySelectorAll(".topic-button").forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function selectMode(mode) {
  selectedMode = mode;

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] =
      [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function normalizeAnswer(answer) {
  return String(answer)
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]/g, "")
    .replace(/\s+/g, " ");
}

function getQuestionMode(question, selectedMode) {
  if (selectedMode !== "gemischt") {
    return selectedMode;
  }

  if (question.originalMode) {
    return question.originalMode;
  }

  return Math.random() < 0.5 ? "multiple-choice" : "text";
}

function getFilteredQuestions() {
  const selectedGroup = selectedCategory;

  return allQuestions.filter((question) => {
    const matchesTopic =
      selectedTopic === "alle" ||
      (selectedTopic === "sinnesorgane" &&
        (question.subject === "auge" || question.subject === "ohr")) ||
      question.subject === selectedTopic;

    const matchesGroup =
      selectedGroup === "alle" ||
      question.group === selectedGroup;

    return matchesTopic && matchesGroup;
  });
}

function createQuizQuestion(question, mode, availableQuestions) {
  const quizQuestion = {
    ...question,
    mode
  };

  if (question.sourceKind === "term") {
    const answerDirection = Math.random() < 0.5 ? "fachbegriff" : "deutsch";

    quizQuestion.answerDirection = answerDirection;

    if (answerDirection === "fachbegriff") {
      quizQuestion.question =
        `Wie lautet der Fachbegriff für „${question.de}“?`;
      quizQuestion.correctAnswer = question.fachbegriff;
      quizQuestion.acceptedAnswers = [
        question.fachbegriff,
        ...question.alternatives
      ];
    } else {
      quizQuestion.question = `Was bedeutet „${question.fachbegriff}“?`;
      quizQuestion.correctAnswer = question.de;
      quizQuestion.acceptedAnswers = [question.de];
    }
  }

  quizQuestion.options =
    mode === "multiple-choice"
      ? createAnswerOptions(quizQuestion, availableQuestions)
      : [];

  return quizQuestion;
}

function createAnswerOptions(correctQuestion, availableQuestions) {
  if (correctQuestion.predefinedOptions.length >= 4) {
    return shuffleArray([...correctQuestion.predefinedOptions]);
  }

  const isTermQuestion = correctQuestion.sourceKind === "term";
  const answerField =
    correctQuestion.answerDirection === "deutsch" ? "de" : "fachbegriff";
  const eligibleQuestions = isTermQuestion
    ? availableQuestions.filter((question) => question.sourceKind === "term")
    : availableQuestions;

  const sameSubjectAndGroup = eligibleQuestions.filter((question) => {
    return (
      question.subject === correctQuestion.subject &&
      question.group === correctQuestion.group &&
      question.uid !== correctQuestion.uid
    );
  });

  const sameGroup = eligibleQuestions.filter((question) => {
    return (
      question.group === correctQuestion.group &&
      question.uid !== correctQuestion.uid
    );
  });

  const fallback = eligibleQuestions.filter((question) => {
    return question.uid !== correctQuestion.uid;
  });

  let answerPool = sameSubjectAndGroup;

  if (answerPool.length < 3) {
    answerPool = sameGroup;
  }

  if (answerPool.length < 3) {
    answerPool = fallback;
  }

  const wrongAnswers = shuffleArray(answerPool)
    .map((question) => {
      return isTermQuestion ? question[answerField] : question.correctAnswer;
    })
    .filter(Boolean)
    .filter((answer) => {
      return normalizeAnswer(answer) !==
        normalizeAnswer(correctQuestion.correctAnswer);
    })
    .filter((answer, index, array) => {
      return array.findIndex((item) => {
        return normalizeAnswer(item) === normalizeAnswer(answer);
      }) === index;
    })
    .slice(0, 3);

  return shuffleArray([
    correctQuestion.correctAnswer,
    ...wrongAnswers
  ]);
}

function startQuiz() {
  const selectedAmount = Number(amountSelect.value);
  const filteredQuestions = getFilteredQuestions();

  if (filteredQuestions.length === 0) {
    feedbackElement.className = "feedback wrong";
    feedbackElement.textContent = "Für diese Auswahl sind keine Fragen vorhanden.";
    return;
  }

  const selectedQuestions = shuffleArray(filteredQuestions)
    .slice(0, Math.min(selectedAmount, filteredQuestions.length));

  quizQuestions = selectedQuestions.map((question) => {
    const mode = getQuestionMode(question, selectedMode);

    return createQuizQuestion(
      question,
      mode,
      filteredQuestions
    );
  });

  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;

  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
}

function showQuestion() {
  const question = quizQuestions[currentQuestionIndex];

  answerChecked = false;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  checkButton.hidden = false;
  nextButton.hidden = true;

  categoryLabel.textContent = createBadgeLabel(question);

  progressElement.textContent =
    `Frage ${currentQuestionIndex + 1} von ${quizQuestions.length}`;

  progressBar.style.width =
    `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  questionElement.textContent = question.question;

  if (question.mode === "multiple-choice") {
    questionTypeElement.textContent = "Wähle die richtige Antwort.";
    renderMultipleChoice(question);
  } else {
    questionTypeElement.textContent = "Schreibe die richtige Antwort aus.";
    renderTextInput();
  }
}

function createBadgeLabel(question) {
  const emoji = SUBJECT_EMOJI[question.subject] ?? "";

  if (question.subject === "pflege") {
    const group = GROUP_LABELS[question.group] ?? question.group;
    return `${emoji} Pflege · ${group}`;
  }

  if (question.subject === "sturz") {
    const group = GROUP_LABELS[question.group] ?? question.group;
    return `${emoji} Sturzprophylaxe · ${group}`;
  }

  const topic = question.subject === "auge" ? "Auge" : "Ohr";
  const group = GROUP_LABELS[question.group] ?? question.group;

  return `${emoji} ${topic} · ${group}`;
}

function renderMultipleChoice(question) {
  answerArea.innerHTML = "";

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.id = `answer-${index}`;

    const text = document.createElement("span");
    text.textContent = option;

    label.append(input, text);
    answerArea.append(label);
  });
}

function renderTextInput() {
  answerArea.innerHTML = `
    <input
      class="text-answer"
      id="text-answer"
      type="text"
      placeholder="Antwort eingeben"
      autocomplete="off"
    >
  `;

  document.querySelector("#text-answer").focus();
}

function getUserAnswer(question) {
  if (question.mode === "multiple-choice") {
    const selected = document.querySelector(
      'input[name="answer"]:checked'
    );

    return selected ? selected.value : "";
  }

  return document.querySelector("#text-answer").value;
}

function isCorrectAnswer(userAnswer, question) {
  const acceptedAnswers =
    question.acceptedAnswers.length > 0
      ? question.acceptedAnswers
      : [question.correctAnswer];

  return acceptedAnswers.some((answer) => {
    return normalizeAnswer(answer) === normalizeAnswer(userAnswer);
  });
}

function checkAnswer() {
  if (answerChecked) {
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const userAnswer = getUserAnswer(question);

  if (!userAnswer.trim()) {
    if (question.mode === "multiple-choice") {
      feedbackElement.className = "feedback wrong";
      feedbackElement.textContent = "Wähle zuerst eine Antwort aus.";
      return;
    }

    // Texteingabe leer gelassen (z. B. Enter gedrückt, ohne etwas
    // einzugeben): wird wie "weiß ich nicht" behandelt und die
    // richtige Antwort direkt angezeigt, statt eine Eingabe zu erzwingen.
  }

  answerChecked = true;
  const correct = userAnswer.trim() ? isCorrectAnswer(userAnswer, question) : false;

  question.userAnswer = userAnswer;
  question.wasCorrect = correct;

  if (correct) {
    score++;
    scoreElement.textContent = score;
    feedbackElement.className = "feedback correct";
    feedbackElement.innerHTML =
      `<strong>Richtig.</strong> ${escapeHtml(question.explanation)}`;
  } else {
    feedbackElement.className = "feedback wrong";
    feedbackElement.innerHTML =
      `<strong>Falsch.</strong> Richtig ist: ` +
      `<strong>${escapeHtml(question.correctAnswer)}</strong>. ` +
      `${escapeHtml(question.explanation)}`;
  }

  disableInputs();

  checkButton.hidden = true;
  nextButton.hidden = false;
  nextButton.textContent =
    currentQuestionIndex === quizQuestions.length - 1
      ? "Ergebnis anzeigen"
      : "Nächste Frage";
}

function disableInputs() {
  answerArea.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
    return;
  }

  showResult();
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const percentage = Math.round(
    (score / quizQuestions.length) * 100
  );

  resultText.textContent =
    `${TOPIC_LABELS[selectedTopic]}: Du hast ${score} von ` +
    `${quizQuestions.length} Fragen richtig beantwortet (${percentage} %).`;

  renderReview();
}

function renderReview() {
  reviewList.innerHTML = quizQuestions.map((question, index) => {
    const statusClass = question.wasCorrect ? "correct" : "wrong";
    const givenAnswer = question.userAnswer && question.userAnswer.trim()
      ? question.userAnswer
      : "(keine Antwort)";

    const correctAnswerLine = question.wasCorrect
      ? ""
      : `<p class="review-line">Richtige Antwort: <strong>${escapeHtml(question.correctAnswer)}</strong></p>`;

    return `
      <li class="review-item ${statusClass}">
        <p class="review-question">${index + 1}. ${escapeHtml(question.question)}</p>
        <p class="review-line">Deine Antwort: <strong>${escapeHtml(givenAnswer)}</strong></p>
        ${correctAnswerLine}
        <p class="review-explanation">${escapeHtml(question.explanation)}</p>
      </li>
    `;
  }).join("");
}

function resetToStart() {
  quizScreen.hidden = true;
  resultScreen.hidden = true;
  startScreen.hidden = false;

  score = 0;
  scoreElement.textContent = score;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectTopic(button.dataset.topic);
  });
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectMode(button.dataset.mode);
  });
});

startButton.addEventListener("click", startQuiz);
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
quitButton.addEventListener("click", resetToStart);
restartButton.addEventListener("click", resetToStart);

document.addEventListener("keydown", (event) => {
  if (quizScreen.hidden) {
    return;
  }

  if (event.key === "Enter") {
    if (!nextButton.hidden) {
      nextQuestion();
    } else {
      checkAnswer();
    }
  }
});

updateCategoryOptions();
loadQuizData();
