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
                    v-model="newLocation.latitude"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newLocation.longitude"
                    label="Longitude"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newLocation.coords"
                    label="Coordinates"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row> -->
              <h4 class="mt-1 mb-6">Pitch</h4>
              <v-slider
                v-model="newLocation.pitch"
                max="85"
                thumb-label
              ></v-slider>
              <h4 class="mt-1 mb-6">Bearing</h4>
              <v-slider
                v-model="newLocation.bearing"
                max="360"
                thumb-label
              ></v-slider>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="newLocation.zoom"
                max="22"
                thumb-label
              ></v-slider>
              <v-text-field
                v-model="newLocation.order"
                label="Order"
                outlined
              ></v-text-field>
              <v-select
                v-model="newLocation.marker"
                :items="markers"
                label="Marker"
                outlined
              ></v-select>
              <v-text-field
                v-model="newLocation.image"
                label="Image"
                outlined
              ></v-text-field>
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
                  <v-btn v-else dark outlined @click="updateLocation()"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- <v-btn dark color="red" outlined disabled>Reset</v-btn> -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row class="mt-4 mb-3 mx-0 align-center">
            <!-- <v-btn
              text
              dark
              @click="editLocation()"
              :disabled="selectedLocation === null"
            >
              <v-icon class="mr-2">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn> -->
            <v-btn
              text
              dark
              @click="deleteLocation()"
              :disabled="selectedLocation === null"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn-toggle dense borderless group v-model="selectedView">
              <v-btn>
                <v-icon class="mr-2">mdi-format-align-left</v-icon>
                Map View
              </v-btn>
              <v-btn>
                <v-icon class="mr-2">mdi-format-align-center</v-icon>
                List View
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <QuestMap
            v-if="selectedView === 0"
            id="LocationMap"
            ref="qMap"
            class="mb-5"
            :mapStyle="mapStyle"
            :center="currentCoords"
            :pitch="newLocation.pitch"
            :bearing="newLocation.bearing"
            :zoom="currentZoom"
            :locations="locations"
            :draggable="true"
            :showMarker="showMarker"
            :showUserLocation="false"
            :showAccuracyCircle="false"
            @select-location="selectLocation($event)"
            @mark-location="markLocation($event)"
            @move-location="moveLocation($event)"
          />
          <v-row v-else>
            <v-col class="pt-0">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="searchTerm"
                    label="Find Location"
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col sm="4">
                  <v-select
                    v-model="sortLocations"
                    :items="sort"
                    label="Sort"
                    outlined
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="my-0">
                <v-col>
                  <v-list-item-group
                    v-model="selectedLocation"
                    color="light-blue darken-1"
                  >
                    <v-list
                      width="100%"
                      :max-height="730"
                      style="overflow-y: auto;"
                    >
                      <v-list-item
                        v-for="location in filterByTerm"
                        :key="location.locationId"
                        @click="selectLocation({ location })"
                      >
                        <v-list-item-avatar color="light-blue darken-1">
                          <v-icon class="white--text" dark>
                            {{ "mdi-" + location.marker }}
                          </v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="location.name"
                          ></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-avatar
                          rounded
                          color="grey darken-2"
                          size="36"
                        >
                          <span class="white--text title">{{
                            location.order
                          }}</span>
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-list>
                  </v-list-item-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="my-2 mx-0">
            <span v-if="$vuetify.breakpoint.mdAndUp">
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
            </span>
            <v-spacer></v-spacer>
            <v-btn
              dark
              class="mr-2"
              @click="$emit('delete-quest')"
              color="danger"
            >
              Delete
            </v-btn>
            <v-btn dark @click="publishQuest()" color="primary">
              Publish
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "LocationsTab",
  data() {
    return {
      // mapStyle: "mapbox://styles/christopherritter/ckn6i5asn0ck517pntqzp6nye",
      mapStyle: "mapbox://styles/christopherritter/ckn6i5asn0ck517pntqzp6nye",
      newLocation: {
        locationId: null,
        name: "",
        isLandmark: false,
        isStartingPoint: false,
        // coords: "",
        latitude: 0,
        longitude: 0,
        coordinates: [],
        pitch: 60,
        bearing: 0,
        zoom: null,
        order: 0,
        image: "",
        marker: null,
        draggable: true
      },
      selectedLocation: null,
      selectedView: 0,
      searchTerm: "",
      sortLocations: "",
      sort: ["Alphabetically", "Numerically"]
    };
  },
  props: ["region", "locations"],
  components: { QuestMap },
  computed: {
    ...mapState({
      markers: state => state.markers
    }),
    showMarker() {
      if (this.newLocation.locationId === null) {
        return true;
      }
      return false;
    },
    filterByTerm() {
      let searchTerm = this.searchTerm.toLowerCase();
      let filteredLocations = this.sortedLocations.filter(location => {
        return location.name.toLowerCase().includes(searchTerm);
      });

      return filteredLocations;
    },
    currentCoords() {
      if (this.newLocation.coordinates.length == 0) {
        return this.region.coordinates;
      } else {
        // return [
        //   this.newLocation.coordinates.lat,
        //   this.newLocation.coordinates.lng
        // ];
        return this.newLocation.coordinates;
      }
    },
    currentZoom() {
      if (this.newLocation.zoom == 0) {
        return this.region.zoom;
      } else {
        return this.newLocation.zoom;
      }
    },
    // orderItems() {
    //   const orderItems = [];
    //   var i;
    //   for (i = 0; i < this.locations.length; i++) {
    //     orderItems.push(i + 1);
    //   }
    //   orderItems.push(i + 1);
    //   return orderItems;
    // }
    sortedLocations() {
      var locations = this.locations.slice();
      var sortBy = this.sortLocations;

      if (sortBy == "Alphabetically") {
        var sortedAlphabetically = locations.sort((a, b) => (a.name > b.name ? 1 : -1));
        return sortedAlphabetically;
      } else if (sortBy == "Numerically") {
        var sortedNumerically = locations.sort((a, b) => (Number(a.order) > Number(b.order) ? 1 : -1));
        return sortedNumerically;
      }
      return locations;
    }
  },
  // watch: {
    // sortLocations(val) {
    //   let locations = this.locations.slice();
    //   if (val === "Alphabetically") {
    //     // locations.sort((a, b) => (a.name > b.name ? 1 : -1));
    //     // if (locations != this.locations) {
    //     //   this.$store.commit("SET_LOCATIONS", locations);
    //     // }
    //   } else if (val === "Numerically") {
    //     // locations.sort((a, b) => (a.order > b.order ? 1 : -1));
    //     // if (locations != this.locations) {
    //     //   this.$store.commit("SET_LOCATIONS", locations);
    //     // }
    //   }
    //   this.clearLocation();
    // }
    // "newLocation.coords"(val, oldVal) {
    //   const locationId = this.newLocation.locationId;
    //   const index = this.findWithAttr(locationId);
    //   // if (val) {
    //     var coordinates = val.split(', ');
    //   // } else {
    //   //   var coordinates = oldVal.split(', ');
    //   // }
    //   if (coordinates.length == 2) {
    //     this.newLocation.coordinates = [Number(coordinates[0]), Number(coordinates[1])];
    //     // this.$store.commit("SET_COORDINATES", { coordinates, index });
    //     // this.$refs.qMap.panTo(coordinates);
    //   }
    // }
  // },
  methods: {
    ...mapActions([
      "addLocation",
      "updateLocation",
      "deleteLocation",
      "publishQuest"
    ]),
    ...mapMutations(["UPDATE_LOCATION", "SET_COORDINATES", "SET_LOCATIONS"]),
    markLocation(e) {
      if (this.newLocation.locationId === null) {
        var latLng = [e.mapboxEvent.lngLat.lat, e.mapboxEvent.lngLat.lng];
        this.newLocation.coordinates = latLng;
        this.newLocation.latitude = e.mapboxEvent.lngLat.lat;
        this.newLocation.longitude = e.mapboxEvent.lngLat.lng;
      }
    },
    addLocation() {
      this.$store.dispatch("addLocation", {
        locationId: this.newLocation.locationId,
        name: this.newLocation.name,
        isLandmark: this.newLocation.isLandmark,
        isStartingPoint: this.newLocation.isStartingPoint,
        coordinates: this.newLocation.coordinates,
        pitch: this.newLocation.pitch,
        bearing: this.newLocation.bearing,
        zoom: this.newLocation.zoom,
        order: this.newLocation.order,
        image: this.newLocation.image,
        marker: this.newLocation.marker,
        draggable: this.newLocation.draggable
      });
      this.clearLocation();
    },
    selectLocation(e) {
      const index = this.findWithAttr(e.location.locationId);
      var location = this.locations[index];

      this.newLocation = {
        locationId: location.locationId,
        name: location.name,
        isLandmark: location.isLandmark,
        isStartingPoint: location.isStartingPoint,
        // coords: location.coordinates.lat + ", " + location.coordinates.lng,
        coordinates: [
          Number(location.coordinates[0]),
          Number(location.coordinates[1])
        ],
        longitude: Number(location.coordinates[1]),
        latitude: Number(location.coordinates[0]),
        pitch: location.pitch || 0,
        bearing: location.bearing || 0,
        zoom: location.zoom || 0,
        order: location.order || 0,
        image: location.image,
        marker: location.marker,
        draggable: location.draggable
      };
      this.selectedLocation = index;
      if (this.selectedView === 0) {
        this.$refs.qMap.flyTo({
          center: [
            Number(location.coordinates[1]),
            Number(location.coordinates[0])
          ],
          zoom: Number(location.zoom)
        });
      }
    },
    moveLocation(e) {
      const locationId = this.newLocation.locationId;
      const index = this.findWithAttr(locationId);
      // const coords = e.lngLat;
      const coordinates = [e[1], e[0]];

      // this.newLocation.coords = coordinates.toString(", ");
      this.newLocation.coordinates = coordinates;
      this.$store.commit("SET_COORDINATES", { coordinates, index });
    },
    updateLocation() {
      const locationId = this.newLocation.locationId;
      const locationIndex = this.findWithAttr(locationId);

      this.$store.commit("UPDATE_LOCATION", {
        selectedLocation: locationIndex,
        newLocation: this.newLocation
      });

      // this.$refs.qMap.flyTo({ coordinates: this.newLocation.coordinates, zoom: this.newLocation.zoom })
      this.clearLocation();
    },
    deleteLocation() {
      this.$store.dispatch("deleteLocation", this.selectedLocation);
      this.clearLocation();
    },
    clearLocation() {
      this.newLocation = {
        locationId: null,
        name: "",
        isLandmark: false,
        isStartingPoint: false,
        // coords: "",
        coordinates: this.newLocation.coordinates,
        pitch: this.newLocation.pitch,
        bearing: this.newLocation.bearing,
        zoom: this.newLocation.zoom,
        order: 0,
        image: "",
        marker: null,
        draggable: true
      };
      this.selectedLocation = null;
    },
    publishQuest() {
      if (this.selectedLocation) {
        this.updateLocation();
      }
      this.$store.dispatch("publishQuest");
    },
    findWithAttr(value) {
      const array = this.locations;
      const attr = "locationId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>

<style>
#LocationMap {
  height: calc(100% - 128px);
  z-index: 0;
}
</style>
