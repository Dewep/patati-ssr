<template>
  <section>
    <h1>{{ title }}</h1>
    <p v-if="error">
      {{ error }}
    </p>

    <table v-if="user">
      <tbody>
        <tr>
          <th>Name</th>
          <td>{{ user.name }}</td>
        </tr>
        <tr>
          <th>Identifier</th>
          <td>{{ user.id }}</td>
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
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loadContent from '../mixins/loadContent'

export default {
  name: 'User',

  mixins: [ loadContent ],

  props: {
    username: {
      type: String,
      required: true
    }
  },

  metaInfo () {
    return {
      title: this.title
    }
  },

  computed: {
    ...mapGetters(['usersData']),
    users () {
      return this.usersData.users || null
    },
    user () {
      return (this.users || []).find(user => user.username === this.username) || null
    },
    error () {
      if (this.usersData.error) {
        return this.usersData.error
      }
      if (this.users && !this.user) {
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
    username: 'loadContent'
  },

  methods: {
    ...mapActions(['loadUsers']),
    async loadContent () {
      if (!this.users && !this.loading) {
        await this.loadUsers({})
      }
    }
  }
}
</script>
