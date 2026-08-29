import { useState } from 'react'

export default function Home({
  todayStatus,
  todayAmount,
  defaultDose,
  markTakenToday,
  markSkippedToday,
  resetToday,
  currentStreak
}) {
  const [amountInput, setAmountInput] = useState(
    defaultDose !== null ? String(defaultDose) : ''
  )

  const parsedAmount = parseFloat(amountInput.replace(',', '.'))
  const isValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest text-moss-dark/60 dark:text-night-moss/70 uppercase mb-2">
          Huidige streak
        </p>
        <p className="font-display text-7xl text-ink dark:text-night-ink leading-none">{currentStreak}</p>
        <p className="text-sm text-ink/50 dark:text-night-ink/50 mt-1">
          {currentStreak === 1 ? 'dag' : 'dagen'} op rij
        </p>
      </div>

      <div className="bg-white/60 dark:bg-night-card/80 backdrop-blur-sm border border-line dark:border-night-line rounded-2xl px-8 py-10 w-full max-w-sm shadow-sm">
        {todayStatus === 'taken' && (
          <>
            <p className="text-5xl mb-4">✅</p>
            <p className="font-display text-xl text-ink dark:text-night-ink mb-1">
              Vandaag ingenomen
            </p>
            <p className="font-mono text-sm text-moss-dark dark:text-night-moss mb-6">
              {todayAmount !== null ? `${todayAmount}g creatine` : ''}
            </p>
            <button
              onClick={resetToday}
              className="text-sm text-ink/50 dark:text-night-ink/50 underline underline-offset-4 hover:text-ink dark:hover:text-night-ink transition-colors"
            >
              Wijzig keuze voor vandaag
            </button>
          </>
        )}

        {todayStatus === 'skipped' && (
          <>
            <p className="text-5xl mb-4">❌</p>
            <p className="font-display text-xl text-ink dark:text-night-ink mb-6">
              Je hebt vandaag geen creatine ingenomen
            </p>
            <button
              onClick={resetToday}
              className="text-sm text-ink/50 dark:text-night-ink/50 underline underline-offset-4 hover:text-ink dark:hover:text-night-ink transition-colors"
            >
              Wijzig keuze voor vandaag
            </button>
          </>
        )}

        {todayStatus === null && (
          <>
            <p className="text-5xl mb-4">❔</p>
            <p className="font-display text-xl text-ink dark:text-night-ink mb-5">
              Je hebt nog geen creatine ingenomen
            </p>

            <label className="block mb-6">
              <span className="text-xs font-mono text-ink/50 dark:text-night-ink/50 uppercase tracking-wider">
                Hoeveelheid
              </span>
              <div className="mt-1.5 flex items-center justify-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="bijv. 5"
                  className="w-20 text-center font-display text-2xl bg-transparent border-b-2 border-line dark:border-night-line focus:border-moss dark:focus:border-night-moss outline-none text-ink dark:text-night-ink py-1"
                />
                <span className="text-ink/50 dark:text-night-ink/50 font-medium">gram</span>
              </div>
              {defaultDose !== null && (
                <p className="text-xs text-ink/40 dark:text-night-ink/40 mt-2">
                  Gisteren ook {defaultDose}g — pas aan indien nodig
                </p>
              )}
            </label>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => isValidAmount && markTakenToday(parsedAmount)}
                disabled={!isValidAmount}
                className="bg-moss hover:bg-moss-dark dark:bg-night-moss dark:hover:bg-night-moss/80 disabled:opacity-40 disabled:hover:bg-moss dark:disabled:hover:bg-night-moss text-paper dark:text-night-paper font-medium rounded-xl py-3 transition-colors"
              >
                Ingenomen ✅
              </button>
              <button
                onClick={markSkippedToday}
                className="border border-rust dark:border-night-rust text-rust dark:text-night-rust hover:bg-rust hover:text-paper dark:hover:bg-night-rust dark:hover:text-night-paper font-medium rounded-xl py-3 transition-colors"
              >
                Keur vandaag af ❌
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
