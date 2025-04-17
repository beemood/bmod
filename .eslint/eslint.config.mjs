import nx from '@nx/eslint-plugin';
import consistentTypeImports from './rules/consistent-type-imports.mjs';
import dependencyChecks from './rules/dependency-checks.mjs';
import enforceModuleBoundaries from './rules/enforce-module-boundaries.mjs';
import noShadow from './rules/no-shadow.mjs';
import spellChecker from './rules/spell-checker.mjs';
import ignores from '././rules/ignores.mjs';

export default [
  ignores,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  consistentTypeImports,
  dependencyChecks,
  enforceModuleBoundaries,
  noShadow,
  spellChecker,
];
