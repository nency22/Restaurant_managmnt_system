import { useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../utils/motion";

export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);

  const onMove = (event) => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const node = ref.current;
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
  };

  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  );
}
