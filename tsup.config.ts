// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'ES2022',
  sourcemap: true,
  dts: true,
  clean: true,
});
