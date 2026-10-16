import { prefersReducedMotion } from "./motion";

const bounceCart = (target) => {
  if (!target) return;
  target.classList.remove("cart-bounce");
  void target.offsetWidth;
  target.classList.add("cart-bounce");
};

export const flyToCart = (sourceElement) => {
  const target = document.getElementById("cart-button");
  if (!sourceElement || !target || prefersReducedMotion()) {
    bounceCart(target);
    return;
  }

  const from = sourceElement.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const startX = from.left + from.width / 2;
  const startY = from.top + from.height / 2;
  const dx = to.left + to.width / 2 - startX;
  const dy = to.top + to.height / 2 - startY;

  const dot = document.createElement("div");
  dot.textContent = "+1";
  Object.assign(dot.style, {
    position: "fixed",
    left: `${startX - 18}px`,
    top: `${startY - 18}px`,
    width: "36px",
    height: "36px",
    borderRadius: "9999px",
    background: "#C5A059",
    color: "#2C2523",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
    pointerEvents: "none",
    zIndex: "3000",
  });
  document.body.appendChild(dot);

  const animation = dot.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(0.9)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0.5 },
    ],
    { duration: 700, easing: "cubic-bezier(0.45, 0, 0.55, 1)" }
  );

  animation.onfinish = () => {
    dot.remove();
    bounceCart(target);
  };
};
