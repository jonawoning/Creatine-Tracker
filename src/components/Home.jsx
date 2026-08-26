export default function Home({ todayStatus, markToday, resetToday, currentStreak }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest text-moss-dark/60 uppercase mb-2">
          Huidige streak
        </p>
        <p className="font-display text-7xl text-ink leading-none">{currentStreak}</p>
        <p className="text-sm text-ink/50 mt-1">{currentStreak === 1 ? 'dag' : 'dagen'} op rij</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm border border-line rounded-2xl px-8 py-10 w-full max-w-sm shadow-sm">
        {todayStatus === 'taken' && (
          <>
            <p className="text-5xl mb-4">✅</p>
            <p className="font-display text-xl text-ink mb-6">
              Je hebt vandaag al creatine ingenomen
            </p>
            <button
              onClick={resetToday}
              className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink transition-colors"
            >
              Wijzig keuze voor vandaag
            </button>
          </>
        )}

        {todayStatus === 'skipped' && (
          <>
            <p className="text-5xl mb-4">❌</p>
            <p className="font-display text-xl text-ink mb-6">
              Je hebt vandaag geen creatine ingenomen
            </p>
            <button
              onClick={resetToday}
              className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink transition-colors"
            >
              Wijzig keuze voor vandaag
            </button>
          </>
        )}

        {todayStatus === null && (
          <>
            <p className="text-5xl mb-4">❔</p>
            <p className="font-display text-xl text-ink mb-6">
              Je hebt nog geen creatine ingenomen
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => markToday('taken')}
                className="bg-moss hover:bg-moss-dark text-paper font-medium rounded-xl py-3 transition-colors"
              >
                Ingenomen ✅
              </button>
              <button
                onClick={() => markToday('skipped')}
                className="border border-rust text-rust hover:bg-rust hover:text-paper font-medium rounded-xl py-3 transition-colors"
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
