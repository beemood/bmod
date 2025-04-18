import eslint from './.eslint/eslint.config.mjs';

export default [
  ...eslint,
  {
    ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
];
