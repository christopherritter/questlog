<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="my-6">Add Location</h1>
              <v-text-field
                v-model="location.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-checkbox
                v-model="location.isLandmark"
                label="Landmark Location"
              ></v-checkbox>
              <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-text-field
                v-model="location.position.lat"
                label="Latitude"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="location.position.lng"
                label="Longitude"
                outlined
              ></v-text-field>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-range-slider max="18" min="4"></v-range-slider>
              <v-text-field
                v-model="location.image"
                label="Image"
                outlined
              ></v-text-field>
              <v-select :items="markers" label="Marker" outlined></v-select>
              <v-select :items="entries" label="Entries" outlined></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <h1 class="my-6">Current Locations</h1>
          <QuestMap
            id="QuestMap"
            ref="qMap"
            style="width: 100%"
            :position="location.position"
            :locations="locations"
            :zoom="location.zoom"
            :mapOptions="location.mapOptions"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import QuestMap from "@/components/QuestMap.vue";
export default {
  name: "LocationsEditor",
  data() {
    return {
      location: {
        name: "",
        isLandmark: true,
        position: {
          lat: 39.828175,
          lng: -98.5795
        },
        zoom: 18,
        image: "",
        isLandmark: false,
        mapOptions: {},
      },
      locations: [],
      actions: [],
      markers: [],
    };
  },
  props: ['entries'],
  components: { QuestMap },
};
</script>

<style></style>
