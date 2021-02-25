<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout>
      <v-navigation-drawer
        v-if="quest"
        class="fill-height"
        light
        :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'"
        :permanent="location ? true : false"
      >
        <QuestSidebar
          v-if="location"
          id="QuestSidebar"
          class="fill-height"
          :location="location"
          :entries="entries"
          :actions="actions"
          :objectives="locationObjectives"
          @view-location="viewLocation($event)"
          @view-objective="dialog = true"
        />
      </v-navigation-drawer>
      <QuestDialog
        :dialog="dialog"
        :quest="quest"
        :objectives="objectives"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
        @restart-quest="restartQuest(quest.id)"
      />
      <v-flex>
        <QuestMap
          id="QuestMap"
          ref="qMap"
          :style="{ width: mapWidth }"
          :position="position"
          :locations="locations"
          :zoom="zoom"
          :mapOptions="mapOptions"
          @view-location="viewLocation($event)"
          @clear-location="clearLocation()"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestSidebar from "@/components/quest/QuestSidebar.vue";
import QuestMap from "@/components/quest/QuestMap.vue";
import QuestDialog from "@/components/quest/QuestDialog.vue";

export default {
  name: "questReader",
  layout: "fluid",
  data() {
    return {
      quest: null,
      position: {
        lat: 39.828175,
        lng: -98.5795
      },
      region: null,
      locations: null,
      location: null,
      zoom: 4,
      entries: null,
      items: null,
      actions: null,
      startingPoint: null,
      mapOptions: {},
      dialog: false
    };
  },
  created() {
    const quest = this.$store.state.quest;
    if (quest) {
      const region = this.$store.state.demoData.regions[quest.region];
      const locations = this.$store.state.demoData.locations;
      const location = this.$store.state.demoData.locations[0];
      const startingPoint = locations[quest.startingPoint];

      this.quest = quest;
      this.region = region;
      this.zoom = region.zoom;
      this.locations = locations;
      this.location = location;
      this.position = startingPoint.position;

      this.locationEntries(location.id);
    } else {
      this.dialog = true;
    }
  },
  components: { QuestSidebar, QuestMap, QuestDialog },
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
    viewLocation(id) {
      const location = this.$store.state.demoData.locations[id];

      this.locationEntries(id);

      this.location = location;
      // this.zoom = location.zoom;

      this.$refs.qMap.setCenter({
        lat: location.position.lat,
        lng: location.position.lng
      });
    },
    locationEntries(locationId) {
      const location = this.$store.state.demoData.locations[locationId];
      const entries = this.$store.state.demoData.entries;

      var locationEntries = [];
      var locationActions = [];

      for (var e = 0; e < location.entries.length; e++) {
        locationEntries.push(entries[location.entries[e]]);

        let entryActions = entries[location.entries[e]].actions;
        for (let a = 0; a < entryActions.length; a++) {
          locationActions.push(entryActions[a]);
        }
      }

      this.entries = locationEntries;
      this.actions = locationActions;
    },
    clearLocation() {
      this.location = null;
      this.entries = null;
      this.actions = null;
      this.items = null;
    },
    restartQuest() {
      const location = this.$store.state.demoData.locations[0];
      const startingPoint = this.$store.state.demoData.locations[this.quest.startingPoint];

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
