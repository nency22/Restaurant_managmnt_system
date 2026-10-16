import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import ourstoryBg1 from "../assets/images/menu/home/ourstory-bg1.jpg";
import ourstoryBg2 from "../assets/images/menu/home/ourstory-bg2.jpg";
import storyMain from "../assets/images/menu/home/story-main.jpg";
import storySmall from "../assets/images/menu/home/story-small.jpg";

const values = [
  {
    title: "Slow Food",
    body: "Every plate is cooked to order, never rushed — because good food asks for a little patience.",
  },
  {
    title: "Local & Seasonal",
    body: "We build the menu around what's fresh nearby, changing with the seasons rather than fighting them.",
  },
  {
    title: "Warm Tables",
    body: "A restaurant is only as good as the room it creates. Ours is built for lingering, not turning tables.",
  },
];

const About = () => {
  return (
    <main className="w-full overflow-x-hidden bg-paper text-ink">
      <section className="relative w-full px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-20 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A059] sm:text-xs">
            Our Story
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.6rem,8vw,5rem)] font-medium leading-[0.95] tracking-tight">
            Built on good food
            <br />
            <span className="italic text-[#C5A059]">& better company.</span>
          </h1>
        </div>
      </section>

      <section className="w-full px-5 pb-16 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-3xl border-y border-[#C5A059]/25 py-10 text-center sm:py-12">
          <p className="font-serif text-xl italic leading-snug text-ink sm:text-2xl md:text-3xl">
            &ldquo;A great meal is more than what's on the plate — it's the
            table it's served at, and the people who stay long after
            dessert.&rdquo;
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]/80">
            Whiskey & Wheat, Founders
          </p>
        </div>
      </section>

      <section className="w-full px-5 pb-20 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 mx-auto w-full max-w-md lg:order-1">
            <img
              src={storyMain}
              alt="Whiskey & Wheat dining room"
              className="w-full rounded-sm object-cover shadow-2xl"
            />
            <img
              src={storySmall}
              alt="A dish at Whiskey & Wheat"
              className="absolute -bottom-8 -right-6 hidden w-2/5 rounded-sm border-4 border-paper object-cover shadow-2xl sm:block"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C5A059]">
              How it started
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
              From a shared table to a full house.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/75 sm:text-base">
              Whiskey & Wheat began as a handful of friends cooking for each
              other on weeknights — no menu, no reservations, just whoever
              could pull up a chair. What stuck wasn't any single dish; it
              was the feeling of the table. We built the restaurant to hold
              on to that feeling and share it with more people, one long
              dinner at a time.
            </p>
            <NavLink
              to="/contact"
              className="mt-7 inline-flex items-center gap-3 border border-[#C5A059]/60 px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#C5A059] transition-all duration-300 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#2C2523]"
            >
              <span>Come say hello</span>
              <FiArrowUpRight />
            </NavLink>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-[#C5A059]/15 px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center font-serif text-2xl font-medium sm:text-3xl">
            What we stand for
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {values.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="border border-[#C5A059]/20 p-6 text-center sm:p-8"
              >
                <h3 className="font-serif text-lg text-[#C5A059] sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 pb-20 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 sm:gap-4">
          <img
            src={ourstoryBg1}
            alt="Whiskey & Wheat interior"
            className="h-40 w-full rounded-sm object-cover sm:h-56 md:h-64"
          />
          <img
            src={ourstoryBg2}
            alt="Whiskey & Wheat atmosphere"
            className="h-40 w-full rounded-sm object-cover sm:h-56 md:h-64"
          />
        </div>
      </section>
    </main>
  );
};

export default About;
