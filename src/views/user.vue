<template>
  <div>
    <h1 class="welcome">
      {{ title }}
    </h1>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <div v-if="user">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <th>Identifier</th>
            <td><code>#{{ user.id }} : {{ user.username }}</code></td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ user.phone }}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td><a :href="user.website">{{ user.website }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'user',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['usersData']),
    users () {
      return this.usersData.users || null
    },
    user () {
      return (this.usersData.users || []).find(user => user.username === this.username) || null
    },
    error () {
      if (this.usersData.error) {
        return this.usersData.error
      }
      if (!this.user) {
        return 'This user does not exist!'
      }
      return null
    },
    loading () {
      return this.usersData.loading !== false
    },
    title () {
      if (this.user) {
        return this.user.name
      }
      if (this.error) {
        return 'Error...'
      }
      return 'Fetching the user...'
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