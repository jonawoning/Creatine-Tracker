import { useState } from 'react'
import { useCreatineStore } from './useCreatineStore.js'
import { useDarkMode } from './useDarkMode.js'
import { useInstallPrompt } from './useInstallPrompt.js'
import { useSWUpdate } from './useSWUpdate.js'
import Home from './components/Home.jsx'
import Logbook from './components/Logbook.jsx'
import NavBar from './components/NavBar.jsx'
import InstallBanner from './components/InstallBanner.jsx'
import UpdateBanner from './components/UpdateBanner.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  const {
    entries,
    todayStatus,
    todayAmount,
    defaultDose,
    markTakenToday,
    markSkippedToday,
    resetToday,
    currentStreak,
    setDayEntry
  } = useCreatineStore()
  const { isDark, toggle } = useDarkMode()
  const { platform, shouldShow, promptInstall, dismiss } = useInstallPrompt()
  const { needRefresh, applyUpdate } = useSWUpdate()

  return (
    <div className="min-h-screen flex flex-col dark:bg-night-paper">
      <header className="relative pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-2 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-ink/40 dark:text-night-ink/40 uppercase">
          Creatine Tracker
        </p>
        <button
          onClick={toggle}
          aria-label={isDark ? 'Zet lichte modus aan' : 'Zet donkere modus aan'}
          className="absolute right-5 top-[calc(env(safe-area-inset-top)+1.1rem)] w-8 h-8 flex items-center justify-center rounded-full text-ink/50 dark:text-night-ink/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      {needRefresh && <UpdateBanner onRefresh={applyUpdate} />}

      {shouldShow && (
        <InstallBanner platform={platform} promptInstall={promptInstall} dismiss={dismiss} />
      )}

      {tab === 'home' && (
        <Home
          todayStatus={todayStatus}
          todayAmount={todayAmount}
          defaultDose={defaultDose}
          markTakenToday={markTakenToday}
          markSkippedToday={markSkippedToday}
          resetToday={resetToday}
          currentStreak={currentStreak}
        />
      )}

      {tab === 'logbook' && (
        <Logbook entries={entries} setDayEntry={setDayEntry} defaultDose={defaultDose} />
      )}

      <NavBar active={tab} onChange={setTab} />
    </div>
  )
}
