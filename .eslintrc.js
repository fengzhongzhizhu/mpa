module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    indent: ['error',4],
    semi:0,
    eqeqeq:0,
    'no-unused-vars': ['warn'],
    'no-console': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars':0,
    "space-before-function-paren":0,
    'eol-last':0
  }
};