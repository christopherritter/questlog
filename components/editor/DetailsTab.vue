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
        v-model="newDetails.author"
        label="Author"
        readonly
        outlined
        hide-details
      ></v-text-field>
      <v-checkbox
        v-model="newDetails.isAnonymous"
        label="Publish anonymously"
        :value="newDetails.isAnonymous"
      ></v-checkbox>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="newDetails.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
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
        <v-btn outlined dark @click="updateDetails()">
          Update
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined dark disabled class="ml-2">
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
          @click="$store.dispatch('publishQuest')"
        >
          Publish
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "DetailsTab",
  data() {
    return {
      newDetails: {
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
    this.fetchDetails();
  },
  props: ['quest'],
  computed: {
    ...mapState({
      categories: state => state.categories,
    })
  },
  methods: {
    ...mapMutations([
      "SET_DETAILS_EDITOR",
    ]),
    fetchDetails() {
      Object.assign(this.newDetails, {
        title: this.quest.title,
        author: this.quest.author,
        isAnonymous: this.quest.isAnonymous,
        description: this.quest.description,
        image: this.quest.image,
        categories: this.quest.categories,
      })
    },
    updateDetails() {
      this.$store.commit("SET_DETAILS_EDITOR", this.newDetails);
    },
    publishQuest() {
      console.log("Publish Quest")
    }
  }
};
</script>

<style></style>
