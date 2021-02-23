<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6" class="offset-sm-2 offset-md-3">
        <v-card>
          <v-card-title class="headline">
            SignUp / LogIn
          </v-card-title>
          <v-card-text>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="createUser">
              Register
            </v-btn>
            <v-btn color="primary" @click="signInUser">
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState({
      authUser: state => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
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
        await this.$fire.auth
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          // .then(() => this.$router.push({ name: 'profile' }));
          // .then(() => this.$router.back());
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
