module.exports = (renderer) => {
  return (req, res) => {
    const context = {
      url: req.url
    }

    renderer.renderToString(context).then(html => {
      res.end(html)
    }).catch(err => {
      res.status(err.code || 500).end('')
      console.debug(err)
    })
  }
}
