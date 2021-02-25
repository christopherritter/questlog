<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col class="py-0">
        <QuestHeader v-if="quest" :quest="quest" />
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

                    <p v-if="quest">{{ quest.description }}</p>

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
                    <v-sheet
                      rounded
                      color="grey lighten-4"
                      class="pa-6"
                      v-if="quest"
                    >
                      <h3 class="mb-2">Objectives</h3>

                      <v-list-item
                        v-for="objective in quest.objectives"
                        :key="objective.objectiveId"
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

                <div v-if="loading" class="loading">
                  Loading...
                </div>

                <div v-if="error" class="error">
                  {{ error }}
                </div>

                <LeafletMap
                  v-if="quest"
                  id="QuestMap"
                  class="mb-16"
                  :center="quest.region.coordinates"
                  :zoom="quest.region.zoom"
                  :locations="locations"
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
import QuestHeader from "@/components/quest/QuestHeader.vue";
import LeafletMap from "@/components/LeafletMap.vue";

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
      loading: false,
      error: null,
      locations: [
        {
          coordinates: [
            39.69718650553957,
            -84.3090084688364
          ]
        },
        {
          coordinates: [
            39.697139635581166,
            -84.30512614831034
          ]
        }
      ]
    };
  },
  components: { QuestHeader, LeafletMap },
  created() {
    this.fetchQuest();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchQuest"
  },
  computed: {
    ...mapState({
      categories: state => state.categories
    })
  },
  methods: {
    async fetchQuest() {
      this.error = this.quest = null;
      this.loading = true;

      const db = this.$fire.firestore;
      const questRef = db.collection("quests").doc(this.questId);
      const doc = await questRef.get();

      // if (this.$route.params.id !== this.questId) return;

      if (!doc.exists) {
        console.log("No such document!");
        this.loading = false;
      } else {
        const regionRef = questRef.collection("region");
        const objectivesRef = questRef.collection("objectives");
        const locationsRef = questRef.collection("locations");
        const region = await regionRef.get();
        const objectives = await objectivesRef.get();
        const locations = await locationsRef.get();

        var quest = {};

        quest = doc.data();
        quest.objectives = [];
        quest.locations = [];

        region.forEach(result => {
          var region = result.data();
          region.regionId = result.id;
          quest.region = region;
        });

        objectives.forEach(result => {
          var objective = result.data();
          objective.objectiveId = result.id;
          quest.objectives.push(objective);
        });

        locations.forEach(result => {
          var location = result.data();
          location.locationId = result.id;
          quest.locations.push(location);
        });

        this.quest = quest;
        console.log("Done loading!");
        this.loading = false;
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
