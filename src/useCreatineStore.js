import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'creatine-entries'

function todayKey(date = new Date()) {
  // yyyy-MM-dd in lokale tijd (geen UTC-verschuiving)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useCreatineStore() {
  const [entries, setEntries] = useState(loadEntries)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const setStatus = useCallback((dateKey, status) => {
    setEntries((prev) => {
      const next = { ...prev }
      if (status === null) {
        delete next[dateKey]
      } else {
        next[dateKey] = status
      }
      return next
    })
  }, [])

  const markToday = useCallback(
    (status) => setStatus(todayKey(), status),
    [setStatus]
  )

  const resetToday = useCallback(() => setStatus(todayKey(), null), [setStatus])

  const todayStatus = entries[todayKey()] ?? null

  // Streak: aantal opeenvolgende dagen tot en met vandaag/gisteren met status 'taken'
  const currentStreak = (() => {
    let streak = 0
    let cursor = new Date()

    // Als vandaag nog niet is ingevuld, telt vandaag niet mee, begin bij gisteren
    if (!entries[todayKey(cursor)] || entries[todayKey(cursor)] === 'skipped') {
      if (entries[todayKey(cursor)] !== 'taken') {
        cursor.setDate(cursor.getDate() - 1)
      }
    }

    while (entries[todayKey(cursor)] === 'taken') {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return streak
  })()

  return { entries, todayKey: todayKey(), todayStatus, markToday, resetToday, setStatus, currentStreak }
}

export { todayKey }
