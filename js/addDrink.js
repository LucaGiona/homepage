// --- Refs ---
const toggleButton   = document.querySelector("#toggle-add-drink");
const addDrinkForm   = document.querySelector("#add-drink-form");
const clearButton    = document.querySelector("#clearMyDrinks");
const cardsSection   = document.querySelector(".cards");              // Karten-Container

// Seasons
const allYearCheckbox  = document.querySelector('input[name="seasons"][value="all"]');
const seasonCheckboxes = document.querySelectorAll('input[name="seasons"]:not([value="all"])');

let editingId = null; // aktuell bearbeitete Karte (id) oder null

//console.log("Add Drink Script geladen");

// --- Storage Helpers ---
function getCustomDrinks() {
  return JSON.parse(localStorage.getItem("customDrinks") || "[]");
}
function setCustomDrinks(arr) {
  localStorage.setItem("customDrinks", JSON.stringify(arr));
}

// --- Season-Logik ---
if (allYearCheckbox && seasonCheckboxes.length > 0) {
  allYearCheckbox.addEventListener("change", () => {
    if (allYearCheckbox.checked) {
      seasonCheckboxes.forEach(cb => { cb.checked = false; cb.disabled = true; });
    } else {
      seasonCheckboxes.forEach(cb => { cb.disabled = false; });
    }
  });

  seasonCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) allYearCheckbox.checked = false;
    });
  });
}

// --- Form Toggle ---
toggleButton?.addEventListener("click", () => {
  const isHidden = addDrinkForm.hidden;
  addDrinkForm.hidden = !isHidden;
  toggleButton.setAttribute("aria-expanded", String(!isHidden));
  toggleButton.textContent = isHidden ? "Formular schliessen" : "Drink hinzufügen";
});

// --- Submit (Neu + Bearbeiten) ---
addDrinkForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(addDrinkForm);

  // Seasons einsammeln
  const selectedSeasons = [];
  if (allYearCheckbox?.checked) {
    selectedSeasons.push("spring", "summer", "autumn", "winter");
  } else {
    document.querySelectorAll('input[name="seasons"]:checked:not([value="all"])')
      .forEach(cb => selectedSeasons.push(cb.value));
  }
  if (selectedSeasons.length === 0) {
    alert("Bitte wähle mindestens eine Jahreszeit aus!");
    return;
  }

  // Objekt bilden
  const drink = {
    name:        (fd.get("name") || "").toString().trim(),
    alcohol:     (fd.get("alcohol") || "").toString(),
    seasons:     selectedSeasons.join(" "),
    ingredients: (fd.get("ingredients") || "").toString().trim(),
    recipe:      (fd.get("recipe") || "").toString().trim(),
    preparation: (fd.get("preparation") || "").toString().trim(),
    garnish:     ((fd.get("garnish") || "").toString().trim()) || "keine",
    tip:         (fd.get("tip") || "").toString().trim(),
    isCustom:    true,
    id:          editingId || Date.now(),
  };

  if (!drink.name) {
    alert("Bitte einen Namen eingeben.");
    return;
  }

  if (editingId) {
    // ---- UPDATE ----
    const updated = getCustomDrinks().map(d => d.id === editingId ? { ...d, ...drink } : d);
    setCustomDrinks(updated);
    updateCardInDOM(drink);
    editingId = null;
    addDrinkForm.querySelector('button[type="submit"]').textContent = "Drink speichern";
  } else {
    // ---- ADD ----
    addDrinkToDOM(drink);
    const list = getCustomDrinks();
    list.push(drink);
    setCustomDrinks(list);
  }
  const cardsSection = document.querySelector(".cards");
  if (cardsSection) cardsSection.hidden = false;
  // UI zurücksetzen
  addDrinkForm.reset();
  seasonCheckboxes.forEach(cb => { cb.disabled = false; });
  addDrinkForm.hidden = true;
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.textContent = "Drink hinzufügen";

  // Nachziehen: Titel, Sortierung, Filter
  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();
  if (typeof filterCards        === "function") filterCards();

  //console.log("Custom Drink gespeichert.");
});

