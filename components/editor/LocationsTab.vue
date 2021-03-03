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
              <v-select
                v-model="newLocation.order"
                :items="orderItems"
                label="Order"
                outlined
              ></v-select>
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
                  <v-btn v-else dark outlined @click="updateLocation()"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn dark color="red" outlined disabled>Reset</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row class="mt-4 mb-3 mx-0 align-center">
            <v-btn
              text
              dark
              @click="editLocation()"
              :disabled="selectedLocation === null"
            >
              <v-icon class="mr-2">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn
              text
              dark
              @click="deleteLocation()"
              :disabled="selectedLocation === null"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Delete
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
          <LeafletMap
            v-if="selectedView === 0"
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
                <v-list-item-group
                  v-model="selectedLocation"
                  color="light-blue darken-1"
                >
                  <v-list two-line width="100%">
                    <v-list-item
                      v-for="location in filterByTerm"
                      :key="location.locationId"
                      @click="selectLocation(location)"
                    >
                      <v-list-item-avatar color="light-blue darken-1">
                        <v-icon class="white--text" dark>
                          mdi-map-marker
                        </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="location.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          >{{ location.coordinates[0] }},
                          {{ location.coordinates[1] }}</v-list-item-subtitle
                        >
                      </v-list-item-content>

                      <v-list-item-avatar color="grey darken-2" size="36">
                        <span class="white--text title">{{ location.order }}</span>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-list>
                </v-list-item-group>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="my-2 mx-0">
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
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "LocationsTab",
  data() {
    return {
      newLocation: {
        locationId: null,
        name: "",
        isLandmark: false,
        isStartingPoint: false,
        coordinates: [null, null],
        zoom: 18,
        order: null,
        image: "",
        marker: null,
        draggable: true,
        entries: [],
        items: []
      },
      selectedLocation: null,
      selectedView: 0,
      searchTerm: "",
      sortLocations: "",
      sort: ["Alphabetically", "Numerically"]
    };
  },
  props: ["region", "locations"],
  components: { LeafletMap },
  computed: {
    ...mapState({
      markers: state => state.markers
    }),
    filterByTerm() {
      let searchTerm = this.searchTerm.toLowerCase();
      let locations = this.locations.slice();

      return locations.filter(location => {
        return location.name.toLowerCase().includes(searchTerm);
      });
    },
    orderItems() {
      const orderItems = [];
      for (let i = 0; i < this.locations.length; i++) {
        orderItems.push(i + 1);
      }
      return orderItems;
    }
  },
  watch: {
    sortLocations(val) {
      let locations = this.locations.slice();

      if (val === "Alphabetically") {
        locations.sort((a, b) => (a.name > b.name) ? 1 : -1);

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS_EDITOR", locations);
        }

      } else if (val === "Numerically") {
        console.log("Numerically")
        locations.sort((a, b) => (a.order > b.order) ? 1 : -1);

        if (locations != this.locations) {
          this.$store.commit("SET_LOCATIONS_EDITOR", locations);
        }
      }

      this.clearLocation();
    }
  },
  methods: {
    ...mapActions(["addLocation", "updateLocation", "deleteLocation"]),
    ...mapMutations(["SET_LOCATIONS_EDITOR"]),
    markLocation(location) {
      this.clearLocation();
      this.newLocation.coordinates = [location.latlng.lat, location.latlng.lng];
    },
    addLocation() {
      this.$store.dispatch("addLocation", this.newLocation);
      this.clearLocation();
    },
    selectLocation(location) {
      const index = this.locations.indexOf(location)
      this.newLocation = {
        locationId: location.locationId,
        name: location.name,
        isLandmark: location.isLandmark,
        isStartingPoint: location.isStartingPoint,
        coordinates: location.coordinates,
        zoom: location.zoom,
        order: location.order || 0,
        image: location.image,
        marker: location.marker,
        draggable: location.draggable,
        entries: location.entries,
        items: location.items
      };
      this.selectedLocation = index;
    },
    moveLocation(location) {
      const index = this.locations.indexOf(location)
      const coordinates = location.coordinates;
      this.newLocation.coordinates = coordinates;
      this.$store.commit("SET_COORDINATES_EDITOR", { coordinates, index });
    },
    updateLocation() {
      this.$store.commit("UPDATE_LOCATION_EDITOR", {
        selectedLocation: this.selectedLocation,
        newLocation: this.newLocation
      });
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
        coordinates: [null, null],
        zoom: 18,
        order: null,
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
