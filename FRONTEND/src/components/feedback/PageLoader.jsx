import GlassLoader from "../fun/GlassLoader";

export default function PageLoader({ label = "Pouring something good..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 bg-paper text-ink"
    >
      <GlassLoader />
      <span className="text-xs uppercase tracking-[0.3em] text-ink/60">{label}</span>
    </div>
  );
}
