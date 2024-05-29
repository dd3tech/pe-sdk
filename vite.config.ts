import { defineConfig } from 'vitest/config'

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'node',
      include: ['tests/**/*.test.ts'],
      setupFiles: 'tests/setup.ts'
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
