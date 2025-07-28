const pngs = [
  "/pngs/accessibility-v2.png",
  "/pngs/ai-agents.png",
  "/pngs/backend-architectures.png",
  "/pngs/chatgpt-api.png",
  "/pngs/content-strategy.png",
  "/pngs/css-foundations.png",
  "/pngs/css-grid-flexbox-v2.png",
  "/pngs/databases.png",
  "/pngs/functional-first-steps-dark.png",
  "/pngs/functional-js-fundamentals.png",
  "/pngs/getting-started-css.png",
  "/pngs/getting-started-javascript-v2.png",
  "/pngs/intermediate-python.png",
  "/pngs/javascript-first-steps.png",
  "/pngs/mongodb.png",
  "/pngs/openai-node.png",
  "/pngs/python_oneweek.png",
  "/pngs/sqlite.png",
  "/pngs/vite.png",
  "/pngs/web-development-v3.png"
];


const list = document.getElementById("pngList")
const viewer = document.getElementById("pngViewer")

function formatTitle(path) {
  const fileName = path.split("/").pop().replace(".png", "")
  const words = fileName.split(/[- ]/)
  
    const specialWords = {
    api: "API",
    css: "CSS",
    js: "JS",
    sql: "SQL",
    ai: "AI",
    db: "DB",
    pdf: "PDF",
    mongodb: "MongoDB",
    sqlite: "SQLite",
    vite: "Vite",
    openai: "OpenAI",
    python: "Python"
  };
   return words
    .map(word => {
      const lower = word.toLowerCase();
       console.log("Wort gefunden:", word, "→ Klein:", lower);

      if (specialWords[lower]) {
        console.log("→ Spezialwort ersetzt mit:", specialWords[lower]);
         
        return specialWords[lower];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

//onlcick fpr png

pngs.forEach(png => {
  const li = document.createElement("li")
  li.textContent = formatTitle(png)
  li.style.cursor = "pointer"
  li.style.display = "inline-block";
  li.style.marginRight = "1rem";

  li.onclick = ()=> viewer.src = png

  list.appendChild(li)
})

viewer.src = pngs[0]