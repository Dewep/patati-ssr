import Vue from 'vue'

const LoadContentPlugin = {
  install (Vue, options) {
    Vue.mixin({
      created () {
        if (this.loadContent) {
          return this.loadContent()
        }
      },

      serverPrefetch () {
        if (this.loadContent) {
          return this.loadContent()
        }
      }
    })
  }
}

Vue.use(LoadContentPlugin)
