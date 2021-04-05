<template>
  <MglMap
    id="MapBoxMap"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="[125.6, 10.1]"
    :zoom="7.5"
    :options="mapOptions"
    @mousedown="markLocation($event)"
  >
    <!-- <MglMarker
      v-for="location in locations"
      :key="location.locationId"
      :ref="location.locationId"
      :lng-lat="reverseCoords(location.coordinates)"
      :draggable="draggable"
      @dragstart="selectLocation($event)"
      @dragend="moveLocation($event)"
    >
      <v-icon :id="location.locationId" class="marker">{{
        "mdi-" + location.marker
      }}</v-icon>
    </MglMarker> -->
    <MglGeojsonLayer
      :sourceId="geoJsonSource.data.id"
      :source="geoJsonSource"
      layerId="myLayerId"
      :layer="geoJsonlayer"
    />
  </MglMap>
</template>

<script>
import { mapMutations } from "vuex";
import { MglMap, MglMarker, MglGeojsonLayer } from "vue-mapbox";

export default {
  name: "QuestMap",
  data() {
    return {
      map: null,
      accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
      geoJsonSource: {
        type: "geojson",
        data: {
          id: "test",
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [125.6, 10.1]
          },
          properties: {
            name: "Dinagat Islands"
          }
        }
      },
      geoJsonlayer: {
        type: "circle",
        paint: {
          "circle-color": "#00ffff"
        }
      },
      markerCoordinates: [-90.96, -0.47]
    };
  },
  components: {
    MglMap,
    MglMarker,
    MglGeojsonLayer
  },
  props: ["center", "zoom", "locations", "mapOptions", "draggable"],
  methods: {
    handleClick(e) {
      console.log(e);
    },
    reverseCoords(coords) {
      return [coords[1], coords[0]];
    },
    redrawMap() {
      this.$nextTick(() => {
        this.map.resize();
      });
    },
    panTo(e) {
      if (Array.isArray(e)) {
        this.map.panTo([e[1], e[0]]);
      } else {
        this.map.panTo(e.lngLat);
      }
    },
    markLocation(e) {
      console.log("mark location from QuestMap");
      console.log(e);
      // if (!e.originalEvent) {
      //   console.log("no original event");
      //   this.selectLocation(e);
      // } else if (e.originalEvent.target.id === "") {
      //   console.log("no target id");
      //   this.map.panTo(e.lngLat);
      //   // if (e.type == "click") {
      //   //   this.$emit("clear-location");
      //   // }
      //   this.$emit("mark-location", e.lngLat);
      // } else {
      //   console.log("select location");
      //   this.map.panTo(e.lngLat);
      //   this.$emit("select-location", {
      //     location: {
      //       locationId: e.originalEvent.target.id,
      //       coordinates: [e.lngLat.lat, e.lngLat.lng]
      //     }
      //   });
      // }
    },
    selectLocation(e) {
      console.log("select location from QuestMap");
      console.log(e);
      // var target = e.target.getElement();
      // var lngLat = e.target.getLngLat();
      // this.$emit("select-location", {
      //   location: {
      //     locationId: target.firstChild.id,
      //     coordinates: [lngLat.lat, lngLat.lng]
      //   }
      // });
    },
    async moveLocation(e) {
      console.log("move location");
      console.log(e);
      //   var lngLat = await e.target.getLngLat();
      //   console.log(lngLat);
      //   // this.map.panTo(lngLat);
      //   this.$emit("move-location", lngLat);
    }
  }
};
</script>

<style scoped>
.marker {
  background-color: #424242;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
