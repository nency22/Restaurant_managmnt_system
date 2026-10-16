import { useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../utils/motion";

export default function TiltCard({ children, className = "", max = 8 }) {
  const ref = useRef(null);

  const onMove = (event) => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const node = ref.current;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(700px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.02)`;
  };

  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
