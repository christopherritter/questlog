<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout>
      <v-navigation-drawer
        class="fill-height" light
        :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'"
        :permanent="permanent"
      >
        <QuestSidebar
          id="QuestSidebar"
          :location="location"
          :entries="entries"
          :actions="actions"
          @view-location="viewLocation($event)"
          class="fill-height"
        />
      </v-navigation-drawer>
      <v-flex>
        <QuestMap
          :style="{ width: mapWidth }"
          id="QuestMap"
          ref="qMap"
          :quest-id="quest.id"
          :position="position"
          :locations="locations"
          :zoom="zoom"
          :mapOptions="mapOptions"
          @view-location="viewLocation($event)"
          @clear-location="permanent = false"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestSidebar from "@/components/QuestSidebar.vue";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "reader",
  async asyncData({ params }) {
    const questId = params.questId; // When calling /abc the questId will be "abc"
    return { questId };
  },
  data() {
    return {
      quest: null,
      locations: null,
      location: null,
      region: null,
      zoom: null,
      startingPoint: null,
      entries: null,
      items: null,
      actions: null,
      mapOptions: {},
      permanent: true,
    };
  },
  layout: "fluid",
  components: { QuestSidebar, QuestMap },
  created() {
    const quest = this.$store.state.quests[this.questId];
    const region = this.$store.state.regions[quest.region];
    const locations = this.$store.state.locations;
    const location = this.$store.state.locations[0];
    const startingPoint = locations[quest.startingPoint];

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
    this.locations = locations;
    this.location = location;
    this.position = startingPoint.position;

    this.gatherEntries(location.id);
  },
  computed: {
    mapWidth() {
      if (this.permanent) {
        return '100%'
      } else {
        return '100vw'
      }
    }
  },
  methods: {
    viewLocation(id) {
      const location = this.$store.state.locations[id];

      this.gatherEntries(id);

      this.location = location;
      // this.zoom = location.zoom;

      this.permanent = true;

      this.$refs.qMap.setCenter({
        lat: location.position.lat,
        lng: location.position.lng
      });
    },
    gatherEntries(locationId) {
      const location = this.$store.state.locations[locationId];
      const entries = this.$store.state.entries;

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
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
