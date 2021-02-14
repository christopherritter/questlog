<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="my-6">Region</h1>
              <v-text-field
                v-model="region.name"
                label="Name"
                outlined
              ></v-text-field>
              <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-text-field
                v-model="region.coordinates.lat"
                label="Latitude"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="region.coordinates.lng"
                label="Longitude"
                outlined
              ></v-text-field>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-range-slider max="18" min="4"></v-range-slider>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <QuestMap
            id="QuestMap"
            ref="qMap"
            style="width: 100%"
            :position="region.coordinates"
            :locations="locations"
            :zoom="region.zoom"
            :mapOptions="region.mapOptions"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="grey" @click="clearChanges()">Clear Changes</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary">Apply Changes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import QuestMap from "@/components/QuestMap.vue";
export default {
  name: "RegionEditor",
  components: { QuestMap },
  props: ['region', 'locations']
};
</script>

<style></style>
