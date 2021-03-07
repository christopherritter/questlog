<template>
  <v-card flat>
    <v-card-text>
      <h1 class="mt-5 mb-4">Quest</h1>
      <v-text-field
        v-model="newDetails.title"
        label="Title"
        outlined
      ></v-text-field>
      <v-text-field
        :value="newDetails.author"
        label="Author"
        readonly
        outlined
        hide-details
      ></v-text-field>
      <v-checkbox
        v-model="newDetails.isAnonymous"
        label="Publish anonymously"
      ></v-checkbox>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="newDetails.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
      <v-autocomplete
        v-model="newDetails.startingPoint"
        :items="locations"
        label="Starting Point"
        item-text="name"
        item-value="locationId"
        outlined
      ></v-autocomplete>
      <v-text-field
        v-model="newDetails.image"
        label="Image"
        outlined
      ></v-text-field>
      <v-autocomplete
        v-model="newDetails.categories"
        :items="categories"
        label="Categories"
        item-text="name"
        item-value="name"
        clearable
        multiple
        outlined
      ></v-autocomplete>
      <div class="d-flex">
        <v-btn outlined dark @click="updateDetails()" v-if="questSaved">
          Update
        </v-btn>
        <v-btn
          dark
          outlined
          class="ml-2"
          @click="resetDetails()"
          v-if="questSaved"
          >Reset</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn outlined dark disabled v-if="questSaved">
          Back
        </v-btn>
        <v-btn
          outlined
          dark
          class="ml-2"
          @click="$emit('change-tab', 'region')"
          v-if="questSaved"
        >
          Next
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="primary"
          class="ml-2"
          @click="publishQuest()"
          v-if="questSaved"
        >
          Publish
        </v-btn>
        <v-btn dark color="primary" class="ml-2" @click="publishQuest()" v-else>
          Create
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "DetailsTab",
  data() {
    return {
      newDetails: {
        title: "",
        author: "",
        isAnonymous: false,
        description: "",
        image: "",
        categories: [],
        startingPoint: "",
      },
      loading: false,
      error: null
    };
  },
  props: ["quest", "locations"],
  created() {

      this.fetchDetails();

  },
  computed: {
    ...mapState({
      user: state => state.user,
      categories: state => state.categories,
    }),
    questSaved() {
      if (Object.keys(this.quest).length === 0) return false;
      return true;
    }
  },
  watch: {
    newDetails: {
      handler: function(val) {
        if (val.isAnonymous) {
          this.newDetails.author = "Anonymous";
        } else {
          this.newDetails.author = this.user.name;
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_DETAILS"]),
    fetchDetails() {
      Object.assign(this.newDetails, {
        title: this.quest.title || "Untitled",
        author: this.quest.author || "Anonymous",
        description: this.quest.description || "",
        image: this.quest.image || "",
        categories: this.quest.categories || [],
        startingPoint: this.quest.startingPoint || "",
      });
    },
    updateDetails() {
      this.$emit("update-quest");
      this.$store.commit("SET_QUEST", this.newDetails);
    },
    resetRegion() {
      this.fetchDetails();
    },
    publishQuest() {
      this.$store.commit("SET_QUEST", this.newDetails);
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style></style>
