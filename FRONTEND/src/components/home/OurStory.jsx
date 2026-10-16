import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import paperDesktop from "../../assets/images/menu/home/ourstory-bg1.jpg";
import paperMobile from "../../assets/images/menu/home/ourstory-bg2.jpg";
import followYourHeart from "../../assets/images/menu/home/follow-heart.png";

import story1 from "../../assets/images/menu/home/story-1.jpg";
import story2 from "../../assets/images/menu/home/story-2.jpg";
import story3 from "../../assets/images/menu/home/story-3.jpg";
import story4 from "../../assets/images/menu/home/story-4.jpg";
import story5 from "../../assets/images/menu/home/story-5.jpg";
import story6 from "../../assets/images/menu/home/story-6.jpg";

const photos1 = [story1, story2, story3];
const photos2 = [story4, story5, story6];

export default function OurStory() {
  const [index, setIndex] = useState(0);
  const [mobileFrame, setMobileFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousFrame = () => {
    setMobileFrame((i) => (i === 0 ? 1 : 0));
  };

  const nextFrame = () => {
    setMobileFrame((i) => (i === 1 ? 0 : 1));
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-paper-2">
<motion.div
  className="
    absolute
    left-[150px]
    top-[330px]
    z-10
    hidden
    w-[220px]
    origin-top
    sm:block
  "
  animate={{
    rotate: [-2, 2, -2],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <img
    src={followYourHeart}
    alt="Follow Your Heart"
    className="h-auto w-full"
  />
</motion.div>

      <picture className="absolute inset-0 z-0 h-full w-full">
        <source media="(max-width: 767px)" srcSet={paperMobile} />

        <img
          src={paperDesktop}
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
        />
      </picture>

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36">

        <div className="hidden w-full items-center justify-center gap-8 pt-16 sm:flex lg:gap-10 lg:pt-20">

          <PhotoFrame
            image={photos1[index]}
            number="01"
            className="-rotate-2 sm:translate-y-1 lg:-translate-y-1"
          />

          <PhotoFrame
            image={photos2[index]}
            number="02"
            className="rotate-2 sm:translate-y-4 lg:translate-y-4"
          />

        </div>

        <div className="hidden sm:block mt-6 w-full max-w-2xl text-center">

          <span className="font-serif text-[8px] tracking-[0.25em] text-ink-soft/65 lg:text-[9px]">
            A TABLE FULL OF MEMORIES
          </span>

          <h3 className="mt-2 font-serif text-xl font-bold uppercase leading-tight text-brand lg:text-2xl">
            Good Food. Good People.
            <br />
            Beautiful Moments.
          </h3>

          <div className="mx-auto mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#491313]/25 lg:w-10" />

            <span className="text-[9px] text-brand/55">
              ✦
            </span>

            <span className="h-px w-8 bg-[#491313]/25 lg:w-10" />
          </div>

          <p className="mx-auto mt-2 max-w-xl font-serif text-[9px] italic leading-4 text-ink-soft/80 lg:text-[10px] lg:leading-5">
            At Whiskey & Wheat, we believe that a great meal is more than just food.
            It is about the people around the table, the stories we share,
            and the memories we create together.
          </p>

        </div>

        <div className="relative flex w-full items-center justify-center sm:hidden">

          <button
            type="button"
            onClick={previousFrame}
            aria-label="Previous photo frame"
            className="
              absolute left-0 z-50
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-[#8c6b52]/40
              bg-paper-2/95
              text-2xl text-ink-soft
              shadow-md
              transition-all
              active:scale-90
              hover:bg-paper
            "
          >
            ‹
          </button>

          <AnimatePresence mode="wait">

            {mobileFrame === 0 ? (

              <motion.div
                key="frame-01"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <PhotoFrame
                  image={photos1[index]}
                  number="01"
                  className="rotate-0"
                />
              </motion.div>

            ) : (

              <motion.div
                key="frame-02"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <PhotoFrame
                  image={photos2[index]}
                  number="02"
                  className="rotate-0"
                />
              </motion.div>

            )}

          </AnimatePresence>

          <button
            type="button"
            onClick={nextFrame}
            aria-label="Next photo frame"
            className="
              absolute right-0 z-50
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-[#8c6b52]/40
              bg-paper-2/95
              text-2xl text-ink-soft
              shadow-md
              transition-all
              active:scale-90
              hover:bg-paper
            "
          >
            ›
          </button>

        </div>

      </div>
    </section>
  );
}

function PhotoFrame({ image, number, className = "" }) {
  return (
    <div
      className={`
        group relative z-40 shrink-0
        rounded-[10px]
        bg-paper-3
        shadow-[0_10px_25px_rgba(55,35,20,0.22)]

        w-[300px]
        p-[12px]
        pb-[65px]

        sm:w-[280px]
        sm:p-3
        sm:pb-[65px]

        lg:w-[270px]
        lg:p-4
        lg:pb-[65px]

        ${className}
      `}
    >

      <div className="
        relative aspect-[4/5]
        w-full overflow-hidden
        rounded-[3px]
        bg-paper-2
      ">

        <AnimatePresence mode="wait">

          <motion.img
            key={image}
            src={image}
            alt="Whiskey & Wheat restaurant"
            initial={{
              opacity: 0,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              absolute inset-0
              h-full w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

        </AnimatePresence>

        <div className="
          pointer-events-none
          absolute inset-0
          bg-[#491313]/0
          transition-colors
          duration-500
          group-hover:bg-[#491313]/5
        " />

      </div>

      <span className="
        absolute
        bottom-[18px]
        left-[15px]
        font-serif
        text-[9px]
        italic
        text-brand/70

        sm:bottom-[20px]
        sm:left-5

        lg:bottom-[22px]
        lg:left-5
        lg:text-[10px]
      ">
        Whiskey & Wheat Journal
      </span>

      <span className="
        absolute
        bottom-[18px]
        right-[18px]
        text-[23px]
        leading-none
        text-[#b08b6f]

        sm:bottom-[20px]
        sm:right-[20px]

        lg:bottom-[22px]
        lg:right-[22px]
        lg:text-[26px]
      ">
        ♥
      </span>

      <span className="
        absolute
        bottom-[6px]
        right-[15px]
        font-serif
        text-[7px]
        text-brand/40

        sm:right-5
        sm:text-[8px]

        lg:right-5
        lg:text-[8px]
      ">
        {number}
      </span>

    </div>
  );
}
