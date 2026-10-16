import apiClient from "./apiClient";

const CACHE_PREFIX = "ww_cache:";
const MENU_TTL = 5 * 60 * 1000;
const CUSTOMIZATION_TTL = 10 * 60 * 1000;

const memoryCache = new Map();
const inflight = new Map();

const readStorage = (key) => {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStorage = (key, entry) => {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    sessionStorage.removeItem(CACHE_PREFIX + key);
  }
};

const peek = (key) => {
  const hit = memoryCache.get(key) || readStorage(key);
  if (hit) memoryCache.set(key, hit);
  return hit || null;
};

const cachedRequest = (key, ttl, request, { force = false } = {}) => {
  const hit = peek(key);
  if (!force && hit && Date.now() - hit.savedAt < ttl) return Promise.resolve(hit.data);
  if (inflight.has(key)) return inflight.get(key);

  const promise = request()
    .then((data) => {
      const entry = { data, savedAt: Date.now() };
      memoryCache.set(key, entry);
      writeStorage(key, entry);
      return data;
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, promise);
  return promise;
};

const MENU_KEY = "menu";

export const peekMenuItems = () => {
  const hit = peek(MENU_KEY);
  if (!hit) return null;
  return { data: hit.data, isFresh: Date.now() - hit.savedAt < MENU_TTL };
};

export const getMenuItems = (options) =>
  cachedRequest(
    MENU_KEY,
    MENU_TTL,
    async () => {
      const { data } = await apiClient.get("/api/menu/");
      return data;
    },
    options
  );

export const prefetchMenu = () => {
  getMenuItems().catch(() => {});
};

export const getMenuItemCustomizations = (menuItemId, options) =>
  cachedRequest(
    `customizations:${menuItemId}`,
    CUSTOMIZATION_TTL,
    async () => {
      const { data } = await apiClient.get(`/api/menu/${menuItemId}/customizations/`);
      return data;
    },
    options
  );

export const prefetchCustomizations = (menuItemId) => {
  getMenuItemCustomizations(menuItemId).catch(() => {});
};
