import apiClient, { tokenStorage } from "./apiClient";

export const registerUser = async ({ username, email, role, password }) => {
  const { data } = await apiClient.post("http://127.0.0.1:8000/api/account/Register", {
    username,
    email,
    role,
    password,
    is_active: true,
  });
  return data;
};

export const loginUser = async ({ username, password }) => {
  const { data } = await apiClient.post("http://127.0.0.1:8000/api/account/Login", { username, password });
  tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
  return data;
};

export const logoutUser = () => {
  tokenStorage.clear();
};

export const getProfile = async () => {
  const { data } = await apiClient.get("http://127.0.0.1:8000/api/account/profile");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await apiClient.put("http://127.0.0.1:8000/api/account/profile", payload);
  return data;
};

export const changePassword = async (payload) => {
  const { data } = await apiClient.post("http://127.0.0.1:8000/api/account/change-password/", payload);
  return data;
};

export const checkIsAdmin = async () => {
  try {
    await apiClient.get("http://127.0.0.1:8000/api/account/Admin");
    return true;
  } catch {
    return false;
  }
};
