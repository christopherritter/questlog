<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout class="fill-height">
      <v-navigation-drawer light :width="sidebarWidth" touchless permanent>
        <!-- Replaced width above -->
        <!-- :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'" -->
        <!-- Replaced permanent above -->
        <!-- :permanent="selectedLocation != null ? true : false" -->
        <QuestSidebar
          id="QuestSidebar"
          class="fill-height"
          :objectives="objectives"
          :location="selectedLocation"
          :entries="selectedLocation.entries"
          :actions="locationActions"
          @view-location="viewLocation($event)"
          @select-action="selectAction($event)"
          @view-objective="dialog = true"
        />
        <QuestDialog
          :dialog="dialog"
          :quest="quest"
          :objectives="objectives"
          @open-dialog="dialog = true"
          @close-dialog="dialog = false"
          @restart-quest="restartQuest()"
        />
      </v-navigation-drawer>
      <v-flex style="z-index: 0">
        <LeafletMap
          id="QuestMap"
          ref="qMap"
          class="fill-height"
          :center="quest.region.coordinates"
          :zoom="quest.region.zoom"
          :locations="locations"
          @select-location="viewLocation($event)"
          @clear-location="clearLocation()"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QuestSidebar from "@/components/quest/QuestSidebar.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import QuestDialog from "@/components/quest/QuestDialog.vue";

export default {
  name: "questReader",
  layout: "fluid",
  data() {
    return {
      selectedLocation: {},
      locationActions: [],
      dialog: false,
      loading: false,
      error: null
    };
  },
  mounted() {
    if (this.locations.length > 0) {
      this.viewLocation(0);
    }
  },
  components: { QuestSidebar, LeafletMap, QuestDialog },
  computed: {
    ...mapState({
      quest: state => state.quest,
      objectives: state => state.objectives,
      locations: state => state.locations
    }),
    sidebarWidth() {
      if (Object.keys(this.selectedLocation).length !== 0) {
        return this.$vuetify.breakpoint.smAndUp ? 450 : "85vw";
      } else {
        return 0;
      }
    },
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
              var objective = {};
              Object.assign(objective, this.entries[e].objectives[o]);
              this.$store.dispatch("setObjective", {
                id: objective,
                bool: true
              });
            }
          }
        }
      }

      return locationObjectives;
    }
  },
  methods: {
    ...mapMutations(["SET_OBJECTIVE"]),
    viewLocation(index) {
      const location = this.locations[index];

      this.locationEntries(index);
      this.selectedLocation = location;
      this.zoom = location.zoom;

      this.$refs.qMap.panTo([location.coordinates[0], location.coordinates[1]]);
    },
    locationEntries(locationId) {
      const location = this.locations[locationId];
      const entries = location.entries;

      var locationActions = [];

      for (var e = 0; e < location.entries.length; e++) {
        let entryActions = entries[e].actions;
        for (let a = 0; a < entryActions.length; a++) {
          let action = {};
          Object.assign(action, entryActions[a]);
          locationActions.push(action);
        }
      }

      this.locationActions = locationActions;
    },
    selectAction(event) {
      if (event.type == "Move") {
        const index = this.locations
          .map(e => e.locationId)
          .indexOf(event.target);
        this.viewLocation(index);
      }
    },
    clearLocation() {
      this.selectedLocation = {};
      this.locationActions = [];
    },
    restartQuest() {
      this.dialog = false;
      // if (this.quest.startingPoint) {
      //   console.log(this.quest.startingPoint)
      // var index = 0;
      // this.viewLocation(index);
      // } else {
      this.viewLocation(0);
      // }
      for (let i = 0; i < this.objectives.length; i++) {
        this.$store.commit("SET_OBJECTIVE", {
          index: i,
          bool: false
        });
      }
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