// --- Delegation für Bearbeiten & Löschen auf dem Container ---
cardsSection?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = Number(btn.dataset.drinkId);
  if (!id) return;

  if (btn.classList.contains("edit-custom-drink")) {
    startEdit(id);
  } else if (btn.classList.contains("delete-custom-drink")) {
    deleteCustomDrink(id);
  }
});

// --- Card erstellen ---
function addDrinkToDOM(drink) {
  const cardHTML = `
  <div class="card" data-custom="true" data-drink-id="${drink.id}" data-title="${drink.name}" hidden>
    <h3 class="drink__name">${drink.name} <span class="custom-badge"><small>(Eigenkreation)</small></span></h3>
    <ul class="drink-list" role="list" aria-label="Drink Characteristics">
      <li data-alcohol="${drink.alcohol}">
        <span class="visually-hidden">Dieser Drink ${drink.alcohol === "alcoholic" ? "enthält" : "ist ohne"}</span>
        ${drink.alcohol === "alcoholic" ? "Alkohol" : "ohne Alkohol"}
      </li>
      <li data-season="${drink.seasons}">
        <span class="visually-hidden">Beste Jahreszeit für diesen Drink ist</span>
        ${formatSeasons(drink.seasons)}
      </li>
    </ul>
    <p>${drink.ingredients}</p>
    <div class="rezeptur">
      <strong>Rezeptur:</strong> ${drink.recipe}
      <strong>Zubereitung:</strong> ${drink.preparation}
      <strong>Deko:</strong> ${drink.garnish}
      ${drink.tip ? `<strong>Tipp:</strong> ${drink.tip}` : ""}
    </div>
    <div class="card-actions">
      <button type="button" class="edit-custom-drink" data-drink-id="${drink.id}">Bearbeiten</button>
      <button type="button" class="delete-custom-drink" data-drink-id="${drink.id}">Löschen</button>
    </div>
  </div>`;

  cardsSection.insertAdjacentHTML("beforeend", cardHTML);
  updateCardsArray();

  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();
}

// --- Card live aktualisieren (nach Bearbeiten) ---
function updateCardInDOM(drink) {
  const card = document.querySelector(`[data-drink-id="${drink.id}"]`);
  if (!card) return;

  card.dataset.title = drink.name;

  const titleEl = card.querySelector(".drink__name");
  if (titleEl) titleEl.innerHTML = `${drink.name} <span class="custom-badge"><small>(Eigenkreation)</small></span>`;

  const alcoholLi = card.querySelector("[data-alcohol]");
  if (alcoholLi) {
    alcoholLi.dataset.alcohol = drink.alcohol;
    alcoholLi.innerHTML = `<span class="visually-hidden">Dieser Drink ${drink.alcohol === "alcoholic" ? "enthält" : "ist ohne"}</span>${drink.alcohol === "alcoholic" ? "Alkohol" : "ohne Alkohol"}`;
  }

  const seasonLi = card.querySelector("[data-season]");
  if (seasonLi) {
    seasonLi.dataset.season = drink.seasons;
    seasonLi.innerHTML = `<span class="visually-hidden">Beste Jahreszeit für diesen Drink ist</span> ${formatSeasons(drink.seasons)}`;
  }

  const pIngr = card.querySelector("p");
  if (pIngr) pIngr.textContent = drink.ingredients;

  const rez = card.querySelector(".rezeptur");
  if (rez) {
    rez.innerHTML = `<strong>Rezeptur:</strong> ${drink.recipe}
                     <strong>Zubereitung:</strong> ${drink.preparation}
                     <strong>Deko:</strong> ${drink.garnish}
                     ${drink.tip ? `<strong>Tipp:</strong> ${drink.tip}` : ""}`;
  }

  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();
  if (typeof filterCards        === "function") filterCards();
}

