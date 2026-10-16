const TONES = {
  sage: "text-sage",
  ember: "text-ember",
  gold: "text-gold-deep",
};

export default function Stamp({ children, tone = "gold", className = "" }) {
  return <span className={`stamp ${TONES[tone] || TONES.gold} ${className}`}>{children}</span>;
}
