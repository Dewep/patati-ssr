<template>
  <div id="app">
    <RouterView />

    <p>
      <small><i>VagaDewep</i></small>
      <RouterLink :to="{ name: 'welcome' }">
        Home
      </RouterLink>
    </p>
  </div>
</template>

<script>
export default {
}
</script>
