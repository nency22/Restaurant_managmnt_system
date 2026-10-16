import { useId } from "react";

export default function GlassLoader({ size = 56, className = "" }) {
  const clipId = useId();

  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 64 77"
      role="img"
      aria-label="Loading"
      className={`text-ink ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M12 6h40l-4 58a6 6 0 0 1-6 5.5H22A6 6 0 0 1 16 64z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect className="glass-liquid" x="0" y="6" width="64" height="70" fill="#C5A059" />
      </g>
      <path
        d="M12 6h40l-4 58a6 6 0 0 1-6 5.5H22A6 6 0 0 1 16 64z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M20 14l2 38" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
