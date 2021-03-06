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
          :entries="entries"
          :items="items"
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
          @select-location="viewLocation($event.locationId)"
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
  name: "QuestReader",
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
    if (this.quest.startingPoint.length > 0) {
      this.viewLocation(this.quest.startingPoint);
    }
  },
  components: { QuestSidebar, LeafletMap, QuestDialog },
  computed: {
    ...mapState({
      quest: state => state.quest,
      objectives: state => state.objectives,
      locations: state => state.locations,
      entries: state => state.entries,
      items: state => state.actions
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
    }
  },
  methods: {
    ...mapMutations(["SET_OBJECTIVE"]),
    viewLocation(locationId) {
      const locationIndex = this.findWithAttr(locationId);
      const location = this.locations[locationIndex];

      this.locationEntries(locationIndex);
      this.selectedLocation = location;
      this.zoom = location.zoom;

      this.$refs.qMap.panTo([location.coordinates[0], location.coordinates[1]]);
    },
    locationEntries(index) {
      const location = this.locations[index];
      const localEntries = location.entries;
      var locationActions = [];

      for (var e = 0; e < localEntries.length; e++) {
        const index = this.findEntry(localEntries[e]);
        let entryActions = this.entries[index].actions;
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
        this.viewLocation(event.target);
      }
    },
    clearLocation() {
      this.selectedLocation = {};
      this.locationActions = [];
    },
    restartQuest() {
      this.dialog = false;
      if (this.quest.startingPoint.length > 0) {
        this.viewLocation(this.quest.startingPoint);
      }
      for (let i = 0; i < this.objectives.length; i++) {
        this.$store.commit("SET_OBJECTIVE", {
          index: i,
          bool: false
        });
      }
    },
    findWithAttr(value) {
      const array = this.locations;
      const attr = "locationId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    findEntry(entryId) {
      const array = this.entries;
      const attr = "entryId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === entryId) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
