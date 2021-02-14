<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="my-6">Items</h1>
              <v-text-field
                v-model="item.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-select :items="locations" label="Location" outlined></v-select>
              <v-text-field
                v-model="item.image"
                label="Image"
                outlined
              ></v-text-field>
              <v-select :items="entries" label="Entries" outlined></v-select>
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
  name: "ItemsEditor",
  data() {
    return {
      item: {
        name: "",
        image: "",
      },
      items: []
    };
  },
  props: ['locations', 'entries']
};
</script>

<style></style>
