<template>
  <v-container fluid :class="{ 'fill-height': fillHeight, 'pa-0': true }">
    <v-row no-gutters :class="{ 'fill-height': fillHeight }">
      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndUp ? showSidebar : true"
        :order="$vuetify.breakpoint.smAndUp ? 1 : 2"
      >
        <v-navigation-drawer
          id="SidebarDrawer"
          v-model="showSidebar"
          light
          touchless
          stateless
          width="100%"
        >
          <!-- Replaced width above -->
          <!-- :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'" -->
          <!-- Replaced permanent above -->
          <!-- :permanent="selectedLocation != null ? true : false" -->
          <QuestSidebar
            id="QuestSidebar"
            :class="{ 'fill-height': fillHeight }"
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

      <v-col col="auto" :order="$vuetify.breakpoint.smAndUp ? 2 : 1" style="position:relative">
        <v-flex class="fabButtons d-flex flex-row mb-6">
          <v-flex
            class="d-flex flex-row-reverse"
            v-if="$vuetify.breakpoint.smAndUp"
          >
            <v-btn
              fab
              color="blue-grey"
              @click="toggleLegend()"
              class="mt-2 mr-2"
            >
              <v-icon>mdi-map</v-icon>
            </v-btn>
            <v-btn
              fab
              color="blue-grey"
              @click="toggleJournal()"
              class="mt-2 mr-2"
            >
              <v-icon>mdi-book</v-icon>
            </v-btn>
            <v-btn
              fab
              color="blue-grey"
              @click="toggleBackpack()"
              class="mt-2 mr-2"
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
            width: $vuetify.breakpoint.smAndUp ? '100%' : '100vw',
            height: $vuetify.breakpoint.smAndUp ? '100%' : '88px'
          }"
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
        v-if="$vuetify.breakpoint.smAndUp ? showLegend : true"
        order="3"
      >
        <v-navigation-drawer
          id="LegendDrawer"
          v-model="showLegend"
          touchless
          stateless
          width="100%"
        >
          <QuestLegend :locations="locations" />
        </v-navigation-drawer>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndUp ? showJournal : true"
        order="3"
      >
        <v-navigation-drawer
          id="JournalDrawer"
          v-model="showJournal"
          touchless
          stateless
          width="100%"
        >
          <QuestJournal :objectives="objectives" />
        </v-navigation-drawer>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
        v-if="$vuetify.breakpoint.smAndUp ? showBackpack : true"
        order="4"
      >
        <v-navigation-drawer
          id="BackpackDrawer"
          v-model="showBackpack"
          touchless
          stateless
          width="100%"
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
      showSidebar: true,
      showLegend: false,
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
    if (this.$vuetify.breakpoint.mobile) {
      this.showLegend = true;
      this.showJournal = true;
      this.showBackpack = true;
    }
  },
  components: {
    QuestSidebar,
    QuestLegend,
    QuestJournal,
    QuestBackpack,
    QuestDialog,
    LeafletMap
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
      if (this.$vuetify.breakpoint.smAndUp) return true;
      return false;
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
    mapWidth() {
      if (this.$vuetify.breakpoint.smAndUp) return "100%";
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
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
.fabButtons {
  display: block;
  float: left;
  right: 0;
  position: absolute;
  z-index: 10;
}
</style>
