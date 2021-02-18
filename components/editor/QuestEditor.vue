<template>
  <v-card flat>
    <v-card-text>
      <h1 class="mt-5 mb-4">Quest</h1>
      <v-text-field v-model="newQuest.title" label="Title" outlined></v-text-field>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="newQuest.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
      <v-text-field v-model="newQuest.image" label="Image" outlined></v-text-field>
      <v-autocomplete
        v-model="newQuest.categories"
        :items="categories"
        label="Categories"
        item-text="name"
        item-value="id"
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
        <v-btn dark disabled color="primary" class="ml-2">
          Save
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "QuestEditor",
  data() {
    return {
      newQuest: {
        title: "",
        description: "",
        image: "",
        categories: []
      },
    };
  },
  computed: {
    ...mapState({
      quest: state => state.editor.quest,
      categories: state => state.categories
    })
  }
};
</script>

<style></style>
