<template>
  <div>
    <h1 class="welcome">
      Patati &amp; Patata
      <RouterLink :to="{ name: 'about' }">
        <small>about</small>
      </RouterLink>
    </h1>

    <div v-if="loading || !users" />

    <p v-else-if="error" class="error">
      {{ error }}
    </p>

    <ul v-else>
      <li
        v-for="user in users"
        :key="user.username"
      >
        <RouterLink :to="{ name: 'user', params: { userSlug: user.username } }">
          {{ user.name }} <small>{{ user.email }}</small>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'welcome',

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

  watch: {
    users: {
      immediate: true,
      handler () {
        if (!this.users && !this.loading) {
          this.loadUsers({})
        }
      }
    }
  },

  methods: {
    ...mapActions(['loadUsers'])
  }
}
</script>

<style lang="scss">
@import 'variables.scss';

h1.welcome {
  color: $warning-color;
}
</style>
