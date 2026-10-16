import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { tokenStorage } from "../services/apiClient";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  checkIsAdmin,
} from "../services/authService";
import { AuthContext } from "./AuthContextObject";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(tokenStorage.getAccess()));

  useEffect(() => {
    if (!tokenStorage.getAccess()) return undefined;
    let active = true;

    getProfile()
      .then(async (profile) => {
        const admin = await checkIsAdmin();
        if (!active) return;
        setUser(profile);
        setIsAdmin(admin);
      })
      .catch(() => {
        tokenStorage.clear();
        if (!active) return;
        setUser(null);
        setIsAdmin(false);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onExpired = () => {
      setUser((previous) => {
        if (previous) {
          toast.error("Your session has expired. Please log in again.", { toastId: "session-expired" });
        }
        return null;
      });
      setIsAdmin(false);
    };
    window.addEventListener("api:session-expired", onExpired);
    return () => window.removeEventListener("api:session-expired", onExpired);
  }, []);

  const login = useCallback(async (credentials) => {
    await loginUser(credentials);
    const profile = await getProfile();
    setUser(profile);
    setIsAdmin(await checkIsAdmin());
    return profile;
  }, []);

  const register = useCallback((payload) => registerUser(payload), []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    setIsAdmin(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
      return profile;
    } catch (error) {
      toast.error(error.message || "Couldn't refresh your profile.");
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, isAdmin, isLoading, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
