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

        <v-btn color="green darken-1" text nuxt to="/">
          Find a Quest
          <v-icon right dark>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-img v-if="quest.image" :src="quest.image" aspect-ratio="2"></v-img>
      <v-card-title>{{ quest.title }}</v-card-title>
      <v-card-text v-if="isQuestComplete">
        Congratulations! You've completed all the objectives and finished the
        quest. Click the restart button to play again!
      </v-card-text>
      <v-card-text v-else>
        {{ quest.description }}
      </v-card-text>
      <span v-if="objectives.length > 0">
        <v-card-text class="py-0"><h3>Objectives</h3></v-card-text>
        <v-list>
          <v-list-item
            v-for="objective in objectives"
            :key="objective.objectiveId"
          >
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
      </span>

      <v-card-actions v-if="isObjectiveComplete">
        <v-btn text nuxt :to="'/quest/' + quest.questId">
          Stop Quest
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-3" text @click="$emit('restart-quest')">
          Restart Quest
        </v-btn>
        <v-btn color="green darken-3" text @click="$emit('close-dialog')">
          <span v-if="this.$route.name == 'player'">Keep Playing</span>
          <span v-else>Keep Reading</span>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn text nuxt :to="'/quest/' + quest.questId">
          Stop Quest
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-3" text @click="$emit('start-quest')">
          <span v-if="this.$route.name == 'player'">Start Playing</span>
          <span v-else>Start Reading</span>
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
    isObjectiveComplete() {
      if (this.objectives.length == 0) return false;
      for (var i = 0; i < this.objectives.length; i++) {
        if (this.objectives[i].isComplete) return true;
      }
      return false;
    },
    isQuestComplete() {
      if (this.objectives.length == 0) return false;
      for (var i = 0; i < this.objectives.length; i++) {
        if (!this.objectives[i].isComplete) return false;
      }
      return true;
    }
  },
  watch: {
    isQuestComplete() {
      if (true) this.$emit("open-dialog");
    }
  }
};
</script>
