<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn plain nuxt to="/">
        <v-toolbar-title v-text="title" />
      </v-btn>
      <v-btn plain nuxt to="/quests">Find a Quest</v-btn>
      <v-btn plain nuxt to="/editor">Build your Own!</v-btn>
      <v-spacer />
      <v-btn icon nuxt to="/profile/myFavorites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon nuxt to="/profile/myQuests">
        <v-icon>mdi-feather</v-icon>
      </v-btn>
      <v-menu close-on-click offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-box</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-subheader>PROFILE</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in profileItems" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <nuxt-link :to="item.to">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </nuxt-link>
            </v-list-item>
            <v-list-item @click="logout">
              Logout
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "QuestLog",
      clipped: false,
      fixed: false,
      shortcutItems: [
        { text: "My Favorites", icon: "mdi-heart", to: "/myFavorites" },
        { text: "My Quests", icon: "mdi-feather", to: "/myQuests" },
      ],
      profileItems: [
        { text: "Update Profile", icon: "mdi-account", to: "/profile" },
        { text: "Change Email", icon: "mdi-email", to: "/profile" },
        { text: "Change Password", icon: "mdi-lock", to: "/profile" }
      ]
    };
  },
  methods: {
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
