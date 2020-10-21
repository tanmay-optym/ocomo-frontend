module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: true,
    Promise: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': ['error', { js: 'never', ts: 'never', jsx: 'never', tsx: 'never' }],
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-wrap-multilines': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/require-default-props': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'operator-linebreak': 'off',
  },
};
