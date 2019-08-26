const path = require('path')

module.exports = {
  value ({ production, development }) {
    return process.env.NODE_ENV === 'production' ? production : development
  },

  resolve (relativePath) {
    return path.resolve(__dirname, relativePath)
  }
}
