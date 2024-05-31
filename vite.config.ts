/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const prod = mode === 'production'

  return {
    base: prod ? '/tz_zhelezo' : '/',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'setup.ts',
      reporters: ['default', 'html']
    },
    plugins: [react(), tsconfigPaths()]
  }
})
