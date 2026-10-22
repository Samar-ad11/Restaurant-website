
const menuItems = document.querySelectorAll(".menu-item");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("menuSearch");
const clearSearchButton = document.getElementById("clearSearch");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const resetMenuButton = document.getElementById("resetMenu");

let selectedCategory = "all";

function filterMenu() {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleItems = 0;

    menuItems.forEach(function (item) {
        const itemCategory = item.dataset.category.toLowerCase();
        const itemName = item.dataset.name.toLowerCase();
        const itemText = item.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            itemCategory === selectedCategory;

        const matchesSearch =
            itemName.includes(searchText) ||
            itemText.includes(searchText);

        if (matchesCategory && matchesSearch) {
            item.classList.remove("d-none");
            visibleItems++;
        } else {
            item.classList.add("d-none");
        }
    });

    resultsCount.textContent =
        `Showing ${visibleItems} ${visibleItems === 1 ? "dish" : "dishes"}`;

    if (visibleItems === 0) {
        noResults.classList.remove("d-none");
    } else {
        noResults.classList.add("d-none");
    }

    clearSearchButton.hidden = searchText.length === 0;
}

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category.toLowerCase();

        categoryButtons.forEach(function (categoryButton) {
            const isActive = categoryButton === button;

            categoryButton.classList.toggle("active", isActive);
            categoryButton.setAttribute("aria-pressed", String(isActive));
        });

        filterMenu();
    });
});

searchInput.addEventListener("input", function () {
    filterMenu();
});

clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";
    filterMenu();
    searchInput.focus();
});

resetMenuButton.addEventListener("click", function () {
    searchInput.value = "";
    selectedCategory = "all";

    categoryButtons.forEach(function (button) {
        const isAllButton = button.dataset.category.toLowerCase() === "all";

        button.classList.toggle("active", isAllButton);
        button.setAttribute("aria-pressed", String(isAllButton));
    });

    filterMenu();
    searchInput.focus();
});

filterMenu();