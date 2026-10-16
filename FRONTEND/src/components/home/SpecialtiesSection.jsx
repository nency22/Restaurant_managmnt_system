import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPECIALTIES = [
  {
    id: 1,
    title: "WOOD-FIRED PIZZAS & PASTAS",
    tagline: "Authentic Neapolitan & Artisan Durum",
    description:
      "Authentic Neapolitan Pizzas crafted with passion alongside in-house baked sourdough bread, paired with premium quality Durum wheat pastas cooked perfectly to order.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    rotate: -2,
    badge: "Chef's Special 🍕",
  },
  {
    id: 2,
    title: "FRESH PRODUCE & GRILL",
    tagline: "Farm-Fresh Ingredients & Flame BBQ",
    description:
      "We source only the finest fresh local produce daily. Enjoy our limited-quantity BBQ grills and signature Tandoor specialties prepared hot over flame.",
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
    rotate: 1.5,
    badge: "Fresh Daily 🌿",
  },
  {
    id: 3,
    title: "ALL-DAY BREAKFAST & SIPS",
    tagline: "Comfort Food & Handcrafted Beverages",
    description:
      "A massive emphasis on Whole Day Breakfast to start your day right at any hour, complemented by fresh juice cocktails and handcrafted mocktails.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
    rotate: -1.8,
    badge: "Signature Sips ☕",
  },
];

export default function CulinaryHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = SPECIALTIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPECIALTIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPECIALTIES.length) % SPECIALTIES.length);
  };

  return (
    <section className="relative w-full bg-[#1B2A4A] text-[#F4F1EA] py-20 px-4 sm:px-8 md:px-12 overflow-hidden -mt-6">
      <div
        className="absolute top-0 inset-x-0 h-10 z-20 pointer-events-none bg-repeat-x bg-contain opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L1200,0 L1200,30 Q1050,80 900,20 Q750,70 600,10 Q450,90 300,30 Q150,60 0,20 Z' fill='%3C%23f4f1ea%3E'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center mb-10 md:mb-14 pt-4 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wider text-[#FAF8F5] uppercase">
          OUR CULINARY HIGHLIGHTS
        </h2>
        <span className="block font-[DancingScript] text-[#D97736] text-2xl sm:text-3xl md:text-4xl -mt-1 italic">
          Crafted with love & patience
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <div className="relative w-full max-w-sm md:hidden mb-8 flex items-center justify-between">
          <button
            onClick={handlePrev}
            aria-label="Previous Specialty"
            className="z-30 p-3 rounded-full bg-paper text-ink shadow-xl border border-ink/15 active:scale-90 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-full mx-3 relative flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: activeItem.rotate }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full relative"
              >
                <div className="p-4 pb-8 rounded-xs bg-paper text-ink shadow-2xl border border-ink/15 ring-2 ring-[#D97736]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 backdrop-blur-xs border-x border-ink/15/60 rotate-1 z-20 shadow-2xs" />

                  <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-stone-900 mb-4 group">
                    <motion.img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="absolute top-2 right-2 bg-[#1B2A4A]/80 backdrop-blur-xs text-[#FAF8F5] text-xs font-serif px-2.5 py-1 rounded-xs border border-white/20">
                      {activeItem.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-center text-sm sm:text-base tracking-wide text-ink uppercase">
                    {activeItem.title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Specialty"
            className="z-30 p-3 rounded-full bg-paper text-ink shadow-xl border border-ink/15 active:scale-90 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8 w-full mb-12">
          {SPECIALTIES.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive ? "z-30" : "opacity-75 hover:opacity-100 z-10"
                }`}
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <div
                  className={`p-4 pb-8 rounded-xs bg-paper text-ink shadow-2xl border transition-all duration-300 ${
                    isActive ? "ring-2 ring-[#D97736] scale-105" : "border-ink/15"
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 backdrop-blur-xs border-x border-ink/15/60 rotate-1 z-20 shadow-2xs" />

                  <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-stone-900 mb-4 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 right-2 bg-[#1B2A4A]/80 backdrop-blur-xs text-[#FAF8F5] text-xs font-serif px-2.5 py-1 rounded-xs border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-center text-sm sm:text-base tracking-wide text-ink uppercase">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative bg-paper text-ink p-6 sm:p-8 rounded-xs shadow-2xl border border-ink/15 text-center"
            >
              <div className="absolute -top-3 left-10 w-20 h-5 bg-[#D97736]/40 backdrop-blur-xs border-x border-white/40 -rotate-2 shadow-2xs" />

              <span className="font-[DancingScript] text-[#D97736] text-xl sm:text-2xl font-bold block mb-1">
                {activeItem.tagline}
              </span>

              <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-wide mb-3 uppercase">
                {activeItem.title}
              </h4>

              <p className="font-sans text-ink-soft text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                {activeItem.description}
              </p>

              <div className="mt-6 pt-3 border-t border-ink/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-serif italic text-ink/60">
                <span className="hidden sm:inline">✦ Click photo cards to explore ✦</span>

                <div className="flex gap-1.5 mx-auto sm:mx-0">
                  {SPECIALTIES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to item ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "w-6 bg-[#D97736]"
                          : "w-2 bg-ink/25 hover:bg-ink/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
