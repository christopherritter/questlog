<template>
  <h1>Profile</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "profile",
  middleware: "authenticated",
  computed: {
    ...mapState({
      authUser: state => state.authUser,
      users: state => state.users,
    }),
    user() {
      const user = this.authUser;
      return this.users[user.uid];
    }
  }
};
</script>
