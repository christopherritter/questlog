<template>
  <v-container fluid :class="{ 'fill-height': fillHeight, 'pa-0': true }">
    <v-row no-gutters :class="{ 'fill-height': fillHeight }">
      <QuestDialog
        :dialog="dialog"
        :quest="quest"
        :objectives="objectives"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
        @start-quest="beginQuest()"
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
        <QuestMap
          id="QuestMap"
          ref="qMap"
          :class="{ 'fill-height': fillHeight }"
          :style="{
            'z-index': 0,
            position: 'relative',
            width: $vuetify.breakpoint.mdAndUp ? '100%' : '100vw',
            height: $vuetify.breakpoint.mdAndUp ? '100%' : mapHeight
          }"
          :mapStyle="mapStyle"
          :center="center"
          :pitch="pitch"
          :bearing="bearing"
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
          @loaded="onLoad"
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
import QuestMap from "@/components/QuestMap.vue";
import { point } from "@turf/helpers";
import distance from "@turf/distance";

export default {
  name: "QuestPlayer",
  layout: "fluid",
  data() {
    return {
      currentPosition: null,
      selectedLocation: {},
      center: {},
      pitch: 60,
      bearing: 0,
      zoom: 19,
      showSidebar: false,
      showLegend: false,
      showJournal: false,
      showBackpack: false,
      showLocation: false,
      preview: false,
      mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
      minimumDistance: 0.01,
      dialog: false,
      error: null
    };
  },
  components: {
    QuestSidebar,
    QuestLegend,
    QuestJournal,
    QuestBackpack,
    QuestDialog,
    QuestMap
  },
  created() {
    this.questHelpers();
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
    ...mapMutations(["SET_OBJECTIVE", "SET_OWNED"]),
    onLoad() {
      this.dialog = true;
    },
    questHelpers() {
      this.center = this.quest.region.coordinates;
      this.zoom = this.quest.region.zoom;
      // this.dialog = true;
      if (this.$vuetify.breakpoint.smAndDown) {
        this.showLegend = true;
        this.showJournal = true;
        this.showBackpack = true;
      }
    },
    beginQuest() {
      this.$refs.qMap.triggerGeolocate();
      this.dialog = false;
    },
    positionChanged(e) {
      this.currentPosition = e;
    },
    async viewLocation(e) {
      const locationIndex = await this.findLocation(e.location.locationId);
      const location = this.locations[locationIndex];

      var currentPosition = this.currentPosition;
      var targetLocation = [location.coordinates[1], location.coordinates[0]];

      var from = point(currentPosition);
      var to = point(targetLocation);
      var options = { units: "miles" };

      var totalDistance = distance(from, to, options);

      if (totalDistance > this.minimumDistance) {
        this.previewLocation({ location });
      } else {
        this.selectedLocation = location;
        this.bearing = location.bearing;
        this.pitch = location.pitch;
        this.showSidebar = true;
        this.showLocation = true;

        window.scrollTo(0, 0);

        this.$refs.qMap.redrawMap();
        this.$nextTick().then(() =>
          this.$refs.qMap.flyTo({
            center: [location.coordinates[1], location.coordinates[0]],
            zoom: location.zoom
          })
        );
      }
    },
    clearLocation() {
      this.selectedLocation = {};
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
      var targetLocation = [location.coordinates[1], location.coordinates[0]];

      this.preview = true;

      window.scrollTo(0, 0);

      // this.hideSidebar();
      this.$refs.qMap.fitBounds([this.currentPosition, targetLocation]);
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
    async selectAction(action) {
      switch (action.type) {
        case "look":
          this.$store.dispatch("setObjective", {
            objectiveId: action.target,
            bool: true
          });
          break;
        case "move":
          var locationIndex = await this.findWithAttr({
            array: this.locations,
            attr: "locationId",
            value: action.target
          });
          var location = this.locations[locationIndex];
          var currentLocation = [
            this.selectedLocation.coordinates[1],
            this.selectedLocation.coordinates[0]
          ];
          var targetLocation = [
            location.coordinates[1],
            location.coordinates[0]
          ];
          this.preview = true;
          // this.showSidebar = false;
          // this.showLocation = false;

          this.$nextTick(() => {
            this.$refs.qMap.fitBounds([currentLocation, targetLocation]);
          });
          break;
        case "take":
          var itemIndex = await this.findWithAttr({
            array: this.items,
            attr: "itemId",
            value: action.target
          });
          this.$store.commit("SET_OWNED", { index: itemIndex, bool: true });
          break;
        case "use":
          var entryIndex = await this.findWithAttr({
            array: this.entries,
            attr: "entryId",
            value: action.entry
          });
          var entry = this.entries[entryIndex];
          entry.objectives.forEach(objectiveId => {
            this.$store.dispatch("setObjective", {
              objectiveId: objectiveId,
              bool: true
            });
          });
          break;
      }
    },
    mapWidth() {
      if (this.$vuetify.breakpoint.mdAndUp) return "100%";
      return "100vw";
    },
    hideSidebar() {
      this.showSidebar = false;
      this.showLocation = false;
      this.$refs.qMap.redrawMap();

      if (this.preview) {
        this.showAllLocations();
      } else {
        this.$nextTick(() => {
          this.$refs.qMap.triggerGeolocate();
        });
      }
    },
    toggleLegend() {
      this.showLegend = !this.showLegend;
      this.showJournal = false;
      this.showBackpack = false;

      this.$refs.qMap.redrawMap();

      if (this.showLegend) {
        this.showAllLocations();
        this.preview = true;
      } else {
        this.$nextTick(() => {
          this.$refs.qMap.triggerGeolocate();
        });
        this.preview = false;
      }
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
    async showAllLocations() {
      var allLocations = [];

      this.locations.forEach(location => {
        var coords = [location.coordinates[1], location.coordinates[0]];
        allLocations.push(coords);
      });

      var latLngBounds = await new this.$refs.qMap.map.LngLatBounds(
        allLocations[0].coordinates,
        allLocations[0].coordinates
      );
      var bounds = allLocations.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, latLngBounds);

      this.$refs.qMap.fitBounds(bounds);
    },
    popupClose() {
      // var latlng, zoom;
      // if (this.preview) {
      //   latlng = this.quest.region.coordinates;
      //   zoom = this.quest.region.zoom;
      // } else {
      //   latlng = this.currentPosition;
      //   zoom = this.selectedLocation.zoom;
      // }
      this.$refs.qMap.redrawMap();
      this.$nextTick(() => {
        this.$refs.qMap.triggerGeolocate();
      });
    },
    restartQuest() {
      this.dialog = false;
      if (this.quest.startingPoint && this.quest.startingPoint.length > 0) {
        this.viewLocation({
          location: { locationId: this.quest.startingPoint }
        });
      }
      for (let o = 0; o < this.objectives.length; o++) {
        this.$store.commit("SET_OBJECTIVE", {
          index: o,
          bool: false
        });
      }
      for (let i = 0; i < this.items.length; i++) {
        this.$store.commit("SET_OWNED", {
          index: i,
          bool: false
        });
      }
    },
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
  z-index: 5;
}
.tabButton {
  border-top-left-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 12px;
}
</style>
