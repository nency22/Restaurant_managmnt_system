import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TiltCard from "../components/fun/TiltCard";
import ScribbleUnderline from "../components/fun/ScribbleUnderline";

import photo1 from "../assets/images/menu/home/photo1.jpg";
import photo2 from "../assets/images/menu/home/photo2.jpg";
import photo3 from "../assets/images/menu/home/photo3.jpg";
import photo4 from "../assets/images/menu/home/photo4.jpg";
import photo5 from "../assets/images/menu/home/photo5.jpg";
import photo6 from "../assets/images/menu/home/photo6.jpg";
import photo7 from "../assets/images/menu/home/photo7.jpg";
import photo8 from "../assets/images/menu/home/photo8.jpg";
import photo9 from "../assets/images/menu/home/photo9.jpg";
import story1 from "../assets/images/menu/home/story-1.jpg";
import story2 from "../assets/images/menu/home/story-2.jpg";
import story3 from "../assets/images/menu/home/story-3.jpg";
import dish01 from "../assets/images/menu/home/delicacy-01.jpg";
import dish05 from "../assets/images/menu/home/delicacy-05.jpg";
import dish11 from "../assets/images/menu/home/delicacy-11.jpg";

const images = [
  { src: photo1, alt: "Table set for dinner" },
  { src: dish01, alt: "Margherita pizza fresh from the oven" },
  { src: story1, alt: "Guests sharing a meal" },
  { src: photo2, alt: "Evening at Whiskey & Wheat" },
  { src: dish05, alt: "Kadai paneer" },
  { src: photo3, alt: "Golden hour on the patio" },
  { src: story2, alt: "Behind the bar" },
  { src: photo4, alt: "Plated dessert" },
  { src: dish11, alt: "Chocolate brownie" },
  { src: photo5, alt: "Candlelit corner table" },
  { src: story3, alt: "Fresh ingredients" },
  { src: photo6, alt: "Cocktail hour" },
  { src: photo7, alt: "Regulars at the bar" },
  { src: photo8, alt: "Weekend brunch" },
  { src: photo9, alt: "Closing time" },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;
  const showPrev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <main className="w-full overflow-x-hidden bg-paper text-ink">
      <section className="w-full px-5 pt-32 pb-12 text-center sm:px-8 sm:pt-40 sm:pb-16 md:px-12 lg:px-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A059] sm:text-xs">
          Gallery
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-[clamp(2.4rem,7vw,4.2rem)] font-medium leading-[0.95] tracking-tight">
          <ScribbleUnderline>Moments from the table</ScribbleUnderline>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm italic text-ink/70 sm:text-base">
          &ldquo;Every dish tells a story; every table adds a chapter.&rdquo;
        </p>
      </section>

      <section className="w-full px-4 pb-20 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <TiltCard key={image.src} className={index % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="polaroid-hover group relative aspect-square w-full overflow-hidden rounded-sm border-4 border-paper shadow-md"
              aria-label={`Open image: ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable="false"
                className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-left text-[10px] uppercase tracking-wider text-white">
                  {image.alt}
                </span>
              </div>
            </button>
            </TiltCard>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-2xl text-white hover:text-[#C5A059] sm:right-8 sm:top-8"
            >
              <FiX />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 z-10 rounded-full p-2 text-2xl text-white hover:text-[#C5A059] sm:left-6"
            >
              <FiChevronLeft />
            </button>

            <motion.img
              key={images[activeIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-auto max-w-[90vw] rounded-sm object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 z-10 rounded-full p-2 text-2xl text-white hover:text-[#C5A059] sm:right-6"
            >
              <FiChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;
