import __ignoredDependencies from './../common/ignored-dependencies.mjs';

/**
 * Create `dependency-checks` rule
 * @param {string[]} ignoredDependencies
 * @returns - estlint rule
 */
export async function createDependencyChecksRule(ignoredDependencies) {
  return {
    files: ['./package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
          ],
          ignoredDependencies: [
            ...__ignoredDependencies,
            ...ignoredDependencies,
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  };
}

export default createDependencyChecksRule(__ignoredDependencies);
