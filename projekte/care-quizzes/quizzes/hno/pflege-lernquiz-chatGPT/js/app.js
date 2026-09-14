import { loadQuizData } from "./data.js";
import { elements } from "./dom.js";
import { buildQuiz, getFilteredQuestions, isCorrectAnswer } from "./quiz-engine.js";
import { disableInputs, getUserAnswer, renderQuestion, selectTopicButton, showQuizScreen, showResult, showStartScreen, updateCategoryOptions } from "./ui.js";
import { escapeHtml } from "./utils.js";

let allQuestions = [];
let quizQuestions = [];
let selectedTopic = "nase";
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

function selectTopic(topic) { selectedTopic = topic; selectTopicButton(topic); updateCategoryOptions(topic); }

function startQuiz() {
  const filteredQuestions = getFilteredQuestions(allQuestions, selectedTopic, elements.categorySelect.value);
  if (filteredQuestions.length === 0) {
    elements.feedback.className = "feedback wrong";
    elements.feedback.textContent = "Für diese Auswahl sind keine Fragen vorhanden.";
    return;
  }
  quizQuestions = buildQuiz(filteredQuestions, allQuestions, elements.modeSelect.value, Number(elements.amountSelect.value));
  currentQuestionIndex = 0; score = 0; elements.score.textContent = score; showQuizScreen(); showQuestion();
}

function showQuestion() {
  answerChecked = false;
  renderQuestion(quizQuestions[currentQuestionIndex], currentQuestionIndex, quizQuestions.length);
}

function checkAnswer(allowEmptyTextAnswer = false) {
  if (answerChecked) return;
  const question = quizQuestions[currentQuestionIndex];
  const userAnswer = getUserAnswer(question);
  const emptyTextAnswerAllowed = allowEmptyTextAnswer && question.mode === "text";

  if (!userAnswer.trim() && !emptyTextAnswerAllowed) {
    elements.feedback.className = "feedback wrong";
    elements.feedback.textContent = question.mode === "multiple-choice" ? "Wähle zuerst eine Antwort aus." : "Gib zuerst eine Antwort ein.";
    return;
  }

  answerChecked = true;
  if (isCorrectAnswer(userAnswer, question)) {
    score++; elements.score.textContent = score; elements.feedback.className = "feedback correct";
    elements.feedback.innerHTML = `<strong>Richtig.</strong> ${escapeHtml(question.explanation)}`;
  } else {
    elements.feedback.className = "feedback wrong";
    elements.feedback.innerHTML = `<strong>Falsch.</strong> Richtig ist: <strong>${escapeHtml(question.correctAnswer)}</strong>. ${escapeHtml(question.explanation)}`;
  }
  disableInputs(); elements.checkButton.hidden = true; elements.nextButton.hidden = false;
  elements.nextButton.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) showQuestion();
  else showResult(selectedTopic, score, quizQuestions.length);
}

function resetToStart() { showStartScreen(); score = 0; elements.score.textContent = score; }

async function initialize() {
  updateCategoryOptions(selectedTopic);
  try {
    allQuestions = await loadQuizData(); elements.startButton.disabled = false; elements.startButton.textContent = "Quiz starten";
  } catch (error) {
    elements.startButton.disabled = true; elements.startButton.textContent = "Quizdaten fehlen";
    elements.startScreen.insertAdjacentHTML("beforeend", `<p class="feedback wrong">${escapeHtml(error.message)}<br>Starte das Projekt über einen lokalen Server, zum Beispiel mit Live Server.</p>`);
    console.error(error);
  }
}

elements.topicButtons.forEach((button) => button.addEventListener("click", () => selectTopic(button.dataset.topic)));
elements.startButton.addEventListener("click", startQuiz);
elements.checkButton.addEventListener("click", () => checkAnswer(false));
elements.nextButton.addEventListener("click", nextQuestion);
elements.quitButton.addEventListener("click", resetToStart);
elements.restartButton.addEventListener("click", resetToStart);
document.addEventListener("keydown", (event) => {
  if (elements.quizScreen.hidden || event.key !== "Enter") return;
  event.preventDefault();
  if (!elements.nextButton.hidden) nextQuestion(); else checkAnswer(true);
});
initialize();
