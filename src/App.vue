<template>
  <div id="app">
    <h1>Je suis un Developpeur</h1>
    <h2>by Dewep & Vaga</h2>
    <nav>
      <RouterLink :to="{ name: 'welcome' }">
        Welcome
      </RouterLink>
      <RouterLink :to="{ name: 'users' }">
        Users
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
