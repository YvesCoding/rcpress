module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      arrowFunctions: true,
      classes: true,
      modules: true,
      defaultParams: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unused-state': 'warn',
    'no-console': 'off'
  },
  globals: {
    React: 'writable',
    SW_ENABLED: 'readonly',
    BASE_URL: 'readonly',
    RCPRESS_VERSION: 'readonly'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
