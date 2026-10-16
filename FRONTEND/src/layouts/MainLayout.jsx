import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";
import MobileNav from "../components/layout/MobileNav";
import ScrollProgress from "../components/fun/ScrollProgress";
import CursorGlow from "../components/fun/CursorGlow";

const MainLayout = () => {
  return (
    <div className="pb-16 md:pb-0">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <MobileNav />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;
