module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // disables ESLint rules that conflict with Prettier
  ],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'warn', // show Prettier issues as warnings
    'react/react-in-jsx-scope': 'off', // for React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
