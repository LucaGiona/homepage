import { GROUP_LABELS } from "./config.js";
import { loadQuizData } from "./data.js";
import { elements } from "./dom.js";
import { buildQuiz, getFilteredQuestions, isCorrectAnswer } from "./quiz-engine.js";
import {
  disableInputs,
  enableStartButton,
  getUserAnswer,
  markSelectedCategory,
  markSelectedMode,
  renderQuestion,
  renderResult,
  renderReview,
  setNextButtonLabel,
  showAnswerRequiredFeedback,
  showDataLoadError,
  showFeedback,
  showNoQuestionsFeedback,
  showQuizScreen,
  showResultScreen,
  showStartScreen,
  updateCategoryOptions
} from "./ui.js";

const SUBJECT = "blut";

let allQuestions = [];
let quizQuestions = [];
let selectedCategory = "alle";
let selectedMode = "gemischt";
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

async function init() {
  try {
    allQuestions = await loadQuizData(SUBJECT);
    updateCategoryOptions(allQuestions, selectCategory);
    enableStartButton();
  } catch (error) {
    showDataLoadError(error.message);
    console.error(error);
  }
}

function selectCategory(category) {
  selectedCategory = category;
  markSelectedCategory(category);
}

function selectMode(mode) {
  selectedMode = mode;
  markSelectedMode(mode);
}

function startQuiz() {
  const amount = Number(elements.amountSelect.value);
  const filteredQuestions = getFilteredQuestions(allQuestions, selectedCategory);

  if (filteredQuestions.length === 0) {
    showNoQuestionsFeedback();
    return;
  }

  quizQuestions = buildQuiz(filteredQuestions, selectedMode, amount);

  currentQuestionIndex = 0;
  score = 0;
  elements.score.textContent = score;

  showQuizScreen();
  showQuestion();
}

function showQuestion() {
  answerChecked = false;
  const question = quizQuestions[currentQuestionIndex];
  renderQuestion(question, currentQuestionIndex, quizQuestions.length);
}

function checkAnswer() {
  if (answerChecked) {
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const userAnswer = getUserAnswer(question);
  const isEmpty = !userAnswer.trim();

  // Bei Multiple Choice muss eine Option gewählt werden. Bei Texteingabe
  // darf einfach Enter gedrückt werden, wenn man die Antwort nicht weiß –
  // dann wird die Frage als falsch gewertet und die Lösung angezeigt.
  if (isEmpty && question.mode === "multiple-choice") {
    showAnswerRequiredFeedback();
    return;
  }

  answerChecked = true;
  const correct = !isEmpty && isCorrectAnswer(userAnswer, question);

  question.userAnswer = userAnswer;
  question.wasCorrect = correct;

  if (correct) {
    score++;
    elements.score.textContent = score;
  }

  showFeedback(correct, question);
  disableInputs();
  setNextButtonLabel(currentQuestionIndex === quizQuestions.length - 1);
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
  showResultScreen();

  const categoryLabel =
    selectedCategory === "alle"
      ? "Alle Bereiche"
      : GROUP_LABELS[selectedCategory] ?? selectedCategory;

  renderResult(score, quizQuestions.length, categoryLabel);
  renderReview(quizQuestions);
}

function resetToStart() {
  showStartScreen();
  score = 0;
  elements.score.textContent = score;
}

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectMode(button.dataset.mode);
  });
});

elements.startButton.addEventListener("click", startQuiz);
elements.checkButton.addEventListener("click", checkAnswer);
elements.nextButton.addEventListener("click", nextQuestion);
elements.quitButton.addEventListener("click", resetToStart);
elements.restartButton.addEventListener("click", resetToStart);

document.addEventListener("keydown", (event) => {
  if (elements.quizScreen.hidden) {
    return;
  }

  if (event.key === "Enter") {
    if (!elements.nextButton.hidden) {
      nextQuestion();
    } else {
      checkAnswer();
    }
  }
});

init();
