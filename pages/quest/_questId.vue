<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col class="py-0">
        <QuestHeader :quest-id="this.questId" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-sheet light>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" md="6">
                    <h2 class="pt-8 pb-4">Description</h2>

                    <p>{{ quest.description }}</p>

                    <v-chip
                      label
                      v-for="category in quest.categories"
                      :key="category.index"
                      small
                      class="mr-2 mb-2"
                      >{{ category }}</v-chip
                    >

                    <v-row class="mt-4 mb-1 body-2">
                      <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Objectives</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        quest.locations.length
                      }}</v-col>
                      <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Locations</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        quest.locations.length
                      }}</v-col>
                      <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Entries</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        quest.entries.length
                      }}</v-col>
                      <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Items</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        quest.items.length
                      }}</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-sheet rounded color="grey lighten-4" class="pa-6">
                      <h3 class="mb-2">Objectives</h3>

                      <v-list-item
                        v-for="objective in objectives"
                        :key="objective.id"
                        dense
                      >
                        <v-list-item-icon>
                          <v-icon color="green" v-if="objective.isComplete"
                            >mdi-check-bold</v-icon
                          >
                          <v-icon color="grey" v-else>mdi-check-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title :color="'green'">{{
                            objective.name
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-sheet>
                  </v-col>
                </v-row>

                <h2 class="py-4">Map</h2>

                <QuestMap
                  id="QuestMap"
                  class="mb-16"
                  :quest-id="this.questId"
                  :position="position"
                  :locations="locations"
                  :zoom="zoom"
                  :mapOptions="mapOptions"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestHeader from "@/components/QuestHeader.vue";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "quest",
  layout: "fluid",
  async asyncData({ params }) {
    const questId = params.questId; // When calling /abc the questId will be "abc"
    return { questId };
  },
  data() {
    return {
      quest: null,
      locations: null,
      location: null,
      zoom: null,
      entries: null,
      items: null,
      actions: null,
      mapOptions: {
        disableDefaultUI: true,
        gestureHandling: "none",
        keyboardShortcuts: false,
        clickableIcons: false,
        draggableCursor: "default", // this is for cursor type
        draggingCursor: "default" // this is for dragging cursor type
      }
    };
  },
  components: { QuestHeader, QuestMap },
  created() {
    const quest = this.$store.state.quests[this.questId];
    const region = this.$store.state.regions[quest.region];
    const locations = this.$store.state.locations;

    this.quest = quest;
    this.region = region;
    this.zoom = region.zoom;
    this.locations = locations;
  },
  computed: {
    ...mapState({
      objectives: state => state.objectives
    }),
    position() {
      const regionId = this.$store.state.quests[this.questId].region;
      return this.$store.state.regions[regionId].position;
    }
  }
};
</script>

<style scoped>
#QuestMap {
  width: 100%;
  height: 500px;
}
</style>
