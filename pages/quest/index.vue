<template>
  <h1>Redirect to Quests</h1>
</template>

<script>
export default {
  mounted() {
    window.onNuxtReady(() => { window.$nuxt.$router.push('/quests') });
  },
}
</script>
