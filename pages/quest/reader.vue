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
          v-if="location"
          id="QuestSidebar"
          class="fill-height"
          :location="location"
          :entries="entries"
          :actions="actions"
          :objectives="entriesObjectives"
          @view-location="viewLocation($event)"
          @view-objective="dialog = true"
        />
      </v-navigation-drawer>
      <QuestDialog :dialog="dialog" :quest="quest" :objectives="objectives" />
      <v-flex>
        <QuestMap
          id="QuestMap"
          ref="qMap"
          :style="{ width: mapWidth }"
          :position="position"
          :locations="locations"
          :zoom="zoom"
          :mapOptions="mapOptions"
          @view-location="viewLocation($event)"
          @clear-location="clearLocation()"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestSidebar from "@/components/QuestSidebar.vue";
import QuestMap from "@/components/QuestMap.vue";
import QuestDialog from "@/components/QuestDialog.vue";

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
      dialog: false,
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
    } else {
      this.dialog = true;
    }
  },
  components: { QuestSidebar, QuestMap, QuestDialog },
  computed: {
    mapWidth() {
      if (!this.quest) {
        return "100%";
      } else if (this.location) {
        return "100%";
      } else {
        return "100vw";
      }
    },
    entriesObjectives() {
      var entriesObjectives = [];

      if (this.entries) {
        for (let e = 0; e < this.entries.length; e++) {
          if (this.entries[e].objectives) {
            for (let o = 0; o < this.entries[e].objectives.length; o++) {
              this.objectives[this.entries[e].objectives[o]].isComplete = true;
              entriesObjectives.push(this.objectives[this.entries[e].objectives[o]]);
            }
          }
        }
      }

      return entriesObjectives;
    },
    questComplete() {
      return false;
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
    },
    clearLocation() {
      this.location = null;
      this.entries = null;
      this.actions = null;
      this.items = null;
    }
  }
};
</script>

<style scoped>
#QuestSidebar {
  max-height: calc(100vh - 100px);
}
</style>
