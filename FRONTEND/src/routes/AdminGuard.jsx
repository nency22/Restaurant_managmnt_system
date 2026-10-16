import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const AdminGuard = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const denied = !isLoading && isAuthenticated && !isAdmin;

  useEffect(() => {
    if (denied) toast.error("Admin access only.", { toastId: "admin-denied" });
  }, [denied]);

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AdminGuard;
