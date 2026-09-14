function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const label = document.createElement("span");
  label.className = "project-label";
  label.textContent = project.status === "verfügbar" ? "Verfügbar" : "In Planung";
  article.appendChild(label);

  const heading = document.createElement("h2");
  heading.textContent = project.title;
  article.appendChild(heading);

  const description = document.createElement("p");
  description.textContent = project.description;
  article.appendChild(description);

  if (project.date) {
    const date = document.createElement("p");
    date.className = "project-date";
    date.textContent = `Projektstart: ${project.date}`;
    article.appendChild(date);
  }

  if (project.topics && project.topics.length > 0) {
    const list = document.createElement("ul");
    project.topics.forEach((topic) => {
      const item = document.createElement("li");
      item.textContent = topic;
      list.appendChild(item);
    });
    article.appendChild(list);
  }

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const link = document.createElement("a");
  if (project.href) {
    link.className = "button";
    link.href = project.href;
    link.textContent = `${project.title} öffnen`;
  } else {
    link.className = "button button-disabled";
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    link.textContent = "Bald verfügbar";
    link.addEventListener("click", (event) => event.preventDefault());
  }
  actions.appendChild(link);
  article.appendChild(actions);

  return article;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  projects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });
}

renderProjects();
