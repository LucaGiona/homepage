const toggleButton = document.querySelector("#toggle-add-drink");
const addDrinkForm = document.querySelector("#add-drink-form");
const clearButton = document.querySelector("#clearMyDrinks");
const cardsContainer = document.querySelector(".card").parentElement;

// Season Checkboxes
const allYearCheckbox = document.querySelector('input[name="seasons"][value="all"]');
const seasonCheckboxes = document.querySelectorAll('input[name="seasons"]:not([value="all"])');

console.log("Add Drink Script geladen");

// NOTE  Season Checkbox Logic - "Ganzes Jahr" vs spezifische Seasons
if (allYearCheckbox && seasonCheckboxes.length > 0) {
    allYearCheckbox.addEventListener('change', () => {
        if (allYearCheckbox.checked) {
            console.log("Ganzes Jahr ausgewählt - deaktiviere andere Seasons");
            seasonCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = true;
            });
        } else {
            console.log("Ganzes Jahr abgewählt - aktiviere andere Seasons");
            seasonCheckboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
        }
    });

    seasonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                console.log(`${checkbox.value} ausgewählt - deaktiviere 'Ganzes Jahr'`);
                allYearCheckbox.checked = false;
            }
        });
    });
}

// Toggle Form anzeigen/verstecken
toggleButton.addEventListener("click", () => {
    const isHidden = addDrinkForm.hidden;
    addDrinkForm.hidden = !isHidden;
    toggleButton.setAttribute("aria-expanded", String(!isHidden));
    toggleButton.textContent = isHidden ? "Formular schliessen" : "Drink hinzufügen";
});

// Formular Submit Handler
addDrinkForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("=== Formular submitted ===");

    const formData = new FormData(addDrinkForm);

    const selectedSeasons = [];

    if (allYearCheckbox && allYearCheckbox.checked) {
        selectedSeasons.push("spring", "summer", "autumn", "winter");
        console.log("Ganzes Jahr -> alle Seasons hinzugefügt");
    } else {
        const checkedSeasonCheckboxes = document.querySelectorAll('input[name="seasons"]:checked:not([value="all"])');
        checkedSeasonCheckboxes.forEach(checkbox => {
            selectedSeasons.push(checkbox.value);
        });
    }
    console.log("Ausgewählte Saisons:", selectedSeasons);

    if (selectedSeasons.length === 0) {
        alert('Bitte wähle mindestens eine Jahreszeit aus!');
        return;
    }

    // Drink-Objekt erstellen
    const newDrink = {
        name: formData.get("name").trim(),
        alcohol: formData.get("alcohol"),
        seasons: selectedSeasons.join(" "),
        ingredients: formData.get("ingredients").trim(),
        recipe: formData.get("recipe").trim(),
        preparation: formData.get("preparation").trim(),
        garnish: formData.get("garnish").trim() || "keine",
        tip: formData.get("tip").trim() || "",
        isCustom: true,
        id: Date.now()
    };

    console.log("Neuer Drink erstellt: ", newDrink);

    // DOM + Storage aktualisieren
    addDrinkToDOM(newDrink);
    saveCustomDrink(newDrink);

    addDrinkForm.reset();

    if (seasonCheckboxes.length > 0) {
        seasonCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
    }

    addDrinkForm.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.textContent = "Drink hinzufügen";

    filterCards();

    console.log("Eigener Drink erfolgreich hinzugefügt!");
    console.log("==== Ende Formular submit ==== \n");
});


//NOTE - Drink zur DOM hinzufügen

