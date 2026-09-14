const projects = [
  {
    title: "Diese Website",
    image: "/assets/projekte/homepage.png",
    summary: "Meine persönliche Homepage: mehrseitig, ohne Framework, mit Fokus auf Struktur und Barrierefreiheit.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "Accessibility"],
    detail: [
      "Statische Mehrseiten-Homepage in reinem HTML, CSS und JavaScript, ohne Framework und ohne Build-Tool. Nav, Footer und Kontakt-Infos werden zentral gepflegt und per fetch() in jede Seite eingebunden.",
      "Enthält u. a. eine Drinks-Sammlung mit Filterfunktion und eigenem Rezept-CRUD über LocalStorage, eine Zertifikate-Seite mit Kategorien-Drill-Down, eine sticky Navigation sowie durchgehende Cross-Document View Transitions für weiche Seitenübergänge. Durchgehender Fokus auf semantisches HTML und ARIA-Attribute, besonders im Drinks-Formular."
    ]
  },
  {
    title: "Kalkulation mit Timer",
    nickname: "die Kontrolletie App",
    image: "/assets/projekte/timer.png",
    summary: "Arbeitsschritte zeitmessen und direkt in eine Preis-/Umsatzkalkulation überführen.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "i18n"],
    demoUrl: "/projekte/timer/index.html",
    repoUrl: "https://github.com/LucaGiona/Cost_Calculation_Stoppwatch",
    detail: [
      "Browserbasierte App zur Zeitmessung von Arbeitsabläufen und zur Kalkulation von Produktionskosten – ohne Backend, ohne Framework, läuft komplett lokal im Browser.",
      "Man legt einen Arbeitstitel an (z. B. eine Rezeptur), definiert die einzelnen Arbeitsschritte und stoppt die Zeit Schritt für Schritt. Am Ende wird die gemessene Zeit in die Kalkulation exportiert: Preis eingeben, MwSt. wählen (7 %, 19 % oder eigener Satz), und die App zeigt sofort den erzielbaren Umsatz pro Zeitraum.",
      "Unterstützt Deutsch/Englisch, Dark-/Light-Mode und speichert alles über LocalStorage. Verbindet direkt meine Gastro-Erfahrung mit der Frage, wie sich Arbeitszeit realistisch bepreisen lässt."
    ]
  },
  {
    title: "Melody Nelson Bar",
    image: "/assets/projekte/melody-nelson.png",
    summary: "Website der Cocktailbar in Berlin-Mitte, in der ich mehrere Jahre gearbeitet habe.",
    stack: ["HTML", "CSS", "JavaScript", "SEO"],
    siteUrl: "https://melody-nelson.berlin",
    detail: [
      "Website für die Melody Nelson Bar in Berlin-Mitte, wo ich mehrere Jahre als Barkeeper gearbeitet habe. Die Seite lief über mehrere Jahre und etliche Versionen produktiv, mit echtem SEO-Setup (Meta-Description, Keywords) und nachträglicher Accessibility-Arbeit (ARIA-Labels).",
      "Ich bin mittlerweile nicht mehr in der Bar involviert, daher ist das kein aktives Projekt mehr von mir – aber ein gutes Beispiel dafür, wie meine Gastro-Erfahrung und meine Web-Arbeit ursprünglich zusammengekommen sind."
    ]
  },
  {
    title: "Care Quizzes",
    image: "/assets/projekte/care-quizzes.png",
    summary: "Sammlung von Lernquizzes für die Pflegefachmann-Ausbildung, mit ChatGPT- und Claude-Varianten desselben Themas.",
    stack: ["HTML", "CSS", "JavaScript", "JSON"],
    demoUrl: "/projekte/care-quizzes/index.html",
    repoUrl: "https://github.com/LucaGiona/care-quizzes",
    detail: [
      "Sammlung mehrerer Lern- und Quizanwendungen zu Themen aus meiner Pflegefachmann-Ausbildung (u. a. Herz, Niere, Gefäße, Blut, HNO). Jedes Thema hat eine eigene, in sich abgeschlossene Quiz-App mit eigener JSON-Datenbasis.",
      "Der eigentliche Zweck geht über das Quizzen hinaus: Für mehrere Themen existiert bewusst je eine ChatGPT- und eine Claude-Variante derselben Aufgabe, um Architektur, Codequalität und Ergebnis unterschiedlicher KI-Systeme direkt zu vergleichen – verbindet Pflegewissen, Webentwicklung und Prompt-Engineering in einem Projekt."
    ]
  },
  {
    title: "Anatomie-Karteikarten",
    image: "/assets/projekte/karteikarten.png",
    summary: "Karteikarten-App nach dem Leitner-Prinzip zum Lernen medizinischer Fachbegriffe (Latein/Deutsch/Englisch).",
    stack: ["HTML", "CSS", "JavaScript", "ES-Module", "LocalStorage"],
    demoUrl: "/projekte/karteikarten/index.html",
    repoUrl: "https://github.com/LucaGiona/karteikarten-app",
    detail: [
      "Responsive Karteikarten-App zum Lernen medizinischer Fachbegriffe aus meiner Pflegefachmann-Ausbildung, mit zwei unabhängigen Leitner-Systemen: Freies Lernen und ein Wochenmodus mit tagesabhängigen Fälligkeitsregeln.",
      "Fach-, Themen- und Kategorie-Filter lassen sich frei kombinieren, Abfragerichtungen (Latein↔Deutsch, Deutsch↔Englisch) ebenfalls. Jede Karte hat in jedem der beiden Systeme ihre eigene Box-Nummer, Fortschritt wird pro System getrennt in LocalStorage gespeichert. Kein Framework, kein Build-Schritt – nur native ES-Module."
    ]
  },
  {
    title: "Sigismondo – Design-Varianten",
    image: "/assets/projekte/sigismondo.png",
    summary: "Vier unterschiedliche visuelle Design-Richtungen für dieselbe Bar-Website, mit Theme-Toggle direkt umschaltbar.",
    stack: ["HTML", "CSS", "JavaScript", "Design"],
    demoUrl: "/projekte/sigismondo/index.html",
    repoUrl: "https://github.com/LucaGiona/salvatore",
    detail: [
      "Demo-Projekt für eine Bar/Salumeria: dieselbe Seitenstruktur (Startseite, Menüs, Anfahrt, Galerie) in vier komplett unterschiedlichen visuellen Design-Richtungen umgesetzt – Blue-Azul, Italian, Art Nouveau und Comic/Pop-Art. Über das Menü lässt sich live zwischen allen Varianten wechseln.",
      "Zeigt, wie stark sich Typografie, Farbwelt und Bildsprache auf die Wirkung derselben Inhalte auswirken – von elegant-italienisch über verspielten Comic-Stil bis zu floraler Jugendstil-Ästhetik. Explizit als Demo gekennzeichnet (siehe Impressum der Seite), keine reale Adresse oder Kontaktdaten."
    ]
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
  if (project.siteUrl) links.push(`<a href="${project.siteUrl}" target="_blank" rel="noopener">Website besuchen &gt;&gt;</a>`);
  if (project.repoUrl) links.push(`<a href="${project.repoUrl}" target="_blank" rel="noopener">Original auf GitHub &gt;&gt;</a>`);

  detailContent.innerHTML = `
    <h1 tabindex="-1">${titleHtml(project)}</h1>
    <ul class="stack project-detail-stack">${project.stack.map(s => `<li>${s}</li>`).join("")}</ul>
    <img src="${project.image}" alt="Screenshot: ${project.title}" class="project-detail-shot">
    <div class="project-detail-text">${project.detail.map(p => `<p>${p}</p>`).join("")}</div>
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
