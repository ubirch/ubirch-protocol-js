module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ["error", "always"]
  },
  globals: {
    "it": "readonly",
    "describe": "readonly"
  }
}
