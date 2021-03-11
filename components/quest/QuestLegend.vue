<template>
  <v-list dense>
    <v-subheader>LOCATIONS</v-subheader>
    <v-list-item v-for="location in locations" :key="location.locationId">
      <v-list-item-icon>
        <v-icon>mdi-map-marker</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ location.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "QuestLegend",
  props: ["locations"],
};
</script>
