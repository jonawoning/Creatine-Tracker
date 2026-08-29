import { useState } from 'react'

export default function DayEditor({ date, currentStatus, currentAmount, defaultDose, onSelect, onClose }) {
  const [pendingTaken, setPendingTaken] = useState(currentStatus === 'taken')
  const [amountInput, setAmountInput] = useState(() => {
    if (currentAmount !== null && currentAmount !== undefined) return String(currentAmount)
    if (defaultDose !== null) return String(defaultDose)
    return ''
  })

  const parsedAmount = parseFloat(amountInput.replace(',', '.'))
  const isValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0

  const formatted = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 dark:bg-black/60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm bg-paper dark:bg-night-card rounded-t-2xl sm:rounded-2xl border border-line dark:border-night-line px-6 pt-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:pb-6 animate-[slideUp_0.2s_ease-out]"
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-display text-lg text-ink dark:text-night-ink capitalize">
            {formatted}
          </p>
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="text-ink/40 dark:text-night-ink/40 hover:text-ink dark:hover:text-night-ink text-lg leading-none px-1"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setPendingTaken(true)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors border
              ${pendingTaken
                ? 'bg-moss/15 dark:bg-night-moss/20 border-moss/40 dark:border-night-moss/40'
                : 'border-line dark:border-night-line hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium text-ink dark:text-night-ink">Ingenomen</span>
          </button>

          {pendingTaken && (
            <div className="ml-1 mb-1 flex items-center gap-2 pl-9">
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                min="0"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="bijv. 5"
                className="w-16 text-center font-display text-lg bg-transparent border-b-2 border-line dark:border-night-line focus:border-moss dark:focus:border-night-moss outline-none text-ink dark:text-night-ink py-0.5"
              />
              <span className="text-sm text-ink/50 dark:text-night-ink/50">gram</span>
              <button
                onClick={() => isValidAmount && onSelect('taken', parsedAmount)}
                disabled={!isValidAmount}
                className="ml-auto text-xs font-medium bg-moss dark:bg-night-moss disabled:opacity-40 text-paper dark:text-night-paper rounded-lg px-3 py-1.5"
              >
                Bewaar
              </button>
            </div>
          )}

          <button
            onClick={() => onSelect('skipped', null)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors border
              ${currentStatus === 'skipped'
                ? 'bg-moss/15 dark:bg-night-moss/20 border-moss/40 dark:border-night-moss/40'
                : 'border-line dark:border-night-line hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            <span className="text-lg">❌</span>
            <span className="text-sm font-medium text-ink dark:text-night-ink">Overgeslagen</span>
          </button>

          <button
            onClick={() => onSelect(null, null)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors border
              ${currentStatus === null
                ? 'bg-moss/15 dark:bg-night-moss/20 border-moss/40 dark:border-night-moss/40'
                : 'border-line dark:border-night-line hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            <span className="text-lg">–</span>
            <span className="text-sm font-medium text-ink dark:text-night-ink">Geen invoer</span>
          </button>
        </div>
      </div>
    </div>
  )
}
