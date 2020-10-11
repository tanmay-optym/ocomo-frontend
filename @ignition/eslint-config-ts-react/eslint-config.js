module.exports = {
  env: {
    browser: true,
    es6: true,
    node: false
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-typescript',
    '@ignition/eslint-config-ts',
  ],
  rules: {
    'react/no-danger': 'error',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.tsx', '.jsx'] }],
    'react/static-property-placement': ['error', 'static public field'],
  }
};
