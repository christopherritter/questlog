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
          v-for="(location, index) in locations"
          :key="index"
          :lat-lng="[location.coordinates[0], location.coordinates[1]]"
          :draggable="draggable"
          @click="selectLocation({ event: $event, location: location })"
          @dragstart="
            $emit('select-location', { event: $event, location: location })
          "
          @dragend="$emit('move-location', $event)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "LeafletMap",
  props: ["center", "zoom", "locations", "draggable", "mapOptions"],
  data() {
    return {
      marker: null,
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
  methods: {
    panTo(latlng, zoom) {
      this.$refs.lMap.mapObject.setView(latlng, zoom);
    },
    redrawMap() {
      this.$nextTick(() => {
        this.$refs.lMap.mapObject.invalidateSize();
      });
    },
    locatePlayer() {
      this.$refs.lMap.mapObject.locate({
        setView: false,
        watch: true,
        timeout: 60000,
        enableHighAccuracy: true
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

          if (distance > 0) {
            this.$emit("position-changed", e.latlng);
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
    distanceFromLocation() {
      var currentPosition = this.currentPosition;
      var firstLatLng = this.firstLatLng;

      this.$nextTick(() => {
        var map = this.$refs.lMap.mapObject;
        var distance = map
          .latLngToLayerPoint(currentPosition)
          .distanceTo(map.latLngToLayerPoint(firstLatLng));

        this.distance = distance;
        return distance;
      });
    },
    clearDestination() {
      this.secondLatLng = null;
      this.secondPoint = null;
      this.distance = null;
      this.length = null;
      this.polyline = null;
    }
  }
};
</script>

<style>
#lMap {
  z-index: 0;
}
</style>
