module.exports = function (bundleRenderer) {
  return async (req, res) => {
    const context = {
      url: req.url
    }

    try {
      const html = await bundleRenderer.renderToString(context)
      res.end(html)
    } catch(err) {
      console.debug(err)
      res.status(err.code || 500).end(err.message)
    }
  }
}
