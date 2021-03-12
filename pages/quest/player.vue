<template>
  <v-container fluid :class="{ 'fill-height': fillHeight, 'pa-0': true }">
    <v-row no-gutters :class="{ 'fill-height': fillHeight }">
      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="showSidebar"
        :order="$vuetify.breakpoint.mdAndUp ? 1 : 2"
      >
        <v-navigation-drawer
          id="SidebarDrawer"
          v-model="showSidebar"
          width="100%"
          light
          touchless
          stateless
        >
          <QuestSidebar
            id="QuestSidebar"
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
        </v-navigation-drawer>
        <QuestDialog
          :dialog="dialog"
          :quest="quest"
          :objectives="objectives"
          @open-dialog="dialog = true"
          @close-dialog="dialog = false"
          @restart-quest="restartQuest()"
        />
      </v-col>

      <v-col col="auto" :order="$vuetify.breakpoint.mdAndUp ? 2 : 1" style="position:relative">
        <v-flex class="tabButtons mb-6">
          <v-flex
            class="d-flex flex-column justify-end"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <v-btn
              fab
              color="red"
              elevation="3"
              @click="toggleLegend()"
              class="tabButton mt-2"
            >
              <v-icon>mdi-map</v-icon>
            </v-btn>
            <v-btn
              fab
              color="blue"
              elevation="3"
              @click="toggleJournal()"
              class="tabButton mt-2"
            >
              <v-icon>mdi-book</v-icon>
            </v-btn>
            <v-btn
              fab
              color="green"
              elevation="3"
              @click="toggleBackpack()"
              class="tabButton mt-2"
            >
              <v-icon>mdi-bag-personal</v-icon>
            </v-btn>
          </v-flex>
        </v-flex>
        <LeafletMap
          id="QuestMap"
          ref="qMap"
          :class="{ 'fill-height': fillHeight }"
          :style="{
            'z-index': 0,
            position: 'relative',
            width: $vuetify.breakpoint.mdAndUp ? '100%' : '100vw',
            height: $vuetify.breakpoint.mdAndUp ? '100%' : mapHeight,
          }"
          :mapOptions="mapOptions"
          :center="quest.region.coordinates"
          :zoom="quest.region.zoom"
          :locations="locations"
          @select-location="viewLocation($event.locationId)"
          @clear-location="clearLocation()"
        />
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndDown ? true : showLegend"
        order="3"
      >
        <v-navigation-drawer
          id="LegendDrawer"
          v-model="showLegend"
          width="100%"
          touchless
          stateless
        >
          <QuestLegend :locations="locations" />
        </v-navigation-drawer>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndDown ? true : showJournal"
        order="3"
      >
        <v-navigation-drawer
          id="JournalDrawer"
          v-model="showJournal"
          width="100%"
          touchless
          stateless
        >
          <QuestJournal :objectives="objectives" />
        </v-navigation-drawer>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndDown ? true : showBackpack"
        order="4"
      >
        <v-navigation-drawer
          id="BackpackDrawer"
          v-model="showBackpack"
          width="100%"
          touchless
          stateless
        >
          <QuestBackpack :items="items" />
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QuestSidebar from "@/components/quest/QuestSidebar.vue";
import QuestLegend from "@/components/quest/QuestLegend.vue";
import QuestJournal from "@/components/quest/QuestJournal.vue";
import QuestBackpack from "@/components/quest/QuestBackpack.vue";
import QuestDialog from "@/components/quest/QuestDialog.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "QuestPlayer",
  layout: "fluid",
  data() {
    return {
      selectedLocation: {},
      locationActions: [],
      showSidebar: false,
      showLegend: false,
      showJournal: false,
      showBackpack: false,
      mapOptions: {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
      },
      dialog: false,
      loading: false,
      error: null,
    };
  },
  created() {
    this.questHelpers();
    this.beginQuest();
  },
  components: {
    QuestSidebar,
    QuestLegend,
    QuestJournal,
    QuestBackpack,
    QuestDialog,
    LeafletMap
  },
  watch: {
    selectedLocation(val) {
      if (Object.keys(val).length <= 0) {
        this.showSidebar = false;
      }
    }
  },
  computed: {
    ...mapState({
      quest: state => state.quest,
      objectives: state => state.objectives,
      locations: state => state.locations,
      entries: state => state.entries,
      items: state => state.actions
    }),
    fillHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) return true;
      return false;
    },
    mapHeight() {
      if (Object.keys(this.selectedLocation).length <= 0) return '280px'
      return '88px'
    }
  },
  methods: {
    ...mapMutations(["SET_OBJECTIVE"]),
    questHelpers() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.showLegend = true;
        this.showJournal = true;
        this.showBackpack = true;
      }
    },
    beginQuest() {
      this.$nextTick(() => {
        this.$refs.qMap.locatePlayer();
      });
    },
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
    mapWidth() {
      if (this.$vuetify.breakpoint.mdAndUp) return "100%";
      return "100vw";
    },
    hideSidebar() {
      this.showSidebar = false;
      this.$refs.qMap.offsetMap();
    },
    toggleLegend() {
      this.showLegend = !this.showLegend;
      this.showJournal = false;
      this.showBackpack = false;
      this.$refs.qMap.offsetMap();
    },
    toggleJournal() {
      this.showLegend = false;
      this.showJournal = !this.showJournal;
      this.showBackpack = false;
      this.$refs.qMap.offsetMap();
    },
    toggleBackpack() {
      this.showLegend = false;
      this.showJournal = false;
      this.showBackpack = !this.showBackpack;
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
    },
  }
};
</script>

<style scoped>
#SidebarDrawer,
#LegendDrawer,
#JournalDrawer,
#BackpackDrawer {
  max-height: calc(100vh - 100px);
}
.tabButtons {
  display: block;
  float: left;
  right: 0;
  position: absolute;
  z-index: 10;
}
.tabButton {
  border-top-left-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 12px;
}
</style>
