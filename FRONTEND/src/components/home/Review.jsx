import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import watercolorBg from "../../assets/images/menu/home/Little Notes From Our Guests.jpeg";
import memoryVideo from "../../assets/images/menu/home/what our people says.mp4";
import CoffeeMachine from "./CoffeeMachine";
import ScribbleUnderline from "../fun/ScribbleUnderline";

const REVIEWS = [
  { id: 1, quote: "Came for the pasta. Stayed because it felt like home.", author: "Riya", rating: "★★★★★", color: "#FDE2E4", rotate: -2.2 },
  { id: 2, quote: "That brownie deserves its own photograph.", author: "Aarav", rating: "★★★★★", color: "#E2E2F6", rotate: 1.8 },
  { id: 3, quote: "A beautiful evening, from the first bite to the last.", author: "Meera", rating: "★★★★★", color: "#E2F0CB", rotate: -1.5 },
  { id: 4, quote: "The food, atmosphere and little details made everything feel special.", author: "Kabir", rating: "★★★★★", color: "#D0F4DE", rotate: 2.1 },
  { id: 5, quote: "Some places serve dinner. This place creates memories.", author: "Anaya", rating: "★★★★★", color: "#FFE5EC", rotate: -1.9 },
  { id: 6, quote: "Already planning our next visit.", author: "Vihaan", rating: "★★★★★", color: "#FFF1E6", rotate: 1.4 },
];

const TornEdge = ({ position }) => {
  const top = position === "top";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-20 h-10 w-full sm:h-12 ${top ? "top-0" : "bottom-0 rotate-180"}`}
    >
      <path
        d="M0,0 L1200,0 L1200,40 Q1050,90 900,30 Q750,80 600,20 Q450,100 300,40 Q150,70 0,30 Z"
        className="fill-ink/15"
      />
      <path
        d="M0,0 L1200,0 L1200,25 Q1050,75 900,15 Q750,65 600,10 Q450,85 300,25 Q150,55 0,15 Z"
        className="fill-paper"
      />
    </svg>
  );
};

export default function GuestNotesScrapbook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[currentIndex];

  const noteVariants = {
    enter: (dir) => ({ x: dir > 0 ? 220 : -220, opacity: 0, scale: 0.85, rotate: dir > 0 ? 8 : -8 }),
    center: { x: 0, opacity: 1, scale: 1, rotate: currentReview.rotate, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
    exit: (dir) => ({ x: dir > 0 ? -220 : 220, opacity: 0, scale: 0.85, rotate: dir > 0 ? -8 : 8, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }),
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center py-12 px-4 md:px-10 overflow-hidden select-none bg-paper-2">

      <TornEdge position="top" />

      <img src={watercolorBg} alt="Paper Texture Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 dark:opacity-10 pointer-events-none" />

      <div className="absolute top-12 left-6 sm:left-12 w-52 sm:w-64 p-4 bg-[#e8e4d9] border border-stone-400/40 shadow-xs rotate-[-4deg] opacity-70 dark:opacity-40 z-0 font-serif text-[10px] sm:text-xs text-stone-800 leading-tight pointer-events-none hidden lg:block">
        <h4 className="font-bold text-sm border-b border-stone-600 pb-0.5 mb-1 tracking-wider uppercase">Clarifen.</h4>
        <p className="italic text-[9px] mb-1">By Clarice Dojoret</p>
        <p>Life is not measured by the number of breaths we take, but by the moments that take our breath away.</p>
      </div>

      <div className="absolute bottom-14 right-6 sm:right-12 w-56 sm:w-68 p-4 bg-[#e8e4d9] border border-stone-400/40 shadow-xs rotate-[3deg] opacity-70 dark:opacity-40 z-0 font-serif text-[10px] sm:text-xs text-stone-800 leading-tight pointer-events-none hidden lg:block">
        <p className="mb-1">Opportunities don't happen. You create them. Happiness is not something ready made.</p>
        <p className="font-bold italic">“The future belongs to those who believe in the beauty of their dreams.”</p>
      </div>

      <div className="relative z-10 pt-6 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ink font-bold tracking-tight drop-shadow-xs">
          <ScribbleUnderline>Little Notes From Our Guests</ScribbleUnderline>
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center justify-items-center">

        <div className="lg:col-span-4 flex justify-center w-full z-10">
          <div className="relative bg-white/95 p-4 pb-9 shadow-2xl rounded-2xs border border-stone-200 transform -rotate-3 hover:rotate-0 transition-all duration-500 w-[300px] sm:w-[340px]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 backdrop-blur-xs border-x border-stone-300/60 rotate-1 z-20 shadow-2xs" />

            <div className="w-full aspect-[4/5] bg-stone-900 overflow-hidden rounded-2xs border border-stone-200">
              <video src={memoryVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>

            <p className="text-center font-serif italic text-sm sm:text-base text-[#1B2A4A]/85 mt-4 tracking-wide font-semibold">
              A quiet moment at Whiskey & Wheat
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center w-full z-20 relative">
          <div className="relative w-full max-w-[400px] flex items-center justify-center">

            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="absolute -left-4 sm:-left-6 z-40 p-3 text-ink hover:scale-110 active:scale-95 transition-transform bg-paper/80 backdrop-blur-md rounded-full border border-ink/15 shadow-md"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="relative w-[320px] h-[320px] sm:w-[370px] sm:h-[370px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentReview.id}
                  custom={direction}
                  variants={noteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full h-full p-7 sm:p-9 rounded-xs shadow-2xl flex flex-col justify-between border border-black/10 aspect-square"
                  style={{ backgroundColor: currentReview.color }}
                >
                  <div className="absolute -top-4 left-10 w-20 h-5 bg-white/50 backdrop-blur-xs border-x border-white/40 -rotate-2 shadow-2xs" />

                  <div className="text-amber-500 text-sm sm:text-base tracking-widest font-semibold">
                    {currentReview.rating}
                  </div>

                  <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-[#1B2A4A] italic leading-relaxed my-auto text-center px-2">
                    “{currentReview.quote}”
                  </blockquote>

                  <div className="text-right border-t border-[#1B2A4A]/15 pt-3">
                    <span className="font-serif italic text-sm sm:text-base text-[#1B2A4A] tracking-wider font-bold">
                      — {currentReview.author}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="absolute -right-4 sm:-right-6 z-40 p-3 text-ink hover:scale-110 active:scale-95 transition-transform bg-paper/80 backdrop-blur-md rounded-full border border-ink/15 shadow-md"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center w-full z-20 relative">
          <div className="relative transform scale-110 sm:scale-125 my-4 sm:my-6 transition-transform duration-300">
            <CoffeeMachine />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            className="relative mt-2 sm:mt-4 bg-[#FAF8F5] p-4 sm:p-5 rounded-xs shadow-xl border border-stone-300/70 max-w-[280px] sm:max-w-[310px] text-center"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#d4b47f]/60 backdrop-blur-xs border-x border-white/40 rotate-1 shadow-2xs" />
            <p className="font-['Dancing_Script'] text-base sm:text-lg text-[#1B2A4A] leading-relaxed">
              "People who love to eat are always the best people."
            </p>
          </motion.div>
        </div>

      </div>

      <div className="relative z-10 flex items-center gap-2.5 mb-3">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 bg-ink"
                : "w-2.5 bg-ink/25 hover:bg-ink/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <TornEdge position="bottom" />

    </section>
  );
}
