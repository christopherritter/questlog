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
          @dragend="$emit('move-location', location)"
        ></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "LeafletMap",
  props: ["center", "zoom", "locations", "draggable", "mapOptions"],
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
        this.$refs.lMap.mapObject.locate({ setView: true, maxZoom: 18 });
      });
    },
    onLocationFound(e) {
      var radius = e.accuracy / 2;

      this.$L.marker(e.latlng)
        .addTo(this.$refs.lMap.mapObject)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

      this.$L.circle(e.latlng, radius).addTo(this.$refs.lMap.mapObject);
    },
    onLocationError(e) {
      console.log("Location error")
      alert(e.message);
    }
  }
};
</script>

<style>
#lMap {
  z-index: 0;
}
</style>
