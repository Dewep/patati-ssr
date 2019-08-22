const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
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
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, '../src/styles')
              ]
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png)$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  plugins: [
    // The plugin is required. It's responsible for applying any other rules
    // to the corresponding language blocks in `.vue` files.
    new VueLoaderPlugin()
  ]
}
