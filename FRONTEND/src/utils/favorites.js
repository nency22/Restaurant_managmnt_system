const FAVORITES_KEY = "ww_favorites";

export const loadFavorites = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (ids) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    return;
  }
};
