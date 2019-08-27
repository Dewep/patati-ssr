const MemoryFileSystem = require('memory-fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const BundleRenderer = require('./BundleRenderer')

module.exports = class HotBundleRendererBuilder {
  constructor ({ template, webpackClientConfig, webpackServerConfig }) {
    this.bundleRenderer = new BundleRenderer()
    this.template = template

    this.fileSystem = new MemoryFileSystem()
    this.initClientCompiler(webpackClientConfig)
    this.initServerCompiler(webpackServerConfig)
  }

  createCompiler (config) {
    const compiler = webpack(config)
    compiler.outputFileSystem = this.fileSystem
    return compiler
  }

  initClientCompiler (config) {
    config = merge(config, {
      entry: ["webpack-hot-middleware/client", config.entry],
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ],
      optimization: {
        noEmitOnErrors: false
      }
    })

    this.clientCompiler = this.createCompiler(config)
  }

  initServerCompiler (config) {
    this.serverCompiler = this.createCompiler(config)
  }

  parse (directory, file) {
    console.debug(path.join(directory, file))
    return JSON.parse(
      this.fileSystem.readFileSync(path.join(directory, file), 'utf-8')
    )
  }

  async use (app) {
    app.use(require("webpack-dev-middleware")(this.clientCompiler, {
      publicPath: this.clientCompiler.options.output.publicPath,
    }))
    app.use(require("webpack-hot-middleware")(this.clientCompiler))
    return new Promise(resolve => {
      let clientManifest
      let serverBundle

      const updateRenderer = () => {
        if (!clientManifest || !serverBundle) {
          return
        }

        this.bundleRenderer.build({ clientManifest, serverBundle, template: this.template })
        resolve()
      }

      this.clientCompiler.hooks.done.tap("dev-server", () => {
        clientManifest = this.parse(
          this.clientCompiler.options.output.path,
          "vue-ssr-client-manifest.json"
        )
        updateRenderer()
      })

      this.serverCompiler.watch({}, () => {
        serverBundle = this.parse(
          this.clientCompiler.options.output.path,
          'vue-ssr-server-bundle.json'
        )
        updateRenderer()
      })
    })
  }

  getBundleRenderer () {
    return this.bundleRenderer
  }
}
