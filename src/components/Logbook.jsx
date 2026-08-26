import { useState } from 'react'
import { todayKey } from '../useCreatineStore.js'

const WEEKDAYS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
const MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december'
]

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate)
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
  // JS: 0 = zondag ... 6 = zaterdag -> we willen 0 = maandag
  const leading = (first.getDay() + 6) % 7

  const cells = Array(leading).fill(null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day))
  }
  return cells
}

export default function Logbook({ entries }) {
  const [displayedMonth, setDisplayedMonth] = useState(startOfMonth(new Date()))

  const isCurrentMonth =
    displayedMonth.getFullYear() === new Date().getFullYear() &&
    displayedMonth.getMonth() === new Date().getMonth()

  const cells = buildMonthGrid(displayedMonth)
  const today = new Date()

  function changeMonth(delta) {
    const next = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + delta, 1)
    if (next <= startOfMonth(new Date())) {
      setDisplayedMonth(next)
    }
  }

  return (
    <div className="flex-1 px-6 pt-6 pb-4 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/60 text-ink transition-colors"
          aria-label="Vorige maand"
        >
          ←
        </button>
        <p className="font-display text-lg text-ink">
          {MONTHS[displayedMonth.getMonth()]} {displayedMonth.getFullYear()}
        </p>
        <button
          onClick={() => changeMonth(1)}
          disabled={isCurrentMonth}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/60 text-ink transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
          aria-label="Volgende maand"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs font-mono text-ink/40 uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} />

          const key = date.toISOString ? formatKey(date) : null
          const isFuture = date > today && formatKey(date) !== formatKey(today)
          const isToday = formatKey(date) === formatKey(today)
          const status = entries[formatKey(date)]

          return (
            <div
              key={idx}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                ${isToday ? 'bg-moss/15 border border-moss/40' : 'border border-transparent'}`}
            >
              <span className="text-ink/70">{date.getDate()}</span>
              <span className="text-xs mt-0.5">
                {isFuture ? '' : status === 'taken' ? '✅' : status === 'skipped' ? '❌' : '–'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
