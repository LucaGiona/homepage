// --- Zähler für gespeicherte eigene Drinks ---
function updateDrinksCount() {
  const countEl = document.getElementById("custom-drinks-count");
  if (!countEl) return;

  const count = JSON.parse(localStorage.getItem("customDrinks") || "[]").length;
  countEl.textContent = count === 1
    ? "1 Drink ist gespeichert"
    : `${count} Drinks sind gespeichert`;
}

document.addEventListener("DOMContentLoaded", updateDrinksCount);
