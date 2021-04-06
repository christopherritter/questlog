<template>
  <MglMap
    id="MapBoxMap"
    ref="QuestMap"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="reverseCoords(center)"
    :zoom="zoom"
  >
    <MglMarker
      v-if="$route.name === 'editor' && tab === 'region'"
      ref="regionMarker"
      color="#ff392e"
      :coordinates="reverseCoords(center)"
      :draggable="draggable"
      @dragstart="selectLocation($event)"
      @dragend="moveLocation($event)"
    />
    <MglGeojsonLayer
      v-else
      :sourceId="geoJsonSource.data.id"
      :source="geoJsonSource"
      layerId="geojsonLocations"
      :layer="geoJsonlayer"
      @click="selectLocation($event)"
      @mouseenter="hoverLocation($event)"
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
      canvas: null,
      accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      geoJsonlayer: {
        id: "geojsonLocations",
        type: "symbol",
        source: "geojsonData",
        layout: {
          "text-field": ["get", "name"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 1.25,
          "text-justify": "auto",
          "icon-image": ["get", "marker"]
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
  props: ["center", "zoom", "locations", "mapStyle", "mapOptions", "draggable", "tab"],
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
    // redrawMap() {
    //   this.$nextTick(() => {
    //     this.map.resize();
    //   });
    // },
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
    flyTo(e) {
      this.$refs.QuestMap.actions.flyTo(e);
    },
    hoverLocation(e) {
      console.log("hover location")
      console.log(e)
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
      console.log(e)
      var properties,
          features = e.map.queryRenderedFeatures(e.mapboxEvent.point),
          coordinates = e.mapboxEvent.lngLat;

      features.forEach((feature) => {
        if (feature.layer.id == "geojsonLocations") {
          properties = feature.properties;
          console.log(properties)
        }
      })

      this.$emit("select-location", {
        location: {
          locationId: properties.locationId,
          coordinates: coordinates
        }
      });
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
