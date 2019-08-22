module.exports = () => ({
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue
  extends: [
    'standard',
    // 'plugin:vue/base',
    // 'plugin:vue/essential',
    // 'plugin:vue/strongly-recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': [2, { 'singleline': 3 }]
  }
})
