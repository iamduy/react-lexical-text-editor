import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: 'index.js',
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        entryFileNames: 'index.mjs',
      },
    ],
    plugins: [
      url({
        include: ['**/*.svg', '**/*.png', '**/*.jpg'],
        limit: 0, // luôn copy file, không base64
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser(),
      postcss(),
    ],
    external: ['react', 'react-dom'],
    onwarn(warning, warn) {
      // Suppress "use client" directive warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'src/index.ts',
    output: [{ dir: 'dist', entryFileNames: 'index.d.ts' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
