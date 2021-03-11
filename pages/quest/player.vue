<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">

      <v-col sm="3" v-if="showSidebar" :style="{ width: sidebarWidth }">
        <v-navigation-drawer v-model="showSidebar" light touchless width="100%">
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
            @hide-sidebar="hideSidebar()"
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
      </v-col>

      <v-col col="auto">
        <v-flex style="position: absolute; bottom: 0; right: 0; z-index: 100">
          <v-btn fab color="blue-grey" @click="showJournal = !showJournal; $refs.qMap.offsetMap();" class="mb-2 mr-2" style="display:block">
            <v-icon>mdi-book</v-icon>
          </v-btn>
          <v-btn fab color="blue-grey" @click="showBackpack = !showBackpack" class="mb-2 mr-2" style="display:block">
            <v-icon>mdi-bag-personal</v-icon>
          </v-btn>
        </v-flex>
        <LeafletMap
          id="QuestMap"
          ref="qMap"
          class="fill-height"
          :style="{'z-index': 0, position: 'relative', width: mapWidth }"
          :center="quest.region.coordinates"
          :zoom="quest.region.zoom"
          :locations="locations"
          @select-location="viewLocation($event.locationId)"
          @clear-location="clearLocation()"
        />

      </v-col>

      <v-col sm="3" v-if="showJournal" :style="{ width: journalWidth }">

          <v-navigation-drawer v-model="showJournal" touchless right width="100%">
            <QuestJournal />
          </v-navigation-drawer>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QuestSidebar from "@/components/quest/QuestSidebar.vue";
import QuestJournal from "@/components/quest/QuestJournal.vue";
import QuestDialog from "@/components/quest/QuestDialog.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "QuestPlayer",
  layout: "fluid",
  data() {
    return {
      selectedLocation: {},
      locationActions: [],
      showSidebar: true,
      showJournal: false,
      showBackpack: false,
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
  components: { QuestSidebar, QuestJournal, QuestDialog, LeafletMap },
  computed: {
    ...mapState({
      quest: state => state.quest,
      objectives: state => state.objectives,
      locations: state => state.locations,
      entries: state => state.entries,
      items: state => state.actions
    }),
    sidebarWidth() {
      if (this.showSidebar) {
        return this.$vuetify.breakpoint.smAndUp ? "450px" : "85vw";
      } else {
        return "0";
      }
    },
    mapWidth() {
      if (
        !this.quest ||
        this.showSidebar ||
        this.showJournal ||
        this.showBackpack
      ) {
        return "100%";
      } else {
        return "100vw";
      }
    },
    journalWidth() {
      if (!this.showJournal) {
        return 0;
      }
    },
    backpackWidth() {
      if (!this.showBackpack) {
        return 0;
      }
    }
  },
  methods: {
    ...mapMutations(["SET_OBJECTIVE"]),
    viewLocation(locationId) {
      const locationIndex = this.findLocation(locationId);
      const location = this.locations[locationIndex];

      this.selectedLocation = location;
      this.selectedActions(locationId);
      this.showSidebar = true;
      this.zoom = location.zoom;

      this.$refs.qMap.panTo([location.coordinates[0], location.coordinates[1]]);
    },
    clearLocation() {
      this.selectedLocation = {};
      this.locationActions = [];
    },
    findLocation(locationId) {
      const array = this.locations;
      const attr = "locationId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === locationId) {
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
    },
    selectedActions(locationId) {
      var selectedActions = [];
      for (var e = 0; e < this.entries.length; e++) {
        if (this.entries[e].location == locationId) {
          let entryActions = this.entries[e].actions;
          for (let a = 0; a < entryActions.length; a++) {
            let action = {};
            Object.assign(action, entryActions[a]);
            selectedActions.push(action);
          }
        }
      }
      this.locationActions = selectedActions;
    },
    selectAction(event) {
      if (event.type == "Move") {
        this.viewLocation(event.target);
      }
    },
    hideSidebar() {
      this.showSidebar = false;
      this.$refs.qMap.offsetMap();
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
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
