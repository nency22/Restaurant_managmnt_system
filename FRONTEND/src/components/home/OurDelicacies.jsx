import { useState } from "react";
import { motion } from "framer-motion";

import dish01 from "../../assets/images/menu/home/delicacy-01.jpg";
import dish02 from "../../assets/images/menu/home/delicacy-02.jpg";
import dish03 from "../../assets/images/menu/home/delicacy-03.jpg";
import dish04 from "../../assets/images/menu/home/delicacy-04.jpg";
import dish05 from "../../assets/images/menu/home/delicacy-05.jpg";
import dish06 from "../../assets/images/menu/home/delicacy-06.jpg";
import dish07 from "../../assets/images/menu/home/delicacy-07.jpg";
import dish08 from "../../assets/images/menu/home/delicacy-08.jpg";
import dish09 from "../../assets/images/menu/home/delicacy-09.jpg";
import dish10 from "../../assets/images/menu/home/delicacy-10.jpg";
import dish11 from "../../assets/images/menu/home/delicacy-11.jpg";
import dish12 from "../../assets/images/menu/home/delicacy-12.jpg";

const dishes = [
  { image: dish01, name: "Margherita Pizza" },
  { image: dish02, name: "Veg Supreme Pizza" },
  { image: dish03, name: "Creamy Alfredo Pasta" },
  { image: dish04, name: "Truffle Mushroom Pasta" },
  { image: dish05, name: "Kadai Paneer" },
  { image: dish06, name: "Cheese Garlic Bread" },
  { image: dish07, name: "Crispy Veg Spring Rolls" },
  { image: dish08, name: "Loaded Nachos" },
  { image: dish09, name: "Veggie Burger" },
  { image: dish10, name: "White Sauce Pasta" },
  { image: dish11, name: "Chocolate Brownie" },
  { image: dish12, name: "Paneer Tikka" },
];

const CARD_WIDTH = 341.333;
const GAP = 32;
const STEP = CARD_WIDTH + GAP;
const ANIMATION_DURATION = 1;

export default function OurDelicacies() {
  const total = dishes.length;

  const desktopDishes = [
    dishes[total - 2],
    dishes[total - 1],
    ...dishes,
    dishes[0],
    dishes[1],
  ];

  const [current, setCurrent] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRealIndex = (position) => {
    return (position - 2 + total) % total;
  };

  const nextDish = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrent((prev) => prev + 1);
  };

  const previousDish = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrent((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {

    if (current === total + 2) {
      setCurrent(2);
      setIsAnimating(false);
      return;
    }

    if (current === 1) {
      setCurrent(total + 1);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  };

  const realIndex = getRealIndex(current);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#151210]">

      <div className="pt-16 text-center sm:pt-20 lg:pt-24">

        <p className="font-serif text-[8px] uppercase tracking-[0.4em] text-[#b89552] sm:text-[9px]">
          From Our Kitchen
        </p>

        <h2 className="mt-2 font-serif text-5xl italic text-[#f8f0df] sm:text-6xl lg:text-7xl">
          Our Delicacies
        </h2>

        <div className="mx-auto mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-[#b89552]/60" />
          <span className="text-[#b89552]">✦</span>
          <span className="h-px w-14 bg-[#b89552]/60" />
        </div>

      </div>

      <div className="relative mx-auto mt-20 hidden w-full max-w-[1280px] lg:block">

        <button type="button" onClick={previousDish} disabled={isAnimating} aria-label="Previous dishes" className="absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#b89552]/70 bg-[#151210] text-xl text-[#b89552] shadow-lg transition-all duration-300 hover:bg-[#b89552] hover:text-[#151210] active:scale-90 disabled:pointer-events-none disabled:opacity-70">
          ‹
        </button>

        <button type="button" onClick={nextDish} disabled={isAnimating} aria-label="Next dishes" className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#b89552]/70 bg-[#151210] text-xl text-[#b89552] shadow-lg transition-all duration-300 hover:bg-[#b89552] hover:text-[#151210] active:scale-90 disabled:pointer-events-none disabled:opacity-70">
          ›
        </button>

        <div className="mx-auto w-full max-w-[1120px] overflow-hidden">

          <motion.div animate={{ x: -(current * STEP) }} transition={{ duration: ANIMATION_DURATION, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={handleAnimationComplete} className="flex gap-8">

            {desktopDishes.map((dish, index) => (

              <div key={`${dish.name}-${index}`} className="w-[341.333px] shrink-0 text-center">

                <div className="aspect-[4/5] w-full overflow-hidden border border-[#b89552]/20 bg-[#211c18]">

                  <img src={dish.image} alt={dish.name} draggable="false" className="h-full w-full select-none object-cover transition-transform duration-700 hover:scale-105" />

                </div>

                <h3 className="mt-4 font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#c9a85c]">
                  {dish.name}
                </h3>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

      <div className="relative mx-auto mt-14 flex w-full items-center justify-center px-12 lg:hidden">

        <button type="button" onClick={previousDish} disabled={isAnimating} aria-label="Previous dish" className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#b89552]/70 bg-[#151210] text-2xl text-[#b89552] shadow-lg active:scale-90 disabled:pointer-events-none disabled:opacity-70">
          ‹
        </button>

        <motion.div key={realIndex} initial={{ x: 0 }} animate={{ x: 0 }} transition={{ duration: 1 }} className="w-full max-w-[330px] text-center">

          <div className="aspect-[4/5] w-full overflow-hidden border border-[#b89552]/20 bg-[#211c18]">

            <img src={dishes[realIndex].image} alt={dishes[realIndex].name} draggable="false" className="h-full w-full select-none object-cover" />

          </div>

          <h3 className="mt-4 font-serif text-[11px] uppercase tracking-[0.18em] text-[#c9a85c]">
            {dishes[realIndex].name}
          </h3>

        </motion.div>

        <button type="button" onClick={nextDish} disabled={isAnimating} aria-label="Next dish" className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#b89552]/70 bg-[#151210] text-2xl text-[#b89552] shadow-lg active:scale-90 disabled:pointer-events-none disabled:opacity-70">
          ›
        </button>

      </div>

      <div className="mx-auto mt-14 flex max-w-[1180px] items-center justify-between px-6 font-mono text-[7px] tracking-[0.25em] text-[#f8f0df]/40 sm:mt-16">

        <span>BATCH 00</span>

        <span>KODAK 135</span>

      </div>

      <div className="mt-6 flex justify-center gap-2 pb-10">

        {dishes.map((_, i) => (

          <button key={i} type="button" disabled={isAnimating} onClick={() => { if (i === realIndex) return; setIsAnimating(true); setCurrent(i + 2); }} aria-label={`Go to dish ${i + 1}`} className={`${i === realIndex ? "w-7 bg-[#c9a85c]" : "w-1.5 bg-[#c9a85c]/30"} h-1.5 rounded-full transition-all duration-300 disabled:pointer-events-none`} />

        ))}

      </div>

    </section>
  );
}
