<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          SignUp / LogIn
        </v-card-title>
        <v-card-text v-if="!isLoggedIn">
          <v-form onsubmit="return false;">
            <v-text-field
              v-model="formData.email"
              label="Email Address"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="formData.password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text v-else>
          <p>You are logged in with {{ authUser.email }}.</p>
        </v-card-text>
        <v-card-actions v-if="!isLoggedIn">
          <v-spacer></v-spacer>
          <v-btn @click="createUser">
            Register
          </v-btn>
          <v-btn color="primary" @click="signInUser">
            Sign In
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn color="primary" block outlined @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: 'home',
  computed: {
    ...mapState({
      authUser: (state) => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  data: () => ({
    formData: {
      email: "",
      password: ""
    }
  }),
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
      } catch (e) {
        alert(e);
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
      } catch (e) {
        alert(e);
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
