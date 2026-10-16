import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../components/layout/ThemeToggle";

const floaters = [
  { emoji: "🍕", x: "8%", y: "18%", delay: 0 },
  { emoji: "🥐", x: "82%", y: "14%", delay: 0.4 },
  { emoji: "🍷", x: "14%", y: "72%", delay: 0.8 },
  { emoji: "🍰", x: "85%", y: "70%", delay: 1.2 },
  { emoji: "🥗", x: "48%", y: "10%", delay: 0.6 },
];

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper px-5 text-center sm:px-8">
      <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-5">
        <ThemeToggle className="text-ink hover:bg-ink/10" />
      </div>

      {floaters.map((f) => (
        <motion.span
          key={f.emoji}
          aria-hidden="true"
          className="pointer-events-none absolute text-3xl sm:text-4xl"
          style={{ left: f.x, top: f.y }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
          transition={{
            duration: 3.2,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {f.emoji}
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto max-w-lg">
        <motion.div
          className="mx-auto text-7xl sm:text-8xl"
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          👨‍🍳
        </motion.div>

        <h1 className="mt-6 font-serif text-[clamp(2.4rem,8vw,4.5rem)] font-medium leading-none text-ink">
          404
        </h1>
        <p className="mt-3 font-serif text-xl italic text-ink/80 sm:text-2xl">
          This table isn't set.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink/60 sm:text-base">
          The page you're looking for must have stepped out. Let's get you
          back to the dining room.
        </p>

        <NavLink
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-colors duration-300 hover:bg-[#b89450]"
        >
          Return to Home
        </NavLink>
      </div>
    </main>
  );
};

export default NotFound;
