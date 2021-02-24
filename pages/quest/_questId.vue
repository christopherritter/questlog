<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col class="py-0">
        <QuestHeader :quest="quest" />
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

                    <!-- <v-chip
                      label
                      v-for="category in quest.categories"
                      :key="category.index"
                      small
                      class="mr-2 mb-2"
                      >{{ categories[category].name }}</v-chip
                    > -->

                    <!-- <v-row class="mt-4 mb-1 body-2">
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
                    </v-row> -->
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-sheet rounded color="grey lighten-4" class="pa-6">
                      <h3 class="mb-2">Objectives</h3>

                      <!-- <v-list-item
                        v-for="objective in quest.objectives"
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
                      </v-list-item> -->
                    </v-sheet>
                  </v-col>
                </v-row>

                <h2 class="py-4">Map</h2>

                <!-- <QuestMap
                  id="QuestMap"
                  class="mb-16"
                  :quest-id="this.questId"
                  :position="quest.region.coordinates"
                  :locations="quest.locations"
                  :zoom="zoom"
                  :mapOptions="mapOptions"
                /> -->
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
      quest: {
        title: "",
        description: "",
        image: "",
        categories: [],
        author: null,
        region: {
          name: "",
          coordinates: {
            lat: 39.828175,
            lng: -98.5795
          },
          zoom: 18,
          draggable: true,
          mapOptions: {}
        },
        objectives: [],
        locations: []
      }
    };
  },
  components: { QuestHeader, QuestMap },
  created() {
    this.fetchQuest();
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    })
  },
  methods: {
    async fetchQuest() {
      const db = this.$fire.firestore;
      const questRef = db.collection("quests").doc(this.questId);
      const doc = await questRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        this.quest = doc.data();
      }
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
