/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true
  },
  ecmaFeatures: {
    modules: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true
  },
  // extends: 'eslint:recommended',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-debugger': 2,
    'no-unused-vars': 1,
    'no-var': 0,
    'no-param-reassign': 0,
    'no-irregular-whitespace': 0,
    'no-useless-catch': 1,
    'max-params': ['error', 3],
    'array-callback-return': 1,
    eqeqeq: 0,
    indent: ['error', 2, { SwitchCase: 1 }]
  }
}
