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
      @mousedown="selectLocation"
      @touchstart="selectLocation"
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
      geoJsonSource: {
        type: "geojson",
        data: {
          id: "geojsonData",
          type: "FeatureCollection",
          features: []
        }
      },
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
      selectedFeature: null
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
  methods: {
    ...mapMutations(["SET_COORDINATES"]),
    onMapLoaded(event) {
      this.canvas = event.map.getCanvasContainer();
      this.fetchFeatures();
    },
    fetchFeatures() {
      var features = [];

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

      this.geoJsonSource.data.features = features;
    },
    onMove(e) {
      var coords = e.lngLat,
        index = this.selectedFeature,
        geojson = this.geoJsonSource.data;

      // Set a UI indicator for dragging.
      this.canvas.style.cursor = "grabbing";

      // Update the Point feature in `geojson` coordinates
      // and call setData to the source layer `point` on it.
      // geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      // this.$refs.QuestMap.map.getSource("point").setData(geojson);

      geojson.features[index].geometry.coordinates = [ coords.lng, coords.lat ];
      this.$refs.QuestMap.map.getSource("geojsonData").setData(geojson);
      // this.$refs.QuestMap.map.getSource("geojsonData").setData({
      //   data: this.geoJsonSource.data,
      //   type: this.geoJsonSource.type,
      // });

      // console.log(index + " => " + coordinates)

      // console.log(this.geoJsonSource.type);
      // console.log(this.$refs.QuestMap.map.getSource("geojsonData"))

      // this.$store.commit("SET_COORDINATES", { coordinates, index });
      // this.$emit("move-location", { coordinates, index })
    },
    onUp(e) {
      // reset cursor style
      this.canvas.style.cursor = "";


      // Unbind mouse/touch events
      this.$refs.QuestMap.map.off("mousemove", this.onMove);
      this.$refs.QuestMap.map.off("touchmove", this.onMove);
      this.$refs.QuestMap.actions.panTo(e.lngLat);
      this.$emit("move-location", e)

      this.selectedFeature = null;
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
    selectLocation(e) {
      console.log("select location from QuestMap");
      console.log(e);
      var properties,
        features = e.map.queryRenderedFeatures(e.mapboxEvent.point),
        coordinates = e.mapboxEvent.lngLat;

      e.mapboxEvent.preventDefault();

      this.canvas.style.cursor = "grab";

      features.forEach(feature => {
        if (feature.layer.id == "geojsonLocations") {
          properties = feature.properties;
          console.log(properties);
        }
      });

      this.$refs.QuestMap.map.on("mousemove", this.onMove);
      this.$refs.QuestMap.map.once("mouseup", this.onUp);

      this.selectedFeature = this.findWithAttr(properties.locationId);

      this.$emit("select-location", {
        location: {
          locationId: properties.locationId,
          coordinates: coordinates
        }
      });
    },
    releaseLocation(e) {
      console.log("release location");
      console.log(e);
    },
    async moveLocation(e) {
      console.log("move location");
      console.log(e);
      //   var lngLat = await e.target.getLngLat();
      //   console.log(lngLat);
      //   // this.map.panTo(lngLat);
      //   this.$emit("move-location", lngLat);
    },
    findWithAttr(value) {
      const array = this.geoJsonSource.data.features;
      const attr = "locationId";
      for (var i = 0; i < array.length; i += 1) {
        if (array[i].properties[attr] === value) {
          return i;
        }
      }
      return -1;
    }
  }
};
</script>
