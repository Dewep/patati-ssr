export default {
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
}
