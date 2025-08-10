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

/* ---------- 1) Select-Change: nur Zustand merken, NICHT anzeigen ---------- */

function onFilterChange(e) {
    const { name, value } = e.target;
    currentFilters[name] = value
}

applyButton?.addEventListener("click", () => {
    initiallyHidden = false;  //ab. jetzt darf angezeigt werden
    filterCards()
})

resetButton?.addEventListener("click", () => {
    //UI zurück auf "all" 
    if (seasonalFilter) seasonalFilter.value = "all"
    if (withOrWithoutAlcohol) withOrWithoutAlcohol.value = "all"
    currentFilters.season = "all";
    currentFilters.alcoholic = "all";
    //Startzustand nicht anzeigen 
    initiallyHidden = true
    filterCards()
})

// --- Event Listener ---
//nur Zustand pflegen
seasonalFilter?.addEventListener("change", onFilterChange);
withOrWithoutAlcohol?.addEventListener("change", onFilterChange);

// Hauptfunktion

function filterCards() {
    const cards = document.querySelectorAll(".drink-selection .card")

    if ( initiallyHidden) {
        cards.forEach(card => card.hidden = true)
        if (noResultMessage) noResultMessage.hidden = true
        return
    }

    let hasVisibleCards = false

    cards.forEach((card, index) => {
        const seasonElement = card.querySelector("[data-season]")
        const alcoholElement = card.querySelector("[data-alcohol]")

        if (!seasonElement || !alcoholElement) {
            console.warn(`Karte ${index +1}: Fehlende Data-Attribute`)
            card.hidden = true
            return
        }
        const seasonsTokens = (seasonElement.dataset.season || "")
             .toLowerCase().split(/\s+/).filter(Boolean);
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
    })
     if (noResultMessage) noResultMessage.hidden = hasVisibleCards;
}


// Initial
document.addEventListener("DOMContentLoaded", () => {
  initViewTransitions();
  filterCards();
});


console.log(applyButton)
console.log(resetButton)