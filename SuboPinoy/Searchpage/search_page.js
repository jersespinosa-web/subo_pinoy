const dishes = [
  {
    name: "Chicken Adobo",
    category: "Chicken",
    difficulty: "Easy",
    time: "45 minutes",
    minutes: 45,
    image: "images/chicken.png",
    link: "#"
  },
  {
    name: "Pork Adobo",
    category: "Pork",
    difficulty: "Easy",
    time: "1 Hour",
    minutes: 60,
    image: "images/pork.png",
    link: "#"
  },
  {
    name: "Adobong Pusit",
    category: "Seafood",
    difficulty: "Medium",
    time: "40 minutes",
    minutes: 40,
    image: "images/pusit.png",
    link: "#"
  },
  {
    name: "Adobong Kangkong",
    category: "Vegetable",
    difficulty: "Easy",
    time: "15 minutes",
    minutes: 15,
    image: "images/kangkong.png",
    link: "#"
  },
  {
    name: "Adobo Flakes",
    category: "Chicken",
    difficulty: "Easy",
    time: "30 minutes",
    minutes: 30,
    image: "images/flakes.png",
    link: "#"
  }
];

const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");
const filterPills = document.querySelectorAll(".pill");
const resultsMeta = document.getElementById("results-meta");
const resultsCount = document.getElementById("results-count");
const sortBtn = document.getElementById("sort-btn");
const resultsList = document.getElementById("results-list");

let activeCategory = "All";
let sortByQuickest = false;

function updateSearchResults() {
  const query = searchInput.value.trim().toLowerCase();

  resultsList.innerHTML = "";

  let matches = dishes.filter(function (dish) {
    const matchesText = dish.name.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === "All" ||
      dish.category.toLowerCase() === activeCategory.toLowerCase() ||
      dish.difficulty.toLowerCase() === activeCategory.toLowerCase();

    return matchesText && matchesCategory;
  });

  if (sortByQuickest) {
    matches = matches.slice().sort(function (a, b) {
      return a.minutes - b.minutes;
    });
  }

  resultsMeta.style.display = "flex";
  if (query !== "") {
    resultsCount.textContent = `${matches.length} results for "${searchInput.value.trim()}"`;
  } else if (activeCategory === "All") {
    resultsCount.textContent = `${matches.length} results`;
  } else {
    resultsCount.textContent = `${matches.length} results in ${activeCategory}`;
  }

  matches.forEach(function (dish) {
    const card = document.createElement("li");
    card.className = "recipe-card";

    const highlightedName = highlightMatch(dish.name, query);

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" class="recipe-thumb" />
      <div class="recipe-info">
        <h3 class="recipe-title">${highlightedName}</h3>
        <div class="recipe-tags">
          <span class="tag-category">${dish.category}</span>
          <span class="tag-difficulty">${dish.difficulty}</span>
        </div>
        <p class="recipe-time">${dish.time}</p>
      </div>
      <a href="${dish.link}" class="arrow-btn" aria-label="View ${dish.name}">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;

    resultsList.appendChild(card);
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

searchInput.addEventListener("input", updateSearchResults);

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  updateSearchResults();
  searchInput.focus();
});

sortBtn.addEventListener("click", function () {
  sortByQuickest = !sortByQuickest;
  sortBtn.textContent = sortByQuickest ? "Quickest ↑" : "Best Match ↓";
  updateSearchResults();
});

filterPills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    filterPills.forEach(function (p) {
      p.classList.remove("active");
    });
    pill.classList.add("active");
    activeCategory = pill.dataset.filter;
    updateSearchResults();
  });
});

updateSearchResults();