const { VueLoaderPlugin } = require('vue-loader')
const { resolve, value } = require('./utils')

module.exports = {
  mode: value({ production: 'production', development: 'development' }),

  output: {
    path: resolve('../dist'),
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },

  plugins: [
    // The plugin is required. It's responsible for applying any other rules
    // to the corresponding language blocks in `.vue` files.
    new VueLoaderPlugin()
  ]
}
