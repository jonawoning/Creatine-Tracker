import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['apple-touch-icon.png', 'favicon.ico', 'favicon-32.png', 'favicon-16.png'],
      manifest: {
        name: 'Creatine Tracker',
        short_name: 'Creatine',
        description: 'Houd bij of je elke dag creatine hebt ingenomen',
        theme_color: '#3F6B52',
        background_color: '#F5F1E8',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Cache alle build-assets zodat de app volledig offline werkt na 1e bezoek
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      }
    })
  ]
})
