import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'creatine-theme' // 'light' | 'dark' | null (= volg systeem)

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveIsDark(override) {
  if (override === 'dark') return true
  if (override === 'light') return false
  return getSystemPrefersDark()
}

export function useDarkMode() {
  const [override, setOverride] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [isDark, setIsDark] = useState(() => resolveIsDark(override))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    setIsDark(resolveIsDark(override))
    if (override) {
      localStorage.setItem(STORAGE_KEY, override)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [override])

  useEffect(() => {
    // Als er geen handmatige keuze is, live meebewegen met systeeminstelling
    if (override) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => setIsDark(getSystemPrefersDark())
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [override])

  const toggle = useCallback(() => {
    setOverride(isDark ? 'light' : 'dark')
  }, [isDark])

  return { isDark, toggle }
}