function addDrinkToDOM(drink) {
    //Neue Karte HTML erstellen (gleiche Struktur wie hardcoded)
    const cardHTML =`
    <div class="card" data-custom="true" data-drink-id="${drink.id}" hidden>
            <h3 class="drink__name">${drink.name} <span class="custom-badge">(Eigener Drink)</span></h3>
            <ul class="drink-list" role="list" aria-label="Drink Characteristics">
                <li data-alcohol="${drink.alcohol}">
                    <span class="visually-hidden">Dieser Drink ${drink.alcohol === 'alcoholic' ? 'enthält' : 'ist ohne'}</span>
                    ${drink.alcohol === 'alcoholic' ? 'Alkohol' : 'ohne Alkohol'}
                </li>
                <li data-season="${drink.seasons}">
                    <span class="visually-hidden">Beste Jahreszeit für diesen Drink ist</span>
                    ${formatSeasons(drink.seasons)}
                </li>
            </ul>
            <p>${drink.ingredients}</p>
            <div class="rezeptur">
                <strong>Rezeptur:</strong>
                ${drink.recipe}
                <strong>Zubereitung:</strong>
                ${drink.preparation}
                <strong>Deko:</strong>
                ${drink.garnish}
                ${drink.tip ? `<strong>Tipp:</strong> ${drink.tip}` : ''}
            </div>
            <button type="button" class="delete-custom-drink" data-drink-id="${drink.id}">
                Löschen
            </button>
        </div>
    `;

    //NOTE - Vor der "no-matches" Naqchricht einfügen
    const noMatchesDiv = document.querySelector(".no-matches")
    noMatchesDiv.insertAdjacentHTML("beforebegin", cardHTML)

    // Nere Karte zu cards-Liste hinzufügen für Filter
    const newCard = document.querySelector(`[data-drink-id="${drink.id}"]`)
    updateCardsArray()

    //Delete-Button Event Listener hinzufügen
    const deleteButton = newCard.querySelector(".delete-custom-drink")
    deleteButton.addEventListener("click", () => deleteCustomDrink(drink.id))

    console.log("Karte zur DOM hinzugefügt: ", drink.name)
}

function formatSeasons(seasonString){
    const seasonMap = {
        "spring": "Frühling",
        "summer": "Sommer",
        "autumn": "Herbst",
        "winter": "Winter"
    };

    return seasonString.split(" ")
        .map(season => seasonMap[season] || season)
        .join(" ")
}

//NOTE -  Cards Array Aktualisieren (für Filter)
function updateCardsArray(){
    //globale cards Varaible neu laden 
    window.cards = document.querySelectorAll(".drink-selection .card")
    console.log("Cards Array aktualisiert. Neue Anzahl: ", window.cards.length)


}

// Custom Drink in localStorage speichern
function saveCustomDrink(drink) {
    let customDrinks = JSON.parse(localStorage.getItem('customDrinks') || '[]');
    customDrinks.push(drink);
    localStorage.setItem('customDrinks', JSON.stringify(customDrinks));
    console.log("Drink in localStorage gespeichert");
}

// Custom Drinks beim Laden der Seite wiederherstellen
function loadCustomDrinks() {
    const customDrinks = JSON.parse(localStorage.getItem('customDrinks') || '[]');
    console.log("Lade Custom Drinks aus localStorage:", customDrinks.length);
    
    customDrinks.forEach(drink => {
        addDrinkToDOM(drink);
    });
    
    if (customDrinks.length > 0) {
        filterCards(); // Filter nach dem Laden aktualisieren
    }
}

// Einzelnen Custom Drink löschen
function deleteCustomDrink(drinkId) {
    if (!confirm('Möchtest du diesen Drink wirklich löschen?')) return;
    
    // Aus DOM entfernen
    const cardElement = document.querySelector(`[data-drink-id="${drinkId}"]`);
    if (cardElement) {
        cardElement.remove();
        updateCardsArray();
        console.log("Karte aus DOM entfernt:", drinkId);
    }
    
    // Aus localStorage entfernen
    let customDrinks = JSON.parse(localStorage.getItem('customDrinks') || '[]');
    customDrinks = customDrinks.filter(drink => drink.id !== drinkId);
    localStorage.setItem('customDrinks', JSON.stringify(customDrinks));
    
    // Filter aktualisieren
    filterCards();
    
    console.log("Custom Drink gelöscht:", drinkId);
}

// Alle Custom Drinks löschen
clearButton.addEventListener('click', () => {
    if (!confirm('Möchtest du wirklich alle deine eigenen Drinks löschen?')) return;
    
    // Alle custom cards aus DOM entfernen
    const customCards = document.querySelectorAll('[data-custom="true"]');
    customCards.forEach(card => card.remove());
    
    // localStorage leeren
    localStorage.removeItem('customDrinks');
    
    // Cards Array und Filter aktualisieren
    updateCardsArray();
    filterCards();
    
    console.log("Alle Custom Drinks gelöscht");
});

// Beim Laden der Seite Custom Drinks wiederherstellen
document.addEventListener('DOMContentLoaded', () => {
    loadCustomDrinks();
});

