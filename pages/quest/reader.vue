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
            @select-action="selectAction($event)"
            @view-objective="dialog = true"
            @hide-sidebar="hideSidebar()"
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
          @preview-location="viewLocation($event)"
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
          <QuestLegend
            :locations="locations"
            @view-location="viewLocation($event)"
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
  name: "QuestReader",
  layout: "fluid",
  data() {
    return {
      // currentPosition: null,
      selectedLocation: {},
      center: {},
      zoom: 19,
      showSidebar: false,
      showLegend: false,
      showJournal: false,
      showBackpack: false,
      showLocation: false,
      mapOptions: {
        zoomControl: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        boxZoom: true,
        keyboard: true,
        minZoom: 16,
        maxZoom: 18,
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
      items: state => state.items
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
      if (this.quest.startingPoint && this.quest.startingPoint.length > 0) {
        this.viewLocation({
          location: { locationId: this.quest.startingPoint }
        });
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
      this.showSidebar = true;
      this.showLocation = true;

      this.$refs.qMap.redrawMap();
      this.$refs.qMap.panTo(latlng, location.zoom);
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
          this.viewLocation({ location });
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
      var latlng, zoom;
      if (this.showLegend) {
        latlng = this.quest.region.coordinates;
        zoom = this.quest.region.zoom;
      } else {
        latlng = this.$L.latLng(
          this.selectedLocation.coordinates[0],
          this.selectedLocation.coordinates[1]
        );
        zoom = 19;
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
      } else {
        latlng = latlng = this.$L.latLng(
          this.selectedLocation.coordinates[0],
          this.selectedLocation.coordinates[1]
        );
        zoom = 19;
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
  z-index: 5;
}
.tabButton {
  border-top-left-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 12px;
}
</style>
