const menuView = document.getElementById("view-menu");
const subPanel = document.getElementById("sub-panel");
const panelHeading = document.getElementById("panel-heading");
const panelBody = document.getElementById("panel-body");
const actionRowButtons = document.querySelectorAll(".action-row-card");
const btnBack = document.getElementById("btn-back");
const btnLogout = document.getElementById("btn-logout");

let currentActiveView = "menu"; // 'menu' or panel type ('favorites', 'settings', 'edit', 'activity')

function renderProfileHeader() {
  const user = SuboUser.getUser();
  document.getElementById("profile-username").textContent = user.username;
  document.getElementById("profile-avatar").src = user.avatar;
}

function showMenu() {
  currentActiveView = "menu";
  menuView.classList.remove("hidden");
  subPanel.classList.add("hidden");
}

function showSubPanel(viewType) {
  currentActiveView = viewType;
  menuView.classList.add("hidden");
  subPanel.classList.remove("hidden");

  if (viewType === "favorites") {
    panelHeading.textContent = "FAVORITES";
    renderFavoritesPanel();
  } else if (viewType === "settings") {
    panelHeading.textContent = "ACCOUNT SETTINGS";
    renderSettingsPanel();
  } else if (viewType === "edit") {
    panelHeading.textContent = "EDIT ACCOUNT";
    renderEditPanel();
  } else if (viewType === "activity") {
    panelHeading.textContent = "ACTIVITY";
    renderActivityPanel();
  }
}

function renderFavoritesPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = "";

  if (user.favorites.length === 0) {
    panelBody.innerHTML = `<div class="slot-item">No favorite dishes saved yet.</div>`;
    return;
  }

  user.favorites.forEach(function (dish) {
    const card = document.createElement("div");
    card.className = "recipe-card-mini";
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" class="recipe-thumb">
      <div class="recipe-info">
        <h3 class="recipe-title">${dish.name}</h3>
        <div class="recipe-meta-row">
          <span class="tag-cat">${dish.category}</span>
          <span class="tag-diff">${dish.difficulty}</span>
        </div>
      </div>
      <button type="button" class="remove-fav-btn" title="Remove">×</button>
    `;

    card.querySelector(".remove-fav-btn").addEventListener("click", function () {
      SuboUser.removeFavorite(dish.name);
      renderFavoritesPanel();
    });

    panelBody.appendChild(card);
  });
}

function renderSettingsPanel() {
  const user = SuboUser.getUser();
  const settingsLabels = {
    notifications: "Recipe Notifications",
    darkMode: "High Contrast Mode",
    metricUnits: "Metric Measurements",
    autoSaveHistory: "Save Search History"
  };

  panelBody.innerHTML = "";

  Object.keys(settingsLabels).forEach(function (key) {
    const isOn = user.settings[key];
    const row = document.createElement("div");
    row.className = "slot-item";
    row.innerHTML = `
      <span>${settingsLabels[key]}</span>
      <button type="button" class="toggle-btn ${isOn ? "on" : ""}" data-key="${key}">
        ${isOn ? "ON" : "OFF"}
      </button>
    `;
    panelBody.appendChild(row);
  });

  panelBody.querySelectorAll(".toggle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      SuboUser.toggleSetting(btn.dataset.key);
      renderSettingsPanel();
    });
  });
}

function renderEditPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = `
    <form id="edit-form" class="slot-list" style="display:flex; flex-direction:column; gap:10px;">
      <label style="font-size:12px; color:#fff; font-family:'Modak';">Username:</label>
      <input type="text" id="edit-username" class="slot-input" value="${user.username}" required>
      
      <label style="font-size:12px; color:#fff; font-family:'Modak';">Email:</label>
      <input type="email" id="edit-email" class="slot-input" value="${user.email}" required>
      
      <button type="submit" class="slot-save-btn" style="margin-top:6px;">SAVE CHANGES</button>
    </form>
  `;

  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newName = document.getElementById("edit-username").value.trim();
    const newEmail = document.getElementById("edit-email").value.trim();
    if (newName) {
      SuboUser.updateAccount({ username: newName, email: newEmail });
      renderProfileHeader();
      showMenu();
    }
  });
}

function renderActivityPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = "";

  user.activity.forEach(function (entry) {
    const item = document.createElement("div");
    item.className = "slot-item";
    item.style.fontSize = "12px";
    item.textContent = entry;
    panelBody.appendChild(item);
  });
}

actionRowButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const target = btn.dataset.target;
    if (target === "view-settings") showSubPanel("settings");
    if (target === "view-favorites") showSubPanel("favorites");
    if (target === "view-edit") showSubPanel("edit");
    if (target === "view-activity") showSubPanel("activity");
  });
});

btnBack.addEventListener("click", function () {
  if (currentActiveView !== "menu") {
    showMenu();
  } else {
    window.location.href = "../search_page/search_page.html";
  }
});

btnLogout.addEventListener("click", function () {
  SuboUser.logout("../search_page/search_page.html");
});

renderProfileHeader();
showMenu();
