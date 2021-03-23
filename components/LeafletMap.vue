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
          :lat-lng="[location.coordinates[0], location.coordinates[1]]"
          :draggable="draggable"
          :options="{ opacity: dynamicOpacity(location.distance) }"
          @click="selectLocation({ event: $event, location: location })"
          @dragstart="
            $emit('select-location', { event: $event, location: location })
          "
          @dragend="$emit('move-location', $event)"
        >
          <l-icon
            v-if="location.marker"
            :icon-url="require(`~/assets/img/${location.marker}`)"
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
          ></l-icon>
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
      iconSize: 48,
      currentPosition: null,
      currentZoom: null,
      previousPosition: null,
      firstLatLng: null,
      secondLatLng: null,
      firstPoint: null,
      secondPoint: null,
      distance: null,
      length: null,
      polyline: null
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize * 0.85, this.iconSize * 0.85];
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
        this.previousPosition = {
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        };
        this.currentPosition = e.latlng;

        this.$nextTick(() => {
          var map = this.$refs.lMap.mapObject;
          var distance = map
            .latLngToLayerPoint(this.currentPosition)
            .distanceTo(map.latLngToLayerPoint(this.previousPosition));

          if (distance > 1) {
            this.$emit("position-changed", e.latlng);
            this.locations.forEach(location => {
              console.log("location name: " + location.name)
              var locationIndex = this.locations.findIndex(function(obj) {
                return obj.locationId === location.locationId;
              });
              var distance = this.distanceFromLocation(location);

              this.$store.commit("SET_DISTANCE", {
                index: locationIndex,
                distance: Math.ceil(distance)
              });
            });
          }
        });
      }

      if (!this.marker) {
        this.marker = new this.$L.marker([e.latitude, e.longitude]).bindPopup(
          "You are here."
        );
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
    async selectLocation({ event, location }) {
      this.firstLatLng = this.$L.latLng(
        location.coordinates[0],
        location.coordinates[1]
      );

      if (!this.currentPosition) {
        this.$emit("select-location", { event, location });
      } else {
        await this.distanceFromLocation();

        if (this.distance < 1000) {
          this.$emit("select-location", { event, location });
        } else {
          console.log("too far away " + this.distance);
          // console.log(event);
          // this.marker = new this.$L.marker([
          //   location.coordinates[0],
          //   location.coordinates[1]
          // ]).bindPopup("Too far away.");
          // this.$refs.lMap.mapObject.addLayer(this.marker);
        }
      }
    },
    fitBounds(latlng) {
      if (!this.firstLatLng) {
        console.log("no first latlng");
      } else {
        var firstLatLng = this.$L.latLng(
          this.firstLatLng.lat,
          this.firstLatLng.lng
        );
        var secondLatLng = this.$L.latLng(latlng.lat, latlng.lng);
        const group = this.$L.latLngBounds([firstLatLng, secondLatLng]);

        this.$nextTick(() => {
          this.$refs.lMap.mapObject.fitBounds(group, { padding: [30, 30] });
        });
      }
    },
    distanceFromLocation(location) {
      var currentPosition = this.currentPosition;
      var location;

      if (!location) {
        location = this.firstLatLng;
      } else {
        location = this.$L.latLng(
          location.coordinates[0],
          location.coordinates[1]
        );
      }

      var map = this.$refs.lMap.mapObject;
      var distance = map
        .latLngToLayerPoint(currentPosition)
        .distanceTo(map.latLngToLayerPoint(location));

      this.distance = distance;
      return distance;
    },
    clearDestination() {
      this.secondLatLng = null;
      this.secondPoint = null;
      this.distance = null;
      this.length = null;
      this.polyline = null;
    },
    dynamicOpacity(distance) {
      if (distance > 100) {
        return 0;
      } else if (distance >= 50) {
        return 0.25;
      } else if (distance >= 25) {
        return 0.5
      } else if (distance >= 10) {
        return 0.75
      } else {
        return 1
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
