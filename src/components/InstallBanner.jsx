export default function InstallBanner({ platform, promptInstall, dismiss }) {
  return (
    <div className="mx-4 mb-3 rounded-xl border border-moss/30 dark:border-night-moss/30 bg-moss/10 dark:bg-night-moss/10 px-4 py-3 flex items-start gap-3">
      {platform === 'android' ? (
        <>
          <span className="text-xl leading-none mt-0.5">📲</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink dark:text-night-ink">
              Zet Creatine Tracker op je beginscherm
            </p>
            <p className="text-xs text-ink/60 dark:text-night-ink/60 mt-0.5">
              Werkt daarna ook offline, zonder browserbalk.
            </p>
            <button
              onClick={promptInstall}
              className="mt-2 text-xs font-medium bg-moss dark:bg-night-moss text-paper dark:text-night-paper rounded-lg px-3 py-1.5"
            >
              Installeer app
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-xl leading-none mt-0.5">⬆️</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink dark:text-night-ink">
              Zet Creatine Tracker op je beginscherm
            </p>
            <p className="text-xs text-ink/60 dark:text-night-ink/60 mt-0.5">
              Tik hieronder op het deel-icoon <span className="font-mono">⎋</span> in Safari, en
              kies <span className="font-medium">"Zet op beginscherm"</span>.
            </p>
          </div>
        </>
      )}
      <button
        onClick={dismiss}
        aria-label="Melding sluiten"
        className="text-ink/40 dark:text-night-ink/40 hover:text-ink dark:hover:text-night-ink text-sm leading-none px-1"
      >
        ✕
      </button>
    </div>
  )
}
