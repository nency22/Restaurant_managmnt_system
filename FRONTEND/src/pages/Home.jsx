import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import videos from "../assets/videos/restaurant-hero.mp4";
import OurStory from "../components/home/OurStory";
import OurDelicacies from "../components/home/OurDelicacies";
import Review from "../components/home/Review";
import SpecialialitiesSection from "../components/home/SpecialtiesSection";
import CherishedMemories from "../components/home/CherishedMemories";
import VibesGrid from "../components/home/VibesGrid";
import Reveal from "../components/fun/Reveal";
import Marquee from "../components/fun/Marquee";
import Magnetic from "../components/fun/Magnetic";

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">

      <section
        className="
          relative
          flex
          min-h-[680px]
          h-[100svh]
          w-full
          overflow-hidden
        "
      >

        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <video
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src={videos}
              type="video/mp4"
            />
          </video>

          <div
            className="absolute inset-0 bg-black/35"
          />

          <div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-rfrom-black/65 via-black/20 to-transparent"
          />

          <div
            className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/75 via-black/25 to-transparent"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.06,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.7,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 flex h-full w-full items-center"
        >

          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 pt-20 sm:pt-16">

            <div className="max-w-[850px]">

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: "easeOut",
                }}
                className="
                  mb-4

                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-white/80

                  sm:mb-5
                  sm:text-xs
                  sm:tracking-[0.35em]
                "
              >
                A place for good food & good memories
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  max-w-[900px]

                  font-serif
                  font-medium
                  leading-[0.92]
                  tracking-[-0.045em]
                  text-white

                  text-[clamp(3.2rem,10vw,6.8rem)]

                  sm:text-[clamp(4rem,8vw,7rem)]

                  md:text-[clamp(4.5rem,7vw,7.5rem)]

                  lg:text-[clamp(5rem,7vw,8rem)]

                  xl:text-[110px]
                "
              >
                Experience
                <br />

                <span className="italic text-white/90">
                  the art of dining.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.85,
                  ease: "easeOut",
                }}
                className="
                  mt-6
                  max-w-[470px]

                  text-[13px]
                  leading-6
                  text-white/80

                  sm:mt-7
                  sm:text-sm
                  sm:leading-7

                  md:text-base
                "
              >
                Thoughtfully crafted dishes, warm
                conversations and an atmosphere made
                for staying a little longer.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 1.05,
                  ease: "easeOut",
                }}
                className="
                  mt-7
                  flex
                  flex-col
                  items-start
                  gap-3

                  sm:mt-8
                  sm:flex-row
                "
              >

                <Magnetic>
                <NavLink
                  to="/menu"
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    justify-center
                    gap-3

                    rounded-[4px]
                    bg-[#491313]

                    px-5
                    py-3

                    text-xs
                    font-medium
                    text-white

                    transition-all
                    duration-300

                    hover:bg-[#ab3434]
                    hover:shadow-xl
                    hover:shadow-black/30

                    sm:px-6
                    sm:py-3.5
                    sm:text-sm
                  "
                >
                  <span>
                    Explore Menu
                  </span>

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#491313]
                    "
                  >
                    <FiArrowUpRight
                      className="
                        text-sm
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>
                </NavLink>
                </Magnetic>

                <NavLink
                  to="/about"
                  className="
                    inline-flex
                    w-fit
                    items-center
                    justify-center

                    rounded-[4px]
                    border
                    border-white/40
                    bg-white/5

                    px-5
                    py-3

                    text-xs
                    font-medium
                    text-white

                    backdrop-blur-sm

                    transition-all
                    duration-300

                    hover:border-white
                    hover:bg-white
                    hover:text-black

                    sm:px-6
                    sm:py-3.5
                    sm:text-sm
                  "
                >
                  Our Story
                </NavLink>

              </motion.div>

            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.8,
            duration: 1,
          }}
          className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2
            flex-col
            items-center
            gap-1.5
            text-white/70

            sm:bottom-7
            sm:gap-2
          "
        >
          <span
            className="text-[8px] uppercase tracking-[0.3em] sm:text-[9px]"
          >
            Scroll
          </span>

          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiArrowDown className="text-sm" />
          </motion.div>
        </motion.div>

      </section>

      <Marquee />

      <Reveal>
        <OurStory />
      </Reveal>

      <OurDelicacies />

      <Reveal>
        <Review />
      </Reveal>

      <SpecialialitiesSection />

      <CherishedMemories />

      <Marquee items={["Book a table", "Slow evenings", "Warm bread", "Golden hour", "Bring your people"]} />

      <Reveal>
        <VibesGrid />
      </Reveal>

    </main>
  );
};

export default Home;
