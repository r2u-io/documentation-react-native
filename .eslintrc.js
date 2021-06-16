module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    camelcase: 'off',
    'no-var': 1,
    'prefer-const': 1,
    'react/prop-types': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [],
  env: {
    es6: true,
  },
  globals: {
    fetch: false,
  },
}
