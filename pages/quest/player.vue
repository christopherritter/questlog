<template>
  <v-container fluid :class="{ 'fill-height': fillHeight, 'pa-0': true }">
    <v-row no-gutters :class="{ 'fill-height': fillHeight }">
      <QuestDialog
        :dialog="dialog"
        :quest="quest"
        :objectives="objectives"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
        @restart-quest="restartQuest()"
      />

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
            @select-action="selectAction($event)"
            @view-objective="dialog = true"
            @hide-sidebar="
              preview = false;
              hideSidebar();
            "
          />
        </v-navigation-drawer>
      </v-col>

      <v-col
        col="auto"
        :order="$vuetify.breakpoint.mdAndUp ? 2 : 1"
        style="position:relative"
      >
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
            height: $vuetify.breakpoint.mdAndUp ? '100%' : mapHeight
          }"
          :mapOptions="mapOptions"
          :center="center"
          :zoom="zoom"
          :locations="locations"
          @select-location="viewLocation($event)"
          @preview-location="previewLocation($event)"
          @clear-location="clearLocation()"
          @position-changed="positionChanged($event)"
          @popupclose="
            preview = false;
            popupClose();
          "
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
          <QuestLegend
            :locations="locations"
            @view-location="previewLocation($event)"
          />
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
          <QuestJournal
            :objectives="objectives"
            @view-objective="dialog = true"
          />
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
import { mapState, mapActions, mapMutations } from "vuex";
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
      currentPosition: null,
      selectedLocation: {},
      center: {},
      zoom: 19,
      locationActions: [],
      showSidebar: false,
      showLegend: false,
      showJournal: false,
      showBackpack: false,
      showLocation: false,
      preview: false,
      mapOptions: {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false
      },
      dialog: false,
      error: null
    };
  },
  mounted() {
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
      if (Object.keys(val).length) {
        this.showSidebar = true;
      } else {
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
      if (!this.showLocation) return "64vh";
      return "32vh";
    }
  },
  methods: {
    ...mapActions(["findWithAttr", "setObjective"]),
    ...mapMutations(["SET_OBJECTIVE"]),
    questHelpers() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.showLegend = true;
        this.showJournal = true;
        this.showBackpack = true;
      }
    },
    beginQuest() {
      this.center = this.quest.region.coordinates;
      this.zoom = this.quest.region.zoom;
      // this.dialog = true;
      this.$nextTick(() => {
        this.$refs.qMap.locatePlayer();
      });
    },
    positionChanged(e) {
      this.currentPosition = this.$L.latLng(e.lat, e.lng);
      if (!this.currentPosition) {
        this.currentPosition = this.$L.latLng(
          this.quest.region.coordinates[0],
          this.quest.region.coordinates[1]
        );
      }
      if (!this.showLocation && !this.preview) {
        this.$refs.qMap.panTo(this.currentPosition, 19);
      }
    },
    viewLocation(e) {
      const locationIndex = this.findLocation(e.location.locationId);
      const location = this.locations[locationIndex];
      const latlng = this.$L.latLng(
        location.coordinates[0],
        location.coordinates[1]
      );

      this.selectedLocation = location;
      this.selectedActions(location.locationId);

      this.showSidebar = true;
      this.showLocation = true;

      window.scrollTo(0, 0);

      this.$refs.qMap.redrawMap();
      this.$refs.qMap.panTo(latlng, location.zoom);
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
    previewLocation({ location }) {
      var latLng = this.$L.latLng(
        location.coordinates[0],
        location.coordinates[1]
      );

      this.preview = true;

      window.scrollTo(0, 0);

      this.hideSidebar();
      this.$refs.qMap.fitBounds(latLng);
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
    async selectAction(action) {
      if (action.type == "look") {
        this.$store.dispatch("setObjective", {
          objectiveId: action.target,
          bool: true
        });
      } else if (action.type == "move") {
        var locationIndex = await this.findWithAttr({
          array: this.locations,
          attr: "locationId",
          value: action.target
        });
        var location = this.locations[locationIndex];
        var secondLatLng = this.$L.latLng(
          location.coordinates[0],
          location.coordinates[1]
        );
        this.preview = true;

        this.$nextTick(() => {
          this.$refs.qMap.fitBounds(secondLatLng);
        });
      }
    },
    mapWidth() {
      if (this.$vuetify.breakpoint.mdAndUp) return "100%";
      return "100vw";
    },
    hideSidebar() {
      var latlng, zoom;
      if (this.preview) {
        latlng = this.quest.region.coordinates;
        zoom = this.quest.region.zoom;
        // this.preview = true;
      } else {
        latlng = this.$L.latLng(
          this.currentPosition.lat,
          this.currentPosition.lng
        );
        zoom = 19;
        // this.preview = false;
      }
      this.showSidebar = false;
      this.showLocation = false;
      this.$refs.qMap.redrawMap();
      this.$refs.qMap.panTo(latlng, zoom);
    },
    toggleLegend() {
      var latlng, zoom;
      this.showLegend = !this.showLegend;
      if (this.showLegend || !this.showLocation) {
        latlng = this.quest.region.coordinates;
        zoom = this.quest.region.zoom;
        this.preview = true;
      } else {
        latlng = this.$L.latLng(
          this.currentPosition.lat,
          this.currentPosition.lng
        );
        zoom = 19;
        this.preview = false;
      }
      this.showJournal = false;
      this.showBackpack = false;
      this.$refs.qMap.redrawMap();
      this.$refs.qMap.panTo(latlng, zoom);
    },
    toggleJournal() {
      this.showLegend = false;
      this.showJournal = !this.showJournal;
      this.showBackpack = false;
      this.$refs.qMap.redrawMap();
    },
    toggleBackpack() {
      this.showLegend = false;
      this.showJournal = false;
      this.showBackpack = !this.showBackpack;
      this.$refs.qMap.redrawMap();
    },
    popupClose() {
      var latlng, zoom;
      if (this.preview) {
        latlng = this.quest.region.coordinates;
        zoom = this.quest.region.zoom;
      } else {
        latlng = this.$L.latLng(
          this.currentPosition.lat,
          this.currentPosition.lng
        );
        zoom = 19;
      }
      this.$refs.qMap.redrawMap();
      this.$refs.qMap.panTo(latlng, zoom);
    },
    restartQuest() {
      this.dialog = false;
      if (this.quest.startingPoint && this.quest.startingPoint.length > 0) {
        this.viewLocation({
          location: { locationId: this.quest.startingPoint }
        });
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
.container.fill-height > .row {
  max-width: 100%;
}
#SidebarDrawer,
#LegendDrawer,
#JournalDrawer,
#BackpackDrawer {
  max-height: calc(100vh - 100px);
}
@media only screen and (max-width: 960px) {
  #SidebarDrawer,
  #LegendDrawer,
  #JournalDrawer,
  #BackpackDrawer {
    max-height: 100%;
  }
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
