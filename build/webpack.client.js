"use strict"

const webpack = require("webpack")
const merge = require("webpack-merge")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const common = require("./webpack.common")

module.exports = merge(common, {
  target: "web",
  entry: "./src/client.js",
  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
  ],
})
