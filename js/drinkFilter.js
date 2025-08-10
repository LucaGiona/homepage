const cards = document.querySelectorAll(".drink-selection .card")
// console.log(cards)

const seasonalFilter = document.querySelector("#season")
const withOrWithoutAlcohol = document.querySelector("#alcoholic")
const noResultMessage = document.querySelector(".no-matches")

// console.log(seasonalFilter, withOrWithoutAlcohol)

const currentFilters = {
    season: "all",
    alcoholic: "all",
}

cards.forEach((card, index) => {
    const drinkId = `drink-${index +1}`;
    card.style.viewTransitionName = `drink-card-${drinkId}`
    // console.log(drinkId)
})


// seasonalFilter.addEventListener("change", (event) => {
//    // console.log(event.target.value)
//     currentFilters.season = event.target.value;
//     //console.log("Current: ", currentFilters)
// })

//Event Listener
seasonalFilter.addEventListener("change", updateFilter);
withOrWithoutAlcohol.addEventListener("change", updateFilter);

 function updateFilter(e){
    const filterType = e.target.name;
    const filterValue = e.target.value;

    console.log(`Filter geändert - ${filterType}:`, filterValue)

    currentFilters[filterType] = filterValue;

    console.log("Aktuelle Filter: ", currentFilters)

    filterCards()
 }


function filterCards(){
    let hasVisibleCards = false;

    cards.forEach((card, index) =>{
        const seasonElement = card.querySelector("[data-season]")
        const alcoholElement = card.querySelector("[data-alcohol]")
        
        if (!seasonElement || !alcoholElement){
            console.warn(`Karte ${index + 1}: Fehlende data-Attribute`)
            return
        }

        const seasons = seasonElement.dataset.season
        const alcoholic = alcoholElement.dataset.alcohol


        const matchesSeason = currentFilters.season === "all" || 
                             seasons.includes(currentFilters.season)
        
        const matchesAlcohol = currentFilters.alcoholic === "all" || 
                              alcoholic === currentFilters.alcoholic
        
        const shouldShow = matchesSeason && matchesAlcohol

        card.hidden =!shouldShow
        if (shouldShow) hasVisibleCards = true
        
    })
     noResultMessage.hidden = hasVisibleCards;
}