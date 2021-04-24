<template>
  <v-app dark>
    <nav-bar @read-quest="consoleLog('wassup')"></nav-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-col class="text-center pa-0" cols="12">
        <span>&copy; {{ new Date().getFullYear() }} Christopher Ritter</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "DefaultLayout",
  components: {
    NavBar
  },
  methods: {
    consoleLog(text) {
      console.log(text);
    }
  }
};
</script>
