import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../utils/motion";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;
    const node = ref.current;
    let frame = 0;
    let x = -400;
    let y = -400;

    const paint = () => {
      node.style.transform = `translate3d(${x - 210}px, ${y - 210}px, 0)`;
      frame = 0;
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      node.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      node.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{ background: "radial-gradient(circle, rgba(197,160,89,0.16), transparent 62%)" }}
    />
  );
}
