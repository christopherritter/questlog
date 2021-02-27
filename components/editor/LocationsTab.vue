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
                <v-btn
                  text
                  @click="clearLocation()"
                  :disabled="newLocation.locationId === null"
                >
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
                    v-if="selectedLocation === null"
                    :disabled="newLocation.name.length <= 0"
                    dark
                    outlined
                    color="primary"
                    @click="addLocation()"
                    >Add</v-btn
                  >
                  <v-btn
                    v-else
                    dark
                    outlined
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
            <v-btn text dark @click="editLocation()" :disabled="selectedLocation === null">
              <v-icon class="mr-2">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn text dark @click="deleteLocation()" :disabled="selectedLocation === null">
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </div>
          <LeafletMap
            id="LocationMap"
            class="mb-5"
            :center="region.coordinates"
            :zoom="newLocation.zoom"
            :locations="locations"
            :draggable="true"
            @select-location="selectLocation($event)"
            @mark-location="markLocation($event)"
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
            <v-btn dark @click="publishQuest()" color="primary">
              Publish
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "LocationsTab",
  data() {
    return {
      newLocation: {
        locationId: null,
        name: "",
        isLandmark: false,
        coordinates: [null, null],
        zoom: 18,
        image: "",
        marker: null,
        draggable: true,
        entries: [],
        items: []
      },
      selectedLocation: null,
    };
  },
  props: ["region", "locations"],
  components: { LeafletMap },
  computed: {
    ...mapState({
      markers: state => state.markers
    })
  },
  methods: {
    ...mapActions(["addLocation", "updateLocation", "deleteLocation"]),
    markLocation(location) {
      this.clearLocation();
      this.newLocation.coordinates = [location.latlng.lat, location.latlng.lng];
    },
    addLocation() {
      this.$store.dispatch("addLocation", this.newLocation);
      this.clearLocation();
    },
    selectLocation(index) {
      const location = this.locations[index];
      this.newLocation = {
        locationId: location.locationId,
        name: location.name,
        isLandmark: location.isLandmark,
        coordinates: location.coordinates,
        zoom: location.zoom,
        image: location.image,
        marker: location.marker,
        draggable: location.draggable,
        entries: location.entries,
        items: location.items
      };
      this.selectedLocation = index;
    },
    moveLocation(event) {
      var coordinates = event.location.target.getLatLng();
      var coords = [coordinates.lat, coordinates.lng];
      var index = event.index;
      this.newLocation.coordinates = coords;
      this.$store.commit("SET_COORDINATES_EDITOR", { coords, index });
    },
    updateLocation() {
      this.$store.commit("UPDATE_LOCATION_EDITOR", {
        selectedLocation: this.selectedLocation,
        newLocation: this.newLocation
      });
    },
    deleteLocation() {
      this.$store.dispatch("deleteLocation", this.selectedLocation)
      this.clearLocation();
    },
    clearLocation() {
      this.newLocation = {
        locationId: null,
        name: "",
        isLandmark: false,
        coordinates: [null, null],
        zoom: 18,
        image: "",
        marker: null,
        draggable: true,
        entries: [],
        items: []
      };
      this.selectedLocation = null;
    },
    publishQuest() {
      if (this.selectedLocation) {
        this.updateLocation();
      }
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style>
#LocationMap {
  height: calc(100% - 128px);
}
</style>
