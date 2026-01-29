/* eslint-disable */

import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import esbuild from 'rollup-plugin-esbuild';

const bundle = await rollup({
  input: ['src/index.js'],
  plugins: [
    babel(),
    esbuild({
      target: 'es6',
      minify: true,
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
});
await Promise.all([
  await bundle.write({
    file: 'dist/index.js',
    format: 'cjs',
  }),
  bundle.write({
    file: 'dist/index.mjs',
    format: 'esm',
  }),
  bundle.write({
    file: 'dist/index.iife.js',
    format: 'iife',
    name: 'Popper',
  }),
]);
