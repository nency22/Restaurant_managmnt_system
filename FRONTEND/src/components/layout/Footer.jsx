import { NavLink, useLocation } from "react-router-dom";
import { FiInstagram, FiFacebook, FiMail } from "react-icons/fi";

const links = [
  ["/", "Home"],
  ["/menu", "Menu"],
  ["/gallery", "Gallery"],
  ["/about", "Our Story"],
  ["/book-table", "Book a Table"],
  ["/my-orders", "My Orders"],
];

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (!isHomePage) {
    return (
      <footer className="w-full bg-paper-2 py-6 border-t border-[#C5A059]/20 text-center text-xs text-ink/60">
        © {new Date().getFullYear()} Whiskey & Wheat. All rights reserved.
      </footer>
    );
  }

  return (
    <footer className="w-full bg-paper-2 px-5 pb-8 pt-14 text-ink sm:px-8 sm:pt-16 md:px-12 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <NavLink to="/" className="font-serif text-2xl font-semibold">
            Whiskey & Wheat
          </NavLink>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink/60">
            A place for good food, good company, and staying a little longer.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-deep">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {links.map(([path, label]) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="text-sm text-ink/70 transition-colors hover:text-[#C5A059]"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-deep">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li>123 Harvest Lane, Your City</li>
            <li>Tue – Sun, 5:00 PM – 11:00 PM</li>
            <li>(555) 010-2024</li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-deep">
            Follow
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-ink/70 transition-colors hover:text-[#C5A059]"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-ink/70 transition-colors hover:text-[#C5A059]"
            >
              <FiFacebook size={18} />
            </a>
            <a
              href="mailto:hello@whiskeyandwheat.com"
              aria-label="Email"
              className="text-ink/70 transition-colors hover:text-[#C5A059]"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl border-t border-[#C5A059]/25 pt-6 text-center text-[10px] text-ink/40 sm:text-xs">
        © {new Date().getFullYear()} Whiskey & Wheat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
