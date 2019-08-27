import { createApp } from '../'

const pageNotFound = new Error('Page not found')
pageNotFound.code = 404

export default context => {
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp()

    // The `rendered` hook is called when the app has finished rendering
    context.rendered = () => {
      // Attach the state to the context.It will be serialized and injected
      // into the HTML as `window.__INITIAL_STATE__`
      context.state = store.state

      // Attach the metadata to the context. It will be serialized and injected
      // into the HTML head tag
      context.meta = app.$meta().inject()
    }

    // Set server-side router's location
    router.push(context.url)

    // Wait until router has resolved possible async components and hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // No matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject(pageNotFound)
      }

      // The app instance can be rendered
      resolve(app)
    }, reject)
  })
}
