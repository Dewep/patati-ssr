<template>
  <section>
    <h1>Users</h1>

    <p v-if="loading || !users">
      Loading...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <ul v-else>
      <li
        v-for="user in users"
        :key="user.username"
      >
        <RouterLink :to="{ name: 'user', params: { username: user.username } }">
          {{ user.name }} {{ user.email }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loadContent from '../mixins/loadContent'

export default {
  name: 'Users',

  mixins: [ loadContent ],

  metaInfo: {
    title: 'Users'
  },

  computed: {
    ...mapGetters(['usersData']),
    users () {
      return this.usersData.users || null
    },
    error () {
      return this.usersData.error || null
    },
    loading () {
      return this.usersData.loading !== false
    }
  },

  methods: {
    ...mapActions(['loadUsers']),
    async loadContent() {
      if (!this.users && !this.loading) {
        await this.loadUsers({})
      }
    }
  }
}
</script>
