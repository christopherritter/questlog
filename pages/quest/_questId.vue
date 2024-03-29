<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col class="py-0">
        <QuestHeader
          v-if="quest"
          :quest="quest"
          :loading="loading"
          @play-quest="playQuest()"
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
                  <v-col col="auto" v-if="quest">
                    <h2 class="pt-8 pb-4">Description</h2>

                    <p
                      v-for="(line, index) in quest.description.split('\n')"
                      :key="index"
                    >
                      {{ line }}
                    </p>

                    <!-- <v-chip
                      label
                      v-for="category in quest.categories"
                      :key="category.index"
                      small
                      class="mr-2 mb-2"
                      >{{ categories[category].name }}</v-chip
                    > -->

                    <v-row class="mt-4 mb-1 body-2">
                      <v-col class="py-1" cols="4" lg="2">
                        <strong>Objectives</strong>
                      </v-col>
                      <v-col class="py-1" cols="2" lg="1">
                        {{ objectives.length }}
                      </v-col>
                      <v-col class="py-1" cols="4" lg="2">
                        <strong>Locations</strong>
                      </v-col>
                      <v-col class="py-1" cols="2" lg="1">
                        {{ locations.length }}
                      </v-col>
                      <v-col class="py-1" cols="4" lg="2">
                        <strong>Entries</strong>
                      </v-col>
                      <v-col class="py-1" cols="2" lg="1">
                        {{ entries.length }}
                      </v-col>
                      <v-col class="py-1" cols="4" lg="2">
                        <strong>Items</strong>
                      </v-col>
                      <v-col class="py-1" cols="2" lg="1">
                        {{ items.length }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-if="objectives.length > 0" cols="12" md="6">
                    <v-sheet
                      rounded
                      color="grey lighten-4"
                      class="pa-6"
                      v-if="quest"
                    >
                      <h3 class="mb-2">Main objectives:</h3>

                      <v-list-item
                        v-for="objective in primaryObjectives"
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

                <QuestMap
                  v-if="!loading"
                  id="QuestMap"
                  class="mb-16"
                  :mapStyle="mapStyle"
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
import { mapState, mapActions } from "vuex";
import QuestHeader from "@/components/quest/QuestHeader.vue";
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
      quest: {},
      objectives: [],
      locations: [],
      entries: [],
      items: [],
      mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
      loading: false,
      error: null
    };
  },
  components: { QuestHeader, QuestMap },
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
    }),
    primaryObjectives() {
      let primaryObjectives = this.objectives.filter(function(e) {
        return e.isPrimary == true;
      });
      return primaryObjectives;
    }
  },
  methods: {
    ...mapActions(["setQuest", "findWithAttr"]),
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
        locations.forEach(result => {
          var location = result.data();
          // var newLocation = {
          //   name: location.name,
          //   isLandmark: location.isLandmark,
          //   isStartingPoint: location.isStartingPoint,
          //   coordinates: location.coordinates,
          //   zoom: location.zoom,
          //   image: location.image,
          //   marker: location.marker,
          //   order: location.order,
          //   locationId: location.locationId,
          //   draggable: location.draggable
          // };

          this.locations.push(location);
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
        items: this.items
      });
    },
    playQuest() {
      this.setQuest();
      this.$router.push("/quest/player");
    },
    readQuest() {
      this.setQuest();
      this.$router.push("/quest/reader");
    },
    editQuest() {
      this.setQuest();
      this.$router.push("/editor");
    },
    async createEntry(entry) {
      const db = this.$fire.firestore;
      const questRef = db.collection("quests").doc(this.questId);
      const entriesRef = questRef.collection("entries");
      const entryResult = await entriesRef.add(entry);

      var newEntry = entry;
      newEntry.entryId = entryResult.id;

      const updateEntry = entriesRef.doc(entryResult.id).update({
        entryId: entryResult.id
      });

      return newEntry;
    },
    async createItem(item) {
      const db = this.$fire.firestore;
      const questRef = db.collection("quests").doc(this.questId);
      const itemsRef = questRef.collection("items");
      const itemResult = await itemsRef.add(item);

      var newItem = item;
      newItem.itemId = itemResult.id;

      const updateItem = itemsRef.doc(itemResult.id).update({
        itemId: itemResult.id
      });

      return newItem;
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
