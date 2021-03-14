<template>
  <div id="map-wrap">
    <client-only>
      <l-map
        id="lMap"
        ref="lMap"
        :zoom="zoom"
        :center="[center[0], center[1]]"
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
          @click="$emit('select-location', location)"
          @dragstart="$emit('select-location', location)"
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
      marker: undefined,
    };
  },
  methods: {
    panTo(coordinates) {
      this.offsetMap();
      this.$nextTick(() => {
        var coords = [coordinates[0], coordinates[1]];
        this.$refs.lMap.mapObject.setView(coords);
      });
    },
    offsetMap() {
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
      if (!this.marker) {
        this.marker = new this.$L
          .marker([e.latitude, e.longitude])
          .bindPopup("You are here :)");

        this.$refs.lMap.mapObject.addLayer(this.marker);
      } else {
        this.marker.setLatLng(e.latlng);
      }
      this.$emit('position-changed', e.latlng);
    },
    onLocationError() {
      console.log("Location error");
      if (this.marker) {
        this.$refs.lMap.mapObject.removeLayer(marker);
        this.marker = undefined;
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
