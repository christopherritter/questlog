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
                    @click="addLocation()"
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
      this.$store.dispatch("selectLocation", location).then((result) => {
        this.newLocation = {
          name: result.name,
          isLandmark: result.isLandmark,
          coordinates: {
            lat: result.coordinates.lat,
            lng: result.coordinates.lng
          },
          zoom: result.zoom,
          image: result.image,
          isLandmark: result.isLandmark,
          mapOptions: result.mapOptions,
          draggable: result.draggable
        };
      });
    },
    updateLocation(location) {
      var position = location.oldMarker.coordinates;
      for (let l = 0; l < this.locations.length; l++) {
        var currentPosition = this.locations[l].coordinates;
        if (
          position.lat === currentPosition.lat &&
          position.lng === currentPosition.lng
        ) {
          var newPosition = location.newMarker.getLatLng();
          this.locations[l].coordinates = newPosition;
        }
      }
    },
    // updateLocation(location) {
    //   this.location.coordinates = location.newMarker.getLatLng();
    //   this.$emit("update-location", {
    //     newMarker: location.newMarker,
    //     oldMarker: location.oldMarker
    //   });
    // },
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
