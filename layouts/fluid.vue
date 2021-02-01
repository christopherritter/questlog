<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue"

export default {
  components: {
    NavBar
  }
};
</script>
