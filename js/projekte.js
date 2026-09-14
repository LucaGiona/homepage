const projects = [
  {
    title: "Diese Website",
    image: "/assets/projekte/homepage.png",
    summary: "Meine persönliche Homepage: mehrseitig, ohne Framework, mit Fokus auf Struktur und Barrierefreiheit.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "Accessibility"],
    detail: `Statische Mehrseiten-Homepage in reinem HTML, CSS und JavaScript, ohne Framework und ohne Build-Tool.
Nav, Footer und Kontakt-Infos werden zentral gepflegt und per fetch() in jede Seite eingebunden.

Enthält u. a. eine Drinks-Sammlung mit Filterfunktion und eigenem Rezept-CRUD über LocalStorage,
eine Zertifikate-Seite mit Kategorien-Drill-Down, eine sticky Navigation sowie durchgehende
Cross-Document View Transitions für weiche Seitenübergänge. Durchgehender Fokus auf semantisches
HTML und ARIA-Attribute, besonders im Drinks-Formular.`
  },
  {
    title: "Kalkulation mit Timer",
    nickname: "die Kontrolletie App",
    image: "/assets/projekte/timer.png",
    summary: "Arbeitsschritte zeitmessen und direkt in eine Preis-/Umsatzkalkulation überführen.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "i18n"],
    demoUrl: "/projekte/timer/index.html",
    repoUrl: "https://github.com/LucaGiona/Cost_Calculation_Stoppwatch",
    detail: `Browserbasierte App zur Zeitmessung von Arbeitsabläufen und zur Kalkulation von
Produktionskosten – ohne Backend, ohne Framework, läuft komplett lokal im Browser.

Man legt einen Arbeitstitel an (z. B. eine Rezeptur), definiert die einzelnen Arbeitsschritte
und stoppt die Zeit Schritt für Schritt. Am Ende wird die gemessene Zeit in die Kalkulation
exportiert: Preis eingeben, MwSt. wählen (7 %, 19 % oder eigener Satz), und die App zeigt
sofort den erzielbaren Umsatz pro Zeitraum.

Unterstützt Deutsch/Englisch, Dark-/Light-Mode und speichert alles über LocalStorage.
Verbindet direkt meine Gastro-Erfahrung mit der Frage, wie sich Arbeitszeit realistisch bepreisen lässt.`
  }
];

const gridView = document.getElementById("project-grid-view");
const cardsEl = document.getElementById("project-cards");
const detailView = document.getElementById("project-detail-view");
const detailContent = document.getElementById("project-detail-content");
const backBtn = document.getElementById("project-back");

function titleHtml(project) {
  return project.nickname
    ? `${project.title}<small class="project-nickname">(${project.nickname})</small>`
    : project.title;
}

projects.forEach((project, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="" class="project-card-shot">
    <div class="card-body">
      <h2 class="project-card-title">${titleHtml(project)}</h2>
      <p>${project.summary}</p>
      <ul class="stack">${project.stack.map(s => `<li>${s}</li>`).join("")}</ul>
    </div>
  `;
  card.addEventListener("click", () => showDetail(index));
  cardsEl.appendChild(card);
});

function showDetail(index) {
  const project = projects[index];
  const links = [];
  if (project.demoUrl) links.push(`<a href="${project.demoUrl}">App live ausprobieren &gt;&gt;</a>`);
  if (project.repoUrl) links.push(`<a href="${project.repoUrl}" target="_blank" rel="noopener">Original auf GitHub &gt;&gt;</a>`);

  detailContent.innerHTML = `
    <h1 tabindex="-1">${titleHtml(project)}</h1>
    <ul class="stack project-detail-stack">${project.stack.map(s => `<li>${s}</li>`).join("")}</ul>
    <img src="${project.image}" alt="Screenshot: ${project.title}" class="project-detail-shot">
    <p class="project-detail-text">${project.detail}</p>
    ${links.length ? `<div class="project-detail-links">${links.join("")}</div>` : ""}
  `;
  gridView.hidden = true;
  detailView.hidden = false;
  detailContent.querySelector("h1").focus();
}

backBtn.addEventListener("click", () => {
  detailView.hidden = true;
  gridView.hidden = false;
});
