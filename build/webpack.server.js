const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const common = require('./webpack.common')
const { resolve } = require('./utils')

module.exports = merge(common, {
  target: 'node',

  entry: resolve('../src/entries/server.js'),

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    whitelist: [/\.css$/, /^core-js\//, /^regenerator-runtime/]
  }),

  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRServerPlugin()
  ]
})
