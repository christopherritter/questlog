<template>
  <v-card flat>
    <v-card-text>
      <v-row class="fill-height">
        <v-col cols="4">
          <v-row>
            <v-col>
              <div class="d-flex mt-5 mb-4 align-center">
                <h1>Locations</h1>
                <v-spacer></v-spacer>
                <v-btn text>
                  <v-icon class="mr-2" dark>
                    mdi-plus-circle
                  </v-icon>
                  New
                </v-btn>
              </div>
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
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="location.coordinates.lat"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="location.coordinates.lng"
                    label="Longitude"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="location.zoom"
                min="0"
                max="18"
                thumb-label
              ></v-slider>
              <v-text-field
                v-model="location.image"
                label="Image"
                outlined
              ></v-text-field>
              <v-select :items="markers" label="Marker" outlined></v-select>
              <!-- <v-select :items="entries" label="Entries" outlined></v-select> -->
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn dark color="red" outlined disabled>Remove</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark outlined @click="addLocation()">Add</v-btn>
                  <!-- <v-btn v-else dark outlined color="primary">Update</v-btn> -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <div class="mt-5 mb-4 align-center">
            <v-btn text dark disabled>
              <v-icon class="mr-2">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn text dark disabled>
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
          </div>
          <LeafletMap
            id="LocationMap"
            class="mb-5"
            :center="centerPoint"
            :zoom="location.zoom"
            :locations="locations"
            @mark-location="$emit('mark-location', $event)"
            @select-location="$emit('select-location', $event)"
            @update-location="updateLocation($event)"
          />
          <div class="d-flex">
            <v-btn outlined dark @click="$emit('change-tab', 'objectives')">
              Back
            </v-btn>
            <v-btn
              outlined
              dark
              class="ml-2"
              @click="$emit('change-tab', 'entries')"
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
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "LocationsEditor",
  props: ["region", "location", "locations", "markers"],
  components: { LeafletMap },
  computed: {
    centerPoint() {
      if (this.location.coordinates.lat == null) return this.region.coordinates;
      return this.location.coordinates;
    },
  },
  methods: {
    updateLocation(location) {
      this.location.coordinates = location.newMarker.getLatLng();
      this.$emit("update-location", {
        newMarker: location.newMarker,
        oldMarker: location.oldMarker
      });
    }
  }
};
</script>

<style>
#LocationMap {
  height: calc(100% - 128px);
}
</style>
