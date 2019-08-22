"use strict"

import Vue from 'vue'

import { sync as routerSync } from 'vuex-router-sync'

import router from './router'
import store from './store'

import App from './App.vue'

// sync the router with the vuex store, this registers `store.state.route`
routerSync(store, router, { moduleName: 'route' })

export default () => {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app }
}
