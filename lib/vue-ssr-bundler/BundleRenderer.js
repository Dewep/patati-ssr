const { createBundleRenderer } = require('vue-server-renderer')

module.exports = class BundleRenderer {
  constructor () {
    this.renderer = null
  }

  build ({ template, serverBundle, clientManifest }) {
    this.renderer = createBundleRenderer(serverBundle, { template, clientManifest })
  }

  async renderToString (context) {
    if (!this.renderer) {
      throw new Error('You should build a renderer before to render')
    }

    return await this.renderer.renderToString(context)
  }
}
