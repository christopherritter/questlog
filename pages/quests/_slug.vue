<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex v-if="!mode" class="white--text gray flex shrink darken-3">
        <QuestHeader :quest-id="this.slug" @read-quest="readQuest($event)" />
      </v-flex>
      <v-flex class="flex">
        <v-container fluid class="fill-height pa-0">
          <v-layout fill-height>
            <v-flex v-if="mode" shrink>
              <QuestSidebar
                id="QuestSidebar"
                :location="location"
                :entries="entries"
                :actions="actions"
                @select-action="selectAction($event)"
                class="fill-height"
              />
            </v-flex>
            <v-flex>
              <GoogleMap
                ref="gMap"
                :quest-id="this.slug"
                :position="position"
                :zoom="zoom"
                @view-location="viewLocation($event)"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestHeader from "@/components/QuestHeader.vue";
import QuestSidebar from "@/components/QuestSidebar.vue";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  name: "Quest",
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  },
  data() {
    return {
      mode: null,
      quest: null,
      locations: null,
      location: null,
      entries: null,
      items: null,
      actions: null
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestSidebar, GoogleMap },
  created() {
    const quest = this.$store.state.quests[this.slug];
    const locations = this.$store.state.locations;
    const entries = this.$store.state.entries;
    const items = this.$store.state.items;

    var questLocations = [];
    var questEntries = [];
    var questItems = [];

    for (let l = 0; l < quest.locations.length; l++) {
      questLocations.push(locations[l]); // need to associate with IDs
    }

    for (let e = 0; e < quest.entries.length; e++) {
      questEntries.push(entries[e]); // need to associate with IDs
    }

    for (let i = 0; i < quest.items.length; i++) {
      questItems.push(items[i]); // need to associate with IDs
    }

    this.quest = quest;
    this.locations = questLocations;
    this.entries = questEntries;
    this.items = questItems;
  },
  computed: {
    position() {
      const regionId = this.$store.state.quests[this.slug].region;
      // if (!this.mode) {
      return this.$store.state.regions[regionId].position;
      // } else {
      //   return this.location.position;
      // }
    },
    zoom() {
      const regionId = this.$store.state.quests[this.slug].region;
      return this.$store.state.regions[regionId].zoom;
    }
  },
  methods: {
    readQuest(questId) {
      const quest = this.$store.state.quests[questId];
      const startingPoint = quest.startingPoint;
      const startingLocation = this.$store.state.locations[startingPoint];
      const entries = this.$store.state.entries;

      var locationEntries = [];
      var locationActions = [];

      for (let e = 0; e < startingLocation.entries.length; e++) {
        let startingEntries = entries[startingLocation.entries[e]];
        locationEntries.push(startingEntries);

        let entryActions = startingEntries.actions;
        for (let a = 0; a < entryActions.length; a++) {
          locationActions.push(entryActions[a]);
        }
      }

      this.$store.dispatch("beginQuest", questId);
      this.mode = "read";
      this.location = startingLocation;
      this.entries = locationEntries;
      this.actions = locationActions;

      this.$refs.gMap.setCenter({
        lat: startingLocation.position.lat,
        lng: startingLocation.position.lng
      });
    },
    playQuest() {
      this.mode = "play";
    },
    viewLocation(locationId) {
      const location = this.$store.state.locations[locationId];

      var locationEntries = [];

      for (var e = 0; e < location.entries.length; e++) {
        let entry = this.$store.state.entries[e];
        locationEntries.push(entry);
      }

      this.location = location;
      this.entries = locationEntries;
    },
    selectAction(locationId) {
      const location = this.$store.state.locations[locationId];

      this.$refs.gMap.setCenter({
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
}
</style>
