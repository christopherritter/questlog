<template>
  <v-sheet>
    <v-img v-if="location.image" height="240" :src="location.image"></v-img>

    <v-row no-gutters>
      <v-card-title>
        {{ location.name }}
      </v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-3 my-4"
        fab
        dark
        x-small
        outlined
        color="grey"
        @click="$emit('hide-sidebar')"
      >
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
      <v-card-text>{{ entry.text }}</v-card-text>
    </div>

    <v-list>
      <v-list-item
        v-for="(action, index) in localActions"
        :key="index"
        @click="selectAction(action)"
      >
        <v-list-item-icon>
          <v-icon>{{ action.marker }}</v-icon>
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
  props: ["objectives", "location", "entries", "items"],
  computed: {
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
    },
    localEntries() {
      const items = this.items;
      const locationId = this.location.locationId;
      var localEntries = [];

      this.entries.forEach(entry => {
        if (entry.location == locationId) {
          if (entry.expiration.length > 0) {
            entry.expiration.forEach(expirationId => {
              this.objectives.forEach(objective => {
                if (
                  expirationId == objective.objectiveId &&
                  !objective.isComplete
                ) {
                  checkOwnedItems(entry);
                }
              });
            });
          } else if (entry.requirements.length > 0) {
            entry.requirements.forEach(requirementId => {
              this.objectives.forEach(objective => {
                if (
                  requirementId == objective.objectiveId &&
                  objective.isComplete
                ) {
                  checkOwnedItems(entry);
                }
              });
            });
          } else {
            console.log("no restrictions")
            console.log(entry)
            checkOwnedItems(entry);
          }
        }
      });

      function checkOwnedItems(entry) {
        if (entry.actions.length > 0) {
          entry.actions.forEach(action => {
            if (action.type == "take") {
              items.forEach(item => {
                if (!item.isOwned) {
                  localEntries.push(entry);
                }
              });
            } else {
              localEntries.push(entry);
            }
          });
        } else {
          localEntries.push(entry);
        }
      }

      return localEntries.sort((a, b) => (a.order > b.order) ? 1 : -1);
    },
    localActions() {
      var localActions = [];
      for (var e = 0; e < this.localEntries.length; e++) {
        let entryActions = this.localEntries[e].actions;
        for (let a = 0; a < entryActions.length; a++) {
          let action = {};
          Object.assign(action, entryActions[a]);
          localActions.push(action);
        }
      }
      return localActions;
    }
  },
  methods: {
    ...mapActions(["setObjective", "findWithAttr"]),
    findObjective(objectiveId) {
      const array = this.objectives;
      const attr = "objectiveId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === objectiveId) {
          return i;
        }
      }
      return -1;
    },
    selectAction(action) {
      this.$emit("select-action", action);
    }
  }
};
</script>
