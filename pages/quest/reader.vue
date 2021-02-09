<template>
  <v-container fluid class="fill-height pa-0">
    <v-layout>
      <v-navigation-drawer
        v-if="quest"
        class="fill-height"
        light
        :width="$vuetify.breakpoint.smAndUp ? 450 : '85vw'"
        :permanent="location ? true : false"
      >
        <QuestSidebar
          id="QuestSidebar"
          :location="location"
          :entries="entries"
          :actions="actions"
          @view-location="viewLocation($event)"
          class="fill-height"
          v-if="location"
        />
      </v-navigation-drawer>
      <ReadQuestDialog :dialog="!quest" />
      <v-flex>
        <QuestMap
          :style="{ width: mapWidth }"
          id="QuestMap"
          ref="qMap"
          :position="position"
          :locations="locations"
          :zoom="zoom"
          :mapOptions="mapOptions"
          @view-location="viewLocation($event)"
          @clear-location="location = null"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestSidebar from "@/components/QuestSidebar.vue";
import QuestMap from "@/components/QuestMap.vue";
import ReadQuestDialog from "@/components/ReadQuestDialog.vue";

export default {
  name: "questReader",
  layout: "fluid",
  data() {
    return {
      quest: null,
      objectives: null,
      position: {
        lat: 39.828175,
        lng: -98.5795
      },
      region: null,
      locations: null,
      location: null,
      zoom: 4,
      entries: null,
      items: null,
      actions: null,
      startingPoint: null,
      mapOptions: {},
    };
  },
  created() {
    const quest = this.$store.state.quest;
    if (quest) {
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

      this.gatherObjectives(quest.id);
      this.gatherEntries(location.id);
    }
  },
  components: { QuestSidebar, QuestMap, ReadQuestDialog },
  computed: {
    mapWidth() {
      if (!this.quest) {
        return "100%";
      } else if (this.location) {
        return "100%";
      } else {
        return "100vw";
      }
    }
  },
  methods: {
    viewLocation(id) {
      const location = this.$store.state.locations[id];

      this.gatherEntries(id);

      this.location = location;
      // this.zoom = location.zoom;

      this.$refs.qMap.setCenter({
        lat: location.position.lat,
        lng: location.position.lng
      });
    },
    gatherObjectives(questId) {
      const quest = this.$store.state.quests[questId];
      const objectives = this.$store.state.objectives;

      var questObjectives = [];

      for (var o = 0; o < quest.objectives.length; o++) {
        questObjectives.push(objectives[quest.objectives[o]]);
      }

      this.objectives = questObjectives;
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
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>