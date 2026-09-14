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
  }
];

const gridView = document.getElementById("project-grid-view");
const cardsEl = document.getElementById("project-cards");
const detailView = document.getElementById("project-detail-view");
const detailContent = document.getElementById("project-detail-content");
const backBtn = document.getElementById("project-back");

projects.forEach((project, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="" class="project-card-shot">
    <div class="card-body">
      <h2 class="project-card-title">${project.title}</h2>
      <p>${project.summary}</p>
      <ul class="stack">${project.stack.map(s => `<li>${s}</li>`).join("")}</ul>
    </div>
  `;
  card.addEventListener("click", () => showDetail(index));
  cardsEl.appendChild(card);
});

function showDetail(index) {
  const project = projects[index];
  detailContent.innerHTML = `
    <h1 tabindex="-1">${project.title}</h1>
    <ul class="stack project-detail-stack">${project.stack.map(s => `<li>${s}</li>`).join("")}</ul>
    <img src="${project.image}" alt="Screenshot: ${project.title}" class="project-detail-shot">
    <p class="project-detail-text">${project.detail}</p>
  `;
  gridView.hidden = true;
  detailView.hidden = false;
  detailContent.querySelector("h1").focus();
}

backBtn.addEventListener("click", () => {
  detailView.hidden = true;
  gridView.hidden = false;
});
