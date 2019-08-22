import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './styles/entry.scss'

import Vue from 'vue'

import { sync as routerSync } from 'vuex-router-sync'
import VueMeta from 'vue-meta'

import { createRouter } from './router'
import { createStore } from './store'

import App from './App.vue'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

export function createApp () {
  const router = createRouter()
  const store = createStore()

  // sync the router with the vuex store, this registers `store.state.route`
  routerSync(store, router, { moduleName: 'route' })

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
