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
                @view-location="viewLocation($event)"
                class="fill-height"
              />
            </v-flex>
            <v-flex>
              <QuestMap
                ref="qMap"
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
import QuestMap from "@/components/QuestMap.vue";

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
      zoom: null,
      entries: null,
      items: null,
      actions: null
    };
  },
  layout: "fluid",
  components: { QuestHeader, QuestSidebar, QuestMap },
  created() {
    const quest = this.$store.state.quests[this.slug];
    const region = this.$store.state.regions[quest.region];

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
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
  },
  methods: {
    readQuest(questId) {
      const quest = this.$store.state.quests[questId];
      const startingPoint = quest.startingPoint;

      this.$store.dispatch("beginQuest", questId);
      this.mode = "read";
      this.viewLocation(startingPoint);
    },
    playQuest() {
      this.mode = "play";
    },
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

      this.$refs.qMap.setCenter({
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
</style>
