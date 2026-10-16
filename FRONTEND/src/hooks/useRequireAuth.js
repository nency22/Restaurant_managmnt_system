import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (action) => {
      if (!isAuthenticated) {
        toast.error("Please log in to place an order.");
        navigate("/login", { state: { from: location.pathname } });
        return;
      }
      action();
    },
    [isAuthenticated, navigate, location.pathname]
  );
};
