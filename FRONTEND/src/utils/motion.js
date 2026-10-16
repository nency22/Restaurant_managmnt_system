export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const haptic = (ms = 12) => {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(ms);
};
