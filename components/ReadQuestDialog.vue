<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">
        Looking for a quest to read?
      </v-card-title>

      <v-card-text>
        QuestLog has numerous quests for you to read. Just head on over to the
        library to browse through our stacks!
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text nuxt to="/quest/library">
          Browse the Library
          <v-icon right dark>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  props: ["dialog"]
};
</script>

<style></style>
