<template>
  <MglMap
    id="MapBoxMap"
    ref="QuestMap"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="reverseCoords(center)"
    :zoom="zoom"
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
      layerId="geoJsonLayerId"
      :layer="geoJsonlayer"
      @click="panTo($event)"
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
      // geoJsonLayer: {
      //   id: "geoJsonLayerId",
      //   type: "symbol",
      //   source: "geojsonData",
      //   layout: {
      //     "text-field": ["get", "name"],
      //     "text-variable-anchor": ["top", "bottom", "left", "right"],
      //     "text-radial-offset": 0.5,
      //     "text-justify": "auto",
      //     "icon-image": ["get", "marker"],
      //   }
      // },
      geoJsonlayer: {
        id: "geoJsonLayerId",
        type: "symbol",
        source: "geojsonData",
        layout: {
          "text-field": ["get", "name"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
          "icon-image": ["get", "marker"],
        },
        // layout: {
        //   "icon-image": "ae-f-route-3"
        // }
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
  computed: {
    geoJsonSource() {
      var geoJson = {},
        features = [];

      this.locations.forEach(location => {
        let feature = {
          type: "Feature",
          properties: {
            image: location.image,
            isLandmark: location.isLandmark,
            isStartingPoint: location.isStartingPoint,
            locationId: location.locationId,
            marker: location.marker,
            name: location.name,
            order: location.order,
            zoom: location.zoom
          },
          geometry: {
            type: "Point",
            coordinates: [location.coordinates[1], location.coordinates[0]]
          }
        };
        features.push(feature);
      });

      geoJson = {
        type: "geojson",
        data: {
          id: "geojsonData",
          type: "FeatureCollection",
          features: features
        }
      };

      return geoJson;
    }
  },
  methods: {
    reverseCoords(coords) {
      return [coords[1], coords[0]];
    },
    redrawMap() {
      this.$nextTick(() => {
        this.map.resize();
      });
    },
    // panTo(e) {
    //   if (Array.isArray(e)) {
    //     this.map.panTo([e[1], e[0]]);
    //   } else {
    //     this.map.panTo(e.lngLat);
    //   }
    // },
    panTo(e) {
      // console.log(this.$refs.QuestMap)
      this.$refs.QuestMap.actions.panTo(e.mapboxEvent.lngLat);
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
