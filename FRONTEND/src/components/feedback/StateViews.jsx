export const Skeleton = ({ className = "" }) => (
  <div className={`skeleton-shimmer rounded-md bg-paper-3 ${className}`} />
);

export const EmptyState = ({ title = "Nothing here yet", message }) => (
  <div className="w-full rounded-md border border-[#C5A059]/25 bg-paper-2 px-6 py-12 text-center">
    <p className="font-serif text-lg text-ink">{title}</p>
    {message && <p className="mt-2 text-sm text-ink/60">{message}</p>}
  </div>
);

export const RetryBanner = ({ message = "Something went wrong loading this.", onRetry }) => (
  <div className="w-full rounded-md border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-6 py-8 text-center">
    <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-colors hover:bg-[#b8945088]"
      >
        Try again
      </button>
    )}
  </div>
);
