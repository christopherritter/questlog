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
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "DefaultLayout",
  data() {
    return {
      mode: null,
    }
  },
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
