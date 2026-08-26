import { useState } from 'react'
import { useCreatineStore } from './useCreatineStore.js'
import Home from './components/Home.jsx'
import Logbook from './components/Logbook.jsx'
import NavBar from './components/NavBar.jsx'

export default function App() {
  const [tab, setTab] = useState('home')
  const { entries, todayStatus, markToday, resetToday, currentStreak } = useCreatineStore()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-2 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-ink/40 uppercase">
          Creatine Tracker
        </p>
      </header>

      {tab === 'home' && (
        <Home
          todayStatus={todayStatus}
          markToday={markToday}
          resetToday={resetToday}
          currentStreak={currentStreak}
        />
      )}

      {tab === 'logbook' && <Logbook entries={entries} />}

      <NavBar active={tab} onChange={setTab} />
    </div>
  )
}
