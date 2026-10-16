import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || "VITE_API_BASE_URL=http://127.0.0.1:8000";
const BASE_URL = RAW_BASE_URL.replace(/\/$/, "");

const ACCESS_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const dispatchServerDown = () => {
  window.dispatchEvent(new CustomEvent("api:server-down"));
};

const dispatchServerUp = () => {
  window.dispatchEvent(new CustomEvent("api:server-up"));
};

export const dispatchSessionExpired = () => {
  window.dispatchEvent(new CustomEvent("api:session-expired"));
};

const extractErrorMessage = (error) => {
  const response = error?.response;
  if (!response) {
    if (error?.code === "ECONNABORTED") return "The server took too long to respond. Please try again.";
    return "Network error. Please check your connection and try again.";
  }
  const data = response.data;
  if (typeof data === "string" && data.trim() && !data.trim().startsWith("<")) return data;
  if (data?.detail) return String(data.detail);
  if (data?.message) return String(data.message);
  if (data && typeof data === "object") {
    const first = Object.entries(data)[0];
    if (first) {
      const [key, val] = first;
      const msg = Array.isArray(val) ? val[0] : typeof val === "object" ? JSON.stringify(val) : val;
      return key === "non_field_errors" ? String(msg) : `${key.replace(/_/g, " ")}: ${msg}`;
    }
  }
  if (response.status === 401) return "Authentication failed. Please log in again.";
  if (response.status === 403) return "You don't have permission to do that.";
  if (response.status === 404) return "We couldn't find what you were looking for.";
  if (response.status >= 500) return "Server error. Please try again shortly.";
  return "Something went wrong. Please try again.";
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60s timeout for Render free tier cold starts
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

const performRefresh = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}http://127.0.0.1:8000/api/account/token/refresh/`, {
        refresh: tokenStorage.getRefresh(),
      })
      .then(({ data }) => {
        tokenStorage.setTokens({ access: data.access });
        return data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => {
    dispatchServerUp();
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if ((!response && error.code !== "ERR_CANCELED") || response?.status >= 500) {
      dispatchServerDown();
    }

    const status = response?.status;
    const hasRefreshToken = !!tokenStorage.getRefresh();

    const isAuthCall = /\/api\/account\/(Login|Register)/i.test(config?.url || "");

    if (status === 401 && hasRefreshToken && !config._retried && !isAuthCall) {
      config._retried = true;
      try {
        const newAccess = await performRefresh();
        config.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(config);
      } catch {
        tokenStorage.clear();
        dispatchSessionExpired();
        const expired = new Error("Your session has expired. Please log in again.");
        expired.status = 401;
        return Promise.reject(expired);
      }
    }

    if (status === 401 && !hasRefreshToken && !isAuthCall) {
      tokenStorage.clear();
    }

    const wrapped = new Error(extractErrorMessage(error));
    wrapped.status = status;
    wrapped.data = response?.data;
    wrapped.isNetworkError = !response && error.code !== "ERR_CANCELED";
    return Promise.reject(wrapped);
  }
);

export default apiClient;
