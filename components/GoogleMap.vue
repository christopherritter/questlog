<template>
  <GMap
    ref="gMap"
    language="en"
    class="fill-height"
    :center="{ lat: center[0], lng: center[1] }"
    :zoom="zoom"
    :options="mapOptions"
    @click="$emit('mark-location', $event)"
  >
    <!-- This was removed from GMap: -->
    <!-- :cluster="{ options: { styles: clusterStyle } }" -->
    <!-- :options="mapOptions" -->

    <GMapMarker
      v-for="location in locations"
      class="marker"
      :key="location.locationId"
      :ref="location.locationId"
      :position="getPosition(location.coordinates)"
      :options="{
        icon: {
          url: require('~/assets/img/' + location.marker + '.png'),
          anchor: { x: 16, y: 16 }
        }
      }"
      @click="selectLocation({ event: $event, location: location })"
    >
      <GMapInfoWindow :options="{ maxWidth: 200 }" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <code class="grey--text text--darken-4">
          lat: {{ location.coordinates[0] }}, lng: {{ location.coordinates[1] }}
        </code>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "GoogleMap",
  props: ["mapOptions", "center", "zoom", "locations", "draggable"],
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
          //optional: offset infowindow so it visually sits nicely on top of our marker
          pixelOffset: {
            width: 0,
            height: -35
          }
      },
      markers: [{
        position: {
          lat: 47.376332,
          lng: 8.547511
        },
        infoText: '<strong>Marker 1</strong>'
      }, {
        position: {
          lat: 47.374592,
          lng: 8.548867
        },
        infoText: '<strong>Marker 2</strong>'
      }, {
        position: {
          lat: 47.379592,
          lng: 8.549867
        },
        infoText: '<strong>Marker 3</strong>'
      }],
      marker: null,
      iconSize: 32,
      currentPosition: null,
      currentZoom: null,
      previousPosition: null,
      firstPoint: null,
      secondPoint: null
    };
  },
  mounted: function() {
    console.log(this.$refs.gMap);
    //  this.$refs.gMap.$mapPromise.then(() => {
    //     this.$refs.gMap.$mapObject.setClickableIcons(false)
    // })
  },
  computed: {
    landmarks() {
      var landmarkLocations = [];
      this.locations.forEach(location => {
        if (location.isLandmark === true) {
          landmarkLocations.push(location);
        }
      });
      return landmarkLocations;
    },
    nonLandmarks() {
      var nonlandmarkLocations = [];
      this.locations.forEach(location => {
        if (location.isLandmark === false) {
          nonlandmarkLocations.push(location);
        }
      });
      return nonlandmarkLocations;
    },
    dynamicSize() {
      return [this.iconSize, this.iconSize];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize / 2];
    }
  },
  methods: {
    ...mapMutations(["SET_DISTANCE"]),
    getPosition: function(location) {
      return {
        lat: parseFloat(location[0]),
        lng: parseFloat(location[1])
      };
    },
    iconPath() {
      return {
        path: this.$refs.gMap.$mapObject.SymbolPath.CIRCLE,
        scale: 8.5,
        fillColor: "#F00",
        fillOpacity: 0.4,
        strokeWeight: 0.4
      };
    },
    svgMarker() {
      return {
        path:
          "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: this.$refs.gMap.google.maps.Point(15, 30)
      };
    },
    panTo(latlng, zoom) {
      this.$nextTick(() => {
        this.$refs.lMap.mapObject.setView(latlng, zoom);
      });
    },
    redrawMap() {
      this.$nextTick(() => {
        this.$refs.lMap.mapObject.invalidateSize();
      });
    },
    locatePlayer() {
      this.$nextTick(() => {
        this.$refs.lMap.mapObject.locate({
          setView: false,
          watch: true,
          timeout: 60000,
          enableHighAccuracy: true
        });
      });
    },
    onLocationFound(e) {
      this.currentPosition = e.latlng;
      this.$emit("position-changed", e.latlng);

      if (!this.marker) {
        this.marker = new this.$L.marker([e.latitude, e.longitude]);
        this.$refs.lMap.mapObject.addLayer(this.marker);
      } else {
        this.marker.setLatLng(e.latlng);
      }
    },
    onLocationError() {
      if (this.marker) {
        this.$refs.lMap.mapObject.removeLayer(marker);
        this.marker = undefined;
      }
    },
    selectLocation({ event, location }) {
      if (this.$route.name !== "quest-questId") {
        const map = this.$refs.lMap.mapObject;
        if (!this.currentPosition) {
          this.$emit("select-location", { event, location });
        } else {
          var distance = this.distanceFromLocation(location);
          if (distance <= 50) {
            this.$refs[location.locationId][0].mapObject.unbindPopup();
            this.$emit("select-location", { event, location });
          }
        }
      }
    },
    fitBounds(latlng) {
      var currentPosition = this.$L.latLng(
        this.currentPosition.lat,
        this.currentPosition.lng
      );
      var destination = this.$L.latLng(latlng.lat, latlng.lng);
      const group = this.$L.latLngBounds([currentPosition, destination]);

      this.$nextTick(() => {
        this.$refs.lMap.mapObject.fitBounds(group, { padding: [30, 30] });
      });
    },
    distanceFromLocation(location) {
      var currentPosition, destination;
      currentPosition = this.currentPosition;
      if (!currentPosition) {
        return;
      } else {
        destination = this.$L.latLng(
          location.coordinates[0],
          location.coordinates[1]
        );
      }
      var map = this.$refs.lMap.mapObject;
      var distance = map
        .latLngToLayerPoint(currentPosition)
        .distanceTo(map.latLngToLayerPoint(destination));
      return Math.ceil(distance);
    },
    clearDestination() {
      this.secondPoint = null;
      this.polyline = null;
    },
    openPopup(locationId) {
      console.log("open popup");
      this.$refs[locationId][0].mapObject.openPopup();
    },
    popupClose() {
      this.$emit("popupclose");
    },
    dynamicOpacity(distance) {
      if (distance > 100) {
        return 0;
      } else if (distance >= 50) {
        return 0.25;
      } else if (distance >= 25) {
        return 0.5;
      } else if (distance >= 10) {
        return 0.75;
      } else {
        return 1;
      }
    }
  },
  toggleInfoWindow: function(marker, idx) {
    this.infoWindowPos = marker.position;

    //check if its the same marker that was selected if yes toggle
    if (this.currentMidx == idx) {
      this.infoWinOpen = !this.infoWinOpen;
    }
    //if different marker set infowindow to open and reset current marker index
    else {
      this.infoWinOpen = true;
      this.currentMidx = idx;
    }
  }
};
</script>

<style>
#lMap {
  z-index: 0;
}
.marker {
  background-color: red;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
</style>
