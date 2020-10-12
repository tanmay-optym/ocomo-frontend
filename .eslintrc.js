module.exports = {
  env: {
    browser: false,
    es6: true,
    node: false
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base'
  ],

  plugins: ['unicorn'],

  rules: {
    'comma-dangle': 'off',
    'import-name': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 2, maxBOF: 1 }],
    'max-len': ['error', 140],
    'class-methods-use-this': 'off',

    'import/prefer-default-export': 'off',
    'import/extensions': ['error', { js: 'never', ts: 'never', jsx: 'never', tsx: 'never' }],
    'import/no-cycle': 'off', // disabled until it supports TypeScript imports correctly: https://github.com/benmosher/eslint-plugin-import/issues/1453

    'no-unused-vars': 'off', // duplicate of @typescript/no-unused-vars

    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ],
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '[iI]gnored' }],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-misused-promises': ['error'],

    'no-multi-spaces': ['error', { exceptions: { Property: true, Interface: true } }],
    'key-spacing': [
      'error',
      {
        singleLine: { beforeColon: false, afterColon: true },
        multiLine: { beforeColon: false, afterColon: true },
        align: { on: 'colon', beforeColon: true, afterColon: true }
      }
    ],

    'max-lines': ['error', { max: 350 }],
    'max-params': ['error', { max: 5 }],
    'max-statements': ['error', { max: 10 }],
    'max-depth': ['error', { max: 3 }],
    'max-nested-callbacks': ['error', { max: 3 }],
    complexity: ['error', { max: 9 }],

    'jsx-quotes': ['error', 'prefer-single'],

    'unicorn/custom-error-definition': 'error',
    'unicorn/error-message': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/throw-new-error': 'error',

    'jsx-a11y/anchor-is-valid': 'off'
  }
};
