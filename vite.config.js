import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
    includeAssets: ['logo.png'],
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'Salah Shuffle',
      short_name: 'SShuffle',
      description: 'allows you to shuffle through Quran Surahs and generate random surahs for each of the five daily prayers.',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          sizes: '512x512',
          type: 'image/png'
        },
      ]
    }
  })
]
})