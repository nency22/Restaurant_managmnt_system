import { motion, useReducedMotion } from "framer-motion";

export default function ScribbleUnderline({ children, className = "", color = "#C5A059" }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
      >
        <motion.path
          d="M2 8 C 40 2, 70 12, 110 6 S 170 3, 198 7"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}
