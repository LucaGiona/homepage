import { normalizeAnswer, shuffleArray } from "./utils.js";

export function getFilteredQuestions(allQuestions, selectedCategory) {
  return allQuestions.filter((question) => {
    return selectedCategory === "alle" || question.group === selectedCategory;
  });
}

export function buildQuiz(filteredQuestions, selectedMode, amount) {
  const selectedQuestions = shuffleArray(filteredQuestions)
    .slice(0, Math.min(amount, filteredQuestions.length));

  return selectedQuestions.map((question) => {
    const mode = getQuestionMode(question, selectedMode);
    return createQuizQuestion(question, mode, filteredQuestions);
  });
}

export function isCorrectAnswer(userAnswer, question) {
  const acceptedAnswers =
    question.acceptedAnswers.length > 0
      ? question.acceptedAnswers
      : [question.correctAnswer];

  return acceptedAnswers.some((answer) => {
    return normalizeAnswer(answer) === normalizeAnswer(userAnswer);
  });
}

function getQuestionMode(question, mode) {
  if (mode !== "gemischt") {
    return mode;
  }

  if (question.originalMode) {
    return question.originalMode;
  }

  return Math.random() < 0.5 ? "multiple-choice" : "text";
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

  const sameGroup = eligibleQuestions.filter((question) => {
    return (
      question.group === correctQuestion.group &&
      question.uid !== correctQuestion.uid
    );
  });

  const fallback = eligibleQuestions.filter((question) => {
    return question.uid !== correctQuestion.uid;
  });

  let answerPool = sameGroup;

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
