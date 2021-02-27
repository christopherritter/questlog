<template>
  <v-dialog
    v-model="dialog"
    :persistent="!quest"
    max-width="450"
    @click:outside="$emit('close-dialog')"
    light
  >
    <v-card v-if="!quest">
      <v-card-title class="headline">
        Looking for a quest to read?
      </v-card-title>

      <v-card-text>
        QuestLog has numerous quests for you to read. Just head on over to the
        library to browse through our stacks!
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text nuxt to="/quests">
          Find a Quest
          <v-icon right dark>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>{{ quest.title }}</v-card-title>
      <v-card-text v-if="isQuestComplete">
        Congratulations! You've completed all the objectives and finished the
        quest. Click the restart button to play again!
      </v-card-text>
      <v-card-text class="py-0"><h3>Objectives</h3></v-card-text>
      <v-list>
        <v-list-item v-for="objective in objectives" :key="objective.objectiveId">
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

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-3" text @click="$emit('restart-quest')">
          Restart Quest
        </v-btn>
        <v-btn color="green darken-3" text @click="$emit('close-dialog')">
          Keep Playing
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
  props: ["dialog", "quest", "objectives"],
  computed: {
    isQuestComplete() {
      for (var o = 0; o < this.objectives.length; o++) {
        if (!this.objectives[o].isComplete) return false;
        return true;
      }
    }
  },
  watch: {
    isQuestComplete() {
      if (true) this.$emit("open-dialog");
    }
  }
};
</script>
