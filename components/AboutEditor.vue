<template>
  <v-card flat>
    <v-card-text>
      <h1 class="my-6">About</h1>
      <v-text-field v-model="quest.title" label="Title" outlined></v-text-field>
      <v-textarea
        name="input-7-1"
        label="Description"
        :value="quest.description"
        hint="Describe your quest."
        outlined
      ></v-textarea>
      <v-text-field v-model="quest.image" label="Image" outlined></v-text-field>
      <v-text-field
        v-model="quest.categories"
        label="Categories"
        outlined
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="grey" @click="clearChanges()">Clear Changes</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary">Apply Changes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AboutEditor",
  props: ['quest']
};
</script>

<style></style>
