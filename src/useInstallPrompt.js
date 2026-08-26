import { useState, useEffect, useCallback } from 'react'

const DISMISS_KEY = 'creatine-install-dismissed'

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream
}

function isInStandaloneMode() {
  return (
    ('standalone' in window.navigator && window.navigator.standalone === true) ||
    window.matchMedia('(display-mode: standalone)').matches
  )
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setIsStandalone] = useState(isInStandaloneMode)
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === 'true')

  useEffect(() => {
    function handleBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    function handleInstalled() {
      setIsStandalone(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const platform = isIos() ? 'ios' : deferredPrompt ? 'android' : 'other'

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }, [deferredPrompt])

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, 'true')
    setDismissed(true)
  }, [])

  // Toon de banner alleen als: niet al geïnstalleerd, niet weggeklikt, en er iets zinnigs te tonen is
  const shouldShow =
    !isStandalone && !dismissed && (platform === 'ios' || platform === 'android')

  return { platform, shouldShow, promptInstall, dismiss }
}
