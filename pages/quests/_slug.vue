<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex v-if="!mode" class="white--text gray flex shrink darken-3">
        <QuestHeader
          :quest-id="this.slug"
          @read-quest="readQuest()"
          @play-quest="playQuest()"
        />
      </v-flex>
      <v-flex class="flex">
        <v-container fluid class="fill-height pa-0">
          <v-layout fill-height>
            <v-flex v-if="mode" shrink>
              <QuestSidebar id="QuestSidebar" :location="location" :entries="entries" class="fill-height" />
            </v-flex>
            <v-flex>
              <GoogleMap
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
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestSidebar, GoogleMap },
  computed: {
    position() {
      const regionId = this.$store.state.quests[this.slug].region;
      return this.$store.state.regions[regionId].position;
    },
    zoom() {
      const regionId = this.$store.state.quests[this.slug].region;
      return this.$store.state.regions[regionId].zoom;
    },
  },
  methods: {
    readQuest() {
      const startingPoint = this.$store.state.quests[this.slug].startingPoint;
      const startingLocation = this.$store.state.locations[startingPoint];

      this.mode = "read";
      this.position = startingLocation.position;
      this.location = startingLocation.position;
      this.zoom = startingLocation.zoom;
    },
    playQuest() {
      this.mode = "play";
    },
    viewLocation(locationId) {
      const location = this.$store.state.locations[locationId];

      var locationEntries = [];

      for (var e = 0; e < location.entries.length; e++) {
        let entry = this.$store.state.entries[e];
        locationEntries.push(entry)
      }

      console.log("Location: " + location.name);
      this.location = location;

      console.log("View location entries:")
      console.log(locationEntries)
      this.entries = locationEntries;
    }
  }
};
</script>

<style>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
