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
        <v-btn dark outlined class="ml-2" @click="resetDetails()">Reset</v-btn>
        <v-spacer></v-spacer>
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
        <v-btn dark color="primary" class="ml-2" @click="publishQuest()">
          Publish
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
        author: "Anonymous",
        isAnonymous: false,
        description: "",
        image: "",
        categories: []
      },
      loading: false,
      error: null
    };
  },
  created() {
    if (this.quest) {
      this.fetchDetails();
    }
  },
  props: ["user", "quest"],
  computed: {
    ...mapState({
      categories: state => state.categories
    }),
  },
  watch: {
    newDetails: {
      handler: function (val) {
        if (val.isAnonymous) {
          this.newDetails.author = "Anonymous"
        } else {
          this.newDetails.author = this.user.name;
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_DETAILS_EDITOR"]),
    fetchDetails() {
      Object.assign(this.newDetails, {
        title: this.quest.title,
        author: this.quest.author,
        description: this.quest.description,
        image: this.quest.image,
        categories: this.quest.categories
      });
    },
    updateDetails() {
      this.$store.commit("SET_DETAILS_EDITOR", this.newDetails);
    },
    resetRegion() {
      this.fetchDetails();
    },
    publishQuest() {
      this.$store.commit("SET_DETAILS_EDITOR", this.newDetails);
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style></style>
