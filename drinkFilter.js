const cards = document.querySelectorAll(".drink-selection .card")
// console.log(cards)

const seasonalFilter = document.querySelector("#season")
const withOrWithoutAlcohol = document.querySelector("#alcoholic")
const noResultMessage = document.querySelector(".no-matches")

// console.log(seasonalFilter, withOrWithoutAlcohol)

const currentFilters = {
    season: "all",
    alcoholic: "alcoholic",
}

cards.forEach((card, index) => {
    const drinkId = `drink-${index +1}`;
    card.style.viewTranistionName = `drink-card-${drinkId}`
    // console.log(drinkId)
})


// seasonalFilter.addEventListener("change", (event) => {
//    // console.log(event.target.value)
//     currentFilters.season = event.target.value;
//     //console.log("Current: ", currentFilters)
// })

seasonalFilter.addEventListener("change", updateFilter);
withOrWithoutAlcohol.addEventListener("change", updateFilter);

 function updateFilter(e){
    const filterType = e.target.name;
    console.log(e.target.name)
 }


function filterCards(){
    let hasVisibleCards = false;

    cards.forEach(card =>{
        console.log(card)
        const matchesSeason = currentFilters.season === season
        console.log(matchesSeason)
    })
}