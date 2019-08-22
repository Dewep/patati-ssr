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
    clientManifest: require(resolve('../dist/vue-ssr-client-manifest.json'))
  }
)

const server = express()

server.use('/dist', express.static(path.join(__dirname, '../dist')))
server.use('/public', express.static(path.join(__dirname, '../public')))

server.get('*', function (req, res) {
  const context = { url: req.url }

  renderer.renderToString(context, (error, html) => {
    if (error) {
      if (error.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
      console.debug(error)
      return
    }

    res.end(html)
  })
})

server.listen(8080, () => {
  console.log('Server started at localhost:8080')
})
