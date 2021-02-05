<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout column fill-height>
      <v-flex v-if="!mode" class="white--text gray flex shrink darken-3">
        <QuestHeader
          :quest-id="this.slug"
          @read-quest="readQuest($event)"
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
      locations: null,
      location: null,
      entries: null,
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestSidebar, GoogleMap },
  computed: {
    quest() {
      return this.$store.state.quests[this.slug];
    },
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
    },
  },
  methods: {
    readQuest(questId) {
      const startingPoint = this.$store.state.quests[questId].startingPoint;
      const startingLocation = this.$store.state.locations[startingPoint];

      console.log(questId)
      this.$store.dispatch('beginQuest', questId);

      this.mode = "read";
      console.log(startingLocation.position)
      this.location = startingLocation.position;

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
