"use strict"

const webpack = require("webpack")
const merge = require("webpack-merge")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const common = require("./webpack.common")

module.export = merge(common, {
  target: "node",
  entry: "./src/server.js",
  output: {
    libraryTarget: "commonjs2",
  },
  plugins: [
    new VueSSRServerPlugin(),
  ],
});
