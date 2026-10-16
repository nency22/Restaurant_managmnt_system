import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";
import AdminGuard from "./AdminGuard";
import PageLoader from "../components/feedback/PageLoader";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Menu = lazy(() => import("../pages/Menu"));
const BookTable = lazy(() => import("../pages/BookTable"));
const Checkout = lazy(() => import("../pages/Checkout"));
const MyOrders = lazy(() => import("../pages/MyOrders"));
const Profile = lazy(() => import("../pages/Profile"));
const AdminReservations = lazy(() => import("../pages/AdminReservations"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/book-table" element={<BookTable />} />

          <Route element={<AuthGuard />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin/reservations" element={<AdminReservations />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
