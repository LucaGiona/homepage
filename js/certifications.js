const pngs = [
  "/assets/pngs/accessibility-v2.png",
  "/assets/pngs/ai-agents.png",
  "/assets/pngs/backend-architectures.png",
  "/assets/pngs/chatgpt-api.png",
  "/assets/pngs/content-strategy.png",
  "/assets/pngs/css-foundations.png",
  "/assets/pngs/css-grid-flexbox-v2.png",
  "/assets/pngs/databases.png",
  "/assets/pngs/functional-first-steps-dark.png",
  "/assets/pngs/functional-js-fundamentals.png",
  "/assets/pngs/getting-started-css.png",
  "/assets/pngs/getting-started-javascript-v2.png",
  "/assets/pngs/Python Intermediate.png",
  "/assets/pngs/javascript-first-steps.png",
  "/assets/pngs/mongodb.png",
  "/assets/pngs/openai-node.png",
  "/assets/pngs/Python Intro.png",
  "/assets/pngs/sqlite.png",
  "/assets/pngs/vite.png",
  "/assets/pngs/web-development-v3.png"
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
    chatgpt: "ChatGPT"
  };
   return words
    .map(word => {
      const lower = word.toLowerCase();
       //console.log("Wort gefunden:", word, "→ Klein:", lower);

      if (specialWords[lower]) {
        //console.log("→ Spezialwort ersetzt mit:", specialWords[lower]);
         
        return specialWords[lower];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

//alles alphabetisch sortieren 

pngs.sort((a, b) => {
  const titleA = formatTitle(a).toLowerCase();
  const titleB = formatTitle(b).toLowerCase();
  return titleA.localeCompare(titleB);
});

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