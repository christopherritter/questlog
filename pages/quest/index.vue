<template>
  <h1>Redirect to Library</h1>
</template>

<script>
export default {
  mounted() {
    window.onNuxtReady(() => { window.$nuxt.$router.push('/library') });
  },
}
</script>
