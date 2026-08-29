import { useState, useEffect, useCallback } from 'react'

const ENTRIES_KEY = 'creatine-entries'
const DOSE_KEY = 'creatine-default-dose'

function todayKey(date = new Date()) {
  // yyyy-MM-dd in lokale tijd (geen UTC-verschuiving)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Normaliseert oude entries (platte strings) naar het { status, amount } formaat. */
function normalize(raw) {
  const out = {}
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') {
      out[key] = { status: value, amount: null }
    } else if (value && typeof value === 'object') {
      out[key] = { status: value.status, amount: value.amount ?? null }
    }
  }
  return out
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY)
    return raw ? normalize(JSON.parse(raw)) : {}
  } catch {
    return {}
  }
}

function loadDefaultDose() {
  const raw = localStorage.getItem(DOSE_KEY)
  const num = raw ? Number(raw) : null
  return Number.isFinite(num) ? num : null
}

export function useCreatineStore() {
  const [entries, setEntries] = useState(loadEntries)
  const [defaultDose, setDefaultDoseState] = useState(loadDefaultDose)

  useEffect(() => {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    if (defaultDose === null) {
      localStorage.removeItem(DOSE_KEY)
    } else {
      localStorage.setItem(DOSE_KEY, String(defaultDose))
    }
  }, [defaultDose])

  const setDefaultDose = useCallback((amount) => {
    setDefaultDoseState(Number.isFinite(amount) ? amount : null)
  }, [])

  /**
   * Generieke setter, gebruikt door zowel het Vandaag-scherm als het logboek.
   * Werkt ook meteen de "onthouden" standaarddosis bij, zodat een aanpassing
   * in het logboek net zo goed als nieuwe standaard geldt als een check-in
   * via het Vandaag-scherm.
   */
  const setDayEntry = useCallback(
    (dateKey, status, amount = null) => {
      setEntries((prev) => {
        const next = { ...prev }
        if (status === null) {
          delete next[dateKey]
        } else {
          next[dateKey] = { status, amount: status === 'taken' ? amount : null }
        }
        return next
      })

      if (status === 'taken' && Number.isFinite(amount) && amount > 0) {
        setDefaultDose(amount)
      }
    },
    [setDefaultDose]
  )

  const markTakenToday = useCallback(
    (amount) => setDayEntry(todayKey(), 'taken', amount),
    [setDayEntry]
  )

  const markSkippedToday = useCallback(() => {
    setDayEntry(todayKey(), 'skipped')
  }, [setDayEntry])

  const resetToday = useCallback(() => setDayEntry(todayKey(), null), [setDayEntry])

  const todayEntry = entries[todayKey()] ?? null
  const todayStatus = todayEntry?.status ?? null
  const todayAmount = todayEntry?.amount ?? null

  // Streak: aantal opeenvolgende dagen tot en met vandaag/gisteren met status 'taken'
  const currentStreak = (() => {
    let streak = 0
    let cursor = new Date()
    const statusAt = (d) => entries[todayKey(d)]?.status ?? null

    if (statusAt(cursor) !== 'taken') {
      cursor.setDate(cursor.getDate() - 1)
    }

    while (statusAt(cursor) === 'taken') {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return streak
  })()

  return {
    entries,
    todayKey: todayKey(),
    todayStatus,
    todayAmount,
    defaultDose,
    markTakenToday,
    markSkippedToday,
    resetToday,
    setDayEntry,
    currentStreak
  }
}

export { todayKey }
