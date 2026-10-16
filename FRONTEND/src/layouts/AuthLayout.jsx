import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import ThemeToggle from "../components/layout/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-paper text-ink">
      <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-5">
        <ThemeToggle className="text-ink hover:bg-ink/10" />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
