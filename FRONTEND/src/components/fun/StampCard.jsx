import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { celebrate } from "../../utils/celebrate";

const SLOTS = 5;

const seenKey = (count) => `ww_stampcard_${count}`;

const hasSeen = (count) => {
  try {
    return localStorage.getItem(seenKey(count)) === "1";
  } catch {
    return true;
  }
};

const markSeen = (count) => {
  try {
    localStorage.setItem(seenKey(count), "1");
  } catch {
    return;
  }
};

export default function StampCard({ completed }) {
  const reduce = useReducedMotion();
  const filled = completed > 0 && completed % SLOTS === 0 ? SLOTS : completed % SLOTS;
  const isFull = filled === SLOTS;

  useEffect(() => {
    if (isFull && !hasSeen(completed)) {
      markSeen(completed);
      celebrate({ y: 0.3 });
    }
  }, [isFull, completed]);

  let message = "Finish your first order or reservation to earn your first stamp.";
  if (isFull) message = "Card full! You're officially a Whiskey & Wheat regular.";
  else if (completed > 0) message = `${SLOTS - filled} more to fill your card.`;

  return (
    <section
      aria-label="Stamp card"
      className="washi mb-8 rounded-sm border border-gold/30 bg-paper-2 p-5 shadow-md"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-['Great_Vibes'] text-3xl text-ink">Your stamp card</h2>
        <span className="text-xs uppercase tracking-widest text-ink/60">{completed} completed</span>
      </div>

      <ul className="mt-4 flex items-center justify-between gap-2 sm:justify-start sm:gap-4">
        {Array.from({ length: SLOTS }, (_, index) => {
          const stamped = index < filled;
          return (
            <motion.li
              key={index}
              initial={reduce ? false : { scale: 0.4, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: stamped ? -8 : 0, opacity: 1 }}
              transition={{ delay: index * 0.09, type: "spring", stiffness: 260, damping: 14 }}
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-['Great_Vibes'] text-2xl sm:h-14 sm:w-14 ${
                stamped
                  ? "border-gold bg-gold/20 text-gold-deep"
                  : "border-dashed border-ink/25 text-ink/25"
              }`}
              aria-label={stamped ? "Stamped" : "Empty"}
            >
              {stamped ? "W&W" : index + 1}
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs italic text-ink/70">{message}</p>
    </section>
  );
}
