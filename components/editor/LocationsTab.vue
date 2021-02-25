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
                hide-details
              ></v-text-field>
              <v-checkbox
                v-model="newLocation.isLandmark"
                label="Landmark Location"
              ></v-checkbox>
              <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newLocation.coordinates[0]"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newLocation.coordinates[1]"
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
              <!-- <v-select :items="markers" label="Marker" outlined></v-select> -->
              <!-- <v-select :items="entries" label="Entries" outlined></v-select> -->
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn
                    dark
                    outlined
                    :disabled="!newLocation.coordinates == null"
                    @click="updateLocation()"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn dark color="red" outlined disabled>Reset</v-btn>
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
            :zoom="newLocation.zoom"
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
              Publish
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "LocationsTab",
  data() {
    return {
      newLocation: {
        name: "Untitled",
        isLandmark: false,
        coordinates: {
          lat: null,
          lng: null
        },
        zoom: 18,
        image: "",
        marker: null,
        draggable: true,
        entries: [],
        items: []
      },
      selectedLocation: null
    };
  },
  props: ['region', 'locations'],
  components: { LeafletMap },
  computed: {
    ...mapState({
      markers: state => state.markers
    }),
  },
  methods: {
    ...mapMutations([
      "ADD_LOCATION_EDITOR",
      "SET_COORDINATES_EDITOR",
    ]),
    markLocation(location) {
      this.clearLocation();
      this.newLocation.coordinates = location.latlng;
      this.$store.commit("ADD_LOCATION_EDITOR", this.newLocation);
    },
    async selectLocation(location) {
      this.$store.dispatch("selectLocation", location).then(index => {
        this.newLocation = {
          name: this.locations[index].name,
          isLandmark: this.locations[index].isLandmark,
          coordinates: {
            lat: this.locations[index].coordinates.lat,
            lng: this.locations[index].coordinates.lng
          },
          zoom: this.locations[index].zoom,
          image: this.locations[index].image,
          marker: this.locations[index].marker,
          draggable: true,
          entries: this.locations[index].entries,
          items: this.locations[index].items,
        };
        this.selectedLocation = index;
      });
    },
    moveLocation(location) {
      var coordinates = location.target.getLatLng();
      var index = this.selectedLocation;
      this.newLocation.coordinates = coordinates;
      this.$store.commit("SET_COORDINATES_EDITOR", { coordinates, index });
    },
    updateLocation() {
      this.$store.commit("UPDATE_LOCATION_EDITOR", {
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
        marker: null,
        draggable: true,
        entries: [],
        items: []
      };
      this.selectedLocation = null;
    }
  }
};
</script>

<style>
#LocationMap {
  height: calc(100% - 128px);
}
</style>
