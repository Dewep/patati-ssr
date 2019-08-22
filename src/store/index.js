import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import plugins from './plugins'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules,
    plugins,
    strict: true
  })
}
