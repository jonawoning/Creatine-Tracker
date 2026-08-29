import { useState, useEffect, useRef } from 'react'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // elk uur checken op een nieuwe versie

export function useSWUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const updateFnRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    // Dynamische import: deze virtuele module bestaat alleen dankzij vite-plugin-pwa
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        if (cancelled) return

        const updateSW = registerSW({
          onNeedRefresh() {
            setNeedRefresh(true)
          },
          onRegisteredSW(_url, registration) {
            if (!registration) return
            // Periodiek checken zodat je het ook merkt als de app lang open blijft staan
            setInterval(() => {
              registration.update().catch(() => {})
            }, CHECK_INTERVAL_MS)
          }
        })

        updateFnRef.current = updateSW
      })
      .catch(() => {
        // Geen service worker beschikbaar (bijv. lokale dev zonder build) — negeren
      })

    return () => {
      cancelled = true
    }
  }, [])

  const applyUpdate = () => {
    updateFnRef.current?.(true)
  }

  return { needRefresh, applyUpdate }
}
