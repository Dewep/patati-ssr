"use strict"

const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|png)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    // The plugin is required. It's responsible for applying any other rules
    // to the corresponding language blocks in `.vue` files.
    new VueLoaderPlugin(),
  ],
}
