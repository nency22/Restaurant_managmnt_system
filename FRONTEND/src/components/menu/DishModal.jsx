import { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiHeart, FiX } from "react-icons/fi";
import Stamp from "../fun/Stamp";
import { formatPrice } from "../../utils/format";

export default function DishModal({ item, isFavorite, onToggleFavorite, onAdd, onClose }) {
  const [imageFailed, setImageFailed] = useState(false);
  const veg = Boolean(item.is_veg ?? item.vegetarian ?? item.is_vegetarian);
  const unavailable = item.is_available === false;
  const prep = Number(item.preparation_time) || 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 sm:items-center sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-xl bg-paper-2 text-ink shadow-2xl sm:rounded-sm"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-lg text-white hover:bg-black/70"
        >
          <FiX />
        </button>

        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.name}
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-56 w-full object-cover sm:h-64"
          />
        ) : (
          <div className="flex h-32 w-full items-center justify-center bg-paper-3 font-['Great_Vibes'] text-4xl text-gold-deep">
            Whiskey & Wheat
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border p-[1.5px] ${
                  veg ? "border-green-700" : "border-red-700"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-green-700" : "bg-red-700"}`} />
              </span>
              <h2 className="font-serif text-2xl font-bold leading-tight">{item.name}</h2>
            </div>
            <span className="font-serif text-xl font-bold text-gold-deep">{formatPrice(item.price)}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink/70">
            {prep > 0 && (
              <span className="inline-flex items-center gap-1">
                <FiClock /> {prep} min
              </span>
            )}
            {prep > 0 && prep <= 15 && <Stamp tone="sage" className="text-[9px]">Quick</Stamp>}
            {unavailable && <Stamp tone="ember" className="text-[9px]">Sold out</Stamp>}
          </div>

          {item.description && <p className="mt-4 text-sm leading-relaxed text-ink/80">{item.description}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "Remove from favourites" : "Save to favourites"}
              className="rounded-sm border border-gold/50 px-4 text-lg text-ink transition-colors hover:border-gold"
            >
              <FiHeart key={isFavorite ? "on" : "off"} className={isFavorite ? "badge-pop fill-current text-ember" : ""} />
            </button>
            <button
              type="button"
              onClick={onAdd}
              disabled={unavailable}
              className="flex-1 rounded-sm bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#2C2523] transition-colors hover:bg-gold-deep hover:text-white disabled:opacity-40"
            >
              {unavailable ? "Unavailable right now" : "Add to order"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
