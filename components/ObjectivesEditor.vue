<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="my-6">Objectives</h1>
              <v-text-field
                v-model="objective.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-textarea
                v-model="objective.description"
                label="Description"
                outlined
              ></v-textarea>
              <v-checkbox
                v-model="objective.isPrimary"
                label="Primary Objective"
              ></v-checkbox>
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
  name: "ObjectivesEditor",
  data() {
    return {
      objective: {
        name: "",
        description: "",
        isPrimary: false
      },
      objectives: []
    };
  }
};
</script>

<style></style>
