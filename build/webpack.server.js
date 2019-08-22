"use strict"

module.export = merge(common, {
  target: "node",
  entry: "./",
  output: {
    libraryTarget: "commonjs2",
  },
  plugins: [
    new VueSSRServerPlugin(),
  ],
});
