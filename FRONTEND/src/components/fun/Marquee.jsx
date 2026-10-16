const DEFAULT_ITEMS = ["Craft whiskey", "Fresh wheat", "Live music", "Slow-cooked comfort", "Good food", "Great vibes", "Wild memories"];

export default function Marquee({ items = DEFAULT_ITEMS }) {
  return (
    <div
      aria-hidden="true"
      className="marquee w-full overflow-hidden border-y border-gold/30 bg-paper-2 py-3 text-ink"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((text, index) => (
              <span
                key={`${copy}-${index}`}
                className="flex items-center gap-6 px-6 font-['Great_Vibes'] text-2xl text-ink/80 sm:text-3xl"
              >
                {text}
                <span className="text-sm text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
