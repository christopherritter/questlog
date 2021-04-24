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
        @change="toggleAnonymous"
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
        clearable
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
        <!-- <v-btn
          dark
          outlined
          class="ml-2"
          @click="resetDetails()"
          v-if="questSaved"
          >Reset</v-btn
        > -->
        <v-spacer></v-spacer>
        <span v-if="$vuetify.breakpoint.mdAndUp">
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
        </span>
        <v-btn
          v-if="questSaved"
          dark
          class="mr-2"
          @click="$emit('delete-quest')"
          color="danger"
        >
          Delete
        </v-btn>
        <v-btn
          dark
          color="primary"
          class="ml-2"
          @click="publishQuest()"
          v-if="questSaved"
        >
          Publish
        </v-btn>
        <v-btn
          dark
          :disabled="newDetails.title == '' || newDetails.description == ''"
          color="primary"
          class="ml-2"
          @click="publishQuest()"
          v-else
        >
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
        authorId: "",
        isAnonymous: false,
        isFeatured: false,
        description: "",
        image: "",
        categories: [],
        startingPoint: "",
        questId: ""
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
      categories: state => state.categories
    }),
    questSaved() {
      if (Object.keys(this.quest).length === 0) return false;
      return true;
    }
  },
  watch: {
    quest(val, oldVal) {
      if (!val.questId) {
        this.newDetails = {
          title: "",
          isAnonymous: false,
          isFeatured: false,
          description: "",
          image: "",
          categories: [],
          startingPoint: "",
          questId: ""
        };
        this.fetchDetails();
        this.$emit("change-tab", "details");
      } else if (val.questId.length > 0 && val.questId != oldVal.questId) {
        this.newDetails.questId = val.questId;
      }
    }
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_QUEST"]),
    fetchDetails() {
      // this.newDetails.title = this.quest.title;
      if (this.quest.isAnonymous || this.user.name.length <= 0) {
        this.newDetails.author = "Anonymous";
      } else {
        this.newDetails.author = this.user.name;
      }
      // this.newDetails.isAnonymous = this.quest.isAnonymous;
      // this.newDetails.authorId = this.user.userId;
      // this.newDetails.isFeatured = this.quest.isFeatured;
      // this.newDetails.description = this.quest.description;
      // this.newDetails.image = this.quest.image;
      // this.newDetails.categories = this.quest.categories;
      // this.newDetails.startingPoint = this.quest.startingPoint;
      // this.newDetails.questId = this.quest.questId;
    },
    toggleAnonymous(newVal) {
      if (newVal) {
        this.newDetails.author = "Anonymous";
      } else {
        this.newDetails.author = this.user.name;
      }
    },
    updateDetails() {
      this.$store.commit("SET_QUEST", this.newDetails);
    },
    publishQuest() {
      this.$store.commit("SET_QUEST", this.newDetails);
      this.$store.dispatch("publishQuest");
      // this.fetchDetails();
    }
  }
};
</script>

<style></style>
