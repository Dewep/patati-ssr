export default store => {
  store.subscribe(({ type, payload }, state) => {
    console.info('COMMIT', type)
  })
}
