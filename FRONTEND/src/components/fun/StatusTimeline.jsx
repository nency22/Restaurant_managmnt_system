import { motion, useReducedMotion } from "framer-motion";
import Stamp from "./Stamp";

const STEPS = ["Pending", "Confirmed", "Completed"];

const STEP_INDEX = {
  PENDING: 0,
  CONFIRMED: 1,
  ACCEPTED: 1,
  PREPARING: 1,
  READY: 1,
  COMPLETED: 2,
  DELIVERED: 2,
};

const MESSAGES = {
  0: "Waiting for the kitchen to say yes.",
  1: "Chef is on it.",
  2: "All done. We hope it was delicious!",
};

const ENDED = {
  CANCELLED: "Cancelled. We hope to see you again soon.",
  REJECTED: "We couldn't fit this one in. Try another time?",
};

export default function StatusTimeline({ status }) {
  const reduce = useReducedMotion();
  const key = String(status || "PENDING").toUpperCase();

  if (ENDED[key]) {
    return (
      <div className="flex w-full flex-wrap items-center gap-3 border-t border-dashed border-gold/30 pt-3 text-xs text-ink/70">
        <Stamp tone="ember" className="text-[9px]">{key}</Stamp>
        <span>{ENDED[key]}</span>
      </div>
    );
  }

  const current = STEP_INDEX[key] ?? 0;
  const progress = (current / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full border-t border-dashed border-gold/30 pt-3">
      <div className="relative mx-2 mt-1 mb-6">
        <div className="absolute left-0 right-0 top-1.5 h-0.5 rounded bg-ink/15" />
        <motion.div
          className="absolute left-0 top-1.5 h-0.5 rounded bg-gold"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <ol className="relative flex justify-between">
          {STEPS.map((label, index) => (
            <li key={label} className="flex w-0 flex-col items-center">
              <motion.span
                initial={reduce ? false : { scale: 0.6 }}
                animate={{ scale: index <= current ? 1 : 0.85 }}
                className={`h-3.5 w-3.5 rounded-full border-2 ${
                  index <= current ? "border-gold bg-gold" : "border-ink/25 bg-paper-2"
                }`}
              />
              <span
                className={`mt-1.5 whitespace-nowrap text-[10px] uppercase tracking-wider ${
                  index === current ? "font-semibold text-gold-deep" : "text-ink/50"
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-xs italic text-ink/70">{MESSAGES[current]}</p>
    </div>
  );
}
