import { NavLink } from "react-router-dom";
import { FiHome, FiBookOpen, FiCalendar, FiClipboard, FiUser } from "react-icons/fi";

const TABS = [
  { to: "/", label: "Home", Icon: FiHome, end: true },
  { to: "/menu", label: "Menu", Icon: FiBookOpen },
  { to: "/book-table", label: "Book", Icon: FiCalendar },
  { to: "/my-orders", label: "Orders", Icon: FiClipboard },
  { to: "/profile", label: "Me", Icon: FiUser },
];

export default function MobileNav() {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-[45] border-t border-ink/10 bg-paper/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                  isActive ? "text-gold-deep" : "text-ink/60"
                }`
              }
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
