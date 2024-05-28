import { defineConfig } from 'tsup'

export default defineConfig({
  minify: false,
  sourcemap: true,
  clean: true,
  format: 'esm',
  dts: true
})
