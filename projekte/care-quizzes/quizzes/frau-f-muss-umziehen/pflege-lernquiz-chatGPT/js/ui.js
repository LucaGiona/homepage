import { getGroupsForTopic, GROUP_LABELS, TOPIC_LABELS } from "./config.js";
import { elements } from "./dom.js";

export function selectTopicButton(topic) {
  elements.topicButtons.forEach((button) => {
    const isActive = button.dataset.topic === topic;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export function updateCategoryOptions(topic) {
  elements.categorySelect.innerHTML = "";
  elements.categorySelect.add(new Option("Alle Bereiche", "alle"));

  getGroupsForTopic(topic).forEach((group) => {
    elements.categorySelect.add(new Option(GROUP_LABELS[group], group));
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

export function getUserAnswer(question) {
  if (question.mode === "multiple-choice") {
    return document.querySelector('input[name="answer"]:checked')?.value ?? "";
  }
  return document.querySelector("#text-answer").value;
}

export function disableInputs() {
  elements.answerArea.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
}

export function showResult(topic, score, total) {
  elements.quizScreen.hidden = true;
  elements.resultScreen.hidden = false;
  const percentage = Math.round((score / total) * 100);
  elements.resultText.textContent =
    `${TOPIC_LABELS[topic]}: Du hast ${score} von ${total} Fragen ` +
    `richtig beantwortet (${percentage} %).`;
}

function createBadgeLabel(question) {
  const group = GROUP_LABELS[question.group] ?? question.group;
  if (question.subject === "pflege") return `Pflege · ${group}`;
  if (question.subject === "sturz") return `Sturzprophylaxe · ${group}`;
  return `${question.subject === "auge" ? "Auge" : "Ohr"} · ${group}`;
}

function renderMultipleChoice(question) {
  elements.answerArea.innerHTML = "";
  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const text = document.createElement("span");
    label.className = "answer-option";
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.id = `answer-${index}`;
    text.textContent = option;
    label.append(input, text);
    elements.answerArea.append(label);
  });
}

function renderTextInput() {
  elements.answerArea.innerHTML = `
    <input class="text-answer" id="text-answer" type="text"
      placeholder="Antwort eingeben" autocomplete="off">
  `;
  document.querySelector("#text-answer").focus();
}
