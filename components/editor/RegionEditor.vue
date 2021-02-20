<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="mt-5 mb-4">Region</h1>
              <v-text-field
                v-model="region.name"
                label="Name"
                outlined
              ></v-text-field>
              <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="region.coordinates.lat"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="region.coordinates.lng"
                    label="Longitude"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="region.zoom"
                min="0"
                max="18"
                thumb-label
              ></v-slider>
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn dark color="red" outlined disabled>Remove</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    outlined
                    :disabled="!region.coordinates == null"
                    @click="updateRegion()"
                    >Update</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <LeafletMap
            id="RegionMap"
            class="mb-5"
            :center="region.coordinates"
            :zoom="region.zoom"
            :locations="[region]"
            @mark-location="markLocation($event)"
            @move-location="moveLocation($event)"
          />
          <div class="d-flex">
            <v-btn outlined dark @click="$emit('change-tab', 'about')">
              Back
            </v-btn>
            <v-btn
              outlined
              dark
              class="ml-2"
              @click="$emit('change-tab', 'objectives')"
            >
              Next
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn dark disabled color="primary">
              Save
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "RegionEditor",
  data() {
    return {
      region: {
        name: "",
        coordinates: {
          lat: 39.828175,
          lng: -98.5795
        },
        zoom: 18,
        draggable: true,
        mapOptions: {}
      }
    };
  },
  components: { LeafletMap },
  methods: {
    ...mapMutations(['SET_REGION_EDITOR']),
    markLocation(event) {
      this.region.coordinates = event.latlng;
    },
    moveLocation(event) {
      this.region.coordinates = event.target.getLatLng();
    },
    updateRegion() {
      this.$store.commit("SET_REGION_EDITOR", this.region);
    }
  }
};
</script>

<style>
#RegionMap {
  height: calc(100% - 56px);
}
</style>
