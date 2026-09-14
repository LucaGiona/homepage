import { normalizeAnswer, shuffleArray } from "./utils.js";

export function getFilteredQuestions(questions, topic, group) {
  return questions.filter((question) => {
    const matchesTopic = topic === "alle" ||
      (topic === "sinnesorgane" && ["auge", "ohr"].includes(question.subject)) ||
      question.subject === topic;
    const matchesGroup = group === "alle" || question.group === group;

    return matchesTopic && matchesGroup;
  });
}

export function buildQuiz(questions, allQuestions, selectedMode, amount) {
  return shuffleArray(questions)
    .slice(0, Math.min(amount, questions.length))
    .map((question) => {
      const mode = getQuestionMode(question, selectedMode);
      const availableQuestions = question.sourceKind === "term"
        ? allQuestions
        : questions;

      return createQuizQuestion(question, mode, availableQuestions);
    });
}

export function isCorrectAnswer(userAnswer, question) {
  const acceptedAnswers = question.acceptedAnswers.length > 0
    ? question.acceptedAnswers
    : [question.correctAnswer];

  return acceptedAnswers.some((answer) =>
    normalizeAnswer(answer) === normalizeAnswer(userAnswer)
  );
}

function getQuestionMode(question, selectedMode) {
  if (selectedMode !== "gemischt") return selectedMode;
  if (question.originalMode) return question.originalMode;
  return Math.random() < 0.5 ? "multiple-choice" : "text";
}

function createQuizQuestion(question, mode, availableQuestions) {
  const quizQuestion = { ...question, mode };

  if (question.sourceKind === "term") {
    const answerDirection = Math.random() < 0.5 ? "fachbegriff" : "deutsch";
    quizQuestion.answerDirection = answerDirection;

    if (answerDirection === "fachbegriff") {
      quizQuestion.question = `Wie lautet der Fachbegriff für „${question.de}“?`;
      quizQuestion.correctAnswer = question.fachbegriff;
      quizQuestion.acceptedAnswers = [question.fachbegriff, ...question.alternatives];
    } else {
      quizQuestion.question = `Was bedeutet „${question.fachbegriff}“?`;
      quizQuestion.correctAnswer = question.de;
      quizQuestion.acceptedAnswers = [question.de];
    }
  }

  quizQuestion.options = mode === "multiple-choice"
    ? createAnswerOptions(quizQuestion, availableQuestions)
    : [];

  return quizQuestion;
}

function createAnswerOptions(correctQuestion, availableQuestions) {
  if (correctQuestion.predefinedOptions.length >= 4) {
    return shuffleArray(correctQuestion.predefinedOptions);
  }

  const isTermQuestion = correctQuestion.sourceKind === "term";
  const answerField = correctQuestion.answerDirection === "deutsch" ? "de" : "fachbegriff";
  const eligibleQuestions = isTermQuestion
    ? availableQuestions.filter((question) => question.sourceKind === "term")
    : availableQuestions;
  const isDifferentQuestion = (question) => question.uid !== correctQuestion.uid;
  const sameSubjectAndGroup = eligibleQuestions.filter((question) =>
    question.subject === correctQuestion.subject &&
    question.group === correctQuestion.group &&
    isDifferentQuestion(question)
  );
  const sameGroup = eligibleQuestions.filter((question) =>
    question.group === correctQuestion.group && isDifferentQuestion(question)
  );
  const sameSubject = eligibleQuestions.filter((question) =>
    question.subject === correctQuestion.subject && isDifferentQuestion(question)
  );
  const fallback = eligibleQuestions.filter(isDifferentQuestion);
  const answerPool = [
    ...shuffleArray(sameSubjectAndGroup),
    ...shuffleArray(sameSubject),
    ...shuffleArray(sameGroup),
    ...shuffleArray(fallback)
  ];
  const wrongAnswers = answerPool
    .map((question) => isTermQuestion ? question[answerField] : question.correctAnswer)
    .filter(Boolean)
    .filter((answer) => normalizeAnswer(answer) !== normalizeAnswer(correctQuestion.correctAnswer))
    .filter((answer, index, array) =>
      array.findIndex((item) => normalizeAnswer(item) === normalizeAnswer(answer)) === index
    )
    .slice(0, 3);

  return shuffleArray([correctQuestion.correctAnswer, ...wrongAnswers]);
}
