<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>
              <h1 class="mt-5 mb-4">Region</h1>
              <v-text-field
                v-model="newRegion.name"
                label="Name"
                outlined
              ></v-text-field>
              <h4 class="mt-1 mb-6">Coordinates</h4>
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
              </v-row>
              <h4 class="mt-1 mb-6">Zoom</h4>
              <v-slider
                v-model="newRegion.zoom"
                min="0"
                max="18"
                thumb-label
              ></v-slider>
              <v-row>
                <v-col cols="12" class="d-flex pt-1">
                  <v-btn
                    dark
                    outlined
                    :disabled="!newRegion.coordinates == null"
                    @click="updateRegion()"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn dark outlined @click="resetRegion()">Reset</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <LeafletMap
            id="RegionMap"
            ref="regionMap"
            class="mb-5"
            :center="newRegion.coordinates"
            :zoom="newRegion.zoom"
            :locations="[newRegion]"
            :draggable="true"
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
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "RegionTab",
  data() {
    return {
      newRegion: {
        name: "",
        coordinates: [39.828175, -98.5795],
        zoom: 18,
        draggable: true
      },
      loading: false,
      error: null
    };
  },
  props: ["region"],
  created() {
    this.fetchRegion();
    // this.$refs.regionMap.map.scrollWheelZoom.disable()
  },
  components: { LeafletMap },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_REGION"]),
    fetchRegion() {
      Object.assign(this.newRegion, this.region);
    },
    markLocation(event) {
      this.newRegion.coordinates = [event.latlng.lat, event.latlng.lng];
    },
    moveLocation(event) {
      const latLng = event.location.target.getLatLng();
      this.newRegion.coordinates = [latLng.lat, latLng.lng];
    },
    updateRegion() {
      this.$store.commit("SET_REGION", this.newRegion);
    },
    resetRegion() {
      this.fetchRegion();
    },
    publishQuest() {
      this.$store.commit("SET_REGION", this.newRegion);
      this.$store.dispatch("publishQuest");
    }
  }
};
</script>

<style>
#RegionMap {
  height: calc(100% - 56px);
}
</style>
