<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        id="lMap"
        ref="lMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @click="$emit('mark-location', $event)"
        @locationfound="onLocationFound"
        @locationerror="onLocationError"
      >
        <l-tile-layer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="location in locations"
          :key="location.locationId"
          :name="location.locationId"
          :ref="location.locationId"
          :lat-lng="[location.coordinates[0], location.coordinates[1]]"
          :draggable="draggable"
          @click="selectLocation({ event: $event, location: location })"
          @dragstart="
            $emit('select-location', { event: $event, location: location })
          "
          @dragend="$emit('move-location', $event)"
          @popupclose="popupClose"
        >
          <l-icon
            v-if="location.marker"
            :icon-url="require(`~/assets/img/${location.marker}.svg`)"
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
            :popup-anchor="[0, -16]"
            :tooltip-anchor="[16, 0]"
          >
          </l-icon>

          <l-tooltip v-if="$vuetify.breakpoint.mdAndUp">
            <h3>{{ location.name }}</h3>
          </l-tooltip>

          <l-popup>
            <!-- <h3>
              {{ location.name }}
              is {{ Math.ceil(location.distance * 3.281) }} feet away.
            </h3> -->
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "LeafletMap",
  props: ["center", "zoom", "locations", "draggable", "mapOptions"],
  data() {
    return {
      marker: null,
      iconSize: 32,
      currentPosition: null,
      currentZoom: null,
      previousPosition: null,
      firstPoint: null,
      secondPoint: null,
      // distance: 0,
      length: null,
      polyline: null
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize / 2];
    }
  },
  methods: {
    ...mapMutations(["SET_DISTANCE"]),
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
      if (this.previousPosition === null) {
        this.currentPosition = e.latlng;
        this.previousPosition = {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        };
        this.$emit("position-changed", e.latlng);
      } else {
        // this.$nextTick(() => {
        this.previousPosition = {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        };
        this.currentPosition = e.latlng;
        var map = this.$refs.lMap.mapObject;
        var distance = map
          .latLngToLayerPoint(this.currentPosition)
          .distanceTo(map.latLngToLayerPoint(this.previousPosition));

        if (distance > 1) {
          this.$emit("position-changed", e.latlng);
          // this.locations.forEach(location => {
          //   var locationIndex = this.locations.findIndex(function(obj) {
          //     return obj.locationId === location.locationId;
          //   });
          //   var distance = this.distanceFromLocation(location);
          //   // var opacity = this.dynamicOpacity(distance);
          //   // console.log("verify opacity " + opacity);

          //   this.$store.commit("SET_DISTANCE", {
          //     index: locationIndex,
          //     distance: distance,
          //     // opacity: opacity,
          //   });
          // });
        }
        // });
      }

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
      const map = this.$refs.lMap.mapObject;
      if (!this.currentPosition) {
        this.$emit("select-location", { event, location });
      } else {
        var distance = this.distanceFromLocation(location);
        if (distance <= 50) {
          this.$refs[location.locationId][0].mapObject.unbindPopup();
          this.$emit("select-location", { event, location });
        } else {
          this.$refs[location.locationId][0].mapObject
            .bindPopup("<h3>" + location.name + " is " + distance + " meters away.</h3>")
            .addTo(map);
          this.$emit("preview-location", { event, location });
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
      this.length = null;
      this.polyline = null;
    },
    openPopup(locationId) {
      console.log("open popup")
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
  }
};
</script>

<style>
#lMap {
  z-index: 0;
}
</style>
