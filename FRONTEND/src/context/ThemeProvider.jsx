import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "react-toastify";
import ThemeContext from "./ThemeContext";
import { prefersReducedMotion } from "../utils/motion";

const STORAGE_KEY = "theme";

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

const readInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    return "light";
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    document.documentElement.style.backgroundColor = "";
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      toast.warn("Couldn't save your theme preference on this device.", { toastId: "theme-storage" });
    }
  }, [theme]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === "light" ? "dark" : "light";
      const commit = () => {
        applyTheme(next);
        setTheme(next);
      };

      if (typeof document.startViewTransition === "function" && !prefersReducedMotion()) {
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? window.innerHeight / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const root = document.documentElement;
        root.style.setProperty("--reveal-x", `${x}px`);
        root.style.setProperty("--reveal-y", `${y}px`);
        root.style.setProperty("--reveal-r", `${radius}px`);
        document.startViewTransition(() => flushSync(commit));
      } else {
        commit();
      }

      toast.info(`${next === "dark" ? "Dark" : "Light"} mode on`, {
        toastId: "theme-change",
        autoClose: 1200,
        hideProgressBar: true,
      });
    },
    [theme]
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
