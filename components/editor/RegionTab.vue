<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="mt-5 mb-4">Region</h1>
              <!-- <v-text-field
                v-model="newRegion.name"
                label="Name"
                outlined
              ></v-text-field> -->
              <!-- <h4 class="mt-1 mb-6">Coordinates</h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newRegion.coordinates[0]"
                    label="Latitude"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newRegion.coordinates[1]"
                    label="Longitude"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row> -->
              <!-- <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newRegion.coords"
                    label="Coordinates"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row> -->
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="newRegion.zoom"
                max="22"
                thumb-label
              ></v-slider>
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn
                    dark
                    outlined
                    :disabled="newRegion.coords == ''"
                    @click="updateRegion()"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- <v-btn dark outlined @click="resetRegion()">Reset</v-btn> -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <QuestMap
            id="RegionMap"
            ref="regionMap"
            class="mb-5"
            :center="newRegion.coordinates"
            :pitch="newRegion.pitch"
            :bearing="newRegion.bearing"
            :zoom="newRegion.zoom"
            :locations="[newRegion]"
            :mapStyle="mapStyle"
            :showMarker="true"
            :tab="tab"
            :showUserLocation="true"
            :showAccuracyCircle="false"
            @mark-location="markLocation"
            @move-location="moveLocation"
            @update-marker="updateMarker"
          />
          <div class="d-flex">
            <span v-if="$vuetify.breakpoint.mdAndUp">
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
            </span>
            <v-btn dark class="mr-2" @click="$emit('delete-quest')" color="danger">
              Delete
            </v-btn>
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
import { mapActions, mapMutations } from "vuex";
import QuestMap from "@/components/QuestMap.vue";

export default {
  name: "RegionTab",
  data() {
    return {
      newRegion: {
        // name: "",
        // coords: "",
        coordinates: [39.828175, -98.5795],
        pitch: 60,
        bearing: 0,
        zoom: 18,
      },
      mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
      loading: false,
      error: null,
    };
  },
  props: ["region", "tab"],
  created() {
    this.fetchRegion();
  },
  components: { QuestMap },
  // watch: {
  //   "newRegion.coords"(val) {
  //     var coordsArr = val.split(', ');
  //     this.newRegion.coordinates = [Number(coordsArr[0]), Number(coordsArr[1])];
  //   }
  // },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_REGION"]),
    fetchRegion() {
      Object.assign(this.newRegion, {
        // name: this.region.name,
        // coords: this.region.coordinates.join(', '),
        coordinates: this.region.coordinates,
        zoom: this.region.zoom,
      });
    },
    updateMarker(e) {
      var latLng = [e[1], e[0]];
      this.newRegion.coordinates = latLng;
    },
    markLocation(e) {
      var latLng = [e.mapboxEvent.lngLat.lat, e.mapboxEvent.lngLat.lng];
      // this.newRegion.coords = latLng.join(', ');
      this.newRegion.coordinates = latLng;
    },
    moveLocation(e) {
      var latLng = [e[1], e[0]];
      // this.newRegion.coords = latLng;
      this.newRegion.coordinates = latLng;
    },
    // positionChanged(e) {
    //   var latLng = [];
    //   latLng = [e[1], e[0]];
    //   this.newRegion.coordinates = latLng;
    // },
    updateRegion() {
      var newRegion = Object.assign({}, this.newRegion);
      this.$store.commit("SET_REGION", newRegion);
    },
    resetRegion() {
      this.fetchRegion();
    },
    publishQuest() {
      this.$store.commit("SET_REGION", {
        // name: this.region.name,
        coordinates: this.region.coordinates,
        zoom: this.region.zoom,
      });
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style>
#RegionMap {
  min-height: 540px;
  /* height: calc(100% - 56px); */
  z-index: 0;
}
</style>
