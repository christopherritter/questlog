<template>
  <v-app-bar app>
    <v-btn plain nuxt to="/">
      <v-toolbar-title v-text="title" />
    </v-btn>
    <span
      v-if="
        quest &&
          Object.keys(quest).length !== 0 &&
          (this.$route.name === 'quest-player' ||
            this.$route.name === 'quest-reader' ||
            this.$route.name === 'editor')
      "
      class="hidden-sm-and-down"
    >
      <v-btn plain nuxt :to="'/quest/' + quest.questId">{{
        quest.title
      }}</v-btn>
    </span>
    <span
      v-else-if="this.$route.name == 'editor' && quest.questId"
      class="hidden-sm-and-down"
    >
      <v-btn plain nuxt :to="'/quest/' + quest.questId">{{
        quest.title
      }}</v-btn>
    </span>
    <span v-else-if="$store.state.authUser" class="hidden-sm-and-down">
      <v-btn v-show="false" plain nuxt to="/quests">Find a Quest</v-btn>
      <v-btn plain @click="questEditor()">Build your Own!</v-btn>
    </span>

    <v-spacer />
    <span v-if="$store.state.authUser">
      <!-- <v-btn icon nuxt to="/profile/myFavorites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon nuxt to="/profile/myQuests">
        <v-icon>mdi-feather</v-icon>
      </v-btn>
      <v-btn icon nuxt to="/profile">
        <v-icon>mdi-account-box</v-icon>
      </v-btn> -->
      <v-menu close-on-click offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-box</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group color="primary">
            <!-- <v-list-item
              v-for="(item, i) in profileItems"
              :key="i"
              nuxt
              :to="{ name: 'profile', params: { stuff: item.id }}"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item :to="{ name: 'profile' }">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ path: '/profile/myQuests' }">
              <v-list-item-icon>
                <v-icon>mdi-feather</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>My Quests</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </span>
    <!-- <span v-else>
      <v-btn plain nuxt to="/login">
        SignUp / LogIn
      </v-btn>
    </span> -->
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      title: "QuestLog",
      shortcutItems: [
        { text: "My Favorites", icon: "mdi-heart", to: "/myFavorites" },
        { text: "My Quests", icon: "mdi-feather", to: "/myQuests" }
      ],
      profileItems: [
        { id: 0, text: "Update Profile", icon: "mdi-account", to: "/profile" },
        { id: 1, text: "Change Email", icon: "mdi-email", to: "/profile" },
        { id: 0, text: "Change Password", icon: "mdi-lock", to: "/profile" }
      ]
    };
  },
  computed: {
    ...mapState({
      quest: state => state.quest
    })
  },
  methods: {
    ...mapMutations(["CLEAR_QUEST"]),
    questEditor() {
      this.$store.commit("CLEAR_QUEST");
      this.$router.push("/editor");
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
