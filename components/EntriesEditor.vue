<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="my-6">Entries</h1>
              <v-text-field
                v-model="entry.title"
                label="Title"
                outlined
              ></v-text-field>
              <v-select :items="locations" label="Location" outlined></v-select>
              <v-textarea
                v-model="entry.text"
                label="Text"
                outlined
              ></v-textarea>
              <v-select :items="actions" label="Actions" outlined></v-select>
              <v-select :items="objectives" label="Requirements" outlined></v-select>
              <v-select :items="objectives" label="Expiration" outlined></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <h1 class="my-6">List</h1>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EntriesEditor",
  data() {
    return {
      entry: {
        title: "",
        text: ""
      },
      entries: []
    };
  },
  props: [ 'locations', 'actions', 'objectives' ]
};
</script>

<style></style>
