<template>
  <v-sheet>
    <v-img v-if="location.image" height="240" :src="location.image"></v-img>

    <v-card-title>
      {{ location.name }}
    </v-card-title>

    <v-layout v-if="localObjectives.length > 0">
      <v-flex class="px-4">
        <v-chip
          class="mr-2 mb-2"
          color="green"
          outlined
          v-for="objective in localObjectives"
          :key="objective.objectiveId"
          @click="$emit('view-objective', objective.objectiveId)"
        >
          <v-icon class="mr-1">mdi-check-bold</v-icon> {{ objective.name }}
        </v-chip>
      </v-flex>
    </v-layout>

    <div v-for="(entry, index) in entries" :key="index">
      <v-card-text v-if="entryAllowed(entry)">{{ entry.text }}</v-card-text>
    </div>

    <v-list>
      <v-list-item
        v-for="(action, index) in actions"
        :key="index"
        @click="$emit('select-action', action)"
      >
        <v-list-item-icon>
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ action.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QuestSidebar",
  data() {
    return {};
  },
  props: ["location", "entries", "actions", "objectives"],
  computed: {
    localObjectives() {
      var localObjectives = [];
      if (this.entries) {
        const entries = this.entries;

        for (let e = 0; e < entries.length; e++) {
          if (entries[e].objectives.length > 0) {
            for (let i = 0; i < entries[e].objectives.length; i++) {
              var objectiveId = entries[e].objectives[i];
              const index = this.objectives
                .map(obj => obj.objectiveId)
                .indexOf(objectiveId);
              var objective = {};
              Object.assign(objective, this.objectives[index]);
              localObjectives.push(objective);
            }
          }
        }
      }
      return localObjectives;
    }
  },
  watch: {
    localObjectives(val) {
      if (val.length > 0) {
        console.log(val)
        for (let i = 0; i < val.length; i++ ) {
          var objective = val[i];
          if (objective.isComplete != true) {
            this.$store.dispatch("setObjective", { id: objective.objectiveId, bool: true })
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      "setObjective",
    ]),
    entryAllowed(entry) {
      const expiration = entry.expiration;
      const requirements = entry.requirements;
      if (expiration.length <= 0 && requirements.length <= 0) {
        return true;
      }
    }
  }
};
</script>
