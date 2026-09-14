const certificates = [
  { file: "/assets/pngs/accessibility-v2.png", category: "other" },
  { file: "/assets/pngs/ai-agents.png", category: "ai" },
  { file: "/assets/pngs/backend-architectures.png", category: "other" },
  { file: "/assets/pngs/chatgpt-api.png", category: "ai" },
  { file: "/assets/pngs/content-strategy.png", category: "other" },
  { file: "/assets/pngs/css-foundations.png", category: "css" },
  { file: "/assets/pngs/css-grid-flexbox-v2.png", category: "css" },
  { file: "/assets/pngs/databases.png", category: "db" },
  { file: "/assets/pngs/functional-first-steps.png", category: "js" },
  { file: "/assets/pngs/functional-js-fundamentals.png", category: "js" },
  { file: "/assets/pngs/getting-started-css.png", category: "css" },
  { file: "/assets/pngs/getting-started-javascript-v2.png", category: "js" },
  { file: "/assets/pngs/Python Intermediate.png", category: "python" },
  { file: "/assets/pngs/javascript-first-steps.png", category: "js" },
  { file: "/assets/pngs/mongodb.png", category: "db" },
  { file: "/assets/pngs/openai-node.png", category: "ai" },
  { file: "/assets/pngs/Python Intro.png", category: "python" },
  { file: "/assets/pngs/sqlite.png", category: "db" },
  { file: "/assets/pngs/vite.png", category: "other" },
  { file: "/assets/pngs/web-development-v3.png", category: "other" },
  { file: "/assets/pngs/typescript-schnelleinstieg.png", category: "js" },
  { file: "/assets/pngs/javascript-upgrade-typescript.png", category: "js" },
  { file: "/assets/pngs/ai-agents-v2.png", category: "ai" },
  { file: "/assets/pngs/backend-system-design.png", category: "other" },
  { file: "/assets/pngs/complete-react-v9.png", category: "js" },
  { file: "/assets/pngs/css-fundamentals.png", category: "css" },
  { file: "/assets/pngs/fastapi-twitter-clone.png", category: "python" },
  { file: "/assets/pngs/php.png", category: "other" },
  { file: "/assets/pngs/prompt-engineering.png", category: "ai" },
  { file: "/assets/pngs/pwas-v2.png", category: "js" },
  { file: "/assets/pngs/python-masterkurs.png", category: "python" },
  { file: "/assets/pngs/typescript-v4.png", category: "js" },
  { file: "/assets/pngs/vanilla-js-go.png", category: "js" },
  { file: "/assets/pngs/python-flask-webentwicklung.png", category: "python" }
];

const categories = [
  { id: "css", label: "CSS" },
  { id: "js", label: "JavaScript" },
  { id: "db", label: "Datenbanken" },
  { id: "ai", label: "AI" },
  { id: "python", label: "Python" },
  { id: "other", label: "Weitere" }
];

const categoriesView = document.getElementById("cert-categories");
const listView = document.getElementById("cert-list-view");
const listHeading = document.getElementById("cert-list-heading");
const list = document.getElementById("pngList");
const viewerView = document.getElementById("cert-viewer-view");
const viewer = document.getElementById("pngViewer");
const backToCategoriesBtn = document.getElementById("cert-back-to-categories");
const backToListBtn = document.getElementById("cert-back-to-list");

function formatTitle(path) {
  const fileName = path.split("/").pop().replace(".png", "");
  const words = fileName.split(/[- ]/);

  const specialWords = {
    api: "API",
    css: "CSS",
    js: "JS",
    javascript: "JS",
    sql: "SQL",
    ai: "AI",
    db: "DB",
    pdf: "PDF",
    mongodb: "MongoDB",
    sqlite: "SQLite",
    vite: "Vite",
    openai: "OpenAI",
    python: "Python",
    chatgpt: "ChatGPT",
    typescript: "TypeScript",
    fastapi: "FastAPI",
    php: "PHP",
    pwas: "PWAs"
  };
  return words
    .map(word => {
      const lower = word.toLowerCase();
      if (specialWords[lower]) {
        return specialWords[lower];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

certificates.sort((a, b) =>
  formatTitle(a.file).toLowerCase().localeCompare(formatTitle(b.file).toLowerCase())
);

function showCategories() {
  categoriesView.hidden = false;
  listView.hidden = true;
  viewerView.hidden = true;
  const firstButton = categoriesView.querySelector("button");
  if (firstButton) firstButton.focus();
}

function showList(categoryId, categoryLabel) {
  list.innerHTML = "";
  certificates
    .filter(cert => cert.category === categoryId)
    .forEach(cert => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = formatTitle(cert.file);
      button.addEventListener("click", () => showViewer(cert));
      li.appendChild(button);
      list.appendChild(li);
    });

  listHeading.textContent = categoryLabel;

  categoriesView.hidden = true;
  listView.hidden = false;
  viewerView.hidden = true;
  listHeading.focus();
}

function showViewer(cert) {
  viewer.src = cert.file;
  viewer.alt = `Zertifikat: ${formatTitle(cert.file)}`;

  categoriesView.hidden = true;
  listView.hidden = true;
  viewerView.hidden = false;
  backToListBtn.focus();
}

categories.forEach(category => {
  const count = certificates.filter(cert => cert.category === category.id).length;
  if (count === 0) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "cert-category";
  button.textContent = `${category.label} (${count})`;
  button.addEventListener("click", () => showList(category.id, category.label));
  categoriesView.appendChild(button);
});

backToCategoriesBtn.addEventListener("click", showCategories);
backToListBtn.addEventListener("click", () => {
  viewerView.hidden = true;
  listView.hidden = false;
  listHeading.focus();
});
