<template>
  <v-sheet>
    <v-img v-if="location.image" height="240" :src="location.image"></v-img>

    <v-row no-gutters>
      <v-card-title>
        {{ location.name }}
      </v-card-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-3 my-4" fab dark x-small outlined color="grey" @click="$emit('hide-sidebar')">
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
    </v-row>

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

    <div v-for="(entry, index) in localEntries" :key="index">
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
  props: ["objectives", "location", "entries", "items", "actions"],
  computed: {
    localEntries() {
      const locationId = this.location.locationId;
      var localEntries = [];

      for (let e = 0; e < this.entries.length; e++) {
        if (this.entries[e].location == locationId) {
          localEntries.push(this.entries[e]);
        }
      }

      return localEntries;
    },
    localObjectives() {
      var localObjectives = [];

      for (let e = 0; e < this.localEntries.length; e++) {
        for (let o = 0; o < this.localEntries[e].objectives.length; o++) {
          var localObjectives = [];

          this.localEntries[e].objectives.forEach(objectiveId => {
            var index = this.findObjective(objectiveId);
            this.$store.dispatch("setObjective", {
              objectiveId: objectiveId,
              bool: true
            });
            localObjectives.push(this.objectives[index]);
          });
        }
      }

      return localObjectives;
    }
  },
  methods: {
    ...mapActions(["setObjective", "findWithAttr"]),
    entryAllowed(entry) {
      //   const expiration = entry.expiration;
      //   const requirements = entry.requirements;
      //   if (expiration.length <= 0 && requirements.length <= 0) {
      return true;
      //   }
    },
    findObjective(objectiveId) {
      const array = this.objectives;
      const attr = "objectiveId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === objectiveId) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>
