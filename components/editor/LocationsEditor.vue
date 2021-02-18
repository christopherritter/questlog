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
                v-model="newLocation.name"
                label="Name"
                outlined
              ></v-text-field>
              <v-checkbox
                v-model="newLocation.isLandmark"
                label="Landmark Location"
              ></v-checkbox>
              <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newLocation.coordinates.lat"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newLocation.coordinates.lng"
                    label="Longitude"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="newLocation.zoom"
                min="0"
                max="18"
                thumb-label
              ></v-slider>
              <v-text-field
                v-model="newLocation.image"
                label="Image"
                outlined
              ></v-text-field>
              <v-select :items="markers" label="Marker" outlined></v-select>
              <!-- <v-select :items="entries" label="Entries" outlined></v-select> -->
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn dark color="red" outlined disabled>Remove</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    outlined
                    :disabled="!newLocation.coordinates == null"
                    @click="updateLocation()"
                    >Update</v-btn
                  >
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
            :center="region.coordinates"
            :zoom="location.zoom"
            :locations="locations"
            @mark-location="markLocation($event)"
            @select-location="selectLocation($event)"
            @move-location="moveLocation($event)"
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
import { mapState } from "vuex";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "LocationsEditor",
  data() {
    return {
      newLocation: {
        name: "Untitled",
        isLandmark: true,
        coordinates: {
          lat: null,
          lng: null
        },
        zoom: 18,
        image: "",
        isLandmark: false,
        mapOptions: {},
        draggable: true
      },
      selectedLocation: null
    };
  },
  components: { LeafletMap },
  computed: {
    ...mapState({
      region: state => state.editor.region,
      location: state => state.editor.location,
      locations: state => state.editor.locations,
      markers: state => state.editor.markers
    })
  },
  methods: {
    markLocation(location) {
      this.clearLocation();
      this.newLocation.coordinates = location.latlng;
      this.$store.dispatch("addLocation", this.newLocation);
    },
    async selectLocation(location) {
      this.$store.dispatch("selectLocation", location).then((index) => {
        this.newLocation = {
          name: this.locations[index].name,
          isLandmark: this.locations[index].isLandmark,
          coordinates: {
            lat: this.locations[index].coordinates.lat,
            lng: this.locations[index].coordinates.lng
          },
          zoom: this.locations[index].zoom,
          image: this.locations[index].image,
          isLandmark: this.locations[index].isLandmark,
          mapOptions: this.locations[index].mapOptions,
          draggable: this.locations[index].draggable
        };
        this.selectedLocation = index;
      });
    },
    moveLocation(location) {
      var coordinates = location.target.getLatLng();
      var index = this.selectedLocation;
      this.newLocation.coordinates = coordinates
      this.$store.dispatch('updateCoordinates', { coordinates, index });
    },
    updateLocation() {
      this.$store.dispatch('updateLocation', {
        selectedLocation: this.selectedLocation,
        newLocation: this.newLocation
      });
    },
    clearLocation() {
      this.newLocation = {
        name: "Untitled",
        isLandmark: true,
        coordinates: {
          lat: null,
          lng: null
        },
        zoom: 18,
        image: "",
        isLandmark: false,
        mapOptions: {},
        draggable: true
      };
      this.selectedLocation = null;
      this.$store.dispatch("clearLocation");
    }
  }
};
</script>

<style>
#LocationMap {
  height: calc(100% - 128px);
}
</style>
