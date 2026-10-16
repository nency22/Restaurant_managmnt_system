import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { celebrate } from "../../utils/celebrate";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiShoppingBag, FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import chef from "../../assets/images/menu/cake.png";

const timeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const links = [
  ["/", "Home"],
  ["/menu", "Menu"],
  ["/book-table", "Book Table"],
  ["/gallery", "Gallery"],
  ["/about", "Our Story"],
];

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const { pathname } = useLocation();

  const overHero = pathname === "/" && !scrolled;
  const tone = overHero
    ? "text-white hover:bg-white/10"
    : "text-ink hover:bg-ink/10";

  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoClicks = useRef({ count: 0, last: 0 });

  const handleLogoClick = () => {
    const now = Date.now();
    const state = logoClicks.current;
    state.count = now - state.last < 1500 ? state.count + 1 : 1;
    state.last = now;
    if (state.count >= 5) {
      state.count = 0;
      celebrate({ count: 140 });
      toast.success("Cheers! You found the secret pour.", { toastId: "secret-pour" });
    }
  };

  const handleLogout = () => {
    logout();
    close();
    toast.success("You've been logged out.");
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          overHero ? "bg-transparent" : "border-b border-ink/10 bg-paper/90 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center sm:h-20 justify-between px-5 sm:px-8 lg:px-12">
          <NavLink
            to="/"
            onClick={handleLogoClick}
            className={`font-serif text-xl font-semibold sm:text-2xl ${overHero ? "text-white" : "text-ink"}`}
          >
            Whiskey & Wheat
          </NavLink>

          <div className="flex gap-1">
            <ThemeToggle className={tone} />

            <button
              id="cart-button"
              onClick={openCart}
              aria-label="Open cart"
              className={`relative rounded-full p-3 text-xl transition-colors ${tone}`}
            >
              <FiShoppingBag />
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="badge-pop absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A059] px-1 text-[10px] font-bold text-[#2C2523]">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`rounded-full p-3 text-2xl transition-colors ${tone}`}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500
        ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      />

      <aside
        aria-label="Navigation drawer"
        className={`fixed inset-y-0 left-0 z-[70] flex h-dvh w-[82%] max-w-[500px]
        flex-col bg-paper-2 px-6 py-6 text-ink shadow-2xl
        transition-transform duration-500 ease-in-out sm:w-[420px] lg:w-[450px]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <NavLink
            to="/"
            onClick={close}
            className="font-serif text-2xl font-semibold text-brand"
          >
            Whiskey & Wheat
          </NavLink>

          <button
            onClick={close}
            aria-label="Close menu"
            className="p-1 text-xl text-brand hover:opacity-75 transition-opacity"
          >
            <FiX />
          </button>
        </div>

        <p className="mt-5 shrink-0 text-[9px] uppercase tracking-[0.3em] text-brand-2/70 font-semibold">
          {isAuthenticated ? `${timeGreeting()}, ${user?.username || "friend"}. Hungry?` : "Welcome to Whiskey & Wheat"}
        </p>

        <nav className="mt-4 shrink-0">
          {links.map(([path, label], i) => (
            <NavLink
              key={path}
              to={path}
              onClick={close}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(i)}
              className={({ isActive }) => {
                const isSelected = isActive || hovered === i;

                return `group flex items-center justify-between border-b
                border-brand/10 py-3.5 text-[19px]
                transition-all duration-300 sm:py-3 sm:text-[20px]
                ${isSelected
                  ? "pl-2 text-brand-2"
                  : "text-ink hover:pl-2 hover:text-brand-2"}`;
              }}
            >
              <span>{label}</span>

              <span
                className={`text-sm transition-all duration-300
                ${hovered === i
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-0"}
                group-hover:translate-x-0 group-hover:opacity-100`}
              >
                ↗
              </span>
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/my-orders"
                onClick={close}
                className="flex items-center justify-between border-b border-brand/10 py-3.5 text-[19px] text-ink hover:pl-2 hover:text-brand-2 transition-all duration-300 sm:py-3 sm:text-[20px]"
              >
                My Orders & Reservations
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin/reservations"
                  onClick={close}
                  className="flex items-center justify-between border-b border-brand/10 py-3.5 text-[19px] text-ink hover:pl-2 hover:text-brand-2 transition-all duration-300 sm:py-3 sm:text-[20px]"
                >
                  Manage Reservations
                </NavLink>
              )}
              <NavLink
                to="/profile"
                onClick={close}
                className="flex items-center justify-between border-b border-brand/10 py-3.5 text-[19px] text-ink hover:pl-2 hover:text-brand-2 transition-all duration-300 sm:py-3 sm:text-[20px]"
              >
                Profile
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 border-b border-brand/10 py-3.5 text-left text-[19px] text-ink hover:pl-2 hover:text-brand-2 transition-all duration-300 sm:py-3 sm:text-[20px]"
              >
                <FiLogOut className="text-base" /> Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={close}
              className="flex items-center justify-between border-b border-brand/10 py-3.5 text-[19px] text-ink hover:pl-2 hover:text-brand-2 transition-all duration-300 sm:py-3 sm:text-[20px]"
            >
              Login / Register
            </NavLink>
          )}
        </nav>

        <div className="flex min-h-0 flex-1 items-center justify-center p-4">
          <img
            src={chef}
            alt="Chef Illustration"
            draggable="false"
            className="max-h-full w-auto max-w-full object-contain pointer-events-none select-none"
          />
        </div>

        <div className="flex shrink-0 items-end justify-between border-t border-brand/10 pt-3">
          <div>
            <p className="font-serif text-sm italic text-brand">
              Taste slowly.
            </p>
            <p className="mt-0.5 text-[7px] uppercase tracking-[0.25em] text-brand-2/70 font-semibold">
              Stay a little longer.
            </p>
          </div>

          <span className="text-[8px] font-mono text-brand/50">
            © Whiskey & Wheat
          </span>
        </div>
      </aside>
    </>
  );
}
