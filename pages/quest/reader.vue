<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout :class="$vuetify.breakpoint.mdAndUp ? 'fill-height' : 'column'">
      <v-flex v-if="mode" shrink>
        <QuestSidebar
          id="QuestSidebar"
          :location="location"
          :entries="entries"
          :actions="actions"
          @view-location="viewLocation($event)"
          class="fill-height"
        />
      </v-flex>
      <v-flex>
        <QuestMap
          id="QuestMap"
          ref="QuestMap"
          :quest-id="quest.id"
          :position="position"
          :locations="locations"
          :zoom="zoom"
          @view-location="viewLocation($event)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestSidebar from "@/components/QuestSidebar.vue";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "playQuest",
  data() {
    return {
      quest: null,
      locations: null,
      location: null,
      zoom: null,
      entries: null,
      items: null,
      actions: null
    };
  },
  layout: "fluid",
  components: { QuestSidebar, QuestMap },
  created() {
    const quest = this.$store.state.quest;
    const region = this.$store.state.regions[quest.region];
    const locations = this.$store.state.locations;

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
    this.locations = locations;
  },
  computed: {
    position() {
      const regionId = quest.region;
      // if (!this.mode) {
      return this.$store.state.regions[regionId].position;
      // } else {
      //   return this.location.position;
      // }
    }
  },
  methods: {
    viewLocation(id) {
      console.log("View location for id " + id);
      const location = this.$store.state.locations[id];
      const entries = this.$store.state.entries;

      console.log("Location result:");
      console.log(location);

      var locationEntries = [];
      var locationActions = [];

      for (var e = 0; e < location.entries.length; e++) {
        locationEntries.push(entries[location.entries[e]]);

        let entryActions = entries[location.entries[e]].actions;
        for (let a = 0; a < entryActions.length; a++) {
          locationActions.push(entryActions[a]);
        }
      }

      console.log("Location entries:");
      console.log(locationEntries);

      console.log("Location actions:");
      console.log(locationActions);

      this.location = location;
      // this.zoom = location.zoom;
      this.entries = locationEntries;
      this.actions = locationActions;

      this.$refs.QuestMap.setCenter({
        lat: location.position.lat,
        lng: location.position.lng
      });
    }
  }
};
</script>

<style>
#QuestSidebar {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
@media only screen and (max-width: 960px) {
  #QuestSidebar {
    max-height: 65vh;
  }
}
</style>