// --- Bearbeiten starten ---
function startEdit(drinkId) {
  const drink = getCustomDrinks().find(d => d.id === drinkId);
  if (!drink) return;

  editingId = drinkId;


  // Felder vorfüllen
  addDrinkForm.name.value = drink.name || "";

  const yes = document.querySelector("#alcohol-yes");
  const no  = document.querySelector("#alcohol-no");
  if (drink.alcohol === "alcoholic") yes.checked = true; else no.checked = true;

  const seasons = (drink.seasons || "").split(" ").filter(Boolean);
  const allSelected = seasons.length === 4;
  if (allYearCheckbox) allYearCheckbox.checked = allSelected;
  seasonCheckboxes.forEach(cb => {
    cb.disabled = allSelected;
    cb.checked  = allSelected ? false : seasons.includes(cb.value);
  });

  addDrinkForm.ingredients.value  = drink.ingredients || "";
  addDrinkForm.recipe.value       = drink.recipe || "";
  addDrinkForm.preparation.value  = drink.preparation || "";
  addDrinkForm.garnish.value      = drink.garnish || "";
  addDrinkForm.tip.value          = drink.tip || "";

  // UI öffnen
  addDrinkForm.hidden = false;
  toggleButton.setAttribute("aria-expanded", "true");
  toggleButton.textContent = "Formular schliessen";
  addDrinkForm.querySelector('button[type="submit"]').textContent = "Änderungen speichern";

  const cardsSection = document.querySelector(".cards");
  if (cardsSection) cardsSection.hidden = true;
}

// --- Format Seasons ---
function formatSeasons(seasonString) {
  const map = { spring: "Frühling", summer: "Sommer", autumn: "Herbst", winter: "Winter" };
  return seasonString.split(" ").map(s => map[s] || s).join(" ");
}

// --- Cards-Array (falls woanders gebraucht) ---
function updateCardsArray() {
  window.cards = document.querySelectorAll(".cards .card");
  //console.log("Cards Array aktualisiert. Neue Anzahl:", window.cards.length);
}

// --- Löschen (einzeln) ---
function deleteCustomDrink(drinkId) {
  if (!confirm("Möchtest du diesen Drink wirklich löschen?")) return;

  const el = document.querySelector(`[data-drink-id="${drinkId}"]`);
  if (el) el.remove();

  let list = getCustomDrinks().filter(d => d.id !== drinkId);
  setCustomDrinks(list);

  updateCardsArray();
  if (typeof filterCards        === "function") filterCards();
  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();

  //console.log("Custom Drink gelöscht:", drinkId);
}

// bearbeiten abbrechen
document.querySelector("#cancel-edit")?.addEventListener("click", () => {
  editingId = null;
  addDrinkForm.reset();
  addDrinkForm.hidden = true;
  toggleButton.setAttribute("aria-expanded","false");
  toggleButton.textContent = "Drink hinzufügen";
  const cardsSection = document.querySelector(".cards");
  if (cardsSection) cardsSection.hidden = false;
});

// --- Alle Custom Drinks löschen ---
clearButton?.addEventListener("click", () => {
  if (!confirm("Möchtest du wirklich alle deine eigenen Drinks löschen?")) return;

  cardsSection.querySelectorAll('[data-custom="true"]').forEach(card => card.remove());
  localStorage.removeItem("customDrinks");
  updateCardsArray();
  if (typeof filterCards        === "function") filterCards();
  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();

  //console.log("Alle Custom Drinks gelöscht");
});

// --- Beim Laden: Custom Drinks wiederherstellen ---
document.addEventListener("DOMContentLoaded", () => {
  const list = getCustomDrinks();
  list.forEach(addDrinkToDOM);
  // Nachziehen (idempotent, falls drinkFilter.js das auch macht, stört es nicht)
  if (typeof setMissingDataTitles === "function") setMissingDataTitles();
  if (typeof sortCardsByTitle   === "function") sortCardsByTitle();
  if (typeof filterCards        === "function") filterCards();
});
