import React from "react";
import { motion } from "framer-motion";

import photo1 from "../../assets/images/menu/home/photo1.jpg";
import photo2 from "../../assets/images/menu/home/photo2.jpg";
import photo3 from "../../assets/images/menu/home/photo3.jpg";
import photo4 from "../../assets/images/menu/home/photo4.jpg";
import photo5 from "../../assets/images/menu/home/photo5.jpg";
import photo6 from "../../assets/images/menu/home/photo6.jpg";
import photo7 from "../../assets/images/menu/home/photo7.jpg";
import photo8 from "../../assets/images/menu/home/photo8.jpg";
import photo9 from "../../assets/images/menu/home/photo9.jpg";
import photo10 from "../../assets/images/menu/home/photo10.jpg";
import photo11 from "../../assets/images/menu/home/photo11.jpg";
import photo12 from "../../assets/images/menu/home/photo12.jpg";

const GALLERY_PHOTOS = [
  { id: 1, src: photo1, alt: "Couple sharing a meal", offset: { x: "-60%", y: "-60%" } },
  { id: 2, src: photo2, alt: "Ambience and guest", offset: { x: "-20%", y: "-60%" } },
  { id: 3, src: photo3, alt: "Group dinner dining", offset: { x: "20%", y: "-60%" } },
  { id: 4, src: photo4, alt: "Happy guest portrait", offset: { x: "60%", y: "-60%" } },

  { id: 5, src: photo5, alt: "Family at table", offset: { x: "-60%", y: "0%" } },
  { id: 6, src: photo6, alt: "Guest enjoying food", offset: { x: "-20%", y: "0%" } },
  { id: 7, src: photo7, alt: "Friends posing together", offset: { x: "20%", y: "0%" } },
  { id: 8, src: photo8, alt: "Group celebration", offset: { x: "60%", y: "0%" } },

  { id: 9, src: photo9, alt: "Guest smiling", offset: { x: "-60%", y: "60%" } },
  { id: 10, src: photo10, alt: "Dining party", offset: { x: "-20%", y: "60%" } },
  { id: 11, src: photo11, alt: "Friends at table", offset: { x: "20%", y: "60%" } },
  { id: 12, src: photo12, alt: "Birthday event", offset: { x: "60%", y: "60%" } },
];

export default function CherishedMemories() {
  return (
    <section className="relative w-full bg-stone-900 overflow-hidden py-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 p-0 bg-stone-950">
        {GALLERY_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-[4/2.5] overflow-visible"
          >
            <motion.div
              initial={{
                opacity: 0,
                x: photo.offset.x,
                y: photo.offset.y,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                x: "0%",
                y: "0%",
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="w-full h-full relative group cursor-pointer overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center max-w-3xl px-4"
        >
          <span className="block font-[DancingScript] text-amber-200 text-3xl sm:text-4xl md:text-5xl italic mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Good Food & Great Company
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] leading-tight">
            "People who love to eat are always the best people."
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
