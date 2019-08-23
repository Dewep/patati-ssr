import Vue from 'vue'

const LoadContentPlugin = {
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        if (this.loadContent) {
          return this.loadContent()
        }
      },

      async serverPrefetch () {
        if (this.loadContent) {
          await this.loadContent()
        }
      }
    })
  }
}

Vue.use(LoadContentPlugin)
