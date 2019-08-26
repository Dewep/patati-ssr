import { createApp } from '../'

const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
  // Initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')
