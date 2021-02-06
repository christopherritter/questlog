<template>
  <v-app dark>
    <nav-bar></nav-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <v-col class="text-center pa-0" cols="12">
        <span>&copy; {{ new Date().getFullYear() }} Christopher Ritter</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "FluidLayout",
  components: {
    NavBar
  }
};
</script>
