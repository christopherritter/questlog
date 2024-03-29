<template>
  <MglMap
    id="MapBoxMap"
    ref="QuestMap"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="reverseCoords(center)"
    :pitch="pitch"
    :bearing="bearing"
    :zoom="zoom"
    @load="onMapLoaded"
    @click="markLocation"
  >
    <!-- <MglGeocoderControl
      id="geocoder"
      v-if="$route.name === 'editor'"
      :accessToken="accessToken"
      :options="geocoderOptions"
      :mapboxgl="map"
      :marker="true"
      :input="defaultInput"
      @result="searchResult"
    /> -->
    <MglGeolocateControl
      v-if="$route.name === 'editor' || $route.name === 'quest-player'"
      id="geolocate"
      ref="GeolocateControl"
      position="bottom-right"
      :showAccuracyCircle="showAccuracyCircle"
      :showUserLocation="showUserLocation"
      :auto="true"
      :positionOptions="geolocateOptions.positionOptions"
      :fitBoundsOptions="{ linear: true, maxZoom: 22 }"
      :trackUserLocation="true"
      @geolocate="geolocate"
    />
    <MglMarker
      v-if="showMarker == true"
      id="marker"
      ref="regionMarker"
      color="#ff392e"
      :coordinates="reverseCoords(center)"
      :draggable="false"
      @dragend="moveLocation($event)"
    />
    <MglGeojsonLayer
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
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglMarker,
  MglGeojsonLayer,
  MglGeolocateControl
} from "vue-mapbox";

// import MglGeocoderControl from "vue-mapbox-geocoder";

export default {
  name: "QuestMap",
  async asyncData({ $config: { mapboxPublicToken } }) {
    const token = $config.mapboxPublicToken;
    return { token };
  },
  data() {
    return {
      map: null,
      canvas: null,
      accessToken: this.$config.mapboxPublicToken,
      // mapStyle: "mapbox://styles/christopherritter/ckn2kmn541b8f17pilbsk7pk3",
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
      geolocateOptions: {
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      },
      geocoderOptions: {
        mapboxgl: this.map
      },
      selectedFeature: null,
      isMoving: false,
      defaultInput: ""
    };
  },
  created() {
    this.map = null;
  },
  components: {
    MglMap,
    MglMarker,
    MglGeojsonLayer,
    MglGeolocateControl
    // MglGeocoderControl
  },
  props: [
    "center",
    "pitch",
    "bearing",
    "zoom",
    "locations",
    "draggable",
    "tab",
    "mapStyle",
    "showMarker",
    "showUserLocation",
    "showAccuracyCircle"
  ],
  methods: {
    ...mapMutations(["SET_COORDINATES"]),
    onMapLoaded(e) {
      this.map = Mapbox;
      this.canvas = e.map.getCanvasContainer();

      if (this.$route.name == "quest-questId") {
        this.$refs.QuestMap.map.scrollZoom.disable();
        this.$refs.QuestMap.map.dragPan.disable();
        this.$refs.QuestMap.map.dragRotate.disable();
        this.$refs.QuestMap.map.touchPitch.disable();
        this.$refs.QuestMap.map.doubleClickZoom.disable();
      }

      this.fetchFeatures();
    },
    // onDataLoaded(e) {
    //   console.log("data loaded " + e.isSourceLoaded);
    //   console.log(e);
    // },
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
        if (
          (this.$route.name == "quest-questId" && location.isLandmark) ||
          this.$route.name != "quest-questId"
        ) {
          features.push(feature);
        }
      });

      this.geoJsonSource.data.features = features;
      this.$emit("loaded");
    },
    onMove(e) {
      var coords = e.lngLat,
        index = this.selectedFeature,
        geojson = this.geoJsonSource.data;

      // Set a UI indicator for dragging.
      this.canvas.style.cursor = "grabbing";
      this.isMoving = true;

      geojson.features[index].geometry.coordinates = [coords.lng, coords.lat];
      this.$refs.QuestMap.map.getSource("geojsonData").setData(geojson);
    },
    onUp(e) {
      if (this.$route.name === "editor") {
        // reset cursor style
        this.canvas.style.cursor = "";

        // Unbind mouse/touch events
        this.$refs.QuestMap.map.off("mousemove", this.onMove);
        this.$refs.QuestMap.map.off("touchmove", this.onMove);

        if (this.isMoving == true) {
          this.moveLocation(e);
          this.isMoving = false;
        }

        this.selectedFeature = null;
      }
    },
    reverseCoords(coords) {
      return [coords[1], coords[0]];
    },
    redrawMap() {
      this.$nextTick().then(() => this.$refs.QuestMap.map.resize());
    },
    setCenter(coords) {
      this.$refs.QuestMap.map.setCenter(coords);
    },
    panTo(e) {
      this.$refs.QuestMap.actions.panTo(e);
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
      var properties,
        features = e.map.queryRenderedFeatures(e.mapboxEvent.point),
        coordinates = e.mapboxEvent.lngLat;

      e.mapboxEvent.preventDefault();

      features.forEach(feature => {
        if (feature.layer.id == "geojsonLocations") {
          properties = feature.properties;
        }
      });

      if (this.$route.name === "editor") {
        this.canvas.style.cursor = "grab";
        this.$refs.QuestMap.map.on("mousemove", this.onMove);
        this.selectedFeature = this.findWithAttr(properties.locationId);
      }

      this.$refs.QuestMap.map.once("mouseup", this.onUp);

      this.$emit("select-location", {
        location: {
          locationId: properties.locationId,
          coordinates: coordinates
        }
      });
    },
    // releaseLocation(e) {
    //   console.log("release location");
    //   console.log(e);
    // },
    markLocation(e) {
      this.$emit("mark-location", e);
    },
    moveLocation(e) {
      var lngLat;
      if (e.hasOwnProperty("marker")) {
        lngLat = e.marker.getLngLat();
      } else {
        lngLat = e.lngLat;
      }
      // this.panTo([lngLat.lng, lngLat.lat]);
      this.$emit("move-location", [lngLat.lng, lngLat.lat]);
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
    },
    triggerGeolocate() {
      this.$nextTick(() => {
        this.$refs.GeolocateControl.trigger();
      });
    },
    geolocate(e) {
      if (e.mapboxEvent.coords) {
        this.$emit("position-changed", [
          e.mapboxEvent.coords.longitude,
          e.mapboxEvent.coords.latitude
        ]);
      }
    },
    fitBounds(e) {
      this.$refs.QuestMap.map.fitBounds(e, {
        padding: { top: 48, bottom: 48, left: 48, right: 48 }
      });
    },
    searchResult(e) {
      this.$refs.QuestMap.map.setZoom(10);
      this.setCenter(e.result.center);
      this.$emit("update-marker", e.result.center);
    }
  }
};
</script>

<style scoped>
#MapBoxMap {
  height: 100%;
  width: 100%;
}
</style>
