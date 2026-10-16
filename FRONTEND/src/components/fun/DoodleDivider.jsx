export default function DoodleDivider({ className = "" }) {
  return (
    <div aria-hidden="true" className={`mx-auto flex w-full max-w-xs items-center gap-3 text-gold ${className}`}>
      <span className="h-px flex-1 bg-current opacity-40" />
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M17 31V9" />
        <path d="M17 9c-3-1-4-4-3-6 3 0 4 3 3 6z" />
        <path d="M17 9c3-1 4-4 3-6-3 0-4 3-3 6z" />
        <path d="M17 16c-4 0-6-3-6-5 4 0 6 2 6 5z" />
        <path d="M17 16c4 0 6-3 6-5-4 0-6 2-6 5z" />
        <path d="M17 23c-4 0-6-3-6-5 4 0 6 2 6 5z" />
        <path d="M17 23c4 0 6-3 6-5-4 0-6 2-6 5z" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}
