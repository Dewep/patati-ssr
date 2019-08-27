'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')

const {
  BundleRenderer,
  HotBundleRendererBuilder,
  bundleHandler
} = require('../lib/vue-ssr-bundler')

const resolve = relativePath => path.resolve(__dirname, relativePath)

async function main () {
  const app = express()

  let bundleRenderer
  if (process.env.NODE_ENV === 'production') {
    // Generate static bundle renderer
    bundleRenderer = new BundleRenderer()
    bundleRenderer.build({
      clientManifest: require(resolve('../dist/vue-ssr-client-manifest.json')),
      serverBundle: require(resolve('../dist/vue-ssr-server-bundle.json')),
      template: fs.readFileSync(resolve('../src/layout.html'), 'utf-8')
    })
  } else {
    // Generate dynamique bundle renderer (development only)
    const hotBundleRendererBuilder = new HotBundleRendererBuilder({
      webpackClientConfig: require(resolve('../build/webpack.client.js')),
      webpackServerConfig: require(resolve('../build/webpack.server.js')),
      template: fs.readFileSync(resolve('../src/layout.html'), 'utf-8')
    })
    await hotBundleRendererBuilder.use(app).then()
    bundleRenderer = hotBundleRendererBuilder.getBundleRenderer()
  }

  // Add handler for static file in dist/ directory
  app.use('/dist', express.static(resolve('../dist')))
  // Add SSR handler for all HTTP routes
  app.get('*', bundleHandler(bundleRenderer))

  const port = process.env.LISTEN_PORT || 8080

  app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
  })
}

main()
