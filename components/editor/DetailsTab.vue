<template>
  <v-card flat>
    <v-card-text>
      <h1 class="mt-5 mb-4">Quest</h1>
      <v-text-field
        v-model="newQuest.title"
        label="Title"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="newQuest.author"
        label="Author"
        readonly
        outlined
        hide-details
      ></v-text-field>
      <v-checkbox
        v-model="newQuest.isAnonymous"
        label="Publish anonymously"
        :value="newQuest.isAnonymous"
      ></v-checkbox>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="newQuest.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
      <v-text-field
        v-model="newQuest.image"
        label="Image"
        outlined
      ></v-text-field>
      <v-autocomplete
        v-model="newQuest.categories"
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
          @click="$store.dispatch('saveQuest', newQuest)"
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
  name: "DetailsTab",
  data() {
    return {
      newQuest: {
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
    fetchDetails() {
      Object.assign(this.newQuest, {
        title: this.quest.title,
        author: this.quest.author,
        isAnonymous: this.quest.isAnonymous,
        description: this.quest.description,
        image: this.quest.image,
        categories: this.quest.categories,
      })
    }
  }
};
</script>

<style></style>
