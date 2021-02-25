<template>
  <v-card flat>
    <v-card-text>
      <h1 class="mt-5 mb-4">Quest</h1>
      <v-text-field v-model="quest.title" label="Title" outlined></v-text-field>
      <v-text-field v-model="quest.author" label="Author" readonly outlined hide-details></v-text-field>
      <v-checkbox
        v-model="quest.isAnonymous"
        label="Publish anonymously"
        :value="quest.isAnonymous"
      ></v-checkbox>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="quest.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
      <v-text-field v-model="quest.image" label="Image" outlined></v-text-field>
      <v-autocomplete
        v-model="quest.categories"
        :items="categories"
        label="Categories"
        item-text="name"
        item-value="name"
        clearable
        multiple
        outlined
      ></v-autocomplete>
      <div class="d-flex">
        <v-btn outlined dark disabled>
          Back
        </v-btn>
        <v-btn
          outlined
          dark
          class="ml-2"
          @click="$emit('change-tab', 'region')"
        >
          Next
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="primary"
          class="ml-2"
          @click="$store.dispatch('saveQuest', quest)"
        >
          Save
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "QuestTab",
  data() {
    return {
      quest: {
        title: "",
        author: "Anonymous",
        isAnonymous: true,
        description: "",
        image: "",
        categories: []
      },
      loading: false,
      error: null,
    };
  },
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
      this.error = null;
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

<style></style>
