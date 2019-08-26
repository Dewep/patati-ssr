'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const bundleRendererHandler = require('../lib/vue-ssr-handler')

const resolve = relativePath => path.resolve(__dirname, relativePath)

const bundleRenderer = createBundleRenderer(
  require(resolve('../dist/vue-ssr-server-bundle.json')),
  {
    template: fs.readFileSync(resolve('../src/layout.html'), 'utf-8'),
    clientManifest: require(resolve('../dist/vue-ssr-client-manifest.json'))
  }
)

const server = express()

// Add handler for static file in dist/ directory
server.use('/dist', express.static(resolve('../dist')))
// Add SSR handler for all HTTP routes
server.get('*', bundleRendererHandler(bundleRenderer))

const port = process.env.LISTEN_PORT || 8080

server.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})
