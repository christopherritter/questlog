<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout>
      <v-navigation-drawer
        v-if="quest"
        class="fill-height"
        light
        :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'"
        :permanent="selectedLocation ? true : false"
      >
        <QuestSidebar
          v-if="selectedLocation"
          id="QuestSidebar"
          class="fill-height"
          :location="selectedLocation"
          :entries="selectedLocation.entries"
          :objectives="quest.objectives"
          @view-location="viewLocation($event)"
          @view-objective="dialog = true"
        />
      </v-navigation-drawer>
      <QuestDialog
        :dialog="dialog"
        :quest="quest"
        :objectives="quest.objectives"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
        @restart-quest="restartQuest(quest.questId)"
      />
      <v-flex>
        <LeafletMap
          id="QuestMap"
          ref="qMap"
          class="fill-height"
          :style="{ width: mapWidth }"
          :center="quest.region.coordinates"
          :zoom="quest.region.zoom"
          :locations="quest.locations"
          @select-location="viewLocation($event)"
          @clear-location="clearLocation()"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestSidebar from "@/components/quest/QuestSidebar.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import QuestDialog from "@/components/quest/QuestDialog.vue";

export default {
  name: "questReader",
  layout: "fluid",
  data() {
    return {
      quest: {},
      selectedLocation: null,
      dialog: false
    };
  },
  created() {
    const quest = this.$store.state.quest;
    if (quest) {
      Object.assign(this.quest, quest)
    } else {
      this.dialog = true;
    }
  },
  components: { QuestSidebar, LeafletMap, QuestDialog },
  computed: {
    ...mapState({
      objectives: state => state.demoData.objectives
    }),
    mapWidth() {
      if (!this.quest) {
        return "100%";
      } else if (this.location) {
        return "100%";
      } else {
        return "100vw";
      }
    },
    locationObjectives() {
      var locationObjectives = [];

      if (this.entries) {
        for (let e = 0; e < this.entries.length; e++) {
          if (this.entries[e].objectives) {
            for (let o = 0; o < this.entries[e].objectives.length; o++) {
              this.$store.dispatch("updateObjective", {
                id: this.entries[e].objectives[o],
                bool: true
              });
              locationObjectives.push(
                this.objectives[this.entries[e].objectives[o]]
              );
            }
          }
        }
      }

      return locationObjectives;
    }
  },
  methods: {
    viewLocation(index) {
      const location = this.quest.locations[index];
      // console.log(location)
      // this.locationEntries(index);

      this.selectedLocation = location;
      this.zoom = location.zoom;

      this.$refs.qMap.panTo([
        location.coordinates[0],
        location.coordinates[1]
      ]);
    },
    // locationEntries(locationId) {
    //   const location = this.quest.locations[locationId];
    //   const entries = location.entries;

    //   var locationEntries = [];
    //   var locationActions = [];

    //   for (var e = 0; e < location.entries.length; e++) {
    //     locationEntries.push(entries[location.entries[e]]);

    //     let entryActions = entries[location.entries[e]].actions;
    //     for (let a = 0; a < entryActions.length; a++) {
    //       locationActions.push(entryActions[a]);
    //     }
    //   }

    //   this.entries = locationEntries;
    //   this.actions = locationActions;
    // },
    clearLocation() {
      this.location = null;
      this.entries = null;
      this.actions = null;
      this.items = null;
    },
    restartQuest() {
      const location = this.locations[0];
      const startingPoint = this.quest.startingPoint;

      for (let o = 0; o < this.objectives.length; o++) {
        this.$store.dispatch("updateObjective", {
          id: o,
          bool: false
        });
      }
      this.location = location;
      this.position = startingPoint.position;

      this.locationEntries(location.id);

      this.dialog = false;
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
