<template>
  <div>
    <h1>
      Page not found
    </h1>

    <p>
      Page not found.
      <RouterLink :to="{ name: 'welcome' }">
        Back to the home page.
      </RouterLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'page-not-found',

  metaInfo: {
    title: 'Page not found',
    httpCode: 404
  }
}
</script>
