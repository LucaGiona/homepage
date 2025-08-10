const seasonalFilter = document.querySelector("#season");
const withOrWithoutAlcohol = document.querySelector("#alcoholic");
const noResultMessage = document.querySelector(".no-matches");

const applyButton = document.querySelector("#apply-filters");
const resetButton = document.querySelector("#reset-filters");

// Cards-Container robust ermitteln: erst .cards, sonst .drink-selection
const cardsContainer =
  document.querySelector(".cards") ||
  document.querySelector(".drink-selection");

let initiallyHidden = true;

const currentFilters = { season: "all", alcoholic: "all" };

function initViewTransitions() {
  if (!cardsContainer) return;
  cardsContainer.querySelectorAll(".card").forEach((card, i) => {
    try { card.style.viewTransitionName = `drink-card-${i + 1}`; } catch {}
  });
}

/* -------- Select-Change: nur Zustand merken -------- */
function onFilterChange(e) {
  const { name, value } = e.target;
  currentFilters[name] = value;
}

/* -------- Anwenden -------- */
applyButton?.addEventListener("click", () => {
  initiallyHidden = false;
  filterCards();
  sortCardsByTitle();
});

/* -------- Zurücksetzen -------- */
resetButton?.addEventListener("click", () => {
  if (seasonalFilter) seasonalFilter.value = "all";
  if (withOrWithoutAlcohol) withOrWithoutAlcohol.value = "all";
  currentFilters.season = "all";
  currentFilters.alcoholic = "all";
  initiallyHidden = true;
  filterCards();
});

seasonalFilter?.addEventListener("change", onFilterChange);
withOrWithoutAlcohol?.addEventListener("change", onFilterChange);

/* -------- Filtern -------- */
function filterCards() {
  if (!cardsContainer) return;
  const cards = cardsContainer.querySelectorAll(".card");

  if (initiallyHidden) {
    cards.forEach(card => (card.hidden = true));
    if (noResultMessage) noResultMessage.hidden = true;
    return;
  }

  let hasVisibleCards = false;

  cards.forEach((card, index) => {
    const seasonElement = card.querySelector("[data-season]");
    const alcoholElement = card.querySelector("[data-alcohol]");

    if (!seasonElement || !alcoholElement) {
      console.warn(`Karte ${index + 1}: Fehlende data-Attribute`);
      card.hidden = true;
      return;
    }

    const seasonsTokens = (seasonElement.dataset.season || "")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const alcohol = (alcoholElement.dataset.alcohol || "").toLowerCase();

    const matchesSeason =
      currentFilters.season === "all" ||
      seasonsTokens.includes(currentFilters.season.toLowerCase());

    const matchesAlcohol =
      currentFilters.alcoholic === "all" ||
      alcohol === currentFilters.alcoholic.toLowerCase();

    const shouldShow = matchesSeason && matchesAlcohol;

    card.hidden = !shouldShow;
    if (shouldShow) hasVisibleCards = true;
  });

  if (noResultMessage) noResultMessage.hidden = hasVisibleCards;
}

/* -------- Titel lesen & setzen & sortieren -------- */
function getCardTitle(card) {
  return (
    card.dataset.title ||
    card.querySelector(".drink__name")?.textContent.trim() ||
    ""
  );
}

function setMissingDataTitles() {
  if (!cardsContainer) return;
  cardsContainer.querySelectorAll(".card").forEach(card => {
    if (!card.dataset.title) {
      const title = card.querySelector(".drink__name")?.textContent.trim();
      if (title) card.dataset.title = title;
    }
  });
}

function sortCardsByTitle() {
  if (!cardsContainer) return;
  const cards = Array.from(cardsContainer.querySelectorAll(".card"));
  cards.sort((a, b) =>
    getCardTitle(a).localeCompare(getCardTitle(b), "de", {
      sensitivity: "base",
      numeric: true
    })
  );
  const frag = document.createDocumentFragment();
  cards.forEach(c => frag.appendChild(c));
  cardsContainer.appendChild(frag);
}

/* -------- Initial -------- */
document.addEventListener("DOMContentLoaded", () => {
  setMissingDataTitles();
  sortCardsByTitle();
  initViewTransitions();
  filterCards(); // zeigt NICHTS bis "Anwenden" geklickt wird
});
