'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

const renderer = createBundleRenderer(
  require(resolve('../dist/vue-ssr-server-bundle.json')),
  {
    template: fs.readFileSync(resolve('../src/layout.html'), 'utf-8'),
    clientManifest: require(resolve('../dist/vue-ssr-client-manifest.json')),
  },
)

const server = express()

server.get('*', function(req, res) {
  renderer.renderToString({}, (error, html) => {
    if (error) {
      res.status(500).send(error)
      console.debug(error)
      return
    }

    res.send(html)
  })
})

server.listen(8080, () => {
  console.log('Server started at localhost:8080')
})
