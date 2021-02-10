<template>
  <v-dialog
    v-model="dialog"
    :persistent="!quest"
    max-width="450"
    @click:outside="$emit('close-dialog')"
  >
    <v-card :dark="false" v-if="!quest">
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
    <v-card v-else>
      <v-card-title>{{ quest.title }}</v-card-title>
      <v-card-subtitle>Objectives</v-card-subtitle>
      <v-list>
        <v-list-item v-for="objective in objectives" :key="objective.id">
          <v-list-item-icon>
            <v-icon color="green" v-if="objective.isComplete"
              >mdi-check-bold</v-icon
            >
            <v-icon color="grey" v-else>mdi-check-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :color="'green'">{{
              objective.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
  props: ["dialog", "quest", "objectives"],
  computed: {
    isComplete() {
      return "mdi-check-bold";
    }
  },
};
</script>
