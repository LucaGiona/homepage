import { GROUP_LABELS, GROUP_ORDER } from "./config.js";
import { elements } from "./dom.js";
import { escapeHtml } from "./utils.js";

export function updateCategoryOptions(allQuestions, onSelectCategory) {
  const availableGroups = GROUP_ORDER.filter((group) =>
    allQuestions.some((question) => question.group === group)
  );

  elements.categoryButtonsContainer.innerHTML = "";
  elements.categoryButtonsContainer.append(
    createCategoryButton("alle", "Alle Bereiche", onSelectCategory)
  );

  const categoryButtonsRow = document.createElement("div");
  categoryButtonsRow.className = "topic-buttons-row";

  availableGroups.forEach((group) => {
    categoryButtonsRow.append(
      createCategoryButton(group, GROUP_LABELS[group] ?? group, onSelectCategory)
    );
  });

  elements.categoryButtonsContainer.append(categoryButtonsRow);
}

function createCategoryButton(value, label, onSelectCategory) {
  const button = document.createElement("button");
  button.type = "button";
  button.className =
    value === "alle" ? "topic-button topic-button--alle is-active" : "topic-button";
  button.dataset.category = value;
  button.setAttribute("aria-pressed", String(value === "alle"));
  button.textContent = label;
  button.addEventListener("click", () => onSelectCategory(value));

  return button;
}

export function markSelectedCategory(category) {
  elements.categoryButtonsContainer.querySelectorAll(".topic-button").forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export function markSelectedMode(mode) {
  elements.modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export function showQuizScreen() {
  elements.startScreen.hidden = true;
  elements.resultScreen.hidden = true;
  elements.quizScreen.hidden = false;
}

export function showStartScreen() {
  elements.quizScreen.hidden = true;
  elements.resultScreen.hidden = true;
  elements.startScreen.hidden = false;
}

export function showResultScreen() {
  elements.quizScreen.hidden = true;
  elements.resultScreen.hidden = false;
}

export function renderQuestion(question, index, total) {
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  elements.checkButton.hidden = false;
  elements.nextButton.hidden = true;

  elements.categoryLabel.textContent = createBadgeLabel(question);
  elements.progress.textContent = `Frage ${index + 1} von ${total}`;
  elements.progressBar.style.width = `${((index + 1) / total) * 100}%`;
  elements.question.textContent = question.question;

  if (question.mode === "multiple-choice") {
    elements.questionType.textContent = "Wähle die richtige Antwort.";
    renderMultipleChoice(question);
  } else {
    elements.questionType.textContent = "Schreibe die richtige Antwort aus.";
    renderTextInput();
  }
}

function createBadgeLabel(question) {
  const group = GROUP_LABELS[question.group] ?? question.group;
  return `🩺 ${group}`;
}

function renderMultipleChoice(question) {
  elements.answerArea.innerHTML = "";

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
    elements.answerArea.append(label);
  });
}

function renderTextInput() {
  elements.answerArea.innerHTML = `
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

export function getUserAnswer(question) {
  if (question.mode === "multiple-choice") {
    const selected = document.querySelector('input[name="answer"]:checked');
    return selected ? selected.value : "";
  }

  return document.querySelector("#text-answer").value;
}

export function disableInputs() {
  elements.answerArea.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
}

export function showFeedback(correct, question) {
  if (correct) {
    elements.feedback.className = "feedback correct";
    elements.feedback.innerHTML =
      `<strong>Richtig.</strong> ${escapeHtml(question.explanation)}`;
  } else {
    elements.feedback.className = "feedback wrong";
    elements.feedback.innerHTML =
      `<strong>Falsch.</strong> Richtig ist: ` +
      `<strong>${escapeHtml(question.correctAnswer)}</strong>. ` +
      `${escapeHtml(question.explanation)}`;
  }
}

export function showAnswerRequiredFeedback() {
  elements.feedback.className = "feedback wrong";
  elements.feedback.textContent = "Wähle zuerst eine Antwort aus.";
}

export function showNoQuestionsFeedback() {
  elements.feedback.className = "feedback wrong";
  elements.feedback.textContent = "Für diese Auswahl sind keine Fragen vorhanden.";
}

export function setNextButtonLabel(isLastQuestion) {
  elements.checkButton.hidden = true;
  elements.nextButton.hidden = false;
  elements.nextButton.textContent = isLastQuestion
    ? "Ergebnis anzeigen"
    : "Nächste Frage";
}

export function renderResult(score, total, categoryLabel) {
  const percentage = Math.round((score / total) * 100);

  elements.resultText.textContent =
    `${categoryLabel}: Du hast ${score} von ` +
    `${total} Fragen richtig beantwortet (${percentage} %).`;
}

export function renderReview(quizQuestions) {
  elements.reviewList.innerHTML = quizQuestions.map((question, index) => {
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

export function showDataLoadError(message) {
  elements.startButton.disabled = true;
  elements.startButton.textContent = "Quizdaten fehlen";

  elements.startScreen.insertAdjacentHTML(
    "beforeend",
    `<p class="feedback wrong">
      ${escapeHtml(message)}<br>
      Starte das Projekt über einen lokalen Server, zum Beispiel mit Live Server.
    </p>`
  );
}

export function enableStartButton() {
  elements.startButton.disabled = false;
  elements.startButton.textContent = "Quiz starten";
}
