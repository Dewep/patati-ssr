import Vue from 'vue'
import Meta from 'vue-meta'
import { sync as routerSync } from 'vuex-router-sync'
import { createRouter } from './router'
import { createStore } from './store'
import App from './App.vue'

// Import entry SCSS to generate bundled CSS file
import './styles/main.scss'

// Add vue-meta to manage HTML metadata
Vue.use(Meta, {
  refreshOnceOnNavigaton: true
})

export function createApp () {
  const store = createStore()
  const router = createRouter()

  // Synchronize the router with the vuex store
  routerSync(store, router, { moduleName: 'route' })

  // Create the Vue app
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { app, store, router }
}
