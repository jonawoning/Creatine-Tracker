export default function UpdateBanner({ onRefresh }) {
  return (
    <div className="mx-4 mb-3 rounded-xl border border-moss/40 dark:border-night-moss/40 bg-moss/15 dark:bg-night-moss/15 px-4 py-3 flex items-center gap-3">
      <span className="text-xl leading-none">✨</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink dark:text-night-ink">
          Nieuwe versie beschikbaar
        </p>
        <p className="text-xs text-ink/60 dark:text-night-ink/60 mt-0.5">
          Je data blijft gewoon staan.
        </p>
      </div>
      <button
        onClick={onRefresh}
        className="text-xs font-medium bg-moss dark:bg-night-moss text-paper dark:text-night-paper rounded-lg px-3 py-1.5 shrink-0"
      >
        Vernieuwen
      </button>
    </div>
  )
}
