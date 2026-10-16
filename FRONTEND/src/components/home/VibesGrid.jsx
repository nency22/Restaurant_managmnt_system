import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, Star, Sparkles } from "lucide-react";

import photo1 from "../../assets/images/menu/home/photo1.jpg";
import photo3 from "../../assets/images/menu/home/photo3.jpg";
import photo4 from "../../assets/images/menu/home/photo4.jpg";

import sandwichSticker from "../../assets/images/menu/home/sandwich-doodle.png";
import dessertSticker from "../../assets/images/menu/home/dessert-doodle.png";

export default function IllustratedBentoGrid() {
  const [liked, setLiked] = useState(false);

  return (
    <section className="w-full bg-paper-2 py-20 px-4 sm:px-8 md:px-16 text-ink-soft relative overflow-hidden font-sans">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-paper-3/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-paper-3/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-dashed border-[#C5B39C] dark:border-[#7A6448] pb-8">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-3 text-ink-soft text-xs font-semibold tracking-wider uppercase border border-[#C5B39C] dark:border-[#7A6448]">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Good Food • Good Vibes</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ink tracking-tight">
              Flavors Made With Love ✦
            </h2>
          </div>
          <p className="text-ink-soft text-sm max-w-xs font-medium leading-relaxed italic">
            "Food deals with every emotion." Cozy recipes crafted for every mood & moment!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 md:row-span-2 bg-paper-3 border-2 border-[#CBB89F] dark:border-[#7E6544] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm group"
          >
            <img
              src={sandwichSticker}
              alt="Sandwich Sticker"
              className="absolute -right-2 -bottom-2 w-48 h-48 object-contain pointer-events-none rotate-3 opacity-90 group-hover:scale-105 transition-transform duration-500 z-0"
            />

            <div className="flex justify-between items-start z-10">
              <span className="bg-paper-3 text-ink-soft font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-[#C5B39C] dark:border-[#7A6448]">
                Chef's Secret
              </span>
              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className="p-3 rounded-full bg-paper-3 text-ink-soft hover:text-red-600 transition-colors cursor-pointer border border-[#C5B39C] dark:border-[#7A6448]"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-red-600 text-red-600" : ""}`} />
              </button>
            </div>

            <div className="space-y-3 z-10 max-w-md">
              <div className="inline-block px-3 py-1 bg-[#A8C3A0] dark:bg-[#31452B] text-ink-soft text-xs font-bold rounded-lg border border-[#8DA985] dark:border-[#587250] rotate-[-2deg]">
                ✦ Freshly Baked & Layered
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-black text-ink leading-tight">
                "Count the memories, not the calories!"
              </h3>
              <p className="text-ink-soft text-xs sm:text-sm font-medium">
                Artisanal sandwiches layered with house dips, crisp organic greens, and melted gourmet cheese.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-paper-3 border-2 border-[#C5B39C] dark:border-[#7A6448] rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden shadow-sm group"
          >
            <img
              src={photo1}
              alt="Breakfast Date"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
            />

            <div className="relative z-10 text-ink">
              <h4 className="font-serif text-xl font-bold">Kopi & Toast</h4>
              <p className="text-xs text-ink-soft font-semibold mt-0.5">
                So cozy! Sweet + savory treats to start your day.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#A8C3A0] dark:bg-[#31452B] border-2 border-[#8DA985] dark:border-[#587250] rounded-[2rem] p-6 flex flex-col justify-between text-ink shadow-sm relative"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-[#8DA985] dark:bg-[#33422E] text-ink">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8DA985] dark:bg-[#33422E]">
                Open Daily
              </span>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold">Good Morning Sunshine!</h4>
              <p className="text-xs text-ink-soft mt-1 font-sans font-medium">
                Serving warmth from 8:00 AM – 10:00 PM
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#E2B7B4] dark:bg-[#4F2522] border-2 border-[#C99C99] dark:border-[#7F4743] rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden group shadow-sm"
          >
            <img
              src={photo3}
              alt="Craft Drinks"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
            />

            <div className="relative z-10 text-ink">
              <h4 className="font-serif text-xl font-bold">Fresh Coolers</h4>
              <p className="text-xs text-ink-soft font-medium mt-0.5">
                Handcrafted fruit infusions & herbal mocktails.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-paper-3/40 border-2 border-dashed border-[#C5B39C] dark:border-[#7A6448] rounded-[2rem] p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm group"
          >
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              src={dessertSticker}
              alt="Dessert Doodle"
              className="w-full h-40 object-contain drop-shadow-md pointer-events-none"
            />
            <span className="mt-1 px-3 py-1 bg-paper-3 text-ink-soft font-mono text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#C5B39C] dark:border-[#7A6448] rotate-[-2deg]">
              ✦ Sweet Bite ✦
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-paper-3 border-2 border-[#C0AB8F] dark:border-[#7C6546] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between text-ink-soft shadow-sm relative"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-soft">
                #FoodForEveryEmotion
              </span>
              <div className="flex items-center gap-1 text-amber-800 dark:text-amber-400">
                <Star className="w-4 h-4 fill-amber-700 dark:fill-amber-400" />
                <span className="text-xs font-bold">4.9 / 5 Favorites</span>
              </div>
            </div>

            <blockquote className="font-serif italic text-lg sm:text-xl text-ink font-semibold leading-relaxed my-2">
              "Craving comfort or celebrating a moment? We have a plate crafted specifically for your mood!"
            </blockquote>

            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
              — Made Fresh Daily With Love
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#CEBCD9] dark:bg-[#3C2948] border-2 border-[#B29EC0] dark:border-[#654C75] rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden group shadow-sm"
          >
            <img
              src={photo4}
              alt="Pastries"
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
            />

            <div className="relative z-10 text-ink">
              <h4 className="font-serif text-xl font-bold">Roti Bakar & Pastries</h4>
              <p className="text-xs text-ink-soft font-medium mt-0.5">
                Decadent baked treats & chocolate bites.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
