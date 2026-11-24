const SuboUser = (function () {
  const STORAGE_KEY = "subo_pinoy_user_v1";

  const defaultData = {
    username: "YoMaMa_15",
    email: "yomama15@wvsu.edu.ph",
    avatar: "images/subopfp.jpg",
    settings: {
      notifications: true,
      darkMode: false,
      metricUnits: true,
      autoSaveHistory: true,
      publicProfile: true
    },
    favorites: [
      { name: "Chicken Adobo", category: "Chicken", difficulty: "Easy", time: "45 minutes", image: "../search_page/images/chicken.png", link: "#" },
      { name: "Pork Adobo", category: "Pork", difficulty: "Easy", time: "1 Hour", image: "../search_page/images/pork.png", link: "#" },
      { name: "Adobong Pusit", category: "Seafood", difficulty: "Medium", time: "40 minutes", image: "../search_page/images/pusit.png", link: "#" }
    ],
    activity: [
      "Searched for 'Adobo' • 04:12 PM",
      "Viewed Chicken Adobo recipe • 04:15 PM",
      "Saved Pork Adobo to Favorites • 04:20 PM"
    ]
  };

  function getUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(defaultData);
  }

  function saveUser(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function updateAccount(updates) {
    const user = getUser();
    Object.assign(user, updates);
    saveUser(user);
    logActivity("Updated account details");
    return user;
  }

  function toggleSetting(key) {
    const user = getUser();
    user.settings[key] = !user.settings[key];
    saveUser(user);
    return user.settings[key];
  }

  function addFavorite(dish) {
    const user = getUser();
    if (!user.favorites.some((item) => item.name === dish.name)) {
      user.favorites.unshift(dish);
      saveUser(user);
      logActivity(`Added ${dish.name} to Favorites`);
    }
  }

  function removeFavorite(dishName) {
    const user = getUser();
    user.favorites = user.favorites.filter((item) => item.name !== dishName);
    saveUser(user);
    logActivity(`Removed ${dishName} from Favorites`);
  }

  function logActivity(actionText) {
    const user = getUser();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    user.activity.unshift(`${actionText} • ${time}`);
    user.activity = user.activity.slice(0, 15);
    saveUser(user);
  }

  function logout(redirectUrl = "../search_page/search_page.html") {
    logActivity("Logged out");
    window.location.href = redirectUrl;
  }

  return {
    getUser,
    updateAccount,
    toggleSetting,
    addFavorite,
    removeFavorite,
    logActivity,
    logout
  };
})();