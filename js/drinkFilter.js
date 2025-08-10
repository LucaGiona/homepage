const seasonalFilter = document.querySelector("#season");
const withOrWithoutAlcohol = document.querySelector("#alcoholic");
const noResultMessage = document.querySelector(".no-matches");

const applyButton = document.querySelector("#apply-filters");
const resetButton = document.querySelector("#reset-filters");

let initiallyHidden = true; // Start: alles ausblenden

const currentFilters = {
  season: "all",
  alcoholic: "all",
};

function initViewTransitions() {
  document.querySelectorAll(".drink-selection .card").forEach((card, i) => {
    try {
      card.style.viewTransitionName = `drink-card-${i + 1}`;
    } catch {}
  });
}

function updateFilter(e) {
  const filterType = e.target.name;
  const filterValue = e.target.value;

  console.log(`Filter geändert - ${filterType}:`, filterValue);

  currentFilters[filterType] = filterValue;
  initiallyHidden = false; // Ab jetzt darf angezeigt werden
  filterCards();
}

function filterCards() {
  const cards = document.querySelectorAll(".drink-selection .card");

  let hasVisibleCards = false;

  cards.forEach((card, index) => {
    const seasonElement = card.querySelector("[data-season]");
    const alcoholElement = card.querySelector("[data-alcohol]");

    if (!seasonElement || !alcoholElement) {
      console.warn(`Karte ${index + 1}: Fehlende data-Attribute`);
      card.hidden = true;
      return;
    }

    // Falls initial verstecken
    if (initiallyHidden) {
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

// --- Event Listener ---
// Filter ändern
seasonalFilter?.addEventListener("change", updateFilter);
withOrWithoutAlcohol?.addEventListener("change", updateFilter);

// Nur klicken, ohne Wert zu ändern → trotzdem anzeigen
seasonalFilter?.addEventListener("click", () => {
  initiallyHidden = false;
  filterCards();
});
withOrWithoutAlcohol?.addEventListener("click", () => {
  initiallyHidden = false;
  filterCards();
});

// Initial
document.addEventListener("DOMContentLoaded", () => {
  initViewTransitions();
  filterCards();
});


console.log(applyButton)
console.log(resetButton)