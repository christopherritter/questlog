<template>
  <v-expansion-panels v-model="panels" :disabled="$vuetify.breakpoint.mdAndUp" tile flat>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Locations
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item v-for="location in locations" :key="location.locationId" class="px-0" @click="$emit('view-location', { location })">
            <v-list-item-icon>
              <v-icon v-if="location.marker">{{ 'mdi-' + location.marker }}</v-icon>
              <v-icon v-else>mdi-map-marker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ location.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "QuestLegend",
  data() {
    return {
      panels: 0
    }
  },
  mounted() {
    this.setPanels();
  },
  props: ["locations"],
  methods: {
    setPanels() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.panels = 0;
      }
    },
  }
};
</script>
