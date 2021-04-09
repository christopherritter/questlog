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
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newRegion.coords"
                    label="Coordinates"
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
                    :disabled="newRegion.coords == ''"
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
            :mapOptions="mapOptions"
            :tab="tab"
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
        name: "",
        coords: "",
        coordinates: [39.828175, -98.5795],
        pitch: 60,
        bearing: 0,
        zoom: 18,
      },
      mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
      mapOptions: {},
      loading: false,
      error: null,
    };
  },
  props: ["region", "tab"],
  created() {
    this.fetchRegion();
  },
  components: { QuestMap },
  watch: {
    "newRegion.coords"(val) {
      var coordsArr = val.split(', ');
      this.newRegion.coordinates = [Number(coordsArr[0]), Number(coordsArr[1])];
    }
  },
  methods: {
    ...mapActions(["publishQuest"]),
    ...mapMutations(["SET_REGION"]),
    fetchRegion() {
      Object.assign(this.newRegion, {
        name: this.region.name,
        coords: this.region.coordinates.join(', '),
        zoom: this.region.zoom,
      });
    },
    markLocation(e) {
      var latLng = [e.mapboxEvent.lngLat.lat, e.mapboxEvent.lngLat.lng];
      this.newRegion.coords = latLng.join(', ');
    },
    moveLocation(e) {
      var latLng = [e[1], e[0]];
      this.newRegion.coords = latLng.join(', ');
    },
    updateRegion() {
      this.$store.commit("SET_REGION", this.newRegion);
    },
    resetRegion() {
      this.fetchRegion();
    },
    publishQuest() {
      this.$store.commit("SET_REGION", {
        name: this.region.name,
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
