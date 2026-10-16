import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { formatPrice } from "../../utils/format";
import { haptic } from "../../utils/motion";
import { celebrate } from "../../utils/celebrate";

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

export default function SurpriseModal({ items, onClose, onAdd }) {
  const [current, setCurrent] = useState(items[0]);
  const [spinning, setSpinning] = useState(true);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!spinning) return undefined;
    let step = 0;
    let delay = 60;
    let timer = 0;

    const tick = () => {
      step += 1;
      setCurrent(pickRandom(items));
      haptic(6);
      if (step < 22) {
        delay += step * 5;
        timer = setTimeout(tick, delay);
      } else {
        setSpinning(false);
        celebrate({ x: 0.5, y: 0.45, count: 50 });
      }
    };

    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [spinning, round, items]);

  const spinAgain = () => {
    setRound((value) => value + 1);
    setSpinning(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Surprise me"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        onClick={(event) => event.stopPropagation()}
        className="washi relative w-full max-w-sm rounded-sm border border-gold/40 bg-paper-2 p-6 text-center text-ink shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 p-1 text-xl text-ink/70 hover:text-ink"
        >
          <FiX />
        </button>

        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-deep">Can't decide?</p>
        <h2 className="mt-1 font-['Great_Vibes'] text-4xl">Let the kitchen pick</h2>

        <div className="mt-6 flex min-h-[132px] flex-col items-center justify-center rounded-sm border border-dashed border-gold/50 bg-paper px-4 py-5">
          <p
            aria-live="polite"
            className={`font-serif text-2xl font-bold transition-opacity ${spinning ? "opacity-60" : "opacity-100"}`}
          >
            {current.name}
          </p>
          {!spinning && (
            <>
              <p className="mt-1 text-sm font-semibold text-gold-deep">{formatPrice(current.price)}</p>
              {current.description && (
                <p className="mt-2 line-clamp-3 text-xs text-ink/70">{current.description}</p>
              )}
            </>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={spinAgain}
            disabled={spinning}
            className="flex-1 rounded-sm border border-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-gold hover:text-[#2C2523] disabled:opacity-40"
          >
            Spin again
          </button>
          <button
            type="button"
            onClick={() => onAdd(current)}
            disabled={spinning}
            className="flex-1 rounded-sm bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2C2523] transition-colors hover:bg-gold-deep hover:text-white disabled:opacity-40"
          >
            Add to order
          </button>
        </div>
      </motion.div>
    </div>
  );
}
