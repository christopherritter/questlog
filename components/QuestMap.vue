<template>
  <MglMap
    id="MapBoxMap"
    ref="QuestMap"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="reverseCoords(center)"
    :zoom="zoom"
    @load="onMapLoaded"
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
      @mouseenter="hoverLocation"
      @mouseleave="leaveLocation"
      @mousedown="clickLocation"
      @mouseup="releaseLocation"
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
  props: [
    "center",
    "zoom",
    "locations",
    "mapStyle",
    "mapOptions",
    "draggable",
    "tab"
  ],
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
    onMapLoaded(event) {
      this.canvas = event.map.getCanvasContainer();
    },
    onMove(e) {
      var coords = e.lngLat;
      console.log("onMove coords: " + coords)

      // Set a UI indicator for dragging.
      this.canvas.style.cursor = "grabbing";

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      // geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      // this.$refs.QuestMap.map.getSource("point").setData(geojson);
    },
    onUp(e) {
      var coords = e.lngLat;
      console.log("onUp to unbind events")

      // Print the coordinates of where the point had
      // finished being dragged to on the map.
      // coordinates.style.display = "block";
      // coordinates.innerHTML =
      //   "Longitude: " + coords.lng + "<br />Latitude: " + coords.lat;
      // canvas.style.cursor = "";

      // Unbind mouse/touch events
      this.$refs.QuestMap.map.off("mousemove", this.onMove);
      this.$refs.QuestMap.map.off("touchmove", this.onMove);
    },
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
    hoverLocation() {
      this.canvas.style.cursor = "move";
    },
    leaveLocation() {
      this.canvas.style.cursor = "";
    },
    clickLocation(e) {
      console.log("click location");
      console.log(e)
      e.mapboxEvent.preventDefault();

      this.canvas.style.cursor = "grab";

      this.$refs.QuestMap.map.on("mousemove", this.onMove);
      this.$refs.QuestMap.map.once("mouseup", this.onUp);
    },
    selectLocation(e) {
      console.log("select location from QuestMap");
      console.log(e);
      var properties,
        features = e.map.queryRenderedFeatures(e.mapboxEvent.point),
        coordinates = e.mapboxEvent.lngLat;

      features.forEach(feature => {
        if (feature.layer.id == "geojsonLocations") {
          properties = feature.properties;
          console.log(properties);
        }
      });

      this.$emit("select-location", {
        location: {
          locationId: properties.locationId,
          coordinates: coordinates
        }
      });
    },
    releaseLocation(e) {
      console.log("release location")
      console.log(e)
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
