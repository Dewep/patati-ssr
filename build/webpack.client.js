const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const common = require('./webpack.common')
const { resolve } = require('./utils')

module.exports = merge(common, {
  target: 'web',

  entry: resolve('../src/entries/client.js'),

  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin()
  ]
})
