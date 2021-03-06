<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col class="py-0">
        <QuestHeader
          v-if="quest"
          :quest="quest"
          @read-quest="readQuest()"
          @edit-quest="editQuest()"
        />
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

                    <v-row class="mt-4 mb-1 body-2">
                      <!-- <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Objectives</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        objectives.length
                      }}</v-col> -->
                      <v-col class="py-1" cols="3" xs="3" md="3"
                        ><strong>Locations</strong></v-col
                      >
                      <v-col class="py-1" cols="3" xs="3" md="3">{{
                        locations.length
                      }}</v-col>
                      <!-- <v-col class="py-1" cols="3" xs="3" md="3"
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
                      }}</v-col> -->
                    </v-row>
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

                <!-- <div v-if="quest">
                  <p v-for="(location, index) in quest.locations" :key="index">{{ location.coordinates[0]}}, {{ location.coordinates[1]}}</p>
                </div> -->

                <LeafletMap
                  v-if="quest"
                  id="QuestMap"
                  class="mb-16"
                  :center="quest.region.coordinates"
                  :zoom="quest.region.zoom"
                  :locations="locations"
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
import { mapState, mapActions } from "vuex";
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
      quest: {},
      objectives: [],
      locations: [],
      mapOptions: {
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
      },
      loading: false,
      error: null
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
    ...mapActions(["setQuest"]),
    async fetchQuest() {
      this.error = this.quest = null;
      this.loading = true;

      const db = this.$fire.firestore;
      const questRef = db.collection("quests").doc(this.questId);
      const objectivesRef = questRef.collection("objectives");
      const locationsRef = questRef.collection("locations");
      const entriesRef = questRef.collection("entries");
      const itemsRef = questRef.collection("items");
      const quest = await questRef.get();

      // if (this.$route.params.id !== this.questId) return;

      if (!quest.exists) {
        console.log("No such document!");
      } else {
        this.quest = quest.data();

        const objectives = await objectivesRef.get();
        objectives.forEach(objective => {
          this.objectives.push(objective.data());
        });

        const locations = await locationsRef.get();
        locations.forEach(location => {
          this.locations.push(location.data());
        });

        const entries = await entriesRef.get();
        entries.forEach(entry => {
          this.entries.push(entry.data());
        });

        const items = await itemsRef.get();
        items.forEach(item => {
          this.items.push(item.data());
        });
      }
      this.loading = false;
    },
    setQuest() {
      this.$store.dispatch("setQuest", {
        quest: this.quest,
        objectives: this.objectives,
        locations: this.locations,
        entries: this.entries,
        items: this.items,
      });
    },
    readQuest() {
      this.setQuest();
      this.$router.push("/quest/reader");
    },
    editQuest() {
      this.setQuest();
      this.$router.push("/editor");
    },
  }
};
</script>

<style scoped>
#QuestMap {
  width: 100%;
  height: 500px;
}
</style>
