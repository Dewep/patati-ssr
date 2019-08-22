import axios from 'axios'

const state = {
  usersData: { loading: false, users: null, error: null }
}

const getters = {
  usersData: state => state.usersData
}

const actions = {
  async loadUsers ({ commit }, data) {
    try {
      commit('SET_USERS_STATE', { loading: true, users: null, error: null })
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      commit('SET_USERS_STATE', { loading: false, users: response.data, error: null })
    } catch (err) {
      commit('SET_USERS_STATE', { loading: false, users: null, error: err.message })
    }
  }
}

const mutations = {
  SET_USERS_STATE (state, { loading, users, error }) {
    state.usersData.loading = loading
    state.usersData.users = users
    state.usersData.error = error
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
  }
}
